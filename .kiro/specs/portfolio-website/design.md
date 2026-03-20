# Design Document: Portfolio Website

## Overview

A single-page portfolio application built with React.js (TypeScript), Tailwind CSS, GSAP, and Three.js. The site presents Aditya Shinde's professional identity as a DevOps Engineer and Full Stack Developer through six distinct sections: Hero, About, Projects, Experience, Achievements, and Contact.

The design philosophy is "less but better" — every element earns its place. The visual language is light, minimal, and premium: white backgrounds, subtle accent gradients, soft shadows, and purposeful animation. The site is mobile-first, fully responsive, and optimized for fast load times.

The Attention_Flow prioritizes content in this order: Name & Role → Key Projects (SIH Winner) → DevOps & Cloud Identity → Experience → Skills & Certifications. This is achieved through size contrast, weight contrast, color emphasis, and generous whitespace around high-importance elements.

---

## Architecture

The application is a client-side React SPA with no backend. Contact form submissions are handled client-side (validation only; actual sending can be wired to EmailJS or a serverless function later).

```
src/
├── assets/           # Images, icons, fonts
├── components/       # Reusable UI primitives (Button, Card, Badge, etc.)
├── sections/         # Full-page section components (Hero, About, Projects, etc.)
├── hooks/            # Custom React hooks (useScrollSpy, useGSAP, etc.)
├── lib/              # Three.js scene setup, GSAP config, data constants, animation constants
└── App.tsx           # Root component, section assembly, Navbar
```

**Key dependencies:**
- `react` + `typescript`
- `tailwindcss`
- `gsap` + `@gsap/react` (ScrollTrigger plugin)
- `three` + `@react-three/fiber` + `@react-three/drei` (Three.js abstraction)
- `react-hook-form` (contact form validation)

**Code splitting strategy:**
- Three.js canvas is loaded via `React.lazy` + `Suspense` — if it fails to load, the section renders without the canvas (null fallback)
- GSAP ScrollTrigger is registered once in `App.tsx` on mount inside a `useEffect`
- Heavy libraries (Three.js, GSAP) are not imported at the top level of `App.tsx`; they are dynamically imported or lazy-loaded to avoid blocking the initial render

**Performance constraints:**
- All static image assets are optimized before bundling (compressed, correct format)
- Images and heavy assets use lazy loading (`loading="lazy"` or Intersection Observer)
- Three.js particle count is capped to maintain ≥ 60fps on modern devices
- On mobile viewports, Three.js particles/decorative visuals are hidden or replaced with a static fallback

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
- Fixed position, `z-50`, white/off-white background, subtle bottom shadow
- Active link detection via `useScrollSpy` hook (IntersectionObserver)
- Mobile (< 768px): hamburger toggle, slide-down menu with smooth open/close animation
- Clicking a nav link triggers smooth scroll to the target section

### useScrollSpy Hook

```tsx
// Returns the ID of the section currently most visible in the viewport
function useScrollSpy(sectionIds: string[], options?: IntersectionObserverInit): string
```

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
- Minimum touch target: 44px height and width (mobile accessibility)

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
- SIH Winner badge: gradient pill tag (sky-blue → lavender), only rendered when `isSIHWinner === true`
- Featured project receives elevated card styling (larger shadow, prominent grid position)
- GitHub and live demo links rendered conditionally only when the respective URL is present

### SkillBadge

```tsx
interface SkillBadgeProps {
  label: string;
  category: 'cloud' | 'frontend' | 'backend' | 'devops';
}
```

- Pill shape, category-tinted background (very light), 2xl rounded corners, soft elevation
- Hover: `scale(1.06)` + shadow increase
- Badges grouped by category in separate container elements

### TimelineEntry

```tsx
interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  description: string[];
}
```

- Vertical timeline layout with Timeline_Node markers and connecting lines
- Typography hierarchy: role title most prominent, company name secondary, description tertiary
- Decorative lines and nodes are minimal and do not compete with content

### AchievementCard

```tsx
interface Achievement {
  icon: string;        // Emoji or icon component name
  title: string;
  organization: string;
  description?: string;
}
```

