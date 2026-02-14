import express from "express";
import {
  uploadAndAnalyzeResume,
  getUserScans,
  getScanById,
  deleteScan,
  downloadResume,
  getScanStatistics,
  saveResume,
  getUserResume,
  getAllUserResumes,
  getResumeById,
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

// Save User Resume (Upsert)
resumeRouter.post("/save", isAuth, saveResume);

// Get User Resume
resumeRouter.get("/user-resume", isAuth, getUserResume);

// Get ALL User Resumes
resumeRouter.get("/all", isAuth, getAllUserResumes);

// Get Specific Resume
resumeRouter.get("/detail/:id", isAuth, getResumeById);

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