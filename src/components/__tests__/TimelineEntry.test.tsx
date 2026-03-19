import { render, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import TimelineEntry from '../TimelineEntry';
import type { ExperienceEntry } from '../../lib/data';

// ─── Arbitraries ─────────────────────────────────────────────────────────────

// Strings with at least one non-whitespace character so RTL text queries work.
const visibleString = fc
  .string({ minLength: 1, maxLength: 60 })
  .filter((s) => s.trim().length > 0);

// P7 arbitrary from design.md
const experienceArb = fc.record<ExperienceEntry>({
  company: visibleString,
  role: visibleString,
  period: visibleString,
  description: fc.array(visibleString, { minLength: 1 }),
});

// ─── Property 7: Every experience entry renders all required fields ───────────

describe('TimelineEntry — Property 7: required fields always render', () => {
  // Feature: portfolio-website, Property 7: Every experience entry renders all required fields
  it('renders company, role, period, and at least one description bullet for any entry', { timeout: 30000 }, () => {
    fc.assert(
      fc.property(experienceArb, (entry) => {
        const { container, unmount } = render(<TimelineEntry entry={entry} />);
        const card = within(container);

        // Role must be present in an <h3>
        const heading = card.getByRole('heading', { level: 3 });
        expect(heading.textContent).toBe(entry.role);

        // Company must be present — rendered in the accent-blue span
        const companySpan = container.querySelector('span.text-accent-blue');
        expect(companySpan?.textContent).toBe(entry.company);

        // Period must be present — rendered in the gray-500 span
        const periodSpan = container.querySelector('span.text-gray-500');
        expect(periodSpan?.textContent).toBe(entry.period);

        // At least one description bullet must be present
        const bullets = container.querySelectorAll('ul li');
        expect(bullets.length).toBeGreaterThanOrEqual(1);

        // First bullet text must match
        const firstBulletText = bullets[0].querySelector('span:last-child')?.textContent;
        expect(firstBulletText).toBe(entry.description[0]);

        unmount();
      }),
      { numRuns: 100 },
    );
  });
});
