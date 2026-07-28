import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Menu, X, ArrowRight, Download, ExternalLink,
  Github, Linkedin, Mail, MapPin, Send,
} from "lucide-react";
import heroImg from "../imports/image-1.png";
import resumePdf from "../imports/adityashinde fullstack.pdf";

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV_IDS = ["home","about","experience","toolkit","projects","achievements","contact"];
const NAV_LABELS: Record<string,string> = {
  home:"Home", about:"About", toolkit:"Toolkit", projects:"Projects",
  experience:"Experience", achievements:"Achievements", contact:"Contact"
};

const toolkitGroups = [
  {
    rationale: "What I architect before I scale",
    tools: "HLD/LLD · Microservices · Sharding · Distributed Systems · Tenant Architecture",
    detail: "The thinking layer — how a system holds together before a single server exists.",
  },
  {
    rationale: "What keeps it shipping and observable",
    tools: "AWS (Lambda, S3, ECS, EC2, IAM, Secret Manager, EKS, SNS, VPC) · Docker · Kubernetes · Terraform · GitHub Actions · Prometheus · Grafana · ELK Stack",
    detail: "The layer where a feature becomes infrastructure that can be trusted — and stays that way.",
  },
  {
    rationale: "What I build the product with",
    tools: "React · Node.js · FastAPI · Flask · Flutter · TypeScript",
    detail: "The pixel half of Pixel to Production, across web and mobile.",
  },
  {
    rationale: "What I design before I build",
    tools: "Usability Testing · Wireframing · User Research · Design Systems · Accessibility · Responsive Design",
    detail: "The discipline behind every spacing and color decision on this page itself.",
  },
  {
    rationale: "What holds the data",
    tools: "PostgreSQL · MySQL · Redis · Firebase · Power BI · R",
    detail: "Storage, structure, and the analysis layer that turns data into a decision.",
  },
  {
    rationale: "What I'm teaching to think",
    tools: "LLMs · RAG Pipelines · Ollama · AWS Bedrock · Agentic Workflows · LangChain",
    detail: "Applied integration work — connecting intelligence to business logic, not model research.",
  },
];

const featuredProjects = [
  {
    id: "creditshield",
    name: "CreditShield",
    problem: "Loan appraisal still relies on credit officers applying rules inconsistently — the risk isn't just bad loans, it's opaque decisions no one can audit.",
    what: "Built a full-stack LOS/LMS with an AI appraisal engine handling salaried, self-employed, and business borrowers — each with distinct risk profiles. The rule engine processes 200+ business rules and produces explainable risk flags so officers know exactly why a decision was made.",
    outcome: "AI Grand Challenge 2026 Winner · 3 borrower profiles · every decision auditable",
    stack: "Full-Stack LOS/LMS · ML Risk Model · Docker · PostgreSQL · Rule Engine · Microservices",
    repo: "https://github.com/aditya-shinde-45?tab=repositories",
    flip: false,
  },
  {
    id: "beejsamapadha",
    name: "BeejSamapadha",
    problem: "Agricultural supply chains are opaque by default — no verifiable record of what moved, when, or at what quality.",
    what: "Built a supply chain platform with a blockchain traceability layer — tamper-proof records from farm to retailer, cryptographically enforced. One Flutter codebase serves three users: crop-listing for farmers, procurement dashboards for buyers, district analytics for policymakers.",
    outcome: "Smart India Hackathon 2025 Winner · 3 user roles · 1 codebase · national evaluation",
    stack: "Flutter · Blockchain · Smart Contracts · AI/ML Forecasting · Firebase · FastAPI",
    repo: "https://github.com/aditya-shinde-45?tab=repositories",
    flip: true,
  },
  {
    id: "wareconomics",
    name: "Economic Impact of Global Wars",
    problem: "The link between armed conflict and economic collapse is assumed but rarely quantified — analysts pattern-match on instinct rather than data.",
    what: "Unified datasets from World Bank, Yahoo Finance, UCDP, and FRED to analyze how conflicts affect GDP, inflation, and market volatility across decades. Built Power BI dashboards and R/ggplot2 visualizations — structured as a legible argument, not a chart dump.",
    outcome: "Innotex Competition Runner-Up · cross-decade analysis · accessible to non-finance audiences",
    stack: "R · ggplot2 · Power BI · Statistical Analysis",
    repo: "https://github.com/aditya-shinde-45/war-impact-analytics",
    flip: false,
  },
];

