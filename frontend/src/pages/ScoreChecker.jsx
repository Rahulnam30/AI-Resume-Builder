import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import {
  Target,
  Zap,
  CheckCircle2,
  ArrowRight,
  LineChart,
  ShieldCheck,
  Search,
  Activity,
  BarChart3,
  FileText,
} from "lucide-react";
import Footer from "./Footer";
import score from "../assets/score.png"; 

const ScoreChecker = () => {
  const navigate = useNavigate();
  const isLoggedIn =
    typeof window !== "undefined" && !!localStorage.getItem("token");

  const handleFeatureClick = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      localStorage.setItem("redirectPath", path);
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFCFE] font-['Outfit'] text-[#1a2e52] selection:bg-orange-100 overflow-x-hidden">
      
      <NavBar />

      {/* --- HERO SECTION: THEME ALIGNED --- */}
      <section className="relative pb-16 overflow-hidden pt-28">
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-orange-50/50 to-transparent -z-10" />

  <div className="px-8 mx-auto max-w-7xl">
    <div className="flex flex-col items-center gap-16 lg:flex-row lg:text-left">
      <div className="flex-1 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white border border-orange-100 rounded-full shadow-sm">
          <Activity size={14} className="text-[#e65100]" />
          <span className="text-sm font-bold tracking-wider text-[#e65100] uppercase">Real-Time Performance Tracking</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
          Don't Just Write. <br />
          <span className="text-transparent bg-gradient-to-r from-[#e65100] to-[#ff8f00] bg-clip-text">Measure Success.</span>
        </h1>
        <p className="max-w-2xl mx-auto mb-12 text-xl font-light leading-relaxed text-gray-500 lg:mx-0">
          Our Live Quality Scoring engine provides an instant 0-100 score based on recruiter standards.
        </p>
        <button onClick={() => handleFeatureClick("/user/ats-checker")} className="px-10 py-5 bg-[#e65100] text-white rounded-2xl font-bold text-lg hover:bg-[#ff6d00] transition-all flex items-center gap-3 shadow-xl">
          Check My Score <Target size={20} />
        </button>
      </div>

      {/* Main Image Fixed - Badge Active */}
      <div className="relative flex-1 w-full max-w-[550px] lg:max-w-[500px]">
          <div className="absolute rounded-full opacity-40 -inset-10 bg-gradient-to-tr from-orange-500/20 to-blue-500/20 blur-3xl" />
          <div className="relative overflow-hidden bg-white border-2 shadow-2xl rounded-[40px] border-orange-50 p-2.5">
              <div className="overflow-hidden rounded-[32px]">
                  <img src={score} alt="Score" className="w-full h-auto" />
              </div>
          </div>
          {/* Floating Badge stays animated */}
          <div className="absolute hidden p-4 bg-white border border-blue-100 shadow-xl -bottom-6 -right-6 rounded-2xl md:block animate-bounce" style={{ animationDuration: '4s' }}>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50">
                <CheckCircle2 className="text-[#0077cc]" size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400">Status</p>
                <p className="text-sm font-bold text-slate-800">Optimized</p>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</section>

      {/* --- WHAT IS AN ATS RESUME CHECKER (MATCHING IMAGE DESIGN) --- */}
<section className="px-8 py-20 bg-white font-['Outfit']">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-4xl font-bold text-center text-[#1a2e52] mb-12">What is an ATS Resume Checker?</h2>
    
    <div className="mb-12 space-y-6 text-lg text-gray-600">
      <p>
        An ATS resume checker is a tool that scans your resume to see how well it matches job requirements and how likely it is to pass an Applicant Tracking System (ATS). These systems are used by 99% of Fortune 500 companies and a growing number of small to medium businesses to filter resumes before they reach human recruiters.
      </p>
      <p>
        Our ATS checker analyzes your resume against industry standards and provides a detailed score based on formatting, keywords, and structure. The higher your score, the better your chances of getting past the ATS and landing an interview.
      </p>
    </div>

    {/* Featured Blue Box - Matching Reference UI */}
    <div className="bg-[#f0f7ff] border-l-4 border-[#0077cc] rounded-2xl p-8 shadow-sm">
      <h3 className="text-xl font-bold text-[#1a2e52] mb-6">Our ATS Resume Checker scans for:</h3>
      <ul className="space-y-4">
        {[
          { title: "Standard ATS resume format", desc: "Ensures your resume uses ATS-friendly formatting" },
          { title: "Measurable results", desc: "Checks for quantifiable achievements and metrics" },
          { title: "Relevant keywords", desc: "Identifies missing industry-specific keywords" },
          { title: "Personalization", desc: "Evaluates how well your resume is tailored to the role" }
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle2 size={20} className="text-[#0077cc] mt-1 shrink-0" />
            <p className="text-gray-700">
              <span className="font-bold">{item.title}:</span> {item.desc}
            </p>
          </li>
        ))}
      </ul>
    </div>
  </div>
</section>

      {/* --- LIVE SCORE VISUALIZATION: CLEAN DESIGN --- */}
<section className="px-8 py-20 overflow-hidden bg-gray-50/50">
  <div className="max-w-6xl mx-auto">
    <div className="grid items-center gap-12 lg:grid-cols-2">
      
      {/* Text Content - No Hover */}
      <div className="space-y-6">
        <h2 className="text-3xl font-black leading-tight tracking-tight md:text-4xl text-[#1a2e52]">
          The 90% <span className="inline-block text-[#e65100]">Interview-Ready</span> Threshold.
        </h2>
        <p className="max-w-md leading-relaxed text-gray-600">
          Data shows that resumes scoring above 90 receive 3x more
          interview callbacks. Our live meter helps you identify exactly
          what's missing.
        </p>
        
        <ul className="space-y-4">
          {[
            "Real-time keyword analysis",
            "Section-by-section breakdown",
            "Actionable improvement tips",
          ].map((text, i) => (
            <li key={i} className="flex items-center gap-3 text-sm font-bold text-[#1a2e52]">
              <div className="p-1 bg-blue-100 rounded-full text-[#0077cc]">
                <CheckCircle2 size={18} />
              </div>
              {text}
            </li>
          ))}
        </ul>
      </div>

      {/* The Card - No Glow, No Movement */}
      <div className="relative">
        {/* Glow div removed from here */}
        
        <div className="relative bg-white p-10 rounded-[40px] border border-gray-100 shadow-2xl text-center">
          
          <div className="relative inline-flex items-center justify-center mb-6">
            <svg className="w-48 h-48 transform -rotate-90 drop-shadow-md">
              <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100" />
              <circle
                cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent"
                strokeDasharray="552"
                strokeDashoffset="110" /* Fixed position at 82% */
                className="text-[#e65100]"
              />
            </svg>
            
            <div className="absolute flex flex-col items-center">
              <span className="text-5xl font-black text-slate-800 tabular-nums">82</span>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ATS Score</span>
            </div>
          </div>

          <div className="p-5 text-left border border-orange-100 bg-orange-50/50 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={14} className="text-[#e65100] fill-[#e65100]" />
              <span className="text-xs font-black tracking-tight text-[#e65100] uppercase">AI Optimization Tip</span>
            </div>
            <p className="text-xs italic font-medium leading-relaxed text-slate-800">
              "Add more <span className="font-bold text-[#0077cc] underline">quantifiable results</span> to your current role to boost your impact score."
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* --- FEATURE GRID --- */}
<section className="relative px-8 py-14 overflow-hidden bg-white font-['Outfit']">
  {/* Background glow matching video style */}
  <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 w-96 h-96 bg-slate-50 blur-3xl -z-10" />

  <div className="mx-auto max-w-7xl">
    <div className="mb-16 text-center">
      <h2 className="text-4xl font-[1000] text-[#1a2e52] mb-4 tracking-tighter">
        What Our ATS Checker <span className="text-[#1a2e52]">Looks For</span>
      </h2>
      <div className="h-1.5 w-20 bg-[#1a2e52] rounded-full mx-auto mb-6"></div>
      <p className="max-w-xl mx-auto font-medium text-gray-500">
        Our Live Quality Scoring engine analyzes every detail to ensure you pass recruiter filters.
      </p>
    </div>
    
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {[
        { icon: Target, t: "Personalization", d: "Checks if your resume is tailored to the specific job you're applying for." },
        { icon: BarChart3, t: "Targeted Keywords", d: "Scans for job-specific keywords that ATS systems prioritize." },
        { icon: ShieldCheck, t: "Strong Formatting", d: "Ensures your resume uses ATS-friendly structures and layouts." },
        { icon: Search, t: "Keyword Matching", d: "Compares your resume against common job descriptions." },
        { icon: FileText, t: "Impact Analysis", d: "Measures the strength of your verbs and achievement clarity." },
        { icon: CheckCircle2, t: "ATS Compatibility", d: "Ensures your document is 100% readable by top platforms." }
      ].map((feature, i) => (
        <div 
          key={i} 
          className="relative p-10 rounded-[40px] border border-gray-100 bg-white transition-all duration-500 
                     hover:shadow-[0_30px_60px_-15px_rgba(26,46,82,0.12)] hover:-translate-y-3 
                     group text-center md:text-left overflow-hidden"
        >
          {/* THE SHINE FROM TOP LEFT - Kept Orange as requested */}
          <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 -z-10"  />

          {/* Floating Icon Container - Stays Black/Navy on hover */}
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-8 transition-all duration-500 
                          bg-slate-50 rounded-[24px] md:mx-0 
                          group-hover:bg-white group-hover:shadow-lg group-hover:rotate-[10deg]">
            <feature.icon 
              size={32} 
              strokeWidth={2.5} 
              className="text-[#1a2e52] transition-colors duration-300" 
            />
          </div>

          {/* Heading - Strictly Black/Navy (#1a2e52) */}
          <h4 className="mb-4 text-2xl font-[1000] tracking-tight text-[#1a2e52] transition-colors duration-300">
            {feature.t}
          </h4>
          
          <p className="text-sm font-semibold leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-600">
            {feature.d}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* --- QUALITY SCORE CTA --- */}
<section className="relative px-8 pt-12 pb-20 overflow-hidden bg-white select-none">
  {/* Decorative Background Blurs - Brand Specific */}
  <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-50 rounded-full blur-[120px] -z-10 opacity-60" />
  <div className="absolute bottom-0 left-0 w-1/3 h-full bg-blue-50 rounded-full blur-[120px] -z-10 opacity-60" />
  
  <div className="relative z-10 max-w-4xl mx-auto text-center">
    {/* Heading using your Navy (#1a2e52) and Blue (#0077cc) brand colors */}
    <h2 className="mb-6 text-4xl font-black md:text-6xl text-[#1a2e52] tracking-tighter font-jakarta">
      Don't Just Write. <span className="text-[#0077cc]">Measure Success.</span>
    </h2>
    
    <p className="max-w-2xl mx-auto mb-10 text-xl font-medium text-gray-500">
      Get an instant 0-100 score based on recruiter standards and ATS readability to ensure your resume is interview-ready.
    </p>

    <button 
      onClick={() => handleFeatureClick("/user/ats-checker")} 
      className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#e65100] to-[#f4511e] text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-[0_10px_25px_rgba(230,81,0,0.3)] 
                 hover:shadow-[0_15px_35px_rgba(230,81,0,0.45)] hover:-translate-y-1 active:scale-95"
    >
      <span className="relative z-10">Check My Score Now</span>
      <Target 
        size={22} 
        className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" 
      />
    </button>
    
    {/* Small badge to reinforce the "Quality Score" concept */}
    <div className="flex items-center justify-center gap-2 mt-8">
      <p className="text-sm font-bold text-gray-400">500+ users checking scores daily</p>
    </div>
  </div>
</section>

      <Footer />
    </div>
  );
};

export default ScoreChecker;