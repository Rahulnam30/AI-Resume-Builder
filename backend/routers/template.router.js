import express from "express";
import { uploadTemplate, getTemplates, approveTemplate, deleteTemplate } from "../controllers/template.controller.js";
import upload from "../middlewares/upload.js";
// import { isAuth, isAdmin } from "../middlewares/auth.js"; // Assuming you have auth middleware

const router = express.Router();

// Define routes
// Note: Add auth middleware as needed. For now, I'm keeping it open or assuming global auth usage if provided.

router.post("/upload", upload.fields([{ name: 'templateFile', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), uploadTemplate);
router.get("/", getTemplates);
router.put("/approve/:id", approveTemplate);
router.delete("/:id", deleteTemplate);

export default router;
