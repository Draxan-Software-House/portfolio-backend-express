import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from '../models/User.js';
import authController from '../controllers/authController.js';

dotenv.config();

const auth = {
  async verifyToken(req, res, next) {
    // Method 1 : 
    // const authHeader = req.headers["authorization"];
    // const token = authHeader && authHeader.split(" ")[1];
    // Method 2 :
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) return res.status(401).json({
         status: 401,
         error: "Unauthorized",
         message: "Missing token or wrong method"
        });
      // Check blacklist
      if (authController.isTokenBlacklisted(token)) {
        return res.status(401).json({
          status: 401,
          message: 'Token has been invalidated.',
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Load user (Objection.js)
      const user = await User.query().findById(decoded.id);
      if (!user) return res.status(401).json({ message: "Invalid user" });
      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({ 
        error: "Unauthorized",
        header: "Invalid or expired token",
        message: err.message });
    }
  }
};
export default auth;
