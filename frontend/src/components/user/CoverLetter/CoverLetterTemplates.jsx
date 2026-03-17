import { useState, useMemo, useRef, useEffect } from "react";
import { 
  Check, Eye, ChevronLeft, ChevronRight, X, 
  Maximize2, Minimize2, ZoomIn, ZoomOut, Search, Sparkles
} from "lucide-react";
import { createPortal } from "react-dom";

// Import assets (relative to src/components/user/CoverLetter)
import id1 from '../../../assets/id1.webp';
import id2 from '../../../assets/id2.jpg';
import id3 from '../../../assets/id3.jpg';
import id4 from '../../../assets/id4.jpg';
import id5 from '../../../assets/id5.jpg';
import id6 from '../../../assets/id6.jpg';
import id7 from '../../../assets/id7.jpg';
import id8 from '../../../assets/id8.jpg';
import id9 from '../../../assets/id9.jpg';

/* ----------------------------- Card ----------------------------- */
const TemplateCard = ({ template, isSelected, onPreview, onUse }) => {
  return (
    <div className="min-w-[280px] w-[280px] bg-white border border-slate-200 rounded-xl p-2 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col flex-shrink-0 select-none overflow-hidden group">
      <div className="relative w-full aspect-[210/297] rounded-lg overflow-hidden bg-white">
        {/* Template Image */}
        <img
          src={template.image}
          alt={`${template.title} Template`}
          className="w-full h-full object-cover object-top transition-all duration-300"
        />

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent pt-12 pb-3 px-3 flex flex-col justify-end pointer-events-none z-10">
          <h3 className="text-base font-semibold text-white truncate">{template.title}</h3>
          <p className="text-xs text-slate-300 truncate">{template.category}</p>
        </div>

        {/* Preview Button (Top Right) */}
        <div className="absolute top-2 right-2 z-20">
          <button
            onClick={(e) => { e.stopPropagation(); onPreview(template); }}
            className="bg-black/50 hover:bg-black/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5 transition-all shadow-sm cursor-pointer border border-white/10"
          >
            <Eye size={12} /> Preview
          </button>
        </div>

        {/* Use Template Button (Bottom) */}
        <div className="absolute bottom-16 left-2 z-20">
          <button
            onClick={(e) => { e.stopPropagation(); onUse(template.id); }}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-full font-medium flex items-center gap-1.5 transition-all shadow-lg cursor-pointer"
          >
            <Check size={12} /> Use Template
          </button>
        </div>

        {/* Active Badge */}
        {isSelected && (
          <div className="absolute top-2 left-2 z-20 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
            <Check size={12} /> Active
          </div>
        )}
      </div>
    </div>
  );
};

