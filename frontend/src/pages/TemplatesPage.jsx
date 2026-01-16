import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "./Footer";

function TemplatesPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredTemplate, setHoveredTemplate] = useState(null);
  const base = import.meta.env.BASE_URL || "/";

  const templates = [
    { id: 1, name: "Atlantic Blue", category: "modern", image: `${base}templates/chronological.png` },
    { id: 2, name: "Classic", category: "traditional", image: `${base}templates/functional.png` },
    { id: 3, name: "Corporate", category: "traditional", image: `${base}templates/creative.png` },
    { id: 4, name: "Modern Pro", category: "modern", image: `${base}templates/modern.png` },
    { id: 5, name: "Executive", category: "executive", image: `${base}templates/minimalist.png` },
    { id: 6, name: "Creative Edge", category: "creative", image: `${base}templates/executive.png` },
  ];

  const categories = [
    { id: "all", label: "All Templates" },
    { id: "traditional", label: "Traditional" },
    { id: "modern", label: "Modern" },
    { id: "creative", label: "Creative" },
    { id: "executive", label: "Executive" },
  ];

  const filteredTemplates =
    selectedCategory === "all"
      ? templates
      : templates.filter((t) => t.category === selectedCategory);

  const handleCreateResume = (template) => {
    navigate("/builder", { state: { template } });
  };

  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      {/* MAIN CONTENT */}
      <section className="px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Choose Your Template</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Select a professionally designed template to get started</p>
          </div>

          {/* CATEGORY FILTER */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                  selectedCategory === cat.id ? "bg-blue-600 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* TEMPLATES GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
                onClick={() => handleCreateResume(template)}
                className="group relative cursor-pointer"
              >
                <div
                  className={`bg-white rounded-xl shadow-lg border-2 overflow-hidden transition-all duration-300 ${
                    hoveredTemplate === template.id ? "border-blue-600 shadow-2xl -translate-y-2" : "border-gray-200"
                  }`}
                >
                  <div className="relative h-[400px] bg-gray-50 overflow-hidden">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = "none";
                        const parent = e.target.parentElement;
                        parent.innerHTML = `
                          <div class="w-full h-full bg-white p-8 flex flex-col gap-4">
                            <div class="h-8 bg-gray-800 rounded"></div>
                            <div class="h-4 bg-gray-300 rounded w-3/4"></div>
                            <div class="h-4 bg-gray-300 rounded w-1/2"></div>
                            <div class="flex gap-4 mt-4">
                              <div class="flex-1 h-32 bg-gray-200 rounded"></div>
                              <div class="flex-1 h-32 bg-gray-200 rounded"></div>
                            </div>
                            <div class="h-4 bg-gray-300 rounded"></div>
                            <div class="h-4 bg-gray-300 rounded w-5/6"></div>
                            <div class="h-4 bg-gray-300 rounded w-2/3"></div>
                            <div class="flex gap-2 mt-4">
                              <div class="h-16 w-16 bg-gray-400 rounded-full"></div>
                              <div class="flex-1 space-y-2">
                                <div class="h-3 bg-gray-300 rounded"></div>
                                <div class="h-3 bg-gray-300 rounded w-3/4"></div>
                              </div>
                            </div>
                          </div>
                        `;
                      }}
                    />
                  </div>

                  <div className="p-4 bg-white border-t border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 text-center">{template.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default TemplatesPage;