import React from "react";

const TwoColumnATS = ({ formData }) => {
  const Section = ({ title, children }) => (
    <div className="mb-6">
      <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b border-slate-300 pb-1">
        {title}
      </h2>
      {children}
    </div>
  );

  return (
    <div className="bg-white resume-root space-y-6 w-full max-w-[820px] min-h-[1400px] border border-slate-300 shadow-xl font-sans text-slate-900">
      {/* Header */}
      <div className="px-10 py-8 border-b border-slate-300">
        <h1 className="text-3xl font-bold">
          {formData.fullName || "Your Name"}
        </h1>
        <div className="text-sm text-slate-600 mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {[formData.email, formData.phone, formData.location]
            .filter(Boolean)
            .map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          {[formData.github, formData.linkedin, formData.website]
            .filter(Boolean)
            .map((item, i) => (
              <span key={i} className="text-blue-700 underline">
                {item}
              </span>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-[1fr_2fr] gap-8 px-10 py-8">
        {/* Left Column */}
        <div>
          {(formData.skills?.technical?.length > 0 ||
            formData.skills?.soft?.length > 0) && (
            <Section title="Skills">
              <div className="text-sm space-y-2">
                {formData.skills.technical?.map((skill, i) => (
                  <div key={i}>• {skill}</div>
                ))}
              </div>
            </Section>
          )}

          {formData.education?.length > 0 && (
            <Section title="Education">
              {formData.education.map((edu, idx) => (
                <div key={idx} className="mb-3 text-sm">
                  <div className="font-semibold">{edu.degree}</div>
                  <div>{edu.school}</div>
                  <div className="text-slate-500 text-xs">
                    {edu.graduationDate}
                  </div>
                </div>
              ))}
            </Section>
          )}

          {formData.certifications?.length > 0 && (
            <Section title="Certifications">
              {formData.certifications.map((cert, idx) => (
                <div key={idx} className="text-sm mb-2">
                  {cert.name}
                </div>
              ))}
            </Section>
          )}
        </div>

        {/* Right Column */}
        <div>
          {formData.summary && (
            <Section title="Professional Summary">
              <p className="text-sm leading-relaxed">{formData.summary}</p>
            </Section>
          )}

          {formData.experience?.length > 0 && (
            <Section title="Experience">
              {formData.experience.map((exp, idx) => (
                <div key={idx} className="mb-6">
                  <div className="flex justify-between text-sm font-semibold">
                    <span>
                      {exp.title} — {exp.company}
                    </span>
                    <span className="text-slate-500">
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm mt-2 whitespace-pre-line leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </Section>
          )}

          {formData.projects?.length > 0 && (
            <Section title="Projects">
              {formData.projects.map((proj, idx) => (
                <div key={idx} className="mb-5">
                  <div className="flex justify-between text-sm font-semibold">
                    <span>{proj.name}</span>
                    {proj.link && (
                      <a
                        href={proj.link}
                        className="text-blue-700 underline text-xs"
                      >
                        Link
                      </a>
                    )}
                  </div>
                  <p className="text-sm mt-1 whitespace-pre-line">
                    {proj.description}
                  </p>
                </div>
              ))}
            </Section>
          )}
        </div>
      </div>
    </div>
  );
};

export default TwoColumnATS;
