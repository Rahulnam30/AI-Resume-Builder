import React, { useEffect } from "react";

import HeroImg from "../assets/hero-ai.jpeg";
import VisionImg from "../assets/vision-map.jpeg";
import ValuesImg from "../assets/vision-globe.jpeg";
import JourneyImg from "../assets/journey-path.jpeg";

import NavBar from "../components/NavBar";
import Footer from "./Footer";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NavBar />

      {/* ONE CONTINUOUS PAGE */}
      <main className="bg-[#f4f7fa] text-slate-800 pt-16">

        {/* HERO */}
        <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-10 select-none">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
              Build Your Dream Resume <br />
              <span className="text-blue-600">with AI Power</span>
            </h1>

            <p className="text-lg text-slate-600">
              Leverage artificial intelligence to craft professional,
              ATS-friendly resumes that stand out.
            </p>

            <div className="flex gap-4">
              <button className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
                Generate Talent
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                AI Score
              </button>
            </div>
          </div>

          <div className="md:w-1/2">
            <img src={HeroImg} alt="Hero" className="w-full max-w-md mx-auto" />
          </div>
        </section>

        {/* ABOUT */}
        <section className="max-w-5xl mx-auto px-6 py-20 space-y-10">
          <div className="text-center select-none">
            <h2 className="text-3xl font-bold text-slate-900">
              About AI Resume Builder
            </h2>
            <p className="mt-4 text-slate-500">
              Empowering job seekers through smart automation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold text-blue-600 mb-2 select-none">
                Our Mission
              </h3>
              <p className="text-slate-600">
                To democratize career success by offering AI-powered resume
                tools that were once only available to professionals.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-blue-600 mb-2 select-none">
                Our Approach
              </h3>
              <p className="text-slate-600">
                Data-driven optimization, real-time feedback, and
                ATS-friendly formatting so your resume performs—not just looks good.
              </p>
            </div>
          </div>
        </section>

        {/* VISION */}
        <section className="max-w-5xl mx-auto px-6 py-20 text-center space-y-8">
          <h2 className="text-3xl font-bold">Our Vision</h2>
          <p className="italic text-slate-500 max-w-xl mx-auto">
            A future where technology removes barriers to professional growth.
          </p>
          <img src={VisionImg} alt="Vision" className="mx-auto max-w-md select-none" />
        </section>

        {/* VALUES */}
        <section className="max-w-5xl mx-auto px-6 py-20 text-center space-y-10 select-none">
          <h2 className="text-3xl font-bold">Our Values</h2>

          <div className="flex justify-center gap-4 flex-wrap">
            <span className="px-5 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold">
              Collaboration
            </span>
            <span className="px-5 py-2 bg-orange-100 text-orange-700 rounded-full font-semibold">
              Innovation
            </span>
            <span className="px-5 py-2 bg-green-100 text-green-700 rounded-full font-semibold">
              Inclusivity
            </span>
          </div>

          <img src={ValuesImg} alt="Values" className="mx-auto max-w-sm" />
        </section>

        {/* JOURNEY */}
        <section className="max-w-5xl mx-auto px-6 py-20 text-center space-y-8">
          <h2 className="text-3xl font-bold select-none">Our Journey</h2>
          <p className="italic text-slate-500 max-w-xl mx-auto">
            From a passion project to a platform trusted by thousands of job seekers.
          </p>
          <img src={JourneyImg} alt="Journey" className="mx-auto max-w-md select-none" />
        </section>

        <Footer />
      </main>
    </>
  );
};

export default AboutUs;
