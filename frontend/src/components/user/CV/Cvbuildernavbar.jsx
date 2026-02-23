import React from "react";
import { Upload, Download, PenTool } from "lucide-react";

const CVBuilderTopBar = ({ activeTab, setActiveTab, onSave }) => {
  return (
    <div className="w-full px-4 sm:px-6 py-5 bg-slate-50 border-b">
      {/* MAIN CONTAINER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* LEFT SIDE */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
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

        {/* RIGHT SIDE */}
        <div className="flex flex-wrap items-center gap-3">
      
          {/* Upload */}
          <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-black/80 transition">
            <Upload size={18} />
            <span className="hidden sm:inline">Upload</span>
          </button>

          {/* Download */}
          <button
            onClick={onSave}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
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
