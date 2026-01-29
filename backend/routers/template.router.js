import express from "express";
import { uploadTemplate, getTemplates, approveTemplate, deleteTemplate, getTemplateHtml, getTemplateById, updateTemplate } from "../controllers/template.controller.js";
import upload from "../middlewares/upload.js";
// import { isAuth, isAdmin } from "../middlewares/auth.js"; // Assuming you have auth middleware

const router = express.Router();

// Define routes
// Note: Add auth middleware as needed. For now, I'm keeping it open or assuming global auth usage if provided.

router.get("/parse/:id", getTemplateHtml);
router.get("/", getTemplates);
router.post("/upload", upload.fields([{ name: 'templateFile', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), uploadTemplate);
router.put("/approve/:id", approveTemplate);
router.get("/:id", getTemplateById);
router.put("/:id", upload.fields([{ name: 'templateFile', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), updateTemplate);
router.delete("/:id", deleteTemplate);

export default router;
