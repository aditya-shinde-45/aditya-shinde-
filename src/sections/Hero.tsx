import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { PERSONAL } from '../lib/data';
import Button from '../components/Button';
import ResumeViewer from '../components/ResumeViewer';
import { EASE_OUT_EXPO, STAGGER_DELAY, DURATION_NORMAL } from '../lib/animations';
import profileImage from '../assets/profile.png';

// Floating micro-element shapes for decorative background accents
const FloatingShapes: React.FC = () => (
  <>
    {/* Top-left blob */}
    <div
      aria-hidden="true"
      className="absolute top-16 left-8 w-16 h-16 rounded-full bg-gradient-to-br from-accent-blue to-accent-cyan opacity-10 blur-sm"
    />
    {/* Top-right circle */}
    <div
      aria-hidden="true"
      className="absolute top-32 right-12 w-10 h-10 rounded-full bg-accent-lavender opacity-15 blur-sm"
    />
    {/* Bottom-left small blob */}
    <div
      aria-hidden="true"
      className="absolute bottom-40 left-16 w-8 h-8 rounded-full bg-accent-green opacity-15 blur-sm"
    />
    {/* Mid-right accent shape */}
    <div
      aria-hidden="true"
      className="absolute top-1/2 right-8 w-12 h-12 rounded-full bg-gradient-to-br from-accent-cyan to-accent-lavender opacity-10 blur-md"
    />
  </>
);

const Hero: React.FC = () => {
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    const container = textContainerRef.current;
    if (!container) return;

    const targets = container.querySelectorAll('h1, p, div.flex');
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        targets,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: DURATION_NORMAL,
          stagger: STAGGER_DELAY,
          ease: EASE_OUT_EXPO,
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {resumeOpen && <ResumeViewer onClose={() => setResumeOpen(false)} />}
      <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-white"
    >
      {/* Decorative floating micro-elements */}
      <FloatingShapes />

      {/* Soft background gradient overlay — subtle, non-dominant (Req 2.6) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-soft-blue via-white to-soft-lavender opacity-40 pointer-events-none"
      />

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 lg:py-0">
        {/*
          Desktop: flex-row (text left, visual right)
          Mobile:  flex-col (text above visual)
          Req 5.1, 5.9
        */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── Left: Text content ── */}
          <div ref={textContainerRef} className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">

            {/* Name */}
            <h1
              className="font-bold leading-tight mb-4"
              style={{ fontSize: 'var(--text-hero)' }}
            >
              <span className="gradient-text">{PERSONAL.name}</span>
            </h1>

            {/* Role subtitle */}
            <p
              className="text-slate-600 font-medium mb-6"
              style={{ fontSize: 'var(--text-section)' }}
            >
              {PERSONAL.role}
            </p>

            {/* Professional summary */}
            <p
              className="text-slate-500 max-w-xl mb-10 leading-relaxed"
              style={{ fontSize: 'var(--text-body)' }}
            >
              {PERSONAL.summary}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button variant="primary" href="#projects">
                View Projects
              </Button>
              <Button variant="outline" href="#contact">
                Contact Me
              </Button>
              <button
                onClick={() => setResumeOpen(true)}
                className={
                  'inline-flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] px-6 py-3 rounded-2xl font-semibold text-sm ' +
                  'bg-transparent border-2 border-accent-blue text-accent-blue ' +
                  'transition-all duration-200 ease-in-out hover:scale-[1.04] hover:shadow-soft-lg ' +
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2'
                }
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                </svg>
                View Resume
              </button>
            </div>
          </div>

          {/* ── Right: Profile image ── */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <div className="relative w-64 h-72 lg:w-[400px] lg:h-[520px] xl:w-[460px] xl:h-[580px]">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-blue to-accent-lavender opacity-20 blur-2xl scale-110" />
              <img
                src={profileImage}
                alt={PERSONAL.name}
                loading="eager"
                className="relative z-10 w-full h-full object-contain drop-shadow-xl"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
    </>
  );
};

export default Hero;
