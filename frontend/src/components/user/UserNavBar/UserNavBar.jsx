import React, { useState } from "react";
import { Bell, User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UptoSkillsLogo from "../../../assets/UptoSkills.webp";

export default function UserNavbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const notifications = [
    { id: 1, text: "Your resume has been successfully updated." },
    { id: 2, text: "You have a new suggestion for your skills." },
    { id: 3, text: "Your subscription is expiring soon." },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 h-16 bg-white border-b border-gray-200 md:z-50">
      {/* Logo */}
      <img
        src={UptoSkillsLogo}
        alt="UptoSkills"
        onClick={() => navigate("/")}
        className="w-40 h-10 ml-8 object-contain cursor-pointer hover:opacity-90 transition-opacity"
      />

      {/* Right actions */}
      <div className="flex items-center gap-6 relative">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative text-gray-600 hover:text-indigo-600"
          >
            <Bell size={22} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
              <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
                <h4 className="text-gray-800 font-semibold">Notifications</h4>
                <button onClick={() => setShowNotifications(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={18} />
                </button>
              </div>
              <ul className="max-h-60 overflow-y-auto">
                {notifications.map((n) => (
                  <li key={n.id} className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                    {n.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* User */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
            <User size={16} />
          </div>
          <span className="hidden sm:block text-sm text-gray-800 font-medium">User</span>
        </div>
      </div>
    </header>
  );
}
