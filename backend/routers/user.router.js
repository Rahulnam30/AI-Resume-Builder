import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  getDashboardData,
  getAllUsers,
  updateUser,
  deleteUser,
  getAdminDashboardStats,
  getAnalyticsStats,
  getUserName
} from "../controllers/user.controller.js";

const userRouter = express.Router();

// ---- User Routes ----
userRouter.get("/dashboard", isAuth, getDashboardData);
userRouter.get("/profile/:id", isAuth, getUserName);

// ---- Admin Routes ----
userRouter.get("/", isAuth, getAllUsers);
userRouter.put("/:id", isAuth, updateUser);
userRouter.delete("/:id", isAuth, deleteUser);
userRouter.get("/dashboard-stat", getAdminDashboardStats);
userRouter.get("/analytics-stat", getAnalyticsStats);

export default userRouter;