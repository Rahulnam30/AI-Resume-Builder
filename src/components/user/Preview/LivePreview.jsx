import { FileText } from 'lucide-react';
import './LivePreview.css';

const LivePreview = ({ formData, currentTemplate }) => {
  return (
    <div className="live-preview">
      <div className="preview-header">
        <h3>Live Preview</h3>
        <div className="preview-template-info">
          <span className="current-template" style={{ color: currentTemplate?.color }}>
            <FileText size={14} /> {currentTemplate?.name}
          </span>
          {formData.fullName && <span className="complete-badge">✓ Complete</span>}
        </div>
      </div>
      <div className="preview-document" style={{ borderTopColor: currentTemplate?.color }}>
        <div className="preview-name" style={{ color: currentTemplate?.color }}>
          {formData.fullName || 'Your Name'}
        </div>
        {(formData.email || formData.phone || formData.location) && (
          <div className="preview-contact">
            {formData.email && <span>📧 {formData.email}</span>}
            {formData.phone && <span>📱 {formData.phone}</span>}
            {formData.location && <span>📍 {formData.location}</span>}
          </div>
        )}
        {formData.summary && (
          <div className="preview-section">
            <div className="preview-section-title" style={{ borderBottomColor: currentTemplate?.color }}>
              PROFESSIONAL SUMMARY
            </div>
            <p>{formData.summary}</p>
          </div>
        )}
        {formData.skills.technical.length > 0 && (
          <div className="preview-section">
            <div className="preview-section-title" style={{ borderBottomColor: currentTemplate?.color }}>
              SKILLS
            </div>
            <div className="preview-skills">
              <div className="preview-skill-category">
                <span className="skill-label">Technical Skills</span>
                <div className="skill-bars">
                  {formData.skills.technical.slice(0, 6).map((skill, idx) => (
                    <div key={idx} className="skill-bar-item">
                      <span>{skill}</span>
                      <div className="skill-bar">
                        <div 
                          className="skill-fill" 
                          style={{ 
                            width: `${85 - idx * 5}%`, 
                            backgroundColor: currentTemplate?.color 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {formData.skills.soft.length > 0 && (
                <div className="preview-skill-category">
                  <span className="skill-label">Soft Skills</span>
                  <div className="skill-bars">
                    {formData.skills.soft.slice(0, 4).map((skill, idx) => (
                      <div key={idx} className="skill-bar-item">
                        <span>{skill}</span>
                        <div className="skill-bar">
                          <div 
                            className="skill-fill" 
                            style={{ 
                              width: `${90 - idx * 5}%`, 
                              backgroundColor: currentTemplate?.color 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePreview;