import { classes } from '@/data/classes';
import type { ClassItem } from '@/lib/types';

// ── Track definitions (Systems → ML → Theory per requested order) ──────────────

const TRACKS = [
  {
    id: 'systems',
    label: 'Systems & Infrastructure',
    accentClass: 'text-accent',
    borderClass: 'border-accent/25',
    headerBg: 'bg-accent/5',
    badgeClass: 'bg-accent/10 text-accent border-accent/30',
    dotClass: 'bg-accent',
    codes: ['CS 343', 'CS 345', 'CS 340'],
  },
  {
    id: 'ml',
    label: 'ML & AI',
    accentClass: 'text-amber',
    borderClass: 'border-amber/25',
    headerBg: 'bg-amber/5',
    badgeClass: 'bg-amber/10 text-amber border-amber/30',
    dotClass: 'bg-amber',
    codes: ['CS 349', 'CS 496', 'CS 395'],
  },
  {
    id: 'theory',
    label: 'Theory & Math',
    accentClass: 'text-violet',
    borderClass: 'border-violet/25',
    headerBg: 'bg-violet/5',
    badgeClass: 'bg-violet/10 text-violet border-violet/30',
    dotClass: 'bg-violet',
    codes: ['CS 336', 'IEMS 315'],
  },
];

const byCode = Object.fromEntries(classes.map((c) => [c.code, c]));

// First sentence only — keeps cards concise
function firstSentence(text: string): string {
  const idx = text.indexOf('.');
  return idx !== -1 ? text.slice(0, idx + 1) : text;
}

function CourseCard({
  item,
  accentClass,
  badgeClass,
}: {
  item: ClassItem;
  accentClass: string;
  badgeClass: string;
}) {
  return (
    <div className="glass-card p-4 flex flex-col gap-2.5 hover:border-graph-600/60 transition-colors duration-200">
      <div className="flex items-center justify-between gap-2">
        <span className={`font-mono text-xs font-bold tracking-wide ${accentClass}`}>
          {item.code}
        </span>
        <span className={`inline-flex px-1.5 py-0.5 rounded text-xs font-mono border ${badgeClass}`}>
          {item.level === 'Graduate' ? 'Grad' : 'UG'}
        </span>
      </div>
      <h4 className="font-display font-semibold text-graph-100 text-sm leading-snug">
        {item.title}
      </h4>
      <p className="text-xs text-graph-400 leading-relaxed">
        {firstSentence(item.description)}
      </p>
    </div>
  );
}

export function ClassesSection() {
  return (
    <section id="classes" className="py-24 md:py-32 bg-graph-900">
      <div className="section-container">
        {/* Header */}
        <div className="mb-12">
          <h2 className="section-title">Coursework</h2>
          <p className="section-subtitle mb-0">
            Northwestern University — academic foundations in systems, ML, and theory
          </p>
        </div>

        {/* Three-column knowledge-base layout */}
        <div className="grid md:grid-cols-3 gap-6">
          {TRACKS.map((track) => {
            const items = track.codes.map((code) => byCode[code]).filter(Boolean);
            return (
              <div key={track.id} className="flex flex-col gap-4">
                {/* Track header */}
                <div className={`flex items-center gap-2.5 px-4 py-3 rounded-lg ${track.headerBg} border ${track.borderClass}`}>
                  <span className={`w-2 h-2 rounded-full shrink-0 ${track.dotClass}`} />
                  <h3 className={`font-mono text-xs font-bold uppercase tracking-widest flex-1 ${track.accentClass}`}>
                    {track.label}
                  </h3>
                  <span className={`font-mono text-xs px-1.5 py-0.5 rounded border ${track.badgeClass}`}>
                    {items.length}
                  </span>
                </div>

                {/* Course cards */}
                <div className="flex flex-col gap-3">
                  {items.map((item) => (
                    <CourseCard
                      key={item.code}
                      item={item}
                      accentClass={track.accentClass}
                      badgeClass={track.badgeClass}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-xs font-mono text-graph-600 uppercase tracking-widest text-center">
          Northwestern University · B.S. Computer Science
        </p>
      </div>
    </section>
  );
}
