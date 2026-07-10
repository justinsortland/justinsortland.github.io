import { getExperience } from '@/lib/content';

const TYPE_LABEL: Record<string, string> = {
  'full-time': 'Full-Time',
  internship: 'Internship',
  research: 'Research / TA',
  freelance: 'Freelance',
};

const TYPE_COLOR: Record<string, string> = {
  'full-time': 'text-accent border-accent/30 bg-accent/10',
  internship: 'text-violet border-violet/30 bg-violet/10',
  research: 'text-amber border-amber/30 bg-amber/10',
  freelance: 'text-graph-300 border-graph-600/50 bg-graph-700/30',
};

export async function ExperienceSection() {
  const experiences = await getExperience();

  return (
    <section id="experience" className="py-24 md:py-32 bg-graph-800/20 relative">
      <div className="section-container">
        {/* Header */}
        <div className="mb-12">
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle mb-0">
            Where I've built production systems and conducted applied research
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-[31px] top-3 bottom-3 w-px bg-gradient-to-b from-accent/60 via-violet/40 to-graph-700/30" />

          <div className="space-y-6">
            {experiences.map((exp) => (
              <div key={exp.slug} className="relative md:pl-20">
                {/* Timeline node */}
                <div className="hidden md:flex absolute left-[24px] top-7 w-[15px] h-[15px] rounded-full
                                bg-graph-900 border-2 border-accent/60 items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                </div>

                <article className="glass-card p-6 md:p-7">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                    {/* Company initial */}
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-graph-700/50 border border-graph-600/40
                                    flex items-center justify-center">
                      <span className="font-display font-bold text-lg text-accent">
                        {exp.company.charAt(0)}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Role + meta */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 mb-3">
                        <div>
                          <h3 className="font-display text-lg font-semibold text-graph-100 leading-snug">
                            {exp.role}
                          </h3>
                          <p className="text-accent text-sm font-medium">{exp.company}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <span className={`inline-flex px-2 py-0.5 rounded text-xs font-mono border ${TYPE_COLOR[exp.type] ?? TYPE_COLOR.freelance}`}>
                            {TYPE_LABEL[exp.type] ?? exp.type}
                          </span>
                          <span className="text-xs text-graph-500 font-mono whitespace-nowrap">
                            {exp.period} · {exp.location}
                          </span>
                        </div>
                      </div>

                      {/* Bullets */}
                      <ul className="space-y-2 mb-4">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="flex gap-2.5 text-sm text-graph-300">
                            <span className="text-accent mt-0.5 shrink-0">▹</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded bg-graph-700/60 border border-graph-600/50
                                                   text-graph-400 text-xs font-mono">
                            {t}
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
