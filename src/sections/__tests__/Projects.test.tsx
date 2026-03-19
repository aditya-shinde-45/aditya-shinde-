import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Projects from '../Projects';
import { PROJECTS } from '../../lib/data';

describe('Projects section', () => {
  it('renders the section with id="projects"', () => {
    render(<Projects />);
    expect(document.querySelector('#projects')).not.toBeNull();
  });

  it('renders a card for every project in PROJECTS data', () => {
    render(<Projects />);
    PROJECTS.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });
  });

  it('uses a grid with grid-cols-1 and md:grid-cols-3 classes', () => {
    render(<Projects />);
    const grid = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-3');
    expect(grid).not.toBeNull();
  });

  it('places the featured SIH Winner project in a md:col-span-2 container', () => {
    render(<Projects />);
    const featuredProject = PROJECTS.find((p) => p.featured && p.isSIHWinner);
    expect(featuredProject).toBeDefined();

    // The featured card's title should be inside a col-span-2 wrapper
    const titleEl = screen.getByText(featuredProject!.title);
    const colSpanWrapper = titleEl.closest('.md\\:col-span-2');
    expect(colSpanWrapper).not.toBeNull();
  });

  it('renders the SIH Winner badge for the featured project', () => {
    render(<Projects />);
    expect(screen.getByText(/SIH Winner/i)).toBeInTheDocument();
  });

  it('renders the section heading "Projects"', () => {
    render(<Projects />);
    expect(screen.getByRole('heading', { name: /projects/i })).toBeInTheDocument();
  });
});
