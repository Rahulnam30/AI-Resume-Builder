import React, { useState, useEffect, useRef } from 'react';
import {
  FiDownload, FiFile, FiCalendar, FiTrash2, FiSearch, FiFilter,
  FiFileText, FiEye, FiShare2, FiClock, FiTrendingUp, FiFolder,
  FiStar, FiEdit, FiCopy, FiRefreshCw, FiMoreVertical, FiLayout, FiList, FiGrid, FiChevronDown, FiCheck
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { initializeSampleData, generateSampleDownloads } from '../../../utils/sampleDownloadsData';
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

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close Item Menu
      if (openMenuId && !event.target.closest('.menu-trigger') && !event.target.closest('.menu-dropdown')) {
        setOpenMenuId(null);
      }
      // Close Filter Dropdown
      if (isFilterOpen && !event.target.closest('.filter-trigger') && !event.target.closest('.filter-dropdown')) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenuId, isFilterOpen]);

  useEffect(() => {
    fetchDownloads();
  }, []);

  const fetchDownloads = () => {
    try {
      setIsRefreshing(true);
      setLoading(true);

      const savedDownloads = localStorage.getItem('resumeDownloads');
      let allDownloads = [];

      if (savedDownloads) {
        allDownloads = JSON.parse(savedDownloads);
        allDownloads = allDownloads.map(download => ({
          ...download,
          views: download.views !== undefined ? download.views : 0,
          starred: download.starred !== undefined ? download.starred : false,
          color: download.color || (download.type === 'resume' ? 'blue' : download.type === 'cover-letter' ? 'purple' : 'green'),
          size: download.size || '250 KB',
          format: download.format || 'PDF'
        }));
      } else {
        allDownloads = initializeSampleData();
      }

      setDownloads(allDownloads);
      setLoading(false);
      setIsRefreshing(false);
    } catch (error) {
      console.error('Error loading downloads:', error);
      setDownloads([]);
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleDelete = (id) => {
    const updatedDownloads = downloads.filter(download => download.id !== id);
    setDownloads(updatedDownloads);
    localStorage.setItem('resumeDownloads', JSON.stringify(updatedDownloads));
    setOpenMenuId(null);
  };

  const handleDownload = (download) => {
    const updatedDownloads = downloads.map(d =>
      d.id === download.id ? { ...d, views: (d.views || 0) + 1, lastDownloaded: new Date().toISOString() } : d
    );
    setDownloads(updatedDownloads);
    localStorage.setItem('resumeDownloads', JSON.stringify(updatedDownloads));

    if (download.url) {
      const link = document.createElement('a');
      link.href = download.url;
      link.download = download.name || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleResetSamples = () => {
    const sampleData = generateSampleDownloads();
    setDownloads(sampleData);
    localStorage.setItem('resumeDownloads', JSON.stringify(sampleData));
    setOpenMenuId(null);
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

    // Filter by Type
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(d => selectedTypes.includes(d.type));
    }

    // Filter by Format
    if (selectedFormats.length > 0) {
      filtered = filtered.filter(d => selectedFormats.includes(d.format));
    }

    // Search term filter
    if (searchTerm) {
      filtered = filtered.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (d.template && d.template.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort
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

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'views', label: 'Most Viewed' },
    { value: 'name', label: 'By Name' },
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
          <p className="text-gray-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <UserNavBar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 font-outfit">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 max-w-7xl">

          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Download Manager
                </h1>
                <p className="text-sm sm:text-base text-gray-500 flex items-center gap-2">
                  Manage and track all your ResumeAI documents
                </p>
              </div>
              <button
                onClick={handleResetSamples}
                className="w-fit flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-semibold hover:bg-indigo-100 transition-colors border border-indigo-100"
              >
                <FiRefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                Refresh
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5 mb-12">
              <StatsCard
                label="Total Files"
                value={stats.total}
                icon={<FiFolder />}
              />
              <StatsCard
                label="Resumes"
                value={stats.resumes}
                icon={<FiFileText />}
              />
              <StatsCard
                label="Cover Letters"
                value={stats.coverLetters}
                icon={<FiEdit />}
              />
              <StatsCard
                label="CVs"
                value={stats.cvs}
                icon={<FiFile />}
              />
              <StatsCard
                label="Views"
                value={stats.totalViews}
                icon={<FiTrendingUp />}
              />
            </div>
          </div>

          {/* Controls Section*/}
          <div className="sticky top-4 z-30 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
              <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">

                {/* Search Pill */}
                <div className="relative flex-1 group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    <FiSearch size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search your documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-transparent rounded-xl outline-none text-gray-700 placeholder-gray-400 focus:bg-gray-50/50 transition-all text-[15px]"
                  />
                </div>

                <div className="h-8 w-[1px] bg-gray-200 hidden lg:block"></div>

                <div className="flex items-center gap-2 w-full lg:w-auto p-1">

                  {/* Custom Filter Dropdown */}
                  <div className="relative flex-1 lg:flex-none">
                    <button
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                      className={`filter-trigger flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border w-full lg:w-48 justify-between ${isFilterOpen
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-gray-50 text-gray-700 border-transparent hover:bg-gray-100'
                        }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FiFilter size={16} className={isFilterOpen || activeFilterCount > 0 ? 'text-blue-500' : 'text-gray-500'} />
                        <span>{activeFilterCount > 0 ? `${activeFilterCount} Filters` : 'All Documents'}</span>
                      </div>
                      <FiChevronDown size={14} className={`transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isFilterOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.1 }}
                          className="filter-dropdown absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-2xl py-1.5 z-50 origin-top-right"
                        >
                          <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
                            <h6 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                              Filter Documents
                            </h6>
                            {(selectedTypes.length > 0 || selectedFormats.length > 0) && (
                              <button
                                onClick={() => { setSelectedTypes([]); setSelectedFormats([]); }}
                                className="text-[10px] text-blue-600 font-semibold hover:underline"
                              >
                                Reset
                              </button>
                            )}
                          </div>

                          <div className="p-2">
                            <p className="px-2 py-1.5 text-[10px] font-bold text-gray-400 uppercase">Document Type</p>
                            {typeOptions.map((option) => (
                              <button
                                key={option.value}
                                onClick={() => toggleType(option.value)}
                                className={`w-full text-left px-3 py-2 text-sm flex items-center gap-3 hover:bg-gray-50 rounded-lg transition-colors ${selectedTypes.includes(option.value) ? 'text-blue-600 font-medium bg-blue-50/50' : 'text-gray-600'}`}
                              >
                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${selectedTypes.includes(option.value) ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                                  {selectedTypes.includes(option.value) && <FiCheck size={10} className="text-white" />}
                                </div>
                                {option.label}
                              </button>
                            ))}
                          </div>

                          <div className="p-2 border-t border-gray-50">
                            <p className="px-2 py-1.5 text-[10px] font-bold text-gray-400 uppercase">File Format</p>
                            {formatOptions.map((option) => (
                              <button
                                key={option.value}
                                onClick={() => toggleFormat(option.value)}
                                className={`w-full text-left px-3 py-2 text-sm flex items-center gap-3 hover:bg-gray-50 rounded-lg transition-colors ${selectedFormats.includes(option.value) ? 'text-blue-600 font-medium bg-blue-50/50' : 'text-gray-600'}`}
                              >
                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${selectedFormats.includes(option.value) ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                                  {selectedFormats.includes(option.value) && <FiCheck size={10} className="text-white" />}
                                </div>
                                {option.label}
                              </button>
                            ))}
                          </div>

                          <div className="p-2 border-t border-gray-50">
                            <p className="px-2 py-1.5 text-[10px] font-bold text-gray-400 uppercase">Sort By</p>
                            {sortOptions.map((option) => (
                              <button
                                key={option.value}
                                onClick={() => setSortBy(option.value)}
                                className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-gray-50 rounded-lg transition-colors ${sortBy === option.value ? 'text-blue-600 font-medium bg-blue-50/50' : 'text-gray-600'}`}
                              >
                                {option.label}
                                {sortBy === option.value && <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          {filteredDownloads.length === 0 ? (
            <EmptyState searchTerm={searchTerm} />
          ) : (
            <div
              className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}
            >
              {filteredDownloads.map((download) => (
                <DocumentCard
                  key={download.id}
                  download={download}
                  viewMode={viewMode}
                  openMenuId={openMenuId}
                  setOpenMenuId={setOpenMenuId}
                  handleDelete={handleDelete}
                  handleDownload={handleDownload}
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

// Sub-components for cleaner code
const StatsCard = ({ label, value, icon }) => (
  <motion.div
    whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
    className="bg-white rounded-2xl p-[18px_22px] shadow-[0_1px_6px_rgba(0,0,0,0.08)] transition-all duration-300"
  >
    <div className="flex items-center gap-1.5">
      <p className="text-xs text-gray-500 font-medium">{label}</p>
      <div className="text-sm text-gray-400">
        {icon}
      </div>
    </div>
    <h3 className="text-3xl font-bold text-gray-900 mt-1.5">{value}</h3>
  </motion.div>
);

const DocumentCard = ({
  download, viewMode, openMenuId, setOpenMenuId, handleDelete, handleDownload, formatDate
}) => {
  const isMenuOpen = openMenuId === download.id;
  const isList = viewMode === 'list';

  return (
    <motion.div
      className={`group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 relative overflow-visible ${isList ? 'flex flex-col sm:flex-row sm:items-center p-3 gap-4 sm:gap-5' : 'p-5 flex flex-col h-full'
        }`}
    >
      {/* Top Right Menu */}
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

        {isMenuOpen && (
          <div className="menu-dropdown absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-200">
            <button
              className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2.5 transition-colors font-medium"
              onClick={() => console.log('Edit clicked')}
            >
              <FiEdit size={15} /> Edit
            </button>
            <button
              className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors font-medium"
              onClick={() => handleDelete(download.id)}
            >
              <FiTrash2 size={15} /> Delete
            </button>
          </div>
        )}
      </div>

      <div className={`flex items-center gap-4 ${isList ? 'flex-1' : 'mb-6'}`}>
        <div className={`
          flex items-center justify-center rounded-lg
          ${isList ? 'w-10 h-10' : 'w-12 h-12'}
          ${download.type === 'resume' ? 'bg-blue-50 text-blue-600' :
            download.type === 'cover-letter' ? 'bg-purple-50 text-purple-600' :
              'bg-emerald-50 text-emerald-600'}
        `}>
          {download.type === 'resume' ? <FiFileText size={isList ? 18 : 22} /> :
            download.type === 'cover-letter' ? <FiEdit size={isList ? 18 : 22} /> :
              <FiFile size={isList ? 18 : 22} />}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 truncate pr-6 text-[15px]" title={download.name}>
            {download.name}
          </h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-xs font-medium text-gray-500">
            <span className={`flex items-center gap-1.5 border px-2.5 py-1 rounded-md uppercase tracking-wide
              ${download.type === 'resume' ? 'bg-blue-50/50 border-blue-100 text-blue-700' :
                download.type === 'cover-letter' ? 'bg-purple-50/50 border-purple-100 text-purple-700' :
                  'bg-emerald-50/50 border-emerald-100 text-emerald-700'}
            `}>
              {download.format}
            </span>
            <span className="flex items-center gap-1.5">
              <FiClock size={13} /> {formatDate(download.downloadDate)}
            </span>
            <span>{download.size}</span>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className={`flex items-center gap-3 mt-auto justify-end ${isList ? 'sm:ml-auto sm:mr-4' : 'pt-4 border-t border-gray-50'}`}>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <button
            className="p-2 text-gray-400 bg-white border border-gray-100 hover:bg-gray-50 rounded-lg transition-all shadow-sm flex-shrink-0"
            title="Preview"
          >
            <FiEye size={16} />
          </button>
          <button
            onClick={() => handleDownload(download)}
            className="flex-1 sm:flex-none px-4 py-2 text-sm font-semibold text-white bg-[linear-gradient(135deg,#0f172a,#020617)] hover:opacity-90 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <FiDownload size={14} />
            <span>Download</span>
          </button>
        </div>
      </div>
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
