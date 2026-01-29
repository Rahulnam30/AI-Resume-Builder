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
      {formData.experience.map((exp, index) => (
        <div key={exp.id} className="entry-card">
          <div className="entry-header">
            <span className="">Experience {index + 1}</span>
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
              <input
                type="text"
                placeholder="Software Engineer"
                value={exp.title}
                onChange={(e) => {
                  const newExp = [...formData.experience];
                  newExp[index].title = e.target.value;
                  setFormData({ ...formData, experience: newExp });
                }}
              />
            </div>
            <div className="form-group">
              <label>Company *</label>
              <input
                type="text"
                placeholder="Tech Company Inc."
                value={exp.company}
                onChange={(e) => {
                  const newExp = [...formData.experience];
                  newExp[index].company = e.target.value;
                  setFormData({ ...formData, experience: newExp });
                }}
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                placeholder="City, Country"
                value={exp.location}
                onChange={(e) => {
                  const newExp = [...formData.experience];
                  newExp[index].location = e.target.value;
                  setFormData({ ...formData, experience: newExp });
                }}
              />
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="text"
                placeholder="MM/YYYY"
                value={exp.startDate}
                onChange={(e) => {
                  const newExp = [...formData.experience];
                  newExp[index].startDate = e.target.value;
                  setFormData({ ...formData, experience: newExp });
                }}
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="text"
                placeholder="Present or MM/YYYY"
                value={exp.endDate}
                onChange={(e) => {
                  const newExp = [...formData.experience];
                  newExp[index].endDate = e.target.value;
                  setFormData({ ...formData, experience: newExp });
                }}
              />
            </div>
          </div>
          <div className="form-group full-width mt-4">
            <label>Description</label>
            <textarea
              placeholder="Describe your responsibilities and achievements..."
              rows={3}
              value={exp.description}
              onChange={(e) => {
                const newExp = [...formData.experience];
                newExp[index].description = e.target.value;
                setFormData({ ...formData, experience: newExp });
              }}
            />
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