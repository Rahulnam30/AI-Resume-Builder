import React from "react";
import { Upload, Download, PenTool, Zap } from "lucide-react";

const CVBuilderTopBar = ({
  activeTab,
  setActiveTab,
  onSave,
  onDownload,
  isSaving,
  isDownloading,
  title,
  onTitleChange,
  isAiMode,
  onToggleAiMode
}) => {
  return (
    <div className="w-full px-3 sm:px-4 py-3 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
      {/* ── Left section ── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full md:w-auto">

        {/* Title Section - Editable */}
        <div className="flex flex-col">
          {activeTab === "builder" ? (
            <>
              <div className="flex items-center gap-2 group">
                <input
                  type="text"
                  value={title || "Untitled CV"}
                  onChange={(e) => onTitleChange("title", e.target.value)}
                  className="text-xl sm:text-2xl font-['Outfit'] font-bold bg-transparent border-b-2 border-dashed border-slate-200 hover:border-slate-400 focus:border-blue-500 focus:border-solid focus:outline-none transition-colors w-full md:w-auto min-w-[200px]"
                  placeholder="CV Title"
                />
                <PenTool size={16} className="text-slate-400 group-hover:text-blue-500 transition-colors shrink-0" />
              </div>
              <span className="text-[11px] text-slate-400 mt-0.5 select-none">Click to rename your document</span>
            </>
          ) : (
            <h1 className="text-xl sm:text-2xl font-['Outfit'] select-none whitespace-nowrap">CV Templates</h1>
          )}
        </div>

        {/* Tabs */}
        <div className="bg-gray-100 rounded-xl p-1 flex w-fit">
          <button
            onClick={() => setActiveTab("builder")}
            className={`rounded-xl px-3 py-1.5 text-sm transition whitespace-nowrap ${activeTab === "builder"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-800"
              }`}
          >
            Builder
          </button>

          <button
            onClick={() => setActiveTab("templates")}
            className={`rounded-xl px-3 py-1.5 text-sm transition whitespace-nowrap ${activeTab === "templates"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-800"
              }`}
          >
            Templates
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

      {/* ── Right section ── */}
      <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2 w-full md:w-auto">
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

        {/* Download / Save */}
        <button
          onClick={onDownload || onSave}
          disabled={isDownloading || isSaving}
          className="flex items-center gap-2 text-white bg-indigo-600 rounded-lg text-sm transition-all duration-200 hover:bg-indigo-700 py-2 px-3 sm:px-5 disabled:bg-indigo-400 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isDownloading || isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span className="hidden sm:inline">{isSaving ? 'Saving...' : 'Downloading…'}</span>
            </>
          ) : (
            <>
              <Download size={18} />
              <span className="hidden sm:inline">Download</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CVBuilderTopBar;
