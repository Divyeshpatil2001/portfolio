import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import SkillsOrbit from '../components/OrbitalSkills';
import { stats, projects, timeline } from '../mock';
import './Home.css';

const Home = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-up');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const featuredProjects = projects.filter((p) => p.featured);
  const recentJourney = timeline.slice(-3);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-content">
          <motion.div 
            className="hero-text fade-up"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.p 
              className="hero-greeting"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Hi, I'm
            </motion.p>
            <motion.h1 
              className="hero-name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Divyesh Patil
            </motion.h1>
            <motion.p 
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Full Stack Software Engineer with experience building scalable web and
              mobile applications using modern technologies.
            </motion.p>
            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/projects" className="btn-primary">
                  <span>View My Work</span>
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button 
                  className="btn-secondary"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/resume.pdf';
                    link.download = 'Divyesh_Patil_Resume.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  <Download size={20} />
                  <span>Download CV</span>
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div 
            className="hero-visual fade-up"
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="hero-image-container">
              <motion.img 
                src="/divyesh_image.jpeg" 
                alt="Divyesh Patil" 
                className="hero-image"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <div className="hero-image-glow"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section fade-up">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="stat-card" 
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -8 }}
            >
              <motion.h3 
                className="stat-value"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: "spring" }}
              >
                {stat.value}
              </motion.h3>
              <p className="stat-label">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Technical Skills Section */}
      <section className="skills-section fade-up">
        <div className="section-header">
          <Sparkles size={32} className="section-icon" />
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">Drag to rotate • Scroll to spin • Hover for details</p>
        </div>
        <SkillsOrbit />
      </section>

      {/* About Me Section */}
      <section className="about-section fade-up">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-title">About Me</h2>
            <p className="about-description">
              I'm a passionate Full Stack Software Engineer creating innovative digital
              solutions that make a difference. With a strong foundation in both frontend
              and backend technologies, I bring ideas to life through clean, efficient code.
            </p>
            <p className="about-description">
              I specialize in building scalable web applications using Python, Django,
              FastAPI, React, and React Native. My experience spans across the entire
              development lifecycle, from initial concept to deployment and maintenance.
            </p>
            <p className="about-description">
              What sets me apart is my ability to work across the entire development stack,
              combining technical expertise with a deep understanding of user needs to deliver
              exceptional digital experiences.
            </p>
          </div>
          <div className="about-visual">
            <div className="gradient-blob"></div>
          </div>
        </div>
      </section>

      {/* Journey Preview */}
      <section className="journey-preview fade-up">
        <h2 className="section-title">My Journey</h2>
        <div className="timeline-preview">
          {recentJourney.map((item, index) => (
            <div key={item.id} className="timeline-item" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <span className="timeline-year">{item.year}</span>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <Link to="/journey" className="btn-secondary view-more-btn">
          <span>View Full Journey</span>
          <ArrowRight size={20} />
        </Link>
      </section>

      {/* Featured Projects */}
      <section className="featured-projects fade-up">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Featured Projects
        </motion.h2>
        <div className="projects-grid">
          {featuredProjects.map((project, index) => (
            <motion.div 
              key={project.id} 
              className="project-card" 
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -12, rotateY: 5, z: 50 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="project-header">
                <span className="project-category">{project.category}</span>
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.shortDesc}</p>
              <div className="project-tech">
                {project.technologies.slice(0, 3).map((tech, i) => (
                  <motion.span 
                    key={i} 
                    className="tech-tag"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + i * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/projects" className="btn-primary view-more-btn">
            <span>View All Projects</span>
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
