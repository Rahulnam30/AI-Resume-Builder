
import { useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Building2,
  Briefcase,
  CheckCircle,
  Download,
  FileText,
  Upload,
  User,
} from "lucide-react";

import CoverLetterFormTabs from "./CoverLetterFormTabs";

import SenderInfoForm from "./forms/SenderInfoForm";
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
  { id: "sender", label: "Personal", icon: User },
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
  const [activeSection, setActiveSection] = useState("sender");

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

  /* -------------------- COMPLETION CHECK -------------------- */
  const checkCompletion = () => {
    const missingSections = [];

    // Check Personal Info - ALL fields required
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.linkedin) {
      missingSections.push("Personal Info");
    }

    // Check Recipient Info - ALL fields required
    if (!formData.recipientName || !formData.recipientTitle || !formData.companyName || !formData.companyAddress) {
      missingSections.push("Recipient Info");
    }

    // Check Job Details - ALL fields required
    if (!formData.jobTitle || !formData.jobReference || !formData.whereFound || !formData.jobDescription) {
      missingSections.push("Job Details");
    }

    // Check Content - ALL paragraphs required
    if (!formData.openingParagraph || !formData.bodyParagraph1 || !formData.bodyParagraph2 || !formData.closingParagraph) {
      missingSections.push("Content");
    }

    return {
      isComplete: missingSections.length === 0,
      missingSections,
    };
  };

  const completion = checkCompletion();

  /* -------------------- SECTION VALIDATION -------------------- */
  const validateCurrentSection = (sectionId) => {
    const missingFields = [];

    switch (sectionId) {
      case "sender":
        if (!formData.fullName?.trim()) missingFields.push("Full Name");
        if (!formData.email?.trim()) missingFields.push("Email");
        if (!formData.phone?.trim()) missingFields.push("Phone");
        if (!formData.address?.trim()) missingFields.push("Address");
        if (!formData.linkedin?.trim()) missingFields.push("LinkedIn");
        break;

      case "recipient":
        if (!formData.recipientName?.trim()) missingFields.push("Hiring Manager's Name");
        if (!formData.recipientTitle?.trim()) missingFields.push("Hiring Manager's Title");
        if (!formData.companyName?.trim()) missingFields.push("Company Name");
        if (!formData.companyAddress?.trim()) missingFields.push("Company Address");
        break;

      case "job":
        if (!formData.jobTitle?.trim()) missingFields.push("Job Title");
        if (!formData.jobReference?.trim()) missingFields.push("Job Reference Number");
        if (!formData.whereFound?.trim()) missingFields.push("Where did you find this job");
        if (!formData.jobDescription?.trim()) missingFields.push("Job Description");
        break;

      case "body":
        if (!formData.openingParagraph?.trim()) missingFields.push("Opening Paragraph");
        if (!formData.bodyParagraph1?.trim()) missingFields.push("Body Paragraph 1");
        if (!formData.bodyParagraph2?.trim()) missingFields.push("Body Paragraph 2");
        if (!formData.closingParagraph?.trim()) missingFields.push("Closing Paragraph");
        break;

      case "closing":
        // Salutation has a default value, so it's always valid
        // But we can check if custom salutation is needed
        if (formData.salutation === 'custom' && !formData.customSalutation?.trim()) {
          missingFields.push("Custom Salutation");
        }
        break;

      default:
        break;
    }

    return {
      isValid: missingFields.length === 0,
      missingFields
    };
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
      // Validate current section before proceeding
      const validation = validateCurrentSection(activeSection);

      // Only proceed if validation passes
      if (validation.isValid) {
        setActiveSection(tabs[currentIdx + 1].id);
      }
      // If validation fails, do nothing (silently prevent navigation)
    }
  };

  const renderFormContent = () => {
    switch (activeSection) {
      case "sender":
        return (
          <SenderInfoForm
            formData={formData}
            onInputChange={handleInputChange}
          />
        );
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
        <div
          className={`flex items-center w-full gap-3 p-4 border rounded-lg mb-5 ${completion?.isComplete ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"} md:text-base text-sm md:flex-row flex-col select-none`}
        >
          {!completion.isComplete && (
            <>
              {/* Alert content */}
              <AlertTriangle
                className="text-amber-800 md:block hidden"
                size={30}
              />
              <div className="flex flex-col md:w-auto w-full">
                <div className="block font-medium text-amber-800 mb-0.5 md:text-sm text-xs">
                  Complete Your Cover Letter
                </div>
                <p className="text-yellow-700 m-0 md:text-md text-xs">
                  Add the following information to enable export functionality:
                </p>
              </div>
              <div className="w-full flex flex-wrap gap-2 justify-start md:justify-end">
                {!completion?.isComplete &&
                  completion?.missingSections?.map((missing, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md font-medium bg-amber-100 text-amber-800 text-xs"
                    >
                      {missing}
                    </span>
                  ))}
              </div>
            </>
          )}
          {completion.isComplete && (
            <>
              <CheckCircle
                className="text-emerald-500 md:block hidden"
                size={20}
              />
              {/* Alert content */}
              <div className="flex flex-col md:w-auto w-full">
                <strong className="block text-left mb-0.5 text-emerald-500 md:text-xs text-sm">
                  Cover Letter Ready
                </strong>
                <p className="text-emerald-500 m-0 md:text-md text-xs">
                  Your cover letter is ready to export.
                </p>
              </div>
              <div className="flex gap-2 ml-auto flex-wrap">
                <span className="px-2.5 py-1 rounded-md font-medium bg-emerald-100 text-emerald-800 md:text-md text-xs">
                  Cover Letter is Ready
                </span>
              </div>
            </>
          )}
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
            <div className="w-full mt-5">
              {renderFormContent()}
              {/* Previous & Next */}
              <div className="w-full flex items-center justify-between mt-4">
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
      <div className="p-2.5 mt-4">
        {/* main-header */}
        <div className="flex justify-between items-start mb-5 p-2">
          <h1 className="text-2xl font-['Outfit']">Create Cover Letter</h1>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-sm">
              <Upload size={18} />
              Upload
            </button>
            <button className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-sm">
              <Download size={18} /> Export
            </button>
          </div>
        </div>


        {renderMainContent()}
      </div>
    </div>
  );
};

export default CoverLetterBuilder;
