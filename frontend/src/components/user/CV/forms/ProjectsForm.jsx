import { Trash2 } from "lucide-react";

const ProjectsForm = ({ formData, setFormData }) => {
  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [
        ...(prev?.projects ?? []),
        {
          id: Date.now(),
          name: "",
          description: "",
          technologies: "",
          link: {
            github: "",
            liveLink: "",
            other: "",
          },
        },
      ],
    }));
  };

  const removeProject = (id) => {
    setFormData((prev) => ({
      ...prev,
      projects: (prev?.projects ?? []).filter((p) => p.id !== id),
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="text-xl text-[#1a1a2e] mb-3 leading-[1.2]">
        Projects
      </span>
      {(formData?.projects ?? []).map((project, index) => (
        <div key={project.id}>
          <div className="flex items-center gap-2">
            <span>Project {index + 1}</span>
            {formData.projects.length > 1 && (
              <button onClick={() => removeProject(project.id)}>
                <Trash2 size={14} />
              </button>
            )}
          </div>
          <div className="mt-4">
            <div className="flex flex-col gap-[6px] mb-[10px] mt-2">
              <label>Project Name *</label>
              <input
                type="text"
                placeholder="E-commerce Platform"
                value={project.name || ""}
                className="px-2.5 py-2 border text-sm rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]"
                data-required="true"
                onChange={(e) => {
                  const val = e.target.value;
                  const updated = (formData?.projects ?? []).map((item) =>
                    item.id === project.id ? { ...item, name: val } : item,
                  );
                  setFormData((prev) => ({ ...prev, projects: updated }));
                }}
              />
            </div>
            <div className="flex flex-col gap-[6px] mb-[10px] mt-2">
              <label>Technologies Used</label>
              <input
                type="text"
                placeholder="React, Node.js, MongoDB"
                value={project.technologies || ""}
                className="px-2.5 py-2 border text-sm rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]"
                onChange={(e) => {
                  const val = e.target.value;
                  const updated = (formData?.projects ?? []).map((item) =>
                    item.id === project.id
                      ? { ...item, technologies: val }
                      : item,
                  );
                  setFormData((prev) => ({ ...prev, projects: updated }));
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[6px] mb-[10px] mt-2 full-width">
            <label>Description</label>
            <textarea
              placeholder="Describe the project and your contributions..."
              rows={3}
              value={project.description || ""}
              className="px-2.5 py-2 border text-sm rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]"
              onChange={(e) => {
                const val = e.target.value;
                const updated = (formData?.projects ?? []).map((item) =>
                  item.id === project.id ? { ...item, description: val } : item,
                );
                setFormData((prev) => ({ ...prev, projects: updated }));
              }}
            />
          </div>
          <div className="flex flex-col gap-[6px] mb-[10px] mt-2 full-width">
            <label>Github Link (Optional)</label>
            <input
              type="text"
              placeholder="https://github.com/username/project"
              value={project?.link?.github || ""}
              className="px-2.5 py-2 border text-sm rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]"
              onChange={(e) => {
                const val = e.target.value;
                const updated = (formData?.projects ?? []).map((item) =>
                  item.id === project.id
                    ? { ...item, link: { ...item.link, github: val } }
                    : item,
                );
                setFormData((prev) => ({ ...prev, projects: updated }));
              }}
            />
          </div>
          <div className="flex flex-col gap-[6px] mb-[10px] mt-2 full-width">
            <label>Live Link (Optional)</label>
            <input
              type="text"
              placeholder="https://www.yourwebsite.com"
              value={project?.link?.liveLink || ""}
              className="px-2.5 py-2 border text-sm rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]"
              onChange={(e) => {
                const val = e.target.value;
                const updated = (formData?.projects ?? []).map((item) =>
                  item.id === project.id
                    ? { ...item, link: { ...item.link, liveLink: val } }
                    : item,
                );
                setFormData((prev) => ({ ...prev, projects: updated }));
              }}
            />
          </div>
          <div className="flex flex-col gap-[6px] mb-[10px] mt-2 full-width">
            <label>Other Links (Optional)</label>
            <input
              type="text"
              placeholder="https://www.linkedin.com/feed/update/"
              value={project?.link?.other || ""}
              className="px-2.5 py-2 border text-sm rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]"
              onChange={(e) => {
                const val = e.target.value;
                const updated = (formData?.projects ?? []).map((item) =>
                  item.id === project.id
                    ? { ...item, link: { ...item.link, other: val } }
                    : item,
                );
                setFormData((prev) => ({ ...prev, projects: updated }));
              }}
            />
          </div>
        </div>
      ))}
      <button className="text-left" onClick={addProject}>
        + Add Project
      </button>
    </div>
  );
};

export default ProjectsForm;