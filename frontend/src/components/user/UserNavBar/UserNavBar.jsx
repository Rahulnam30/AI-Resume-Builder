import React, { useState, useEffect, useRef } from "react";
import {
  Bell,
  UserCog,
  Shield,
  LogOut,
  HelpCircle,
  CreditCard,
  Info,
  X,
  CheckCircle,
  AlertCircle,
  Menu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import UptoSkillsLogo from "../../../assets/UptoSkills.webp";
import { useUserNotifications } from "../../../context/UserNotificationContext";

const API = "/api";

export default function UserNavbar({ onMenuClick }) {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const notificationDropdownRef = useRef(null);
  const notificationPanelRef = useRef(null);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { notifications, unreadCount, markAllAsRead } = useUserNotifications();

  const [user, setUser] = useState({
    name: "User",
    email: "",
  });

  /* FETCH USER */
  useEffect(() => {
    fetch(`${API}/user/me`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setUser({
          name: data.username || "User",
          email: data.email || "",
        });
      })
      .catch(() => {
        console.log("User not logged in");
      });
  }, []);

  /* ICON BY TYPE */
  const getTypeIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4.5 h-4.5 text-emerald-500" />;
      case "warning":
        return <AlertCircle className="w-4.5 h-4.5 text-amber-500" />;
      case "info":
        return <Info className="w-4.5 h-4.5 text-blue-500" />;
      default:
        return <Info className="w-4.5 h-4.5 text-gray-500" />;
    }
  };

  const handleMarkAllRead = () => markAllAsRead();

  /* OUTSIDE CLICK */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setShowUserMenu(false);

      if (
        notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(e.target)
      ) {
        if (
          notificationPanelRef.current &&
          !notificationPanelRef.current.contains(e.target)
        )
          setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* LOGOUT */
  const logout = async () => {
    try {
      await fetch(`${API}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      navigate("/login");
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <header className="sticky top-0 z-[50] flex items-center justify-between px-4 h-16 bg-white border-b border-slate-200">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          {/* HAMBURGER */}
          <button
            onClick={() => window.dispatchEvent(new Event("toggle-sidebar"))}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          {/* LOGO */}
          <motion.div
            className="cursor-pointer"
            onClick={() => navigate("/user/dashboard")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={UptoSkillsLogo}
              alt="UptoSkills"
              className="w-36 md:w-44 h-10 object-contain"
            />
          </motion.div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-5 relative">
          {/* NOTIFICATIONS */}
          <div className="relative" ref={notificationDropdownRef}>
            <motion.button
              onClick={() => setShowNotifications((prev) => !prev)}
              className="relative p-2 rounded-xl hover:bg-yellow-50 transition"
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-6 h-6 text-gray-700" />

              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 text-[11px] bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold">
                  {unreadCount}
                </span>
              )}
            </motion.button>
          </div>

          {/* USER PROFILE */}
          <div className="relative" ref={menuRef}>
            <motion.button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="p-1 rounded-full hover:bg-gray-100"
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center font-semibold shadow-md">
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            </motion.button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-64 bg-white border rounded-xl shadow-lg z-50"
                >
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>

                  <DropdownItem
                    icon={<UserCog size={16} />}
                    label="Edit Profile"
                    onClick={() => navigate("/user/edit-profile")}
                  />
                  <DropdownItem
                    icon={<Shield size={16} />}
                    label="Password Changer"
                    onClick={() => navigate("/user/security")}
                  />
                  <DropdownItem
                    icon={<CreditCard size={16} />}
                    label="Plans & Billing"
                    onClick={() => navigate("/pricing")}
                  />
                  <DropdownItem
                    icon={<Info size={16} />}
                    label="About Us"
                    onClick={() => navigate("/about")}
                  />
                  <DropdownItem
                    icon={<HelpCircle size={16} />}
                    label="Help Center"
                    onClick={() => navigate("/help-center")}
                  />

                  <div className="border-t my-1" />

                  <DropdownItem
                    icon={<LogOut size={16} />}
                    label="Logout"
                    danger
                    onClick={logout}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* NOTIFICATION PANEL */}
      <AnimatePresence>
        {showNotifications && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/20 z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNotifications(false)}
            />

            <motion.div
              ref={notificationPanelRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-16 right-0 bottom-0 w-[380px] max-w-full bg-white shadow-2xl z-[70] flex flex-col"
            >
              <div className="flex justify-between items-center px-5 py-4 border-b">
                <h2 className="font-semibold text-lg">
                  Notifications ({unreadCount})
                </h2>
                <button onClick={() => setShowNotifications(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {notifications.length === 0 ? (
                  <p className="text-center text-gray-500 text-sm">
                    No notifications yet
                  </p>
                ) : (
                  notifications.map((n, i) => (
                    <NotificationItemDropdown
                      key={n.id}
                      notif={n}
                      index={i}
                      getTypeIcon={getTypeIcon}
                    />
                  ))
                )}
              </div>

              <div className="p-4 border-t">
                <button
                  onClick={handleMarkAllRead}
                  className="w-full text-sm font-semibold py-2 hover:bg-gray-100 rounded-lg"
                >
                  Mark all as read
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* DROPDOWN ITEM */
const DropdownItem = ({ icon, label, onClick, danger }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition
      ${danger ? "text-red-600 hover:bg-red-50" : "text-gray-700 hover:bg-gray-100"}`}
  >
    {icon}
    {label}
  </button>
);

/* NOTIFICATION ITEM */
const NotificationItemDropdown = ({ notif, index, getTypeIcon }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.05 }}
    className="p-4 rounded-xl border hover:bg-yellow-50 cursor-pointer"
  >
    <div className="flex gap-3">
      <div className="p-2 bg-white rounded-lg shadow">
        {getTypeIcon(notif.type)}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-sm">{notif.title}</p>
        <p className="text-xs text-gray-500">{notif.description}</p>
      </div>
    </div>
  </motion.div>
);
