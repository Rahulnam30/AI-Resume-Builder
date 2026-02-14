import React, { useState, useEffect, useRef } from "react";
import FormTabs from "./FormTabs";
import UserNavBar from "../UserNavBar/UserNavBar";
import axios from "axios";
import { toast } from "react-hot-toast";

// Import Forms
import PersonalInfoForm from "./forms/PersonalInfoForm";
import ExperienceForm from "./forms/ExperienceForm";
import EducationForm from "./forms/EducationForm";
import ProjectsForm from "./forms/ProjectsForm";
import CertificationsForm from "./forms/CertificationsForm";
import CVPreview from "./CVPreview";
import TemplatesGallery from "./Templatesgallery";

import CVBuilderTopBar from "./Cvbuildernavbar";
import ResumeCompletionBanner from "./ResumeCompletionBanner";
import "./CVBuilder.css";
import SkillsForm from "./forms/skillsForm";

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
      id: generateId(),
      name: "",
      description: "",
      technologies: "",
      link: "",
    },
  ],
  certifications: [
    {
      id: generateId(),
      name: "",
      issuer: "",
      date: "",
      link: "",
    },
  ],
});

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

          if (latestResume.templateId) {
            setSelectedTemplate(latestResume.templateId);
          }

          toast.success("Resume loaded successfully");
        }
      } catch (error) {
        if (error.name !== "CanceledError") {
          console.error("Error loading resume:", error);
        }
      }
    };

    fetchResume();
    return () => controller.abort();
  }, []);

  /* ================= AUTO-SCROLL ON SECTION CHANGE ================= */
  useEffect(() => {
    formContainerRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
          { withCredentials: true },
        );
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/resume",
          payload,
          { withCredentials: true },
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
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    setActiveTab("builder");
    toast.success(`Template changed to ${templateId}`);
  };

  /* ================= SECTION NAV ================= */
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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <UserNavBar />

      <CVBuilderTopBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSave={handleSave}
        isSaving={isSaving}
      />

      {/* Always visible across builder tab */}
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

      {/* MAIN CONTENT */}
      <div className="flex-1 px-4 pb-8">
        {activeTab === "builder" && (
          <div className="flex h-[calc(100vh-180px)] gap-6">
            {/* LEFT: FORM PANEL */}
            {!isPreviewMaximized && (
              <div className="w-full max-w-[520px] flex flex-col h-[calc(100vh-180px)] sticky top-[180px]">
                <div className="flex flex-col bg-white rounded-xl shadow-sm h-full">
                  {/* Sticky Tabs */}
                  <div className="sticky top-0 z-10 bg-white border-b px-4 py-3 rounded-t-xl">
                    <FormTabs
                      activeSection={activeSection}
                      setActiveSection={setActiveSection}
                    />
                  </div>

                  {/* Scrollable Form Content */}
                  <div
                    ref={formContainerRef}
                    className="flex-1 overflow-y-auto p-6"
                    style={{ maxHeight: "calc(100vh - 180px - 60px)" }}
                  >
                    {renderFormContent()}

                    {/* Navigation Buttons */}
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

            {/* RIGHT: PREVIEW PANEL */}
            <div className="flex-1 min-w-0 overflow-y-auto">
              <CVPreview
                formData={formData}
                selectedTemplate={selectedTemplate}
                isMaximized={isPreviewMaximized}
                onToggleMaximize={() => setIsPreviewMaximized((v) => !v)}
              />
            </div>
          </div>
        )}

        {/* TEMPLATES TAB */}
        {activeTab === "templates" && (
          <TemplatesGallery
            selectedTemplate={selectedTemplate}
            onSelectTemplate={handleTemplateSelect}
            formData={formData}
          />
        )}
      </div>
    </div>
  );
};

export default CVBuilder;
