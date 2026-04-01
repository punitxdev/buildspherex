import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Clock, Users, UserPlus, UserMinus, Share2, Bookmark,
  Send, CheckCircle, XCircle, MessageSquare, AlertCircle, Mail
} from 'lucide-react';
import VoteButton from '../components/VoteButton';
import SkillTag from '../components/SkillTag';
import CommentSection from '../components/CommentSection';
import ContactModal from '../components/ContactModal';
import { STATUS_CONFIG } from '../data/mockData';
import { useApp } from '../context/AppContext';
import './IdeaDetail.css';

export default function IdeaDetail() {
  const { ideaId } = useParams();
  const {
    ideas, currentUser, joinRequests,
    voteIdea, addCommentToIdea, toggleCollaborator,
    requestJoin, acceptRequest, rejectRequest
  } = useApp();
  const idea = ideas.find(i => i.id === ideaId);

  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const [requestSent, setRequestSent] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  if (!idea) {
    return (
      <div className="page-container">
        <div className="container">
          <div className="not-found">
            <h2>Idea not found</h2>
            <Link to="/ideas" className="btn btn-primary">Browse Ideas</Link>
          </div>
        </div>
      </div>
    );
  }

  const status = STATUS_CONFIG[idea.status];
  const cid = currentUser?._id || currentUser?.id;
  const isCollaborator = currentUser ? idea.collaborators.some(c => (c._id || c.id) === cid) : false;
  const isAuthor = currentUser ? (idea.author._id || idea.author.id) === cid : false;
  const pendingRequests = joinRequests.filter(r => (r.ideaId._id || r.ideaId) === (idea._id || idea.id));
  const hasPendingRequest = currentUser ? pendingRequests.some(r => (r.user._id || r.user.id) === cid) : false;
  const teamFull = idea.collaborators.length >= idea.teamSize;

  const handleSendRequest = () => {
    if (!requestMessage.trim()) return;
    requestJoin(idea.id, requestMessage.trim());
    setRequestMessage('');
    setShowRequestForm(false);
    setRequestSent(true);
  };

  return (
    <div className="idea-detail-page page-container">
      <div className="container">
        <Link to="/ideas" className="back-link">
          <ArrowLeft size={16} /> Back to Ideas
        </Link>

        <div className="idea-detail-layout">
          <div className="idea-detail-main">
            <div className="idea-detail-card glass-card animate-fade-in-up">
              <div className="id-header">
                <div className="id-meta">
                  <span className="id-status" style={{ color: status.color, background: status.bg }}>
                    {status.label}
                  </span>
                  <span className="id-date"><Clock size={12} /> {new Date(idea.createdAt).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="id-actions-top">
                  <button className="btn btn-ghost btn-sm"><Share2 size={14} /> Share</button>
                  <button className="btn btn-ghost btn-sm"><Bookmark size={14} /> Save</button>
                </div>
              </div>

              <h1 className="id-title">{idea.title}</h1>

              <div className="id-author" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div className="id-author-avatar">{idea.author.initials}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="id-author-name">{idea.author.name}</span>
                      {idea.author.role && (
                        <span style={{ fontSize: '11px', padding: '2px 10px', background: 'rgba(8, 145, 178, 0.15)', color: 'var(--accent-primary)', borderRadius: '100px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {idea.author.role}
                        </span>
                      )}
                    </div>
                    <span className="id-author-info">{idea.author.college} · {idea.author.branch}</span>
                  </div>
                </div>
                {!isAuthor && (
                  <button 
                    onClick={() => setIsContactModalOpen(true)}
                    className="btn btn-secondary btn-sm"
                    style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Mail size={14} /> Contact Founder
                  </button>
                )}
              </div>

              <div className="id-vote-row">
                <VoteButton
                  votes={idea.votes}
                  userVote={idea.userVote}
                  onVote={(dir) => voteIdea(idea.id, dir)}
                  vertical={false}
                />
              </div>

              <div className="id-section">
                <h2 className="id-section-title">🔍 Problem</h2>
                <p className="id-section-text">{idea.problem}</p>
              </div>

              <div className="id-section">
                <h2 className="id-section-title">💡 Solution</h2>
                <p className="id-section-text">{idea.solution}</p>
              </div>

              <div className="id-section">
                <h2 className="id-section-title">🛠 Skills Required</h2>
                <div className="id-skills">
                  {idea.skills.map(skill => (
                    <SkillTag key={skill} skill={skill} />
                  ))}
                </div>
              </div>
            </div>

            <CommentSection
              comments={idea.comments}
              onAddComment={(text) => addCommentToIdea(idea.id, text)}
            />
          </div>

          <div className="idea-detail-sidebar">
            {/* Team Card */}
            <div className="id-sidebar-card glass-card animate-fade-in-up stagger-1">
              <h3 className="id-sidebar-title">
                <Users size={16} /> Team
                <span className="id-team-count">{idea.collaborators.length}/{idea.teamSize}</span>
              </h3>

              <div className="id-team-progress">
                <div className="id-team-bar">
                  <div
                    className="id-team-fill"
                    style={{ width: `${(idea.collaborators.length / idea.teamSize) * 100}%` }}
                  ></div>
                </div>
                <span className="id-team-slots">
                  {idea.teamSize - idea.collaborators.length} spot{idea.teamSize - idea.collaborators.length !== 1 ? 's' : ''} left
                </span>
              </div>

              <div className="id-team-list">
                {idea.collaborators.map(user => (
                  <div key={user.id} className="id-team-member">
                    <div className="id-tm-avatar">{user.initials}</div>
                    <div>
                      <span className="id-tm-name">{user.name}</span>
                      <span className="id-tm-role">{user.id === idea.author.id ? 'Founder' : 'Collaborator'}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Join Request Flow for non-authors */}
              {!isAuthor && !isCollaborator && (
                <>
                  {requestSent || hasPendingRequest ? (
                    <div className="id-request-sent">
                      <AlertCircle size={16} />
                      <span>Request sent — waiting for founder's approval</span>
                    </div>
                  ) : teamFull ? (
                    <div className="id-team-full">
                      <span>Team is full</span>
                    </div>
                  ) : showRequestForm ? (
                    <div className="id-request-form animate-fade-in">
                      <p className="id-request-label">
                        <MessageSquare size={14} /> Write a message to the founder
                      </p>
                      <textarea
                        className="form-textarea id-request-textarea"
                        placeholder="Hi! I'd love to join your team. I have experience in..."
                        value={requestMessage}
                        onChange={e => setRequestMessage(e.target.value)}
                        rows={3}
                        maxLength={300}
                      />
                      <div className="id-request-counter">{requestMessage.length}/300</div>
                      <div className="id-request-actions">
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => { setShowRequestForm(false); setRequestMessage(''); }}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={handleSendRequest}
                          disabled={!requestMessage.trim()}
                        >
                          <Send size={14} /> Send Request
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      className="btn btn-primary id-join-btn"
                      onClick={() => setShowRequestForm(true)}
                    >
                      <UserPlus size={16} /> Request to Join
                    </button>
                  )}
                </>
              )}

              {/* Leave button for non-author collaborators */}
              {!isAuthor && isCollaborator && (
                <button
                  className="btn btn-secondary id-join-btn"
                  onClick={() => toggleCollaborator(idea.id)}
                >
                  <UserMinus size={16} /> Leave Team
                </button>
              )}
            </div>

            {/* Pending Requests Card — visible to founder only */}
            {isAuthor && pendingRequests.length > 0 && (
              <div className="id-sidebar-card glass-card animate-fade-in-up stagger-2">
                <h3 className="id-sidebar-title">
                  <UserPlus size={16} /> Join Requests
                  <span className="id-request-badge">{pendingRequests.length}</span>
                </h3>
                <div className="id-requests-list">
                  {pendingRequests.map(req => (
                    <div key={req.id} className="id-request-card">
                      <div className="id-request-header">
                        <div className="id-request-avatar">{req.user.initials}</div>
                        <div>
                          <span className="id-request-name">{req.user.name}</span>
                          <span className="id-request-info">{req.user.college} · {req.user.branch}</span>
                        </div>
                      </div>
                      <p className="id-request-message">"{req.message}"</p>
                      <div className="id-request-skills">
                        {req.user.skills.slice(0, 3).map(s => (
                          <SkillTag key={s} skill={s} small />
                        ))}
                      </div>
                      <div className="id-request-btns">
                        <button
                          className="btn btn-sm id-accept-btn"
                          onClick={() => acceptRequest(req.id)}
                        >
                          <CheckCircle size={14} /> Accept
                        </button>
                        <button
                          className="btn btn-sm id-reject-btn"
                          onClick={() => rejectRequest(req.id)}
                        >
                          <XCircle size={14} /> Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Status Card */}
            <div className={`id-sidebar-card glass-card animate-fade-in-up stagger-${isAuthor && pendingRequests.length > 0 ? '3' : '2'}`}>
              <h3 className="id-sidebar-title">📊 Project Status</h3>
              <div className="id-status-timeline">
                {Object.entries(STATUS_CONFIG).map(([key, val], i) => {
                  const statusOrder = ['concept', 'building', 'mvp', 'launched'];
                  const currentIdx = statusOrder.indexOf(idea.status);
                  const thisIdx = statusOrder.indexOf(key);
                  const done = thisIdx <= currentIdx;
                  const isCurrent = thisIdx === currentIdx;

                  return (
                    <div key={key} className={`id-tl-item ${done ? 'done' : ''} ${isCurrent ? 'current' : ''}`}>
                      <div className="id-tl-dot"></div>
                      {i < 3 && <div className="id-tl-line"></div>}
                      <span className="id-tl-label" style={isCurrent ? { color: val.color } : {}}>{val.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
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
