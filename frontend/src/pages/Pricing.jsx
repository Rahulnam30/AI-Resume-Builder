import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "./Footer";

const pricing = () => {
  const navigate = useNavigate();
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
            <div className="border rounded-2xl p-8 text-center hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-gray-800">Free</h3>
              <p className="mt-2 text-gray-500">For getting started</p>

              <div className="mt-6">
                <span className="text-4xl font-extrabold text-blue-600">
                  ₹0
                </span>
              </div>

              <ul className="mt-6 space-y-3 text-gray-600 text-sm">
                <li>✔ Basic Resume Builder</li>
                <li>✔ Limited Templates</li>
                <li>✔ ATS-Friendly Format</li>
                <li>✖ AI Content Enhancement</li>
              </ul>

              <button
                onClick={() => navigate("/user/dashboard")}
                className="mt-8 w-full border-2 border-blue-600 text-blue-600 font-semibold py-3 rounded-lg hover:bg-blue-50 transition select-none"
              >
                Get Started
              </button>
            </div>

            {/* Pro Plan (Highlighted) */}
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

              <ul className="mt-6 space-y-3 text-gray-600 text-sm">
                <li>✔ AI Resume Builder</li>
                <li>✔ All Premium Templates</li>
                <li>✔ ATS Score Optimization</li>
                <li>✔ AI Content Enhancement</li>
                <li>✔ Unlimited Downloads</li>
              </ul>

              <button className="mt-8 w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition select-none">
                Upgrade to Pro
              </button>
            </div>

            {/* Enterprise / Lifetime */}
            <div className="border rounded-2xl p-8 text-center hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-gray-800">Lifetime</h3>
              <p className="mt-2 text-gray-500">One-time payment</p>

              <div className="mt-6">
                <span className="text-4xl font-extrabold text-blue-600">
                  ₹999
                </span>
              </div>

              <ul className="mt-6 space-y-3 text-gray-600 text-sm">
                <li>✔ All Pro Features</li>
                <li>✔ Lifetime Access</li>
                <li>✔ Priority Support</li>
                <li>✔ Future Updates</li>
              </ul>

              <button className="mt-8 w-full border-2 border-blue-600 text-blue-600 font-semibold py-3 rounded-lg hover:bg-blue-50 transition select-none">
                Buy Lifetime
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default pricing;
