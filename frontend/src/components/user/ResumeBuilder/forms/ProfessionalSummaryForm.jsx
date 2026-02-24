import { useState } from "react";
import { RefreshCw } from "lucide-react";
import axiosInstance from "../../../../api/axios";

const ProfessionalSummaryForm = ({ formData, onInputChange, isAiMode }) => {
    const [isGenerating, setIsGenerating] = useState(false);

    const autoGenerateSummary = async () => {
        try {
            setIsGenerating(true);
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
            <h3 className="mb-3 text-sm font-semibold">Professional Summary</h3>
            <p className="text-xs text-slate-500 mb-4">
                Generate an AI-powered professional summary based on all the details
                you've filled in — your experience, education, skills, projects, and
                certifications.
            </p>

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

export default ProfessionalSummaryForm;
