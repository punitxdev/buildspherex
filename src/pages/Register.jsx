import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { User, Mail, Lock, Book, GraduationCap, Briefcase, AlertCircle, ArrowRight } from 'lucide-react';
import { SKILLS } from '../data/mockData';
import './Login.css';

const ROLES = ['Student', 'Alumni', 'Faculty', 'Institute Staff', 'External', 'Investor'];

export default function Register() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', branch: '', year: '', role: '', skills: []
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register, currentUser } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate('/dashboard');
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password.length < 6) return setError('Password must be at least 6 characters');
    if (!formData.role) return setError('Please select your role');
    
    setLoading(true);
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  return (
    <div className="auth-page">
      <div className="auth-card wide">
        <div className="auth-header">
          <h2 className="auth-title">Join BuildSphereX</h2>
          <p className="auth-subtitle">Start building with IIT Dharwad's innovation network</p>
        </div>

        {error && (
          <div className="auth-error">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form notebook-style">
          <div className="notebook-left">
            <h3 className="notebook-section-title">1. Personal Details</h3>
            
            <div className="auth-field">
              <label className="auth-label">Full Name</label>
              <div className="auth-input-wrapper">
                <User size={18} className="auth-input-icon" />
                <input type="text" required className="auth-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Arjun Mehta" />
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-label">Email Address</label>
              <div className="auth-input-wrapper">
                <Mail size={18} className="auth-input-icon" />
                <input type="email" required className="auth-input" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="rollno@iitdh.ac.in" />
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-label">Password</label>
              <div className="auth-input-wrapper">
                <Lock size={18} className="auth-input-icon" />
                <input type="password" required minLength="6" className="auth-input" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder="At least 6 characters" />
              </div>
            </div>

            <div className="auth-row">
              <div className="auth-field">
                <label className="auth-label">Department / Branch</label>
                <div className="auth-input-wrapper">
                  <Book size={18} className="auth-input-icon" />
                  <input type="text" className="auth-input" value={formData.branch} onChange={e => setFormData({...formData, branch: e.target.value})} placeholder="e.g. CSE, EECE" />
                </div>
              </div>
              <div className="auth-field">
                <label className="auth-label">Year</label>
                <div className="auth-input-wrapper">
                  <GraduationCap size={18} className="auth-input-icon" />
                  <select className="auth-select" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})}>
                    <option value="">Select Year...</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Postgrad">Postgrad</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="notebook-divider"></div>

          <div className="notebook-right">
            <h3 className="notebook-section-title">2. Professional Profile</h3>

            <div className="auth-field">
              <label className="auth-label">I am a...</label>
              <div className="auth-role-grid">
                {ROLES.map(role => (
                  <button
                    type="button"
                    key={role}
                    onClick={() => setFormData({...formData, role})}
                    className={`auth-role-option ${formData.role === role ? 'selected' : ''}`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-label">Select Core Skills (3-4 max)</label>
              <div className="auth-skills-grid notebook-skills">
                {SKILLS.slice(0, 15).map(skill => (
                  <button type="button" key={skill} onClick={() => toggleSkill(skill)} className={`auth-skill-tag ${formData.skills.includes(skill) ? 'selected' : ''}`}>
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ flexGrow: 1 }}></div>

            <button type="submit" disabled={loading} className="auth-submit-btn notebook-submit">
              {loading ? 'Creating Account...' : 'Create Account'}
              {!loading && <ArrowRight size={18} />}
            </button>
          </div>
        </form>

        <p className="auth-footer-text">
          Already have an account? <Link to="/login" className="auth-footer-link">Log in</Link>
        </p>
      </div>
    </div>
  );
}
