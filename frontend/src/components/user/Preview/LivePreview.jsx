import {
  FileText,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Mail,
  Phone,
  MapPin,
  Globe,
  Eye,
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import {
  getTemplateComponent,
  getTemplateCSS,
} from "../Templates/TemplateRegistry";
import { forwardRef, useImperativeHandle } from "react";
import axios from "axios";
function formatMonthYear(value) {
  if (!value) return "";
  const [year, month] = value.split("-");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[Number(month) - 1]}-${year}`;
}

function Section({ title, children }) {
  return (
    <section className="mb-6">
      <h2 className="text-xs font-bold uppercase tracking-wider text-blue-800 border-b mb-2">
        {title}
      </h2>
      <div className="text-slate-600 text-xs">{children}</div>
    </section>
  );
}

const LivePreview = forwardRef((props, ref) => {
  const { formData, currentTemplate, isExpanded, onExpand, onCollapse } = props;

  const [zoom, setZoom] = useState(1);
  const [isMobileView, setIsMobileView] = useState(false);

  // This is to handle mobile preview toggle.
  const [isMobilePreviewHidden, setIsMobilePreviewHidden] = useState(false);
  useEffect(() => {
    const checkScreen = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    setIsMobilePreviewHidden(!isMobileView);
  }, [isMobileView]);

  function clamp() {
    if (!isMobileView) return;
    setIsMobilePreviewHidden((prev) => !prev);
  }

  const zoomIn = () => setZoom((z) => Math.min(z + 0.1, 2));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.5));
  const resetZoom = () => setZoom(1);

  const resume_doc = useRef(null);
  const getResumeHTML = () => {
    if (!resume_doc.current) {
      console.error("Resume DOM not found");
      return "";
    }
    const resumeHTML = resume_doc.current.outerHTML;
    const TemplateComponentCSSPath = getTemplateCSS(
      currentTemplate?.id || currentTemplate,
    );
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>resume</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
            }
            ${TemplateComponentCSSPath}
          </style>
        </head>
        <body>
            ${resumeHTML}
        </body>
      </html>
    `;
  };

  useImperativeHandle(ref, () => ({
    getResumeHTML,
  }));

  const {
    fullName,
    email,
    phone,
    location,
    linkedin,
    website,
    summary,
    experience = [],
    education = [],
    skills = {},
    projects = [],
    certifications = [],
  } = formData;

  const PreviewContent = () => {
    const TemplateComponent = getTemplateComponent(
      currentTemplate?.id || currentTemplate,
    );

    if (TemplateComponent) {
      return <TemplateComponent data={formData} />;
    }

    // Default Layout
    return (
      <div className="mt-10 mb-4 w-[90%]">
        <div
          className="bg-white p-8 lg:p-12 text-slate-800 text-sm leading-relaxed relative shadow-lg"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
          }}
        >
          <div className="w-[90%] max-w-[694px] min-h-screen">
            <div className="pb-6">
              {fullName && (
                <h1 className="text-3xl font-semibold text-gray-900 mb-1 tracking-tight">
                  {fullName}
                </h1>
              )}
              <div className="text-slate-500 flex flex-wrap gap-3 text-xs mt-2 break-all">
                {location && (
                  <span className="flex gap-1 items-center">
                    <MapPin size={14} /> {location}
                  </span>
                )}
                {email && (
                  <span className="flex gap-1 items-center break-all">
                    <Mail size={14} /> {email}
                  </span>
                )}
                {phone && (
                  <span className="flex gap-1 items-center">
                    <Phone size={14} /> {phone}
                  </span>
                )}
                {linkedin && (
                  <span className="flex gap-1 items-center break-all">
                    <FaLinkedin /> {linkedin}
                  </span>
                )}
                {website && (
                  <span className="flex gap-1 items-center break-all">
                    <Globe size={14} /> {website}
                  </span>
                )}
              </div>

              {(fullName ||
                email ||
                phone ||
                location ||
                linkedin ||
                website) && <hr className="text-slate-200 mt-4" />}
            </div>

            {summary && (
              <Section title="Professional Summary">
                <p className="break-words overflow-wrap-anywhere">{summary}</p>
              </Section>
            )}

            {education?.some(
              (edu) =>
                edu.school ||
                edu.degree ||
                edu.gpa ||
                edu.startDate ||
                edu.graduationDate ||
                edu.location,
            ) && (
              <Section title="Education">
                {education.map(
                  (edu) =>
                    (edu?.degree ||
                      edu?.startDate ||
                      edu?.graduationDate ||
                      edu?.school ||
                      edu?.gpa) && (
                      <div
                        key={edu?.id}
                        className="border-l-2 border-slate-200 pl-4 mb-2"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <h3 className="font-medium text-slate-900">
                            {edu?.degree}
                          </h3>
                          {edu?.startDate && edu?.graduationDate && (
                            <span className="text-sm text-slate-500">
                              {formatMonthYear(edu?.startDate)} -{" "}
                              {formatMonthYear(edu?.graduationDate)}
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-slate-600">{edu?.school}</p>

                        {edu?.gpa && (
                          <p className="text-sm text-slate-500">
                            GPA: {edu?.gpa} / 10.0
                          </p>
                        )}
                      </div>
                    ),
                )}
              </Section>
            )}

            {experience?.some(
              (exp) =>
                exp.title ||
                exp.company ||
                exp.description ||
                exp.startDate ||
                exp.endDate ||
                exp.location,
            ) && (
              <Section title="Experience">
                {experience.map(
                  (exp) =>
                    (exp?.title ||
                      exp?.company ||
                      exp?.startDate ||
                      exp?.endDate ||
                      exp?.description) && (
                      <div key={exp?.id}>
                        <div className="mb-6">
                          <div className="flex justify-between items-start mb-1">
                            <div>
                              <h3 className="text-sm font-semibold text-slate-900">
                                {exp?.title}
                              </h3>
                              <p className="text-xs text-slate-500">
                                {exp?.company}
                              </p>
                            </div>
                            <span className="text-xs text-slate-500 whitespace-nowrap">
                              {formatMonthYear(exp?.startDate)} -{" "}
                              {!/[a-zA-Z]/.test(exp?.endDate)
                                ? formatMonthYear(exp?.endDate)
                                : exp?.endDate}
                            </span>
                          </div>
                          <p className="mt-2 break-words">{exp.description}</p>
                        </div>
                      </div>
                    ),
                )}
              </Section>
            )}

            {projects?.some(
              (project) =>
                project.name ||
                project.description ||
                project.technologies ||
                project?.link?.github ||
                project?.link?.liveLink ||
                project?.link?.other,
            ) && (
              <Section title="Projects">
                {projects.map(
                  (prj) =>
                    (prj?.name ||
                      prj?.link?.github ||
                      prj?.link?.liveLink ||
                      prj?.link?.other ||
                      prj?.technologies ||
                      prj?.description) && (
                      <div key={prj?.id} className="space-y-4">
                        {/* Project Item */}
                        <div className="space-y-1">
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="font-bold text-slate-900">
                              {prj?.name}
                            </h3>

                            <div className="flex gap-2">
                              {prj?.link?.github && (
                                <a
                                  href={prj?.link?.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-slate-500 hover:text-slate-900 underline whitespace-nowrap"
                                >
                                  GitHub
                                </a>
                              )}
                              {prj?.link?.liveLink && (
                                <a
                                  href={prj?.link?.liveLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-slate-500 hover:text-slate-900 underline whitespace-nowrap"
                                >
                                  Live
                                </a>
                              )}
                              {prj?.link?.other && (
                                <a
                                  href={prj?.link?.other}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-slate-500 hover:text-slate-900 underline whitespace-nowrap"
                                >
                                  Other
                                </a>
                              )}
                            </div>
                          </div>

                          <p className="text-xs text-slate-600">
                            {prj?.technologies}
                          </p>

                          <p className="text-sm text-slate-700 leading-relaxed">
                            {prj?.description}
                          </p>
                        </div>
                      </div>
                    ),
                )}
              </Section>
            )}

            {certifications?.some(
              (cert) => cert.name || cert.issuer || cert.date || cert.link,
            ) && (
              <Section title="Certifications">
                <section className="space-y-4">
                  {certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="flex items-start justify-between gap-4"
                    >
                      <div>
                        <h3 className="text-sm font-medium text-slate-900">
                          {cert.name}
                        </h3>

                        <p className="text-sm text-slate-600">{cert.issuer}</p>

                        <p className="text-sm text-slate-500">{cert.date}</p>
                      </div>

                      {cert.link && (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-slate-500 hover:text-slate-900 underline whitespace-nowrap"
                        >
                          Credential
                        </a>
                      )}
                    </div>
                  ))}
                </section>
              </Section>
            )}

            {(skills?.technical.length !== 0 || skills?.soft.length !== 0) && (
              <Section title="Skills">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="font-bold text-sm">Technical Skills:</span>
                  <div className="flex gap-2">
                    {skills?.technical.length !== 0 &&
                      skills?.technical.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-slate-100 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                  </div>
                </div>
                <div className="flex flex-nowrap gap-2 items-start mt-2">
                  <span className="font-bold text-sm whitespace-nowrap">
                    Soft Skills:
                  </span>
                  <div className="flex gap-2 flex-wrap w-[85%]">
                    {skills?.soft.length !== 0 &&
                      skills?.soft.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-slate-100 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                  </div>
                </div>
              </Section>
            )}
          </div>
        </div>
      </div>
    );
  };

  /* FULLSCREEN MODE */
  if (isExpanded) {
    return (
      <div className="fixed inset-0 z-[99] bg-black/40 backdrop-blur-md flex items-center justify-center">
        <div className="bg-slate-200 w-full max-w-[90%] md:max-w-[70%] max-h-[95vh] rounded-xl shadow-lg flex flex-col">
          <div className="bg-white rounded-t-xl flex items-center justify-between px-4 py-4 border-b">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <FileText size={16} />{" "}
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-left">
                <span className="font-normal text-xs md:text-sm">
                  Live Preview
                </span>{" "}
                {currentTemplate?.name && (
                  <span className="text-slate-500 font-normal text-xs md:text-sm">
                    - {currentTemplate.name}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={zoomOut}>
                <ZoomOut size={16} />
              </button>
              <span className="text-sm font-medium">
                {Math.round(zoom * 100)}%
              </span>
              <button onClick={zoomIn}>
                <ZoomIn size={16} />
              </button>
              <button onClick={resetZoom}>
                <RotateCcw size={16} />
              </button>
              <button
                onClick={() => {
                  onCollapse();
                  setZoom(1);
                }}
              >
                <Minimize2 size={16} />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            <div
              className="w-[90%] max-w-[694px] h-[525px] mx-auto m-6"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "top center",
              }}
            >
              <PreviewContent />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* NORMAL MODE */
  return (
    <div className="w-[90%] border rounded-xl shadow-sm mr-4 m-2">
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        onClick={clamp}
      >
        <div className="flex items-center gap-2 font-semibold md:text-sm text-xs select-none">
          <FileText size={16} />
          <span className="font-medium">Live Preview</span>{" "}
          {currentTemplate?.name && (
            <span className="text-slate-500 font-normal">
              - {currentTemplate.name}
            </span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onExpand();
          }}
        >
          <Eye size={20} className="block md:hidden" />
          <Maximize2 size={16} className="hidden md:block" />
        </button>
      </div>

      <div
        className="bg-slate-200 overflow-y-hidden md:p-4 rounded-b-xl transition-all duration-300"
        style={{
          height: isMobilePreviewHidden
            ? isMobileView
              ? "530px"
              : "auto"
            : "0",
        }}
      >
        <div className="md:overflow-auto overflow-y-hidden flex">
          <div
            ref={resume_doc}
            className=" h-full overflow-hidden md:scale-y-100 scale-y-[0.9] origin-top-left"
          >
            <PreviewContent />
          </div>
        </div>
      </div>
    </div>
  );
});

export default LivePreview;
