// controllers/authController.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// Simple in-memory blacklist (can be replaced later with Redis or DB)
// const tokenBlacklist = new Set();
const resp = (res, code, message) => res.status(code).json({ message });

const authController = {
  async register(req, res) {
    try {
      const { name, email, password } = req.body || {};
      // validate
      if (!name || !email || !password)
        return res.status(400).json({ message: 'All fields are required.' });

      const existing = await User.query().findOne({email});
      if (existing) return resp(res,409,'Email already exists.');
      const hashed = await bcrypt.hash(password, 10);
      const user = await User.query().insert({ name, email, password: hashed });

      return res.status(201).json({
        message: 'User registered successfully.',
        user,
      });

    } catch (error) {
      return res.status(500).json({ message: 'Registration failed.', error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body || {};
      if (!email || !password)
        return res.status(400).json({ message: 'Email and password required.' });

      const user = await User.query().findOne({ email });
      if (!user) return resp(res, 404, 'User not found.');

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return resp(res,401,'Invalid credentials.');

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.json({
        message: 'Login successful.',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          email_verified_at: user.email_verified_at,
        },
      });

    } catch (error) {
      res.status(500).json({ message: 'Login failed.', error: error.message });
    }
  },

  async logout(req, res) {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) return resp(res,400,'No token provided.');

      // Add token to blacklist
      tokenBlacklist.add(token);

      return res.json({ message: 'Logout successful. Token invalidated.' });
    } catch (error) {
      res.status(500).json({ message: 'Logout failed.', error: error.message });
    }
  },

  async profile(req, res) {
    try {
      const user = req.user; // from auth middleware
      res.json({ message: 'User profile fetched successfully.', user });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch profile.', error: error.message });
    }
  },

  // isTokenBlacklisted(token) {
  //   return tokenBlacklist.has(token);
  // },
};

export default authController;