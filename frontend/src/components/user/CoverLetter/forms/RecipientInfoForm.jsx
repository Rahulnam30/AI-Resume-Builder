const RecipientInfoForm = ({ formData, onInputChange }) => {
  return (
    <div className="form-section">
      <h3 className="form-section-title">Recipient Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>Hiring Manager's Name</label>
          <input
            type="text"
            placeholder="Jane Smith"
            value={formData.recipientName}
            onChange={(e) => onInputChange('recipientName', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Hiring Manager's Title</label>
          <input
            type="text"
            placeholder="HR Director"
            value={formData.recipientTitle}
            onChange={(e) => onInputChange('recipientTitle', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            placeholder="Acme Corporation"
            value={formData.companyName}
            onChange={(e) => onInputChange('companyName', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Company Address</label>
          <input
            type="text"
            placeholder="456 Business Ave, City, State ZIP"
            value={formData.companyAddress}
            onChange={(e) => onInputChange('companyAddress', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default RecipientInfoForm;
