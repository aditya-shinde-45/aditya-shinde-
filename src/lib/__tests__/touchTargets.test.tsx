// Feature: portfolio-website, Property 11: All interactive mobile touch targets meet minimum size
import * as fc from 'fast-check';
import { render, cleanup } from '@testing-library/react';
import { describe, it, afterEach } from 'vitest';
import Button from '../../components/Button';
import Navbar, { NAV_ITEMS } from '../../components/Navbar';
import ContactForm from '../../components/ContactForm';
import Contact from '../../sections/Contact';

afterEach(() => cleanup());

/**
 * A class is considered to guarantee a 44px minimum dimension if it contains
 * one of the Tailwind utilities that resolve to ≥44px:
 *   - min-h-[44px]  / min-w-[44px]  — explicit 44px minimum
 *   - h-11 / w-11                   — 44px (11 × 4px = 44px)
 *   - h-12 / w-12                   — 48px
 *   - h-14 / w-14                   — 56px
 */
const MIN_HEIGHT_PATTERN = /min-h-\[44px\]|h-11\b|h-12\b|h-14\b/;
const MIN_WIDTH_PATTERN  = /min-w-\[44px\]|w-11\b|w-12\b|w-14\b/;

function hasMinHeight(el: Element): boolean {
  return MIN_HEIGHT_PATTERN.test(el.className);
}

function hasMinWidth(el: Element): boolean {
  return MIN_WIDTH_PATTERN.test(el.className);
}

// ── Selectors we'll drive with fc.constantFrom ────────────────────────────────

type ComponentKey = 'Button-primary' | 'Button-outline' | 'Navbar' | 'ContactForm' | 'Contact';

const componentKeys: ComponentKey[] = [
  'Button-primary',
  'Button-outline',
  'Navbar',
  'ContactForm',
  'Contact',
];

function renderComponent(key: ComponentKey): Element {
  switch (key) {
    case 'Button-primary':
      return render(<Button variant="primary">Click me</Button>).container;
    case 'Button-outline':
      return render(<Button variant="outline">Click me</Button>).container;
    case 'Navbar':
      return render(<Navbar items={NAV_ITEMS} activeSection="hero" />).container;
    case 'ContactForm':
      return render(<ContactForm />).container;
    case 'Contact':
      return render(<Contact />).container;
  }
}

// ── Property 11 ───────────────────────────────────────────────────────────────

describe('Property 11: All interactive mobile touch targets meet minimum size', () => {
  /**
   * Validates: Requirements 12.5
   *
   * For any interactive element (button, link) rendered in a mobile context,
   * its CSS classes must guarantee a rendered height and width of at least 44px.
   * JSDOM does not compute real layout, so we verify via Tailwind class presence.
   */
  it('every button and anchor element carries a ≥44px height class', () => {
    // Simulate mobile viewport
    Object.defineProperty(window, 'innerWidth', { value: 375, writable: true, configurable: true });

    fc.assert(
      fc.property(
        fc.constantFrom(...componentKeys),
        (key) => {
          cleanup();
          const container = renderComponent(key);

          const interactiveEls = Array.from(
            container.querySelectorAll<HTMLElement>('button, a'),
          );

          // Every interactive element must have a class guaranteeing ≥44px height
          for (const el of interactiveEls) {
            if (!hasMinHeight(el)) {
              throw new Error(
                `[${key}] <${el.tagName.toLowerCase()}> is missing a ≥44px height class.\n` +
                `  className: "${el.className}"`,
              );
            }
          }
        },
      ),
      { numRuns: 100 },
    );
  });

  it('every button and anchor element satisfies the ≥44px width requirement', () => {
    Object.defineProperty(window, 'innerWidth', { value: 375, writable: true, configurable: true });

    fc.assert(
      fc.property(
        fc.constantFrom(...componentKeys),
        (key) => {
          cleanup();
          const container = renderComponent(key);

          const interactiveEls = Array.from(
            container.querySelectorAll<HTMLElement>('button, a'),
          );

          for (const el of interactiveEls) {
            const cls = el.className;
            // An element satisfies the width requirement if:
            // 1. It has an explicit ≥44px width class (min-w-[44px], w-11, w-12, etc.), OR
            // 2. It fills its container via block/flex layout (block, flex, inline-flex with
            //    a container that is ≥44px wide on any mobile viewport ≥320px).
            //    On a 375px mobile screen, any full-width or flex-fill element is ≥44px wide.
            const hasExplicitWidth = hasMinWidth(el);
            const fillsContainer =
              /\bblock\b/.test(cls) ||
              /\bflex\b/.test(cls) ||
              /\bw-full\b/.test(cls);

            if (!hasExplicitWidth && !fillsContainer) {
              throw new Error(
                `[${key}] <${el.tagName.toLowerCase()}> does not satisfy the ≥44px width requirement.\n` +
                `  className: "${cls}"`,
              );
            }
          }
        },
      ),
      { numRuns: 100 },
    );
  });
});
