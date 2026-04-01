import { Link } from 'react-router-dom';
import {
  GraduationCap, Rocket, Users, Lightbulb,
  BookOpen, Quote, ArrowRight, Zap,
  Globe, Award, Building, Sparkles,
  Target, Heart, ChevronRight, Cpu
} from 'lucide-react';
import './About.css';

export default function About() {
  const departments = [
    { abbr: 'CSE', name: 'Computer Science & Engg', color: '#0891b2' },
    { abbr: 'EECE', name: 'Electrical, Electronics & Comm', color: '#3b82f6' },
    { abbr: 'MMAE', name: 'Mechanical, Materials & Aero', color: '#10b981' },
    { abbr: 'CIE', name: 'Civil & Infrastructure', color: '#f59e0b' },
    { abbr: 'BSB', name: 'Biosciences & Bioengineering', color: '#8b5cf6' },
    { abbr: 'MATH', name: 'Mathematics', color: '#0e7490' },
    { abbr: 'PHY', name: 'Physics', color: '#14b8a6' },
    { abbr: 'CHEM', name: 'Chemistry', color: '#f97316' },
    { abbr: 'HEART', name: 'Humanities, Education & Arts', color: '#ef4444' },
    { abbr: 'LIB', name: 'Liberal Arts & Sciences', color: '#64748b' },
  ];

  const pillars = [
    {
      icon: <Lightbulb size={28} />,
      label: '01',
      title: 'Ideate',
      desc: 'Post your startup idea with problem statement, solution, and skills needed. Get feedback from 1,075+ students across 11 departments.',
      color: '#f59e0b',
    },
    {
      icon: <Users size={28} />,
      label: '02',
      title: 'Team Up',
      desc: 'Find co-founders across CSE, EECE, MMAE, Biosciences, and more. Skill-based matching connects the right people.',
      color: '#3b82f6',
    },
    {
      icon: <Cpu size={28} />,
      label: '03',
      title: 'Build',
      desc: 'Collaborate with your team. Track progress from Concept → Building → MVP. Ship real products, not just pitch decks.',
      color: '#10b981',
    },
    {
      icon: <Rocket size={28} />,
      label: '04',
      title: 'Launch',
      desc: 'Get incubated at the dhaRti Foundation or BioNEST. Present at E-Summit. Turn your campus project into a real company.',
      color: '#0284c7',
    },
  ];

  const milestones = [
    { year: '2016', event: 'IIT Dharwad Founded', detail: '23rd IIT, mentored by IIT Bombay' },
    { year: '2022', event: 'dhaRti Foundation', detail: 'Tech incubator established on campus' },
    { year: '2024', event: 'Permanent Campus', detail: '470-acre campus at Chikkamalligawad' },
    { year: '2025', event: 'BioNEST Centre', detail: 'BIRAC-backed biotech incubator opens' },
    { year: '2026', event: 'BuildSphereX', detail: 'Innovation network goes live' },
  ];

  return (
    <div className="about-v3">

      {/* ═══ CINEMATIC HERO ═══ */}
      <section className="about-hero-v3">
        <div className="hero-v3-backdrop"></div>
        <div className="hero-v3-grid-lines"></div>
        <div className="container">
          <div className="hero-v3-inner">
            <div className="hero-v3-eyebrow">
              <span className="eyebrow-dot"></span>
              BuildSphereX – Innovation Network IIT Dharwad
            </div>
            <h1 className="hero-v3-title">
              Where Ideas<br />
              Become <span>Startups</span>
            </h1>
            <p className="hero-v3-sub">
              The IIT Dharwad innovation platform. 1,075+ students. 10 departments.
              One mission — turn every bold idea into a real product.
            </p>
            <div className="hero-v3-ctas">
              <Link to="/post-idea" className="cta-primary-v3">
                Start Building <ArrowRight size={18} />
              </Link>
              <Link to="/ideas" className="cta-outline-v3">
                Explore Ideas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LIVE NUMBERS ═══ */}
      <section className="about-numbers-v3">
        <div className="container">
          <div className="numbers-grid-v3">
            <div className="number-cell">
              <div className="number-value-v3">1,075<span>+</span></div>
              <div className="number-label-v3">Students</div>
            </div>
            <div className="number-divider"></div>
            <div className="number-cell">
              <div className="number-value-v3">10</div>
              <div className="number-label-v3">Departments</div>
            </div>
            <div className="number-divider"></div>
            <div className="number-cell">
              <div className="number-value-v3">73<span>+</span></div>
              <div className="number-label-v3">Faculty</div>
            </div>
            <div className="number-divider"></div>
            <div className="number-cell">
              <div className="number-value-v3">470</div>
              <div className="number-label-v3">Acres</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ORIGIN STORY — Split Screen ═══ */}
      <section className="about-origin-v3">
        <div className="container">
          <div className="origin-split">
            <div className="origin-left">
              <span className="section-label-v3">The Origin</span>
              <h2>It started with a<br />hostel-room<br />frustration.</h2>
            </div>
            <div className="origin-right">
              <p className="origin-lead">
                Late 2024. IIT Dharwad's permanent campus at Chikkamalligawad.
                Four students, four ideas, zero teammates.
              </p>
              <p>
                The CSE student couldn't find a designer. The MMAE student couldn't
                find a coder. The Engineering Physics student had a quantum computing
                idea but no one to build it. The Biosciences researcher had an ML idea but no one
                who cared. <strong>Sound familiar?</strong>
              </p>
              <p>
                They built the platform they wished existed — where every IIT Dharwad
                student can share ideas, find co-founders, and build something that
                actually ships. Backed by the <strong>dhaRti Foundation</strong> and
                the <strong>BioNEST Incubation Centre</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS — Pillar Cards ═══ */}
      <section className="about-pillars-v3">
        <div className="container">
          <div className="pillars-header">
            <span className="section-label-v3">How It Works</span>
            <h2>From Notebook Sketch to Working Product</h2>
          </div>
          <div className="pillars-grid">
            {pillars.map((p, i) => (
              <div key={i} className="pillar-card" style={{ '--pillar-color': p.color }}>
                <div className="pillar-number">{p.label}</div>
                <div className="pillar-icon-wrap">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DEPARTMENTS MOSAIC ═══ */}
      <section className="about-depts-v3">
        <div className="container">
          <div className="depts-header">
            <span className="section-label-v3">Our Ecosystem</span>
            <h2>10 Departments. One Platform.</h2>
            <p>Co-founders don't have to come from the same branch. The best teams are cross-disciplinary.</p>
          </div>
          <div className="depts-mosaic">
            {departments.map((dept, i) => (
              <div key={i} className="dept-tile" style={{ '--dept-color': dept.color }}>
                <div className="dept-abbr">{dept.abbr}</div>
                <div className="dept-name">{dept.name}</div>
              </div>
            ))}
          </div>
          <div className="depts-footnote">
            <GraduationCap size={16} />
            <span>Indian Institute of Technology, Dharwad · Est. 2016 · Mentored by IIT Bombay</span>
          </div>
        </div>
      </section>

      {/* ═══ INCUBATION SPOTLIGHT ═══ */}
      <section className="about-incubation-v3">
        <div className="container">
          <div className="incubation-grid">
            <div className="incubation-card card-dharti">
              <Building size={32} />
              <h3>dhaRti Foundation</h3>
              <p>
                The Dharwad Research & Technology Incubator. Mentorship, seed funding,
                lab access, IP support, and a direct path from campus idea to market.
              </p>
              <span className="incubation-tag">Technology Incubator</span>
            </div>
            <div className="incubation-card card-bionest">
              <Sparkles size={32} />
              <h3>BioNEST Centre</h3>
              <p>
                BIRAC-backed incubation for biotech, healthcare, and life sciences.
                World-class facilities for student founders solving grassroots problems.
              </p>
              <span className="incubation-tag">Biotech & Healthcare</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ QUOTE STRIP ═══ */}
      <section className="about-quote-v3">
        <div className="container">
          <div className="quote-v3-inner">
            <Quote size={40} className="quote-v3-icon" />
            <blockquote>
              "BuildSphereX was born from a simple belief — every student at IIT Dharwad
              has an idea worth building. We created this platform so you never have to
              build alone. Welcome aboard. Let's turn your ideas into reality."
            </blockquote>
            <div className="quote-v3-cite">
              <strong>Punit Kumar</strong>
              <span>Engineering Physics, IIT Dharwad</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE — Horizontal ═══ */}
      <section className="about-timeline-v3">
        <div className="container">
          <div className="timeline-v3-header">
            <span className="section-label-v3">The Journey</span>
            <h2>From a Young IIT to a Startup Ecosystem</h2>
          </div>
          <div className="timeline-v3-track">
            {milestones.map((m, i) => (
              <div key={i} className="timeline-v3-node">
                <div className="timeline-v3-dot"></div>
                <div className="timeline-v3-year">{m.year}</div>
                <div className="timeline-v3-event">{m.event}</div>
                <div className="timeline-v3-detail">{m.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VALUES — Compact ═══ */}
      <section className="about-values-v3">
        <div className="container">
          <div className="values-v3-row">
            <div className="value-v3-item">
              <span className="value-v3-emoji">🔥</span>
              <h4>Relentless Curiosity</h4>
              <p>Every great startup begins with "what if?"</p>
            </div>
            <div className="value-v3-item">
              <span className="value-v3-emoji">💪</span>
              <h4>Build Together</h4>
              <p>Solo founders fail. Teams win.</p>
            </div>
            <div className="value-v3-item">
              <span className="value-v3-emoji">🎯</span>
              <h4>Ship, Don't Stall</h4>
              <p>Done beats perfect. Celebrate launches.</p>
            </div>
            <div className="value-v3-item">
              <span className="value-v3-emoji">🌱</span>
              <h4>Real Impact</h4>
              <p>Solve problems for Dharwad and beyond.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="about-cta-v3">
        <div className="container">
          <div className="cta-v3-inner">
            <h2>Stop Dreaming.<br />Start <span>Building</span>.</h2>
            <div className="cta-v3-btns">
              <Link to="/post-idea" className="cta-primary-v3 cta-lg">
                Post Your Idea <ArrowRight size={20} />
              </Link>
              <Link to="/forums" className="cta-outline-v3 cta-lg">
                Join Forums
              </Link>
            </div>
            <p className="cta-v3-stamp">
              BuildSphereX – Innovation Network IIT Dharwad · Chikkamalligawad, Karnataka
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
