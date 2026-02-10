import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";


// Routers
import authRouter from "./routers/auth.router.js";
import userRouter from "./routers/user.router.js";
import templateRouter from "./routers/template.router.js";
import resumeRouter from "./routers/resume.router.js";

// Config
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Path setup for static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());

// Allow CORS from local dev frontends
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (origin.startsWith("http://localhost")) return callback(null, true);
      const clientUrl = process.env.CLIENT_URL;
      if (clientUrl && origin === clientUrl) return callback(null, true);
      return callback(new Error(`CORS policy: origin ${origin} not allowed`));
    },
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/template", templateRouter);
app.use("/api/resume", resumeRouter);

// Serve uploads directory (for images/resumes)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  connectDB();
  console.log(`Server Running at ${port}`);
});