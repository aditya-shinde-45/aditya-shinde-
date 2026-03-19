import React from 'react';

export interface SkillBadgeProps {
  label: string;
  category: 'cloud' | 'frontend' | 'backend' | 'devops';
}

const categoryClasses: Record<SkillBadgeProps['category'], string> = {
  cloud:    'bg-soft-blue text-sky-700',
  devops:   'bg-soft-green text-green-700',
  frontend: 'bg-soft-lavender text-violet-700',
  backend:  'bg-orange-50 text-orange-700',
};

const SkillBadge: React.FC<SkillBadgeProps> = ({ label, category }) => {
  return (
    <span
      className={
        `inline-flex items-center px-4 py-1.5 rounded-2xl text-sm font-medium shadow-soft-sm ` +
        `transition-all duration-200 ease-in-out cursor-default select-none ` +
        `hover:scale-[1.06] hover:shadow-soft-md ` +
        categoryClasses[category]
      }
    >
      {label}
    </span>
  );
};

export default SkillBadge;
