import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "./Footer";
import { Check, Lock } from "lucide-react";

const pricing = () => {
  const navigate = useNavigate();
  const isLoggedIn =
    typeof window !== "undefined" && !!localStorage.getItem("token");
  return (
    <>
      <NavBar />
      <section className="bg-white px-6 md:px-16 py-20">
        <div className="max-w-7xl   mx-auto">
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

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="border-2 border-green-500 rounded-2xl p-8 text-center shadow-xl relative">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-semibold px-4 py-1 rounded-full select-none">
                Free
              </span>

              <h3 className="text-xl font-bold text-gray-800">Free</h3>
              <p className="mt-2 text-gray-500">For getting started</p>

              <div className="mt-6">
                <span className="text-4xl font-extrabold text-green-500">
                  ₹0
                </span>
              </div>

              <div className="w-full flex justify-center">
                <ul className="mt-6 space-y-3 text-gray-600 text-sm">
                  <li className="text-left">✔ 1 Resume Template</li>
                  <li className="text-left">✔ Limited AI Suggestions</li>
                  <li className="text-left">✔ Watermark on Resume</li>
                  <li className="text-left">✔ Community Support</li>
                  <li className="text-left">✔ Resume Section Suggestions</li>
                </ul>
              </div>
              <button
                onClick={() =>
                  navigate(`${isLoggedIn ? "/user/dashboard" : "/login"}`)
                }
                className="mt-8 w-full bg-green-500 text-white font-semibold py-3 rounded-lg select-none hover:bg-green-600 transition"
              >
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="border-2 border-orange-500 rounded-2xl p-8 text-center shadow-xl relative">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-semibold px-4 py-1 rounded-full select-none">
                Most Popular
              </span>

              <h3 className="text-xl font-bold text-gray-800">Pro</h3>
              <p className="mt-2 text-gray-500">Best for job seekers</p>

              <div className="mt-6">
                <span className="text-4xl font-extrabold text-orange-500">
                  ₹299
                </span>
                <span className="text-gray-500"> / month</span>
              </div>

              <div className="w-full flex justify-center">
                <ul className="mt-6 space-y-3 text-gray-600 text-sm">
                  <li className="text-left">✔ AI Resume Builder</li>
                  <li className="text-left">✔ All Premium Templates</li>
                  <li className="text-left">✔ ATS Score Optimization</li>
                  <li className="text-left">✔ AI Content Enhancement</li>
                  <li className="text-left">✔ Unlimited Downloads</li>
                </ul>
              </div>

              <button className="mt-8 w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition select-none">
                Upgrade to Pro
              </button>
            </div>

            {/* Premium Plan */}
            <div className="border-2 border-blue-500 rounded-2xl p-8 text-center shadow-xl relative">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-semibold px-4 py-1 rounded-full select-none">
                Best Value
              </span>

              <h3 className="text-xl font-bold text-gray-800">Premium</h3>
              <p className="mt-2 text-gray-500">For career acceleration</p>

              <div className="mt-6">
                <span className="text-4xl font-extrabold text-blue-500">
                  ₹999
                </span>
                <span className="text-gray-500"> / year</span>
              </div>

              <div className="w-full flex justify-center">
                <ul className="mt-6 space-y-3 text-gray-600 text-sm">
                  <li className="text-left">✔ All Pro Features</li>
                  <li className="text-left">
                    ✔ Unlimited AI Content Enhancements
                  </li>
                  <li className="text-left">
                    ✔ Advanced AI Resume Optimization
                  </li>
                  <li className="text-left">✔ Priority Support</li>
                  <li className="text-left">✔ Future Updates</li>
                </ul>
              </div>

              <button className="mt-8 w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition select-none">
                Unlock Premium
              </button>
            </div>
          </div>
        </div>

        {/* Comparison Table Section */}
        <div className="p-10">
          <div className="max-w-6xl mx-auto py-20">
            <div className="mt-15 mb-32">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
                <span className="text-orange-500">Unlock Power</span>
                <span className="text-blue-500">ful Features</span>
              </h2>
              <p className="text-center text-gray-500 mb-12">
                Upgrade your plan to unlock advanced capabilities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Free */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-semibold text-green-600 mb-6 text-center">
                  Free
                </h3>

                {[
                  "AI Resume Builder",
                  "Resume Section Suggestions",
                  "Community Support",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 mb-4">
                    <Check className="text-green-500 w-5 h-5" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}

                {[
                  "All Premium Templates",
                  "ATS Score Optimization",
                  "AI Content Enhancement",
                  "Unlimited Downloads",
                  "Priority Support",
                  "Future Updates",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 mb-4 text-gray-400"
                  >
                    <Lock className="w-4 h-4" />
                    <span className="text-sm line-through">{item}</span>
                  </div>
                ))}
              </div>

              {/* Pro */}
              <div className="relative bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-xl p-6">
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs px-4 py-1 rounded-full shadow">
                  Recommended
                </span>

                <h3 className="text-xl font-semibold text-orange-600 mb-6 text-center">
                  Pro
                </h3>

                {[
                  "AI Resume Builder",
                  "Resume Section Suggestions",
                  "Community Support",
                  "All Premium Templates",
                  "ATS Score Optimization",
                  "AI Content Enhancement",
                  "Unlimited Downloads",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 mb-4">
                    <Check className="text-orange-500 w-5 h-5" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}

                {["Priority Support", "Future Updates"].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 mb-4 text-gray-400"
                  >
                    <Lock className="w-4 h-4" />
                    <span className="text-sm line-through">{item}</span>
                  </div>
                ))}
              </div>

              {/* Premium */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-semibold text-blue-600 mb-6 text-center">
                  Premium
                </h3>

                {[
                  "AI Resume Builder",
                  "Resume Section Suggestions",
                  "Community Support",
                  "All Premium Templates",
                  "ATS Score Optimization",
                  "AI Content Enhancement",
                  "Unlimited Downloads",
                  "Priority Support",
                  "Future Updates",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 mb-4">
                    <Check className="text-blue-500 w-5 h-5" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default pricing;
