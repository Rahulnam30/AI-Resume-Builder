import React from 'react';
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import UpToSkillsImg from '../assets/UptoSkills.webp';
import images, { getImage } from '../assets'
import featureImage1 from '../assets/ai-assistant.png'
import featureImage2 from '../assets/tailored-summary.png'
import featureImage3 from '../assets/tailor-to-job.png'
import featureImage4 from '../assets/resume-preview.png'
import Footer from '../components/Footer'
import { ArrowRight, BarChart3, Edit3, FileSearch, Layout, Mail, Palette, PenTool, Zap, Layers } from 'lucide-react';

function LandingPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0)
  const [direction, setDirection] = useState('next')

  const scrollContainerRef = useRef(null);
  const base = import.meta.env.BASE_URL || '/';

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const cardWidth = 300 + 24;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const templates = [
    {
      name: "AI Assistant",
      desc: "Smart resume generation powered by AI",
      image: featureImage1,
      bgColor: "from-blue-500 to-cyan-500"
    },
    {
      name: "Tailored Summary",
      desc: "Customized professional summary",
      image: featureImage2,
      bgColor: "from-purple-500 to-pink-500"
    },
    {
      name: "Tailor to Job",
      desc: "Match your resume to job requirements",
      image: featureImage3,
      bgColor: "from-orange-500 to-red-500"
    },
    {
      name: "Resume Preview",
      desc: "Real-time resume preview and editing",
      image: featureImage4,
      bgColor: "from-green-500 to-teal-500"
    },
  ]

  const resumeTemplates = [
    {
      id: 1,
      name: "Atlantic Blue",
      category: "modern",
      desc: "Modern and professional design",
      image: `${base}templates/chronological.png`
    },
    {
      id: 2,
      name: "Classic",
      category: "traditional",
      desc: "Traditional and timeless layout",
      image: `${base}templates/functional.png`
    },
    {
      id: 3,
      name: "Corporate",
      category: "traditional",
      desc: "Professional corporate style",
      image: `${base}templates/creative.png`
    },
    {
      id: 4,
      name: "Modern Pro",
      category: "modern",
      desc: "Sleek and contemporary design",
      image: `${base}templates/modern.png`
    },
    {
      id: 5,
      name: "Executive",
      category: "executive",
      desc: "Perfect for senior positions",
      image: `${base}templates/minimalist.png`
    },
    {
      id: 6,
      name: "Creative Edge",
      category: "creative",
      desc: "Stand out with creative flair",
      image: `${base}templates/executive.png`
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTemplateIndex((prev) => (prev + 1) % templates.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [templates.length])

  const handleTemplateClick = (templateId) => {
    const isAuthenticated = false;

    if (isAuthenticated) {
      navigate(`/templates/${templateId}`);
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (scrollContainerRef.current) {
        const cardWidth = 300 + 24;
        const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
        const currentScroll = scrollContainerRef.current.scrollLeft;

        if (currentScroll >= maxScroll) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainerRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, []);

  // Scroll to the free templates section when URL hash is present (e.g. /#free-templates)
  const location = useLocation();
  useEffect(() => {
    if (location.hash === '#free-templates') {
      const el = document.getElementById('free-templates');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  const howItWorksSteps = [
    {
      icon: "fa-file-alt",
      heading: "Easily create or import your resume",
      description: "Choose from professionally designed templates or upload your existing resume to improve its structure, formatting, and content for a more polished result.",
    },
    {
      icon: "fa-clipboard-check",
      heading: "Check and analyze your resume score",
      description: "Get real-time ATS insights as you build your resume, or upload an existing one to analyze structure, keywords, and formatting.",
    },
    {
      icon: "fa-microchip",
      heading: "Quickly customize your resume with AI",
      description: "Enter your experience details, and our AI generates clear, impactful bullet points that showcase your skills and achievements professionally.",
    },
    {
      icon: "fa-magic",
      heading: "Improve your resume instantly in one click",
      description: "Tailor your resume to any job listing in one click with instant, role-specific improvements that boost relevance and highlight key skills.",
    },
    {
      icon: "fa-download",
      heading: "Your winning resume is ready!",
      description: "Download your job-ready resume in your preferred format, or create multiple tailored versions for different roles to boost success.",
    },
  ];

  const features = [
    {
      icon: <FileSearch className="text-blue-600 size-6" />,
      title: 'Resume Checker',
      description: 'Analyze and optimize your resume for success with our advanced scanning engine.'
    },
    {
      icon: <Layout className="text-green-600 size-6" />,
      title: 'Resume Templates',
      description: 'Choose from professional, ATS-friendly designs built to land interviews.'
    },
    {
      icon: <BarChart3 className="text-purple-600 size-6" />,
      title: 'Resume Analysis',
      description: 'Get actionable feedback and scoring to improve your resume content.'
    },
    {
      icon: <Edit3 className="text-orange-600 size-6" />,
      title: 'Resume Editor',
      description: 'Edit and enhance your resume with smart tools and real-time formatting.'
    },
    {
      icon: <Palette className="text-pink-600 size-6" />,
      title: 'Customize Your Resume',
      description: 'Personalize your layout, fonts, and branding to stand out from the crowd.'
    },
    {
      icon: <Zap className="text-yellow-600 size-6" />,
      title: 'Summary Generator',
      description: 'Create a strong, impactful resume summary in seconds using AI.'
    },
    {
      icon: <PenTool className="text-indigo-600 size-6" />,
      title: 'AI Bulletpoint Writer',
      description: 'Generate tailored, achievement-oriented bullet points effortlessly.'
    },
    {
      icon: <Mail className="text-red-600 size-6" />,
      title: 'Cover Letter Writer',
      description: 'Quickly craft tailored cover letters that match your resume perfectly.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1a2e52] font-['Outfit']">

      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 py-4 border-b border-gray-100 bg-white/95 backdrop-blur-md select-none">
        <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
          <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="cursor-pointer">
            <img src={UpToSkillsImg} alt="UpToSkills Logo" className="w-[150px]" />
          </div>

          <div className="items-center hidden gap-6 md:flex">
            <button onClick={() => navigate('/login')} className="flex items-center gap-3 px-6 py-2.5 border-2 border-[#0077cc] text-[#0077cc] rounded-xl font-bold transition-all duration-300 hover:bg-[#0077cc] hover:text-white hover:shadow-lg hover:shadow-blue-100 hover:-translate-y-1 active:scale-95">
              <i className="fas fa-sign-in-alt"></i>
              <span>Login</span>
            </button>

            <button onClick={() => navigate('/register')} className="flex items-center gap-3 px-6 py-2.5 bg-[#e65100] text-white rounded-xl font-bold transition-all duration-300 border-2 border-transparent hover:bg-[#ff6d00] hover:shadow-xl hover:shadow-orange-200 hover:-translate-y-1 active:scale-95">
              <i className="fas fa-user-plus"></i>
              <span>Sign up</span>
            </button>
          </div>

          <button className="text-2xl md:hidden" onClick={toggleMobileMenu}>☰</button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="mt-9 relative px-8 bg-white">
        <div className="absolute top-0 right-0 w-1/3 h-1/4 bg-orange-50 rounded-full blur-[120px] -z-10 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/4 bg-blue-50 rounded-full blur-[120px] -z-10 opacity-50"></div>

        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-8">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight font-jakarta select-none">
              <span className="bg-gradient-to-r from-[#e65100] to-[#ff8f00] bg-clip-text text-transparent">
                UptoSkills AI
              </span>{" "}
              <span className="bg-gradient-to-r from-[#0077cc] to-[#0056b3] bg-clip-text text-transparent">
                Resume Builder
              </span>
              <br />
              <span className="text-4xl text-[#1a2e52] mt-4 block">
                Craft Your Perfect Resume in Minutes!
              </span>
            </h1>

            <h2 className="text-3xl font-bold text-[#0077cc]">
              AI Resume Builder
            </h2>

            <p className="text-xl font-normal leading-relaxed text-gray-600">
              AI-Powered Content, Professional Templates, ATS-Friendly.
            </p>

            <div className="flex flex-wrap gap-4 mt-2 select-none">
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-3 px-10 py-5 text-lg font-bold text-white bg-gradient-to-r from-[#e65100] to-[#f4511e] rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_25px_rgba(230,81,0,0.3)] hover:shadow-[0_15px_35px_rgba(230,81,0,0.45)]"
              >
                <i className="fas fa-graduation-cap"></i>
                Start Building for Free
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("free-templates");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-3 px-10 py-5 text-lg font-bold text-[#0077cc] bg-white border-2 border-[#0077cc] rounded-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#0077cc] hover:text-white shadow-[0_10px_25px_rgba(0,119,204,0.15)] hover:shadow-[0_15px_35px_rgba(0,119,204,0.25)]"
              >
                <Layers size={18} />
                View Templates
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-2xl relative h-[600px] lg:h-[700px]">
              {templates.map((template, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-all duration-700 ease-out flex items-center justify-center select-none ${idx === currentTemplateIndex
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95"
                    }`}
                >
                  <img
                    src={template.image}
                    alt={template.name}
                    className={`object-contain ${template.name === "Tailored Summary" ||
                        template.name === "Tailor to Job"
                        ? "w-[70%] h-[70%]"
                        : "w-full h-full"
                      }`}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-8 py-24 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-20 text-center select-none">
            <h2 className="mb-4 text-4xl font-black md:text-5xl">
              How <span className="text-[#e65100]">It Works</span>
            </h2>
            <p className="text-lg text-gray-500">Your path to a professional resume in 5 simple steps.</p>
          </div>

          <div className="space-y-24">
            {howItWorksSteps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="relative flex items-center justify-center w-full overflow-hidden bg-white border border-gray-100 shadow-xl md:w-1/2 aspect-video rounded-3xl group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0077cc]/5 to-transparent"></div>
                  <i className={`fas ${step.icon} text-7xl text-[#0077cc]/20 group-hover:scale-110 transition-transform duration-500`}></i>
                </div>
                <div className="w-full space-y-6 md:w-1/2">
                  <span className="text-[#0077cc] font-black text-6xl opacity-10">0{index + 1}</span>
                  <h3 className="text-3xl font-bold text-[#1a2e52] leading-tight">{step.heading}</h3>
                  <p className="text-lg leading-relaxed text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* TEMPLATE SHOWCASE */}
      <section id="free-templates" className="px-8 py-24 overflow-hidden bg-white select-none">
        <div className="max-w-[1400px] mx-auto">
          {/* Header Section */}
          <div className="flex flex-col items-center mb-12 text-center">
            <h2 className="mb-4 text-3xl font-black leading-tight md:text-4xl">
              Access Free <span className="text-[#0077cc]">Templates</span>
            </h2>
            <p className="max-w-2xl px-4 text-base text-gray-500">
              All templates are ATS-compliant and fully customizable.
            </p>
          </div>

          <div className="relative group/main">
            {/* Scroll Buttons */}
            <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center text-[#0077cc] border border-gray-100 opacity-0 group-hover/main:opacity-100 transition-opacity duration-300 -translate-x-2 hover:bg-[#0077cc] hover:text-white">
              <i className="fas fa-chevron-left"></i>
            </button>

            <div
              ref={scrollContainerRef}
              className="flex gap-8 px-4 py-10 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
              style={{ perspective: '1000px' }} // Enables 3D space
            >
              {resumeTemplates.map((t, i) => (
                <div
                  key={t.name + i}
                  onClick={() => handleTemplateClick(t.id)}
                  className="min-w-[220px] sm:min-w-[260px] md:min-w-[300px] snap-center cursor-pointer group/card"
                >
                  {/* Modified 3D Card Container: scale-110 and z-50 for "coming to front" effect */}
                  <div className="relative bg-white h-[320px] md:h-[400px] rounded-2xl transition-all duration-500 ease-out 
                            shadow-md group-hover/card:shadow-2xl 
                            group-hover/card:scale-110 group-hover/card:z-50
                            border border-gray-100 overflow-hidden">

                    {/* Template Image - Removed scale-105 here to keep image crisp and stable */}
                    <img
                      src={t.image}
                      alt={t.name}
                      className="object-cover object-top w-full h-full transition-transform duration-500"
                    />

                    {/* ATS Badge */}
                    <div className="absolute top-4 right-4 bg-[#0077cc] backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-white/90 shadow-sm z-20">
                      ATS READY
                    </div>

                    {/* Removed dark gradient overlay entirely for total clarity */}
                    <div className="absolute inset-0 transition-colors duration-300 pointer-events-none group-hover/card:bg-transparent">
                    </div>
                  </div>

                  {/* Bottom Text */}
                  <div className="p-4 text-center">
                    <h4 className="text-sm font-bold mb-1 text-[#1a2e52] group-hover/card:text-[#0077cc] transition-colors">{t.name}</h4>
                    <p className="text-xs text-gray-500">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center text-[#0077cc] border border-gray-100 opacity-0 group-hover/main:opacity-100 transition-opacity duration-300 translate-x-2 hover:bg-[#0077cc] hover:text-white">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}

      <section className="relative px-8 py-24 overflow-hidden bg-white select-none">
        {/* Soft Background Decorative Blurs - Switched to light pastels */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-50/50 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 px-4 mx-auto max-w-7xl">

          {/* Header Section - Matches your "How It Works" style */}
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="mb-4 text-4xl font-black md:text-5xl text-[#1a2e52]">
              AI-Powered <span className="text-[#0077cc]">Innovation</span>
            </h2>
            <div className="h-1.5 w-20 bg-[#e65100] rounded-full mb-6"></div>
            <p className="max-w-2xl px-4 text-lg text-gray-500">
              Advanced tools designed to bypass ATS filters and catch recruiter attention instantly.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative p-8 transition-all duration-500 bg-white/40 backdrop-blur-md border border-gray-100 group rounded-3xl
                     hover:bg-white hover:-translate-y-3 hover:border-blue-200 hover:shadow-[0_20px_40px_rgba(0,119,204,0.1)]"
              >
                {/* Animated Gradient Border (visible on hover) - Light theme colors */}
                <div className="absolute inset-0 p-[1px] rounded-3xl bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:from-blue-400/30 group-hover:via-orange-300/30 group-hover:to-blue-400/30 -z-10 transition-all duration-500" />

                {/* Icon Section with Glass Effect */}
                <div className="relative inline-flex items-center justify-center p-4 mb-8 transition-all duration-500 rounded-2xl bg-blue-50 border border-blue-100 group-hover:scale-110 group-hover:bg-[#0077cc] group-hover:shadow-[0_10px_20px_rgba(0,119,204,0.3)] group-hover:-rotate-6">
                  <div className="transition-colors duration-500 text-[#0077cc] group-hover:text-white">
                    {/* Fixed the React.cloneElement using the features array from your state */}
                    {React.cloneElement(feature.icon, { className: "size-7 transition-colors duration-500" })}
                  </div>
                </div>

                {/* Text Content */}
                <h3 className="mb-3 text-xl font-bold tracking-tight text-[#1a2e52] transition-colors duration-300 group-hover:text-[#0077cc]">
                  {feature.title}
                </h3>

                <p className="mb-6 text-sm leading-relaxed text-gray-600 group-hover:text-gray-700">
                  {feature.description}
                </p>

                {/* Action Link */}
                <div className="flex items-center gap-2 text-sm font-bold text-[#0077cc] transition-all duration-300 group-hover:gap-3">
                  <span className="tracking-wide cursor-pointer">Explore Feature</span>
                  <div className="p-1 transition-all duration-300 rounded-full bg-blue-100 group-hover:bg-[#e65100] group-hover:text-white">
                    <ArrowRight className="size-3" />
                  </div>
                </div>

                {/* Light Spotlight Shine Effect */}
                <div className="absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none rounded-3xl"
                  style={{ background: 'radial-gradient(circle at top left, rgba(0,119,204,0.05) 0%, transparent 70%)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />



    </div>
  )
}

export default LandingPage;