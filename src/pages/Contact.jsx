import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { contactInfo } from '../mock';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      access_key: import.meta.env.VITE_APP_WEB3FORMS_ACCESS_KEY,
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });

        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Network error. Try later.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1 className="page-title">Get In Touch</h1>
        <p className="page-subtitle">
          Have a project in mind or want to collaborate? I'd love to hear from you.
        </p>
      </div>

      <div className="contact-content">
        <motion.div 
          className="contact-info-section"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="info-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <h2 className="info-title">Contact Information</h2>
            <div className="info-items">
              <motion.a 
                href={`mailto:${contactInfo.email}`} 
                className="info-item"
                whileHover={{ x: 5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Mail size={24} className="info-icon" />
                <div>
                  <p className="info-label">Email</p>
                  <p className="info-value">{contactInfo.email}</p>
                </div>
              </motion.a>

              <motion.a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="info-item"
                whileHover={{ x: 5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Github size={24} className="info-icon" />
                <div>
                  <p className="info-label">GitHub</p>
                  <p className="info-value">Divyesh Patil</p>
                </div>
              </motion.a>

              <motion.a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="info-item"
                whileHover={{ x: 5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Linkedin size={24} className="info-icon" />
                <div>
                  <p className="info-label">LinkedIn</p>
                  <p className="info-value">Divyesh Patil</p>
                </div>
              </motion.a>
            </div>
          </motion.div>

          <motion.div 
            className="info-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <h3 className="quick-info-title">Quick Overview</h3>
            <div className="quick-info-items">
              <motion.div 
                className="quick-info-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <p className="quick-info-label">Experience</p>
                <p className="quick-info-value">{contactInfo.experience}</p>
              </motion.div>
              <motion.div 
                className="quick-info-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <p className="quick-info-label">Specialization</p>
                <p className="quick-info-value">{contactInfo.specialization}</p>
              </motion.div>
              <motion.div 
                className="quick-info-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <p className="quick-info-label">Availability</p>
                <p className="quick-info-value">{contactInfo.availability}</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="contact-form-section"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <form className="contact-form" onSubmit={handleSubmit}>
            <motion.div 
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <label htmlFor="name" className="form-label">Name</label>
              <motion.input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
                whileFocus={{ scale: 1.02, borderColor: 'rgba(0, 255, 209, 0.6)' }}
              />
            </motion.div>

            <motion.div 
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <label htmlFor="email" className="form-label">Email</label>
              <motion.input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
                whileFocus={{ scale: 1.02, borderColor: 'rgba(0, 255, 209, 0.6)' }}
              />
            </motion.div>

            <motion.div 
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <label htmlFor="subject" className="form-label">Subject</label>
              <motion.input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="form-input"
                required
                whileFocus={{ scale: 1.02, borderColor: 'rgba(0, 255, 209, 0.6)' }}
              />
            </motion.div>

            <motion.div 
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <label htmlFor="message" className="form-label">Message</label>
              <motion.textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                rows="6"
                required
                whileFocus={{ scale: 1.02, borderColor: 'rgba(0, 255, 209, 0.6)' }}
              />
            </motion.div>

            <motion.button
              type="submit"
              className={`submit-btn ${isSubmitting ? 'submitting' : ''} ${isSubmitted ? 'submitted' : ''}`}
              disabled={isSubmitting || isSubmitted}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitted ? (
                <>
                  <CheckCircle size={20} />
                  <span>Message Sent!</span>
                </>
              ) : isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Send Message</span>
                </>
              )}
            </motion.button>

            <p className="form-footer">
              🚀 Messages are sent directly to my inbox - no email client needed!
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
