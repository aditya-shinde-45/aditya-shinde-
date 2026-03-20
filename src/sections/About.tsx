import React from 'react';
import { SKILLS, PERSONAL } from '../lib/data';
import SkillBadge from '../components/SkillBadge';
import type { SkillBadgeProps } from '../components/SkillBadge';

type SkillCategory = keyof typeof SKILLS;

const categoryLabels: Record<SkillCategory, string> = {
  frontend:  'Frontend',
  backend:   'Backend',
  languages: 'Programming Languages',
  database:  'Database',
  devops:    'DevOps',
  other:     'Other',
};

const categoryOrder: SkillCategory[] = ['frontend', 'backend', 'languages', 'database', 'devops', 'other'];

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="bg-[#F8FAFC] py-24 px-6"
    >
      <div className="max-w-7xl mx-auto">

        {/* Section heading */}
        <h2
          className="font-bold text-slate-800 mb-16 text-center"
          style={{ fontSize: 'var(--text-section)' }}
        >
          About Me
        </h2>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Left column: Professional summary ── */}
          <div className="flex flex-col gap-5">
            <h3
              className="font-semibold text-slate-700"
              style={{ fontSize: 'var(--text-body)' }}
            >
              Background
            </h3>

            <p
              className="text-slate-500 leading-relaxed"
              style={{ fontSize: 'var(--text-body)' }}
            >
              I'm a DevOps-focused Full Stack Developer with hands-on experience building and deploying scalable cloud-native applications on AWS. I specialize in bridging the gap between development and operations — writing clean code and shipping it reliably.
            </p>

            <p
              className="text-slate-500 leading-relaxed"
              style={{ fontSize: 'var(--text-body)' }}
            >
              My most significant project is the{' '}
              <span className="font-semibold text-slate-700">PBL Management System</span> — a
              serverless platform deployed on AWS Lambda that serves 5,000+ users across multiple institutions. This project was developed as part of my college internship and is currently live in production.
            </p>

            <p
              className="text-slate-500 leading-relaxed"
              style={{ fontSize: 'var(--text-body)' }}
            >
              I was also a key member of Team IdeaBliss, which developed BeejSampadha (Oilseed By-Product Value Chain) — our Smart India Hackathon 2025 project that secured a national-level win.
            </p>

            {/* Contact info snippet */}
            <p className="text-slate-400 text-sm mt-2">
              Based in {PERSONAL.location}
            </p>
          </div>

          {/* ── Right column: Skill badges grouped by category ── */}
          <div className="flex flex-col gap-8">
            {categoryOrder.map((category) => (
              <div
                key={category}
                data-category={category}
                className="flex flex-col gap-3"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  {categoryLabels[category]}
                </span>

                <div className="flex flex-wrap gap-2">
                  {SKILLS[category].map((skill) => (
                    <SkillBadge
                      key={skill}
                      label={skill}
                      category={category as SkillBadgeProps['category']}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
