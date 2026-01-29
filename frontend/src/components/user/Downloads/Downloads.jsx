import React, { useState, useEffect } from 'react';
import { 
  FiDownload, FiFile, FiCalendar, FiTrash2, FiSearch, FiFilter,
  FiFileText, FiEye, FiShare2, FiClock, FiTrendingUp, FiFolder,
  FiStar, FiEdit, FiCopy, FiRefreshCw
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { initializeSampleData } from '../../../utils/sampleDownloadsData';

const Downloads = () => {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchDownloads();
  }, []);

  const fetchDownloads = () => {
    try {
      setIsRefreshing(true);
      setLoading(true);
      
      // Get real-time data from localStorage (dynamically updated)
      const savedDownloads = localStorage.getItem('resumeDownloads');
      let allDownloads = [];
      
      if (savedDownloads) {
        allDownloads = JSON.parse(savedDownloads);
        
        // Update with current timestamp for "recent" calculations
        allDownloads = allDownloads.map(download => ({
          ...download,
          views: download.views !== undefined ? download.views : 0,
          starred: download.starred !== undefined ? download.starred : false,
          color: download.color || (download.type === 'resume' ? 'blue' : download.type === 'cover-letter' ? 'purple' : 'green'),
          // Recalculate file size dynamically if needed
          size: download.size || '250 KB',
          // Ensure format is set
          format: download.format || 'PDF'
        }));
      } else {
        // Initialize with sample data only on first load
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
  };

  const toggleStar = (id) => {
    const updatedDownloads = downloads.map(download =>
      download.id === id ? { ...download, starred: !download.starred } : download
    );
    setDownloads(updatedDownloads);
    localStorage.setItem('resumeDownloads', JSON.stringify(updatedDownloads));
  };

  const handleDownload = (download) => {
    // Increment view count dynamically
    const updatedDownloads = downloads.map(d =>
      d.id === download.id ? { ...d, views: (d.views || 0) + 1, lastDownloaded: new Date().toISOString() } : d
    );
    setDownloads(updatedDownloads);
    localStorage.setItem('resumeDownloads', JSON.stringify(updatedDownloads));

    // Trigger actual download
    if (download.url) {
      const link = document.createElement('a');
      link.href = download.url;
      link.download = download.name || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    // Show download notification
    console.log(`Downloaded: ${download.name} - Views: ${(download.views || 0) + 1}`);
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

    // Filter by type (resume, cover-letter, or all)
    if (filterType === 'resume' || filterType === 'cover-letter') {
      filtered = filtered.filter(d => d.type === filterType);
    }

    // Search
    if (searchTerm) {
      filtered = filtered.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.template?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort based on filterType selection
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your downloads...</p>
        </div>
      </div>
    );
  }

  const filteredDownloads = getFilteredDownloads();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 font-outfit">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 max-w-7xl">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <div className="mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-2">
              Download Manager
            </h1>
            <p className="text-sm sm:text-base text-gray-600 flex items-center gap-2">
              <FiFolder className="text-blue-500" />
              Manage your resumes, cover letters, and documents
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm">Total Downloads</p>
                  <p className="text-xl sm:text-2xl font-bold text-black">{stats.total}</p>
                </div>
                <div className="bg-gray-100 p-2 sm:p-3 rounded-lg">
                  <FiDownload className="text-gray-600 text-lg sm:text-xl" />
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm">Resumes</p>
                  <p className="text-xl sm:text-2xl font-bold text-black">{stats.resumes}</p>
                </div>
                <div className="bg-gray-100 p-2 sm:p-3 rounded-lg">
                  <FiFileText className="text-gray-600 text-lg sm:text-xl" />
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm">Cover Letters</p>
                  <p className="text-xl sm:text-2xl font-bold text-black">{stats.coverLetters}</p>
                </div>
                <div className="bg-gray-100 p-2 sm:p-3 rounded-lg">
                  <FiEdit className="text-gray-600 text-lg sm:text-xl" />
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm">Total Views</p>
                  <p className="text-xl sm:text-2xl font-bold text-black">{stats.totalViews}</p>
                </div>
                <div className="bg-gray-100 p-2 sm:p-3 rounded-lg">
                  <FiTrendingUp className="text-gray-600 text-lg sm:text-xl" />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 mb-4 sm:mb-6 border border-gray-100"
        >
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search by name or template..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              {/* Filter by Type with All options */}
              <div className="relative flex-1 sm:flex-none">
                <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full sm:w-auto pl-9 sm:pl-10 pr-8 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none appearance-none bg-white cursor-pointer sm:min-w-[160px]"
                >
                  <option value="all">All Types</option>
                  <option value="resume">Resumes</option>
                  <option value="cover-letter">Cover Letters</option>
                  <option value="recent">Most Recent</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="views">Most Viewed</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex gap-1 sm:gap-2 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md transition-all font-medium ${
                    viewMode === 'grid' 
                      ? 'bg-white shadow-md text-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md transition-all font-medium ${
                    viewMode === 'list' 
                      ? 'bg-white shadow-md text-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchTerm || filterType !== 'all') && (
            <div className="flex flex-wrap items-center gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
              <span className="text-xs sm:text-sm text-gray-600 font-medium">Active filters:</span>
              {searchTerm && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2">
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="hover:text-blue-900">×</button>
                </span>
              )}
              {filterType === 'resume' && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-2">
                  Type: Resumes
                  <button onClick={() => setFilterType('all')} className="hover:text-purple-900">×</button>
                </span>
              )}
              {filterType === 'cover-letter' && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-2">
                  Type: Cover Letters
                  <button onClick={() => setFilterType('all')} className="hover:text-purple-900">×</button>
                </span>
              )}
              {filterType === 'recent' && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-2">
                  Sort: Most Recent
                  <button onClick={() => setFilterType('all')} className="hover:text-green-900">×</button>
                </span>
              )}
              {filterType === 'name' && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-2">
                  Sort: Name (A-Z)
                  <button onClick={() => setFilterType('all')} className="hover:text-green-900">×</button>
                </span>
              )}
              {filterType === 'views' && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-2">
                  Sort: Most Viewed
                  <button onClick={() => setFilterType('all')} className="hover:text-green-900">×</button>
                </span>
              )}
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('all');
                }}
                className="px-3 py-1 text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear all
              </button>
            </div>
          )}
        </motion.div>

        {/* Downloads Grid/List */}
        {filteredDownloads.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 sm:py-20 bg-white rounded-lg sm:rounded-xl shadow-md px-4"
          >
            <div className="bg-blue-100 w-16 h-16 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <FiDownload className="text-3xl sm:text-5xl text-blue-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              {searchTerm ? 'No downloads found' : 'No downloads yet'}
            </h3>
            <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">
              {searchTerm 
                ? 'Try adjusting your search or filters' 
                : 'Start creating resumes and they will appear here'}
            </p>
            <button
              onClick={() => window.location.href = '/user/resume-builder'}
              className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
            >
              Create Your First Resume
            </button>
          </motion.div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6' : 'space-y-3 sm:space-y-4'}>
            <AnimatePresence>
              {filteredDownloads.map((download, index) => (
                <motion.div
                  key={download.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group ${
                    viewMode === 'list' ? 'flex items-center' : ''
                  }`}
                >
                  <div className={`p-3 sm:p-4 lg:p-6 ${viewMode === 'list' ? 'flex items-center w-full gap-3 sm:gap-4' : ''}`}>
                    <div className={`flex items-start ${viewMode === 'list' ? 'flex-row gap-3 sm:gap-4 flex-1' : 'mb-3 sm:mb-4'}`}>
                      <div className={`flex items-center gap-3 sm:gap-4 ${viewMode === 'list' ? 'flex-1' : 'flex-1'}`}>
                        <div className="bg-gray-100 p-2 sm:p-3 rounded-lg group-hover:scale-110 transition-transform">
                          <FiFileText className="text-xl sm:text-2xl text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-800 text-sm sm:text-base lg:text-lg mb-1 group-hover:text-blue-600 transition-colors truncate">
                            {download.name}
                          </h3>
                          <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <FiClock className="w-3 h-3" />
                              <span className="hidden sm:inline">{formatDate(download.downloadDate)}</span>
                              <span className="sm:hidden">{formatDate(download.downloadDate).split(' ')[0]}</span>
                            </span>
                            <span className="hidden sm:inline">•</span>
                            <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs font-medium">
                              {download.format}
                            </span>
                            <span className="hidden sm:inline">•</span>
                            <span className="hidden sm:inline">{download.size}</span>
                          </div>
                          {download.template && (
                            <p className="text-xs text-gray-400 mt-1 truncate">Template: {download.template}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {download.views !== undefined && viewMode === 'grid' && (
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <FiEye />
                        <span>{download.views} views</span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className={`flex flex-wrap gap-1.5 sm:gap-2 ${viewMode === 'list' ? 'ml-auto' : 'mt-3 sm:mt-4'}`}>
                      <button
                        className="p-1.5 sm:p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        title="Edit"
                      >
                        <FiEdit className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                      </button>
                      <button
                        className="p-1.5 sm:p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        title="Share"
                      >
                        <FiShare2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDownload(download)}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center gap-1.5 sm:gap-2 font-medium whitespace-nowrap"
                      >
                        <FiDownload className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Download</span>
                      </button>
                      <button
                        onClick={() => handleDelete(download.id)}
                        className="p-1.5 sm:p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        title="Delete"
                      >
                        <FiTrash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Downloads;
