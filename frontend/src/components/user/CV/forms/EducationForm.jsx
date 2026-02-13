import { useState } from "react";
import { Trash2, EditIcon, Check, Plus } from "lucide-react";

const EducationForm = ({ formData, setFormData }) => {
  const [editingId, setEditingId] = useState(null);

  const addEducation = () => {
    const id = crypto.randomUUID();

    setFormData((prev) => ({
      ...prev,
      education: [
        ...(prev.education ?? []),
        {
          id,
          school: "",
          degree: "",
          location: "",
          graduationDate: "",
          gpa: "",
        },
      ],
    }));

    setEditingId(id);
  };

  const removeEducation = (id) => {
    setFormData((prev) => ({
      ...prev,
      education: (prev.education ?? []).filter((e) => e.id !== id),
    }));
  };

  const handleChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      education: (prev.education ?? []).map((e) =>
        e.id === id ? { ...e, [field]: value } : e,
      ),
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      {(formData.education ?? []).map((edu, index) => (
        <div
          key={edu.id}
          className="shadow-sm border border-gray-300 rounded-lg p-2"
        >
          {/* ================= CARD MODE ================= */}
          {editingId !== edu.id && (
            <div className="rounded-lg p-3 flex flex-col justify-between items-center">
              {/* Header */}
              <div className="w-full flex justify-between items-center">
                <span className="font-medium">Education {index + 1}</span>

                <div className="flex gap-4 items-center">
                  <button
                    className="hover:text-blue-600 transition-colors"
                    onClick={() => setEditingId(edu.id)}
                  >
                    <EditIcon size={18} />
                  </button>

                  <button
                    className="hover:text-red-600 transition-colors"
                    onClick={() => removeEducation(edu.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Preview Content */}
              <div className="w-full mt-2 text-left">
                <div className="text-md font-semibold break-all">
                  {edu.school || "—"}
                </div>

                {edu.degree && (
                  <div className="text-sm font-medium">{edu.degree}</div>
                )}

                {edu.location && (
                  <div className="text-sm text-slate-600">{edu.location}</div>
                )}

                <div className="w-full py-1 flex justify-between items-center">
                  {edu.gpa && (
                    <span className="text-xs text-slate-500">
                      GPA: {edu.gpa}
                    </span>
                  )}

                  {edu.graduationDate && (
                    <span className="text-xs text-slate-500">
                      {edu.graduationDate}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================= EDIT MODE ================= */}
          {editingId === edu.id && (
            <>
              <div className="px-3 py-4">
                <div className="flex flex-col gap-2 mb-3">
                  <label>School / University *</label>
                  <input
                    type="text"
                    className="px-2.5 py-2 border text-sm rounded focus:border-blue-500 focus:outline-none focus:shadow-sm"
                    placeholder="University Name"
                    value={edu.school}
                    onChange={(e) =>
                      handleChange(edu.id, "school", e.target.value)
                    }
                  />
                </div>

                <div className="flex flex-col gap-2 mb-3">
                  <label>Degree *</label>
                  <input
                    type="text"
                    className="px-2.5 py-2 border text-sm rounded focus:border-blue-500 focus:outline-none focus:shadow-sm"
                    placeholder="Bachelor of Science"
                    value={edu.degree}
                    onChange={(e) =>
                      handleChange(edu.id, "degree", e.target.value)
                    }
                  />
                </div>

                <div className="flex flex-col gap-2 mb-3">
                  <label>Location</label>
                  <input
                    type="text"
                    className="px-2.5 py-2 border text-sm rounded focus:border-blue-500 focus:outline-none focus:shadow-sm"
                    placeholder="City, Country"
                    value={edu.location}
                    onChange={(e) =>
                      handleChange(edu.id, "location", e.target.value)
                    }
                  />
                </div>

                <div className="flex flex-col gap-2 mb-3">
                  <label>Graduation Date</label>
                  <input
                    type="month"
                    className="px-2.5 py-2 border text-sm rounded focus:border-blue-500 focus:outline-none focus:shadow-sm"
                    value={edu.graduationDate}
                    onChange={(e) =>
                      handleChange(edu.id, "graduationDate", e.target.value)
                    }
                  />
                </div>

                <div className="flex flex-col gap-2 mb-3">
                  <label>GPA (Optional)</label>
                  <input
                    type="text"
                    className="px-2.5 py-2 border text-sm rounded focus:border-blue-500 focus:outline-none focus:shadow-sm"
                    placeholder="3.8/4.0"
                    value={edu.gpa}
                    onChange={(e) =>
                      handleChange(edu.id, "gpa", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end items-center gap-2 px-2 pb-4">
                <button
                  className="text-sm font-medium bg-red-500 py-2 px-4 rounded-lg text-white flex gap-2 items-center hover:bg-red-700"
                  onClick={() => removeEducation(edu.id)}
                >
                  <Trash2 size={18} />
                  Delete
                </button>

                <button
                  className="text-sm font-medium bg-black py-2 px-4 rounded-lg text-white flex gap-2 items-center hover:bg-black/70"
                  onClick={() => setEditingId(null)}
                >
                  <Check size={18} />
                  Done
                </button>
              </div>
            </>
          )}
        </div>
      ))}

      {/* Add Button */}
      <button
        onClick={addEducation}
        className="flex items-center gap-2 text-sm font-medium"
      >
        <Plus size={14} />
        Add Education
      </button>
    </div>
  );
};

export default EducationForm;
