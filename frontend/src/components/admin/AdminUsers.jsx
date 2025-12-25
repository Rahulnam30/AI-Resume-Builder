import React from "react";
import { Trash2, ShieldCheck, ShieldOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";
import AdminBottomNav from "./AdminBottomNav";

export default function AdminUsers() {
  const navigate = useNavigate();

  // Mock users (replace with API later)
  const users = [
    { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", role: "User", status: "Active" },
    { id: 2, name: "Ananya Singh", email: "ananya@gmail.com", role: "Admin", status: "Active" },
    { id: 3, name: "Vikram Rao", email: "vikram@gmail.com", role: "User", status: "Blocked" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Top Navbar */}
      <div className="sticky top-0 z-40">
        <AdminNavBar onLogout={() => navigate("/")} />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">User Management</h1>
          <p className="text-slate-400 mt-2">
            View, manage, block or remove users.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-700 bg-gray-800 shadow-xl">
          <table className="w-full text-left">
            <thead className="bg-gray-700 text-sm uppercase text-gray-300">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-gray-700 hover:bg-gray-700 transition"
                >
                  <td className="px-6 py-4 font-medium">{user.name}</td>
                  <td className="px-6 py-4 text-slate-400">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        user.status === "Active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 flex items-center justify-center gap-3">
                    {user.status === "Active" ? (
                      <button
                        title="Block User"
                        className="p-2 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400"
                      >
                        <ShieldOff size={18} />
                      </button>
                    ) : (
                      <button
                        title="Activate User"
                        className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400"
                      >
                        <ShieldCheck size={18} />
                      </button>
                    )}

                    <button
                      title="Delete User"
                      className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <button
            onClick={() => navigate("/admin")}
            className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
          >
            ← Back to Dashboard
          </button>
        </div>
      </main>

      {/* Bottom Nav */}
      <AdminBottomNav />
    </div>
  );
}
