import { useState } from "react";
import { Trash2, EditIcon, Plus, Check } from "lucide-react";

const ExperienceForm = ({ formData, setFormData }) => {
  const [editingId, setEditingId] = useState(null);

  const addExperience = () => {
    const id = crypto.randomUUID();
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...(prev?.experience ?? []),
        {
          id,
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
    setEditingId(id);
  };

  const removeExperience = (id) => {
    setFormData((prev) => ({
      ...prev,
      experience: (prev?.experience ?? []).filter((e) => e.id !== id),
    }));
  };

  const updateExperience = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      experience: (prev?.experience ?? []).map((e) =>
        e.id === id ? { ...e, [field]: value } : e,
      ),
    }));
  };

  const formatMonthYear = (value) => {
    if (!value) return "";
    const [year, month] = value.split("-");
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${months[Number(month) - 1]} ${year}`;
  };

  return (
    <div className="flex flex-col gap-4">
      {(formData?.experience ?? []).map((exp, index) => (
        <div
          key={exp.id}
          className="shadow-sm border border-gray-300 rounded-lg p-2"
        >
          {/* ================= CARD MODE ================= */}
          {editingId !== exp.id && (
            <div className="rounded-lg p-3 flex flex-col justify-between items-center">
              {/* Header */}
              <div className="w-full flex justify-between items-center">
                <span className="font-medium">Experience {index + 1}</span>
                <div className="flex gap-4 items-center">
                  <button
                    className="hover:text-blue-600 transition-colors"
                    onClick={() => setEditingId(exp.id)}
                  >
                    <EditIcon size={18} />
                  </button>
                  <button
                    className="hover:text-red-600 transition-colors"
                    onClick={() => removeExperience(exp.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Preview */}
              <div className="w-full mt-2 text-left">
                <div className="flex justify-between items-center gap-4 flex-wrap">
                  <div className="text-md font-semibold break-all">
                    {exp.company || "—"}
                  </div>
                  {exp.startDate && exp.endDate && (
                    <span className="text-xs text-slate-500">
                      {formatMonthYear(exp.startDate)} –{" "}
                      {formatMonthYear(exp.endDate)}
                    </span>
                  )}
                </div>

                {exp.title && (
                  <div className="text-sm font-medium mt-1">{exp.title}</div>
                )}

                {exp.location && (
                  <div className="text-sm text-slate-600">{exp.location}</div>
                )}

                {exp.description && (
                  <p className="text-sm text-slate-500 mt-2 line-clamp-3">
                    {exp.description}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ================= EDIT MODE ================= */}
          {editingId === exp.id && (
            <>
              <div className="px-3 py-4">
                <div className="flex flex-col gap-2 mb-3">
                  <label>Job Title *</label>
                  <input
                    type="text"
                    className="px-2.5 py-2 border text-sm rounded focus:border-blue-500 focus:outline-none focus:shadow-sm"
                    placeholder="Software Engineer"
                    value={exp.title}
                    onChange={(e) =>
                      updateExperience(exp.id, "title", e.target.value)
                    }
                  />
                </div>

                <div className="flex flex-col gap-2 mb-3">
                  <label>Company *</label>
                  <input
                    type="text"
                    className="px-2.5 py-2 border text-sm rounded focus:border-blue-500 focus:outline-none focus:shadow-sm"
                    placeholder="Tech Company Inc."
                    value={exp.company}
                    onChange={(e) =>
                      updateExperience(exp.id, "company", e.target.value)
                    }
                  />
                </div>

                <div className="flex flex-col gap-2 mb-3">
                  <label>Location</label>
                  <input
                    type="text"
                    className="px-2.5 py-2 border text-sm rounded focus:border-blue-500 focus:outline-none focus:shadow-sm"
                    placeholder="City, Country"
                    value={exp.location}
                    onChange={(e) =>
                      updateExperience(exp.id, "location", e.target.value)
                    }
                  />
                </div>

                <div className="flex flex-col gap-2 mb-3">
                  <label>Start Date</label>
                  <input
                    type="month"
                    className="px-2.5 py-2 border text-sm rounded focus:border-blue-500 focus:outline-none focus:shadow-sm"
                    value={exp.startDate}
                    onChange={(e) =>
                      updateExperience(exp.id, "startDate", e.target.value)
                    }
                  />
                </div>

                <div className="flex flex-col gap-2 mb-3">
                  <label>End Date</label>
                  <input
                    type="month"
                    className="px-2.5 py-2 border text-sm rounded focus:border-blue-500 focus:outline-none focus:shadow-sm"
                    value={exp.endDate}
                    onChange={(e) =>
                      updateExperience(exp.id, "endDate", e.target.value)
                    }
                  />
                </div>

                <div className="flex flex-col gap-2 mb-3">
                  <label>Description</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your responsibilities and achievements..."
                    className="px-2.5 py-2 border text-sm resize-none rounded focus:border-blue-500 focus:outline-none focus:shadow-sm"
                    value={exp.description}
                    onChange={(e) =>
                      updateExperience(exp.id, "description", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end items-center gap-2 px-2 pb-4">
                <button
                  className="text-sm font-medium bg-red-500 py-2 px-4 rounded-lg text-white flex gap-2 items-center hover:bg-red-700"
                  onClick={() => removeExperience(exp.id)}
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
        onClick={addExperience}
        className="flex items-center gap-2 text-sm font-medium"
      >
        <Plus size={14} />
        Add Experience
      </button>
    </div>
  );
};

export default ExperienceForm;
