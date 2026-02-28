import ReactDOM from "react-dom";
import React, { 
  useState, 
  useRef, 
  useLayoutEffect, 
  useCallback, 
  useMemo,
  useEffect 
} from "react";
import { 
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  CheckCircle2,
  Circle,
} from "lucide-react";

const LETTER_WIDTH = 794;
const ZOOM_STEP = 0.1;
const ZOOM_MIN = 0.25;
const ZOOM_MAX = 2.0;

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const pct = (z) => `${Math.round(z * 100)}%`;

function useElementWidth(ref) {
  const [w, setW] = useState(0);
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(ref.current);
    setW(ref.current.clientWidth);
    return () => ro.disconnect();
  }, [ref]);
  return w;
}

const IconBtn = ({
  onClick,
  disabled = false,
  title,
  children,
  style = {},
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 36,
      height: 36,
      borderRadius: 8,
      border: "none",
      cursor: disabled ? "not-allowed" : "pointer",
      background: disabled ? "#f1f5f9" : "transparent",
      color: disabled ? "#94a3b8" : "#475569",
      opacity: disabled ? 0.4 : 1,
      transition: "all 0.15s ease",
      flexShrink: 0,
      ...style,
    }}
    onMouseEnter={(e) => {
      if (!disabled) e.currentTarget.style.background = "#f1f5f9";
    }}
    onMouseLeave={(e) => {
      if (!disabled) e.currentTarget.style.background = "transparent";
    }}
  >
    {children}
  </button>
);

const Badge = ({ green, children }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      padding: "4px 10px",
      borderRadius: 20,
      fontSize: 12,
      fontWeight: 600,
      fontFamily: "monospace",
      background: green ? "#dcfce7" : "#dbeafe",
      color: green ? "#15803d" : "#1d4ed8",
      boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
      flexShrink: 0,
    }}
  >
    {green ? <CheckCircle2 size={12} /> : <Circle size={12} />}
    {children}
  </span>
);

