import { Trash2 } from 'lucide-react';

const ExperienceForm = ({ formData, setFormData }) => {
  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { 
        id: Date.now(), 
        title: '', 
        company: '', 
        location: '', 
        startDate: '', 
        endDate: '', 
        description: '' 
      }]
    }));
  };

  const removeExperience = (id) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter(e => e.id !== id)
    }));
  };

  return (
    <div className="form-section">
      <h3 className="form-section-title">Work Experience</h3>
      {formData.experience.map((exp, index) => (
        <div key={exp.id} className="entry-card">
          <div className="entry-header">
            <span>Experience {index + 1}</span>
            {formData.experience.length > 1 && (
              <button 
                className="remove-entry-btn" 
                onClick={() => removeExperience(exp.id)}
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Job Title *</label>
              <input type="text" placeholder="Software Engineer" />
            </div>
            <div className="form-group">
              <label>Company *</label>
              <input type="text" placeholder="Tech Company Inc." />
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input type="month" />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input type="text" placeholder="Present or YYYY-MM" />
            </div>
          </div>
          <div className="form-group full-width">
            <label>Description</label>
            <textarea placeholder="Describe your responsibilities and achievements..." rows={3} />
          </div>
        </div>
      ))}
      <button className="add-entry-btn" onClick={addExperience}>
        + Add Experience
      </button>
    </div>
  );
};

export default ExperienceForm;