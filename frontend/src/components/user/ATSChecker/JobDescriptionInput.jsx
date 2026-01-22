import React from "react";

const JobDescriptionInput = ({ onAnalyze }) => {
	return (
		<div className="job-description-box bg-white p-4 rounded-lg shadow-sm border border-slate-200">
			<h3 className="font-semibold mb-2">📋 Job Description (Optional)</h3>
			<textarea
				placeholder="Paste the job description here to get keyword matching analysis..."
				rows={6}
				className="w-full p-2 border rounded text-sm"
			></textarea>
			<button
				className="mt-3 px-4 py-2 bg-blue-600 text-white rounded text-sm"
				onClick={() => typeof onAnalyze === "function" && onAnalyze()}
			>
				🔍 Analyze Resume
			</button>
		</div>
	);
};

export default JobDescriptionInput;