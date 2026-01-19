import { useEffect, useRef } from 'react';
import { FileText, Palette, Download, Share2, X } from 'lucide-react';
import ResumeDocument from './ResumeDocument';
import './LivePreview.css';

const FullPreview = ({ formData, currentTemplate, setActiveTab }) => {
  const containerRef = useRef(null);

  /* ---------- ESC KEY CLOSE ---------- */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setActiveTab('builder');
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setActiveTab]);

  /* ---------- AUTO FIT RESUME TO SCREEN ---------- */
  useEffect(() => {
    const fitResume = () => {
      if (!containerRef.current) return;

      const containerHeight = containerRef.current.clientHeight;
      const containerWidth = containerRef.current.clientWidth;

      const resumeHeight = 1123; // A4 height
      const resumeWidth = 794;   // A4 width

      const scaleY = containerHeight / resumeHeight;
      const scaleX = containerWidth / resumeWidth;

      const scale = Math.min(scaleX, scaleY, 1);

      containerRef.current.style.setProperty('--resume-scale', scale);
    };

    fitResume();
    window.addEventListener('resize', fitResume);
    return () => window.removeEventListener('resize', fitResume);
  }, []);

  return (
    <div className="fullscreen-overlay">
      <div className="full-preview-section">
        {/* ---------- TOOLBAR ---------- */}
        <div className="preview-toolbar">
          <div className="toolbar-left">
            <span
              className="template-name-display"
              style={{ color: currentTemplate?.color }}
            >
              <FileText size={16} /> {currentTemplate?.name || 'Template'}
            </span>

            {currentTemplate?.atsScore && (
              <span className="ats-badge">
                ATS Score: {currentTemplate.atsScore}%
              </span>
            )}
          </div>

          <div className="toolbar-right">
            <button
              className="toolbar-btn"
              onClick={() => setActiveTab('templates')}
            >
              <Palette size={16} /> Change Template
            </button>

            <button className="toolbar-btn primary">
              <Download size={16} /> Download PDF
            </button>

            <button className="toolbar-btn">
              <Share2 size={16} /> Share
            </button>

            <button
              className="toolbar-btn close-btn"
              onClick={() => setActiveTab('builder')}
              title="Close preview"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ---------- RESUME PREVIEW ---------- */}
        <div className="full-preview-container" ref={containerRef}>
          <div className="resume-scale-wrapper">
            <ResumeDocument
              formData={formData}
              currentTemplate={currentTemplate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPreview;
