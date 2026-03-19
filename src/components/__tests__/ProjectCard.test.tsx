import { render, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import ProjectCard from '../ProjectCard';
import type { Project } from '../../lib/data';

// ─── Arbitraries ─────────────────────────────────────────────────────────────

// Strings with at least one non-whitespace character so RTL text queries work.
const visibleString = fc
  .string({ minLength: 1, maxLength: 60 })
  .filter((s) => s.trim().length > 0);

const projectArb = fc.record<Project>({
  id: visibleString,
  title: visibleString,
  description: visibleString,
  stack: fc.array(visibleString, { minLength: 1, maxLength: 6 }),
  githubUrl: fc.option(fc.webUrl(), { nil: undefined }),
  liveUrl: fc.option(fc.webUrl(), { nil: undefined }),
  isSIHWinner: fc.option(fc.boolean(), { nil: undefined }),
  featured: fc.option(fc.boolean(), { nil: undefined }),
});

const projectWithSIHArb = fc.record<Project>({
  id: visibleString,
  title: visibleString,
  description: visibleString,
  stack: fc.array(visibleString, { minLength: 1, maxLength: 6 }),
  githubUrl: fc.option(fc.webUrl(), { nil: undefined }),
  liveUrl: fc.option(fc.webUrl(), { nil: undefined }),
  isSIHWinner: fc.boolean(),
  featured: fc.option(fc.boolean(), { nil: undefined }),
});

// ─── Property 3: Every project card renders all required fields ───────────────

describe('ProjectCard — Property 3: required fields always render', () => {
  // Feature: portfolio-website, Property 3: Every project card renders all required fields
  it('renders title, description, and at least one stack tag for any project', { timeout: 30000 }, () => {
    fc.assert(
      fc.property(projectArb, (project) => {
        const { container, unmount } = render(<ProjectCard project={project} />);
        const card = within(container);

        // Title must be present (rendered in <h3>)
        const heading = card.getByRole('heading', { level: 3 });
        expect(heading.textContent).toBe(project.title);

        // Description must be present (rendered in <p>)
        const para = container.querySelector('p');
        expect(para?.textContent).toBe(project.description);

        // At least one stack tag must be present — query the stack spans directly
        // to avoid ambiguity when title/description/stack values coincide.
        const stackContainer = container.querySelector('.flex.flex-wrap.gap-2');
        const stackSpans = stackContainer ? Array.from(stackContainer.querySelectorAll('span')) : [];
        expect(stackSpans.length).toBeGreaterThanOrEqual(1);
        expect(stackSpans[0].textContent?.trim()).toBe(project.stack[0].trim());

        unmount();
      }),
      { numRuns: 100 },
    );
  });

  // Feature: portfolio-website, Property 3: GitHub link appears iff githubUrl is present
  it('renders GitHub link if and only if githubUrl is present', () => {
    fc.assert(
      fc.property(projectArb, (project) => {
        const { container, unmount } = render(<ProjectCard project={project} />);
        const card = within(container);

        // Find the GitHub link by its visible text content
        const githubLink = card.queryByText('GitHub')?.closest('a') ?? null;

        if (project.githubUrl) {
          expect(githubLink).toBeInTheDocument();
          expect(githubLink).toHaveAttribute('href', project.githubUrl);
        } else {
          expect(githubLink).not.toBeInTheDocument();
        }

        unmount();
      }),
      { numRuns: 100 },
    );
  });

  // Feature: portfolio-website, Property 3: Live Demo link appears iff liveUrl is present
  it('renders Live Demo link if and only if liveUrl is present', () => {
    fc.assert(
      fc.property(projectArb, (project) => {
        const { container, unmount } = render(<ProjectCard project={project} />);
        const card = within(container);

        // Find the Live Demo link by its visible text content
        const liveLink = card.queryByText('Live Demo')?.closest('a') ?? null;

        if (project.liveUrl) {
          expect(liveLink).toBeInTheDocument();
          expect(liveLink).toHaveAttribute('href', project.liveUrl);
        } else {
          expect(liveLink).not.toBeInTheDocument();
        }

        unmount();
      }),
      { numRuns: 100 },
    );
  });
});

// ─── Property 4: SIH Winner badge appears on flagged projects only ────────────

describe('ProjectCard — Property 4: SIH Winner badge iff isSIHWinner === true', () => {
  // Feature: portfolio-website, Property 4: SIH Winner badge appears on all flagged projects only
  it('shows SIH Winner badge if and only if isSIHWinner is true', () => {
    fc.assert(
      fc.property(projectWithSIHArb, (project) => {
        const { container, unmount } = render(<ProjectCard project={project} />);
        const card = within(container);

        const badge = card.queryByText(/SIH Winner/i);

        if (project.isSIHWinner === true) {
          expect(badge).toBeInTheDocument();
        } else {
          expect(badge).not.toBeInTheDocument();
        }

        unmount();
      }),
      { numRuns: 100 },
    );
  });
});
