import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavBar/AdminNavBar";
import AdminSidebar from "./AdminSidebar/AdminSidebar";
import { NotificationProvider } from "../../context/NotificationContext";
import axios from "../../api/axios";

export default function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [adminData, setAdminData] = useState(null);

  const fetchAdminData = useCallback(async () => {
    try {
      const res = await axios.get("/api/user/profile");
      if (res.data?.user) {
        setAdminData(res.data.user);
      }
    } catch (err) {
      console.error("Failed to fetch admin profile:", err);
    }
  }, []);

  const contextValue = useMemo(() => ({
    adminUser: adminData,
    refreshAdminData: fetchAdminData,
    setAdminUser: setAdminData
  }), [adminData, fetchAdminData]);

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  return (
    <NotificationProvider>
      <AdminNavbar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        adminUser={adminData}
      />

      <AdminSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <main
        className={`
          pt-16 min-h-screen bg-slate-50
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "md:ml-20" : "md:ml-64"}
        `}
      >
        <Outlet context={contextValue} />
      </main>
    </NotificationProvider>
  );
}
