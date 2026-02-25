import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// lazy import User to avoid circular requires at module load
const getUserModel = async () => {
  const mod = await import("../Models/User.js");
  return mod.default || mod.User || mod.User;
};

const isAuth = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    // If cookie is just stringified null/undefined, treat it as missing to allow fallback
    if (token === "null" || token === "undefined") {
      token = null;
    }

    // Fallback to Authorization header
    if (!token && req.headers.authorization) {
      if (req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
      } else {
        token = req.headers.authorization;
      }
    }

    // Sanity check for stringified null/undefined
    if (!token || token === "null" || token === "undefined") {
      return res.status(401).json({ message: "No authentication token found" });
    }

    let verifyToken;
    try {
      verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (jwtError) {
      console.error("JWT Verify Error:", jwtError.message);
      return res.status(401).json({
        message: jwtError.name === "TokenExpiredError" ? "Session expired" : "Invalid token"
      });
    }

    if (!verifyToken || !verifyToken.id) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    let tokenId = verifyToken.id;

    // If tokenId is not a valid ObjectId (e.g., legacy 'admin-id'), try to map it to a real admin user id
    if (!mongoose.Types.ObjectId.isValid(tokenId)) {
      try {
        const User = await getUserModel();
        const admin = await User.findOne({ isAdmin: true });
        if (admin) {
          tokenId = admin._id;
        } else {
          return res.status(401).json({ message: "Admin user not found" });
        }
      } catch (e) {
        console.warn('isAuth: failed to map token id to admin user', e.message);
        return res.status(401).json({ message: "Authentication mapping failed" });
      }
    }

    req.userId = tokenId;
    next();
  } catch (error) {
    console.error("isAuth unexpected error:", error);
    return res.status(500).json({ message: "Internal server error during authentication" });
  }
};


export default isAuth;