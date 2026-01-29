import React from 'react';
import { Eye, Maximize2, Minimize2, FileText, Download, Upload } from 'lucide-react';
import '../Preview/LivePreview.css'; // Reuse existing styles for the resume content
const CVPreview = ({ formData, isMaximized, onToggleMaximize }) => {
    return (
        <div className={`cv-preview-section ${isMaximized ? 'maximized py-4' : ''}`}>
            {/* Centered container wrapper for the whole UI when maximized */}
            <div className={`flex flex-col h-full ${isMaximized ? 'max-w-4xl mx-auto w-full shadow-2xl rounded-2xl overflow-hidden' : ''}`}>
                {/* Header with Actions */}
                <div className="cv-preview-header">
                    <div className="cv-preview-title">
                        <Eye size={18} className="text-slate-500" />
                        <span className="text-sm font-semibold">Live Preview</span>
                    </div>
                    <div className="cv-preview-actions flex items-center gap-3">
                        {/* Only show Upload/Export when maximized */}
                        {isMaximized && (
                            <div className="flex items-center gap-2 mr-2">
                                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
                                    <Upload size={16} />
                                    Upload
                                </button>
                                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
                                    <FileText size={16} />
                                    Export
                                </button>
                            </div>
                        )}
                        <button
                            className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors border border-slate-200 rounded-lg hover:bg-slate-50"
                            onClick={onToggleMaximize}
                            title={isMaximized ? "Minimize" : "Maximize"}
                        >
                            {isMaximized ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                        </button>
                        <button
                            className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors border border-slate-200 rounded-lg hover:bg-slate-50"
                            title="Download PDF"
                        >
                            <Download size={18} />
                        </button>
                    </div>
                </div>
                {/* Contrasting Background Area - Symmetric margins */}
                <div className={`w-full h-full overflow-y-auto cv-preview-scroll-container relative ${isMaximized ? 'p-3 lg:p-4 bg-slate-300' : 'p-5 lg:p-8 bg-slate-200'}`}>
                    <div className="flex flex-col items-center w-full">
                        {/* Highlighted White Resume Paper */}
                        <div className={`bg-white w-full shadow-2xl border border-slate-300 p-12 lg:p-20 min-h-[1400px] max-w-[820px]`} style={{ fontFamily: '"Times New Roman", Times, serif', fontFeatureSettings: '"lnum" 1' }}>
                            {/* Header - Only show if there's any personal info */}
                            {(formData.fullName || formData.firstName || formData.lastName || formData.email || formData.phone || formData.location || formData.address || formData.city || formData.country || formData.linkedin || formData.github || formData.website) && (
                                <div className="text-center mb-10">
                                    {(formData.fullName || formData.firstName || formData.lastName) && (
                                        <h1 className="text-3xl font-bold text-slate-900 uppercase tracking-widest mb-1">
                                            {formData.fullName || `${formData.firstName || ''} ${formData.lastName || ''}`.trim()}
                                        </h1>
                                    )}
                                    <div className="text-sm text-slate-600 flex flex-wrap justify-center gap-2 items-center">
                                        {[
                                            formData.address,
                                            formData.location || `${formData.city || ''}${formData.city && formData.country ? ', ' : ''}${formData.country || ''}`,
                                            formData.email,
                                            formData.phone,
                                            formData.linkedin,
                                            formData.github,
                                            formData.website
                                        ].filter(Boolean).map((item, index, arr) => (
                                            <span key={index} className="flex items-center text-[11px]">
                                                {item}
                                                {index < arr.length - 1 && <span className="mx-2 text-slate-400">|</span>}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {/* EDUCATION - Only show if there's actual data */}
                            {formData.education && formData.education.some(edu => edu.school || edu.degree || edu.location || edu.graduationDate || edu.gpa) && (
                                <div className="mb-10">
                                    <h2 className="text-sm font-bold text-slate-900 uppercase border-b border-black mb-4 pb-0.5">
                                        EDUCATION
                                    </h2>
                                    {formData.education.filter(edu => edu.school || edu.degree || edu.location || edu.graduationDate || edu.gpa).map((edu, idx) => (
                                        <div key={idx} className="mb-5 last:mb-0">
                                            <div className="flex justify-between items-baseline">
                                                {edu.school && <h3 className="font-bold text-slate-900 text-base">{edu.school}</h3>}
                                                {edu.location && <span className="text-sm text-slate-900">{edu.location}</span>}
                                            </div>
                                            <div className="flex justify-between items-baseline mb-1">
                                                {edu.degree && <div className="italic text-slate-800 text-sm">{edu.degree}</div>}
                                                {edu.graduationDate && <span className="italic text-slate-800 text-sm">{edu.graduationDate}</span>}
                                            </div>
                                            {edu.gpa && <div className="text-sm text-slate-700">GPA: {edu.gpa}</div>}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {/* EXPERIENCE - Only show if there's actual data */}
                            {formData.experience && formData.experience.some(exp => exp.company || exp.title || exp.location || exp.startDate || exp.endDate || exp.description) && (
                                <div className="mb-10">
                                    <h2 className="text-sm font-bold text-slate-900 uppercase border-b border-black mb-4 pb-0.5">
                                        EXPERIENCE
                                    </h2>
                                    {formData.experience.filter(exp => exp.company || exp.title || exp.location || exp.startDate || exp.endDate || exp.description).map((exp, idx) => (
                                        <div key={idx} className="mb-5 last:mb-0">
                                            <div className="flex justify-between items-baseline">
                                                {exp.company && <h3 className="font-bold text-slate-900 text-base">{exp.company}</h3>}
                                                {exp.location && <span className="text-sm text-slate-900">{exp.location}</span>}
                                            </div>
                                            <div className="flex justify-between items-baseline mb-1">
                                                {exp.title && <div className="italic text-slate-800 text-sm">{exp.title}</div>}
                                                {(exp.startDate || exp.endDate) && (
                                                    <span className="italic text-slate-800 text-sm">{exp.startDate} – {exp.endDate}</span>
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
                            {/* PROJECTS - Only show if there's actual data */}
                            {formData.projects && formData.projects.some(project => project.name || project.description || project.technologies || project.link) && (
                                <div className="mb-10">
                                    <h2 className="text-sm font-bold text-slate-900 uppercase border-b border-black mb-4 pb-0.5">
                                        PROJECTS
                                    </h2>
                                    {formData.projects.filter(project => project.name || project.description || project.technologies || project.link).map((project, idx) => (
                                        <div key={idx} className="mb-5 last:mb-0">
                                            <div className="flex justify-between items-baseline">
                                                {project.name && <h3 className="font-bold text-slate-900 text-base">{project.name}</h3>}
                                                {project.link && (
                                                    <span className="text-sm text-slate-600">{project.link}</span>
                                                )}
                                            </div>
                                            {project.technologies && <div className="text-sm italic text-slate-700 mb-1">{project.technologies}</div>}
                                            {project.description && (
                                                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                                                    {project.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {/* SKILLS - Only show if there's actual data */}
                            {formData.skills && (formData.skills.technical?.length > 0 || formData.skills.soft?.length > 0) && (
                                <div className="mb-10">
                                    <h2 className="text-sm font-bold text-slate-900 uppercase border-b border-black mb-4 pb-0.5">
                                        SKILLS & INTERESTS
                                    </h2>
                                    <div className="text-sm text-slate-900">
                                        {formData.skills.technical?.length > 0 && (
                                            <div className="mb-2">
                                                <span className="font-bold">Technical: </span>
                                                {formData.skills.technical.join(', ')}
                                            </div>
                                        )}
                                        {formData.skills.soft?.length > 0 && (
                                            <div>
                                                <span className="font-bold">Soft Skills: </span>
                                                {formData.skills.soft.join(', ')}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                            {/* CERTIFICATIONS - Only show if there's actual data */}
                            {formData.certifications && formData.certifications.some(cert => cert.name || cert.issuer || cert.date) && (
                                <div className="mb-10">
                                    <h2 className="text-sm font-bold text-slate-900 uppercase border-b border-black mb-4 pb-0.5">
                                        CERTIFICATIONS
                                    </h2>
                                    {formData.certifications.filter(cert => cert.name || cert.issuer || cert.date).map((cert, idx) => (
                                        <div key={idx} className="mb-3 last:mb-0">
                                            <div className="flex justify-between items-baseline">
                                                {cert.name && <h3 className="font-bold text-slate-900 text-sm">{cert.name}</h3>}
                                                {cert.date && <span className="italic text-slate-800 text-sm">{cert.date}</span>}
                                            </div>
                                            {cert.issuer && <div className="text-sm text-slate-700">{cert.issuer}</div>}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CVPreview;
