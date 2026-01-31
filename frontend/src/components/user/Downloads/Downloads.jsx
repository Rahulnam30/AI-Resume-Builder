import React, { useState, useEffect, useRef } from 'react';
import {
  FiDownload, FiFile, FiCalendar, FiTrash2, FiSearch, FiFilter,
  FiFileText, FiEye, FiShare2, FiClock, FiTrendingUp, FiFolder,
  FiStar, FiEdit, FiCopy, FiRefreshCw, FiMoreVertical, FiLayout, FiList, FiGrid, FiChevronDown, FiCheck
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { initializeSampleData } from '../../../utils/sampleDownloadsData';
import UserNavBar from '../UserNavBar/UserNavBar';

const Downloads = () => {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
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
    let filtered = downloads;

    if (filterType === 'resume' || filterType === 'cover-letter') {
      filtered = filtered.filter(d => d.type === filterType);
    }

    if (searchTerm) {
      filtered = filtered.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.template?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType === 'recent' || filterType === 'all') {
      filtered = filtered.sort((a, b) => new Date(b.downloadDate) - new Date(a.downloadDate));
    } else if (filterType === 'name') {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filterType === 'views') {
      filtered = filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
    }

    return filtered;
  };

  const stats = {
    total: downloads.length,
    resumes: downloads.filter(d => d.type === 'resume').length,
    coverLetters: downloads.filter(d => d.type === 'cover-letter').length,
    totalViews: downloads.reduce((sum, d) => sum + (d.views || 0), 0)
  };

  const filteredDownloads = getFilteredDownloads();

  const filterOptions = [
    { value: 'all', label: 'All Documents' },
    { value: 'resume', label: 'Resumes Only' },
    { value: 'cover-letter', label: 'Cover Letters' },
    { value: 'recent', label: 'Most Recent' },
    { value: 'views', label: 'Most Viewed' },
  ];

  const activeFilterLabel = filterOptions.find(f => f.value === filterType)?.label || 'Filter';

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
    <div className="min-h-screen bg-white pb-12">
      <UserNavBar />

      <div className="max-w-[1100px] mx-auto px-4 lg:px-8 py-8">

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
              label="Total Views"
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
                      <FiFilter size={16} className={isFilterOpen ? 'text-blue-500' : 'text-gray-500'} />
                      <span>{activeFilterLabel}</span>
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
                        <h6 className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Filter Documents
                        </h6>
                        {filterOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setFilterType(option.value);
                              setIsFilterOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-gray-50 transition-colors ${filterType === option.value ? 'text-blue-600 font-medium bg-blue-50/50' : 'text-gray-700'
                              }`}
                          >
                            {option.label}
                            {filterType === option.value && <FiCheck size={14} />}
                          </button>
                        ))}
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
          flex items-center justify-center rounded-lg bg-blue-50 text-blue-600
          ${isList ? 'w-10 h-10' : 'w-12 h-12'}
        `}>
          <FiFileText size={isList ? 18 : 22} />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 truncate pr-6 text-[15px]" title={download.name}>
            {download.name}
          </h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-xs font-medium text-gray-500">
            <span className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-md text-gray-600 uppercase tracking-wide">
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
