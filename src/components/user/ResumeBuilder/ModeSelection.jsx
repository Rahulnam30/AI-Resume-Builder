const ModeSelection = ({ onSelectMode }) => {
  return (
    <div className="resume-mode-selection">
      <h2>What would you like to do?</h2>
      <div className="mode-cards">
        <div className="mode-card" onClick={() => onSelectMode('create')}>
          <div className="mode-icon">✨</div>
          <h3>Create New Resume</h3>
          <p>Start fresh and build a professional resume from scratch with AI assistance</p>
          <ul className="mode-features">
            <li>📝 Step-by-step guided builder</li>
            <li>🤖 AI-powered content suggestions</li>
            <li>📄 Professional templates</li>
            <li>✅ ATS optimization</li>
          </ul>
          <button className="mode-btn create">Get Started →</button>
        </div>
        
        <div className="mode-card" onClick={() => onSelectMode('edit')}>
          <div className="mode-icon">📤</div>
          <h3>Edit Existing Resume</h3>
          <p>Upload your existing resume and enhance it with AI-powered improvements</p>
          <ul className="mode-features">
            <li>📎 Upload PDF, DOC, or DOCX</li>
            <li>🔍 AI content analysis</li>
            <li>💡 Improvement suggestions</li>
            <li>📊 ATS score check</li>
          </ul>
          <button className="mode-btn edit">Upload Resume →</button>
        </div>
      </div>
    </div>
  );
};

export default ModeSelection;