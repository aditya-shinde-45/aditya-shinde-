import React from 'react';
import type { ExperienceEntry } from '../lib/data';

interface TimelineEntryProps {
  entry: ExperienceEntry;
  isLast?: boolean;
}

const TimelineEntry: React.FC<TimelineEntryProps> = ({ entry, isLast = false }) => {
  const { company, role, period, description } = entry;

  return (
    <div className="relative flex gap-6">
      {/* Timeline node + connecting line */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Node */}
        <div
          className="w-3 h-3 rounded-full bg-accent-blue ring-4 ring-soft-blue mt-1.5 flex-shrink-0"
          aria-hidden="true"
        />
        {/* Connecting line — hidden for last entry */}
        {!isLast && (
          <div className="w-px flex-1 bg-gray-200 mt-2" aria-hidden="true" />
        )}
      </div>

      {/* Content */}
      <div className="pb-10 flex-1 min-w-0">
        {/* Role — most prominent */}
        <h3 className="text-lg font-bold text-gray-900 leading-snug">{role}</h3>

        {/* Company + period — secondary */}
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <span className="text-sm font-semibold text-accent-blue">{company}</span>
          <span className="text-gray-300 select-none" aria-hidden="true">·</span>
          <span className="text-sm text-gray-500">{period}</span>
        </div>

        {/* Description bullets — tertiary */}
        <ul className="mt-3 space-y-1.5 list-none">
          {description.map((bullet, i) => (
            <li key={i} className="flex gap-2 text-sm text-gray-600 leading-relaxed">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" aria-hidden="true" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TimelineEntry;
