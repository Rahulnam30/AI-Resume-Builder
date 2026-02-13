import React from "react";
import { Upload, Download, PenTool } from "lucide-react";

const CVBuilderTopBar = ({ activeTab, setActiveTab, onSave }) => {
  return (
    <div className="w-full px-4 py-3 flex flex-row gap-4 justify-between items-center">
      {/* Left */}
      <div className="flex md:flex-row flex-col items-center md:gap-6 gap-2">
        <h1 className="font-['Outfit'] text-2xl select-none">Create CV</h1>

        {/* Tabs */}
        <div className="bg-gray-100 gap-1 md:flex hidden rounded-2xl p-1 w-fit mx-auto md:mx-0">
          <button
            onClick={() => setActiveTab("builder")}
            className={`rounded-2xl md:py-1 py-1.5 md:px-3.5 px-4 text-sm transition ${
              activeTab === "builder"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-800"
            } select-none`}
          >
            Builder
          </button>
          <button
            onClick={() => setActiveTab("templates")}
            className={`py-1 px-2.5 rounded-2xl text-sm transition ${
              activeTab === "templates"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-800"
            } select-none`}
          >
            Templates
          </button>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-wrap justify-center md:justify-end items-center gap-2">
        <button className="items-center gap-2 px-4 py-2 rounded-lg hidden md:flex border border-gray-300 bg-white text-gray-800 font-medium shadow-sm hover:bg-black hover:text-white transition-all duration-200 select-none">
          <PenTool size={18} />
          CV Designer
        </button>

        <button className="flex gap-2 text-white cursor-pointer bg-black border-0 rounded-lg text-sm transition-all duration-200 select-none md:hover:bg-black/70 py-2 px-5 md:py-2.5 md:px-5">
          <Upload size={18} />
          <span className="hidden md:inline">Upload</span>
        </button>

        <button
          onClick={onSave}
          className="flex gap-2 text-white cursor-pointer bg-indigo-600 border-0 rounded-lg select-none text-sm transition-all duration-200 hover:bg-indigo-700 py-2 px-5 md:py-2.5 md:px-5"
        >
          <Download size={18} />
          <span className="hidden md:inline">Download</span>
        </button>
      </div>
    </div>
  );
};

export default CVBuilderTopBar;
