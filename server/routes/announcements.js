import express from 'express';
import Announcement from '../models/Announcement.js';
import { auth, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// GET /api/announcements
router.get('/', optionalAuth, async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .populate('author', 'name email initials college branch year')
      .sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/announcements
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, type } = req.body;
    const announcement = await Announcement.create({
      title, content, type,
      author: req.user._id,
    });
    const populated = await announcement.populate('author', 'name email initials college branch year');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
