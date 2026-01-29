import { Trash2 } from "lucide-react";

const EducationForm = ({ formData, setFormData }) => {
  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...(prev?.education ?? []),
        {
          id: Date.now(),
          school: "",
          degree: "",
          gpa: "",
          startDate: "",
          graduationDate: "",
          location: "",
        },
      ],
    }));
  };

  const removeEducation = (id) => {
    setFormData((prev) => ({
      ...prev,
      education: (prev?.education ?? []).filter((e) => e.id !== id),
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      {(formData?.education ?? []).map((edu, index) => (
        <div key={edu.id} className="">
          <div className="flex items-center gap-2">
            <span>Education {index + 1}</span>
            {formData.education.length > 1 && (
              <button onClick={() => removeEducation(edu.id)}>
                <Trash2 size={14} />
              </button>
            )}
          </div>
          <div className="p-0.5">
            <div className="flex flex-col gap-[6px] mb-[10px] mt-2">
              <label>Degree *</label>
              <input
                type="text"
                placeholder="Bachelor of Science in Computer Science"
                value={edu.degree || ""}
                className="px-2.5 py-2 border text-sm rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]"
                onChange={(e) => {
                  const val = e.target.value;
                  const updated = (formData?.education ?? []).map((item) =>
                    item.id === edu.id ? { ...item, degree: val } : item,
                  );
                  setFormData((prev) => ({ ...prev, education: updated }));
                }}
              />
            </div>
            <div className="flex flex-col gap-[6px] mb-[10px]">
              <label>School *</label>
              <input
                type="text"
                placeholder="University Name"
                value={edu.school || ""}
                className="px-2.5 py-2 border text-sm rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]"
                onChange={(e) => {
                  const val = e.target.value;
                  const updated = (formData?.education ?? []).map((item) =>
                    item.id === edu.id ? { ...item, school: val } : item,
                  );
                  setFormData((prev) => ({ ...prev, education: updated }));
                }}
              />
            </div>
            <div className="flex flex-col gap-[6px] mb-[10px]">
              <label>Start Date</label>
              <input
                type="month"
                value={edu.startDate || ""}
                className="px-2.5 py-2 border text-sm rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]"
                onChange={(e) => {
                  const val = e.target.value;
                  const updated = (formData?.education ?? []).map((item) =>
                    item.id === edu.id ? { ...item, startDate: val } : item,
                  );
                  setFormData((prev) => ({ ...prev, education: updated }));
                }}
              />
            </div>
            <div className="flex flex-col gap-[6px] mb-[10px]">
              <label>Graduation Date</label>
              <input
                type="month"
                value={edu.graduationDate || ""}
                className="px-2.5 py-2 border text-sm rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]"
                onChange={(e) => {
                  const val = e.target.value;
                  const updated = (formData?.education ?? []).map((item) =>
                    item.id === edu.id
                      ? { ...item, graduationDate: val }
                      : item,
                  );
                  setFormData((prev) => ({ ...prev, education: updated }));
                }}
              />
            </div>
            <div className="flex flex-col gap-[6px] mb-[10px]">
              <label>GPA (Optional)</label>
              <input
                type="text"
                placeholder="7.8/10.0"
                value={edu.gpa || ""}
                className="px-2.5 py-2 border text-sm rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]"
                onChange={(e) => {
                  const val = e.target.value;
                  const updated = (formData?.education ?? []).map((item) =>
                    item.id === edu.id ? { ...item, gpa: val } : item,
                  );
                  setFormData((prev) => ({ ...prev, education: updated }));
                }}
              />
            </div>
          </div>
        </div>
      ))}
      <button className="text-left" onClick={addEducation}>
        + Add Education
      </button>
    </div>
  );
};

export default EducationForm;
