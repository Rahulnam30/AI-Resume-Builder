import ATSUpload from "./ATSUpload";
import "./ATSChecker.css";
import UserNavBar from "../UserNavBar/UserNavBar";

const ATSChecker = ({ onSidebarToggle }) => {
  return (
    <div className="ats-checker-page user-page">
      {/* NAVBAR (from old code – preserved) */}
      <UserNavBar
        onMenuClick={onSidebarToggle || (() => console.log("Toggle sidebar"))}
      />

      {/* MAIN CONTENT (new code starts here) */}
     <div className="min-h-screen bg-white">

        {/* HEADER */}
        <div className="w-full p-4 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-800">
            ATS Checker
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Optimize your resume for applicant tracking systems.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row min-h-full w-full max-w-7xl mx-auto p-4 gap-6">
          {/* RIGHT: DOCUMENT PREVIEW */}
          <div className="w-full lg:w-2/3 bg-slate-200 rounded-xl p-4 lg:p-8 overflow-y-auto flex flex-col items-center border border-slate-300">
            <div className="w-full max-w-2xl flex justify-between items-center mb-4 px-2">
              <h3 className="text-sm font-semibold text-slate-600">
                Document Preview
              </h3>
            </div>

            <div className="resume-page bg-white w-full max-w-2xl p-8 lg:p-12 text-slate-800 text-sm leading-relaxed relative">
              <div className="border-b border-slate-200 pb-6 mb-6">
                <h1 className="text-3xl font-bold mb-2">Alex Morgan</h1>
                <p className="text-slate-500 flex gap-4 text-xs">
                  <span>San Francisco, CA</span> •
                  <span>alex.morgan@example.com</span> •
                  <span>(555) 123-4567</span>
                </p>
              </div>

              <Section title="Professional Summary">
                Senior Product Designer with 6+ years of experience in building
                user-centric digital products. Improved engagement by 40%.
              </Section>

              <Section title="Experience">
                <ul className="list-disc ml-4 space-y-1">
                  <li>
                    Led SaaS redesign resulting in <mark>25% increase</mark> in
                    retention.
                  </li>
                  <li>Managed 4 junior designers.</li>
                  <li>Built design systems with React & Tailwind.</li>
                </ul>
              </Section>

              <Section title="Education">
                Bachelor of Fine Arts, Interaction Design — 2017
              </Section>

              <Section title="Skills">
                <div className="flex flex-wrap gap-2">
                  {["Figma", "Adobe CC", "HTML/CSS", "User Research", "Agile"].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-slate-100 rounded text-xs"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </Section>
            </div>
          </div>

          {/* LEFT: CONTROLS */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <ATSUpload />

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
