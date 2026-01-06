const ATSUpload = () => {
  return (
    <div className="upload-box">
      <div className="upload-icon">📤</div>
      <h3>Upload Your Resume</h3>
      <p>Drag and drop your resume or click to browse</p>
      <input type="file" id="resume-upload" accept=".pdf,.doc,.docx" hidden />
      <label htmlFor="resume-upload" className="upload-btn">Choose File</label>
      <span className="file-types">Supported: PDF, DOC, DOCX</span>
    </div>
  );
};

export default ATSUpload;