import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "./Footer";
import { Check, Lock } from "lucide-react";

const Pricing = () => {
  const navigate = useNavigate();
  const isLoggedIn =
    typeof window !== "undefined" && !!localStorage.getItem("token");

  const plans = [
    {
      name: "Free",
      badge: "No Cost",
      badgeColor: "bg-green-500",
      priceColor: "text-green-500",
      buttonColor: "bg-green-500 hover:bg-green-600",
      checkColor: "text-green-500",
      price: "₹0",
      period: "",
      description: "For getting started",
      buttonText: "Get Started",
      buttonAction: () => navigate(`${isLoggedIn ? "/user/dashboard" : "/login"}`),
      gradient: false,
      features: [
        { name: "AI Resume Builder", included: true },
        { name: "Resume Section Suggestions", included: true },
        { name: "Community Support", included: true },
        { name: "All Premium Templates", included: false },
        { name: "ATS Score Optimization", included: false },
        { name: "AI Content Enhancement", included: false },
        { name: "Unlimited Downloads", included: false },
        { name: "Priority Support", included: false },
        { name: "Future Updates", included: false },
      ],
    },
    {
      name: "Pro",
      badge: "Most Popular",
      badgeColor: "bg-orange-500",
      priceColor: "text-orange-500",
      buttonColor: "bg-orange-500 hover:bg-orange-600",
      checkColor: "text-orange-500",
      price: "₹299",
      period: " / month",
      description: "Best for job seekers",
      buttonText: "Upgrade to Pro",
      buttonAction: () => {},
      gradient: true,
      features: [
        { name: "AI Resume Builder", included: true },
        { name: "Resume Section Suggestions", included: true },
        { name: "Community Support", included: true },
        { name: "All Premium Templates", included: true },
        { name: "ATS Score Optimization", included: true },
        { name: "AI Content Enhancement", included: true },
        { name: "Unlimited Downloads", included: true },
        { name: "Priority Support", included: false },
        { name: "Future Updates", included: false },
      ],
    },
    {
      name: "Premium",
      badge: "Best Features",
      badgeColor: "bg-blue-500",
      priceColor: "text-blue-500",
      buttonColor: "bg-blue-500 hover:bg-blue-600",
      checkColor: "text-blue-500",
      price: "₹999",
      period: " / year",
      description: "For career acceleration",
      buttonText: "Unlock Premium",
      buttonAction: () => {},
      gradient: false,
      features: [
        { name: "AI Resume Builder", included: true },
        { name: "Resume Section Suggestions", included: true },
        { name: "Community Support", included: true },
        { name: "All Premium Templates", included: true },
        { name: "ATS Score Optimization", included: true },
        { name: "AI Content Enhancement", included: true },
        { name: "Unlimited Downloads", included: true },
        { name: "Priority Support", included: true },
        { name: "Future Updates", included: true },
      ],
    },
  ];

  return (
    <>
      <NavBar />
      <section className="bg-white px-6 md:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14 select-none">
            <h2 className="text-4xl font-extrabold">
              <span className="text-blue-600">Plans & </span>{" "}
              <span className="text-blue-600">Pricing</span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Choose a plan that fits your career goals. Upgrade anytime to
              unlock premium resume features.
            </p>
          </div>

          {/* Enhanced Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl shadow-md p-8 relative ${
                  plan.gradient ? "bg-gradient-to-b from-orange-50 to-white shadow-xl" : "bg-white"
                }`}
              >
                {plan.badge && (
                  <span
                    className={`absolute -top-4 left-1/2 -translate-x-1/2 ${plan.badgeColor} text-white text-xs font-semibold px-4 py-1 rounded-full select-none shadow`}
                  >
                    {plan.badge}
                  </span>
                )}

                {/* Plan Header */}
                <div className="text-center mb-6">
                  <h3 className={`text-xl font-semibold ${plan.priceColor} mb-2`}>
                    {plan.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{plan.description}</p>

                  <div className="mt-4">
                    <span className={`text-4xl font-extrabold ${plan.priceColor}`}>
                      {plan.price}
                    </span>
                    <span className="text-gray-500">{plan.period}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="mb-6">
                  {plan.features.map((feature, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 mb-4 ${
                        !feature.included ? "text-gray-400" : ""
                      }`}
                    >
                      {feature.included ? (
                        <Check className={`${plan.checkColor} w-5 h-5 flex-shrink-0`} />
                      ) : (
                        <Lock className="w-4 h-4 flex-shrink-0" />
                      )}
                      <span
                        className={`text-sm ${
                          feature.included ? "text-gray-700" : "line-through"
                        }`}
                      >
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={plan.buttonAction}
                  className={`w-full ${plan.buttonColor} text-white font-semibold py-3 rounded-lg select-none transition`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Pricing;