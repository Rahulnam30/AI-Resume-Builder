import { useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Building2,
  Briefcase,
  Download,
  FileText,
  Upload,
  User,
} from "lucide-react";

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

const tabs = [
  { id: "recipient", label: "Recipient", icon: Building2 },
  { id: "job", label: "Job Details", icon: Briefcase },
  { id: "body", label: "Content", icon: FileText },
  { id: "closing", label: "Closing", icon: User },
];

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

  const [activeTab, setActiveTab] = useState("builder");
  const [activeSection, setActiveSection] = useState("recipient");

  /* -------------------- PREVIEW STATE -------------------- */
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);
  const [isPreviewHidden, setIsPreviewHidden] = useState(false);

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

  /* -------------------- NAVIGATION -------------------- */
  const currentIdx = tabs.findIndex((tab) => tab.id === activeSection);
  
  const goLeft = () => {
    if (currentIdx > 0) {
      setActiveSection(tabs[currentIdx - 1].id);
    }
  };

  const goRight = () => {
    if (currentIdx < tabs.length - 1) {
      setActiveSection(tabs[currentIdx + 1].id);
    }
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
        {/* ALERT */}
        <div className="flex items-center w-full gap-3 p-4 bg-amber-50 border border-amber-200 rounded-[10px] mb-5">
          <AlertTriangle size={20} />
          <div>
            <strong className="block text-sm text-amber-800 mb-0.5">
              Complete Your Cover Letter
            </strong>
            <p className="text-sm text-yellow-700 m-0">
              Fill in all sections to create a compelling cover letter
            </p>
          </div>
          <div className="flex gap-2 ml-auto flex-wrap">
            <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-amber-100 text-amber-800">
              Recipient Info
            </span>
            <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-amber-100 text-amber-800">
              Job Details
            </span>
            <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-100 text-emerald-800">
              Content
            </span>
          </div>
        </div>

        {/* BUILDER + PREVIEW */}
        <div
          className={`grid grid-cols-[32%_68%] gap-14 p-1.5 ml-2 mr-2 ${isPreviewExpanded ? "grid-cols-[0_100%]" : ""}`}
        >
          {/* builder-section */}
          <div className="bg-white rounded-xl h-full overflow-y-auto pl-0.5 overflow-hidden flex-1">
            <CoverLetterFormTabs
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
            {/* form-content */}
            <div className="w-full h-[55%] mt-5 overflow-auto">{renderFormContent()}</div>
            {/* Previous & Next */}
            <div className="w-full flex items-center justify-between mt-10">
              <button
                onClick={goLeft}
                disabled={currentIdx === 0}
                className="flex gap-1 items-center text-sm bg-slate-100 px-4 py-2 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ArrowLeft size={18} />
                <span>Previous</span>
              </button>
              <button
                onClick={goRight}
                disabled={currentIdx === tabs.length - 1}
                className="flex gap-1 items-center text-sm bg-black text-white px-4 py-2 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <span>Next</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {!isPreviewHidden && (
            <CoverLetterPreview
              formData={formData}
              selectedTemplate={selectedTemplate}
              isExpanded={isPreviewExpanded}
              onExpand={() => setIsPreviewExpanded(true)}
              onCollapse={() => setIsPreviewExpanded(false)}
              onMinimize={() => setIsPreviewHidden(true)}
            />
          )}
        </div>
        <div className="w-full h-4"></div>
      </>
    );
  };

  /* -------------------- MODE SELECTION -------------------- */
  /* Directly return builder page */
  return (
    <div className="">
      <UserNavBar />
      <div className="p-2.5">
        {/* main-header */}
        <div className="flex justify-between items-start mb-5 p-2">
          <h1 className="text-2xl font-['Outfit']">Create Cover Letter</h1>
          <div className="flex gap-2">
            <button className="flex gap-2 py-2.5 px-5 text-white cursor-pointer bg-gradient-to-br from-blue-600 to-blue-700 border-0 rounded-lg text-sm transition-all duration-200 hover:from-blue-700 hover:to-blue-800">
              <Upload size={18} />
              Upload
            </button>
            <button className="flex gap-2 py-2.5 px-5 text-white cursor-pointer bg-gradient-to-br from-blue-600 to-blue-700 border-0 rounded-lg text-sm transition-all duration-200 hover:from-blue-700 hover:to-blue-800">
              <Download size={18} /> Export
            </button>
          </div>
        </div>
        {/* main-tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1.5 mb-4 w-fit">
          <button
            className={`py-1 px-2.5 rounded-lg mr-1 ${activeTab === "builder" ? "bg-white text-slate-900 shadow-sm" : ""}`}
            onClick={() => setActiveTab("builder")}
          >
            Builder
          </button>
          <button
            className={`py-1 px-2.5 rounded-lg ${activeTab === "templates" ? "bg-white text-slate-900 shadow-sm" : ""}`}
            onClick={() => setActiveTab("templates")}
          >
            Templates
          </button>
        </div>

        {renderMainContent()}
      </div>
    </div>
  );
};

export default CoverLetterBuilder;
