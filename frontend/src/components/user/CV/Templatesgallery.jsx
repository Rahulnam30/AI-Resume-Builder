import React, { useState, useMemo } from "react";
import { Check, Eye } from "lucide-react";

import mergeWithSampleData, {
  hasAnyUserData,
} from "../../../utils/Datahelpers";
import CVTemplates from "./Cvtemplates";

const templates = [
  { id: "professional", name: "Professional", category: "Traditional" },
  { id: "modern", name: "Modern Blue", category: "Contemporary" },
  { id: "creative", name: "Creative", category: "Creative" },
  { id: "minimal", name: "Minimal", category: "Contemporary" },
  { id: "executive", name: "Executive", category: "Traditional" },
  { id: "academic", name: "Academic", category: "Academic" },
  { id: "twoColumn", name: "Two Column", category: "Academic" },
  { id: "simple", name: "Simple", category: "Traditional" },
];

const TemplatesGallery = ({ selectedTemplate, onSelectTemplate, formData }) => {
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Traditional",
    "Contemporary",
    "Creative",
    "Academic",
  ];

  const displayData = useMemo(() => mergeWithSampleData(formData), [formData]);
  const showingUserData = useMemo(() => hasAnyUserData(formData), [formData]);

  const filteredTemplates =
    selectedCategory === "All"
      ? templates
      : templates.filter((t) => t.category === selectedCategory);

  const PreviewModal = ({ template }) => {
    const TemplateComponent = CVTemplates[template.id];

    return (
      <div
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
        onClick={() => setPreviewTemplate(null)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
          style={{ width: 860, maxHeight: "92vh" }}
        >
          {/* Header */}
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                {template.name} Preview
              </h2>
              <p className="text-xs text-slate-500">
                A4 size — click Use Template to apply
              </p>
            </div>
            <button
              onClick={() => setPreviewTemplate(null)}
              className="text-xl leading-none text-slate-400 hover:text-slate-700"
            >
              ×
            </button>
          </div>

          {/* A4 Preview Area */}
          <div className="flex-1 overflow-auto bg-slate-200/60 p-6 flex justify-center">
            <div className="shadow-xl bg-white rounded-sm">
              <div style={{ width: 794, minHeight: 1123 }}>
                {TemplateComponent && (
                  <TemplateComponent formData={displayData} />
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t flex justify-end gap-3 bg-white">
            <button
              onClick={() => setPreviewTemplate(null)}
              className="px-4 py-2 rounded-md border text-sm font-medium hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onSelectTemplate(template.id);
                setPreviewTemplate(null);
              }}
              className="px-5 py-2 rounded-md bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition"
            >
              Use Template
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full px-6 p-5 pb-10">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">CV Template's</h2>
          <p className="text-slate-600 mt-1">
            {showingUserData
              ? "Your data replaces sample content automatically"
              : "Choose a professionally designed template to get started."}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
              selectedCategory === category
                ? "bg-slate-900 text-white shadow"
                : "bg-white border border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredTemplates.map((template) => {
          const isSelected = selectedTemplate === template.id;
          const TemplateComponent = CVTemplates[template.id];

          return (
            <div
              key={template.id}
              className={`group relative rounded-2xl overflow-hidden bg-white transition-all cursor-pointer ${
                isSelected
                  ? "ring-2 ring-blue-600 shadow-2xl scale-[1.02]"
                  : "border border-slate-200 hover:shadow-xl hover:-translate-y-1"
              }`}
              onClick={() => setPreviewTemplate(template)}
            >
              {/* Preview */}
              <div className="relative h-[460px] overflow-hidden bg-white">
                <div
                  className="absolute inset-0"
                  style={{
                    transform: "scale(0.38)",
                    transformOrigin: "top left",
                    width: 794,
                  }}
                >
                  {TemplateComponent && (
                    <TemplateComponent formData={displayData} />
                  )}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition" />

                {/* Hover actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewTemplate(template);
                    }}
                    className="flex items-center gap-2 px-5 py-2 rounded-lg bg-white shadow text-sm font-bold hover:bg-slate-100 transition"
                  >
                    <Eye size={16} />
                    Preview
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTemplate(template.id);
                    }}
                    className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition"
                  >
                    Use
                  </button>
                </div>

                {/* Selected badge */}
                {isSelected && (
                  <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                    <Check size={14} />
                    Selected
                  </div>
                )}
              </div>

              {/* Bottom bar */}
              <div className="px-4 py-3 border-t flex items-center justify-between bg-white">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">
                    {template.name}
                  </h3>
                  <p className="text-xs text-slate-500">{template.category}</p>
                </div>

                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    isSelected
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {isSelected ? "Active" : "Template"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {previewTemplate && <PreviewModal template={previewTemplate} />}
    </div>
  );
};

export default TemplatesGallery;
