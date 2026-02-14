import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import notificationRoutes from "./routers/notification.router.js";

// Routers
import authRouter from "./routers/auth.router.js";
import userRouter from "./routers/user.router.js";
import templateRouter from "./routers/template.router.js";
import resumeRouter from "./routers/resume.router.js";
import templateVisibilityRouter from "./routers/templateVisibility.router.js";
import planRouter from "./routers/plan.router.js";

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
      if (!origin || origin.startsWith("http://localhost")) return callback(null, true);
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
app.use("/api/notifications", notificationRoutes);
app.use("/api/resume", resumeRouter);
app.use("/api/template-visibility", templateVisibilityRouter);
app.use("/api/plans", planRouter);

// Serve uploads directory (for images/resumes)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Error handling middleware (add before listen)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// 🚨 FIX: Connect DB BEFORE starting server, not inside listen callback
const startServer = async () => {
  try {
    await connectDB(); // Wait for DB connection
    app.listen(port, () => {
      console.log(`✅ Server Running at http://localhost:${port}`);
      console.log(`✅ Database Connected`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to database:", error);
    process.exit(1);
  }
};

startServer();
