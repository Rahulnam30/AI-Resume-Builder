import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import UserSidebar from './components/Sidebar/UserSidebar';
import Dashboard from './components/Dashboard/Dashboard';
import ResumeBuilder from './components/ResumeBuilder/ResumeBuilder';
import TemplatesPage from './components/Templates/TemplatesPage';
import ATSChecker from './components/ATSChecker/ATSChecker';
import MyResumes from './components/MyResumes/MyResumes';
import EditProfile from './components/Profile/EditProfile';
import './UserPage.css';

const UserPage = () => {
  const { user, logout } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: '',
    experience: [{ id: 1, title: '', company: '', location: '', startDate: '', endDate: '', description: '' }],
    education: [{ id: 1, degree: '', school: '', location: '', graduationDate: '', gpa: '' }],
    skills: { technical: [], soft: [] },
    projects: [{ id: 1, name: '', description: '', technologies: '', link: '' }],
    certifications: [{ id: 1, name: '', issuer: '', date: '', link: '' }]
  });

  const myResumes = [
    { id: 1, name: 'Software_Engineer_Resume.pdf', date: 'Dec 24, 2024', size: '245 KB', atsScore: 94 },
    { id: 2, name: 'Frontend_Developer_Resume.pdf', date: 'Dec 20, 2024', size: '238 KB', atsScore: 89 },
    { id: 3, name: 'Full_Stack_Resume.docx', date: 'Dec 15, 2024', size: '312 KB', atsScore: 92 },
  ];

  const templates = [
    { id: 1, name: 'Modern Professional', category: 'professional', color: '#2563eb', popular: true, atsScore: 95 },
    { id: 2, name: 'Classic Executive', category: 'professional', color: '#1e293b', popular: true, atsScore: 98 },
    { id: 3, name: 'Creative Designer', category: 'creative', color: '#8b5cf6', popular: false, atsScore: 85 },
    { id: 4, name: 'Minimalist Clean', category: 'simple', color: '#64748b', popular: true, atsScore: 92 },
    { id: 5, name: 'Tech Starter', category: 'modern', color: '#0891b2', popular: false, atsScore: 90 },
    { id: 6, name: 'Bold Impact', category: 'creative', color: '#dc2626', popular: false, atsScore: 82 },
    { id: 7, name: 'Elegant Serif', category: 'professional', color: '#0f766e', popular: true, atsScore: 94 },
    { id: 8, name: 'Fresh Graduate', category: 'simple', color: '#059669', popular: false, atsScore: 88 },
  ];

  const renderPageContent = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <Dashboard 
            user={user} 
            resumes={myResumes} 
            setActivePage={setActivePage} 
          />
        );
      case 'resume':
        return (
          <ResumeBuilder 
            user={user}
            formData={formData}
            setFormData={setFormData}
            templates={templates}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            setActivePage={setActivePage}
          />
        );
      case 'templates':
        return (
          <TemplatesPage 
            templates={templates}
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
            showHeader={true}
          />
        );
      case 'ats-checker':
        return <ATSChecker />;
      case 'my-resumes':
        return <MyResumes resumes={myResumes} setActivePage={setActivePage} />;
      case 'profile':
        return <EditProfile user={user} />;
      default:
        return (
          <Dashboard 
            user={user} 
            resumes={myResumes} 
            setActivePage={setActivePage} 
          />
        );
    }
  };

  return (
    <div className={`user-page ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <UserSidebar 
        user={user}
        activePage={activePage}
        setActivePage={setActivePage}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        logout={logout}
      />
      
      <main className="main-content">
        <div className="top-bar">
          <div className="profile-dropdown-container">
            <button 
              className="profile-icon-btn" 
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <div className="profile-avatar-small">{user?.name?.charAt(0) || 'U'}</div>
            </button>
            {showProfileDropdown && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <div className="dropdown-avatar">{user?.name?.charAt(0) || 'U'}</div>
                  <div className="dropdown-user-info">
                    <span className="dropdown-name">{user?.name || 'User'}</span>
                    <span className="dropdown-email">{user?.email || 'user@email.com'}</span>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <button 
                  className="dropdown-item" 
                  onClick={() => { setActivePage('profile'); setShowProfileDropdown(false); }}
                >
                  <span>⚙️</span> Edit Profile
                </button>
                <button className="dropdown-item logout" onClick={logout}>
                  <span>🚪</span> Logout
                </button>
              </div>
            )}
          </div>
        </div>
        {renderPageContent()}
      </main>
    </div>
  );
};

export default UserPage;
