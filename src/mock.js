// Mock data for portfolio website

export const projects = [
  {
    id: 1,
    title: "Face Shape Detection App",
    category: "AI/ML",
    shortDesc: "AI-powered face shape detection and analysis system",
    description: "Built an intelligent face shape detection application using machine learning algorithms to analyze facial features and provide personalized recommendations.",
    challenge: "Achieving high accuracy across diverse facial structures and lighting conditions while maintaining real-time performance.",
    technologies: ["Python", "TensorFlow", "OpenCV", "FastAPI", "React"],
    featured: true
  },
  {
    id: 2,
    title: "Trip Management App",
    category: "Mobile Development",
    shortDesc: "Complete travel planning and management solution",
    description: "Developed a comprehensive trip management application with itinerary planning, expense tracking, and collaborative features for group travel.",
    challenge: "Synchronizing data across multiple users in real-time while handling offline scenarios and conflict resolution.",
    technologies: ["React Native", "Node.js", "MongoDB", "Redux", "Socket.io"],
    featured: true
  },
  {
    id: 3,
    title: "Astrology Chatbot App",
    category: "AI/ML",
    shortDesc: "Interactive AI chatbot for astrological insights",
    description: "Created an intelligent chatbot that provides personalized astrological readings and insights using natural language processing and astronomical data.",
    challenge: "Training the model to provide accurate, context-aware responses while maintaining conversational flow and user engagement.",
    technologies: ["Python", "NLP", "Django", "React", "PostgreSQL"],
    featured: true
  },
  {
    id: 4,
    title: "E-commerce Platform",
    category: "Web Development",
    shortDesc: "Full-featured online shopping platform",
    description: "Built a scalable e-commerce platform with product management, payment integration, order tracking, and admin dashboard.",
    challenge: "Implementing secure payment processing and handling high-traffic scenarios during flash sales.",
    technologies: ["React", "Django", "PostgreSQL", "Redis", "Stripe"],
    featured: false
  },
  {
    id: 5,
    title: "Social Media Analytics Dashboard",
    category: "Web Development",
    shortDesc: "Real-time analytics and insights platform",
    description: "Developed a comprehensive analytics dashboard for tracking social media metrics, engagement, and performance across multiple platforms.",
    challenge: "Processing large volumes of data in real-time and presenting insights through interactive visualizations.",
    technologies: ["React", "FastAPI", "MongoDB", "D3.js", "WebSocket"],
    featured: false
  },
  {
    id: 6,
    title: "Task Automation Suite",
    category: "Automation",
    shortDesc: "Automated workflow management system",
    description: "Created a suite of automation tools for repetitive tasks including data processing, report generation, and notification systems.",
    challenge: "Designing flexible automation workflows that can be easily configured without coding knowledge.",
    technologies: ["Python", "Celery", "RabbitMQ", "React", "PostgreSQL"],
    featured: false
  },
  {
    id: 7,
    title: "Authentication Service",
    category: "Authentication",
    shortDesc: "Secure multi-factor authentication system",
    description: "Implemented a robust authentication service with JWT tokens, OAuth integration, and multi-factor authentication support.",
    challenge: "Balancing security requirements with user experience while preventing common vulnerabilities.",
    technologies: ["FastAPI", "JWT", "OAuth", "Redis", "PostgreSQL"],
    featured: false
  },
  {
    id: 8,
    title: "Real-time Collaboration Tool",
    category: "Web Development",
    shortDesc: "Collaborative document editing platform",
    description: "Built a real-time collaboration tool allowing multiple users to edit documents simultaneously with conflict resolution.",
    challenge: "Implementing operational transformation algorithms for concurrent editing without data loss.",
    technologies: ["React", "Node.js", "WebSocket", "MongoDB", "CRDTs"],
    featured: false
  },
  {
    id: 9,
    title: "API Gateway Service",
    category: "Integration",
    shortDesc: "Centralized API management and routing",
    description: "Designed and implemented an API gateway for microservices architecture with rate limiting, authentication, and load balancing.",
    challenge: "Ensuring low latency while adding multiple layers of processing and maintaining high availability.",
    technologies: ["Python", "FastAPI", "Redis", "Docker", "Kubernetes"],
    featured: false
  },
  {
    id: 10,
    title: "Database Migration Tool",
    category: "Database Design",
    shortDesc: "Automated database migration and versioning",
    description: "Created a tool for managing database schema migrations across different environments with rollback capabilities.",
    challenge: "Handling complex schema changes while ensuring zero-downtime migrations for production systems.",
    technologies: ["Python", "SQLAlchemy", "PostgreSQL", "Alembic"],
    featured: false
  }
];

