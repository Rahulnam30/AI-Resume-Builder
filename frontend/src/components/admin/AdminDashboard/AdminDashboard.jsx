import React, { useEffect, useState } from "react";
import { Users, FileText, CreditCard, DollarSign } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  PieChart,
  Pie,
} from "recharts";
import axiosInstance from "../../../api/axios";

export default function AdminDashboard() {
  const [totalUser, setTotalUser] = useState(0);
  const [totalUserChange, setTotalUserChange] = useState(0);
  const [totalActiveSub, setTotalActiveSub] = useState(0);
  const [totalActiveSubChange, setTotalActiveSubChange] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalRevenueChange, setTotalRevenueChange] = useState(0);
  const [totalResumeGen, setResumeGen] = useState(0);
  const [totalResumeGenChange, setTotalResumeGenChange] = useState(0);
  const [resumeChart, setResumeChart] = useState([]);

  const [subscriptionSplit, setSubscriptionSplit] = useState([]);
  const [userGrowth, setUserGrowth] = useState([]);
  const [dailyActivity, setDailyActivity] = useState([]);

  /* ------------------ DUMMY DATA ------------------ */
  const colors = ["#6366F1", "#22C55E", "#F59E0B", "#EC4899"];

  const stats = [
    {
      title: "Total Users",
      value: totalUser,
      change: `+${totalUserChange}%`,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Resumes Generated",
      value: totalResumeGen,
      change: `+${totalResumeGenChange}%`,
      icon: FileText,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      title: "Active Subscriptions",
      value: totalActiveSub,
      change: `+${totalActiveSubChange}%`,
      icon: CreditCard,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Total Revenue",
      value: `$ ${totalRevenue}`,
      change: `+${totalRevenueChange}%`,
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-50",
    },
  ];

  const fetchTotalUser = async () => {
    try {
      const result = await axiosInstance.get(
        "/api/user/dashboard-stat"
      );

      setTotalUser(result.data.users.total);
      setTotalUserChange(result.data.users.change);
      setTotalActiveSub(result.data.subscriptions.total);
      setTotalActiveSubChange(result.data.subscriptions.change);
      setTotalRevenue(result.data.revenue.total);
      setTotalRevenueChange(result.data.revenue.change);
      setResumeGen(result.data.resumes.total);
      setTotalResumeGenChange(result.data.resumes.change);
      setResumeChart(result.data.resumeChart);
      setSubscriptionSplit(result.data.subscriptionSplit);
      setUserGrowth(result.data.userGrowth);
      setDailyActivity(result.data.dailyActiveUsers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTotalUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back, here’s what’s happening</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="bg-white border rounded-2xl p-5 shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>
                  <p className="text-2xl font-bold">{item.value}</p>
                  <p className="text-sm text-green-600">{item.change}</p>
                </div>
                <div className={`p-3 rounded-xl ${item.bg} ${item.color}`}>
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-10">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-6">
          {/* Resume Trend */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm h-[350px] xl:col-span-2">
            <h3 className="text-base font-semibold mb-4">
              Resume Generation Trend
            </h3>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={resumeChart}>
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="resumes" radius={[6, 6, 0, 0]}>
                  {resumeChart.map((_, i) => (
                    <Cell key={i} fill={colors[i % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* User Growth */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm h-[350px] xl:col-span-2">
            <h3 className="text-base font-semibold mb-4">User Growth</h3>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={userGrowth}>
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#22C55E"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-6">
          {/* Subscription Plans */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm h-[350px]">
            <h3 className="text-base font-semibold mb-4 text-center">
              Subscription Distribution
            </h3>

            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={subscriptionSplit}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                >
                  {subscriptionSplit.map((_, i) => (
                    <Cell key={i} fill={colors[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            {/* Custom Legend */}
            <div className="flex justify-center gap-6 mt-4">
              {subscriptionSplit.map((item, i) => (
                <div
                  key={item.name}
                  className="flex items-center gap-2 text-sm"
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors[i] }}
                  />
                  <span className="text-gray-600">
                    {item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Active Users */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm h-[350px]">
            <h3 className="text-base font-semibold mb-4">Daily Active Users</h3>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={dailyActivity}>
                <XAxis dataKey="day" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="users" fill="#6366F1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
