import React from "react";
import { Link, useNavigate } from "react-router-dom";
import UpToSkillsImg from "../assets/UptoSkills.webp";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedinIn,
  faWhatsapp,
  faDiscord,
  faTelegramPlane,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  const navigate = useNavigate();

  const isLoggedIn =
    typeof window !== "undefined" && !!localStorage.getItem("token");

  const socialLinks = [
    {
      icon: faYoutube,
      bgColor: "bg-[#ff0000]",
      href: "https://www.youtube.com",
    },
    {
      icon: faInstagram,
      bgColor: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
      href: "https://www.instagram.com",
    },
    {
      icon: faLinkedinIn,
      bgColor: "bg-[#0077b5]",
      href: "https://www.linkedin.com",
    },
    {
      icon: faFacebookF,
      bgColor: "bg-[#1877f2]",
      href: "https://www.facebook.com",
    },
  ];

  const headerStyle =
    "text-[13px] font-black uppercase tracking-wider text-[#1a2e52] mb-4 flex items-center gap-2";
  const linkStyle =
    "text-sm text-gray-500 hover:text-[#e65100] transition-all duration-300 cursor-pointer flex items-center";

  return (
    <footer className="relative font-['Outfit'] bg-white border-t border-gray-100 overflow-hidden">
      {/* Subtle Background Accents */}
      <div className="absolute top-0 right-0 w-64 h-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-50 blur-3xl -z-10 opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-orange-50 blur-3xl -z-10 opacity-40"></div>

      <div className="max-w-[1400px] mx-auto px-8 pt-16 pb-10">
        {/* GRID SECTION */}
        <div className="grid grid-cols-1 mb-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-10">
          {/* 1. BRAND */}
          <div className="lg:col-span-1">
            <img
              src={UpToSkillsImg}
              alt="Logo"
              className="w-32 mb-4 cursor-pointer"
              onClick={() => navigate("/")}
            />

            {/* Added bottom margin to text for better separation */}
            <p className="text-[13px] leading-relaxed text-gray-400 font-medium mb-6">
              Empowering <span className="font-bold text-blue-500">skills</span>
              , <br />
              connecting{" "}
              <span className="font-bold text-orange-500">talent</span>{" "}
              worldwide.
            </p>

            {/* SOCIAL ICONS - Added mt-6 for top spacing */}
            <div className="grid grid-cols-4 gap-1 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social.bgColor} w-10 h-10 flex items-center justify-center rounded-xl text-white shadow-md hover:-translate-y-1 transition-all duration-300`}
                >
                  <FontAwesomeIcon icon={social.icon} className="text-base" />
                </a>
              ))}
            </div>
          </div>

          {/* 2. DISCOVER */}
          <div>
            <h4 className={headerStyle}>Discover</h4>
            <ul className="space-y-3">
              <li className={linkStyle}>
                <Link to="/#free-templates">Templates</Link>
              </li>
              <li className={linkStyle}>
                <Link to="/careers">Careers</Link>
              </li>
              <li className={linkStyle}>
                <Link to="/blog">Blog</Link>
              </li>
            </ul>
          </div>

          {/* 3. AI Features */}
          <div>
            <h4 className={headerStyle}>AI Features</h4>
            <ul className="space-y-3">
              <li className={linkStyle}>
                <Link to="/resume-checker">AI Resume Checker</Link>
              </li>
              <li className={linkStyle}>
                <Link to={`${isLoggedIn ? "/user/resume-builder" : "/login"}`}>
                  AI Resume Builder
                </Link>
              </li>
              <li className={linkStyle}>
                <Link to="/">ATS Optimization</Link>
              </li>
              <li className={linkStyle}>
                <Link to="/">Cover Letter Gen</Link>
              </li>
              <li className={linkStyle}>
                <Link to="/">Smart Formatting</Link>
              </li>
            </ul>
          </div>

          {/* 4. COMPANY */}
          <div>
            <h4 className={headerStyle}>Company</h4>
            <ul className="space-y-3">
              <li className={linkStyle}>
                <Link to="/about">About Us</Link>
              </li>
              <li className={linkStyle}>
                <Link to={`${isLoggedIn ? "/pricing" : "/login"}`}>
                  Pricing
                </Link>
              </li>
              <li className={linkStyle}>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* 5. SUPPORT */}
          <div>
            <h4 className={headerStyle}>Support</h4>
            <ul className="space-y-3">
              <li className={linkStyle}>
                <Link to="/help-center">Help Center</Link>
              </li>
              <li className={linkStyle}>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li className={linkStyle}>
                <Link to="/terms">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* 6. COMPACT STAY CONNECTED */}
          <div className="lg:col-span-1">
            <h4 className={headerStyle}>Stay Connected</h4>
            <p className="text-[11px] font-bold text-gray-400 mb-3 uppercase tracking-tighter">
              Updates & Opportunities
            </p>

            {/* Compact Input */}
            <div className="flex items-center p-0.5 mb-5 border border-gray-200 bg-gray-50 rounded-xl focus-within:ring-2 focus-within:ring-orange-500/10 transition-all">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 text-[12px] bg-transparent outline-none py-1.5"
              />
              <button className="p-2 text-white transition-all bg-orange-500 rounded-lg shadow-sm hover:bg-orange-600">
                <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col items-center justify-between gap-4 pt-6 border-t border-gray-100 md:flex-row">
          {/* COPYRIGHT */}
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            © {new Date().getFullYear()} UptoSkills Inc.
          </p>

          {/* BRANDED MOTTO */}
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