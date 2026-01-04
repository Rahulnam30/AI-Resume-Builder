import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AdminLogin from './pages/AdminLogin';
import UserDashboardLayout from './layouts/UserDashboardLayout';
import Dashboard from './pages/Dashboard';
import AdminDashboardLayout from './layouts/AdminDashboardLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminTemplates from './pages/AdminTemplates';
import SubscriptionManagement from './pages/admin/SubscriptionManagement';
import TemplateStudio from './pages/admin/TemplateStudio';
import UserManagement from './pages/admin/UserManagement';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminSettings from './pages/admin/AdminSettings';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<UserDashboardLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route index element={<Dashboard />} />
                </Route>
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminDashboardLayout />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="templates" element={<AdminTemplates />} />
                    <Route path="users" element={<UserManagement />} />
                    <Route path="subscriptions" element={<SubscriptionManagement />} />
                    <Route path="analytics" element={<AdminAnalytics />} />
                    <Route path="settings" element={<AdminSettings />} />
                    <Route index element={<Navigate to="dashboard" replace />} />
                </Route>
                <Route path="/admin/templates/create" element={<TemplateStudio />} />
            </Routes>
        </Router>
    );
}

export default App;
