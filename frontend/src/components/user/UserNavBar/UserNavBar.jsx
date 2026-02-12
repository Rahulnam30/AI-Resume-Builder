import React, { useEffect, useRef, useState } from "react";
import {
  Bell,
  UserCog,
  Shield,
  LogOut,
  HelpCircle,
  CreditCard,
  Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import UptoSkillsLogo from "../../../assets/UptoSkills.webp";

const API = "/api";

export default function UserNavbar() {
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const [showUserMenu, setShowUserMenu] = useState(false);

  const [user, setUser] = useState({
    name: "User",
    email: "",
  });

  /* ================= FETCH LOGGED-IN USER ================= */
  useEffect(() => {
    fetch(`${API}/user/me`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setUser({
          name: data.username || "User",
          email: data.email || "",
        });
      })
      .catch(() => {
        console.log("User not logged in");
      });
  }, []);

  /* ================= CLOSE DROPDOWN ON OUTSIDE CLICK ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= LOGOUT ================= */
  const logout = async () => {
    try {
      await fetch(`${API}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      navigate("/login");
    }
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header className="w-full h-16 bg-white border-b flex items-center justify-between px-6">
        {/* LEFT */}
        <img
          src={UptoSkillsLogo}
          alt="UptoSkills"
          className="h-8 cursor-pointer"
          onClick={() => navigate("/user/dashboard")}
        />

        {/* RIGHT */}
        <div className="flex items-center gap-4 relative">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell size={20} />
          </button>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white border rounded-xl shadow-lg z-50">
                {/* USER INFO */}
                <div className="px-4 py-3 border-b">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>

                <DropdownItem
                  icon={<UserCog size={16} />}
                  label="Edit Profile"
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate("/user/edit-profile");
                  }}
                />

                {/* ✅ PASSWORD CHANGER → NEW PAGE */}
                <DropdownItem
                  icon={<Shield size={16} />}
                  label="Password Changer"
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate("/user/security");
                  }}
                />

                <DropdownItem
                  icon={<CreditCard size={16} />}
                  label="Plans & Billing"
                  onClick={() => navigate("/pricing")}
                />

                <DropdownItem
                  icon={<Info size={16} />}
                  label="About Us"
                  onClick={() => navigate("/about")}
                />

                <DropdownItem
                  icon={<HelpCircle size={16} />}
                  label="Help Center"
                  onClick={() => navigate("/help-center")}
                />

                <div className="border-t my-1" />

                <DropdownItem
                  icon={<LogOut size={16} />}
                  label="Logout"
                  danger
                  onClick={logout}
                />
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

/* ================= DROPDOWN ITEM ================= */
const DropdownItem = ({ icon, label, onClick, danger }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left
      ${
        danger
          ? "text-red-600 hover:bg-red-50"
          : "text-gray-700 hover:bg-gray-100"
      }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);