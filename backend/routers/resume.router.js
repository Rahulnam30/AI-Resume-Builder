import express from "express";
const router = express.Router();

import {
  saveResume,
  generateAIResume,
  enhanceWorkExperience,
  enhanceProjectDescription,
  generateResume,
  generateAICoverLetter
} from "../controllers/Resume.controller.js";

import isAuth from "../middlewares/isAuth.js";

router.post("/save", isAuth, saveResume);
router.post("/generate-summary", isAuth, generateAIResume);
router.post("/enhance-work-experience", isAuth, enhanceWorkExperience);
router.post("/enhance-project-description", isAuth, enhanceProjectDescription);
router.post("/generate-pdf", isAuth, generateResume);
router.post("/cover-letter/generate", isAuth, generateAICoverLetter);

export default router;
