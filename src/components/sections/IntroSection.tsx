export function IntroSection() {
  return (
    <section id="intro" className="py-24 md:py-32 bg-graph-900 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-dots opacity-20" />
      
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Who I Am */}
          <div className="glass-card p-8 group hover:border-accent/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="font-display text-xl font-semibold text-graph-100 mb-4">
              Who I Am
            </h3>
            <p className="text-graph-400 leading-relaxed">
              A researcher and engineer fascinated by the structure hidden in data. 
              I believe that understanding relationships—edges in graphs, dependencies in systems, 
              connections in networks—is the key to building intelligent systems that actually work.
            </p>
          </div>

          {/* What I'm Exploring */}
          <div className="glass-card p-8 group hover:border-violet/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-violet/10 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="font-display text-xl font-semibold text-graph-100 mb-4">
              What I'm Exploring
            </h3>
            <div className="space-y-3 text-graph-400">
              <p className="flex items-start gap-2">
                <span className="text-accent mt-1">→</span>
                <span>Spectral graph theory and its applications to GNNs</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-violet mt-1">→</span>
                <span>Scalable message-passing for billion-edge graphs</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-amber mt-1">→</span>
                <span>Geometric deep learning on manifolds</span>
              </p>
            </div>
          </div>

          {/* What I'm Looking For */}
          <div className="glass-card p-8 group hover:border-amber/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="font-display text-xl font-semibold text-graph-100 mb-4">
              What I'm Looking For
            </h3>
            <p className="text-graph-400 leading-relaxed mb-4">
              Opportunities to work on challenging problems at the intersection of 
              ML systems and theoretical CS. I'm especially excited about:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-graph-300 text-sm">Research engineering roles</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet" />
                <span className="text-graph-300 text-sm">ML infrastructure teams</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                <span className="text-graph-300 text-sm">Applied research positions</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '3+', label: 'Years Experience' },
            { value: '15+', label: 'Projects Shipped' },
            { value: '8', label: 'Research Papers Read/Week' },
            { value: '∞', label: 'Graphs Traversed' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 rounded-xl bg-graph-800/30 border border-graph-700/30">
              <div className="font-display text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-graph-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
