import React from 'react';
import { PERSONAL } from '../lib/data';
import ContactForm from '../components/ContactForm';

// ── Contact info items ────────────────────────────────────────────────────────

interface ContactItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  isSocial?: boolean;
}

const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const contactItems: ContactItem[] = [
  {
    icon: <EmailIcon />,
    label: 'Email',
    value: PERSONAL.email,
    href: `mailto:${PERSONAL.email}`,
  },
  {
    icon: <PhoneIcon />,
    label: 'Phone',
    value: PERSONAL.phone,
    href: `tel:${PERSONAL.phone.replace(/\s/g, '')}`,
  },
  {
    icon: <GitHubIcon />,
    label: 'GitHub',
    value: 'aditya-shinde-45',
    href: PERSONAL.github,
    isSocial: true,
  },
  {
    icon: <LinkedInIcon />,
    label: 'LinkedIn',
    value: 'aditya-shinde45',
    href: PERSONAL.linkedin,
    isSocial: true,
  },
];

// ── Contact section ───────────────────────────────────────────────────────────

const Contact: React.FC = () => {
  return (
    <section id="contact" className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section heading */}
        <div className="text-center mb-16">
          <h2
            className="font-bold text-slate-800 mb-4"
            style={{ fontSize: 'var(--text-section)' }}
          >
            Get In Touch
          </h2>
          <p
            className="text-slate-500 max-w-xl mx-auto"
            style={{ fontSize: 'var(--text-body)' }}
          >
            Have an opportunity or just want to say hi? My inbox is always open.
          </p>
        </div>

        {/*
          Desktop: two-column (contact info left, form right)
          Mobile:  stacked (flex-col)
          Req 10.1
        */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Left column: Contact info ── */}
          <div className="flex flex-col gap-8">
            <div className="rounded-2xl bg-[#F8FAFC] shadow-soft-md p-8 flex flex-col gap-6">
              <h3
                className="font-semibold text-slate-700"
                style={{ fontSize: 'var(--text-body)' }}
              >
                Contact Details
              </h3>

              <ul className="flex flex-col gap-5" aria-label="Contact information">
                {contactItems.map((item) => (
                  <li key={item.label} className="flex items-center gap-4">
                    {/* Icon container */}
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-soft-blue text-accent-blue shadow-soft-sm"
                      aria-hidden="true"
                    >
                      {item.icon}
                    </span>

                    {/* Label + link */}
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                        {item.label}
                      </span>
                      <a
                        href={item.href}
                        target={item.isSocial ? '_blank' : undefined}
                        rel={item.isSocial ? 'noopener noreferrer' : undefined}
                        className={[
                          'truncate text-sm font-medium text-slate-700 min-h-[44px] flex items-center',
                          'transition-all duration-200 ease-in-out',
                          item.isSocial
                            ? 'hover:scale-[1.04] hover:text-accent-blue inline-flex'
                            : 'hover:text-accent-blue',
                        ].join(' ')}
                      >
                        {item.value}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social links row — Req 10.5 hover animation */}
            <div className="flex gap-4">
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className={[
                  'flex h-11 w-11 items-center justify-center rounded-xl',
                  'bg-[#F8FAFC] text-slate-600 shadow-soft-sm',
                  'transition-all duration-200 ease-in-out',
                  'hover:scale-[1.08] hover:text-accent-blue hover:shadow-soft-md hover:bg-soft-blue',
                ].join(' ')}
              >
                <GitHubIcon />
              </a>
              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className={[
                  'flex h-11 w-11 items-center justify-center rounded-xl',
                  'bg-[#F8FAFC] text-slate-600 shadow-soft-sm',
                  'transition-all duration-200 ease-in-out',
                  'hover:scale-[1.08] hover:text-accent-blue hover:shadow-soft-md hover:bg-soft-blue',
                ].join(' ')}
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* ── Right column: Contact form ── */}
          <div className="rounded-2xl bg-[#F8FAFC] shadow-soft-md p-8 w-full">
            <h3
              className="font-semibold text-slate-700 mb-6"
              style={{ fontSize: 'var(--text-body)' }}
            >
              Send a Message
            </h3>
            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
