# Design Document: Portfolio Website

## Overview

A single-page portfolio application built with React.js (TypeScript), Tailwind CSS, GSAP, and Three.js. The site presents Aditya Shinde's professional identity as a DevOps Engineer and Full Stack Developer through six distinct sections: Hero, About, Projects, Experience, Achievements, and Contact.

The design philosophy is "less but better" — every element earns its place. The visual language is light, minimal, and premium: white backgrounds, subtle accent gradients, soft shadows, and purposeful animation. The site is mobile-first, fully responsive, and optimized for fast load times.

---

## Architecture

The application is a client-side React SPA with no backend. Contact form submissions are handled client-side (validation only; actual sending can be wired to EmailJS or a serverless function later).

```
src/
├── assets/           # Images, icons, fonts
├── components/       # Reusable UI primitives (Button, Card, Badge, etc.)
├── sections/         # Full-page section components (Hero, About, Projects, etc.)
├── hooks/            # Custom React hooks (useScrollSpy, useGSAP, etc.)
├── lib/              # Three.js scene setup, GSAP config
└── App.tsx           # Root component, section assembly, Navbar
```

**Key dependencies:**
- `react` + `typescript`
- `tailwindcss`
- `gsap` + `@gsap/react` (ScrollTrigger plugin)
- `three` + `@react-three/fiber` + `@react-three/drei` (Three.js abstraction)
- `react-hook-form` (contact form validation)

**Code splitting strategy:**
- Three.js canvas is loaded via `React.lazy` + `Suspense`
- GSAP ScrollTrigger is registered once in `App.tsx` on mount

---

## Components and Interfaces

### Navbar

```tsx
interface NavItem {
  label: string;       // Display text
  href: string;        // Section ID anchor (e.g. "#projects")
}

interface NavbarProps {
  items: NavItem[];
  activeSection: string; // ID of currently visible section
}
```

Behavior:
- Fixed position, `z-50`
- Active link detection via `useScrollSpy` hook (IntersectionObserver)
- Mobile: hamburger toggle, slide-down menu with backdrop blur

### Button

```tsx
interface ButtonProps {
  variant: 'primary' | 'outline';
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}
```

- `primary`: sky-blue gradient fill, white text
- `outline`: transparent fill, accent-colored border, accent text
- Hover: `scale(1.04)` + shadow increase, 200ms ease transition

### ProjectCard

```tsx
interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  isSIHWinner?: boolean;
  featured?: boolean;
}

interface ProjectCardProps {
  project: Project;
}
```

- Hover: `scale(1.03)` + glow border + 3D tilt via CSS `perspective` + `rotateX/Y`
- SIH Winner badge: gradient pill tag (sky-blue → lavender)

### SkillBadge

```tsx
interface SkillBadgeProps {
  label: string;
  category: 'cloud' | 'frontend' | 'backend' | 'devops';
}
```

- Pill shape, category-tinted background (very light)
- Hover: `scale(1.06)` + shadow

### TimelineEntry

```tsx
interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  description: string[];
}
```

### AchievementCard

```tsx
interface Achievement {
  icon: string;        // Emoji or icon component name
  title: string;
  organization: string;
  description?: string;
}
```

### ContactForm

```tsx
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
```

Validation (react-hook-form):
- `name`: required
- `email`: required + valid email format
- `message`: required

---

## Data Models

All personal data is stored as typed constants in `src/lib/data.ts`.

