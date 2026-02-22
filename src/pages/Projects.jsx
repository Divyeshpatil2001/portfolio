import React, { useState, useEffect } from 'react';
import { projects } from '../mock';
import { Search, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Projects.css';

const PROJECT_TYPES = ['All', 'Company', 'Freelance', 'Key Project'];

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const categories = ['All', ...new Set(projects.map((p) => p.category))];

  useEffect(() => {
    let filtered = projects;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (selectedType !== 'All') {
      filtered = filtered.filter((p) => p.projectType === selectedType);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProjects(filtered);
  }, [searchTerm, selectedCategory, selectedType]);

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

    const elements = document.querySelectorAll('.project-item');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [filteredProjects]);

  const typeColors = {
    Company: { bg: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: 'rgba(99,102,241,0.4)' },
    Freelance: { bg: 'rgba(16,185,129,0.15)', color: '#6ee7b7', border: 'rgba(16,185,129,0.4)' },
    'Key Project': { bg: 'rgba(245,158,11,0.15)', color: '#fcd34d', border: 'rgba(245,158,11,0.4)' },
  };

  return (
    <div className="projects-page">
      <div className="projects-header">
        <h1 className="page-title">Projects</h1>
        <p className="page-subtitle">
          A collection of my work across company builds, freelance clients, and personal learning — spanning web, mobile, AI/ML, and backend systems
        </p>
      </div>

      {/* Type tabs */}
      <div className="type-filter-tabs">
        {PROJECT_TYPES.map((type) => (
          <button
            key={type}
            className={`type-tab ${selectedType === type ? 'active' : ''}`}
            onClick={() => setSelectedType(type)}
          >
            {type}
            <span className="type-tab-count">
              {type === 'All' ? projects.length : projects.filter((p) => p.projectType === type).length}
            </span>
          </button>
        ))}
      </div>

      <div className="projects-controls">
        <div className="search-box">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search projects, tech, keywords…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>
              <X size={18} />
            </button>
          )}
        </div>

        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="projects-count">
        Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
      </div>

      <div className="projects-list">
        <AnimatePresence mode="wait">
          {filteredProjects.map((project, index) => {
            const typeStyle = typeColors[project.projectType] || typeColors['Key Project'];
            return (
              <motion.div
                key={project.id}
                className="project-item"
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -50, rotateX: 15 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -12, rotateY: 5, z: 50 }}
                onClick={() => setSelectedProject(project)}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="project-item-header">
                  <span className="project-item-category">{project.category}</span>
                  <span
                    className="project-type-badge"
                    style={{
                      background: typeStyle.bg,
                      color: typeStyle.color,
                      border: `1px solid ${typeStyle.border}`,
                    }}
                  >
                    {project.projectType}
                  </span>
                </div>
                <h3 className="project-item-title">{project.title}</h3>
                <p className="project-item-description">{project.shortDesc}</p>
                <div className="project-item-tech">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <motion.span
                      key={i}
                      className="tech-badge"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 + i * 0.05 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {project.technologies.length > 4 && (
                    <motion.span
                      className="tech-badge"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      +{project.technologies.length - 4}
                    </motion.span>
                  )}
                </div>
                <motion.button
                  className="view-details-btn"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>View Details</span>
                  <ExternalLink size={16} />
                </motion.button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredProjects.length === 0 && (
        <div className="no-results">
          <p>No projects found matching your criteria</p>
        </div>
      )}

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-modal"
            onClick={() => setSelectedProject(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.4, type: 'spring' }}
            >
              <motion.button
                className="modal-close"
                onClick={() => setSelectedProject(null)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </motion.button>

              <div className="modal-header">
                <div className="modal-header-badges">
                  <span className="modal-category">{selectedProject.category}</span>
                  {selectedProject.projectType && (
                    <span
                      className="project-type-badge"
                      style={{
                        background: (typeColors[selectedProject.projectType] || typeColors['Key Project']).bg,
                        color: (typeColors[selectedProject.projectType] || typeColors['Key Project']).color,
                        border: `1px solid ${(typeColors[selectedProject.projectType] || typeColors['Key Project']).border}`,
                      }}
                    >
                      {selectedProject.projectType}
                    </span>
                  )}
                </div>
                <h2 className="modal-title">{selectedProject.title}</h2>
              </div>

              <div className="modal-body">
                <div className="modal-section">
                  <h3 className="modal-section-title">Description</h3>
                  <p className="modal-text">{selectedProject.description}</p>
                </div>

                <div className="modal-section">
                  <h3 className="modal-section-title">Challenge</h3>
                  <p className="modal-text">{selectedProject.challenge}</p>
                </div>

                <div className="modal-section">
                  <h3 className="modal-section-title">Technologies Used</h3>
                  <div className="modal-tech-list">
                    {selectedProject.technologies.map((tech, i) => (
                      <span key={i} className="modal-tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
