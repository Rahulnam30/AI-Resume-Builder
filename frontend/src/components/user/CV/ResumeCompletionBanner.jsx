import React from "react";
import { AlertTriangle } from "lucide-react";

const ResumeCompletionBanner = ({ missingSections = [] }) => {
  return (
    <div className="mx-6 my-4 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-start gap-3">
        <AlertTriangle className="text-amber-600 mt-0.5" size={20} />
        <div>
          <p className="font-semibold text-amber-800">Complete Your CV</p>
          <p className="text-sm text-amber-700">
            Add the following information to enable export functionality:
          </p>
        </div>
      </div>

      {/* Right Pills */}
      <div className="flex gap-2">
        {missingSections.map((section) => (
          <span
            key={section}
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              section === "Skills"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {section}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ResumeCompletionBanner;
