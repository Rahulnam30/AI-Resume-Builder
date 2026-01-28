  // ResumeBuilder/completion.js

export const getCompletionStatus = (formData) => {
  const missing = [];

  /* ---------- PERSONAL INFO ---------- */
  if (
    !formData?.fullname?.trim() ||
    !formData?.email?.trim() ||
    !formData?.phone?.trim()
  ) {
    missing.push("Personal Info");
  }

  /* ---------- EXPERIENCE ---------- */
  const hasValidExperience =
    Array.isArray(formData?.experience) &&
    formData.experience.some(
      (exp) => exp.title?.trim() && exp.company?.trim()
    );

  /* ---------- EDUCATION ---------- */
  const hasValidEducation =
    Array.isArray(formData?.education) &&
    formData.education.some(
      (edu) => edu.school?.trim() && edu.degree?.trim()
    );

  if (!hasValidExperience && !hasValidEducation) {
    missing.push("Experience / Education");
  }

  /* ---------- SKILLS ---------- */
  const hasSkills =
    Array.isArray(formData?.skills?.technical) &&
    formData.skills.technical.length > 0;

  if (!hasSkills) {
    missing.push("Skills");
  }

  return {
    isComplete: missing.length === 0,
    missingSections: missing,
  };
};
