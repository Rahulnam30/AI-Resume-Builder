import React, { useEffect, useState } from "react";
import { TrendingUp, Users, UserCheck, UserMinus, Layout } from "lucide-react";
import axiosInstance from "../../../api/axios";

export default function AdminAnalytics() {
  const [userGrowth, setUserGrowth] = useState({ count: 0, note: "" });
  const [conversions, setConversions] = useState({ count: 0, note: "" });
  const [activeUsers, setActiveUsers] = useState({ count: 0, note: "" });
  const [churnRate, setChurnRate] = useState({ count: 0, note: "" });
  const [templatesUsed, setTemplatesUsed] = useState({ count: 0, note: "" });
  const [mostUsedTemplates, setMostUsedTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const response = await axiosInstance.get("/api/user/analytics-stat");
      setUserGrowth(response.data.userGrowth);
      setConversions(response.data.conversions);
      setActiveUsers(response.data.activeUsers);
      setChurnRate(response.data.churnRate);
      setTemplatesUsed(response.data.templatesUsed);
      setMostUsedTemplates(response.data.mostUsedTemplates || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      setLoading(false);
    }
  };

  const stats = [
    {
      title: "User Growth",
      value: loading ? "..." : `${userGrowth.count} Users`,
      note: userGrowth.note,
      icon: <TrendingUp className="text-green-600" />,
      valueColor: "text-green-600",
    },
    {
      title: "Paid Conversions",
      value: loading ? "..." : `${conversions.count} Users`,
      note: conversions.note,
      icon: <Users className="text-blue-600" />,
      valueColor: "text-blue-600",
    },
    {
      title: "Active Users",
      value: loading ? "..." : `${activeUsers.count} Users`,
      note: activeUsers.note,
      icon: <UserCheck className="text-purple-600" />,
      valueColor: "text-purple-600",
    },
    {
      title: "Templates Used",
      value: loading ? "..." : `${templatesUsed.count} Templates`,
      note: templatesUsed.note,
      icon: <Layout className="text-orange-600" />,
      valueColor: "text-orange-600",
    },
    {
      title: "Churned Users",
      value: loading ? "..." : `${churnRate.count} Users`,
      note: churnRate.note,
      icon: <UserMinus className="text-red-600" />,
      valueColor: "text-red-600",
    },
  ];

  return (
    <div className="min-h-screen flex-1 p-6 sm:p-8 lg:p-10 bg-slate-50 text-slate-900">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">System Analytics</h1>
        <p className="text-slate-600 mt-2">
          Deep dive into platform performance & user engagement.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5 mb-10">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <p className="text-slate-500 text-sm">{item.title}</p>
              {item.icon}
            </div>

            <p className={`text-3xl font-bold mt-3 ${item.valueColor}`}>
              {item.value}
            </p>

            <p className="text-slate-500 text-sm mt-2">{item.note}</p>
          </div>
        ))}
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue */}
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">
            Revenue & Subscription Trends
          </h2>

          <div className="h-64 flex items-center justify-center text-slate-400 border border-dashed border-slate-300 rounded-xl">
            Chart will be added here (Recharts / Chart.js)
          </div>
        </div>

        {/* Templates */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Most Used Templates</h2>

          {loading ? (
            <div className="text-center text-slate-400 py-8">Loading...</div>
          ) : mostUsedTemplates.length > 0 ? (
            <div className="space-y-4 text-sm">
              {mostUsedTemplates.map((template, index) => {
                const colors = ["text-blue-600", "text-purple-600", "text-red-600", "text-orange-600", "text-slate-500"];
                return (
                  <div key={template.templateId} className="flex justify-between items-center">
                    <span className="text-slate-700">
                      Template {template.templateId}
                    </span>
                    <span className={`${colors[index % colors.length]} font-medium`}>
                      {template.percentage}% ({template.count})
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-slate-400 py-8">
              No template usage data yet
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-14 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} AI Resume Builder · Analytics
      </footer>
    </div>
  );
}
