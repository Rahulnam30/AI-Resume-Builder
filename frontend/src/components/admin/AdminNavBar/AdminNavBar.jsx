import React, { useState, useEffect } from "react";
import { Bell, X, CheckCircle, AlertTriangle, Info, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import UptoSkillsLogo from "../../../assets/UptoSkills.webp";

const SIDEBAR_WIDTH = {
  expanded: 256,
  collapsed: 80,
};

export default function AdminNavbar({ isCollapsed }) {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      text: "New user submitted a resume template.", 
      type: "info",
      time: "10 minutes ago",
      read: false,
      category: "User Activity"
    },
    { 
      id: 2, 
      text: "Your template approval request is pending.", 
      type: "warning",
      time: "2 hours ago",
      read: false,
      category: "Templates"
    },
    { 
      id: 3, 
      text: "System maintenance scheduled at 10 PM.", 
      type: "warning",
      time: "1 day ago",
      read: true,
      category: "System"
    },
  ]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "info":
        return <Info className="w-4 h-4 text-blue-500" />;
      default:
        return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  // Calculate spacer width based on sidebar state
  const spacerWidth = isMobile
    ? 72 // Fixed space for mobile (for the hamburger button)
    : isCollapsed
    ? SIDEBAR_WIDTH.collapsed
    : SIDEBAR_WIDTH.expanded;

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-30">
      <div className="h-full flex items-center justify-between pr-6">
        
        {/* LEFT SECTION - Logo moves with sidebar */}
        <div className="flex items-center">
          {/* ANIMATED SPACER - Syncs with sidebar width */}
          <motion.div
            animate={{ width: spacerWidth }}
            transition={{ 
              type: "spring", 
              stiffness: 220, 
              damping: 25,
              mass: 0.8 
            }}
            className="h-full flex-shrink-0"
          />

          {/* LOGO - Moves smoothly as spacer changes */}
          <div
            className="flex items-center cursor-pointer ml-4"
            onClick={() => navigate("/")}
          >
            <img
              src={UptoSkillsLogo}
              alt="UptoSkills"
              className="h-8 object-contain"
            />
          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-6 relative">
          <div className="relative">
            <button
              onClick={() => setShowNotifications((p) => !p)}
              className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 group"
              aria-label="Notifications"
            >
              <Bell size={22} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowNotifications(false)}
                  />

                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                          <Bell className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div>
                          <h4 className="text-gray-900 font-semibold text-lg">Admin Notifications</h4>
                          <p className="text-gray-500 text-sm">{unreadCount} unread</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setShowNotifications(false)}
                        className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="px-6 py-8 text-center">
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Bell className="w-6 h-6 text-gray-400" />
                          </div>
                          <p className="text-gray-500 text-sm">No notifications yet</p>
                        </div>
                      ) : (
                        <ul className="divide-y divide-gray-50">
                          {notifications.map((n) => (
                            <li 
                              key={n.id} 
                              className={`px-6 py-4 hover:bg-gray-50 cursor-pointer transition-all duration-200 group ${
                                !n.read ? 'bg-blue-50/50 border-l-4 border-l-blue-500' : ''
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-0.5">
                                  {getNotificationIcon(n.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                                      {n.category}
                                    </span>
                                    <span className="text-xs text-gray-400">{n.time}</span>
                                  </div>
                                  <p className={`text-sm leading-relaxed ${
                                    n.read ? 'text-gray-600' : 'text-gray-900 font-medium'
                                  }`}>
                                    {n.text}
                                  </p>
                                </div>
                                {!n.read && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                        <button 
                          onClick={markAllAsRead}
                          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium hover:underline transition-colors"
                        >
                          Mark all as read
                        </button>
                        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                          <Settings className="w-4 h-4" />
                          Settings
                        </button>
                      </div>
                    )}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}