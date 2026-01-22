import React, { useEffect, useState } from "react";
import {
  FiDownload,
  FiTrash2,
  FiSearch,
  FiFileText,
  FiEye,
  FiShare2,
  FiClock,
  FiTrendingUp,
  FiFolder,
  FiEdit,
  FiFilter,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { initializeSampleData } from "../utils/sampleDownloadsData";

const Downloads = () => {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all"); // all | resume | cover-letter

  useEffect(() => {
    const saved = localStorage.getItem("resumeDownloads");
    setDownloads(saved ? JSON.parse(saved) : initializeSampleData());
    setLoading(false);
  }, []);

  const handleDownload = (file) => {
    const updated = downloads.map((d) =>
      d.id === file.id ? { ...d, views: (d.views || 0) + 1 } : d
    );
    setDownloads(updated);
    localStorage.setItem("resumeDownloads", JSON.stringify(updated));
  };

  const handleDelete = (id) => {
    const updated = downloads.filter((d) => d.id !== id);
    setDownloads(updated);
    localStorage.setItem("resumeDownloads", JSON.stringify(updated));
  };

  const formatDate = (date) => {
    const diff = Math.floor((Date.now() - new Date(date)) / 86400000);
    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    return `${diff} days ago`;
  };

  const filteredDownloads = downloads.filter((d) => {
    const matchesSearch = d.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === "all" ? true : d.type === filterType;

    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50 font-outfit">
        <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-outfit">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-black">
            Download Manager
          </h1>


          <p className="text-slate-600 mt-1 flex items-center gap-2">
            <FiFolder className="text-blue-600" />
            Manage your resumes and cover letters
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {[
            { label: "Total Downloads", value: downloads.length, icon: FiDownload },
            {
              label: "Resumes",
              value: downloads.filter((d) => d.type === "resume").length,
              icon: FiFileText,
            },
            {
              label: "Cover Letters",
              value: downloads.filter((d) => d.type === "cover-letter").length,
              icon: FiEdit,
            },
            {
              label: "Total Views",
              value: downloads.reduce((a, b) => a + (b.views || 0), 0),
              icon: FiTrendingUp,
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white border border-blue-100 rounded-xl p-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <stat.icon className="text-blue-600 text-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="bg-white border border-blue-100 rounded-xl p-4 mb-8 flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute top-3 left-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search resumes or cover letters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <FiFilter className="absolute top-3 left-3 text-slate-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="pl-10 pr-4 py-2 border border-blue-200 rounded-lg text-blue-600 font-medium bg-white focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="all">All Types</option>
              <option value="resume">Resumes</option>
              <option value="cover-letter">Cover Letters</option>
            </select>
          </div>
        </div>

        {/* Downloads */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredDownloads.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white border border-blue-100 rounded-xl p-5 hover:shadow-lg transition group"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg group-hover:bg-[#FFF3E0] transition">
                    <FiFileText className="text-blue-600 text-xl group-hover:text-[#E65100]" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 truncate">
                      {file.name}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                      <FiClock />
                      {formatDate(file.downloadDate)} · {file.format} · {file.size}
                    </p>
                    <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                      <FiEye /> {file.views || 0} views
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mt-5">
                  <button
                    onClick={() => handleDownload(file)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-blue-600 transition"
                  >
                    <FiDownload /> Download
                  </button>

                  <button className="p-2 bg-slate-100 rounded-lg hover:bg-blue-50 transition">
                    <FiShare2 />
                  </button>

                  <button
                    onClick={() => handleDelete(file.id)}
                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default Downloads;
