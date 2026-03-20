import React from 'react';

export interface SkillBadgeProps {
  label: string;
  category: 'frontend' | 'backend' | 'languages' | 'database' | 'devops' | 'other';
}

const categoryClasses: Record<SkillBadgeProps['category'], string> = {
  frontend:  'bg-soft-lavender text-violet-700',
  backend:   'bg-orange-50 text-orange-700',
  languages: 'bg-soft-blue text-sky-700',
  database:  'bg-emerald-50 text-emerald-700',
  devops:    'bg-soft-green text-green-700',
  other:     'bg-slate-100 text-slate-600',
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
