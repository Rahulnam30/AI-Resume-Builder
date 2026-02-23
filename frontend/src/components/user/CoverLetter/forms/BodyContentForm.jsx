import { useState } from 'react';
import { Sparkles, RefreshCw, Copy, Check, Lightbulb } from 'lucide-react';

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

  const renderTextArea = (field, label, placeholder) => {
    const hasContent = !!formData[field];

    return (
      <div className="mb-6 group">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-semibold text-gray-700 flex-1 mr-4">{label}</label>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => handleGenerate(field)}
              disabled={generating[field]}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded-md transition-colors shadow-sm disabled:opacity-70"
            >
              {generating[field] ? (
                <><RefreshCw size={12} className="animate-spin" /> Generating...</>
              ) : (
                <><Sparkles size={12} /> AI Generate</>
              )}
            </button>
            <button
              onClick={() => handleCopy(field)}
              disabled={!formData[field]}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-all disabled:opacity-30"
              title="Copy text"
            >
              {copied[field] ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
            </button>
          </div>
        </div>
        <textarea
          placeholder={placeholder}
          value={formData[field]}
          onChange={(e) => onInputChange(field, e.target.value)}
          className="w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all resize-y min-h-[120px] outline-none hover:border-gray-300"
        />
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Letter Content</h2>
        <p className="text-sm text-gray-600">
          Write your cover letter content below or use AI to generate compelling paragraphs.
        </p>
      </div>

      <div className="bg-sky-50 border border-sky-100 rounded-lg p-4 mb-8 flex gap-3 text-sm text-sky-800">
        <Lightbulb className="flex-shrink-0 text-amber-400 fill-amber-400" size={20} />
        <div>
          <span className="font-semibold text-sky-900">Pro Tip:</span> A great cover letter has 3-4 paragraphs:
          an engaging opening, 1-2 body paragraphs highlighting your relevant experience, and a strong closing.
        </div>
      </div>

      <div className="space-y-2">
        {renderTextArea(
          'openingParagraph',
          'Opening Paragraph',
          'Start with a strong hook that mentions the specific position and company. Express your enthusiasm and briefly mention why you\'re a great fit...'
        )}

        {renderTextArea(
          'bodyParagraph1',
          'Body Paragraph 1 - Key Qualifications',
          'Highlight your most relevant experience and achievements. Use specific examples and quantifiable results when possible...'
        )}

        {renderTextArea(
          'bodyParagraph2',
          'Body Paragraph 2 - Additional Value',
          'Add more relevant skills, experiences, or explain why you\'re passionate about the company/industry...'
        )}

        {renderTextArea(
          'closingParagraph',
          'Closing Paragraph',
          'Summarize your main points, reiterate your interest, and include a call to action (e.g., requesting an interview)...'
        )}
      </div>
    </div>
  );
};

export default BodyContentForm;
