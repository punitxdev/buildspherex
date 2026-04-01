import express from 'express';
import JoinRequest from '../models/JoinRequest.js';
import Idea from '../models/Idea.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// POST /api/join-requests — request to join
router.post('/', auth, async (req, res) => {
  try {
    const { ideaId, message } = req.body;
    const existing = await JoinRequest.findOne({ ideaId, user: req.user._id, status: 'pending' });
    if (existing) return res.status(400).json({ message: 'Already requested' });
    const jr = await JoinRequest.create({ ideaId, user: req.user._id, message });
    const populated = await jr.populate('user', 'name email initials college branch year skills');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/join-requests/my — get requests for the founder's ideas
router.get('/my', auth, async (req, res) => {
  try {
    const myIdeas = await Idea.find({ author: req.user._id }).select('_id');
    const ideaIds = myIdeas.map(i => i._id);
    const requests = await JoinRequest.find({ ideaId: { $in: ideaIds }, status: 'pending' })
      .populate('user', 'name email initials college branch year skills')
      .populate('ideaId', 'title');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/join-requests/:id/accept
router.put('/:id/accept', auth, async (req, res) => {
  try {
    const jr = await JoinRequest.findById(req.params.id);
    if (!jr) return res.status(404).json({ message: 'Request not found' });
    const idea = await Idea.findById(jr.ideaId);
    if (idea.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    jr.status = 'accepted';
    await jr.save();
    if (!idea.collaborators.includes(jr.user)) {
      idea.collaborators.push(jr.user);
      await idea.save();
    }
    res.json({ message: 'Request accepted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/join-requests/:id/reject
router.put('/:id/reject', auth, async (req, res) => {
  try {
    const jr = await JoinRequest.findById(req.params.id);
    if (!jr) return res.status(404).json({ message: 'Request not found' });
    const idea = await Idea.findById(jr.ideaId);
    if (idea.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    jr.status = 'rejected';
    await jr.save();
    res.json({ message: 'Request rejected' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
