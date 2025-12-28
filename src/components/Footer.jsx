import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      className="dark-footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="footer-content">
        <div className="footer-top">
          <motion.div 
            className="footer-brand"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="footer-logo">Divyesh Patil</h3>
            <p className="footer-tagline">Full Stack Software Engineer</p>
          </motion.div>

          <div className="footer-links">
            <motion.div 
              className="footer-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="footer-heading">Navigation</h4>
              <a href="/" className="footer-link">Home</a>
              <a href="/journey" className="footer-link">Journey</a>
              <a href="/projects" className="footer-link">Projects</a>
              <a href="/contact" className="footer-link">Contact</a>
            </motion.div>

            <motion.div 
              className="footer-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="footer-heading">Connect</h4>
              <motion.a 
                href="https://github.com/Divyeshpatil2001" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-link"
                whileHover={{ scale: 1.05, x: 5 }}
              >
                <Github size={16} />
                <span>GitHub</span>
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/divyesh-patil-96941b24b" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-link"
                whileHover={{ scale: 1.05, x: 5 }}
              >
                <Linkedin size={16} />
                <span>LinkedIn</span>
              </motion.a>
              <motion.a 
                href="mailto:patildivyesh861@gmail.com" 
                className="footer-link"
                whileHover={{ scale: 1.05, x: 5 }}
              >
                <Mail size={16} />
                <span>Email</span>
              </motion.a>
            </motion.div>
          </div>
        </div>

        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="footer-copyright">
            © {currentYear} Divyesh Patil. All rights reserved.
          </p>
          <p className="footer-built">
            Built with React & passion for innovation
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
