// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import AdminHome from "./components/admin/AdminHome";
// import AdminUsers from "./components/admin/AdminUser/AdminUsers";
// import LandingPage from "./pages/Landingpage";
// import AdminLayout from "./components/admin/AdminLayout";

// import AdminDashboard from "./components/admin/AdminDashboard/AdminDashboard";
// import AdminCreateTemplate from "./components/admin/AdminCreateTemplates/AdminCreateTemplate";

// const App = () => {
//   return (
//     <Routes>
//       {/* Public route */}
//       <Route path="/" element={<LandingPage />} />

//       {/* Admin routes with layout */}
//       <Route path="/admin" element={<AdminLayout />}>
//         <Route index element={<AdminHome />} /> {/* /admin */}
//         <Route path="/admin/dashboard" element={<AdminDashboard />} />
//         <Route
//           path="/admin/create-templates"
//           element={<AdminCreateTemplate />}
//         />
//         <Route path="/admin/user" element={<AdminUsers />} />
//         {/* /admin/dashboard */}
//         {/* Add other admin pages here */}
//       </Route>
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Public pages
import Home from './pages/Home'
import TemplatesPage from './pages/TemplatesPage'
import BuilderPage from './pages/Builder'
import LoginPage from './pages/login'
import RegisterPage from './pages/Register'
import ForgotPasswordPage from './pages/ForgotPassword'
import TemplateEditor from './pages/TemplateEditor'
import NotFound from './pages/NotFound'
import Contact from './pages/Contact'
import HelpCenter from './pages/HelpCenter'

// Admin area
import AdminLayout from './components/admin/AdminLayout'
import AdminDashboard from './components/admin/AdminDashboard/AdminDashboard'
import TemplateDocs from './components/admin/AdminCreateTemplates/TemplateDocs'
import Resume from './components/admin/resume'
import AdminUsers from './components/admin/AdminUser/AdminUsers'
import AdminSubscription from './components/admin/AdminSubscription/AdminSubscription'
import AdminAcceptUser from './components/admin/AdminAcceptUserTemplate/AdminAcceptUser'
import AdminAnalytics from './components/admin/AdminAnalytics/AdminAnalytics'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/templates/:id" element={<TemplateEditor />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/builder" element={<BuilderPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help-center" element={<HelpCenter />} />

          {/* Admin routes with layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="create-templates" element={<TemplateDocs />} />
            <Route path="templates" element={<Resume />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="subscription" element={<AdminSubscription />} />
            <Route path="template-requests" element={<AdminAcceptUser />} />
            <Route path="analytics" element={<AdminAnalytics />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
