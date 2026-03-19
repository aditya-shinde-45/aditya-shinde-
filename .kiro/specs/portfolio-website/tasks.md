# Implementation Plan: Portfolio Website

## Overview

Incremental implementation of the portfolio SPA. Each task builds on the previous, starting with project scaffolding and design tokens, then building reusable components, then assembling sections, and finally wiring everything together with animations and performance optimizations.

## Tasks

- [x] 1. Scaffold project and configure tooling
  - Bootstrap Vite + React + TypeScript project
  - Install and configure Tailwind CSS with the design token extensions (colors, shadows, border radius, font family) from `tailwind.config.ts`
  - Add `@layer base` CSS with fluid typography CSS variables and gradient utility classes (`.gradient-text`, `.gradient-bg`)
  - Install dependencies: `gsap`, `@gsap/react`, `three`, `@react-three/fiber`, `@react-three/drei`, `react-hook-form`, `fast-check`, `vitest`, `@testing-library/react`
  - Create folder structure: `src/assets/`, `src/components/`, `src/sections/`, `src/hooks/`, `src/lib/`
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 2.1–2.14_

- [x] 2. Create data constants and animation config
  - [x] 2.1 Create `src/lib/data.ts` with all typed constants: `PERSONAL`, `PROJECTS`, `SKILLS`, `EXPERIENCE`, `ACHIEVEMENTS`
    - Populate with Aditya's real data including the SIH Winner PBL Management System project
    - _Requirements: 5.2, 5.3, 5.4, 7.3, 7.5, 8.2, 9.2, 10.4_
  - [x] 2.2 Create `src/lib/animations.ts` with animation constants (`EASE_OUT_EXPO`, `STAGGER_DELAY`, `SCROLL_TRIGGER_START`, `DURATION_FAST`, `DURATION_NORMAL`)
    - _Requirements: 11.1, 11.2_

- [x] 3. Implement core reusable components
  - [x] 3.1 Implement `Button` component with `primary` and `outline` variants
    - Apply hover scale + shadow transition (200ms), minimum 44px touch target
    - _Requirements: 5.5, 11.3, 12.5_
  - [x] 3.2 Implement `SkillBadge` component
    - Pill shape, category-tinted background, 2xl rounded corners, hover scale + shadow
    - _Requirements: 6.3, 6.4, 6.6_
  - [x] 3.3 Write property test for SkillBadge rendering
    - **Property 5: Every skill in data is rendered as a badge**
    - **Validates: Requirements 6.3**
  - [x] 3.4 Implement `ProjectCard` component
    - Render title, description, stack tags, conditional GitHub/live links, conditional SIH Winner badge
    - Hover: scale + glow border + 3D tilt
    - _Requirements: 7.3, 7.4, 7.5_
  - [x] 3.5 Write property tests for ProjectCard
    - **Property 3: Every project card renders all required fields**
    - **Property 4: SIH Winner badge appears on all flagged projects only**
    - **Validates: Requirements 7.3, 7.5**
  - [x] 3.6 Implement `TimelineEntry` component
    - Render company, role, period, description bullets with correct typographic hierarchy
    - _Requirements: 8.2, 8.4_
  - [x] 3.7 Write property test for TimelineEntry
    - **Property 7: Every experience entry renders all required fields**
    - **Validates: Requirements 8.2**
  - [x] 3.8 Implement `AchievementCard` component
    - Render icon, title, organization; hover lift effect
    - _Requirements: 9.2, 9.3_
  - [x] 3.9 Write property test for AchievementCard
    - **Property 8: Every achievement card renders all required fields**
    - **Validates: Requirements 9.2**

- [x] 4. Checkpoint — Ensure all component tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Implement `useScrollSpy` hook and `Navbar`
  - [x] 5.1 Implement `useScrollSpy` hook using IntersectionObserver
    - Returns the ID of the currently most-visible section
    - _Requirements: 4.3_
  - [x] 5.2 Implement `Navbar` component
    - Fixed position, white background, subtle bottom shadow
    - Active link driven by `useScrollSpy`; smooth scroll on link click
    - Mobile hamburger toggle with slide-down animation
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_
  - [x] 5.3 Write property tests for Navbar
    - **Property 1: Navbar renders all section links**
    - **Property 2: Active section drives active nav link**
    - **Validates: Requirements 4.2, 4.3**
  - [x] 5.4 Write unit tests for Navbar
    - Test fixed positioning, hamburger collapse on mobile viewport, smooth scroll trigger
    - _Requirements: 4.1, 4.5_

