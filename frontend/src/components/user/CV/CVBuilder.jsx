import React, { useState, useEffect, useRef } from "react";
import FormTabs from "./FormTabs";
import UserNavBar from "../UserNavBar/UserNavBar";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  Save,
  Upload,
  FileText,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  PenTool,
  Download,
} from "lucide-react";
import {
  User,
  Briefcase,
  GraduationCap,
  Zap,
  FolderKanban,
  Award,
} from "lucide-react";

// Import existing Forms
import PersonalInfoForm from "./forms/PersonalInfoForm";
import ExperienceForm from "./forms/ExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import ProjectsForm from "./forms/ProjectsForm";
import CertificationsForm from "./forms/CertificationsForm";
import CVPreview from "./CVPreview";
import "./CVBuilder.css";

const sections = [
  "personal",
  "education",
  "work",
  "projects",
  "certs",
  "skills",
];

const CVBuilder = () => {
  /* -------------------- STATE -------------------- */
  const formContainerRef = useRef(null);
  const [activeSection, setActiveSection] = useState("personal");
  const [activeTab, setActiveTab] = useState("builder");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    summary: "",
    experience: [
      {
        id: 1,
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        id: 2,
        school: "",
        degree: "",
        location: "",
        graduationDate: "",
        gpa: "",
      },
    ],
    skills: { technical: [], soft: [] },
    projects: [
      {
        id: 3,
        name: "",
        description: "",
        technologies: "",
        link: "",
      },
    ],
    certifications: [
      {
        id: 4,
        name: "",
        issuer: "",
        date: "",
        link: "",
      },
    ],
  });

  const [isPreviewMaximized, setIsPreviewMaximized] = useState(false);
  const [isPreviewHidden, setIsPreviewHidden] = useState(false);

  /* -------------------- LOAD DATA -------------------- */
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/resume", {
          withCredentials: true,
        });
        if (res.data && res.data?.length > 0) {
          const latestResume = res.data[0];
          if (latestResume.data) {
            setFormData((prev) => ({ ...prev, ...latestResume.data }));
          }
          toast.success("CV loaded successfully");
        }
      } catch (error) {
        console.error("Error loading CV:", error);
      }
    };
    fetchResume();
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (formContainerRef.current) {
      formContainerRef.current.scrollTop = 0;
    }
  }, [activeSection]);

  /* -------------------- HELPERS -------------------- */
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /* ---------- STEP NAVIGATION ---------- */
  const currentIndex = sections.indexOf(activeSection);

  const goNext = () => {
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1]);
    }
  };

  const goPrevious = () => {
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1]);
    }
  };

  /* -------------------- RENDER FORM -------------------- */
  const renderFormContent = () => {
    switch (activeSection) {
      case "personal":
        return (
          <PersonalInfoForm
            formData={formData}
            onInputChange={handleInputChange}
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

  // --------
  return (
    <>
      <UserNavBar />
      <div className="p-2.5 mt-4">
        {/* main-header */}
        <div className="flex flex-row gap-4 mb-5 p-2 justify-between items-center">
          <h1 className="text-2xl font-['Outfit'] select-none">Create CV</h1>

          <div className="flex flex-wrap justify-center md:justify-end items-center gap-2">
            {/* upload-btn */}
            <button className="flex gap-2 items-center text-white cursor-pointer bg-gradient-to-br from-blue-600 to-blue-700 border-0 rounded-lg text-sm transition-all duration-200 hover:from-blue-700 hover:to-blue-800 py-2 px-5 md:py-2.5 md:px-5">
              <Upload size={18} />
              <span className="hidden md:inline">Upload</span>
            </button>

            {/* export-btn */}
            <button className="flex gap-2 items-center text-white cursor-pointer bg-indigo-600 border-0 rounded-lg text-sm transition-all duration-200 hover:bg-indigo-700 py-2 px-5 md:py-2.5 md:px-5">
              <Download size={18} />
              <span className="hidden md:inline">Export</span>
            </button>
          </div>
        </div>

        {/* main-tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-lg md:p-1.5 py-2 px-3 mb-4 w-fit mx-auto md:mx-0">
          <button
            className={`mr-1 rounded-lg md:py-1 py-2.5 md:px-2.5 px-4 ${activeTab === "builder" ? "bg-white text-slate-900 shadow-sm" : ""} select-none`}
            onClick={() => setActiveTab("builder")}
          >
            Builder
          </button>
          <button
            className={`py-1 px-2.5 rounded-lg ${activeTab === "templates" ? "bg-white text-slate-900 shadow-sm" : ""} select-none`}
            onClick={() => setActiveTab("templates")}
          >
            Templates
          </button>
        </div>

        {/* ALERT */}
        {activeTab === "builder" && (
          <div className="flex items-center w-full gap-3 p-4 bg-amber-50 border border-amber-200 rounded-[10px] mb-5">
            <AlertTriangle size={20} />
            <div>
              <strong className="block text-sm text-amber-800 mb-0.5">
                Complete Your CV
              </strong>
              <p className="text-sm text-yellow-700 m-0">
                Fill in all sections to create a professional CV
              </p>
            </div>
            <div className="flex gap-2 ml-auto flex-wrap">
              <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-amber-100 text-amber-800">
                Personal Info
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-amber-100 text-amber-800">
                Experience
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-100 text-emerald-800">
                Skills
              </span>
            </div>
          </div>
        )}
        {/* MOBILE LIVE PREVIEW (below alert) */}
        {activeTab === "builder" && (
          <div className="block lg:hidden my-4">
            {!isPreviewHidden && (
              <CVPreview
                formData={formData}
                isMaximized={isPreviewMaximized}
                onToggleMaximize={() =>
                  setIsPreviewMaximized(!isPreviewMaximized)
                }
                onMinimize={() => setIsPreviewHidden(true)}
              />
            )}
          </div>
        )}

        {/* BUILDER + PREVIEW */}
        {activeTab === "builder" && (
          <div
            className={`
    grid gap-6 p-1.5 mx-2
    grid-cols-1
    lg:grid-cols-[32%_68%]
    ${isPreviewMaximized ? "lg:grid-cols-[0_100%]" : ""}
  `}
          >
            {/* builder-section */}
            <div
              className="bg-white rounded-xl h-full overflow-y-auto pl-0.5 overflow-hidden flex-1"
              ref={formContainerRef}
            >
              <FormTabs
                activeSection={activeSection}
                setActiveSection={setActiveSection}
              />
              {/* form-content */}
              <div className="w-full max-h-[60vh] lg:max-h-none mt-5 overflow-auto cv-form-content-scrollable">
                {renderFormContent()}
              </div>
              {/* Previous & Next */}
              <div className="w-full flex items-center justify-between mt-10">
                <button
                  onClick={goPrevious}
                  disabled={currentIndex === 0}
                  className="flex gap-1 items-center text-sm bg-slate-100 px-4 py-2 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ArrowLeft size={18} />
                  <span>Previous</span>
                </button>
                <button
                  onClick={goNext}
                  disabled={currentIndex === sections.length - 1}
                  className="flex gap-1 items-center text-sm bg-black text-white px-4 py-2 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <span>Next</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* DESKTOP LIVE PREVIEW */}
            <div className="hidden lg:block">
              {!isPreviewHidden && (
                <CVPreview
                  formData={formData}
                  isMaximized={isPreviewMaximized}
                  onToggleMaximize={() =>
                    setIsPreviewMaximized(!isPreviewMaximized)
                  }
                  onMinimize={() => setIsPreviewHidden(true)}
                />
              )}
            </div>
          </div>
        )}
        <div className="w-full h-4"></div>
      </div>
    </>
  );
};

export default CVBuilder;
