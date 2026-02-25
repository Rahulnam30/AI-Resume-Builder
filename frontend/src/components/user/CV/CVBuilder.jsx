import React, { useState, useEffect, useRef } from "react";
import FormTabs from "./FormTabs";
import UserNavBar from "../UserNavBar/UserNavBar";
import axios from "axios";
import axiosInstance from "../../../api/axios"; // ✅ ADDED
import { toast } from "react-hot-toast";
import { X } from "lucide-react";


// Forms
import PersonalInfoForm from "./forms/PersonalInfoForm";
import ExperienceForm from "./forms/ExperienceForm";
import EducationForm from "./forms/EducationForm";
import ProjectsForm from "./forms/ProjectsForm";
import CertificationsForm from "./forms/CertificationsForm";
import SkillsForm from "./forms/skillsForm";


// Preview + Templates
import CVPreview from "./CVPreview";
import TemplatesGallery from "./Templatesgallery";
import CVTemplates from "./Cvtemplates";
import mergeWithSampleData from "../../../utils/Datahelpers";


import CVBuilderTopBar from "./Cvbuildernavbar";
import ResumeCompletionBanner from "./ResumeCompletionBanner";
import "./CVBuilder.css";


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


/* ================= DEFAULT CV ================= */
const createEmptyResume = () => ({
  fullName: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  linkedin: "",
  github: "",
  summary: "",
  experience: [
    { id: generateId(), title: "", company: "", location: "", startDate: "", endDate: "", description: "" },
  ],
  education: [
    { id: generateId(), school: "", degree: "", location: "", graduationDate: "", gpa: "" },
  ],
  skills: { technical: [], soft: [] },
  projects: [{ id: generateId(), name: "", description: "", technologies: "", link: "" }],
  certifications: [{ id: generateId(), name: "", issuer: "", date: "", link: "" }],
});


const PDF_PAGE_WIDTH_PX = 794;


