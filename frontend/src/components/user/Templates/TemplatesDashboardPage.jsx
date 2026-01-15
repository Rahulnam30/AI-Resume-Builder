
import { useMemo, useState, useEffect } from 'react';
import TemplateCard from './TemplateCard';
import './TemplatesDashboardPage.css';
import { Bell, HelpCircle } from "lucide-react";
import UserNavBar from '../UserNavBar/UserNavBar'; // adjust path if needed
import axios from 'axios';

const TemplatesDashboardPage = () => {
  const [search, setSearch] = useState('');
  const [fetchedTemplates, setFetchedTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/template?status=approved');
        // API returns an array directly. Map it to the expected structure.
        const rawData = response.data || [];
        const mappedData = rawData.map(item => ({
          id: item._id,
          name: item.name,
          // Normalize category: remove " Templates" suffix if present and lowercase, or just match exactly in filters later.
          // For now, let's keep the original category string but handle it in the filter.
          category: item.category,
          file: item.fileUrl,
          img: item.imageUrl,
          description: item.description
        }));
        setFetchedTemplates(mappedData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching templates:", err);
        setError("Failed to load templates.");
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  // Merge dynamic + static templates (Static removed as requested)
  // If props passed templates, we could merge them, but for now we rely on fetched data.
  const allTemplates = fetchedTemplates;

  const filteredTemplates = useMemo(() => {
    return allTemplates.filter(t =>
      t.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [allTemplates, search]);

  const modern = filteredTemplates.filter(t => t.category === 'modern' || t.category === 'Modern Templates');
  const creative = filteredTemplates.filter(t => t.category === 'creative' || t.category === 'Creative Templates');
  const professional = filteredTemplates.filter(t => t.category === 'professional' || t.category === 'Professional Templates');

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


  if (loading) {
    return <div className="templates-dashboard"><div className="loading">Loading templates...</div></div>;
  }

  if (error) {
    return <div className="templates-dashboard"><div className="error">{error}</div></div>;
  }

  return (
    <div className="templates-dashboard">
      {/* ✅ Navbar */}
      <UserNavBar onMenuClick={() => console.log("Toggle sidebar")} />

      {/* CONTENT BELOW NAVBAR */}
      <div style={{ marginTop: "80px" }}> {/* ensures content is below fixed navbar */}
        <div className="filter-row">
          {/* Kept my search implementation but inside the HEAD's layout if possible, or merged */}
          <div className="filter-input">
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M21 21l-4.35-4.35m1.85-5.4a7.25 7.25 0 11-14.5 0 7.25 7.25 0 0114.5 0z" />
            </svg>
            <input
              placeholder="Search Templates Accordingly..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
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
    </div>
  );
};

export default TemplatesDashboardPage;
