import ATSPdfPreview from "./ATSPdfPreview";
import UserNavBar from "../UserNavBar/UserNavBar";
import {
  Upload,
  FileText,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Loader2,
  Sparkles,
  ShieldCheck,
  ScanText,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const SESSION_KEY = "ats_preview_pdf";

export default function ATSChecker({ onSidebarToggle }) {
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  const [isMobilePreviewExpanded, setIsMobilePreviewExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [spellingErrors, setSpellingErrors] = useState([]);
  const [pronounErrors, setPronounErrors] = useState([]);
  const [activeError, setActiveError] = useState(null);
  const [pdfInstance, setPdfInstance] = useState(null);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (analysisResult?.overallScore >= 0) {
      let n = 0;
      const end = Number(analysisResult.overallScore);
      const step = end / (1000 / 15);
      const t = setInterval(() => {
        n += step;
        if (n >= end) {
          n = end;
          clearInterval(t);
        }
        setAnimatedScore(Math.floor(n));
      }, 15);
      return () => clearInterval(t);
    }
  }, [analysisResult]);

  useEffect(
    () => () => {
      if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    },
    [],
  );

  useEffect(() => {
    if (!pdfInstance || !analysisResult?.misspelledWords?.length) return;
    buildErrorLocationsFromPdf(
      pdfInstance,
      analysisResult.misspelledWords,
    ).then(setSpellingErrors);
  }, [pdfInstance, analysisResult]);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  useEffect(() => {
    const spans = document.querySelectorAll(
      ".react-pdf__Page__textContent span",
    );
    spans.forEach((s) => {
      s.style.background = "";
      s.style.borderBottom = "";
    });
    if (!activeError) return;
    const match = Array.from(spans).filter((s) => {
      const clean = s.textContent?.toLowerCase().replace(/[^a-z]/g, "");
      const page = s
        .closest(".react-pdf__Page")
        ?.getAttribute("data-page-number");
      return clean === activeError.word && Number(page) === activeError.page;
    })[activeError.index || 0];
    if (!match) return;
    const isPronoun = ["i", "we", "us", "our", "my"].includes(activeError.word);
    match.style.background = isPronoun ? "#fef3c7" : "#fef9c3";
    match.style.borderBottom = isPronoun
      ? "2px solid #f59e0b"
      : "2px solid #ef4444";
    match.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activeError]);

  const processFile = async (file) => {
    if (!file) return;
    setUploadedFile(file);
    if (file.type !== "application/pdf") {
      setPreviewUrl(null);
      setAnalysisResult(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobTitle", "Placeholder title");
    formData.append("templateId", "63f1c4e2a3b4d5f678901234");
    formData.append("resumeprofileId", "63f1c4e2a3b4d5f678901235");
    try {
      setIsLoading(true);
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/resume/upload", {
        method: "POST",
        body: formData,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      if (data.success) {
        setAnalysisResult(data.data);
        if (data.data.pronounAnalysis?.detected)
          setPronounErrors(data.data.pronounAnalysis.detected);
      }
    } catch (e) {
      console.error("ATS failed", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => processFile(e.target.files?.[0]);
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    if (!dropZoneRef.current?.contains(e.relatedTarget)) setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processFile(e.dataTransfer.files[0]);
  };

  useEffect(() => {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem("ats_analysis_result");
  }, []);

  const sc = (s) =>
    s >= 70 ? "text-emerald-500" : s >= 50 ? "text-amber-500" : "text-red-500";
  const sr = (s) => (s >= 70 ? "#10b981" : s >= 50 ? "#f59e0b" : "#ef4444");
  const sl = (s) =>
    s >= 70 ? "ATS Friendly" : s >= 50 ? "Needs Work" : "Poor Match";
  const sb = (s) =>
    s >= 70
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : s >= 50
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-red-50 text-red-600 border-red-200";

  return (
    <div className="min-h-screen bg-stone-50">
      <UserNavBar onMenuClick={onSidebarToggle || (() => {})} />

      {/* ── Page header ── */}
      <div className="max-w-7xl mx-auto px-5 pt-8 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            ATS Checker
          </h1>
          <p className="text-sm text-zinc-400 mt-0.5">
            Optimize your resume for applicant tracking systems
          </p>
        </div>
        <button
          onClick={() => fileInputRef.current.click()}
          className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors duration-150"
        >
          <Upload size={15} />
          Upload Resume
          <input
            type="file"
            ref={fileInputRef}
            hidden
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
        </button>
      </div>

      {/* ── Main layout ── */}
      <div className="max-w-7xl mx-auto px-5 pb-12 flex flex-col md:flex-row gap-5">
        {/* ══ LEFT PANEL ══ */}
        <div className="w-full md:w-80 lg:w-96 shrink-0 flex flex-col gap-4">
          <div className="flex items-center justify-between h-5">
            <p className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
              Analysis Results
            </p>
            {analysisResult && (
              <span
                className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border ${sb(animatedScore)}`}
              >
                {sl(animatedScore)}
              </span>
            )}
          </div>

          {/* Score card */}
          {(analysisResult || isLoading) && (
            <div className="bg-white border border-zinc-200 rounded-2xl p-5">
              {isLoading ? (
                <div className="flex items-center gap-3 text-sm text-zinc-400 py-1">
                  <Loader2 size={18} className="animate-spin text-indigo-500" />
                  Analyzing your resume…
                </div>
              ) : (
                <div className="flex items-center gap-5">
                  <div className="relative w-20 h-20 shrink-0">
                    <svg
                      viewBox="0 0 36 36"
                      className="w-full h-full -rotate-90"
                    >
                      <path
                        d="M18 2.0845 a15.9155 15.9155 0 0 1 0 31.831 a15.9155 15.9155 0 0 1 0-31.831"
                        fill="none"
                        stroke="#f3f4f6"
                        strokeWidth="2.8"
                      />
                      <path
                        d="M18 2.0845 a15.9155 15.9155 0 0 1 0 31.831 a15.9155 15.9155 0 0 1 0-31.831"
                        fill="none"
                        stroke={sr(animatedScore)}
                        strokeWidth="2.8"
                        strokeDasharray="100"
                        strokeDashoffset={100 - animatedScore}
                        strokeLinecap="round"
                        style={{
                          transition: "stroke-dashoffset 1s ease, stroke 0.4s",
                        }}
                      />
                    </svg>
                    <span
                      className={`absolute inset-0 flex items-center justify-center text-lg font-bold font-mono ${sc(animatedScore)}`}
                    >
                      {animatedScore}
                    </span>
                  </div>
                  <div>
                    <p className="text-3xl font-bold font-mono text-zinc-900 leading-none">
                      {animatedScore}
                      <span className="text-base font-normal text-zinc-400">
                        {" "}
                        /100
                      </span>
                    </p>
                    <span
                      className={`inline-block mt-2 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border ${sb(animatedScore)}`}
                    >
                      {sl(animatedScore)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Empty left panel — compact upload CTA + feature hints ── */}
          {!analysisResult && !isLoading && (
            <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
              {/* Mini upload row */}
              <button
                onClick={() => fileInputRef.current.click()}
                className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-zinc-50 transition-colors duration-150 group border-b border-zinc-100"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors">
                  <Upload size={14} className="text-indigo-500" />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-xs font-semibold text-zinc-700">
                    Upload your resume
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    PDF, DOC, DOCX · max 5 MB
                  </p>
                </div>
              </button>

              {/* Feature hints */}
              <div className="px-4 py-3.5 flex flex-col gap-3">
                <p className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
                  What you'll get
                </p>
                {[
                  {
                    icon: (
                      <ShieldCheck size={13} className="text-emerald-500" />
                    ),
                    bg: "bg-emerald-50",
                    label: "ATS compatibility score",
                    desc: "See how well you'll pass filters",
                  },
                  {
                    icon: <ScanText size={13} className="text-indigo-500" />,
                    bg: "bg-indigo-50",
                    label: "Section-by-section breakdown",
                    desc: "Find weak spots instantly",
                  },
                  {
                    icon: <Sparkles size={13} className="text-amber-500" />,
                    bg: "bg-amber-50",
                    label: "Spelling & pronoun check",
                    desc: "Catch errors before recruiters do",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div
                      className={`w-6 h-6 rounded-md ${item.bg} flex items-center justify-center shrink-0 mt-0.5`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-zinc-700 leading-tight">
                        {item.label}
                      </p>
                      <p className="text-[11px] text-zinc-400 leading-tight mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section scores */}
          {analysisResult?.sectionScores?.length > 0 && (
            <div className="bg-white border border-zinc-200 rounded-2xl p-5">
              <p className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase mb-4">
                Section Breakdown
              </p>
              <div className="flex flex-col gap-4">
                {analysisResult.sectionScores.map((s, i) => (
                  <SectionRow key={i} section={s} delay={i * 0.06} />
                ))}
              </div>
            </div>
          )}

          {spellingErrors.length > 0 && (
            <ErrorTable
              title="Spelling Errors"
              icon={<AlertCircle size={13} />}
              variant="red"
              errors={spellingErrors}
              activeError={activeError}
              onSelect={setActiveError}
            />
          )}
          {pronounErrors.length > 0 && (
            <ErrorTable
              title="Personal Pronouns"
              subtitle="Avoid in resumes"
              icon={<AlertTriangle size={13} />}
              variant="amber"
              errors={pronounErrors}
              activeError={activeError}
              onSelect={setActiveError}
            />
          )}
        </div>

        {/* ══ RIGHT PANEL ══ */}
        <div className="flex-1 min-w-0 flex flex-col">
          <button
            className="md:hidden flex items-center justify-between w-full px-4 py-3.5 mb-3 bg-white border border-zinc-200 rounded-xl text-sm font-medium text-zinc-700"
            onClick={() => setIsMobilePreviewExpanded((p) => !p)}
          >
            <span className="flex items-center gap-2.5">
              <FileText size={16} />
              Document Preview
            </span>
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${isMobilePreviewExpanded ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence initial={false}>
            {(isMobilePreviewExpanded || !isMobile) && (
              <motion.div
                initial={isMobile ? { height: 0, opacity: 0 } : false}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex-1"
              >
                {previewUrl ? (
                  <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden h-[85%]">
                    <ATSPdfPreview
                      pdfUrl={previewUrl}
                      onLoadSuccess={(pdf) => setPdfInstance(pdf)}
                    />
                  </div>
                ) : (
                  /* ══ EMPTY DROP ZONE ══ */
                  <div
                    ref={dropZoneRef}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current.click()}
                    className={`
                      relative h-[88vh] rounded-2xl border-2 border-dashed cursor-pointer
                      flex flex-col items-center justify-center overflow-hidden
                      transition-all duration-300 select-none group
                      ${isDragging ? "border-indigo-400 bg-indigo-50/50" : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50/50"}
                    `}
                  >
                    {/* Dot-grid background */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage: `radial-gradient(circle, #d4d4d8 1px, transparent 1px)`,
                        backgroundSize: "28px 28px",
                        opacity: isDragging ? 0.25 : 0.4,
                        transition: "opacity 0.3s",
                      }}
                    />

                    {/* Soft glow on drag */}
                    <AnimatePresence>
                      {isDragging && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.6 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="absolute w-96 h-96 rounded-full pointer-events-none"
                          style={{
                            background:
                              "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
                          }}
                        />
                      )}
                    </AnimatePresence>

                    <div className="relative z-10 flex flex-col items-center gap-6 px-8 text-center max-w-md">
                      {/* Floating icon */}
                      <motion.div
                        animate={
                          isDragging
                            ? { y: -10, scale: 1.1, rotate: -3 }
                            : { y: 0, scale: 1, rotate: 0 }
                        }
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 18,
                        }}
                        className={`
                          w-24 h-24 rounded-3xl flex items-center justify-center
                          shadow-lg transition-colors duration-300 relative
                          ${isDragging ? "bg-indigo-500 text-white shadow-indigo-200" : "bg-white text-zinc-400 group-hover:text-zinc-500 shadow-zinc-200/80"}
                        `}
                      >
                        <Upload size={34} strokeWidth={1.4} />
                        <AnimatePresence>
                          {isDragging && (
                            <motion.span
                              initial={{ opacity: 0.6, scale: 1 }}
                              animate={{ opacity: 0, scale: 1.9 }}
                              exit={{ opacity: 0 }}
                              transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                ease: "easeOut",
                              }}
                              className="absolute inset-0 rounded-3xl border-2 border-indigo-400 pointer-events-none"
                            />
                          )}
                        </AnimatePresence>
                      </motion.div>

                      <div className="space-y-2">
                        <motion.p
                          animate={{ scale: isDragging ? 1.03 : 1 }}
                          transition={{ duration: 0.2 }}
                          className={`text-xl font-semibold tracking-tight transition-colors duration-200 ${isDragging ? "text-indigo-600" : "text-zinc-700"}`}
                        >
                          {isDragging
                            ? "Release to upload"
                            : "Drop your resume here"}
                        </motion.p>
                        <p
                          className={`text-sm transition-colors duration-200 ${isDragging ? "text-indigo-400" : "text-zinc-400"}`}
                        >
                          {isDragging
                            ? "We'll start analyzing it right away"
                            : "or click to browse your files"}
                        </p>
                      </div>

                      {/* Format chips */}
                      <motion.div
                        animate={{
                          opacity: isDragging ? 0 : 1,
                          y: isDragging ? 4 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2"
                      >
                        {["PDF", "DOC", "DOCX"].map((f) => (
                          <span
                            key={f}
                            className="text-[10px] font-bold tracking-widest uppercase text-zinc-400 bg-zinc-100 px-2.5 py-1 rounded-lg"
                          >
                            {f}
                          </span>
                        ))}
                        <span className="text-[11px] text-zinc-300">
                          · max 5 MB
                        </span>
                      </motion.div>

                      {/* Info cards — fade out on drag */}
                      <motion.div
                        animate={{
                          opacity: isDragging ? 0 : 1,
                          y: isDragging ? 6 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                        className="w-full flex flex-col gap-2.5"
                      >
                        {/* Tip */}
                        <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-left">
                          <AlertCircle
                            size={13}
                            className="text-amber-500 mt-0.5 shrink-0"
                          />
                          <p className="text-xs text-amber-700 leading-relaxed">
                            Use a{" "}
                            <span className="font-semibold">
                              text-based PDF
                            </span>{" "}
                            for best ATS results — scanned images won't be
                            parsed.
                          </p>
                        </div>

                        {/* What happens next */}
                        <div className="bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3.5 text-left">
                          <p className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase mb-3">
                            What happens next
                          </p>
                          <div className="flex flex-col gap-2.5">
                            {[
                              {
                                step: "1",
                                text: "Your resume is parsed and scored against ATS criteria",
                              },
                              {
                                step: "2",
                                text: "Each section gets an individual score with improvement tips",
                              },
                              {
                                step: "3",
                                text: "Spelling errors and personal pronouns are flagged for review",
                              },
                            ].map((item) => (
                              <div
                                key={item.step}
                                className="flex items-start gap-2.5"
                              >
                                <span className="w-4 h-4 rounded-full bg-zinc-200 text-zinc-500 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                  {item.step}
                                </span>
                                <p className="text-xs text-zinc-500 leading-relaxed">
                                  {item.text}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Corner decorations */}
                    <span
                      className={`absolute top-5 left-5 w-5 h-5 border-l-2 border-t-2 rounded-tl-lg transition-colors duration-300 ${isDragging ? "border-indigo-300" : "border-zinc-200"}`}
                    />
                    <span
                      className={`absolute top-5 right-5 w-5 h-5 border-r-2 border-t-2 rounded-tr-lg transition-colors duration-300 ${isDragging ? "border-indigo-300" : "border-zinc-200"}`}
                    />
                    <span
                      className={`absolute bottom-5 left-5 w-5 h-5 border-l-2 border-b-2 rounded-bl-lg transition-colors duration-300 ${isDragging ? "border-indigo-300" : "border-zinc-200"}`}
                    />
                    <span
                      className={`absolute bottom-5 right-5 w-5 h-5 border-r-2 border-b-2 rounded-br-lg transition-colors duration-300 ${isDragging ? "border-indigo-300" : "border-zinc-200"}`}
                    />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════ SECTION ROW ═══════════════════════ */
function SectionRow({ section, delay }) {
  const ok = section.status === "ok";
  const warn = section.status === "warn";
  const pct = Math.round((section.score / 20) * 100);
  const iconColor = ok
    ? "text-emerald-500"
    : warn
      ? "text-amber-500"
      : "text-red-500";
  const barColor = ok ? "bg-emerald-500" : warn ? "bg-amber-400" : "bg-red-500";
  const scoreColor = ok
    ? "text-emerald-600"
    : warn
      ? "text-amber-600"
      : "text-red-500";
  const Icon = ok ? CheckCircle2 : warn ? AlertTriangle : AlertCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="flex items-center gap-1.5 text-xs font-medium text-zinc-700">
          <Icon size={12} className={iconColor} />
          {section.sectionName}
        </span>
        <span className={`text-xs font-semibold font-mono ${scoreColor}`}>
          {section.score}/20
        </span>
      </div>
      <div className="h-1 bg-zinc-100 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${barColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ delay: delay + 0.1, duration: 0.7, ease: "easeOut" }}
        />
      </div>
      {section.suggestions?.length > 0 && (
        <ul className="mt-1.5 ml-4 list-disc space-y-0.5">
          {section.suggestions.map((s, i) => (
            <li key={i} className="text-[11px] text-zinc-500 leading-relaxed">
              {s}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

/* ═══════════════════════ ERROR TABLE ═══════════════════════ */
function ErrorTable({
  title,
  subtitle,
  icon,
  variant,
  errors,
  activeError,
  onSelect,
}) {
  const v = {
    red: {
      wrap: "bg-red-50 border-red-100",
      header: "text-red-600",
      word: "text-red-600",
      hover: "hover:bg-red-100/60",
      active: "bg-red-100",
    },
    amber: {
      wrap: "bg-amber-50 border-amber-100",
      header: "text-amber-700",
      word: "text-amber-700",
      hover: "hover:bg-amber-100/60",
      active: "bg-amber-100",
    },
  }[variant];

  return (
    <div className={`border rounded-2xl overflow-hidden ${v.wrap}`}>
      <div
        className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b border-black/5 ${v.header}`}
      >
        {icon}
        <span>{title}</span>
        {subtitle && (
          <span className="font-normal opacity-60 text-[11px]">
            — {subtitle}
          </span>
        )}
      </div>
      <div className="max-h-52 overflow-y-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-black/5">
              <th className="text-left px-4 py-2 text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                Word
              </th>
              <th className="text-left px-2 py-2 text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                Pg
              </th>
              <th className="text-left px-2 py-2 text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                Ln
              </th>
            </tr>
          </thead>
          <tbody>
            {errors.map((e, i) => (
              <tr
                key={i}
                onClick={() => onSelect(e)}
                className={`cursor-pointer border-b border-black/[0.04] transition-colors last:border-0 ${activeError === e ? v.active : v.hover}`}
              >
                <td className={`px-4 py-2 font-semibold ${v.word}`}>
                  {e.word}
                </td>
                <td className="px-2 py-2 font-mono text-zinc-500">{e.page}</td>
                <td className="px-2 py-2 font-mono text-zinc-500">{e.line}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Utility ── */
async function buildErrorLocationsFromPdf(pdf, wrongWords) {
  if (!pdf || !wrongWords?.length) return [];
  const errors = [];
  const wc = {};
  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const content = await page.getTextContent();
    const text = content.items.map((i) => i.str).join(" ");
    text.split(/\s{2,}|\n/).forEach((line, li) => {
      line.split(/\s+/).forEach((token) => {
        const clean = token.toLowerCase().replace(/[^a-z]/g, "");
        if (wrongWords.includes(clean)) {
          wc[clean] = (wc[clean] || 0) + 1;
          errors.push({
            word: clean,
            page: p,
            line: li + 1,
            index: wc[clean] - 1,
          });
        }
      });
    });
  }
  return errors;
}
