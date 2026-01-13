import express from "express";
import {
  getAllUsers,
  updateUser,
  deleteUser,
  getAdminDashboardStats,
} from "../controllers/user.controller.js";
import isAuth from "../middlewares/isAuth.js";

const userRouter = express.Router();

userRouter.get("/", isAuth, getAllUsers);
userRouter.put("/:id", isAuth, updateUser);
userRouter.delete("/:id", isAuth, deleteUser);
userRouter.get("/dashboard-stat", getAdminDashboardStats);

export default userRouter;