const buildLog = [
  {
    category: "Flagship Products",
    projects: [
      { name: "PBL Management System", desc: "Enterprise SaaS platform streamlining project-based learning for 5,000+ students and 300+ faculty with automated workflows, evaluations, and collaboration.", stack: "React · Spring Boot · PostgreSQL · AWS", repo: "https://github.com/aditya-shinde-45?tab=repositories" },
      { name: "Beej Sampada", desc: "Smart India Hackathon winning agricultural supply chain platform connecting farmers, warehouses, and buyers using intelligent logistics and analytics.", stack: "Flutter · FastAPI · PostgreSQL · AWS", repo: "https://github.com/aditya-shinde-45?tab=repositories" },
      { name: "CreditShield", desc: "AI-powered loan appraisal platform providing intelligent credit risk assessment, document verification, and predictive scoring.", stack: "React · FastAPI · Python · ML", repo: "https://github.com/aditya-shinde-45?tab=repositories" },
      { name: "EaseHire", desc: "AI recruitment platform with resume parsing, candidate ranking, ATS screening, and interview management.", stack: "React · Node.js · PostgreSQL · Gemini API", repo: "https://github.com/aditya-shinde-45/Build-HireAI-Recruitment-Platform-" },
    ],
  },
  {
    category: "AI & Machine Learning",
    projects: [
      { name: "SkinIntel", desc: "Deep learning skin disease detection platform capable of classifying multiple dermatological conditions from images.", stack: "PyTorch · Flask · OpenCV", repo: "https://github.com/aditya-shinde-45/SkinIntel" },
      { name: "Animal Classification", desc: "CNN-based image classification model trained to identify multiple animal species with high prediction accuracy.", stack: "TensorFlow · Python", repo: "https://github.com/aditya-shinde-45/animal-classification-ml-model" },
      { name: "AI Production Scheduling", desc: "Intelligent production scheduling system optimizing manufacturing workflows using machine learning algorithms.", stack: "Python · Pandas · Optimization", repo: "https://github.com/aditya-shinde-45/Ai-production-scheduling1" },
    ],
  },
  {
    category: "Web Applications",
    projects: [
      { name: "DepClick", desc: "Department collaboration and management platform for streamlined communication and resource sharing.", stack: "React · Node.js · MongoDB", repo: "https://github.com/aditya-shinde-45?tab=repositories" },
      { name: "GradeBookX", desc: "Academic performance management system for student marks, reports, and analytics.", stack: "React · Express · MySQL", repo: "https://github.com/aditya-shinde-45/gradebookx" },
      { name: "HelpHour", desc: "Community volunteer platform connecting people requesting assistance with available volunteers.", stack: "MERN Stack", repo: "https://github.com/aditya-shinde-45/Help-Hour" },
      { name: "BarterBee", desc: "Online barter marketplace enabling users to exchange products without monetary transactions.", stack: "React · Node.js · MongoDB", repo: "https://github.com/aditya-shinde-45/BarterBee" },
    ],
  },
  {
    category: "Mobile Applications",
    projects: [
      { name: "AgroPath", desc: "Smart agriculture application providing farming guidance, crop insights, and digital assistance.", stack: "Flutter · Firebase", repo: "https://github.com/aditya-shinde-45/AgroPath" },
      { name: "PostureXpert", desc: "IoT-enabled posture monitoring application providing real-time posture correction and analytics.", stack: "Flutter · ESP32 · Firebase", repo: "https://github.com/aditya-shinde-45/PostureXpert" },
      { name: "Escusely", desc: "Leave request and approval management application for students and organizations.", stack: "Flutter", repo: "https://github.com/aditya-shinde-45/escusely" },
      { name: "BMI Checker", desc: "Health utility application calculating BMI with personalized health recommendations.", stack: "Flutter", repo: "https://github.com/aditya-shinde-45/BMI-app" },
    ],
  },
  {
    category: "Data Analytics",
    projects: [
      { name: "War Impact Analysis", desc: "Interactive Power BI dashboard analyzing the global economic, humanitarian, and geopolitical impacts of major conflicts through data visualization.", stack: "Power BI · SQL · Excel", repo: "https://github.com/aditya-shinde-45/war-impact-analytics" },
    ],
  },
];

