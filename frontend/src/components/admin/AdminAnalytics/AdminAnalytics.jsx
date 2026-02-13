import React, { useEffect, useState } from "react";
import { TrendingUp, Users, UserCheck, UserMinus, Star, Activity, Zap, Shield } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axiosInstance from "../../../api/axios";

export default function AdminAnalytics() {
  const [userGrowth, setUserGrowth] = useState({ count: 0, note: "" });
  const [conversions, setConversions] = useState({ count: 0, note: "" });
  const [activeUsers, setActiveUsers] = useState({ count: 0, note: "" });
  const [churnRate, setChurnRate] = useState({ count: 0, note: "" });
  const [mostUsedTemplates, setMostUsedTemplates] = useState([]);
  const [revenueTrend, setRevenueTrend] = useState([]);
  const [subscriptionTrend, setSubscriptionTrend] = useState([]);
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
      setMostUsedTemplates(response.data.mostUsedTemplates || []);
      setRevenueTrend(response.data.revenueTrend || []);
      setSubscriptionTrend(response.data.subscriptionTrend || []);
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
      iconBg: "bg-green-50",
      valueColor: "text-slate-900",
    },
    {
      title: "Paid Conversions",
      value: loading ? "..." : `${conversions.count} Users`,
      note: conversions.note,
      icon: <Users className="text-blue-600" />,
      iconBg: "bg-blue-50",
      valueColor: "text-slate-900",
    },
    {
      title: "Active Users",
      value: loading ? "..." : `${activeUsers.count} Users`,
      note: activeUsers.note,
      icon: <UserCheck className="text-purple-600" />,
      iconBg: "bg-purple-50",
      valueColor: "text-slate-900",
    },
    {
      title: "Churned Users",
      value: loading ? "..." : `${churnRate.count} Users`,
      note: churnRate.note,
      icon: <UserMinus className="text-red-600" />,
      iconBg: "bg-red-50",
      valueColor: "text-slate-900",
    },
  ];

  return (
    <div className="min-h-screen flex-1 p-4 sm:p-6 bg-slate-50 text-slate-900">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">System Analytics</h1>
        <p className="text-sm sm:text-base text-slate-600 mt-1 sm:mt-2">
          Deep dive into platform performance & user engagement.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-5 mb-10">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <p className="text-slate-500 text-sm">{item.title}</p>
              <div className={`${item.iconBg} p-3 rounded-full`}>
                {item.icon}
              </div>
            </div>

            <p className={`text-3xl font-bold mt-3 ${item.valueColor}`}>
              {item.value}
            </p>

            <p className="text-slate-500 text-sm mt-2">{item.note}</p>
          </div>
        ))}
      </div>

      {/* System Performance & Rating Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Platform Health Score */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Platform Health</h3>
            <div className="bg-green-50 p-2 rounded-full">
              <Activity className="text-green-600" size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-green-600">98.5</span>
            <span className="text-slate-500">/100</span>
          </div>
          <p className="text-sm text-slate-500 mt-2">System running smoothly</p>
          <div className="mt-4 bg-slate-100 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: '98.5%' }}></div>
          </div>
        </div>

        {/* User Satisfaction Rating */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">User Satisfaction</h3>
            <div className="bg-yellow-50 p-2 rounded-full">
              <Star className="text-yellow-600" size={20} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold text-yellow-600">4.7</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-2">Based on 2,847 reviews</p>
        </div>

        {/* Response Time */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Avg Response Time</h3>
            <div className="bg-blue-50 p-2 rounded-full">
              <Zap className="text-blue-600" size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-blue-600">245</span>
            <span className="text-slate-500">ms</span>
          </div>
          <p className="text-sm text-green-600 mt-2">↓ 12% faster than last week</p>
        </div>
      </div>

      {/* Data Quality & Security Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6">
        {/* Uptime */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-slate-500">System Uptime</p>
            <div className="bg-green-50 p-2 rounded-full">
              <Shield className="text-green-600" size={16} />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">99.98%</p>
          <p className="text-xs text-slate-500 mt-1">Last 30 days</p>
        </div>

        {/* Data Accuracy */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-slate-500">Data Accuracy</p>
            <div className="bg-purple-50 p-2 rounded-full">
              <Activity className="text-purple-600" size={16} />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">97.2%</p>
          <p className="text-xs text-slate-500 mt-1">Validation rate</p>
        </div>

        {/* API Success Rate */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-slate-500">API Success Rate</p>
            <div className="bg-blue-50 p-2 rounded-full">
              <Zap className="text-blue-600" size={16} />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">99.5%</p>
          <p className="text-xs text-green-600 mt-1">↑ 0.3% improvement</p>
        </div>

        {/* Error Rate */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-slate-500">Error Rate</p>
            <div className="bg-red-50 p-2 rounded-full">
              <Activity className="text-red-600" size={16} />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">0.5%</p>
          <p className="text-xs text-green-600 mt-1">↓ Within acceptable range</p>
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue */}
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">
            Revenue & Subscription Trends
          </h2>

          {loading ? (
            <div className="h-64 flex items-center justify-center text-slate-400">
              Loading chart data...
            </div>
          ) : revenueTrend.length > 0 || subscriptionTrend.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="month"
                  stroke="#64748b"
                  fontSize={12}
                  allowDuplicatedCategory={false}
                />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Legend />

                {revenueTrend.length > 0 && (
                  <Line
                    data={revenueTrend}
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Revenue ($)"
                    dot={{ fill: '#10b981', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                )}

                {subscriptionTrend.length > 0 && (
                  <Line
                    data={subscriptionTrend}
                    type="monotone"
                    dataKey="subscriptions"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Subscriptions"
                    dot={{ fill: '#3b82f6', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-slate-400 border border-dashed border-slate-300 rounded-xl">
              No trend data available yet
            </div>
          )}
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
