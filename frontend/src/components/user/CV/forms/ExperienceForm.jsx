import { Trash2 } from "lucide-react";

const ExperienceForm = ({ formData, setFormData }) => {
  const addExperience = () => {
    console.log(formData);
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...(prev?.experience ?? []),
        {
          id: Date.now(),
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
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
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      ),
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[15px] font-semibold text-[#1a1a2e] mb-3 leading-[1.2]">Work Experience</h3>
      {(formData?.experience ?? []).map((exp, index) => (
        <div key={exp.id} className="">
          <div className="flex items-center gap-2 mb-2">
            <span>Experience {index + 1}</span>
            {formData.experience.length > 1 && (
              <button onClick={() => removeExperience(exp.id)}>
                <Trash2 size={14} />
              </button>
            )}
          </div>
          <div className="pr-0.5">
            <div className="flex flex-col gap-[6px] mb-[10px] mt-2">
              <label>Job Title *</label>
              <input
                type="text"
                placeholder="Software Engineer"
                value={exp.title || ""}
                className="px-2.5 py-2 border text-sm rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]"
                data-required="true"
                onChange={(e) =>
                  updateExperience(exp.id, "title", e.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-[6px] mb-[10px] mt-2">
              <label>Company *</label>
              <input
                type="text"
                placeholder="Tech Company Inc."
                value={exp.company || ""}
                className="px-2.5 py-2 border text-sm rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]"
                data-required="true"
                onChange={(e) =>
                  updateExperience(exp.id, "company", e.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-[6px] mb-[10px] mt-2">
              <label>Start Date</label>
              <input
                type="month"
                value={exp.startDate || ""}
                className="px-2.5 py-2 border text-sm rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]"
                onChange={(e) =>
                  updateExperience(exp.id, "startDate", e.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-[6px] mb-[10px] mt-2">
              <label>End Date</label>
              <input
                type="text"
                placeholder="Present or YYYY-MM"
                value={exp.endDate || ""}
                className="px-2.5 py-2 border text-sm rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]"
                onChange={(e) =>
                  updateExperience(exp.id, "endDate", e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-[6px] mb-[10px] mt-2 full-width">
            <label>Description</label>
            <textarea
              placeholder="Describe your responsibilities and achievements..."
              rows={3}
              value={exp.description || ""}
              className="h-40 px-2.5 py-2 border text-sm resize-none rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]"
              onChange={(e) =>
                updateExperience(exp.id, "description", e.target.value)
              }
            />
          </div>
        </div>
      ))}
      <button className="text-left" onClick={addExperience}>
        + Add Experience
      </button>
    </div>
  );
};

export default ExperienceForm;