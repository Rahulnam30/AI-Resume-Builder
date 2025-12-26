import { useState } from "react";

function TemplatesPage({ onSelectTemplate, onNavigateHome, onNavigateToBuilder, onNavigateToLogin }) {
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
      image: "/templates/chronological.png",
      color: "from-blue-500 to-blue-600",
      features: ["Clean layout", "Experience focused", "ATS friendly"],
    },
    {
      id: 2,
      name: "Functional",
      category: "modern",
      desc: "Skills-based layout",
      image: "/templates/functional.png",
      color: "from-purple-500 to-purple-600",
      features: ["Skills focused", "Modern design", "Career switch friendly"],
    },
    {
      id: 3,
      name: "Creative",
      category: "creative",
      desc: "Bold and unique design",
      image: "/templates/creative.png",
      color: "from-pink-500 to-pink-600",
      features: ["Eye-catching", "Design showcase", "Creative roles"],
    },
    {
      id: 4,
      name: "Modern",
      category: "modern",
      desc: "Contemporary professional",
      image: "/templates/modern.png",
      color: "from-cyan-500 to-cyan-600",
      features: ["Minimalist", "Professional", "Clean UI"],
    },
    {
      id: 5,
      name: "Minimalist",
      category: "traditional",
      desc: "Clean and simple",
      image: "/templates/minimalist.png",
      color: "from-gray-500 to-gray-600",
      features: ["Ultra clean", "Simple design", "Fast loading"],
    },
    {
      id: 6,
      name: "Executive",
      category: "executive",
      desc: "Senior-level format",
      image: "/templates/executive.png",
      color: "from-amber-700 to-amber-800",
      features: ["Leadership focused", "Executive summary", "Premium look"],
    },
  ];

  const filteredTemplates =
    selectedCategory === "all"
      ? templates
      : templates.filter((t) => t.category === selectedCategory);

  const handleCreateResume = (template) => {
    // Store selected template if needed
    if (onSelectTemplate) {
      onSelectTemplate(template);
    }
    
    // Redirect to login page
    if (onNavigateToLogin) {
      onNavigateToLogin(template);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0f1f3d] to-[#1a2e52] text-white flex flex-col">
      {/* NAVBAR */}
      <nav className="bg-[#0a1628]/95 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 py-4">
        <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="text-2xl font-extrabold tracking-wide font-['Space_Grotesk'] hover:opacity-80 transition-opacity"
          >
            UPTO<span className="text-[#00d9ff]">SKILLS</span>
          </button>

          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 px-6 py-3 border border-[#00d9ff] text-[#00d9ff] rounded-lg font-semibold hover:bg-[#00d9ff]/10 transition-all duration-300"
          >
            ← Back Home
          </button>
        </div>
      </nav>

      {/* MAIN */}
      <section className="px-8 py-16 flex-1">
        <div className="max-w-[1400px] mx-auto">
          {/* HEADER */}
          <div className="text-center mb-12">
            <h1 className="text-5xl lg:text-6xl font-extrabold mb-4">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-[#ff6b3d] to-[#00d9ff] bg-clip-text text-transparent">
                Perfect Template
              </span>
            </h1>
            <p className="text-xl text-gray-300">
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
                      ? "bg-gradient-to-r from-[#ff6b3d] to-[#ff5722] text-white shadow-lg"
                      : "bg-white/5 border border-white/10 text-gray-300 hover:border-[#00d9ff] hover:text-[#00d9ff]"
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              )
            )}
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-[#00d9ff] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,217,255,0.3)]"
              >
                {/* IMAGE SECTION */}
                <div className={`h-64 bg-gradient-to-br ${template.color} p-3 relative overflow-hidden`}>
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover rounded-xl shadow-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.classList.add('flex', 'items-center', 'justify-center');
                      const fallback = document.createElement('div');
                      fallback.className = 'text-white/50 text-sm font-semibold';
                      fallback.textContent = template.name;
                      e.target.parentElement.appendChild(fallback);
                    }}
                  />
                </div>

                {/* INFO */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    {template.name}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {template.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {template.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-[#00d9ff]/10 text-[#00d9ff] px-3 py-1 rounded-full border border-[#00d9ff]/20"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleCreateResume(template)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-[#ff6b3d] to-[#ff5722] text-white font-bold rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Create Resume
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a1628]/95 border-t border-white/5 px-8 py-8 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} UptoSkills. All rights reserved.
      </footer>
    </div>
  );
}

export default TemplatesPage;