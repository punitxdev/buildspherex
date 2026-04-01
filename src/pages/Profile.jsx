import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Lightbulb, Users, Award, ExternalLink, LayoutDashboard } from 'lucide-react';
import SkillTag from '../components/SkillTag';
import IdeaCard from '../components/IdeaCard';
import { useApp } from '../context/AppContext';
import './Profile.css';

export default function Profile() {
  const { currentUser, ideas } = useApp();
  const [activeTab, setActiveTab] = useState('ideas');

  const myIdeas = ideas.filter(i => i.author.id === currentUser.id);
  const collaboratingOn = ideas.filter(i =>
    i.collaborators.some(c => c.id === currentUser.id) && i.author.id !== currentUser.id
  );

  const totalVotes = myIdeas.reduce((sum, i) => sum + i.votes, 0);

  return (
    <div className="profile-page page-container">
      <div className="container">
        <div className="profile-layout">
          {/* Profile Card */}
          <div className="profile-card glass-card animate-fade-in-up">
            <div className="profile-banner"></div>
            <div className="profile-info">
              <div className="profile-avatar">{currentUser.initials}</div>
              <h1 className="profile-name">{currentUser.name}</h1>
              <p className="profile-meta">
                <span><MapPin size={14} /> {currentUser.college}</span>
                <span><Calendar size={14} /> {currentUser.year} · {currentUser.branch}</span>
              </p>
              <p className="profile-bio">{currentUser.bio}</p>

              <div className="profile-skills">
                {currentUser.skills.map(skill => (
                  <SkillTag key={skill} skill={skill} />
                ))}
              </div>

              <div className="profile-stats-row">
                <div className="profile-stat">
                  <Lightbulb size={16} />
                  <span className="profile-stat-value">{myIdeas.length}</span>
                  <span className="profile-stat-label">Ideas</span>
                </div>
                <div className="profile-stat">
                  <Users size={16} />
                  <span className="profile-stat-value">{collaboratingOn.length}</span>
                  <span className="profile-stat-label">Collabs</span>
                </div>
                <div className="profile-stat">
                  <Award size={16} />
                  <span className="profile-stat-value">{totalVotes}</span>
                  <span className="profile-stat-label">Votes</span>
                </div>
              </div>

              <div className="profile-actions">
                <Link to="/dashboard" className="btn btn-primary" style={{ width: '100%' }}>
                  <LayoutDashboard size={14} /> Founder Dashboard
                </Link>
                <Link to="/edit-profile" className="btn btn-ghost" style={{ width: '100%', marginTop: 8 }}>
                  <ExternalLink size={14} /> Edit Profile
                </Link>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="profile-content">
            <div className="profile-tabs">
              <button
                className={`profile-tab ${activeTab === 'ideas' ? 'active' : ''}`}
                onClick={() => setActiveTab('ideas')}
              >
                <Lightbulb size={16} /> My Ideas ({myIdeas.length})
              </button>
              <button
                className={`profile-tab ${activeTab === 'collabs' ? 'active' : ''}`}
                onClick={() => setActiveTab('collabs')}
              >
                <Users size={16} /> Collaborating ({collaboratingOn.length})
              </button>
            </div>

            <div className="profile-ideas-list">
              {activeTab === 'ideas' && (
                <>
                  {myIdeas.map((idea, i) => (
                    <IdeaCard key={idea.id} idea={idea} index={i} />
                  ))}
                  {myIdeas.length === 0 && (
                    <div className="profile-empty">
                      <p>You haven't posted any ideas yet.</p>
                      <Link to="/post-idea" className="btn btn-primary">Post Your First Idea</Link>
                    </div>
                  )}
                </>
              )}
              {activeTab === 'collabs' && (
                <>
                  {collaboratingOn.map((idea, i) => (
                    <IdeaCard key={idea.id} idea={idea} index={i} />
                  ))}
                  {collaboratingOn.length === 0 && (
                    <div className="profile-empty">
                      <p>You're not collaborating on any ideas yet.</p>
                      <Link to="/ideas" className="btn btn-primary">Explore Ideas</Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
