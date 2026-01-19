import { Trash2 } from 'lucide-react';

const ProjectsForm = ({ formData, setFormData }) => {
  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [
        ...(prev?.projects ?? []),
        {
          id: Date.now(),
          name: '',
          description: '',
          technologies: '',
          link: ''
        }
      ]
    }));
  };

  const removeProject = (id) => {
    setFormData(prev => ({
      ...prev,
      projects: (prev?.projects ?? []).filter(p => p.id !== id)
    }));
  };

  return (
    <div className="form-section">
      <h3 className="form-section-title">Projects</h3>
      {(formData?.projects ?? []).map((project, index) => (
        <div key={project.id} className="entry-card">
          <div className="entry-header">
            <span>Project {index + 1}</span>
            {formData.projects.length > 1 && (
              <button 
                className="remove-entry-btn" 
                onClick={() => removeProject(project.id)}
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Project Name *</label>
              <input
                type="text"
                placeholder="E-commerce Platform"
                value={project.name || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  const updated = (formData?.projects ?? []).map(item => item.id === project.id ? { ...item, name: val } : item);
                  setFormData(prev => ({ ...prev, projects: updated }));
                }}
              />
            </div>
            <div className="form-group">
              <label>Technologies Used</label>
              <input
                type="text"
                placeholder="React, Node.js, MongoDB"
                value={project.technologies || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  const updated = (formData?.projects ?? []).map(item => item.id === project.id ? { ...item, technologies: val } : item);
                  setFormData(prev => ({ ...prev, projects: updated }));
                }}
              />
            </div>
          </div>
          <div className="form-group full-width">
            <label>Description</label>
            <textarea
              placeholder="Describe the project and your contributions..."
              rows={3}
              value={project.description || ''}
              onChange={(e) => {
                const val = e.target.value;
                const updated = (formData?.projects ?? []).map(item => item.id === project.id ? { ...item, description: val } : item);
                setFormData(prev => ({ ...prev, projects: updated }));
              }}
            />
          </div>
          <div className="form-group full-width">
            <label>Project Link (Optional)</label>
            <input
              type="text"
              placeholder="https://github.com/username/project"
              value={project.link || ''}
              onChange={(e) => {
                const val = e.target.value;
                const updated = (formData?.projects ?? []).map(item => item.id === project.id ? { ...item, link: val } : item);
                setFormData(prev => ({ ...prev, projects: updated }));
              }}
            />
          </div>
          <div className="form-group full-width">
            <label>Project Link (Optional)</label>
            <input type="text" placeholder="https://github.com/username/project" />
          </div>
        </div>
      ))}
      <button className="add-entry-btn" onClick={addProject}>
        + Add Project
      </button>
    </div>
  );
};

export default ProjectsForm;