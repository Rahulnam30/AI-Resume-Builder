import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
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
  FileUser,
} from "lucide-react";
import "./UserSidebar.css";
import UserNavBar from "../UserNavBar/UserNavBar";

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
    { id: "downloads", icon: Files, label: "Downloads", path: "/user/downloads" },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <UserNavBar />

      <div className="flex flex-1">
        <div className="fixed top-20 left-4 z-[60] flex gap-2">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 bg-white rounded-lg shadow"
          >
            {isMobileOpen ? <X /> : <Menu />}
          </button>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-2 bg-white rounded-lg shadow"
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        {isMobileOpen && (
          <div
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
          />
        )}

        <motion.aside
          className="fixed top-16 left-0 z-40 bg-white border-r border-slate-200 flex flex-col"
          style={{
            width: isCollapsed ? 80 : 256,
            height: "calc(100vh - 4rem)",
          }}
          animate={{ x: isMobileOpen || window.innerWidth >= 768 ? 0 : "-100%" }}
          transition={{ type: "spring", stiffness: 220, damping: 25 }}
        >
          <nav className="p-3 space-y-2 mt-3 flex-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const active = location.pathname.startsWith(item.path);

              return (
                <div
                  key={item.id}
                  className={`relative group ${index !== 0 ? "mt-[45px]" : ""}`}
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
                    {!isCollapsed && <span>{item.label}</span>}
                  </button>

                  <AnimatePresence>
                    {isCollapsed && (
                      <motion.div
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -6 }}
                        className="absolute left-full ml-3 top-1/2 -translate-y-1/2 hidden group-hover:flex z-50"
                      >
                        <div className="bg-slate-900 text-white text-sm px-3 py-1.5 rounded-lg shadow-lg">
                          {item.label}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <div className="p-3 border-t border-slate-200">
            <button
              onClick={() => navigate("/login")}
              className={`w-full flex items-center rounded-xl transition-all text-red-500 hover:bg-red-50
                ${isCollapsed ? "justify-center px-0" : "gap-3 px-4"} py-3`}
            >
              <LogOut size={22} />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        </motion.aside>

        <main
          className="flex-1 transition-all duration-300 p-4"
          style={{
            marginLeft: isCollapsed ? 80 : 256,
            marginTop: "4rem",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
