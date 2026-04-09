import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../api/axios';

export const useMyResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    format: 'all'
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  const fetchResumes = useCallback(async (page = 1, search = '', format = 'all') => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
        ...(search && { search }),
        ...(format !== 'all' && { format })
      });

      const response = await axiosInstance.get(`/api/user/resumes?${params}`);
      
      setResumes(response.data.resumes || []);
      setPagination(prev => ({
        ...prev,
        page: response.data.currentPage || 1,
        total: response.data.total || 0,
        totalPages: response.data.totalPages || 0
      }));
      setError(null);
    } catch (err) {
      console.error('Failed to fetch resumes:', err);
      setError('Failed to load resumes. Please try again.');
      // Fallback to mock data for development
      setResumes([
        {
          id: 1,
          title: "Senior Software Engineer",
          created: "2023-10-26",
          modified: "2 hours ago",
          format: "PDF",
          score: 75,
          color: "green",
        },
        {
          id: 2,
          title: "Marketing Manager - Tech",
          created: "2023-10-20",
          modified: "yesterday",
          format: "Word",
          score: 88,
          color: "blue",
        },
        {
          id: 3,
          title: "Product Manager Resume (Entry)",
          created: "2023-09-15",
          modified: "3 days ago",
          format: "PDF",
          score: 62,
          color: "orange",
        },
        {
          id: 4,
          title: "Data Analyst (Intern)",
          created: "2023-08-01",
          modified: "1 week ago",
          format: "PDF",
          score: 91,
          color: "green",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [pagination.limit]);

  const deleteResume = useCallback(async (resumeId) => {
    try {
      await axiosInstance.delete(`/api/user/resumes/${resumeId}`);
      setResumes(prev => prev.filter(resume => resume.id !== resumeId));
      setPagination(prev => ({
        ...prev,
        total: prev.total - 1
      }));
      return true;
    } catch (err) {
      console.error('Failed to delete resume:', err);
      setError('Failed to delete resume. Please try again.');
      return false;
    }
  }, []);

  const downloadResume = useCallback(async (resumeId, format = 'PDF') => {
    try {
      const response = await axiosInstance.get(`/api/user/resumes/${resumeId}/download?format=${format.toLowerCase()}`, {
        responseType: 'blob'
      });
      
      const blob = new Blob([response.data], {
        type: format === 'PDF' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      });
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `resume.${format.toLowerCase()}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      return true;
    } catch (err) {
      console.error('Failed to download resume:', err);
      setError('Failed to download resume. Please try again.');
      return false;
    }
  }, []);

  useEffect(() => {
    fetchResumes(pagination.page, filters.search, filters.format);
  }, [fetchResumes, pagination.page, filters.search, filters.format]);

  return {
    resumes,
    loading,
    error,
    filters,
    pagination,
    setFilters,
    fetchResumes,
    deleteResume,
    downloadResume
  };
};
