import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

export default async function verifyToken(req, res, next) {
  // Method 1 :
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];
  // Method 2 :
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({
     status: 401,
     error: "Unauthorized",
     message: "Missing token or wrong method"
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(401).json({ message: "Invalid user" });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ 
      error: "Unauthorized",
      header: "Invalid or expired token",
      message: err.message });
  }
};
