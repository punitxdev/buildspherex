import { Link } from 'react-router-dom';
import { Rocket, Users, Lightbulb, Code, Trophy, ArrowRight, TrendingUp, MessageSquare, Zap } from 'lucide-react';
import IdeaCard from '../components/IdeaCard';
import { useApp } from '../context/AppContext';
import './Home.css';

export default function Home() {
  const { ideas } = useApp();
  const trendingIdeas = [...ideas].sort((a, b) => b.votes - a.votes).slice(0, 3);

  const stats = [
    { icon: <Lightbulb size={24} />, value: '120+', label: 'Startup Ideas', color: '#f59e0b' },
    { icon: <Users size={24} />, value: '500+', label: 'Students', color: '#3b82f6' },
    { icon: <Code size={24} />, value: '45+', label: 'Teams Formed', color: '#10b981' },
    { icon: <Trophy size={24} />, value: '12', label: 'MVPs Built', color: '#0284c7' },
  ];

  const features = [
    {
      icon: <Lightbulb size={28} />,
      title: 'Share Ideas',
      desc: 'Post your startup ideas with problem statements, solutions, and required skills. Get feedback from the community.',
      color: '#f59e0b',
    },
    {
      icon: <Users size={28} />,
      title: 'Find Co-founders',
      desc: 'Discover teammates based on complementary skills. Build balanced teams with AI/ML, design, business, and more.',
      color: '#3b82f6',
    },
    {
      icon: <Code size={28} />,
      title: 'Build MVPs',
      desc: 'Collaborate with your team, track progress, and build working prototypes that solve real problems.',
      color: '#10b981',
    },
    {
      icon: <Rocket size={28} />,
      title: 'Launch Startups',
      desc: 'Get mentorship, apply for incubation, and present your project. Turn college projects into real companies.',
      color: '#0284c7',
    },
  ];

  const steps = [
    { num: '01', title: 'Post Your Idea', desc: 'Share your startup idea with problem, solution, and skills needed.' },
    { num: '02', title: 'Build Your Team', desc: 'Students with matching skills join your project as collaborators.' },
    { num: '03', title: 'Collaborate & Build', desc: 'Work together to build an MVP. Track progress and iterate.' },
    { num: '04', title: 'Launch & Grow', desc: 'Present at demo days, get mentorship, and launch your startup.' },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content animate-fade-in-up">
            <div className="hero-badge">
              <Zap size={14} />
              <span>Innovation Network IIT Dharwad</span>
            </div>
            <h1 className="hero-title">
              Where Student Ideas <br />
              Become <span className="gradient-text">Real Startups</span>
            </h1>
            <p className="hero-subtitle">
              IIT Dharwad's innovation platform. Share startup ideas, find co-founders across 10 departments, 
              and build real products — backed by the dhaRti Foundation.
            </p>
            <div className="hero-actions">
              <Link to="/ideas" className="btn btn-primary btn-lg">
                <TrendingUp size={18} />
                Explore Ideas
              </Link>
              <Link to="/post-idea" className="btn btn-secondary btn-lg">
                <Lightbulb size={18} />
                Post Your Idea
              </Link>
            </div>
            <div className="hero-forum-link">
              <Link to="/forums" className="hero-forum-btn">
                <MessageSquare size={16} />
                Join the discussion — Inter-IIT Tech, Finance, Business & more
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="hero-visual animate-fade-in-up stagger-2">
            <div className="hero-orb orb-1"></div>
            <div className="hero-orb orb-2"></div>
            <div className="hero-orb orb-3"></div>
            <div className="hero-grid-pattern"></div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div key={i} className={`stat-card glass-card animate-fade-in-up stagger-${i + 1}`}>
                <div className="stat-icon" style={{ color: stat.color, background: `${stat.color}18` }}>
                  {stat.icon}
                </div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <h2 className="section-title">Everything You Need to <span className="gradient-text">Build & Launch</span></h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              BuildSphereX combines idea sharing, team formation, and collaboration — everything a student startup needs.
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, i) => (
              <div key={i} className={`feature-card glass-card animate-fade-in-up stagger-${i + 1}`}>
                <div className="feature-icon" style={{ color: feature.color, background: `${feature.color}15` }}>
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <h2 className="section-title">How It <span className="gradient-text">Works</span></h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>Four simple steps from idea to reality</p>
          </div>
          <div className="steps-grid">
            {steps.map((step, i) => (
              <div key={i} className={`step-card animate-fade-in-up stagger-${i + 1}`}>
                <div className="step-number">{step.num}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
                {i < steps.length - 1 && <div className="step-connector"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Ideas */}
      <section className="trending-section">
        <div className="container">
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 className="section-title">🔥 Trending <span className="gradient-text">Ideas</span></h2>
              <p className="section-subtitle">The most voted startup ideas from the community</p>
            </div>
            <Link to="/ideas" className="btn btn-secondary">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="trending-grid">
            {trendingIdeas.map((idea, i) => (
              <IdeaCard key={idea.id} idea={idea} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card glass-card animate-fade-in-up">
            <div className="cta-content">
              <h2 className="cta-title">Ready to Build the <span className="gradient-text">Next Big Thing?</span></h2>
              <p className="cta-desc">Join 1,075+ students at IIT Dharwad who are turning their startup ideas into reality. Backed by the dhaRti Foundation and BioNEST Incubation Centre.</p>
              <div className="cta-actions">
                <Link to="/post-idea" className="btn btn-primary btn-lg">
                  <Rocket size={18} />
                  Post Your Idea Now
                </Link>
                <Link to="/forums" className="btn btn-secondary btn-lg">
                  Join the Forums
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
