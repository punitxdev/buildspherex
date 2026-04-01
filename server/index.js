import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';

import authRoutes from './routes/auth.js';
import ideaRoutes from './routes/ideas.js';
import forumRoutes from './routes/forums.js';
import userRoutes from './routes/users.js';
import joinRequestRoutes from './routes/joinRequests.js';
import announcementRoutes from './routes/announcements.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Optimization Middleware
app.use(helmet());
app.use(compression({
  level: 6, // optimal default
  threshold: 10 * 1024, // only compress > 10kb
}));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '50mb' }));

// Rate Limiting (global)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later." }
});

// Stricter limits for auth
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 30, // limit each IP to 30 requests per windowMs
  message: { message: "Too many login attempts, please try again later." }
});

app.use('/api/', apiLimiter);

// Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/ideas', ideaRoutes);
app.use('/api/forums', forumRoutes);
app.use('/api/users', userRoutes);
app.use('/api/join-requests', joinRequestRoutes);
app.use('/api/announcements', announcementRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', platform: 'BuildSphereX – Innovation Network IIT Dharwad' }));

// Connect DB and start
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 BuildSphereX server running on port ${PORT}`);
  });
});
