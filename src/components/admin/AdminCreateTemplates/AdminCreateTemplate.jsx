// import React from 'react'

// const AdminCreateTemplate = () => {
//   return (
//     <div>AdminCreateTemplate</div>
//   )
// }

// export default AdminCreateTemplate



// import React from "react";

// const AdminCreateTemplate = () => {
//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file || file.type !== "application/pdf") {
//       alert("Please upload a PDF file");
//       return;
//     }

//     const existing = JSON.parse(localStorage.getItem("templates")) || [];

//     const newTemplate = {
//       id: Date.now(),
//       name: file.name.replace(".pdf", ""),
//       uses: 0,
//       fileUrl: URL.createObjectURL(file),
//     };

//     localStorage.setItem(
//       "templates",
//       JSON.stringify([...existing, newTemplate])
//     );

//     alert("Template uploaded successfully!");
//   };

//   return (
//     <div style={{ padding: "30px" }}>
//       <h2>Create Resume Template</h2>

//       <input
//         type="file"
//         accept="application/pdf"
//         onChange={handleUpload}
//       />
//     </div>
//   );
// };

// export default AdminCreateTemplate;





// 





// import React, { useState } from "react";

// const AdminCreateTemplate = () => {
//   const [success, setSuccess] = useState(false);

//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const newTemplate = {
//       id: Date.now(),
//       name: file.name.replace(".pdf", ""),
//       uses: 0,
//       fileUrl: URL.createObjectURL(file),
//     };

//     // 🔑 SAVE TO LOCAL STORAGE
//     const existing =
//       JSON.parse(localStorage.getItem("resumeTemplates")) || [];

//     localStorage.setItem(
//       "resumeTemplates",
//       JSON.stringify([...existing, newTemplate])
//     );

//     setSuccess(true);
//   };

//   return (
//     <div>
//       <h2>Create Resume Template</h2>

//       <input type="file" accept="application/pdf" onChange={handleUpload} />

//       {success && <p style={{ color: "green" }}>Template uploaded successfully</p>}
//     </div>
//   );
// };

// export default AdminCreateTemplate;



// import React, { useState } from "react";
// import "./AdminCreateTemplate.css";

// export default function AdminCreateTemplate() {
//   const [file, setFile] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const handleFileChange = (e) => {
//     const selected = e.target.files[0];
//     if (!selected) return;

//     if (selected.type !== "application/pdf") {
//       alert("Only PDF files are allowed");
//       return;
//     }

//     setFile(selected);
//     setSuccess(false);
//   };

//   const handleUpload = () => {
//     if (!file) {
//       alert("Please select a PDF first");
//       return;
//     }

//     const newTemplate = {
//       id: Date.now(),
//       name: file.name.replace(".pdf", ""),
//       uses: 0,
//       fileUrl: URL.createObjectURL(file),
//     };

//     const existing =
//       JSON.parse(localStorage.getItem("resumeTemplates")) || [];

//     localStorage.setItem(
//       "resumeTemplates",
//       JSON.stringify([...existing, newTemplate])
//     );

//     setSuccess(true);
//     setFile(null);
//   };

//   return (
//     <div className="create-template-page">
//       <h2>Create Resume Template</h2>
//       <p className="subtitle">
//         Upload a PDF resume layout that users can select while building resumes.
//       </p>

//       <div className="upload-card">
//         <label className="upload-box">
//           <span>{file ? file.name : "Click to choose PDF"}</span>
//           <input
//             type="file"
//             accept="application/pdf"
//             hidden
//             onChange={handleFileChange}
//           />
//         </label>

//         <button className="upload-btn" onClick={handleUpload}>
//           Upload Template
//         </button>

//         {success && (
//           <p className="success-msg">✅ Template uploaded successfully</p>
//         )}
//       </div>
//     </div>
//   );
// }




import React, { useState } from "react";
import "./AdminCreateTemplate.css";

export default function AdminCreateTemplate() {
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    const allowedTypes = [
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selected.type)) {
      alert("Only Word files (.doc, .docx) are allowed");
      e.target.value = "";
      return;
    }

    setFile(selected);
    setSuccess(false);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select a Word file first");
      return;
    }

    const newTemplate = {
      id: Date.now(),
      name: file.name.replace(/\.(doc|docx)$/i, ""),
      uses: 0,
      fileUrl: URL.createObjectURL(file),
    };

    const existing =
      JSON.parse(localStorage.getItem("resumeTemplates")) || [];

    localStorage.setItem(
      "resumeTemplates",
      JSON.stringify([...existing, newTemplate])
    );

    setSuccess(true);
    setFile(null);
  };

  return (
    <div className="create-template-page">
      <h2>Create Resume Template</h2>
      <p className="subtitle">
        Upload a Word resume template that users can select while building resumes.
      </p>

      <div className="upload-card">
        <label className="upload-box">
          <span>{file ? file.name : "Click to choose Word file (.doc / .docx)"}</span>
          <input
            type="file"
            accept=".doc,.docx"
            hidden
            onChange={handleFileChange}
          />
        </label>

        <button className="upload-btn" onClick={handleUpload}>
          Upload Template
        </button>

        {success && (
          <p className="success-msg">✅ Template uploaded successfully</p>
        )}
      </div>
    </div>
  );
}
