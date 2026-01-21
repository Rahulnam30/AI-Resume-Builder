import { Trash2 } from 'lucide-react';

const CertificationsForm = ({ formData, setFormData }) => {
  const addCertification = () => {
    setFormData(prev => ({
      ...prev,
      certifications: [
        ...(prev?.certifications ?? []),
        {
          id: Date.now(),
          name: '',
          issuer: '',
          date: '',
          link: ''
        }
      ]
    }));
  };

  const removeCertification = (id) => {
    setFormData(prev => ({
      ...prev,
      certifications: (prev?.certifications ?? []).filter(c => c.id !== id)
    }));
  };

  return (
    <div className="form-section">
      {(formData?.certifications ?? []).map((cert, index) => (
        <div key={cert.id} className="entry-card mt-5">
          <div className="entry-header">
            <span className='mr-2'>Certification {index + 1}</span>
            {formData.certifications.length > 1 && (
              <button 
                className="remove-entry-btn" 
                onClick={() => removeCertification(cert.id)}
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
          <div className="mt-4">
            <div className="form-group">
              <label>Certification Name *</label>
              <input
                type="text"
                placeholder="AWS Solutions Architect"
                value={cert.name || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  const updated = (formData?.certifications ?? []).map(item => item.id === cert.id ? { ...item, name: val } : item);
                  setFormData(prev => ({ ...prev, certifications: updated }));
                }}
              />
            </div>
            <div className="form-group">
              <label>Issuing Organization</label>
              <input
                type="text"
                placeholder="Amazon Web Services"
                value={cert.issuer || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  const updated = (formData?.certifications ?? []).map(item => item.id === cert.id ? { ...item, issuer: val } : item);
                  setFormData(prev => ({ ...prev, certifications: updated }));
                }}
              />
            </div>
            <div className="form-group">
              <label>Date Obtained</label>
              <input
                type="month"
                value={cert.date || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  const updated = (formData?.certifications ?? []).map(item => item.id === cert.id ? { ...item, date: val } : item);
                  setFormData(prev => ({ ...prev, certifications: updated }));
                }}
              />
            </div>
            <div className="form-group">
              <label>Credential Link (Optional)</label>
              <input
                type="text"
                placeholder="https://credential.url"
                value={cert.link || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  const updated = (formData?.certifications ?? []).map(item => item.id === cert.id ? { ...item, link: val } : item);
                  setFormData(prev => ({ ...prev, certifications: updated }));
                }}
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