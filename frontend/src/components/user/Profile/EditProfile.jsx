import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Save,
  X,
  Link as LinkIcon,
  Lock,
} from "lucide-react";
import "./EditProfile.css";
import logo from "../../../assets/UptoSkills.webp";

const EditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    username: "johndoe",
    bio: "Building AI resumes with UptoSkills.",
    github: "github.com/johndoe",
    linkedin: "linkedin.com/in/johndoe",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saving profile:", formData);
  };

  return (
    <div className="edit-profile-page">

      {/* 🔷 LOGO BAR */}
      <div className="profile-logo-bar">
        <div className="profile-logo-inner">
          <img
            src={logo}
            alt="UpToSkills Logo"
            className="profile-logo"
            onClick={() => navigate("/user/dashboard")}
          />
        </div>
      </div>

      {/* 🔷 PAGE CONTENT */}
      <div className="profile-page-content">
        <div className="profile-container">

          {/* LEFT CARD */}
          <div className="profile-sidebar-card">
            <div className="profile-header-section">
              <div className="avatar-frame">
                {formData.fullName
                  .split(" ")
                  .map((n, i) => (i < 2 ? n[0].toUpperCase() : ""))
                  .join("")}
              </div>
            </div>

            <h2 className="profile-name">{formData.fullName}</h2>
            <p className="profile-bio">{formData.bio}</p>

            <div className="member-info">
              <User size={14} />
              <span>Member since 2024</span>
            </div>

            <div className="profile-divider" />

            <div className="profile-actions">
              <button
                className="action-button"
                onClick={() => navigate("/user/security")}
              >
                <Lock size={18} />
                Change Password
              </button>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="profile-main-card">
            <div className="card-header">
              <h2>Edit Profile</h2>
              <p>Update your personal information</p>
            </div>

            <div className="card-content">
              <div className="form-section">
                <h3>Basic Information</h3>

                <div className="field-row">
                  <div className="field-group full-width">
                    <label>Profile URL</label>
                    <div className="url-input">
                      <span>uptoskills.com/</span>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="field-row">
                  <div className="field-group">
                    <label><User size={16} /> Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="field-group">
                    <label><Mail size={16} /> Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="field-row">
                  <div className="field-group">
                    <label><Phone size={16} /> Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="field-group">
                    <label><MapPin size={16} /> Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <div className="field-row">
                  <div className="field-group">
                    <label><LinkIcon size={16} /> GitHub</label>
                    <input
                      type="text"
                      name="github"
                      value={formData.github}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="field-group">
                    <label><LinkIcon size={16} /> LinkedIn</label>
                    <input
                      type="text"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button className="btn-cancel">
                  <X size={18} /> Cancel
                </button>

                <button className="btn-save" onClick={handleSave}>
                  <Save size={18} /> Save Changes
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditProfile;