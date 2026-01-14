import React, { useState } from "react";
import axiosInstance from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import images from "../assets";

export default function Login() {
  const [emailtext, setEmailText] = useState("");
  const [passwordtext, setPasswordText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    if (!emailtext) {
      toast.error("Please enter your email");
      return false;
    }
    if (!passwordtext) {
      toast.error("Please enter your password");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `/api/auth/login`,
        {
          email: emailtext,
          password: passwordtext,
        }
      );

      console.log("Login response:", response.data);

      // Save token in localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect based on isAdmin
      if (response.data.isAdmin) {
        toast.success("Welcome Admin!");
        setTimeout(() => navigate("/admin"), 1200);
      } else {
        const username = emailtext.split("@")[0];
        toast.success(`Welcome back, ${username}!`);
        setTimeout(() => navigate("/user"), 1200);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="fixed inset-0 pt-20 flex items-center justify-center bg-gradient-to-br from-blue-950 to-slate-900 px-4 select-none overflow-hidden">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl bg-white max-h-[85vh]">
          <div className="hidden md:block">
            <Link to="/">
              <img
                src={images.login || "/login.jpg"}
                alt="Login"
                className="w-full h-full object-cover"
              />
            </Link>
          </div>

          <div className="flex flex-col justify-center px-6 md:px-10 py-4 overflow-y-auto">
            <div className="text-center mb-2">
              <h1 className="text-xl font-semibold text-gray-800">
                Welcome to{" "}
                <span className="font-bold text-blue-600">
                  AI Resume Builder
                </span>
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">by</p>
              <Link to="/">
                <img
                  src={images.logo || "/logo.png"}
                  alt="Logo"
                  className="w-24 mx-auto mt-1"
                />
              </Link>
            </div>

            <h2 className="text-lg font-semibold text-center text-gray-800 mb-2">
              Login to your account
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              className="space-y-2"
            >
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your e-mail"
                  value={emailtext}
                  onChange={(e) => setEmailText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your Password"
                  value={passwordtext}
                  onChange={(e) => setPasswordText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-xs text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-lg text-white text-sm font-medium transition mt-3 ${loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
                  }`}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="flex items-center my-2">
              <div className="flex-grow h-px bg-gray-300" />
              <span className="px-2 text-xs text-gray-400 uppercase">or</span>
              <div className="flex-grow h-px bg-gray-300" />
            </div>

            <button className="flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
              <img
                src={images.google || "/google.png"}
                alt="Google"
                className="w-4 h-4"
              />
              <span className="text-xs font-medium text-gray-700">
                Sign in with Google
              </span>
            </button>

            <p className="text-center text-xs text-gray-600 mt-2">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
