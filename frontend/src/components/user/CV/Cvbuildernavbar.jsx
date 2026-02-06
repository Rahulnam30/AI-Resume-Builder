import React from "react";
import { Upload, Download, PenTool } from "lucide-react";

const CVBuilderTopBar = ({ activeTab, setActiveTab, onSave }) => {
  return (
    <div className="w-full   px-6 py-4 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-semibold text-slate-900">Create CV</h1>

        {/* Tabs */}
        <div className="flex bg-slate-100 rounded-xl p-1">
          <button
            onClick={() => setActiveTab("builder")}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
              activeTab === "builder"
                ? "bg-white shadow text-slate-900"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Builder
          </button>
          <button
            onClick={() => setActiveTab("templates")}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
              activeTab === "templates"
                ? "bg-white shadow text-slate-900"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Templates
          </button>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-slate-50">
          <PenTool size={16} />
          CV Designer
        </button>

        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          <Upload size={16} />
          Upload
        </button>

        <button
          onClick={onSave}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          <Download size={16} />
          Export
        </button>
      </div>
    </div>
  );
};

export default CVBuilderTopBar;
