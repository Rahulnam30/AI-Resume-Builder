import ATSUpload from "./ATSUpload";
import "./ATSChecker.css";
import UserNavBar from "../UserNavBar/UserNavBar";
import { Upload, Eye, FileText, CheckCircle, ChevronDown } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ATSChecker = ({ onSidebarToggle }) => {
  const fileInputRef = useRef(null);
  const [isMobilePreviewExpanded, setIsMobilePreviewExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File uploaded:", file.name);
      // Logic for file processing can be added here
    }
  };

  return (
    <div className="ats-checker-page user-page">
      {/* NAVBAR */}
      <UserNavBar
        onMenuClick={onSidebarToggle || (() => console.log("Toggle sidebar"))}
      />

      {/* MAIN CONTENT */}
      <div className="min-h-screen bg-white">
        {/* HEADER */}
        <div className="flex flex-row gap-4 mb-5 p-4 max-w-7xl mx-auto justify-between items-center">
          <div className="flex flex-col">
            <h1 className="font-['Outfit'] text-2xl font-bold text-slate-800 select-none">
              ATS Checker
            </h1>
            <p className="text-slate-500 mt-1 text-sm">
              Optimize your resume for applicant tracking systems.
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              hidden
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
            <button
              className="flex gap-2 text-white cursor-pointer bg-black border-0 rounded-lg text-sm transition-all duration-200 select-none hover:bg-black/80 py-2 px-5 md:py-2.5 md:px-5"
              onClick={() => fileInputRef.current.click()}
            >
              <Upload size={18} />
              <span className="hidden md:inline">Upload</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row min-h-full w-full max-w-7xl mx-auto p-4 gap-6">
          {/* DOCUMENT PREVIEW SECTION */}
          <div className="w-full md:w-2/3 flex flex-col gap-4">
            {/* Mobile Preview Bar (Matches image) - Visible ONLY on mobile */}
            <div
              className="md:hidden flex items-center justify-between px-4 py-4 border border-slate-200 rounded-xl shadow-sm bg-white cursor-pointer select-none transition-all active:bg-slate-50"
              onClick={() => setIsMobilePreviewExpanded(!isMobilePreviewExpanded)}
            >
              <div className="flex items-center gap-3">
                <FileText className="text-slate-700" size={20} />
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-800">Document Preview</span>
                  <span className="text-xs text-slate-400 font-normal">- John Doe (Sidebar)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Eye className={`text-slate-400 transition-colors ${isMobilePreviewExpanded ? "text-blue-600" : ""}`} size={20} />
                <ChevronDown className={`text-slate-400 transition-transform duration-300 ${isMobilePreviewExpanded ? "rotate-180" : ""}`} size={16} />
              </div>
            </div>

            {/* PREVIEW CONTAINER WITH ANIMATION */}
            <AnimatePresence initial={false}>
              {(isMobilePreviewExpanded || !isMobile) && (
                <motion.div
                  initial={isMobile ? { height: 0, opacity: 0, marginTop: 0 } : false}
                  animate={{
                    height: "auto",
                    opacity: 1,
                    marginTop: isMobile && isMobilePreviewExpanded ? 16 : 0
                  }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="bg-slate-200 rounded-xl p-4 md:p-8 overflow-y-auto flex flex-col items-center border border-slate-300"
                >
                  <div className="w-full max-w-2xl md:flex hidden justify-between items-center mb-4 px-2">
                    <h3 className="text-sm font-semibold text-slate-600">
                      Document Preview
                    </h3>
                  </div>

                  <div className="resume-page bg-white w-full max-w-2xl p-8 lg:p-12 text-slate-800 text-sm leading-relaxed relative">
                    <div className="border-b-2 border-slate-800 pb-4 mb-6 text-center">
                      <h1 className="text-xl md:text-3xl font-bold mb-2 uppercase tracking-tight">John Doe</h1>
                      <p className="text-slate-600 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs font-medium">
                        <span className="whitespace-nowrap">New York, NY</span>
                        <span className="hidden md:inline">|</span>
                        <span className="whitespace-nowrap">john.doe@email.com</span>
                        <span className="hidden md:inline">|</span>
                        <span className="whitespace-nowrap">(555) 000-1234</span>
                        <span className="hidden md:inline">|</span>
                        <span className="whitespace-nowrap">linkedin.com/in/johndoe</span>
                      </p>
                    </div>

                    <Section title="Professional Summary">
                      Versatile Software Engineer with 5+ years of experience specializing in full-stack development and cloud architecture. Proven track record of delivering scalable web applications and optimizing system performance by 30%. Passionate about building robust, user-centric solutions using modern technologies.
                    </Section>

                    <Section title="Professional Experience">
                      <div className="mb-4">
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-bold text-slate-800">Senior Software Engineer | TechSolutions Inc.</h3>
                          <span className="text-xs text-slate-500 italic">Jan 2021 – Present</span>
                        </div>
                        <ul className="list-disc ml-4 space-y-1 text-slate-600">
                          <li>Led the migration of legacy monolithic architecture to <mark>microservices</mark>, improving system scalability and reducing downtime by 15%.</li>
                          <li>Developed and maintained high-traffic web applications using <mark>React, Node.js, and PostgreSQL</mark>.</li>
                          <li>Implemented CI/CD pipelines using GitHub Actions, reducing deployment time from 1 hour to 10 minutes.</li>
                          <li>Mentored a team of 5 junior developers, conducting regular code reviews and providing technical guidance.</li>
                        </ul>
                      </div>

                      <div>
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-bold text-slate-800">Full Stack Developer | Innovate Softwares</h3>
                          <span className="text-xs text-slate-500 italic">Jun 2018 – Dec 2020</span>
                        </div>
                        <ul className="list-disc ml-4 space-y-1 text-slate-600">
                          <li>Designed and implemented responsive user interfaces using <mark>Tailwind CSS and Redux</mark> for state management.</li>
                          <li>Collaborated with cross-functional teams to define project requirements and deliver high-quality software solutions.</li>
                          <li>Optimized database queries and API endpoints, resulting in a 20% improvement in application load times.</li>
                        </ul>
                      </div>
                    </Section>

                    <Section title="Key Projects">
                      <div className="mb-3">
                        <h3 className="font-bold text-slate-800 decoration-slate-300 underline underline-offset-2">E-commerce Platform Redesign</h3>
                        <p className="text-slate-600 mt-1">Built a scalable e-commerce platform using Next.js and Stripe API, supporting 50k+ monthly active users and processing $1M+ in transactions.</p>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 decoration-slate-300 underline underline-offset-2">AI-Powered Resume Builder</h3>
                        <p className="text-slate-600 mt-1">Developed an AI-driven tool to help users create ATS-optimized resumes, utilizing OpenAI GPT-4 for content generation and analysis.</p>
                      </div>
                    </Section>

                    <Section title="Technical Skills">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-slate-600">
                        <div><span className="font-semibold text-slate-700">Languages:</span> JavaScript (ES6+), TypeScript, Python, SQL</div>
                        <div><span className="font-semibold text-slate-700">Frontend:</span> React, Next.js, Redux, Tailwind CSS, HTML5/CSS3</div>
                        <div><span className="font-semibold text-slate-700">Backend:</span> Node.js, Express, Django, FastAPI</div>
                        <div><span className="font-semibold text-slate-700">Cloud & DevOps:</span> AWS (S3, EC2, Lambda), Docker, Jenkins, Git</div>
                      </div>
                    </Section>

                    <Section title="Education">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-slate-800">Bachelor of Science in Computer Science</h3>
                        <span className="text-xs text-slate-500 italic">Graduated May 2018</span>
                      </div>
                      <p className="text-slate-600">University of Technology, San Francisco, CA</p>
                    </Section>

                    <Section title="Certifications">
                      <ul className="list-disc ml-4 text-slate-600">
                        <li>AWS Certified Solutions Architect – Associate</li>
                        <li>Meta Front-End Developer Professional Certificate</li>
                      </ul>
                    </Section>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* LEFT: CONTROLS */}
          <div className="w-full md:w-1/3 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-lg">Analysis Results</h2>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded uppercase">
                  Match Found
                </span>
              </div>

              {/* SCORE */}
              <div className="flex items-center gap-4 mb-8 bg-slate-50 p-4 rounded-lg border">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="3"
                      strokeDasharray="85,100"
                    />
                  </svg>
                  <span className="absolute text-xl font-bold">8.5</span>
                </div>

                <div>
                  <p className="text-sm uppercase text-slate-500 font-semibold">
                    ATS Score
                  </p>
                  <p className="text-2xl font-bold">
                    8.5 <span className="text-base text-slate-400">/ 10</span>
                  </p>
                  <p className="text-xs text-green-600 font-medium">
                    Excellent match potential
                  </p>
                </div>
              </div>

              <Constraint ok title="File Format Compatibility" />
              <Constraint ok title="Contact Information" />
              <Constraint warn title="Keyword Density" />
              <Constraint ok title="Section Headings" />
              <Constraint title="Measurable Results" />
            </div>
          </div>
        </div>

        <footer className="footer mt-12 p-4 text-center text-xs text-slate-400">
          © 2023 ResumeAI Inc. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default ATSChecker;

/* ---------- SMALL COMPONENTS ---------- */

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

function Constraint({ title, ok, warn }) {
  const bg = ok
    ? "bg-green-50 border-green-100"
    : warn
      ? "bg-amber-50 border-amber-100"
      : "bg-red-50 border-red-100";

  return (
    <div className={`p-3 rounded-lg border ${bg} mb-2`}>
      <p className="text-sm font-medium text-slate-800">{title}</p>
    </div>
  );
}
