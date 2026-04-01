import { Link } from 'react-router-dom';
import { Rocket, Github, Twitter, Linkedin, Heart } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo-row">
              <div className="footer-logo">
                <Rocket size={18} />
              </div>
              <span className="footer-title">Build<span className="gradient-text">SphereX</span></span>
            </div>
            <p className="footer-desc">Innovation Network IIT Dharwad — Where student ideas become real startups.</p>
            <div className="footer-socials">
              <a href="#" className="footer-social-link" aria-label="GitHub"><Github size={18} /></a>
              <a href="#" className="footer-social-link" aria-label="Twitter"><Twitter size={18} /></a>
              <a href="#" className="footer-social-link" aria-label="LinkedIn"><Linkedin size={18} /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Platform</h4>
            <Link to="/about" className="footer-link">About</Link>
            <Link to="/ideas" className="footer-link">Explore Ideas</Link>
            <Link to="/forums" className="footer-link">Forums</Link>
            <Link to="/post-idea" className="footer-link">Post an Idea</Link>
            <Link to="/profile" className="footer-link">Your Profile</Link>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Forums</h4>
            <Link to="/forums?cat=tech" className="footer-link">Inter-IIT Tech</Link>
            <Link to="/forums?cat=finance" className="footer-link">Finance</Link>
            <Link to="/forums?cat=business" className="footer-link">Business</Link>
            <Link to="/forums?cat=ideas" className="footer-link">Startup Ideas</Link>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Resources</h4>
            <a href="#" className="footer-link">Getting Started</a>
            <a href="#" className="footer-link">Community Guidelines</a>
            <a href="#" className="footer-link">FAQ</a>
            <a href="#" className="footer-link">Contact Us</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 BuildSphereX – Innovation Network IIT Dharwad. Made with <Heart size={14} className="footer-heart" /> at Chikkamalligawad.</p>
        </div>
      </div>
    </footer>
  );
}
