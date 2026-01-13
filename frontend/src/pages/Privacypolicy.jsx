import React from "react";
import { useNavigate } from "react-router-dom";
import UpToSkillsImg from "../assets/UptoSkills.webp";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  const policys = [
    {
      icon: "fa-file-lines",
      title: "What Information Do We Collect?",
      content:
        "When you use UpToSkills - AI Resume Builder, we collect information such as your name, email address, resume content, skills, education, and work experience that you voluntarily provide to create and improve your resume.",
    },
    {
      icon: "fa-brain",
      title: "How Do We Use Your Information?",
      content:
        "Your information is used to generate AI-powered resumes, analyze skill gaps, provide personalized suggestions, and enhance your overall job-readiness experience.",
    },
    {
      icon: "fa-lock",
      title: "How Do We Protect Your Data?",
      content:
        "We apply appropriate technical and organizational security measures to protect your personal data from unauthorized access, loss, or misuse.",
    },
    {
      icon: "fa-user-gear",
      title: "Your Rights & Control",
      content:
        "You have full control over your data. You can access, update, download, or delete your resume information at any time through your account settings.",
    },
    {
      icon: "fa-rotate",
      title: "Policy Updates",
      content:
        "This Privacy Policy may be updated periodically. Continued use of the UpToSkills platform indicates acceptance of the updated policy.",
    },
  ];
  return (
    <div className="min-h-screen text-gray-900 bg-white select-none">
      <nav className="sticky top-0 z-50 py-4 border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <img
              src={UpToSkillsImg}
              alt="UpToSkills Logo"
              className="w-[150px]"
            />
          </div>
        </div>
      </nav>
      <section className="text-center bg-gradient-to-b from-blue-50 via-white to-white py-28">
        <div className="max-w-4xl px-6 mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm text-blue-700 bg-blue-100 rounded-full">
            <i className="fa-solid fa-shield-halved"></i>
            <span>Data Protection</span>
          </div>

          <h1 className="mb-6 text-5xl font-extrabold md:text-6xl">
            Privacy Policy
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Learn how UpToSkills - AI Resume Builder protects your personal
            information and respects your privacy.
          </p>
        </div>
      </section>

      <section className="max-w-5xl px-6 py-20 mx-auto space-y-10">
        {policys.map((policy, index) => (
          <div
            key={index}
            className="p-8 transition bg-white border border-gray-200 shadow-sm rounded-2xl hover:shadow-md"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center w-10 h-10 font-bold text-blue-700 bg-blue-100 rounded-lg">
                {index + 1}
              </div>
              <i
                className={`fa-solid ${policy.icon} text-blue-600 text-xl`}
              ></i>
              <h2 className="text-2xl font-semibold text-gray-900">
                {policy.title}
              </h2>
            </div>

            <p className="leading-relaxed text-gray-600">{policy.content}</p>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}