/* ------------------------ Preview Modal Component ------------------------ */
const PreviewModalComponent = ({ template, zoomLevel, onZoomChange, onClose, onUse }) => {
  const modalContentRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleZoomIn = (e) => { e?.stopPropagation(); onZoomChange(Math.min(200, zoomLevel + 10)); };
  const handleZoomOut = (e) => { e?.stopPropagation(); onZoomChange(Math.max(50, zoomLevel - 10)); };
  const handleZoomChange = (e, value) => {
    e?.stopPropagation();
    const newValue = value !== undefined ? value : Number(e.target.value);
    onZoomChange(Math.max(50, Math.min(200, newValue)));
  };
  
  const handleBackdropClick = (e) => {
    if (modalContentRef.current && !modalContentRef.current.contains(e.target)) onClose();
  };

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
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-200 bg-white flex-shrink-0 z-10 font-jakarta">
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex items-center gap-2 text-slate-700">
            <Eye size={18} />
            <span className="text-sm font-semibold text-gray-800">Preview</span>
          </div>
          <span className="text-gray-600 hidden sm:inline font-medium truncate max-w-[200px]">
            {template.title}
          </span>
          <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 font-medium rounded-full border border-blue-200 whitespace-nowrap">
            {template.category}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title={isExpanded ? "Collapse View" : "Full View"}
          >
            {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>

          {!isExpanded && (
            <>
              <button onClick={handleZoomOut} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <ZoomOut size={16} />
              </button>
              <div className="hidden sm:flex items-center gap-2 px-2">
                <input type="range" min="50" max="200" value={zoomLevel} onChange={(e) => handleZoomChange(e)} className="w-24 h-1 cursor-pointer accent-blue-500" />
              </div>
              <button onClick={handleZoomIn} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <ZoomIn size={16} />
              </button>
              <span className="hidden sm:inline text-sm text-slate-600 font-medium bg-gray-100 px-2 py-1 w-14 text-center rounded">{zoomLevel}%</span>
            </>
          )}

          <button
            onClick={(e) => { e.stopPropagation(); onUse(template.id); onClose(); }}
            className="flex px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition items-center gap-2 shadow-sm"
          >
            <Check size={14} /> Use Template
          </button>

          <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition">
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className={`flex-1 overflow-auto bg-slate-100 flex justify-center ${isExpanded ? 'p-0' : 'p-8 pb-32'}`}>
        <div
          ref={modalContentRef}
          className={`bg-white shadow-2xl transition-all duration-300 ${isExpanded ? 'w-full' : ''}`}
          style={isExpanded ? {} : {
            width: 794,
            minHeight: 1123,
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <img src={template.image} alt={template.title} className="w-full h-auto" />
        </div>
      </div>

      {/* Bottom Status Bar */}
      {!isExpanded && (
        <div className="absolute bottom-0 left-0 right-0 px-6 py-4 border-t border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between z-20">
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <span className="font-medium bg-slate-100 px-3 py-1 rounded-lg">A4 Layout</span>
            <span className="text-slate-300">•</span>
            <span>Premium Design</span>
          </div>
          <button onClick={() => onZoomChange(100)} className="text-sm font-bold text-blue-600 hover:text-blue-700 px-4 py-2 hover:bg-blue-50 rounded-xl transition">Reset View</button>
        </div>
      )}
    </div>
  );
};


const CoverLetterTemplates = ({ selectedTemplate, onSelectTemplate }) => {
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Examples");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = previewTemplate ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [previewTemplate]);

  const categories = [
    'All Examples',
    'Technology',
    'Marketing',
    'Creative',
    'Healthcare',
    'Education',
    'Business'
  ];

  const templates = [
    { id: 1, title: 'Software Engineer', category: 'Technology', level: 'Mid-Senior Level', image: id1 },
    { id: 2, title: 'Marketing Manager', category: 'Marketing', level: 'Senior Level', image: id2 },
    { id: 3, title: 'Graphic Designer', category: 'Creative', level: 'Entry-Mid Level', image: id3 },
    { id: 4, title: 'Product Manager', category: 'Business', level: 'Senior Level', image: id4 },
    { id: 5, title: 'Registered Nurse', category: 'Healthcare', level: 'Entry-Mid Level', image: id5 },
    { id: 6, title: 'Elementary Teacher', category: 'Education', level: 'Entry Level', image: id6 },
    { id: 7, title: 'Sales Representative', category: 'Business', level: 'Mid Level', image: id7 },
    { id: 8, title: 'Data Analyst', category: 'Technology', level: 'Entry-Mid Level', image: id8 },
    { id: 9, title: 'Executive Assistant', category: 'Business', level: 'Mid-Senior Level', image: id9 }
  ];

  const filteredTemplates = useMemo(() => {
    return templates.filter(tpl => {
      const matchesCategory = activeCategory === 'All Examples' || tpl.category === activeCategory;
      const matchesSearch = tpl.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleUseTemplate = (templateId) => {
    const template = templates.find(t => t.id === templateId);
    if (onSelectTemplate && template) {
      onSelectTemplate(template.title.toLowerCase().replace(/\s+/g, '-'));
    }
  };

  return (
    <div className="w-full bg-[#f8fafc] font-jakarta pb-20">
      {/* Exact CV Header Style */}
      <div className="bg-white/50 backdrop-blur-sm pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <h1 className="text-[42px] font-black text-slate-800 tracking-tight leading-tight">
            Choose Your <span className="text-blue-600">Cover Letter Template</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium opacity-80">
            Preview how your information looks with different designs. All templates are fully customizable.
          </p>

          {/* Search Bar (Centered below subheading) */}
          <div className="max-w-2xl mx-auto mt-10 relative group">
            <div className="absolute inset-0 bg-blue-100 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center p-1.5 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <Search className="ml-4 text-slate-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Search templates (e.g. Technology)..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent px-4 py-3 outline-none text-slate-800 font-semibold placeholder:text-slate-400"
                />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pb-12">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all border shadow-sm ${
                        activeCategory === cat 
                        ? 'bg-slate-800 text-white border-slate-800 scale-105' 
                        : 'bg-white text-slate-500 border-slate-100 hover:border-blue-200 hover:text-blue-600'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Mid-sized Mixed Grid (Always displayed) */}
        <div className="space-y-10">
            <div className="flex items-center justify-between px-2">
                <h2 className="text-2xl font-black text-slate-800">
                    {searchQuery 
                        ? `Results for "${searchQuery}"` 
                        : activeCategory === 'All Examples' ? 'All Templates' : activeCategory
                    }
                </h2>
                <span className="text-slate-400 font-bold text-sm bg-slate-100 px-4 py-1 rounded-full">
                    {filteredTemplates.length} Templates
                </span>
            </div>

            {filteredTemplates.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-2 pb-10">
                    {filteredTemplates.map(tpl => (
                        <TemplateCard 
                            key={tpl.id}
                            template={tpl}
                            isSelected={selectedTemplate === tpl.id || selectedTemplate === tpl.title.toLowerCase().replace(/\s+/g, '-')}
                            onPreview={setPreviewTemplate}
                            onUse={handleUseTemplate}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200 shadow-sm mx-2">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-500 mb-6">
                    <Search size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">No matching templates found</h3>
                    <p className="text-slate-400">Try adjusting your search or filters to see more results.</p>
                </div>
            )}
        </div>
      </div>

      {/* Preview Modal */}
      {mounted && previewTemplate && createPortal(
          <PreviewModalComponent 
            template={previewTemplate} 
            zoomLevel={zoomLevel}
            onZoomChange={setZoomLevel}
            onClose={() => setPreviewTemplate(null)}
            onUse={handleUseTemplate}
          />,
          document.body
      )}
    </div>
  );
};

export default CoverLetterTemplates;
