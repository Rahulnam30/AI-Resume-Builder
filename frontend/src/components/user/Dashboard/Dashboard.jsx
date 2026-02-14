import StatCard from "./StatCard";
import RecentResumes from "./RecentResumes";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// Corrected Import based on your file structure
import UserNavBar from "../UserNavBar/UserNavBar"; 
import axios from "axios";

import {
  FaFileAlt,
  FaEye,
  FaChartLine,
} from "react-icons/fa";

import "./Dashboard.css";

const Dashboard = ({ setActivePage }) => {
  const navigate = useNavigate();

  // Fetch real dashboard data
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/user/dashboard",
          { withCredentials: true }
        );
        setDashboardData(res.data);
      } catch (err) {
        console.error("Dashboard fetch failed", err);
      }
    };

    fetchDashboard();
  }, []);

  // Extraction of data from backend response
  const resumesCreated = dashboardData?.stats.resumesCreated || 0;
  const resumesThisWeek = dashboardData?.stats.resumesThisWeek || 0;
  const avgAtsScore = dashboardData?.stats.avgAtsScore || 0;
  const atsDelta = dashboardData?.stats.atsDelta || 0;
  const profileViews = dashboardData?.stats.profileViews || 0;

  return (
    <div className="dashboard-page">
      {/* 1. Integrated the correct UserNavBar at the top */}
      <UserNavBar />

      <div className="dashboard-content-container">
        <div className="page-header">
          <h1>Welcome back, {dashboardData?.user.name || "User"}</h1>
          <button
            className="create-btn"
            onClick={() => navigate("/user/resume-builder")}
          >
            + Create New Resume
          </button>
        </div>

        {/* AI Resume Analysis Section */}
        <div className="ai-card">
          <div className="ai-left">
            <span className="ai-label">✨ AI RESUME ANALYSIS</span>
            <h2>{avgAtsScore}/100</h2>

            <div className="ai-progress">
              <div
                className="ai-progress-fill"
                style={{ width: `${Math.min(avgAtsScore, 100)}%` }}
              />
            </div>

            <p className="ai-subtext">
              Your resume is looking good, but could be stronger.
            </p>
          </div>

          <div className="ai-right">
            <div className="ai-tip">
              💡 Tip: Try adding more strong action verbs to your
              “Experience” section to increase impact.
            </div>
            <button className="ai-btn">Improve Now</button>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="dashboard-stats">
          <StatCard
            label="Resumes Created"
            value={resumesCreated}
            trend={`+${resumesThisWeek} this week`}
            icon={<FaFileAlt />}
          />

          <StatCard
            label="Avg ATS Score"
            value={`${avgAtsScore}%`}
            trend={`${atsDelta >= 0 ? "+" : ""}${atsDelta}% this week`}
            icon={<FaChartLine />}
          />

          <StatCard
            label="Profile Views"
            value={profileViews}
            trend="+0 vs last week"
            icon={<FaEye />}
          />
        </div>

        {/* Recent Resumes Table/List */}
        <div className="dashboard-grid full-width-list">
          <RecentResumes
            resumes={dashboardData?.recentResumes || []}
            onViewAll={() => setActivePage("my-resumes")}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;