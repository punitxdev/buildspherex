import express from 'express';
import Idea from '../models/Idea.js';
import { auth, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// GET /api/ideas — list all
router.get('/', optionalAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const [ideas, total] = await Promise.all([
      Idea.find()
        .populate('author', 'name email initials college branch year skills role')
        .populate('collaborators', 'name email initials college branch year skills role')
        .populate('comments.author', 'name initials')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Idea.countDocuments()
    ]);

    res.json({
      data: ideas,
      page,
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/ideas/:id — single idea
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id)
      .populate('author', 'name email initials college branch year skills role')
      .populate('collaborators', 'name email initials college branch year skills role')
      .populate('comments.author', 'name initials');
    if (!idea) return res.status(404).json({ message: 'Idea not found' });
    res.json(idea);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/ideas — create
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, problem, solution, skills, teamSize } = req.body;
    const idea = await Idea.create({
      title, description, problem, solution, skills, teamSize,
      author: req.user._id,
      collaborators: [req.user._id],
    });
    const populated = await idea.populate([
      { path: 'author', select: 'name email initials college branch year skills role' },
      { path: 'collaborators', select: 'name email initials college branch year skills role' },
    ]);
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/ideas/:id — edit (founder only)
router.put('/:id', auth, async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: 'Idea not found' });
    if (idea.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized — founders only' });
    }
    const { title, description, problem, solution, skills, teamSize } = req.body;
    if (title) idea.title = title;
    if (description) idea.description = description;
    if (problem !== undefined) idea.problem = problem;
    if (solution !== undefined) idea.solution = solution;
    if (skills) idea.skills = skills;
    if (teamSize) idea.teamSize = teamSize;
    await idea.save();
    const populated = await idea.populate([
      { path: 'author', select: 'name email initials college branch year skills role' },
      { path: 'collaborators', select: 'name email initials college branch year skills role' },
    ]);
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/ideas/:id/status — update status (founder only)
router.put('/:id/status', auth, async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: 'Idea not found' });
    if (idea.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    idea.status = req.body.status;
    await idea.save();
    res.json({ status: idea.status });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/ideas/:id — delete (founder only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: 'Idea not found' });
    if (idea.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await idea.deleteOne();
    res.json({ message: 'Idea deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/ideas/:id/vote — vote up or down
router.post('/:id/vote', auth, async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: 'Idea not found' });
    const { direction } = req.body; // 1 or -1
    const existingVote = idea.votedBy.find(v => v.user.toString() === req.user._id.toString());
    if (existingVote) {
      if (existingVote.direction === direction) {
        idea.votes -= direction;
        idea.votedBy = idea.votedBy.filter(v => v.user.toString() !== req.user._id.toString());
      } else {
        idea.votes += direction - existingVote.direction;
        existingVote.direction = direction;
      }
    } else {
      idea.votes += direction;
      idea.votedBy.push({ user: req.user._id, direction });
    }
    await idea.save();
    res.json({ votes: idea.votes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/ideas/:id/comments — add comment
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: 'Idea not found' });
    idea.comments.push({ author: req.user._id, text: req.body.text });
    idea.commentsCount = idea.comments.length;
    await idea.save();
    const updated = await Idea.findById(idea._id).populate('comments.author', 'name initials');
    res.json(updated.comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/ideas/:id/collaborators/:userId — remove team member (founder only)
router.delete('/:id/collaborators/:userId', auth, async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: 'Idea not found' });
    if (idea.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    idea.collaborators = idea.collaborators.filter(c => c.toString() !== req.params.userId);
    await idea.save();
    res.json({ message: 'Collaborator removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
