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
import { useUserNotifications } from "../../../context/UserNotificationContext";
import "./UserSidebar.css";

export default function UserSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { unreadCount } = useUserNotifications();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  /* ---------------- SCREEN DETECT ---------------- */
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // auto expand sidebar on desktop
      if (!mobile) setIsCollapsed(false);
      else setIsCollapsed(true);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const toggle = () => {
      if (isMobile) setIsMobileOpen((prev) => !prev);
      else setIsCollapsed((prev) => !prev);
    };

    window.addEventListener("toggle-sidebar", toggle);
    return () => window.removeEventListener("toggle-sidebar", toggle);
  }, [isMobile]);
  /* ---------------- MENU ITEMS ---------------- */
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
    {
      id: "notifications",
      icon: Bell,
      label: "Notifications",
      path: "/user/notifications",
      badge: unreadCount > 0 ? unreadCount : null,
    },
  ];

  /* ---------------- NAVIGATE ---------------- */
  const handleNavigate = (path) => {
    navigate(path);
    if (isMobile) setIsMobileOpen(false);
  };

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = () => {
    localStorage.clear();
    setIsMobileOpen(false);
    setTimeout(() => {
      navigate("/", { replace: true });
      window.location.reload();
    }, 100);
  };

  return (
    <>
      {/* ---------------- OVERLAY ---------------- */}
      {isMobile && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className={`fixed inset-0 bg-black/40 z-30 transition ${
            isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />
      )}

      {/* ---------------- SIDEBAR ---------------- */}
      <motion.aside
        className="fixed top-0 left-0 z-40 bg-white border-r border-slate-200 flex flex-col"
        style={{ width: isCollapsed ? 80 : 256, height: "100vh" }}
        animate={{
          x: isMobile ? (isMobileOpen ? 0 : "-100%") : 0,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
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
                    ${
                      active
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                >
                  <Icon size={22} />
                  {!isCollapsed && <span>{item.label}</span>}

                  {item.badge && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`${
                        isCollapsed ? "absolute -top-1 -right-1" : "ml-auto"
                      } w-5 h-5 text-xs font-bold text-white bg-yellow-400 rounded-full flex items-center justify-center`}
                    >
                      {item.badge}
                    </motion.span>
                  )}
                </button>

                {isCollapsed && hoveredItem === item.id && (
                  <div className="tooltip">{item.label}</div>
                )}
              </div>
            );
          })}
        </nav>

        {/* ---------------- LOGOUT ---------------- */}
        <div className="p-3 border-t border-slate-200 mt-auto">
          <button
            onClick={handleLogout}
            onMouseEnter={() => isCollapsed && setHoveredItem("logout")}
            onMouseLeave={() => setHoveredItem(null)}
            className={`w-full flex items-center rounded-xl text-red-500 hover:bg-red-50 transition
              ${isCollapsed ? "justify-center px-0" : "gap-3 px-4"} py-3`}
          >
            <LogOut size={22} />
            {!isCollapsed && <span>Logout</span>}
          </button>

          {isCollapsed && hoveredItem === "logout" && (
            <div className="tooltip">Logout</div>
          )}
        </div>
      </motion.aside>

      {/* ---------------- CONTENT SHIFT ---------------- */}
      <div
        className={`transition-all duration-300 ${
          isCollapsed ? "md:ml-[80px]" : "md:ml-[256px]"
        }`}
      >
        <Outlet />
      </div>
    </>
  );
}
