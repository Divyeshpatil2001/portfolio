import React, { useState, useEffect, useRef, useCallback } from 'react';
import { projects } from '../mock';
import { Search, X, ExternalLink, Github, ArrowUpRight, Zap, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import './Projects.css';

const PROJECT_TYPES = ['All', 'Company', 'Freelance', 'Key Project'];
const CATEGORIES = ['All', 'Web', 'Mobile', 'AI/ML', 'Backend', 'Automation'];

const typeColors = {
  Company:       { bg: 'rgba(99,102,241,0.15)',  color: '#a5b4fc', border: 'rgba(99,102,241,0.5)' },
  Freelance:     { bg: 'rgba(16,185,129,0.15)',  color: '#6ee7b7', border: 'rgba(16,185,129,0.5)' },
  'Key Project': { bg: 'rgba(245,158,11,0.15)',  color: '#fcd34d', border: 'rgba(245,158,11,0.5)' },
};

const categoryDotColors = {
  Web:        '#60a5fa',
  Mobile:     '#a78bfa',
  'AI/ML':    '#34d399',
  Backend:    '#fb923c',
  Automation: '#f472b6',
};

/* ─── Stat counts ─── */
const computeStats = () => ({
  total:      projects.length,
  company:    projects.filter(p => p.projectType === 'Company').length,
  freelance:  projects.filter(p => p.projectType === 'Freelance').length,
  keyProject: projects.filter(p => p.projectType === 'Key Project').length,
  appStore:   projects.filter(p => p.technologies.some(t => ['App Store','Google Play Store'].includes(t))).length,
  aiMl:       projects.filter(p => p.category === 'AI/ML').length,
});

/* ─── Animated counter ─── */
const Counter = ({ value }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;
    const step = Math.ceil(end / 20);
    const timer = setInterval(() => {
      start = Math.min(start + step, end);
      setDisplay(start);
      if (start >= end) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, [value]);
  return <>{display}</>;
};

/* ─── Individual project row ─── */
const ProjectRow = ({ project, index, onClick, isActive }) => {
  const typeStyle = typeColors[project.projectType] || typeColors['Key Project'];
  const dotColor  = categoryDotColors[project.category] || '#00FFD1';

  return (
    <motion.div
      className={`project-row ${isActive ? 'active' : ''}`}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.38, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onClick(project)}
      layout
    >
      {/* Index number */}
      <span className="row-index">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Main info */}
      <div className="row-main">
        <div className="row-title-line">
          <h3 className="row-title">{project.title}</h3>
          <div className="row-badges">
            <span
              className="row-type-badge"
              style={{ background: typeStyle.bg, color: typeStyle.color, borderColor: typeStyle.border }}
            >
              {project.projectType}
            </span>
            <span className="row-year">{project.year}</span>
          </div>
        </div>
        <p className="row-desc">{project.shortDesc}</p>
      </div>

      {/* Tech + category */}
      <div className="row-meta">
        <span className="row-category" style={{ '--dot': dotColor }}>
          {project.category}
        </span>
        <div className="row-techs">
          {project.technologies.slice(0, 3).map((t, i) => (
            <span key={i} className="row-tech">{t}</span>
          ))}
          {project.technologies.length > 3 && (
            <span className="row-tech muted">+{project.technologies.length - 3}</span>
          )}
        </div>
      </div>

      {/* Arrow */}
      <span className="row-arrow">
        <ArrowUpRight size={18} />
      </span>

      {/* Hover accent line */}
      <div className="row-accent-line" />
    </motion.div>
  );
};

