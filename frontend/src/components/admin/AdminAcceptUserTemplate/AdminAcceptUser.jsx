import React, { useState } from "react";
import { Check, X, Eye } from "lucide-react";

export default function AdminAcceptUser() {
  const dummyRequests = [
    {
      id: 1,
      createdBy: "Alice",
      name: "Software Engineer Resume",
      cover:
        "https://via.placeholder.com/300x180.png?text=Software+Engineer+Resume",
      content:
        "<h1>Alice</h1><p>Email: alice@example.com</p><p>Experience: 3 years</p>",
    },
    {
      id: 2,
      createdBy: "Bob",
      name: "Graphic Designer Resume",
      cover:
        "https://via.placeholder.com/300x180.png?text=Graphic+Designer+Resume",
      content:
        "<h1>Bob</h1><p>Email: bob@example.com</p><p>Portfolio: www.bobdesign.com</p>",
    },
    {
      id: 3,
      createdBy: "Charlie",
      name: "Product Manager Resume",
      cover:
        "https://via.placeholder.com/300x180.png?text=Product+Manager+Resume",
      content:
        "<h1>Charlie</h1><p>Email: charlie@example.com</p><p>Experience: 5 years</p>",
    },
  ];

  const [requests, setRequests] = useState(dummyRequests);
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const handleAction = (id, action) => {
    alert(`Template ID ${id} has been ${action}`);
    setRequests((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="p-6 min-h-screen bg-slate-50">
      <h1 className="text-3xl font-bold mb-8 text-slate-900">
        Template Approval
      </h1>

      {requests.length === 0 ? (
        <p className="text-slate-500">No pending template requests</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition"
            >
              {/* Cover */}
              <img
                src={template.cover}
                alt={template.name}
                className="w-full h-48 object-cover rounded-t-2xl cursor-pointer"
                onClick={() => setPreviewTemplate(template)}
              />

              <div className="p-5">
                <h2 className="text-lg font-semibold text-slate-900">
                  {template.createdBy}
                </h2>
                <p className="text-slate-500 mt-1">{template.name}</p>

                {/* Actions */}
                <div className="mt-5 flex justify-end gap-3">
                  <button
                    onClick={() => handleAction(template.id, "approved")}
                    className="p-2 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-sm"
                    title="Approve"
                  >
                    <Check size={18} />
                  </button>

                  <button
                    onClick={() => handleAction(template.id, "rejected")}
                    className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-sm"
                    title="Reject"
                  >
                    <X size={18} />
                  </button>

                  <button
                    onClick={() => setPreviewTemplate(template)}
                    className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-sm"
                    title="Preview"
                  >
                    <Eye size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 max-w-3xl rounded-2xl shadow-xl p-6 relative">
            <button
              onClick={() => setPreviewTemplate(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-slate-900">
              {previewTemplate.name} · {previewTemplate.createdBy}
            </h2>

            <div
              className="overflow-auto max-h-[70vh] text-slate-800 prose"
              dangerouslySetInnerHTML={{
                __html: previewTemplate.content,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
