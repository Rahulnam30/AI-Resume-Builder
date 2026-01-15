import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Check, X, AlertCircle } from "lucide-react";
import AdminNavbar from "../AdminNavBar/AdminNavBar";
import axiosInstance from "../../../api/axios";
import toast, { Toaster } from "react-hot-toast";

export default function AdminUsers({ head = "Manage Users" }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    username: "",
    email: "",
    isAdmin: false,
    createdAt: "",
    plan: "Free",
  });

  // Delete Confirmation State
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/api/user");
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch users");
      setLoading(false);
      console.error(err);
      toast.error("Failed to load users");
    }
  };

  /* ================= HANDLERS ================= */

  const handleEditClick = (user) => {
    setEditingUser(user);
    // Format date to YYYY-MM-DD for input[type="date"]
    // Handle cases where createdAt might be missing or invalid
    let dateStr = "";
    if (user.createdAt) {
      try {
        dateStr = new Date(user.createdAt).toISOString().split("T")[0]
      } catch (e) {
        console.error("Invalid date", user.createdAt);
      }
    }

    setEditFormData({
      username: user.username || "",
      email: user.email || "",
      isAdmin: user.isAdmin || false,
      createdAt: dateStr,
      plan: user.plan || "Free",
    });
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRoleChange = (e) => {
    setEditFormData((prev) => ({
      ...prev,
      isAdmin: e.target.value === "true"
    }))
  }

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      const response = await axiosInstance.put(
        `/api/user/${editingUser._id}`,
        editFormData
      );

      setUsers((prev) =>
        prev.map((u) => (u._id === editingUser._id ? response.data.user : u))
      );
      setIsEditModalOpen(false);
      setEditingUser(null);
      toast.success("User updated successfully");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update user");
    }
  };

  const handleToggleActive = async (user) => {
    const newStatus = !user.isActive;
    try {
      // Optimistic update
      setUsers(prev => prev.map(u => u._id === user._id ? { ...u, isActive: newStatus } : u));

      await axiosInstance.put(`/api/user/${user._id}`,
        { isActive: newStatus }
      );

      toast.success(`User ${newStatus ? 'activated' : 'deactivated'} successfully`);
    } catch (err) {
      console.error(err);
      // Revert optimistic update
      setUsers(prev => prev.map(u => u._id === user._id ? { ...u, isActive: user.isActive } : u));
      toast.error("Failed to update status");
    }
  }

  const handleDeleteClick = (id) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await axiosInstance.delete(`/api/user/${deleteConfirmId}`);
      setUsers((prev) => prev.filter((u) => u._id !== deleteConfirmId));
      setDeleteConfirmId(null);
      toast.success("User deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete user");
    }
  };

  if (loading) return <div className="p-6">Loading users...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <Toaster
        position="top-right"
        containerStyle={{
          top: 80 // Offset below navbar
        }}
      />

      <div className="p-6"> {/* Add top padding to account for fixed navbar if needed, or stick with p-6 if navbar handles it */}
        <h1 className="text-2xl font-bold mb-6 text-gray-800">{head}</h1>

        <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 text-left">User Details</th>
                <th className="px-6 py-4 text-center">Role</th>
                <th className="px-6 py-4 text-center">Plan</th>
                <th className="px-6 py-4 text-center">Status</th>
                {/* <th className="px-6 py-4 text-center">User ID</th> */}
                <th className="px-6 py-4 text-center">Created At</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg uppercase shrink-0">
                      {u.username ? u.username.charAt(0) : "U"}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{u.username || "No Name"}</p>
                      <p className="text-xs text-gray-500">{u.email}</p>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${u.isAdmin
                        ? "bg-purple-100 text-purple-700 border border-purple-200"
                        : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}
                    >
                      {u.isAdmin ? "Admin" : "User"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${u.plan === "Pro"
                        ? "bg-amber-100 text-amber-800 border-amber-200"
                        : "bg-gray-100 text-gray-700 border-gray-200"
                        }`}
                    >
                      {u.plan || "Free"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleToggleActive(u)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${u.isActive ? 'bg-indigo-600' : 'bg-gray-200'
                        }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${u.isActive ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                    </button>
                    <div className="text-[10px] text-gray-400 mt-1">
                      {u.isActive ? 'Active' : 'Inactive'}
                    </div>
                  </td>

                  {/* <td className="px-6 py-4 text-center">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600 font-mono">
                      {u._id}
                    </code>
                  </td> */}

                  <td className="px-6 py-4 text-center text-gray-500">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "N/A"}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      {/* <button
                        onClick={() => handleEditClick(u)}
                        title="Edit User"
                        className="p-2 rounded-lg hover:bg-indigo-50 text-indigo-600 transition-colors"
                      >
                        <Pencil size={18} />
                      </button> */}
                      <button
                        onClick={() => handleDeleteClick(u._id)}
                        title="Delete User"
                        className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT MODAL */}
      {/* {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 transform transition-all scale-100 opacity-100">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Edit User</h2>
            <form onSubmit={handleUpdateUser}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={editFormData.username}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Created At</label>
                <input
                  type="date"
                  name="createdAt"
                  value={editFormData.createdAt}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  name="isAdmin"
                  value={editFormData.isAdmin}
                  onChange={handleRoleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value={false}>User</option>
                  <option value={true}>Admin</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Plan</label>
                <select
                  name="plan"
                  value={editFormData.plan}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="Free">Free</option>
                  <option value="Pro">Pro</option>
                </select>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 font-medium"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 text-center transform transition-all">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
              <AlertCircle size={24} />
            </div>
            <h2 className="text-xl font-bold mb-2 text-gray-800">Are you sure?</h2>
            <p className="text-gray-500 mb-6">
              Do you really want to delete this user? This process cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