```ts
// Personal info
export const PERSONAL = {
  name: 'Aditya Shinde',
  role: 'DevOps Engineer | Full Stack Developer',
  location: 'Pune, Maharashtra, India',
  email: 'adityakrishnatshinde07@gmail.com',
  phone: '+91 79728 73499',
  github: 'https://github.com/aditya-shinde-45',
  linkedin: 'https://www.linkedin.com/in/aditya-shinde45',
  summary: 'DevOps-focused Full Stack Developer with hands-on experience building and deploying scalable cloud-native applications on AWS. Deployed a PBL Management System on AWS Lambda serving 5,000+ users, implementing CI/CD pipelines and serverless architecture for scalability and cost efficiency.',
} as const;

// Projects
export const PROJECTS: Project[] = [
  {
    id: 'pbl-management',
    title: 'PBL Management System',
    description: 'Serverless web application deployed on AWS Lambda serving 5,000+ users with CI/CD pipeline.',
    stack: ['AWS Lambda', 'Node.js', 'React', 'DynamoDB', 'GitHub Actions'],
    isSIHWinner: true,
    featured: true,
  },
  // ... additional projects
];

// Skills grouped by category
export const SKILLS: Record<string, string[]> = {
  cloud:    ['AWS', 'AWS Lambda', 'EC2', 'S3', 'DynamoDB'],
  devops:   ['Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions', 'Terraform'],
  frontend: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
  backend:  ['Node.js', 'Express', 'REST APIs'],
};

// Experience
export const EXPERIENCE: ExperienceEntry[] = [
  // ... entries
];

// Achievements
export const ACHIEVEMENTS: Achievement[] = [
  // ... entries
];
```

### Design Tokens (Tailwind config extension)

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      accent: {
        blue:    '#38BDF8', // sky-400
        cyan:    '#22D3EE', // cyan-400
        green:   '#4ADE80', // green-400
        lavender:'#C4B5FD', // violet-300
      },
    },
    fontFamily: {
      sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
    },
    boxShadow: {
      'soft-sm': '0 2px 8px 0 rgba(0,0,0,0.06)',
      'soft-md': '0 4px 20px 0 rgba(0,0,0,0.08)',
      'soft-lg': '0 8px 40px 0 rgba(0,0,0,0.10)',
      'glow-blue': '0 0 20px 2px rgba(56,189,248,0.25)',
    },
    borderRadius: {
      '2xl': '1rem',
      '3xl': '1.5rem',
    },
  },
}
```

### Fluid Typography Scale

```css
/* Applied via Tailwind @layer base or inline clamp() */
--text-hero:    clamp(2.5rem, 6vw, 5rem);
--text-section: clamp(1.75rem, 3.5vw, 2.75rem);
--text-body:    clamp(0.9rem, 1.5vw, 1.125rem);
--text-small:   clamp(0.75rem, 1.2vw, 0.875rem);
```

### Animation Constants

```ts
// src/lib/animations.ts
export const EASE_OUT_EXPO = 'power4.out';
export const STAGGER_DELAY = 0.12;
export const SCROLL_TRIGGER_START = 'top 80%';
export const DURATION_FAST = 0.4;
export const DURATION_NORMAL = 0.7;
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Navbar renders all section links

*For any* rendered Navbar component using the standard nav items, the output should contain exactly one link for each of the six sections (Hero, About, Projects, Experience, Achievements, Contact).

**Validates: Requirements 4.2**

---

### Property 2: Active section drives active nav link

*For any* section ID passed as `activeSection` to the Navbar, the corresponding nav link should carry the active styling class, and no other link should carry it.

**Validates: Requirements 4.3**

---

### Property 3: Every project card renders all required fields

*For any* project object in the PROJECTS data array, the rendered ProjectCard should contain the project title, description, and at least one technology stack tag. If `githubUrl` or `liveUrl` is present, the corresponding link should also appear.

**Validates: Requirements 7.3**

---

### Property 4: SIH Winner badge appears on all flagged projects

*For any* project where `isSIHWinner` is `true`, the rendered ProjectCard should contain the "SIH Winner" badge element. For any project where `isSIHWinner` is `false` or absent, the badge should not appear.

**Validates: Requirements 7.5**

---

### Property 5: Every skill in data is rendered as a badge

*For any* skill string present in the SKILLS data model, a corresponding SkillBadge component should be present in the rendered About section output.

**Validates: Requirements 6.3**

---

### Property 6: Skill badges are grouped by category

*For any* category key in the SKILLS data model, all SkillBadge components belonging to that category should appear within the same parent container element in the rendered DOM.

**Validates: Requirements 6.5**

---

### Property 7: Every experience entry renders all required fields

*For any* experience entry in the EXPERIENCE data array, the rendered TimelineEntry should contain the company name, role title, employment period, and at least one description bullet.

