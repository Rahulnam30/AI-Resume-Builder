import React, { useState } from "react";
import { Check, X, Eye } from "lucide-react";

export default function AdminAcceptUser() {
  // Dummy data
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
    alert(`Template ID ${id} has been ${action}`); // temporary feedback
    setRequests((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Template Approval Dashboard
      </h1>

      {requests.length === 0 ? (
        <p className="text-gray-500">No pending template requests</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((template) => (
            <div
              key={template.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Cover */}
              <img
                src={template.cover}
                alt={template.name}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => setPreviewTemplate(template)}
              />

              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {template.createdBy}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  {template.name}
                </p>

                {/* Action Buttons */}
                <div className="mt-4 flex justify-end gap-3">
                  <button
                    onClick={() => handleAction(template.id, "approved")}
                    className="p-2 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-md transition-colors"
                    title="Approve"
                  >
                    <Check size={18} />
                  </button>

                  <button
                    onClick={() => handleAction(template.id, "rejected")}
                    className="p-2 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-md transition-colors"
                    title="Reject"
                  >
                    <X size={18} />
                  </button>

                  <button
                    onClick={() => setPreviewTemplate(template)}
                    className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-colors"
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

      {/* Template Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 w-11/12 max-w-3xl rounded-xl shadow-lg p-6 relative">
            <button
              onClick={() => setPreviewTemplate(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              {previewTemplate.name} by {previewTemplate.createdBy}
            </h2>

            <div
              className="overflow-auto max-h-[70vh] text-gray-800 dark:text-white"
              dangerouslySetInnerHTML={{ __html: previewTemplate.content }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
