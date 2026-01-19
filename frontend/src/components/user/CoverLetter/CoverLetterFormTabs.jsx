import {
  User,
  Briefcase,
  FileText,
  Send
} from 'lucide-react';

const CoverLetterFormTabs = ({ activeSection, setActiveSection }) => {
  const formTabs = [
    { id: 'recipient', label: 'Personal', icon: User },
    { id: 'job', label: 'Job Details', icon: Briefcase },
    { id: 'body', label: 'Letter Body', icon: FileText },
    { id: 'closing', label: 'Closing', icon: Send }
  ];

  return (
    <div className="form-tabs">
      {formTabs.map((tab) => (
        <button
          key={tab.id}
          className={`form-tab ${activeSection === tab.id ? 'active' : ''}`}
          onClick={() => setActiveSection(tab.id)}
        >
          <tab.icon size={16} />
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default CoverLetterFormTabs;
