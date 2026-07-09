import { skillGroups } from '@/data/skills';
import type { Skill } from '@/lib/types';

// ── Color map ──────────────────────────────────────────────────────────────────
// Tailwind classes must appear as literal strings so the purger keeps them.

const COLOR_MAP: Record<
  string,
  { heading: string; dot: string; bg: string; border: string; glow: string }
> = {
  accent: {
    heading: 'text-accent',
    dot: 'bg-accent',
    bg: 'bg-accent/5',
    border: 'border-accent/20',
    glow: 'hover:border-accent/40',
  },
  violet: {
    heading: 'text-violet',
    dot: 'bg-violet',
    bg: 'bg-violet/5',
    border: 'border-violet/20',
    glow: 'hover:border-violet/40',
  },
  amber: {
    heading: 'text-amber',
    dot: 'bg-amber',
    bg: 'bg-amber/5',
    border: 'border-amber/20',
    glow: 'hover:border-amber/40',
  },
  emerald: {
    heading: 'text-emerald-400',
    dot: 'bg-emerald-400',
    bg: 'bg-emerald-400/5',
    border: 'border-emerald-400/20',
    glow: 'hover:border-emerald-400/40',
  },
};

const PROFICIENCY_DOTS: Record<Skill['proficiency'], number> = {
  familiar: 1,
  proficient: 2,
  expert: 3,
};

function ProficiencyDots({
  level,
  dotClass,
}: {
  level: Skill['proficiency'];
  dotClass: string;
}) {
  const filled = PROFICIENCY_DOTS[level];
  return (
    <span className="flex items-center gap-0.5 ml-auto shrink-0">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${i <= filled ? dotClass : 'bg-graph-700'}`}
        />
      ))}
    </span>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 md:py-32 bg-graph-800/20 relative">
      <div className="section-container">
        {/* Header */}
        <div className="mb-12">
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle mb-0">
            Tools I reach for and the depth I've built with each
          </p>
        </div>

        {/* Proficiency legend */}
        <div className="flex items-center gap-5 mb-10 text-xs text-graph-500 font-mono">
          <span className="uppercase tracking-widest">Proficiency:</span>
          {(['familiar', 'proficient', 'expert'] as Skill['proficiency'][]).map((level) => (
            <span key={level} className="flex items-center gap-1.5">
              <span className="flex items-center gap-0.5">
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${
                      i <= PROFICIENCY_DOTS[level] ? 'bg-graph-400' : 'bg-graph-700'
                    }`}
                  />
                ))}
              </span>
              <span className="capitalize">{level}</span>
            </span>
          ))}
        </div>

        {/* Groups grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {skillGroups.map((group) => {
            const c = COLOR_MAP[group.color] ?? COLOR_MAP.accent;
            return (
              <div
                key={group.id}
                className={`glass-card flex flex-col gap-4 p-5 transition-colors duration-200 ${c.glow}`}
              >
                {/* Group header */}
                <div>
                  <h3 className={`font-mono text-sm font-bold uppercase tracking-widest mb-0.5 ${c.heading}`}>
                    {group.name}
                  </h3>
                  <p className="text-graph-500 text-xs">{group.description}</p>
                </div>

                {/* Skill rows */}
                <ul className="space-y-2">
                  {group.skills.map((skill) => (
                    <li key={skill.name} className="flex items-center gap-2">
                      <span className="text-sm text-graph-300 leading-none">{skill.name}</span>
                      <ProficiencyDots level={skill.proficiency} dotClass={c.dot} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
