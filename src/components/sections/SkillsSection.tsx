import { skillGroups } from '@/data/skills';

// Tailwind classes as literal strings so the purger keeps them.
const COLOR_MAP: Record<string, { heading: string; dot: string; chip: string }> = {
  accent: {
    heading: 'text-accent',
    dot: 'bg-accent',
    chip: 'bg-accent/10 text-accent border-accent/25 hover:bg-accent/20',
  },
  violet: {
    heading: 'text-violet',
    dot: 'bg-violet',
    chip: 'bg-violet/10 text-violet border-violet/25 hover:bg-violet/20',
  },
  amber: {
    heading: 'text-amber',
    dot: 'bg-amber',
    chip: 'bg-amber/10 text-amber border-amber/25 hover:bg-amber/20',
  },
  emerald: {
    heading: 'text-emerald-400',
    dot: 'bg-emerald-400',
    chip: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/25 hover:bg-emerald-400/20',
  },
};

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 md:py-32 bg-graph-800/20">
      <div className="section-container">
        {/* Header */}
        <div className="mb-12">
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle mb-0">
            Tools and technologies across projects, research, and production work
          </p>
        </div>

        {/* 2×2 panel grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {skillGroups.map((group) => {
            const c = COLOR_MAP[group.color] ?? COLOR_MAP.accent;
            return (
              <div key={group.id} className="glass-card p-6 flex flex-col gap-5">
                {/* Panel header */}
                <div className="flex items-center gap-2.5">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${c.dot}`} />
                  <h3 className={`font-mono text-xs font-bold uppercase tracking-widest flex-1 ${c.heading}`}>
                    {group.name}
                  </h3>
                  <span className="font-mono text-xs text-graph-600">
                    {group.skills.length} tools
                  </span>
                </div>

                {/* Skill chips */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className={`px-3 py-1 rounded-md text-xs font-mono border transition-colors duration-150 ${c.chip}`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-graph-500 mt-auto">{group.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