- [x] 6. Implement Hero section
  - [x] 6.1 Implement `Hero` section component
    - Desktop: split layout (text left, visual right); mobile: stacked vertically
    - Render name with `.gradient-text`, role subtitle, professional summary, two CTA buttons
    - Floating micro-elements as decorative background accents
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.7, 5.9_
  - [x] 6.2 Add GSAP stagger entrance animation on Hero text elements
    - Animate on mount using `useEffect` + GSAP timeline with `STAGGER_DELAY` and `EASE_OUT_EXPO`
    - _Requirements: 5.6_
  - [x] 6.3 Add Three.js particle/gradient blob to Hero right-side visual
    - Load via `React.lazy` + `Suspense` with null fallback
    - Cap particle count for 60fps; hide on mobile
    - _Requirements: 5.8, 12.6, 13.2, 13.4_
  - [x] 6.4 Write unit tests for Hero section
    - Test name, role, summary text presence; exactly two CTA buttons; mobile stacked layout
    - _Requirements: 5.2, 5.3, 5.4, 5.5, 5.9_

- [x] 7. Implement About section
  - [x] 7.1 Implement `About` section component
    - Desktop: two-column (description left, skill badges right); mobile: stacked
    - Render professional summary paragraphs
    - Render `SkillBadge` components grouped by category from `SKILLS` data
    - _Requirements: 6.1, 6.2, 6.3, 6.5, 6.7_
  - [x] 7.2 Write property test for skill badge grouping
    - **Property 6: Skill badges are grouped by category**
    - **Validates: Requirements 6.5**
  - [x] 7.3 Write unit test for About section mobile layout
    - Test that columns stack vertically on mobile viewport
    - _Requirements: 6.7_

- [x] 8. Implement Projects section
  - [x] 8.1 Implement `Projects` section component
    - Desktop: 3-column grid; mobile: 1-column stack
    - Render `ProjectCard` for each project in `PROJECTS` data
    - Featured/SIH Winner project in prominent grid position with elevated styling
    - _Requirements: 7.1, 7.2, 7.7_
  - [x] 8.2 Add GSAP ScrollTrigger staggered reveal animation to project cards
    - _Requirements: 7.6, 11.1_
  - [x] 8.3 Write unit test for Projects section mobile layout
    - Test 1-column stack on mobile viewport
    - _Requirements: 7.2_

- [x] 9. Implement Experience section
  - [x] 9.1 Implement `Experience` section component
    - Vertical timeline with `TimelineEntry` components, Timeline_Node markers, and connecting lines
    - _Requirements: 8.1, 8.5_
  - [x] 9.2 Add GSAP ScrollTrigger animation to timeline entries
    - _Requirements: 8.3, 11.1_

- [x] 10. Implement Achievements section
  - [x] 10.1 Implement `Achievements` section component
    - Responsive grid of `AchievementCard` components from `ACHIEVEMENTS` data
    - _Requirements: 9.1_
  - [x] 10.2 Add GSAP ScrollTrigger staggered reveal animation to achievement cards
    - _Requirements: 9.4, 11.1_

- [x] 11. Implement Contact section
  - [x] 11.1 Implement `ContactForm` component using `react-hook-form`
    - Fields: name, email, message — all required; email validated against RFC 5322 pattern
    - Inline error messages per field; success state on valid submission; no page reload
    - Focus state with accent border color transition
    - _Requirements: 10.2, 10.3, 10.6, 10.7_
  - [x] 11.2 Write property tests for ContactForm validation
    - **Property 9: Empty required fields produce inline validation errors**
    - **Property 10: Invalid email format produces a validation error**
    - **Validates: Requirements 10.6, 10.7**
  - [x] 11.3 Implement `Contact` section component
    - Centered layout with `ContactForm` and contact info (email, phone, GitHub, LinkedIn)
    - Hover animation on social links
    - _Requirements: 10.1, 10.4, 10.5_
  - [x] 11.4 Write unit tests for Contact section
    - Test presence of email, phone, GitHub, LinkedIn; presence of name/email/message inputs
    - _Requirements: 10.2, 10.4_

- [x] 12. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 13. Wire sections into App and add global scroll behavior
  - [x] 13.1 Assemble all sections in `App.tsx` with `Navbar`
    - Register GSAP ScrollTrigger plugin on mount inside `useEffect`
    - Implement smooth scrolling between sections
    - _Requirements: 1.4, 4.4, 11.5_
  - [x] 13.2 Add lazy loading for images and heavy assets
    - Apply `loading="lazy"` to all `<img>` elements; use Intersection Observer for any custom lazy loading
    - _Requirements: 13.1_
  - [x] 13.3 Write property test for mobile touch target sizes
    - **Property 11: All interactive mobile touch targets meet minimum size**
    - **Validates: Requirements 12.5**

- [x] 14. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests use `fast-check` with minimum 100 iterations each
- Unit tests use Vitest + React Testing Library
- Three.js canvas always loads via `React.lazy` + `Suspense` — never blocks initial render
- No dark mode variants anywhere in the codebase (strict light and premium theme)
