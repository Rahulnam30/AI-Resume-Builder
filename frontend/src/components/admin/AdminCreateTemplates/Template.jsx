import React from "react";
import { Filter } from "lucide-react";

const templatesData = {
  "Modern Templates": [
    {
      name: "Minimalist Pro",
      used: 1200,
      previewText: "John Doe • Software Engineer",
      image: "https://images.template.net/116/Professional-Resume-Template.jpg",
    },
    {
      name: "Elegant Professional",
      used: 980,
      previewText: "Jane Smith • Product Manager",
      image:
        "https://marketplace.canva.com/EAGVLq3_1Kk/1/0/1131w/canva-blue-and-gray-simple-professional-cv-resume-mm8ax3-1FmE.jpg",
    },
    {
      name: "Clean & Concise",
      used: 850,
      previewText: "Mark Davis • Data Scientist",
      image:
        "https://cdn-images.zety.com/pages/free_resume_templates_new_3.jpg",
    },
    {
      name: "Modern Minimal",
      used: 710,
      previewText: "Emily White • UX Designer",
      image:
        "https://img.freepik.com/premium-psd/modern-professional-resume-cv-psd-template_1042205-16.jpg",
    },
  ],
  "Creative Templates": [
    {
      name: "Vibrant Designer",
      used: 620,
      previewText: "Jane Doe • Graphic Designer",
      image:
        "https://img.freepik.com/premium-psd/resume-template_215426-87.jpg?w=2000",
    },
    {
      name: "Bold Marketer",
      used: 580,
      previewText: "Alex Brown • Marketing Specialist",
      image:
        "https://tse4.mm.bing.net/th/id/OIP.K52I6UqOR8Vsm_igy__GhwHaJl?w=600&h=776&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      name: "Creative Content",
      used: 490,
      previewText: "Jake Miller • Content Writer",
      image:
        "https://tse2.mm.bing.net/th/id/OIP.u9muj4aWSiQ_PrcRKWX2fgHaKe?w=700&h=990&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
  ],
};

export default function AdminTemplates() {
  return (
    <div className="p-6 space-y-10 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Resume Templates
          </h1>
          <p className="text-sm text-slate-500">
            Manage and organize all available resume templates.
          </p>
        </div>

        <button className="flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-lg text-sm text-slate-600 bg-white">
          <Filter size={16} />
          Filter by Role: All
        </button>
      </div>

      {/* Sections */}
      {Object.entries(templatesData).map(([section, templates]) => (
        <div key={section} className="space-y-4">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">{section}</h2>
            <button className="text-sm text-blue-600 hover:underline">
              View All ({templates.length})
            </button>
          </div>

          {/* A4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {templates.map((tpl, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-xl p-3 hover:shadow-lg transition"
              >
                {/* A4 Preview */}
                <div className="relative w-full aspect-[210/297] bg-slate-100 rounded-lg overflow-hidden">
                  <img
                    src={tpl.image}
                    alt={tpl.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="mt-3 space-y-1">
                  <h3 className="text-sm font-semibold text-slate-800">
                    {tpl.name}
                  </h3>
                  <p className="text-xs text-slate-500">{tpl.previewText}</p>
                  <p className="text-xs text-slate-400">
                    Used: {tpl.used.toLocaleString()} times
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
