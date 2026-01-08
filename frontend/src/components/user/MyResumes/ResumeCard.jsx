const ResumeCard = ({ resume }) => {
  return (
    <div className="resume-card-item">
      <div className="resume-preview-thumb">📄</div>
      <div className="resume-details">
        <h4>{resume.name}</h4>
        <div className="resume-meta">
          <span>📅 {resume.date}</span>
          <span>📦 {resume.size}</span>
          <span className="ats-score-tag">ATS: {resume.atsScore}%</span>
        </div>
      </div>
      <div className="resume-actions-btns">
        <button className="action-icon-btn" title="Edit">✏️</button>
        <button className="action-icon-btn" title="Download">📥</button>
        <button className="action-icon-btn" title="Duplicate">📋</button>
        <button className="action-icon-btn delete" title="Delete">🗑️</button>
      </div>
    </div>
  );
};

export default ResumeCard;
