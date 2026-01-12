import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getDashboardData } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/dashboard", isAuth, getDashboardData);

export default userRouter;