**Validates: Requirements 8.1, 8.2**

---

### Property 8: Every achievement card renders all required fields

*For any* achievement in the ACHIEVEMENTS data array, the rendered achievement card should contain the icon, title, and organization name.

**Validates: Requirements 9.2**

---

### Property 9: Empty required fields produce validation errors

*For any* subset of required contact form fields (name, email, message) left empty on form submission, the form should display a validation error message for each empty field, and the form should not be submitted.

**Validates: Requirements 10.6**

---

### Property 10: Invalid email format produces a validation error

*For any* string that does not conform to a valid email format (e.g., missing `@`, missing domain), submitting the contact form with that string in the email field should produce a validation error on the email field.

**Validates: Requirements 10.7**

---

## Error Handling

### Contact Form Validation

- All three fields (name, email, message) are required
- Email field validated against RFC 5322 simplified pattern
- Errors displayed inline below each field using `react-hook-form`'s `formState.errors`
- No page reload on validation failure
- On successful validation, form state resets and a success message is shown

### Three.js / GSAP Initialization Failures

- Three.js canvas is wrapped in `React.lazy` + `Suspense` with a null fallback — if it fails to load, the section renders without the canvas
- GSAP ScrollTrigger is registered inside a `useEffect` with a try/catch; animation failures are silent and do not break layout

### Missing Data

- All data arrays (PROJECTS, EXPERIENCE, ACHIEVEMENTS) are typed and initialized as non-empty constants — no runtime null checks needed for data rendering
- Optional fields (`githubUrl`, `liveUrl`, `description`) are typed as optional and components conditionally render their links

---

## Testing Strategy

### Dual Testing Approach

Both unit tests and property-based tests are used. They are complementary:
- Unit tests catch specific examples, edge cases, and integration points
- Property tests verify universal correctness across all data inputs

### Property-Based Testing

**Library:** `fast-check` (TypeScript-native, works with Vitest/Jest)

Each property test runs a minimum of **100 iterations** with randomly generated inputs.

Each test is tagged with a comment in this format:
```
// Feature: portfolio-website, Property N: <property_text>
```

**Property test mapping:**

| Property | Test Description | fast-check Arbitraries |
|---|---|---|
| P1 | Navbar link count | `fc.constant(NAV_ITEMS)` |
| P2 | Active nav link | `fc.constantFrom(...sectionIds)` |
| P3 | Project card fields | `fc.record({ title, description, stack, ... })` |
| P4 | SIH Winner badge | `fc.record({ ...project, isSIHWinner: fc.boolean() })` |
| P5 | Skill badge presence | `fc.record({ category, skills: fc.array(fc.string()) })` |
| P6 | Skill badge grouping | `fc.record({ ...SKILLS })` |
| P7 | Experience entry fields | `fc.record({ company, role, period, description })` |
| P8 | Achievement card fields | `fc.record({ icon, title, organization })` |
| P9 | Empty field validation | `fc.subarray(['name','email','message'])` |
| P10 | Invalid email validation | `fc.string().filter(s => !isValidEmail(s))` |

### Unit Tests

Unit tests focus on:
- Specific rendering examples (Hero section renders name, role, summary)
- Contact info presence (email, phone, GitHub, LinkedIn in Contact section)
- Responsive layout examples (mobile hamburger menu, stacked layouts)
- Edge cases (project with no liveUrl renders without live link)

**Framework:** Vitest + React Testing Library

### Test File Structure

```
src/
├── components/
│   ├── __tests__/
│   │   ├── Navbar.test.tsx
│   │   ├── ProjectCard.test.tsx
│   │   ├── SkillBadge.test.tsx
│   │   └── ContactForm.test.tsx
├── sections/
│   ├── __tests__/
│   │   ├── Hero.test.tsx
│   │   ├── About.test.tsx
│   │   ├── Projects.test.tsx
│   │   ├── Experience.test.tsx
│   │   ├── Achievements.test.tsx
│   │   └── Contact.test.tsx
└── lib/
    └── __tests__/
        └── data.test.ts
```
