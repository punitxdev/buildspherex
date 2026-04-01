import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Users, Clock, Mail } from 'lucide-react';
import VoteButton from './VoteButton';
import SkillTag from './SkillTag';
import CollaboratorAvatars from './CollaboratorAvatars';
import ContactModal from './ContactModal';
import { STATUS_CONFIG } from '../data/mockData';
import { useApp } from '../context/AppContext';
import './IdeaCard.css';

export default function IdeaCard({ idea, index = 0 }) {
  const { voteIdea, currentUser } = useApp();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const status = STATUS_CONFIG[idea.status];
  const cid = currentUser?._id || currentUser?.id;
  const isAuthor = currentUser ? (idea.author._id || idea.author.id) === cid : false;

  return (
    <div className={`idea-card glass-card animate-fade-in-up stagger-${(index % 8) + 1}`}>
      <div className="idea-card-vote">
        <VoteButton
          votes={idea.votes}
          userVote={idea.userVote}
          onVote={(dir) => voteIdea(idea.id, dir)}
        />
      </div>

      <div className="idea-card-content">
        <div className="idea-card-header">
          <span className="idea-status-badge" style={{ color: status.color, background: status.bg }}>
            {status.label}
          </span>
          <span className="idea-card-date">
            <Clock size={12} />
            {new Date(idea.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
          </span>
        </div>

        <Link to={`/ideas/${idea.id}`} className="idea-card-title-link">
          <h3 className="idea-card-title">{idea.title}</h3>
        </Link>

        <p className="idea-card-desc">{idea.description.substring(0, 140)}...</p>

        <div className="idea-card-skills">
          {idea.skills.slice(0, 3).map(skill => (
            <SkillTag key={skill} skill={skill} small />
          ))}
          {idea.skills.length > 3 && (
            <span className="idea-skills-more">+{idea.skills.length - 3}</span>
          )}
        </div>

        <div className="idea-card-footer">
          <div className="idea-card-author" style={{ display: 'flex', alignItems: 'center', gap: '8px', zIndex: 2 }}>
            <div className="idea-author-avatar">{idea.author.initials}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>{idea.author.name}</span>
              {idea.author.role && (
                <span style={{ fontSize: '9px', padding: '1px 6px', background: 'rgba(8, 145, 178, 0.1)', color: 'var(--accent-primary)', borderRadius: '100px', fontWeight: '700', textTransform: 'uppercase', width: 'fit-content', border: '1px solid rgba(8, 145, 178, 0.2)' }}>
                  {idea.author.role}
                </span>
              )}
            </div>
            {idea.author.email && !isAuthor && (
              <button 
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsContactModalOpen(true); }}
                title="Message Founder"
                style={{ marginLeft: 'auto', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', padding: '6px', borderRadius: '50%', background: 'var(--bg-glass)', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                <Mail size={14} />
              </button>
            )}
          </div>

          <div className="idea-card-stats">
            <div className="idea-stat">
              <MessageCircle size={14} />
              <span>{idea.commentsCount}</span>
            </div>
            <div className="idea-stat">
              <Users size={14} />
              <span>{idea.collaborators.length}/{idea.teamSize}</span>
            </div>
            <CollaboratorAvatars collaborators={idea.collaborators} max={3} size={26} />
          </div>
        </div>
      </div>

      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        recipientName={idea.author.name}
        recipientRole={idea.author.role || ''}
        ideaTitle={idea.title}
      />
    </div>
  );
}
