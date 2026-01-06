import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    previewimage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Template = mongoose.model("Template", templateSchema);
export default Template;
