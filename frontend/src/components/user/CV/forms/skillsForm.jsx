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
      <div className="skills-type-tabs">
        <button
          className={`skill-type-tab ${skillType === 'technical' ? 'active' : ''}`}
          onClick={() => setSkillType('technical')}
        >
          Technical Skills
        </button>
        <button
          className={`skill-type-tab ${skillType === 'soft' ? 'active' : ''}`}
          onClick={() => setSkillType('soft')}
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