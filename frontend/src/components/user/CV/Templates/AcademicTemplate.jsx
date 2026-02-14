import React from "react";

const AcademicTemplate = ({ formData }) => (
  <div
    className="bg-white w-full border border-slate-300 p-16 min-h-[1400px] max-w-[820px] resume-root space-y-6 overflow-hidden break-words"
    style={{ fontFamily: '"Garamond", "Times New Roman", serif' }}
  >
    {formData.fullName && (
      <div className="text-center mb-8 border-b-2 border-slate-900 pb-4">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          {formData.fullName}
        </h1>
        <div className="text-slate-600 text-sm">
          {[formData.email, formData.phone, formData.location]
            .filter(Boolean)
            .join(" • ")}
        </div>
        {(formData.linkedin || formData.website) && (
          <div className="text-slate-600 text-sm mt-1">
            {[formData.linkedin, formData.website].filter(Boolean).join(" • ")}
          </div>
        )}
      </div>
    )}

    {formData.summary && (
      <div className="mb-10">
        <h2 className="text-lg font-bold text-slate-900 mb-3">
          Research Interests
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line break-words">
          {formData.summary}
        </p>
      </div>
    )}

    {formData.education?.some((edu) => edu.school || edu.degree) && (
      <div className="mb-10">
        <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-1">
          Education
        </h2>
        {formData.education
          .filter((edu) => edu.school || edu.degree)
          .map((edu, idx) => (
            <div key={idx} className="mb-5 last:mb-0">
              <div className="flex justify-between items-baseline">
                {edu.degree && (
                  <h3 className="font-bold text-slate-900 text-base">
                    {edu.degree}
                  </h3>
                )}
                {edu.graduationDate && (
                  <span className="text-sm text-slate-700">
                    {edu.graduationDate}
                  </span>
                )}
              </div>
              {edu.school && (
                <div className="text-slate-700 text-sm italic">
                  {edu.school}
                </div>
              )}
              {edu.gpa && (
                <div className="text-sm text-slate-600 mt-1">
                  GPA: {edu.gpa}
                </div>
              )}
            </div>
          ))}
      </div>
    )}

    {formData.experience?.some((exp) => exp.company || exp.title) && (
      <div className="mb-10">
        <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-1">
          Research Experience
        </h2>
        {formData.experience
          .filter((exp) => exp.company || exp.title)
          .map((exp, idx) => (
            <div key={idx} className="mb-6 last:mb-0">
              <div className="flex justify-between items-baseline mb-1">
                {exp.title && (
                  <h3 className="font-bold text-slate-900 text-base">
                    {exp.title}
                  </h3>
                )}
                <span className="text-sm text-slate-700">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              {exp.company && (
                <div className="text-slate-700 text-sm italic mb-2">
                  {exp.company}
                </div>
              )}
              {exp.description && (
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
      </div>
    )}

    {formData.projects?.some((project) => project.name) && (
      <div className="mb-10">
        <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-300 pb-1">
          Projects & Publications
        </h2>
        {formData.projects
          .filter((project) => project.name)
          .map((project, idx) => (
            <div key={idx} className="mb-5 last:mb-0">
              {project.name && (
                <h3 className="font-bold text-slate-900 text-base">
                  {project.name}
                </h3>
              )}
              {project.description && (
                <p className="text-sm text-slate-700 leading-relaxed mt-1 whitespace-pre-line">
                  {project.description}
                </p>
              )}
              {project.link && (
                <div className="text-sm text-blue-600 mt-1">{project.link}</div>
              )}
            </div>
          ))}
      </div>
    )}

    {formData.skills?.technical?.length > 0 && (
      <div className="mb-10">
        <h2 className="text-lg font-bold text-slate-900 mb-3 border-b border-slate-300 pb-1">
          Technical Skills
        </h2>
        <p className="text-sm text-slate-700">
          {formData.skills.technical.join(", ")}
        </p>
      </div>
    )}

    {formData.certifications?.some((cert) => cert.name) && (
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-3 border-b border-slate-300 pb-1">
          Certifications & Awards
        </h2>
        {formData.certifications
          .filter((cert) => cert.name)
          .map((cert, idx) => (
            <div key={idx} className="mb-3 last:mb-0">
              <div className="flex justify-between items-baseline">
                {cert.name && (
                  <h3 className="font-semibold text-slate-900 text-sm">
                    {cert.name}
                  </h3>
                )}
                {cert.date && (
                  <span className="text-sm text-slate-700">{cert.date}</span>
                )}
              </div>
              {cert.issuer && (
                <div className="text-sm text-slate-700 italic">
                  {cert.issuer}
                </div>
              )}
            </div>
          ))}
      </div>
    )}
  </div>
);

export default AcademicTemplate;
