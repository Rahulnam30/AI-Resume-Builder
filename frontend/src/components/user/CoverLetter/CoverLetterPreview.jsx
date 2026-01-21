import {
  FileText,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';
import { useState } from 'react';

const CoverLetterPreview = ({
  formData,
  selectedTemplate,
  isExpanded,
  onExpand,
  onCollapse,
}) => {
  const [zoom, setZoom] = useState(1);

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

  const PreviewContent = () => (
    <div className="mt-10 mb-4">
      <div
        className="bg-white w-[694px] min-h-[1023px] p-8 lg:p-12 text-slate-800 text-sm leading-relaxed relative shadow-lg"
        style={{
          transform: `scale(${zoom})`,
        }}
      >
        {/* Sender Info */}
        <div className="pb-6 border-b border-slate-200">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2 tracking-tight">
            {formData.fullName || 'Your Name'}
          </h1>
          <div className="text-slate-500 text-sm space-y-1">
            {formData.address && <p>{formData.address}</p>}
            {formData.email && <p>{formData.email}</p>}
            {formData.phone && <p>{formData.phone}</p>}
            {formData.linkedin && <p>{formData.linkedin}</p>}
          </div>
        </div>

        {/* Date */}
        <p className="text-slate-600 text-sm mt-6 mb-6">
          {formatDate(formData.letterDate)}
        </p>

        {/* Recipient Info */}
        <div className="mb-6 text-slate-700 text-sm">
          {formData.recipientName ? (
            <>
              <p className="font-medium">{formData.recipientName}</p>
              {formData.recipientTitle && <p>{formData.recipientTitle}</p>}
            </>
          ) : (
            <p className="font-medium">Hiring Manager</p>
          )}
          {formData.companyName && <p>{formData.companyName}</p>}
          {formData.companyAddress && <p>{formData.companyAddress}</p>}
        </div>

        {/* Greeting */}
        <p className="text-slate-800 font-medium mb-4">
          Dear {formData.recipientName || 'Hiring Manager'},
        </p>

        {/* Body */}
        <div className="space-y-4 text-slate-700 leading-relaxed">
          {formData.openingParagraph && (
            <p>{formData.openingParagraph}</p>
          )}
          {formData.bodyParagraph1 && (
            <p>{formData.bodyParagraph1}</p>
          )}
          {formData.bodyParagraph2 && (
            <p>{formData.bodyParagraph2}</p>
          )}
          {formData.closingParagraph && (
            <p>{formData.closingParagraph}</p>
          )}
          
          {!formData.openingParagraph && !formData.bodyParagraph1 && (
            <p className="text-slate-400 italic">
              Your cover letter content will appear here as you type...
            </p>
          )}
        </div>

        {/* Closing */}
        <div className="mt-8 text-slate-800">
          <p className="mb-6">
            {formData.salutation === 'custom' ? formData.customSalutation : formData.salutation},
          </p>
          <p className="font-medium">{formData.fullName || 'Your Name'}</p>
        </div>
      </div>
    </div>
  );

  /* FULLSCREEN MODE */
  if (isExpanded) {
    return (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
        <div className="bg-white w-full h-full max-w-[95vw] max-h-[95vh] rounded-xl shadow-lg flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <FileText size={16} /> Live Preview
            </h3>

            <div className="flex items-center gap-2">
              <button onClick={zoomOut}>
                <ZoomOut size={16} />
              </button>
              <span className="text-sm font-medium">
                {Math.round(zoom * 100)}%
              </span>
              <button onClick={zoomIn}>
                <ZoomIn size={16} />
              </button>
              <button onClick={resetZoom}>
                <RotateCcw size={16} />
              </button>
              <button onClick={onCollapse}>
                <Minimize2 size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto flex justify-center p-6">
            <PreviewContent />
          </div>
        </div>
      </div>
    );
  }

  /* NORMAL MODE */
  return (
    <div className="w-[90%] border rounded-xl shadow-sm mr-4 m-2">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <FileText size={16} /> Live Preview
        </h3>
        <button onClick={onExpand}>
          <Maximize2 size={16} />
        </button>
      </div>

      <div className="overflow-auto flex justify-center p-4 bg-slate-200">
        <PreviewContent />
      </div>

      <div className="px-4 py-2 border-t text-xs text-slate-500">
        Template: {selectedTemplate}
      </div>
    </div>
  );
};

export default CoverLetterPreview;
