import React from "react";
import { Filter, Plus, Eye, X, Power, PowerOff } from "lucide-react";
import { TEMPLATES } from '../../user/Templates/TemplateRegistry';
import { getTemplateStatus, toggleTemplateStatus, getAllTemplateStatuses } from "../../../utils/templateVisibility";

import axiosInstance from "../../../api/axios";

export default function AdminTemplates() {
  /* Upload logic removed */

  const [isPreviewModalOpen, setIsPreviewModalOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState("");

  const [pendingTemplates, setPendingTemplates] = React.useState([]);
  const [approvedTemplates, setApprovedTemplates] = React.useState({});
  const [statuses, setStatuses] = React.useState({});

  const refreshData = async () => {
    try {
      // Sync statuses
      setStatuses(getAllTemplateStatuses());

      // Categorize templates from Registry
      const modern = TEMPLATES.filter(t => ['modern', 'Modern', 'Modern Templates'].includes(t.category));
      const creative = TEMPLATES.filter(t => ['creative', 'Creative', 'Creative Templates'].includes(t.category));
      const professional = TEMPLATES.filter(t => ['professional', 'Professional', 'Professional Templates'].includes(t.category));

      const mapToAdminFormat = (list) => list.map(tpl => ({
        _id: tpl.id,
        name: tpl.name,
        used: 0,
        previewText: tpl.description,
        image: tpl.thumbnail,
        isStatic: false
      }));

      const newApprovedData = {
        "Modern Templates": mapToAdminFormat(modern),
        "Creative Templates": mapToAdminFormat(creative),
        "Professional Templates": mapToAdminFormat(professional)
      };

      setApprovedTemplates(newApprovedData);
      setPendingTemplates([]);

    } catch (err) {
      console.error("Failed to fetch templates", err);
    }
  };

  React.useEffect(() => {
    refreshData();
  }, []);

  const handleToggleStatus = (id) => {
    const newStatus = toggleTemplateStatus(id);
    setStatuses(prev => ({ ...prev, [id]: newStatus }));
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

  const isTemplateActive = (id) => {
    return statuses[id] !== false; // Default true
  }

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
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handlePreview(tpl.imageUrl)}
                    className="flex-1 py-1.5 flex items-center justify-center gap-1 bg-white border border-slate-200 text-slate-600 rounded text-xs hover:bg-slate-50"
                  >
                    <Eye size={14} /> Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
          <hr className="border-slate-200" />
        </div>
      )}


      {/* Sections */}
      {Object.entries(approvedTemplates).map(([section, templates]) => (
        templates.length > 0 && (
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
              {templates.map((tpl, index) => {
                const active = isTemplateActive(tpl._id);
                return (
                  <div
                    key={index}
                    className={`bg-white border rounded-xl p-3 transition relative ${active ? 'border-slate-200 hover:shadow-lg' : 'border-slate-100 opacity-75 grayscale-[0.5]'}`}
                  >
                    {/* Status Badge */}
                    <div className={`absolute top-5 right-5 z-10 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border shadow-sm ${active ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                      {active ? 'Active' : 'Inactive'}
                    </div>

                    {/* A4 Preview */}
                    <div
                      className="relative w-full aspect-[210/297] bg-slate-100 rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => handlePreview(tpl.image)}
                    >
                      <img
                        src={tpl.image}
                        alt={tpl.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                        <Eye className="text-white drop-shadow-md" size={32} />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="mt-3 space-y-1">
                      <h3 className="text-sm font-semibold text-slate-800">
                        {tpl.name}
                      </h3>
                      <p className="text-xs text-slate-500 truncate" title={tpl.previewText}>{tpl.previewText}</p>
                    </div>

                    {/* Actions Overlay or Button Row */}
                    <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100">
                      <button
                        onClick={() => window.open(`/admin/resume-editor?id=${tpl._id}`, '_blank')}
                        className="flex-1 py-1.5 flex items-center justify-center gap-1 bg-slate-50 text-slate-600 rounded text-xs hover:bg-slate-100 font-medium transition"
                      >
                        <Eye size={14} />
                        View
                      </button>
                      <button
                        onClick={() => handleToggleStatus(tpl._id)}
                        className={`flex-1 py-1.5 flex items-center justify-center gap-1 rounded text-xs font-medium transition ${active ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}
                      >
                        {active ? <PowerOff size={14} /> : <Power size={14} />}
                        {active ? 'Disable' : 'Enable'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      ))}

      {/* Image Preview Modal */}
      {isPreviewModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setIsPreviewModalOpen(false)}>
          <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl max-h-[90vh] overflow-auto animate-scaleIn" onClick={e => e.stopPropagation()}>
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
