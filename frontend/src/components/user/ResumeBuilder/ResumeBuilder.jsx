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

const sections = ['personal', 'work', 'education', 'skills', 'projects', 'certs'];


const ResumeBuilder = ({ setActivePage = () => {} }) => {
  /* -------------------- CORE STATE -------------------- */
  const [formData, setFormData] = useState({});
  const [templates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const [resumeMode, setResumeMode] = useState(null);
  const [uploadedResume, setUploadedResume] = useState(null);

  const [activeTab, setActiveTab] = useState('builder');
  const [activeSection, setActiveSection] = useState('personal');

  /* -------------------- PREVIEW STATE -------------------- */
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);
  const [isPreviewHidden, setIsPreviewHidden] = useState(false);

  /* -------------------- HELPERS -------------------- */
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUseSummary = (text) => {
    setFormData((prev) => ({ ...prev, summary: text }));
  };

  const handleSelectTemplate = (id) => {
    setSelectedTemplate(id);
    setActiveTab("builder");
  };

  const currentTemplate = templates?.find(t => t.id === selectedTemplate);

  /* -------------------- FORM RENDER -------------------- */
  const renderFormContent = () => {
    switch (activeSection) {
      case "personal":
        return (
          <PersonalInfoForm
            formData={formData}
            onInputChange={handleInputChange}
            onUseSummary={handleUseSummary}
          />
        );
      case "work":
        return <ExperienceForm formData={formData} setFormData={setFormData} />;
      case "education":
        return <EducationForm formData={formData} setFormData={setFormData} />;
      case "skills":
        return <SkillsForm formData={formData} setFormData={setFormData} />;
      case "projects":
        return <ProjectsForm formData={formData} setFormData={setFormData} />;
      case "certs":
        return (
          <CertificationsForm formData={formData} setFormData={setFormData} />
        );
      default:
        return null;
    }
  };

  const currentIndex = sections.indexOf(activeSection);

const goNext = () => {
  if (currentIndex < sections.length - 1) {
    setActiveSection(sections[currentIndex + 1]);
  }
};

const goBack = () => {
  if (currentIndex > 0) {
    setActiveSection(sections[currentIndex - 1]);
  }
};


  /* -------------------- MAIN CONTENT -------------------- */
  const renderMainContent = () => {
    if (activeTab === "templates") {
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
        {/* ALERT */}
        <div className="alert-banner">
          <AlertTriangle size={20} />
          <div className="alert-content">
            <strong>Complete Your Resume</strong>
            <p>Add the following information to enable export functionality:</p>
          </div>
          <div className="alert-tags">
            <span className="alert-tag warning">Personal Info</span>
            <span className="alert-tag warning">Experience / Education</span>
            <span className="alert-tag success">Skills</span>
          </div>
        </div>

        {/* BUILDER + PREVIEW */}
        <div className={`content-area ${isPreviewExpanded ? 'expanded-preview' : ''}`}>
          <div className="builder-section">
            <FormTabs
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
            <div className="form-content">{renderFormContent()}
 
  
            </div>
          </div>
          

          {!isPreviewHidden && (
            <LivePreview
              formData={formData}
              currentTemplate={currentTemplate}
              isExpanded={isPreviewExpanded}
              onExpand={() => setIsPreviewExpanded(true)}
              onCollapse={() => setIsPreviewExpanded(false)}
              onMinimize={() => setIsPreviewHidden(true)}
            />
          )}
        </div>
      </>
    );
  };

  /* -------------------- MODE SELECTION -------------------- */
  if (!resumeMode) {
    return (
      <div className="resume-builder-page">
        <h1>📝 AI Resume Builder</h1>
        <ModeSelection onSelectMode={setResumeMode} />
      </div>
    );
  }

  /* -------------------- UPLOAD MODE -------------------- */
  if (resumeMode === 'edit' && !uploadedResume) {
    return (
      <ResumeUpload
        onUpload={setUploadedResume}
        onBack={() => setResumeMode(null)}
      />
    );
  }

  /* -------------------- BUILDER PAGE -------------------- */
  return (
    <div>
      <UserNavBar />
      <div className="resume-builder-page">
        <div className="main-header">
          <h1>{resumeMode === "create" ? "Create Resume" : "Edit Resume"}</h1>
          <div className="header-actions">
            <button className="upload-btn">Upload</button>
            <button className="export-btn">Export</button>
          </div>
        </div>

        <div className="main-tabs">
          <button
            className={activeTab === "builder" ? "active" : ""}
            onClick={() => setActiveTab("builder")}
          >
            Builder
          </button>
          <button
            className={activeTab === "templates" ? "active" : ""}
            onClick={() => setActiveTab("templates")}
          >
            Templates
          </button>
        </div>

        {renderMainContent()}
      </div>

      <div className="main-tabs">
        <button
          className={activeTab === 'builder' ? 'active' : ''}
          onClick={() => setActiveTab('builder')}
        >
          Builder
        </button>
        <button
          className={activeTab === 'templates' ? 'active' : ''}
          onClick={() => setActiveTab('templates')}
        >
          Templates
        </button>
      </div>

      {renderMainContent()}
    </div>
  );
};

export default ResumeBuilder;
