'use client';

import Link from 'next/link';
import { classes } from '@/data/classes';
import type { ClassItem } from '@/lib/types';

// ── Track groups ───────────────────────────────────────────────────────────────

const TRACKS = [
  {
    id: 'systems',
    label: 'Systems & Infrastructure',
    accentClass: 'text-accent',
    borderClass: 'border-accent/30',
    dotClass: 'bg-accent',
    codes: ['CS 343', 'CS 345', 'CS 340'],
  },
  {
    id: 'theory',
    label: 'Theory & Algorithms',
    accentClass: 'text-violet',
    borderClass: 'border-violet/30',
    dotClass: 'bg-violet',
    codes: ['CS 336', 'IEMS 315'],
  },
  {
    id: 'ml',
    label: 'ML & AI',
    accentClass: 'text-amber',
    borderClass: 'border-amber/30',
    dotClass: 'bg-amber',
    codes: ['CS 349', 'CS 496', 'CS 395'],
  },
];

const classByCode = Object.fromEntries(classes.map((c) => [c.code, c]));

function ClassCard({
  item,
  accentClass,
}: {
  item: ClassItem;
  accentClass: string;
}) {
  return (
    <div className="glass-card p-5 flex flex-col gap-3 hover:border-graph-600/70 transition-colors duration-200">
      <div className="flex items-start justify-between gap-3">
        <span className={`font-mono text-sm font-bold ${accentClass}`}>{item.code}</span>
        <span className="tag text-2xs shrink-0">{item.level}</span>
      </div>

      <div>
        <h4 className="font-display font-semibold text-graph-100 leading-snug mb-1">{item.title}</h4>
        <p className="text-xs text-graph-400 leading-relaxed line-clamp-3">{item.description}</p>
      </div>

      {item.takeaways && item.takeaways.length > 0 && (
        <ul className="space-y-1">
          {item.takeaways.slice(0, 2).map((t, i) => (
            <li key={i} className="flex gap-1.5 text-2xs text-graph-500">
              <span className={`${accentClass} shrink-0 mt-0.5`}>▹</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ClassesSection() {
  return (
    <section id="classes" className="py-24 md:py-32 bg-graph-900 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-violet/5 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h2 className="section-title">Coursework</h2>
            <p className="section-subtitle mb-0">
              Northwestern University — the foundations I build on
            </p>
          </div>
          <Link href="/classes" className="btn-ghost shrink-0">
            Full course list
            <svg className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Tracks */}
        <div className="space-y-10">
          {TRACKS.map((track) => {
            const items = track.codes
              .map((code) => classByCode[code])
              .filter(Boolean);

            return (
              <div key={track.id}>
                {/* Track label */}
                <div className={`flex items-center gap-3 mb-4 pb-3 border-b ${track.borderClass}`}>
                  <span className={`w-2 h-2 rounded-full ${track.dotClass} shrink-0`} />
                  <h3 className={`font-mono text-sm font-bold uppercase tracking-widest ${track.accentClass}`}>
                    {track.label}
                  </h3>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((item) => (
                    <ClassCard key={item.code} item={item} accentClass={track.accentClass} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
