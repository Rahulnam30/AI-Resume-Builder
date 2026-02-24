import React from "react";
import { Upload, Download, PenTool, Zap } from "lucide-react";

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
          <h1 className="font-['Outfit'] text-xl sm:text-2xl select-none whitespace-nowrap">
            Create CV
          </h1>

          {/* Tabs */}
          <div className="bg-gray-100 rounded-xl p-1 flex w-fit">
            <button
              onClick={() => setActiveTab("builder")}
              className={`rounded-xl px-3 py-1.5 text-sm transition whitespace-nowrap ${
                activeTab === "builder"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Builder
            </button>

            <button
              onClick={() => setActiveTab("templates")}
              className={`rounded-xl px-3 py-1.5 text-sm transition whitespace-nowrap ${
                activeTab === "templates"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-800"
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
          <button className="flex items-center gap-2 text-white bg-black rounded-lg text-sm transition-all duration-200 hover:bg-black/80 py-2 px-3 sm:px-5 whitespace-nowrap">
            <Upload size={18} />
            <span className="hidden sm:inline">Upload</span>
          </button>

          {/* Download */}
          <button
            onClick={onDownload}
            disabled={isDownloading}
            className="flex items-center gap-2 text-white bg-indigo-600 rounded-lg text-sm transition-all duration-200 hover:bg-indigo-700 py-2 px-3 sm:px-5 disabled:bg-indigo-400 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isDownloading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="hidden sm:inline">Downloading…</span>
              </>
            ) : (
              <>
                <Download size={18} />
                <span className="hidden sm:inline">Download</span>
              </>
            )}
          </button>
        </div>

        {/* AI Mode Toggle */}
        {activeTab === "builder" && (
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleAiMode}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${isAiMode
                ? "bg-purple-50 border-purple-200 text-purple-700 shadow-sm"
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
            >
              <Zap size={16} className={`transition-colors ${isAiMode ? "fill-purple-700 text-purple-700" : "text-slate-400"}`} />
              <span>AI Mode</span>
              <div
                className={`relative w-8 h-4 rounded-full transition-colors ml-1 ${isAiMode ? "bg-purple-600" : "bg-slate-300"
                  }`}
              >
                <div
                  className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform shadow-sm ${isAiMode ? "left-[18px]" : "left-0.5"
                    }`}
                />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CVBuilderTopBar;
