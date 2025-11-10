// controllers/authController.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authController = {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      // validate
      if (!name || !email || !password)
        return res.status(400).json({ message: 'All fields are required.' });

      const existing = await User.findByEmail(email);
      if (existing) return res.status(409).json({ message: 'Email already exists.' });

      const id = await User.create({ name, email, password });
      const user = await User.findById(id);

      res.status(201).json({
        message: 'User registered successfully.',
        user,
      });
    } catch (error) {
      res.status(500).json({ message: 'Registration failed.', error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password)
        return res.status(400).json({ message: 'Email and password required.' });

      const user = await User.findByEmail(email);
      if (!user) return res.status(404).json({ message: 'User not found.' });

      const valid = await User.verifyPassword(password, user.password);
      if (!valid) return res.status(401).json({ message: 'Invalid credentials.' });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

      res.json({
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
      if (!token) return res.status(400).json({ message: 'No token provided.' });

      // Add token to blacklist
      tokenBlacklist.add(token);

      res.json({ message: 'Logout successful. Token invalidated.' });
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
};

export default authController;