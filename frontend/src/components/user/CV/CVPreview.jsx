import React from 'react';
import { FileText, Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCcw, Mail, Phone, MapPin, Globe } from 'lucide-react';

const CVPreview = ({ formData = {}, isMaximized, onToggleMaximize, onMinimize }) => {
    const [zoom, setZoom] = React.useState(1);
const [isMobileView, setIsMobileView] = React.useState(false);
const [isMobilePreviewHidden, setIsMobilePreviewHidden] = React.useState(false);

React.useEffect(() => {
  const checkScreen = () => {
    setIsMobileView(window.innerWidth <= 768);
  };
  checkScreen();
  window.addEventListener("resize", checkScreen);
  return () => window.removeEventListener("resize", checkScreen);
}, []);

React.useEffect(() => {
  setIsMobilePreviewHidden(!isMobileView);
}, [isMobileView]);
const clamp = () => {
  if (!isMobileView) return;
  setIsMobilePreviewHidden((prev) => !prev);
};

    const zoomIn = () => setZoom((z) => Math.min(z + 0.1, 2));
    const zoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.5));
    const resetZoom = () => setZoom(1);

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

    function formatMonthYear(value) {
        if (!value) return "";
        const [year, month] = value.split("-");
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
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

    const CVContent = () => {
        return (
            <div className="w-full flex justify-center">
                <div
                    className="bg-white p-8 lg:p-12 text-slate-800 text-sm leading-relaxed relative shadow-lg w-[794px] min-h-[1123px]"
                    style={{
                        transform: `scale(${zoom})`,
                    }}
                >
                    <div className="w-full">
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
                                        {linkedin}
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
                                            exp?.description ||
                                            exp?.startDate ||
                                            exp?.endDate) && (
                                            <div
                                                key={exp?.id}
                                                className="border-l-2 border-slate-200 pl-4 mb-4"
                                            >
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                                    <div>
                                                        <h3 className="font-medium text-slate-900">
                                                            {exp?.title}
                                                        </h3>
                                                        <p className="text-sm text-slate-600">
                                                            {exp?.company}
                                                        </p>
                                                    </div>
                                                    {exp?.startDate && exp?.endDate && (
                                                        <span className="text-sm text-slate-500 whitespace-nowrap">
                                                            {formatMonthYear(exp?.startDate)} -{" "}
                                                            {formatMonthYear(exp?.endDate)}
                                                        </span>
                                                    )}
                                                </div>
                                                {exp?.location && (
                                                    <p className="text-sm text-slate-500">{exp?.location}</p>
                                                )}
                                                {exp?.description && (
                                                    <p className="text-sm text-slate-600 mt-2 whitespace-pre-line break-words">
                                                        {exp?.description}
                                                    </p>
                                                )}
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
                                project.link,
                        ) && (
                            <Section title="Projects">
                                {projects.map(
                                    (project) =>
                                        (project?.name ||
                                            project?.description ||
                                            project?.technologies) && (
                                            <div
                                                key={project?.id}
                                                className="border-l-2 border-slate-200 pl-4 mb-4"
                                            >
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                                    <h3 className="font-medium text-slate-900">
                                                        {project?.name}
                                                    </h3>
                                                    {project?.link && (
                                                        <a
                                                            href={project?.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-sm text-slate-500 hover:text-slate-900 underline whitespace-nowrap"
                                                        >
                                                            Link
                                                        </a>
                                                    )}
                                                </div>
                                                {project?.technologies && (
                                                    <p className="text-sm text-slate-600">
                                                        {project?.technologies}
                                                    </p>
                                                )}
                                                {project?.description && (
                                                    <p className="text-sm text-slate-600 mt-2 whitespace-pre-line break-words">
                                                        {project?.description}
                                                    </p>
                                                )}
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

                        {(skills?.technical?.length !== 0 || skills?.soft?.length !== 0) && (
                            <Section title="Skills">
                                <div className="flex flex-wrap gap-2 items-center">
                                    <span className="font-bold text-sm">Technical Skills:</span>
                                    <div className="flex gap-2">
                                        {skills?.technical?.length !== 0 &&
                                            skills?.technical?.map((skill) => (
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
                                        {skills?.soft?.length !== 0 &&
                                            skills?.soft?.map((skill) => (
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
    if (isMaximized) {
        return (
            <div className="fixed inset-0 z-[99] bg-black/40 flex items-center justify-center">
                <div className="bg-slate-200 w-full h-full max-w-[80%] max-h-[95vh] rounded-xl shadow-lg flex flex-col">
                    <div className="bg-white rounded-t-xl flex items-center justify-between px-4 py-4 border-b">
                        <h3 className="flex items-center gap-2 text-sm font-semibold">
                            <FileText size={16} /> Live Preview
                        </h3>

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
  onClick={(e) => {
    e.stopPropagation();
    onToggleMaximize();
  }}
>

                                <Minimize2 size={16} />
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-auto">
                        <div className="w-full max-w-[694px] mx-auto pb-6">
                            <CVContent />
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
    <h3 className="flex items-center gap-2 text-sm font-semibold">
                    <FileText size={16} /> Live Preview
                </h3>
                <button onClick={onToggleMaximize}>
                    <Maximize2 size={16} />
                </button>
            </div>

          <div
  className="md:overflow-auto overflow-y-hidden flex justify-center md:p-4 rounded-b-xl bg-slate-200 transition-all duration-300"
  style={{
    height: isMobilePreviewHidden
      ? isMobileView
        ? "500px"
        : "auto"
      : "0",
  }}
>
     <CVContent />
            </div>
        </div>
    );
};

export default CVPreview;
