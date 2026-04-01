import { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Plus, Flame, Clock, TrendingUp, Search, Megaphone, Rocket, Calendar, DollarSign, X, ChevronDown, ChevronUp } from 'lucide-react';
import ForumPostCard from '../components/ForumPostCard';
import { FORUM_CATEGORIES } from '../data/mockData';
import { useApp } from '../context/AppContext';
import './Forums.css';

const ANNOUNCEMENT_ICONS = {
  launch: <Rocket size={20} />,
  event: <Calendar size={20} />,
  funding: <DollarSign size={20} />,
  general: <Megaphone size={20} />,
};

const ANNOUNCEMENT_COLORS = {
  launch: '#10b981',
  event: '#0891b2',
  funding: '#f59e0b',
  general: '#3b82f6',
};

const ANNOUNCEMENT_LABELS = {
  launch: 'Product Launch',
  event: 'Event',
  funding: 'Funding',
  general: 'Announcement',
};

export default function Forums() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('cat') || 'all';
  const [sortBy, setSortBy] = useState('hot');
  const [search, setSearch] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);
  const [showNewAnnouncement, setShowNewAnnouncement] = useState(false);
  const [activeSection, setActiveSection] = useState('threads'); // 'threads' or 'announcements'
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'general', tags: '' });
  const [newAnn, setNewAnn] = useState({ title: '', content: '', type: 'general' });
  const { forumPosts, announcements, addForumPost, addAnnouncement, currentUser } = useApp();
  const navigate = useNavigate();

  const filtered = forumPosts
    .filter(p => activeCategory === 'all' || p.category === activeCategory)
    .filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.content.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'hot') {
        const aPinned = a.pinned ? 1 : 0;
        const bPinned = b.pinned ? 1 : 0;
        if (aPinned !== bPinned) return bPinned - aPinned;
        return b.votes - a.votes;
      }
      if (sortBy === 'new') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'top') return b.votes - a.votes;
      return 0;
    });

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;
    addForumPost({
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      tags: newPost.tags.split(',').map(t => t.trim()).filter(Boolean),
    });
    setNewPost({ title: '', content: '', category: 'general', tags: '' });
    setShowNewPost(false);
  };

  const handleCreateAnnouncement = (e) => {
    e.preventDefault();
    if (!newAnn.title.trim() || !newAnn.content.trim()) return;
    addAnnouncement({
      title: newAnn.title,
      content: newAnn.content,
      type: newAnn.type,
    });
    setNewAnn({ title: '', content: '', type: 'general' });
    setShowNewAnnouncement(false);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  return (
    <div className="forums-page page-container">
      <div className="container">
        <div className="forums-header">
          <div>
            <h1 className="section-title">💬 Community <span className="gradient-text">Forums</span></h1>
            <p className="section-subtitle">Discuss Inter-IIT tech, finance, business strategies, and startup ideas</p>
          </div>
          <div className="forums-header-actions">
            {activeSection === 'announcements' && (
              <button className="btn btn-primary" onClick={() => {
                if (!currentUser) return navigate('/login');
                setShowNewAnnouncement(!showNewAnnouncement);
              }}>
                <Megaphone size={16} /> New Announcement
              </button>
            )}
            {activeSection === 'threads' && (
              <button className="btn btn-primary" onClick={() => {
                if (!currentUser) return navigate('/login');
                setShowNewPost(!showNewPost);
              }}>
                <Plus size={16} /> New Thread
              </button>
            )}
          </div>
        </div>

        {/* Section Switcher */}
        <div className="forums-section-switcher">
          <button
            className={`section-switch-btn ${activeSection === 'threads' ? 'active' : ''}`}
            onClick={() => setActiveSection('threads')}
          >
            💬 Discussion Threads
          </button>
          <button
            className={`section-switch-btn ${activeSection === 'announcements' ? 'active' : ''}`}
            onClick={() => setActiveSection('announcements')}
          >
            📢 Announcements {announcements?.length > 0 && <span className="section-badge">{announcements.length}</span>}
          </button>
        </div>

        {/* ════════════════════════════════════════
            ANNOUNCEMENTS SECTION (Full Page)
            ════════════════════════════════════════ */}
        {activeSection === 'announcements' && (
          <div className="announcements-full-section">
            {/* New Announcement Form */}
            {showNewAnnouncement && (
              <div className="new-post-form glass-card animate-scale-in">
                <div className="npf-top-row">
                  <h3 className="npf-title"><Megaphone size={18} /> Create Announcement</h3>
                  <button className="npf-close" onClick={() => setShowNewAnnouncement(false)}><X size={18} /></button>
                </div>
                <form onSubmit={handleCreateAnnouncement}>
                  <div className="npf-row">
                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="form-label">Title</label>
                      <input type="text" className="form-input" placeholder="e.g. 🚀 Our MVP is live!" value={newAnn.title} onChange={e => setNewAnn({ ...newAnn, title: e.target.value })} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Type</label>
                      <select className="form-select form-input" value={newAnn.type} onChange={e => setNewAnn({ ...newAnn, type: e.target.value })}>
                        <option value="launch">🚀 Product Launch</option>
                        <option value="event">📅 Event</option>
                        <option value="funding">💰 Funding</option>
                        <option value="general">📢 General</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Content</label>
                    <textarea className="form-textarea" placeholder="Share the full details of your announcement..." value={newAnn.content} onChange={e => setNewAnn({ ...newAnn, content: e.target.value })} required rows={5} />
                  </div>
                  <div className="npf-actions">
                    <button type="button" className="btn btn-ghost" onClick={() => setShowNewAnnouncement(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Publish Announcement</button>
                  </div>
                </form>
              </div>
            )}

            {/* Announcements List */}
            {(!announcements || announcements.length === 0) ? (
              <div className="forums-empty">
                <Megaphone size={48} />
                <p>No announcements yet. Be the first to share something!</p>
                <button className="btn btn-primary" onClick={() => setShowNewAnnouncement(true)}>
                  <Megaphone size={16} /> Create Announcement
                </button>
              </div>
            ) : (
              <div className="announcements-grid">
                {announcements.map(ann => {
                  const color = ANNOUNCEMENT_COLORS[ann.type] || ANNOUNCEMENT_COLORS.general;
                  const icon = ANNOUNCEMENT_ICONS[ann.type] || ANNOUNCEMENT_ICONS.general;
                  const label = ANNOUNCEMENT_LABELS[ann.type] || 'Announcement';
                  return (
                    <div key={ann.id} className="announcement-full-card" style={{ '--ann-color': color }}>
                      <div className="ann-card-header">
                        <div className="ann-type-badge" style={{ background: `${color}15`, color }}>
                          {icon}
                          <span>{label}</span>
                        </div>
                        <span className="ann-date">{formatDate(ann.timestamp)}</span>
                      </div>
                      <h3 className="ann-card-title">{ann.title}</h3>
                      <p className="ann-card-content">{ann.content}</p>
                      <div className="ann-card-footer">
                        <div className="ann-author">
                          <div className="ann-author-avatar">{ann.author?.initials || '?'}</div>
                          <div>
                            <div className="ann-author-name">{ann.author?.name}</div>
                            <div className="ann-author-info">{ann.author?.branch} · {ann.author?.year}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ════════════════════════════════════════
            THREADS SECTION
            ════════════════════════════════════════ */}
        {activeSection === 'threads' && (
          <>
            {/* New Post Form */}
            {showNewPost && (
              <div className="new-post-form glass-card animate-scale-in">
                <div className="npf-top-row">
                  <h3 className="npf-title">Create New Thread</h3>
                  <button className="npf-close" onClick={() => setShowNewPost(false)}><X size={18} /></button>
                </div>
                <form onSubmit={handleCreatePost}>
                  <div className="npf-row">
                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="form-label">Title</label>
                      <input type="text" className="form-input" placeholder="Give your thread a descriptive title..." value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Category</label>
                      <select className="form-select form-input" value={newPost.category} onChange={e => setNewPost({ ...newPost, category: e.target.value })}>
                        {FORUM_CATEGORIES.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Content</label>
                    <textarea className="form-textarea" placeholder="Write your post content... (Markdown supported)" value={newPost.content} onChange={e => setNewPost({ ...newPost, content: e.target.value })} required rows={5} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tags (comma-separated)</label>
                    <input type="text" className="form-input" placeholder="e.g. inter-iit, tech, discussion" value={newPost.tags} onChange={e => setNewPost({ ...newPost, tags: e.target.value })} />
                  </div>
                  <div className="npf-actions">
                    <button type="button" className="btn btn-ghost" onClick={() => setShowNewPost(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Post Thread</button>
                  </div>
                </form>
              </div>
            )}

            {/* Search & Filters */}
            <div className="forums-controls">
              <div className="forums-search">
                <Search size={16} className="search-icon" />
                <input type="text" className="form-input search-input" placeholder="Search threads..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <div className="forums-sort">
                {[
                  { key: 'hot', icon: <Flame size={14} />, label: 'Hot' },
                  { key: 'new', icon: <Clock size={14} />, label: 'New' },
                  { key: 'top', icon: <TrendingUp size={14} />, label: 'Top' },
                ].map(s => (
                  <button key={s.key} className={`sort-btn ${sortBy === s.key ? 'active' : ''}`} onClick={() => setSortBy(s.key)}>
                    {s.icon} {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="forums-categories">
              <button className={`forum-cat-btn ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setSearchParams({})}>
                🌐 All
              </button>
              {FORUM_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  className={`forum-cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSearchParams({ cat: cat.id })}
                  style={activeCategory === cat.id ? { borderColor: cat.color, color: cat.color, background: `${cat.color}12` } : {}}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>

            {activeCategory !== 'all' && (
              <div className="forum-cat-desc animate-fade-in">
                {FORUM_CATEGORIES.find(c => c.id === activeCategory)?.description}
              </div>
            )}

            {/* Posts */}
            <div className="forums-list">
              {filtered.map((post, i) => (
                <ForumPostCard key={post.id} post={post} index={i} />
              ))}
              {filtered.length === 0 && (
                <div className="forums-empty">
                  <p>No threads found. Be the first to start a discussion!</p>
                  <button className="btn btn-primary" onClick={() => setShowNewPost(true)}>
                    <Plus size={16} /> Create Thread
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
