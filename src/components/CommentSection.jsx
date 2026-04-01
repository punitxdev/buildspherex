import { useState } from 'react';
import { Send, ChevronUp } from 'lucide-react';
import './CommentSection.css';

export default function CommentSection({ comments = [], onAddComment, title = 'Comments' }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddComment(text.trim());
    setText('');
  };

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
    <div className="comment-section">
      <h3 className="cs-title">{title} ({comments.length})</h3>

      <form className="cs-form" onSubmit={handleSubmit}>
        <div className="cs-input-wrapper">
          <input
            type="text"
            className="cs-input form-input"
            placeholder="Add a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            className="cs-submit btn btn-primary btn-sm"
            disabled={!text.trim()}
          >
            <Send size={14} />
          </button>
        </div>
      </form>

      <div className="cs-list">
        {comments.map((comment, i) => (
          <div key={comment.id} className={`cs-comment animate-fade-in stagger-${(i % 6) + 1}`}>
            <div className="cs-comment-avatar">{comment.author.initials}</div>
            <div className="cs-comment-body">
              <div className="cs-comment-header">
                <span className="cs-comment-author">{comment.author.name}</span>
                <span className="cs-comment-time">{timeAgo(comment.timestamp)}</span>
              </div>
              <p className="cs-comment-text">{comment.text}</p>
              <div className="cs-comment-actions">
                <button className="cs-comment-vote">
                  <ChevronUp size={14} />
                  <span>{comment.votes}</span>
                </button>
                <button className="cs-comment-reply">Reply</button>
              </div>
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <p className="cs-empty">No comments yet. Be the first to share your thoughts!</p>
        )}
      </div>
    </div>
  );
}
