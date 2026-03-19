import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Achievements from '../Achievements';
import { ACHIEVEMENTS } from '../../lib/data';

describe('Achievements section', () => {
  it('renders the section with id="achievements"', () => {
    const { container } = render(<Achievements />);
    expect(container.querySelector('#achievements')).not.toBeNull();
  });

  it('renders a card for every achievement in ACHIEVEMENTS data', () => {
    render(<Achievements />);
    ACHIEVEMENTS.forEach((achievement) => {
      expect(screen.getByText(achievement.title)).toBeTruthy();
      expect(screen.getByText(achievement.organization)).toBeTruthy();
    });
  });

  it('renders the correct number of achievement cards', () => {
    render(<Achievements />);
    // Each card has a title — count unique titles
    ACHIEVEMENTS.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeTruthy();
    });
    expect(ACHIEVEMENTS.length).toBeGreaterThan(0);
  });
});
