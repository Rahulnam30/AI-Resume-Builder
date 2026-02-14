import {
  FileText,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Eye,
} from "lucide-react";
import { useEffect, useState } from "react";

function formatDate(value) {
  if (!value)
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const CoverLetterPreview = ({
  formData = {},
  currentTemplate,
  isExpanded,
  onExpand,
  onCollapse,
}) => {
  const [zoom, setZoom] = useState(1);
  const [isMobileView, setIsMobileView] = useState(false);
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

  const {
    fullName = "Your Name",
    email = "",
    phone = "",
    address = "",
    linkedin = "",
    recipientName = "Hiring Manager",
    recipientTitle = "",
    companyName = "",
    companyAddress = "",
    jobTitle = "",
    jobReference = "",
    openingParagraph = "",
    bodyParagraph1 = "",
    bodyParagraph2 = "",
    closingParagraph = "",
    salutation = "Sincerely",
    customSalutation = "",
  } = formData;

  const PreviewContent = () => (
    <div className="w-full h-full flex items-start justify-center p-2 md:p-4">
      <div
        className="bg-white text-slate-800 text-xs md:text-sm leading-relaxed w-full max-w-[8in] md:max-w-[8.5in]"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "top center",
          padding: "0.4in",      // Reduced from 0.6in
          minHeight: "7.5in",    // Reduced from 8.5in  
          maxHeight: "7.5in",    // Added maxHeight to prevent overflow
        }}
      >
        <div className="flex flex-col h-full max-h-full overflow-hidden">
          {/* YOUR INFO - TOP RIGHT */}
          <div className="ml-auto mb-2 text-right">
            <div className="text-xs space-y-0.5 leading-tight">
              <div className="font-semibold text-slate-900">{fullName}</div>
              {address && <div>{address}</div>}
              {email && <div>{email}</div>}
              {phone && <div>{phone}</div>}
              {linkedin && (
                <div className="text-blue-600 text-xs">{linkedin}</div>
              )}
            </div>
          </div>

          {/* DATE */}
          <div className="ml-auto mb-3 text-right text-xs font-medium text-slate-700">
            {formatDate()}
          </div>

          {/* RECIPIENT INFO - HARD LEFT */}
          <div className="mb-3 w-full text-left">
            <div className="text-xs space-y-0.5 leading-tight text-slate-700 max-w-[4in]">
              {recipientName && (
                <div className="font-medium text-slate-900">
                  {recipientName}
                </div>
              )}
              {recipientTitle && <div>{recipientTitle}</div>}
              {companyName && (
                <div className="font-semibold text-slate-900">
                  {companyName}
                </div>
              )}
              {companyAddress && <div>{companyAddress}</div>}
            </div>
          </div>

          {/* SALUTATION */}
          <div className="mb-3 text-sm text-slate-900">
            Dear {recipientName},
          </div>

          {/* SUBJECT */}
          {(jobTitle || jobReference) && (
            <div className="text-center mb-3 py-1.5 border-t border-b border-slate-300">
              {jobTitle && (
                <div className="text-xs font-semibold uppercase tracking-wide">
                  Re: {jobTitle}
                </div>
              )}
              {jobReference && (
                <div className="text-xs text-slate-600 mt-1">
                  Reference: {jobReference}
                </div>
              )}
            </div>
          )}

          {/* BODY */}
          <div className="flex-1 space-y-2 text-left overflow-hidden">
            {openingParagraph && (
              <p className="indent-8 text-sm leading-relaxed">{openingParagraph}</p>
            )}
            {bodyParagraph1 && (
              <p className="indent-8 text-sm leading-relaxed">{bodyParagraph1}</p>
            )}
            {bodyParagraph2 && (
              <p className="indent-8 text-sm leading-relaxed">{bodyParagraph2}</p>
            )}
            {closingParagraph && (
              <p className="indent-8 text-sm leading-relaxed">{closingParagraph}</p>
            )}
          </div>

          {/* CLOSING */}
          <div className="ml-auto pt-4 text-right"> {/* Reduced from pt-6 */}
            <div className="mb-1">
              {salutation === "custom" ? customSalutation : salutation}
            </div>
            <div className="font-semibold text-slate-900">
              {fullName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /* FULLSCREEN MODE */
  if (isExpanded) {
    return (
      <div className="fixed inset-0 z-[99] bg-black/40 backdrop-blur-md flex items-center justify-center">
        <div className="bg-slate-200 w-full max-w-[90%] md:max-w-[70%] max-h-[95vh] rounded-xl shadow-lg flex flex-col">
          <div className="bg-white rounded-t-xl flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <FileText size={16} />
              <span className="font-normal text-xs">
                Cover Letter Preview
                {currentTemplate?.name && ` - ${currentTemplate.name}`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={zoomOut}><ZoomOut size={16} /></button>
              <span className="text-sm">{Math.round(zoom * 100)}%</span>
              <button onClick={zoomIn}><ZoomIn size={16} /></button>
              <button onClick={resetZoom}><RotateCcw size={16} /></button>
              <button onClick={() => { onCollapse(); setZoom(1); }}>
                <Minimize2 size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto bg-slate-100">
            <PreviewContent />
          </div>
        </div>
      </div>
    );
  }

  /* NORMAL MODE */
  return (
    <div className="w-[90%] border rounded-xl shadow-sm mr-4 m-2">
      <div
        className="flex items-center justify-between px-4 py-3 border-b bg-white"
        onClick={clamp}
      >
        <div className="flex items-center gap-2 text-xs md:text-sm font-semibold">
          <FileText size={16} />
          Cover Letter Preview
          {currentTemplate?.name && (
            <span className="text-slate-500 font-normal">
              {" "} - {currentTemplate.name}
            </span>
          )}
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
        className="bg-slate-100 transition-all duration-300 overflow-hidden"
        style={{
          height: isMobilePreviewHidden
            ? isMobileView
              ? "400px"  // Reduced from 500px
              : "auto"
            : "0",
        }}
      >
        <PreviewContent />
      </div>
    </div>
  );
};

export default CoverLetterPreview; 