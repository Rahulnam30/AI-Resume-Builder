import { useState } from "react";
import { AlertTriangle, Sparkles } from "lucide-react";

import CoverLetterModeSelection from "./CoverLetterModeSelection";
import CoverLetterUpload from "./CoverLetterUpload";
import CoverLetterFormTabs from "./CoverLetterFormTabs";

import RecipientInfoForm from "./forms/RecipientInfoForm";
import JobDetailsForm from "./forms/JobDetailsForm";
import BodyContentForm from "./forms/BodyContentForm";
import ClosingForm from "./forms/ClosingForm";

import CoverLetterPreview from "./CoverLetterPreview";
import CoverLetterFullPreview from "./CoverLetterFullPreview";
import CoverLetterTemplates from "./CoverLetterTemplates";

import UserNavBar from "../UserNavBar/UserNavBar";

import "./CoverLetterBuilder.css";

const CoverLetterBuilder = ({ onSidebarToggle }) => {
  const [formData, setFormData] = useState({
    // Your Information
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    
    // Recipient Information
    recipientName: '',
    recipientTitle: '',
    companyName: '',
    companyAddress: '',
    
    // Job Details
    jobTitle: '',
    jobReference: '',
    whereFound: '',
    
    // Letter Content
    openingParagraph: '',
    bodyParagraph1: '',
    bodyParagraph2: '',
    closingParagraph: '',
    
    // Closing
    salutation: 'Sincerely',
    customSalutation: '',
  });

  const [selectedTemplate, setSelectedTemplate] = useState('professional');
  const [coverLetterMode, setCoverLetterMode] = useState(null);
  const [uploadedLetter, setUploadedLetter] = useState(null);

  const [activeTab, setActiveTab] = useState("builder");
  const [activeSection, setActiveSection] = useState("recipient");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectTemplate = (id) => {
    setSelectedTemplate(id);
    setActiveTab("builder");
  };

  const handleAIGenerate = async (section) => {
    // Placeholder for AI generation functionality
    console.log(`Generating AI content for: ${section}`);
  };

  const renderFormContent = () => {
    switch (activeSection) {
      case "recipient":
        return (
          <RecipientInfoForm
            formData={formData}
            onInputChange={handleInputChange}
          />
        );
      case "job":
        return (
          <JobDetailsForm
            formData={formData}
            onInputChange={handleInputChange}
          />
        );
      case "body":
        return (
          <BodyContentForm
            formData={formData}
            onInputChange={handleInputChange}
            onAIGenerate={handleAIGenerate}
          />
        );
      case "closing":
        return (
          <ClosingForm
            formData={formData}
            onInputChange={handleInputChange}
          />
        );
      default:
        return (
          <RecipientInfoForm
            formData={formData}
            onInputChange={handleInputChange}
          />
        );
    }
  };

  const renderMainContent = () => {
    if (activeTab === "templates") {
      return (
        <CoverLetterTemplates
          selectedTemplate={selectedTemplate}
          onSelectTemplate={handleSelectTemplate}
        />
      );
    }

    if (activeTab === "preview") {
      return (
        <CoverLetterFullPreview
          formData={formData}
          selectedTemplate={selectedTemplate}
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
            <strong>Complete Your Cover Letter</strong>
            <p>Fill in all sections to create a compelling cover letter</p>
          </div>
        </div>

        {/* Builder + Preview */}
        <div className="content-area">
          <div className="builder-section">
            <CoverLetterFormTabs
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
            <div className="form-content">{renderFormContent()}</div>
          </div>

          <CoverLetterPreview
            formData={formData}
            selectedTemplate={selectedTemplate}
          />
        </div>

        <button className="export-letter-btn">
          📥 Export Cover Letter
        </button>
      </>
    );
  };

  return (
    <div className="cover-letter-builder-page user-page">
      {/* Navbar */}
      <UserNavBar onMenuClick={onSidebarToggle || (() => console.log("Toggle sidebar"))} />

      {/* CONTENT BELOW NAVBAR */}
      <div style={{ marginTop: "80px", padding: "1rem" }}>
        {!coverLetterMode && (
          <>
            <div className="main-header">
              <h1>✉️ AI Cover Letter Builder</h1>
              <p>Create professional, personalized cover letters</p>
            </div>
            <CoverLetterModeSelection onSelectMode={setCoverLetterMode} />
          </>
        )}

        {coverLetterMode === "edit" && !uploadedLetter && (
          <>
            <div className="main-header">
              <h1>📤 Upload Your Cover Letter</h1>
              <button
                className="back-btn"
                onClick={() => setCoverLetterMode(null)}
              >
                ← Back
              </button>
            </div>
            <CoverLetterUpload
              onUpload={setUploadedLetter}
              onBack={() => setCoverLetterMode(null)}
            />
          </>
        )}

        {(coverLetterMode === "create" ||
          (coverLetterMode === "edit" && uploadedLetter)) && (
            <>
              <div className="main-header">
                <h1>
                  {coverLetterMode === "create"
                    ? "✉️ Create New Cover Letter"
                    : "✏️ Edit Cover Letter"}
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

export default CoverLetterBuilder;
