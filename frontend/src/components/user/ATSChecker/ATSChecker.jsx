import ATSUpload from "./ATSUpload";
import JobDescriptionInput from "./JobDescriptionInput";
import ATSTips from "./ATSTips";
import "./ATSChecker.css";
import UserNavBar from "../UserNavBar/UserNavBar"; 

const ATSChecker = ({ onSidebarToggle }) => {
  return (
    <div className="ats-checker-page user-page">
      {/* Navbar */}
      <UserNavBar
        onMenuClick={onSidebarToggle || (() => console.log("Toggle sidebar"))}
      />

      {/* Content */}
      <div style={{ marginTop: "80px", padding: "1rem" }}>
        {/* Page Header */}
        <div className="page-header">
          <h1>ATS Score Checker</h1>
          <p>Check how well your resume performs with Applicant Tracking Systems</p>
        </div>

        {/* Card wrapper like MyResumes */}
        <div className="card">
          <div className="ats-upload-section">
            <ATSUpload />
            <JobDescriptionInput />
          </div>

          <ATSTips />
        </div>

        {/* Footer */}
        <footer className="footer">© 2023 ResumeAI Inc. All rights reserved.</footer>
      </div>
    </div>
  );
};

export default ATSChecker;
