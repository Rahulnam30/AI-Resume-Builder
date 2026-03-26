import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getAdminDashboardStats, getAnalyticsStats } from "../controllers/admin.controller.js";
const adminRouter = express.Router();

adminRouter.get("/dashboard-stat", isAuth, getAdminDashboardStats);
adminRouter.get("/analytics-stat", isAuth, getAnalyticsStats);


export default adminRouter;