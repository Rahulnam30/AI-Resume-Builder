import {
  FileText,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';
import { useState } from 'react';
import './LivePreview.css';

const LivePreview = ({
  formData = {},
  currentTemplate,
  isExpanded,
  onExpand,
  onCollapse
}) => {
  const [zoom, setZoom] = useState(1);

  const zoomIn = () => setZoom(z => Math.min(z + 0.1, 2));
  const zoomOut = () => setZoom(z => Math.max(z - 0.1, 0.5));
  const resetZoom = () => setZoom(1);

  const {
    fullName,
    email,
    phone,
    location,
    summary,
    skills = {},
    projects = []
  } = formData;

  const PreviewContent = () => (
    <div
      className="preview-document pdf-page"
      style={{
        borderTopColor: currentTemplate?.color,
        transform: `scale(${zoom})`
      }}
    >
      {/* NAME */}
      <div className="preview-name" style={{ color: currentTemplate?.color }}>
        {fullName || 'Your Name'}
      </div>

      {/* CONTACT */}
      {(email || phone || location) && (
        <div className="preview-contact">
          {email && <span>📧 {email}</span>}
          {phone && <span>📱 {phone}</span>}
          {location && <span>📍 {location}</span>}
        </div>
      )}

      {/* SUMMARY */}
      {summary && (
        <div className="preview-section">
          <div className="preview-section-title">
            PROFESSIONAL SUMMARY
          </div>
          <p>{summary}</p>
        </div>
      )}

      {/* SKILLS */}
      {(skills?.technical?.length || skills?.soft?.length) && (
        <div className="preview-section">
          <div className="preview-section-title">SKILLS</div>
          <p>
            {[...(skills.technical || []), ...(skills.soft || [])].join(', ')}
          </p>
        </div>
      )}

      {/* PROJECTS */}
      {projects.length > 0 && (
        <div className="preview-section">
          <div className="preview-section-title">PROJECTS</div>
          {projects.map((project, index) => (
            <div key={index} className="preview-project">
              <strong>{project.name}</strong>
              <p>{project.description}</p>
              {project.technologies && (
                <small>{project.technologies}</small>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  /* FULLSCREEN MODE */
  if (isExpanded) {
    return (
      <div className="fullscreen-overlay">
        <div className="fullscreen-preview-wrapper">
          <div className="live-preview expanded" aria-expanded="true">

            <div className="preview-header">
              <h3>
                <FileText size={16} /> Live Preview
              </h3>

              <div className="preview-actions">
                <button onClick={zoomOut}><ZoomOut size={16} /></button>
                <span className="zoom-level">{Math.round(zoom * 100)}%</span>
                <button onClick={zoomIn}><ZoomIn size={16} /></button>
                <button onClick={resetZoom}><RotateCcw size={16} /></button>
                <button onClick={onCollapse}><Minimize2 size={16} /></button>
              </div>
            </div>

            <div className="preview-document-wrapper pdf-scroll">
              <PreviewContent />
            </div>

          </div>
        </div>
      </div>
    );
  }

  /* NORMAL MODE */
  return (
    <div className="live-preview" aria-expanded="false">
      <div className="preview-header">
        <h3>
          <FileText size={16} /> Live Preview
        </h3>
        <div className="preview-actions">
          <button onClick={onExpand}>
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      <div className="preview-document-wrapper">
        <PreviewContent />
      </div>
    </div>
  );
};

export default LivePreview;
