import React, { useEffect } from 'react';
import { timeline } from '../mock';
import { Star, GraduationCap, Briefcase, Code, Rocket, School } from 'lucide-react';
import { motion } from 'framer-motion';
import './Journey.css';

const Journey = () => {
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

    const elements = document.querySelectorAll('.timeline-card');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const getIcon = (iconName) => {
    const icons = {
      star: <Star size={24} />,
      graduation: <GraduationCap size={24} />,
      school: <School size={24} />,
      briefcase: <Briefcase size={24} />,
      code: <Code size={24} />,
      rocket: <Rocket size={24} />,
    };
    return icons[iconName] || <Star size={24} />;
  };

  return (
    <div className="journey-page">
      <div className="journey-header">
        <h1 className="page-title">My Journey</h1>
        <p className="page-subtitle">
          From curiosity to expertise - a timeline of growth, learning, and achievements
        </p>
      </div>

      <div className="timeline-container">
        {timeline.map((item, index) => (
          <motion.div
            key={item.id}
            className={`timeline-card ${item.current ? 'current' : ''}`}
            initial={{ opacity: 0, x: -50, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ x: 10, rotateY: 5, z: 20 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div 
              className="timeline-icon"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              {getIcon(item.icon)}
            </motion.div>
            <motion.div 
              className="timeline-card-content"
              whileHover={{ scale: 1.02 }}
            >
              <span className="timeline-card-year">{item.year}</span>
              <h3 className="timeline-card-title">{item.title}</h3>
              <p className="timeline-card-description">{item.description}</p>
              {item.current && (
                <motion.span 
                  className="current-badge"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.3, type: "spring" }}
                  whileHover={{ scale: 1.1 }}
                >
                  Current
                </motion.span>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="journey-footer">
        <div className="footer-card">
          <h2 className="footer-title">Current Status</h2>
          <p className="footer-text">
            2 years of experience as a Full Stack Developer, passionate about creating
            innovative solutions that combine technical excellence with user-centric design.
            Continuously learning and exploring new technologies to stay at the forefront
            of web development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Journey;
