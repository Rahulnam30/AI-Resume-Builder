import { Eye, Download, Maximize2 } from 'lucide-react';

const CoverLetterPreview = ({ formData, selectedTemplate }) => {
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

  return (
    <div className="cover-letter-preview">
      <div className="preview-header">
        <h3><Eye size={18} /> Live Preview</h3>
        <div className="preview-actions">
          <button className="preview-action-btn" title="Full Screen">
            <Maximize2 size={16} />
          </button>
          <button className="preview-action-btn" title="Download">
            <Download size={16} />
          </button>
        </div>
      </div>

      <div className={`preview-document template-${selectedTemplate}`}>
        <div className="letter-content">
          {/* Sender Info */}
          <div className="sender-info">
            <p className="sender-name">{formData.fullName || 'Your Name'}</p>
            {formData.address && <p>{formData.address}</p>}
            {formData.email && <p>{formData.email}</p>}
            {formData.phone && <p>{formData.phone}</p>}
            {formData.linkedin && <p>{formData.linkedin}</p>}
          </div>

          {/* Date */}
          <p className="letter-date">{formatDate(formData.letterDate)}</p>

          {/* Recipient Info */}
          <div className="recipient-info">
            {formData.recipientName ? (
              <>
                <p>{formData.recipientName}</p>
                {formData.recipientTitle && <p>{formData.recipientTitle}</p>}
              </>
            ) : (
              <p>Hiring Manager</p>
            )}
            {formData.companyName && <p>{formData.companyName}</p>}
            {formData.companyAddress && <p>{formData.companyAddress}</p>}
          </div>

          {/* Greeting */}
          <p className="greeting">
            Dear {formData.recipientName || 'Hiring Manager'},
          </p>

          {/* Body */}
          <div className="letter-body">
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
              <p className="placeholder-text">
                Your cover letter content will appear here as you type...
              </p>
            )}
          </div>

          {/* Closing */}
          <div className="letter-closing">
            <p>{formData.salutation === 'custom' ? formData.customSalutation : formData.salutation},</p>
            <p className="signature">{formData.fullName || 'Your Name'}</p>
          </div>
        </div>
      </div>

      <div className="preview-footer">
        <span className="template-name">Template: {selectedTemplate}</span>
      </div>
    </div>
  );
};

export default CoverLetterPreview;
