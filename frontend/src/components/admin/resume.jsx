// import React, { useState } from "react";
// import TemplateCard from "./templatecard";
// import "./resume.css";

// export default function Resume() {
//   const [templates, setTemplates] = useState([]);

//   // ADD TEMPLATE (already working)
//   const handleAddTemplate = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const newTemplate = {
//       id: Date.now(),
//       name: file.name.replace(".pdf", ""),
//       uses: 0,
//       fileUrl: URL.createObjectURL(file),
//     };

//     setTemplates((prev) => [...prev, newTemplate]);
//   };

//   // ✅ DELETE TEMPLATE (NEW)
//   const handleDeleteTemplate = (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this template?"
//     );
//     if (!confirmDelete) return;

//     setTemplates((prev) => prev.filter((t) => t.id !== id));
//   };

//   return (
//     <div className="resume-page">
//       {/* HEADER */}
//       <div className="resume-header">
//         <h2>Resume Templates</h2>

//         <label className="add-btn">
//           + Add New Template
//           <input
//             type="file"
//             accept="application/pdf"
//             hidden
//             onChange={handleAddTemplate}
//           />
//         </label>
//       </div>

//       {/* TEMPLATE GRID */}
//       <div className="template-grid">
//         {templates.map((template) => (
//           <TemplateCard
//             key={template.id}
//             template={template}
//             onDelete={handleDeleteTemplate} // ✅ PASS DELETE
//           />
//         ))}
//       </div>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import TemplateCard from "./templatecard";
// import "./resume.css";

// export default function Resume() {
//   const [templates, setTemplates] = useState([]);

//   // Load templates
//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("templates")) || [];
//     setTemplates(stored);
//   }, []);

//   // Delete template
//   const handleDelete = (id) => {
//     const updated = templates.filter((t) => t.id !== id);
//     setTemplates(updated);
//     localStorage.setItem("templates", JSON.stringify(updated));
//   };

//   return (
//     <div className="resume-page">
//       <div className="resume-header">
//         <h2>Resume Templates</h2>
//       </div>

//       <div className="template-grid">
//         {templates.map((template) => (
//           <TemplateCard
//             key={template.id}
//             template={template}
//             onDelete={handleDelete}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import TemplateCard from "./templatecard";
// import "./resume.css";

// export default function Resume() {
//   const [templates, setTemplates] = useState([]);

//   // ✅ LOAD templates from localStorage on page load
//   useEffect(() => {
//     const storedTemplates =
//       JSON.parse(localStorage.getItem("templates")) || [];
//     setTemplates(storedTemplates);
//   }, []);

//   // ✅ DELETE template
//   const handleDelete = (id) => {
//     const updated = templates.filter((t) => t.id !== id);
//     setTemplates(updated);
//     localStorage.setItem("templates", JSON.stringify(updated));
//   };

//   return (
//     <div className="resume-page">
//       {/* HEADER */}
//       <div className="resume-header">
//         <h2>Resume Templates</h2>
//       </div>

//       {/* TEMPLATE GRID */}
//       <div className="template-grid">
//         {templates.length === 0 ? (
//           <p style={{ color: "#888" }}>No templates uploaded yet.</p>
//         ) : (
//           templates.map((template) => (
//             <TemplateCard
//               key={template.id}
//               template={template}
//               onDelete={handleDelete}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }





// import React, { useEffect, useState } from "react";
// import TemplateCard from "./templatecard";
// import "./resume.css";

// export default function Resume() {
//   const [templates, setTemplates] = useState([]);

//   // 🔑 LOAD TEMPLATES WHEN PAGE OPENS
//   useEffect(() => {
//     const saved =
//       JSON.parse(localStorage.getItem("resumeTemplates")) || [];
//     setTemplates(saved);
//   }, []);

//   return (
//     <div className="resume-page">
//       <div className="resume-header">
//         <h2>Resume Templates</h2>
//       </div>

//       <div className="template-grid">
//         {templates.length === 0 ? (
//           <p>No templates uploaded yet</p>
//         ) : (
//           templates.map((template) => (
//             <TemplateCard key={template.id} template={template} />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import TemplateCard from "./templatecard";
import "./resume.css";

export default function Resume() {
  const [templates, setTemplates] = useState([]);

  // 🔥 LOAD templates from localStorage
  useEffect(() => {
    const storedTemplates =
      JSON.parse(localStorage.getItem("resumeTemplates")) || [];
    setTemplates(storedTemplates);
  }, []);

  // 🔥 DELETE template
  const handleDelete = (id) => {
    const updated = templates.filter((t) => t.id !== id);
    setTemplates(updated);
    localStorage.setItem("resumeTemplates", JSON.stringify(updated));
  };

  return (
    <div className="resume-page">
      <div className="resume-header">
        <h2>Resume Templates</h2>
      </div>

      <div className="template-grid">
        {templates.length === 0 ? (
          <p style={{ color: "#888" }}>No templates uploaded yet</p>
        ) : (
          templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
