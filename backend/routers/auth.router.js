import express from "express";

import {
  forgotPassword,
  login,
  register,
} from "../controllers/auth.controllers.js";

const authRouter = express.Router();

// Example routes

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/forgot-password", forgotPassword);

export default authRouter;
