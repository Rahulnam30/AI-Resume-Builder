import { useRef } from "react";

export default function ATSUpload({ onUpload }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    onUpload(file); 
  };

  return (
    <div>
      


      <input
        type="file"
        ref={fileInputRef}
        hidden
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
      />


      <button
  type="button"
  onClick={() => fileInputRef.current.click()}
  className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg w-full"
>
Upload Resume
</button>

    </div>
  );
}
