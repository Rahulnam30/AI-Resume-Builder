import { useNavigate } from "react-router-dom";
import UpToSkillsImg from "../assets/UptoSkills.webp";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="px-8 pt-20 pb-10 bg-white border-t border-gray-100 select-none">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <img
            src={UpToSkillsImg}
            alt="Logo"
            className="w-40 mb-6 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <p className="text-sm leading-relaxed text-gray-500">
            The ultimate AI-powered toolkit for job seekers to build
            professional resumes and land dream roles.
          </p>
        </div>
        <div>
          <h4 className="mb-6 font-bold">Quick Links</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li
              onClick={() => navigate("/#free-templates")}
              className="hover:text-[#0077cc] cursor-pointer"
            >
              Templates
            </li>

            <li
              onClick={() => navigate("/resume-checker")}
              className="hover:text-[#0077cc] cursor-pointer"
            >
              AI Resume Checker
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-6 font-bold">Company</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li
              onClick={() => navigate("/about")}
              className="hover:text-[#0077cc] cursor-pointer"
            >
              About Us
            </li>
            <li
              onClick={() => navigate("/careers")}
              className="hover:text-[#0077cc] cursor-pointer"
            >
              Careers
            </li>
            <li
              onClick={() => navigate("/blog")}
              className="hover:text-[#0077cc] cursor-pointer"
            >
              Blog
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-6 font-bold">Support</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li
              onClick={() => navigate("/help-center")}
              className="hover:text-[#0077cc] cursor-pointer"
            >
              Help Center
            </li>
            <li
              onClick={() => navigate("/privacy-policy")}
              className="hover:text-[#0077cc] cursor-pointer"
            >
              Privacy Policy
            </li>
            <li
              onClick={() => navigate("/terms")}
              className="hover:text-[#0077cc] cursor-pointer"
            >
              Terms of Service
            </li>
            <li
              onClick={() => navigate("/contact")}
              className="hover:text-[#0077cc] cursor-pointer"
            >
              Contact Us
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto pt-8 border-t border-gray-50 text-center text-gray-400 text-xs">
        © {new Date().getFullYear()} UptoSkills. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
