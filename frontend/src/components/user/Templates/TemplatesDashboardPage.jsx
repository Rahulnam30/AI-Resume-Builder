
import { useMemo, useState, useEffect, useRef } from 'react';
import TemplateCard from './TemplateCard';
import './TemplatesDashboardPage.css';
import { Bell, HelpCircle } from "lucide-react";
import UserNavBar from '../UserNavBar/UserNavBar'; // adjust path if needed
import axios from 'axios';
import { renderAsync } from "docx-preview";
import html2canvas from "html2canvas";

const TemplatesDashboardPage = () => {
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
  // const [thumbnailFile, setThumbnailFile] = useState(null); // Removed manual thumbnail
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState({ type: '', text: '' });

  const previewContainerRef = useRef(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/template?status=approved');
      // API returns an array directly. Map it to the expected structure.
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
      console.error("Error fetching templates:", err);
      setError("Failed to load templates.");
      setLoading(false);
    }
  };

  // Merge dynamic + static templates (Static removed as requested)
  // If props passed templates, we could merge them, but for now we rely on fetched data.
  const allTemplates = fetchedTemplates;

  const filteredTemplates = useMemo(() => {
    return allTemplates.filter(t =>
      t.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [allTemplates, search]);

  const modern = filteredTemplates.filter(t => t.category === 'modern' || t.category === 'Modern' || t.category === 'Modern Templates');
  const creative = filteredTemplates.filter(t => t.category === 'creative' || t.category === 'Creative' || t.category === 'Creative Templates');
  const professional = filteredTemplates.filter(t => t.category === 'professional' || t.category === 'Professional' || t.category === 'Professional Templates');

  const renderSection = (title, items, count) => (
    <section className="template-section">
      <div className="section-header">
        <h3>{title}</h3>
        <button className="view-all">View All ({count})</button>
      </div>

      <div className="templates-grid">
        {items.slice(0, 4).map(t => (
          <TemplateCard key={t.id} template={t} />
        ))}
      </div>
    </section>
  );

  // Upload Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUploadFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    if (name === 'templateFile') {
      const file = files[0];
      setTemplateFile(file);

      // Render Preview
      if (file && previewContainerRef.current) {
        try {
          // Clear previous content
          previewContainerRef.current.innerHTML = '';
          await renderAsync(file, previewContainerRef.current);
        } catch (error) {
          console.error("Error rendering DOCX:", error);
          setUploadMessage({ type: 'error', text: 'Failed to preview the document.' });
        }
      }
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!templateFile) {
      setUploadMessage({ type: 'error', text: 'Please select a template file.' });
      return;
    }

    setUploading(true);
    setUploadMessage({ type: '', text: 'Generating thumbnail and uploading...' });

    try {
      // 1. Generate Thumbnail
      if (!previewContainerRef.current) throw new Error("Preview container not found");

      const canvas = await html2canvas(previewContainerRef.current, {
        scale: 0.5,
        useCORS: true
      });

      canvas.toBlob(async (blob) => {
        if (!blob) {
          setUploading(false);
          setUploadMessage({ type: 'error', text: 'Failed to generate thumbnail.' });
          return;
        }

        // 2. Prepare FormData
        const formData = new FormData();
        formData.append('name', uploadFormData.name);
        formData.append('category', uploadFormData.category);
        formData.append('description', uploadFormData.description);
        formData.append('templateFile', templateFile);
        formData.append('thumbnail', blob, "thumbnail.png");

        // 3. Send to Backend
        try {
          await axios.post('http://localhost:5000/api/template/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          setUploadMessage({ type: 'success', text: 'Template uploaded successfully! It is now pending admin approval.' });
          // Reset form
          setUploadFormData({ name: '', category: 'Modern', description: '' });
          setTemplateFile(null);
          if (previewContainerRef.current) previewContainerRef.current.innerHTML = '';

          // Close modal after a delay
          setTimeout(() => {
            setIsUploadModalOpen(false);
            setUploadMessage({ type: '', text: '' });
          }, 3000);
        } catch (err) {
          console.error("Upload error:", err);
          setUploadMessage({ type: 'error', text: err.response?.data?.msg || 'Failed to upload template.' });
        } finally {
          setUploading(false);
        }

      }, 'image/png');

    } catch (err) {
      console.error("Thumbnail generation error:", err);
      setUploadMessage({ type: 'error', text: 'Failed to process template preview.' });
      setUploading(false);
    }
  };


  if (loading) {
    return <div className="templates-dashboard"><div className="loading">Loading templates...</div></div>;
  }

  if (error) {
    return <div className="templates-dashboard"><div className="error">{error}</div></div>;
  }

  return (
    <div className="templates-dashboard">
      {/* ✅ Navbar */}
      <UserNavBar onMenuClick={() => console.log("Toggle sidebar")} />

      {/* CONTENT BELOW NAVBAR */}
      <div style={{ marginTop: "80px" }}> {/* ensures content is below fixed navbar */}
        <div className="filter-row">
          {/* Kept my search implementation but inside the HEAD's layout if possible, or merged */}
          <div className="filter-input">
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M21 21l-4.35-4.35m1.85-5.4a7.25 7.25 0 11-14.5 0 7.25 7.25 0 0114.5 0z" />
            </svg>
            <input
              placeholder="Search Templates Accordingly..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* HEADER */}
        <div className="page-header">
          <div>
            <h1>Resume Templates</h1>
            <p>Manage and organize all available resume templates.</p>
          </div>

          <div className="header-actions">
            <button className="upload-btn" onClick={() => setIsUploadModalOpen(true)}>+ Upload New Template</button>
            <button className="filter-btn">Filter by Role: All</button>
          </div>
        </div>

        {/* SECTIONS */}
        {renderSection('Modern Templates', modern, modern.length)}
        {renderSection('Creative Templates', creative, creative.length)}
        {renderSection('Professional Templates', professional, professional.length)}
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative animate-fadeIn">
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-6 text-gray-800">Upload New Template</h2>

            {uploadMessage.text && (
              <div className={`mb-4 p-3 rounded ${uploadMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {uploadMessage.text}
              </div>
            )}

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
                <input
                  type="text"
                  name="name"
                  value={uploadFormData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g., Senior Developer Resume"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={uploadFormData.category}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Modern">Modern</option>
                  <option value="Creative">Creative</option>
                  <option value="Professional">Professional</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={uploadFormData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Brief description of the template..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Template File (.docx)</label>
                <input
                  type="file"
                  name="templateFile"
                  accept=".docx"
                  onChange={handleFileChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Preview Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preview (Auto-generated)</label>
                <div className="border border-slate-200 bg-slate-100 rounded p-4 min-h-[300px] flex items-center justify-center overflow-auto relative">
                  {!templateFile && <p className="text-slate-400 text-center">Select a DOCX file to see preview</p>}

                  <div
                    ref={previewContainerRef}
                    className="bg-white shadow-lg origin-top"
                    style={{
                      width: '794px', // A4 width
                      minHeight: '300px',
                      display: templateFile ? 'block' : 'none'
                    }}
                  ></div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
                >
                  {uploading ? 'Processing...' : 'Upload Template'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplatesDashboardPage;