/* ─── Side drawer ─── */
const ProjectDrawer = ({ project, onClose }) => {
  const drawerRef = useRef(null);
  const typeStyle = typeColors[project.projectType] || typeColors['Key Project'];

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // stop wheel/touchmove events bubbling to parent (prevents parent scroll when reaching drawer boundaries)
  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;
    const handler = (e) => {
      e.stopPropagation();
    };
    drawer.addEventListener('wheel', handler, { passive: false });
    drawer.addEventListener('touchmove', handler, { passive: false });
    return () => {
      drawer.removeEventListener('wheel', handler);
      drawer.removeEventListener('touchmove', handler);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="drawer-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.aside
          ref={drawerRef}
          className="project-drawer"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Close */}
          <motion.button
            className="drawer-close"
            onClick={onClose}
            whileHover={{ rotate: 90, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={20} />
          </motion.button>

          {/* Header */}
          <div className="drawer-header">
            <div className="drawer-badges">
              <span
                className="drawer-type-badge"
                style={{ background: typeStyle.bg, color: typeStyle.color, borderColor: typeStyle.border }}
              >
                {project.projectType}
              </span>
              <span className="drawer-category-badge">{project.category}</span>
              <span className="drawer-year">{project.year}</span>
            </div>
            <h2 className="drawer-title">{project.title}</h2>
            <p className="drawer-subtitle">{project.shortDesc}</p>
          </div>

          {/* Body */}
          <div className="drawer-body">

            {/* Impact */}
            {project.impact && project.impact.length > 0 && (
              <div className="drawer-section">
                <div className="drawer-section-label">
                  <Zap size={14} />
                  Impact
                </div>
                <ul className="drawer-impact-list">
                  {project.impact.map((item, i) => (
                    <li key={i} className="drawer-impact-item">{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Description */}
            <div className="drawer-section">
              <div className="drawer-section-label">Overview</div>
              <p className="drawer-text">{project.description}</p>
            </div>

            {/* Challenge */}
            <div className="drawer-section">
              <div className="drawer-section-label">Challenge</div>
              <p className="drawer-text">{project.challenge}</p>
            </div>

            {/* Stack */}
            <div className="drawer-section">
              <div className="drawer-section-label">Tech Stack</div>
              <div className="drawer-tech-grid">
                {project.technologies.map((tech, i) => (
                  <motion.span
                    key={i}
                    className="drawer-tech-badge"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Links */}
            {(project.liveUrl || project.githubUrl) && (
              <div className="drawer-links">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="drawer-link live">
                    <ExternalLink size={15} />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="drawer-link github">
                    <Github size={15} />
                    Source Code
                  </a>
                )}
              </div>
            )}
          </div>
        </motion.aside>
      </motion.div>
    </AnimatePresence>
  );
};

/* ─── Main page ─── */
const Projects = () => {
  const [searchTerm,       setSearchTerm]       = useState('');
  const [selectedType,     setSelectedType]     = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject,  setSelectedProject]  = useState(null);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const pageRef = useRef(null);
  const stats   = computeStats();

  /* ── filter logic ── */
  useEffect(() => {
    let f = projects;
    if (selectedType !== 'All')     f = f.filter(p => p.projectType === selectedType);
    if (selectedCategory !== 'All') f = f.filter(p => p.category === selectedCategory);
    if (searchTerm)                 f = f.filter(p =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.technologies.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredProjects(f);
  }, [searchTerm, selectedType, selectedCategory]);

  const openProject  = useCallback(p => setSelectedProject(p), []);
  const closeProject = useCallback(() => setSelectedProject(null), []);

  return (
    <div className="projects-page" ref={pageRef}>

      {/* ── Hero header ── */}
      <div className="projects-hero">
        <motion.div
          className="projects-hero-text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="projects-eyebrow">Case Studies</span>
          <h1 className="projects-title">
            Projects
            <span className="projects-count-badge">
              <Counter value={stats.total} />
            </span>
          </h1>
          <p className="projects-subtitle">
            A curated collection of work spanning company builds, freelance
            clients, and personal ventures — across web, mobile, AI/ML, and backend systems.
          </p>
        </motion.div>

        {/* ── Stats bar ── */}
        <motion.div
          className="stats-bar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          {[
            { label: 'Company',     value: stats.company },
            { label: 'Freelance',   value: stats.freelance },
            { label: 'Key',         value: stats.keyProject },
            { label: 'App Releases',value: stats.appStore },
            { label: 'AI / ML',     value: stats.aiMl },
          ].map((s, i) => (
            <div key={i} className="stat-chip">
              <span className="stat-chip-value"><Counter value={s.value} /></span>
              <span className="stat-chip-label">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Unified filter bar ── */}
      <motion.div
        className="filter-bar"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        {/* Search */}
        <div className="filter-search">
          <Search size={16} className="filter-search-icon" />
          <input
            type="text"
            placeholder="Search projects…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="filter-search-input"
          />
          {searchTerm && (
            <button className="filter-search-clear" onClick={() => setSearchTerm('')}>
              <X size={14} />
            </button>
          )}
        </div>

        {/* Divider */}
        <div className="filter-divider" />

        {/* Type pills */}
        <div className="filter-pills">
          {PROJECT_TYPES.map(type => (
            <button
              key={type}
              className={`filter-pill ${selectedType === type ? 'active type' : ''}`}
              onClick={() => setSelectedType(type)}
            >
              {type}
              {type !== 'All' && (
                <span className="pill-count">
                  {projects.filter(p => p.projectType === type).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="filter-divider" />

        {/* Category pills */}
        <div className="filter-pills">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-pill ${selectedCategory === cat ? 'active cat' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Results label ── */}
      <motion.div
        className="results-label"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
      >
        Showing <strong>{filteredProjects.length}</strong> project{filteredProjects.length !== 1 ? 's' : ''}
      </motion.div>

      {/* ── Project list ── */}
      <div className="projects-index">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectRow
                key={project.id}
                project={project}
                index={index}
                onClick={openProject}
                isActive={selectedProject?.id === project.id}
              />
            ))
          ) : (
            <motion.div
              className="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className="no-results-icon">🔍</span>
              <p>No projects match your filters.</p>
              <button
                className="no-results-reset"
                onClick={() => { setSearchTerm(''); setSelectedType('All'); setSelectedCategory('All'); }}
              >
                Reset filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Side Drawer ── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDrawer project={selectedProject} onClose={closeProject} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
