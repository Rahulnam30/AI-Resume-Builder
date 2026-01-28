import { useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Award,
  Briefcase,
  Download,
  FilePenLine,
  FolderKanban,
  GraduationCap,
  PenTool,
  Upload,
  User,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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
import { TEMPLATES } from "../Templates/TemplateRegistry";

import { getCompletionStatus } from "./completion";

import "./ResumeBuilder.css";
import UserNavbar from "../UserNavBar/UserNavBar";

const sections = [
  "personal",
  "work",
  "education",
  "skills",
  "projects",
  "certs",
];

const ResumeBuilder = ({ setActivePage = () => { } }) => {
  /* -------------------- CORE STATE -------------------- */
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    linkedin: "",
    location: "",
    phone: "",
    summary: "",
    website: "",
    education: [
      {
        id: Date.now(),
        school: "",
        degree: "",
        gpa: "",
        startDate: "",
        graduationDate: "",
        location: "",
      },
    ],
    experience: [
      {
        id: Date.now(),
        title: "",
        company: "",
        description: "",
        startDate: "",
        endDate: "",
        location: "",
      },
    ],
    projects: [
      {
        id: Date.now(),
        name: "",
        description: "",
        technologies: "",
        link: {
          github: "",
          liveLink: "",
          other: "",
        },
      },
    ],
    skills: { technical: [], soft: [] },
    certifications: [
      {
        id: Date.now(),
        name: "",
        issuer: "",
        date: "",
        link: "",
      },
    ],
  });
  const navigate = useNavigate();
  const [templates, setTemplates] = useState(TEMPLATES);
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]?.id || "jessica-claire");

  // const [resumeMode, setResumeMode] = useState(null);
  // const [uploadedResume, setUploadedResume] = useState(null);

  const [activeTab, setActiveTab] = useState("builder");
  const [activeSection, setActiveSection] = useState("personal");

  const completion = getCompletionStatus(formData);

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

  const currentTemplate = templates?.find((t) => t.id === selectedTemplate);

  /*------------------- PREVIOUS & NEXT BUTTON ------------*/
  const tabs = [
    { id: "personal", label: "Personal", icon: User },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "work", label: "Work", icon: Briefcase },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "certs", label: "Certifications", icon: Award },
    { id: "skills", label: "Skills", icon: Zap },
  ];
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
        <TemplatesPage onSelectTemplate={handleSelectTemplate} isEmbedded={true} />
      );
    }

    if (activeTab === "preview") {
      return (
        <FullPreview
          formData={formData}
          setActiveTab={setActiveTab}
        />
      );
    }

    return (
      <>
        {/* ALERT */}
        {/* Alert Banner */}
        <div className="flex items-center w-full gap-3 p-4 bg-amber-50 border border-amber-200 rounded-[10px] mb-5">
          <AlertTriangle size={20} />
          {/* Alert content */}
          <div>
            <strong className="block text-sm text-amber-800 mb-0.5">
              Complete Your Resume
            </strong>
            <p className="text-sm text-yellow-700 m-0 ">
              Add the following information to enable export functionality:
            </p>
          </div>
          <div className="flex gap-2 ml-auto flex-wrap">
            <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-amber-100 text-amber-800">
              Personal Info
            </span>
            <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-amber-100 text-amber-800">
              Experience / Education
            </span>
            <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-100 text-emerald-800">
              Skills
            </span>
          </div>
        </div>

        {/* BUILDER + PREVIEW */}
        <div
          className={`grid grid-cols-[32%_68%] gap-14 p-1.5 ml-2 mr-2 ${isPreviewExpanded ? "grid-cols-[0_100%]" : ""}`}
        >
          {/* builder-section */}
          <div className="bg-white rounded-xl h-full overflow-y-auto pl-0.5 overflow-hidden flex-1">
            <FormTabs
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
            {/* form-content */}
            <div className="w-full h-[72%] mt-5 overflow-auto">
              {renderFormContent()}
            </div>
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
        <div className="w-full h-4"></div>
      </>
    );
  };

  /* -------------------- MODE SELECTION -------------------- */
  // if (!resumeMode) {
  //   return (
  //     // resume-builder-page
  //     <div className="p-2.5">
  //       <h1>📝 AI Resume Builder</h1>
  //       <ModeSelection onSelectMode={setResumeMode} />
  //     </div>
  //   );
  // }
  // <ResumeUpload
  //   onUpload={setUploadedResume}
  //   onBack={() => setResumeMode(null)}
  // />;

  /* -------------------- UPLOAD MODE -------------------- */
  // if (resumeMode === "edit" && !uploadedResume) {
  //   return (
  //     <ResumeUpload
  //       onUpload={setUploadedResume}
  //       onBack={() => setResumeMode(null)}
  //     />
  //   );
  // }

  /* -------------------- BUILDER PAGE -------------------- */
  return (
    <>
      <UserNavbar />
      {/* resume-builder-page */}
      <div className="p-2.5 mt-4">
        {/* main-header */}
        <div className="flex justify-between items-start mb-5 p-2">
          <h1 className="text-2xl font-['Outfit']">Create Resume</h1>
          <div className="flex gap-2">
            {/* upload-btn &  export-btn */}
            <button
              onClick={() => navigate("/user/cv")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 font-medium shadow-sm hover:bg-gray-50 hover:shadow-md transition-all"
            >
              <PenTool size={18} />
              CV Designer
            </button>
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
    </>
  );
};

export default ResumeBuilder;
