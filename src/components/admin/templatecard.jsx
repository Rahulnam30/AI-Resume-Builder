// import React from "react";
// import "./templatecard.css";

// export default function TemplateCard({ template, onDelete }) {
//   const handlePreview = () => {
//     window.open(template.fileUrl, "_blank");
//   };

//   const handleEdit = () => {
//     alert(`Edit clicked for: ${template.name}`);
//   };

//   // ✅ REAL DELETE
//   const handleDelete = () => {
//     onDelete(template.id);
//   };

//   return (
//     <div className="template-card">
//       {/* PDF PREVIEW */}
//       <div className="template-preview">
//         <iframe
//           src={template.fileUrl}
//           title={template.name}
//           frameBorder="0"
//         />
//       </div>

//       <p className="uses">{template.uses} Uses</p>

//       <div className="template-actions">
//         <button onClick={handlePreview}>Preview</button>
//         <button onClick={handleEdit}>Edit</button>
//         <button className="delete" onClick={handleDelete}>
//           🗑
//         </button>
//       </div>
//     </div>
//   );
// }




// import React from "react";
// import "./templatecard.css";

// export default function TemplateCard({ template, onDelete }) {
//   const handlePreview = () => {
//     window.open(template.fileUrl, "_blank");
//   };

//   const handleEdit = () => {
//     alert(`Edit clicked for: ${template.name}`);
//   };

//   const handleDelete = () => {
//     if (window.confirm("Are you sure you want to delete this template?")) {
//       onDelete(template.id);
//     }
//   };

//   return (
//     <div className="template-card">
//       {/* PDF Preview */}
//       <div className="template-preview">
//         <iframe
//           src={template.fileUrl}
//           title={template.name}
//         />
//       </div>

//       <p className="uses">{template.uses} Uses</p>

//       <div className="template-actions">
//         <button onClick={handlePreview}>Preview</button>
//         <button onClick={handleEdit}>Edit</button>
//         <button className="delete" onClick={handleDelete}>🗑</button>
//       </div>
//     </div>
//   );
// }






// import React from "react";
// import "./templatecard.css";

// export default function TemplateCard({ template, onDelete }) {
//   const handlePreview = () => {
//     window.open(template.fileUrl, "_blank");
//   };

//   const handleEdit = () => {
//     alert(`Edit clicked for: ${template.name}`);
//   };

//   const handleDelete = () => {
//     if (window.confirm("Are you sure you want to delete this template?")) {
//       onDelete(template.id);
//     }
//   };

//   return (
//     <div className="template-card">
//       {/* PDF PREVIEW */}
//       <div className="template-preview">
//         <iframe
//           src={template.fileUrl}
//           title={template.name}
//           frameBorder="0"
//         />
//       </div>

//       <p className="uses">{template.uses} Uses</p>

//       <div className="template-actions">
//         <button onClick={handlePreview}>Preview</button>
//         <button onClick={handleEdit}>Edit</button>
//         <button className="delete" onClick={handleDelete}>🗑</button>
//       </div>
//     </div>
//   );
// }




// const handleDelete = () => {
//   const existing =
//     JSON.parse(localStorage.getItem("resumeTemplates")) || [];

//   const updated = existing.filter((t) => t.id !== template.id);

//   localStorage.setItem("resumeTemplates", JSON.stringify(updated));

//   window.location.reload(); // simple refresh
// };




// import React from "react";
// import "./templatecard.css";

// export default function TemplateCard({ template, setTemplates }) {
//   const handlePreview = () => {
//     window.open(template.fileUrl, "_blank");
//   };

//   const handleEdit = () => {
//     alert(`Edit clicked for: ${template.name}`);
//   };

//   const handleDelete = () => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this template?"
//     );

//     if (!confirmDelete) return;

//     const existing =
//       JSON.parse(localStorage.getItem("resumeTemplates")) || [];

//     const updated = existing.filter((t) => t.id !== template.id);

//     localStorage.setItem("resumeTemplates", JSON.stringify(updated));

//     // ✅ Update UI instantly
//     setTemplates(updated);
//   };

//   return (
//     <div className="template-card">
//       {/* PDF Preview */}
//       <div className="template-preview">
//         <iframe
//           src={template.fileUrl}
//           title={template.name}
//           frameBorder="0"
//         />
//       </div>

//       <p className="uses">{template.uses} Uses</p>

//       <div className="template-actions">
//         <button onClick={handlePreview}>Preview</button>
//         <button onClick={handleEdit}>Edit</button>
//         <button className="delete" onClick={handleDelete}>
//           🗑
//         </button>
//       </div>
//     </div>
//   );
// }





