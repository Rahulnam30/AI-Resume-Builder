import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import TemplatesPage from "./pages/TemplatesPage";
import BuilderPage from "./pages/Builder";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/Register";
import ForgotPasswordPage from "./pages/ForgotPassword";
import TemplateEditor from "./pages/TemplateEditor";
import Contact from "./pages/Contact";
import HelpCenter from "./pages/HelpCenter";
import About from "./pages/About";
import BlogPage from "./pages/Blogpage";
import CareersPage from "./pages/Careerpage";
import JobTrackerPro from "./pages/JobTracker (1)";
import RequireAuth from "./components/RequireAuth";
import ScrollToTop from "./components/ScrollToTop";
import PrivacyPolicy from "./pages/Privacypolicy";
import ResumeChecker from "./pages/ResumeChecker";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
//import UserHome from "./pages/UserHome";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/templates/:id" element={<TemplateEditor />} />
          <Route path="/builder" element={<BuilderPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help-center" element={<HelpCenter />} />          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/job-tracker" element={<RequireAuth><JobTrackerPro /></RequireAuth>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/resume-checker" element={<ResumeChecker />} />
          <Route path="/terms" element={<Terms />} />          {/* <Route path="/userhome" element={<UserHome />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

