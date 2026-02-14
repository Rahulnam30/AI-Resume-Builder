import { Plus, X } from "lucide-react";
import { useState } from "react";

const SkillsForm = ({ formData, setFormData }) => {
  const [newSkill, setNewSkill] = useState("");
  const [skillType, setSkillType] = useState("technical");

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData((prev) => ({
        ...prev,
        skills: {
          ...(prev?.skills ?? { technical: [], soft: [] }),
          [skillType]: [...(prev?.skills?.[skillType] ?? []), newSkill.trim()],
        },
      }));
      setNewSkill("");
    }
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
      ? ["JavaScript", "React.js", "Node.js", "Python", "SQL", "AWS"]
      : ["Leadership", "Communication", "Teamwork", "Problem Solving"];

  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex gap-2 p-3 rounded-xl bg-slate-900 w-fit my-2 mx-auto">
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

      <div className="add-skill-row">
        <input
          type="text"
          className="border m-2 mr-1 w-4/5 p-2 rounded-lg outline-none"
          value={newSkill}
          placeholder={`Add a ${skillType} skill...`}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && newSkill.trim()) {
              addSkill();
            }
          }}
        />
        <button
          className="bg-black text-white py-2 px-3 rounded-lg"
          onClick={addSkill}
        >
          Add
        </button>
      </div>
      <div className="skills-list m-2">
        {(formData?.skills?.[skillType] ?? []).map((skill, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-2 bg-blue-200 text-sm text-blue-500 rounded-xl p-2 mr-2 mb-2"
          >
            <span>{skill}</span>
            <button onClick={() => removeSkill(skillType, idx)}>
              <X size={14} className="text-blue-500" />
            </button>
          </span>
        ))}
      </div>
      <div className="suggested-skills">
        <p>Suggested skills:</p>
        <div className="suggested-tags mt-2">
          {suggestedSkills.map((skill, idx) => (
            <button
              key={idx}
              className="flex items-center bg-black text-white m-1 p-2 text-sm rounded-lg"
              onClick={() => addSuggestedSkill(skill)}
            >
              <Plus size={14} className="mr-1 inline" /> {skill}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;
