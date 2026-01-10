import React from "react";
import { Users, FileText, CreditCard, DollarSign } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
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

  const [recentUsers, setRecentUsers] = useState([]);

  const fetchTotalUser = async () => {
    try {
      const result = await axios.get(
        "http://localhost:5000/api/user/dashboard-stat",
        {
          withCredentials: true,
        }
      );
      console.log(result);

      setTotalUser(result.data.users.total);
      setTotalUserChange(result.data.users.change);
      setTotalActiveSub(result.data.subscriptions.total);
      setTotalActiveSubChange(result.data.subscriptions.change);
      setTotalRevenue(result.data.revenue.total);
      setTotalRevenueChange(result.data.revenue.change);
      setTotalResumeGenChange(result.data.resumes.change);
      setResumeGen(result.data.resumes.total);
      //for barchart
      setResumeChart(result.data.resumeChart);
      // Recent Users
      setRecentUsers(result.data.recentUsers || []);
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
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">
          Welcome back, here’s what’s happening today
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {item.value}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    {item.change} vs last month
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${item.bg} ${item.color}`}>
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts + Traffic */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
        {/* Resume Chart */}
        <div className="xl:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Resume Generation Traffic
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={resumeChart}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="resumes" fill="#8884d8">
                {resumeChart.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={["#6366F1", "#EC4899", "#F59E0B"][index % 3]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic Source */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Traffic Source
          </h2>

          {[
            { name: "Direct", value: "54%" },
            { name: "Referral", value: "32%" },
            { name: "Social", value: "14%" },
          ].map((item) => (
            <div key={item.name} className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{item.name}</span>
                <span>{item.value}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-indigo-600 rounded-full"
                  style={{ width: item.value }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Users */}
      <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent User Activity
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-3">User</th>
                <th>Email</th>
                <th>Date Joined</th>
                <th>Plan</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {recentUsers.length > 0 ? (
                recentUsers.map((user, i) => (
                  <tr key={i}>
                    <td className="py-3 font-medium text-gray-900">
                      {user.username || "User"}
                    </td>
                    <td className="text-gray-600">{user.email}</td>
                    <td className="text-gray-500">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
                          ${user.plan === "Pro"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-gray-100 text-gray-700"
                          }`}
                      >
                        {user.plan || "Free"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">
                    No recent activity found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
