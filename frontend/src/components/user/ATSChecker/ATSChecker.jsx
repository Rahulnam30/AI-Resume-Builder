import ATSUpload from "./ATSUpload";
import "./ATSChecker.css";
import UserNavBar from "../UserNavBar/UserNavBar";
import { Upload, FileText, ChevronDown } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";


const SESSION_KEY = "ats_preview_pdf";

const ATSChecker = ({ onSidebarToggle }) => {
  const fileInputRef = useRef(null);

  const [isMobilePreviewExpanded, setIsMobilePreviewExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [jobDescription, setJobDescription] = useState(""); // NEW STATE

  //animation state for score counting up
  const [animatedScore, setAnimatedScore] = useState(0);


  //responsive check for iframe height
  const [windowWidth, setWindowWidth] = useState(
  typeof window !== "undefined" ? window.innerWidth : 1024
);


  /* ---------- MOBILE CHECK ---------- */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

 
  /* ---------- WINDOW WIDTH TRACK ---------- */
useEffect(() => {
  const handleResize = () => setWindowWidth(window.innerWidth);
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


  /* ---------- RESTORE AFTER REFRESH ---------- */
  useEffect(() => {
    const savedPdf = sessionStorage.getItem(SESSION_KEY);
    if (savedPdf) {
      setUploadedFile({ name: "Uploaded Resume.pdf" });
      setPreviewUrl(savedPdf);
    }

    const savedAnalysis = sessionStorage.getItem("ats_analysis_result");
    if (savedAnalysis) {
      setAnalysisResult(JSON.parse(savedAnalysis));
    }

    //save the jd 
    const savedJD = sessionStorage.getItem("ats_jobDescription");
    if (savedJD) setJobDescription(savedJD);
    // console.log("JD value:", jobDescription);


  }, []);

  /* ---------- ANIMATE SCORE COUNTUP ---------- */
 useEffect(() => {
  if (analysisResult?.overallScore >= 0) {
    let start = 0;
    const end = Number(analysisResult.overallScore);
    const duration = 1000;
    const incrementTime = 15;
    const step = end / (duration / incrementTime);

    const counter = setInterval(() => {
      start += step;

      if (start >= end) {
        start = end;
        clearInterval(counter);
      }

      setAnimatedScore(Math.floor(start));
    }, incrementTime);

    return () => clearInterval(counter);
  }
}, [analysisResult]);


  /* ---------- DYNAMIC IFRAME HEIGHT ---------- */
const getIframeHeight = () => {
  if (windowWidth < 768) return "70vh";
  if (windowWidth < 1024) return "80vh";
  return "100vh";
};


  /* ---------- FILE UPLOAD ---------- */
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadedFile(file);

    if (file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = async () => {
        sessionStorage.setItem(SESSION_KEY, reader.result);
        setPreviewUrl(reader.result);

        // ----- CALL ATS API -----
        const formData = new FormData();
        formData.append("resume", file);
        formData.append("jobDescription", jobDescription || ""); // empty string if JD not entered
        formData.append("jobTitle", "Placeholder title");
        formData.append("templateId", "63f1c4e2a3b4d5f678901234");
        formData.append("resumeprofileId", "63f1c4e2a3b4d5f678901235");

        try {
          const token = localStorage.getItem("token");
          const res = await fetch("http://localhost:5000/api/resume/upload", {
            method: "POST",
            body: formData,
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          if (data.success) {
            setAnalysisResult(data.data);
            sessionStorage.setItem("ats_analysis_result", JSON.stringify(data.data));
          }
        } catch (err) {
          console.error("ATS analysis failed", err);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
      sessionStorage.removeItem(SESSION_KEY);
      setAnalysisResult(null);
      sessionStorage.removeItem("ats_analysis_result");
    }
    

  };

  return (
    <div className="ats-checker-page user-page">
      <UserNavBar
        onMenuClick={onSidebarToggle || (() => console.log("Toggle sidebar"))}
      />

      <div className="min-h-screen bg-white">
        {/* HEADER */}
        <div className="flex flex-row gap-4 mb-5 p-4 max-w-7xl mx-auto justify-between items-center">
          <div className="flex flex-col">
            <h1 className="font-['Outfit'] text-2xl font-bold text-slate-800">
              ATS Checker
            </h1>
            <p className="text-slate-500 mt-1 text-sm">
              Optimize your resume for applicant tracking systems.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto p-4 gap-6">
          {/* LEFT SIDE: PREVIEW */}
          <div className="w-full md:w-2/3 flex flex-col gap-4">
            <div
              className="md:hidden flex items-center justify-between px-4 py-4 border rounded-xl bg-white cursor-pointer"
              onClick={() =>
                setIsMobilePreviewExpanded(!isMobilePreviewExpanded)
              }
            >
              <div className="flex items-center gap-3">
                <FileText size={20} />
                <span className="text-sm font-semibold">
                  Document Preview
                </span>
              </div>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  isMobilePreviewExpanded ? "rotate-180" : ""
                }`}
              />
            </div>

            <AnimatePresence initial={false}>
              {(isMobilePreviewExpanded || !isMobile) && (
                <motion.div
                  initial={isMobile ? { height: 0, opacity: 0 } : false}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl border border-slate-300 bg-white min-h-0 md:min-h-[90vh]"
                >
                 {previewUrl && (
  <div
    className="w-full bg-white rounded-lg overflow-auto"
    style={{
      height: getIframeHeight(),
      position: "relative",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "auto",
      }}
    >
      <iframe
        src={`${previewUrl}#toolbar=0&navpanes=0&view=FitH`}
        title="Resume Preview"
        className="w-full h-full border-0"
      />
    </div>
  </div>
)}


                  {!previewUrl && (
                    <div className="resume-page bg-white w-full max-w-2xl p-8 lg:p-12 text-slate-800 mx-auto">
                      <h1 className="text-xl md:text-3xl font-bold mb-2 uppercase text-center">
                        John Doe
                      </h1>
                      <p className="text-slate-600 text-xs text-center mb-4">
                        New York, NY | john.doe@email.com | (555) 000-1234 |
                        linkedin.com/in/johndoe
                      </p>

                      <Section title="Professional Summary">
                        Versatile Software Engineer with 5+ years of experience
                        specializing in full-stack development and cloud
                        architecture.
                      </Section>

                      <Section title="Professional Experience">
                        <ul className="list-disc ml-4 space-y-1">
                          <li>Led migration to microservices</li>
                          <li>Built scalable React applications</li>
                        </ul>
                      </Section>

                      <Section title="Technical Skills">
                        JavaScript, React, Node.js, AWS
                      </Section>

                      <Section title="Education">
                        B.Sc. Computer Science
                      </Section>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE: ANALYSIS PANEL */}
          <div className="w-full md:w-1/3 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-lg">Analysis Results</h2>
                {analysisResult && (
                  <span
                    className={`px-2 py-1 text-xs font-bold rounded uppercase ${
                      analysisResult.overallScore >= 70
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {analysisResult.overallScore >= 70
                      ? "ATS Friendly"
                      : "Needs Improvement"}
                  </span>
                )}
              </div>

              {/* JOB DESCRIPTION INPUT */}
              <div className="mb-4 w-full">
                <label
                  htmlFor="jobDescription"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Job Description
                </label>
                <textarea
                  id="jobDescription"
                  value={jobDescription}
                  onChange={(e) =>{
                     setJobDescription(e.target.value); 
                     sessionStorage.setItem("ats_jobDescription", e.target.value);
                    }}
                  placeholder="Paste the job description here..."
                  className="w-full border border-slate-300 rounded-lg p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
              </div>

              {/* UPLOAD BUTTON */}
              <div className="flex justify-end mb-8">
                <input
                  type="file"
                  ref={fileInputRef}
                  hidden
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
                <button
                  className="flex gap-2 text-white bg-black rounded-lg text-sm hover:bg-black/80 py-2 px-5"
                  onClick={() => fileInputRef.current.click()}
                  disabled={false} // only require file, JD optional

                >
                  <Upload size={18} />
                  <span className="hidden md:inline">Upload</span>
                </button>
              </div>

              {/* SCORE */}
              <div className="flex items-center gap-4 mb-8 bg-slate-50 p-4 rounded-lg border">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
  {/* Background circle */}
  <path
    d="M18 2.0845
       a 15.9155 15.9155 0 0 1 0 31.831
       a 15.9155 15.9155 0 0 1 0 -31.831"
    fill="none"
    stroke="#e5e7eb"
    strokeWidth="3"
  />

  {/* Progress circle */}
  <path
    d="M18 2.0845
       a 15.9155 15.9155 0 0 1 0 31.831
       a 15.9155 15.9155 0 0 1 0 -31.831"
    fill="none"
    stroke="#2563eb"
    strokeWidth="3"
    strokeDasharray="100"
    strokeDashoffset={100 - animatedScore}
    style={{ transition: "stroke-dashoffset 1s ease" }}
  />
</svg>

                  <span className="absolute text-xl font-bold">
                    {analysisResult ? animatedScore : "-"}

                  </span>
                </div>

                <div>
                  <p className="text-sm uppercase text-slate-500 font-semibold">
                    ATS Score
                  </p>
                  <p className="text-2xl font-bold">
                    {analysisResult ? animatedScore : "-"}

                    <span className="text-base text-slate-400"> / 100</span>
                  </p>
                </div>
              </div>

              {analysisResult?.sectionScores?.map((section) => (
                <Constraint
                  // key={index}
                  key={section.sectionName}
                  title={`${section.sectionName} (${section.score}/20)`}
                  ok={section.status === "ok"}
                  warn={section.status === "warn"}
                 suggestions={section.suggestions} 
                />
              ))}
            </div>
          </div>
        </div>
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

function Constraint({ title, ok, warn , suggestions }) {
  const bg = ok
    ? "bg-green-100 border-green-300"
    : warn
    ? "bg-amber-100 border-amber-300"
    : "bg-red-100 border-red-300";

  return (
    <div className={`p-3 rounded-lg border ${bg} mb-2`}>
      <p className="text-sm font-medium text-slate-800">{title}</p>
      {suggestions && suggestions.length > 0 && (
        <ul className="text-xs text-slate-600 mt-1 list-disc ml-4">
          {suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      )}
    </div>
  );
}   