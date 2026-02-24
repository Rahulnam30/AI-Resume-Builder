import React, { useState, useEffect, useRef } from "react";
import FormTabs from "./FormTabs";
import UserNavBar from "../UserNavBar/UserNavBar";
import axios from "axios";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

// Import Forms
import PersonalInfoForm from "./forms/PersonalInfoForm";
import ExperienceForm from "./forms/ExperienceForm";
import EducationForm from "./forms/EducationForm";
import ProjectsForm from "./forms/ProjectsForm";
import CertificationsForm from "./forms/CertificationsForm";
import CVPreview from "./CVPreview";
import TemplatesGallery from "./Templatesgallery";
import CVTemplates from "./Cvtemplates";
import mergeWithSampleData from "../../../utils/Datahelpers";

import CVBuilderTopBar from "./Cvbuildernavbar";
import ResumeCompletionBanner from "./ResumeCompletionBanner";
import "./CVBuilder.css";
import SkillsForm from "./forms/skillsForm";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/* ================= CONSTANTS ================= */
const sections = [
  "personal",
  "work",
  "education",
  "skills",
  "projects",
  "certifications",
];

const generateId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

/* ================= DEFAULT RESUME ================= */
const createEmptyResume = () => ({
  title: "Untitled CV",
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
      id: generateId(),
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
      id: generateId(),
      title: "",
      school: "",
      degree: "",
      location: "",
      graduationDate: "",
      gpa: "",
    },
  ],
  skills: { technical: [], soft: [] },
  projects: [
    { id: generateId(), name: "", description: "", technologies: "", link: "" },
  ],
  certifications: [
    { id: generateId(), name: "", issuer: "", date: "", link: "" },
  ],
});

/* ─── PDF export constants (must match PaginatedPreview) ─── */
const PDF_PAGE_WIDTH_PX = 794; // px at 96dpi  →  210 mm
const PDF_PAGE_HEIGHT_PX = 1123; // px at 96dpi  →  297 mm

