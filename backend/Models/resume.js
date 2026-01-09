import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    templateId: {
      type: String,
      required: true,
    },

    data: {
      type: Object, // resume JSON data
      required: true,
    },
  },
  { timestamps: true } // ⭐ createdAt is IMPORTANT
);

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
