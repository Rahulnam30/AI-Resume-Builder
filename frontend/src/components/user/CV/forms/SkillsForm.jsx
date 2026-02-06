import { useState } from "react";

const SkillsForm = ({ formData, setFormData }) => {
  const [newSkill, setNewSkill] = useState("");
  const [skillType, setSkillType] = useState("technical");

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          [skillType]: [...prev.skills[skillType], newSkill.trim()],
        },
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (type, index) => {
    setFormData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [type]: prev.skills[type].filter((_, i) => i !== index),
      },
    }));
  };

  const addSuggestedSkill = (skill) => {
    if (!formData.skills[skillType].includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          [skillType]: [...prev.skills[skillType], skill],
        },
      }));
    }
  };

  const suggestedSkills =
    skillType === "technical"
      ? ["JavaScript", "React", "Node.js", "Python", "SQL", "AWS"]
      : ["Leadership", "Communication", "Problem Solving", "Teamwork"];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-2 text-center font-medium transition-colors ${
            skillType === "technical"
              ? "border-b-2 border-indigo-500 text-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setSkillType("technical")}
        >
          Technical Skills
        </button>
        <button
          className={`flex-1 py-2 text-center font-medium transition-colors ${
            skillType === "soft"
              ? "border-b-2 border-indigo-500 text-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setSkillType("soft")}
        >
          Soft Skills
        </button>
      </div>

      {/* Add Skill Input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder={`Add a ${skillType} skill...`}
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && newSkill.trim()) addSkill();
          }}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={addSkill}
          className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
        >
          Add
        </button>
      </div>

      {/* Skills List */}
      <div className="flex flex-wrap gap-2">
        {formData.skills[skillType].map((skill, idx) => (
          <span
            key={idx}
            className="flex items-center gap-2 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
          >
            {skill}
            <button
              onClick={() => removeSkill(skillType, idx)}
              className="hover:text-red-600 font-bold"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {/* Suggested Skills */}
      <div className="space-y-2">
        <p className="font-medium text-gray-700">Suggested skills:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedSkills.map((skill, idx) => (
            <button
              key={idx}
              onClick={() => addSuggestedSkill(skill)}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300 transition-colors"
            >
              + {skill}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;
