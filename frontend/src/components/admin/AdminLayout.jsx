import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavBar/AdminNavBar";
import AdminSidebar from "./AdminSidebar/AdminSidebar";

export default function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <AdminNavbar isCollapsed={isCollapsed} />

      <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <main
        className={`
          pt-16 min-h-screen bg-slate-50
          transition-all duration-300 ease-in-out
          ml-0
          ${isCollapsed ? "md:ml-20" : "md:ml-64"}
        `}
      >
        <Outlet />
      </main>
    </>
  );
}