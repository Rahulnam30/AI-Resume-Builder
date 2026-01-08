import { FileText, Palette, Download, Share2 } from 'lucide-react';
import ResumeDocument from './ResumeDocument';
import './LivePreview';
import './LivePreview.css';

const FullPreview = ({ formData, currentTemplate, setActiveTab }) => {
  return (
    <div className="full-preview-section">
      <div className="preview-toolbar">
        <div className="toolbar-left">
          <span className="template-name-display" style={{ color: currentTemplate?.color }}>
            <FileText size={16} /> {currentTemplate?.name}
          </span>
          <span className="ats-badge">ATS Score: {currentTemplate?.atsScore}%</span>
        </div>
        <div className="toolbar-right">
          <button className="toolbar-btn" onClick={() => setActiveTab('templates')}>
            <Palette size={16} /> Change Template
          </button>
          <button className="toolbar-btn primary">
            <Download size={16} /> Download PDF
          </button>
          <button className="toolbar-btn">
            <Share2 size={16} /> Share
          </button>
        </div>
      </div>
      
      <div className="full-preview-container">
        <ResumeDocument formData={formData} currentTemplate={currentTemplate} />
      </div>
    </div>
  );
};

export default FullPreview;