/* ======================================================
   COMPONENT
====================================================== */
const CVBuilder = () => {
  const formContainerRef = useRef(null);


  const [activeTab, setActiveTab] = useState("builder");
  const [activeSection, setActiveSection] = useState("personal");
  const [selectedTemplate, setSelectedTemplate] = useState("professional");
  const [formData, setFormData] = useState(() => createEmptyResume());


  const [resumeId, setResumeId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isPreviewMaximized, setIsPreviewMaximized] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);


  /* ======================================================
     SAVE CV DOWNLOAD RECORD (same as CoverLetter)
  ====================================================== */
  const saveDownloadRecord = async (html, format = "PDF") => {
    try {
      await axiosInstance.post("/api/downloads", {
        name: `CV - ${formData.fullName || "Document"}`,
        type: "cv",
        format,
        html,
        template: selectedTemplate,
        size: format === "PDF" ? "250 KB" : "200 KB",
      });
    } catch (err) {
      console.error("Failed to save CV download:", err);
    }
  };


  /* ======================================================
     SAVE CV TO DOWNLOADS COLLECTION (for preview)
  ====================================================== */
  const saveCVToDownloads = async () => {
    try {
      // Generate HTML for the CV using the current template
      const TemplateComponent = CVTemplates[selectedTemplate];
      if (!TemplateComponent) return;


      const container = document.createElement("div");
      Object.assign(container.style, {
        position: "fixed",
        top: "0",
        left: "-9999px",
        width: `${PDF_PAGE_WIDTH_PX}px`,
        background: "#ffffff",
      });
      document.body.appendChild(container);


      const { createRoot } = await import("react-dom/client");
      const displayData = mergeWithSampleData(formData);


      await new Promise((resolve) => {
        const root = createRoot(container);
        root.render(<TemplateComponent formData={displayData} />);
        setTimeout(resolve, 400);
      });


      // Get the HTML and save to downloads
      const html = container.innerHTML;
      await saveDownloadRecord(html, "PDF");
     
      document.body.removeChild(container);
      console.log('CV saved to downloads collection');
    } catch (err) {
      console.error("Failed to save CV to downloads:", err);
    }
  };


  /* ================= DOWNLOAD PDF ================= */
  const downloadPDF = async () => {
    const TemplateComponent = CVTemplates[selectedTemplate];
    if (!TemplateComponent) {
      toast.error("No template selected");
      return;
    }


    setIsDownloading(true);


    const container = document.createElement("div");
    Object.assign(container.style, {
      position: "fixed",
      top: "0",
      left: "-9999px",
      width: `${PDF_PAGE_WIDTH_PX}px`,
      background: "#ffffff",
    });
    document.body.appendChild(container);


    const { createRoot } = await import("react-dom/client");
    const displayData = mergeWithSampleData(formData);


    await new Promise((resolve) => {
      const root = createRoot(container);
      root.render(<TemplateComponent formData={displayData} />);
      setTimeout(resolve, 400);
    });


    try {
      const canvas = await html2canvas(container, {
        scale: 3,
        useCORS: true,
        windowWidth: PDF_PAGE_WIDTH_PX,
      });


      const pdf = new jsPDF("p", "mm", "a4");


      const mmPageW = 210;
      const mmPageH = 297;
      const marginMm = 30;
      const contentW = mmPageW - 2 * marginMm;
      const contentH = mmPageH - marginMm;


      const pxPerMm = canvas.width / mmPageW;
      const pxContentH = Math.round(contentH * pxPerMm);


      let yPx = 0;
      let firstPage = true;


      while (yPx < canvas.height) {
        const sliceH = Math.min(pxContentH, canvas.height - yPx);


        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = pxContentH;


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
          sliceH
        );


        const imgData = pageCanvas.toDataURL("image/jpeg", 0.96);


        if (!firstPage) pdf.addPage();
        pdf.addImage(imgData, "JPEG", marginMm, marginMm, contentW, contentH);


        yPx += sliceH;
        firstPage = false;
      }


      const clean = (str) =>
        str?.replace(/[^a-z0-9_\- ]/gi, "").trim().replace(/\s+/g, "_");


      const name = clean(displayData?.fullName) || "CV";
      const template = clean(selectedTemplate) || "Template";


      pdf.save(`${name}_${template}.pdf`);


      /* 🔥 SAVE TO DOWNLOADS COLLECTION */
      const html = container.innerHTML;
      await saveDownloadRecord(html, "PDF");


      toast.success("CV downloaded!");
    } catch (err) {
      console.error("PDF download error:", err);
      toast.error("Failed to download PDF.");
    } finally {
      document.body.removeChild(container);
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
              skills: {
                technical: latestResume.data?.skills?.technical ?? [],
                soft: latestResume.data?.skills?.soft ?? [],
              },
            }));
          }


          if (latestResume.templateId)
            setSelectedTemplate(latestResume.templateId);


          toast.success("Resume loaded");
        }
      } catch (error) {
        if (error.name !== "CanceledError")
          console.error("Error loading resume:", error);
      }
    };


    fetchResume();
    return () => controller.abort();
  }, []);


  useEffect(() => {
    document.body.style.overflow = showMobilePreview ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [showMobilePreview]);


  useEffect(() => {
    formContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);


  /* ================= SAVE ================= */
  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);


    try {
      const payload = {
        title: formData.fullName
          ? `${formData.fullName}'s Resume`
          : "My Resume",
        templateId: selectedTemplate,
        data: formData,
      };


      if (resumeId) {
        await axios.put(
          `http://localhost:5000/api/resume/${resumeId}`,
          payload,
          { withCredentials: true }
        );
      } else {
        const res = await axios.post(
          `http://localhost:5000/api/resume`,
          payload,
          { withCredentials: true }
        );
        setResumeId(res.data?._id);
      }


      // Also save to downloads collection for preview functionality
      await saveCVToDownloads();


      toast.success("Resume saved!");
    } catch (error) {
      console.error("Error saving resume:", error);
      toast.error("Failed to save");
    } finally {
      setIsSaving(false);
    }
  };


  const handleInputChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));


  const previewProps = { formData, selectedTemplate };


  /* ================= RENDER ================= */
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <UserNavBar />


      <CVBuilderTopBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSave={handleSave}
        onDownload={downloadPDF}
        isSaving={isSaving}
        isDownloading={isDownloading}
      />


      {activeTab === "builder" && (
        <div className="px-4">
          <ResumeCompletionBanner />
        </div>
      )}


      <div className="flex-1 px-4 pb-8">
        {activeTab === "builder" && (
          <div className="flex h-[calc(100vh-180px)] gap-6">
            {/* FORM */}
            <div className="w-full lg:max-w-[520px] flex flex-col">
              <div className="bg-white rounded-xl shadow-sm h-full">
                <div className="border-b px-4 py-3">
                  <FormTabs
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                  />
                </div>


                <div
                  ref={formContainerRef}
                  className="flex-1 overflow-y-auto p-6"
                >
                  {activeSection === "personal" && (
                    <PersonalInfoForm
                      formData={formData}
                      onInputChange={handleInputChange}
                    />
                  )}
                  {activeSection === "work" && (
                    <ExperienceForm
                      formData={formData}
                      setFormData={setFormData}
                    />
                  )}
                  {activeSection === "education" && (
                    <EducationForm
                      formData={formData}
                      setFormData={setFormData}
                    />
                  )}
                  {activeSection === "skills" && (
                    <SkillsForm
                      formData={formData}
                      setFormData={setFormData}
                    />
                  )}
                  {activeSection === "projects" && (
                    <ProjectsForm
                      formData={formData}
                      setFormData={setFormData}
                    />
                  )}
                  {activeSection === "certifications" && (
                    <CertificationsForm
                      formData={formData}
                      setFormData={setFormData}
                    />
                  )}
                </div>
              </div>
            </div>


            {/* PREVIEW */}
            <div className="hidden lg:flex flex-1 overflow-y-auto">
              <CVPreview {...previewProps} />
            </div>
          </div>
        )}


        {activeTab === "templates" && (
          <TemplatesGallery
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
            formData={formData}
          />
        )}
      </div>
    </div>
  );
};


export default CVBuilder;

