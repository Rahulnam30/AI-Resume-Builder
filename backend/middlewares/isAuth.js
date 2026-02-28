import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// lazy import User to avoid circular requires at module load
const getUserModel = async () => {
  const mod = await import("../Models/User.js");
  return mod.default || mod.User;
};

const isAuth = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    // If cookie is just stringified null/undefined, treat it as missing to allow fallback
    if (token === "null" || token === "undefined") {
      token = null;
    }

    // Fallback to Authorization header
    if (!token && req.headers?.authorization) {
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

    if (!mongoose.Types.ObjectId.isValid(tokenId)) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const User = await getUserModel();
    const user = await User.findById(tokenId);

    if (!user) {
      return res.status(404).json({ message: "User no longer exists" });
    }

    if (user.isActive === false) {
      return res.status(403).json({ message: "Account is deactivated" });
    }

    req.userId = user._id;
    req.userIsAdmin = user.isAdmin;
    next();
  } catch (error) {
    console.error("isAuth middleware error:", error);
    return res.status(401).json({ message: "Authentication Failed" });
  }
};


export default isAuth;