import { ChevronUp, ChevronDown } from 'lucide-react';
import './VoteButton.css';

export default function VoteButton({ votes, userVote, onVote, vertical = true }) {
  return (
    <div className={`vote-button ${vertical ? 'vertical' : 'horizontal'}`}>
      <button
        className={`vote-arrow ${userVote === 1 ? 'active upvoted' : ''}`}
        onClick={() => onVote(1)}
        aria-label="Upvote"
      >
        <ChevronUp size={20} />
      </button>
      <span className={`vote-count ${userVote === 1 ? 'upvoted' : ''} ${userVote === -1 ? 'downvoted' : ''}`}>
        {votes}
      </span>
      <button
        className={`vote-arrow ${userVote === -1 ? 'active downvoted' : ''}`}
        onClick={() => onVote(-1)}
        aria-label="Downvote"
      >
        <ChevronDown size={20} />
      </button>
    </div>
  );
}
