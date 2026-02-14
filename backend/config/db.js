import mongoose from "mongoose";
import dns from "dns";

const connectDB = async () => {
  try {
    // Force usage of Google Public DNS to resolve SRV records (fixes querySrv ECONNREFUSED)
    dns.setServers(["8.8.8.8", "8.8.4.4"]);

    // Support both environment variable names
    const mongoURL =
      process.env.MONGO_URI || process.env.MONGO_DB_URL;

    if (!mongoURL) {
      console.error("❌ MongoDB URL is missing in .env file");
      return;
    }

    await mongoose.connect(mongoURL);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);

    // Comment / uncomment based on your need
    // process.exit(1); // stop server if DB fails (production)

    console.log("⚠️ Server will continue without database connection");
  }
};

export default connectDB;
