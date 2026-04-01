import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Eye, EyeOff } from 'lucide-react';
import SkillTag from '../components/SkillTag';
import { SKILLS, STATUS_CONFIG } from '../data/mockData';
import { useApp } from '../context/AppContext';
import './PostIdea.css';

export default function PostIdea() {
  const navigate = useNavigate();
  const { addIdea } = useApp();
  const [showPreview, setShowPreview] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    problem: '',
    solution: '',
    category: 'ideas',
    skills: [],
    teamSize: 4,
  });

  const toggleSkill = (skill) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.problem || !form.solution || form.skills.length === 0) return;
    addIdea(form);
    navigate('/ideas');
  };

  return (
    <div className="post-idea-page page-container">
      <div className="container">
        <div className="pi-layout">
          <div className="pi-form-side">
            <div className="section-header">
              <h1 className="section-title">🚀 Post Your <span className="gradient-text">Startup Idea</span></h1>
              <p className="section-subtitle">Share your vision with the community. Find co-founders and build together.</p>
            </div>

            <form className="pi-form glass-card" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Idea Title *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. AI Study Assistant for College Students"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Short Description</label>
                <textarea
                  className="form-textarea"
                  placeholder="A brief 1-2 sentence description of your startup idea..."
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="form-group">
                <label className="form-label">🔍 Problem Statement *</label>
                <textarea
                  className="form-textarea"
                  placeholder="What problem does this solve? Who faces this problem?"
                  value={form.problem}
                  onChange={e => setForm({ ...form, problem: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">💡 Proposed Solution *</label>
                <textarea
                  className="form-textarea"
                  placeholder="How does your idea solve the problem? What's unique about your approach?"
                  value={form.solution}
                  onChange={e => setForm({ ...form, solution: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">🛠 Required Skills * (select at least one)</label>
                <div className="pi-skills-grid">
                  {SKILLS.slice(0, 5).map(skill => (
                    <button
                      key={skill}
                      type="button"
                      className={`pi-skill-btn ${form.skills.includes(skill) ? 'selected' : ''}`}
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">👥 Team Size</label>
                <input
                  type="number"
                  className="form-input"
                  min={2}
                  max={10}
                  value={form.teamSize}
                  onChange={e => setForm({ ...form, teamSize: parseInt(e.target.value) || 4 })}
                />
              </div>

              <div className="pi-form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  {showPreview ? <><EyeOff size={16} /> Hide Preview</> : <><Eye size={16} /> Preview</>}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={!form.title || !form.problem || !form.solution || form.skills.length === 0}
                >
                  <Send size={16} /> Post Idea
                </button>
              </div>
            </form>
          </div>

          {showPreview && (
            <div className="pi-preview-side animate-fade-in">
              <h3 className="pi-preview-label">Preview</h3>
              <div className="pi-preview-card glass-card">
                <span className="idea-status-badge" style={{ color: STATUS_CONFIG.concept.color, background: STATUS_CONFIG.concept.bg }}>
                  Concept
                </span>
                <h2 className="pi-preview-title">{form.title || 'Your Idea Title'}</h2>
                <p className="pi-preview-desc">{form.description || 'Short description...'}</p>

                <h4 className="pi-preview-section-title">🔍 Problem</h4>
                <p className="pi-preview-text">{form.problem || '...'}</p>

                <h4 className="pi-preview-section-title">💡 Solution</h4>
                <p className="pi-preview-text">{form.solution || '...'}</p>

                {form.skills.length > 0 && (
                  <div className="pi-preview-skills">
                    {form.skills.map(skill => <SkillTag key={skill} skill={skill} small />)}
                  </div>
                )}
                <p className="pi-preview-team">👥 Team size: {form.teamSize}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
