import React, { useState, useEffect } from "react";
import { Check, ToggleLeft, ToggleRight, Pencil } from "lucide-react";
import axiosInstance from "../../../api/axios";
import { usePricing } from "../../../context/Pricingcontext";

const AdminSubscription = () => {
  const { plans, setPlans, savePlans, fetchPlans } = usePricing(); // ⭐ Added fetchPlans
  const [paidUsers, setPaidUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPaidUsers();
    fetchPlans(); // ⭐ Refresh plans when component mounts
  }, []);

  const fetchPaidUsers = async () => {
    try {
      const response = await axiosInstance.get("/api/user");
      // Filter for Pro users
      const proUsers = response.data.filter(user => user.plan === "Pro");
      setPaidUsers(proUsers);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch users", err);
      setLoading(false);
    }
  };

  const togglePlan = (id) => {
    setPlans((prev) =>
      prev.map((plan) =>
        plan.id === id ? { ...plan, active: !plan.active } : plan
      )
    );
  };

  const updatePrice = (id, value) => {
    setPlans((prev) =>
      prev.map((plan) => (plan.id === id ? { ...plan, price: value } : plan))
    );
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    const result = await savePlans(plans);
    setSaving(false);
    
    if (result.success) {
      alert('✅ Pricing changes saved successfully! The changes will now be visible on the pricing page.');
      // ⭐ Refresh plans from backend to ensure sync
      await fetchPlans();
    } else {
      alert('❌ Failed to save changes: ' + result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Subscription Management
        </h1>
        <p className="text-gray-600 mt-2">
          Admin can enable, disable and update pricing for subscription plans
        </p>
      </div>

      {/* Stats / Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow flex flex-col gap-2">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-2xl font-bold">
            ₹124,500 <span className="text-green-500 text-sm">+12%</span>
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow flex flex-col gap-2">
          <p className="text-sm text-gray-500">Active Subscribers</p>
          <p className="text-2xl font-bold">
            {paidUsers.length} <span className="text-gray-400 text-sm">(Pro Users)</span>
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow flex flex-col gap-2">
          <p className="text-sm text-gray-500">Free Users</p>
          <p className="text-2xl font-bold">
            15,400{" "}
            <span className="text-gray-400 text-sm">(Potential leads)</span>
          </p>
        </div>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {plan.name}
              </h2>
              <button onClick={() => togglePlan(plan.id)}>
                {plan.active ? (
                  <ToggleRight className="text-green-500" />
                ) : (
                  <ToggleLeft className="text-gray-400" />
                )}
              </button>
            </div>

            <p className="text-sm text-gray-500">{plan.description}</p>

            {/* Price Control */}
            <div className="mt-4">
              <label className="text-sm text-gray-600">Monthly Price (₹)</label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="number"
                  value={plan.price}
                  disabled={!plan.active}
                  onChange={(e) => updatePrice(plan.id, e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900"
                />
                <Pencil className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Features */}
            <ul className="mt-5 space-y-2">
              {plan.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <Check className="w-4 h-4 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium 
                  ${plan.active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                  }`}
              >
                {plan.active ? "Active" : "Disabled"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="mt-12 flex justify-end">
        <button 
          onClick={handleSaveChanges}
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 mb-10 disabled:bg-gray-400"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Paid Users Table */}
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-10">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Paid Users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 text-left">User</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-center">Plan</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    Loading paid users...
                  </td>
                </tr>
              ) : paidUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No paid users found.
                  </td>
                </tr>
              ) : (
                paidUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {user.username || "User"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                        {user.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${user.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                          }`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-500">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSubscription;