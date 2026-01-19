const CoverLetterModeSelection = ({ onSelectMode }) => {
  return (
    <div className="cover-letter-mode-selection">
      <h2>What would you like to do?</h2>
      <div className="mode-cards">
        <div className="mode-card" onClick={() => onSelectMode('create')}>
          <div className="mode-icon">✨</div>
          <h3>Create New Cover Letter</h3>
          <p>Start fresh and build a compelling cover letter with AI assistance</p>
          <ul className="mode-features">
            <li>📝 Step-by-step guided builder</li>
            <li>🤖 AI-powered content generation</li>
            <li>🎯 Job-specific customization</li>
            <li>📄 Professional templates</li>
            <li>✅ Keyword optimization</li>
          </ul>
          <button className="mode-btn create">Get Started →</button>
        </div>

        <div className="mode-card" onClick={() => onSelectMode('edit')}>
          <div className="mode-icon">📤</div>
          <h3>Edit Existing Cover Letter</h3>
          <p>Upload your existing cover letter and enhance it with AI improvements</p>
          <ul className="mode-features">
            <li>📎 Upload PDF, DOC, or DOCX</li>
            <li>🔍 AI content analysis</li>
            <li>💡 Improvement suggestions</li>
            <li>✍️ Tone & style refinement</li>
            <li>🎯 Job alignment check</li>
          </ul>
          <button className="mode-btn edit">Upload Cover Letter →</button>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterModeSelection;
