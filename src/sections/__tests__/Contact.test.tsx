import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Contact from '../Contact';
import { PERSONAL } from '../../lib/data';

describe('Contact section — contact info (Req 10.2)', () => {
  it('displays the email address', () => {
    render(<Contact />);
    expect(screen.getByText(PERSONAL.email)).toBeInTheDocument();
  });

  it('displays the phone number', () => {
    render(<Contact />);
    expect(screen.getByText(PERSONAL.phone)).toBeInTheDocument();
  });

  it('renders a GitHub link with the correct href', () => {
    render(<Contact />);
    const links = screen.getAllByRole('link', { name: /github/i });
    const hasCorrectHref = links.some((l) => l.getAttribute('href') === PERSONAL.github);
    expect(hasCorrectHref).toBe(true);
  });

  it('renders a LinkedIn link with the correct href', () => {
    render(<Contact />);
    const links = screen.getAllByRole('link', { name: /linkedin/i });
    const hasCorrectHref = links.some((l) => l.getAttribute('href') === PERSONAL.linkedin);
    expect(hasCorrectHref).toBe(true);
  });
});

describe('Contact section — contact form inputs (Req 10.4)', () => {
  it('renders the Name input', () => {
    render(<Contact />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('renders the Email input', () => {
    render(<Contact />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('renders the Message textarea', () => {
    render(<Contact />);
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });
});
