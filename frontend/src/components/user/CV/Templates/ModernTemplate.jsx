import React from "react";

const ModernTemplate = ({ formData }) => (
  <div
    className="bg-white resume-root space-y-6 w-full border border-slate-300 min-h-[1400px] max-w-[820px]"
    style={{ fontFamily: '"Inter", "Segoe UI", sans-serif' }}
  >
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-12 py-10">
      {formData.fullName && (
        <h1 className="text-4xl font-bold mb-3">{formData.fullName}</h1>
      )}
      <div className="text-blue-100 text-sm flex flex-wrap gap-3">
        {[formData.email, formData.phone, formData.location]
          .filter(Boolean)
          .map((item, idx) => (
            <span key={idx}>{item}</span>
          ))}
      </div>
      {(formData.linkedin || formData.github || formData.website) && (
        <div className="text-blue-100 text-sm flex flex-wrap gap-3 mt-2">
          {[formData.linkedin, formData.github, formData.website]
            .filter(Boolean)
            .map((item, idx) => (
              <span key={idx}>{item}</span>
            ))}
        </div>
      )}
    </div>

    <div className="px-12 py-10">
      {formData.summary && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-blue-700 mb-3 flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-600" />
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            {formData.summary}
          </p>
        </div>
      )}

      {formData.experience?.some((exp) => exp.company || exp.title) && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-blue-700 mb-3 flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-600" />
            WORK EXPERIENCE
          </h2>
          {formData.experience
            .filter((exp) => exp.company || exp.title)
            .map((exp, idx) => (
              <div key={idx} className="mb-6 last:mb-0">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    {exp.title && (
                      <h3 className="font-bold text-slate-900 text-base">
                        {exp.title}
                      </h3>
                    )}
                    {exp.company && (
                      <div className="text-blue-600 font-semibold text-sm">
                        {exp.company}
                      </div>
                    )}
                  </div>
                  <div className="text-right text-sm text-slate-600">
                    {exp.location && <div>{exp.location}</div>}
                    {(exp.startDate || exp.endDate) && (
                      <div>
                        {exp.startDate} - {exp.endDate}
                      </div>
                    )}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-sm text-slate-700 leading-relaxed mt-2 whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
        </div>
      )}

      {formData.education?.some((edu) => edu.school || edu.degree) && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-blue-700 mb-3 flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-600" />
            EDUCATION
          </h2>
          {formData.education
            .filter((edu) => edu.school || edu.degree)
            .map((edu, idx) => (
              <div key={idx} className="mb-4 last:mb-0">
                <div className="flex justify-between items-start">
                  <div>
                    {edu.degree && (
                      <h3 className="font-bold text-slate-900 text-base">
                        {edu.degree}
                      </h3>
                    )}
                    {edu.school && (
                      <div className="text-blue-600 font-semibold text-sm">
                        {edu.school}
                      </div>
                    )}
                  </div>
                  <div className="text-right text-sm text-slate-600">
                    {edu.location && <div>{edu.location}</div>}
                    {edu.graduationDate && <div>{edu.graduationDate}</div>}
                  </div>
                </div>
                {edu.gpa && (
                  <div className="text-sm text-slate-700 mt-1">
                    GPA: {edu.gpa}
                  </div>
                )}
              </div>
            ))}
        </div>
      )}

      {(formData.skills?.technical?.length > 0 ||
        formData.skills?.soft?.length > 0) && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-blue-700 mb-3 flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-600" />
            SKILLS
          </h2>
          {formData.skills.technical?.length > 0 && (
            <div className="mb-3">
              <span className="font-semibold text-slate-900 text-sm">
                Technical:
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.skills.technical.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          {formData.skills.soft?.length > 0 && (
            <div>
              <span className="font-semibold text-slate-900 text-sm">
                Soft Skills:
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.skills.soft.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {formData.projects?.some((project) => project.name) && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-blue-700 mb-3 flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-600" />
            PROJECTS
          </h2>
          {formData.projects
            .filter((project) => project.name)
            .map((project, idx) => (
              <div key={idx} className="mb-4 last:mb-0">
                {project.name && (
                  <h3 className="font-bold text-slate-900 text-base">
                    {project.name}
                  </h3>
                )}
                {project.technologies && (
                  <div className="text-sm text-blue-600 font-medium mt-1">
                    {project.technologies}
                  </div>
                )}
                {project.description && (
                  <p className="text-sm text-slate-700 leading-relaxed mt-2 whitespace-pre-line">
                    {project.description}
                  </p>
                )}
                {project.link && (
                  <div className="text-sm text-slate-600 mt-1">
                    {project.link}
                  </div>
                )}
              </div>
            ))}
        </div>
      )}

      {formData.certifications?.some((cert) => cert.name) && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-blue-700 mb-3 flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-600" />
            CERTIFICATIONS
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
                    <span className="text-sm text-slate-600">{cert.date}</span>
                  )}
                </div>
                {cert.issuer && (
                  <div className="text-sm text-slate-700">{cert.issuer}</div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  </div>
);

export default ModernTemplate;
