import { LuEye } from "react-icons/lu";

const RecentResumes = ({ resumes = [], onViewAll }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col relative">
      
      {/* Header - Now only contains the title */}
      <div className="recent-header">
        <h3 className="recent-title">
          <LuEye className="recent-icon" />
          Recent Resumes
        </h3>
      </div>

      {/* List */}
      <div className="space-y-3 flex-grow">
        {resumes.length > 0 ? (
          resumes.map((resume) => (
            <div
              key={resume.id}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-blue-50 text-blue-600">
                  <LuEye className="text-lg" />
                </div>

                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">
                    {resume.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(resume.date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {resume.atsScore !== undefined && (
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700">
                  ATS: {resume.atsScore}%
                </span>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-sm text-gray-500">
            No resumes yet. Start building one 🚀
          </div>
        )}
      </div>

      {/* View All Button - Moved to the Bottom Right */}
      <div className="recent-footer">
        <button
          onClick={onViewAll}
          className="view-all-btn"
        >
          View All →
        </button>
      </div>

    </div>
  );
};

export default RecentResumes;