import React, { useState, useMemo, useRef, useEffect } from "react";
import { 
  Check, Eye, ChevronLeft, ChevronRight, X, 
  Maximize2, Minimize2, ZoomIn, ZoomOut 
} from "lucide-react";
import axiosInstance from "../../../api/axios";
import CVTemplates from "./Cvtemplates";
import mergeWithSampleData, { hasAnyUserData } from "../../../utils/Datahelpers";
import { AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

export const templates = [
  { id: "professional", name: "Professional", category: "Traditional" },
  { id: "modern", name: "Modern Blue", category: "Contemporary" },
  { id: "creative", name: "Creative", category: "Creative" },
  { id: "minimal", name: "Minimal", category: "Traditional" },
  { id: "executive", name: "Executive", category: "Traditional" },
  { id: "academic", name: "Academic", category: "Traditional" },
  { id: "twoColumn", name: "Two Column", category: "Traditional" },
  { id: "simple", name: "Simple", category: "Traditional" },
  { id: "Elegant", name: "Elegant", category: "Contemporary" },
  { id: "vertex", name: "Vertex Sidebar", category: "Contemporary" },
  { id: "elite", name: "Elite ", category: "Creative" },
  { id: "eclipse", name: "Eclipse", category: "Contemporary" },
  { id: "eclipse1", name: "Eclipse", category: "Traditional" },
  { id: "harbor", name: "Harbor", category: "Creative" },
];

/* ----------------------------- Card ----------------------------- */

const TemplateCard = ({ template, isSelected, displayData, onPreview, onUse }) => {
  const TemplateComponent = CVTemplates[template.id];

  return (
    <div className="min-w-[280px] w-[280px] bg-white border border-slate-200 rounded-xl p-2 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col flex-shrink-0 select-none overflow-hidden">
      <div className="relative w-full aspect-[210/297] rounded-lg overflow-hidden group bg-white">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: "scale(0.38)", transformOrigin: "top left", width: 794 }}
        >
          {TemplateComponent && <TemplateComponent formData={displayData} />}
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent pt-12 pb-3 px-3 flex flex-col justify-end pointer-events-none z-10">
          <h3 className="text-base font-semibold text-white truncate">{template.name}</h3>
          <p className="text-xs text-slate-300 truncate">{template.category}</p>
        </div>

        <div className="absolute top-2 right-2 z-20">
          <button
            onClick={(e) => { e.stopPropagation(); onPreview(template); }}
            className="bg-black/50 hover:bg-black/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5 transition-all shadow-sm cursor-pointer border border-white/10"
          >
            <Eye size={12} /> Preview
          </button>
        </div>

        <div className="absolute bottom-16 left-2 z-20">
          <button
            onClick={(e) => { e.stopPropagation(); onUse(template.id); }}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-full font-medium flex items-center gap-1.5 transition-all shadow-lg cursor-pointer"
          >
            <Check size={12} /> Use Template
          </button>
        </div>

        {isSelected && (
          <div className="absolute top-2 left-2 z-20 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
            <Check size={12} /> Active
          </div>
        )}
      </div>
    </div>
  );
};

/* -------------------------- Section Row -------------------------- */