export const timeline = [
  {
    id: 1,
    year: "2001",
    title: "Born",
    description: "November 26, 2001",
    icon: "star"
  },
  {
    id: 2,
    year: "2018",
    title: "10th Grade Completion",
    description: "Completed secondary education with strong foundation in mathematics and science",
    icon: "school"
  },
  {
    id: 3,
    year: "2020",
    title: "12th Grade Completion",
    description: "Completed higher secondary education, developed interest in computer science",
    icon: "school"
  },
  {
    id: 4,
    year: "2023",
    title: "Sales Manager",
    description: "Gained valuable experience in client communication and project management",
    icon: "briefcase"
  },
  {
    id: 5,
    year: "2024",
    title: "Bachelor's in Computer Engineering",
    description: "Graduated with CGPA 8.3, specialized in full-stack development and AI/ML",
    icon: "graduation"
  },
  {
    id: 6,
    year: "Jan 2024",
    title: "Internship Started",
    description: "Began professional journey as a software development intern",
    icon: "code"
  },
  {
    id: 7,
    year: "Aug 2024",
    title: "Software Developer",
    description: "Promoted to full-time Software Developer position, currently building scalable applications",
    icon: "rocket",
    current: true
  }
];

export const skills = [
  { name: "React", category: "frontend", level: "expert", icon: "⚛️", color: "#61DAFB", layer: 1 },
  { name: "JavaScript", category: "frontend", level: "expert", icon: "📜", color: "#F7DF1E", layer: 3 },
  { name: "HTML/CSS", category: "frontend", level: "expert", icon: "🎨", color: "#E34F26", layer: 2 },
  { name: "Python", category: "backend", level: "expert", icon: "🐍", color: "#3776AB", layer: 2 },
  { name: "Django", category: "backend", level: "expert", icon: "🎸", color: "#092E20", layer: 1 },
  { name: "FastAPI", category: "backend", level: "expert", icon: "⚡", color: "#009688", layer: 1 },
  { name: "React Native", category: "mobile", level: "advanced", icon: "📱", color: "#61DAFB", layer: 3 },
  { name: "PostgreSQL", category: "database", level: "advanced", icon: "🐘", color: "#336791", layer: 2 },
  { name: "MongoDB", category: "database", level: "advanced", icon: "🍃", color: "#47A248", layer: 3 },
  { name: "Git", category: "tools", level: "expert", icon: "🔀", color: "#F05032", layer: 2 },
  { name: "Docker", category: "tools", level: "advanced", icon: "🐳", color: "#2496ED", layer: 2 },
  { name: "AWS", category: "tools", level: "intermediate", icon: "☁️", color: "#FF9900", layer: 1 },
  { name: "REST API", category: "backend", level: "expert", icon: "🔌", color: "#FF6B6B", layer: 3 },
  { name: "Redis", category: "database", level: "intermediate", icon: "🔴", color: "#DC382D", layer: 1 },
  { name: "Node.js", category: "backend", level: "advanced", icon: "🟢", color: "#339933", layer: 2 },
  { name: "TypeScript", category: "frontend", level: "advanced", icon: "🔷", color: "#3178C6", layer: 2 }
];

export const stats = [
  { label: "Projects Completed", value: "10+" },
  { label: "Years Experience", value: "2" },
  { label: "CGPA Achieved", value: "8.3" }
];

export const contactInfo = {
  email: "patildivyesh861@gmail.com",
  github: "https://github.com/Divyeshpatil2001",
  linkedin: "https://www.linkedin.com/in/divyesh-patil-96941b24b",
  experience: "2 years",
  specialization: "Full Stack Development, AI/ML Integration",
  availability: "Open to opportunities"
};
