import express from "express";
import {
  uploadAndAnalyzeResume,
  getUserScans,
  getScanById,
  deleteScan,
  downloadResume,
  getScanStatistics,
}
from "../controllers/Resume.controller.js";
import isAuth from "../middlewares/isAuth.js";
import {
  uploadSingleResume,
  handleUploadError,
} from "../middlewares/upload.middleware.js";

const resumeRouter = express.Router();

// Upload and analyze resume
resumeRouter.post(
  "/upload",
  isAuth,
  uploadSingleResume,
  handleUploadError,
  uploadAndAnalyzeResume
);

// Get all user scans
resumeRouter.get("/scans", isAuth, getUserScans);

// Get scan statistics
resumeRouter.get("/statistics", isAuth, getScanStatistics);

// Get specific scan by ID
resumeRouter.get("/scans/:id", isAuth, getScanById);

// Delete scan
resumeRouter.delete("/scans/:id", isAuth, deleteScan);

// Download resume file
resumeRouter.get("/download/:filename", isAuth, downloadResume);

export default resumeRouter;