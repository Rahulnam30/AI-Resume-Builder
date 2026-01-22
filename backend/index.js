import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Config
import connectDB from "./config/db.js";

// Routers
import authRouter from "./routers/auth.router.js";
import userRouter from "./routers/user.router.js";
import templateRouter from "./routers/template.router.js";
import resumeRouter from "./routers/resume.router.js";
import planRouter from "./routers/plan.router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ================= Middleware ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, mobile apps)
      if (!origin) return callback(null, true);
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:3000",
        process.env.FRONTEND_URL,
        process.env.CLIENT_URL,
      ].filter(Boolean);

      if (allowedOrigins.includes(origin) || origin.startsWith("http://localhost:")) {
        return callback(null, true);
      }

      return callback(new Error(`CORS policy: origin ${origin} not allowed`));
    },
    credentials: true,
  })
);
    /* ================= Routes ================= */
    app.use("/api/auth", authRouter);
    app.use("/api/users", userRouter);
    app.use("/api/template", templateRouter);
    app.use("/api/resumes", resumeRouter);
    app.use("/api/plans", planRouter);

    // Serve uploads directory
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    app.use("/uploads", express.static(path.join(__dirname, "uploads")));

    /* ================= Health Check ================= */
    app.get("/", (req, res) => {
      res.json({ message: "ATS Resume Builder API is running 🚀" });
    });

    /* ================= Error Handler ================= */
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({
        success: false,
        message: err.message || "Something went wrong",
      });
    });

    /* ================= Start Server ================= */
    const startServer = async () => {
      try {
        await connectDB();
        app.listen(PORT, () => {
          console.log(`Server Running at ${PORT}`);
        });
      } catch (error) {
        console.error("Server failed to start:", error.message);
        process.exit(1);
      }
    };

    startServer();

    export default app;
