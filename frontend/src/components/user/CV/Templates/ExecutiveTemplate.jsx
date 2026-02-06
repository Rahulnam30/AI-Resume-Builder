import React from "react";

const ExecutiveTemplate = ({ formData }) => (
  <div
    className="bg-white resume-root space-y-6 w-full border border-slate-300 min-h-[1400px] max-w-[820px] flex flex-col"
    style={{ fontFamily: '"Georgia", serif' }}
  >
    <div className="bg-slate-900 text-white px-12 py-8">
      {formData.fullName && (
        <h1 className="text-3xl font-bold mb-2 tracking-wide">
          {formData.fullName}
        </h1>
      )}
      <div className="text-slate-300 text-sm">
        {[formData.email, formData.phone, formData.location]
          .filter(Boolean)
          .join(" • ")}
      </div>
    </div>

    <div className="flex flex-1">
      <div className="w-2/5 bg-slate-50 p-8 border-r border-slate-200">
        {(formData.linkedin || formData.github || formData.website) && (
          <div className="mb-8">
            <h2 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider border-b border-slate-300 pb-2">
              Links
            </h2>
            <div className="space-y-2 text-sm text-slate-700">
              {formData.linkedin && (
                <div className="break-all">{formData.linkedin}</div>
              )}
              {formData.github && (
                <div className="break-all">{formData.github}</div>
              )}
              {formData.website && (
                <div className="break-all">{formData.website}</div>
              )}
            </div>
          </div>
        )}

        {(formData.skills?.technical?.length > 0 ||
          formData.skills?.soft?.length > 0) && (
          <div className="mb-8">
            <h2 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider border-b border-slate-300 pb-2">
              Expertise
            </h2>
            {formData.skills.technical?.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-slate-700 mb-2">
                  Technical
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {formData.skills.technical.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {formData.skills.soft?.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-slate-700 mb-2">
                  Leadership
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {formData.skills.soft.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {formData.education?.some((edu) => edu.school || edu.degree) && (
          <div className="mb-8">
            <h2 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider border-b border-slate-300 pb-2">
              Education
            </h2>
            {formData.education
              .filter((edu) => edu.school || edu.degree)
              .map((edu, idx) => (
                <div key={idx} className="mb-4 last:mb-0 text-sm">
                  {edu.degree && (
                    <div className="font-semibold text-slate-900">
                      {edu.degree}
                    </div>
                  )}
                  {edu.school && (
                    <div className="text-slate-700">{edu.school}</div>
                  )}
                  {edu.graduationDate && (
                    <div className="text-xs text-slate-600 mt-1">
                      {edu.graduationDate}
                    </div>
                  )}
                  {edu.gpa && (
                    <div className="text-xs text-slate-600">GPA: {edu.gpa}</div>
                  )}
                </div>
              ))}
          </div>
        )}

        {formData.certifications?.some((cert) => cert.name) && (
          <div>
            <h2 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider border-b border-slate-300 pb-2">
              Certifications
            </h2>
            {formData.certifications
              .filter((cert) => cert.name)
              .map((cert, idx) => (
                <div key={idx} className="mb-3 text-sm">
                  <div className="font-semibold text-slate-900">
                    {cert.name}
                  </div>
                  {cert.issuer && (
                    <div className="text-xs text-slate-700">{cert.issuer}</div>
                  )}
                  {cert.date && (
                    <div className="text-xs text-slate-600">{cert.date}</div>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="flex-1 p-10">
        {formData.summary && (
          <div className="mb-10">
            <h2 className="text-base font-bold text-slate-900 mb-3 uppercase tracking-wider">
              Executive Summary
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              {formData.summary}
            </p>
          </div>
        )}

        {formData.experience?.some((exp) => exp.company || exp.title) && (
          <div className="mb-10">
            <h2 className="text-base font-bold text-slate-900 mb-4 uppercase tracking-wider">
              Professional Experience
            </h2>
            {formData.experience
              .filter((exp) => exp.company || exp.title)
              .map((exp, idx) => (
                <div key={idx} className="mb-6 last:mb-0">
                  {exp.title && (
                    <h3 className="font-bold text-slate-900 text-base">
                      {exp.title}
                    </h3>
                  )}
                  <div className="flex justify-between items-baseline text-sm mt-1 mb-2">
                    {exp.company && (
                      <span className="text-slate-700 font-semibold">
                        {exp.company}
                      </span>
                    )}
                    <span className="text-slate-600">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
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
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-4 uppercase tracking-wider">
              Key Projects
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
                  {project.technologies && (
                    <div className="text-sm text-slate-600 italic mt-1">
                      {project.technologies}
                    </div>
                  )}
                  {project.description && (
                    <p className="text-sm text-slate-700 leading-relaxed mt-2 whitespace-pre-line">
                      {project.description}
                    </p>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default ExecutiveTemplate;
