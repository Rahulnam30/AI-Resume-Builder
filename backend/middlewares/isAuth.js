import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// lazy import User to avoid circular requires at module load
const getUserModel = async () => {
  const mod = await import("../Models/User.js");
  return mod.default || mod.User || mod.User;
};

const isAuth = async (req, res, next) => {
  try {
    let token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token Not Found" });
    }

    let verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res.status(401).json({ message: "Valid Token Not Found" });
    }
    
    // FIX: Use 'id' instead of 'userId'
    let tokenId = verifyToken.id;

    // If tokenId is not a valid ObjectId (e.g., legacy 'admin-id'), try to map it to a real admin user id
    if (!mongoose.Types.ObjectId.isValid(tokenId)) {
      try {
        const User = await getUserModel();
        const admin = await User.findOne({ isAdmin: true });
        if (admin) tokenId = admin._id;
      } catch (e) {
        // ignore and fall back to tokenId as-is
        console.warn('isAuth: failed to map token id to admin user', e.message);
      }
    }

    req.userId = tokenId;
    next();
  } catch (error) {
    console.log("isAuth error:", error);
    return res.status(400).json({ message: `isAuth Error ${error.message}` });
  }
};

export default isAuth;