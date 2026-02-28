// COMPLETE FIXED CODE - UNIFIED PERFECT PREVIEW FOR PDF & WORD
import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from "../../../api/axios";
import {
  FiDownload, FiFile, FiCalendar, FiTrash2, FiSearch, FiFilter,
  FiFileText, FiEye, FiShare2, FiClock, FiTrendingUp, FiFolder,
  FiStar, FiEdit, FiCopy, FiRefreshCw, FiMoreVertical, FiLayout, FiList, FiGrid, FiChevronDown, FiCheck,
  FiChevronLeft, FiChevronRight, FiX
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
  const [deletingId, setDeletingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  const [previewDocument, setPreviewDocument] = useState(null);




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




  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedTypes, selectedFormats, sortBy]);




  useEffect(() => {
    const filtered = getFilteredDownloads();
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  }, [searchTerm, selectedTypes, selectedFormats, sortBy, downloads]);




  const handleResetSamples = () => {
    fetchDownloads();
    setOpenMenuId(null);
    setCurrentPage(1);
  };




  const handleView = async (download) => {
    try {
      console.log('Opening preview for:', download.type, download.name);
     
      // Fetch the individual download record to get the HTML content
      const response = await axiosInstance.get(`/api/downloads/${download.id}`);
      const fullDownloadRecord = response.data;
     
      console.log('Download record fetched:', {
        hasHtml: !!fullDownloadRecord.html,
        htmlLength: fullDownloadRecord.html?.length,
        type: fullDownloadRecord.type
      });
     
      setPreviewDocument({
        ...download,
        html: fullDownloadRecord.html // Use the HTML content from the database
      });
    } catch (error) {
      console.error('Error fetching download details:', error);
      // Fallback to basic preview
      setPreviewDocument(download);
    }
  };




  const handleDownload = async (download) => {
    try {
      // Use the existing backend endpoints for download
      let downloadUrl = '';
     
      if (download.format === 'PDF') {
        downloadUrl = `/api/downloads/${download.id}/pdf`;
      } else if (download.format === 'DOCX') {
        downloadUrl = `/api/downloads/${download.id}/word`;
      } else {
        // Default to PDF for other formats
        downloadUrl = `/api/downloads/${download.id}/pdf`;
      }
     
      // Fetch the file as blob
      const response = await axiosInstance.get(downloadUrl, {
        responseType: 'blob'
      });
     
      // Create blob from response
      const blob = new Blob([response.data], {
        type: download.format === 'PDF' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      });
     
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
     
      // Set filename
      const fileName = `${download.name.replace(/[^a-zA-Z0-9.-]/g, '_')}.${download.format.toLowerCase()}`;
      link.download = fileName;
     
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
     
      // Clean up URL
      window.URL.revokeObjectURL(url);
     
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download file. Please try again.');
    }
  };




  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await axiosInstance.delete(`/api/downloads/${id}`);
      setDownloads(downloads.filter(download => download.id !== id));
    } catch (error) {
      console.error('Error deleting download:', error);
    } finally {
      setDeletingId(null);
      setOpenMenuId(null);
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




  const getCurrentPageItems = () => {
    const filtered = getFilteredDownloads();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filtered.slice(startIndex, endIndex);
  };




  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };




  const nextPage = () => {
    console.log('nextPage called', { currentPage, totalPages });
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };




  const prevPage = () => {
    console.log('prevPage called', { currentPage, totalPages });
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };




  const stats = {
    total: downloads.length,
    resumes: downloads.filter(d => d.type === 'resume').length,
    coverLetters: downloads.filter(d => d.type === 'cover-letter').length,
    cvs: downloads.filter(d => d.type === 'cv').length,
    totalViews: downloads.reduce((sum, d) => sum + (d.views || 0), 0)
  };




  const filteredDownloads = getCurrentPageItems();
  const filteredTotal = getFilteredDownloads().length;




  const typeOptions = [
    { value: 'resume', label: 'Resumes' },
    { value: 'cover-letter', label: 'Cover Letters' },
    { value: 'cv', label: 'CVs' },
    { value: 'document', label: 'Documents' },
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




  // Calculate real template count
  const uniqueTemplates = [...new Set(downloads.filter(d => d.template).map(d => d.template))];
  const templateCount = uniqueTemplates.length;




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




  // 🔥 FIXED DocumentCardEnhanced - NO OVERLAP
  const DocumentCardEnhanced = ({
    download,
    viewMode,
    openMenuId,
    setOpenMenuId,
    handleDelete,
    deletingId,
    formatDate,
    handleView,
    handleDownload
  }) => {
    const isMenuOpen = openMenuId === download.id;
    const isDeleting = deletingId === download.id;




    const getFileIcon = (format, type) => {
      const iconPath = "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M6 15h2v2H6v-2zm0-4h2v2H6v-2zm0-4h2v2H6V7zm4 8h8v2h-8v-2zm0-4h8v2h-8v-2zm0-4h8v2h-8V7z";
      let iconColorClass = 'text-gray-500';




      switch (format.toLowerCase()) {
        case 'pdf':
          iconColorClass = 'text-red-500';
          break;
        case 'doc':
        case 'docx':
          iconColorClass = 'text-blue-500';
          break;
        default:
          iconColorClass = 'text-gray-500';
          break;
      }




      return (
        <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
          <svg className={`w-6 h-6 ${iconColorClass}`} fill="currentColor" viewBox="0 0 24 24">
            <path d={iconPath} />
          </svg>
        </div>
      );
    };




    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        className="group bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
      >
        <div className="p-4">
          {/* Header with icon */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0">
              {getFileIcon(download.format, download.type)}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-gray-900 text-sm leading-tight truncate">
                {download.name}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5 truncate">
                {download.template ? `${download.template} Template` : download.type.replace('-', ' ').toUpperCase()}
              </p>
              <div className="flex items-center gap-1 mt-2 text-xs font-medium text-gray-700 bg-gray-50 px-2 py-1 rounded-md inline-block">
                <FiClock size={11} className="text-gray-500" />
                {formatDate(download.downloadDate)}
              </div>
            </div>
          </div>




          {/* Action buttons */}
          <div className="flex items-center justify-end mt-3">
            <button
              onClick={() => handleDelete(download.id)}
              disabled={isDeleting}
              className={`py-2 px-3 text-xs font-medium rounded-md transition-colors ${
                isDeleting
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {isDeleting ? (
                <span className="flex items-center justify-center gap-1">
                  <div className="w-3 h-3 border border-gray-300 border-t-transparent rounded-full animate-spin" />
                  Deleting...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-1">
                  <FiTrash2 size={12} />
                  Delete
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    );
  };




  const StatsCardCompact = ({ label, value, trend, trendType, icon, color }) => (
    <motion.div
      whileHover={{ y: -4 }}
      className="group bg-white/90 backdrop-blur-sm border border-white/50 hover:border-gray-200 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`p-3 rounded-xl bg-gradient-to-br from-white to-gray-50/50 border border-gray-100/50 shadow-sm group-hover:shadow-md transition-all`}>
         <div className="w-10 h-10 flex items-center justify-center">
          {React.cloneElement(icon, { size: 20, className: `text-${color}-600` })}
        </div>
        </div>
       
        {trend && (
         <div className={`text-xs font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1 shadow-sm ${
          trendType === 'up'
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
            : 'bg-red-50 text-red-700 border border-red-100'
        }`}>
          <span>{trendType === 'up' ? '↑' : '↓'}</span>
          <span>{trend}</span>
        </div>
        )}
      </div>
     
      <p className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">
        {label}
      </p>
      <h3 className="text-2xl font-black text-gray-900 mb-3">
        {value}
      </h3>
     
      <div className="h-1.5 bg-gray-100/50 rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
        <div className="h-full bg-gradient-to-r from-gray-400 to-gray-500 rounded-full w-4/5 transition-all duration-700 origin-left shadow-sm" />
      </div>
    </motion.div>
  );




  const EmptyState = ({ searchTerm }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-28 bg-white/70 backdrop-blur-xl rounded-3xl border-2 border-white/50 shadow-2xl"
    >
      <div className="bg-gradient-to-br from-gray-100/50 to-gray-200/50 w-32 h-32 rounded-2xl flex items-center justify-center mx-auto mb-10 shadow-xl border border-gray-200/50 backdrop-blur-sm">
        <FiFolder className="text-6xl text-gray-400" />
      </div>
      <h3 className="text-3xl font-black text-gray-900 mb-4">
        {searchTerm ? 'No documents found' : 'No downloads yet'}
      </h3>
      <p className="text-gray-600 max-w-lg mx-auto mb-12 text-xl font-medium leading-relaxed">
        {searchTerm ? 'Try adjusting your search terms or filters.' : 'Create your first professional resume to see it here.'}
      </p>
      {!searchTerm && (
        <motion.button
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.98 }}
         onClick={() => window.location.href = '/user/resume-builder'}
         className="px-10 py-5 bg-gradient-to-r from-gray-900 to-black text-white border-2 border-gray-900 rounded-2xl font-black text-lg hover:from-gray-800 hover:to-gray-950 transition-all shadow-2xl hover:shadow-3xl backdrop-blur-sm"
        >
          Create New Resume
        </motion.button>
      )}
    </motion.div>
  );




  return (
    <>
      <UserNavBar />
      <div className="min-h-screen bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                  My Downloads
                </h1>
                <p className="text-gray-600 text-lg">
                  Manage and download your professional documents
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Documents</p>
                  <p className="text-2xl font-bold text-gray-900">{downloads.length}</p>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <button
                  onClick={handleResetSamples}
                  disabled={isRefreshing}
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl font-medium hover:from-gray-800 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiRefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
                  <span className="ml-2">Refresh</span>
                </button>
              </div>
            </div>
          </div>




          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="relative bg-white border-2 border-gray-200 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300 rounded-xl">
                  <FiFolder className="text-blue-600" size={24} />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-gray-900">{stats.total}</p>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-4">Total Files</h3>
            </div>




            <div className="relative bg-white border-2 border-gray-200 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300 rounded-xl">
                  <FiFileText className="text-emerald-600" size={24} />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-gray-900">{stats.resumes}</p>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-4">Resumes</h3>
            </div>




            <div className="relative bg-white border-2 border-gray-200 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300 rounded-xl">
                  <FiEdit className="text-purple-600" size={24} />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-gray-900">{stats.coverLetters}</p>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-4">Cover Letters</h3>
            </div>




            <div className="relative bg-white border-2 border-gray-200 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300 rounded-xl">
                  <FiFileText className="text-amber-600" size={24} />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-gray-900">{stats.cvs}</p>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-4">CV Documents</h3>
            </div>
          </div>




          {/* Search and Filter Bar */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-8 border border-gray-200">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search documents by name, type, or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-base"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      <FiX className="h-5 w-5 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>
             
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="filter-trigger inline-flex items-center justify-center px-6 py-4 rounded-xl font-medium text-base bg-white text-gray-700 border-2 border-gray-300"
              >
                <FiFilter className="h-5 w-5 mr-2" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-white border border-gray-800">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>




            {/* Filter Panel */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="filter-dropdown mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 overflow-hidden"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3 sm:mb-4">Document Type</h3>
                      <div className="space-y-2 sm:space-y-3">
                        {typeOptions.map((option) => (
                          <label key={option.value} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg">
                            <input
                              type="checkbox"
                              checked={selectedTypes.includes(option.value)}
                              onChange={() => toggleType(option.value)}
                              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 border-gray-300 rounded focus:ring-2 focus:ring-gray-500"
                            />
                            <span className="text-gray-700 font-medium text-sm sm:text-base">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3 sm:mb-4">File Format</h3>
                      <div className="space-y-2 sm:space-y-3">
                        {formatOptions.map((option) => (
                          <label key={option.value} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg">
                            <input
                              type="checkbox"
                              checked={selectedFormats.includes(option.value)}
                              onChange={() => toggleFormat(option.value)}
                              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 border-gray-300 rounded focus:ring-2 focus:ring-gray-500"
                            />
                            <span className="text-gray-700 font-medium text-sm sm:text-base">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  {(selectedTypes.length > 0 || selectedFormats.length > 0) && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <button
                        onClick={() => { setSelectedTypes([]); setSelectedFormats([]); }}
                        className="text-gray-600 font-medium text-sm"
                      >
                        Clear all filters
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>




          {/* 🔥 FIXED Content Area - gap-6 instead of gap-4 */}
          {filteredDownloads.length === 0 ? (
            <EmptyState searchTerm={searchTerm} />
          ) : (
            <>
            {/* Results Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {filteredTotal} {filteredTotal === 1 ? 'Document' : 'Documents'}
                  {filteredTotal !== downloads.length && ` (${downloads.length} total)`}
                </h2>
                <div className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </div>
              </div>
            </div>




            {/* Document Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {filteredDownloads.map((download) => (
                <DocumentCardEnhanced
                  key={download.id}
                  download={download}
                  viewMode={viewMode}
                  openMenuId={openMenuId}
                  setOpenMenuId={setOpenMenuId}
                  handleDelete={handleDelete}
                  deletingId={deletingId}
                  formatDate={formatDate}
                  handleView={handleView}
                  handleDownload={handleDownload}
                />
              ))}
            </div>




            {/* Professional Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 sm:py-6 border-t border-gray-200">
                <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                  <span className="hidden sm:inline">Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredTotal)} of {filteredTotal} documents</span>
                  <span className="sm:hidden">{((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredTotal)} of {filteredTotal}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded hover:bg-gray-50 transition-colors border border-gray-300"
                  >
                    <FiChevronLeft size={14} />
                  </button>
                 
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      // Show current page and 2 pages before/after, or first 5 pages
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                     
                      return (
                        <button
                          key={pageNum}
                          onClick={() => goToPage(pageNum)}
                          className={`w-7 h-7 sm:w-9 sm:h-9 text-xs sm:text-sm font-medium rounded transition-colors border ${
                            currentPage === pageNum
                              ? 'bg-gray-800 text-white border-gray-800'
                              : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                 
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded hover:bg-gray-50 transition-colors border border-gray-300"
                  >
                    <FiChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}




            {/* Footer */}
            <footer className="mt-12 sm:mt-20 border-t border-gray-100 pt-6 sm:pt-8 text-center text-[11px] sm:text-[13px] text-gray-400">
              © {new Date().getFullYear()} ResumeAI Inc. All rights reserved.
            </footer>
          </>
          )}




          {/* 🔥 FIXED Preview Modal - UNIFIED PERFECT PREVIEW FOR PDF & WORD */}
          <AnimatePresence>
            {previewDocument && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4"
                onClick={() => setPreviewDocument(null)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[85vh] sm:max-h-[90vh] overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">{previewDocument.name}</h2>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">
                        {previewDocument.template ? `${previewDocument.template} Template` : previewDocument.type.replace('-', ' ').toUpperCase()} • {previewDocument.format}
                      </p>
                    </div>
                    <button
                      onClick={() => setPreviewDocument(null)}
                      className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                    >
                      <FiX size={20} />
                    </button>
                  </div>




                  {/* Modal Content */}
                  <div className="p-4 sm:p-6">
                    <div className="bg-gray-50 rounded-lg p-4 sm:p-8 max-h-[40vh] sm:max-h-[50vh] overflow-y-auto">
                      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        {/* 🔥 UNIFIED PREVIEW - SAME PERFECT STYLE FOR PDF & WORD */}
                        <div
                          className="w-full p-6 sm:p-8 text-sm sm:text-base leading-relaxed"
                          style={{
                            fontSize: '11pt',
                            lineHeight: '1.6',
                            fontFamily: '"Georgia", "Times New Roman", Times, serif',
                            color: '#1f2937',
                            maxWidth: '100%'
                          }}
                          dangerouslySetInnerHTML={{
                            __html: previewDocument.html ||
                              `<div class="text-center text-gray-500 py-12 px-4">
                                <FiFile class="mx-auto text-6xl mb-6 text-gray-300" />
                                <h3 class="text-xl font-semibold mb-2 text-gray-900">Document Preview Not Available</h3>
                                <p class="mb-8">Please download the file to view the complete document content.</p>
                                <div class="w-24 h-24 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border-2 border-dashed border-gray-200">
                                  <FiDownload class="text-3xl text-blue-500" />
                                </div>
                              </div>`
                          }}
                        />
                      </div>
                    </div>
                   
                    {/* Document info footer */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mt-4">
                      <span>Size: {previewDocument.size}</span>
                      <span>•</span>
                      <span>Format: {previewDocument.format}</span>
                      <span>•</span>
                      <span>Downloaded: {formatDate(previewDocument.downloadDate)}</span>
                    </div>
                  </div>




                  {/* Modal Footer */}
                  <div className="flex flex-col sm:flex-row items-center justify-end gap-3 p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
                    <button
                      onClick={() => setPreviewDocument(null)}
                      className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        handleDownload(previewDocument);
                      }}
                      className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg hover:from-gray-900 hover:to-black transition-all font-medium text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      <FiDownload size={16} />
                      Download
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};




export default Downloads;