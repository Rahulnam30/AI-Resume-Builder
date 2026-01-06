import { Trash2 } from 'lucide-react';

const CertificationsForm = ({ formData, setFormData }) => {
  const addCertification = () => {
    setFormData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { 
        id: Date.now(), 
        name: '', 
        issuer: '', 
        date: '', 
        link: '' 
      }]
    }));
  };

  const removeCertification = (id) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c.id !== id)
    }));
  };

  return (
    <div className="form-section">
      <h3 className="form-section-title">Certifications</h3>
      {formData.certifications.map((cert, index) => (
        <div key={cert.id} className="entry-card">
          <div className="entry-header">
            <span>Certification {index + 1}</span>
            {formData.certifications.length > 1 && (
              <button 
                className="remove-entry-btn" 
                onClick={() => removeCertification(cert.id)}
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Certification Name *</label>
              <input type="text" placeholder="AWS Solutions Architect" />
            </div>
            <div className="form-group">
              <label>Issuing Organization</label>
              <input type="text" placeholder="Amazon Web Services" />
            </div>
            <div className="form-group">
              <label>Date Obtained</label>
              <input type="month" />
            </div>
            <div className="form-group">
              <label>Credential Link (Optional)</label>
              <input type="text" placeholder="https://credential.url" />
            </div>
          </div>
        </div>
      ))}
      <button className="add-entry-btn" onClick={addCertification}>
        + Add Certification
      </button>
    </div>
  );
};

export default CertificationsForm;