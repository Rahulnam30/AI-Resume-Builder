import express from "express";
import {
  
  getAdminDashboardStats,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

// Example routes

userRouter.get("/dashboard-stat", getAdminDashboardStats);

export default userRouter;
