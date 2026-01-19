import { useState } from 'react';
import { Sparkles, RefreshCw, Copy, Check } from 'lucide-react';

const BodyContentForm = ({ formData, onInputChange, onAIGenerate }) => {
  const [generating, setGenerating] = useState({});
  const [copied, setCopied] = useState({});

  const handleGenerate = async (field) => {
    setGenerating(prev => ({ ...prev, [field]: true }));
    
    // Simulate AI generation
    setTimeout(() => {
      const suggestions = {
        openingParagraph: `I am writing to express my strong interest in the ${formData.jobTitle || '[Job Title]'} position at ${formData.companyName || '[Company Name]'}. With my background in [your field] and passion for [relevant area], I am confident that I would be a valuable addition to your team.`,
        bodyParagraph1: `In my previous role, I successfully [key achievement]. This experience has equipped me with strong skills in [relevant skills], which align perfectly with the requirements outlined in your job description. I am particularly drawn to this opportunity because [reason].`,
        bodyParagraph2: `Additionally, I bring expertise in [additional skills/experience]. My track record of [specific accomplishments] demonstrates my ability to deliver results and contribute meaningfully to team objectives. I am excited about the prospect of bringing this experience to ${formData.companyName || '[Company Name]'}.`,
        closingParagraph: `I am enthusiastic about the opportunity to contribute to ${formData.companyName || '[Company Name]'}'s continued success. I would welcome the chance to discuss how my skills and experiences align with your needs. Thank you for considering my application.`
      };
      
      onInputChange(field, suggestions[field]);
      setGenerating(prev => ({ ...prev, [field]: false }));
    }, 1500);
  };

  const handleCopy = (field) => {
    navigator.clipboard.writeText(formData[field] || '');
    setCopied(prev => ({ ...prev, [field]: true }));
    setTimeout(() => setCopied(prev => ({ ...prev, [field]: false })), 2000);
  };

  const renderTextArea = (field, label, placeholder, rows = 4) => (
    <div className="form-group full-width content-block">
      <div className="content-header">
        <label>{label}</label>
        <div className="content-actions">
          <button 
            className="ai-generate-btn"
            onClick={() => handleGenerate(field)}
            disabled={generating[field]}
          >
            {generating[field] ? (
              <><RefreshCw size={14} className="spinning" /> Generating...</>
            ) : (
              <><Sparkles size={14} /> AI Generate</>
            )}
          </button>
          <button 
            className="copy-btn"
            onClick={() => handleCopy(field)}
            disabled={!formData[field]}
          >
            {copied[field] ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
      </div>
      <textarea
        placeholder={placeholder}
        value={formData[field]}
        onChange={(e) => onInputChange(field, e.target.value)}
        rows={rows}
      />
    </div>
  );

  return (
    <div className="form-section">
      <h3 className="form-section-title">Letter Content</h3>
      <p className="form-description">
        Write your cover letter content below or use AI to generate compelling paragraphs.
      </p>

      <div className="content-tip">
        <span className="tip-icon">💡</span>
        <div>
          <strong>Pro Tip:</strong> A great cover letter has 3-4 paragraphs: an engaging opening, 
          1-2 body paragraphs highlighting your relevant experience, and a strong closing.
        </div>
      </div>

      {renderTextArea(
        'openingParagraph',
        'Opening Paragraph *',
        'Start with a strong hook that mentions the specific position and company. Express your enthusiasm and briefly mention why you\'re a great fit...',
        4
      )}

      {renderTextArea(
        'bodyParagraph1',
        'Body Paragraph 1 - Key Qualifications *',
        'Highlight your most relevant experience and achievements. Use specific examples and quantifiable results when possible...',
        5
      )}

      {renderTextArea(
        'bodyParagraph2',
        'Body Paragraph 2 - Additional Value (Optional)',
        'Add more relevant skills, experiences, or explain why you\'re passionate about the company/industry...',
        5
      )}

      {renderTextArea(
        'closingParagraph',
        'Closing Paragraph *',
        'Summarize your interest, express enthusiasm for an interview, and thank them for their consideration...',
        4
      )}

      <div className="word-count-info">
        <span>
          📊 Total Words: {
            [formData.openingParagraph, formData.bodyParagraph1, formData.bodyParagraph2, formData.closingParagraph]
              .filter(Boolean)
              .join(' ')
              .split(/\s+/)
              .filter(Boolean)
              .length
          }
        </span>
        <span className="ideal-range">Ideal range: 250-400 words</span>
      </div>
    </div>
  );
};

export default BodyContentForm;
