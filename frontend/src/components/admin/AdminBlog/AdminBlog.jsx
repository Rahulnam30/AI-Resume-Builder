import React, { useEffect, useState } from "react";
import {
  Search,
  Calendar,
  ChevronDown,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import axiosInstance from "../../../api/axios";

export default function AdminBlog() {
  const [activeCategory, setActiveCategory] = useState("All Articles");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedPosts, setExpandedPosts] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    detail: "",
    category: "",
    date: "",
    image: "",
    readTime: "",
    isPublished: true,
  });

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await axiosInstance.get("/api/blog?includeUnpublished=true");
      setBlogs(response.data?.data || []);
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Failed to load blogs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const categories = [
    "All Articles",
    ...Array.from(new Set(blogs.map((post) => post.category).filter(Boolean))),
  ];

  const togglePost = (id) => {
    setExpandedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredPosts = blogs.filter((post) => {
    const matchesCategory =
      activeCategory === "All Articles" || post.category === activeCategory;

    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      detail: "",
      category: "",
      date: "",
      image: "",
      readTime: "",
      isPublished: true,
    });
    setEditingId(null);
  };

  const handleAddNew = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEdit = (post) => {
    setEditingId(post._id || post.id);
    setFormData({
      title: post.title || "",
      excerpt: post.excerpt || "",
      detail: post.detail || "",
      category: post.category || "",
      date: post.date || "",
      image: post.image || "",
      readTime: post.readTime || "",
      isPublished: typeof post.isPublished === "boolean" ? post.isPublished : true,
    });
    setShowForm(true);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSaving(true);
      setError("");

      if (editingId) {
        await axiosInstance.put(`/api/blog/${editingId}`, formData);
      } else {
        await axiosInstance.post("/api/blog", formData);
      }

      await fetchBlogs();
      setShowForm(false);
      resetForm();
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Failed to save blog");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (id) => {
    const doDelete = async () => {
      try {
        setError("");
        await axiosInstance.delete(`/api/blog/${id}`);
        await fetchBlogs();
      } catch (apiError) {
        setError(apiError.response?.data?.message || "Failed to delete blog");
      }
    };

    doDelete();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-[#1a2e52] p-6">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-black">Blog Management</h1>

        <div className="flex gap-3">
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
          >
            <Plus size={18} /> Add Blog
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl bg-red-50 text-red-600 px-4 py-3 font-semibold">
          {error}
        </div>
      )}

      <AnimatePresence>
      {showForm && (
        <motion.div
          className="fixed inset-0 z-[130] bg-black/25 p-4 sm:p-6 flex items-center justify-center"
          onClick={() => {
            setShowForm(false);
            resetForm();
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.form
            onSubmit={handleSubmit}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-2xl rounded-3xl bg-white p-5 sm:p-6 shadow-2xl border border-slate-100 max-h-[85vh] overflow-y-auto"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-700 tracking-tight">
                {editingId ? "Edit Blog" : "Add New Blog"}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="rounded-xl border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                required
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-600 placeholder:text-slate-400"
              />
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                required
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-600 placeholder:text-slate-400"
              />
              <input
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="Date (e.g. Mar 6, 2026)"
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-600 placeholder:text-slate-400"
              />
              <input
                name="readTime"
                value={formData.readTime}
                onChange={handleChange}
                placeholder="Read Time (e.g. 5 min read)"
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-600 placeholder:text-slate-400"
              />
              <input
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Image URL"
                required
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-600 placeholder:text-slate-400 md:col-span-2"
              />
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Excerpt"
                required
                rows={3}
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-600 placeholder:text-slate-400 md:col-span-2"
              />
              <textarea
                name="detail"
                value={formData.detail}
                onChange={handleChange}
                placeholder="Detail"
                required
                rows={5}
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-600 placeholder:text-slate-400 md:col-span-2"
              />
            </div>

            <label className="mt-4 flex items-center gap-3 text-sm font-medium text-slate-500">
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
              />
              Published
            </label>

            <div className="mt-6 flex gap-3">
              <button
                type="submit"
                disabled={isSaving}
                className="bg-[#1a2e52] text-white px-5 py-2.5 rounded-2xl text-sm font-medium hover:opacity-90 disabled:opacity-70"
              >
                {isSaving ? "Saving..." : editingId ? "Update Blog" : "Create Blog"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="bg-slate-100 text-slate-600 px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-slate-200"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
      </AnimatePresence>

      <div className="relative max-w-xl mb-8">
        <Search className="absolute w-5 h-5 text-gray-400 left-4 top-3" />
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border rounded-xl"
        />
      </div>

      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2 rounded-xl font-bold transition ${
              activeCategory === category
                ? "bg-[#1a2e52] text-white"
                : "bg-white border text-gray-500"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center mt-12 text-gray-500 font-semibold">Loading blogs...</div>
      ) : (
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <div
            key={post._id || post.id}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
          >
            <div className="relative h-52">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-white text-blue-600 px-3 py-1 text-xs font-bold rounded-lg shadow">
                {post.category}
              </span>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                <Calendar size={14} />
                {post.date} • {post.readTime}
              </div>

              <h3 className="text-lg font-bold mb-3">{post.title}</h3>

              <p className="text-sm text-gray-500 mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div
                className={`overflow-hidden transition-all ${
                  expandedPosts[post._id || post.id]
                    ? "max-h-40 opacity-100 mb-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-sm text-gray-600">{post.detail}</p>
              </div>

              <button
                onClick={() => togglePost(post._id || post.id)}
                className="text-blue-600 font-bold flex items-center gap-2"
              >
                {expandedPosts[post._id || post.id] ? "Show Less" : "Read More"}
                <ChevronDown
                  className={`w-4 h-4 transition ${
                    expandedPosts[post._id || post.id] ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => handleEdit(post)}
                  className="text-blue-600 hover:text-blue-800"
                  aria-label="Edit blog"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => handleDelete(post._id || post.id)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Delete blog"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}

      {filteredPosts.length === 0 && (
        <div className="text-center mt-20 text-gray-400">No blogs created yet.</div>
      )}
    </div>
  );
}
