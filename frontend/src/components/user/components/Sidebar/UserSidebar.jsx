import { 
  LayoutDashboard, 
  FileText, 
  FolderOpen, 
  CheckCircle, 
  Files
} from 'lucide-react';
import './UserSidebar.css';

const UserSidebar = ({ 
  user, 
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
      <button className="sidebar-toggle" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
        {sidebarCollapsed ? '☰' : '✕'}
      </button>
      
      <div className="sidebar-brand">
        {sidebarCollapsed ? '📝' : <><span className="brand-icon">📝</span> ResumeAI</>}
      </div>

      <div className="sidebar-user">
        <div className="user-avatar">{user?.name?.charAt(0) || 'U'}</div>
        {!sidebarCollapsed && (
          <div className="user-info">
            <span className="user-name">{user?.name || 'User'}</span>
            <span className="user-email">{user?.email || 'user@email.com'}</span>
          </div>
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
      
      {!sidebarCollapsed && (
        <div className="ai-tip-box">
          <div className="ai-tip-header"><span className="ai-tip-icon">💡</span><span>AI Tip</span></div>
          <p>Use action verbs and quantify your achievements for better ATS compatibility.</p>
        </div>
      )}
      
      <button className="logout-btn" onClick={logout} title={sidebarCollapsed ? 'Logout' : ''}>
        🚪 {!sidebarCollapsed && 'Logout'}
      </button>
    </aside>
  );
};

export default UserSidebar;
