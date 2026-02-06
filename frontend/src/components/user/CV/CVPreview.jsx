import React, { useState, useMemo } from "react";
import {
  Eye,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
} from "lucide-react";
import CVTemplates from "./CVTemplates";
import mergeWithSampleData, {
  hasAnyUserData,
} from "../../../utils/Datahelpers";

const Page = ({ children }) => (
  <div
    className="bg-white shadow-md mb-6"
    style={{
      width: 794,
      minHeight: 1123,
      padding: 24,
      pageBreakAfter: "always",
      breakAfter: "page",
    }}
  >
    {children}
  </div>
);

const CVPreview = ({
  formData,
  selectedTemplate,
  isMaximized,
  onToggleMaximize,
}) => {
  const [zoom, setZoom] = useState(1);
  const TemplateComponent = CVTemplates[selectedTemplate];

  const zoomIn = () => setZoom((z) => Math.min(z + 0.1, 2));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.5));
  const resetZoom = () => setZoom(1);

  const displayData = useMemo(() => mergeWithSampleData(formData), [formData]);
  const showingUserData = useMemo(() => hasAnyUserData(formData), [formData]);
  const PreviewContent = () => (
    <div className="flex justify-center">
      <div
        style={{
          width: 794 * zoom,
          minHeight: 1123 * zoom,
        }}
      >
        <div
          className="bg-white shadow"
          style={{
            width: 794,
            minHeight: 1123,
            padding: 24,
            transform: `scale(${zoom})`,
            transformOrigin: "top left",
          }}
        >
          {TemplateComponent ? (
            <TemplateComponent formData={displayData} />
          ) : (
            <div className="flex items-center justify-center h-[900px] text-slate-400 text-lg font-medium">
              Select a template to preview
            </div>
          )}
        </div>
      </div>
    </div>
  );

  /* ================= FULLSCREEN ================= */
  if (isMaximized) {
    return (
      <div className="fixed inset-0 z-[99] bg-slate-200 flex flex-col">
        {/* Header */}
        <div className="bg-white flex items-center justify-between px-6 py-3 border-b">
          <div className="flex items-center gap-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <Eye size={18} /> Live Preview
              {selectedTemplate && (
                <span className="text-slate-500 font-normal">
                  - {selectedTemplate}
                </span>
              )}
            </h3>
            {showingUserData ? (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                ✨ Your Data
              </span>
            ) : (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                📝 Sample Data
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={zoomOut}
              className="p-1 hover:bg-slate-100 rounded"
            >
              <ZoomOut size={18} />
            </button>
            <span className="text-sm font-medium">
              {Math.round(zoom * 100)}%
            </span>
            <button onClick={zoomIn} className="p-1 hover:bg-slate-100 rounded">
              <ZoomIn size={18} />
            </button>
            <button
              onClick={resetZoom}
              className="p-1 hover:bg-slate-100 rounded"
            >
              <RotateCcw size={18} />
            </button>
            <div className="w-px h-6 bg-slate-300 mx-1" />
            <button
              onClick={() => {
                onToggleMaximize();
                setZoom(1);
              }}
              className="p-1 hover:bg-slate-100 rounded"
            >
              <Minimize2 size={18} />
            </button>
            <button className="p-1 hover:bg-slate-100 rounded">
              <Download size={18} />
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-auto bg-slate-200 p-10">
          <div className="flex justify-center">
            <PreviewContent />
          </div>
        </div>
      </div>
    );
  }

  /* ================= NORMAL MODE ================= */
  return (
    <div className="w-full h-full flex flex-col bg-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
        <div className="flex items-center gap-2">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <Eye size={16} /> Live Preview
            {selectedTemplate && (
              <span className="text-slate-500 font-normal">
                - {selectedTemplate}
              </span>
            )}
          </h3>
          {showingUserData ? (
            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
              ✨ Your Data
            </span>
          ) : (
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
              📝 Sample
            </span>
          )}
        </div>

        <button
          onClick={onToggleMaximize}
          className="p-1 hover:bg-slate-100 rounded"
          title="Fullscreen"
        >
          <Maximize2 size={16} />
        </button>
      </div>

      {/* Canvas */}
      <div className="flex-1 flex justify-center bg-slate-200 py-8">
        <PreviewContent />
      </div>

      {!showingUserData && (
        <div className="px-4 py-2 bg-blue-50 border-t text-center">
          <p className="text-xs text-blue-700">
            💡 Start filling the form to see your information replace the sample
            data
          </p>
        </div>
      )}
    </div>
  );
};

export default CVPreview;