const experience = [
  {
    company: "MIT ADT University",
    role: "Full Stack Developer Intern",
    period: "Jun 2025 – Aug 2025",
    scene: "University infrastructure at real scale — 5,000+ students, 300+ faculty, where a deployment failure blocks a cohort.",
    highlights: [
      "Architected PBL Management System on AWS Lambda — document submissions, evaluations, and project tracking end-to-end.",
      "Built CI/CD pipelines with GitHub Actions for zero-downtime deployments.",
      "Integrated Amazon S3 with versioning and access control for academic document storage.",
      "Implemented REST APIs with RBAC (JWT auth) enforcing strict data isolation between portals.",
    ],
  },
  {
    company: "Foodibles India LLP",
    role: "Developer Project Intern",
    period: "Oct 2023 – Apr 2024",
    scene: "First production environment — real users, real orders, real bugs at 8pm on a Friday.",
    highlights: [
      "Built Flutter mobile app with reusable widget libraries, accelerating cross-team feature delivery.",
      "Designed Firebase Firestore schema for real-time menu, order, and user management.",
      "Integrated Firebase Auth, Storage, and Cloud Functions for onboarding and order lifecycle.",
      "Resolved production bugs and shipped iterative improvements in an Agile environment.",
    ],
  },
];

const achievements = [
  {
    title: "Smart India Hackathon 2025",
    badge: "Winner",
    meaning: "36 hours. One working system. The version of pressure I want more of.",
    year: "2025",
  },
  {
    title: "AI Grand Challenge 2026",
    badge: "Winner",
    meaning: "Chosen nationally to build multimodal AI for agricultural disease detection.",
    year: "2026",
  },
];

const certs = [
  "IBM — Docker, Kubernetes & OpenShift",
  "AWS Academy — Cloud Foundations",
  "IBM — Relational Databases (RDBMS)",
  "Coursera — Data Structures",
  "Coursera — Computer Networking",
  "Udemy — DSA using C and C++",
  "Udemy — HTML, CSS & JavaScript",
];

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useScrollSpy() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_IDS.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return active;
}

// ─── Primitives ───────────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-[0.15em] text-[#3B4A6B] uppercase mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
      {children}
    </p>
  );
}

