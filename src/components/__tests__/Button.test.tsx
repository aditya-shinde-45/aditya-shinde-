import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from '../Button';

describe('Button', () => {
  describe('rendering', () => {
    it('renders as a <button> when no href is provided', () => {
      render(<Button variant="primary">Click me</Button>);
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('renders as an <a> tag when href is provided', () => {
      render(<Button variant="primary" href="#projects">View Projects</Button>);
      const link = screen.getByRole('link', { name: 'View Projects' });
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', '#projects');
    });

    it('renders children correctly', () => {
      render(<Button variant="outline">Hello World</Button>);
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it('primary variant has gradient background classes', () => {
      render(<Button variant="primary">Primary</Button>);
      const btn = screen.getByRole('button');
      expect(btn.className).toContain('from-accent-blue');
      expect(btn.className).toContain('to-accent-cyan');
    });

    it('outline variant has border and transparent background classes', () => {
      render(<Button variant="outline">Outline</Button>);
      const btn = screen.getByRole('button');
      expect(btn.className).toContain('border-accent-blue');
      expect(btn.className).toContain('bg-transparent');
    });
  });

  describe('touch target', () => {
    it('has minimum 44px touch target via min-h and min-w classes', () => {
      render(<Button variant="primary">Touch</Button>);
      const btn = screen.getByRole('button');
      expect(btn.className).toContain('min-h-[44px]');
      expect(btn.className).toContain('min-w-[44px]');
    });
  });

  describe('hover transition', () => {
    it('has 200ms transition class', () => {
      render(<Button variant="primary">Hover</Button>);
      const btn = screen.getByRole('button');
      expect(btn.className).toContain('duration-200');
    });

    it('has scale hover class', () => {
      render(<Button variant="primary">Scale</Button>);
      const btn = screen.getByRole('button');
      expect(btn.className).toContain('hover:scale-[1.04]');
    });
  });

  describe('interaction', () => {
    it('calls onClick when button is clicked', async () => {
      const handleClick = vi.fn();
      render(<Button variant="primary" onClick={handleClick}>Click</Button>);
      screen.getByRole('button').click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick when anchor is clicked', () => {
      const handleClick = vi.fn();
      render(<Button variant="primary" href="#contact" onClick={handleClick}>Contact</Button>);
      screen.getByRole('link').click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
