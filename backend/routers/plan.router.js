import express from "express";
import {
  getAllPlans,
  getPlanById,
  updateAllPlans,
  updatePlan,
  initializePlans,
} from "../controllers/plan.controller.js";
import isAuth from "../middlewares/isAuth.js";

const planRouter = express.Router();

// Public route - anyone can view plans
planRouter.get("/", getAllPlans);
planRouter.get("/:id", getPlanById);

// Admin only routes - protected by isAuth middleware
planRouter.put("/", isAuth, updateAllPlans); // Update all plans at once
planRouter.put("/:id", isAuth, updatePlan); // Update single plan
planRouter.post("/initialize", isAuth, initializePlans); // Initialize default plans

export default planRouter;