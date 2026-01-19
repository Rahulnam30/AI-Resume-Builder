import AISuggestions from '../AISuggestions';

const PersonalInfoForm = ({ formData, onInputChange, onUseSummary }) => {
  return (
    <div className="form-section">
      <h3 className="form-section-title">Personal Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>Full Name *</label>
          <input 
            type="text" 
            placeholder="John Doe" 
            value={formData?.fullName || ''} 
            onChange={(e) => onInputChange('fullName', e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Email *</label>
          <input 
            type="email" 
            placeholder="john.doe@example.com" 
            value={formData?.email || ''} 
            onChange={(e) => onInputChange('email', e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input 
            type="tel" 
            placeholder="+1 (555) 123-4567" 
            value={formData?.phone || ''} 
            onChange={(e) => onInputChange('phone', e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input 
            type="text" 
            placeholder="San Francisco, CA" 
            value={formData?.location || ''} 
            onChange={(e) => onInputChange('location', e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>LinkedIn</label>
          <input 
            type="text" 
            placeholder="linkedin.com/in/johndoe" 
            value={formData?.linkedin || ''} 
            onChange={(e) => onInputChange('linkedin', e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Website/Portfolio</label>
          <input 
            type="text" 
            placeholder="johndoe.com" 
            value={formData?.website || ''} 
            onChange={(e) => onInputChange('website', e.target.value)} 
          />
        </div>
      </div>
      <div className="form-group full-width">
        <label>Professional Summary</label>
        <textarea 
          placeholder="Brief professional summary highlighting your key skills and experience..." 
          value={formData?.summary || ''} 
          onChange={(e) => onInputChange('summary', e.target.value)} 
          rows={3} 
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;