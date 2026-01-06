import mongoose from "mongoose";
import User from "./User";
import Template from "./template";
import ResumeProfile from "./resumeProfile";

const atsScansSchema = new mongoose.Schema(
  {
    userId: User.id,
    resumeprofileId: ResumeProfile.id,
    templateId: Template.id,
    jobTitle: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    overallScore: {
      type: Number,
      required: true,
    },
    sectionScores: [
      {
        sectionName: {
          type: String,
          required: true,
        },
        score: {
          type: Number,
          required: true,
        },
      },
    ],
    matchedKeywords: [
      {
        keyword: {
          type: String,
          required: true,
        },
      },
    ],
    missingKeywords: [
      {
        keyword: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps }
);

const AtsScans = mongoose.model("AtsScans", atsScansSchema);
export default AtsScans;
