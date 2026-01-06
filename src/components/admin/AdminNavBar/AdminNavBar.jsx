import React, { useState } from "react";
import { Bell, User, LogOut, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UptoSkillsLogo from "../../../assets/UptoSkills.webp";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  // Dummy notifications
  const notifications = [
    { id: 1, text: "New user submitted a resume template." },
    { id: 2, text: "Your template approval request is pending." },
    { id: 3, text: "System maintenance scheduled at 10 PM." },
  ];

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-6 z-50">
      {/* Page Title */}
      <motion.img
        src={UptoSkillsLogo}
        alt="UptoSkills"
        className="w-40 h-10 ml-6 object-contain"
        whileHover={{
          scale: 1.05,
          filter: "drop-shadow(0 0 12px rgba(99,102,241,0.9))",
        }}
        transition={{ type: "spring", stiffness: 200 }}
      />

      {/* Actions */}
      <div className="flex items-center gap-6 relative">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative hover:text-indigo-400"
          >
            <Bell size={22} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </button>

          {/* Notification Popup */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
              >
                <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <h4 className="text-gray-800 dark:text-white font-semibold">
                    Notifications
                  </h4>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <X size={18} />
                  </button>
                </div>

                <ul className="max-h-60 overflow-y-auto">
                  {notifications.map((n) => (
                    <li
                      key={n.id}
                      className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-700 dark:text-gray-200"
                    >
                      {n.text}
                    </li>
                  ))}
                </ul>

                {notifications.length === 0 && (
                  <p className="px-4 py-3 text-gray-500 dark:text-gray-400">
                    No new notifications
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
            <User size={16} />
          </div>
          <span className="hidden sm:block text-sm text-white">Admin</span>
        </div>

        {/* Logout */}
        <button
          onClick={() => navigate("/login")}
          className="text-red-400 hover:text-red-500"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
