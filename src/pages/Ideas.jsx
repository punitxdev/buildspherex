import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import IdeaCard from '../components/IdeaCard';
import { SKILLS, STATUS_CONFIG } from '../data/mockData';
import { useApp } from '../context/AppContext';
import './Ideas.css';

export default function Ideas() {
  const { ideas } = useApp();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('votes');
  const [filterSkill, setFilterSkill] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = ideas
    .filter(idea => {
      if (search && !idea.title.toLowerCase().includes(search.toLowerCase()) &&
          !idea.description.toLowerCase().includes(search.toLowerCase())) return false;
      if (filterSkill !== 'all' && !idea.skills.includes(filterSkill)) return false;
      if (filterStatus !== 'all' && idea.status !== filterStatus) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'votes') return b.votes - a.votes;
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'collaborators') return b.collaborators.length - a.collaborators.length;
      if (sortBy === 'comments') return b.commentsCount - a.commentsCount;
      return 0;
    });

  return (
    <div className="ideas-page page-container">
      <div className="container">
        <div className="ideas-header">
          <div>
            <h1 className="section-title">💡 Startup <span className="gradient-text">Ideas</span></h1>
            <p className="section-subtitle">Browse, vote, and join startup ideas from students across IITs</p>
          </div>
        </div>

        <div className="ideas-controls">
          <div className="ideas-search">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              className="form-input search-input"
              placeholder="Search ideas..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="ideas-sort">
            <select
              className="form-input ideas-sort-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="votes">Most Voted</option>
              <option value="newest">Newest</option>
              <option value="collaborators">Most Collaborators</option>
              <option value="comments">Most Discussed</option>
            </select>
          </div>

          <button
            className={`btn btn-secondary btn-sm filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={14} /> Filters
          </button>
        </div>

        {showFilters && (
          <div className="ideas-filters animate-slide-down">
            <div className="filter-group">
              <label className="filter-label">Skill</label>
              <select className="form-input filter-select" value={filterSkill} onChange={e => setFilterSkill(e.target.value)}>
                <option value="all">All Skills</option>
                {SKILLS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">Status</label>
              <select className="form-input filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                <option value="all">All Statuses</option>
                {Object.entries(STATUS_CONFIG).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => { setFilterSkill('all'); setFilterStatus('all'); }}>
              Clear Filters
            </button>
          </div>
        )}

        <p className="ideas-count">{filtered.length} idea{filtered.length !== 1 ? 's' : ''} found</p>

        <div className="ideas-list">
          {filtered.map((idea, i) => (
            <IdeaCard key={idea.id} idea={idea} index={i} />
          ))}
          {filtered.length === 0 && (
            <div className="ideas-empty">
              <p>No ideas match your filters. Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
