const AvatarUpload = ({ user }) => {
  return (
    <div className="profile-avatar-section">
      <div className="avatar-large">{user?.name?.charAt(0) || 'U'}</div>
      <button className="change-avatar-btn">📷 Change Photo</button>
    </div>
  );
};

export default AvatarUpload;