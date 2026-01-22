import React from "react";
import ATSUpload from "./ATSUpload";
import JobDescriptionInput from "./JobDescriptionInput";
import ATSTips from "./ATSTips";
import "./ATSChecker.css";
import UserNavBar from "../UserNavBar/UserNavBar";

const ATSChecker = ({ onSidebarToggle }) => {
  return (
    <div className="ats-checker-page user-page">
      <UserNavBar onMenuClick={onSidebarToggle || (() => console.log("Toggle sidebar"))} />

      <div style={{ marginTop: "80px", padding: "1rem" }}>
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
    </div>
  );
};

export default ATSChecker;
