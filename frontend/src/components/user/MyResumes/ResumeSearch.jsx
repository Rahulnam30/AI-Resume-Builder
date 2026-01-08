const ResumeSearch = ({ onNewResume }) => {
  return (
    <div className="resumes-toolbar">
      <div className="search-box">
        <span>🔍</span>
        <input type="text" placeholder="Search resumes..." />
      </div>
      <button className="new-resume-btn" onClick={onNewResume}>
        + New Resume
      </button>
    </div>
  );
};

export default ResumeSearch;
