import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/*import HeroImg from "../assets/hero-ai.jpeg";
import VisionImg from "../assets/vision-map.jpeg";
import ValuesImg from "../assets/vision-globe.jpeg";
import JourneyImg from "../assets/journey-path.jpeg";
import UpToSkillsImg from "../assets/UptoSkills.webp";*/

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const AboutUs = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Fixed Navbar */}
      <NavBar />

      {/* Page wrapper with navbar offset */}
      <main className="bg-[#f4f7fa] min-h-screen font-sans text-slate-800 pt-16 pb-20">

        {/* ================= HERO SECTION ================= */}
        <section className="flex flex-col items-center justify-between max-w-6xl px-6 py-16 mx-auto md:flex-row">
          <div className="space-y-6 text-left md:w-1/2">
            <h1 className="text-4xl font-extrabold leading-tight text-slate-900">
              Build Your Dream Resume <br />
              <span className="text-blue-600">with AI Power</span>
            </h1>

            <p className="text-lg text-slate-600">
              Leverage artificial intelligence to craft professional ATS-friendly
              resumes that stand out.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2 font-medium text-white transition bg-orange-500 rounded-full shadow-md hover:bg-orange-600"
              >
                Generate Talent
              </button>

              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2 font-medium text-white transition bg-blue-600 rounded-full shadow-md hover:bg-blue-700"
              >
                AI Score
              </button>
            </div>
          </div>

          <div className="flex justify-end md:w-1/2">
            <img
              src={HeroImg}
              alt="Hero"
              className="max-w-[400px] w-full h-auto drop-shadow-xl"
            />
          </div>
        </section>

        {/* ================= ABOUT SECTION ================= */}
        <section className="max-w-5xl mx-auto px-6 py-12 bg-white rounded-[2rem] shadow-sm border border-slate-100 mb-12">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              About AI Resume Builder
            </h2>
            <p className="mt-4 text-slate-500">
              Empowering job seekers through smart automation.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="p-6 bg-slate-50 rounded-2xl">
              <h3 className="mb-2 text-xl font-bold text-blue-600">
                Our Mission
              </h3>
              <p className="text-slate-600">
                Our mission is to democratize career success by providing job
                seekers with high-end, AI-driven tools that were once only
                available to professionals.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl">
              <h3 className="mb-2 text-xl font-bold text-blue-600">
                Our Approach
              </h3>
              <p className="text-slate-600">
                We focus on data-driven resume optimization, real-time feedback,
                and ATS-friendly formatting so your profile doesn’t just look
                good—it performs.
              </p>
            </div>
          </div>
        </section>

        {/* ================= VISION ================= */}
        <section className="max-w-5xl px-6 mx-auto mb-12">
          <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <h2 className="mb-4 text-3xl font-bold">Our Vision</h2>
            <p className="max-w-xl mb-8 italic text-slate-500">
              We envision a future where technology removes barriers to
              professional growth and makes career guidance universally
              accessible.
            </p>

            <div className="w-full max-w-[500px] overflow-hidden rounded-xl">
              <img src={VisionImg} alt="Vision" className="w-full h-auto" />
            </div>
          </div>
        </section>

        {/* ================= VALUES ================= */}
        <section className="max-w-5xl px-6 mx-auto mb-12">
          <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <h2 className="mb-8 text-3xl font-bold">Our Values</h2>

            <p className="max-w-xl mb-8 italic text-slate-500">
              Innovation, accuracy, and inclusivity guide everything we build.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="p-4 text-sm font-bold text-blue-700 bg-blue-50 rounded-xl">
                Collaboration
              </div>
              <div className="p-4 text-sm font-bold text-orange-700 bg-orange-50 rounded-xl">
                Innovation
              </div>
              <div className="p-4 text-sm font-bold text-green-700 bg-green-50 rounded-xl">
                Inclusivity
              </div>
            </div>

            <img
              src={ValuesImg}
              alt="Values"
              className="max-h-[250px] w-auto rounded-xl"
            />
          </div>
        </section>

        {/* ================= JOURNEY ================= */}
        <section className="max-w-5xl px-6 mx-auto mb-12">
          <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <h2 className="mb-4 text-3xl font-bold">Our Journey</h2>
            <p className="max-w-xl mb-8 italic text-slate-500">
              From a passion project to a platform trusted by thousands of job
              seekers worldwide.
            </p>

            <div className="w-full max-w-[500px] overflow-hidden rounded-xl">
              <img src={JourneyImg} alt="Journey" className="w-full h-auto" />
            </div>
          </div>
        </section>

        <Footer />

      </main>
    </>
  );
};

export default AboutUs;
