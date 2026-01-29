import upload from "../config/multer.config.js";

// Middleware to handle single file upload
export const uploadSingleResume = upload.single("resume");

// Error handling middleware for multer errors
export const handleUploadError = (err, req, res, next) => {
  if (err instanceof Error) {
    if (err.message.includes("File too large")) {
      return res.status(400).json({
        success: false,
        message: "File size exceeds 5MB limit",
      });
    }

    if (err.message.includes("Invalid file type")) {
      return res.status(400).json({
        success: false,
        message: "Invalid file type. Only PDF and DOCX files are allowed.",
      });
    }

    return res.status(400).json({
      success: false,
      message: err.message || "File upload failed",
    });
  }

  next();
};