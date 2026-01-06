import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPasswordPage from "./pages/ForgotPassword";
import Builder from "./pages/Builder";
import TemplatesPublicPage from "./pages/TemplatesPublicPage";
import TemplateEditor from "./pages/TemplateEditor";
import HelpCenter from "./pages/HelpCenter";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// User routes
import UserRoutes from "./pages/UserRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/templates-public-page" element={<TemplatesPublicPage />} />
        <Route path="/template-editor" element={<TemplateEditor />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/contact" element={<Contact />} />

        {/* USER ROUTES */}
        <Route path="/user/*" element={<UserRoutes />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
