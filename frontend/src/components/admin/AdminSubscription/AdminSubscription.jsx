import React, { useState } from "react";
import { Check, ToggleLeft, ToggleRight, Pencil } from "lucide-react";
import AdminUsers from "../AdminUser/AdminUsers";

const initialPlans = [
  {
    id: 1,
    name: "Free",
    price: 0,
    active: true,
    description: "For testing & basic usage",
    features: [
      "1 Resume Template",
      "Limited AI Suggestions",
      "Watermark on Resume",
      "Community Support",
    ],
  },
  {
    id: 2,
    name: "Pro",
    price: 299,
    active: true,
    description: "Best for students & professionals",
    features: [
      "Unlimited Templates",
      "Full AI Resume Writing",
      "No Watermark",
      "PDF & DOCX Export",
      "Priority Support",
    ],
  },
];

const AdminSubscription = () => {
  const [plans, setPlans] = useState(initialPlans);

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
            3,100 <span className="text-gray-400 text-sm">(Pro Users)</span>
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
                  ${
                    plan.active
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
        <button className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700">
          Save Changes
        </button>
      </div>

      <AdminUsers head={"User Subscription"} />
    </div>
  );
};

export default AdminSubscription;
