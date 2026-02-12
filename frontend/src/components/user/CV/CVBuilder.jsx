import React, { useState, useEffect ,useRef} from "react";
import FormTabs from "./FormTabs";

import html2pdf from "html2pdf.js";


import UserNavBar from "../UserNavBar/UserNavBar";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Save, Upload, FileText, AlertTriangle, ArrowLeft, ArrowRight, PenTool, Download } from "lucide-react";
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
  // ===== Upload CV =====
const fileInputRef = useRef(null);

const handleUploadClick = () => {
  fileInputRef.current.click();
};

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  console.log("Uploaded CV file:", file);
  toast.success("CV uploaded successfully");
};

// ===== Download CV =====
const handleDownloadCV = () => {
  const element = document.getElementById("cv-preview");

  if (!element) {
    toast.error("CV preview not found");
    return;
  }

  html2pdf()
    .set({
      margin: 0.5,
      filename: "CV.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    })
    .from(element)
    .save(); 
};



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
const [warning, setWarning] = useState(false);

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
      behavior: "smooth"
    });
    if (formContainerRef.current) {
      formContainerRef.current.scrollTop = 0;
    }
  }, [activeSection]);

//   useEffect(() => {
//   setWarning(false);
// }, [activeSection]);

  /* -------------------- HELPERS -------------------- */
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setWarning(false);
  };

const validateSection = () => {
  switch (activeSection) {
    case "personal":
      return (
        formData.fullName.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.phone.trim() !== ""
      );

    case "education":
  const validEducation = formData.education.filter(
    (edu) => edu.school.trim() !== "" || edu.degree.trim() !== ""
  );

  return (
    validEducation.length > 0 &&
    validEducation.every(
      (edu) =>
        edu.school.trim() !== "" &&
        edu.degree.trim() !== ""
    )
  );


   case "work":
  const validExperience = formData.experience.filter(
    (exp) => exp.title.trim() !== "" || exp.company.trim() !== ""
  );

  return (
    validExperience.length > 0 &&
    validExperience.every(
      (exp) =>
        exp.title.trim() !== "" &&
        exp.company.trim() !== ""
    )
  );


    case "projects":
      return formData.projects.every(
        (proj) =>
          proj.name.trim() !== "" &&
          proj.description.trim() !== ""
      );

    case "certs":
      return formData.certifications.every(
        (cert) =>
          cert.name.trim() !== "" &&
          cert.issuer.trim() !== ""
      );

    case "skills":
      return (
        formData.skills.technical.length > 0 ||
        formData.skills.soft.length > 0
      );

    default:
      return true;
  }
};


  /* ---------- STEP NAVIGATION ---------- */
  const currentIndex = sections.indexOf(activeSection);
  const isLastStep = currentIndex === sections.length - 1;
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  if (formContainerRef.current) {
    formContainerRef.current.scrollTop = 0;
  }
};


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
      {/* main-header */}
<div className="flex items-center mb-5 p-2">
  {/* Title */}
  <h1 className="text-2xl font-['Outfit']">Create CV</h1>

  {/* Buttons pinned right */}
  <div className="ml-auto flex gap-2 items-center">
    {/* Upload */}
    <button
      onClick={handleUploadClick}
      className="
        flex items-center justify-center gap-2
        bg-black text-white rounded-lg
        h-10 w-10 md:w-auto
        md:px-5 md:py-2.5
        transition-all duration-200
      "
    >
      <Upload size={18} />
      <span className="hidden md:inline">Upload</span>
    </button>

    <input
      type="file"
      ref={fileInputRef}
      className="hidden"
      accept=".pdf,.doc,.docx"
      onChange={handleFileChange}
    />

    {/* Download */}
    <button
  onClick={handleDownloadCV}
  disabled={!isLastStep}
  className={`
    flex items-center justify-center gap-2
    h-10 w-10 md:w-auto
    md:px-6 md:py-2.5 rounded-lg font-semibold
    transition-all duration-200

    ${isLastStep
      ? "bg-indigo-600 text-white hover:bg-indigo-700"
      : "bg-indigo-300 text-white cursor-not-allowed"}
  `}
>
  <Download size={18} />
  <span className="hidden md:inline">Download</span>
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

        {/* BUILDER + PREVIEW */}
        {activeTab === "builder" && (
          <div
  className={`grid grid-cols-1 md:grid-cols-[32%_68%] gap-6 md:gap-14 p-1.5 ml-2 mr-2 ${
    isPreviewMaximized ? "md:grid-cols-[0_100%]" : ""
  }`}
>

            {/* builder-section */}
            <div className="bg-white rounded-xl h-full w-full overflow-y-auto px-3 md:px-0 flex-1">

              <FormTabs
                activeSection={activeSection}
                setActiveSection={setActiveSection}
              />
              {/* form-content */}
              <div className="w-full mt-5 overflow-auto cv-form-content-scrollable">
{warning && (
  <div className="text-sm text-red-700 bg-yellow-100 border border-yellow-300 px-4 py-2 my-2.5 rounded-lg">
    Please fill in all required fields to continue.
  </div>
)}

                {renderFormContent()}
              </div>
              {/* Previous & Next */}
              <div className="w-full flex items-center justify-between mt-6 md:mt-10 pb-4">


                <button
                  onClick={goPrevious}
                  disabled={currentIndex === 0}
                  
                  className="flex gap-1 items-center text-sm bg-slate-100 px-4 py-2 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ArrowLeft size={18} />
                  <span>Previous</span>
                </button>
                <button
  onClick={() => {
    if (!validateSection()) {
      setWarning(true);
      scrollToTop();  
      return;
    }
    setWarning(false);
    goNext();
  }}

                  disabled={currentIndex === sections.length - 1}
                  className="flex gap-1 items-center text-sm bg-black text-white px-4 py-2 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <span>Next</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            <div className="hidden md:block">
  {!isPreviewHidden && (
    <CVPreview
      formData={formData}
      isMaximized={isPreviewMaximized}
      onToggleMaximize={() => setIsPreviewMaximized(!isPreviewMaximized)}
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