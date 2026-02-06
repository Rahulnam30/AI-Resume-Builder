import React from "react";

const MinimalTemplate = ({ formData }) => (
  <div
    className="bg-white resume-root space-y-6 w-full border border-slate-300 p-16 min-h-[1400px] max-w-[820px]"
    style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif' }}
  >
    {formData.fullName && (
      <h1 className="text-5xl font-light text-slate-900 mb-2 tracking-tight">
        {formData.fullName}
      </h1>
    )}
    <div className="text-slate-600 text-sm mb-10 flex flex-wrap gap-4">
      {[formData.email, formData.phone, formData.location, formData.linkedin]
        .filter(Boolean)
        .map((item, idx) => (
          <span key={idx}>{item}</span>
        ))}
    </div>

    {formData.summary && (
      <div className="mb-12">
        <p className="text-sm text-slate-700 leading-relaxed">
          {formData.summary}
        </p>
      </div>
    )}

    {formData.experience?.some((exp) => exp.company || exp.title) && (
      <div className="mb-12">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
          Experience
        </h2>
        {formData.experience
          .filter((exp) => exp.company || exp.title)
          .map((exp, idx) => (
            <div key={idx} className="mb-8 last:mb-0">
              <div className="flex justify-between items-baseline mb-2">
                <div>
                  {exp.title && (
                    <h3 className="font-semibold text-slate-900 text-lg">
                      {exp.title}
                    </h3>
                  )}
                  {exp.company && (
                    <div className="text-slate-700 text-sm">{exp.company}</div>
                  )}
                </div>
                <div className="text-sm text-slate-500">
                  {exp.startDate} - {exp.endDate}
                </div>
              </div>
              {exp.description && (
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
      </div>
    )}

    {formData.education?.some((edu) => edu.school || edu.degree) && (
      <div className="mb-12">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
          Education
        </h2>
        {formData.education
          .filter((edu) => edu.school || edu.degree)
          .map((edu, idx) => (
            <div key={idx} className="mb-6 last:mb-0">
              <div className="flex justify-between items-baseline">
                <div>
                  {edu.degree && (
                    <h3 className="font-semibold text-slate-900 text-base">
                      {edu.degree}
                    </h3>
                  )}
                  {edu.school && (
                    <div className="text-slate-700 text-sm">{edu.school}</div>
                  )}
                </div>
                <div className="text-sm text-slate-500">
                  {edu.graduationDate}
                </div>
              </div>
              {edu.gpa && (
                <div className="text-sm text-slate-600 mt-1">
                  GPA: {edu.gpa}
                </div>
              )}
            </div>
          ))}
      </div>
    )}

    {(formData.skills?.technical?.length > 0 ||
      formData.skills?.soft?.length > 0) && (
      <div className="mb-12">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
          Skills
        </h2>
        <div className="text-sm text-slate-700">
          {formData.skills.technical?.length > 0 && (
            <div className="mb-2">{formData.skills.technical.join(" • ")}</div>
          )}
          {formData.skills.soft?.length > 0 && (
            <div>{formData.skills.soft.join(" • ")}</div>
          )}
        </div>
      </div>
    )}

    {formData.projects?.some((project) => project.name) && (
      <div className="mb-12">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
          Projects
        </h2>
        {formData.projects
          .filter((project) => project.name)
          .map((project, idx) => (
            <div key={idx} className="mb-6 last:mb-0">
              {project.name && (
                <h3 className="font-semibold text-slate-900 text-base">
                  {project.name}
                </h3>
              )}
              {project.technologies && (
                <div className="text-sm text-slate-600 mt-1">
                  {project.technologies}
                </div>
              )}
              {project.description && (
                <p className="text-sm text-slate-600 leading-relaxed mt-2 whitespace-pre-line">
                  {project.description}
                </p>
              )}
            </div>
          ))}
      </div>
    )}
  </div>
);

export default MinimalTemplate;