const TemplateSection = ({ title, items, selectedTemplate, displayData, onPreview, onUse }) => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  if (!items.length) return null;

  return (
    <div className="space-y-4 mb-12">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
        <span className="text-sm font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{items.length}</span>
      </div>

      <div className="relative group/section">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 w-10 h-10 bg-white border border-slate-200 shadow-lg rounded-full flex items-center justify-center text-slate-700 opacity-0 group-hover/section:opacity-100 transition-all hover:bg-slate-50 hover:scale-110"
        >
          <ChevronLeft size={20} />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-1 px-1 -mx-1 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((tpl) => (
            <TemplateCard
              key={tpl.id}
              template={tpl}
              isSelected={selectedTemplate === tpl.id}
              displayData={displayData}
              onPreview={onPreview}
              onUse={onUse}
            />
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 w-10 h-10 bg-white border border-slate-200 shadow-lg rounded-full flex items-center justify-center text-slate-700 opacity-0 group-hover/section:opacity-100 transition-all hover:bg-slate-50 hover:scale-110"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

/* ------------------------ Preview Modal Component ------------------------ */
const PreviewModalComponent = ({ template, zoomLevel, onZoomChange, onClose, onUse, formData, displayData, showingUserData }) => {
  const TemplateComponent = CVTemplates[template.id];
  const modalContentRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Key to force re-render
  const [isRefreshing, setIsRefreshing] = useState(false); // Visual feedback

  const handleZoomIn = (e) => { e?.stopPropagation(); onZoomChange(Math.min(200, zoomLevel + 10)); };
  const handleZoomOut = (e) => { e?.stopPropagation(); onZoomChange(Math.max(50, zoomLevel - 10)); };
  const handleZoomChange = (e, value) => {
    e?.stopPropagation();
    const newValue = value !== undefined ? value : Number(e.target.value);
    onZoomChange(Math.max(50, Math.min(200, newValue)));
  };
  
  // Functional refresh: forces template re-render + resets zoom
  const handleRefresh = (e) => {
    e?.stopPropagation();
    setIsRefreshing(true);
    
    // Reset zoom to 100%
    onZoomChange(100);
    
    // Force re-render by incrementing key
    setRefreshKey(prev => prev + 1);
    
    // Visual feedback timeout
    setTimeout(() => setIsRefreshing(false), 300);
  };
  
  const handleBackdropClick = (e) => {
    if (modalContentRef.current && !modalContentRef.current.contains(e.target)) onClose();
  };

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-[99999] bg-slate-100 flex flex-col"
      onClick={handleBackdropClick}
      style={{ isolation: 'isolate' }}
    >
      {/* Top Toolbar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-200 bg-white flex-shrink-0 z-10">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="flex items-center gap-2 text-slate-700">
            <Eye size={18} />
            <span className="text-sm font-semibold text-gray-800">Preview</span>
          </div>
          <span className="text-gray-600 hidden sm:inline font-medium truncate max-w-[200px]">
            {formData?.fullName || "Jessica Claire"} ({template.name})
          </span>
          <span className="text-[10px] sm:text-xs px-2 py-0.5 bg-blue-50 text-blue-600 font-medium rounded-full border border-blue-200 whitespace-nowrap">
            {template.category}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Expand/Collapse Toggle */}
          <button
            onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
            className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title={isExpanded ? "Collapse to A4 View" : "Expand to Full View"}
          >
            {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>

          {/* Zoom Controls - Only show in normal mode */}
          {!isExpanded && (
            <>
              <button onClick={handleZoomOut} className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" title="Zoom Out">
                <ZoomOut size={16} />
              </button>
              <div className="hidden sm:flex items-center gap-2 px-2">
                <input type="range" min="50" max="200" value={zoomLevel} onChange={(e) => handleZoomChange(e)} onClick={(e) => e.stopPropagation()} className="w-24 h-1 cursor-pointer accent-blue-500" />
              </div>
              <button onClick={handleZoomIn} className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" title="Zoom In">
                <ZoomIn size={16} />
              </button>
              <span className="hidden sm:inline text-sm text-slate-600 font-medium bg-gray-100 px-2 py-1 w-14 text-center rounded">{zoomLevel}%</span>
              <div className="w-px h-5 bg-slate-300 mx-1 hidden sm:block" />
              
              {/* Refresh Button - Now Functional */}
              <button 
                onClick={handleRefresh} 
                className={`p-1.5 sm:p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition ${isRefreshing ? 'animate-spin' : ''}`} 
                title="Refresh Preview (Reload + Reset Zoom)"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </>
          )}

          <button
            onClick={(e) => { e.stopPropagation(); onUse(template.id); onClose(); }}
            className="hidden sm:flex px-3 py-1.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition items-center gap-1.5"
          >
            <Check size={14} /> Use Template
          </button>

          <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="p-1.5 sm:p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition" title="Close Preview">
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className={`flex-1 overflow-auto bg-slate-100 flex justify-center ${isExpanded ? 'p-0' : 'p-8 pt-8'}`}>
        <div
          ref={modalContentRef}
          className={`bg-white shadow-2xl transition-all duration-300 ${isExpanded ? 'w-full min-h-screen' : ''}`}
          style={isExpanded ? {
            transform: 'none',
            transformOrigin: 'top center',
          } : {
            width: 794,
            minHeight: 1123,
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
            marginTop: '0px',
            marginBottom: '32px'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`w-full ${isExpanded ? 'min-h-screen flex justify-center' : 'h-full'}`} style={{ contain: 'layout style paint' }}>
            <div className={isExpanded ? 'w-[794px] min-h-[1123px]' : ''}>
              {/* Key prop forces re-mount on refresh */}
              {TemplateComponent && <TemplateComponent key={`template-${refreshKey}`} formData={displayData} />}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar - Only show in normal mode */}
      {!isExpanded && (
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 border-t border-slate-200 bg-white flex-shrink-0">
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <span className="font-medium">A4 Format</span>
            <span className="text-slate-300">•</span>
            <span>Ready for Export</span>
            {showingUserData && (
              <>
                <span className="text-slate-300">•</span>
                <span className="text-green-600 font-medium">✓ Your data loaded</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => onZoomChange(100)} className="text-xs text-slate-500 hover:text-slate-700 px-2 py-1 hover:bg-slate-100 rounded transition">Reset Zoom</button>
          </div>
        </div>
      )}

      {/* Expanded mode hint */}
      {isExpanded && (
        <div className="absolute bottom-4 right-4 z-20">
          <div className="bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-2">
            <Maximize2 size={12} />
            <span>Full View • Click <Minimize2 size={12} className="inline" /> to return</span>
          </div>
        </div>
      )}
    </div>
  );
};

/* --------------------------- Main Page --------------------------- */

const TemplatesGallery = ({ selectedTemplate, onSelectTemplate, formData }) => {
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [statuses, setStatuses] = useState({});
  const [zoomLevel, setZoomLevel] = useState(100);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = previewTemplate ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [previewTemplate]);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const res = await axiosInstance.get('/api/template-visibility');
        setStatuses(res.data || {});
      } catch (err) { console.error("Error loading template statuses:", err); }
    };
    fetchStatuses();
  }, []);

  const displayData = useMemo(() => mergeWithSampleData(formData), [formData]);
  const showingUserData = useMemo(() => hasAnyUserData(formData), [formData]);

  const activeTemplates = useMemo(() => templates.filter((t) => statuses[t.id] !== false), [statuses]);
  const traditional = activeTemplates.filter((t) => t.category === "Traditional");
  const contemporary = activeTemplates.filter((t) => t.category === "Contemporary");
  const creative = activeTemplates.filter((t) => t.category === "Creative");
  const academic = activeTemplates.filter((t) => t.category === "Academic");

  return (
    <div className="w-full bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-800">Choose Your CV Template</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Preview how your information looks with different designs. All templates are fully customizable.</p>
        </div>

        <TemplateSection title="Traditional Templates" items={traditional} selectedTemplate={selectedTemplate} displayData={displayData} onPreview={setPreviewTemplate} onUse={onSelectTemplate} />
        <TemplateSection title="Contemporary Templates" items={contemporary} selectedTemplate={selectedTemplate} displayData={displayData} onPreview={setPreviewTemplate} onUse={onSelectTemplate} />
        <TemplateSection title="Creative Templates" items={creative} selectedTemplate={selectedTemplate} displayData={displayData} onPreview={setPreviewTemplate} onUse={onSelectTemplate} />
        <TemplateSection title="Academic Templates" items={academic} selectedTemplate={selectedTemplate} displayData={displayData} onPreview={setPreviewTemplate} onUse={onSelectTemplate} />

        {/* Render modal using Portal to escape parent layout */}
        {mounted && previewTemplate && createPortal(
          <PreviewModalComponent 
            template={previewTemplate} 
            zoomLevel={zoomLevel}
            onZoomChange={setZoomLevel}
            onClose={() => setPreviewTemplate(null)}
            onUse={onSelectTemplate}
            formData={formData}
            displayData={displayData}
            showingUserData={showingUserData}
          />,
          document.body
        )}
      </div>
    </div>
  );
};

export default TemplatesGallery;