import React from "react";
import { FileText, Plus, Users, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";
import AdminBottomNav from "./AdminBottomNav";

export default function AdminHome() {
  const navigate = useNavigate();

  const cards = [
    {
      icon: <Plus className="text-blue-500" size={28} />,
      title: "Create Template",
      desc: "Add a new resume template",
      onClick: () => navigate("/admin/create"),
      hoverBorder: "hover:border-blue-500",
    },
    {
      icon: <FileText className="text-green-400" size={28} />,
      title: "Resume Templates",
      desc: "View & manage templates",
      onClick: () => navigate("/admin/templates"),
      hoverBorder: "hover:border-green-400",
    },
    {
      icon: <Users className="text-yellow-400" size={28} />,
      title: "Users",
      desc: "Manage platform users",
      onClick: () => navigate("/admin/users"),
      hoverBorder: "hover:border-yellow-400",
    },
    {
      icon: <Sparkles className="text-pink-400" size={28} />,
      title: "AI Models",
      desc: "Configure AI features",
      onClick: () => navigate("/admin/ai"),
      hoverBorder: "hover:border-pink-400",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Top Navbar */}
      <div className="sticky top-0 z-40">
        <AdminNavBar onLogout={() => console.log("Logout clicked")} />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-10 flex flex-col">
        {/* Welcome Header */}
        <div className="mb-10 sm:mb-12 text-center sm:text-left">
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
            Welcome, Admin!
          </h1>
          <p className="text-slate-400 mt-3 max-w-2xl">
            This is your dashboard to manage resume templates, users, and
            AI-powered features.
          </p>
          <p className="text-slate-400 mt-2 max-w-2xl italic text-sm">
            Tip: Check analytics regularly to track performance.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Quick Actions
          </h2>
          <p className="text-slate-400 mt-1">
            Use the buttons below to manage your platform.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 flex-1">
          {cards.map((card) => (
            <button
              key={card.title}
              onClick={card.onClick}
              className={`flex flex-col items-start gap-4 p-6 rounded-2xl
                bg-gray-800 border border-gray-700
                ${card.hoverBorder} hover:bg-gray-700
                transition transform hover:-translate-y-1
                shadow-xl w-full h-full cursor-pointer`}
            >
              {card.icon}
              <div>
                <p className="font-semibold text-lg sm:text-xl">
                  {card.title}
                </p>
                <p className="text-slate-400 text-sm mt-1">
                  {card.desc}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-xs sm:text-sm text-slate-500">
          © {new Date().getFullYear()} AI Resume Builder Admin Panel. All rights reserved.
        </div>
      </main>

      {/* Bottom Navigation */}
      <AdminBottomNav />
    </div>
  );
}
