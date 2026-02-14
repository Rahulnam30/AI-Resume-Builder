import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    /* ================= USER ASSOCIATION ================= */
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    title: { type: String, default: "My Resume" },
    templateId: { type: String, default: "jessica-claire" },

    /* ================= PERSONAL INFO ================= */
    fullName: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    website: { type: String, default: "" },
    summary: { type: String, default: "" },

    /* ================= SECTIONS ================= */
    education: [
      {
        id: Number,
        school: String,
        degree: String,
        gpa: String,
        startDate: String,
        graduationDate: String,
        location: String,
      },
    ],

    experience: [
      {
        id: Number,
        title: String,
        company: String,
        description: String,
        startDate: String,
        endDate: String,
        location: String,
      },
    ],

    projects: [
      {
        id: Number,
        name: String,
        description: String,
        technologies: String,
        link: {
          github: String,
          liveLink: String,
          other: String,
        },
      },
    ],

    skills: {
      technical: [String],
      soft: [String],
    },

    certifications: [
      {
        id: Number,
        name: String,
        issuer: String,
        date: String,
        link: String,
      },
    ],

    // Fallback for any other data
    data: { type: Object },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;
