import jwt from "jsonwebtoken";

export const genrateToken = (payload) => {
  try {
    let token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return token;
  } catch (error) {
    console.log("Token error");
  }
};
