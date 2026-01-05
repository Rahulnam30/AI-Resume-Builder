import "./myresumes.css";
import Footer from "../../Footer";

export default function MyResumes() {
  return (
    <div className="myresumes-wrapper">

      {/* Top Bar */}
      <div className="topbar">

        {/* Search */}
        <div className="search-wrapper">
          <svg className="icon" viewBox="0 0 24 24">
            <path d="M21 21l-4.35-4.35m1.85-5.4a7.25 7.25 0 11-14.5 0 7.25 7.25 0 0114.5 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search for resumes, templates..."
          />
        </div>

        {/* Right */}
        <div className="topbar-right">
          <button className="icon-btn">
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0a3 3 0 01-6 0" />
            </svg>
          </button>

          <div className="profile">
            <img
              src="https://i.pravatar.cc/32"
              alt="profile"
            />
            <span>Profile ▾</span>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        Home / <span>My Resumes</span>
      </div>

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>My Resumes</h1>
          <p>Manage all your resume documents.</p>
        </div>

        <button className="create-btn">+ Create New Resume</button>
      </div>

      {/* Main Card */}
      <div className="card">

        {/* Filter Row */}
        <div className="filter-row">
          <div className="filter-input">
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M21 21l-4.35-4.35m1.85-5.4a7.25 7.25 0 11-14.5 0 7.25 7.25 0 0114.5 0z" />
            </svg>
            <input type="text" placeholder="Filter resumes by title..." />
          </div>

          <button className="format-btn">
            All Formats
          </button>
        </div>

        {/* Table */}
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
            <tr>
              <td>Senior Software Engineer</td>
              <td>2023-10-26</td>
              <td>2 hours ago</td>
              <td>PDF</td>
              <td className="score green">75/100</td>

<td className="actions">
  <button className="action-btn" title="View">
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  </button>
  <button className="action-btn" title="Edit">
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  </button>
  <button className="action-btn" title="Download">
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  </button>
  <button className="action-btn" title="Delete">
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
    </svg>
  </button>
</td>
            </tr>

            <tr>
              <td>Marketing Manager - Tech</td>
              <td>2023-10-20</td>
              <td>yesterday</td>
              <td>Word</td>
              <td className="score blue">88/100</td>
<td className="actions">
  <button className="action-btn" title="View">
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  </button>
  <button className="action-btn" title="Edit">
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  </button>
  <button className="action-btn" title="Download">
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  </button>
  <button className="action-btn" title="Delete">
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
    </svg>
  </button>
</td>

            </tr>

            <tr>
              <td>Product Manager Resume (Entry)</td>
              <td>2023-09-15</td>
              <td>3 days ago</td>
              <td>PDF</td>
              <td className="score orange">62/100</td>
              <td className="actions">
  <button className="action-btn" title="View">
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  </button>
  <button className="action-btn" title="Edit">
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  </button>
  <button className="action-btn" title="Download">
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  </button>
  <button className="action-btn" title="Delete">
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
    </svg>
  </button>
</td>
            </tr>

            <tr>
              <td>Data Analyst (Intern)</td>
              <td>2023-08-01</td>
              <td>1 week ago</td>
              <td>PDF</td>
              <td className="score green">91/100</td>
              <td className="actions">
  <button className="action-btn" title="View">
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  </button>
  <button className="action-btn" title="Edit">
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  </button>
  <button className="action-btn" title="Download">
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  </button>
  <button className="action-btn" title="Delete">
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
    </svg>
  </button>
</td>

            </tr>
          </tbody>
        </table>

        {/* Bottom */}
        <div className="table-bottom">
          <span>Showing 1 to 4 of 4 resumes</span>

          <div className="pagination">
            <button>‹</button>
            <button className="active">1</button>
            <button>›</button>
          </div>
        </div>
      </div>

      <Footer />

    </div>
  );
}