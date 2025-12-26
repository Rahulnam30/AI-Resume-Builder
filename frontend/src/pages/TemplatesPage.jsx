import { useState } from "react";
import UpToSkillsImg from '../assets/UptoSkills.webp';

function TemplatesPage({ onSelectTemplate, onNavigateHome }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  /* =========================
     TEMPLATE DATA (LOCAL IMAGE)
  ========================= */
  const templates = [
    {
      id: 1,
      name: "Chronological",
      category: "traditional",
      desc: "Traditional timeline format",
      image: "templates/chronological.png", // ✅ LOCAL IMAGE
      color: "from-blue-500 to-blue-600",
      features: ["Clean layout", "Experience focused", "ATS friendly"],
    },
    {
      id: 2,
      name: "Functional",
      category: "modern",
      desc: "Skills-based layout",
      image: "/templates/chronological.png", 
      color: "from-indigo-500 to-indigo-600",
      features: ["Skills focused", "Modern design", "Career switch friendly"],
    },
    {
      id: 3,
      name: "Creative",
      category: "creative",
      desc: "Bold and unique design",
      image: "/templates/chronological.png",
      color: "from-pink-500 to-rose-600",
      features: ["Eye-catching", "Design showcase", "Creative roles"],
    },
    {
      id: 4,
      name: "Modern",
      category: "modern",
      desc: "Contemporary professional",
      image: "/templates/chronological.png",
      color: "from-cyan-600 to-teal-600",
      features: ["Minimalist", "Professional", "Clean UI"],
    },
    {
      id: 5,
      name: "Minimalist",
      category: "traditional",
      desc: "Clean and simple",
      image: "/templates/chronological.png",
      color: "from-slate-400 to-slate-600",
      features: ["Ultra clean", "Simple design", "Fast loading"],
    },
    {
      id: 6,
      name: "Executive",
      category: "executive",
      desc: "Senior-level format",
      image: "/templates/chronological.png",
      color: "from-amber-600 to-orange-700",
      features: ["Leadership focused", "Executive summary", "Premium look"],
    },
  ];

  const filteredTemplates =
    selectedCategory === "all"
      ? templates
      : templates.filter((t) => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white text-[#1a2e52] flex flex-col">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 py-4 border-b border-gray-200 bg-white/95 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
           <div className="flex flex-col gap-1 cursor-pointer">
               <div onClick={onNavigateHome} className="text-[1.5rem] font-extrabold tracking-[0.5px] font-['Space_Grotesk']">
                   <img src={UpToSkillsImg} alt="UpToSkills Logo" className="w-[150px]" />
                </div>
           </div>


          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 px-6 py-3 border border-[#0077cc] text-[#0077cc] rounded-lg font-semibold hover:bg-[#0077cc] hover:text-white hover:-translate-y-1 transition-all duration-300"
          >
            ← Back Home
          </button>
        </div>
      </nav>

      {/* MAIN */}
      <section className="flex-1 px-8 py-16 bg-[#fafafa]">
        <div className="max-w-[1400px] mx-auto">
          {/* HEADER */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-5xl font-extrabold lg:text-6xl text-[#1a2e52]">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-[#e65100] to-[#0077cc] bg-clip-text text-transparent">
                Perfect Template
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Professionally designed, ATS-friendly resume templates
            </p>
          </div>

          {/* CATEGORY FILTER */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["all", "traditional", "modern", "creative", "executive"].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-[#e65100] to-[#f4511e] text-white shadow-md"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-[#0077cc] hover:text-[#0077cc]"
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              )
            )}
          </div>

          {/* GRID */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#0077cc] transition-all duration-300 hover:-translate-y-2 shadow-sm hover:shadow-xl"
              >
                {/* IMAGE SECTION */}
                <div className={`h-64 bg-gradient-to-br ${template.color} p-4`}>
                  <img
                    src={template.image}
                    alt={template.name}
                    className="object-cover w-full h-full shadow-2xl rounded-xl"
                  />
                </div>

                {/* INFO */}
                <div className="p-6">
                  <h3 className="mb-2 text-2xl font-bold text-[#1a2e52]">
                    {template.name}
                  </h3>
                  <p className="mb-4 text-gray-500">
                    {template.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {template.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-[#0077cc]/10 text-[#0077cc] px-3 py-1 rounded-full border border-[#0077cc]/10 font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectTemplate(template)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-[#e65100] to-[#f4511e] text-white font-bold rounded-lg hover:shadow-lg hover:brightness-110 transition-all duration-300"
                  >
                    Create Resume →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-8 py-8 text-sm text-center text-gray-500 bg-white border-t border-gray-100">
        © {new Date().getFullYear()} UptoSkills. All rights reserved.
      </footer>
    </div>
  );
}

export default TemplatesPage;