import {
  User,
  Briefcase,
  FileText,
  Send
} from 'lucide-react';
import { useRef } from 'react';

const tabs = [
  { id: 'recipient', label: 'Recipient', icon: User },
  { id: 'job', label: 'Job Details', icon: Briefcase },
  { id: 'body', label: 'Content', icon: FileText },
  { id: 'closing', label: 'Closing', icon: Send }
];

const CoverLetterFormTabs = ({ activeSection, setActiveSection }) => {
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
            <div className="">step {currentIdx + 1} of step 4</div>
            {/* Progress Bar */}
            <div className="w-28 h-2 bg-slate-200 rounded-lg">
              <div
                className="h-full bg-blue-400 rounded-lg transition-all duration-200"
                style={{ width: `${(currentIdx + 1) * 25}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterFormTabs;
