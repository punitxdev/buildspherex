import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { STATUS_CONFIG, SKILL_COLORS, SKILLS } from '../data/mockData';
import {
  Rocket, TrendingUp, Users, Clock,
  CheckCircle2, XCircle, ArrowUpRight,
  MessageSquare, Lightbulb, Trash2,
  Pencil, X, UserMinus, Save, ArrowLeft
} from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
  const {
    ideas, currentUser, joinRequests,
    acceptRequest, rejectRequest, updateIdeaStatus,
    updateIdea, deleteIdea, removeCollaborator
  } = useApp();

  const [activeTab, setActiveTab] = useState('my-ideas');
  const [editingIdea, setEditingIdea] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(null);

  const myIdeas = ideas.filter(idea => idea.author.id === currentUser.id);
  const collaboratingIdeas = ideas.filter(
    idea => idea.author.id !== currentUser.id && idea.collaborators.some(c => c.id === currentUser.id)
  );

  const myIdeaIds = myIdeas.map(i => i.id);
  const pendingRequests = joinRequests.filter(req => myIdeaIds.includes(req.ideaId));

  const totalVotes = myIdeas.reduce((sum, idea) => sum + idea.votes, 0);
  const totalCollaborators = myIdeas.reduce((sum, idea) => sum + idea.collaborators.length, 0);
  const totalComments = myIdeas.reduce((sum, idea) => sum + idea.commentsCount, 0);

  const statusOrder = ['concept', 'building', 'mvp', 'launched'];

  const openEditModal = (idea) => {
    setEditingIdea(idea.id);
    setEditForm({
      title: idea.title,
      description: idea.description,
      problem: idea.problem || '',
      solution: idea.solution || '',
      teamSize: idea.teamSize,
      skills: [...idea.skills],
    });
  };

  const handleEditSave = () => {
    updateIdea(editingIdea, editForm);
    setEditingIdea(null);
  };

  const handleDeleteIdea = (ideaId) => {
    deleteIdea(ideaId);
    setConfirmDelete(null);
  };

  const handleRemoveMember = (ideaId, userId) => {
    removeCollaborator(ideaId, userId);
  };

  const toggleEditSkill = (skill) => {
    setEditForm(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  return (
    <div className="dashboard-page">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="dashboard-header-left">
            <Link to="/profile" className="dashboard-back-link"><ArrowLeft size={16} /> Back to Profile</Link>
            <h1>Founder Dashboard</h1>
            <p>Manage your ideas, team, and track progress.</p>
          </div>
          <Link to="/post-idea" className="dashboard-new-idea-btn">
            <Lightbulb size={18} />
            Post New Idea
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="dashboard-stats-row">
          <div className="dashboard-stat-card">
            <div className="stat-icon" style={{ background: 'rgba(8, 145, 178, 0.1)', color: '#0891b2' }}>
              <Rocket size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-value">{myIdeas.length}</div>
              <div className="stat-label">Ideas Posted</div>
            </div>
          </div>
          <div className="dashboard-stat-card">
            <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <TrendingUp size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-value">{totalVotes}</div>
              <div className="stat-label">Total Votes</div>
            </div>
          </div>
          <div className="dashboard-stat-card">
            <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
              <Users size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-value">{totalCollaborators}</div>
              <div className="stat-label">Team Members</div>
            </div>
          </div>
          <div className="dashboard-stat-card">
            <div className="stat-icon" style={{ background: 'rgba(8, 145, 178, 0.1)', color: '#0891b2' }}>
              <MessageSquare size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-value">{totalComments}</div>
              <div className="stat-label">Total Comments</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="dashboard-tabs">
          <button className={`dashboard-tab ${activeTab === 'my-ideas' ? 'active' : ''}`} onClick={() => setActiveTab('my-ideas')}>
            My Ideas ({myIdeas.length})
          </button>
          <button className={`dashboard-tab ${activeTab === 'collaborating' ? 'active' : ''}`} onClick={() => setActiveTab('collaborating')}>
            Collaborating ({collaboratingIdeas.length})
          </button>
          <button className={`dashboard-tab ${activeTab === 'requests' ? 'active' : ''}`} onClick={() => setActiveTab('requests')}>
            Join Requests {pendingRequests.length > 0 && <span className="tab-badge">{pendingRequests.length}</span>}
          </button>
        </div>

        {/* Content */}
        <div className="dashboard-content">
          {/* ── My Ideas ── */}
          {activeTab === 'my-ideas' && (
            <div className="ideas-list">
              {myIdeas.length === 0 ? (
                <div className="dashboard-empty">
                  <Lightbulb size={48} />
                  <h3>No ideas yet</h3>
                  <p>Post your first idea and start building your team!</p>
                  <Link to="/post-idea" className="dashboard-new-idea-btn">Post an Idea</Link>
                </div>
              ) : (
                myIdeas.map(idea => {
                  const statusConfig = STATUS_CONFIG[idea.status];
                  return (
                    <div key={idea.id} className="dashboard-idea-card">
                      {/* Top row: title + actions */}
                      <div className="idea-card-top">
                        <div className="idea-card-info">
                          <Link to={`/ideas/${idea.id}`} className="idea-card-title">
                            {idea.title}
                            <ArrowUpRight size={16} />
                          </Link>
                          <p className="idea-card-desc">{idea.description?.slice(0, 140)}...</p>
                        </div>
                        <div className="idea-card-actions-group">
                          <div className="idea-card-status-badge" style={{ background: statusConfig.bg, color: statusConfig.color }}>
                            {statusConfig.label}
                          </div>
                          <button className="idea-action-btn edit-btn" title="Edit Idea" onClick={() => openEditModal(idea)}>
                            <Pencil size={15} />
                          </button>
                          <button className="idea-action-btn delete-btn" title="Delete Idea" onClick={() => setConfirmDelete(idea.id)}>
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>

                      {/* Delete Confirmation */}
                      {confirmDelete === idea.id && (
                        <div className="delete-confirm-banner">
                          <span>⚠️ Are you sure you want to delete <strong>{idea.title}</strong>? This cannot be undone.</span>
                          <div className="delete-confirm-actions">
                            <button className="btn-sm-danger" onClick={() => handleDeleteIdea(idea.id)}>Yes, Delete</button>
                            <button className="btn-sm-cancel" onClick={() => setConfirmDelete(null)}>Cancel</button>
                          </div>
                        </div>
                      )}

                      {/* Meta */}
                      <div className="idea-card-meta">
                        <div className="idea-meta-item"><TrendingUp size={14} /><span>{idea.votes} votes</span></div>
                        <div className="idea-meta-item"><Users size={14} /><span>{idea.collaborators.length}/{idea.teamSize} members</span></div>
                        <div className="idea-meta-item"><MessageSquare size={14} /><span>{idea.commentsCount} comments</span></div>
                        <div className="idea-meta-item"><Clock size={14} /><span>Updated {idea.updatedAt}</span></div>
                      </div>

                      {/* Skills */}
                      <div className="idea-card-skills">
                        {idea.skills.map((skill, i) => (
                          <span key={i} className="idea-skill-chip" style={{ color: SKILL_COLORS[skill], background: `${SKILL_COLORS[skill]}15` }}>
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Status Controls */}
                      <div className="idea-status-controls">
                        <span className="status-controls-label">Status:</span>
                        <div className="status-buttons">
                          {statusOrder.map(status => (
                            <button
                              key={status}
                              className={`status-btn ${idea.status === status ? 'active' : ''}`}
                              style={idea.status === status ? { background: STATUS_CONFIG[status].bg, color: STATUS_CONFIG[status].color, borderColor: STATUS_CONFIG[status].color } : {}}
                              onClick={() => updateIdeaStatus(idea.id, status)}
                            >
                              {STATUS_CONFIG[status].label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Team with remove */}
                      <div className="idea-card-team">
                        <span className="team-label">Team:</span>
                        <div className="team-members-row">
                          {idea.collaborators.map((collab, i) => (
                            <div key={i} className="team-member-chip">
                              <div className="team-member-avatar">{collab.initials}</div>
                              <span>{collab.name}</span>
                              {collab.id === idea.author.id ? (
                                <span className="founder-tag">Founder</span>
                              ) : (
                                <button
                                  className="remove-member-btn"
                                  title={`Remove ${collab.name}`}
                                  onClick={() => handleRemoveMember(idea.id, collab.id)}
                                >
                                  <UserMinus size={13} />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* ── Collaborating ── */}
          {activeTab === 'collaborating' && (
            <div className="ideas-list">
              {collaboratingIdeas.length === 0 ? (
                <div className="dashboard-empty">
                  <Users size={48} />
                  <h3>Not collaborating on any ideas yet</h3>
                  <p>Explore ideas and request to join teams!</p>
                  <Link to="/ideas" className="dashboard-new-idea-btn">Browse Ideas</Link>
                </div>
              ) : (
                collaboratingIdeas.map(idea => {
                  const statusConfig = STATUS_CONFIG[idea.status];
                  return (
                    <div key={idea.id} className="dashboard-idea-card">
                      <div className="idea-card-top">
                        <div className="idea-card-info">
                          <Link to={`/ideas/${idea.id}`} className="idea-card-title">
                            {idea.title} <ArrowUpRight size={16} />
                          </Link>
                          <p className="idea-card-desc">{idea.description?.slice(0, 120)}...</p>
                        </div>
                        <div className="idea-card-status-badge" style={{ background: statusConfig.bg, color: statusConfig.color }}>
                          {statusConfig.label}
                        </div>
                      </div>
                      <div className="idea-card-meta">
                        <div className="idea-meta-item"><Users size={14} /><span>Founded by {idea.author.name}</span></div>
                        <div className="idea-meta-item"><TrendingUp size={14} /><span>{idea.votes} votes</span></div>
                        <div className="idea-meta-item"><MessageSquare size={14} /><span>{idea.commentsCount} comments</span></div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* ── Join Requests ── */}
          {activeTab === 'requests' && (
            <div className="requests-list">
              {pendingRequests.length === 0 ? (
                <div className="dashboard-empty">
                  <CheckCircle2 size={48} />
                  <h3>No pending requests</h3>
                  <p>Join requests for your ideas will appear here.</p>
                </div>
              ) : (
                pendingRequests.map(req => {
                  const idea = ideas.find(i => i.id === req.ideaId);
                  return (
                    <div key={req.id} className="request-card">
                      <div className="request-card-top">
                        <div className="request-user">
                          <div className="request-avatar">{req.user.initials}</div>
                          <div>
                            <div className="request-user-name">{req.user.name}</div>
                            <div className="request-user-meta">{req.user.branch} · {req.user.year}</div>
                          </div>
                        </div>
                        <div className="request-idea-name">
                          For: <Link to={`/ideas/${req.ideaId}`}>{idea?.title}</Link>
                        </div>
                      </div>
                      {req.message && (
                        <div className="request-message">
                          <MessageSquare size={14} />
                          <p>"{req.message}"</p>
                        </div>
                      )}
                      <div className="request-skills">
                        {req.user.skills?.slice(0, 4).map((skill, i) => (
                          <span key={i} className="request-skill-chip" style={{ color: SKILL_COLORS[skill], background: `${SKILL_COLORS[skill]}15` }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="request-actions">
                        <button className="request-accept-btn" onClick={() => acceptRequest(req.id)}>
                          <CheckCircle2 size={16} /> Accept
                        </button>
                        <button className="request-decline-btn" onClick={() => rejectRequest(req.id)}>
                          <XCircle size={16} /> Decline
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Edit Idea Modal ── */}
      {editingIdea && (
        <div className="edit-modal-overlay" onClick={() => setEditingIdea(null)}>
          <div className="edit-modal" onClick={e => e.stopPropagation()}>
            <div className="edit-modal-header">
              <h2><Pencil size={20} /> Edit Idea</h2>
              <button className="edit-modal-close" onClick={() => setEditingIdea(null)}><X size={20} /></button>
            </div>
            <div className="edit-modal-body">
              <div className="form-group">
                <label className="form-label">Title</label>
                <input className="form-input" value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-textarea" rows={3} value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} />
              </div>
              <div className="edit-modal-two-col">
                <div className="form-group">
                  <label className="form-label">Problem</label>
                  <textarea className="form-textarea" rows={2} value={editForm.problem} onChange={e => setEditForm({ ...editForm, problem: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Solution</label>
                  <textarea className="form-textarea" rows={2} value={editForm.solution} onChange={e => setEditForm({ ...editForm, solution: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Team Size</label>
                <input className="form-input" type="number" min={1} max={20} value={editForm.teamSize} onChange={e => setEditForm({ ...editForm, teamSize: parseInt(e.target.value) || 1 })} />
              </div>
              <div className="form-group">
                <label className="form-label">Skills Needed</label>
                <div className="edit-skills-grid">
                  {SKILLS.slice(0, 20).map(skill => (
                    <button
                      key={skill}
                      type="button"
                      className={`edit-skill-btn ${editForm.skills?.includes(skill) ? 'selected' : ''}`}
                      style={editForm.skills?.includes(skill) ? { color: SKILL_COLORS[skill], borderColor: SKILL_COLORS[skill], background: `${SKILL_COLORS[skill]}12` } : {}}
                      onClick={() => toggleEditSkill(skill)}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="edit-modal-footer">
              <button className="btn btn-ghost" onClick={() => setEditingIdea(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleEditSave}>
                <Save size={16} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
