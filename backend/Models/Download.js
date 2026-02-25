
import mongoose from "mongoose";


const downloadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["resume", "cover-letter", "cv"], required: true },
  format: { type: String, default: "PDF" },
  size: { type: String, default: "250 KB" },
  views: { type: Number, default: 0 },
  downloadDate: { type: Date, default: Date.now },
  content: mongoose.Schema.Types.Mixed,
  template: { type: String, default: "professional" }
}, { timestamps: true });


export default mongoose.model("Download", downloadSchema);
