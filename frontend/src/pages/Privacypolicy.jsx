import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import {
  FileSearch,
  ShieldCheck,
  Zap,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Search,
  Star,
  ChevronDown,
  Info,
  ArrowRight,
  Upload,
  FileText,
  Loader2,
  UploadCloud,
  X, // Added missing icon
  FileCheck, // Added missing icon
} from "lucide-react";
import UpToSkillsImg from "../assets/UptoSkills.webp";
import Footer from "../components/Footer";

const AIResumeChecker = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  // --- ADDED MISSING STATE ---
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- ADDED MISSING HANDLERS ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const removeFile = (e) => {
    e.preventDefault();
    setSelectedFile(null);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      alert(`🚀 Analysis Started for ${selectedFile.name}!`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-jakarta text-[#1a2e52]">
      <NavBar />
      {/* --- HERO SECTION: FULL WIDTH/HEIGHT --- */}
      <section className="relative min-h-[90vh] flex flex-col justify-center px-8 pt-20 pb-16 overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute top-0 right-0 w-1/2 h-full -translate-y-1/4 translate-x-1/4 opacity-30 bg-gradient-to-bl from-blue-100 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 -translate-x-1/2 rounded-full opacity-20 bg-blue-50 blur-3xl"></div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto">
          {/* TOP HEADING: CENTERED */}
          <div className="flex flex-col items-center mb-16 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-bold tracking-widest text-[#0077cc] uppercase bg-blue-50 rounded-full">
              <Zap size={14} className="fill-[#0077cc]" /> AI Analysis 2.0
            </span>
            <h1 className="mb-6 text-5xl font-extrabold leading-tight lg:text-7xl">
              Is your resume{" "}
              <span className="text-transparent bg-gradient-to-r from-[#0077cc] to-[#0056b3] bg-clip-text">
                ATS-Proof?
              </span>
            </h1>
            <p className="max-w-3xl text-xl leading-relaxed text-gray-500">
              Upload your resume and let our AI scan it for keywords, formatting
              errors, and impact scores. Get hired 3x faster with a data-driven
              resume.
            </p>
          </div>

          {/* LOWER SECTION */}
          <div className="grid items-start gap-12 lg:grid-cols-12">
            {/* LEFT PILLARS */}
            <div className="grid gap-6 lg:col-span-8 md:grid-cols-3">
              <div className="p-8 transition-all bg-white border border-gray-100 rounded-[2rem] hover:shadow-xl group">
                <div className="w-14 h-14 mb-6 bg-blue-50 text-[#0077cc] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Zap size={28} />
                </div>
                <h3 className="mb-3 text-xl font-bold">Instant Analysis</h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  Processes in under{" "}
                  <span className="text-[#0077cc] font-bold">5 seconds</span>.
                </p>
              </div>

              <div className="p-8 transition-all bg-white border border-gray-100 rounded-[2rem] hover:shadow-xl group">
                <div className="w-14 h-14 mb-6 bg-orange-50 text-[#e65100] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <FileSearch size={28} />
                </div>
                <h3 className="mb-3 text-xl font-bold">Shadow Scan</h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  Simulates{" "}
                  <span className="text-[#e65100] font-bold">
                    Fortune 500 ATS
                  </span>{" "}
                  logic.
                </p>
              </div>

              <div className="p-8 transition-all bg-white border border-gray-100 rounded-[2rem] hover:shadow-xl group">
                <div className="flex items-center justify-center mb-6 text-green-600 transition-transform duration-500 w-14 h-14 bg-green-50 rounded-2xl group-hover:scale-110">
                  <BarChart3 size={28} />
                </div>
                <h3 className="mb-3 text-xl font-bold">Skill Gap Map</h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  Find{" "}
                  <span className="font-bold text-green-600">
                    missing keywords
                  </span>
                  .
                </p>
              </div>
            </div>

            {/* RIGHT SIDE: UPLOAD FEATURE */}
            <div className="lg:col-span-4">
              <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-blue-500/10 blur-3xl"></div>

                <h3 className="flex items-center gap-2 mb-6 text-xl font-bold">
                  <UploadCloud size={20} className="text-[#0077cc]" /> Scan Now
                </h3>

                <form onSubmit={handleUpload} className="space-y-4">
                  {!selectedFile ? (
                    <label className="flex flex-col items-center justify-center w-full transition-all border-2 border-dashed cursor-pointer h-44 border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 hover:border-white/20 group">
                      <div className="flex flex-col items-center justify-center">
                        <Upload
                          className="mb-3 text-gray-400 transition-colors group-hover:text-white"
                          size={32}
                        />
                        <p className="text-sm font-medium">Drop Resume Here</p>
                        <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">
                          PDF, DOCX only
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.docx"
                        onChange={handleFileChange}
                      />
                    </label>
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full h-44 border-2 border-solid border-[#0077cc]/30 rounded-2xl bg-[#0077cc]/5 relative group">
                      <button
                        type="button" // Important: set type to button to prevent form submission
                        onClick={removeFile}
                        className="absolute p-1 transition-colors rounded-full top-2 right-2 bg-white/10 hover:bg-red-500/20 text-white/50 hover:text-red-400"
                      >
                        <X size={16} />
                      </button>
                      <FileCheck className="mb-2 text-[#0077cc]" size={40} />
                      <p className="text-sm font-bold text-white truncate max-w-[200px] px-4">
                        {selectedFile.name}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isUploading || !selectedFile}
                    className={`w-full py-4 font-bold text-white transition-all rounded-xl active:scale-95 shadow-lg flex items-center justify-center gap-2 
                      ${
                        !selectedFile
                          ? "bg-gray-700 cursor-not-allowed opacity-50"
                          : "bg-[#0077cc] hover:bg-[#0056b3] shadow-blue-900/20"
                      }`}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />{" "}
                        Analyzing...
                      </>
                    ) : (
                      <>
                        Start Free Scan <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={12} /> 100% Private
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 size={12} /> Encrypted
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS / ANALYSIS PREVIEW --- */}
      <section className="px-8 py-24 mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <h2 className="mb-8 text-4xl font-bold leading-tight">
              We check your resume against{" "}
              <span className="text-[#e65100]">100+ recruitment rules</span>
            </h2>
            <div className="space-y-6">
              {[
                {
                  icon: <Search className="text-blue-500" />,
                  title: "ATS Compatibility",
                  desc: "We ensure recruiters' software can actually read your text.",
                },
                {
                  icon: <BarChart3 className="text-orange-500" />,
                  title: "Impact Scoring",
                  desc: "Our AI evaluates the strength of your action verbs and achievements.",
                },
                {
                  icon: <ShieldCheck className="text-green-500" />,
                  title: "Keyword Optimization",
                  desc: "Get a list of missing keywords for specific job titles.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-5 p-6 transition-all bg-white border border-gray-100 rounded-3xl hover:shadow-md"
                >
                  <div className="shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="mb-1 font-bold">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative p-8 bg-slate-900 rounded-[3rem] text-white overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-blue-500/20 blur-3xl"></div>
            <div className="relative space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                  Analysis Report
                </span>
                <span className="px-3 py-1 text-xs font-bold text-green-400 border rounded-full border-green-400/30">
                  Passed ATS Scan
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-2xl bg-white/5 border-white/10">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="text-green-400" size={16} />{" "}
                    Contact Info
                  </span>
                  <span className="text-sm font-bold">10/10</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-2xl bg-white/5 border-white/10">
                  <span className="flex items-center gap-2">
                    <AlertCircle className="text-orange-400" size={16} />{" "}
                    Keyword Density
                  </span>
                  <span className="text-sm font-bold text-orange-400">
                    6/10
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-2xl bg-white/5 border-white/10">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="text-green-400" size={16} />{" "}
                    Formatting
                  </span>
                  <span className="text-sm font-bold">9/10</span>
                </div>
              </div>
              <div className="pt-6 text-center">
                <div className="text-5xl font-black text-[#0077cc] mb-2">
                  82%
                </div>
                <p className="text-sm font-medium tracking-wide text-gray-400">
                  Overall Resume Score
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BEFORE VS AFTER --- */}
      <section className="relative px-8 py-24 overflow-hidden text-white bg-slate-900">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">
              See the <span className="text-[#0077cc]">AI Difference</span>
            </h2>
            <p className="text-gray-400">
              How we transform a basic resume into a recruiter magnet.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 opacity-70">
              <h4 className="flex items-center gap-2 mb-4 text-xs font-bold tracking-widest text-red-400 uppercase">
                <AlertCircle size={16} /> Before UptoSkills
              </h4>
              <div className="space-y-3 blur-[1px]">
                <div className="w-3/4 h-4 rounded bg-white/10"></div>
                <div className="w-full h-4 rounded bg-white/10"></div>
                <div className="w-5/6 h-4 rounded bg-white/10"></div>
              </div>
              <p className="mt-6 text-sm text-gray-400">
                Vague descriptions, missing keywords, and poor formatting that
                ATS bots reject instantly.
              </p>
            </div>
            <div className="p-8 rounded-[2rem] bg-[#0077cc]/10 border border-[#0077cc]/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#0077cc] text-white text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase">
                Optimized
              </div>
              <h4 className="flex items-center gap-2 mb-4 text-xs font-bold tracking-widest text-green-400 uppercase">
                <CheckCircle2 size={16} /> After AI Scan
              </h4>
              <div className="space-y-3">
                <div className="w-3/4 h-4 border rounded bg-green-400/20 border-green-400/30"></div>
                <div className="w-full h-4 border rounded bg-green-400/20 border-green-400/30"></div>
                <div className="w-5/6 h-4 border rounded bg-green-400/20 border-green-400/30"></div>
              </div>
              <p className="mt-6 text-sm text-gray-200">
                High keyword density, punchy action verbs, and clear hierarchy
                that ranks you #1.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- EXPERT TIPS --- */}
      <section className="px-8 py-24 mx-auto max-w-7xl">
        <div className="flex flex-col items-end justify-between gap-6 mb-12 md:flex-row">
          <div className="max-w-xl">
            <h2 className="mb-4 text-4xl italic font-bold">
              Resume <span className="text-[#0077cc]">Power Tips</span>
            </h2>
            <p className="text-gray-500">
              Expert-backed advice to pair with our AI analysis.
            </p>
          </div>
          <button className="flex items-center gap-2 font-bold text-[#0077cc] hover:gap-3 transition-all">
            View All Guides <ArrowRight size={18} />
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "The 6-Second Rule",
              desc: "Recruiters spend 6 seconds on average. We help you put the most important info in the top third.",
            },
            {
              title: "Action Verb Focus",
              desc: "Replace 'Responsible for' with 'Spearheaded' or 'Executed' to show impact.",
            },
            {
              title: "Quantify Success",
              desc: "Always include numbers (e.g., 'Increased revenue by 20%') to provide concrete proof.",
            },
          ].map((tip, i) => (
            <div
              key={i}
              className="p-8 bg-white border border-gray-100 rounded-[2rem] hover:shadow-xl transition-all group"
            >
              <div className="mb-4 text-[#e65100] group-hover:scale-110 transition-transform">
                <Star size={24} />
              </div>
              <h4 className="mb-2 text-xl font-bold">{tip.title}</h4>
              <p className="text-sm leading-relaxed text-gray-500">
                {tip.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="px-8 py-24 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16 text-center">
            <div className="inline-flex p-3 bg-blue-50 text-[#0077cc] rounded-2xl mb-4">
              <Info size={24} />
            </div>
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "Is my resume data safe?",
                a: "Absolutely. We use bank-level encryption and your data is never sold to third parties.",
              },
              {
                q: "What is an ATS score?",
                a: "It's a measurement of how well your resume matches common applicant tracking system algorithms.",
              },
              {
                q: "How many times can I scan?",
                a: "Free users get 3 scans per month. Pro users get unlimited access and deep-keyword analysis.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="py-6 border-b border-gray-100 cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-bold text-lg group-hover:text-[#0077cc] transition-colors">
                    {faq.q}
                  </h5>
                  <ChevronDown size={18} className="text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIResumeChecker;