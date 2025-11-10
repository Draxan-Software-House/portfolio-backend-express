import express from "express";
import dotenv from "dotenv";
import auth from "../middleware/auth.js";
import authController from '../controllers/authController.js' ;

dotenv.config();
const router = express.Router();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.get('/profile', auth.verifyToken, authController.profile);

// GET /api/auth/me
router.get("/me", auth.verifyToken, async (req, res) => {
  const { id, name, email } = req.user;
  res.json({ id, name, email });
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  // client-side token removal; stateless JWT logout
  res.json({ message: "Logged out (client should discard token)" });
});

export default router;
