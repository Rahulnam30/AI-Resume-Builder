import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    previewimage: {
      type: String,
      required: true, // Path to the thumbnail image
    },
    filePath: {
      type: String,
      required: true, // Path to the source DOCX file
    },
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
    category: {
      type: String,
      default: "Modern", // Default category
    },
  },
  { timestamps: true }
);

const Template = mongoose.model("Template", templateSchema);
export default Template;
