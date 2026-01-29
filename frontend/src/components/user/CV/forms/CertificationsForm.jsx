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

  const handleChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.map(c =>
        c.id === id ? { ...c, [field]: value } : c
      )
    }));
  };

  return (
    <div className="form-section">
      {formData.certifications.map((cert, index) => (
        <div key={cert.id} className="entry-card">
          <div className="entry-header">
            <span className=" ">Certification {index + 1}</span>
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
              <input
                type="text"
                placeholder="AWS Solutions Architect"
                value={cert.name}
                onChange={(e) => handleChange(cert.id, 'name', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Issuing Organization</label>
              <input
                type="text"
                placeholder="Amazon Web Services"
                value={cert.issuer}
                onChange={(e) => handleChange(cert.id, 'issuer', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Date Obtained</label>
              <input
                type="month"
                value={cert.date}
                onChange={(e) => handleChange(cert.id, 'date', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Credential Link (Optional)</label>
              <input
                type="text"
                placeholder="https://credential.url"
                value={cert.link}
                onChange={(e) => handleChange(cert.id, 'link', e.target.value)}
              />
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