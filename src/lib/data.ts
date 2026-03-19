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
    'DevOps-focused Full Stack Developer with hands-on experience building and deploying scalable cloud-native applications on AWS. Deployed a PBL Management System on AWS Lambda serving 5,000+ users, implementing CI/CD pipelines and serverless architecture for scalability and cost efficiency.',
} as const;

// ─── Projects ─────────────────────────────────────────────────────────────────
// Set `show: true` on the projects you want displayed in the Projects section.

export const PROJECTS: Project[] = [
  // ── Featured / SIH Winner ──────────────────────────────────────────────────
  {
    id: 'pbl-management',
    title: 'PBL Management System',
    description:
      'Serverless web application deployed on AWS Lambda serving 5,000+ users. Built with a full CI/CD pipeline using GitHub Actions, enabling automated deployments and zero-downtime releases.',
    stack: ['AWS Lambda', 'Node.js', 'React', 'DynamoDB', 'GitHub Actions'],
    githubUrl: 'https://github.com/aditya-shinde-45/pbl-management',
    isSIHWinner: true,
    featured: true,
    show: true,
  },

  // ── Full-Stack Web ─────────────────────────────────────────────────────────
  {
    id: 'gradebookx',
    title: 'GradeBookX',
    description:
      'Full-stack student grade management system with course, subject, and division management. Features JWT-based teacher authentication, role-based access, and a React dashboard backed by Express + PostgreSQL.',
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Sequelize', 'Tailwind CSS', 'JWT'],
    githubUrl: 'https://github.com/aditya-shinde-45/gradebookx',
    show: true,
  },
  {
    id: 'barterbee',
    title: 'BarterBee',
    description:
      'Community-driven barter platform where users exchange skills, items, and opinions without money. Features video calling for skill sessions, a points economy for polls, and real-time activity tracking.',
    stack: ['React', 'Tailwind CSS', 'React Router', 'Vite'],
    githubUrl: 'https://github.com/aditya-shinde-45/BarterBee',
    show: true,
  },
  {
    id: 'edumanage-college',
    title: 'EduManage College',
    description:
      'College education management platform built with TypeScript. Handles student records, course management, and administrative workflows.',
    stack: ['TypeScript', 'React'],
    githubUrl: 'https://github.com/aditya-shinde-45/edumanage-college',
    show: true,
  },
  {
    id: 'cms-mini',
    title: 'CMS Mini',
    description:
      'Lightweight content management system with a clean admin interface. Deployed on Vercel.',
    stack: ['JavaScript'],
    githubUrl: 'https://github.com/aditya-shinde-45/cms-mini',
    liveUrl: 'https://cms-mini.vercel.app',
    show: true,
  },
  {
    id: 'ai-production-scheduling',
    title: 'AI Production Scheduling',
    description:
      'AI-driven production scheduling system that optimises manufacturing workflows using intelligent algorithms.',
    stack: ['JavaScript'],
    githubUrl: 'https://github.com/aditya-shinde-45/Ai-production-scheduling1',
    show: true,
  },
  {
    id: 'help-hour',
    title: 'Help Hour',
    description:
      'Community help and volunteering platform built with HTML. Connects people who need help with those who can offer it.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/aditya-shinde-45/Help-Hour',
    show: true,
  },
  {
    id: 'war-impact-analytics',
    title: 'War Impact Analytics',
    description:
      'Data analytics dashboard visualising the humanitarian and economic impact of conflicts.',
    stack: ['JavaScript'],
    githubUrl: 'https://github.com/aditya-shinde-45/war-impact-analytics',
    show: true,
  },

  // ── Travel & Tourism ───────────────────────────────────────────────────────
  {
    id: 'toursand-travel',
    title: 'Tours & Travel',
    description:
      'Modern travel booking and tour discovery platform built with TypeScript. Live on Vercel.',
    stack: ['TypeScript', 'React'],
    githubUrl: 'https://github.com/aditya-shinde-45/toursand-travel',
    liveUrl: 'https://toursand-travel-eta.vercel.app',
    show: true,
  },
  {
    id: 'adityatoursandtravel',
    title: 'Aditya Tours & Travel',
    description:
      'Travel agency website with tour packages, booking flow, and destination showcases. Deployed on Vercel.',
    stack: ['TypeScript', 'React'],
    githubUrl: 'https://github.com/aditya-shinde-45/adityatoursandtravel',
    liveUrl: 'https://adityatoursandtravel.vercel.app',
    show: true,
  },
  {
    id: 'kolumbuswav',
    title: 'KolumbusWay',
    description:
      'Travel exploration and navigation web app. Live on Vercel.',
    stack: ['JavaScript'],
    githubUrl: 'https://github.com/aditya-shinde-45/KolumbusWay',
    liveUrl: 'https://kolumbus-way.vercel.app',
    show: true,
  },

  // ── AI / ML ────────────────────────────────────────────────────────────────
  {
    id: 'skintel',
    title: 'SkinIntel',
    description:
      'AI-powered skin analysis platform built with TypeScript. Analyses skin conditions and provides intelligent recommendations. Live on Vercel.',
    stack: ['TypeScript', 'React'],
    githubUrl: 'https://github.com/aditya-shinde-45/SkinIntel',
    liveUrl: 'https://skin-intel.vercel.app',
    show: true,
  },
  {
    id: 'neurosight',
    title: 'NeuroSight',
    description:
      'Neural network-based vision analysis tool for intelligent image recognition and classification.',
    stack: ['Python', 'Machine Learning'],
    githubUrl: 'https://github.com/aditya-shinde-45/NeuroSight',
    show: true,
  },
  {
    id: 'animal-classification-ml',
    title: 'Animal Classification ML Model',
    description:
      'Machine learning model for classifying animal species from images using Python.',
    stack: ['Python', 'Machine Learning'],
    githubUrl: 'https://github.com/aditya-shinde-45/animal-classification-ml-model',
    show: true,
  },
  {
    id: 'rasberry-pi-ml',
    title: 'Raspberry Pi ML',
    description:
      'Machine learning deployment on Raspberry Pi for edge inference and IoT applications.',
    stack: ['Python', 'Raspberry Pi', 'Machine Learning'],
    githubUrl: 'https://github.com/aditya-shinde-45/rasberry-pi-ml',
    show: true,
  },
  {
    id: 'ai-mock',
    title: 'AI Mock',
    description:
      'AI-powered mock interview platform for technical interview preparation.',
    stack: ['JavaScript'],
    githubUrl: 'https://github.com/aditya-shinde-45/ai-mock',
    show: true,
  },
  {
    id: 'ai-driven-depclick',
    title: 'AI-Driven DepClick',
    description:
      'AI-driven deployment automation tool for streamlining CI/CD workflows.',
    stack: ['DevOps', 'AI'],
    githubUrl: 'https://github.com/aditya-shinde-45/Ai-driven-depclick',
    show: true,
  },

  // ── Flutter / Mobile ───────────────────────────────────────────────────────
  {
    id: 'agropath',
    title: 'AgroPath',
    description:
      'Flutter mobile application providing agricultural guidance and smart pathfinding for farmers.',
    stack: ['Flutter', 'Dart'],
    githubUrl: 'https://github.com/aditya-shinde-45/AgroPath',
    show: true,
  },
  {
    id: 'posturexpert',
    title: 'PostureXpert',
    description:
      'Flutter app for real-time posture analysis and correction guidance using mobile sensors.',
    stack: ['Flutter', 'Dart'],
    githubUrl: 'https://github.com/aditya-shinde-45/PostureXpert',
    show: true,
  },
  {
    id: 'bmi-app',
    title: 'BMI App',
    description:
      'Cross-platform BMI calculator with health category feedback, built with Flutter and C++.',
    stack: ['Flutter', 'C++'],
    githubUrl: 'https://github.com/aditya-shinde-45/BMI-app',
    show: true,
  },
  {
    id: 'escusely',
    title: 'Escusely',
    description:
      'Flutter utility app for generating and managing excuse messages.',
    stack: ['Flutter', 'Dart'],
    githubUrl: 'https://github.com/aditya-shinde-45/escusely',
    show: true,
  },
  {
    id: 'metafix',
    title: 'Metafix',
    description:
      'Flutter app for metadata management and file fixing utilities.',
    stack: ['Flutter', 'Dart'],
    githubUrl: 'https://github.com/aditya-shinde-45/Metafix',
    show: true,
  },
  {
    id: 'oilseednexsus',
    title: 'OilSeedNexus',
    description:
      'Agricultural marketplace for oilseed trading and supply chain management. Built with Flutter, live on Vercel.',
    stack: ['Flutter', 'Dart'],
    githubUrl: 'https://github.com/aditya-shinde-45/oilseednexsus',
    liveUrl: 'https://oilseednexsus.vercel.app',
    show: true,
  },
  {
    id: 'customer-survey',
    title: 'Customer Survey',
    description:
      'Mobile survey and feedback collection app built with Flutter.',
    stack: ['Flutter', 'Dart'],
    githubUrl: 'https://github.com/aditya-shinde-45/customer-survey',
    show: true,
  },

  // ── DevOps / Infrastructure ────────────────────────────────────────────────
  {
    id: 'docker',
    title: 'Docker Experiments',
    description:
      'Collection of Docker configurations, Python scripts, and containerisation experiments.',
    stack: ['Docker', 'Python'],
    githubUrl: 'https://github.com/aditya-shinde-45/Docker',
    show: true,
  },
  {
    id: 'awtpl',
    title: 'AWTPL',
    description:
      'PHP-based web project for AWTPL company website and management system.',
    stack: ['PHP'],
    githubUrl: 'https://github.com/aditya-shinde-45/awtpl',
    show: true,
  },

  // ── Portfolio / Misc ───────────────────────────────────────────────────────
  {
    id: 'kedar-portfolio',
    title: 'Kedar Portfolio',
    description:
      'Personal portfolio website built for a client. Live on Vercel.',
    stack: ['JavaScript'],
    githubUrl: 'https://github.com/aditya-shinde-45/kedar-portfolio',
    liveUrl: 'https://kedar-portfolio-nine.vercel.app',
    show: true,
  },
  {
    id: 'aditya-shinde-portfolio',
    title: 'Aditya Shinde Portfolio (v1)',
    description:
      'Previous version of personal portfolio website.',
    stack: ['JavaScript'],
    githubUrl: 'https://github.com/aditya-shinde-45/Aditya-Shinde-Portfolio',
    show: true,
  },
];

