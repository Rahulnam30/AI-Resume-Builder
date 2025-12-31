import { Trash2, Eye } from "lucide-react";
import { useState } from "react";
import React from "react";
export default function TemplateCard({ template, onDelete }) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:-translate-y-1 transition">
      <div className="h-40 bg-gray-900 rounded-lg flex items-center justify-center text-slate-500">
        Resume Preview
      </div>

      <h4 className="font-semibold mt-3">{template.name}</h4>
      <p className="text-sm text-slate-400">Uses: {template.uses}</p>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setShowPreview(true)}
          className="text-blue-400 text-sm flex items-center gap-1"
        >
          <Eye size={16} /> Preview
        </button>

        <button
          onClick={() => onDelete(template.id)}
          className="text-red-400 text-sm flex items-center gap-1"
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>

      {/* PREVIEW MODAL */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg w-[80%] h-[80%] overflow-auto">
            <button
              onClick={() => setShowPreview(false)}
              className="mb-4 text-red-500"
            >
              Close
            </button>

            <div
              dangerouslySetInnerHTML={{
                __html: template.html
                  .replace("{{name}}", "John Doe")
                  .replace("{{email}}", "john@gmail.com"),
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
