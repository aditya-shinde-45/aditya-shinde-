import React from 'react';
import type { Achievement } from '../lib/data';

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const { icon, title, organization, description } = achievement;

  return (
    <div
      className={[
        'flex flex-col items-center text-center gap-3 p-6 bg-white rounded-2xl w-full sm:w-72',
        'border border-gray-100',
        'shadow-soft-md',
        'transition-[transform,box-shadow] duration-300 ease-in-out',
        'hover:-translate-y-1.5 hover:shadow-soft-lg',
        'will-change-transform',
      ].join(' ')}
    >
      {/* Icon */}
      <span className="text-3xl leading-none" role="img" aria-hidden="true">
        {icon}
      </span>

      {/* Title */}
      <h3 className="text-base font-bold text-gray-900 leading-snug">{title}</h3>

      {/* Organization */}
      <p className="text-sm font-medium text-accent-blue leading-snug">{organization}</p>

      {/* Optional description */}
      {description && (
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      )}
    </div>
  );
};

export default AchievementCard;
