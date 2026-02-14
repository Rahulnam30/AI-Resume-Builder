import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2, MoreVertical, FileText, Trash2, Download, Edit } from "lucide-react";
import "./myresumes.css";
import UserNavBar from "../UserNavBar/UserNavBar";

export default function MyResumes({ onSidebarToggle }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/resume/all", {
          withCredentials: true,
        });
        if (res.data.success) {
          setResumes(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch resumes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const handleDelete = async (id) => {
    // Placeholder for delete functionality
    console.log("Delete resume", id);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="myresumes-page user-page">
      <UserNavBar
        onMenuClick={onSidebarToggle || (() => console.log("Toggle sidebar"))}
      />

      <div className="myresumes-wrapper">
        <div className="page-header">
          <div>
            <h1>My Resumes</h1>
            <p>Manage all your resume documents.</p>
          </div>
          <button
            className="create-btn"
            onClick={() => navigate("/user/resume-builder?new=true")}
          >
            + Create New
          </button>
        </div>

        <div className="card">
          <div className="filter-row">
            <div className="filter-input">
              <input placeholder="Search resumes..." />
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
          ) : (
            <>
              {resumes.length === 0 ? (
                <div className="text-center py-10 text-slate-500">
                  No resumes found. Create your first one!
                </div>
              ) : (
                <table className="resume-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Date Created</th>
                      <th>Last Modified</th>
                      <th>Template</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resumes.map((resume, index) => (
                      <tr key={resume._id || index}>
                        <td>
                          <div className="flex items-center gap-2">
                            <FileText size={16} className="text-slate-400" />
                            <span className="font-medium">{resume.title || "Untitled Resume"}</span>
                          </div>
                        </td>
                        <td>{formatDate(resume.createdAt)}</td>
                        <td>{formatDate(resume.updatedAt)}</td>
                        <td className="capitalize">{resume.templateId || "Default"}</td>
                        <td className="actions">
                          <div className="dropdown-wrapper relative">
                            <button
                              className="dots-btn p-1.5 hover:bg-slate-100 rounded-full transition-colors"
                              onClick={() => setOpenMenu(openMenu === index ? null : index)}
                            >
                              <MoreVertical size={18} className="text-slate-600" />
                            </button>
                            {openMenu === index && (
                              <div className="dropdown-menu absolute right-0 top-full mt-1 bg-white shadow-lg rounded-lg border border-slate-100 z-10 w-32 py-1 flex flex-col">
                                <button
                                  className="text-left px-4 py-2 hover:bg-slate-50 text-sm flex items-center gap-2 text-slate-700"
                                  onClick={() => navigate(`/user/resume-builder?id=${resume._id}`)}
                                >
                                  <Edit size={14} /> Edit
                                </button>
                                <button className="text-left px-4 py-2 hover:bg-slate-50 text-sm flex items-center gap-2 text-slate-700">
                                  <Download size={14} /> Download
                                </button>
                                <button
                                  className="text-left px-4 py-2 hover:bg-red-50 text-sm flex items-center gap-2 text-red-600 border-t border-slate-100"
                                  onClick={() => handleDelete(resume._id)}
                                >
                                  <Trash2 size={14} /> Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}

          {!isLoading && resumes.length > 0 && (
            <div className="table-bottom">
              <span>Showing {resumes.length} resumes</span>
            </div>
          )}
        </div>

        <footer className="footer">© 2026 AI Resume Builder. All rights reserved.</footer>
      </div>
    </div>
  );
}
