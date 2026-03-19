import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCE } from '../lib/data';
import TimelineEntry from '../components/TimelineEntry';
import { EASE_OUT_EXPO, STAGGER_DELAY, SCROLL_TRIGGER_START, DURATION_NORMAL } from '../lib/animations';

gsap.registerPlugin(ScrollTrigger);

const Experience: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = timelineRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.relative.flex.gap-6',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: DURATION_NORMAL,
          stagger: STAGGER_DELAY,
          ease: EASE_OUT_EXPO,
          scrollTrigger: {
            trigger: container,
            start: SCROLL_TRIGGER_START,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Experience</h2>
          <p className="text-gray-500 text-base">
            My professional journey and key contributions.
          </p>
        </div>

        {/* Vertical timeline */}
        <div ref={timelineRef}>
          {EXPERIENCE.map((entry, index) => (
            <TimelineEntry
              key={`${entry.company}-${index}`}
              entry={entry}
              isLast={index === EXPERIENCE.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
