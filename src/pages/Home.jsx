import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, ArrowUpRight, MapPin, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import SkillsOrbit from '../components/OrbitalSkills';
import { stats, projects, timeline } from '../mock';
import './Home.css';

/* ── Animated number counter ── */
const AnimCounter = ({ target, suffix = '' }) => {
  const ref = useRef(null);
  useEffect(() => {
    let start = 0;
    const end = parseFloat(target);
    const step = end / 40;
    const timer = setInterval(() => {
      start = Math.min(start + step, end);
      if (ref.current) ref.current.textContent = Number.isInteger(end) ? Math.round(start) + suffix : start.toFixed(1) + suffix;
      if (start >= end) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [target, suffix]);
  return <span ref={ref}>0{suffix}</span>;
};

const Home = () => {
  const heroRef = useRef(null);

  const featuredProjects = projects.filter(p => p.featured);
  const recentJourney    = timeline.slice(-3);

  return (
    <div className="home-page">

      {/* ════════════════════════════════
          HERO — dark split layout
      ════════════════════════════════ */}
      <section className="hero" ref={heroRef}>

        {/* Ambient glow blobs */}
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />

        {/* Left — text content */}
        <div className="hero-left">

          {/* Availability badge */}
          <motion.div
            className="hero-avail"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="avail-dot" />
            Available for work
            <span className="avail-sep" />
            <MapPin size={12} />
            India
          </motion.div>

          {/* Role */}
          <motion.p
            className="hero-role"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.28 }}
          >
            Full Stack Software Engineer
          </motion.p>

          {/* Name */}
          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            Divyesh<br />
            <span className="hero-name-accent">Patil</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.52 }}
          >
            Building scalable web, mobile &amp; AI products — from company
            backends to App Store launches.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            <Link to="/projects" className="hero-btn primary">
              View Work <ArrowUpRight size={16} />
            </Link>
            <button
              className="hero-btn ghost"
              onClick={() => {
                const a = document.createElement('a');
                a.href = '/resume.pdf';
                a.download = 'Divyesh_Patil_Resume.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              }}
            >
              <Download size={15} />
              Download CV
            </button>
          </motion.div>

          {/* Stat strip */}
          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.82 }}
          >
            {[
              { value: '15', suffix: '+', label: 'Projects' },
              { value: '2',  suffix: '+', label: 'Yrs Exp' },
              { value: '8',  suffix: '.3', label: 'CGPA' },
            ].map((s, i) => (
              <div key={i} className="hero-stat-item">
                <span className="hero-stat-value">
                  <AnimCounter target={s.value} suffix={s.suffix} />
                </span>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — styled photo card */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 48, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Decorative ring */}
          <div className="hero-ring hero-ring-outer" />
          <div className="hero-ring hero-ring-inner" />

          {/* Photo frame */}
          <div className="hero-photo-frame">
            <img
              src="/divyesh_image.jpeg"
              alt="Divyesh Patil"
              className="hero-photo"
            />
            {/* Teal gradient overlay at bottom */}
            <div className="hero-photo-overlay" />
          </div>

          {/* Floating badge — experience */}
          <motion.div
            className="hero-float-badge"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="float-badge-icon">⚡</span>
            <div>
              <div className="float-badge-title">2+ Years</div>
              <div className="float-badge-sub">Professional Experience</div>
            </div>
          </motion.div>

          {/* Floating badge — stack */}
          <motion.div
            className="hero-float-badge hero-float-badge-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <span className="float-badge-icon">🚀</span>
            <div>
              <div className="float-badge-title">React · Python · AI</div>
              <div className="float-badge-sub">Core Stack</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="scroll-cue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <div className="scroll-line" />
          <span>Scroll</span>
        </motion.div>
      </section>

      {/* ════════════════════════════════
          ABOUT — inline, horizontal
      ════════════════════════════════ */}
      <section className="about-strip">
        <div className="about-strip-inner">
          <motion.div
            className="about-label"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Briefcase size={14} />
            About
          </motion.div>
          <motion.p
            className="about-body"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            I'm a Full Stack Engineer who has built and shipped production apps across
            <strong> web, mobile, and AI/ML</strong> — from crypto payment gateways and
            agentic AI platforms to App Store mobile apps and Dockerized automation bots.
            I care deeply about clean architecture, performance, and the user experience.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
          >
            <Link to="/journey" className="about-link">
              My journey <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════
          SKILLS ORBIT
      ════════════════════════════════ */}
      <section className="skills-section">
        <div className="section-eyebrow">Technical Skills</div>
        <h2 className="section-heading">Stack &amp; Expertise</h2>
        <SkillsOrbit />
      </section>

      {/* ════════════════════════════════
          FEATURED PROJECTS — bento grid
      ════════════════════════════════ */}
      <section className="featured-section">
        <div className="featured-header">
          <div>
            <div className="section-eyebrow">Selected Work</div>
            <h2 className="section-heading">Featured Projects</h2>
          </div>
          <Link to="/projects" className="see-all-link">
            See all {projects.length} projects <ArrowRight size={14} />
          </Link>
        </div>

        <div className="bento-grid">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`bento-card ${index === 0 ? 'bento-large' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
            >
              <div className="bento-top">
                <span className="bento-cat">{project.category}</span>
                <span className="bento-type">{project.projectType}</span>
              </div>
              <h3 className="bento-title">{project.title}</h3>
              <p className="bento-desc">{project.shortDesc}</p>
              {project.impact && (
                <ul className="bento-impacts">
                  {project.impact.slice(0, 2).map((imp, i) => (
                    <li key={i}>{imp}</li>
                  ))}
                </ul>
              )}
              <div className="bento-techs">
                {project.technologies.slice(0, 4).map((t, i) => (
                  <span key={i} className="bento-tech">{t}</span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="bento-tech muted">+{project.technologies.length - 4}</span>
                )}
              </div>
              <div className="bento-arrow">
                <Link to="/projects" aria-label="View project">
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════
          JOURNEY PREVIEW
      ════════════════════════════════ */}
      <section className="journey-section">
        <div className="journey-header">
          <div className="section-eyebrow">Experience</div>
          <h2 className="section-heading">My Journey</h2>
        </div>

        <div className="journey-list">
          {recentJourney.map((item, index) => (
            <motion.div
              key={item.id}
              className={`journey-item ${item.current ? 'current' : ''}`}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="journey-year">{item.year}</div>
              <div className="journey-line-wrap">
                <div className={`journey-dot ${item.current ? 'active' : ''}`} />
                <div className="journey-connector" />
              </div>
              <div className="journey-info">
                <h3 className="journey-title">{item.title}</h3>
                <p className="journey-desc">{item.description}</p>
                {item.current && <span className="journey-badge">Current</span>}
              </div>
            </motion.div>
          ))}
        </div>

        <Link to="/journey" className="journey-more">
          Full timeline <ArrowRight size={14} />
        </Link>
      </section>

      {/* ════════════════════════════════
          HIRE ME CTA
      ════════════════════════════════ */}
      <section className="cta-section">
        <motion.div
          className="cta-inner"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <div className="cta-avail">
            <span className="avail-dot" />
            Open to opportunities
          </div>
          <h2 className="cta-heading">Let's build something great together</h2>
          <p className="cta-sub">
            Whether it's a full-stack app, an AI integration, or a mobile product —
            I'm ready to collaborate.
          </p>
          <div className="cta-actions">
            <Link to="/contact" className="hero-btn primary">
              Get in touch <ArrowUpRight size={16} />
            </Link>
            <a
              href="https://github.com/Divyeshpatil2001"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn ghost"
            >
              GitHub Profile <ArrowUpRight size={14} />
            </a>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default Home;
