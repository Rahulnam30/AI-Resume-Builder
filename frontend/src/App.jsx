import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";

// Public pages
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
import Pricing from "./pages/Pricing";
import BlogPage from "./pages/Blogpage";
import CareersPage from "./pages/Careerpage";
import PrivacyPolicy from "./pages/Privacypolicy";
import ResumeChecker from "./pages/ResumeChecker";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

// User routes
import UserRoutes from "./pages/UserRoutes";

// Admin
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard/AdminDashboard";
import Resume from "./components/admin/resume";
import AdminUsers from "./components/admin/AdminUser/AdminUsers";
import AdminSubscription from "./components/admin/AdminSubscription/AdminSubscription";
import AdminAcceptUser from "./components/admin/AdminAcceptUserTemplate/AdminAcceptUser";
import AdminAnalytics from "./components/admin/AdminAnalytics/AdminAnalytics";
import AdminTemplates from "./components/admin/AdminCreateTemplates/Template";

function App() {
  return (
    <HashRouter>
      <ScrollToTop />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/templates/:id" element={<TemplateEditor />} />
        <Route path="/builder" element={<BuilderPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/resume-checker" element={<ResumeChecker />} />
        <Route path="/terms" element={<Terms />} />

        {/* USER DASHBOARD */}
        <Route path="/user/*" element={<UserRoutes />} />

        {/* ADMIN DASHBOARD */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="create-templates" element={<AdminTemplates />} />
          <Route path="templates" element={<Resume />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="subscription" element={<AdminSubscription />} />
          <Route path="template-requests" element={<AdminAcceptUser />} />
          <Route path="analytics" element={<AdminAnalytics />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;

