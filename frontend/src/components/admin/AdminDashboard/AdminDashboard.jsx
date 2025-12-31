import React from "react";
import { Users, FileText, Sparkles, TrendingUp, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const stats = [
    {
      title: "Total Users",
      value: "1,248",
      icon: Users,
      color: "text-blue-400",
    },
    {
      title: "Templates",
      value: "36",
      icon: FileText,
      color: "text-green-400",
    },
    {
      title: "AI Requests",
      value: "8,920",
      icon: Sparkles,
      color: "text-pink-400",
    },
    {
      title: "Growth",
      value: "+18%",
      icon: TrendingUp,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <p className="text-slate-400 mt-1 text-sm sm:text-base">
          Overview of platform performance & activity
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="bg-slate-900 border border-slate-800 rounded-xl sm:rounded-2xl
              p-4 sm:p-5 flex items-center gap-4 hover:border-slate-700 transition"
            >
              <div
                className={`p-3 rounded-lg sm:rounded-xl bg-slate-800 ${item.color}`}
              >
                <Icon size={22} />
              </div>
              <div>
                <p className="text-slate-400 text-xs sm:text-sm">
                  {item.title}
                </p>
                <p className="text-xl sm:text-2xl font-semibold">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8 sm:mt-10">
        {/* Recent Activity */}
        <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-xl sm:rounded-2xl p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Recent Activity
          </h2>

          <ul className="space-y-3 sm:space-y-4">
            {[
              "New resume template added",
              "AI model updated",
              "5 new users registered",
              "Analytics report generated",
            ].map((activity, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 text-slate-300 text-sm sm:text-base"
              >
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                {activity}
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl sm:rounded-2xl p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Quick Actions
          </h2>

          <div className="space-y-3">
            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg sm:rounded-xl bg-slate-800 hover:bg-slate-700 transition text-sm sm:text-base"
              onClick={() => navigate("/admin/create-templates")}
            >
              <Plus size={18} />
              Create Template
            </button>

            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg sm:rounded-xl bg-slate-800 hover:bg-slate-700 transition text-sm sm:text-base"
              onClick={() => navigate("/admin/user")}
            >
              <Users size={18} />
              Manage Users
            </button>

            <button  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg sm:rounded-xl bg-slate-800 hover:bg-slate-700 transition text-sm sm:text-base">
              <Sparkles size={18} />
              Resumes
            </button>
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="mt-8 sm:mt-10 bg-slate-900 border border-slate-800 rounded-xl sm:rounded-2xl p-5 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-3">
          Analytics Overview
        </h2>
        <div
          className="h-48 sm:h-64 flex items-center justify-center text-slate-500
          border border-dashed border-slate-700 rounded-xl text-sm sm:text-base"
        >
          Chart will go here (Recharts / Chart.js)
        </div>
      </div>
    </div>
  );
}
