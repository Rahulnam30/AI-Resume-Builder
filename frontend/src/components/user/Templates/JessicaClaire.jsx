
import React from 'react';
import './JessicaClaire.css';

const JessicaClaire = ({ data }) => {
    const {
        fullName = "Jessica Claire",
        summary = "Highly motivated Sales Associate...",
        email = "resumesample@example.com",
        phone = "(555) 432-1000",
        location = "San Francisco, CA",
        linkedin = "",
        website = "",
        experience = [],
        education = [],
        skills = { technical: [], soft: [] },
        projects = [],
        certifications = []
    } = data;

    // Helper to get initials
    const initials = fullName
        ? fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
        : "JC";

    return (
        <div className="jessica-claire-template">
            {/* Header Section */}
            <div className="firstsection">
                <div className="monogram">
                    <svg width="40px" height="40px">
                        <rect x="0" y="0" width="40" height="40" stroke="#ffffff" fill="none" strokeWidth="1"></rect>
                        <text textAnchor="middle" x="20" y="26" fill="#ffffff" fontSize="19" fontFamily="Georgia, serif">{initials}</text>
                    </svg>
                </div>
                <div className="name">
                    {fullName}
                </div>
            </div>

            <div className="parentContainer">
                {/* LEFT COLUMN */}
                <div className="left-box">
                    {/* Summary */}
                    {summary && (
                        <div className="section">
                            <div className="heading">
                                <div className="sectiontitle">Professional Summary</div>
                            </div>
                            <div className="paragraph">
                                <p>{summary}</p>
                            </div>
                        </div>
                    )}

                    {/* Work History */}
                    {experience.length > 0 && (
                        <div className="section">
                            <div className="heading">
                                <div className="sectiontitle">Work History</div>
                            </div>
                            {experience.map((job) => (
                                <div key={job.id} className="paragraph" style={{ marginBottom: '15px' }}>
                                    <span className="paddedline">
                                        <span className="txtBold">{job.company}</span>
                                        {job.company && job.title && <span> - </span>}
                                        <span className="txtBold">{job.title}</span>
                                    </span>
                                    <span className="paddedline">
                                        <span>{job.location}</span>
                                    </span>
                                    <span className="paddedline txtItl">
                                        <span>{job.startDate}</span>
                                        {(job.startDate || job.endDate) && <span> - </span>}
                                        <span>{job.endDate || "Current"}</span>
                                    </span>
                                    <div className="jobline">
                                        <p>{job.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Projects */}
                    {projects.length > 0 && (
                        <div className="section">
                            <div className="heading">
                                <div className="sectiontitle">Projects</div>
                            </div>
                            {projects.map((proj) => (
                                <div key={proj.id} className="paragraph" style={{ marginBottom: '15px' }}>
                                    <span className="paddedline">
                                        <span className="txtBold">{proj.name}</span>
                                    </span>
                                    {proj.technologies && (
                                        <span className="paddedline txtItl" style={{ fontSize: '9px' }}>
                                            Tech: {proj.technologies}
                                        </span>
                                    )}
                                    <div className="jobline">
                                        <p>{proj.description}</p>
                                    </div>
                                    {/* Links */}
                                    <div style={{ marginTop: '4px', fontSize: '9px' }}>
                                        {proj.link?.liveLink && (
                                            <div className="paddedline">
                                                <span className="txtBold">Live: </span>
                                                <a href={proj.link.liveLink} target="_blank" rel="noopener noreferrer">{proj.link.liveLink}</a>
                                            </div>
                                        )}
                                        {proj.link?.github && (
                                            <div className="paddedline">
                                                <span className="txtBold">GitHub: </span>
                                                <a href={proj.link.github} target="_blank" rel="noopener noreferrer">{proj.link.github}</a>
                                            </div>
                                        )}
                                        {proj.link?.other && (
                                            <div className="paddedline">
                                                <span className="txtBold">Other: </span>
                                                <a href={proj.link.other} target="_blank" rel="noopener noreferrer">{proj.link.other}</a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Certifications */}
                    {certifications.length > 0 && (
                        <div className="section">
                            <div className="heading">
                                <div className="sectiontitle">Certifications</div>
                            </div>
                            {certifications.map((cert) => (
                                <div key={cert.id} className="paragraph" style={{ marginBottom: '15px' }}>
                                    <span className="paddedline">
                                        <span className="txtBold">{cert.name}</span>
                                    </span>
                                    <span className="paddedline">
                                        <span>{cert.issuer}</span>
                                    </span>
                                    <span className="paddedline txtItl">
                                        <span>{cert.date}</span>
                                    </span>
                                    {cert.link && (
                                        <span className="paddedline" style={{ fontSize: '9px' }}>
                                            <a href={cert.link} target="_blank" rel="noopener noreferrer">Credential Link</a>
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                </div>

                {/* RIGHT COLUMN */}
                <div className="right-box">
                    {/* Contact */}
                    <div className="section" style={{ borderTop: 'none', paddingTop: 0 }}>
                        <div className="address">
                            <span className="paddedline">{email}</span>
                            <span className="paddedline">{phone}</span>
                            <span className="paddedline">{location}</span>
                            {linkedin && <span className="paddedline">{linkedin}</span>}
                            {website && <span className="paddedline">{website}</span>}
                        </div>
                    </div>

                    {/* Skills */}
                    {(skills.technical?.length > 0 || skills.soft?.length > 0) && (
                        <div className="section">
                            <div className="heading">
                                <div className="sectiontitle">Skills</div>
                            </div>
                            <div className="paragraph">
                                <ul>
                                    {skills.technical?.map((skill, index) => (
                                        <li key={`tech-${index}`}>{skill}</li>
                                    ))}
                                    {skills.soft?.map((skill, index) => (
                                        <li key={`soft-${index}`}>{skill}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <div className="section">
                            <div className="heading">
                                <div className="sectiontitle">Education</div>
                            </div>
                            {education.map((edu) => (
                                <div key={edu.id} className="paragraph" style={{ marginBottom: '10px' }}>
                                    <span className="paddedline txtBold">{edu.school}</span>
                                    <span className="paddedline">{edu.location}</span>
                                    <span className="paddedline">
                                        <span className="txtBold">{edu.degree}</span>
                                    </span>

                                    <span className="paddedline txtItl">
                                        <span>{edu.startDate}</span>
                                        {(edu.startDate || edu.graduationDate) && <span> - </span>}
                                        <span>{edu.graduationDate}</span>
                                    </span>

                                    {edu.gpa && (
                                        <span className="paddedline">
                                            <span>GPA: {edu.gpa}</span>
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JessicaClaire;
