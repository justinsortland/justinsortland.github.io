import Link from 'next/link';
import { getExperience } from '@/lib/content';

export async function ExperienceSection() {
  const experiences = await getExperience();
  const featuredExperiences = experiences.slice(0, 3);

  return (
    <section id="experience" className="py-24 md:py-32 bg-graph-800/30 relative">
      <div className="section-container">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h2 className="section-title">Experience</h2>
            <p className="section-subtitle mb-0">
              Where I've applied graph thinking to real-world problems
            </p>
          </div>
          <Link href="/experience" className="btn-ghost shrink-0">
            View all experience
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Experience timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-violet to-graph-700" />

          <div className="space-y-8">
            {featuredExperiences.map((exp, index) => (
              <div key={exp.slug} className="relative md:pl-20">
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-6 top-8 w-4 h-4 rounded-full bg-graph-800 border-2 border-accent items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                </div>

                <article className="glass-card-hover p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Company logo placeholder */}
                    <div className="shrink-0 w-16 h-16 rounded-xl bg-graph-700/50 border border-graph-600/50 flex items-center justify-center">
                      <span className="font-display font-bold text-xl text-accent">
                        {exp.company.charAt(0)}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                        <div>
                          <h3 className="font-display text-xl font-semibold text-graph-100">
                            {exp.role}
                          </h3>
                          <p className="text-accent">{exp.company}</p>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-graph-400">
                          <span>{exp.location}</span>
                          <span>•</span>
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-graph-400 mb-4">{exp.description}</p>

                      {/* Key achievements */}
                      <ul className="space-y-2 mb-6">
                        {exp.highlights.slice(0, 3).map((highlight, i) => (
                          <li key={i} className="flex items-start gap-3 text-graph-300 text-sm">
                            <span className="text-accent mt-0.5">▹</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span key={tech} className="tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
