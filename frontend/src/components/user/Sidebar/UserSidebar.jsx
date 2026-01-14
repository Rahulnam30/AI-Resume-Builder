import React, { useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  FileStack,
  CheckCircle,
  Files,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  FilePen,
  Folder,
  FilesIcon,
  FolderCheck,
  FolderCheckIcon,
  Briefcase,
  FilePenLineIcon,
  FileUser,

} from "lucide-react";
import { FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import "./UserSidebar.css";

export default function UserSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", path: "/user/dashboard" },
    { id: "resume", icon: FileText, label: "AI Resume Builder", path: "/user/resume-builder" },
    { id: "cv", icon: FileUser, label: "CV", path: "/user/cv" },
    { id: "coverletter", icon: FilePen, label: "Cover Letter", path: "/user/cover-letter" },
    { id: "ats", icon: CheckCircle, label: "ATS Score Checker", path: "/user/ats-checker" },
    { id: "templates", icon: FileStack, label: "Templates", path: "/user/templates-dashboard-page" },
    { id: "myresumes", icon: Files, label: "My Resumes", path: "/user/my-resumes" },
  ];
  


  const handleNavigate = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Toggle Buttons */}
      <div className="fixed top-4 left-4 z-[60] flex gap-2">
        {/* Mobile menu toggle */}
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="md:hidden p-2">
          {isMobileOpen ? <X /> : <Menu />}
        </button>

        {/* Collapse toggle for desktop */}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="hidden md:flex p-2">
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className="fixed top-16 left-0 z-40 bg-white border-r border-slate-200 flex flex-col"
        style={{ width: isCollapsed ? 80 : 256, height: "calc(100vh - 4rem)" }}
        animate={{ x: isMobileOpen || window.innerWidth >= 768 ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 220, damping: 25 }}
      >
        {/* Navigation */}
        <nav className="p-3 space-y-2 mt-3 flex-1">
          {menuItems.map((item, index) => {   // ✅ add index
  const Icon = item.icon;
  const active =
    item.path === "/user/dashboard"
      ? location.pathname === "/user/dashboard"
      : location.pathname.startsWith(item.path);

  return (
    <div
      key={item.id}
      className={`relative group ${index !== 0 ? "mt-[45px]" : ""}`} // ✅ add mt-[45px] to all except first
    >
      <button
        onClick={() => handleNavigate(item.path)}
        className={`w-full flex items-center rounded-xl transition-all
          ${isCollapsed ? "justify-center px-0" : "gap-3 px-4"} py-3
          ${
            active
              ? "bg-blue-50 text-blue-600 font-semibold"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
      >
        <Icon size={22} />
        {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
      </button>

      {/* Tooltip when collapsed */}
      <AnimatePresence>
        {isCollapsed && (
          <motion.div
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            className="absolute left-full ml-3 top-1/2 -translate-y-1/2 hidden group-hover:flex z-50"
          >
            <div className="bg-slate-900 text-white text-sm px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
              {item.label}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
})}

        </nav>

        {/* Social + Logout Footer */}
        <div className="p-3 border-t border-slate-200 mt-auto">
          {!isCollapsed && (
            <div className="mb-3">
         
            </div>
          )}

          <div className="relative group">
            <button
              onClick={() => navigate("/login")}
              className={`w-full flex items-center rounded-xl transition-all text-red-500 hover:bg-red-50
                ${isCollapsed ? "justify-center px-0" : "gap-3 px-4"} py-3`}
            >
              <LogOut size={22} />
              {!isCollapsed && <span>Logout</span>}
            </button>

            {/* Tooltip when collapsed */}
            {isCollapsed && (
              <div className="absolute left-[90px] top-1/2 -translate-y-1/2 hidden group-hover:flex z-50">
                <div className="bg-slate-900 text-white text-sm px-3 py-1.5 rounded-lg shadow-lg">
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="ml-64 md:ml-64 transition-all duration-300" style={{ marginLeft: isCollapsed ? 80 : 256 }}>
        <Outlet />
      </main>
    </>
  );
}
