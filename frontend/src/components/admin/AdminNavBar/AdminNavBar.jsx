import React, { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";
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

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const notifications = [
    { id: 1, text: "New user submitted a resume template." },
    { id: 2, text: "Your template approval request is pending." },
    { id: 3, text: "System maintenance scheduled at 10 PM." },
  ];

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
              className="relative text-gray-600 hover:text-indigo-600 transition-colors"
              aria-label="Notifications"
            >
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
            </button>

            <AnimatePresence>
              {showNotifications && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowNotifications(false)}
                  />

                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border z-50"
                  >
                    <div className="flex justify-between items-center px-4 py-3 border-b">
                      <h4 className="font-semibold">Notifications</h4>
                      <button 
                        onClick={() => setShowNotifications(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <ul className="max-h-60 overflow-y-auto">
                      {notifications.map((n) => (
                        <li
                          key={n.id}
                          className="px-4 py-3 text-sm hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          {n.text}
                        </li>
                      ))}
                    </ul>
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