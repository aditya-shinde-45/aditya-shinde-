// Data constants for Aditya Shinde's portfolio website

// ─── Interfaces ──────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  isSIHWinner?: boolean;
  isOngoing?: boolean;
  featured?: boolean;
  show?: boolean; // set to true to display in the Projects section
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface Achievement {
  icon: string;
  title: string;
  organization: string;
  description?: string;
}

// ─── Personal Info ────────────────────────────────────────────────────────────

export const PERSONAL = {
  name: 'Aditya Shinde',
  role: 'DevOps Engineer | Full Stack Developer',
  location: 'Pune, Maharashtra, India',
  email: 'adityakrishnatshinde07@gmail.com',
  phone: '+91 79728 73499',
  github: 'https://github.com/aditya-shinde-45',
  linkedin: 'https://www.linkedin.com/in/aditya-shinde45',
  summary:
"DevOps-focused Full Stack Developer with experience in building and deploying scalable cloud-native applications on AWS. Skilled in CI/CD, infrastructure-as-code, and developing production-ready systems. Contributed to real-world projects including a live PBL Management System serving 5,000+ users and a national-level 2025 SIH-winning solution."
} as const;

// ─── Projects ─────────────────────────────────────────────────────────────────
// Set `show: true` on the projects you want displayed in the Projects section.

export const PROJECTS: Project[] = [
  // ── Featured / SIH Winner ──────────────────────────────────────────────────
  {
    id: 'pbl-management',
    title: 'PBL Management System',
    description:
      'Developed a live PBL (Project-Based Learning) Management System on AWS Lambda serving 5,000+ users, featuring separate panels for students, project guides, industry mentors, and admins, automating project workflows, guide allocation, and evaluation.',
    stack: ['AWS Lambda', 'Node.js', 'React', 'PostgreSQL', 'GitHub Actions'],
    githubUrl: 'https://github.com/aditya-shinde-45/pbl-management',
    featured: true,
    show: true,
  },

  {
    id: 'oilseednexsus',
    title: 'Beejsampada',
    description:
      'Developed an agricultural marketplace for oilseed trading and supply chain management, supporting multiple stakeholders including farmers, industries, oilseed buyers, and by-product buyers. Integrated Hyperledger blockchain with a token-based system to enable secure, transparent, and tamper-proof transactions.',
    stack: ['Flutter', 'Dart','React','BlockChain','Node.JS'],
    githubUrl: 'https://github.com/aditya-shinde-45/oilseednexsus',
    show: true,
    isSIHWinner: true,
  },

  {
    id: 'barterbee',
    title: 'BarterBee',
    description:
      'Built a community-driven barter platform enabling users to exchange skills, items, and opinions without monetary transactions. Features include real-time activity tracking, video calling for skill sessions, and a points-based system to encourage engagement and fair exchanges.',
    stack: ['React', 'Tailwind CSS', 'React Router', 'Vite'],
    githubUrl: 'https://github.com/aditya-shinde-45/BarterBee',
    show: true,
  },

  {
    id: 'gradebookx',
    title: 'GradeBookX',
    description:
      'Developed a full-stack student grade management system with features like course, subject, and division management. Implemented JWT-based authentication and role-based access control, along with a responsive React dashboard for efficient academic data handling.',
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Sequelize', 'Tailwind CSS', 'JWT'],
    githubUrl: 'https://github.com/aditya-shinde-45/gradebookx',
    show: true,
  },

  {
    id: 'ai-production-scheduling',
    title: 'AI Production Scheduling',
    description:
      'Built an AI-powered production scheduling system for a beverage manufacturing company, using historical sales data and market trends to forecast demand. Applied machine learning techniques like time-series forecasting and regression to generate optimized production plans and improve operational efficiency.',
    stack: [
      'React.js',
      'Bootstrap',
      'Node.js',
      'Machine Learning',
      'Time-Series Forecasting',
      'Regression Models'
    ],
    githubUrl: 'https://github.com/aditya-shinde-45/Ai-production-scheduling1',
    isOngoing: true,
    show: true,
  },

  {
    id: 'help-hour',
    title: 'Help Hour',
    description:
      'Developed a web-based household service platform connecting users with service providers such as electricians, plumbers, and cleaning professionals. The platform enables easy service discovery, request management, and efficient interaction between customers and providers.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/aditya-shinde-45/Help-Hour',
    show: true,
  },

  {
    id: 'war-impact-analytics',
    title: 'War Impact Analytics',
    description:
      'Created a data analytics dashboard to visualize the humanitarian and economic impact of global conflicts. The platform presents insights through interactive charts and data representations, helping users understand trends and consequences of war scenarios.',
    stack: ['JavaScript'],
    githubUrl: 'https://github.com/aditya-shinde-45/war-impact-analytics',
    show: true,
    isOngoing: true,

  },

  {
    id: 'skintel',
    title: 'SkinIntel',
    description:
      'Built an AI-powered skin analysis platform that evaluates skin conditions and provides intelligent recommendations. Designed with a modern React interface and deployed on Vercel, enabling real-time analysis and user-friendly interaction.',
    stack: ['TypeScript', 'React'],
    githubUrl: 'https://github.com/aditya-shinde-45/SkinIntel',
    liveUrl: 'https://skin-intel.vercel.app',
    isOngoing: true,
    show: true,

  },

  
  {
    id: 'rasberry-pi-ml',
    title: 'Raspberry Pi ML',
    description:
      'Implemented machine learning models on Raspberry Pi for edge computing and IoT-based applications. The system enables real-time inference on low-power devices, supporting efficient and scalable intelligent solutions.',
    stack: ['Python', 'Raspberry Pi', 'Machine Learning'],
    githubUrl: 'https://github.com/aditya-shinde-45/rasberry-pi-ml',
    show: true,
  },

  {
    id: 'agropath',
    title: 'AgroPath',
    description:
      'Developed a Flutter-based mobile application providing agricultural guidance and smart pathfinding for farmers. The app helps users make informed decisions by offering structured insights and easy-to-use navigation features.',
    stack: ['Flutter', 'Dart'],
    githubUrl: 'https://github.com/aditya-shinde-45/AgroPath',
    show: true,
  },

  {
    id: 'posturexpert',
    title: 'PostureXpert',
    description:
      'Built a Flutter application for real-time posture monitoring and correction using mobile sensor data. The system analyzes user posture continuously and provides feedback to improve health and reduce long-term physical strain.',
    stack: ['Flutter', 'Dart'],
    githubUrl: 'https://github.com/aditya-shinde-45/PostureXpert',
    show: true,
  },

  {
    id: 'bmi-app',
    title: 'BMI App',
    description:
      'Developed a cross-platform BMI calculator application that evaluates user health metrics and provides category-based feedback. Built using Flutter and C++ to ensure performance and smooth user experience.',
    stack: ['Flutter', 'C++'],
    githubUrl: 'https://github.com/aditya-shinde-45/BMI-app',
    show: true,
  },

  {
    id: 'escusely',
    title: 'Escusely',
    description:
      'Created a Flutter utility application for generating and managing excuse messages. The app provides quick, customizable templates, helping users efficiently handle daily communication scenarios.',
    stack: ['Flutter', 'Dart'],
    githubUrl: 'https://github.com/aditya-shinde-45/escusely',
    show: true,
  },
];
  

