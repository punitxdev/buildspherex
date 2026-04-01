import express from 'express';
import ForumPost from '../models/ForumPost.js';
import { auth, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// GET /api/forums
router.get('/', optionalAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      ForumPost.find()
        .populate('author', 'name email initials college branch year role')
        .populate('comments.author', 'name initials')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      ForumPost.countDocuments()
    ]);

    res.json({
      data: posts,
      page,
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/forums
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    const post = await ForumPost.create({
      title, content, category, tags,
      author: req.user._id,
    });
    const populated = await post.populate('author', 'name email initials college branch year');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/forums/:id/vote
router.post('/:id/vote', auth, async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const { direction } = req.body;
    const existing = post.votedBy.find(v => v.user.toString() === req.user._id.toString());
    if (existing) {
      if (existing.direction === direction) {
        post.votes -= direction;
        post.votedBy = post.votedBy.filter(v => v.user.toString() !== req.user._id.toString());
      } else {
        post.votes += direction - existing.direction;
        existing.direction = direction;
      }
    } else {
      post.votes += direction;
      post.votedBy.push({ user: req.user._id, direction });
    }
    await post.save();
    res.json({ votes: post.votes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/forums/:id/comments
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.comments.push({ author: req.user._id, text: req.body.text });
    post.replies = post.comments.length;
    await post.save();
    const updated = await ForumPost.findById(post._id).populate('comments.author', 'name initials');
    res.json(updated.comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
