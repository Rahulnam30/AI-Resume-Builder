import { useState } from 'react';

const SkillsForm = ({ formData, setFormData }) => {
  const [newSkill, setNewSkill] = useState('');
  const [skillType, setSkillType] = useState('technical');

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: {
          ...prev.skills,
          [skillType]: [...prev.skills[skillType], newSkill.trim()]
        }
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (type, index) => {
    setFormData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [type]: prev.skills[type].filter((_, i) => i !== index)
      }
    }));
  };

  const addSuggestedSkill = (skill) => {
    if (!formData.skills[skillType].includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: {
          ...prev.skills,
          [skillType]: [...prev.skills[skillType], skill]
        }
      }));
    }
  };

  const suggestedSkills = skillType === 'technical'
    ? ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'AWS']
    : ['Leadership', 'Communication', 'Problem Solving', 'Teamwork'];

  return (
    <div className="form-section">
        <div className="skills-type-tabs flex gap-2 p-3 rounded-xl bg-slate-900 w-fit my-2 mx-auto">
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
          placeholder={`Add a ${skillType} skill...`}
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && newSkill.trim()) {
              addSkill();
            }
          }}
        />
        <button onClick={addSkill}>Add</button>
      </div>
      <div className="skills-list">
        {formData.skills[skillType].map((skill, idx) => (
          <span key={idx} className="skill-tag">
            {skill}
            <button onClick={() => removeSkill(skillType, idx)}>×</button>
          </span>
        ))}
      </div>
      <div className="suggested-skills">
        <p>Suggested skills:</p>
        <div className="suggested-tags">
          {suggestedSkills.map((skill, idx) => (
            <button
              key={idx}
              className="suggested-tag"
              onClick={() => addSuggestedSkill(skill)}
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