import React from "react";
import {
  Grid,
  FileText,
  Folder,
  CheckCircle,
  Copy,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const SidebarItem = ({ Icon, label, active, isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 w-full rounded-md transition-all duration-300
        ${active ? "bg-purple-600 text-white" : "hover:bg-gray-100"}`}
    >
      <Icon className={`w-5 h-5 ${active ? "text-white" : "text-gray-700"}`} />
      {isOpen && <span className="text-sm font-medium">{label}</span>}
    </button>
  );
};

const SidebarTailwind = ({
  sidebarCollapsed,
  setSidebarCollapsed,
  activePage,
  setActivePage,
  logout,
}) => {
  const isOpen = !sidebarCollapsed;

  const items = [
    { id: "dashboard", label: "Dashboard", icon: Grid },
    { id: "resume", label: "AI Resume Builder", icon: FileText },
    { id: "templates", label: "Templates", icon: Folder },
    { id: "ats", label: "ATS Score Checker", icon: CheckCircle },
    { id: "my-resumes", label: "My Resumes", icon: Copy },
  ];

  return (
    <>
      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static z-50
          top-0 left-0 h-screen
          flex flex-col bg-white border-r
          transition-all duration-300
          ${isOpen ? "translate-x-0 w-64 px-4 py-4" : "-translate-x-full md:translate-x-0 w-20 px-2 py-3"}
        `}
      >
        {/* TOGGLE BUTTON */}
        <div className="mb-4 flex items-center justify-center">
          <button
            className="bg-white shadow-sm rounded-md p-2 flex items-center justify-center"
            onClick={() => setSidebarCollapsed((prev) => !prev)}
            aria-label="Toggle Sidebar"
          >
            {isOpen ? (
              <X className="w-5 h-5 text-gray-800" />
            ) : (
              <Menu className="w-5 h-5 text-gray-800" />
            )}
          </button>
        </div>

        {/* NAV ITEMS */}
        <nav className="flex-1 flex flex-col gap-1">
          {items.map((item) => (
            <SidebarItem
              key={item.id}
              Icon={item.icon}
              label={item.label}
              isOpen={isOpen}
              active={activePage === item.id}
              onClick={() => {
                setActivePage(item.id);
                if (window.innerWidth < 768) setSidebarCollapsed(true);
              }}
            />
          ))}
        </nav>

        {/* LOGOUT */}
        <div className="mt-auto w-full">
          <button
            onClick={logout}
            className={`w-full transition-all duration-300 ${
              isOpen
                ? "bg-red-50 border border-red-200 text-red-600 py-3 rounded-lg flex items-center justify-center gap-2"
                : "mx-auto flex flex-col items-center justify-center p-2 rounded-md bg-red-50"
            }`}
          >
            <LogOut className="w-5 h-5 text-red-600" />
            {isOpen && <span className="text-red-600 font-medium">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default SidebarTailwind;
