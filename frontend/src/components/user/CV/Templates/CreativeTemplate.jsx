import React from "react";

const CreativeTemplate = ({ formData }) => (
  <div
    className="bg-white w-full border border-slate-300 min-h-[1400px] max-w-[820px] flex resume-root space-y-6"
    style={{ fontFamily: '"Poppins", sans-serif' }}
  >
    <div className="w-1/3 bg-gradient-to-b from-purple-600 to-purple-800 text-white p-8">
      {formData.fullName && (
        <h1 className="text-2xl font-bold mb-6 leading-tight">
          {formData.fullName}
        </h1>
      )}

      <div className="mb-8">
        <h2 className="text-sm font-bold uppercase tracking-wider mb-3 opacity-90">
          Contact
        </h2>
        <div className="space-y-2 text-sm">
          {formData.email && <div className="break-all">{formData.email}</div>}
          {formData.phone && <div>{formData.phone}</div>}
          {formData.location && <div>{formData.location}</div>}
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

      {(formData.skills?.technical?.length > 0 ||
        formData.skills?.soft?.length > 0) && (
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3 opacity-90">
            Skills
          </h2>
          {formData.skills.technical?.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-semibold mb-2 opacity-80">
                Technical
              </h3>
              <div className="space-y-1.5">
                {formData.skills.technical.map((skill, idx) => (
                  <div key={idx} className="text-sm">
                    • {skill}
                  </div>
                ))}
              </div>
            </div>
          )}
          {formData.skills.soft?.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold mb-2 opacity-80">
                Soft Skills
              </h3>
              <div className="space-y-1.5">
                {formData.skills.soft.map((skill, idx) => (
                  <div key={idx} className="text-sm">
                    • {skill}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {formData.certifications?.some((cert) => cert.name) && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3 opacity-90">
            Certifications
          </h2>
          {formData.certifications
            .filter((cert) => cert.name)
            .map((cert, idx) => (
              <div key={idx} className="mb-3 text-sm">
                <div className="font-semibold">{cert.name}</div>
                {cert.issuer && (
                  <div className="text-xs opacity-80 mt-0.5">{cert.issuer}</div>
                )}
                {cert.date && (
                  <div className="text-xs opacity-80">{cert.date}</div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>

    <div className="flex-1 p-10">
      {formData.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-purple-700 mb-3 uppercase tracking-wide">
            Profile
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            {formData.summary}
          </p>
        </div>
      )}

      {formData.experience?.some((exp) => exp.company || exp.title) && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-purple-700 mb-4 uppercase tracking-wide">
            Experience
          </h2>
          {formData.experience
            .filter((exp) => exp.company || exp.title)
            .map((exp, idx) => (
              <div
                key={idx}
                className="mb-6 last:mb-0 relative pl-4 border-l-2 border-purple-300"
              >
                {exp.title && (
                  <h3 className="font-bold text-slate-900 text-base">
                    {exp.title}
                  </h3>
                )}
                {exp.company && (
                  <div className="text-purple-600 font-semibold text-sm">
                    {exp.company}
                  </div>
                )}
                <div className="text-xs text-slate-600 mt-1">
                  {exp.location} • {exp.startDate} - {exp.endDate}
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
          <h2 className="text-xl font-bold text-purple-700 mb-4 uppercase tracking-wide">
            Education
          </h2>
          {formData.education
            .filter((edu) => edu.school || edu.degree)
            .map((edu, idx) => (
              <div
                key={idx}
                className="mb-4 last:mb-0 relative pl-4 border-l-2 border-purple-300"
              >
                {edu.degree && (
                  <h3 className="font-bold text-slate-900 text-base">
                    {edu.degree}
                  </h3>
                )}
                {edu.school && (
                  <div className="text-purple-600 font-semibold text-sm">
                    {edu.school}
                  </div>
                )}
                <div className="text-xs text-slate-600 mt-1">
                  {edu.location} • {edu.graduationDate}
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

      {formData.projects?.some((project) => project.name) && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-purple-700 mb-4 uppercase tracking-wide">
            Projects
          </h2>
          {formData.projects
            .filter((project) => project.name)
            .map((project, idx) => (
              <div
                key={idx}
                className="mb-4 last:mb-0 relative pl-4 border-l-2 border-purple-300"
              >
                {project.name && (
                  <h3 className="font-bold text-slate-900 text-base">
                    {project.name}
                  </h3>
                )}
                {project.technologies && (
                  <div className="text-sm text-purple-600 font-medium mt-1">
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
);

export default CreativeTemplate;
