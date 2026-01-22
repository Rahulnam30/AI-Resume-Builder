import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { usePricing } from "../context/Pricingcontext";

const Pricing = () => {
  const navigate = useNavigate();
  const { plans, loading, fetchPlans } = usePricing(); // ⭐ Added fetchPlans

  // ⭐ Refresh plans when component mounts
  useEffect(() => {
    fetchPlans();
  }, []);

  // Find specific plans by name
  const freePlan = plans.find(plan => plan.name === "Free");
  const proPlan = plans.find(plan => plan.name === "Pro");
  const lifetimePlan = plans.find(plan => plan.name === "Lifetime");

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-600">Loading pricing...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <section className="bg-white px-6 md:px-16 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14 select-none">
            <h2 className="text-4xl font-extrabold">
              <span className="text-blue-600">Simple</span>{" "}
              <span className="text-orange-500">Pricing</span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Choose a plan that fits your career goals. Upgrade anytime to
              unlock premium resume features.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            {freePlan && freePlan.active && (
              <div className="border rounded-2xl p-8 text-center hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-gray-800">{freePlan.name}</h3>
                <p className="mt-2 text-gray-500">{freePlan.description}</p>

                <div className="mt-6">
                  <span className="text-4xl font-extrabold text-blue-600">
                    ₹{freePlan.price}
                  </span>
                </div>

                <ul className="mt-6 space-y-3 text-gray-600 text-sm">
                  {freePlan.features.map((feature, index) => (
                    <li key={index}>✔ {feature}</li>
                  ))}
                </ul>

                <button
                  onClick={() => navigate("/user/dashboard")}
                  className="mt-8 w-full border-2 border-blue-600 text-blue-600 font-semibold py-3 rounded-lg hover:bg-blue-50 transition select-none"
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Pro Plan (Highlighted) */}
            {proPlan && proPlan.active && (
              <div className="border-2 border-orange-500 rounded-2xl p-8 text-center shadow-xl relative">
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-semibold px-4 py-1 rounded-full select-none">
                  Most Popular
                </span>

                <h3 className="text-xl font-bold text-gray-800">{proPlan.name}</h3>
                <p className="mt-2 text-gray-500">{proPlan.description}</p>

                <div className="mt-6">
                  <span className="text-4xl font-extrabold text-orange-500">
                    ₹{proPlan.price}
                  </span>
                  <span className="text-gray-500"> / month</span>
                </div>

                <ul className="mt-6 space-y-3 text-gray-600 text-sm">
                  {proPlan.features.map((feature, index) => (
                    <li key={index}>✔ {feature}</li>
                  ))}
                </ul>

                <button className="mt-8 w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition select-none">
                  Upgrade to Pro
                </button>
              </div>
            )}

            {/* Lifetime Plan */}
            {lifetimePlan && lifetimePlan.active && (
              <div className="border rounded-2xl p-8 text-center hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-gray-800">{lifetimePlan.name}</h3>
                <p className="mt-2 text-gray-500">{lifetimePlan.description}</p>

                <div className="mt-6">
                  <span className="text-4xl font-extrabold text-blue-600">
                    ₹{lifetimePlan.price}
                  </span>
                </div>

                <ul className="mt-6 space-y-3 text-gray-600 text-sm">
                  {lifetimePlan.features.map((feature, index) => (
                    <li key={index}>✔ {feature}</li>
                  ))}
                </ul>

                <button className="mt-8 w-full border-2 border-blue-600 text-blue-600 font-semibold py-3 rounded-lg hover:bg-blue-50 transition select-none">
                  Buy Lifetime
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Pricing;