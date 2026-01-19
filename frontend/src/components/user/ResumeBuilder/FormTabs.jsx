import {
  User,
  Briefcase,
  GraduationCap,
  Zap,
  FolderKanban,
  Award
} from 'lucide-react';

/* ===== ICONS ===== */
const ChevronLeft = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
    <path
      d="M15 19l-7-7 7-7"
      stroke="#374151"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRight = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
    <path
      d="M9 5l7 7-7 7"
      stroke="#374151"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ===== TABS (SINGLE SOURCE OF TRUTH) ===== */
const tabs = [
  { id: 'personal', label: 'Personal' },
  { id: 'work', label: 'Work' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certs', label: 'Certifications' },
];

export default function FormTabs({ activeSection, setActiveSection }) {
  const tabsRef = useRef(null);

  const currentIdx = tabs.findIndex(tab => tab.id === activeSection);

  /* ===== SCROLL HANDLER ===== */
  const scrollTabs = (direction) => {
    if (!tabsRef.current) return;
    tabsRef.current.scrollLeft += direction === 'left' ? -120 : 120;
  };

  /* ===== ARROW NAVIGATION ===== */
  const goLeft = () => {
    if (currentIdx > 0) {
      setActiveSection(tabs[currentIdx - 1].id);
      scrollTabs('left');
    }
  };

  const goRight = () => {
    if (currentIdx < tabs.length - 1) {
      setActiveSection(tabs[currentIdx + 1].id);
      scrollTabs('right');
    }
  };

  return (
    <div className="form-tabs-container">
      {/* LEFT ARROW */}
      <button
        className="tab-arrow"
        onClick={goLeft}
        disabled={currentIdx === 0}
        aria-label="Previous section"
      >
        <ChevronLeft />
      </button>

      {/* TABS */}
      <div className="form-tabs-scrollbar-wrapper no-scrollbar">
        <div className="form-tabs-scrollbar" ref={tabsRef}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`form-tab ${activeSection === tab.id ? 'active' : ''}`}
              onClick={() => setActiveSection(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT ARROW */}
      <button
        className="tab-arrow"
        onClick={goRight}
        disabled={currentIdx === tabs.length - 1}
        aria-label="Next section"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
