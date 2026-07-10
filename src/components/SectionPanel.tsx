'use client';

import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { BuildingPanel } from '@/data/panelData';

interface SectionPanelProps {
  panel: BuildingPanel;
  onClose: () => void;
}

export function SectionPanel({ panel, onClose }: SectionPanelProps) {
  const scrollToSection = useCallback(
    (selector: string) => {
      onClose();
      // Small delay so panel has time to close before scroll
      setTimeout(() => {
        const el = document.querySelector(selector);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    },
    [onClose],
  );

  // Escape key closes the panel
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Lock body scroll while panel is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const content = (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-end"
      role="dialog"
      aria-modal="true"
      aria-label={panel.title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="relative w-full sm:w-[420px] sm:h-full sm:max-h-screen
                   bg-graph-900 border-t sm:border-t-0 sm:border-l
                   border-graph-700/60 shadow-2xl
                   flex flex-col overflow-hidden
                   animate-slide-in-panel"
        style={{ borderTopColor: panel.accentColor + '60' }}
      >
        {/* Header */}
        <div
          className="flex-none px-6 pt-6 pb-4 border-b border-graph-800"
          style={{ borderBottomColor: panel.accentColor + '30' }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2
                className="text-xl font-display font-bold leading-tight"
                style={{ color: panel.accentColor }}
              >
                {panel.title}
              </h2>
              <p className="text-graph-500 text-xs font-mono mt-0.5 uppercase tracking-widest">
                {panel.subtitle}
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex-none w-8 h-8 flex items-center justify-center rounded
                         text-graph-500 hover:text-graph-200 hover:bg-graph-800
                         transition-colors duration-150"
              aria-label="Close panel"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body — scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {panel.sections.map((sec, i) => (
            <div key={i}>
              {sec.heading && (
                <h3
                  className="text-xs font-mono font-bold uppercase tracking-widest mb-2"
                  style={{ color: panel.accentColor }}
                >
                  {sec.heading}
                </h3>
              )}
              {sec.body && (
                <p className="text-graph-300 text-sm leading-relaxed">{sec.body}</p>
              )}
              {sec.bullets && (
                <ul className="space-y-1.5 mt-2">
                  {sec.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2 text-sm text-graph-300">
                      <span className="flex-none mt-0.5" style={{ color: panel.accentColor }}>
                        ▸
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
              {sec.tags && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {sec.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-xs font-mono bg-graph-800 text-graph-300
                                 border border-graph-700/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer — CTA */}
        <div className="flex-none px-6 py-4 border-t border-graph-800">
          <button
            onClick={() => scrollToSection(panel.ctaTarget)}
            className="w-full py-2.5 rounded-lg font-mono text-sm font-bold
                       transition-all duration-150 hover:brightness-110 active:scale-[0.98]"
            style={{
              background: panel.accentColor + '18',
              border: `1px solid ${panel.accentColor}50`,
              color: panel.accentColor,
            }}
          >
            {panel.ctaLabel}
          </button>
          <p className="mt-2.5 text-center text-[10px] font-mono text-graph-600 select-none">
            Press <kbd className="px-1 py-0.5 rounded bg-graph-800 border border-graph-700 text-graph-500 text-[9px]">E</kbd>
            {' '}or{' '}
            <kbd className="px-1 py-0.5 rounded bg-graph-800 border border-graph-700 text-graph-500 text-[9px]">Esc</kbd>
            {' '}to return to campus
          </p>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
