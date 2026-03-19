import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import ContactForm from '../ContactForm';

describe('ContactForm', () => {
  describe('rendering', () => {
    it('renders name, email, and message fields', () => {
      render(<ContactForm />);
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Message')).toBeInTheDocument();
    });

    it('renders a submit button', () => {
      render(<ContactForm />);
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });

    it('does not show any error messages initially', () => {
      render(<ContactForm />);
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('validation — empty fields', () => {
    it('shows inline error for empty name on submit', async () => {
      render(<ContactForm />);
      await userEvent.click(screen.getByRole('button', { name: /send message/i }));
      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument();
      });
    });

    it('shows inline error for empty email on submit', async () => {
      render(<ContactForm />);
      await userEvent.click(screen.getByRole('button', { name: /send message/i }));
      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument();
      });
    });

    it('shows inline error for empty message on submit', async () => {
      render(<ContactForm />);
      await userEvent.click(screen.getByRole('button', { name: /send message/i }));
      await waitFor(() => {
        expect(screen.getByText('Message is required')).toBeInTheDocument();
      });
    });

    it('shows all three errors when all fields are empty', async () => {
      render(<ContactForm />);
      await userEvent.click(screen.getByRole('button', { name: /send message/i }));
      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument();
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('Message is required')).toBeInTheDocument();
      });
    });

    it('does not show success state when fields are empty', async () => {
      render(<ContactForm />);
      await userEvent.click(screen.getByRole('button', { name: /send message/i }));
      await waitFor(() => {
        expect(screen.queryByText(/message sent/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('validation — invalid email', () => {
    it('shows email error for missing @ symbol', async () => {
      render(<ContactForm />);
      await userEvent.type(screen.getByLabelText('Name'), 'Alice');
      await userEvent.type(screen.getByLabelText('Email'), 'notanemail');
      await userEvent.type(screen.getByLabelText('Message'), 'Hello');
      await userEvent.click(screen.getByRole('button', { name: /send message/i }));
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      });
    });

    it('shows email error for missing domain', async () => {
      render(<ContactForm />);
      await userEvent.type(screen.getByLabelText('Name'), 'Alice');
      await userEvent.type(screen.getByLabelText('Email'), 'alice@');
      await userEvent.type(screen.getByLabelText('Message'), 'Hello');
      await userEvent.click(screen.getByRole('button', { name: /send message/i }));
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      });
    });

    it('does not reach success state with invalid email', async () => {
      render(<ContactForm />);
      await userEvent.type(screen.getByLabelText('Name'), 'Alice');
      await userEvent.type(screen.getByLabelText('Email'), 'bad-email');
      await userEvent.type(screen.getByLabelText('Message'), 'Hello');
      await userEvent.click(screen.getByRole('button', { name: /send message/i }));
      await waitFor(() => {
        expect(screen.queryByText(/message sent/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('successful submission', () => {
    it('shows success state after valid submission', async () => {
      render(<ContactForm />);
      await userEvent.type(screen.getByLabelText('Name'), 'Alice');
      await userEvent.type(screen.getByLabelText('Email'), 'alice@example.com');
      await userEvent.type(screen.getByLabelText('Message'), 'Hello there!');
      await userEvent.click(screen.getByRole('button', { name: /send message/i }));
      await waitFor(() => {
        expect(screen.getByText(/message sent/i)).toBeInTheDocument();
      });
    });

    it('hides the form after valid submission', async () => {
      render(<ContactForm />);
      await userEvent.type(screen.getByLabelText('Name'), 'Alice');
      await userEvent.type(screen.getByLabelText('Email'), 'alice@example.com');
      await userEvent.type(screen.getByLabelText('Message'), 'Hello there!');
      await userEvent.click(screen.getByRole('button', { name: /send message/i }));
      await waitFor(() => {
        expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();
      });
    });

    it('allows sending another message after success', async () => {
      render(<ContactForm />);
      await userEvent.type(screen.getByLabelText('Name'), 'Alice');
      await userEvent.type(screen.getByLabelText('Email'), 'alice@example.com');
      await userEvent.type(screen.getByLabelText('Message'), 'Hello!');
      await userEvent.click(screen.getByRole('button', { name: /send message/i }));
      await waitFor(() => screen.getByText(/send another message/i));
      await userEvent.click(screen.getByText(/send another message/i));
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });
  });

  describe('focus state', () => {
    it('name input has focus transition classes', () => {
      render(<ContactForm />);
      const input = screen.getByLabelText('Name');
      expect(input.className).toContain('focus:border-accent-blue');
    });

    it('email input has focus transition classes', () => {
      render(<ContactForm />);
      const input = screen.getByLabelText('Email');
      expect(input.className).toContain('focus:border-accent-blue');
    });

    it('message textarea has focus transition classes', () => {
      render(<ContactForm />);
      const textarea = screen.getByLabelText('Message');
      expect(textarea.className).toContain('focus:border-accent-blue');
    });
  });

  describe('no page reload', () => {
    it('form has noValidate attribute preventing browser default validation', () => {
      render(<ContactForm />);
      const form = screen.getByRole('button', { name: /send message/i }).closest('form');
      expect(form).toHaveAttribute('novalidate');
    });
  });
});

// ─── Property-Based Tests ────────────────────────────────────────────────────
import * as fc from 'fast-check';
import { cleanup } from '@testing-library/react';

// Helper: mirrors the EMAIL_PATTERN used in ContactForm
const isValidEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

// Feature: portfolio-website, Property 9: Empty required fields produce inline validation errors
describe('PBT – Property 9: empty required fields produce validation errors', () => {
  afterEach(() => cleanup());

  it(
    'shows an error for each empty required field and never reaches success state',
    async () => {
      // Validates: Requirements 10.6
      await fc.assert(
        fc.asyncProperty(
          fc.subarray(['name', 'email', 'message'] as const, { minLength: 1 }),
          async (emptyFields) => {
            cleanup();
            render(<ContactForm />);

            // Fill in only the fields NOT in emptyFields
            if (!emptyFields.includes('name')) {
              await userEvent.type(screen.getByLabelText('Name'), 'Alice');
            }
            if (!emptyFields.includes('email')) {
              await userEvent.type(screen.getByLabelText('Email'), 'alice@example.com');
            }
            if (!emptyFields.includes('message')) {
              await userEvent.type(screen.getByLabelText('Message'), 'Hello there!');
            }

            await userEvent.click(screen.getByRole('button', { name: /send message/i }));

            await waitFor(() => {
              if (emptyFields.includes('name')) {
                expect(screen.getByText('Name is required')).toBeInTheDocument();
              }
              if (emptyFields.includes('email')) {
                expect(screen.getByText('Email is required')).toBeInTheDocument();
              }
              if (emptyFields.includes('message')) {
                expect(screen.getByText('Message is required')).toBeInTheDocument();
              }
              expect(screen.queryByText(/message sent/i)).not.toBeInTheDocument();
            });
          },
        ),
        { numRuns: 100 },
      );
    },
    30_000,
  );
});

// Feature: portfolio-website, Property 10: Invalid email format produces a validation error
describe('PBT – Property 10: invalid email format produces a validation error', () => {
  afterEach(() => cleanup());

  it(
    'shows email validation error and never reaches success state for any invalid email',
    async () => {
      // Validates: Requirements 10.7
      await fc.assert(
        fc.asyncProperty(
          // Printable ASCII (32-126) excluding { (123) and [ (91) which userEvent.type treats as special descriptors
        fc
          .array(
            fc.integer({ min: 32, max: 126 }).filter((n) => n !== 123 && n !== 91),
            { minLength: 1, maxLength: 30 },
          )
          .map((codes) => codes.map((c) => String.fromCharCode(c)).join(''))
          .filter((s) => !isValidEmail(s)),
          async (invalidEmail) => {
            cleanup();
            render(<ContactForm />);

            await userEvent.type(screen.getByLabelText('Name'), 'Alice');
            await userEvent.type(screen.getByLabelText('Email'), invalidEmail);
            await userEvent.type(screen.getByLabelText('Message'), 'Hello there!');

            await userEvent.click(screen.getByRole('button', { name: /send message/i }));

            await waitFor(() => {
              const emailError =
                screen.queryByText('Email is required') ??
                screen.queryByText('Please enter a valid email address');
              expect(emailError).toBeInTheDocument();
              expect(screen.queryByText(/message sent/i)).not.toBeInTheDocument();
            });
          },
        ),
        { numRuns: 100 },
      );
    },
    30_000,
  );
});
