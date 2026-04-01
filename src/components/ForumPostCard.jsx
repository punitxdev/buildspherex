import { Link } from 'react-router-dom';
import { MessageCircle, Pin, Clock } from 'lucide-react';
import VoteButton from './VoteButton';
import { FORUM_CATEGORIES } from '../data/mockData';
import { useApp } from '../context/AppContext';
import './ForumPostCard.css';

export default function ForumPostCard({ post, index = 0 }) {
  const { voteForumPost } = useApp();
  const category = FORUM_CATEGORIES.find(c => c.id === post.category);

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return new Date(dateStr).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  };

  return (
    <div className={`forum-post-card animate-fade-in-up stagger-${(index % 8) + 1}`}>
      <div className="fpc-vote">
        <VoteButton
          votes={post.votes}
          userVote={post.userVote}
          onVote={(dir) => voteForumPost(post.id, dir)}
        />
      </div>

      <div className="fpc-content">
        <div className="fpc-meta">
          {post.pinned && (
            <span className="fpc-pinned">
              <Pin size={12} />
              Pinned
            </span>
          )}
          {category && (
            <span className="fpc-category" style={{ color: category.color, background: `${category.color}18` }}>
              {category.icon} {category.name}
            </span>
          )}
        </div>

        <Link to={`/forums/${post.id}`} className="fpc-title-link">
          <h3 className="fpc-title">{post.title}</h3>
        </Link>

        <p className="fpc-excerpt">{post.content.substring(0, 150)}...</p>

        {post.tags && post.tags.length > 0 && (
          <div className="fpc-tags">
            {post.tags.map(tag => (
              <span key={tag} className="fpc-tag">#{tag}</span>
            ))}
          </div>
        )}

        <div className="fpc-footer">
          <div className="fpc-author">
            <div className="fpc-author-avatar">{post.author.initials}</div>
            <span className="fpc-author-name">{post.author.name}</span>
            <span className="fpc-time">
              <Clock size={12} />
              {timeAgo(post.createdAt)}
            </span>
          </div>

          <div className="fpc-stats">
            <div className="fpc-stat">
              <MessageCircle size={14} />
              <span>{post.replies} replies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
