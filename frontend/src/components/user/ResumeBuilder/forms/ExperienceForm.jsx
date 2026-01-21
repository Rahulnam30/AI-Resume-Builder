import { Trash2 } from "lucide-react";

const ExperienceForm = ({ formData, setFormData }) => {
  const addExperience = () => {
    console.log(formData);
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...(prev?.experience ?? []),
        {
          id: Date.now(),
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  const removeExperience = (id) => {
    setFormData((prev) => ({
      ...prev,
      experience: (prev?.experience ?? []).filter((e) => e.id !== id),
    }));
  };

  const updateExperience = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      ),
    }));
  };

  return (
    <div className="form-section">
      <h3 className="form-section-title">Work Experience</h3>
      {(formData?.experience ?? []).map((exp, index) => (
        <div key={exp.id} className="entry-card">
          <div className="entry-header flex items-center gap-2 mb-2">
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
          <div className="pr-0.5">
            <div className="form-group">
              <label>Job Title *</label>
              <input
                type="text"
                placeholder="Software Engineer"
                value={exp.title || ""}
                onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Company *</label>
              <input
                type="text"
                placeholder="Tech Company Inc."
                value={exp.company || ""}
                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="month"
                value={exp.startDate || ""}
                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="text"
                placeholder="Present or YYYY-MM"
                value={exp.endDate || ""}
                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}

              />
            </div>
          </div>
          <div className="form-group full-width">
            <label>Description</label>
            <textarea
              placeholder="Describe your responsibilities and achievements..."
              rows={3}
              value={exp.description || ""}
              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}

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
