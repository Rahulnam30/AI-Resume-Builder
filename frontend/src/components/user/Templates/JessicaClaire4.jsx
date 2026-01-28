
import React from 'react';
import './JessicaClaire4.css';

const JessicaClaire4 = ({ data }) => {
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

    const technicalSkills = skills?.technical || [];
    const softSkills = skills?.soft || [];
    const allSkills = [...technicalSkills, ...softSkills];

    return (
        <div className="jessica-claire-4">
            <div className="parentContainer">

                {/* Left Box: Name, Summary, Experience */}
                <div className="leftBox">
                    <div className="section nameSec">
                        <div className="name">
                            <span>{fullName}</span>
                        </div>
                    </div>

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

                    {experience.length > 0 && (
                        <div className="section">
                            <div className="heading">
                                <div className="sectiontitle">Work History</div>
                            </div>
                            {experience.map((job, index) => (
                                <div key={index} className="paragraph">
                                    <span className="paddedline">
                                        <span className="txtBold">{job.company}</span> - <span className="txtBold">{job.title}</span>
                                    </span>
                                    <span className="paddedline txtItl">
                                        <span>{job.location}</span>
                                    </span>
                                    <span className="paddedline txtItl">
                                        <span>{job.startDate} - {job.endDate || "Current"}</span>
                                    </span>
                                    <div style={{ marginTop: '12px' }}>
                                        <p>{job.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {projects.length > 0 && (
                        <div className="section">
                            <div className="heading">
                                <div className="sectiontitle">Projects</div>
                            </div>
                            {projects.map((proj, index) => (
                                <div key={index} className="paragraph">
                                    <span className="paddedline txtBold">{proj.name}</span>
                                    <span className="paddedline txtItl">{proj.technologies}</span>
                                    <div style={{ marginTop: '5px' }}>
                                        <p>{proj.description}</p>
                                    </div>
                                    <div style={{ marginTop: '5px', fontSize: '10px' }}>
                                        {proj.link?.liveLink && <a href={proj.link.liveLink} style={{ marginRight: '10px' }}>Live</a>}
                                        {proj.link?.github && <a href={proj.link.github}>GitHub</a>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Box: Contact, Skills, Education */}
                <div className="rightBox">
                    <div className="section cntcSec">
                        <div className="address">
                            {location && <div>{location}</div>}
                            {phone && <div>{phone}</div>}
                            {email && <div>{email}</div>}
                            {linkedin && <div>{linkedin}</div>}
                            {website && <div>{website}</div>}
                        </div>
                    </div>

                    {allSkills.length > 0 && (
                        <div className="section">
                            <div className="heading">
                                <div className="sectiontitle">Skills</div>
                            </div>
                            <div className="paragraph">
                                <ul>
                                    {allSkills.map((skill, i) => <li key={i}>{skill}</li>)}
                                </ul>
                            </div>
                        </div>
                    )}

                    {education.length > 0 && (
                        <div className="section">
                            <div className="heading">
                                <div className="sectiontitle">Education</div>
                            </div>
                            {education.map((edu, index) => (
                                <div key={index} className="paragraph">
                                    <span className="paddedline txtItl">{edu.graduationDate ? edu.graduationDate.split('/').pop() : ''}</span>
                                    <span className="paddedline txtBold">{edu.school}</span>
                                    <span className="paddedline">{edu.location}</span>
                                    <span className="paddedline" style={{ marginTop: '6px' }}>
                                        <span className="txtBold">{edu.degree}</span>: {edu.subject}
                                    </span>
                                    {edu.gpa && <span className="paddedline">GPA: {edu.gpa}</span>}
                                </div>
                            ))}
                        </div>
                    )}

                    {certifications.length > 0 && (
                        <div className="section">
                            <div className="heading">
                                <div className="sectiontitle">Certifications</div>
                            </div>
                            {certifications.map((cert, index) => (
                                <div key={index} className="paragraph">
                                    <span className="paddedline txtBold">{cert.name}</span>
                                    <span className="paddedline">{cert.issuer}</span>
                                    <span className="paddedline txtItl">{cert.date}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default JessicaClaire4;
