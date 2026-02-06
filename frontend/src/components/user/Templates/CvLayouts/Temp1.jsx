// App.jsx
import React from "react";

const skills = ["JavaScript", "React", "Node.js", "Tailwind CSS", "Python"];
const workExperience = [
  {
    title: "Senior Web Developer",
    company: "TechCorp Inc.",
    date: "Jan 2021 – Present",
    points: [
      "Developed and maintained web applications with React and Node.js.",
      "Optimized performance, improving load time by 40%.",
      "Led a team of 4 junior developers.",
    ],
  },
  {
    title: "Web Developer",
    company: "WebSolutions",
    date: "Jun 2018 – Dec 2020",
    points: [
      "Built responsive websites for clients using Tailwind CSS.",
      "Integrated REST APIs and improved data flow efficiency.",
    ],
  },
];

const education = [
  {
    degree: "B.Sc. in Computer Science",
    school: "University of Technology",
    date: "2014 – 2018",
  },
  {
    degree: "High School Diploma",
    school: "City High School",
    date: "2010 – 2014",
  },
];

const projects = [
  {
    title: "Portfolio Website",
    description:
      "Built a personal portfolio site using React and Tailwind CSS to showcase projects and skills.",
  },
  {
    title: "E-commerce Platform",
    description:
      "Developed a full-stack e-commerce platform with Node.js, Express, and MongoDB with a responsive frontend.",
  },
];

const certifications = [
  "Certified React Developer – 2022",
  "Full-Stack Web Development – 2021",
];

function App() {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Page 1 */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg my-6 p-10 rounded-lg">
        {/* Header */}
        <div className="flex items-center space-x-6">
          <img
            src={ProfilePhoto}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gray-300"
          />
          <div>
            <h1 className="text-4xl font-bold text-gray-800">John Doe</h1>
            <p className="text-gray-600 mt-2">
              Software Engineer | Web Developer | Tech Enthusiast
            </p>
            <div className="flex space-x-4 mt-2 text-gray-500 text-sm">
              <span>📧 john.doe@email.com</span>
              <span>📞 +123 456 7890</span>
              <span>🌐 www.johndoe.com</span>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Summary */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Summary</h2>
          <p className="text-gray-600 leading-relaxed">
            Experienced software engineer with 5+ years of expertise in web
            development, building scalable applications, and implementing
            cutting-edge solutions. Passionate about clean code and intuitive
            UI/UX design.
          </p>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Work Experience */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Work Experience
          </h2>
          {workExperience.map((job) => (
            <div key={job.title} className="mb-4">
              <h3 className="text-xl font-semibold text-gray-700">
                {job.title}
              </h3>
              <p className="text-gray-500 text-sm">
                {job.company} | {job.date}
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-1">
                {job.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Page 2 */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg my-6 p-10 rounded-lg">
        {/* Education */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.degree} className="mb-4">
              <h3 className="text-xl font-semibold text-gray-700">
                {edu.degree}
              </h3>
              <p className="text-gray-500 text-sm">
                {edu.school} | {edu.date}
              </p>
            </div>
          ))}
        </div>

        {/* Projects */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Projects
          </h2>
          {projects.map((proj) => (
            <div key={proj.title} className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                {proj.title}
              </h3>
              <p className="text-gray-600 text-sm">{proj.description}</p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Certifications
          </h2>
          <ul className="list-disc list-inside text-gray-600">
            {certifications.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
        </div>

        {/* Hobbies */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Hobbies & Interests
          </h2>
          <p className="text-gray-600">
            Open-source contribution, hiking, photography, and tech blogging.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
