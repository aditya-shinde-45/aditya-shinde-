import { render, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import AchievementCard from '../AchievementCard';
import type { Achievement } from '../../lib/data';

// ─── Arbitraries ─────────────────────────────────────────────────────────────

// Strings with at least one non-whitespace character so RTL text queries work.
const visibleString = fc
  .string({ minLength: 1, maxLength: 60 })
  .filter((s) => s.trim().length > 0);

// P8 arbitrary: fc.record({ icon, title, organization })
const achievementArb = fc.record<Achievement>({
  icon: visibleString,
  title: visibleString,
  organization: visibleString,
  description: fc.option(visibleString, { nil: undefined }),
});

// ─── Property 8: Every achievement card renders all required fields ───────────

describe('AchievementCard — Property 8: required fields always render', () => {
  // Feature: portfolio-website, Property 8: Every achievement card renders all required fields
  // Validates: Requirements 9.2
  it('renders icon, title, and organization for any achievement', { timeout: 30000 }, () => {
    fc.assert(
      fc.property(achievementArb, (achievement) => {
        const { container, unmount } = render(
          <AchievementCard achievement={achievement} />,
        );
        const card = within(container);

        // Icon must be present in the <span role="img">
        const iconSpan = container.querySelector('span[aria-hidden="true"]');
        expect(iconSpan?.textContent).toBe(achievement.icon);

        // Title must be present in <h3>
        const heading = card.getByRole('heading', { level: 3 });
        expect(heading.textContent).toBe(achievement.title);

        // Organization must be present in <p>
        const orgEl = container.querySelector('p');
        expect(orgEl?.textContent).toBe(achievement.organization);

        unmount();
      }),
      { numRuns: 100 },
    );
  });
});
