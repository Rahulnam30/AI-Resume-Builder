import express from "express";
import {
  uploadAndAnalyzeResume,
  getUserScans,
  getScanById,
  deleteScan,
  downloadResume,
  getScanStatistics,
  getLatestScan,
  generateAIResume,
  enhanceWorkExperience,
  enhanceProjectDescription,
  generateAICoverLetter
} from "../controllers/Resume.controller.js";
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

// Get latest scan after refreshing the page
resumeRouter.get("/latest", isAuth, getLatestScan);

//To generate professional summary
resumeRouter.post("/generate-summary", isAuth, generateAIResume);

//To enhance the work experience with the help of ai
resumeRouter.post("/enhance-work-experience", isAuth, enhanceWorkExperience);

//To enhance the project description with the help of ai
resumeRouter.post("/enhance-project-description", isAuth, enhanceProjectDescription);

//TO generate cover letter professional summary
resumeRouter.post("/cover-letter/generate", isAuth, generateAICoverLetter);


export default resumeRouter;
