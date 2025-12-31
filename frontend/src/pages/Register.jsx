import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import images from "../assets";

export default function Register() {
  const [usernametext, setUserNameText] = useState("");
  const [emailtext, setEmailText] = useState("");
  const [passwordtext, setPasswordText] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    if (!usernametext.trim()) return toast.error("Please enter a username");
    if (!emailtext.trim()) return toast.error("Please enter an email");
    if (!passwordtext) return toast.error("Please enter a password");
    if (passwordtext.length < 6)
      return toast.error("Password must be at least 6 characters");
    if (passwordtext !== confirmpassword)
      return toast.error("Passwords do not match");
    return true;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/register", {
        username: usernametext.trim(),
        email: emailtext.trim(),
        password: passwordtext,
      });

      toast.success(`Welcome ${usernametext}! Redirecting to login...`);
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 to-slate-900 px-4 select-none overflow-hidden">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[95vh]">
          {/* Left Form Section */}
          <div className="flex flex-col justify-center px-6 md:px-10 py-6 overflow-y-auto">
            <div className="text-center mb-3">
              <h1 className="text-xl font-semibold text-gray-800">
                Join{" "}
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

            <h2 className="text-lg font-semibold text-center text-gray-800 mb-3">
              Create your account
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRegister();
              }}
              className="space-y-2.5"
            >
              {/* Username */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Your username"
                  value={usernametext}
                  onChange={(e) => setUserNameText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
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

              {/* Password */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={passwordtext}
                  onChange={(e) => setPasswordText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-0.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password again"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-lg text-white text-sm font-medium transition mt-3
                ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }
              `}
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-3">
              <div className="flex-grow h-px bg-gray-300" />
              <span className="px-2 text-xs text-gray-400 uppercase">or</span>
              <div className="flex-grow h-px bg-gray-300" />
            </div>

            {/* Google Signup */}
            <button className="flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
              <img
                src={images.google || "/google.png"}
                alt="Google"
                className="w-4 h-4"
              />
              <span className="text-xs font-medium text-gray-700">
                Sign up with Google
              </span>
            </button>

            <p className="text-center text-xs text-gray-600 mt-3">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          {/* Right Image Section */}
          <div className="w-full h-full hidden md:flex justify-center items-center bg-gray-50">
            <img
              src={images.signup || "/signup.png"}
              alt="Register"
              className="max-w-full max-h-full object-contain p-4"
            />
          </div>
        </div>
      </div>
    </>
  );
}