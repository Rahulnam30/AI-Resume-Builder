const ResumeUpload = ({ onUpload }) => {
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="upload-resume-section">
      <div className="upload-area">
        <div className="upload-dropzone">
          <div className="upload-icon-large">📄</div>
          <h3>Drag & Drop Your Resume Here</h3>
          <p>or click to browse files</p>
          <input 
            type="file" 
            id="resume-file-upload" 
            accept=".pdf,.doc,.docx" 
            hidden 
            onChange={handleFileChange}
          />
          <label htmlFor="resume-file-upload" className="upload-browse-btn">
            Browse Files
          </label>
          <span className="supported-formats">Supported formats: PDF, DOC, DOCX (Max 5MB)</span>
        </div>
        
        <div className="upload-tips">
          <h4>💡 Tips for best results:</h4>
          <ul>
            <li>Use a clean, text-based resume (not scanned images)</li>
            <li>Ensure your resume is not password protected</li>
            <li>PDF format works best for accurate parsing</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;