import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  votes: { type: Number, default: 0 },
}, { timestamps: true });

const ideaSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  problem: { type: String, default: '' },
  solution: { type: String, default: '' },
  skills: [{ type: String }],
  status: { type: String, enum: ['concept', 'building', 'mvp', 'launched'], default: 'concept' },
  teamSize: { type: Number, default: 4 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  votes: { type: Number, default: 0 },
  votedBy: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, direction: Number }],
  comments: [commentSchema],
  commentsCount: { type: Number, default: 0 },
}, { timestamps: true });

// Virtual for createdAt formatted
ideaSchema.virtual('createdAtFormatted').get(function () {
  return this.createdAt?.toISOString().split('T')[0];
});

// Database Indexes for scaling
ideaSchema.index({ status: 1 });
ideaSchema.index({ category: 1, createdAt: -1 });
ideaSchema.index({ author: 1 });
ideaSchema.index({ createdAt: -1 });

ideaSchema.set('toJSON', { virtuals: true });
ideaSchema.set('toObject', { virtuals: true });

const Idea = mongoose.model('Idea', ideaSchema);
export default Idea;
