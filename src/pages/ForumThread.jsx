import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Pin, Clock, MessageCircle, Share2 } from 'lucide-react';
import VoteButton from '../components/VoteButton';
import CommentSection from '../components/CommentSection';
import { FORUM_CATEGORIES } from '../data/mockData';
import { useApp } from '../context/AppContext';
import './ForumThread.css';

export default function ForumThread() {
  const { postId } = useParams();
  const { forumPosts, voteForumPost, addCommentToPost } = useApp();
  const post = forumPosts.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="page-container">
        <div className="container">
          <div className="not-found">
            <h2>Thread not found</h2>
            <Link to="/forums" className="btn btn-primary">Back to Forums</Link>
          </div>
        </div>
      </div>
    );
  }

  const category = FORUM_CATEGORIES.find(c => c.id === post.category);

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return new Date(dateStr).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="thread-page page-container">
      <div className="container">
        <Link to="/forums" className="back-link">
          <ArrowLeft size={16} /> Back to Forums
        </Link>

        <div className="thread-main glass-card animate-fade-in-up">
          <div className="thread-vote-col">
            <VoteButton
              votes={post.votes}
              userVote={post.userVote}
              onVote={(dir) => voteForumPost(post.id, dir)}
            />
          </div>

          <div className="thread-content-col">
            <div className="thread-meta">
              {post.pinned && (
                <span className="thread-pinned">
                  <Pin size={12} /> Pinned
                </span>
              )}
              {category && (
                <span className="thread-category" style={{ color: category.color, background: `${category.color}18` }}>
                  {category.icon} {category.name}
                </span>
              )}
            </div>

            <h1 className="thread-title">{post.title}</h1>

            <div className="thread-author-row">
              <div className="thread-author-avatar">{post.author.initials}</div>
              <div>
                <span className="thread-author-name">{post.author.name}</span>
                <span className="thread-author-info">{post.author.college} · {post.author.branch}</span>
              </div>
              <span className="thread-time"><Clock size={12} />{timeAgo(post.createdAt)}</span>
            </div>

            <div className="thread-body">
              {post.content.split('\n').map((line, i) => {
                if (!line.trim()) return <br key={i} />;
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <h3 key={i} className="thread-subheading">{line.replace(/\*\*/g, '')}</h3>;
                }
                if (line.startsWith('- ') || line.startsWith('• ')) {
                  return <li key={i} className="thread-list-item">{line.substring(2)}</li>;
                }
                return <p key={i}>{line}</p>;
              })}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="thread-tags">
                {post.tags.map(tag => (
                  <span key={tag} className="thread-tag">#{tag}</span>
                ))}
              </div>
            )}

            <div className="thread-actions-bar">
              <span className="thread-stat"><MessageCircle size={14} /> {post.replies} replies</span>
              <button className="btn btn-ghost btn-sm">
                <Share2 size={14} /> Share
              </button>
            </div>
          </div>
        </div>

        <CommentSection
          comments={post.comments}
          onAddComment={(text) => addCommentToPost(post.id, text)}
          title="Replies"
        />
      </div>
    </div>
  );
}
