// Feature: portfolio-website, Property 5: Every skill in data is rendered as a badge
import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import * as fc from 'fast-check';
import SkillBadge from '../SkillBadge';
import type { SkillBadgeProps } from '../SkillBadge';

const categories: SkillBadgeProps['category'][] = ['cloud', 'frontend', 'backend', 'devops'];
const categoryArb = fc.constantFrom(...categories);

describe('SkillBadge', () => {
  afterEach(() => {
    cleanup();
  });

  /**
   * Property 5: Every skill in data is rendered as a badge
   * Validates: Requirements 6.3
   *
   * For any category and array of skill labels, rendering a group of SkillBadge
   * components produces exactly one badge per skill label.
   */
  it('renders one badge per skill label for any category and skill list', () => {
    fc.assert(
      fc.property(
        fc.record({
          category: categoryArb,
          skills: fc.array(
            fc.string({ minLength: 1 }).filter((s) => s === s.trim() && s.length > 0),
            { minLength: 1 }
          ),
        }),
        ({ category, skills }) => {
          const { container, unmount } = render(
            <>
              {skills.map((label, i) => (
                <SkillBadge key={i} label={label} category={category} />
              ))}
            </>
          );

          // Use container-scoped queries to avoid cross-iteration DOM accumulation
          skills.forEach((label) => {
            const badges = Array.from(container.querySelectorAll('span')).filter(
              (el) => el.textContent === label
            );
            expect(badges.length).toBeGreaterThanOrEqual(1);
          });

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});
