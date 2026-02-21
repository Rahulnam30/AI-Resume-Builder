// 🔥 YOUR ORIGINAL IMPORTS — UNCHANGED
import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from "../../../api/axios";
import {
  FiDownload, FiFile, FiCalendar, FiTrash2, FiSearch, FiFilter,
  FiFileText, FiEye, FiShare2, FiClock, FiTrendingUp, FiFolder,
  FiStar, FiEdit, FiCopy, FiRefreshCw, FiMoreVertical, FiLayout, FiList, FiGrid, FiChevronDown, FiCheck
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import UserNavBar from '../UserNavBar/UserNavBar';

const Downloads = () => {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedFormats, setSelectedFormats] = useState([]);
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openMenuId && !event.target.closest('.menu-trigger') && !event.target.closest('.menu-dropdown')) {
        setOpenMenuId(null);
      }
      if (isFilterOpen && !event.target.closest('.filter-trigger') && !event.target.closest('.filter-dropdown')) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenuId, isFilterOpen]);

  // Fetch Downloads
  useEffect(() => {
    fetchDownloads();
  }, []);

  const fetchDownloads = async () => {
    try {
      setIsRefreshing(true);
      setLoading(true);
      
      const params = new URLSearchParams({
        limit: '50',
        page: '1'
      });
      
      const response = await axiosInstance.get(`/api/downloads?${params}`);
      const { downloads: backendDownloads } = response.data;
      
      const allDownloads = backendDownloads.map(download => ({
        id: download._id?.toString?.() || download.id,
        name: download.name,
        type: download.type,
        format: (download.format || (download.type === 'cover-letter' ? 'DOCX' : 'PDF')).toUpperCase(),
        size: download.size || (download.type === 'cover-letter' ? '150 KB' : '250 KB'),
        views: download.views || 0,
        downloadDate: download.downloadDate,
        template: download.template,
        starred: false,
        color: download.type === 'resume' ? 'blue' : download.type === 'cover-letter' ? 'purple' : 'green',
      }));
      
      setDownloads(allDownloads);
    } catch (error) {
      console.error('Error fetching downloads:', error);
      setDownloads([]);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleResetSamples = () => {
    fetchDownloads();
    setOpenMenuId(null);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/downloads/${id}`);
      setDownloads(downloads.filter(download => download.id !== id));
    } catch (error) {
      console.error('Error deleting download:', error);
    }
    setOpenMenuId(null);
  };

  // 🔥 UPDATED DOWNLOAD HANDLER (PDF + DOCX SAFE)
  const handleDownload = async (download) => {
    setDownloadingId(download.id);

    try {
      const format = (download.format || '').toUpperCase();
      console.log("📥 Downloading:", download.id, format);

      let endpoint = '';
      let mimeType = '';
      let fileExt = '';

      if (format === 'DOCX' || format === 'DOC') {
        endpoint = '/word';
        mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        fileExt = 'docx';
      } else {
        endpoint = '/pdf';
        mimeType = 'application/pdf';
        fileExt = 'pdf';
      }

      const url = `/api/downloads/${download.id}${endpoint}`;
      console.log("➡️ Request URL:", url);

      const res = await axiosInstance.get(url, {
        responseType: 'blob',
        timeout: 60000,
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });

      if (!res.data || res.data.size === 0) {
        throw new Error('Empty file received');
      }

      const blob = new Blob([res.data], { type: mimeType });

      // detect server JSON error inside blob
      if (blob.size < 3000) {
        const text = await blob.text();
        if (text.includes('error') || text.includes('Error') || text.includes('HTML')) {
          throw new Error(text.slice(0, 200));
        }
      }

      const safeName = (download.name || 'document').replace(/[^a-zA-Z0-9.-]/g, '_');
      const downloadUrl = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${safeName}.${fileExt}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);

    } catch (err) {
      console.error('❌ Download failed:', err);

      let msg = 'Download failed';

      // 🔥 FIX ADDED: handle missing html case specifically
      if (err.response?.status === 400) {
        msg = 'This document is missing HTML content. Please regenerate it.';
      }
      else if (err.response?.status === 404) msg = 'File not found';
      else if (err.response?.status === 500) msg = 'File generation error';
      else if (err.code === 'ECONNABORTED') msg = 'Server timeout';

      alert(msg);
    } finally {
      setDownloadingId(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getFilteredDownloads = () => {
    let filtered = [...downloads];

    if (selectedTypes.length > 0) {
      filtered = filtered.filter(d => selectedTypes.includes(d.type));
    }

    if (selectedFormats.length > 0) {
      filtered = filtered.filter(d => selectedFormats.includes(d.format));
    }

    if (searchTerm) {
      filtered = filtered.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (d.template && d.template.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (sortBy === 'recent') {
      filtered = filtered.sort((a, b) => new Date(b.downloadDate) - new Date(a.downloadDate));
    } else if (sortBy === 'name') {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'views') {
      filtered = filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
    }

    return filtered;
  };

  const stats = {
    total: downloads.length,
    resumes: downloads.filter(d => d.type === 'resume').length,
    coverLetters: downloads.filter(d => d.type === 'cover-letter').length,
    cvs: downloads.filter(d => d.type === 'cv').length,
    totalViews: downloads.reduce((sum, d) => sum + (d.views || 0), 0)
  };

  const filteredDownloads = getFilteredDownloads();

  const typeOptions = [
    { value: 'resume', label: 'Resumes' },
    { value: 'cover-letter', label: 'Cover Letters' },
    { value: 'cv', label: 'CVs' },
  ];

  const formatOptions = [
    { value: 'PDF', label: 'PDF' },
    { value: 'DOCX', label: 'DOCX' },
  ];

  const toggleType = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleFormat = (format) => {
    setSelectedFormats(prev =>
      prev.includes(format) ? prev.filter(f => f !== format) : [...prev, format]
    );
  };

  const activeFilterCount = selectedTypes.length + selectedFormats.length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading downloads...</p>
        </div>
      </div>
    );
  }



  return (
    <>
      <UserNavBar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 font-outfit">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Download Manager</h1>
                <p className="text-sm sm:text-base text-gray-500">Manage your ResumeAI documents</p>
              </div>
              <button
                onClick={handleResetSamples}
                disabled={isRefreshing}
                className={`w-fit flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
                  isRefreshing
                    ? 'bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed'
                    : 'bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100'
                }`}
              >
                <FiRefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5 mb-12">
              <StatsCard label="Total Files" value={stats.total} icon={<FiFolder />} />
              <StatsCard label="Resumes" value={stats.resumes} icon={<FiFileText />} />
              <StatsCard label="Cover Letters" value={stats.coverLetters} icon={<FiEdit />} />
              <StatsCard label="CVs" value={stats.cvs} icon={<FiFile />} />
              <StatsCard label="Views" value={stats.totalViews} icon={<FiTrendingUp />} />
            </div>
          </div>

          {/* Controls */}
          <div className="sticky top-4 z-30 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
              <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
                <div className="relative flex-1">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <FiSearch size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-transparent rounded-xl outline-none text-gray-700 placeholder-gray-400 focus:bg-gray-50/50 text-[15px]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <button
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                      className={`filter-trigger flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border w-full lg:w-48 justify-between ${
                        isFilterOpen
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-gray-50 text-gray-700 border-transparent hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FiFilter size={16} className={activeFilterCount > 0 ? 'text-blue-500' : 'text-gray-500'} />
                        <span>{activeFilterCount > 0 ? `${activeFilterCount} Filters` : 'All Documents'}</span>
                      </div>
                      <FiChevronDown size={14} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isFilterOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="filter-dropdown absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-2xl py-1.5 z-50 origin-top-right"
                        >
                          <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
                            <h6 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Filter Documents</h6>
                            {(selectedTypes.length > 0 || selectedFormats.length > 0) && (
                              <button
                                onClick={() => { 
                                  setSelectedTypes([]); 
                                  setSelectedFormats([]); 
                                }}
                                className="text-[10px] text-blue-600 font-semibold hover:underline"
                              >
                                Reset
                              </button>
                            )}
                          </div>
                          
                          {/* Type Filters */}
                          <div className="px-4 py-2">
                            <p className="text-xs text-gray-500 mb-2 uppercase font-medium tracking-wide">Document Type</p>
                            {typeOptions.map((option) => (
                              <label key={option.value} className="flex items-center gap-2 p-1.5 rounded-lg cursor-pointer hover:bg-gray-50 w-full">
                                <input
                                  type="checkbox"
                                  checked={selectedTypes.includes(option.value)}
                                  onChange={() => toggleType(option.value)}
                                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm">{option.label}</span>
                              </label>
                            ))}
                          </div>

                          {/* Format Filters */}
                          <div className="px-4 py-2 border-t border-gray-50">
                            <p className="text-xs text-gray-500 mb-2 uppercase font-medium tracking-wide">Format</p>
                            {formatOptions.map((option) => (
                              <label key={option.value} className="flex items-center gap-2 p-1.5 rounded-lg                               cursor-pointer hover:bg-gray-50 w-full">
                                <input
                                  type="checkbox"
                                  checked={selectedFormats.includes(option.value)}
                                  onChange={() => toggleFormat(option.value)}
                                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm">{option.label}</span>
                              </label>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === 'grid'
                        ? 'bg-blue-100 text-blue-700 shadow-sm'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    <FiGrid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === 'list'
                        ? 'bg-blue-100 text-blue-700 shadow-sm'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    <FiList size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          {filteredDownloads.length === 0 ? (
            <EmptyState searchTerm={searchTerm} />
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
              {filteredDownloads.map((download) => (
                <DocumentCard
                  key={download.id}
                  download={download}
                  viewMode={viewMode}
                  openMenuId={openMenuId}
                  setOpenMenuId={setOpenMenuId}
                  handleDelete={handleDelete}
                  handleDownload={handleDownload}
                  downloadingId={downloadingId}
                  formatDate={formatDate}
                />
              ))}
            </div>
          )}

          {/* Footer */}
          <footer className="mt-20 border-t border-gray-100 pt-8 text-center text-[13px] text-gray-400">
            © {new Date().getFullYear()} ResumeAI Inc. All rights reserved.
          </footer>
        </div>
      </div>
    </>
  );
};

// StatsCard
const StatsCard = ({ label, value, icon }) => (
  <motion.div
    whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
    className="bg-white rounded-2xl p-[18px_22px] shadow-[0_1px_6px_rgba(0,0,0,0.08)] transition-all duration-300"
  >
    <div className="flex items-center gap-1.5">
      <p className="text-xs text-gray-500 font-medium">{label}</p>
      <div className="text-sm text-gray-400">{icon}</div>
    </div>
    <h3 className="text-3xl font-bold text-gray-900 mt-1.5">{value}</h3>
  </motion.div>
);

// DocumentCard
const DocumentCard = ({
  download, 
  viewMode, 
  openMenuId, 
  setOpenMenuId, 
  handleDelete, 
  handleDownload, 
  downloadingId,
  formatDate
}) => {
  const isMenuOpen = openMenuId === download.id;
  const isList = viewMode === 'list';
  const isDownloading = downloadingId === download.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 relative overflow-visible ${
        isList ? 'flex flex-col sm:flex-row sm:items-center p-3 gap-4 sm:gap-5' : 'p-5 flex flex-col h-full'
      }`}
    >
      <div className={`absolute top-3 right-3 z-10 ${isList ? 'order-last relative top-auto right-auto' : ''}`}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpenMenuId(isMenuOpen ? null : download.id);
          }}
          className="menu-trigger p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
        >
          <FiMoreVertical size={18} />
        </button>
        
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="menu-dropdown absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-2xl py-1.5 z-50 origin-top-right"
            >
              <button
                onClick={() => handleDelete(download.id)}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 rounded-lg transition-colors"
              >
                <FiTrash2 size={16} />
                Delete
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={`${isList ? 'flex-1 min-w-0' : 'flex flex-col h-full'}`}>
        <div className={`${isList ? 'mb-2' : 'mb-4'}`}>
          <h3 className={`font-semibold text-gray-900 group-hover:text-gray-700 truncate ${isList ? 'text-sm' : 'text-lg leading-tight'}`}>
            {download.name}
          </h3>
          <p className={`text-xs text-gray-500 mt-1 ${isList ? 'hidden sm:block' : ''}`}>
            {download.template ? `${download.template} Template` : download.type.replace('-', ' ')}
          </p>
        </div>

        {isList && (
          <div className="grid grid-cols-3 gap-4 text-xs text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <FiFile size={12} />
              <span>{download.format}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiCalendar size={12} />
              <span>{formatDate(download.downloadDate)}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiEye size={12} />
              <span>{download.views} views</span>
            </div>
          </div>
        )}
      </div>

      <div className={`flex items-center gap-3 mt-auto justify-end ${isList ? 'sm:ml-auto sm:mr-4' : 'pt-4 border-t border-gray-50'}`}>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <button className="p-2 text-gray-400 bg-white border border-gray-100 hover:bg-gray-50 rounded-lg transition-all shadow-sm flex-shrink-0" title="Preview">
            <FiEye size={16} />
          </button>
          <button
            onClick={() => handleDownload(download)}
            disabled={isDownloading}
            className={`flex-1 sm:flex-none px-4 py-2 text-sm font-semibold transition-all flex items-center justify-center gap-2 rounded-lg shadow-sm ${
              isDownloading
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-[linear-gradient(135deg,#0f172a,#020617)] hover:opacity-90 text-white'
            }`}
          >
            {isDownloading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating {download.format}...</span>
              </>
            ) : (
              <>
                <FiDownload size={14} />
                <span>Download {download.format}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {!isList && (
        <div className="mt-4 pt-3 border-t border-gray-50 grid grid-cols-2 gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <FiFile size={14} />
            <span>{download.format} • {download.size}</span>
          </div>
          <div className="flex items-center gap-1 justify-end">
            <FiCalendar size={14} />
            <span>{formatDate(download.downloadDate)}</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const EmptyState = ({ searchTerm }) => (
  <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 border-dashed">
    <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
      <FiFolder className="text-4xl text-gray-300" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">
      {searchTerm ? 'No documents found' : 'No downloads yet'}
    </h3>
    <p className="text-gray-500 max-w-sm mx-auto mb-8 text-lg">
      {searchTerm ? 'Try adjusting your search terms or filters.' : 'Create your first professional resume to see it here.'}
    </p>
    {!searchTerm && (
      <button
        onClick={() => window.location.href = '/user/resume-builder'}
        className="px-6 py-2.5 bg-white text-gray-900 border border-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-sm"
      >
        Create New Resume
      </button>
    )}
  </div>
);

export default Downloads;