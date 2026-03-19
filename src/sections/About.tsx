import React from 'react';
import { SKILLS, PERSONAL } from '../lib/data';
import SkillBadge from '../components/SkillBadge';

type SkillCategory = keyof typeof SKILLS;

const categoryLabels: Record<SkillCategory, string> = {
  cloud:    'Cloud',
  devops:   'DevOps',
  frontend: 'Frontend',
  backend:  'Backend',
};

// Ordered for visual flow: cloud → devops → frontend → backend
const categoryOrder: SkillCategory[] = ['cloud', 'devops', 'frontend', 'backend'];

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

        {/*
          Desktop: two-column grid (description left, skills right)
          Mobile:  single column stacked (flex-col)
          Req 6.1, 6.7
        */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Left column: Professional summary ── */}
          <div className="flex flex-col gap-5">
            <h3
              className="font-semibold text-slate-700"
              style={{ fontSize: 'var(--text-body)' }}
            >
              Background
            </h3>

            {/* Short structured paragraphs — Req 6.2 */}
            <p
              className="text-slate-500 leading-relaxed"
              style={{ fontSize: 'var(--text-body)' }}
            >
              I'm a DevOps-focused Full Stack Developer with hands-on experience building and
              deploying scalable cloud-native applications on AWS. I specialize in bridging the
              gap between development and operations — writing clean code and shipping it reliably.
            </p>

            <p
              className="text-slate-500 leading-relaxed"
              style={{ fontSize: 'var(--text-body)' }}
            >
              My most significant project is the{' '}
              <span className="font-semibold text-slate-700">PBL Management System</span> — a
              serverless platform deployed on AWS Lambda that serves 5,000+ users across multiple
              institutions. It was built during Smart India Hackathon 2023, where my team won the
              national-level competition.
            </p>

            <p
              className="text-slate-500 leading-relaxed"
              style={{ fontSize: 'var(--text-body)' }}
            >
              I'm passionate about CI/CD automation, infrastructure-as-code, and building systems
              that are both developer-friendly and production-ready. Outside of work, I contribute
              to open-source DevOps tooling and Terraform modules.
            </p>

            {/* Contact info snippet */}
            <p
              className="text-slate-400 text-sm mt-2"
            >
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
                {/* Category label */}
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  {categoryLabels[category]}
                </span>

                {/* Badge group */}
                <div className="flex flex-wrap gap-2">
                  {SKILLS[category].map((skill) => (
                    <SkillBadge
                      key={skill}
                      label={skill}
                      category={category}
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
