import { Check } from 'lucide-react';

const CoverLetterTemplates = ({ selectedTemplate, onSelectTemplate }) => {
  const templates = [
    {
      id: 'professional',
      name: 'Professional',
      description: 'Clean and traditional design perfect for corporate positions',
      preview: '📄',
      color: '#2563eb'
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Contemporary layout with a fresh, creative touch',
      preview: '✨',
      color: '#8b5cf6'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and elegant with focus on content',
      preview: '⚪',
      color: '#374151'
    },
    {
      id: 'executive',
      name: 'Executive',
      description: 'Sophisticated design for senior-level positions',
      preview: '👔',
      color: '#0f172a'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold and distinctive for creative industries',
      preview: '🎨',
      color: '#ec4899'
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Timeless design that works for any industry',
      preview: '📝',
      color: '#059669'
    }
  ];

  return (
    <div className="cover-letter-templates">
      <div className="templates-header">
        <h2>Choose a Template</h2>
        <p>Select a professional template that matches your style and industry</p>
      </div>

      <div className="templates-grid">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
            onClick={() => onSelectTemplate(template.id)}
            style={{ '--template-color': template.color }}
          >
            <div className="template-preview">
              <span className="template-icon">{template.preview}</span>
              {selectedTemplate === template.id && (
                <div className="selected-badge">
                  <Check size={16} />
                </div>
              )}
            </div>
            <div className="template-info">
              <h3>{template.name}</h3>
              <p>{template.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="template-tips">
        <h4>💡 Choosing the Right Template</h4>
        <ul>
          <li><strong>Corporate/Finance:</strong> Use Professional or Executive</li>
          <li><strong>Tech/Startup:</strong> Modern or Minimal work great</li>
          <li><strong>Design/Marketing:</strong> Try Creative for visual impact</li>
          <li><strong>Traditional Industries:</strong> Classic or Professional</li>
        </ul>
      </div>
    </div>
  );
};

export default CoverLetterTemplates;
