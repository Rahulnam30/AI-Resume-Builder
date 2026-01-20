import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  FileSearch,
  Target,
  Shield,
  TrendingUp,
  Activity,
  Zap
} from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "./Footer";
import ATSChecker from "../assets/ATSChecker.jpeg";

// ✅ Small helper for scroll animations
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold }
    );
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
};

const ATSCheckerFeature = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleCTA = () => {
    navigate(isLoggedIn ? "/user/ats-checker" : "/resume-checker");
  };

  const handleBackHome = () => {
    navigate("/?scrollTo=features");
  };

  const [heroRef, heroVisible] = useInView(0.2);
  const [whatRef, whatVisible] = useInView(0.15);
  const [whyRef, whyVisible] = useInView(0.15);
  const [looksRef, looksVisible] = useInView(0.15);
  const [howRef, howVisible] = useInView(0.15);
  const [ctaRef, ctaVisible] = useInView(0.2);

  return (
    <div className="min-h-screen bg-white font-['Outfit'] select-none">
      <NavBar />

      {/* HERO SECTION */}
      <section
        ref={heroRef}
        className="relative px-6 pt-10 pb-6 overflow-hidden bg-white"
      >
        {/* Subtly matching home page blur accents */}
        <div className="absolute rounded-full -top-24 -left-24 w-72 h-72 bg-blue-50 blur-3xl opacity-60" />
        <div className="absolute rounded-full -bottom-24 -right-24 w-72 h-72 bg-orange-50 blur-3xl opacity-60" />

        <div className="mx-auto max-w-7xl">

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div
              className={`transition-all duration-700 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <div className="inline-block px-4 py-2 bg-blue-50 text-[#0077cc] rounded-full text-sm font-bold mb-6">
                Free ATS Resume Checker
              </div>

              <h1 className="mb-6 text-5xl font-black leading-tight text-[#1a2e52] md:text-6xl font-jakarta tracking-tight">
                Free ATS Resume Checker:{" "}
                <span className="text-[#0077cc]">Get Your Score</span>
              </h1>

              <p className="mb-8 text-xl leading-relaxed text-gray-600">
                Upload your resume ATS friendly and see how well Resume Builder can
                optimize your resume to get past applicant tracking systems and
                land more interviews.
              </p>

              <button
                onClick={handleCTA}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#e65100] to-[#f4511e] text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-[0_10px_25px_rgba(230,81,0,0.3)] hover:shadow-[0_15px_35px_rgba(230,81,0,0.45)] hover:-translate-y-1 active:scale-95"
              >
                <span>Check My Score Now</span>
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </button>

              <p className="flex items-center gap-2 mt-8 text-sm font-bold text-gray-400">
                <CheckCircle size={16} className="text-green-500" />
                • Instant results
              </p>
            </div>

            <div
              className={`relative transition-all duration-700 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-blue-50 blur-3xl" />
                <img
                  src={ATSChecker}
                  alt="ATS Score Analysis"
                  className="relative z-10 w-full shadow-xl rounded-3xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS ATS */}
      <section ref={whatRef} className="px-6 py-20 bg-white">
        <div
          className={`max-w-5xl mx-auto transition-all duration-700 ${
            whatVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="mb-6 text-4xl font-black text-center text-[#1a2e52] font-jakarta">
            What is an ATS Resume Checker?
          </h2>

          <div className="mb-12 space-y-6 text-lg leading-relaxed text-gray-600 max-w-none">
            <p>
              An ATS resume checker is a tool that scans your resume to see how
              well it matches job requirements and how likely it is to pass an
              Applicant Tracking System (ATS). These systems are used by 99% of
              Fortune 500 companies and a growing number of small to medium
              businesses to filter resumes before they reach human recruiters.
            </p>

            <p>
              Our ATS checker analyzes your resume against industry standards
              and provides a detailed score based on formatting, keywords, and
              structure. The higher your score, the better your chances of
              getting past the ATS and landing an interview.
            </p>

            <div className="p-6 my-8 border-l-4 border-[#0077cc] bg-[#f0f7ff] rounded-2xl shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-[#1a2e52]">
                Our ATS Resume Checker scans for:
              </h3>

              <ul className="space-y-4">
                {[
                  {
                    title: "Standard ATS resume format:",
                    desc: "Ensures your resume uses ATS-friendly formatting",
                  },
                  {
                    title: "Measurable results:",
                    desc: "Checks for quantifiable achievements and metrics",
                  },
                  {
                    title: "Relevant keywords:",
                    desc: "Identifies missing industry-specific keywords",
                  },
                  {
                    title: "Personalization:",
                    desc: "Evaluates how well your resume is tailored to the role",
                  },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle
                      size={20}
                      className="flex-shrink-0 mt-1 text-[#0077cc]"
                    />
                    <span className="text-gray-700">
                      <strong className="text-[#1a2e52]">{item.title}</strong> {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHY USE ATS CHECKER */}
      <section ref={whyRef} className="px-6 py-20 bg-gray-50/50">
        <div
          className={`max-w-6xl mx-auto transition-all duration-700 ${
            whyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="mb-4 text-4xl font-black text-center text-[#1a2e52] font-jakarta">
            Why Use an <span className="text-[#e65100]">ATS Resume Checker?</span>
          </h2>

          <p className="max-w-3xl mx-auto mb-16 text-lg text-center text-gray-600">
            Most companies use Applicant Tracking Systems to filter resumes. Our
            checker helps you optimize your resume so it doesn't get rejected
            before a human even sees it.
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Target size={40} />,
                title: "Increase interview chances",
                desc: "Optimize your resume to pass ATS filters and reach hiring managers",
              },
              {
                icon: <FileSearch size={40} />,
                title: "Identify missing keywords",
                desc: "Discover critical keywords that ATS systems look for in your industry",
              },
              {
                icon: <Shield size={40} />,
                title: "Fix formatting issues",
                desc: "Ensure your resume format is compatible with all ATS systems",
              },
              {
                icon: <TrendingUp size={40} />,
                title: "Improve your score",
                desc: "Get actionable feedback to boost your ATS compatibility score",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 transition-all duration-300 bg-white border border-gray-100 rounded-2xl hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex items-center justify-center w-16 h-16 mb-6 text-[#0077cc] bg-blue-50 rounded-xl">
                  {item.icon}
                </div>

                <h3 className="mb-2 text-lg font-bold text-[#1a2e52]">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT OUR CHECKER LOOKS FOR */}
      <section ref={looksRef} className="px-6 py-20 bg-white">
        <div
          className={`max-w-6xl mx-auto transition-all duration-700 ${
            looksVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="mb-16 text-4xl font-black text-center text-[#1a2e52] font-jakarta">
            What Our Free ATS Resume Checker Looks For
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "📄", title: "Personalization", desc: "Checks if your resume is tailored to the specific job you're applying for" },
              { icon: "📊", title: "Targeted keywords", desc: "Scans for job-specific keywords that ATS systems prioritize" },
              { icon: "📈", title: "Spelling and grammar", desc: "Identifies typos and grammatical errors that could hurt your score" },
              { icon: "✅", title: "Hard and soft skills", desc: "Evaluates if you've included both technical and interpersonal skills" },
              { icon: "📐", title: "Strong formatting", desc: "Ensures your resume structure is ATS-compatible and easy to parse" },
              { icon: "🎯", title: "Job title optimization", desc: "Checks if your job titles align with industry standards" },
              { icon: "📝", title: "Resume design", desc: "Verifies your design choices don't interfere with ATS readability" },
              { icon: "🔍", title: "Detail depth", desc: "Assesses if you've provided enough detail about your experience" },
              { icon: "⚡", title: "Completeness", desc: "Ensures all critical resume sections are present and complete" },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 text-center transition-all duration-300 border border-gray-100 bg-white rounded-2xl hover:border-[#0077cc]/30 hover:shadow-lg"
              >
                <div className="mb-4 text-5xl">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold text-[#1a2e52]">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section ref={howRef} className="px-6 py-14 bg-gray-50/50">
        <div
          className={`max-w-5xl mx-auto transition-all duration-700 ${
            howVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="mb-4 text-4xl font-black text-center text-[#1a2e52] font-jakarta">
            How Our <span className="text-[#0077cc]">ATS Resume Scanner</span> Works
          </h2>

          <p className="max-w-3xl mx-auto mb-16 text-lg text-center text-gray-600">
            Our ATS checker scans your resume in seconds. Here's how it works
            and what you can expect from the results.
          </p>

          <div className="p-8 bg-white border border-gray-100 shadow-xl rounded-[2.5rem] md:p-12">
            <h3 className="mb-8 text-2xl font-bold text-center text-[#1a2e52]">
              Here's how it works:
            </h3>

            <div className="space-y-6">
              {[
                { step: "1", title: "Upload your resume", desc: "Simply upload your current resume in PDF or Word format" },
                { step: "2", title: "AI analyzes your resume", desc: "Our advanced AI scans your resume against ATS requirements and best practices" },
                { step: "3", title: "Get your score & fixes", desc: "Receive an instant ATS score with detailed suggestions to improve your resume" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-6 p-4 transition-colors rounded-2xl hover:bg-blue-50"
                >
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-black text-white bg-[#0077cc] rounded-full">
                    {item.step}
                  </div>

                  <div>
                    <h4 className="mb-1 text-xl font-bold text-[#1a2e52]">
                      {item.title}
                    </h4>
                    <p className="text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section
        ref={ctaRef}
        className="relative px-8 pt-12 pb-24 overflow-hidden bg-white select-none"
      >
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-orange-50 rounded-full blur-[120px] -z-10 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-blue-50 rounded-full blur-[120px] -z-10 opacity-60"></div>
        
        <div
          className={`relative z-10 max-w-4xl mx-auto text-center transition-all duration-1000 ease-out ${
            ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <h2 className="mb-6 text-4xl font-black md:text-6xl text-[#1a2e52] tracking-tight font-jakarta">
            Ready to Check Your <span className="text-[#0077cc]">ATS Score?</span>
          </h2>

          <p className="max-w-2xl mx-auto mb-10 text-xl font-medium text-gray-500">
            Get instant feedback and actionable tips to improve your resume's marketability with our AI-powered analysis.
          </p>

          <button
            onClick={handleCTA}
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#e65100] to-[#f4511e] text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-[0_10px_25px_rgba(230,81,0,0.3)] 
                       hover:shadow-[0_15px_35px_rgba(230,81,0,0.45)] hover:-translate-y-1 active:scale-95"
          >
            <span className="relative z-10">Check My Resume Now</span>
            <ArrowRight
              size={22}
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-2"
            />
          </button>
          
          <div className="mt-8 flex items-center justify-center gap-2 text-sm font-bold text-[#0077cc] opacity-60">
            <Activity size={16} />
            <span>Real-time AI Analysis</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ATSCheckerFeature;