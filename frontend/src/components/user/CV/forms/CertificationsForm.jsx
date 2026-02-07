import { Trash2 } from "lucide-react";

const CertificationsForm = ({ formData, setFormData }) => {
  const addCertification = () => {
    setFormData((prev) => ({
      ...prev,
      certifications: [
        ...(prev?.certifications ?? []),
        {
          id: Date.now(),
          name: "",
          issuer: "",
          date: "",
          link: "",
        },
      ],
    }));
  };

  const removeCertification = (id) => {
    setFormData((prev) => ({
      ...prev,
      certifications: (prev?.certifications ?? []).filter((c) => c.id !== id),
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      {(formData?.certifications ?? []).map((cert, index) => (
        <div key={cert.id} className="mt-5">
          <div className="flex items-center gap-2">
            <span className="mr-2">Certification {index + 1}</span>
            {formData.certifications.length > 1 && (
              <button onClick={() => removeCertification(cert.id)}>
                <Trash2 size={14} />
              </button>
            )}
          </div>
          <div className="mt-4">
            <div className="flex flex-col gap-[6px] mb-[10px] mt-2">
              <label>Certification Name *</label>
              <input
                type="text"
                placeholder="AWS Solutions Architect"
                value={cert.name || ""}
                className="px-2.5 py-2 border text-sm rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]"
                data-required="true"
                onChange={(e) => {
                  const val = e.target.value;
                  const updated = (formData?.certifications ?? []).map(
                    (item) =>
                      item.id === cert.id ? { ...item, name: val } : item,
                  );
                  setFormData((prev) => ({ ...prev, certifications: updated }));
                }}
              />
            </div>
            <div className="flex flex-col gap-[6px] mb-[10px] mt-2">
              <label>Issuing Organization</label>
              <input
                type="text"
                placeholder="Amazon Web Services"
                value={cert.issuer || ""}
                className="px-2.5 py-2 border text-sm rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]"
                onChange={(e) => {
                  const val = e.target.value;
                  const updated = (formData?.certifications ?? []).map(
                    (item) =>
                      item.id === cert.id ? { ...item, issuer: val } : item,
                  );
                  setFormData((prev) => ({ ...prev, certifications: updated }));
                }}
              />
            </div>
            <div className="flex flex-col gap-[6px] mb-[10px] mt-2">
              <label>Date Obtained</label>
              <input
                type="month"
                value={cert.date || ""}
                className="px-2.5 py-2 border text-sm rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]"
                onChange={(e) => {
                  const val = e.target.value;
                  const updated = (formData?.certifications ?? []).map(
                    (item) =>
                      item.id === cert.id ? { ...item, date: val } : item,
                  );
                  setFormData((prev) => ({ ...prev, certifications: updated }));
                }}
              />
            </div>
            <div className="flex flex-col gap-[6px] mb-[10px] mt-2">
              <label>Credential Link (Optional)</label>
              <input
                type="text"
                placeholder="https://credential.url"
                value={cert.link || ""}
                className="px-2.5 py-2 border text-sm rounded border-1.5 focus:border-[#007bff] focus:outline-none focus:bg-white focus:shadow-[0_2px_8px_rgba(0,123,255,0.07)]"
                onChange={(e) => {
                  const val = e.target.value;
                  const updated = (formData?.certifications ?? []).map(
                    (item) =>
                      item.id === cert.id ? { ...item, link: val } : item,
                  );
                  setFormData((prev) => ({ ...prev, certifications: updated }));
                }}
              />
            </div>
          </div>
        </div>
      ))}
      <button className="text-left" onClick={addCertification}>
        + Add Certification
      </button>
    </div>
  );
};

export default CertificationsForm;