// ─── Skills ───────────────────────────────────────────────────────────────────

export const SKILLS: Record<'cloud' | 'devops' | 'frontend' | 'backend', string[]> = {
  cloud: ['AWS', 'AWS Lambda', 'EC2', 'S3', 'DynamoDB', 'CloudWatch', 'AWS SNS'],
  devops: ['Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions', 'Terraform', 'Linux'],
  frontend: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'HTML5', 'CSS3'],
  backend: ['Node.js', 'Express', 'REST APIs', 'MongoDB', 'PostgreSQL'],
};

// ─── Experience ───────────────────────────────────────────────────────────────

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: 'Freelance / Open Source',
    role: 'Full Stack & DevOps Engineer',
    period: 'Jan 2024 – Present',
    description: [
      'Architected and deployed serverless applications on AWS Lambda with DynamoDB, reducing infrastructure costs by ~60% compared to traditional EC2 setups.',
      'Built and maintained CI/CD pipelines using GitHub Actions for automated testing, linting, and zero-downtime deployments.',
      'Containerized multiple Node.js and React applications using Docker; orchestrated with Kubernetes for local development environments.',
      'Contributed Terraform modules for reusable AWS infrastructure provisioning, adopted by 3+ open-source projects.',
    ],
  },
  {
    company: 'Smart India Hackathon 2023',
    role: 'Lead Developer — Winning Team',
    period: 'Aug 2023 – Dec 2023',
    description: [
      'Led a 6-member team to build the PBL Management System, a serverless platform serving 5,000+ users across multiple institutions.',
      'Designed the AWS architecture: Lambda functions, API Gateway, DynamoDB tables, and S3 for static asset hosting.',
      'Implemented a GitHub Actions pipeline for automated builds, tests, and deployments to AWS.',
      'Won the Smart India Hackathon 2023 national-level competition in the software category.',
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
      'Won the national-level SIH 2023 competition by building a serverless PBL Management System deployed on AWS Lambda, serving 5,000+ users.',
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
  {
    icon: '🚀',
    title: 'Top Contributor — DevOps Open Source',
    organization: 'GitHub Community',
    description:
      'Recognized as a top contributor for publishing reusable Terraform modules and GitHub Actions workflows adopted by the community.',
  },
];