// ─── Skills ───────────────────────────────────────────────────────────────────

export const SKILLS: Record<'frontend' | 'backend' | 'languages' | 'database' | 'devops' | 'other', string[]> = {
  frontend:  ['React.js', 'Tailwind CSS'],
  backend:   ['Node.js', 'Flask', 'FastAPI'],
  languages: ['Python', 'JavaScript', 'Java'],
  database:  ['MySQL', 'MongoDB', 'PostgreSQL', 'Firebase'],
  devops:    ['AWS', 'Docker', 'Kubernetes', 'Prometheus', 'Grafana', 'GitHub Actions', 'Linux', 'Shell Scripting'],
  other:     ['System Design Fundamentals', 'Networking Fundamentals', 'IoT (Arduino UNO)', 'IoT (ESP32)'],
};

// ─── Experience ───────────────────────────────────────────────────────────────

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: 'Freelance / Open Source',
    role: 'Full Stack & DevOps Engineer',
    period: 'June 2025 – Present',
    description: [
      'Architected and deployed serverless applications on AWS Lambda with DynamoDB, reducing infrastructure costs by ~60% compared to traditional EC2 setups.',
      'Built and maintained CI/CD pipelines using GitHub Actions for automated testing, linting, and zero-downtime deployments.',
      'Containerized multiple Node.js and React applications using Docker; orchestrated with Kubernetes for local development environments.',
      'Contributed Terraform modules for reusable AWS infrastructure provisioning, adopted by 3+ open-source projects.',
    ],
  },
  {
    company: 'Foodibles Pvt. Ltd.',
    role: 'Flutter Developer',
    period: 'Oct 2023 – Dec 2023',
    description: [
      'Worked on a live production Flutter application for Foodibles Pvt. Ltd., a food-tech company based in Punjab.',
      'Built and maintained frontend UI widgets and screens using Flutter and Dart.',
      'Developed reusable custom widgets for the food ordering interface, improving UI consistency across the app.',
      'Collaborated with the product team to translate designs into pixel-perfect Flutter components.',
    ],
  },
];

// ─── Achievements ─────────────────────────────────────────────────────────────

export const ACHIEVEMENTS: Achievement[] = [
  {
    icon: '🏆',
    title: 'Smart India Hackathon Winner',
    organization: 'Government of India — Ministry of Education',
    description:
      'Won the national-level SIH 2025 competition by building a oilseed by product value chain digital platform',
  },
  {
    icon: '☁️',
    title: 'AWS Certified Cloud Practitioner',
    organization: 'Amazon Web Services',
    description:
      'Validated foundational knowledge of AWS cloud services, architecture best practices, security, and pricing models.',
  },
  {
    icon: '🐳',
    title: 'Docker Certified Associate (In Progress)',
    organization: 'Docker, Inc.',
    description:
      'Pursuing certification to validate expertise in containerization, Docker Compose, and container orchestration workflows.',
  },
 
];
