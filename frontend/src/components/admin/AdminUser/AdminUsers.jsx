import React, { useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import AdminNavbar from "../AdminNavBar/AdminNavBar";

export default function AdminUsers({ head = "Manage Users" }) {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.d@example.com",
      role: "User",
      status: "Active",
      plan: "Pro",
      date: "Nov 14, 2023",
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah.s@example.com",
      role: "Admin",
      status: "Pending",
      plan: "Enterprise",
      date: "Nov 13, 2023",
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "mj.dev@example.com",
      role: "Editor",
      status: "Active",
      plan: "Free",
      date: "Nov 12, 2023",
    },
  ]);

  const [editId, setEditId] = useState(null);
  const [tempStatus, setTempStatus] = useState("");

  /* ================= START EDIT ================= */
  const startEdit = (user) => {
    setEditId(user.id);
    setTempStatus(user.status);
  };

  /* ================= SAVE ================= */
  const saveEdit = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: tempStatus } : u))
    );
    setEditId(null);
  };

  /* ================= DELETE ================= */
  const deleteUser = (id) => {
    if (window.confirm("Are you sure?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">{head}</h1>

        <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 text-left">User</th>
                <th className="px-6 py-4 text-center">Role</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Plan</th>
                <th className="px-6 py-4 text-center">Date</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  {/* USER */}
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{u.name}</p>
                      <p className="text-xs text-gray-500">{u.email}</p>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center">{u.role}</td>

                  {/* STATUS INLINE EDIT */}
                  <td className="px-6 py-4 text-center">
                    {editId === u.id ? (
                      <select
                        value={tempStatus}
                        onChange={(e) => setTempStatus(e.target.value)}
                        className="border px-2 py-1 rounded-md text-sm"
                      >
                        <option>Active</option>
                        <option>Pending</option>
                        <option>Banned</option>
                      </select>
                    ) : (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          u.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : u.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {u.status}
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-center">{u.plan}</td>
                  <td className="px-6 py-4 text-center text-gray-500">
                    {u.date}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4 flex justify-center gap-2">
                    {editId === u.id ? (
                      <>
                        <button
                          onClick={() => saveEdit(u.id)}
                          title="Save"
                          className="p-2 rounded-lg hover:bg-green-100 text-green-600"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => setEditId(null)}
                          title="Cancel"
                          className="p-2 rounded-lg hover:bg-gray-100"
                        >
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(u)}
                          title="Edit Status"
                          className="p-2 rounded-lg hover:bg-gray-100"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => deleteUser(u.id)}
                          title="Delete User"
                          className="p-2 rounded-lg hover:bg-red-100 text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
