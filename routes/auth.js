import express from "express";
import auth from "../middleware/auth.js";
import authController from '../controllers/authController.js' ;

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
router.post("/logout", authController.logout);

export default router;
