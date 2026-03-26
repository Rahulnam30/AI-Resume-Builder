import React from 'react';
import './JessicaClaire.css';
import SocialLinks from "../CV/components/SocialLinks";
import { formatMailto, formatTel } from './socialUtils';

const JessicaClaire = ({ data }) => {
    const {
        fullName = "Jessica Claire",
        summary = "Highly motivated Sales Associate...",
        email = "resumesample@example.com",
        phone = "(555) 432-1000",
        location = "San Francisco, CA",
        linkedin = "",
        website = "",
        extraLinks = [],
        education = [],
        experience = [],
        skills = [],
        languages = [],
        awards = []
    } = data;

    return (
        <div className="jessica-claire">
            <header className="header">
                <h1 className="name">{fullName}</h1>
                <div className="contact-info">
                    <span><a href={formatMailto(email)}>{email}</a></span>
                    <span><a href={formatTel(phone)}>{phone}</a></span>
                    <span>{location}</span>
                </div>
                <SocialLinks 
                    formData={{ linkedin, website, extraLinks }}
                />
            </header>
            
            <section className="summary">
                <h2>Professional Summary</h2>
                <p>{summary}</p>
            </section>

            {experience.length > 0 && (
                <section className="experience">
                    <h2>Experience</h2>
                    {experience.map((exp, index) => (
                        <div key={index} className="experience-item">
                            <h3>{exp.position}</h3>
                            <h4>{exp.company}</h4>
                            <p className="date">{exp.startDate} - {exp.endDate}</p>
                            <p>{exp.description}</p>
                        </div>
                    ))}
                </section>
            )}

            {education.length > 0 && (
                <section className="education">
                    <h2>Education</h2>
                    {education.map((edu, index) => (
                        <div key={index} className="education-item">
                            <h3>{edu.degree}</h3>
                            <h4>{edu.school}</h4>
                            <p className="date">{edu.year}</p>
                        </div>
                    ))}
                </section>
            )}

            {skills.length > 0 && (
                <section className="skills">
                    <h2>Skills</h2>
                    <ul>
                        {skills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                </section>
            )}

            {languages.length > 0 && (
                <section className="languages">
                    <h2>Languages</h2>
                    <ul>
                        {languages.map((lang, index) => (
                            <li key={index}>{lang}</li>
                        ))}
                    </ul>
                </section>
            )}

            {awards.length > 0 && (
                <section className="awards">
                    <h2>Awards</h2>
                    <ul>
                        {awards.map((award, index) => (
                            <li key={index}>{award}</li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
};

export default JessicaClaire;
