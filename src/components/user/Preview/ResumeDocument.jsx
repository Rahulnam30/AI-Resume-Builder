const ResumeDocument = ({ formData, currentTemplate }) => {
  return (
    <div className="resume-paper" style={{ borderTopColor: currentTemplate?.color }}>
      {/* Header */}
      <div className="resume-header" style={{ borderBottomColor: currentTemplate?.color }}>
        <h1 style={{ color: currentTemplate?.color }}>{formData.fullName || 'Your Name'}</h1>
        <div className="resume-contact-row">
          {formData.email && <span>📧 {formData.email}</span>}
          {formData.phone && <span>📱 {formData.phone}</span>}
          {formData.location && <span>📍 {formData.location}</span>}
          {formData.linkedin && <span>🔗 {formData.linkedin}</span>}
          {formData.website && <span>🌐 {formData.website}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      {formData.summary && (
        <div className="resume-section-block">
          <h2 style={{ color: currentTemplate?.color }}>Professional Summary</h2>
          <p>{formData.summary}</p>
        </div>
      )}

      {/* Experience */}
      <div className="resume-section-block">
        <h2 style={{ color: currentTemplate?.color }}>Work Experience</h2>
        {formData.experience.map((exp, idx) => (
          <div key={idx} className="resume-entry">
            <div className="entry-title-row">
              <strong>{exp.title || 'Job Title'}</strong>
              <span>{exp.startDate || 'Start'} - {exp.endDate || 'Present'}</span>
            </div>
            <div className="entry-subtitle">{exp.company || 'Company Name'}</div>
            <p>{exp.description || 'Job description and achievements...'}</p>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="resume-section-block">
        <h2 style={{ color: currentTemplate?.color }}>Education</h2>
        {formData.education.map((edu, idx) => (
          <div key={idx} className="resume-entry">
            <div className="entry-title-row">
              <strong>{edu.degree || 'Degree'}</strong>
              <span>{edu.graduationDate || 'Graduation Date'}</span>
            </div>
            <div className="entry-subtitle">{edu.school || 'School Name'}</div>
            {edu.gpa && <p>GPA: {edu.gpa}</p>}
          </div>
        ))}
      </div>

      {/* Skills */}
      {(formData.skills.technical.length > 0 || formData.skills.soft.length > 0) && (
        <div className="resume-section-block">
          <h2 style={{ color: currentTemplate?.color }}>Skills</h2>
          <div className="resume-skills-grid">
            {formData.skills.technical.length > 0 && (
              <div className="skills-column">
                <h4>Technical Skills</h4>
                <div className="skills-tags">
                  {formData.skills.technical.map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="resume-skill-tag" 
                      style={{ borderColor: currentTemplate?.color }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {formData.skills.soft.length > 0 && (
              <div className="skills-column">
                <h4>Soft Skills</h4>
                <div className="skills-tags">
                  {formData.skills.soft.map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="resume-skill-tag" 
                      style={{ borderColor: currentTemplate?.color }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Projects */}
      {formData.projects.some(p => p.name) && (
        <div className="resume-section-block">
          <h2 style={{ color: currentTemplate?.color }}>Projects</h2>
          {formData.projects.filter(p => p.name).map((project, idx) => (
            <div key={idx} className="resume-entry">
              <div className="entry-title-row">
                <strong>{project.name}</strong>
                {project.link && (
                  <a href={project.link} style={{ color: currentTemplate?.color }}>
                    🔗 View
                  </a>
                )}
              </div>
              <div className="entry-subtitle">{project.technologies}</div>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {formData.certifications.some(c => c.name) && (
        <div className="resume-section-block">
          <h2 style={{ color: currentTemplate?.color }}>Certifications</h2>
          {formData.certifications.filter(c => c.name).map((cert, idx) => (
            <div key={idx} className="resume-entry">
              <div className="entry-title-row">
                <strong>{cert.name}</strong>
                <span>{cert.date}</span>
              </div>
              <div className="entry-subtitle">{cert.issuer}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeDocument;