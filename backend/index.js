import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connetDB from "./config/db.js";
import cors from "cors";
import authRouter from "./routers/auth.router.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.listen(port, () => {
  connetDB();
  console.log(`Server Running at ${port}`);
});
