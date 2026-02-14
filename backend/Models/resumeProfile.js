import mongoose from "mongoose";

const resumeProfileSchema = new mongoose.Schema(
  {
   
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    headline: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    experience: [
      {
        companyname: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          required: true,
        },
        startdate: {
          type: Date,
          required: true,
        },
        enddate: {
          type: Date,
          required: true,
        },
        location: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    education: [
      {
        degree: {
          type: String,
          required: true,
        },
        startdate: {
          type: Date,
          required: true,
        },
        enddate: {
          type: Date,
          required: true,
        },
        location: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    skills: [
      {
        skill: {
          type: String,
          required: true,
        },
      },
    ],
    projects: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        techstack: {
          type: String,
          required: true,
        },
        link: {
          type: String,
          required: true,
        },
        startdate: {
          type: Date,
          required: true,
        },
        enddate: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const ResumeProfile = mongoose.model("ResumeProfile", resumeProfileSchema);
export default ResumeProfile;