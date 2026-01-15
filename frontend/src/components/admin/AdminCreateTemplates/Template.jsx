import React from "react";
import { Filter, Plus, Upload, Trash2, Eye, X } from "lucide-react";

import { renderAsync } from "docx-preview";
import html2canvas from "html2canvas";
import axiosInstance from "../../../api/axios";

export default function AdminTemplates() {
  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [templateName, setTemplateName] = React.useState("");
  const [category, setCategory] = React.useState("Modern Templates"); // Default to existing category
  const [isUploading, setIsUploading] = React.useState(false);
  const previewContainerRef = React.useRef(null);

  const [isPreviewModalOpen, setIsPreviewModalOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState("");

  const [pendingTemplates, setPendingTemplates] = React.useState([]);
  const [approvedTemplates, setApprovedTemplates] = React.useState({});

  const refreshData = async () => {
    try {
      // Fetch Pending
      const pendingRes = await axiosInstance.get("/api/template?status=pending");
      setPendingTemplates(pendingRes.data);

      // Fetch Approved (we will assume the API returns all created ones, we filter or backend filters)
      // Ideally backend endpoint /api/template returns ALL.
      // Let's assume we can fetch approved specifically or filter them client side if endpoint returns all.
      // For now, let's fetch approved.
      const approvedRes = await axiosInstance.get("/api/template?status=approved");

      // Merge with static data (NOW REMOVED, purely dynamic)
      const newApprovedData = {};

      approvedRes.data.forEach(tpl => {
        const cat = tpl.category || "Uncategorized";
        if (!newApprovedData[cat]) newApprovedData[cat] = [];

        newApprovedData[cat].push({
          _id: tpl._id,
          name: tpl.name,
          used: 0, // Placeholder
          previewText: tpl.description || "Custom Template",
          image: tpl.imageUrl,
          fileUrl: tpl.fileUrl,
          isStatic: false
        });
      });
      setApprovedTemplates(newApprovedData);

    } catch (err) {
      console.error("Failed to fetch templates", err);
    }
  };

  React.useEffect(() => {
    refreshData();
  }, []);

  const handleUploadClick = () => {
    setIsUploadModalOpen(true);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Generate preview
      if (previewContainerRef.current) {
        try {
          await renderAsync(file, previewContainerRef.current);
          // Wait a bit for rendering to finish then capture
          // Note: docx-preview renders asynchronously but sometimes we need a small delay for styles
          setTimeout(async () => {
            // We can capture here if we want auto-generation immediately, 
            // but let's do it on submit to ensure it's fresh or show a preview to user first.
          }, 100);
        } catch (error) {
          console.error("Error rendering DOCX:", error);
          alert("Error rendering DOCX preview. Please try another file.");
        }
      }
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile || !templateName) {
      alert("Please select a file and enter a name.");
      return;
    }

    setIsUploading(true);

    try {
      // 1. Capture thumbnail
      if (!previewContainerRef.current) throw new Error("Preview container not found");

      const canvas = await html2canvas(previewContainerRef.current, {
        scale: 0.5, // Verify scale for quality vs size
        useCORS: true
      });

      canvas.toBlob(async (blob) => {
        if (!blob) throw new Error("Failed to generate thumbnail");

        // 2. Prepare FormData
        const formData = new FormData();
        formData.append("name", templateName);
        formData.append("category", category);
        formData.append("templateFile", selectedFile);
        formData.append("thumbnail", blob, "thumbnail.png");

        // 3. Send to Backend
        const res = await axiosInstance.post("/api/template/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert("Template uploaded successfully! It is now pending approval."); // Backend message: res.data.msg
        setIsUploadModalOpen(false);
        setTemplateName("");
        setSelectedFile(null);
        // Refresh lists
        refreshData();

      }, 'image/png');

    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. See console for details.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axiosInstance.put(`/api/template/approve/${id}`);
      alert("Template approved!");
      refreshData();
    } catch (error) {
      console.error("Approval failed", error);
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this template?")) return;
    try {
      await axiosInstance.delete(`/api/template/${id}`);
      refreshData();
      alert("Template deleted successfully");
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete template");
    }
  };

  const handlePreview = (imageUrl) => {
    setPreviewImage(imageUrl);
    setIsPreviewModalOpen(true);
  };

  const handleCreateClick = () => {
    // TODO: Navigate to template creation page or open modal
    console.log("Create new template clicked");
    alert("Create New Template feature coming soon!");
  };

  return (
    <div className="p-6 space-y-10 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Resume Templates
          </h1>
          <p className="text-sm text-slate-500">
            Manage and organize all available resume templates.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleUploadClick}
            className="flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-lg text-sm text-slate-600 bg-white hover:bg-slate-50 transition-colors"
          >
            <Upload size={16} />
            Upload Template
          </button>

          <button
            onClick={handleCreateClick}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus size={16} />
            Create New Template
          </button>

          <button className="flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-lg text-sm text-slate-600 bg-white hover:bg-slate-50 transition-colors">
            <Filter size={16} />
            Filter
          </button>
        </div>
      </div>

      {/* Pending Reviews Section */}
      {pendingTemplates.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-orange-600">Pending Reviews ({pendingTemplates.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pendingTemplates.map((tpl) => (
              <div key={tpl._id} className="bg-orange-50 border border-orange-200 rounded-xl p-3">
                <div className="relative w-full aspect-[210/297] bg-white rounded-lg overflow-hidden mb-3">
                  <img src={tpl.imageUrl} alt={tpl.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-sm font-semibold text-slate-800">{tpl.name}</h3>
                <p className="text-xs text-slate-500 mb-2">{tpl.category}</p>
                <button
                  onClick={() => handleApprove(tpl._id)}
                  className="w-full py-2 bg-orange-600 text-white text-xs rounded hover:bg-orange-700 transition"
                >
                  Approve
                </button>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handlePreview(tpl.imageUrl)}
                    className="flex-1 py-1.5 flex items-center justify-center gap-1 bg-white border border-slate-200 text-slate-600 rounded text-xs hover:bg-slate-50"
                  >
                    <Eye size={14} /> Preview
                  </button>
                  <button
                    onClick={() => handleDelete(tpl._id)}
                    className="flex-1 py-1.5 flex items-center justify-center gap-1 bg-white border border-red-200 text-red-600 rounded text-xs hover:bg-red-50"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <hr className="border-slate-200" />
        </div>
      )}

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-slate-800">Upload New Template</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Template Name</label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. Professional Modern"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Modern Templates">Modern Templates</option>
                  <option value="Creative Templates">Creative Templates</option>
                  <option value="Professional Templates">Professional Templates</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">DOCX File</label>
                <input
                  type="file"
                  accept=".docx"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              {/* Preview Area for Thumbnail Generation */}
              <div className="border border-slate-200 bg-slate-100 rounded p-4 min-h-[300px] flex items-center justify-center overflow-auto relative">
                {!selectedFile && <p className="text-slate-400">Preview will appear here</p>}

                {/* Changed: Added overflow-auto to parent and adjusted container logic */}
                <div
                  className={`bg-white shadow-lg origin-top ${!selectedFile ? 'hidden' : ''}`}
                  ref={previewContainerRef}
                  // We remove fixed transforms here and rely on docx-preview to render.
                  // However, for the thumbnail capture to work well, we might need a specific width.
                  // Let's set a fixed width consistent with A4 and let it scroll if needed.
                  style={{
                    width: '794px', // A4 width in px (96dpi)
                    // minHeight: '1123px', 
                    // No transform scale here for the user view if we want them to see it clearly, 
                    // OR keep the scale but ensure no whitespace.
                    // The 'lost spacing' usually comes from the transform origin or parent dimensions suitable for the scaled content.
                    // Let's try fitting it nicely.
                  }}
                >
                  {/* docx-preview renders here */}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => {
                    setIsUploadModalOpen(false);
                    setSelectedFile(null);
                    setTemplateName(""); // Clear name on cancel
                    // Optionally clear previewContainerRef content here too
                    if (previewContainerRef.current) {
                      previewContainerRef.current.innerHTML = '';
                    }
                  }}
                  className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isUploading}
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isUploading ? 'Uploading...' : 'Upload & Generate Thumbnail'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sections */}
      {Object.entries(approvedTemplates).map(([section, templates]) => (
        <div key={section} className="space-y-4">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">{section}</h2>
            <button className="text-sm text-blue-600 hover:underline">
              View All ({templates.length})
            </button>
          </div>

          {/* A4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {templates.map((tpl, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-xl p-3 hover:shadow-lg transition"
              >
                {/* A4 Preview */}
                <div className="relative w-full aspect-[210/297] bg-slate-100 rounded-lg overflow-hidden">
                  <img
                    src={tpl.image}
                    alt={tpl.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="mt-3 space-y-1">
                  <h3 className="text-sm font-semibold text-slate-800">
                    {tpl.name}
                  </h3>
                  <p className="text-xs text-slate-500">{tpl.previewText}</p>
                </div>

                {/* Actions Overlay or Button Row */}
                <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => handlePreview(tpl.image)}
                    className="flex-1 py-1.5 flex items-center justify-center gap-1 bg-slate-50 text-slate-600 rounded text-xs hover:bg-slate-100 font-medium transition"
                  >
                    <Eye size={14} />
                    Preview
                  </button>
                  <button
                    onClick={() => handleDelete(tpl._id)}
                    className="flex-1 py-1.5 flex items-center justify-center gap-1 bg-red-50 text-red-600 rounded text-xs hover:bg-red-100 font-medium transition"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Image Preview Modal */}
      {isPreviewModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setIsPreviewModalOpen(false)}>
          <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setIsPreviewModalOpen(false)}
              className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition"
            >
              <X size={20} />
            </button>
            <img src={previewImage} alt="Template Preview" className="w-full h-auto block" />
          </div>
        </div>
      )}
    </div>
  );
}
