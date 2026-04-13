import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State management
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Mobile detection
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsCollapsed(!mobile);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation handler
  const handleNavigate = useCallback((path) => {
    navigate(path);
    setIsMobileOpen(false);
  }, [navigate]);

  // Toggle handlers
  const toggleMobileSidebar = useCallback(() => {
    setIsMobileOpen(prev => !prev);
  }, []);

  const toggleCollapsed = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  // Close mobile sidebar
  const closeMobileSidebar = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  // Logout handler
  const handleLogout = useCallback(() => {
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.clear();
    
    // Close mobile sidebar
    setIsMobileOpen(false);
    
    // Navigate and reload
    setTimeout(() => {
      navigate('/', { replace: true });
      window.location.reload();
    }, 100);
  }, [navigate]);

  // Hover handlers
  const handleItemHover = useCallback((itemId) => {
    setHoveredItem(itemId);
  }, []);

  const handleItemLeave = useCallback(() => {
    setHoveredItem(null);
  }, []);

  // Check if route is active
  const isRouteActive = useCallback((path) => {
    if (path === '/user/dashboard') {
      return location.pathname === '/user/dashboard';
    }
    return location.pathname.startsWith(path);
  }, [location.pathname]);

  return {
    // State
    isMobileOpen,
    isCollapsed,
    isMobile,
    hoveredItem,
    
    // Actions
    handleNavigate,
    toggleMobileSidebar,
    toggleCollapsed,
    closeMobileSidebar,
    handleLogout,
    handleItemHover,
    handleItemLeave,
    isRouteActive,
    
    // Setters
    setIsMobileOpen,
    setIsCollapsed,
    setHoveredItem,
  };
};
