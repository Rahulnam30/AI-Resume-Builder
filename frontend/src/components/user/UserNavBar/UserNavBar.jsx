import React, { useState } from "react";
import { Bell, User, X, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UptoSkillsLogo from "../../../assets/UptoSkills.webp";

export default function UserNavbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      text: "Your resume has been successfully updated.", 
      type: "success",
      time: "2 hours ago",
      read: false
    },
    { 
      id: 2, 
      text: "You have a new suggestion for your skills.", 
      type: "info",
      time: "5 hours ago",
      read: false
    },
    { 
      id: 3, 
      text: "Your subscription is expiring soon.", 
      type: "warning",
      time: "1 day ago",
      read: true
    },
  ]);
  const navigate = useNavigate();

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

  return (
    <header className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 h-16 bg-white border-b border-gray-200 md:z-50">
      {/* Logo */}
      <img
        src={UptoSkillsLogo}
        alt="UptoSkills"
        onClick={() => navigate("/")}
        className="w-40 h-10 ml-8 object-contain cursor-pointer hover:opacity-90 transition-opacity"
      />

      {/* Right actions */}
      <div className="flex items-center gap-6 relative">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 group"
          >
            <Bell size={22} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Bell className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-semibold text-lg">Notifications</h4>
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
                            <p className={`text-sm leading-relaxed ${
                              n.read ? 'text-gray-600' : 'text-gray-900 font-medium'
                            }`}>
                              {n.text}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">{n.time}</p>
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
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                  <button 
                    onClick={markAllAsRead}
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-medium hover:underline transition-colors"
                  >
                    Mark all as read
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* User */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
            <User size={16} />
          </div>
          <span className="hidden sm:block text-sm text-gray-800 font-medium">User</span>
        </div>
      </div>
    </header>
  );
}
