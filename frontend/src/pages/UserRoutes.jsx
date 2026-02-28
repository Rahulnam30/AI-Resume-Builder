// src/pages/UserRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import UserSidebar from "../components/user/Sidebar/UserSidebar";

// Pages
import Dashboard from "../components/user/Dashboard/Dashboard";
import ATSChecker from "../components/user/ATSChecker/ATSChecker";
import MyResumes from "../components/user/MyResumes/MyResumes";
// import Preview from "../components/user/Preview/FullPreview";
import Profile from "../components/user/Profile/EditProfile";
import ResumeBuilder from "../components/user/ResumeBuilder/ResumeBuilder";
import Templates from "../components/user/Templates/TemplatesDashboardPage";
import CVBuilder from "../components/user/CV/CVBuilder";
import CoverLetterBuilder from "../components/user/CoverLetter/CoverLetterBuilder";
import Downloads from "../components/user/Downloads/Downloads";
import UserNotification from "../components/user/UserNotification/UserNotification";



const UserRoutes = () => {
  return (
    <Routes>
      {/* Layout Route */}
      <Route element={<UserSidebar />}>

        {/* /user → /user/dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route
          path="dashboard"
          element={
            <Dashboard
              user={{ name: "Meghana" }}
              resumes={[]}
              setActivePage={() => { }}
            />
          }
        />

        <Route path="resume-builder" element={<ResumeBuilder />} />
        <Route path="cv" element={<CVBuilder />} />
        <Route path="cover-letter" element={<CoverLetterBuilder />} />

        <Route path="ats-checker" element={<ATSChecker />} />
        <Route path="my-resumes" element={<MyResumes />} />
        <Route path="notifications" element={<UserNotification />} />
        <Route path="downloads" element={<Downloads />} />
        {/* <Route path="full-preview" element={<Preview />} /> */}
        <Route path="edit-profile" element={<Profile />} />



        

      </Route>
    </Routes>
  );
};

export default UserRoutes;
