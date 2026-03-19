import React, { useRef, useState, useCallback } from 'react';
import { PROJECTS } from '../lib/data';
import ProjectCard from '../components/ProjectCard';

const VISIBLE = 3; // cards visible at once on desktop

const Projects: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const total = PROJECTS.length;
  const maxIndex = Math.max(0, total - VISIBLE);

  const prev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), []);
  const next = useCallback(() => setCurrent((c) => Math.min(maxIndex, c + 1)), [maxIndex]);

  // Scroll slider to current index
  const scrollTo = (index: number) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const card = slider.children[index] as HTMLElement;
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  };

  const handlePrev = () => { prev(); scrollTo(Math.max(0, current - 1)); };
  const handleNext = () => { next(); scrollTo(Math.min(maxIndex, current + 1)); };
  const handleDot = (i: number) => { setCurrent(i); scrollTo(i); };

  return (
    <section id="projects" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Projects</h2>
            <p className="text-gray-500 text-base max-w-xl">
              {total} projects spanning full-stack web, Flutter mobile, AI/ML, DevOps, and more.
            </p>
          </div>
          <button
            onClick={() => setShowAll((v) => !v)}
            className={[
              'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold',
              'border-2 border-accent-blue text-accent-blue bg-transparent',
              'transition-all duration-200 hover:bg-soft-blue hover:scale-[1.03]',
              'min-h-[44px]',
            ].join(' ')}
          >
            {showAll ? (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                Show Slider
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                View All ({total})
              </>
            )}
          </button>
        </div>

        {/* ── SLIDER MODE ── */}
        {!showAll && (
          <div className="relative">
            {/* Prev button */}
            <button
              onClick={handlePrev}
              disabled={current === 0}
              aria-label="Previous projects"
              className={[
                'absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-10',
                'flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-soft-md',
                'border border-gray-100 text-gray-600 transition-all duration-200',
                'hover:text-accent-blue hover:shadow-soft-lg hover:scale-105',
                'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100',
              ].join(' ')}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>

            {/* Slider track */}
            <div
              ref={sliderRef}
              className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
              style={{ scrollbarWidth: 'none' }}
            >
              {PROJECTS.map((project) => (
                <div
                  key={project.id}
                  className="snap-start flex-shrink-0 w-[85vw] sm:w-[45vw] lg:w-[calc(33.333%-14px)]"
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={handleNext}
              disabled={current >= maxIndex}
              aria-label="Next projects"
              className={[
                'absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-10',
                'flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-soft-md',
                'border border-gray-100 text-gray-600 transition-all duration-200',
                'hover:text-accent-blue hover:shadow-soft-lg hover:scale-105',
                'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100',
              ].join(' ')}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-5">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDot(i)}
                  aria-label={`Go to project ${i + 1}`}
                  className={[
                    'rounded-full transition-all duration-200',
                    i === current
                      ? 'w-6 h-2.5 bg-accent-blue'
                      : 'w-2.5 h-2.5 bg-gray-300 hover:bg-accent-blue/50',
                  ].join(' ')}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── GRID MODE (View All) ── */}
        {showAll && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Projects;
