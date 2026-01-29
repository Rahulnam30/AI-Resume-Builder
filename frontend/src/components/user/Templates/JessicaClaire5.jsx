
import React from 'react';
import './JessicaClaire5.css';

const JessicaClaire5 = ({ data }) => {
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
    // 2 columns implementation
    const halfSkill = Math.ceil(allSkills.length / 2);
    const skillsCol1 = allSkills.slice(0, halfSkill);
    const skillsCol2 = allSkills.slice(halfSkill);

    return (
        <div className="jessica-claire-5">
            <div className="topSection">
                <div className="cntcSec">
                    <div className="address">
                        <span>
                            {location} {location && <span>{/*Zip handled in loc*/}</span>}
                        </span>
                        {phone && (
                            <span>
                                <span className="sprtr">|</span>
                                {phone}
                            </span>
                        )}
                        {email && (
                            <span>
                                <span className="sprtr">|</span>
                                {email}
                            </span>
                        )}
                        {linkedin && (
                            <span>
                                <span className="sprtr">|</span>
                                <a href={linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="parentContainer">
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
                        <div className="singlecolumn">
                            <p>{summary}</p>
                        </div>
                    </div>
                )}

                {allSkills.length > 0 && (
                    <div className="section">
                        <div className="heading">
                            <div className="sectiontitle">Skills</div>
                        </div>
                        <div className="singlecolumn">
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '50%' }}>
                                    <ul>
                                        {skillsCol1.map((skill, i) => <li key={i}>{skill}</li>)}
                                    </ul>
                                </div>
                                <div style={{ width: '50%' }}>
                                    <ul>
                                        {skillsCol2.map((skill, i) => <li key={i}>{skill}</li>)}
                                    </ul>
                                </div>
                            </div>
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
                                <div className="singlecolumn">
                                    <span className="dispBlk">
                                        <span className="txtBold txtCaps">{job.title}</span>, <span>{job.startDate} to {job.endDate || "Current"}</span>
                                    </span>
                                    <span className="dispBlk">
                                        <span className="txtBold">{job.company}</span>, <span>{job.location}</span>
                                    </span>
                                    <div style={{ marginTop: '5px' }}>
                                        <p>{job.description}</p>
                                    </div>
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
                                <div className="singlecolumn">
                                    <span className="dispBlk txtBold">{proj.name}</span>
                                    <span className="dispBlk txtItl">{proj.technologies}</span>
                                    <div style={{ marginTop: '5px' }}>
                                        <p>{proj.description}</p>
                                    </div>
                                    <div style={{ marginTop: '5px', fontSize: '10px' }}>
                                        {proj.link?.liveLink && <a href={proj.link.liveLink} style={{ marginRight: '10px' }}>Live</a>}
                                        {proj.link?.github && <a href={proj.link.github}>GitHub</a>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {education.length > 0 && (
                    <div className="section">
                        <div className="heading">
                            <div className="sectiontitle">Education</div>
                        </div>
                        {education.map((edu, index) => (
                            <div key={index} className="paragraph">
                                <div className="singlecolumn">
                                    <span className="dispBlk">
                                        <span className="txtBold">{edu.school}</span>, <span>{edu.location}</span>
                                    </span>
                                    <span className="dispBlk">
                                        <span className="txtBold">{edu.degree}</span>{edu.subject && <span>, {edu.subject}</span>}, <span>{edu.graduationDate}</span>
                                    </span>
                                    {edu.gpa && <span className="dispBlk">GPA: {edu.gpa}</span>}
                                </div>
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
                                <div className="singlecolumn">
                                    <span className="dispBlk txtBold">{cert.name}</span>
                                    <span className="dispBlk">{cert.issuer}, {cert.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default JessicaClaire5;
