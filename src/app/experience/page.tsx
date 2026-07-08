import { getExperience } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Professional experience in ML engineering, research, and distributed systems.',
};

export default async function ExperiencePage() {
  const experiences = await getExperience();

  return (
    <div className="min-h-screen bg-graph-900 pt-24 pb-16">
      <div className="section-container">
        <div className="mb-12">
          <h1 className="section-title">Experience</h1>
          <p className="section-subtitle">
            My journey through research and engineering roles in ML and distributed systems.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-violet to-graph-700" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={exp.slug} className="relative md:pl-20">
                <div className="hidden md:flex absolute left-6 top-8 w-4 h-4 rounded-full bg-graph-800 border-2 border-accent items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                </div>

                <article className="glass-card p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="shrink-0 w-20 h-20 rounded-xl bg-graph-700/50 border border-graph-600/50 flex items-center justify-center">
                      <span className="font-display font-bold text-2xl text-accent">
                        {exp.company.charAt(0)}
                      </span>
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 mb-4">
                        <div>
                          <h2 className="font-display text-2xl font-semibold text-graph-100">
                            {exp.role}
                          </h2>
                          <p className="text-lg text-accent">{exp.company}</p>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-graph-400">
                          <span className="tag">{exp.type}</span>
                          <span>{exp.location}</span>
                          <span>•</span>
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      <p className="text-graph-300 mb-6">{exp.description}</p>

                      <div className="mb-6">
                        <h3 className="text-sm font-semibold text-graph-200 uppercase tracking-wider mb-3">
                          Key Achievements
                        </h3>
                        <ul className="space-y-2">
                          {exp.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-3 text-graph-400">
                              <span className="text-accent mt-0.5">▹</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-graph-200 uppercase tracking-wider mb-3">
                          Technologies
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <span key={tech} className="tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Resume CTA */}
        <div className="mt-16 text-center">
          <p className="text-graph-400 mb-4">Want the full picture?</p>
          <a href="/resume.pdf" className="btn-primary">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );
}
