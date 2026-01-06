import { useState } from "react";
import "./myresumes.css";
export default function MyResumes({ user }) {

  const [openMenu, setOpenMenu] = useState(null);
  const getInitials = (name) => {
  if (!name) return 'U';
  const words = name.trim().split(' ');
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
};

  const resumes = [
    {
      title: "Senior Software Engineer",
      created: "2023-10-26",
      modified: "2 hours ago",
      format: "PDF",
      score: "75/100",
      color: "green",
    },
    {
      title: "Marketing Manager - Tech",
      created: "2023-10-20",
      modified: "yesterday",
      format: "Word",
      score: "88/100",
      color: "blue",
    },
    {
      title: "Product Manager Resume (Entry)",
      created: "2023-09-15",
      modified: "3 days ago",
      format: "PDF",
      score: "62/100",
      color: "orange",
    },
    {
      title: "Data Analyst (Intern)",
      created: "2023-08-01",
      modified: "1 week ago",
      format: "PDF",
      score: "91/100",
      color: "green",
    },
  ];

  return (
    <div className="myresumes-wrapper">

    {/* TOP BAR */}
      <div className="top-bar"></div>
      <div className="filter-row">
        <div className="filter-input">
          <svg className="icon" viewBox="0 0 24 24">
            <path d="M21 21l-4.35-4.35m1.85-5.4a7.25 7.25 0 11-14.5 0 7.25 7.25 0 0114.5 0z" />
          </svg>
          <input placeholder="Search Templates Accordingly..." />
        </div>

        <div className="topbar-right">
          <button className="icon-btn">
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5" />
            </svg>
          </button>
<div className="profile">
  <div className="profile-avatar">
    {getInitials(user?.name)}
  </div>
</div>
        </div>
      </div>

      {/* HEADER (UNCHANGED, button added) */}
      <div className="page-header">
        <div>
          <h1>My Resumes</h1>
          <p>Manage all your resume documents.</p>
        </div>
      </div>

      {/* CARD */}
      <div className="card">

        {/* 🔍 FILTER ROW (ADDED) */}
        <div className="filter-row">
          <div className="filter-input">
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M21 21l-4.35-4.35m1.85-5.4a7.25 7.25 0 11-14.5 0 7.25 7.25 0 0114.5 0z" />
            </svg>
            <input placeholder="search templates accordingly..." />
          </div>

          <button className="format-btn">All Formats</button>
        </div>

 
        {/* 🚫 TABLE CODE BELOW IS 100% YOURS – UNCHANGED */}
        <table className="resume-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date Created</th>
              <th>Last Modified</th>
              <th>Format</th>
              <th>AI Score</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {resumes.map((resume, index) => (
              <tr key={index}>
                <td>{resume.title}</td>
                <td>{resume.created}</td>
                <td>{resume.modified}</td>
                <td>{resume.format}</td>
                <td className={`score ${resume.color}`}>
                  {resume.score}
                </td>

                <td className="actions">
                  <button className="action-btn" title="View">
                    <svg className="icon" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>

                  <div className="dropdown-wrapper">
                    <button
                      className="dots-btn"
                      onClick={() =>
                        setOpenMenu(openMenu === index ? null : index)
                      }
                    >
                      ⋮
                    </button>

                    {openMenu === index && (
                      <div className="dropdown-menu">
                        <button>Edit</button>
                        <button>Download</button>
                        <button className="danger">Delete</button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ⬇️ TABLE BOTTOM (ADDED) */}
        <div className="table-bottom">
          <span>Showing 1 to 4 of 4 resumes</span>
          <div className="pagination">
            <button>‹</button>
            <button className="active">1</button>
            <button>›</button>
          </div>
        </div>
      </div>

      {/* FOOTER (ADDED) */}
      <footer className="footer">
        © 2023 ResumeAI Inc. All rights reserved.
      </footer>
    </div>
  );
}
