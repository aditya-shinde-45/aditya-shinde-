// Feature: portfolio-website, Property 1: Navbar renders all section links
// Feature: portfolio-website, Property 2: Active section drives active nav link
import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import * as fc from 'fast-check';
import Navbar, { NAV_ITEMS } from '../Navbar';

const sectionIds = NAV_ITEMS.map((item) => item.href.replace('#', ''));

describe('Navbar', () => {
  afterEach(() => {
    cleanup();
  });

  /**
   * Property 1: Navbar renders all section links
   * Validates: Requirements 4.2
   *
   * For any rendered Navbar using the standard NAV_ITEMS, the output should
   * contain exactly one link for each of the six sections.
   */
  it('renders exactly one link per nav item for any standard nav items input', () => {
    fc.assert(
      fc.property(
        fc.constant(NAV_ITEMS),
        (items) => {
          const { container, unmount } = render(
            <Navbar items={items} activeSection="hero" />
          );

          items.forEach((item) => {
            // Desktop links are in the first <ul>, mobile in the second.
            // We check that each href appears at least once (desktop) and the
            // label text appears at least once.
            const links = Array.from(container.querySelectorAll(`a[href="${item.href}"]`));
            // At minimum the desktop link must be present (mobile may also be present)
            expect(links.length).toBeGreaterThanOrEqual(1);
          });

          // Total link count: each item appears in both desktop and mobile menus
          const allNavLinks = Array.from(container.querySelectorAll('a[href^="#"]'));
          expect(allNavLinks.length).toBe(items.length * 2);

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 2: Active section drives active nav link
   * Validates: Requirements 4.3
   *
   * For any section ID passed as activeSection, the corresponding nav link
   * should carry aria-current="page", and no other link should carry it.
   */
  it('marks only the active section link with aria-current="page" for any activeSection', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...sectionIds),
        (activeSection) => {
          const { container, unmount } = render(
            <Navbar items={NAV_ITEMS} activeSection={activeSection} />
          );

          const activeLinks = Array.from(
            container.querySelectorAll('a[aria-current="page"]')
          );

          // Each active section appears in both desktop and mobile menus → 2 active links
          expect(activeLinks.length).toBe(2);

          activeLinks.forEach((link) => {
            expect(link.getAttribute('href')).toBe(`#${activeSection}`);
          });

          // No other link should have aria-current="page"
          const allLinks = Array.from(container.querySelectorAll('a[href^="#"]'));
          const inactiveLinks = allLinks.filter(
            (link) => link.getAttribute('href') !== `#${activeSection}`
          );
          inactiveLinks.forEach((link) => {
            expect(link.getAttribute('aria-current')).toBeNull();
          });

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Unit tests for Navbar — Requirements 4.1, 4.5
import { fireEvent, screen } from '@testing-library/react';

describe('Navbar unit tests', () => {
  afterEach(() => {
    cleanup();
  });

  it('nav element has fixed positioning class', () => {
    const { container } = render(
      <Navbar items={NAV_ITEMS} activeSection="hero" />
    );
    const nav = container.querySelector('nav');
    expect(nav?.className).toContain('fixed');
  });

  it('hamburger button is present with aria-label "Open menu" when menu is closed', () => {
    render(<Navbar items={NAV_ITEMS} activeSection="hero" />);
    const btn = screen.getByRole('button', { name: 'Open menu' });
    expect(btn).toBeTruthy();
  });

  it('clicking hamburger toggles mobile menu open and closed', () => {
    render(<Navbar items={NAV_ITEMS} activeSection="hero" />);

    const openBtn = screen.getByRole('button', { name: 'Open menu' });
    fireEvent.click(openBtn);

    // After opening, aria-label should change to "Close menu"
    const closeBtn = screen.getByRole('button', { name: 'Close menu' });
    expect(closeBtn).toBeTruthy();

    fireEvent.click(closeBtn);

    // After closing, aria-label should revert to "Open menu"
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeTruthy();
  });

  it('clicking a nav link calls scrollIntoView on the target element', () => {
    const scrollIntoViewMock = vi.fn();
    const mockEl = { scrollIntoView: scrollIntoViewMock };
    vi.spyOn(document, 'getElementById').mockReturnValue(mockEl as unknown as HTMLElement);

    render(<Navbar items={NAV_ITEMS} activeSection="hero" />);

    // Click the first desktop link (About)
    const aboutLink = screen.getAllByRole('link', { name: 'About' })[0];
    fireEvent.click(aboutLink);

    expect(document.getElementById).toHaveBeenCalledWith('about');
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });

    vi.restoreAllMocks();
  });
});
