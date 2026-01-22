import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { 
  Menu, LogIn, UserPlus, LogOut, 
  CheckCircle, Layout, FileSearch, Zap, Edit3,
  BarChart3, Layers, Activity, Palette, PenTool 
} from 'lucide-react';
import UpToSkillsImg from '../assets/UptoSkills.webp';

export default function NavBar() {
  const navigate = useNavigate()
  const isLoggedIn =
    typeof window !== "undefined" && !!localStorage.getItem("token");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-4 bg-white/95 backdrop-blur-md border-b border-gray-100 select-none">
      <div className="max-w-[1400px] mx-auto px-6 flex items-center">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 focus:outline-none"
          aria-label="Go to home"
        >
          <img src={UpToSkillsImg} alt="UptoSkills Logo" className="w-[140px]" />
        </button>

        {/* Section to display navigation bar */}

          <div className={`flex-1 flex justify-center ${isLoggedIn ? "" : "ml-24"} ${mobileMenuOpen ? "hidden" : ""}`}>
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

                {/* Features Dropdown Menu - 2 Columns */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] bg-white border border-gray-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="flex py-2">
                    {/* Left Column */}
                    <ul className="flex-1 py-2">
                      <li className="px-4 py-3 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                        <Link
                          to="/resume-checker"
                          className="flex items-center gap-3 text-gray-700">
                          <CheckCircle className="text-blue-500 w-5 h-5" />
                          <span className="font-medium">AI Resume Checker</span>
                        </Link>
                      </li>
                      
                      <li className="px-4 py-3 hover:bg-emerald-50 hover:text-emerald-600 transition-colors duration-200">
                        <Link
                          to="/TemplatesFeature"
                          className="flex items-center gap-3 text-gray-700">
                          <Layout className="text-emerald-500 w-5 h-5" />
                          <span className="font-medium">Categorized Templates</span>
                        </Link>
                      </li>
                      
                      <li className="px-4 py-3 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200">
                        <Link
                          to="/ats-checker"
                          className="flex items-center gap-3 text-gray-700">
                          <FileSearch className="text-purple-500 w-5 h-5" />
                          <span className="font-medium">ATS Score Checker</span>
                        </Link>
                      </li>
                      
                      <li className="px-4 py-3 hover:bg-cyan-50 hover:text-cyan-600 transition-colors duration-200">
                        <Link
                          to="/AI-builder"
                          className="flex items-center gap-3 text-gray-700">
                          <Zap className="text-cyan-500 w-5 h-5" />
                          <span className="font-medium">Guilded AI Builder</span>
                        </Link>
                      </li>
                      
                      <li className="px-4 py-3 hover:bg-rose-50 hover:text-rose-600 transition-colors duration-200">
                        <Link
                          to="/content-enhance"
                          className="flex items-center gap-3 text-gray-700">
                          <Edit3 className="text-rose-500 w-5 h-5" />
                          <span className="font-medium">Content Enhancement</span>
                        </Link>
                      </li>
                    </ul>

                    {/* Vertical Divider */}
                    <div className="w-px bg-gray-200"></div>

                    {/* Right Column */}
                    <ul className="flex-1 py-2">
                      <li className="px-4 py-3 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200">
                        <Link
                          to="/score-checker"
                          className="flex items-center gap-3 text-gray-700">
                          <BarChart3 className="text-amber-500 w-5 h-5" />
                          <span className="font-medium">Live Quality Scoring</span>
                        </Link>
                      </li>
                      
                      <li className="px-4 py-3 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200">
                        <Link
                          to="/resume-hub"
                          className="flex items-center gap-3 text-gray-700">
                          <Layers className="text-indigo-500 w-5 h-5" />
                          <span className="font-medium">Resume Manager</span>
                        </Link>
                      </li>
                      
                      <li className="px-4 py-3 hover:bg-green-50 hover:text-green-600 transition-colors duration-200">
                        <Link
                          to="/growths"
                          className="flex items-center gap-3 text-gray-700">
                          <Activity className="text-green-500 w-5 h-5" />
                          <span className="font-medium">Growth Insights</span>
                        </Link>
                      </li>
                      
                      <li className="px-4 py-3 hover:bg-violet-50 hover:text-violet-600 transition-colors duration-200">
                        <Link
                          to="/cv"
                          className="flex items-center gap-3 text-gray-700">
                          <Palette className="text-violet-500 w-5 h-5" />
                          <span className="font-medium">CV Formatting</span>
                        </Link>
                      </li>
                      
                      <li className="px-4 py-3 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200">
                        <Link
                          to="/cover-letter"
                          className="flex items-center gap-3 text-gray-700">
                          <PenTool className="text-teal-500 w-5 h-5" />
                          <span className="font-medium">Cover Letter Builder</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
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

          {!isLoggedIn && (
            <div className="items-center hidden gap-6 md:flex">
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-3 px-6 py-2.5 border-2 border-[#0077cc] text-[#0077cc] rounded-xl font-bold transition-all duration-300 hover:bg-[#0077cc] hover:text-white hover:shadow-lg hover:shadow-blue-100 hover:-translate-y-1 active:scale-95"
              >
                <LogIn size={20} />
                <span>Login</span>
              </button>

              <button
                onClick={() => navigate("/register")}
                className="flex items-center gap-3 px-6 py-2.5 bg-[#e65100] text-white rounded-xl font-bold transition-all duration-300 border-2 border-transparent hover:bg-[#ff6d00] hover:shadow-xl hover:shadow-orange-200 hover:-translate-y-1 active:scale-95"
              >
                <UserPlus size={20} />
                <span>Sign up</span>
              </button>
            </div>
          )}

          {isLoggedIn && (
            <div className="items-center hidden gap-6 md:flex">
              <button
                onClick={() => {
                  navigate("/login");
                  localStorage.removeItem("token");
                }}
                className="flex items-center gap-3 px-6 py-2.5 bg-[#e65100] text-white rounded-xl font-bold transition-all duration-300 border-2 border-transparent hover:bg-[#ff6d00] hover:shadow-xl hover:shadow-orange-200 hover:-translate-y-1 active:scale-95"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          )}

          <button className="text-2xl md:hidden" onClick={toggleMobileMenu}>
            <Menu size={28} />
          </button>

      </div>
    </nav>
  )
}