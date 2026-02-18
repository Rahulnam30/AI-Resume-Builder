import React from "react";
import { Filter, Plus, Eye, X, Power, PowerOff, Loader2 } from "lucide-react";
import { TEMPLATES } from "../../user/Templates/TemplateRegistry";
import { CvTemplates } from "../../user/Templates/CvTemplates";
import CVTemplates from "../../user/CV/Cvtemplates";
import mergeWithSampleData from "../../../utils/Datahelpers";
import {
  toggleTemplateStatus,
  getAllTemplateStatuses,
} from "../../../utils/templateVisibility";
import TemplateTypeSwitch from "./TemplateTypeSwitch";
import axiosInstance from "../../../api/axios";

// User-side CV templates (from Templatesgallery.jsx - these are shown to users in CV Builder)
const UserCvTemplates = [
  { id: "professional", name: "Professional", category: "Traditional", description: "Classic professional CV template" },
  { id: "modern", name: "Modern Blue", category: "Contemporary", description: "Modern design with blue accents" },
  { id: "creative", name: "Creative", category: "Creative", description: "Creative and unique layout" },
  { id: "minimal", name: "Minimal", category: "Contemporary", description: "Clean and minimal design" },
  { id: "executive", name: "Executive", category: "Traditional", description: "Executive style template" },
  { id: "academic", name: "Academic", category: "Academic", description: "Perfect for academic CVs" },
  { id: "twoColumn", name: "Two Column", category: "Academic", description: "Two column layout" },
  { id: "simple", name: "Simple", category: "Traditional", description: "Simple and straightforward" },
  { id: "academicSidebar", name: "Academic Sidebar", category: "Academic", description: "Academic CV with sidebar layout" },
];