- Hover: subtle lift (upward translate + shadow increase)
- Responsive grid layout

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
- `email`: required + valid email format (RFC 5322 simplified pattern)
- `message`: required
- Errors displayed inline below each field
- No page reload on validation failure
- On successful validation, form state resets and a success message is shown

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
export const SKILLS: Record<'cloud' | 'devops' | 'frontend' | 'backend', string[]> = {
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
        blue:     '#0EA5E9',   // sky blue — primary tech accent
        cyan:     '#06B6D4',   // cyan — secondary tech accent
        green:    '#22C55E',   // green — DevOps / growth identity
        lavender: '#A78BFA',   // lavender — creative / modern highlight
      },
      soft: {
        blue:     '#E0F2FE',
        green:    '#DCFCE7',
        lavender: '#F3E8FF',
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

**Color usage rules (per Req 2.5–2.6):**
- Maximum one primary color and one accent color per section
- Gradients used only as text highlights, borders, or soft background overlays — never as dominant fills
- Base backgrounds: `#FFFFFF` and `#F8FAFC` only

**Gradient utilities (applied via Tailwind arbitrary or custom class):**
```css
/* Text gradient — for name/heading highlights */
.gradient-text {
  background: linear-gradient(135deg, #0EA5E9, #A78BFA);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Soft background overlay — for hero right-side blob, section accents */
.gradient-bg {
  background: linear-gradient(135deg, #0EA5E9, #A78BFA);
}
```

The `gradient-bg` class is used as a soft overlay or blob shape in the Hero section's right-side visual (Three.js fallback or decorative shape). Per Req 2.6, it is never used as a dominant fill — only as a subtle background accent at reduced opacity (e.g., `opacity-10` to `opacity-20`).

### Fluid Typography Scale

```css
/* Applied via Tailwind @layer base */
:root {
  --text-hero:    clamp(2.5rem, 6vw, 5rem);
  --text-section: clamp(1.75rem, 3.5vw, 2.75rem);
  --text-body:    clamp(0.9rem, 1.5vw, 1.125rem);
  --text-small:   clamp(0.75rem, 1.2vw, 0.875rem);
}
```

Font weight is the primary typographic hierarchy tool (bold vs regular), not size differences alone.

### Spacing System

All margins, paddings, and gaps follow an 8px base unit. Desktop layouts use a 12-column grid with generous whitespace. Higher-importance elements receive more surrounding whitespace to signal priority.

### Animation Constants

```ts
// src/lib/animations.ts
export const EASE_OUT_EXPO = 'power4.out';
export const STAGGER_DELAY = 0.12;
export const SCROLL_TRIGGER_START = 'top 80%';
export const DURATION_FAST = 0.4;
export const DURATION_NORMAL = 0.7;
```

**Animation system rules (per Req 11):**
- All scroll-triggered animations use `EASE_OUT_EXPO` and fast durations to feel natural
- No more than one simultaneous animation on the same element
- Hover animations on buttons: `scale(1.04)` + color transition, 200ms
- Hover animations on cards: upward translate + shadow increase
- Three.js particles/shapes are kept subtle and non-intrusive to text readability

### Responsive Breakpoints

| Breakpoint | Range | Layout behavior |
|---|---|---|
| Mobile | < 768px | Single column, stacked layouts, hamburger nav, Three.js hidden |
| Tablet | 768px–1024px | Two-column where applicable, partial grid |
| Desktop | > 1024px | Full grid (3-col projects, 2-col about), split hero |

All touch targets on mobile are minimum 44×44px.

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

---

### Property 1: Navbar renders all section links

*For any* rendered Navbar component using the standard nav items, the output should contain exactly one link for each of the six sections (Hero, About, Projects, Experience, Achievements, Contact).

**Validates: Requirements 4.2**

---

### Property 2: Active section drives active nav link

*For any* section ID passed as `activeSection` to the Navbar, the corresponding nav link should carry the active styling class, and no other link should carry it.

**Validates: Requirements 4.3**

---

### Property 3: Every project card renders all required fields

*For any* project object in the PROJECTS data array, the rendered ProjectCard should contain the project title, description, and at least one technology stack tag. If `githubUrl` or `liveUrl` is present, the corresponding link should also appear. If either URL is absent, the corresponding link should not appear.

**Validates: Requirements 7.3**

---

### Property 4: SIH Winner badge appears on all flagged projects only

*For any* project object, the rendered ProjectCard should display the "SIH Winner" badge if and only if `isSIHWinner === true`. For any project where `isSIHWinner` is `false` or absent, the badge should not appear.

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

**Validates: Requirements 8.2**

---

### Property 8: Every achievement card renders all required fields

*For any* achievement in the ACHIEVEMENTS data array, the rendered achievement card should contain the icon, title, and organization name.

**Validates: Requirements 9.2**

---

### Property 9: Empty required fields produce inline validation errors

*For any* subset of required contact form fields (name, email, message) left empty on form submission, the form should display a validation error message for each empty field, and the form should not be submitted (no success state reached).

**Validates: Requirements 10.6**

---

### Property 10: Invalid email format produces a validation error

*For any* string that does not conform to a valid email format (e.g., missing `@`, missing domain), submitting the contact form with that string in the email field should produce a validation error on the email field and not reach the success state.

**Validates: Requirements 10.7**

---

### Property 11: All interactive mobile touch targets meet minimum size

*For any* interactive element (button, link, nav item) rendered in the mobile viewport, its rendered height and width should each be at least 44px.

**Validates: Requirements 12.5**

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

### Missing or Optional Data

- All data arrays (PROJECTS, EXPERIENCE, ACHIEVEMENTS) are typed and initialized as non-empty constants — no runtime null checks needed for data rendering
- Optional fields (`githubUrl`, `liveUrl`, `description`) are typed as optional and components conditionally render their links/content

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
| P2 | Active nav link exclusivity | `fc.constantFrom(...sectionIds)` |
| P3 | Project card required fields + conditional links | `fc.record({ title, description, stack, githubUrl?, liveUrl? })` |
| P4 | SIH Winner badge presence/absence | `fc.record({ ...project, isSIHWinner: fc.boolean() })` |
| P5 | Skill badge presence for all skills | `fc.record({ category, skills: fc.array(fc.string(), { minLength: 1 }) })` |
| P6 | Skill badge grouping by category | `fc.record({ ...SKILLS })` |
| P7 | Experience entry required fields | `fc.record({ company, role, period, description: fc.array(fc.string(), { minLength: 1 }) })` |
| P8 | Achievement card required fields | `fc.record({ icon, title, organization })` |
| P9 | Empty field validation | `fc.subarray(['name','email','message'], { minLength: 1 })` |
| P10 | Invalid email validation | `fc.string().filter(s => !isValidEmail(s))` |
| P11 | Mobile touch target minimum size | `fc.constantFrom(...interactiveElementSelectors)` |

### Unit Tests

Unit tests focus on:
- Hero section renders name, role, and summary text
- Hero section renders exactly two CTA buttons
- Contact section renders email, phone, GitHub, and LinkedIn
- Contact section renders name, email, and message input fields
- Navbar is fixed and has correct background styling
- Navbar collapses to hamburger on mobile viewport
- Project with no `liveUrl` renders without a live demo link
- About section stacks columns on mobile viewport
- Hero section stacks layout vertically on mobile viewport

**Framework:** Vitest + React Testing Library

### Test File Structure

```
src/
├── components/
│   └── __tests__/
│       ├── Navbar.test.tsx
│       ├── ProjectCard.test.tsx
│       ├── SkillBadge.test.tsx
│       └── ContactForm.test.tsx
├── sections/
│   └── __tests__/
│       ├── Hero.test.tsx
│       ├── About.test.tsx
│       ├── Projects.test.tsx
│       ├── Experience.test.tsx
│       ├── Achievements.test.tsx
│       └── Contact.test.tsx
└── lib/
    └── __tests__/
        └── data.test.ts
```
