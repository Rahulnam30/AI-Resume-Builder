import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Plus,
  IndianRupee,
  User,
  BarChart,
  LogOut,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function AdminSidebar({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Init
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      id: "dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/admin",
    },
    {
      id: "create",
      icon: Plus,
      label: "Manage Templates",
      path: "/admin/manage-templates",
    },
    {
      id: "subscription",
      icon: IndianRupee,
      label: "Subscription",
      path: "/admin/subscription",
    },
    { id: "users", icon: User, label: "Users", path: "/admin/users" },
    {
      id: "analytics",
      icon: BarChart,
      label: "Analytics",
      path: "/admin/analytics",
    },
  ];

  // Navigate to page
  const handleNavigate = (path) => {
    navigate(path);
    if (isMobile) setIsMobileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.clear();
    setIsMobileOpen(false);
    setTimeout(() => {
      navigate("/", { replace: true });
      window.location.reload();
    }, 100);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/30 z-[60] md:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={`fixed left-0 border-r border-slate-200 flex flex-col bg-white
          ${isMobile ? "top-0 z-[70] h-screen" : "top-16 z-40 h-[calc(100vh-64px)]"}
        `}
        initial={false}
        animate={{
          x: isMobile ? (isMobileOpen ? 0 : "-100%") : 0,
          width: isMobile ? 256 : (isCollapsed ? 80 : 256),
        }}
        transition={{ type: "spring", stiffness: 220, damping: 25 }}
      >
        <nav className="p-3 space-y-2 flex-1 mt-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const active =
              item.path === "/admin"
                ? location.pathname === "/admin"
                : location.pathname.startsWith(item.path);

            return (
              <div key={item.id} className={`relative group`}>
                <button
                  onClick={() => handleNavigate(item.path)}
                  onMouseEnter={() => !isMobile && isCollapsed && setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`w-full flex items-center rounded-xl transition-all
                    ${!isMobile && isCollapsed ? "justify-center px-0" : "gap-3 px-4"} py-3
                    ${active ? "bg-blue-50 text-blue-600 font-semibold" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
                >
                  <Icon size={22} />
                  {(!isCollapsed || isMobile) && <span className="whitespace-nowrap">{item.label}</span>}
                </button>
                {/* Tooltip for collapsed state */}
                {!isMobile && isCollapsed && hoveredItem === item.id && (
                  <div className="tooltip">
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-slate-200 mt-auto relative">
          <button
            onClick={handleLogout}
            onMouseEnter={() => !isMobile && isCollapsed && setHoveredItem("logout")}
            onMouseLeave={() => setHoveredItem(null)}
            className={`w-full flex items-center rounded-xl transition-all text-red-500 hover:bg-red-50
              ${!isMobile && isCollapsed ? "justify-center px-0" : "gap-3 px-4"} py-3`}
          >
            <LogOut size={22} />
            {(!isCollapsed || isMobile) && <span>Logout</span>}
          </button>
          {/* Tooltip for logout in collapsed state */}
          {!isMobile && isCollapsed && hoveredItem === "logout" && (
            <div className="tooltip">
              Logout
            </div>
          )}
        </div>
      </motion.aside>

      {/* Note: Removed the redundant 'Right Panel' div from here as it should be handled by AdminLayout */}
    </>
  );
}
