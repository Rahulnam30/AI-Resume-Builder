import { useEffect, useRef, useState } from "react";
import { RefreshCw, Sparkles } from "lucide-react";
import { getCompletionStatus } from "./../completion";
import axiosInstance from "../../../../api/axios";

const PersonalInfoForm = ({ formData, onInputChange, onUseSummary, isAiMode }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const isInitialRender = useRef(true);
  const debounceTimer = useRef(null);
  // Auto-generate summary when skills, experience, or projects change

  const autoGenerateSummary = async () => {
    try {
      setIsGenerating(true);
      // Convert experience and projects objects to strings
      const data = {
        fullName: formData.fullName,
        skills: formData.skills,
        education: formData.education,
        experience: formData.experience,
        certifications: formData.certifications,
        projects: formData.projects,
        summary: formData.summary,
      };
      const response = await axiosInstance.post(
        "/api/resume/generate-summary",
        data,
      );
      // console.log("Response received:", response);
      // console.log("Summary generated:", response.data.aiResume);
      onInputChange("summary", response.data.aiResume);
    } catch (error) {
      console.error("Failed to generate summary:", error);
      console.error("Error details:", error.response?.data || error.message);
      alert(
        `Failed to generate summary: ${error.response?.data?.error || error.message}`,
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-1">
      <h3 className="mb-3 text-sm font-semibold">Personal Information</h3>
      <div className="pl-0.5">
        <div className="flex flex-col gap-[6px] mb-[10px]">
          <label className="block text-[12px] font-medium text-[#374151] mb-1">
            Full Name *
          </label>
          <input
            type="text"
            className="px-2.5 py-2 border text-sm rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]"
            value={formData?.fullName || ""}
            placeholder="John Doe"
            onChange={(e) => onInputChange("fullName", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-[6px] mb-[10px]">
          <label className="block text-[12px] font-medium text-[#374151] mb-1">
            Email *
          </label>
          <input
            type="email"
            className="px-2.5 py-2 border text-sm rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]"
            value={formData?.email || ""}
            placeholder="john.doe@example.com"
            onChange={(e) => onInputChange("email", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-[6px] mb-[10px]">
          <label className="block text-[12px] font-medium text-[#374151] mb-1">
            Phone *
          </label>
          <input
            type="tel"
            className="px-2.5 py-2 border text-sm rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]"
            value={formData?.phone || ""}
            maxLength={10}
            placeholder="1234567890"
            onChange={(e) => onInputChange("phone", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-[6px] mb-[10px]">
          <label className="block text-[12px] font-medium text-[#374151] mb-1">
            Location *
          </label>
          <input
            type="text"
            className="px-2.5 py-2 border text-sm rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]"
            value={formData?.location || ""}
            placeholder="San Francisco, CA"
            onChange={(e) => onInputChange("location", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-[6px] mb-[10px]">
          <label className="block text-[12px] font-medium text-[#374151] mb-1">
            LinkedIn *
          </label>
          <input
            type="text"
            className="px-2.5 py-2 border text-sm rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]"
            value={formData?.linkedin || ""}
            placeholder="linkedin.com/in/johndoe"
            onChange={(e) => onInputChange("linkedin", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-[6px] mb-[10px]">
          <label className="block text-[12px] font-medium text-[#374151] mb-1">
            Website/Portfolio *
          </label>
          <input
            type="text"
            className="px-2.5 py-2 border text-sm rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]"
            value={formData?.website || ""}
            placeholder="johndoe.com"
            onChange={(e) => onInputChange("website", e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-[6px] mb-[10px] full-width">
        <div className="flex justify-between items-center mb-1">
          <label className="text-[12px] font-medium text-[#374151]">
            Professional Summary (Optional)
          </label>
          {isAiMode && (
            <button
              type="button"
              onClick={autoGenerateSummary}
              disabled={isGenerating}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded-md transition-colors shadow-sm disabled:opacity-70"
            >
              {isGenerating ? (
                <RefreshCw className="animate-spin w-3 h-3" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles" aria-hidden="true"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path><path d="M20 2v4"></path><path d="M22 4h-4"></path><circle cx="4" cy="20" r="2"></circle></svg>
              )}
              {isGenerating ? "Generating..." : "AI Generate"}
            </button>
          )}
        </div>

        <textarea
          className="w-full h-28 px-2.5 py-2 border text-sm rounded resize-none border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)] scrollbar-hide"
          value={formData?.summary || ""}
          maxLength={500}
          placeholder="Brief professional summary highlighting your key skills and experience..."
          onChange={(e) => onInputChange("summary", e.target.value)}
        />
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-slate-500">
            {formData?.summary?.length || 0}/500 Characters
          </span>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
