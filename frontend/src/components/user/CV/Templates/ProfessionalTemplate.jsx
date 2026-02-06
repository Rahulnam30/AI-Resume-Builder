import React from "react";

const ProfessionalTemplate = ({ formData }) => (
  <div
    className="bg-white resume-root space-y-6 w-full border border-slate-300 p-12 lg:p-20 min-h-[1400px] max-w-[820px]"
    style={{ fontFamily: '"Times New Roman", Times, serif' }}
  >
    {(formData.fullName || formData.email || formData.phone) && (
      <div className="text-center mb-10">
        {formData.fullName && (
          <h1 className="text-3xl font-bold text-slate-900 uppercase tracking-widest mb-1">
            {formData.fullName}
          </h1>
        )}
        <div className="text-sm text-slate-600 flex flex-wrap justify-center gap-2 items-center">
          {[
            formData.location,
            formData.email,
            formData.phone,
            formData.linkedin,
            formData.github,
            formData.website,
          ]
            .filter(Boolean)
            .map((item, index, arr) => (
              <span key={index} className="flex items-center text-[11px]">
                {item}
                {index < arr.length - 1 && (
                  <span className="mx-2 text-slate-400">|</span>
                )}
              </span>
            ))}
        </div>
      </div>
    )}

    {formData.summary && (
      <div className="mb-10">
        <p className="text-sm text-slate-700 leading-relaxed text-justify">
          {formData.summary}
        </p>
      </div>
    )}

    {formData.education?.some((edu) => edu.school || edu.degree) && (
      <div className="mb-10">
        <h2 className="text-sm font-bold text-slate-900 uppercase border-b border-black mb-4 pb-0.5">
          EDUCATION
        </h2>
        {formData.education
          .filter((edu) => edu.school || edu.degree)
          .map((edu, idx) => (
            <div key={idx} className="mb-5 last:mb-0">
              <div className="flex justify-between items-baseline">
                {edu.school && (
                  <h3 className="font-bold text-slate-900 text-base">
                    {edu.school}
                  </h3>
                )}
                {edu.location && (
                  <span className="text-sm text-slate-900">{edu.location}</span>
                )}
              </div>
              <div className="flex justify-between items-baseline mb-1">
                {edu.degree && (
                  <div className="italic text-slate-800 text-sm">
                    {edu.degree}
                  </div>
                )}
                {edu.graduationDate && (
                  <span className="italic text-slate-800 text-sm">
                    {edu.graduationDate}
                  </span>
                )}
              </div>
              {edu.gpa && (
                <div className="text-sm text-slate-700">GPA: {edu.gpa}</div>
              )}
            </div>
          ))}
      </div>
    )}

    {formData.experience?.some((exp) => exp.company || exp.title) && (
      <div className="mb-10">
        <h2 className="text-sm font-bold text-slate-900 uppercase border-b border-black mb-4 pb-0.5">
          EXPERIENCE
        </h2>
        {formData.experience
          .filter((exp) => exp.company || exp.title)
          .map((exp, idx) => (
            <div key={idx} className="mb-5 last:mb-0">
              <div className="flex justify-between items-baseline">
                {exp.company && (
                  <h3 className="font-bold text-slate-900 text-base">
                    {exp.company}
                  </h3>
                )}
                {exp.location && (
                  <span className="text-sm text-slate-900">{exp.location}</span>
                )}
              </div>
              <div className="flex justify-between items-baseline mb-1">
                {exp.title && (
                  <div className="italic text-slate-800 text-sm">
                    {exp.title}
                  </div>
                )}
                {(exp.startDate || exp.endDate) && (
                  <span className="italic text-slate-800 text-sm">
                    {exp.startDate} – {exp.endDate}
                  </span>
                )}
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
      <div className="mb-10">
        <h2 className="text-sm font-bold text-slate-900 uppercase border-b border-black mb-4 pb-0.5">
          PROJECTS
        </h2>
        {formData.projects
          .filter((project) => project.name)
          .map((project, idx) => (
            <div key={idx} className="mb-5 last:mb-0">
              <div className="flex justify-between items-baseline">
                {project.name && (
                  <h3 className="font-bold text-slate-900 text-base">
                    {project.name}
                  </h3>
                )}
                {project.link && (
                  <span className="text-sm text-slate-600">{project.link}</span>
                )}
              </div>
              {project.technologies && (
                <div className="text-sm italic text-slate-700 mb-1">
                  {project.technologies}
                </div>
              )}
              {project.description && (
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              )}
            </div>
          ))}
      </div>
    )}

    {(formData.skills?.technical?.length > 0 ||
      formData.skills?.soft?.length > 0) && (
      <div className="mb-10">
        <h2 className="text-sm font-bold text-slate-900 uppercase border-b border-black mb-4 pb-0.5">
          SKILLS
        </h2>
        <div className="text-sm text-slate-900">
          {formData.skills.technical?.length > 0 && (
            <div className="mb-2">
              <span className="font-bold">Technical: </span>
              {formData.skills.technical.join(", ")}
            </div>
          )}
          {formData.skills.soft?.length > 0 && (
            <div>
              <span className="font-bold">Soft Skills: </span>
              {formData.skills.soft.join(", ")}
            </div>
          )}
        </div>
      </div>
    )}

    {formData.certifications?.some((cert) => cert.name) && (
      <div className="mb-10">
        <h2 className="text-sm font-bold text-slate-900 uppercase border-b border-black mb-4 pb-0.5">
          CERTIFICATIONS
        </h2>
        {formData.certifications
          .filter((cert) => cert.name)
          .map((cert, idx) => (
            <div key={idx} className="mb-3 last:mb-0">
              <div className="flex justify-between items-baseline">
                {cert.name && (
                  <h3 className="font-bold text-slate-900 text-sm">
                    {cert.name}
                  </h3>
                )}
                {cert.date && (
                  <span className="italic text-slate-800 text-sm">
                    {cert.date}
                  </span>
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
);

export default ProfessionalTemplate;
