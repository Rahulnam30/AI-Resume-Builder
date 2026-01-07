import React from "react";
import {
  TrendingUp,
  Percent,
  Cpu,
  UserMinus,
} from "lucide-react";
import Footer from "../../Footer";

export default function AdminAnalytics() {
  const stats = [
    {
      title: "User Growth Rate",
      value: "+12.5%",
      note: "vs previous 30 days",
      icon: <TrendingUp className="text-green-600" />,
      valueColor: "text-green-600",
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      note: "Industry Avg: 2.5%",
      icon: <Percent className="text-blue-600" />,
      valueColor: "text-blue-600",
    },
    {
      title: "AI Token Usage",
      value: "1.2M Tokens",
      note: "Est. Cost: $450.00",
      icon: <Cpu className="text-purple-600" />,
      valueColor: "text-purple-600",
    },
    {
      title: "Churn Rate",
      value: "1.8%",
      note: "Lowest this quarter",
      icon: <UserMinus className="text-red-600" />,
      valueColor: "text-red-600",
    },
  ];

  return (
    <div className="flex-1 p-6 sm:p-8 lg:p-10 bg-slate-50 text-slate-900">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">System Analytics</h1>
        <p className="text-slate-600 mt-2">
          Deep dive into platform performance & user engagement.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
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

          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span>Modern Tech V2</span>
              <span className="text-blue-600 font-medium">45%</span>
            </div>
            <div className="flex justify-between">
              <span>Creative Minimal</span>
              <span className="text-purple-600 font-medium">25%</span>
            </div>
            <div className="flex justify-between">
              <span>Corporate Standard</span>
              <span className="text-red-600 font-medium">15%</span>
            </div>
            <div className="flex justify-between">
              <span>Simple ATS</span>
              <span className="text-slate-500 font-medium">15%</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
