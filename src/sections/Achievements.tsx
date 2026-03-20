import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ACHIEVEMENTS } from '../lib/data';
import AchievementCard from '../components/AchievementCard';
import { EASE_OUT_EXPO, STAGGER_DELAY, SCROLL_TRIGGER_START, DURATION_NORMAL } from '../lib/animations';

gsap.registerPlugin(ScrollTrigger);

const Achievements: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.grid > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: DURATION_NORMAL,
          stagger: STAGGER_DELAY,
          ease: EASE_OUT_EXPO,
          scrollTrigger: {
            trigger: grid,
            start: SCROLL_TRIGGER_START,
          },
        }
      );
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <section id="achievements" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Achievements</h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Certifications, awards, and recognitions earned along the way.
          </p>
        </div>

        {/* Responsive grid: 1 col → 2 col → 4 col */}
        <div ref={gridRef} className="flex flex-wrap justify-center gap-6">
          {ACHIEVEMENTS.map((achievement) => (
            <AchievementCard key={achievement.title} achievement={achievement} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
