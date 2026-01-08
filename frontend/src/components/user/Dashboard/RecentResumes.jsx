import { LuEye } from "react-icons/lu";

const RecentResumes = ({ resumes = [], onViewAll }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      {/* Title */}
      <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
        <LuEye className="text-gray-600 text-xl" />
        <span>Recent Resumes</span>
      </h3>

      {/* List */}
      <div className="space-y-3">
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
                  <span className="text-xs text-gray-500">{resume.date}</span>
                </div>
              </div>

              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700">
                ATS: {resume.atsScore}%
              </span>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-sm text-gray-500">
            No resumes yet. Start building one 🚀
          </div>
        )}
      </div>

      {/* View All */}
      <button
        onClick={onViewAll}
        className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        View All →
      </button>
    </div>
  );
};

export default RecentResumes;
