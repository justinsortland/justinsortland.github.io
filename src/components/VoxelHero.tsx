'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import type { NearBuilding } from './voxel/VoxelWorld';

// Dynamically import the 3-D scene so it never runs during SSR / static build.
// The loading state fills the same space so layout does not shift.
const VoxelWorld = dynamic(() => import('./voxel/VoxelWorld'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-graph-900">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-accent/40 border-t-accent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-graph-500 text-sm font-mono">Loading world…</p>
      </div>
    </div>
  ),
});

export function VoxelHero() {
  const [nearBuilding, setNearBuilding] = useState<NearBuilding>(null);

  const handleNear = useCallback((b: NearBuilding) => {
    setNearBuilding(b);
  }, []);

  const scrollToSection = (section: string) => {
    const el = document.querySelector(section);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative h-screen bg-graph-900 overflow-hidden"
      aria-label="Interactive voxel portfolio world"
    >
      {/* ── 3-D canvas fills the whole section ── */}
      <div className="absolute inset-0">
        <VoxelWorld onNearBuilding={handleNear} />
      </div>

      {/* ── Name / tagline card — top left ── */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none select-none">
        <div className="glass-card px-5 py-4 max-w-xs">
          <h1 className="font-display text-2xl font-bold text-graph-100 leading-tight">
            Justin Sortland
          </h1>
          <p className="text-accent text-sm font-mono mt-0.5">
            SWE · ML Researcher · Northwestern
          </p>
          <div className="flex items-center gap-1.5 mt-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-xs text-graph-400">Open to opportunities</span>
          </div>
        </div>
      </div>

      {/* ── Controls hint — bottom left ── */}
      <div className="absolute bottom-10 left-6 z-10 pointer-events-none select-none">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-graph-900/70 border border-graph-700/40">
          <div className="flex gap-1">
            {['W', 'A', 'S', 'D'].map((k) => (
              <kbd
                key={k}
                className="w-6 h-6 flex items-center justify-center rounded bg-graph-700/80
                           border border-graph-600/60 text-graph-300 text-xs font-mono"
              >
                {k}
              </kbd>
            ))}
          </div>
          <span className="text-graph-500 text-xs">or</span>
          <span className="text-graph-400 text-xs">Arrow keys to move</span>
        </div>
      </div>

      {/* ── Proximity prompt — bottom centre ── */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-10 transition-all duration-300
          ${nearBuilding ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
      >
        {nearBuilding && (
          <button
            onClick={() => scrollToSection(nearBuilding.section)}
            className="flex items-center gap-3 px-5 py-3 rounded-xl
                       bg-graph-900/90 border border-accent/50
                       text-sm font-mono text-graph-200 hover:text-accent
                       transition-colors duration-150 cursor-pointer"
            aria-label={`Navigate to ${nearBuilding.label} section`}
          >
            <span className="text-accent font-bold">{nearBuilding.label}</span>
            <span className="text-graph-500">·</span>
            <span>
              Press{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-graph-700 border border-graph-600
                             text-accent text-xs">
                E
              </kbd>{' '}
              or click to view
            </span>
          </button>
        )}
      </div>

      {/* ── Scroll hint — bottom right ── */}
      <div className="absolute bottom-8 right-6 z-10 pointer-events-none select-none">
        <div className="flex flex-col items-center gap-1.5 text-graph-600">
          <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
          <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
