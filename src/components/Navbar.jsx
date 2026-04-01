import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket, Plus, LogIn, UserPlus, Sun, Moon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Navbar.css';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { currentUser, logout, theme, toggleTheme } = useApp();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/forums', label: 'Forums' },
    { path: '/ideas', label: 'Ideas' },
  ];

  if (currentUser) {
    navLinks.push({ path: '/profile', label: 'Profile' });
  }

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">
          <div className="navbar-logo">
            <Rocket size={22} />
          </div>
          <span className="navbar-title">Build<span className="gradient-text">SphereX</span></span>
        </Link>

        <div className="navbar-right" style={{ display: 'flex', alignItems: 'center' }}>
          <div className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
            {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar-link ${isActive(link.path) ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          
          {currentUser ? (
            <>
              <Link to="/post-idea" className="btn btn-primary btn-sm navbar-cta" onClick={() => setMobileOpen(false)}>
                <Plus size={16} />
                Post Idea
              </Link>
              <button onClick={() => { logout(); setMobileOpen(false); }} className="navbar-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                Logout
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Link to="/login" className="navbar-link" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => setMobileOpen(false)}>
                <LogIn size={16} /> Log In
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm navbar-cta" onClick={() => setMobileOpen(false)}>
                <UserPlus size={16} /> Sign Up
              </Link>
            </div>
          )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '16px' }}>
            <button 
              onClick={toggleTheme} 
            className="btn-ghost btn-icon" 
            aria-label="Toggle theme"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

            <button className="navbar-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
