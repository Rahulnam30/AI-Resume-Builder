import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../AdminNavBar/AdminNavBar";

export default function AdminUsers({head}) {
  const navigate = useNavigate();

  // 🔹 Example Users Data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      role: "User",
      status: "Active",
      plan: "Pro",
    },
    {
      id: 2,
      name: "Ananya Singh",
      email: "ananya@gmail.com",
      role: "Admin",
      status: "Active",
      plan: "Enterprise",
    },
    {
      id: 3,
      name: "Vikram Rao",
      email: "vikram@gmail.com",
      role: "User",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Pooja Verma",
      email: "pooja@gmail.com",
      role: "User",
      status: "Active",
    },
    {
      id: 5,
      name: "Aman Khan",
      email: "aman@gmail.com",
      role: "Moderator",
      status: "Inactive",
    },
  ]);

  const [isDeleting, setIsDeleting] = useState(null);
  const [isUpdating, setIsUpdating] = useState(null);

  // ❌ DELETE USER
  const handleDelete = async (id) => {
    const user = users.find((u) => u.id === id);
    if (!window.confirm(`Are you sure you want to delete ${user.name}?`)) return;

    try {
      setIsDeleting(id);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      alert("Failed to delete user");
    } finally {
      setIsDeleting(null);
    }
  };

  // 🔁 ACTIVATE / DEACTIVATE
  const handleDeactivate = async (id, currentStatus) => {
    const user = users.find((u) => u.id === id);
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

    if (
      !window.confirm(
        `Are you sure you want to change the status of ${user.name} to "${newStatus}"?`
      )
    )
      return;

    try {
      setIsUpdating(id);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, status: newStatus } : u
        )
      );
    } catch (err) {
      alert("Failed to update user status");
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <div className="sticky top-0 z-40">
        <AdminNavbar onLogout={() => navigate("/")} />
      </div>

      {/* Content */}
      <main className="flex-1 p-6 sm:p-10">
        <h1 className="text-4xl font-bold mb-2">User Management</h1>
        <p className="text-gray-400 mb-8">Manage users</p>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-700 bg-gray-800">
          <table className="w-full text-left">
            <thead className="bg-gray-700 text-gray-300 uppercase text-sm">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => {
                const isActive = user.status === "Active";

                return (
                  <tr
                    key={user.id}
                    className="border-t border-gray-700 hover:bg-gray-700 transition"
                  >
                    <td className="px-6 py-4 font-semibold">{user.name}</td>
                    <td className="px-6 py-4 text-gray-400">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    {/* Fixed-size buttons */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3">
                        {/* Activate / Deactivate */}
                        <button
                          onClick={() =>
                            handleDeactivate(user.id, user.status)
                          }
                          disabled={isUpdating === user.id}
                          className={`inline-flex items-center justify-center 
                            w-32 px-4 py-2 rounded-lg font-semibold text-sm transition-colors
                            ${
                              isUpdating === user.id
                                ? "bg-blue-300 text-blue-800 cursor-not-allowed"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                            }`}
                        >
                          {isUpdating === user.id
                            ? "Updating..."
                            : isActive
                            ? "Deactivate"
                            : "Activate"}
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(user.id)}
                          disabled={isDeleting === user.id}
                          className={`inline-flex items-center justify-center 
                            w-28 px-4 py-2 rounded-lg font-semibold text-sm transition-colors
                            ${
                              isDeleting === user.id
                                ? "bg-red-300 text-red-800 cursor-not-allowed"
                                : "bg-red-500 text-white hover:bg-red-600"
                            }`}
                        >
                          {isDeleting === user.id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {users.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-10 text-gray-400"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Back */}
        <button
          onClick={() => navigate("/admin")}
          className="mt-8 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-semibold"
        >
          ← Back to Dashboard
        </button>
      </main>
    </div>
  );
}
