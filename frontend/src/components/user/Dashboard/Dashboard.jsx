import StatCard from "./StatCard";
import RecentResumes from "./RecentResumes";
import {
  FaFileAlt,
  FaCheckCircle,
  FaDownload,
  FaLayerGroup,
} from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = ({ user, resumes, setActivePage }) => {
  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>👋 Welcome back, {user?.name || "User"}!</h1>
        <p>Here's your resume building progress</p>
      </div>

      <div className="dashboard-stats">
        <StatCard
          icon={<FaFileAlt />}
          value={resumes.length}
          label="Resumes Created"
          colorClass="blue"
        />

        <StatCard
          icon={<FaCheckCircle />}
          value="92%"
          label="Avg ATS Score"
          colorClass="green"
        />

        <StatCard
          icon={<FaDownload />}
          value="12"
          label="Downloads"
          colorClass="purple"
        />

        <StatCard
          icon={<FaLayerGroup />}
          value="5"
          label="Templates Used"
          colorClass="orange"
        />
      </div>

      <div className="dashboard-grid">
        <RecentResumes
          resumes={resumes}
          onViewAll={() => setActivePage("my-resumes")}
        />
      </div>
    </div>
  );
};

export default Dashboard;
