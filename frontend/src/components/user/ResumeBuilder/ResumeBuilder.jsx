import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Award,
  Briefcase,
  CheckCircle,
  Download,
  FolderKanban,
  GraduationCap,
  PenTool,
  Upload,
  User,
  Zap,
  Search,
  FileText,
  RefreshCw,
  Eye,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axios";

import FormTabs from "./FormTabs";

import PersonalInfoForm from "./forms/PersonalInfoForm";
import ExperienceForm from "./forms/ExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import ProjectsForm from "./forms/ProjectsForm";
import CertificationsForm from "./forms/CertificationsForm";

import LivePreview from "../Preview/LivePreview";
import TemplatesPage from "../Templates/TemplatesDashboardPage";
import { TEMPLATES } from "../Templates/TemplateRegistry";

import { getCompletionStatus } from "./completion";
import { dummyData } from "./dummyData";

import UserNavbar from "../UserNavBar/UserNavBar";

const ResumeBuilder = ({ setActivePage = () => { } }) => {
  /* -------------------- CORE STATE -------------------- */
  // const [formData, setFormData] = useState(dummyData);
  const [formData, setFormData] = useState(() => {
    try {
      const data = localStorage.getItem("resumeFormData");
      return data ? JSON.parse(data) : dummyData;
    } catch {
      return dummyData;
    }
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("resumeFormData", JSON.stringify(formData));
    }, 400);
    return () => clearTimeout(timeout);
  }, [formData]);

  const navigate = useNavigate();
  const [templates, setTemplates] = useState(TEMPLATES);
  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    const storedTemplate = localStorage.getItem("currentTemplate");
    return storedTemplate
      ? JSON.parse(storedTemplate)
      : TEMPLATES[0]?.id || "jessica-claire";
  });
  useEffect(() => {
    localStorage.setItem("currentTemplate", JSON.stringify(selectedTemplate));
  }, [selectedTemplate]);
  const [templateSearch, setTemplateSearch] = useState("");

  const [activeTab, setActiveTab] = useState("builder");
  const [activeSection, setActiveSection] = useState("personal");

  /*-----------To make the upload input functional-------------*/

  const input_file = useRef(null);
  const handleButtonClick = () => {
    input_file.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files;
    console.log(file);
  };

  /* -------------------- PREVIEW STATE -------------------- */
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);
  const [isPreviewHidden, setIsPreviewHidden] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showMobilePreview ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMobilePreview]);

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

  // ============== Completed Status ===========
  const [completion, setcompletion] = useState({});
  useEffect(() => {
    const statusInfo = getCompletionStatus(formData);
    setcompletion(statusInfo);
  }, [formData]);

  /* ------------Input Validation ------------- */
  const [warning, setWarning] = useState(false);
  const isInputValid = (label) => {
    return completion?.missingSections?.includes(label);
  };

  /*------------------- PREVIOUS & NEXT BUTTON ------------*/
  // PDF Generation
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const previewRef = useRef(null);
  const GenerateResumePDF = async (resumeHtml) => {
    try {
      setLoading(true);
      console.log("Resume html:", resumeHtml);

      const response = await axiosInstance.post(
        "/api/resume/generate-pdf",
        { html: resumeHtml },
        {
          responseType: "blob",
        },
      );
      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);
      console.log(url);

      const link = document.createElement("a");
      link.href = url;
      link.download = "resume.pdf";
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate resume PDF");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (e) => {
    if (exporting) return; // prevent double clicks

    const html = await previewRef.current?.getResumeHTML();
    if (!html) return;

    try {
      setExporting(true);
      await GenerateResumePDF(html);
    } finally {
      setExporting(false);
    }
  };

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

  /* --------------Handle scrolling ----------------------- */
  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    handleScroll();
  }, [activeSection]);

  const goLeft = () => {
    if (currentIdx > 0) {
      setActiveSection(tabs[currentIdx - 1].id);
      setWarning(false);
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

  /* -------------------- MAIN CONTENT -------------------- */
  const renderMainContent = () => {
    if (activeTab === "templates") {
      return (
        <TemplatesPage
          onSelectTemplate={handleSelectTemplate}
          isEmbedded={true}
          externalSearchTerm={templateSearch}
        />
      );
    }

    return (
      <>
        {/* Alert Banner */}
        <div
          className={`flex items-center w-full gap-3 p-4 border rounded-lg my-5 ${completion?.isComplete ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"} md:text-base text-sm md:flex-row flex-col select-none`}
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
                  Complete Your Resume
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
                  Resume Ready
                </strong>
                <p className="text-emerald-500 m-0 md:text-md text-xs">
                  Your resume is ready to export.
                </p>
              </div>
              <div className="flex gap-2 ml-auto flex-wrap">
                <span className="px-2.5 py-1 rounded-md font-medium bg-emerald-100 text-emerald-800 md:text-md text-xs">
                  Resume is Ready
                </span>
              </div>
            </>
          )}
        </div>



        {/* BUILDER + PREVIEW */}
        <div className="flex h-[calc(100vh-[180px])] gap-[10px] w-full mt-2 lg:mt-5 p-0 sm:p-2 lg:flex-row flex-col max-w-[1920px] mx-auto overflow-hidden">
          {/* builder-section */}
          <div className="bg-white rounded-xl h-full overflow-hidden flex flex-col w-full lg:w-[520px] shrink-0 border border-slate-200">
            <FormTabs
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              onTogglePreview={() => setShowMobilePreview(v => !v)}
            />
            {/* form-content */}
            <div className="w-full mt-5 overflow-auto flex-1 px-4">
              {warning && (
                <div className="text-sm text-red-700 bg-yellow-100 border border-yellow-300 px-4 py-2 my-2.5 rounded-lg">
                  Please fill in all required fields to continue.
                </div>
              )}
              {renderFormContent()}
            </div>
            {/* Previous & Next */}
            <div className="w-full flex items-center justify-between mt-auto p-4 border-t border-slate-100 bg-white">
              <button
                onClick={() => {
                  goLeft();
                }}
                disabled={currentIdx === 0}
                className="flex gap-1 items-center text-sm bg-slate-100 px-4 py-2 rounded-lg select-none disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ArrowLeft size={18} />
                <span>Previous</span>
              </button>
              <button
                onClick={() => {
                  if (isInputValid(tabs[currentIdx]?.label)) {
                    setWarning(true);
                    handleScroll();
                    return;
                  }
                  setWarning(false);
                  goRight();
                }}
                disabled={currentIdx === tabs.length - 1}
                className="flex gap-1 items-center text-sm bg-black text-white px-4 py-2 rounded-lg select-none disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <span>Next</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Preview Section */}
          <div
            className={`
              hidden lg:flex flex-col flex-1 min-w-0
              bg-white
              border border-gray-200
              shadow-sm
              rounded-xl
              overflow-hidden
              relative
            `}
          >
            <LivePreview
              ref={previewRef}
              formData={formData}
              currentTemplate={currentTemplate}
              isExpanded={isPreviewExpanded}
              onExpand={() => setIsPreviewExpanded(true)}
              onCollapse={() => setIsPreviewExpanded(false)}
              onMinimize={() => setIsPreviewHidden(true)}
            />
          </div>
        </div>
        <div className="w-full h-4"></div>

        {/* Mobile preview overlay */}
        {showMobilePreview && (
          <div className="lg:hidden fixed inset-0 z-50 flex flex-col">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowMobilePreview(false)}
            />
            <div
              className="relative mt-auto bg-white rounded-t-2xl shadow-2xl flex flex-col"
              style={{
                height: "92dvh",
                animation: "resumePreviewSlideUp 0.3s cubic-bezier(0.32,0.72,0,1)",
              }}
            >
              <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
                <div className="w-10 h-1 rounded-full bg-slate-300" />
              </div>
              <div className="flex items-center justify-between px-4 pb-2 flex-shrink-0">
                <span className="text-sm font-semibold text-slate-700">
                  Resume Preview
                </span>
                <button
                  onClick={() => setShowMobilePreview(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
                >
                  <X size={15} />
                </button>
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto w-full max-w-[100vw]">
                {/* On mobile overlay, we restrict max width to viewport width to prevent overflow */}
                <div className="w-full h-full p-2 bg-slate-50 text-black">
                  <LivePreview
                    formData={formData}
                    currentTemplate={currentTemplate}
                    isExpanded={false}
                    onExpand={() => { }}
                    onCollapse={() => { }}
                    onMinimize={() => { }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <style>{`
          @keyframes resumePreviewSlideUp {
            from { transform: translateY(100%); opacity: 0.5; }
            to   { transform: translateY(0);    opacity: 1;   }
          }
        `}</style>
      </>
    );
  };

  return (
    <>
      <UserNavbar />
      {/* resume-builder-page */}
      <div className="p-2.5 overflow-hidden font-sans tracking-[0.01em]">
        {/* main-header */}
        <div className="block md:flex items-center justify-between pr-5">
          <div className="w-full flex md:flex-row justify-between items-start md:items-center p-2 min-h-[50px] gap-4">
            {/* LEFT SIDE: Heading + Toggle */}
            <div className="flex md:flex-row md:items-center gap-4 w-full md:w-auto">
              {/* Title Section */}
              <div>
                <h1 className="text-2xl font-['Outfit']">
                  {activeTab === "builder"
                    ? "Create Resume"
                    : "Resume Templates"}
                </h1>
                {activeTab === "templates" && (
                  <p className="text-sm text-slate-500 mt-1 hidden md:block">
                    Choose a professionally designed template to get started.
                  </p>
                )}
              </div>

              {/* Toggle Switch */}
              <div className="bg-gray-100 gap-1 md:flex hidden rounded-2xl p-1 w-fit mx-auto md:mx-0">
                <button
                  className={`rounded-2xl md:py-1 py-1.5 md:px-3.5 px-4 text-sm ${activeTab === "builder" ? "bg-white text-slate-900 shadow-sm" : ""} select-none`}
                  onClick={() => setActiveTab("builder")}
                >
                  Builder
                </button>
                <button
                  className={`py-1 px-2.5 rounded-2xl text-sm ${activeTab === "templates" ? "bg-white text-slate-900 shadow-sm" : ""} select-none`}
                  onClick={() => setActiveTab("templates")}
                >
                  Templates
                </button>
              </div>
            </div>

            {/* RIGHT SIDE: Actions or Search */}
            <div className="md:w-auto flex items-center justify-end gap-2">
              {activeTab === "builder" && (
                <>
                  <button
                    onClick={() => navigate("/user/cover-letter")}
                    className="items-center gap-2 px-4 py-2 rounded-lg hidden md:flex border border-gray-300 bg-white text-gray-800 font-medium shadow-sm hover:bg-black hover:text-white transition-all duration-200 select-none"
                  >
                    <FileText size={18} />
                    Create Cover Letter
                  </button>
                  <button
                    onClick={handleButtonClick}
                    className="flex gap-2 text-white cursor-pointer bg-black border-0 rounded-lg text-sm transition-all duration-200 select-none md:hover:bg-black/70 py-2 px-5 md:py-2.5 md:px-5"
                  >
                    <Upload size={18} />
                    <span className="hidden md:inline">Upload</span>
                  </button>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    ref={input_file}
                    onChange={handleFileChange}
                  />
                  <button
                    className="flex gap-2 text-white cursor-pointer bg-indigo-600 border-0 rounded-lg select-none text-sm transition-all duration-200 hover:bg-indigo-700 hover:to-indigo-800 disabled:opacity-30 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-gray-100 py-2 px-5 md:py-2.5 md:px-5"
                    onClick={(e) => handleDownload(e)}
                    disabled={!completion.isComplete}
                  >
                    {loading ? (
                      <RefreshCw size={18} className={`ml-1 animate-spin`} />
                    ) : (
                      <Download size={18} />
                    )}
                    <span className="hidden md:inline">Download</span>
                  </button>
                </>
              )}
            </div>
          </div>
          {/* main-tabs */}
          <div className="bg-gray-200 md:hidden flex gap-1 rounded-2xl p-1 w-fit my-3 mb-5 mx-auto md:mx-0">
            <button
              className={`flex-1 mr-1 rounded-xl py-1.5 md:px-2.5 px-4 text-sm ${activeTab === "builder" ? "bg-white text-slate-900 shadow-sm" : ""} select-none`}
              onClick={() => setActiveTab("builder")}
            >
              Builder
            </button>
            <button
              className={`flex-1 py-1 px-2.5 rounded-xl text-sm ${activeTab === "templates" ? "bg-white text-slate-900 shadow-sm" : ""} select-none`}
              onClick={() => setActiveTab("templates")}
            >
              Templates
            </button>
          </div>
          {activeTab !== "builder" && (
            /* Search Bar for Templates */
            <div className="relative w-full md:w-80">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search templates..."
                value={templateSearch}
                onChange={(e) => setTemplateSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full shadow-sm"
              />
            </div>
          )}
        </div>
        {/* main-tabs */}
        <div className="bg-gray-200 md:hidden flex gap-1 rounded-2xl p-1 w-fit my-5 mx-auto md:mx-0">
          <button
            className={`flex-1 mr-1 rounded-xl py-1.5 md:px-2.5 px-4 text-sm ${activeTab === "builder" ? "bg-white text-slate-900 shadow-sm" : ""} select-none`}
            onClick={() => setActiveTab("builder")}
          >
            Builder
          </button>
          <button
            className={`flex-1 py-1 px-2.5 rounded-xl text-sm ${activeTab === "templates" ? "bg-white text-slate-900 shadow-sm" : ""} select-none`}
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