/* ================= COMPONENT ================= */
const CVBuilder = () => {
  const formContainerRef = useRef(null);

  const [activeTab, setActiveTab] = useState("builder");
  const [activeSection, setActiveSection] = useState("personal");
  const [selectedTemplate, setSelectedTemplate] = useState("professional");
  const [formData, setFormData] = useState(() => createEmptyResume());

  const [resumeId, setResumeId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isPreviewMaximized, setIsPreviewMaximized] = useState(false);
  const [isAiMode, setIsAiMode] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Lock body scroll when mobile preview is open
  useEffect(() => {
    document.body.style.overflow = showMobilePreview ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMobilePreview]);

  /* ================= DOWNLOAD PDF ================= */
  /**
   * Strategy:
   *   1. Render the CV template into a temporary off-screen container at
   *      FULL (794 px) width so html2canvas gets a faithful render.
   *   2. Capture with html2canvas at 3× scale for crisp output.
   *   3. Slice the tall canvas into A4-sized pages and add each to jsPDF.
   */
  const downloadPDF = async () => {
    const TemplateComponent = CVTemplates[selectedTemplate];
    if (!TemplateComponent) {
      toast.error("No template selected");
      return;
    }

    setIsDownloading(true);

    // --- 1. Create a temporary full-size render container ---
    const container = document.createElement("div");
    Object.assign(container.style, {
      position: "fixed",
      top: "0",
      left: "-9999px",
      width: `${PDF_PAGE_WIDTH_PX}px`,
      background: "#ffffff",
      zIndex: "-1",
    });
    document.body.appendChild(container);

    // --- 2. Render the React component into it ---
    const { createRoot } = await import("react-dom/client");
    const displayData = mergeWithSampleData(formData);

    await new Promise((resolve) => {
      const root = createRoot(container);
      root.render(<TemplateComponent formData={displayData} />);
      // Give fonts / images a moment to settle
      setTimeout(resolve, 400);
    });

    try {
      // --- 3. Capture with html2canvas ---
      const canvas = await html2canvas(container, {
        scale: 3, // 3× = ~288 dpi
        useCORS: true,
        logging: false,
        windowWidth: PDF_PAGE_WIDTH_PX,
      });

      // --- 4. Build PDF page-by-page ---
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const mmPageW = 210;
      const mmPageH = 297;
      const pxPerMm = canvas.width / mmPageW; // canvas px per mm
      const pxSliceH = Math.round(mmPageH * pxPerMm); // canvas px per A4 page

      let yPx = 0;
      let firstPage = true;

      while (yPx < canvas.height) {
        const sliceH = Math.min(pxSliceH, canvas.height - yPx);

        // Extract a horizontal slice from the full canvas
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = pxSliceH; // keep height constant so aspect is correct
        const ctx = pageCanvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        ctx.drawImage(
          canvas,
          0,
          yPx,
          canvas.width,
          sliceH,
          0,
          0,
          canvas.width,
          sliceH,
        );

        const imgData = pageCanvas.toDataURL("image/jpeg", 0.96);

        if (!firstPage) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, 0, mmPageW, mmPageH);

        yPx += sliceH;
        firstPage = false;
      }

      // Save with proper name
      const clean = (str) =>
        str
          ?.replace(/[^a-z0-9_\- ]/gi, "")
          .trim()
          .replace(/\s+/g, "_");

      const name = clean(displayData?.fullName) || "Resume";
      const template = clean(selectedTemplate) || "Template";

      pdf.save(`${name}_${template}.pdf`);

      document.body.removeChild(container);
      setIsDownloading(false);


      toast.success("PDF downloaded!");
    } catch (err) {
      console.error("PDF download error:", err);
      toast.error("Failed to download PDF. Please try again.");
    } finally {
      // --- 6. Clean up the temporary container ---
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
      setIsDownloading(false);
    }
  };

  /* ================= LOAD RESUME ================= */
  useEffect(() => {
    const controller = new AbortController();
    const fetchResume = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/resume", {
          withCredentials: true,
          signal: controller.signal,
        });
        if (Array.isArray(res.data) && res.data.length > 0) {
          const latestResume = res.data[0];
          setResumeId(latestResume._id);
          if (latestResume.data) {
            setFormData((prev) => ({
              ...prev,
              ...latestResume.data,
              title: latestResume.title || prev.title, // Load title if exists
              skills: {
                technical: latestResume.data?.skills?.technical ?? [],
                soft: latestResume.data?.skills?.soft ?? [],
              },
            }));
          }
          if (latestResume.templateId)
            setSelectedTemplate(latestResume.templateId);
          toast.success("Resume loaded successfully");
        }
      } catch (error) {
        if (error.name !== "CanceledError")
          console.error("Error loading resume:", error);
      }
    };
    fetchResume();
    return () => controller.abort();
  }, []);

  /* ================= AUTO-SCROLL ================= */
  useEffect(() => {
    formContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  /* ================= SAVE ================= */
  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      const payload = {
        title: formData.title || "Untitled CV",
        templateId: selectedTemplate,
        data: formData,
      };
      if (resumeId) {
        await axios.put(
          `http://localhost:5000/api/resume/${resumeId}`,
          payload,
          {
            withCredentials: true,
          },
        );
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/resume",
          payload,
          {
            withCredentials: true,
          },
        );
        setResumeId(res.data?._id);
      }
      toast.success("Resume saved successfully!");
    } catch (error) {
      console.error("Error saving resume:", error);
      toast.error("Failed to save resume");
    } finally {
      setIsSaving(false);
    }
  };

  /* ================= FORM UPDATES ================= */
  const handleInputChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    setActiveTab("builder");
    toast.success(`Template changed to ${templateId}`);
  };

  /* ================= SECTION NAV ================= */
  const currentIndex = sections.indexOf(activeSection);
  const goNext = () => {
    if (currentIndex < sections.length - 1)
      setActiveSection(sections[currentIndex + 1]);
  };
  const goPrevious = () => {
    if (currentIndex > 0) setActiveSection(sections[currentIndex - 1]);
  };

  /* ================= FORM RENDER ================= */
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
      case "certifications":
        return (
          <CertificationsForm formData={formData} setFormData={setFormData} />
        );
      default:
        return null;
    }
  };

  const previewProps = { formData, selectedTemplate };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <UserNavBar />

      <CVBuilderTopBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSave={handleSave}
        onDownload={downloadPDF} // ← pass the real handler
        isSaving={isSaving}
        title={formData.title}
        onTitleChange={handleInputChange}
        isAiMode={isAiMode}
        onToggleAiMode={() => setIsAiMode(!isAiMode)}
        isDownloading={isDownloading}
      />

      {activeTab === "builder" && (
        <div className="px-4">
          <ResumeCompletionBanner
            missingSections={[
              "Personal Info",
              "Experience / Education",
              "Skills",
            ]}
          />
        </div>
      )}

      <div className="flex-1 px-4 pb-8">
        {activeTab === "builder" && (
          <div className="flex h-[calc(100vh-180px)] gap-6">
            {!isPreviewMaximized && (
              <div className="w-full lg:max-w-[520px] flex flex-col h-[calc(100vh-180px)] sticky top-[180px]">
                <div className="flex flex-col bg-white rounded-xl shadow-sm h-full">
                  <div className="sticky top-0 z-10 bg-white border-b px-4 py-3 rounded-t-xl">
                    <FormTabs
                      activeSection={activeSection}
                      setActiveSection={setActiveSection}
                      showPreview={showMobilePreview}
                      onTogglePreview={() => setShowMobilePreview((v) => !v)}
                    />
                  </div>
                  <div
                    ref={formContainerRef}
                    className="flex-1 overflow-y-auto p-6"
                    style={{ maxHeight: "calc(100vh - 180px - 60px)" }}
                  >
                    {renderFormContent()}
                    <div className="flex justify-between mt-8">
                      <button
                        onClick={goPrevious}
                        disabled={currentIndex === 0}
                        className="px-6 py-2.5 rounded-lg bg-slate-200 text-slate-700 font-medium disabled:opacity-40 hover:bg-slate-300 transition-colors"
                      >
                        ← Previous
                      </button>
                      <button
                        onClick={goNext}
                        disabled={currentIndex === sections.length - 1}
                        className="px-6 py-2.5 rounded-lg bg-black text-white font-medium disabled:opacity-40 hover:bg-slate-800 transition-colors"
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Desktop preview */}
            <div className="hidden lg:flex flex-1 min-w-0 overflow-y-auto">
              <CVPreview
                {...previewProps}
                isMaximized={isPreviewMaximized}
                onToggleMaximize={() => setIsPreviewMaximized((v) => !v)}
              />
            </div>
          </div>
        )}

        {activeTab === "templates" && (
          <TemplatesGallery
            selectedTemplate={selectedTemplate}
            onSelectTemplate={handleTemplateSelect}
            formData={formData}
          />
        )}
      </div>

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
              animation: "cvPreviewSlideUp 0.3s cubic-bezier(0.32,0.72,0,1)",
            }}
          >
            <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
              <div className="w-10 h-1 rounded-full bg-slate-300" />
            </div>
            <div className="flex items-center justify-between px-4 pb-2 flex-shrink-0">
              <span className="text-sm font-semibold text-slate-700">
                CV Preview
              </span>
              <button
                onClick={() => setShowMobilePreview(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
              >
                <X size={15} />
              </button>
            </div>
            <div className="flex-1 min-h-0 overflow-hidden">
              <CVPreview
                {...previewProps}
                isMaximized={false}
                onToggleMaximize={() => { }}
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes cvPreviewSlideUp {
          from { transform: translateY(100%); opacity: 0.5; }
          to   { transform: translateY(0);    opacity: 1;   }
        }
      `}</style>
    </div>
  );
};

export default CVBuilder;
