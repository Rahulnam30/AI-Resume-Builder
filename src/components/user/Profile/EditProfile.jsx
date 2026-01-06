import AvatarUpload from './AvatarUpload';
import DangerZone from './DangerZone';
import './EditProfile.css';

const EditProfile = ({ user }) => {
  return (
    <div className="profile-page">
      <div className="page-header">
        <h1>Edit Profile</h1>
        <p>Manage your account settings</p>
      </div>

      <div className="profile-content">
        <AvatarUpload user={user} />

        <div className="profile-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" defaultValue={user?.name || ''} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" defaultValue={user?.email || ''} />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" placeholder="+1 (555) 123-4567" />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input type="text" placeholder="City, Country" />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Bio</label>
            <textarea placeholder="Tell us about yourself..." rows={3}></textarea>
          </div>

          <div className="profile-actions">
            <button className="save-profile-btn">Save Changes</button>
            <button className="cancel-btn">Cancel</button>
          </div>
        </div>

        <DangerZone />
      </div>
    </div>
  );
};

export default EditProfile;