import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  votes: { type: Number, default: 0 },
}, { timestamps: true });

const forumPostSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  votes: { type: Number, default: 0 },
  votedBy: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, direction: Number }],
  pinned: { type: Boolean, default: false },
  replies: { type: Number, default: 0 },
  comments: [commentSchema],
}, { timestamps: true });

// Database Indexes for scaling
forumPostSchema.index({ category: 1, createdAt: -1 });
forumPostSchema.index({ author: 1 });
forumPostSchema.index({ tags: 1 });
forumPostSchema.index({ createdAt: -1 });

const ForumPost = mongoose.model('ForumPost', forumPostSchema);
export default ForumPost;
