import express from 'express';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// GET /api/users — all users (public info)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/users/profile — update own profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, bio, branch, year, college, skills } = req.body;
    const user = await User.findById(req.user._id);
    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (branch) user.branch = branch;
    if (year) user.year = year;
    if (college) user.college = college;
    if (skills) user.skills = skills;
    await user.save();
    res.json(user.toPublic());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
