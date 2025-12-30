import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import UpToSkillsImg from '../assets/UptoSkills.webp';
import images, { getImage } from '../assets'
import featureImage1 from '../assets/ai-assistant.png'
import featureImage2 from '../assets/tailored-summary.png'
import featureImage3 from '../assets/tailor-to-job.png'
import featureImage4 from '../assets/resume-preview.png'

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
    { icon: 'fa-file-alt', title: 'Resume Checker', description: 'Analyze and optimize your resume for success' },
    { icon: 'fa-file', title: 'Resume Templates', description: 'Choose from professional, ATS-friendly designs' },
    { icon: 'fa-search', title: 'Resume Analysis', description: 'Get actionable feedback to improve your resume' },
    { icon: 'fa-edit', title: 'Resume Editor', description: 'Edit and enhance your resume with smart tools' },
    { icon: 'fa-palette', title: 'Customize Your Resume', description: 'Personalize your resume layout and branding' },
    { icon: 'fa-cogs', title: 'Resume Summary Generator', description: 'Create a strong resume summary in seconds' },
    { icon: 'fa-pen', title: 'AI Bulletpoint Writer', description: 'Generate tailored bullet points with AI help' },
    { icon: 'fa-envelope', title: 'Cover Letter Writer', description: 'Quickly craft tailored cover letters with ease' }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1a2e52] font-['Outfit']">

      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 py-4 border-b border-gray-100 bg-white/95 backdrop-blur-md">
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
      <section className="relative px-8 py-20 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-orange-50 rounded-full blur-[120px] -z-10 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-50 rounded-full blur-[120px] -z-10 opacity-50"></div>

        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">

          <div className="flex flex-col gap-8">
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight font-['Space_Grotesk']">
              <span className="bg-gradient-to-r from-[#e65100] to-[#ff8f00] bg-clip-text text-transparent">
                UptoSkills AI
              </span>{' '}
              <span className="bg-gradient-to-r from-[#0077cc] to-[#0056b3] bg-clip-text text-transparent">
                Resume Builder
              </span>
              <br />
              <span className="text-4xl text-[#1a2e52] mt-4 block">Craft Your Perfect Resume in Minutes!</span>
            </h1>

            <h2 className="text-3xl font-bold text-[#0077cc]">AI Resume Builder</h2>

            <p className="text-xl font-normal leading-relaxed text-gray-600">
              AI-Powered Content, Professional Templates, ATS-Friendly.
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              <button onClick={() => navigate('/login')} className="flex items-center gap-3 px-10 py-5 text-lg font-bold text-white bg-gradient-to-r from-[#e65100] to-[#f4511e] rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_25px_rgba(230,81,0,0.3)] hover:shadow-[0_15px_35px_rgba(230,81,0,0.45)]">
                <i className="fas fa-graduation-cap"></i>
                Start Building for Free
              </button>
              <button onClick={() => navigate('/contact')} className="flex items-center gap-3 px-10 py-5 text-lg font-bold text-[#0077cc] bg-white border-2 border-[#0077cc] rounded-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#0077cc] hover:text-white shadow-[0_10px_25px_rgba(0,119,204,0.15)] hover:shadow-[0_15px_35px_rgba(0,119,204,0.25)]">
                <i className="fas fa-envelope"></i>
                Contact Us
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-2xl relative h-[600px] lg:h-[700px]">
              {templates.map((template, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-all duration-700 ease-out flex items-center justify-center ${idx === currentTemplateIndex
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95'
                    }`}
                >
                  <img
                    src={template.image}
                    alt={template.name}
                    className={`object-contain ${template.name === 'Tailored Summary' || template.name === 'Tailor to Job'
                      ? 'w-[70%] h-[70%]'
                      : 'w-full h-full'
                      }`}
                    onError={(e) => { e.target.style.display = 'none'; }}
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
          <div className="mb-20 text-center">
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
      <section className="px-8 py-24 overflow-hidden bg-white">
        <div className="max-w-[1400px] mx-auto">

          <div className="flex flex-col items-center mb-12 text-center">
            <h2 className="mb-4 text-3xl font-black leading-tight md:text-4xl">
              Access Free <span className="text-[#0077cc]">Templates</span>
            </h2>
            <p className="max-w-2xl px-4 text-base text-gray-500">
              All templates are ATS-compliant and fully customizable.
            </p>
          </div>

          <div className="relative group">

            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-[#0077cc] border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-2 hover:bg-[#0077cc] hover:text-white"
            >
              <i className="text-sm fas fa-chevron-left"></i>
            </button>

            <div
              ref={scrollContainerRef}
              className="flex gap-6 px-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {resumeTemplates.map((t, i) => (
                <div
                  key={t.name + i}
                  className="min-w-[220px] sm:min-w-[260px] md:min-w-[300px] snap-center relative transition-all duration-500 group/card bg-white"
                >
                  <div className="relative bg-gray-100 h-[320px] md:h-[400px] flex items-center justify-center rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-500">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" loading="lazy" decoding="async" onError={(e) => { e.target.style.display = 'none'; }} />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-[#0077cc]">
                      ATS READY
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-0 bg-[#1a2e52]/70 backdrop-blur-[2px] group-hover/card:opacity-100 rounded-2xl">
                      <button
                        onClick={() => navigate('/login')}
                        className="px-6 py-2 text-sm font-bold text-white bg-gradient-to-r from-[#e65100] to-[#f4511e] rounded-lg"
                      >
                        Use Template
                      </button>
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="text-sm font-bold mb-1 text-[#1a2e52]">{t.name}</h4>
                    <p className="text-xs text-gray-500">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-[#0077cc] border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-2 hover:bg-[#0077cc] hover:text-white"
            >
              <i className="text-sm fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="px-8 py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="mb-16 text-4xl font-black text-center">Powerful <span className="text-[#0077cc]">AI Features</span></h2>
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
            {features.map((f, i) => (
              <div key={i} className="p-8 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-all hover:-translate-y-1 shadow-sm">
                <div className="flex items-center justify-center w-12 h-12 mb-6 rounded-lg bg-blue-50">
                  <i className={`fas ${f.icon} text-[#0077cc] text-xl`}></i>
                </div>
                <h3 className="font-bold mb-2 text-[#1a2e52]">{f.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-8 pt-20 pb-10 bg-white border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-4 gap-12 mb-16">

          {/* Logo */}
          <div className="col-span-1 md:col-span-1">
            <img src={UpToSkillsImg} alt="Logo" className="w-40 mb-6" />
            <p className="text-sm leading-relaxed text-gray-500">
              The ultimate AI-powered toolkit for job seekers to build professional
              resumes and land dream roles.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 font-bold">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li
                onClick={() => navigate("/templates")}
                className="hover:text-[#0077cc] cursor-pointer transition-colors"
              >
                Templates
              </li>
              <li
                onClick={() => navigate("/builder")}
                className="hover:text-[#0077cc] cursor-pointer transition-colors"
              >
                AI Resume Checker
              </li>
              <li
                onClick={() => navigate("/login")}
                className="hover:text-[#0077cc] cursor-pointer transition-colors"
              >
                Job Tracker
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-6 font-bold">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="hover:text-[#0077cc] cursor-pointer transition-colors">
                About Us
              </li>
              <li className="hover:text-[#0077cc] cursor-pointer transition-colors">
                Careers
              </li>
              <li className="hover:text-[#0077cc] cursor-pointer transition-colors">
                Blog
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-6 font-bold">Support</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li
                onClick={() => navigate("/help-center")}
                className="hover:text-[#0077cc] cursor-pointer transition-colors"
              >
                Help Center
              </li>
              <li
                onClick={() => navigate("/contact")}
                className="hover:text-[#0077cc] cursor-pointer transition-colors"
              >
                Contact Us
              </li>
              <li className="hover:text-[#0077cc] cursor-pointer transition-colors">
                Privacy Policy
              </li>
              <li className="hover:text-[#0077cc] cursor-pointer transition-colors">
                Terms of Service
              </li>
            </ul>
          </div>


        </div>

        {/* Bottom Bar */}
        <div className="max-w-[1400px] mx-auto pt-8 border-t border-gray-50 text-center text-gray-400 text-xs">
          © {new Date().getFullYear()} UptoSkills. All rights reserved.
        </div>
      </footer>


      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.7s ease-out;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default LandingPage;