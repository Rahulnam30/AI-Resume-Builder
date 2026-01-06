import { useState } from 'react';
import { Sparkles, Lightbulb, Briefcase, TrendingUp, FolderKanban, Plus } from 'lucide-react';

const AISuggestions = ({ onUseSummary }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedRole, setSelectedRole] = useState('software-developer');
  const [jobTitle, setJobTitle] = useState('');
  const [industry, setIndustry] = useState('');

  const summaryTemplates = [
    { role: 'Software Developer', text: 'Experienced software developer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable applications and improving system performance by 40%.' },
    { role: 'Marketing Professional', text: 'Results-driven developer with strong problem-solving skills and experience in agile methodologies. Passionate about creating efficient, maintainable code and collaborating with cross-functional teams to deliver high-quality software solutions.' },
    { role: 'Project Manager', text: 'Full-stack developer with expertise in modern web technologies and database design. Successfully led development of 3 major projects, resulting in improved user engagement and reduced load times by 35%.' }
  ];

  return (
    <div className="ai-suggestions-box">
      <div className="ai-suggestions-header">
        <div className="ai-icon"><Sparkles size={20} /></div>
        <div>
          <h4>AI-Powered Summary Suggestions</h4>
          <p>Create summaries for your specific role</p>
        </div>
        <button 
          className="predefined-btn" 
          onClick={() => setShowSuggestions(!showSuggestions)}
        >
          {showSuggestions ? '− Hide Roles' : '+ Predefined Roles'}
        </button>
      </div>
      
      {!showSuggestions ? (
        <div className="ai-suggestions-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Your Job Title/Role *</label>
              <input 
                type="text" 
                placeholder="e.g., Data Scientist, UX Designer" 
                value={jobTitle} 
                onChange={(e) => setJobTitle(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label>Industry (Optional)</label>
              <input 
                type="text" 
                placeholder="e.g., FinTech, Healthcare" 
                value={industry} 
                onChange={(e) => setIndustry(e.target.value)} 
              />
            </div>
          </div>
          <button className="generate-btn" onClick={() => setShowSuggestions(true)}>
            <Sparkles size={16} /> Generate Summaries
          </button>
          <div className="ai-tips">
            <p className="tip">
              <Lightbulb size={14} /> Tip: Customize these AI-generated templates with your specific achievements and key accomplishments.
            </p>
          </div>
        </div>
      ) : (
        <div className="ai-suggestions-roles">
          <div className="role-tabs">
            <button 
              className={`role-tab ${selectedRole === 'software-developer' ? 'active' : ''}`} 
              onClick={() => setSelectedRole('software-developer')}
            >
              <Briefcase size={14} /> Software Developer
            </button>
            <button 
              className={`role-tab ${selectedRole === 'marketing' ? 'active' : ''}`} 
              onClick={() => setSelectedRole('marketing')}
            >
              <TrendingUp size={14} /> Marketing Professional
            </button>
            <button 
              className={`role-tab ${selectedRole === 'project-manager' ? 'active' : ''}`} 
              onClick={() => setSelectedRole('project-manager')}
            >
              <FolderKanban size={14} /> Project Manager
            </button>
            <button className="role-tab custom">
              <Plus size={14} /> Custom Role
            </button>
          </div>
          <div className="summary-suggestions">
            {summaryTemplates.map((template, idx) => (
              <div key={idx} className="summary-card">
                <p>{template.text}</p>
                <button 
                  className="use-summary-btn" 
                  onClick={() => onUseSummary(template.text)}
                >
                  <Sparkles size={14} /> Use This Summary
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AISuggestions;