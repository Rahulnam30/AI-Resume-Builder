import React from 'react';

const SenderInfoForm = ({ formData, onInputChange }) => {
    return (
        <div className="form-section">
            <h3 className="form-section-title">Your Personal Details</h3>
            <p className="form-description">
                Enter your contact information as you want it to appear on the cover letter.
            </p>

            <div className="form-grid">
                <div className="form-group full-width">
                    <label>Full Name</label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => onInputChange('fullName', e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        placeholder="john.doe@example.com"
                        value={formData.email}
                        onChange={(e) => onInputChange('email', e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        type="tel"
                        placeholder="(123) 456-7890"
                        value={formData.phone}
                        onChange={(e) => onInputChange('phone', e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>LinkedIn Profile (Optional)</label>
                    <input
                        type="text"
                        placeholder="linkedin.com/in/johndoe"
                        value={formData.linkedin}
                        onChange={(e) => onInputChange('linkedin', e.target.value)}
                    />
                </div>

                <div className="form-group full-width">
                    <label>Address (City, State)</label>
                    <input
                        type="text"
                        placeholder="New York, NY"
                        value={formData.address}
                        onChange={(e) => onInputChange('address', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default SenderInfoForm;
