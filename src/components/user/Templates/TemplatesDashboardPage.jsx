import { useMemo, useState } from 'react';
import TemplateCard from './TemplateCard';
import './TemplatesDashboardPage.css';
import { Bell, HelpCircle } from "lucide-react";

const TemplatesDashboardPage = ({ templates = [] }) => {
  const [search] = useState('');

  // ----- Add static sample templates for demo -----
 const staticTemplates = [
  {
    id: 101,
    name: "Modern Resume Sample 1",
    category: "modern",
    file: "/sample-resumes/modern1.pdf", // download link
    img: "/sample-resumes/modern1.jpg"   // preview image
  },
  {
    id: 102,
    name: "Modern Resume Sample 2",
    category: "modern",
    file: "/sample-resumes/modern2.pdf",
    img: "/sample-resumes/modern2.jpg"
  },
  {
    id: 103,
    name: "Creative Resume Sample 1",
    category: "creative",
    file: "/sample-resumes/creative1.pdf",
    img: "/sample-resumes/creative1.jpg"
  },
  {
    id: 104,
    name: "Professional Resume Sample 1",
    category: "professional",
    file: "/sample-resumes/professional1.pdf",
    img: "/sample-resumes/professional1.jpg"
  },

   {
    id: 104,
    name: "Professional Resume Sample 1",
    category: "creative",
    file: "/sample-resumes/creative2.pdf",
    img: "/sample-resumes/creative2.jpg"
  },
   {
    id: 104,
    name: "Professional Resume Sample 1",
    category: "professional",
    file: "/sample-resumes/professional2.pdf",
    img: "/sample-resumes/professional2.jpg"
  },

];



  // Merge dynamic + static templates
  const allTemplates = [...templates, ...staticTemplates];

  // ----- Filtered templates based on search -----
  const filteredTemplates = useMemo(() => {
    return allTemplates.filter(t =>
      t.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [allTemplates, search]);

  const modern = filteredTemplates.filter(t => t.category === 'modern');
  const creative = filteredTemplates.filter(t => t.category === 'creative');
  const professional = filteredTemplates.filter(t => t.category === 'professional');

  const renderSection = (title, items, count) => (
    <section className="template-section">
      <div className="section-header">
        <h3>{title}</h3>
        <button className="view-all">View All ({count})</button>
      </div>

      <div className="templates-grid">
        {items.slice(0, 4).map(t => (
          <TemplateCard key={t.id} template={t} />
        ))}
      </div>
    </section>
  );

  return (
    <div className="templates-dashboard">

      {/* TOP BAR */}
      <div className="top-bar"></div>
      <div className="filter-row">
        <div className="filter-input">
          <svg className="icon" viewBox="0 0 24 24">
            <path d="M21 21l-4.35-4.35m1.85-5.4a7.25 7.25 0 11-14.5 0 7.25 7.25 0 0114.5 0z" />
          </svg>
          <input placeholder="Search Templates Accordingly..." />
        </div>

        <div className="top-icons">
          <button className="icon-btn" aria-label="Notifications">
            <Bell className="icon-svg" />
            <span className="notification-dot" />
          </button>

          <button className="icon-btn" aria-label="Help">
            <HelpCircle className="icon-svg" />
          </button>
        </div>
      </div>

      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1>Resume Templates</h1>
          <p>Manage and organize all available resume templates.</p>
        </div>

        <div className="header-actions">
          <button className="upload-btn">+ Upload New Template</button>
          <button className="filter-btn">Filter by Role: All</button>
        </div>
      </div>

      {/* SECTIONS */}
      {renderSection('Modern Templates', modern, modern.length)}
      {renderSection('Creative Templates', creative, creative.length)}
      {renderSection('Professional Templates', professional, professional.length)}

    </div>
  );
};

export default TemplatesDashboardPage;
