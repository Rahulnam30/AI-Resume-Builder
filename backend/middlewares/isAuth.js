import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    let token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Token Not Found" });
    }

    let verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res.status(401).json({ message: "Valid Token Not Found" });
    }
    
    // FIX: Use 'id' instead of 'userId'
    req.userId = verifyToken.id;
    next();
  } catch (error) {
    console.log("isAuth error:", error);
    return res.status(400).json({ message: `isAuth Error ${error.message}` });
  }
};

export default isAuth;