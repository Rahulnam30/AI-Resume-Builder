import { Trash2 } from 'lucide-react';

const EducationForm = ({ formData, setFormData }) => {
  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [
        ...(prev?.education ?? []),
        {
          id: Date.now(),
          degree: '',
          school: '',
          location: '',
          graduationDate: '',
          gpa: ''
        }
      ]
    }));
  };

  const removeEducation = (id) => {
    setFormData(prev => ({
      ...prev,
      education: (prev?.education ?? []).filter(e => e.id !== id)
    }));
  };

  return (
    <div className="form-section">
      <h3 className="form-section-title">Education</h3>
      {(formData?.education ?? []).map((edu, index) => (
        <div key={edu.id} className="entry-card">
          <div className="entry-header">
            <span>Education {index + 1}</span>
            {formData.education.length > 1 && (
              <button 
                className="remove-entry-btn" 
                onClick={() => removeEducation(edu.id)}
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Degree *</label>
              <input
                type="text"
                placeholder="Bachelor of Science in Computer Science"
                value={edu.degree || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  const updated = (formData?.education ?? []).map(item => item.id === edu.id ? { ...item, degree: val } : item);
                  setFormData(prev => ({ ...prev, education: updated }));
                }}
              />
            </div>
            <div className="form-group">
              <label>School *</label>
              <input
                type="text"
                placeholder="University Name"
                value={edu.school || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  const updated = (formData?.education ?? []).map(item => item.id === edu.id ? { ...item, school: val } : item);
                  setFormData(prev => ({ ...prev, education: updated }));
                }}
              />
            </div>
            <div className="form-group">
              <label>Graduation Date</label>
              <input
                type="month"
                value={edu.graduationDate || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  const updated = (formData?.education ?? []).map(item => item.id === edu.id ? { ...item, graduationDate: val } : item);
                  setFormData(prev => ({ ...prev, education: updated }));
                }}
              />
            </div>
            <div className="form-group">
              <label>GPA (Optional)</label>
              <input
                type="text"
                placeholder="3.8/4.0"
                value={edu.gpa || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  const updated = (formData?.education ?? []).map(item => item.id === edu.id ? { ...item, gpa: val } : item);
                  setFormData(prev => ({ ...prev, education: updated }));
                }}
              />
            </div>
          </div>
        </div>
      ))}
      <button className="add-entry-btn" onClick={addEducation}>
        + Add Education
      </button>
    </div>
  );
};

export default EducationForm;