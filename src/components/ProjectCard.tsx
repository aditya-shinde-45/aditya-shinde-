import React, { useRef } from 'react';
import type { Project } from '../lib/data';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { title, description, stack, githubUrl, liveUrl, isSIHWinner, isOngoing, featured } = project;
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={[
        'relative flex flex-col gap-4 p-6 bg-white rounded-2xl',
        'border border-transparent',
        'shadow-soft-md',
        'transition-[box-shadow,border-color] duration-300 ease-in-out',
        'hover:shadow-glow-blue hover:border-accent-blue/40',
        'will-change-transform',
        featured ? 'shadow-soft-lg ring-1 ring-accent-blue/20' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* SIH Winner badge */}
      {isSIHWinner && (
        <span className="absolute top-4 right-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-accent-blue to-accent-lavender text-white shadow-soft-sm select-none">
          🏆 SIH Winner
        </span>
      )}

      {/* Ongoing badge */}
      {isOngoing && !isSIHWinner && (
        <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Ongoing
        </span>
      )}

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900 pr-24 leading-snug">{title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed flex-1">{description}</p>

      {/* Stack tags */}
      <div className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center px-3 py-1 rounded-2xl text-xs font-medium bg-soft-blue text-sky-700 shadow-soft-sm"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      {(githubUrl || liveUrl) && (
        <div className="flex items-center gap-4 pt-1">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} GitHub repository`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-blue hover:text-accent-cyan transition-colors duration-200 min-h-[44px] min-w-[44px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} live demo`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-blue hover:text-accent-cyan transition-colors duration-200 min-h-[44px] min-w-[44px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Live Demo
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
