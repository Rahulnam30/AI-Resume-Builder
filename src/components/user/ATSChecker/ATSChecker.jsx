import ATSUpload from './ATSUpload';
import JobDescriptionInput from './JobDescriptionInput';
import ATSTips from './ATSTips';
import './ATSChecker.css';

const ATSChecker = () => {
  return (
    <div className="ats-checker-page">
      <div className="page-header">
        <h1>✅ ATS Score Checker</h1>
        <p>Check how well your resume performs with Applicant Tracking Systems</p>
      </div>

      <div className="ats-upload-section">
        <ATSUpload />
        <JobDescriptionInput />
      </div>

      <ATSTips />
    </div>
  );
};

export default ATSChecker;