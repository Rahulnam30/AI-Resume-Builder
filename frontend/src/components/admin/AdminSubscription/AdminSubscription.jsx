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
  {
    id: 3,
    name: "Enterprise",
    price: 999,
    active: false,
    description: "For institutions & teams",
    features: [
      "Custom Templates",
      "Admin Panel Access",
      "Team Management",
      "API Access",
      "Dedicated Support",
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Subscription Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Admin can enable, disable and update pricing for subscription plans
        </p>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
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

            <p className="text-sm text-gray-500 dark:text-gray-400">
              {plan.description}
            </p>

            {/* Price Control */}
            <div className="mt-4">
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Monthly Price (₹)
              </label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="number"
                  value={plan.price}
                  disabled={!plan.active}
                  onChange={(e) => updatePrice(plan.id, e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <Pencil className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Features */}
            <ul className="mt-5 space-y-2">
              {plan.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
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
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
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
