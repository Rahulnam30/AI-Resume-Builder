import React from "react";
import { Users, FileText, CreditCard, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "12,450",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Resumes Generated",
      value: "45,200",
      change: "+25%",
      icon: FileText,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      title: "Active Subscriptions",
      value: "3,100",
      change: "+8%",
      icon: CreditCard,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Total Revenue",
      value: "$124,500",
      change: "+18%",
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-50",
    },
  ];

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
          <div className="h-64 border border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400">
            Bar Chart (Recharts / Chart.js)
          </div>
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
                <th>Resume Title</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {[
                {
                  user: "John Doe",
                  resume: "Software Engineer Resume",
                  date: "Nov 14, 2023",
                  status: "Active",
                },
                {
                  user: "Sarah Smith",
                  resume: "Marketing Manager CV",
                  date: "Nov 13, 2023",
                  status: "Pending",
                },
                {
                  user: "Michael Johnson",
                  resume: "Full Stack V2",
                  date: "Nov 12, 2023",
                  status: "Active",
                },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="py-3 font-medium text-gray-900">{row.user}</td>
                  <td className="text-gray-600">{row.resume}</td>
                  <td className="text-gray-500">{row.date}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          row.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
