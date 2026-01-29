const JobDetailsForm = ({ formData, onInputChange }) => {
  const whereFoundOptions = [
    'Company Website',
    'LinkedIn',
    'Indeed',
    'Glassdoor',
    'Referral',
    'Job Fair',
    'Recruiter',
    'Other'
  ];

  return (
    <div className="form-section">
      <h3 className="form-section-title">Job Details</h3>
      <p className="form-description">
        Provide details about the position you're applying for. This helps AI generate more targeted content.
      </p>
      
      <div className="form-grid">
        <div className="form-group">
          <label>Job Title *</label>
          <input
            type="text"
            placeholder="Software Engineer"
            value={formData.jobTitle}
            onChange={(e) => onInputChange('jobTitle', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Job Reference Number</label>
          <input
            type="text"
            placeholder="REF-12345"
            value={formData.jobReference}
            onChange={(e) => onInputChange('jobReference', e.target.value)}
          />
          <small className="form-hint">If provided in the job listing</small>
        </div>
        <div className="form-group">
          <label>Where did you find this job?</label>
          <select
            value={formData.whereFound}
            onChange={(e) => onInputChange('whereFound', e.target.value)}
          >
            <option value="">Select an option</option>
            {whereFoundOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group full-width" style={{ marginTop: '24px' }}>
        <label>Job Description (Paste here for AI analysis)</label>
        <textarea
          placeholder="Paste the full job description here. Our AI will analyze it to help you craft a tailored cover letter that highlights relevant skills and experience..."
          value={formData.jobDescription || ''}
          onChange={(e) => onInputChange('jobDescription', e.target.value)}
          rows={8}
        />
        <small className="form-hint">
          💡 Tip: Include requirements, responsibilities, and qualifications for best AI suggestions
        </small>
      </div>

    </div>
  );
};

export default JobDetailsForm;
