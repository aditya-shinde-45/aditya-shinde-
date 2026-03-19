import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from '../Hero';
import { PERSONAL } from '../../lib/data';

describe('Hero section', () => {
  describe('content', () => {
    it('renders the section with id="hero"', () => {
      render(<Hero />);
      expect(document.getElementById('hero')).toBeInTheDocument();
    });

    it('renders the name with gradient-text class (Req 5.2)', () => {
      render(<Hero />);
      const nameEl = screen.getByText(PERSONAL.name);
      expect(nameEl).toBeInTheDocument();
      expect(nameEl.className).toContain('gradient-text');
    });

    it('renders the role subtitle (Req 5.3)', () => {
      render(<Hero />);
      expect(screen.getByText(PERSONAL.role)).toBeInTheDocument();
    });

    it('renders the professional summary (Req 5.4)', () => {
      render(<Hero />);
      expect(screen.getByText(PERSONAL.summary)).toBeInTheDocument();
    });
  });

  describe('CTA buttons (Req 5.5)', () => {
    it('renders exactly two CTA buttons/links', () => {
      render(<Hero />);
      const links = screen.getAllByRole('link');
      // Only the two CTA buttons should be links in the Hero section
      expect(links).toHaveLength(2);
    });

    it('renders "View Projects" button linking to #projects', () => {
      render(<Hero />);
      const link = screen.getByRole('link', { name: 'View Projects' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '#projects');
    });

    it('renders "Contact Me" button linking to #contact', () => {
      render(<Hero />);
      const link = screen.getByRole('link', { name: 'Contact Me' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '#contact');
    });
  });

  describe('layout (Req 5.1, 5.9)', () => {
    it('has min-h-screen class to fill the viewport', () => {
      render(<Hero />);
      const section = document.getElementById('hero');
      expect(section?.className).toContain('min-h-screen');
    });

    it('uses flex-col on mobile and flex-row on desktop', () => {
      render(<Hero />);
      // The inner layout div should have both flex-col and lg:flex-row
      const section = document.getElementById('hero');
      const layoutDiv = section?.querySelector('.flex-col.lg\\:flex-row');
      expect(layoutDiv).toBeInTheDocument();
    });
  });
});
