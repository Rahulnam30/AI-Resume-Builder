import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import authRouter from "./routers/auth.router.js";
import cookieParser from "cookie-parser";
import userRouter from "./routers/user.router.js";
import connectDB from "./config/db.js";

const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:3000",
        process.env.FRONTEND_URL,
      ];
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1 || origin.startsWith("http://localhost:")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  connectDB();
  console.log(`Server Running at ${port}`);
});
