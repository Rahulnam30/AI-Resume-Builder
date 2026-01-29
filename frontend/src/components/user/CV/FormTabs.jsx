import {
  User,
  Briefcase,
  GraduationCap,
  Zap,
  FolderKanban,
  Award
} from 'lucide-react';
import { useRef } from "react";


  const tabs = [
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'work', label: 'Work', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Zap },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'certifications', label: 'Certifications', icon: Award }
  ];

  export default function FormTabs({ activeSection, setActiveSection }) {
    const tabsRef = useRef(null);
    const currentIdx = tabs.findIndex((tab) => tab.id === activeSection);
    return (
      <div className="flex items-center justify-center bg-white rounded-xl px-3 py-2">
        {/* TABS */}
        <div className="flex-1 overflow-hidden">
          <div
            ref={tabsRef}
            className="flex justify-between gap-2 overflow-x-auto scroll-smooth no-scrollbar"
          >
            {tabs.map(({ id, label, icon: Icon }) => {
              const active = activeSection === id;
              return (
                active && (
                  <div
                    key={id}
                    onClick={() => setActiveSection(id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all text-black select-none"
                  >
                    <Icon size={16} />
                    {label}
                  </div>
                )
              );
            })}
            {/* step progress */}
            <div className="flex flex-col gap-2 items-center text-xs flex-wrap">
              {/* Steps */}
              <div className="">step {currentIdx + 1} of step 6</div>
              {/* Progress Bar */}
              <div className="w-28 h-2 bg-slate-200 rounded-lg">
                <div
                  className="h-full bg-blue-400 rounded-lg transition-all duration-200"
                  style={{ width: `${(currentIdx + 1) * 16.67}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  

//   return (
//     <div className="form-tabs">
//       {formTabs.map((tab) => (
//         <button
//           key={tab.id}
//           className={`form-tab ${activeSection === tab.id ? 'active' : ''}`}
//           onClick={() => setActiveSection(tab.id)}
//         >
//           <tab.icon size={16} />
//           <span>{tab.label}</span>
//         </button>
//       ))}
//     </div>
//   );
// };

// export default FormTabs;

