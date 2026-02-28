import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  FileUser,
  FilePen,
  CheckCircle,
  Files,
  Download,
  LogOut,
  Menu,
  X,
  Bell,
} from "lucide-react";
import "./UserSidebar.css";

export default function UserSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [notifications, setNotifications] = useState([]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    setIsCollapsed(!isMobile);
  }, [isMobile]);

  // Load user notifications from localStorage (simple shared store)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("userNotifications");
      if (raw) setNotifications(JSON.parse(raw));
    } catch (e) {
      setNotifications([]);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Run once on mount
    handleResize();

    // Listen for resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const menuItems = [
    {
      id: "dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/user/dashboard",
    },
    {
      id: "resume",
      icon: FileText,
      label: "AI Resume Builder",
      path: "/user/resume-builder",
    },
    { id: "cv", icon: FileUser, label: "CV", path: "/user/cv" },
    {
      id: "coverletter",
      icon: FilePen,
      label: "Cover Letter",
      path: "/user/cover-letter",
    },
    {
      id: "ats",
      icon: CheckCircle,
      label: "ATS Score Checker",
      path: "/user/ats-checker",
    },

    // Notifications for users
    {
      id: "notifications",
      icon: Bell,
      label: "Notifications",
      path: "/user/notifications",
    },

    {
      id: "myresumes",
      icon: Files,
      label: "My Resumes",
      path: "/user/my-resumes",
    },
    {
      id: "downloads",
      icon: Download,
      label: "Downloads",
      path: "/user/downloads",
    },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem("token");
    localStorage.clear(); // Clear all localStorage to ensure clean logout
    setIsMobileOpen(false);
    // Navigate after ensuring localStorage is cleared
    setTimeout(() => {
      navigate("/", { replace: true });
      window.location.reload(); // Force reload to clear any cached state
    }, 100);
  };

  return (
    <>
      {/* Toggle Buttons */}
      <div className="fixed md:top-4 top-5 md:left-4 left-2 z-[60] flex gap-2">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden"
        >
          {isMobileOpen ? <X /> : <Menu />}
        </button>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="fixed top-6 left-7 hidden md:flex"
        >
          <Menu />
        </button>
      </div>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileOpen(false)}
      ></div>
      {/* Sidebar */}
      <motion.aside
        className="fixed top-0 left-0 z-40 bg-white border-r border-slate-200 flex flex-col"
        style={{ width: isCollapsed ? 80 : 256, height: "100vh" }}
        animate={{ x: isMobileOpen || window.innerWidth >= 768 ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 220, damping: 25 }}
      >
        <nav className="p-3 space-y-2 mt-16 flex-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const active =
              item.path === "/user/dashboard"
                ? location.pathname === "/user/dashboard"
                : location.pathname.startsWith(item.path);

            return (
              <div
                key={item.id}
                className={`relative group ${index !== 0 ? "mt-[45px]" : ""}`}
              >
                <button
                  onClick={() => handleNavigate(item.path)}
                  onMouseEnter={() => isCollapsed && setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`w-full flex items-center rounded-xl transition-all
                    ${isCollapsed ? "justify-center px-0" : "gap-3 px-4"} py-3
                    ${active ? "bg-blue-50 text-blue-600 font-semibold" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}
                    ${item.id === 'notifications' && unreadCount > 0 ? 'relative' : ''}`}
                >
                  <Icon size={22} />
                  {!isCollapsed && (
                    <span className="whitespace-nowrap">{item.label}</span>
                  )}
                  {item.id === 'notifications' && unreadCount > 0 && (
                    <motion.div
                      className={`ml-auto w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg absolute -top-2 -right-2 transform translate-x-1/2 -translate-y-1/2 ${isCollapsed ? 'right-1 top-1' : ''}`}
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </motion.div>
                  )}
                </button>
                {/* Tooltip for collapsed state */}
                {isCollapsed && hoveredItem === item.id && (
                  <div className="tooltip">{item.label}</div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-slate-200 mt-auto relative">
          <button
            onClick={handleLogout}
            onMouseEnter={() => isCollapsed && setHoveredItem("logout")}
            onMouseLeave={() => setHoveredItem(null)}
            className={`w-full flex items-center rounded-xl transition-all text-red-500 hover:bg-red-50
              ${isCollapsed ? "justify-center px-0" : "gap-3 px-4"} py-3`}
          >
            <LogOut size={22} />
            {!isCollapsed && <span>Logout</span>}
          </button>
          {/* Tooltip for logout in collapsed state */}
          {isCollapsed && hoveredItem === "logout" && (
            <div className="tooltip">Logout</div>
          )}
        </div>
      </motion.aside>

      {/* Right Panel (Navbar + Content) */}
      <div
        className={`transition-all duration-300 mt-16 ${isCollapsed ? "md:ml-[80px]" : "md:ml-[256px]"}`}
      >
        <Outlet />
      </div>
    </>
  );
}
