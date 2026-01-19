import React from "react";
import { Link, useNavigate } from "react-router-dom";
import UpToSkillsImg from "../assets/UptoSkills.webp";

// Import React Icons
import { 
  SiYoutube, 
  SiInstagram, 
  SiLinkedin, 
  SiFacebook 
} from "react-icons/si";
import { FaArrowRight } from "react-icons/fa6";

function Footer() {
  const navigate = useNavigate();

  const isLoggedIn =
    typeof window !== "undefined" && !!localStorage.getItem("token");

  // Updated socialLinks to use React Icon Components directly
  const socialLinks = [
    { 
        icon: <SiYoutube size={18} />, 
        bgColor: "bg-[#ff0000]", 
        href: "https://www.youtube.com/channel/UCJzITNWKW5njk0AWkEZxSrw" 
    },
    { 
        icon: <SiInstagram size={18} />, 
        bgColor: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]", 
        href: "https://www.instagram.com/uptoskills?utm_medium=copy_link" 
    },
    { 
        icon: <SiLinkedin size={18} />, 
        bgColor: "bg-[#0077b5]", 
        href: "https://www.linkedin.com/company/uptoskills/posts/?feedView=all" 
    },
    { 
        icon: <SiFacebook size={18} />, 
        bgColor: "bg-[#1877f2]", 
        href: "https://www.facebook.com/Uptoskills/" 
    },
  ];

  const headerStyle = "text-[13px] font-black uppercase tracking-wider text-[#1a2e52] mb-5 flex items-center gap-2";
  const linkStyle = "text-sm text-gray-500 hover:text-[#e65100] transition-all duration-300 cursor-pointer flex items-center";

  return (
    <footer className="relative font-['Outfit'] bg-white border-t border-gray-100 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-64 h-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-50 blur-3xl -z-10 opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-orange-50 blur-3xl -z-10 opacity-40"></div>

      <div className="max-w-[1400px] mx-auto px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 gap-10 mb-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          
          {/* 1. BRAND & NEWSLETTER */}
          <div className="flex flex-col h-full">
            <img
              src={UpToSkillsImg}
              alt="Logo"
              className="w-32 mb-4 transition-opacity cursor-pointer hover:opacity-80"
              onClick={() => navigate("/")}
            />
            <p className="text-[13px] leading-relaxed text-gray-400 font-medium mb-6">
              Empowering <span className="font-bold text-blue-500">skills</span>, connecting <span className="font-bold text-orange-500">talent</span> worldwide.
            </p>

            {/* Social Icons using React Icons */}
            <div className="flex gap-2 mb-8">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social.bgColor} w-9 h-9 flex items-center justify-center rounded-xl text-white shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300`}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="mt-auto">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-[#1a2e52] mb-3">Stay Connected</h4>
              <div className="flex items-center p-1 border border-gray-200 bg-gray-50 rounded-xl focus-within:ring-2 focus-within:ring-orange-500/10 transition-all max-w-[240px]">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-3 text-[12px] bg-transparent outline-none py-1.5"
                />
                <button className="p-2 text-white transition-colors bg-orange-500 rounded-lg hover:bg-orange-600">
                  <FaArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>

          {/* 2. DISCOVER */}
          <div className="flex flex-col h-full">
            <h4 className={headerStyle}>Discover</h4>
            <ul className="space-y-4">
              <li className={linkStyle}><Link to="/#free-templates">Templates</Link></li>
              <li className={linkStyle}><Link to="/careers">Careers</Link></li>
              <li className={linkStyle}><Link to="/blog">Blog</Link></li>
            </ul>
          </div>

          {/* 3. AI FEATURES */}
          <div className="flex flex-col h-full">
            <h4 className={headerStyle}>AI Features</h4>
            <ul className="space-y-4">
              <li className={linkStyle}><Link to="/resume-checker">Resume Checker</Link></li>
              <li className={linkStyle}><Link to="/cover-letter">AI Cover Letter Builder</Link></li>
              <li className={linkStyle}><Link to="/cv">Professional CV Formatting</Link></li>
              <li className={linkStyle}><Link to="/score-checker">ATS Compatibility Audit</Link></li>
            </ul>
          </div>

          {/* 4. COMPANY */}
          <div className="flex flex-col h-full">
            <h4 className={headerStyle}>Company</h4>
            <ul className="space-y-4">
              <li className={linkStyle}><Link to="/about">About Us</Link></li>
              <li className={linkStyle}><Link to={`${isLoggedIn ? "/pricing" : "/login"}`}>Pricing</Link></li>
              <li className={linkStyle}><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* 5. SUPPORT */}
          <div className="flex flex-col h-full">
            <h4 className={headerStyle}>Support</h4>
            <ul className="space-y-4">
              <li className={linkStyle}><Link to="/help-center">Help Center</Link></li>
              <li className={linkStyle}><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li className={linkStyle}><Link to="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col items-center justify-between gap-6 pt-8 border-t border-gray-100 md:flex-row">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            ©️ {new Date().getFullYear()} UptoSkills Inc.
          </p>

          <div className="flex items-center gap-1 text-[13px] font-black tracking-tight">
            <span className="text-[#1a2e52]">Dream Big.</span>
            <span className="text-[#0077cc]">Skill Up.</span>
            <span className="text-[#e65100]">Fly High!</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;