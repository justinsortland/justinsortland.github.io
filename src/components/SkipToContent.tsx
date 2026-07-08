'use client';

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="fixed top-0 left-0 z-[100] -translate-y-full focus:translate-y-0 
                 bg-accent text-graph-900 px-4 py-2 font-medium
                 transition-transform duration-200
                 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 
                 focus:ring-offset-graph-900"
    >
      Skip to main content
    </a>
  );
}
