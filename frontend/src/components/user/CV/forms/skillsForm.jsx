import { Plus, X } from "lucide-react";
import { useState } from "react";

const SkillsForm = ({ formData, setFormData }) => {
  const [newSkill, setNewSkill] = useState("");
  const [skillType, setSkillType] = useState("technical");

  const addSkill = () => {
    if (!newSkill.trim()) return;

    setFormData((prev) => ({
      ...prev,
      skills: {
        ...(prev?.skills ?? { technical: [], soft: [] }),
        [skillType]: [...(prev?.skills?.[skillType] ?? []), newSkill.trim()],
      },
    }));

    setNewSkill("");
  };

  const removeSkill = (type, index) => {
    setFormData((prev) => ({
      ...prev,
      skills: {
        ...(prev?.skills ?? { technical: [], soft: [] }),
        [type]: (prev?.skills?.[type] ?? []).filter((_, i) => i !== index),
      },
    }));
  };

  const addSuggestedSkill = (skill) => {
    if (!(formData?.skills?.[skillType] ?? []).includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: {
          ...(prev?.skills ?? { technical: [], soft: [] }),
          [skillType]: [...(prev?.skills?.[skillType] ?? []), skill],
        },
      }));
    }
  };

  const suggestedSkills =
    skillType === "technical"
      ? ["JavaScript", "React", "Node.js", "Python", "SQL", "AWS"]
      : ["Leadership", "Communication", "Problem Solving", "Teamwork"];

  return (
    <div className="flex flex-col gap-4">
      {/* ===== Toggle Buttons ===== */}
      <div className="flex gap-2 p-3 rounded-xl bg-slate-900 w-fit mx-auto">
        <button
          onClick={() => setSkillType("technical")}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300
            ${
              skillType === "technical"
                ? "bg-white text-slate-900 shadow-md scale-105"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
            }`}
        >
          Technical Skills
        </button>

        <button
          onClick={() => setSkillType("soft")}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300
            ${
              skillType === "soft"
                ? "bg-white text-slate-900 shadow-md scale-105"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
            }`}
        >
          Soft Skills
        </button>
      </div>

      {/* ===== Add Skill Input ===== */}
      <div className="flex gap-2 px-2">
        <input
          type="text"
          value={newSkill}
          placeholder={`Add a ${skillType} skill...`}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addSkill();
          }}
          className="border w-full p-2 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-400"
        />

        <button
          onClick={addSkill}
          className="bg-black text-white px-4 rounded-lg hover:bg-black/80 transition"
        >
          Add
        </button>
      </div>

      {/* ===== Skills List ===== */}
      <div className="flex flex-wrap gap-2 px-2">
        {(formData?.skills?.[skillType] ?? []).map((skill, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-2 bg-blue-200 text-blue-700 text-sm px-3 py-1 rounded-xl"
          >
            {skill}
            <button onClick={() => removeSkill(skillType, idx)}>
              <X size={14} className="hover:text-red-500 transition" />
            </button>
          </span>
        ))}
      </div>

      {/* ===== Suggested Skills ===== */}
      <div className="px-2">
        <p className="text-sm font-medium text-slate-600 mb-2">
          Suggested skills:
        </p>

        <div className="flex flex-wrap gap-2">
          {suggestedSkills.map((skill, idx) => (
            <button
              key={idx}
              onClick={() => addSuggestedSkill(skill)}
              className="flex items-center gap-1 bg-black text-white px-3 py-1.5 text-sm rounded-lg hover:bg-black/80 transition"
            >
              <Plus size={14} />
              {skill}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;
