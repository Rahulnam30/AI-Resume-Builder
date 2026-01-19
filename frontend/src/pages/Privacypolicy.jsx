import React from "react";
import { useNavigate, Link } from "react-router-dom";
import UpToSkillsImg from "../assets/UptoSkills.webp";
import { useEffect, useState } from "react";
import Footer from "./Footer";

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isLoggedIn =
    typeof window !== "undefined" && !!localStorage.getItem("token");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const policys = [
    {
      icon: "fa-clipboard-list",
      title: "Information Collection & Usage",
      content:
        "We collect personal information including your name, email address, phone number, work history, education, skills, certifications, and any other details you provide while creating your resume. This data is used exclusively to generate, optimize, and store your professional resume.",
      color: "green"
    },
    {
      icon: "fa-brain",
      title: "AI Processing & Analysis",
      content:
        "Our AI technology analyzes your resume content to provide intelligent suggestions, identify skill gaps, optimize keywords for ATS systems, and generate tailored content. Your data is processed securely and is never used to train external AI models without your explicit consent.",
      color: "orange"
    },
    {
      icon: "fa-database",
      title: "Data Storage & Security",
      content:
        "Your resume data is encrypted both in transit and at rest using industry-standard encryption protocols. We store your information on secure cloud servers with regular backups, multi-factor authentication, and continuous security monitoring to prevent unauthorized access.",
      color: "green"
    },
    {
      icon: "fa-plug",
      title: "Third-Party Integrations",
      content:
        "We may integrate with trusted third-party services such as LinkedIn for profile import, payment processors for subscriptions, and analytics tools to improve our service. These partners are carefully vetted and bound by strict data protection agreements.",
      color: "orange"
    },
    {
      icon: "fa-user-shield",
      title: "User Rights & Data Control",
      content:
        "You have complete control over your data. You can access, modify, download, or permanently delete your resume and personal information at any time through your account settings. We respect your right to data portability and will provide your data in a standard format upon request.",
      color: "green"
    },
    {
      icon: "fa-cookie-bite",
      title: "Cookies & Tracking Technologies",
      content:
        "We use essential cookies to maintain your session and remember your preferences. Optional analytics cookies help us understand how you use our platform to improve user experience. You can manage cookie preferences in your browser settings at any time.",
      color: "orange"
    },
    {
      icon: "fa-clock",
      title: "Data Retention Policy",
      content:
        "We retain your resume data for as long as your account remains active. Inactive accounts are maintained for 24 months before archival. You can request immediate deletion at any time. Deleted data is permanently removed from our systems within 30 days, except where legally required to retain certain records.",
      color: "green"
    },
    {
      icon: "fa-download",
      title: "Account Deletion & Data Export",
      content:
        "You can export all your data in PDF, DOCX, or JSON format at any time. If you choose to delete your account, all associated data including resumes, personal information, and usage history will be permanently removed. This action is irreversible.",
      color: "orange"
    },
    {
      icon: "fa-child",
      title: "Age of Consent",
      content:
        "By using this site, you confirm that you are at least the age of majority in your jurisdiction, or that you have given us your consent to allow any of your minor dependents to use this site.",
      color: "green"
    },
    {
      icon: "fa-bell",
      title: "Policy Updates & Notifications",
      content:
        "We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. When significant changes occur, we will notify you. Continued use of UpToSkills after updates constitutes acceptance of the revised policy.",
      color: "orange"
    },
  ];

  return (
    <div className="min-h-screen text-gray-900 bg-white select-none">
      <nav className="sticky top-0 z-50 py-4 border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <img
              src={UpToSkillsImg}
              alt="UpToSkills Logo"
              className="w-[150px]"
            />
          </div>

          {/* Section to display navigation bar */}

          <div className={`flex-1 flex justify-center ${mobileMenuOpen ? "hidden" : ""}`}>
            <ul className="flex items-center gap-8 hidden md:flex">
              
              <li className="cursor-pointer hover:text-orange-600">
                <Link to="/about">About us</Link>
              </li>
              <li className="cursor-pointer hover:text-orange-600">
                <Link to="/#free-templates">Templates</Link>
              </li>

              {/* Features Dropdown */}
              <li className="relative group cursor-pointer hover:text-orange-600">
                <div className="flex items-center gap-1">
                  <span>Features</span>
                  <i className="fas fa-chevron-down text-xs transition-transform duration-300 group-hover:rotate-180"></i>
                </div>
                
              {/* Features Dropdown Menu */}
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <ul className="py-2">
                    <li className="px-4 py-3 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                      <Link to="/resume-checker" className="flex items-center gap-3 text-black">
                        <i className="fas fa-clipboard-check text-blue-600"></i>
                        <span>AI Resume Checker</span>
                      </Link>
                    </li>
                    <li className="px-4 py-3 hover:bg-green-50 hover:text-green-600 transition-colors duration-200">
                      <Link to={`${isLoggedIn ? "/user/resume-builder" : "/login"}`} className="flex items-center gap-3 text-black">
                        <i className="fas fa-file-alt text-green-600"></i>
                        <span>AI Resume Builder</span>
                      </Link>
                    </li>
                    <li className="px-4 py-3 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200">
                      <Link to="/" className="flex items-center gap-3 text-black">
                        <i className="fas fa-check-circle text-purple-600"></i>
                        <span>ATS Optimization</span>
                      </Link>
                    </li>
                    <li className="px-4 py-3 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200">
                      <Link to="/" className="flex items-center gap-3 text-black">
                        <i className="fas fa-envelope text-teal-600"></i>
                        <span>Cover Letter Gen</span>
                      </Link>
                    </li>
                    <li className="px-4 py-3 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200">
                      <Link to="/" className="flex items-center gap-3 text-black">
                        <i className="fas fa-magic text-indigo-600"></i>
                        <span>Smart Formatting</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>  

              {isLoggedIn && (
                <li className="cursor-pointer hover:text-orange-600">
                  <Link to="/user/dashboard">Dashboard</Link>
                </li>
              )}
              <li className="cursor-pointer hover:text-orange-600">
                <Link to="/pricing">Pricing</Link>
              </li>
              <li className="cursor-pointer hover:text-orange-600">
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Empty div to balance the layout (acts as spacer for right side) */}
          <div className="w-[150px]"></div>
        </div>
      </nav>

      {/* Section to display privacy policy page title and subtitle */}

      <section className="text-center bg-gradient-to-b from-blue-50 via-white to-white py-20 pb-10">
        <div className="max-w-4xl px-6 mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm text-green-700 bg-green-200 rounded-full">
            <i className="fa-solid fa-shield-halved"></i>
            <span>Data Protection</span>
          </div>

          <div className="relative mb-6">
            <h1 className="text-5xl font-extrabold md:text-6xl">
              Privacy Policy
            </h1>
          </div>

          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Learn how UpToSkills - AI Resume Builder protects your personal
            information and respects your privacy.
          </p>
        </div>
      </section>

      {/* Section to display privacy policy cards, icons, badges, title and content */}

      <section className="max-w-6xl px-6 pt-10 pb-4 mx-auto space-y-10">
        {policys.map((policy, index) => (
          <div
            key={index}
            className="p-12 transition-all duration-300 bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl rounded-3xl hover:shadow-2xl hover:shadow-green-300/50 hover:bg-white/50 hover:border-white/80 hover:-translate-y-1"
          >
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center justify-center w-16 h-16 font-bold text-orange-700 bg-gradient-to-br from-orange-100/80 to-orange-200/60 backdrop-blur-sm rounded-xl text-2xl shadow-lg">
                {index + 1}
              </div>
              <i
                className={`fa-solid ${policy.icon} text-orange-600 text-3xl drop-shadow-lg`}
              ></i>
              <h2 className="text-4xl font-semibold text-gray-900 drop-shadow-sm">
                {policy.title}
              </h2>
            </div>
            <p className="text-xl leading-relaxed text-gray-700">{policy.content}</p>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}