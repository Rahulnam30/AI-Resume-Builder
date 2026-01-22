import mongoose from "mongoose";

const atsScansSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Optional link to a saved resume document
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
    },

    // Optional link to a resume profile (structured data)
    resumeProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ResumeProfile",
    },

    // Associated template (if any)
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
    },

    // File metadata (if upload was provided)
    filename: {
      type: String,
    },
    originalName: {
      type: String,
    },
    filePath: {
      type: String,
    },
    fileSize: {
      type: Number,
    },
    fileType: {
      type: String,
    },

    jobTitle: {
      type: String,
    },
    jobDescription: {
      type: String,
    },

    overallScore: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
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
        status: {
          type: String,
          enum: ["ok", "warn", "error"],
          default: "ok",
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

    suggestions: [String],

    extractedText: {
      type: String,
    },

    extractedData: {
      email: String,
      phone: String,
      name: String,
      skills: [String],
      experience: [String],
      education: [String],
    },

    passThreshold: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Indexes to make common queries faster
atsScansSchema.index({ userId: 1, createdAt: -1 });
atsScansSchema.index({ overallScore: -1 });

const AtsScans = mongoose.model("AtsScans", atsScansSchema);
export default AtsScans;