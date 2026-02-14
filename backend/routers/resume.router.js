import express from "express";
const router = express.Router();

import {
  saveResume,
  generateAIResume,
  enhanceWorkExperience,
  enhanceProjectDescription,
  generateResume
} from "../controllers/Resume.controller.js";

router.post("/save", saveResume);
router.post("/generate-summary", generateAIResume);
router.post("/enhance-work-experience", enhanceWorkExperience);
router.post("/enhance-project-description", enhanceProjectDescription);
router.post("/generate-pdf", generateResume);

export default router;
