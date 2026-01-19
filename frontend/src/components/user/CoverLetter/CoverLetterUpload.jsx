import { useState } from 'react';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';

const CoverLetterUpload = ({ onUpload, onBack }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (validTypes.includes(file.type)) {
      setFile(file);
    } else {
      alert('Please upload a PDF, DOC, or DOCX file');
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    // Simulate upload processing
    setTimeout(() => {
      setUploading(false);
      onUpload(file);
    }, 1500);
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div className="cover-letter-upload">
      <div 
        className={`upload-zone ${dragActive ? 'drag-active' : ''} ${file ? 'has-file' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {!file ? (
          <>
            <Upload size={48} className="upload-icon" />
            <h3>Drag & Drop your cover letter here</h3>
            <p>or</p>
            <label className="upload-btn">
              Browse Files
              <input 
                type="file" 
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                hidden
              />
            </label>
            <span className="file-types">Supported formats: PDF, DOC, DOCX</span>
          </>
        ) : (
          <div className="file-preview">
            <FileText size={40} className="file-icon" />
            <div className="file-info">
              <span className="file-name">{file.name}</span>
              <span className="file-size">{(file.size / 1024).toFixed(1)} KB</span>
            </div>
            <button className="remove-file" onClick={removeFile}>
              <X size={20} />
            </button>
          </div>
        )}
      </div>

      {file && (
        <div className="upload-actions">
          <button className="cancel-btn" onClick={onBack}>
            Cancel
          </button>
          <button 
            className="process-btn" 
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? (
              <>Processing...</>
            ) : (
              <>
                <CheckCircle size={18} />
                Process & Continue
              </>
            )}
          </button>
        </div>
      )}

      <div className="upload-tips">
        <h4>📌 Tips for best results:</h4>
        <ul>
          <li>Upload a clear, readable document</li>
          <li>Make sure text is selectable (not scanned images)</li>
          <li>Remove any sensitive information you don't want analyzed</li>
        </ul>
      </div>
    </div>
  );
};

export default CoverLetterUpload;
