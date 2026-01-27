
import { useMemo, useState, useEffect, useRef } from 'react';
import { Search, Plus, Upload, Filter, Eye, X, Check } from "lucide-react";
import UserNavBar from '../UserNavBar/UserNavBar';
import axios from 'axios';
//import { renderAsync } from "docx-preview";
//import html2canvas from "html2canvas";

const TemplatesDashboardPage = ({ onSelectTemplate }) => {
  const [search, setSearch] = useState('');
  const [fetchedTemplates, setFetchedTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Upload Modal State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadFormData, setUploadFormData] = useState({
    name: '',
    category: 'Modern',
    description: ''
  });
  const [templateFile, setTemplateFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState({ type: '', text: '' });

  // Preview Modal State
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const previewContainerRef = useRef(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/template?status=approved');
      const rawData = response.data || [];
      const mappedData = rawData.map(item => ({
        id: item._id,
        name: item.name,
        category: item.category,
        file: item.fileUrl,
        img: item.imageUrl,
        description: item.description
      }));
      setFetchedTemplates(mappedData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching templates:", err.response?.data || err.message);
      setError(err.response?.data?.msg || "Failed to load templates.");
      setLoading(false);
    }
  };

  const filteredTemplates = useMemo(() => {
    return fetchedTemplates.filter(t =>
      t.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [fetchedTemplates, search]);

  // Grouping similar to Admin, or just sections
  const modern = filteredTemplates.filter(t => ['modern', 'Modern', 'Modern Templates'].includes(t.category));
  const creative = filteredTemplates.filter(t => ['creative', 'Creative', 'Creative Templates'].includes(t.category));
  const professional = filteredTemplates.filter(t => ['professional', 'Professional', 'Professional Templates'].includes(t.category));

  // Determine if we have any categorized templates, otherwise show all in one grid if convenient, 
  // but to match Admin UI exactly, we'll keep the section approach if data supports it.

  const handlePreview = (imageUrl) => {
    setPreviewImage(imageUrl);
    setIsPreviewModalOpen(true);
  };

  const handleUseTemplate = (templateId) => {
    if (onSelectTemplate) {
      onSelectTemplate(templateId);
    } else {
      // Fallback or navigation if not embedded
      console.log("Selected template:", templateId);
      // You might want to navigate to builder here if strictly used as a page
      // window.location.href = '/user/resume-builder?template=' + templateId; 
    }
  };

  /* --- Upload Logic (Preserved) --- */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUploadFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    if (name === 'templateFile') {
      const file = files[0];
      setTemplateFile(file);
      if (file && previewContainerRef.current) {
        try {
          previewContainerRef.current.innerHTML = '';
          await renderAsync(file, previewContainerRef.current);
        } catch (error) {
          console.error("Error rendering DOCX:", error);
          setUploadMessage({ type: 'error', text: 'Failed to preview.' });
        }
      }
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!templateFile) return;

    setUploading(true);
    setUploadMessage({ type: '', text: 'Processing...' });

    try {
      if (!previewContainerRef.current) throw new Error("Preview container missing");
      const canvas = await html2canvas(previewContainerRef.current, { scale: 0.5, useCORS: true });

      canvas.toBlob(async (blob) => {
        if (!blob) throw new Error("Thumbnail failed");

        const formData = new FormData();
        formData.append('name', uploadFormData.name);
        formData.append('category', uploadFormData.category);
        formData.append('description', uploadFormData.description);
        formData.append('templateFile', templateFile);
        formData.append('thumbnail', blob, "thumbnail.png");

        try {
          await axios.post('http://localhost:5000/api/template/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          setUploadMessage({ type: 'success', text: 'Uploaded! Pending approval.' });
          setUploadFormData({ name: '', category: 'Modern', description: '' });
          setTemplateFile(null);
          if (previewContainerRef.current) previewContainerRef.current.innerHTML = '';
          setTimeout(() => { setIsUploadModalOpen(false); setUploadMessage({ type: '', text: '' }); }, 2000);
          fetchTemplates(); // Refresh list to see if (logic allows) pending ones? User usually only sees approved.
        } catch (err) {
          setUploadMessage({ type: 'error', text: err.response?.data?.msg || 'Upload failed.' });
        } finally {
          setUploading(false);
        }
      }, 'image/png');
    } catch (err) {
      console.error(err);
      setUploadMessage({ type: 'error', text: 'Failed to process.' });
      setUploading(false);
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
      {/* Navbar Placeholder - Adjust per your app structure */}
      {/* If UserNavBar is fixed, add top padding to container. If sticky, ensure proper nesting. */}
      <div className='sticky top-0 z-40 bg-white shadow-sm'>
        <UserNavBar />
      </div>

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

            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm"
            >
              <Upload size={16} />
              <span className="hidden sm:inline">Upload</span>
            </button>
          </div>
        </div>

        {/* Content */}
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <p>No templates found matching your search.</p>
          </div>
        ) : (
          <div>
            {/* If we have clear categories, render sections. Else fallback to grid. */}
            {(modern.length > 0 || creative.length > 0 || professional.length > 0) ? (
              <>
                {renderSection('Modern Templates', modern)}
                {renderSection('Creative Templates', creative)}
                {renderSection('Professional Templates', professional)}
                {/* Render 'Other' if any leftover?
                {renderSection('Other Templates', filteredTemplates.filter(t => !['modern', 'creative', 'professional'].some(c => t.category?.toLowerCase() === c)))} */}
              </>
            ) : (
              // Fallback if categories don't match exactly
              renderSection('All Templates', filteredTemplates)
            )}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-fadeIn">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-800">Upload New Template</h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto custom-scrollbar space-y-5">
              {uploadMessage.text && (
                <div className={`p-3 rounded-lg text-sm border ${uploadMessage.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                  {uploadMessage.text}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                    <input
                      name="name"
                      value={uploadFormData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="e.g. Minimalist Blue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                    <select
                      name="category"
                      value={uploadFormData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    >
                      <option value="Modern">Modern</option>
                      <option value="Creative">Creative</option>
                      <option value="Professional">Professional</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      rows={3}
                      value={uploadFormData.description}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all"
                      placeholder="Briefly describe the style..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">File (.docx)</label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 hover:border-blue-400 transition-all">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-3 text-slate-400" />
                        <p className="text-xs text-slate-500"><span className="font-semibold">Click to upload</span></p>
                        <p className="text-xs text-slate-400">DOCX only</p>
                      </div>
                      <input name="templateFile" type="file" accept=".docx" className="hidden" onChange={handleFileChange} />
                    </label>
                    {templateFile && <p className="text-xs text-blue-600 mt-2 truncate">Selected: {templateFile.name}</p>}
                  </div>
                </div>

                {/* Preview Box */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-slate-700">Preview</label>
                  <div className="border border-slate-200 bg-slate-100 rounded-lg h-full min-h-[300px] flex items-center justify-center overflow-hidden relative">
                    {!templateFile && <span className="text-xs text-slate-400">No file selected</span>}
                    <div
                      ref={previewContainerRef}
                      className="bg-white shadow-sm origin-top scale-50" // Scale down for modal view
                      style={{ width: '794px', display: templateFile ? 'block' : 'none' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUploadSubmit}
                disabled={uploading || !templateFile}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                {uploading ? 'Uploading...' : 'Upload Template'}
              </button>
            </div>
          </div>
        </div>
      )}

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