// import React from "react";
// import "./templatecard.css";

// export default function TemplateCard({ template, onDelete }) {
//   const handlePreview = () => {
//     window.open(template.fileUrl, "_blank");
//   };

//   const handleEdit = () => {
//     alert(`Edit clicked for: ${template.name}`);
//   };

//   return (
//     <div className="template-card">
//       {/* PDF Preview */}
//       <div className="template-preview">
//         <iframe
//           src={template.fileUrl}
//           title={template.name}
//           frameBorder="0"
//         />
//       </div>

//       <p className="uses">{template.uses} Uses</p>

//       <div className="template-actions">
//         <button onClick={handlePreview}>Preview</button>
//         <button onClick={handleEdit}>Edit</button>
//         <button
//           className="delete"
//           onClick={() => onDelete(template.id)}
//         >
//           🗑
//         </button>
//       </div>
//     </div>
//   );
// }







// import React from "react";
// import "./templatecard.css";

// export default function TemplateCard({ template, onDelete }) {
//   const handlePreview = () => {
//     window.open(template.fileUrl, "_blank");
//   };

//   const handleEdit = () => {
//     alert(`Edit clicked for: ${template.name}`);
//   };

//   const isPdf = template.fileUrl.toLowerCase().endsWith(".pdf");

//   return (
//     <div className="template-card">
//       {/* Template Preview */}
//       <div className="template-preview">
//         {isPdf ? (
//           <iframe
//             src={template.fileUrl}
//             title={template.name}
//             frameBorder="0"
//           />
//         ) : (
//           <div className="word-preview">
//             <img
//               src="/word-icon.png"
//               alt="Word File"
//               className="word-icon"
//             />
//             <p>{template.name}</p>
//           </div>
//         )}
//       </div>

//       <p className="uses">{template.uses} Uses</p>

//       <div className="template-actions">
//         <button onClick={handlePreview}>Preview</button>
//         <button onClick={handleEdit}>Edit</button>
//         <button
//           className="delete"
//           onClick={() => onDelete(template.id)}
//         >
//           🗑
//         </button>
//       </div>
//     </div>
//   );
// }




// import React from "react";
// import "./templatecard.css";
// import WordIcon from "../../assets/word-icon.png"; // ✅ IMPORTANT

// export default function TemplateCard({ template, onDelete }) {
//   const handlePreview = () => {
//     window.open(template.fileUrl, "_blank");
//   };

//   const handleEdit = () => {
//     alert(`Edit clicked for: ${template.name}`);
//   };

//   const isPdf = template.fileUrl.toLowerCase().endsWith(".pdf");

//   return (
//     <div className="template-card">
//       {/* Template Preview */}
//       <div className="template-preview">
//         {isPdf ? (
//           <iframe
//             src={template.fileUrl}
//             title={template.name}
//             frameBorder="0"
//           />
//         ) : (
//           <div className="word-preview">
//             <img
//               src={WordIcon}
//               alt="Word File"
//               className="word-icon"
//             />
//             <p>{template.name}</p>
//           </div>
//         )}
//       </div>

//       <p className="uses">{template.uses} Uses</p>

//       <div className="template-actions">
//         <button onClick={handlePreview}>Preview</button>
//         <button onClick={handleEdit}>Edit</button>
//         <button
//           className="delete"
//           onClick={() => onDelete(template.id)}
//         >
//           🗑
//         </button>
//       </div>
//     </div>
//   );
// }




import React from "react";
import "./templatecard.css";
import WordIcon from "../../assets/word-icon.png";
 // ✅ FIXED PATH

export default function TemplateCard({ template, onDelete }) {
  const handlePreview = () => {
    window.open(template.fileUrl, "_blank");
  };

  const handleEdit = () => {
    alert(`Edit clicked for: ${template.name}`);
  };

  const isPdf = template.fileUrl.toLowerCase().endsWith(".pdf");

  return (
    <div className="template-card">
      <div className="template-preview">
        {isPdf ? (
          <iframe src={template.fileUrl} title={template.name} />
        ) : (
          <div className="word-preview">
            <img src={WordIcon} alt="Word File" className="word-icon" />
            <p>{template.name}</p>
          </div>
        )}
      </div>

      <p className="uses">{template.uses} Uses</p>

      <div className="template-actions">
        <button onClick={handlePreview}>Preview</button>
        <button onClick={handleEdit}>Edit</button>
        <button className="delete" onClick={() => onDelete(template.id)}>
          🗑
        </button>
      </div>
    </div>
  );
}
