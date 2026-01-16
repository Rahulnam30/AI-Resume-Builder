import { useMemo, useState } from 'react';
import TemplateCard from './TemplateCard';
import './TemplatesDashboardPage.css';
import { Bell, HelpCircle } from "lucide-react";
import UserNavBar from '../UserNavBar/UserNavBar'; // adjust path if needed

const TemplatesDashboardPage = ({ templates = [] }) => {
  const [search] = useState('');

  const staticTemplates = [
    { id: 101, name: "Modern Resume Sample 1", category: "modern", file: "/sample-resumes/modern1.pdf", img: "/sample-resumes/modern1.jpg" },
    { id: 102, name: "Modern Resume Sample 2", category: "modern", file: "/sample-resumes/modern2.pdf", img: "/sample-resumes/modern2.jpg" },
    { id: 103, name: "Creative Resume Sample 1", category: "creative", file: "/sample-resumes/creative1.pdf", img: "/sample-resumes/creative1.jpg" },
    { id: 104, name: "Professional Resume Sample 1", category: "professional", file: "/sample-resumes/professional1.pdf", img: "/sample-resumes/professional1.jpg" },
    { id: 105, name: "Creative Resume Sample 2", category: "creative", file: "/sample-resumes/creative2.pdf", img: "/sample-resumes/creative2.jpg" },
    { id: 106, name: "Professional Resume Sample 2", category: "professional", file: "/sample-resumes/professional2.pdf", img: "/sample-resumes/professional2.jpg" },
  ];

  const allTemplates = [...templates, ...staticTemplates];

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
    <div className="templates-dashboard-page user-page">
      {/* ✅ Navbar */}
      <UserNavBar onMenuClick={() => console.log("Toggle sidebar")} />

      {/* CONTENT BELOW NAVBAR */}
      <div style={{ marginTop: "80px", padding: "1rem" }}> {/* ensures content is below fixed navbar */}
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
    </div>
  );
};

export default TemplatesDashboardPage;