const CoverLetterPreview = ({ formData = {}, exportDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) }) => {
  const rootRef = useRef(null);
  const rootWidth = useElementWidth(rootRef);

  const [manualZoom, setManualZoom] = useState(0.85);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  
  // ✅ RESPONSIVE BREAKPOINTS
  const isMobile = rootWidth > 0 && rootWidth < 640;  // Mobile first
  const isTablet = rootWidth >= 640 && rootWidth < 1024;
  const isDesktop = rootWidth >= 1024;
  
  const isUserData = useMemo(() => {
    return Object.values(formData).some(val => val && val.trim());
  }, [formData]);

  const effectiveZoom = manualZoom;

  const {
    fullName = "",
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
    jobSummary = "",
    jobDescription = "",
    openingParagraph = "",
    bodyParagraph1 = "",
    bodyParagraph2 = "",
    closingParagraph = "",
    customSalutation = "",
    salutation = "Sincerely",
  } = formData;

  const zoomIn = useCallback(() =>
    setManualZoom((z) => clamp(+(z + ZOOM_STEP).toFixed(2), ZOOM_MIN, ZOOM_MAX)),
  []);
  const zoomOut = useCallback(() =>
    setManualZoom((z) => clamp(+(z - ZOOM_STEP).toFixed(2), ZOOM_MIN, ZOOM_MAX)),
  );

  const handleToggleMaximize = useCallback(() => {
    setIsMaximized(prev => !prev);
    if (!isMaximized) setManualZoom(0.85);
  }, [isMaximized]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        handleToggleMaximize();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleToggleMaximize]);

  // ✅ RESPONSIVE TOOLBAR WITH MOBILE CROSS ARROW
  const Toolbar = () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "8px 12px" : isTablet ? "12px 16px" : "0 20px",
        height: isMobile ? 48 : isTablet ? 52 : 56,
        background: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        flexShrink: 0,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        width: "100%",
        fontSize: isMobile ? "12px" : "14px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 6 : 12, minWidth: 0 }}>
        {isMobile ? (
          <>
            <IconBtn 
              onClick={() => setIsPreviewVisible(!isPreviewVisible)}
              title="Toggle preview"
              style={{ width: 32, height: 32 }}
            >
              {isPreviewVisible ? <Eye size={14} /> : <EyeOff size={14} />}
            </IconBtn>
            <Badge green={isUserData} style={{ fontSize: 10, padding: "2px 8px" }}>
              {isUserData ? "Live" : "Demo"}
            </Badge>
          </>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 700, fontFamily: "monospace", color: "#0f172a" }}>
              <Eye size={18} strokeWidth={2.5} />
              Cover Letter Preview
            </div>
            <Badge green={isUserData}>{isUserData ? "Your data" : "Sample"}</Badge>
          </>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 4 : 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 2 : 8 }}>
          <IconBtn 
            onClick={zoomOut} 
            disabled={effectiveZoom <= ZOOM_MIN}
            style={{ width: isMobile ? 28 : 36, height: isMobile ? 28 : 36 }}
          >
            <ZoomOut size={isMobile ? 12 : 16} />
          </IconBtn>
          
          <input
            type="range"
            min={ZOOM_MIN * 100}
            max={ZOOM_MAX * 100}
            step={5}
            value={Math.round(manualZoom * 100)}
            onChange={(e) => setManualZoom(Number(e.target.value) / 100)}
            style={{
              width: isMobile ? 50 : isTablet ? 70 : 80,
              height: isMobile ? 16 : 24,
              accentColor: "#2563eb",
              cursor: "pointer",
              borderRadius: isMobile ? 8 : 12,
              background: "#f1f5f9",
              margin: 0,
            }}
          />
          
          <IconBtn 
            onClick={zoomIn} 
            disabled={effectiveZoom >= ZOOM_MAX}
            style={{ width: isMobile ? 28 : 36, height: isMobile ? 28 : 36 }}
          >
            <ZoomIn size={isMobile ? 12 : 16} />
          </IconBtn>
          
          {/* ✅ CROSS ARROW NOW VISIBLE ON MOBILE TOO */}
          <IconBtn 
            onClick={handleToggleMaximize}
            title="Toggle fullscreen"
            style={{ 
              width: isMobile ? 28 : 36, 
              height: isMobile ? 28 : 36 
            }}
          >
            {isMaximized ? <Minimize2 size={isMobile ? 12 : 16} /> : <Maximize2 size={isMobile ? 12 : 16} />}
          </IconBtn>
        </div>
      </div>
    </div>
  );

  // ✅ MOBILE-RESPONSIVE COVER CONTENT
  const CoverContent = () => {
    return (
      <div 
        style={{ 
          position: "relative", 
          width: "100%", 
          maxWidth: isMobile ? "100%" : LETTER_WIDTH, 
          margin: "0 auto", 
          padding: isMobile ? "16px 12px" : "32px 36px",
          fontFamily: "'Times New Roman', Times, serif",
          fontSize: isMobile ? "11pt" : "12pt",
          lineHeight: isMobile ? "1.4" : "1.3",
          color: "black",
          background: "white",
          minHeight: "100%",
          boxSizing: "border-box",
          maxHeight: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "thin",
          scrollbarColor: "#cbd5e1 #f8fafc",
        }}
      >
        {/* CONTACT INFO */}
        <div style={{ 
          textAlign: "right", 
          marginBottom: isMobile ? "12pt" : "18pt", 
          fontSize: isMobile ? "10pt" : "11pt",
          padding: "6pt 0"
        }}>
          <div style={{ 
            fontWeight: "bold", 
            fontSize: isMobile ? "11pt" : "12pt", 
            marginBottom: "2pt"
          }}>
            {fullName || "Your Name"}
          </div>
          {address && address.split('\n').filter(Boolean).map((line, i) => (
            <div key={`addr-${i}`} style={{ marginBottom: "2pt" }}>{line}</div>
          ))}
          <div style={{ 
            fontSize: "9pt",
            lineHeight: "1.2",
            marginBottom: "4pt"
          }}>
            {email && <div>{email}</div>}
            {phone && <div>{phone}</div>}
            {linkedin && <div>{linkedin}</div>}
          </div>
          <div style={{ 
            fontSize: isMobile ? "10pt" : "11pt", 
            marginTop: "4pt"
          }}>
            {exportDate}
          </div>
        </div>

        {/* JOB REFERENCE */}
        {(jobTitle || jobReference) && (
          <div style={{ 
            textAlign: "center",
            margin: isMobile ? "8pt 0" : "12pt 0",
            fontSize: "10pt"
          }}>
            {jobTitle && (
              <div style={{ 
                fontWeight: "bold", 
                fontSize: "10pt", 
                textTransform: "uppercase"
              }}>
                RE: {jobTitle.toUpperCase()}
              </div>
            )}
            {jobReference && (
              <div style={{ 
                fontSize: "9pt", 
                marginTop: "1pt"
              }}>
                Ref: {jobReference}
              </div>
            )}
          </div>
        )}

        {/* JOB DETAILS */}
        {(jobSummary || jobDescription) && (
          <div style={{
            marginBottom: "12pt",
            fontSize: "10pt",
            fontStyle: "italic",
            padding: "6pt 0",
            borderLeft: "2px solid #666",
            paddingLeft: isMobile ? "8pt" : "12pt"
          }}>
            {jobSummary && (
              <div><strong>Job Summary:</strong> {jobSummary}</div>
            )}
            {jobDescription && (
              <div style={{ marginTop: "6pt" }}>
                <strong>Key Responsibilities:</strong> {jobDescription}
              </div>
            )}
          </div>
        )}

        {/* RECIPIENT INFO */}
        <div style={{ 
          marginBottom: isMobile ? "16pt" : "24pt", 
          maxWidth: "4in",
          fontSize: "10pt",
          paddingLeft: "6pt"
        }}>
          <div style={{ 
            fontWeight: "bold",
            marginBottom: "2pt"
          }}>
            {recipientName}
          </div>
          {recipientTitle && <div style={{ marginBottom: "2pt" }}>{recipientTitle}</div>}
          {companyName && (
            <div style={{ 
              fontWeight: "bold",
              marginBottom: "2pt"
            }}>
              {companyName}
            </div>
          )}
          {companyAddress && companyAddress.split('\n').filter(Boolean).map((line, i) => (
            <div key={`caddr-${i}`} style={{ marginBottom: "2pt", lineHeight: "1.2" }}>
              {line}
            </div>
          ))}
        </div>

        {/* SALUTATION */}
        <div style={{ 
          fontWeight: "bold", 
          fontSize: isMobile ? "11pt" : "12pt", 
          margin: "6pt 0 12pt 0"
        }}>
          Dear {recipientName || "Hiring Manager"},
        </div>

        {/* BODY PARAGRAPHS */}
        <div style={{ 
          textIndent: "0.2in",
          marginBottom: "10pt",
          lineHeight: "1.4",
          fontSize: isMobile ? "11pt" : "12pt"
        }}>
          {openingParagraph || "I'm excited to apply for this position..."}
        </div>
        <div style={{ 
          textIndent: "0.2in",
          marginBottom: "10pt",
          lineHeight: "1.4",
          fontSize: isMobile ? "11pt" : "12pt"
        }}>
          {bodyParagraph1 || "In my previous role..."}
        </div>
        <div style={{ 
          textIndent: "0.2in",
          marginBottom: "10pt",
          lineHeight: "1.4",
          fontSize: isMobile ? "11pt" : "12pt"
        }}>
          {bodyParagraph2 || "My technical skills include..."}
        </div>
        <div style={{ 
          textIndent: "0.2in",
          marginBottom: "24pt",
          lineHeight: "1.4",
          fontSize: isMobile ? "11pt" : "12pt"
        }}>
          {closingParagraph || "I'm particularly drawn to your company..."}
        </div>

        {/* SIGNATURE */}
        <div style={{ 
          marginTop: "24pt", 
          textAlign: "right"
        }}>
          <div style={{ 
            marginBottom: "6pt", 
            fontSize: "11pt",
            fontStyle: "italic"
          }}>
            {customSalutation || salutation}
          </div>
          <div style={{ 
            fontWeight: "bold", 
            fontSize: "11pt"
          }}>
            {fullName || "Your Name"}
          </div>
        </div>
      </div>
    );
  };

  const inner = (
    <>
      <Toolbar />
      <div style={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "column", 
        overflow: "hidden",
        height: "100%",
      }}>
        <div
          style={{
            flex: 1,
            position: "relative",
            background: "#f8fafc",
            padding: isMobile ? "4px 0" : "12px 0",
            overflow: "hidden",
          }}
        >
          {isPreviewVisible && (
            <div style={{ 
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: isMobile ? "4px" : "8px",
            }}>
              <div style={{ 
                transform: `scale(${effectiveZoom})`,
                transformOrigin: "top center",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center"
              }}>
                <CoverContent />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );

  if (isMaximized) {
    return ReactDOM.createPortal(
      <div
        ref={rootRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999999,
          display: "flex",
          flexDirection: "column",
          background: "#f8fafc",
        }}
        onClick={(e) => e.target === rootRef.current && setIsMaximized(false)}
      >
        {inner}
      </div>,
      document.body
    );
  }

  return (
    <div
      ref={rootRef}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "#f8fafc",
      }}
    >
      {inner}
    </div>
  );
};

export default CoverLetterPreview;
