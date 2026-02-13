import {
  FileText,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Eye,
} from 'lucide-react';
import { useState, useEffect } from 'react';

const CoverLetterPreview = ({
  formData,
  selectedTemplate,
  isExpanded,
  onExpand,
  onCollapse,
}) => {
  const [zoom, setZoom] = useState(1);
  const [isMobileView, setIsMobileView] = useState(false);

  // This is to handle mobile preview toggle.
  const [isMobilePreviewHidden, setIsMobilePreviewHidden] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    setIsMobilePreviewHidden(!isMobileView);
  }, [isMobileView]);

  function clamp() {
    if (!isMobileView) return;
    setIsMobilePreviewHidden((prev) => !prev);
  }

  const zoomIn = () => setZoom((z) => Math.min(z + 0.1, 2));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.5));
  const resetZoom = () => setZoom(1);

  const formatDate = (dateStr) => {
    if (!dateStr) {
      return new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const PreviewContent = () => {
    const hasContent = formData.fullName || formData.email || formData.phone ||
      formData.recipientName || formData.companyName ||
      formData.openingParagraph || formData.bodyParagraph1;

    if (!hasContent) {
      return (
        <div className="mt-10 mb-4 w-full">
          <div
<<<<<<< Updated upstream
            className="bg-white w-[794px] min-h-[1123px] p-8 lg:p-12 text-slate-800 text-sm leading-relaxed relative shadow-lg"
=======
            className="bg-white w-full max-w-[694px] min-h-[1023px] p-6 md:p-8 lg:p-12 text-slate-800 text-sm leading-relaxed relative shadow-lg mx-auto"
>>>>>>> Stashed changes
            style={{
              transform: `scale(${zoom})`,
            }}
          >
          </div>
        </div>
      );
    }

    return (
      <div className="mt-10 mb-4 w-full">
        <div
<<<<<<< Updated upstream
          className="bg-white w-[794px] min-h-[1123px] p-8 lg:p-12 text-slate-800 text-sm leading-relaxed relative shadow-lg"
=======
          className="bg-white w-full max-w-[694px] min-h-[1023px] p-6 md:p-8 lg:p-12 text-slate-800 text-sm leading-relaxed relative shadow-lg mx-auto"
>>>>>>> Stashed changes
          style={{
            transform: `scale(${zoom})`,
          }}
        >
          {/* Sender Info */}
          {formData.fullName && (
            <div className="pb-6 border-b border-slate-200">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2 tracking-tight">
                {formData.fullName}
              </h1>
              <div className="text-slate-500 text-sm space-y-1">
                {formData.address && <p>{formData.address}</p>}
                {formData.email && <p>{formData.email}</p>}
                {formData.phone && <p>{formData.phone}</p>}
                {formData.linkedin && <p>{formData.linkedin}</p>}
              </div>
            </div>
          )}

          {/* Date */}
          <p className="text-slate-600 text-sm mt-6 mb-6">
            {formatDate(formData.letterDate)}
          </p>

          {/* Recipient Info */}
          {(formData.recipientName || formData.companyName) && (
            <div className="mb-6 text-slate-700 text-sm">
              {formData.recipientName && <p className="font-medium">{formData.recipientName}</p>}
              {formData.recipientTitle && <p>{formData.recipientTitle}</p>}
              {formData.companyName && <p>{formData.companyName}</p>}
              {formData.companyAddress && <p>{formData.companyAddress}</p>}
            </div>
          )}

          {/* Greeting */}
          {(formData.recipientName || formData.openingParagraph) && (
            <p className="text-slate-800 font-medium mb-4">
              Dear {formData.recipientName || 'Hiring Manager'},
            </p>
          )}

          {/* Body */}
          <div className="space-y-4 text-slate-700 leading-relaxed">
            {formData.openingParagraph && <p>{formData.openingParagraph}</p>}
            {formData.bodyParagraph1 && <p>{formData.bodyParagraph1}</p>}
            {formData.bodyParagraph2 && <p>{formData.bodyParagraph2}</p>}
            {formData.closingParagraph && <p>{formData.closingParagraph}</p>}
          </div>

          {/* Closing */}
          {(formData.salutation || formData.fullName) && (
            <div className="mt-8 text-slate-800">
              {formData.salutation && (
                <p className="mb-6">
                  {formData.salutation === 'custom' ? formData.customSalutation : formData.salutation},
                </p>
              )}
              {formData.fullName && <p className="font-medium">{formData.fullName}</p>}
            </div>
          )}
        </div>
      </div>
    );
  };

  /* FULLSCREEN MODE */
  if (isExpanded) {
    return (
      <div className="fixed inset-0 z-[99] bg-black/40 backdrop-blur-md flex items-center justify-center">
        <div className="bg-slate-200 w-full max-w-[90%] md:max-w-[70%] max-h-[95vh] rounded-xl shadow-lg flex flex-col">
          <div className="bg-white rounded-t-xl flex items-center justify-between px-4 py-4 border-b">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <FileText size={16} />
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-left">
                <span className="font-normal text-xs md:text-sm">Live Preview</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={zoomOut} className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors border border-slate-200 rounded-lg hover:bg-slate-100">
                <ZoomOut size={18} />
              </button>
              <span className="text-sm font-medium text-slate-600 min-w-[50px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button onClick={zoomIn} className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors border border-slate-200 rounded-lg hover:bg-slate-100">
                <ZoomIn size={18} />
              </button>
              <button onClick={resetZoom} className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors border border-slate-200 rounded-lg hover:bg-slate-100">
                <RotateCcw size={18} />
              </button>
              <button onClick={onCollapse} className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors border border-slate-200 rounded-lg hover:bg-slate-100">
                <Minimize2 size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto bg-slate-300 p-6 flex justify-center">
            <PreviewContent />
          </div>
        </div>
      </div>
    );
  }

  /* NORMAL MODE */
  return (
    <div className="w-[90%] border rounded-xl shadow-sm mr-4 m-2">
<<<<<<< Updated upstream
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <FileText size={16} /> Live Preview <span className="text-slate-500 font-normal">- {selectedTemplate}</span>
        </h3>
        <button onClick={onExpand}>
          <Maximize2 size={16} />
        </button>
      </div>

      <div className="overflow-auto flex justify-center p-4 bg-slate-200 rounded-b-xl">
        <PreviewContent />
      </div>
=======
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        onClick={clamp}
      >
        <div className="flex items-center gap-2 font-semibold md:text-sm text-xs select-none">
          <FileText size={16} />
          <span className="font-medium">Live Preview</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onExpand();
          }}
        >
          <Eye size={20} className="block md:hidden" />
          <Maximize2 size={16} className="hidden md:block" />
        </button>
      </div>

      <div
        className="md:overflow-auto overflow-y-hidden flex justify-center md:p-4 rounded-b-xl bg-slate-200 transition-all duration-300"
        style={{
          height: isMobilePreviewHidden
            ? isMobileView
              ? "500px"
              : "auto"
            : "0",
        }}
      >
        <PreviewContent />
      </div>

      <div className="px-4 py-2 border-t text-xs text-slate-500 flex-shrink-0 bg-white">
        Template: {selectedTemplate}
      </div>
>>>>>>> Stashed changes
    </div>
  );
};

export default CoverLetterPreview;