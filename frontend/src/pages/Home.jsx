import { useState, useEffect } from 'react'

function LandingPage({ onNavigateToTemplates }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('students')

  // Scroll animation for How It Works section
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-in')
        }
      })
    }, observerOptions)

    const stepCards = document.querySelectorAll('.step-card')
    stepCards.forEach(card => observer.observe(card))

    return () => {
      stepCards.forEach(card => observer.unobserve(card))
    }
  }, [])

  const templates = [
    { 
      name: "Chronological", 
      desc: "Traditional timeline format", 
      image: "/templates/chronological.png",
      bgColor: "from-blue-500 to-cyan-500"
    },
    { 
      name: "Functional", 
      desc: "Skills-based layout", 
      image: "/templates/functional.png",
      bgColor: "from-purple-500 to-pink-500"
    },
    { 
      name: "Creative", 
      desc: "Bold and unique design", 
      image: "/templates/creative.png",
      bgColor: "from-orange-500 to-red-500"
    },
    { 
      name: "Modern", 
      desc: "Contemporary professional", 
      image: "/templates/modern.png",
      bgColor: "from-green-500 to-teal-500"
    },
    { 
      name: "Minimalist", 
      desc: "Clean and simple", 
      image: "/templates/minimalist.png",
      bgColor: "from-indigo-500 to-blue-500"
    },
    { 
      name: "Executive", 
      desc: "Senior-level format", 
      image: "/templates/executive.png",
      bgColor: "from-yellow-500 to-orange-500"
    },
  ]

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const companies = [
    { name: 'Netflix', color: '#E50914' },
    { name: 'Amazon', color: '#FF9900' },
    { name: 'Airbnb', color: '#FF5A5F' },
    { name: 'Spotify', color: '#1DB954' },
    { name: 'Tesla', color: '#CC0000' },
    { name: 'Bloomberg', color: '#000000' },
    { name: 'Microsoft', color: '#00A4EF' },
    { name: 'Adobe', color: '#FF0000' }
  ]

  const howItWorksSteps = [
    {
      icon: 'fa-file-alt',
      title: 'CREATE RESUME',
      heading: 'Easily create or import your resume',
      description: 'Start your resume from scratch with our templates, upload an existing one, or import your LinkedIn profile.',
      buttonText: 'CREATE MY RESUME',
      buttonColor: 'blue'
    },
    {
      icon: 'fa-clipboard-check',
      title: 'RESUME SCORE',
      heading: 'Check and analyze your resume score',
      description: 'Get your resume score along with feedback on strengths, weaknesses, and tips to enhance it!',
      buttonText: 'CHECK MY SCORE',
      buttonColor: 'green'
    },
    {
      icon: 'fa-cog',
      title: 'CUSTOMIZATION',
      heading: 'Quickly customize your resume with AI',
      description: 'Simply input your experience, and let our AI generate impactful bullet points that showcase your skill and experience.',
      buttonText: 'CUSTOMIZE MY RESUME',
      buttonColor: 'orange'
    },
    {
      icon: 'fa-magic',
      title: 'OPTIMIZER',
      heading: 'Improve your resume instantly in one click',
      description: 'Effortlessly optimize your resume for any job listing with just one click for instant results',
      buttonText: 'OPTIMIZE MY RESUME',
      buttonColor: 'pink'
    },
    {
      icon: 'fa-download',
      title: 'DOWNLOAD RESUME',
      heading: 'Your winning resume is ready!',
      description: 'Download your job-ready resume, or craft multiple tailored versions.',
      buttonText: 'DOWNLOAD MY RESUME',
      buttonColor: 'green'
    }
  ]

  const features = [
    {
      icon: 'fa-file-alt',
      title: 'Resume Checker',
      description: 'Analyze and optimize your resume for success'
    },
    {
      icon: 'fa-file',
      title: 'Resume Templates',
      description: 'Choose from professional, ATS-friendly designs'
    },
    {
      icon: 'fa-search',
      title: 'Resume Analysis',
      description: 'Get actionable feedback to improve your resume'
    },
    {
      icon: 'fa-chart-line',
      title: 'Resume Skill Gap Analyzer',
      description: 'Spot missing skills to match job requirements'
    },
    {
      icon: 'fa-edit',
      title: 'Resume Editor',
      description: 'Edit and enhance your resume with smart tools'
    },
    {
      icon: 'fa-palette',
      title: 'Customize Your Resume',
      description: 'Personalize your resume layout and branding'
    },
    {
      icon: 'fa-cogs',
      title: 'Resume Summary Generator',
      description: 'Create a strong resume summary in seconds'
    },
    {
      icon: 'fa-pen',
      title: 'AI Bulletpoint Writer',
      description: 'Generate tailored bullet points with AI help'
    },
    {
      icon: 'fa-linkedin',
      title: 'LinkedIn Resume Builder',
      description: 'Turn your LinkedIn profile into a resume fast'
    },
    {
      icon: 'fa-clock',
      title: 'Integrated With Job Tracker',
      description: 'Track job applications directly with your resume'
    },
    {
      icon: 'fa-chrome',
      title: 'Integrated With Chrome Extension',
      description: 'Edit resumes directly within your browser'
    },
    {
      icon: 'fa-envelope',
      title: 'Cover Letter Writer',
      description: 'Quickly craft tailored cover letters with ease'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0a1628] via-[#0f1f3d] to-[#1a2e52] text-white">
      {/* NAVIGATION */}
      <nav className="bg-[#0a1628]/95 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 py-4">
        <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex flex-col gap-1 cursor-pointer">
            <div className="text-2xl font-extrabold tracking-wide font-['Space_Grotesk']">
              UPTO<span className="text-[#00d9ff]">SKILLS</span>
            </div>
            <div className="text-[0.65rem] text-gray-400 tracking-wider uppercase">
              An Adobe Resume Experience
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-3 border border-[#00d9ff] text-[#00d9ff] rounded-lg font-semibold transition-all duration-300 hover:bg-[#00d9ff]/10">
              <i className="fas fa-sign-in-alt"></i>
              Login
            </button>
            <button className="px-6 py-3 bg-[#ff6b3d] text-white rounded-lg font-semibold transition-all duration-300 hover:bg-[#ff5722] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,107,61,0.4)]">
              Sign up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden bg-transparent border border-white/10 text-white text-2xl px-4 py-2 rounded-lg"
            onClick={toggleMobileMenu}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden flex flex-col gap-2 px-8 py-4 bg-[#0a1628]/98 border-t border-white/5">
            <button className="bg-transparent border border-white/10 text-white px-4 py-4 rounded-lg font-medium transition-all duration-300 hover:bg-white/5 hover:border-[#00d9ff]">
              Learn & Earn
            </button>
            <button className="bg-transparent border border-white/10 text-white px-4 py-4 rounded-lg font-medium transition-all duration-300 hover:bg-white/5 hover:border-[#00d9ff]">
              Jobs
            </button>
            <button className="bg-transparent border border-white/10 text-white px-4 py-4 rounded-lg font-medium transition-all duration-300 hover:bg-white/5 hover:border-[#00d9ff]">
              Compete
            </button>
            <button className="bg-transparent border border-white/10 text-white px-4 py-4 rounded-lg font-medium transition-all duration-300 hover:bg-white/5 hover:border-[#00d9ff]">
              Discover
            </button>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative px-8 pt-16 pb-8 min-h-[calc(100vh-100px)] flex flex-col overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-[20%] w-[500px] h-[500px] bg-[#00d9ff]/5 rounded-full blur-[100px]"></div>
          <div className="absolute top-[20%] right-[20%] w-[500px] h-[500px] bg-[#ff6b3d]/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT SIDE - Hero Content */}
          <div className="flex flex-col gap-8 pt-8 order-2 lg:order-1">
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight font-['Space_Grotesk']">
              <span className="bg-gradient-to-r from-[#ff6b3d] to-[#ffaa00] bg-clip-text text-transparent">
                UptoSkills AI
              </span>{' '}
              <span className="bg-gradient-to-r from-[#00d9ff] to-[#00a8ff] bg-clip-text text-transparent">
                Resume Builder:
              </span>
              <br />
              <span className="text-white text-4xl">Craft Your Perfect Resume in Minutes!</span>
            </h1>
            
            <h2 className="text-3xl font-bold text-[#00d9ff]">AI Resume Builder</h2>
            
            <p className="text-xl text-gray-300 font-normal">
              AI-Powered Content, Professional Templates, ATS-Friendly.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-3 px-10 py-5 text-lg font-bold text-white bg-gradient-to-r from-[#ff6b3d] to-[#ff5722] rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(255,107,61,0.5)] shadow-[0_10px_30px_rgba(255,107,61,0.3)]">
                <i className="fas fa-graduation-cap"></i>
                Start Building for Free
              </button>
              <button
                onClick={onNavigateToTemplates}
                className="px-10 py-5 text-lg font-bold text-[#00d9ff] border-2 border-[#00d9ff] rounded-xl transition-all duration-300 hover:bg-[#00d9ff]/10 hover:-translate-y-1"
              >
                View Templates
              </button>
            </div>
          </div>

          {/* RIGHT SIDE - Templates Preview WITH IMAGES */}
          <div className="flex flex-col gap-8 order-1 lg:order-2">
            <div className="bg-[#1e2a3f]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 overflow-hidden shadow-2xl">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                <span className="text-sm font-extrabold text-[#ff6b3d] tracking-widest">UPTOSKILLS</span>
                <span className="text-sm font-semibold text-white">Top Resume Templates</span>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.slice(0, 6).map((template, index) => (
                  <div 
                    key={index}
                    onClick={onNavigateToTemplates}
                    className="group cursor-pointer bg-[#2a3548] border border-white/10 rounded-xl p-3 transition-all duration-300 hover:bg-[#344054] hover:border-[#00d9ff] hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,217,255,0.3)] relative overflow-hidden"
                  >
                    {/* Template Image Container */}
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3 bg-white">
                      {/* Actual Image - will show when available */}
                      <img 
                        src={template.image} 
                        alt={template.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to gradient if image doesn't load
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      
                      {/* Fallback Gradient Preview (shows if image fails to load) */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${template.bgColor} opacity-20 hidden items-center justify-center`}>
                        <div className="w-full h-full p-4 flex flex-col gap-2">
                          {/* Mock resume content */}
                          <div className="w-12 h-12 bg-white/30 rounded-full mx-auto"></div>
                          <div className="h-2 bg-white/40 rounded w-3/4 mx-auto"></div>
                          <div className="h-2 bg-white/30 rounded w-1/2 mx-auto"></div>
                          <div className="mt-2 space-y-1.5">
                            <div className="h-1.5 bg-white/40 rounded w-full"></div>
                            <div className="h-1.5 bg-white/30 rounded w-5/6"></div>
                            <div className="h-1.5 bg-white/30 rounded w-4/6"></div>
                            <div className="h-1.5 bg-white/30 rounded w-full mt-3"></div>
                            <div className="h-1.5 bg-white/30 rounded w-3/4"></div>
                            <div className="h-1.5 bg-white/30 rounded w-2/3"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Template Name */}
                    <div className="text-center">
                      <div className="text-xs font-bold text-white uppercase tracking-wide">
                        {template.name}
                      </div>
                    </div>
                    
                    {/* Hover Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00d9ff] to-[#ff6b3d] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Companies Section */}
      <section className="py-20 px-8 bg-white/[0.02] overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-4 text-white">
            Trusted by job seekers who've landed at top companies
          </h2>
          <p className="text-lg text-gray-400 mb-12">
            Our users have secured positions at industry-leading companies such as
          </p>
          
          <div className="relative py-8">
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0f1f3d] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0f1f3d] to-transparent z-10 pointer-events-none"></div>
            
            {/* Marquee */}
            <div className="flex gap-16 animate-scroll hover:[animation-play-state:paused]">
              {companies.map((company, index) => (
                <div 
                  key={index}
                  className="text-2xl font-extrabold opacity-70 transition-all duration-300 hover:opacity-100 hover:scale-110 cursor-pointer whitespace-nowrap flex-shrink-0"
                  style={{ color: company.color }}
                >
                  {company.name}
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {companies.map((company, index) => (
                <div 
                  key={`dup-${index}`}
                  className="text-2xl font-extrabold opacity-70 transition-all duration-300 hover:opacity-100 hover:scale-110 cursor-pointer whitespace-nowrap flex-shrink-0"
                  style={{ color: company.color }}
                >
                  {company.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-8">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-5xl font-extrabold text-center mb-4 text-white">
            How <span className="bg-gradient-to-r from-[#ff6b3d] to-[#00d9ff] bg-clip-text text-transparent">It works</span>
          </h2>
          <p className="text-center text-lg text-gray-400 mb-16 max-w-3xl mx-auto">
            Quickly upload, customize, and download your resume tailored to any job description in no time
          </p>
          
          <div className="flex flex-col gap-8">
            {howItWorksSteps.map((step, index) => (
              <div 
                key={index}
                className="step-card opacity-0 -translate-x-24 transition-all duration-700 grid lg:grid-cols-2 gap-8 p-10 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-[#00d9ff] hover:translate-x-2"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col gap-4 order-2 lg:order-1">
                  <div className="inline-flex items-center gap-3 bg-[#00d9ff]/10 px-6 py-3 rounded-full w-fit border border-[#00d9ff]/20">
                    <i className={`fas ${step.icon} text-[#00d9ff] text-lg`}></i>
                    <span className="text-[#00d9ff] font-bold text-sm tracking-widest">{step.title}</span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white leading-snug">
                    {step.heading.split(' ').map((word, i) => 
                      ['create', 'import', 'analyze', 'score', 'customize', 'Quickly', 'Improve', 'instantly', 'one', 'click', 'winning', 'ready!'].includes(word) ? 
                      <span key={i} className="text-[#ff6b3d]">{word} </span> : word + ' '
                    )}
                  </h3>
                  
                  <p className="text-gray-400 text-base leading-relaxed">{step.description}</p>
                  
                  <button 
                    className={`mt-4 px-8 py-4 rounded-xl font-bold text-sm text-white w-fit transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] ${
                      step.buttonColor === 'blue' ? 'bg-gradient-to-r from-[#4c7fff] to-[#3d5af1]' :
                      step.buttonColor === 'green' ? 'bg-gradient-to-r from-[#22c55e] to-[#16a34a]' :
                      step.buttonColor === 'orange' ? 'bg-gradient-to-r from-[#ff6b3d] to-[#ff5722]' :
                      'bg-gradient-to-r from-[#ec4899] to-[#db2777]'
                    }`}
                  >
                    {step.buttonText}
                  </button>
                </div>
                
                <div className="bg-gradient-to-br from-[#00d9ff]/10 to-[#4c7fff]/10 rounded-2xl min-h-[300px] flex items-center justify-center text-gray-400 text-sm border border-white/10 order-1 lg:order-2">
                  Visual Placeholder
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Templates Section */}
      <section className="py-20 px-8 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-4 text-white">
            Access Free <span className="bg-gradient-to-r from-[#ff6b3d] to-[#00d9ff] bg-clip-text text-transparent">Resume Templates</span>
          </h2>
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
            All the templates are ATS compliant and can be customized according to your style using our AI Resume Builder.
          </p>
          
          <div className="flex items-center gap-8 mt-12">
            <button className="flex items-center justify-center w-12 h-12 bg-white/5 border border-white/10 text-white rounded-full transition-all duration-300 hover:bg-white/10 hover:border-[#00d9ff] hover:text-[#00d9ff]">
              <i className="fas fa-chevron-left"></i>
            </button>
            
            <div className="flex-1 grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-12 min-h-[400px] flex items-center justify-center text-gray-400 font-semibold transition-all duration-300 hover:bg-white/[0.08] hover:border-[#00d9ff] hover:-translate-y-2">
                Template 1
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-12 min-h-[400px] flex items-center justify-center text-gray-400 font-semibold transition-all duration-300 hover:bg-white/[0.08] hover:border-[#00d9ff] hover:-translate-y-2">
                Template 2
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-12 min-h-[400px] flex items-center justify-center text-gray-400 font-semibold transition-all duration-300 hover:bg-white/[0.08] hover:border-[#00d9ff] hover:-translate-y-2">
                Template 3
              </div>
            </div>
            
            <button className="flex items-center justify-center w-12 h-12 bg-white/5 border border-white/10 text-white rounded-full transition-all duration-300 hover:bg-white/10 hover:border-[#00d9ff] hover:text-[#00d9ff]">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-4 text-white">
            Explore <span className="bg-gradient-to-r from-[#ff6b3d] to-[#00d9ff] bg-clip-text text-transparent">AI Resume Builder Features</span>
          </h2>
          <p className="text-center text-lg text-gray-400 mb-16 max-w-3xl mx-auto">
            Dive into a powerful suite of career development tools and features designed to advance careers at all levels.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:bg-white/[0.08] hover:border-[#00d9ff] hover:-translate-y-1"
              >
                <div className="w-15 h-15 bg-gradient-to-br from-[#00d9ff]/20 to-[#4c7fff]/20 rounded-xl flex items-center justify-center mb-6">
                  <i className={`fas ${feature.icon} text-3xl text-[#00d9ff]`}></i>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a1628]/95 border-t border-white/5 px-8 py-12 mt-auto">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-5 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 text-2xl font-extrabold mb-4 font-['Space_Grotesk']">
              <span className="text-[#ff6b3d]">UPTO<span className="text-[#00d9ff]">SKILLS</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              AI-powered resume builder for your dream job.
            </p>
          </div>

          <div>
            <h4 className="text-white text-lg font-bold mb-4">Product</h4>
            <ul className="flex flex-col gap-3">
              <li className="text-gray-400 cursor-pointer transition-all duration-300 hover:text-[#00d9ff] hover:translate-x-1 text-sm">
                Features
              </li>
              <li className="text-gray-400 cursor-pointer transition-all duration-300 hover:text-[#00d9ff] hover:translate-x-1 text-sm">
                Pricing
              </li>
              <li className="text-gray-400 cursor-pointer transition-all duration-300 hover:text-[#00d9ff] hover:translate-x-1 text-sm">
                Templates
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-bold mb-4">Company</h4>
            <ul className="flex flex-col gap-3">
              <li className="text-gray-400 cursor-pointer transition-all duration-300 hover:text-[#00d9ff] hover:translate-x-1 text-sm">
                About
              </li>
              <li className="text-gray-400 cursor-pointer transition-all duration-300 hover:text-[#00d9ff] hover:translate-x-1 text-sm">
                Blog
              </li>
              <li className="text-gray-400 cursor-pointer transition-all duration-300 hover:text-[#00d9ff] hover:translate-x-1 text-sm">
                Careers
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-bold mb-4">Resources</h4>
            <ul className="flex flex-col gap-3">
              <li className="text-gray-400 cursor-pointer transition-all duration-300 hover:text-[#00d9ff] hover:translate-x-1 text-sm">
                Help Center
              </li>
              <li className="text-gray-400 cursor-pointer transition-all duration-300 hover:text-[#00d9ff] hover:translate-x-1 text-sm">
                Tutorials
              </li>
              <li className="text-gray-400 cursor-pointer transition-all duration-300 hover:text-[#00d9ff] hover:translate-x-1 text-sm">
                Community
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-bold mb-4">Legal</h4>
            <ul className="flex flex-col gap-3">
              <li className="text-gray-400 cursor-pointer transition-all duration-300 hover:text-[#00d9ff] hover:translate-x-1 text-sm">
                Privacy
              </li>
              <li className="text-gray-400 cursor-pointer transition-all duration-300 hover:text-[#00d9ff] hover:translate-x-1 text-sm">
                Terms
              </li>
              <li className="text-gray-400 cursor-pointer transition-all duration-300 hover:text-[#00d9ff] hover:translate-x-1 text-sm">
                Contact
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-white/5 text-gray-400 text-sm">
          © {new Date().getFullYear()} UptoSkills. All rights reserved.
        </div>
      </footer>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-slide-in {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
      `}</style>
    </div>
  )
}

export default LandingPage