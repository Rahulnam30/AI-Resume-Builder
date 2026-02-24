const JobDetailsForm = ({ formData, onInputChange }) => {
  return (
    <div className="form-section">
      <h3 className="form-section-title">Job Details</h3>
      <p className="form-description">
        Enter the details of the position you are applying for.
      </p>

      <div className="form-grid">
        <div className="form-group">
          <label>Job Title *</label>
          <input
            type="text"
            placeholder="e.g. Senior Software Engineer"
            value={formData.jobTitle || ''}
            onChange={(e) => onInputChange('jobTitle', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Company Name *</label>
          <input
            type="text"
            placeholder="e.g. Google"
            value={formData.companyName || ''}
            onChange={(e) => onInputChange('companyName', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Job Reference (Optional)</label>
          <input
            type="text"
            placeholder="e.g. JOB-123456"
            value={formData.jobReference || ''}
            onChange={(e) => onInputChange('jobReference', e.target.value)}
          />
        </div>

        <div className="form-group full-width">
          <label>Company Address (Optional)</label>
          <textarea
            placeholder="123 Tech Lane, Silicon Valley, CA"
            value={formData.companyAddress || ''}
            onChange={(e) => onInputChange('companyAddress', e.target.value)}
            rows={2}
          />
        </div>
      </div>

      <div className="mt-6 border-t pt-4">
        <h3 className="form-section-title text-base">Context for AI (Optional)</h3>
        <p className="form-description text-xs mb-3">
          Provide key skills and experience to help the AI generate better content.
        </p>

        <div className="form-grid">
          <div className="form-group full-width">
            <label>Key Skills</label>
            <textarea
              placeholder="e.g. React, Node.js, Project Management, Team Leadership"
              value={formData.skills || ''}
              onChange={(e) => onInputChange('skills', e.target.value)}
              rows={2}
              className="w-full p-2 border rounded-md text-sm"
            />
          </div>

          <div className="form-group full-width">
            <label>Experience Summary</label>
            <textarea
              placeholder="e.g. 5 years of experience in full-stack development. Led a team of 4 developers."
              value={formData.experience || ''}
              onChange={(e) => onInputChange('experience', e.target.value)}
              rows={3}
              className="w-full p-2 border rounded-md text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsForm;
