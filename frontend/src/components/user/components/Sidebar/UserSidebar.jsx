import { 
  LayoutDashboard, 
  FileText, 
  FolderOpen, 
  CheckCircle, 
  Files,
  LogOut
} from 'lucide-react';
import { FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import './UserSidebar.css';

const UserSidebar = ({ 
  activePage, 
  setActivePage, 
  sidebarCollapsed, 
  setSidebarCollapsed, 
  logout 
}) => {
  const sidebarNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, desc: 'Overview & stats' },
    { id: 'resume', label: 'AI Resume Builder', icon: FileText, desc: 'Create & edit resume' },
    { id: 'templates', label: 'Templates', icon: FolderOpen, desc: 'Browse templates' },
    { id: 'ats-checker', label: 'ATS Score Checker', icon: CheckCircle, desc: 'Check ATS compatibility' },
    { id: 'my-resumes', label: 'My Resumes', icon: Files, desc: 'Downloads & saved' },
  ];

  return (
    <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-brand">
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          title={sidebarCollapsed ? 'Expand' : 'Collapse'}
        >
          ☰
        </button>
        {sidebarCollapsed ? (
          '📝'
        ) : (
          <span className="brand-text">AI RESUME</span>
        )}
      </div>

      
      
      <nav className="sidebar-nav-main">
        {sidebarNav.map((item) => (
          <button 
            key={item.id} 
            className={`nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => setActivePage(item.id)}
            title={sidebarCollapsed ? item.label : ''}
          >
            <span className="nav-icon"><item.icon size={20} /></span>
            {!sidebarCollapsed && (
              <div className="nav-info">
                <span className="nav-label">{item.label}</span>
                <span className="nav-desc">{item.desc}</span>
              </div>
            )}
          </button>
        ))}
      </nav>
      
    <div className="sidebar-footer">
  {!sidebarCollapsed && (
    <>
      {/* AI TIP BOX (ABOVE CONNECT WITH US) */}
      <div className="ai-tip-box">
        <span className="ai-tip-title">AI Tip✨</span>
        <p className="ai-tip-text">
          Use keywords from the job description to boost your ATS score.
        </p>
      </div>

      <div className="social-media-section">
        <p className="social-title">Connect With Us</p>
        <div className="social-links">
          <FaLinkedin
            size={20}
            className="social-icon linkedin"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/company/uptoskills/posts/?feedView=all",
                "_blank"
              )
            }
          />
          <FaInstagram
            size={20}
            className="social-icon instagram"
            onClick={() =>
              window.open("https://www.instagram.com/uptoskills", "_blank")
            }
          />
          <FaYoutube
            size={20}
            className="social-icon youtube"
            onClick={() =>
              window.open(
                "https://youtube.com/@uptoskills9101?si=YvRk51dq0exU-zLv",
                "_blank"
              )
            }
          />
        </div>
      </div>
    </>
  )}

  <button
    className="logout-btn"
    onClick={logout}
    title={sidebarCollapsed ? "Logout" : ""}
  >
    <LogOut className="logout-icon" />
    {!sidebarCollapsed && <span className="logout-text">Log Out</span>}
  </button>
</div>

    </aside>
  );
};

export default UserSidebar;