export default function AdminTemplates() {
  const [type, setType] = React.useState("resume");

  const [isPreviewModalOpen, setIsPreviewModalOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState("");
  const [previewTemplateId, setPreviewTemplateId] = React.useState(null);

  const [pendingTemplates, setPendingTemplates] = React.useState([]);
  const [approvedTemplates, setApprovedTemplates] = React.useState({});
  const [statuses, setStatuses] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [togglingId, setTogglingId] = React.useState(null);

  // Sample data for CV template preview
  const sampleCvData = React.useMemo(() => mergeWithSampleData({}), []);

  const refreshData = async (currentType = type) => {
    try {
      setIsLoading(true);
      // Fetch statuses from backend API
      const fetchedStatuses = await getAllTemplateStatuses();
      setStatuses(fetchedStatuses);

      if (currentType === "resume") {
        // Resume templates
        const SOURCE = TEMPLATES;
        const modern = SOURCE.filter((t) =>
          ["modern", "Modern", "Modern Templates"].includes(t.category),
        );
        const creative = SOURCE.filter((t) =>
          ["creative", "Creative", "Creative Templates"].includes(t.category),
        );
        const professional = SOURCE.filter((t) =>
          ["professional", "Professional", "Professional Templates"].includes(
            t.category,
          ),
        );

        const mapToAdminFormat = (list) =>
          list.map((tpl) => ({
            _id: tpl.id,
            name: tpl.name,
            used: 0,
            previewText: tpl.description,
            image: tpl.thumbnail,
            isStatic: false,
          }));

        setApprovedTemplates({
          "Modern Templates": mapToAdminFormat(modern),
          "Creative Templates": mapToAdminFormat(creative),
          "Professional Templates": mapToAdminFormat(professional),
        });
      } else {
        // CV templates - include BOTH CvTemplates and UserCvTemplates
        const mapCvTemplatesToAdminFormat = (list) =>
          list.map((tpl) => ({
            _id: tpl.id,
            name: tpl.name,
            used: 0,
            previewText: tpl.description,
            image: tpl.thumbnail || null,
            isStatic: false,
          }));

        // User-side CV templates (Traditional, Contemporary, Creative, Academic)
        const traditional = UserCvTemplates.filter((t) => t.category === "Traditional");
        const contemporary = UserCvTemplates.filter((t) => t.category === "Contemporary");
        const creative = UserCvTemplates.filter((t) => t.category === "Creative");
        const academic = UserCvTemplates.filter((t) => t.category === "Academic");

        setApprovedTemplates({
          "Traditional Templates": mapCvTemplatesToAdminFormat(traditional),
          "Contemporary Templates": mapCvTemplatesToAdminFormat(contemporary),
          "Creative Templates": mapCvTemplatesToAdminFormat(creative),
          "Academic Templates": mapCvTemplatesToAdminFormat(academic),
        });
      }

      setPendingTemplates([]);
    } catch (err) {
      console.error("Failed to fetch templates", err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    refreshData(type);
  }, [type]);

  const handleToggleStatus = async (id) => {
    try {
      setTogglingId(id);
      const newStatus = await toggleTemplateStatus(id, type);
      setStatuses((prev) => ({ ...prev, [id]: newStatus }));
    } catch (error) {
      console.error("Failed to toggle template status:", error);
      alert("Failed to update template status. Please try again.");
    } finally {
      setTogglingId(null);
    }
  };

  const handlePreview = (imageUrlOrTemplateId, isCvTemplate = false) => {
    if (isCvTemplate) {
      setPreviewTemplateId(imageUrlOrTemplateId);
      setPreviewImage("");
    } else {
      setPreviewImage(imageUrlOrTemplateId);
      setPreviewTemplateId(null);
    }
    setIsPreviewModalOpen(true);
  };

  const handleCreateClick = () => {
    alert(
      type === "resume"
        ? "Create New Resume Template feature coming soon!"
        : "Create New CV Template feature coming soon!",
    );
  };

  const isTemplateActive = (id) => statuses[id] !== false;

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 🔽 Resume / CV Switch UNDER MAIN NAVBAR */}
      <div className="sticky top-[64px] z-40 bg-white border-b border-slate-200 px-6 py-3 flex justify-center md:justify-start">
        <TemplateTypeSwitch value={type} onChange={setType} />
      </div>

      {/* Page Content */}
      <div className="p-6 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              {type === "resume" ? "Resume Templates" : "CV Templates"}
            </h1>
            <p className="text-sm text-slate-500">
              Manage and organize all available {type} templates.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCreateClick}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus size={16} />
              Create New {type === "resume" ? "Template" : "CV Template"}
            </button>

            <button className="flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-lg text-sm text-slate-600 bg-white hover:bg-slate-50 transition-colors">
              <Filter size={16} />
              Filter
            </button>
          </div>
        </div>

        {/* Pending Reviews */}
        {pendingTemplates.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-orange-600">
              Pending Reviews ({pendingTemplates.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {pendingTemplates.map((tpl) => (
                <div
                  key={tpl._id}
                  className="bg-orange-50 border border-orange-200 rounded-xl p-3"
                >
                  <div className="relative w-full aspect-[210/297] bg-white rounded-lg overflow-hidden mb-3">
                    <img
                      src={tpl.imageUrl}
                      alt={tpl.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-800">
                    {tpl.name}
                  </h3>
                  <p className="text-xs text-slate-500 mb-2">{tpl.category}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handlePreview(tpl.imageUrl)}
                      className="flex-1 py-1.5 flex items-center justify-center gap-1 bg-white border border-slate-200 text-slate-600 rounded text-xs hover:bg-slate-50"
                    >
                      <Eye size={14} /> Preview
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <hr className="border-slate-200" />
          </div>
        )}

        {/* Sections */}
        {Object.entries(approvedTemplates).map(
          ([section, templates]) =>
            templates.length > 0 && (
              <div key={section} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-800">
                    {section}
                  </h2>
                  <button className="text-sm text-blue-600 hover:underline">
                    View All ({templates.length})
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {templates.map((tpl, index) => {
                    const active = isTemplateActive(tpl._id);
                    return (
                      <div
                        key={index}
                        className={`bg-white border rounded-xl p-3 transition relative ${active
                          ? "border-slate-200 hover:shadow-lg"
                          : "border-slate-100 opacity-75 grayscale-[0.5]"
                          }`}
                      >
                        {/* Status Badge */}
                        <div
                          className={`absolute top-5 right-5 z-10 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border shadow-sm ${active
                            ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                            : "bg-slate-100 text-slate-500 border-slate-200"
                            }`}
                        >
                          {active ? "Active" : "Inactive"}
                        </div>

                        {/* Preview */}
                        <div
                          className="relative w-full aspect-[210/297] bg-slate-100 rounded-lg overflow-hidden cursor-pointer"
                          onClick={() => {
                            if (type === "cv") {
                              handlePreview(tpl._id, true);
                            } else if (tpl.image) {
                              handlePreview(tpl.image, false);
                            }
                          }}
                        >
                          {type === "cv" ? (
                            // Live CV Template Rendering
                            (() => {
                              const TemplateComponent = CVTemplates[tpl._id];
                              return (
                                <div
                                  className="absolute inset-0"
                                  style={{
                                    transform: "scale(0.38)",
                                    transformOrigin: "top left",
                                    width: 794,
                                  }}
                                >
                                  {TemplateComponent && (
                                    <TemplateComponent formData={sampleCvData} />
                                  )}
                                </div>
                              );
                            })()
                          ) : tpl.image ? (
                            // Static Image for Resume Templates
                            <img
                              src={tpl.image}
                              alt={tpl.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            // Fallback
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                              <div className="text-center">
                                <div className="text-4xl font-bold text-slate-300 mb-2">{tpl.name.charAt(0)}</div>
                                <div className="text-xs text-slate-400">{tpl.name}</div>
                              </div>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                            <Eye
                              className="text-white drop-shadow-md"
                              size={32}
                            />
                          </div>
                        </div>

                        {/* Info */}
                        <div className="mt-3 space-y-1">
                          <h3 className="text-sm font-semibold text-slate-800">
                            {tpl.name}
                          </h3>
                          <p
                            className="text-xs text-slate-500 truncate"
                            title={tpl.previewText}
                          >
                            {tpl.previewText}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100">
                          <button
                            onClick={() =>
                              window.open(
                                type === "resume"
                                  ? `/admin/resume-editor?id=${tpl._id}`
                                  : `/admin/cv-editor?id=${tpl._id}`,
                                "_blank",
                              )
                            }
                            className="flex-1 py-1.5 flex items-center justify-center gap-1 bg-slate-50 text-slate-600 rounded text-xs hover:bg-slate-100 font-medium transition"
                          >
                            <Eye size={14} />
                            View
                          </button>
                          <button
                            onClick={() => handleToggleStatus(tpl._id)}
                            disabled={togglingId === tpl._id}
                            className={`flex-1 py-1.5 flex items-center justify-center gap-1 rounded text-xs font-medium transition ${active
                              ? "bg-red-50 text-red-600 hover:bg-red-100"
                              : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                              } ${togglingId === tpl._id ? "opacity-50 cursor-not-allowed" : ""}`}
                          >
                            {togglingId === tpl._id ? (
                              <Loader2 size={14} className="animate-spin" />
                            ) : active ? (
                              <PowerOff size={14} />
                            ) : (
                              <Power size={14} />
                            )}
                            {togglingId === tpl._id ? "Updating..." : active ? "Disable" : "Enable"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ),
        )}

        {/* Preview Modal */}
        {isPreviewModalOpen && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setIsPreviewModalOpen(false)}
          >
            {previewTemplateId ? (
              // CV Template Live Preview Modal
              <div
                className="relative bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
                style={{ width: 860, maxHeight: "92vh" }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="px-4 py-3 border-b flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      CV Template Preview
                    </h2>
                    <p className="text-xs text-slate-500">
                      A4 size — Live preview with sample data
                    </p>
                  </div>
                  <button
                    onClick={() => setIsPreviewModalOpen(false)}
                    className="text-xl leading-none text-slate-400 hover:text-slate-700"
                  >
                    ×
                  </button>
                </div>

                {/* A4 Preview Area */}
                <div className="flex-1 overflow-auto bg-slate-200/60 p-6 flex justify-center">
                  <div className="shadow-xl bg-white rounded-sm">
                    <div style={{ width: 794, minHeight: 1123 }}>
                      {(() => {
                        const TemplateComponent = CVTemplates[previewTemplateId];
                        return TemplateComponent ? (
                          <TemplateComponent formData={sampleCvData} />
                        ) : null;
                      })()}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t flex justify-end gap-3 bg-white">
                  <button
                    onClick={() => setIsPreviewModalOpen(false)}
                    className="px-4 py-2 rounded-md border text-sm font-medium hover:bg-slate-50 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              // Resume Template Static Image Preview
              <div
                className="relative bg-white rounded-lg shadow-2xl max-w-4xl max-h-[90vh] overflow-auto animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsPreviewModalOpen(false)}
                  className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition z-10"
                >
                  <X size={20} />
                </button>
                <img
                  src={previewImage}
                  alt="Template Preview"
                  className="w-full h-auto block"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
