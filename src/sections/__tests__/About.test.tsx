// Feature: portfolio-website, Property 6: Skill badges are grouped by category
import { render, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import About from '../About';
import { SKILLS } from '../../lib/data';

type SkillCategory = keyof typeof SKILLS;
const categories = Object.keys(SKILLS) as SkillCategory[];

/**
 * Property 6: Skill badges are grouped by category
 * Validates: Requirements 6.5
 *
 * For any category key in the SKILLS data model, all SkillBadge components
 * belonging to that category should appear within the same parent container
 * element in the rendered DOM (identified by data-category="<category>").
 */
describe('About — Property 6: Skill badges are grouped by category', () => {
  it('all skills for each category appear within the correct data-category container', { timeout: 30000 }, () => {
    // The About component renders the real SKILLS data, so we use fc.record
    // over the category keys to drive which category we verify each iteration.
    fc.assert(
      fc.property(
        fc.record(
          Object.fromEntries(categories.map((cat) => [cat, fc.constant(SKILLS[cat])])) as {
            [K in SkillCategory]: fc.Arbitrary<string[]>;
          }
        ),
        (skillsSnapshot) => {
          const { container, unmount } = render(<About />);

          for (const category of categories) {
            const skills = skillsSnapshot[category];

            // Find the container for this category
            const categoryContainer = container.querySelector(
              `[data-category="${category}"]`
            );
            expect(categoryContainer).toBeInTheDocument();

            const scope = within(categoryContainer as HTMLElement);

            // Every skill in this category must appear inside the category container
            for (const skill of skills) {
              const badge = scope.queryByText(skill);
              expect(badge).toBeInTheDocument();
            }

            // Skills from OTHER categories must NOT appear inside this container
            for (const otherCat of categories) {
              if (otherCat === category) continue;
              for (const otherSkill of skillsSnapshot[otherCat]) {
                // Only check if the skill name is unique across categories
                const appearsInOtherCats = categories
                  .filter((c) => c !== category)
                  .some((c) => skillsSnapshot[c].includes(otherSkill));
                const appearsInThisCat = skills.includes(otherSkill);

                if (appearsInOtherCats && !appearsInThisCat) {
                  const badge = scope.queryByText(otherSkill);
                  expect(badge).not.toBeInTheDocument();
                }
              }
            }
          }

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Unit test — About section mobile layout (Req 6.7)
describe('About — mobile layout: columns stack vertically', () => {
  it('layout container has flex-col class for mobile stacking', () => {
    const { container } = render(<About />);

    // The layout container uses "flex flex-col md:grid md:grid-cols-2"
    const layoutContainer = container.querySelector('.flex-col.md\\:grid-cols-2');
    expect(layoutContainer).toBeInTheDocument();
    expect(layoutContainer).toHaveClass('flex-col');
  });
});
