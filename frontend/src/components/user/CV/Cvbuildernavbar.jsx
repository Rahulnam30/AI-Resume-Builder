import React from "react";
import { Upload, Download, PenTool } from "lucide-react";

const CVBuilderTopBar = ({
  activeTab,
  setActiveTab,
  onDownload,
  isSaving,
  isDownloading,
}) => {
  return (
    <div className="w-full ">
      {/* Main row */}
      <div className="px-3 sm:px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* ── Left section ── */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
          {/* Title */}
          <h1 className="text-2xl font-semibold whitespace-nowrap">
            Create CV
          </h1>

          {/* Segmented Control */}
          <div className="relative flex items-center bg-slate-100 rounded-xl p-1 w-fit">
            <button
              onClick={() => setActiveTab("builder")}
              className={`relative z-10 px-5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === "builder"
                  ? "bg-white shadow-sm text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Builder
            </button>

            <button
              onClick={() => setActiveTab("templates")}
              className={`relative z-10 px-5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === "templates"
                  ? "bg-white shadow-sm text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Templates
            </button>
          </div>
        </div>

        {/* ── Right section ── */}
        <div className="flex items-center justify-between sm:justify-end gap-2 flex-wrap">
          {/* Designer */}
          <button className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 font-medium shadow-sm hover:bg-black hover:text-white transition-all duration-200 whitespace-nowrap">
            <PenTool size={18} />
            CV Designer
          </button>

          {/* Upload */}
          <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-black/80 transition">
            <Upload size={18} />
            <span className="hidden sm:inline">Upload</span>
          </button>

          {/* Download */}
          <button
            onClick={onDownload}
            disabled={isDownloading}
            className="flex items-center gap-2 text-white bg-indigo-600 rounded-lg text-sm transition-all duration-200 hover:bg-indigo-700 py-2 px-3 sm:px-5 disabled:bg-indigo-400 disabled:cursor-not-allowed whitespace-nowrap"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CVBuilderTopBar;
