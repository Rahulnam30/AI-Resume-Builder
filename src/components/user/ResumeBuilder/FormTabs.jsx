import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Zap, 
  FolderKanban, 
  Award 
} from 'lucide-react';

const FormTabs = ({ activeSection, setActiveSection }) => {
  const formTabs = [
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'work', label: 'Work', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Zap },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'certs', label: 'Certs', icon: Award }
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

export default FormTabs;