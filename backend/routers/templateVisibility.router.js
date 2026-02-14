import express from "express";
import { getVisibilityStatuses, toggleVisibility } from "../controllers/templateVisibility.controller.js";
// import { isAuth, isAdmin } from "../middlewares/auth.js"; // TODO: Add auth middleware

const router = express.Router();

router.get("/", getVisibilityStatuses);
router.post("/toggle", toggleVisibility);

export default router;
