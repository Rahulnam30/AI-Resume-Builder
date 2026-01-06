import React, { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Plus,
  IndianRupee,
  User,
  Drone,
  BarChart,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function AdminSidebar({ isCollapsed, setIsCollapsed }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      id: "dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/admin",
    },

    {
      id: "resumes",
      icon: FileText,
      label: "Resumes",
      path: "/admin/templates",
    },
    {
      id: "create",
      icon: Plus,
      label: "Create Template",
      path: "/admin/create-templates",
    },
    {
      id: "subscription",
      icon: IndianRupee,
      label: "Subscription",
      path: "/admin/subscription",
    },
    {
      id: "users", // ✅ FIXED
      icon: User,
      label: "Users",
      path: "/admin/users", // ✅ FIXED
    },
    {
      id: "Accepttemplate",
      icon: Drone,
      label: "Accept User Template",
      path: "/admin/template-requests",
    },
    {
      id: "Analysis",
      icon: BarChart,
      label: "Analytics",
      path: "/admin/analytics",
    },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-[60]">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-md bg-slate-900 text-white"
        >
          {isMobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className="fixed top-16 left-0 z-40 flex flex-col bg-slate-900 border-r border-slate-700"
        style={{
          width: isCollapsed ? 80 : 256,
          height: "calc(100vh - 4rem)",
        }}
        animate={{
          x: isMobileOpen || window.innerWidth >= 768 ? 0 : "-100%",
        }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-3 border-b border-slate-700">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:block p-1.5 hover:bg-slate-800 rounded-lg"
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname.startsWith(item.path); // ✅ improved

            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                  transition-colors
                  ${
                    active
                      ? "bg-slate-800 text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
              >
                <Icon size={20} />
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </motion.aside>
    </>
  );
}
