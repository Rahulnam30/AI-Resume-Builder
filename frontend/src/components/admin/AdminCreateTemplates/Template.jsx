import React from "react";
import { Filter, Plus, Eye, X, Power, PowerOff } from "lucide-react";
import { TEMPLATES } from "../../user/Templates/TemplateRegistry";
import { templates as CV_LIST } from "../../user/CV/Templatesgallery";
import axiosInstance from "../../../api/axios";
import TemplateTypeSwitch from "./TemplateTypeSwitch";

const CV_PLACEHOLDER =
  "https://via.placeholder.com/210x297.png?text=CV+Template";

// static thumbnail paths for CV templates (served from public/templates)
const CV_THUMBNAILS = {
  professional: "/templates/chronological.png",
  modern: "/templates/modern.png",
  creative: "/templates/creative.png",
  minimal: "/templates/minimalist.png",
  executive: "/templates/executive.png",
  twoColumn: "/templates/functional.png",
  simple: "/templates/functional.png",
  Elegant: "/templates/functional.png",
  vertex: "/templates/functional.png",
  elite: "/templates/functional.png",
  eclipse: "/templates/functional.png",
  eclipse1: "/templates/functional.png",
  harbor: "/templates/functional.png",
};

export default function AdminTemplates() {
  const [type, setType] = React.useState("resume");

  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState("all");

  const [isPreviewModalOpen, setIsPreviewModalOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState("");

  const [approvedTemplates, setApprovedTemplates] = React.useState({});
  const [statuses, setStatuses] = React.useState({});

  const isTemplateActive = (id) => statuses[id] !== false;

  const filterCategories = [
    { id: "all", label: "All Templates" },
    { id: "modern", label: "Modern" },
    { id: "creative", label: "Creative" },
    { id: "professional", label: "Professional / Traditional" },
  ];

  const refreshData = async (currentType = type) => {
    try {
      const statusRes = await axiosInstance.get("/api/template-visibility");
      setStatuses(statusRes.data || {});

      const SOURCE = currentType === "resume" ? TEMPLATES : CV_LIST;

      const modern = SOURCE.filter((t) =>
        ["modern", "Modern", "Modern Templates", "Contemporary"].includes(
          t.category
        )
      );
      const creative = SOURCE.filter((t) =>
        ["creative", "Creative", "Creative Templates"].includes(t.category)
      );
      const professional = SOURCE.filter((t) =>
        [
          "professional",
          "Professional",
          "Professional Templates",
          "Traditional",
          "Academic",
        ].includes(t.category)
      );

      const mapToAdminFormat = (list) =>
        list.map((tpl) => ({
          _id: tpl.id,
          name: tpl.name,
          // CV templates don't include a thumbnail field in the source data,
          // but we keep static preview images under public/templates.
          // Construct a URL there and fall back to the placeholder for
          // anything missing.
          image:
            tpl.thumbnail ||
            (currentType === "cv"
              ? CV_THUMBNAILS[tpl.id] || CV_PLACEHOLDER
              : CV_PLACEHOLDER),
          category: tpl.category,
        }));

      let sections = {
        "Modern Templates": mapToAdminFormat(modern),
        "Creative Templates": mapToAdminFormat(creative),
        "Professional Templates": mapToAdminFormat(professional),
      };

      if (selectedCategory !== "all") {
        // map filter ids to actual category names (cv data uses
        // 'contemporary'/'traditional' instead of 'modern'/'professional')
        const matchCategory = (cat) => {
          if (!cat) return false;
          const lower = cat.toLowerCase();
          if (selectedCategory === "modern")
            return lower.includes("modern") || lower.includes("contemporary");
          if (selectedCategory === "professional")
            return (
              lower.includes("professional") || lower.includes("traditional")
            );
          // creative or any other literal match
          return lower.includes(selectedCategory);
        };

        sections = Object.fromEntries(
          Object.entries(sections).map(([key, list]) => [
            key,
            list.filter((t) => matchCategory(t.category)),
          ])
        );
      }

      setApprovedTemplates(sections);
    } catch (err) {
      console.error("Failed to fetch templates", err);
    }
  };

  React.useEffect(() => {
    refreshData(type);
  }, [type, selectedCategory]);

  const handleToggleStatus = async (id) => {
    try {
      setStatuses((prev) => ({ ...prev, [id]: prev[id] === false }));
      await axiosInstance.post("/api/template-visibility/toggle", {
        templateId: id,
      });
    } catch {
      refreshData(type);
    }
  };

  const handlePreview = (imageUrl) => {
    setPreviewImage(imageUrl);
    setIsPreviewModalOpen(true);
  };

  const handleCreateClick = () => {
    alert(
      type === "resume"
        ? "Create New Resume Template coming soon!"
        : "Create New CV Template coming soon!"
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="sticky top-[64px] z-40 bg-white border-b px-6 py-3">
        <TemplateTypeSwitch value={type} onChange={setType} />
      </div>

      <div className="p-6 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              {type === "resume" ? "Resume Templates" : "CV Templates"}
            </h1>
            <p className="text-sm text-slate-500">
              Manage and organize all available templates.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Create New Template */}
            <button
              onClick={handleCreateClick}
              className="
                flex items-center gap-2
                px-4 py-2 rounded-lg text-sm font-medium
                bg-white text-slate-600 border border-slate-300
                hover:bg-blue-600 hover:text-white hover:border-blue-600
                focus-visible:ring-2 focus-visible:ring-blue-500
                transition-colors
                shadow-sm
              "
            >
              <Plus size={16} />
              Create New {type === "resume" ? "Template" : "CV Template"}
            </button>

            {/* Filter */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen((p) => !p)}
                className="
                  flex items-center gap-2
                  px-4 py-2 rounded-lg text-sm font-medium
                  bg-white text-slate-600 border border-slate-300
                  hover:bg-blue-600 hover:text-white hover:border-blue-600
                  focus-visible:ring-2 focus-visible:ring-blue-500
                  transition-colors
                "
              >
                <Filter size={16} />
                Filter
              </button>

              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-50">
                  {filterCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setIsFilterOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-slate-100"
                    >
                      {cat.label}
                    </button>
                  ))}

                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setIsFilterOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-red-600 border-t"
                  >
                    Clear Filter
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Templates */}
        {Object.entries(approvedTemplates).map(
          ([section, templates]) =>
            templates.length > 0 && (
              <div key={section}>
                <h2 className="text-lg font-semibold mb-4">{section}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {templates.map((tpl) => {
                    const active = isTemplateActive(tpl._id);
                    return (
                      <div
                        key={tpl._id}
                        className={`bg-white border rounded-xl p-3 ${
                          !active && "opacity-70"
                        }`}
                      >
                        <div
                          className="relative aspect-[210/297] cursor-pointer"
                          onClick={() => handlePreview(tpl.image)}
                        >
                          <img
                            src={tpl.image}
                            alt={tpl.name}
                            className="w-full h-full object-cover rounded"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = CV_PLACEHOLDER;
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/10">
                            <Eye className="text-white" size={32} />
                          </div>
                        </div>

                        <h3 className="mt-2 font-semibold text-sm">
                          {tpl.name}
                        </h3>

                        <button
                          onClick={() => handleToggleStatus(tpl._id)}
                          className={`w-full mt-3 text-xs py-1.5 rounded flex items-center justify-center gap-1 ${
                            active
                              ? "bg-red-100 text-red-600 hover:bg-red-200"
                              : "bg-emerald-100 text-emerald-600 hover:bg-emerald-200"
                          }`}
                        >
                          {active ? (
                            <>
                              <PowerOff size={12} /> Disable
                            </>
                          ) : (
                            <>
                              <Power size={12} /> Enable
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
        )}

        {/* Preview Modal */}
        {isPreviewModalOpen && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80"
            onClick={() => setIsPreviewModalOpen(false)}
          >
            <div className="relative bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
              <button
                onClick={() => setIsPreviewModalOpen(false)}
                className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full"
              >
                <X size={20} />
              </button>
              <img
                src={previewImage}
                alt="Template Preview"
                className="w-full h-auto"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}