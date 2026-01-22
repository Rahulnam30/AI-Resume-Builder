import React, { useRef, useState } from "react";

export default function ATSUpload({ onUpload, onFileUpload }) {
  const fileInputRef = useRef(null);
  const [selectedName, setSelectedName] = useState("");

  const emitFile = (file) => {
    setSelectedName(file.name);
    const cb = onFileUpload || onUpload;
    if (typeof cb === "function") cb(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    emitFile(file);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
      <h3 className="font-semibold mb-2">Upload Your Resume</h3>

      <input
        type="file"
        ref={fileInputRef}
        hidden
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
      />

      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg w-full"
      >
        Upload Resume
      </button>

      {selectedName && (
        <p className="mt-2 text-xs text-slate-500">Selected: {selectedName}</p>
      )}
    </div>
  );
}
