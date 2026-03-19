import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Experience from '../Experience';
import { EXPERIENCE } from '../../lib/data';

describe('Experience section', () => {
  it('renders the section with id="experience"', () => {
    render(<Experience />);
    expect(document.querySelector('#experience')).not.toBeNull();
  });

  it('renders the section heading "Experience"', () => {
    render(<Experience />);
    expect(screen.getByRole('heading', { name: /experience/i })).toBeInTheDocument();
  });

  it('renders a TimelineEntry for every entry in EXPERIENCE data', () => {
    render(<Experience />);
    EXPERIENCE.forEach((entry) => {
      expect(screen.getByText(entry.role)).toBeInTheDocument();
      expect(screen.getByText(entry.company)).toBeInTheDocument();
    });
  });

  it('does not render a connecting line after the last entry', () => {
    render(<Experience />);
    // The connecting lines are w-px elements; there should be one fewer than total entries
    const lines = document.querySelectorAll('.w-px');
    expect(lines.length).toBe(EXPERIENCE.length - 1);
  });
});
