import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import ModeSelection from './ModeSelection';
import ResumeUpload from './ResumeUpload';
import FormTabs from './FormTabs';
import PersonalInfoForm from './forms/PersonalInfoForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import ProjectsForm from './forms/ProjectsForm';
import CertificationsForm from './forms/CertificationsForm';
import LivePreview from '../Preview/LivePreview';
import FullPreview from '../Preview/FullPreview';
import TemplatesPage from '../Templates/TemplatesDashboardPage';
import './ResumeBuilder.css';

const ResumeBuilder = ({
  setActivePage = () => {}
}) => {
  const [formData, setFormData] = useState({});
  const [templates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const [resumeMode, setResumeMode] = useState(null);
  const [uploadedResume, setUploadedResume] = useState(null);
  const [activeTab, setActiveTab] = useState('builder');
  const [activeSection, setActiveSection] = useState('personal');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleUseSummary = (text) => {
    setFormData(prev => ({ ...prev, summary: text }));
  };

  const handleSelectTemplate = (id) => {
    setSelectedTemplate(id);
    setActiveTab('builder');
  };

const currentTemplate = templates?.find(
  (t) => t.id === selectedTemplate
);

  const renderFormContent = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <PersonalInfoForm 
            formData={formData} 
            onInputChange={handleInputChange}
            onUseSummary={handleUseSummary}
          />
        );
      case 'work':
        return <ExperienceForm formData={formData} setFormData={setFormData} />;
      case 'education':
        return <EducationForm formData={formData} setFormData={setFormData} />;
      case 'skills':
        return <SkillsForm formData={formData} setFormData={setFormData} />;
      case 'projects':
        return <ProjectsForm formData={formData} setFormData={setFormData} />;
      case 'certs':
        return <CertificationsForm formData={formData} setFormData={setFormData} />;
      default:
        return (
          <PersonalInfoForm 
            formData={formData} 
            onInputChange={handleInputChange}
            onUseSummary={handleUseSummary}
          />
        );
    }
  };

  const renderMainContent = () => {
    if (activeTab === 'templates') {
      return (
        <TemplatesPage 
          templates={templates}
          selectedTemplate={selectedTemplate}
          onSelectTemplate={handleSelectTemplate}
        />
      );
    }
    if (activeTab === 'preview') {
      return (
        <FullPreview 
          formData={formData}
          currentTemplate={currentTemplate}
          setActiveTab={setActiveTab}
        />
      );
    }
    return (
      <>
        <div className="alert-banner">
          <span className="alert-icon"><AlertTriangle size={20} /></span>
          <div className="alert-content">
            <strong>Complete Your Resume</strong>
            <p>Add the following information to enable export functionality:</p>
          </div>
          <div className="alert-tags">
            <span className="alert-tag warning">Personal Information (Name & Email required)</span>
            <span className="alert-tag warning">Experience or Education</span>
            <span className="alert-tag success">Skills</span>
          </div>
        </div>
        <div className="content-area">
          <div className="builder-section">
            <FormTabs activeSection={activeSection} setActiveSection={setActiveSection} />
            <div className="form-content">{renderFormContent()}</div>
          </div>
          <LivePreview formData={formData} currentTemplate={currentTemplate} />
        </div>
        <button className="export-resume-btn">📥 Export This Resume</button>
      </>
    );
  };

  // If no mode selected, show the selection page
  if (!resumeMode) {
    return (
      <div className="resume-builder-page">
        <div className="main-header">
          <div className="header-left">
            <h1>📝 AI Resume Builder</h1>
            <p>Create professional, ATS-friendly resumes with AI assistance</p>
          </div>
        </div>
        <ModeSelection onSelectMode={setResumeMode} />
      </div>
    );
  }

  // Edit mode - show upload page first if no resume uploaded
  if (resumeMode === 'edit' && !uploadedResume) {
    return (
      <div className="resume-builder-page">
        <div className="main-header">
          <div className="header-left">
            <h1>📤 Upload Your Resume</h1>
            <p>Upload your existing resume to edit and enhance it</p>
          </div>
          <div className="header-right">
            <button className="back-btn" onClick={() => setResumeMode(null)}>
              ← Back to Options
            </button>
          </div>
        </div>
        <ResumeUpload 
          onUpload={setUploadedResume} 
          onBack={() => setResumeMode(null)} 
        />
      </div>
    );
  }

  // Create mode or Edit mode with uploaded resume - show the builder
  return (
    <div className="resume-builder-page">
      <div className="main-header">
        <div className="header-left">
          <h1>📝 {resumeMode === 'create' ? 'Create New Resume' : 'Edit Resume'}</h1>
          <p>
            {resumeMode === 'create' 
              ? 'Build your professional resume step by step' 
              : `Editing: ${uploadedResume?.name || 'Your Resume'}`}
          </p>
        </div>
        <div className="header-right">
          <button 
            className="back-btn" 
            onClick={() => { setResumeMode(null); setUploadedResume(null); }}
          >
            ← Back to Options
          </button>
          <button 
            className="ats-check-btn" 
            onClick={() => setActivePage('ats-checker')}
          >
            📊 Check ATS Score
          </button>
          <button className="export-btn">📤 Export Resume</button>
        </div>
      </div>
      <div className="main-tabs">
        <button 
          className={`main-tab ${activeTab === 'builder' ? 'active' : ''}`} 
          onClick={() => setActiveTab('builder')}
        >
          🔧 Builder
        </button>
        <button 
          className={`main-tab ${activeTab === 'preview' ? 'active' : ''}`} 
          onClick={() => setActiveTab('preview')}
        >
          👁️ Preview
        </button>
        <button 
          className={`main-tab ${activeTab === 'templates' ? 'active' : ''}`} 
          onClick={() => setActiveTab('templates')}
        >
          📄 Templates
        </button>
      </div>
      {renderMainContent()}
    </div>
  );
};

export default ResumeBuilder;