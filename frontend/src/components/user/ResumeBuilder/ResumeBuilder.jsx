import { useState } from "react";
import { AlertTriangle } from "lucide-react";

import ModeSelection from "./ModeSelection";
import ResumeUpload from "./ResumeUpload";
import FormTabs from "./FormTabs";

import PersonalInfoForm from "./forms/PersonalInfoForm";
import ExperienceForm from "./forms/ExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import ProjectsForm from "./forms/ProjectsForm";
import CertificationsForm from "./forms/CertificationsForm";

import LivePreview from "../Preview/LivePreview";
import FullPreview from "../Preview/FullPreview";
import TemplatesPage from "../Templates/TemplatesDashboardPage";

import UserNavBar from "../UserNavBar/UserNavBar"; // ✅ Navbar import

import "./ResumeBuilder.css";

const ResumeBuilder = ({ setActivePage = () => {}, onSidebarToggle }) => {
  const [formData, setFormData] = useState({});
  const [templates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const [resumeMode, setResumeMode] = useState(null);
  const [uploadedResume, setUploadedResume] = useState(null);

  const [activeTab, setActiveTab] = useState("builder");
  const [activeSection, setActiveSection] = useState("personal");

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

  const currentTemplate = templates?.find((t) => t.id === selectedTemplate);

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
    if (activeTab === "templates") {
      return (
        <TemplatesPage
          templates={templates}
          selectedTemplate={selectedTemplate}
          onSelectTemplate={handleSelectTemplate}
        />
      );
    }

    if (activeTab === "preview") {
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
        {/* Alert */}
        <div className="alert-banner">
          <AlertTriangle size={20} />
          <div className="alert-content">
            <strong>Complete Your Resume</strong>
            <p>Add required details to enable export</p>
          </div>
        </div>

        {/* Builder + Preview */}
        <div className="content-area">
          <div className="builder-section">
            <FormTabs
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
            <div className="form-content">{renderFormContent()}</div>
          </div>

          <LivePreview
            formData={formData}
            currentTemplate={currentTemplate}
          />
        </div>

        <button className="export-resume-btn">
          📥 Export This Resume
        </button>
      </>
    );
  };

  return (
    <div className="resume-builder-page user-page">
      {/* ✅ Navbar */}
      <UserNavBar onMenuClick={onSidebarToggle || (() => console.log("Toggle sidebar"))} />

      {/* CONTENT BELOW NAVBAR */}
      <div style={{ marginTop: "80px", padding: "1rem" }}>
        {!resumeMode && (
          <>
            <div className="main-header">
              <h1>📝 AI Resume Builder</h1>
              <p>Create professional, ATS-friendly resumes</p>
            </div>
            <ModeSelection onSelectMode={setResumeMode} />
          </>
        )}

        {resumeMode === "edit" && !uploadedResume && (
          <>
            <div className="main-header">
              <h1>📤 Upload Your Resume</h1>
              <button
                className="back-btn"
                onClick={() => setResumeMode(null)}
              >
                ← Back
              </button>
            </div>
            <ResumeUpload
              onUpload={setUploadedResume}
              onBack={() => setResumeMode(null)}
            />
          </>
        )}

        {(resumeMode === "create" ||
          (resumeMode === "edit" && uploadedResume)) && (
          <>
            <div className="main-header">
              <h1>
                {resumeMode === "create"
                  ? "📝 Create New Resume"
                  : "✏️ Edit Resume"}
              </h1>
            </div>

            <div className="main-tabs">
              <button
                className={`main-tab ${activeTab === "builder" ? "active" : ""}`}
                onClick={() => setActiveTab("builder")}
              >
                🔧 Builder
              </button>
              <button
                className={`main-tab ${activeTab === "preview" ? "active" : ""}`}
                onClick={() => setActiveTab("preview")}
              >
                👁️ Preview
              </button>
              <button
                className={`main-tab ${activeTab === "templates" ? "active" : ""}`}
                onClick={() => setActiveTab("templates")}
              >
                📄 Templates
              </button>
            </div>

            {renderMainContent()}
          </>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder;
