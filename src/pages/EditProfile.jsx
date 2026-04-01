import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Save, X, User, Briefcase, GraduationCap,
  MapPin, FileText, Wrench, CheckCircle
} from 'lucide-react';
import { SKILLS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import './EditProfile.css';

const SKILL_CATEGORIES = {
  'Development': [
    'Backend Developer', 'Frontend Developer', 'Full Stack Developer',
    'AI / ML Engineer', 'Data Scientist', 'Mobile App Developer',
    'UI / UX Designer', 'DevOps Engineer', 'Cybersecurity Engineer',
    'Embedded Systems Developer'
  ],
  'Business & Strategy': [
    'Product Manager', 'Business Strategist', 'Market Research Analyst',
    'Financial Analyst', 'Growth Strategist', 'Startup Pitch Creator',
    'Investor Relations Manager'
  ],
  'Design & Creative': [
    'Graphic Designer', 'Brand Designer', 'Logo Designer',
    'Video Editor', 'Motion Graphics Designer', 'Content Creator',
    'UI Illustrator'
  ],
  'Research': [
    'Technology Researcher', 'AI Research Assistant',
    'Product Experimentation Lead', 'Competitive Analysis Researcher',
    'Patent Researcher'
  ],
  'Community & Outreach': [
    'Community Manager', 'Startup Evangelist', 'Social Media Manager',
    'Event Organizer', 'Partnership Manager', 'Campus Ambassador',
    'Documentation Lead'
  ]
};

export default function EditProfile() {
  const navigate = useNavigate();
  const { currentUser, updateProfile } = useApp();
  const [showToast, setShowToast] = useState(false);

  const [form, setForm] = useState({
    name: currentUser.name,
    college: currentUser.college,
    year: currentUser.year,
    branch: currentUser.branch,
    bio: currentUser.bio,
    skills: [...currentUser.skills],
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

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
    if (!form.name.trim() || !form.college.trim()) return;

    updateProfile({
      name: form.name.trim(),
      college: form.college.trim(),
      year: form.year.trim(),
      branch: form.branch.trim(),
      bio: form.bio.trim(),
      skills: form.skills,
      initials: form.name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2),
    });

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate('/profile');
    }, 2000);
  };

  const hasChanges = () => {
    return (
      form.name !== currentUser.name ||
      form.college !== currentUser.college ||
      form.year !== currentUser.year ||
      form.branch !== currentUser.branch ||
      form.bio !== currentUser.bio ||
      JSON.stringify(form.skills.sort()) !== JSON.stringify([...currentUser.skills].sort())
    );
  };

  return (
    <div className="edit-profile-page page-container">
      <div className="container">
        <div className="ep-layout">
          {/* Header */}
          <div className="ep-header">
            <Link to="/profile" className="ep-back-link">
              <ArrowLeft size={18} />
              Back to Profile
            </Link>
          </div>

          <div className="section-header">
            <h1 className="section-title">
              ✏️ Edit <span className="gradient-text">Profile</span>
            </h1>
            <p className="section-subtitle">Update your personal info, bio, and skills.</p>
          </div>

          {/* Form Card */}
          <form className="ep-card glass-card" onSubmit={handleSubmit}>
            {/* Avatar preview */}
            <div className="ep-avatar-section">
              <div className="ep-avatar">
                {form.name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '??'}
              </div>
              <div className="ep-avatar-name">{form.name || 'Your Name'}</div>
              <div className="ep-avatar-role">{form.year} · {form.branch}</div>
            </div>

            <div className="ep-form">
              {/* Personal Info */}
              <div>
                <h3 className="ep-section-title">
                  <User size={16} />
                  Personal Information
                </h3>
                <div className="ep-form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Arjun Mehta"
                      value={form.name}
                      onChange={e => handleChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">College / Institution *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. IIT Dharwad"
                      value={form.college}
                      onChange={e => handleChange('college', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Academic Info */}
              <div>
                <h3 className="ep-section-title">
                  <GraduationCap size={16} />
                  Academic Details
                </h3>
                <div className="ep-form-row">
                  <div className="form-group">
                    <label className="form-label">Year</label>
                    <select
                      className="form-input form-select"
                      value={form.year}
                      onChange={e => handleChange('year', e.target.value)}
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="5th Year">5th Year (Dual Degree)</option>
                      <option value="M.Tech">M.Tech</option>
                      <option value="PhD">PhD</option>
                      <option value="Alumni">Alumni</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Branch / Department</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Computer Science"
                      value={form.branch}
                      onChange={e => handleChange('branch', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <hr className="ep-section-divider" />

              {/* Bio */}
              <div>
                <h3 className="ep-section-title">
                  <FileText size={16} />
                  Bio
                </h3>
                <div className="form-group">
                  <label className="form-label">Tell the community about yourself</label>
                  <textarea
                    className="form-textarea"
                    placeholder="I'm passionate about building startups, love hacking on AI projects, and am always looking for co-founders..."
                    value={form.bio}
                    onChange={e => handleChange('bio', e.target.value)}
                    maxLength={500}
                    rows={4}
                  />
                  <div className="ep-bio-counter">
                    {form.bio.length}/500
                  </div>
                </div>
              </div>

              <hr className="ep-section-divider" />

              {/* Skills */}
              <div className="ep-skills-section">
                <h3 className="ep-section-title">
                  <Wrench size={16} />
                  Skills & Roles
                  <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500, marginLeft: 'auto' }}>
                    {form.skills.length} selected
                  </span>
                </h3>

                {Object.entries(SKILL_CATEGORIES).map(([category, skills]) => (
                  <div key={category} className="ep-skills-category">
                    <div className="ep-skills-cat-title">{category}</div>
                    <div className="ep-skills-grid">
                      {skills.map(skill => (
                        <button
                          key={skill}
                          type="button"
                          className={`ep-skill-btn ${form.skills.includes(skill) ? 'selected' : ''}`}
                          onClick={() => toggleSkill(skill)}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="ep-actions">
                <Link to="/profile" className="btn btn-secondary">
                  <X size={16} />
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={!form.name.trim() || !form.college.trim() || !hasChanges()}
                >
                  <Save size={16} />
                  Save Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="ep-toast">
          <CheckCircle size={18} />
          Profile updated successfully!
        </div>
      )}
    </div>
  );
}
