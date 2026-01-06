import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  CheckCircle,
  Files,
  LogOut,
} from "lucide-react";
import { FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import "./UserSidebar.css";

const UserSidebar = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const sidebarNav = [
    { path: "/user/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/user/resume-builder", label: "AI Resume Builder", icon: FileText },
    { path: "/user/templates-dashboard-page", label: "Templates", icon: FolderOpen },
    { path: "/user/ats-checker", label: "ATS Score Checker", icon: CheckCircle },
    { path: "/user/my-resumes", label: "My Resumes", icon: Files },
  ];

  const logout = () => {
    navigate("/login");
  };

  return (
    <div className="user-page">
      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        
        {/* BRAND + TOGGLE */}
        <div className="sidebar-brand">
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            ☰
          </button>

          
        </div>

        {/* NAV */}
        <nav className="sidebar-nav-main">
          {sidebarNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
              title={sidebarCollapsed ? item.label : ""}
            >
              <span className="nav-icon">
                <item.icon size={20} />
              </span>

              {!sidebarCollapsed && (
                <div className="nav-info">
                  <span className="nav-label">{item.label}</span>
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* FOOTER */}
        <div className="sidebar-footer">
          {!sidebarCollapsed && (
            <>

              <div className="social-media-section">
                <p className="social-title">Connect With Us</p>
                <div className="social-links">
                  <FaLinkedin className="social-icon linkedin" />
                  <FaInstagram className="social-icon instagram" />
                  <FaYoutube className="social-icon youtube" />
                </div>
              </div>
            </>
          )}

          <button className="logout-btn" onClick={logout}>
            <LogOut />
            {!sidebarCollapsed && <span>Log Out</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default UserSidebar;
