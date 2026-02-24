// Mock data for portfolio website

export const projects = [
  // ──────────────── COMPANY PROJECTS ────────────────
  {
    id: 1,
    title: "Trip Management Mobile App",
    category: "Mobile",
    projectType: "Company",
    year: "2024",
    shortDesc: "Cross-platform travel app with complex navigation and back-stack management",
    description:
      "Developed a React Native application featuring a complex navigation architecture with nested stacks, tab navigators, and deep-link support. Implemented responsive layouts that adapt across iOS and Android screen sizes. Resolved critical back-stack bugs that were causing unexpected app exits, and shipped multiple updates to both Google Play Store and Apple App Store — resulting in measurable improvement in user retention metrics.",
    challenge:
      "Tracking down and fixing deeply nested back-stack navigation bugs in React Native, where OS-level back-button behavior differed significantly between Android and iOS, requiring platform-specific handling without duplicating business logic.",
    impact: [
      "Shipped to both Google Play Store & Apple App Store",
      "Improved user retention through back-stack bug resolution",
    ],
    technologies: ["React Native", "React Navigation", "Redux", "iOS", "Android", "Google Play Store", "App Store"],
    liveUrl: "",
    githubUrl: "",
    featured: true,
  },
  {
    id: 2,
    title: "FX Company Website Revamp",
    category: "Web",
    projectType: "Company",
    year: "2024",
    shortDesc: "High-performance website redesign with interactive map and 40% load-time improvement",
    description:
      "Led end-to-end redesign of an FX company's marketing website. Implemented an interactive map visualization with custom CSS markers and zoom controls to highlight global offices. Achieved a 40% performance improvement through WebP image conversion, CSS sprite techniques to reduce HTTP requests, and JavaScript minification. Translated Figma designs pixel-perfectly into dynamic modals, carousels, and interactive sliders.",
    challenge:
      "Balancing rich interactivity (custom map markers, animated sliders) with aggressive performance targets. Used sprite sheets and lazy-loading to keep Time-to-Interactive under budget without sacrificing the visual fidelity requested in the Figma designs.",
    impact: [
      "40% improvement in page load time",
      "Reduced HTTP requests via CSS sprites & WebP",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Figma", "WebP Optimization", "CSS Sprites", "JS Minification"],
    liveUrl: "",
    githubUrl: "",
    featured: false,
  },
  {
    id: 3,
    title: "Haveto Crypto Payment Gateway",
    category: "Backend",
    projectType: "Company",
    year: "2024",
    shortDesc: "Multi-currency crypto payment system with real-time webhook monitoring",
    description:
      "Architected a payment system migration from Copperx to Coinremitter, supporting Bitcoin, Ethereum, and Dogecoin transactions. Built a webhook infrastructure for real-time transaction monitoring that processes payment events and updates order states instantly. Integrated SendGrid to dispatch automated payment confirmation emails, and designed a UI that supports dual-gateway operations so the switch between providers is transparent to end users.",
    challenge:
      "Designing a webhook handler robust enough to handle out-of-order delivery and retries from the payment provider, while ensuring idempotency so no transaction was processed twice — critical for a financial application.",
    impact: [
      "Supports BTC, ETH & DOGE transactions in real-time",
      "Idempotent webhook system prevents double-processing",
    ],
    technologies: ["Node.js", "Coinremitter API", "Webhook", "SendGrid", "React", "PostgreSQL", "Bitcoin", "Ethereum", "Dogecoin"],
    liveUrl: "",
    githubUrl: "",
    featured: false,
  },
  {
    id: 4,
    title: "Valunova Medical Sales System",
    category: "Backend",
    projectType: "Company",
    year: "2024",
    shortDesc: "Enterprise medical distribution platform with multi-level commissions and ERD documentation",
    description:
      "Designed the complete database architecture for an enterprise medical distribution system managing complex relationships between device owners, distributors, and sales representatives. Implemented invoice generation, real-time inventory tracking, detailed sales reporting, and a multi-level commission calculation engine. Delivered comprehensive ERD documentation to support future development and onboarding.",
    challenge:
      "Modeling the multi-tier commission structure in the database so that commissions cascade correctly through owner → distributor → rep hierarchies, while keeping report queries performant on large sales datasets.",
    impact: [
      "End-to-end ERD & commission engine for enterprise scale",
      "Real-time inventory tracking with automated invoicing",
    ],
    technologies: ["PostgreSQL", "Django", "REST API", "ERD Design", "React", "Invoice Generation", "Inventory Tracking"],
    liveUrl: "",
    githubUrl: "",
    featured: false,
  },
  {
    id: 5,
    title: "Ski-Lift Status Bot (Japan)",
    category: "Automation",
    projectType: "Company",
    year: "2024",
    shortDesc: "Dockerized monitoring bot scraping 5 Japanese ski resorts with AI-powered notifications",
    description:
      "Built a fully automated monitoring system that scrapes ski-lift status data from 5 Japanese resort websites every 15–20 minutes using Dockerized Python. Implemented intelligent change-detection algorithms that identify meaningful status changes (open/closed/partial). Integrated the Telegram Bot API combined with OpenAI to generate contextual, human-friendly notifications about lift conditions rather than raw data dumps.",
    challenge:
      "Parsing Japanese-language resort pages with inconsistent HTML structures, handling encoding issues, and ensuring the change-detection logic accurately filtered noise (momentary glitches) from genuine lift status changes.",
    impact: [
      "Monitors 5 Japanese resorts every 15–20 minutes autonomously",
      "AI-generated contextual Telegram notifications vs. raw data",
    ],
    technologies: ["Python", "Docker", "BeautifulSoup", "Telegram Bot API", "OpenAI API", "Cron", "Web Scraping"],
    liveUrl: "",
    githubUrl: "",
    featured: false,
  },
  {
    id: 6,
    title: "Astrology Chatbot App",
    category: "Mobile",
    projectType: "Company",
    year: "2024",
    shortDesc: "Cross-platform AI astrology app with Chat, Remedies, Compatibility Analysis screens",
    description:
      "Developed a cross-platform mobile application with a conversational AI core, featuring four distinct screens: Chat, Remedies, Compatibility Analysis, and Tutorial. Built a Laravel backend with clean MVC architecture, including database design and RESTful API routing. Published on both the Apple App Store and Google Play Store, receiving positive user reviews for the intuitive chat experience.",
    challenge:
      "Designing the AI conversation flow to feel personalized and astrologically coherent, while keeping API response times fast enough for a real-time chat UX. Implemented streaming responses and skeleton loaders to maintain perceived performance.",
    impact: [
      "Live on Apple App Store & Google Play Store",
      "Positive user reviews for intuitive AI chat experience",
    ],
    technologies: ["React Native", "Laravel", "PHP", "MySQL", "OpenAI API", "MVC Architecture", "iOS", "Android"],
    liveUrl: "",
    githubUrl: "",
    featured: false,
  },
  {
    id: 7,
    title: "BPMN Diagram Generator",
    category: "AI/ML",
    projectType: "Company",
    year: "2025",
    shortDesc: "AI app converting text/audio to BPMN diagrams via WebSocket with Docker multi-tenant deployment",
    description:
      "Engineered an AI-powered application that converts natural language text (up to 200 words) or recorded audio (up to 2 minutes, WebM format) into formal BPMN XML diagrams. Implemented a WebSocket pipeline for real-time text processing. Integrated OpenAI Whisper for accurate speech-to-text transcription and an LLM for BPMN XML generation. Deployed with Docker Compose using tenant-level security for secure multi-user operations.",
    challenge:
      "Ensuring the LLM consistently generated valid, renderable BPMN XML — a structured format with strict schema requirements — even when user descriptions were ambiguous or incomplete. Built retry logic and schema validation into the pipeline.",
    impact: [
      "Text or audio → valid BPMN diagram in under 30 seconds",
      "Multi-tenant Docker deployment with tenant-level security",
    ],
    technologies: ["Python", "FastAPI", "WebSocket", "OpenAI Whisper", "OpenAI GPT", "Docker", "Docker Compose", "React", "BPMN"],
    liveUrl: "",
    githubUrl: "",
    featured: true,
  },
  {
    id: 8,
    title: "Face Shape Detection App",
    category: "AI/ML",
    projectType: "Company",
    year: "2024",
    shortDesc: "Full-stack AI app with AWS S3 hair suggestions, camera capture, and EC2 deployment",
    description:
      "Built a full-stack AI application for face shape detection using FastAPI backend and React frontend. Implemented drag-and-drop image upload and live camera capture. Integrated AWS S3 for storing personalized hair style suggestions with presigned URLs for secure client-side delivery. Deployed on AWS EC2 with an RDS database. Includes accuracy reporting, recommendation sections, a blog, and compliance pages.",
    challenge:
      "Achieving reliable face detection accuracy across diverse lighting conditions and skin tones, while keeping the S3 presigned URL flow secure — ensuring suggestions are only visible to the user who requested them.",
    impact: [
      "Deployed on AWS EC2 + RDS with S3 presigned URL security",
      "Real-time camera capture for live detection",
    ],
    technologies: ["Python", "FastAPI", "React", "AWS S3", "AWS EC2", "AWS RDS", "OpenCV", "TensorFlow", "PostgreSQL"],
    liveUrl: "",
    githubUrl: "",
    featured: true,
  },
  {
    id: 9,
    title: "Biomedical Agentic AI Platform",
    category: "AI/ML",
    projectType: "Company",
    year: "2025",
    shortDesc: "Domain-restricted biomedical research platform with RBAC, multi-LLM routing, and multi-tenant orgs",
    description:
      "Built a domain-restricted biomedical research platform integrating the open-source Biomni agent with Open WebUI. Implemented hybrid multi-LLM routing using local Ollama (Qwen3 14B) and external Claude APIs with SSE streaming responses. Designed RBAC onboarding with OTP verification and automated biomedical intent validation using web research (DDGS + Playwright + LLM scoring) with risk-based auto-approval workflows. Developed a multi-tenant organization system with invite flows, quota controls, and an admin monitoring dashboard. Deployed a modular Docker-based architecture for secure multi-agent AI orchestration.",
    challenge:
      "Building a reliable biomedical intent validation pipeline that accurately distinguishes legitimate research queries from off-topic requests, minimizing false positives that would block real researchers while blocking misuse.",
    impact: [
      "Multi-LLM routing: Ollama (local) + Claude API with SSE streaming",
      "RBAC + OTP + biomedical intent validation with auto-approval",
    ],
    technologies: ["Python", "FastAPI", "Open WebUI", "Ollama", "Claude API", "Docker", "RBAC", "SSE", "Playwright", "PostgreSQL"],
    liveUrl: "",
    githubUrl: "",
    featured: true,
  },

  // ──────────────── FREELANCE PROJECTS ────────────────
  {
    id: 10,
    title: "Nose Shape Detection App",
    category: "AI/ML",
    projectType: "Freelance",
    year: "2024",
    shortDesc: "AI web app classifying 12 nose shapes with 5 analytical parameters and live camera capture",
    description:
      "Developed an AI-powered web application that classifies 12 nose shape categories using five analytical parameters: bridge width, flatness, tip rotation, tip shape, and alar flare. Implemented dual image input modes — drag-and-drop uploader and live camera capture — using a FastAPI backend for inference. Includes educational content sections, privacy policy pages, and regulatory guideline documentation for aesthetic analysis use cases.",
    challenge:
      "Training and tuning a multi-class classifier across 12 fine-grained nose categories with limited labeled data, while ensuring the five analytical parameters were extracted consistently regardless of head pose or image lighting.",
    impact: [
      "Classifies 12 nose categories with 5 analytical parameters",
      "Dual input: drag-and-drop + live camera capture",
    ],
    technologies: ["Python", "FastAPI", "React", "TensorFlow", "OpenCV", "Camera API", "CSS"],
    liveUrl: "",
    githubUrl: "",
    featured: false,
  },

  // ──────────────── KEY / LEARNING PROJECTS ────────────────
  {
    id: 11,
    title: "Cine AI – Movie Recommendation Platform",
    category: "Web",
    projectType: "Key Project",
    year: "2023",
    shortDesc: "AI movie recommendations with TMDB API, Firebase auth, Redux memoization, and social sharing",
    description:
      "Built an AI-powered movie recommendation engine integrating the TMDB API for comprehensive movie listings with trailer autoplay. Implemented Firebase authentication for user accounts. Used Redux memoization to cache API responses and minimize redundant TMDB calls. Recommendations are generated using the OpenAI API (GPT-4o-mini) with user-provided API keys to keep processing serverless and cost-free. Added multi-language TMDB search and Open Graph social sharing meta tags.",
    challenge:
      "Designing a recommendation prompt that produces genuinely personalized suggestions based on a user's watch history and preferences, while working within the context-window limits of GPT-4o-mini for large watch lists.",
    impact: [
      "Serverless AI recommendations via user's own OpenAI keys",
      "Redux memoization eliminates redundant TMDB API calls",
    ],
    technologies: ["React", "Redux", "Firebase", "TMDB API", "OpenAI API", "Open Graph", "JavaScript"],
    liveUrl: "",
    githubUrl: "https://github.com/Divyeshpatil2001",
    featured: false,
  },
  {
    id: 12,
    title: "Authentication System",
    category: "Web",
    projectType: "Key Project",
    year: "2023",
    shortDesc: "Full auth framework: OTP, password reset, Google/GitHub OAuth, JWT with secure refresh",
    description:
      "Built a comprehensive authentication framework covering email/password registration, OTP email verification, password reset flow, and dual OAuth integration (Google and GitHub). Implemented JWT token management with a secure refresh token rotation strategy to keep sessions alive without compromising security. Delivered a responsive UI with thorough error handling and validation messages across all authentication methods.",
    challenge:
      "Implementing secure refresh token rotation without race conditions — ensuring that when multiple requests arrive simultaneously with an expired access token, only one refresh happens and the rest queue correctly rather than causing 401 loops.",
    impact: [
      "Covers email OTP, OAuth (Google + GitHub), and JWT refresh rotation",
      "Race-condition-safe token refresh strategy",
    ],
    technologies: ["React", "Node.js", "JWT", "OAuth", "Google Auth", "GitHub OAuth", "PostgreSQL", "Nodemailer"],
    liveUrl: "",
    githubUrl: "https://github.com/Divyeshpatil2001",
    featured: false,
  },
  {
    id: 13,
    title: "Custom Food Ordering Platform",
    category: "Web",
    projectType: "Key Project",
    year: "2023",
    shortDesc: "Full-stack food e-commerce with Django REST, React, Razorpay, and admin dashboard",
    description:
      "Built a full-stack food ordering application with a Django REST Framework backend, React frontend, Redux state management, and MySQL database. Integrated Razorpay payment gateway for seamless checkout. Developed a feature-rich admin dashboard for order management, user management, inventory tracking, and dish customization — all protected by role-based access control.",
    challenge:
      "Keeping cart and inventory state synchronized between the React frontend and Django backend in real time, especially during concurrent orders for the same limited-stock item — preventing overselling without introducing blocking database locks.",
    impact: [
      "Razorpay payment gateway with real-time inventory sync",
      "Full RBAC admin dashboard for orders, users & inventory",
    ],
    technologies: ["Django", "Django REST Framework", "React", "Redux", "MySQL", "Razorpay", "RBAC", "Python"],
    liveUrl: "",
    githubUrl: "https://github.com/Divyeshpatil2001",
    featured: false,
  },
];

export const timeline = [
  {
    id: 1,
    year: "2001",
    title: "Born",
    description: "November 26, 2001",
    icon: "star",
  },
  {
    id: 2,
    year: "2018",
    title: "10th Grade Completion",
    description: "Completed secondary education with a strong foundation in mathematics and science",
    icon: "school",
  },
  {
    id: 3,
    year: "2020",
    title: "12th Grade Completion",
    description: "Completed higher secondary education, developed interest in computer science",
    icon: "school",
  },
  {
    id: 4,
    year: "2023",
    title: "Sales Manager",
    description: "Gained valuable experience in client communication and project management",
    icon: "briefcase",
  },
  {
    id: 5,
    year: "2024",
    title: "Bachelor's in Computer Engineering",
    description: "Graduated with CGPA 8.3, specialized in full-stack development and AI/ML",
    icon: "graduation",
  },
  {
    id: 6,
    year: "Jan 2024",
    title: "Internship Started",
    description: "Began professional journey as a software development intern",
    icon: "code",
  },
  {
    id: 7,
    year: "Aug 2024",
    title: "Software Developer",
    description: "Promoted to full-time Software Developer, building scalable applications across web, mobile, and AI",
    icon: "rocket",
    current: true,
  },
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
  { name: "TypeScript", category: "frontend", level: "advanced", icon: "🔷", color: "#3178C6", layer: 2 },
];

export const stats = [
  { label: "Projects Completed", value: "15+" },
  { label: "Years Experience", value: "2+" },
  { label: "CGPA Achieved", value: "8.3" },
];

export const contactInfo = {
  email: "patildivyesh861@gmail.com",
  github: "https://github.com/Divyeshpatil2001",
  linkedin: "https://www.linkedin.com/in/divyesh-patil-96941b24b",
  experience: "2 years",
  specialization: "Full Stack Development, AI/ML Integration",
  availability: "Open to opportunities",
};
