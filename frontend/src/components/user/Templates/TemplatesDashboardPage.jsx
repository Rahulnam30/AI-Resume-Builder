
import { useMemo, useState, useEffect } from 'react';
import { Search, Filter, Eye, X, Check } from "lucide-react";
import UserNavBar from '../UserNavBar/UserNavBar';
import { TEMPLATES } from './TemplateRegistry';
import { getTemplateStatus } from '../../../utils/templateVisibility';

const TemplatesDashboardPage = ({ onSelectTemplate, isEmbedded = false }) => {
  const [search, setSearch] = useState('');
  const [fetchedTemplates, setFetchedTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Preview Modal State
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      // Filter out inactive templates
      const activeTemplates = TEMPLATES.filter(t => getTemplateStatus(t.id));

      // Map registry templates to dashboard format
      const mappedData = activeTemplates.map(item => ({
        id: item.id,
        name: item.name,
        category: item.category,
        img: item.thumbnail,
        description: item.description,
        isDynamic: true
      }));

      setFetchedTemplates(mappedData);
      setLoading(false);
    } catch (err) {
      console.error("Error loading templates:", err);
      setLoading(false);
    }
  };

  const filteredTemplates = useMemo(() => {
    return fetchedTemplates.filter(t =>
      t.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [fetchedTemplates, search]);

  // Grouping
  const modern = filteredTemplates.filter(t => ['modern', 'Modern', 'Modern Templates'].includes(t.category));
  const creative = filteredTemplates.filter(t => ['creative', 'Creative', 'Creative Templates'].includes(t.category));
  const professional = filteredTemplates.filter(t => ['professional', 'Professional', 'Professional Templates'].includes(t.category));


  const handlePreview = (imageUrl) => {
    setPreviewImage(imageUrl);
    setIsPreviewModalOpen(true);
  };

  const handleUseTemplate = (templateId) => {
    if (onSelectTemplate) {
      onSelectTemplate(templateId);
    } else {
      console.log("Selected template:", templateId);
      // Fallback navigation could go here
    }
  };

  const renderSection = (title, items) => {
    if (items.length === 0) return null;
    return (
      <div className="space-y-4 mb-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
          <span className="text-sm text-slate-500">{items.length} templates</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white border border-slate-200 rounded-xl p-3 hover:shadow-lg transition-shadow duration-200 flex flex-col"
            >
              {/* Preview Image */}
              <div
                className="relative w-full aspect-[210/297] bg-slate-100 rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => handlePreview(tpl.img)}
              >
                {tpl.img ? (
                  <img src={tpl.img} alt={tpl.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400">No Preview</div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="bg-white/90 text-slate-700 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                    Click to Preview
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="mt-3 space-y-1 flex-grow">
                <h3 className="text-sm font-semibold text-slate-800 truncate" title={tpl.name}>
                  {tpl.name}
                </h3>
                <p className="text-xs text-slate-500 truncate">{tpl.description || tpl.category}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100">
                <button
                  onClick={() => handlePreview(tpl.img)}
                  className="flex-1 py-2 flex items-center justify-center gap-1 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs hover:bg-slate-50 font-medium transition-colors"
                >
                  <Eye size={14} />
                  Preview
                </button>
                <button
                  onClick={() => handleUseTemplate(tpl.id)}
                  className="flex-1 py-2 flex items-center justify-center gap-1 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700 font-medium transition-colors shadow-sm"
                >
                  <Check size={14} />
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading templates...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Navbar Placeholder */}
      {!isEmbedded && (
        <div className='sticky top-0 z-40 bg-white shadow-sm'>
          <UserNavBar />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 pt-8 space-y-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Resume Templates</h1>
            <p className="text-sm text-slate-500 mt-1">Choose a professionally designed template to get started.</p>
          </div>

          <div className="flex flex-row items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search templates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-64"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <p>No templates found matching your search.</p>
          </div>
        ) : (
          <div>
            {(modern.length > 0 || creative.length > 0 || professional.length > 0) ? (
              <>
                {renderSection('Modern Templates', modern)}
                {renderSection('Creative Templates', creative)}
                {renderSection('Professional Templates', professional)}
              </>
            ) : (
              renderSection('All Templates', filteredTemplates)
            )}
          </div>
        )}
      </div>

      {/* Full Image Preview Modal */}
      {isPreviewModalOpen && (
        <div key="preview-modal" className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={() => setIsPreviewModalOpen(false)}>
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-lg shadow-2xl animate-scaleIn">
            <button
              onClick={() => setIsPreviewModalOpen(false)}
              className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10"
            >
              <X size={20} />
            </button>
            <img src={previewImage} alt="Preview" className="w-full h-auto max-h-[90vh] object-contain" onClick={(e) => e.stopPropagation()} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplatesDashboardPage;