function Divider() {
  return <div className="border-t border-[#E7E5DF]" />;
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─── Skill Constellation ──────────────────────────────────────────────────────
function SkillConstellation({ compact = false }: { compact?: boolean }) {
  const reduced = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  const CX = 240, CY = 240, R = 46, PH = 30;

  const allTags = [
    { label: "React",       x: 378, y: 86,  pw: 82,  delay: 0.10, dur: 7.2 },
    { label: "FastAPI",     x: 434, y: 222, pw: 92,  delay: 0.22, dur: 6.8 },
    { label: "AWS",         x: 364, y: 368, pw: 74,  delay: 0.34, dur: 7.5 },
    { label: "Docker",      x: 186, y: 416, pw: 88,  delay: 0.46, dur: 6.5 },
    { label: "PostgreSQL",  x: 40,  y: 318, pw: 114, delay: 0.58, dur: 7.8 },
    { label: "DevOps",      x: 28,  y: 158, pw: 88,  delay: 0.70, dur: 7.0 },
    { label: "Llama 3",     x: 106, y: 52,  pw: 90,  delay: 0.82, dur: 6.3 },
  ];

  const tags = compact ? allTags.slice(0, 4) : allTags;

  function lineEnd(tx: number, ty: number) {
    const dx = tx - CX, dy = ty - CY;
    const len = Math.sqrt(dx * dx + dy * dy);
    return { x1: CX + (dx / len) * (R + 4), y1: CY + (dy / len) * (R + 4), x2: tx, y2: ty };
  }

  return (
    <div className="w-full flex items-center justify-center select-none" aria-hidden="true">
      <style>{`
        @keyframes cst-float { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-3px)} }
        @media(prefers-reduced-motion:reduce){.cst-tag{animation:none!important}}
      `}</style>
      <svg viewBox="0 0 480 480" className="w-full max-w-[460px]">
        {/* Connector lines */}
        {tags.map((t) => {
          const { x1, y1, x2, y2 } = lineEnd(t.x, t.y);
          return (
            <motion.line key={t.label + "-l"}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#D4D0C8" strokeWidth="1" strokeDasharray="3 6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25, delay: reduced ? 0 : t.delay - 0.06 }}
            />
          );
        })}

        {/* Floating tag groups */}
        {tags.map((t) => (
          <g key={t.label} className="cst-tag"
            style={!reduced ? {
              animation: `cst-float ${t.dur}s ease-in-out infinite`,
              animationDelay: `${t.delay + 0.75}s`,
            } : {}}>
            <motion.g
              initial={reduced ? {} : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: reduced ? 0 : t.delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
              <rect x={t.x - t.pw / 2} y={t.y - PH / 2} width={t.pw} height={PH} rx={PH / 2}
                fill="#FFFFFF" stroke="#E7E5DF" strokeWidth="1" />
              <text x={t.x} y={t.y + 4.5} textAnchor="middle"
                fontSize="12" fontWeight="500" fill="#1A1A1A" fontFamily="Inter, sans-serif">
                {t.label}
              </text>
            </motion.g>
          </g>
        ))}

        {/* Center anchor */}
        <motion.g
          initial={reduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: reduced ? 0 : 0.04 }}>
          <circle cx={CX} cy={CY} r={R} fill="#3B4A6B" />
          <text x={CX} y={CY - 6} textAnchor="middle"
            fontSize="17" fontWeight="700" fill="white" fontFamily="Plus Jakarta Sans, sans-serif">
            AKS
          </text>
          <text x={CX} y={CY + 11} textAnchor="middle"
            fontSize="7" fill="rgba(255,255,255,0.65)" fontFamily="Inter, sans-serif" letterSpacing="0.06em">
            Pixel to Production
          </text>
        </motion.g>
      </svg>
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => { setOpen(false); scrollTo(id); };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "py-3 bg-[#FAF9F6]/96 backdrop-blur-sm border-b border-[#E7E5DF]" : "py-5 bg-transparent"
    }`}>
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">
        <button onClick={() => go("home")}
          className="font-bold text-[15px] text-[#1A1A1A] hover:text-[#3B4A6B] transition-colors tracking-tight"
          style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
          AKS
        </button>
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_IDS.map((id) => (
            <button key={id} onClick={() => go(id)}
              className={`text-[13px] transition-colors ${
                active === id ? "text-[#3B4A6B] font-semibold" : "text-[#5C5C5C] hover:text-[#1A1A1A]"
              }`}
              style={{ fontFamily: "Inter, sans-serif" }}>
              {NAV_LABELS[id]}
            </button>
          ))}
        </nav>
        <button onClick={() => setOpen(!open)} className="lg:hidden text-[#1A1A1A] p-1">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-[#FAF9F6] border-b border-[#E7E5DF] px-6 py-5 grid grid-cols-2 gap-3"
        >
          {NAV_IDS.map((id) => (
            <button key={id} onClick={() => go(id)}
              className={`text-sm text-left py-1.5 transition-colors ${
                active === id ? "text-[#3B4A6B] font-semibold" : "text-[#5C5C5C]"
              }`}
              style={{ fontFamily: "Inter, sans-serif" }}>
              {NAV_LABELS[id]}
            </button>
          ))}
        </motion.div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center bg-[#FAF9F6] pt-20">
      <div className="max-w-[1280px] mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Left — text */}
          <div>
            <FadeUp>
              <div className="inline-flex items-center gap-2 mb-10 px-3.5 py-1.5 rounded-full border border-[#E7E5DF] bg-white text-[12px] text-[#5C5C5C]"
                style={{ fontFamily: "Inter, sans-serif" }}>
                <span className="w-2 h-2 rounded-full bg-[#3B4A6B] animate-pulse shrink-0" />
                Available for full-time roles &amp; contract work · Pune, India
              </div>
            </FadeUp>

            <FadeUp delay={0.08}>
              <h1
                className="text-[clamp(44px,6.5vw,80px)] font-extrabold leading-[1.02] tracking-[-0.035em] text-[#1A1A1A] mb-6"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                Pixel to{" "}
                <span style={{ color: "#3B4A6B" }}>Production</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.14}>
              <p className="text-[17px] text-[#5C5C5C] leading-[1.75] mb-4"
                style={{ fontFamily: "Inter, sans-serif" }}>
                Full Stack Developer · Cloud &amp; DevOps Engineer —
                building systems that survive the gap between a working demo and a production deployment.
              </p>
            </FadeUp>

            <FadeUp delay={0.19}>
              <p className="text-[14px] text-[#9B9B9B] mb-10 flex items-center gap-1.5"
                style={{ fontFamily: "Inter, sans-serif" }}>
                <MapPin size={13} />
                Aditya Krishnat Shinde · Pune, India
              </p>
            </FadeUp>

            <FadeUp delay={0.24}>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => scrollTo("projects")}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#3B4A6B] text-white text-sm font-medium rounded-lg hover:bg-[#2E3A59] transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  Walk Through the Builds <ArrowRight size={15} />
                </button>
                <a
                  href={resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-[#1A1A1A] text-[#1A1A1A] text-sm font-medium rounded-lg hover:bg-[#1A1A1A] hover:text-white transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  Get the Resume <Download size={15} />
                </a>
              </div>
            </FadeUp>
          </div>

          {/* Right — portrait illustration */}
          <div className="hidden lg:flex items-center justify-center">
            <motion.img
              src={heroImg}
              alt="Aditya Krishnat Shinde"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full max-w-[420px] object-contain"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>
        </div>

        {/* Portrait below text on mobile/tablet */}
        <div className="lg:hidden mt-10 flex justify-center">
          <img
            src={heroImg}
            alt="Aditya Krishnat Shinde"
            className="w-[260px] sm:w-[320px] object-contain"
            style={{ mixBlendMode: "multiply" }}
          />
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const stats = [
    { value: "15+", label: "Projects Shipped" },
    { value: "2×", label: "National Hackathon Winner" },
    { value: "6", label: "Engineering Disciplines" },
  ];
  return (
    <section id="about" className="bg-white py-28">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_300px] gap-20 items-start">
          <div>
            <FadeUp>
              <SectionLabel>Engineering Journey</SectionLabel>
              <h2 className="text-[36px] md:text-[44px] font-bold text-[#1A1A1A] leading-[1.1] tracking-tight mb-6"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                I didn&apos;t start at the infrastructure layer.
              </h2>
            </FadeUp>

            <FadeUp delay={0.06}>
              <p className="text-[16px] text-[#5C5C5C] leading-[1.75] mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
                I started at the pixel — and kept asking what happens after someone clicks the button.
                Each question pulled me a layer deeper, until I was designing infrastructure with the same
                care I used to give interfaces: failure states, load paths, the person on the other end.
              </p>
              <p className="text-[16px] text-[#5C5C5C] leading-[1.75] mb-5" style={{ fontFamily: "Inter, sans-serif" }}>
                That curiosity started with a Diploma in CSE from Lovely Professional University and carried
                forward into a B.Tech in Computer Science at MIT ADT University — building on a strong
                foundation in cloud technologies, databases, and full-stack development to ship scalable,
                production-ready systems.
              </p>
            </FadeUp>

            {/* Stat cards */}
            <FadeUp delay={0.12}>
              <div className="grid grid-cols-3 gap-4 mt-10">
                {stats.map((s) => (
                  <div key={s.label} className="border border-[#E7E5DF] rounded-xl p-5 bg-[#FAF9F6]">
                    <p className="text-[28px] font-extrabold text-[#3B4A6B] leading-none mb-1" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>{s.value}</p>
                    <p className="text-[12px] text-[#9B9B9B]" style={{ fontFamily: "Inter, sans-serif" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Education — right column */}
          <div className="lg:sticky lg:top-28">
            <FadeUp delay={0.14}>
              <p className="text-[11px] font-semibold tracking-[0.14em] text-[#9B9B9B] uppercase mb-6"
                style={{ fontFamily: "Inter, sans-serif" }}>Education</p>
              <div className="space-y-4">
                {[
                  { period: "2024 – 2027", degree: "B.Tech — CSE", school: "MIT ADT University, Pune" },
                  { period: "2022 – 2024", degree: "Diploma — CSE", school: "Lovely Professional University" },
                ].map((ed) => (
                  <div key={ed.degree} className="border border-[#E7E5DF] rounded-xl p-5 bg-[#FAF9F6]">
                    <p className="text-[11px] text-[#9B9B9B] mb-1 tabular-nums" style={{ fontFamily: "Inter, sans-serif" }}>{ed.period}</p>
                    <p className="text-[15px] font-semibold text-[#1A1A1A] mb-0.5" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>{ed.degree}</p>
                    <p className="text-[13px] text-[#5C5C5C]" style={{ fontFamily: "Inter, sans-serif" }}>{ed.school}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Toolkit ──────────────────────────────────────────────────────────────────
function Toolkit() {
  return (
    <section id="toolkit" className="bg-[#FAF9F6] py-28">
      <div className="max-w-[1280px] mx-auto px-6">
        <FadeUp>
          <SectionLabel>Toolkit</SectionLabel>
          <h2 className="text-[36px] md:text-[44px] font-bold text-[#1A1A1A] leading-[1.1] tracking-tight mb-4"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
            The full range of judgment.
          </h2>
          <p className="text-[17px] text-[#5C5C5C] leading-relaxed max-w-xl mb-14"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Not a tag cloud. Six engineering disciplines, each with a rationale for when and why you reach for them.
          </p>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-0 border border-[#E7E5DF] rounded-xl overflow-hidden bg-white">
          {toolkitGroups.map((g, i) => (
            <FadeUp key={g.rationale} delay={i * 0.05}>
              <div className={`p-8 ${i % 2 === 0 ? "md:border-r" : ""} border-b border-[#E7E5DF] last:border-b-0`}>
                <p className="text-[11px] font-semibold tracking-[0.12em] text-[#3B4A6B] uppercase mb-3"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  {g.rationale}
                </p>
                <p className="text-[15px] font-semibold text-[#1A1A1A] leading-relaxed mb-3"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  {g.tools}
                </p>
                <p className="text-[13px] text-[#9B9B9B] leading-relaxed italic"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  {g.detail}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────
function Projects() {
  return (
    <section id="projects" className="bg-white py-28">
      <div className="max-w-[1280px] mx-auto px-6">
        <FadeUp>
          <SectionLabel>Projects</SectionLabel>
          <h2 className="text-[36px] md:text-[44px] font-bold text-[#1A1A1A] leading-[1.1] tracking-tight mb-4"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
            A few of these I&apos;d walk you through slide by slide.
          </h2>
          <p className="text-[17px] text-[#5C5C5C] leading-relaxed mb-16 max-w-xl"
            style={{ fontFamily: "Inter, sans-serif" }}>
            The rest, I&apos;ll just point you to the repo.
          </p>
        </FadeUp>

        {/* Tier 1 — Featured */}
        <div className="space-y-0 mb-28">
          {featuredProjects.map((p, i) => (
            <FadeUp key={p.id} delay={0.04}>
              <div className={`py-14 grid lg:grid-cols-2 gap-12 items-start ${i < featuredProjects.length - 1 ? "border-b border-[#E7E5DF]" : ""} ${p.flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div>
                  <p className="text-[12px] font-semibold tracking-[0.1em] text-[#9B9B9B] uppercase mb-3"
                    style={{ fontFamily: "Inter, sans-serif" }}>
                    Featured · 0{i + 1}
                  </p>
                  <h3 className="text-[28px] font-bold text-[#1A1A1A] mb-4 tracking-tight"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>{p.name}</h3>
                  <p className="text-[18px] font-medium text-[#1A1A1A] leading-[1.5] mb-5 italic"
                    style={{ fontFamily: "Inter, sans-serif" }}>
                    &ldquo;{p.problem}&rdquo;
                  </p>
                </div>
                <div>
                  <p className="text-[15px] text-[#5C5C5C] leading-[1.8] mb-5"
                    style={{ fontFamily: "Inter, sans-serif" }}>{p.what}</p>
                  {/* Outcome card */}
                  <div className="bg-[#EDF0F5] border border-[#D6DCE8] rounded-xl px-5 py-4 mb-5">
                    <p className="text-[13px] font-semibold text-[#3B4A6B]" style={{ fontFamily: "Inter, sans-serif" }}>{p.outcome}</p>
                  </div>
                  <p className="text-[12px] text-[#9B9B9B] tracking-wide mb-4"
                    style={{ fontFamily: "Inter, sans-serif" }}>{p.stack}</p>
                  <a href={p.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[13px] text-[#3B4A6B] font-medium hover:underline"
                    style={{ fontFamily: "Inter, sans-serif" }}>
                    <Github size={14} /> Repository
                  </a>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Tier 2 — Build Log */}
        <FadeUp>
          <h3 className="text-[24px] font-bold text-[#1A1A1A] tracking-tight mb-2"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
            Projects That Solve Real Problems.
          </h3>
          <p className="text-[14px] text-[#9B9B9B] mb-10"
            style={{ fontFamily: "Inter, sans-serif" }}>
            From AI systems and enterprise software to mobile applications and hackathon-winning products. Every project was built to solve a real-world problem and ship production-ready solutions.
          </p>
        </FadeUp>

        <div className="space-y-10">
          {buildLog.map((group, gi) => (
            <FadeUp key={group.category} delay={gi * 0.06}>
              <div>
                <p className="text-[11px] font-bold tracking-[0.14em] text-[#9B9B9B] uppercase mb-4 pb-2 border-b border-[#E7E5DF]"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  {group.category}
                </p>
                <div>
                  {group.projects.map((proj, pi) => (
                    <div key={proj.name}
                      className={`flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-3.5 ${pi < group.projects.length - 1 ? "border-b border-[#F4F2EE]" : ""}`}>
                      <span className="text-[14px] font-semibold text-[#1A1A1A] shrink-0 min-w-[180px]"
                        style={{ fontFamily: "Inter, sans-serif" }}>{proj.name}</span>
                      <span className="text-[13px] text-[#5C5C5C] flex-1"
                        style={{ fontFamily: "Inter, sans-serif" }}>{proj.desc}</span>
                      <span className="text-[11px] text-[#9B9B9B] shrink-0"
                        style={{ fontFamily: "Inter, sans-serif" }}>{proj.stack}</span>
                      <a href={proj.repo} target="_blank" rel="noopener noreferrer" className="shrink-0 text-[#C0C0C0] hover:text-[#3B4A6B] transition-colors">
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}


// ─── Experience ───────────────────────────────────────────────────────────────
function Experience() {
  return (
    <section id="experience" className="bg-white py-28">
      <div className="max-w-[1280px] mx-auto px-6">
        <FadeUp>
          <SectionLabel>Experience</SectionLabel>
          <h2 className="text-[36px] md:text-[44px] font-bold text-[#1A1A1A] leading-[1.1] tracking-tight mb-16"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
            The work, in sequence.
          </h2>
        </FadeUp>

        <div className="relative">
          <div className="absolute left-0 top-2 bottom-2 w-px bg-[#E7E5DF]" />
          <div className="space-y-16 pl-10">
            {experience.map((e, i) => (
              <FadeUp key={e.company} delay={i * 0.08}>
                <div className="relative">
                  <div className="absolute -left-[42px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#3B4A6B] ring-4 ring-white" />
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                    <h3 className="text-[20px] font-bold text-[#1A1A1A]"
                      style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>{e.role}</h3>
                    <span className="text-[13px] text-[#9B9B9B]"
                      style={{ fontFamily: "Inter, sans-serif" }}>{e.company} · {e.period}</span>
                  </div>
                  <p className="text-[15px] text-[#5C5C5C] italic leading-relaxed mb-4"
                    style={{ fontFamily: "Inter, sans-serif" }}>{e.scene}</p>
                  <ul className="space-y-2">
                    {e.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-[14px] text-[#5C5C5C] leading-relaxed"
                        style={{ fontFamily: "Inter, sans-serif" }}>
                        <span className="text-[#3B4A6B] shrink-0 mt-1.5 text-[10px]">▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Achievements ─────────────────────────────────────────────────────────────
function Achievements() {
  return (
    <section id="achievements" className="bg-[#FAF9F6] py-28">
      <div className="max-w-[1280px] mx-auto px-6">
        <FadeUp>
          <SectionLabel>Achievements</SectionLabel>
          <h2 className="text-[36px] md:text-[44px] font-bold text-[#1A1A1A] leading-[1.1] tracking-tight mb-14"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
            What was earned and why it mattered.
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {achievements.map((a, i) => (
            <FadeUp key={a.title} delay={i * 0.07}>
              <div className="border border-[#E7E5DF] rounded-xl p-7 bg-white h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold tracking-[0.12em] text-[#9B9B9B] uppercase"
                    style={{ fontFamily: "Inter, sans-serif" }}>{a.year}</span>
                  <span className="text-[11px] font-semibold text-[#3B4A6B] bg-[#EDF0F5] px-3 py-1 rounded-full"
                    style={{ fontFamily: "Inter, sans-serif" }}>{a.badge}</span>
                </div>
                <h3 className="text-[18px] font-bold text-[#1A1A1A] mb-3 leading-snug"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>{a.title}</h3>
                <p className="text-[14px] text-[#5C5C5C] leading-[1.7] italic"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  &ldquo;{a.meaning}&rdquo;
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.1}>
          <Divider />
          <div className="pt-8">
            <p className="text-[12px] font-semibold tracking-[0.12em] text-[#9B9B9B] uppercase mb-5"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Certifications
            </p>
            <div className="flex flex-wrap gap-3">
              {certs.map((c) => (
                <span key={c}
                  className="text-[13px] text-[#5C5C5C] border border-[#E7E5DF] rounded-full px-4 py-1.5 bg-white"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Portfolio Contact: " + form.name);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.open(`https://mail.google.com/mail/?view=cm&to=adityakrishnatshinde07@gmail.com&su=${subject}&body=${body}`, "_blank");
    setSent(true);
  };

  return (
    <section id="contact" className="bg-white py-28">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="max-w-[640px] mx-auto">
          <FadeUp>
            <SectionLabel>Contact</SectionLabel>
            <h2 className="text-[36px] md:text-[44px] font-bold text-[#1A1A1A] leading-[1.1] tracking-tight mb-4"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              The next system to build, together.
            </h2>
            <p className="text-[17px] text-[#5C5C5C] leading-[1.75] mb-12"
              style={{ fontFamily: "Inter, sans-serif" }}>
              If you&apos;re building something that needs to hold up under real traffic — let&apos;s talk.
            </p>
          </FadeUp>

          <FadeUp delay={0.08}>
            {sent ? (
              <div className="border border-[#E7E5DF] rounded-xl p-10 text-center bg-[#FAF9F6]">
                <div className="w-10 h-10 rounded-full bg-[#EDF0F5] flex items-center justify-center mx-auto mb-4">
                  <Send size={18} className="text-[#3B4A6B]" />
                </div>
                <p className="text-[17px] font-semibold text-[#1A1A1A] mb-2"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                  Message received.
                </p>
                <p className="text-[14px] text-[#5C5C5C]" style={{ fontFamily: "Inter, sans-serif" }}>
                  I typically respond within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[13px] font-medium text-[#1A1A1A] block mb-2"
                      style={{ fontFamily: "Inter, sans-serif" }}>Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full px-4 py-3 border border-[#E7E5DF] rounded-lg text-[14px] text-[#1A1A1A] bg-white placeholder-[#C0C0C0] focus:outline-none focus:border-[#3B4A6B] focus:ring-1 focus:ring-[#3B4A6B] transition-colors"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>
                  <div>
                    <label className="text-[13px] font-medium text-[#1A1A1A] block mb-2"
                      style={{ fontFamily: "Inter, sans-serif" }}>Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 border border-[#E7E5DF] rounded-lg text-[14px] text-[#1A1A1A] bg-white placeholder-[#C0C0C0] focus:outline-none focus:border-[#3B4A6B] focus:ring-1 focus:ring-[#3B4A6B] transition-colors"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[13px] font-medium text-[#1A1A1A] block mb-2"
                    style={{ fontFamily: "Inter, sans-serif" }}>Message</label>
                  <textarea
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="What are you building?"
                    className="w-full px-4 py-3 border border-[#E7E5DF] rounded-lg text-[14px] text-[#1A1A1A] bg-white placeholder-[#C0C0C0] focus:outline-none focus:border-[#3B4A6B] focus:ring-1 focus:ring-[#3B4A6B] transition-colors resize-none"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-[#3B4A6B] text-white text-sm font-medium rounded-lg hover:bg-[#2E3A59] transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  Send Message <Send size={14} />
                </button>
              </form>
            )}
          </FadeUp>

          <FadeUp delay={0.14}>
            <div className="mt-12 pt-10 border-t border-[#E7E5DF] flex flex-wrap gap-6 justify-center">
              {[
                { icon: <Mail size={15} />, label: "adityakrishnatshinde07@gmail.com", href: "mailto:adityakrishnatshinde07@gmail.com" },
                { icon: <Linkedin size={15} />, label: "LinkedIn", href: "https://www.linkedin.com/in/aditya-shinde45/" },
                { icon: <Github size={15} />, label: "GitHub", href: "https://github.com/aditya-shinde-45" },
              ].map(({ icon, label, href }) => (
                <a key={label} href={href}
                  className="inline-flex items-center gap-2 text-[13px] text-[#5C5C5C] hover:text-[#3B4A6B] transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  {icon} {label}
                </a>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#FAF9F6] border-t border-[#E7E5DF] py-8">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-[13px] text-[#9B9B9B]" style={{ fontFamily: "Inter, sans-serif" }}>
          © 2026 Aditya Krishnat Shinde
        </p>
        <p className="text-[13px] text-[#9B9B9B]" style={{ fontFamily: "Inter, sans-serif" }}>
          Pixel to <span style={{ color: "#3B4A6B" }}>Production</span>
        </p>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Toolkit />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
