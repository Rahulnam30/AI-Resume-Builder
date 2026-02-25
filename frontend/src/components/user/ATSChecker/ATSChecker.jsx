import "./ATSChecker.css";
import ATSUpload from "./ATSUpload";
import ATSPdfPreview from "./ATSPdfPreview";

import UserNavBar from "../UserNavBar/UserNavBar";
import { Upload, FileText, ChevronDown } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";
import '../../../styles/react-pdf/TextLayer.css';
import '../../../styles/react-pdf/AnnotationLayer.css';




pdfjs.GlobalWorkerOptions.workerSrc =
  new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();





const SESSION_KEY = "ats_preview_pdf";

const ATSChecker = ({ onSidebarToggle }) => {
  const fileInputRef = useRef(null);

  const [isMobilePreviewExpanded, setIsMobilePreviewExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [resumeText, setResumeText] = useState("");
 const [spellingErrors, setSpellingErrors] = useState([]);
 const [pronounErrors, setPronounErrors] = useState([]);

 const [activeError, setActiveError] = useState(null);
 const [numPages, setNumPages] = useState(null);
 const [pdfInstance, setPdfInstance] = useState(null);

  //animation state for score counting up
  const [animatedScore, setAnimatedScore] = useState(0);

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


// Revoke ONLY on component unmount
useEffect(() => {
  return () => {
    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
  };
}, []);


const applyHighlights = () => {
  const spans = document.querySelectorAll(
    ".react-pdf__Page__textContent span"
  );

  // Clear previous highlights
  spans.forEach(span => {
    span.style.background = "";
    span.style.borderBottom = "";
  });

  if (!activeError) return;

  // Filter spans matching the word
const matchingSpans = Array.from(spans).filter(span => {
  const clean = span.textContent?.toLowerCase().replace(/[^a-z]/g, "");
  const pageNumber = span.closest(".react-pdf__Page")?.getAttribute("data-page-number");
  return clean === activeError.word && Number(pageNumber) === activeError.page;
});
  if (!matchingSpans.length) return;

  // Pick the span corresponding to the nth occurrence
  const spanToHighlight = matchingSpans[activeError.index || 0];
if (["i", "we", "us", "our", "my"].includes(activeError.word)) {
  spanToHighlight.style.background = "#fff3cd";
  spanToHighlight.style.borderBottom = "3px solid #f59e0b";
} else {
  spanToHighlight.style.background = "yellow";
  spanToHighlight.style.borderBottom = "3px solid red";
}


  // Scroll exactly to it
  spanToHighlight.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
};

 useEffect(() => {
  applyHighlights();
}, [activeError]);


  /* ---------- MOBILE CHECK ---------- */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  


  useEffect(() => {
  console.log("RESUME TEXT:", resumeText);
}, [resumeText]);
  /* ---------- HANDLE WINDOW RESIZE ---------- */
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ---------- RESTORE AFTER REFRESH ---------- */
/* ---------- RESTORE AFTER REFRESH (FIXED) ---------- */
useEffect(() => {

  
  const savedPdf = sessionStorage.getItem(SESSION_KEY);

  // Prevent double load
  if (savedPdf && !previewUrl) {
    setUploadedFile({ name: "Uploaded Resume.pdf" });
    setPreviewUrl(savedPdf);
  }

  const savedAnalysis = sessionStorage.getItem("ats_analysis_result");
  if (savedAnalysis) {
    setAnalysisResult(JSON.parse(savedAnalysis));
  }
}, [previewUrl]);



useEffect(() => {
  const runSpellLocator = async () => {
    if (
      pdfInstance &&
      analysisResult?.misspelledWords?.length
    ) {
      const located = await buildErrorLocationsFromPdf(
        pdfInstance,
        analysisResult.misspelledWords
      );

      setSpellingErrors(located);
    }
  };

  runSpellLocator();
}, [pdfInstance, analysisResult]);




  /* ---------- DYNAMIC IFRAME HEIGHT ---------- */
  const getIframeHeight = () => {

    
       if (windowWidth <= 344) {
    return "50vh";
       }
       if (windowWidth > 344 && windowWidth <= 360) {
    return "60vh";
       }
       if ( windowWidth>360 && windowWidth <= 375) {
    return "70vh";
       }
      else  if ( windowWidth >375 && windowWidth <= 414) {
    return "58vh";
  } 
      else  if ( windowWidth >414 && windowWidth <= 430) {
    return "58vh";
  } 
  else if (windowWidth > 430 && windowWidth <= 540) {
    return "98vh";
  }
  else if (windowWidth > 540 && windowWidth <= 740) {
    return "70vh";
  }
  else if (windowWidth > 740 && windowWidth <= 768) {
    return "57vh";
  }
  else if (windowWidth > 768 && windowWidth <= 853) {
    return "50vh";
  }
  else if (windowWidth > 853 && windowWidth <= 912) {
    return "53vh";
  }
  else if (windowWidth > 912 && windowWidth <= 1024) {
    return "60vh";
  }
  else if (windowWidth > 1024 && windowWidth <= 1275) {
    return "179vh";
  }
  else if (windowWidth > 1270 && windowWidth <= 1280) {
    return "134vh";
  }
 
  return "80vh";
  };

  /* ---------- FILE UPLOAD ---------- */
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
 
    setUploadedFile(file);

    if (file.type === "application/pdf") {
    // Create browser-safe URL
const url = URL.createObjectURL(file);
setPreviewUrl(url);

// (Optional) store minimal flag instead of huge base64
sessionStorage.setItem(SESSION_KEY, url);



// ----- CALL ATS API -----
const formData = new FormData();
formData.append("resume", file);
formData.append("jobTitle", "Placeholder title");
formData.append("templateId", "63f1c4e2a3b4d5f678901234");
formData.append("resumeprofileId", "63f1c4e2a3b4d5f678901235");

try {
  const token = localStorage.getItem("token");

  const res = await fetch(
    "http://localhost:5000/api/resume/upload",
    {
      method: "POST",
      body: formData,
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const data = await res.json();

  if (data.success) {
    setAnalysisResult(data.data);
    
    const extractedText =
      data?.data?.text ||
      data?.text ||
      "";

    if (data.data.pronounAnalysis?.detected) {
      setPronounErrors(data.data.pronounAnalysis.detected);
    }

    setResumeText(extractedText);

    sessionStorage.setItem(
      "ats_analysis_result",
      JSON.stringify(data.data)
    );
  }

} catch (err) {
  console.error("ATS analysis failed", err);
}

    } else {
      setPreviewUrl(null);
      sessionStorage.removeItem(SESSION_KEY);
      setAnalysisResult(null);
      sessionStorage.removeItem("ats_analysis_result");
    }
  };

  // ---------- SPELL HIGHLIGHT ----------
const highlightText = () => {
  if (!resumeText) return null;

  return resumeText.split(/(\s+)/).map((token, i) => {
    const clean = token.toLowerCase().replace(/[^a-z]/g, "");

    if (clean && misspelled.includes(clean)) {
      return (
        <span
          key={i}
          style={{
            backgroundColor: "#ff4d4f",
            color: "white",
            fontWeight: "600",
            padding: "1px 3px",
            borderRadius: "3px"
          }}
        >
          {token}
        </span>
      );
    }

    return <span key={i}>{token}</span>;
  });
};



  // ---------- EXTRACT TEXT FROM EACH PDF PAGE ----------
const extractPageText = async (pdf) => {
  const pageMap = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    const text = content.items.map(item => item.str).join(" ");
    pageMap.push({ page: i, text });
  }

  return pageMap;
};


const locateErrorsByPage = (pages, errors) => {
  return errors.map(err => {
    const matchPage = pages.find(p =>
      p.text.toLowerCase().includes(err.word)
    );

    return {
      ...err,
      page: matchPage ? matchPage.page : 1
    };
  });
};




const buildErrorLocationsFromPdf = async (pdf, wrongWords) => {
  if (!pdf || !wrongWords?.length) return [];

  const errors = [];
  const wordCount = {};

  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const content = await page.getTextContent();

    const text = content.items.map(i => i.str).join(" ");
    const lines = text.split(/\s{2,}|\n/);

    lines.forEach((line, lineIndex) => {
      const tokens = line.split(/\s+/);

      tokens.forEach(token => {
        const clean = token.toLowerCase().replace(/[^a-z]/g, "");

        if (wrongWords.includes(clean)) {
          wordCount[clean] = (wordCount[clean] || 0) + 1;

          errors.push({
            word: clean,
            page: p,                      // ✅ REAL PAGE
            line: lineIndex + 1,
            index: wordCount[clean] - 1
          });
        }
      });
    });
  }

  return errors;
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
          

          {/* ATS ANALYSIS PANEL */}
          <div className="w-full md:w-1/3 flex flex-col gap-6 order-2 md:order-1">
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

              {analysisResult?.sectionScores?.map((section, index) => (
                <Constraint
                  key={index}
                  title={`${section.sectionName} (${section.score}/20)`}
                  ok={section.status === "ok"}
                  warn={section.status === "warn"}
                  suggestions={section.suggestions}
                />
              ))}



              {/* ===== SPELL CHECK DISPLAY ===== */}
              {spellingErrors.length > 0 && (
              <div className="mt-4 p-4 border rounded bg-slate-50 text-sm max-h-64 overflow-auto">
                <h3 className="font-semibold mb-2">
                  Spelling Errors (Word • Page • Line)
                </h3>

                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b font-semibold">
                      <th className="py-1">Word</th>
                      <th>Page</th>
                      <th>Line</th>
                    </tr>
                  </thead>

                  <tbody>
                    {spellingErrors.map((e, i) => (
                      <tr
              key={i}
              className="border-b cursor-pointer hover:bg-red-50"
              onClick={() => setActiveError(e)}
              >
            <td className="py-1 text-red-600 font-medium">{e.word}</td>
            <td>{e.page}</td>
            <td>{e.line}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

{/* ===== PRONOUN DETECTION ===== */}
{pronounErrors.length > 0 && (
  <div className="mt-4 p-4 border rounded bg-yellow-50 text-sm max-h-64 overflow-auto">
    <h3 className="font-semibold mb-2 text-yellow-700">
      Personal Pronouns Detected (Avoid in Resume)
    </h3>

    <table className="w-full text-left text-xs">
      <thead>
        <tr className="border-b font-semibold">
          <th className="py-1">Word</th>
          <th>Page</th>
          <th>Line</th>
        </tr>
      </thead>

      <tbody>
        {pronounErrors.map((e, i) => (
          <tr
            key={i}
            className="border-b cursor-pointer hover:bg-yellow-100"
            onClick={() => setActiveError(e)}
          >
            <td className="py-1 text-yellow-700 font-medium">
              {e.word}
            </td>
            <td>{e.page}</td>
            <td>{e.line}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}


            </div>
          </div>
  {/* PREVIEW SECTION */}
<div className="w-full md:w-2/3 flex flex-col gap-4 order-1 md:order-2">
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
                  className="rounded-xl border border-slate-300 bg-white h-[90vh] flex flex-col overflow-hidden">
                  
                  {previewUrl && (
                    <div className="w-full h-full">
                      <ATSPdfPreview 
                      pdfUrl={previewUrl} 
                        
                        onLoadSuccess={(pdf) => {
                        setNumPages(pdf.numPages);
                        setPdfInstance(pdf);   // ✅ store pdf
                        }}
                        />
                      </div>
                    )}
                 



                  {/* DEMO RESUME (FIRST VISIT ONLY) */}                  
                  {!uploadedFile && (
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

                  {/* NON-PDF FILE */}
                  {uploadedFile && !previewUrl && (
                    <div className="bg-white p-10 rounded-lg text-center">
                      <p className="font-semibold">{uploadedFile.name}</p>
                      <p className="text-sm text-slate-500 mt-2">
                        Preview not available for this file type
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
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

function Constraint({ title, ok, warn, suggestions }) {
  const bg = ok
    ? "bg-green-50 border-green-100"
    : warn
    ? "bg-amber-50 border-amber-100"
    : "bg-red-50 border-red-100";

    {!ok && suggestions?.length > 0 && (
  <ul className="text-xs text-slate-600 mt-1 list-disc ml-4">
    {suggestions.map((s, i) => (
      <li key={i}>{s}</li>
    ))}
  </ul>
)}

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