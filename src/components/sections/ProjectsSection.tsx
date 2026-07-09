import Link from 'next/link';
import { getProjects } from '@/lib/content';
import type { Project } from '@/lib/types';

// ── helpers ────────────────────────────────────────────────────────────────────

function TypeBadge({ type }: { type: Project['type'] }) {
  const styles = {
    research: 'bg-amber/10 text-amber border-amber/30',
    engineering: 'bg-accent/10 text-accent border-accent/30',
    'open-source': 'bg-violet/10 text-violet border-violet/30',
  };
  const labels = { research: 'Research', engineering: 'Engineering', 'open-source': 'Open Source' };
  return (
    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-mono font-medium border ${styles[type]}`}>
      {labels[type]}
    </span>
  );
}

function TechTag({ name }: { name: string }) {
  return (
    <span className="px-2 py-0.5 rounded bg-graph-700/60 border border-graph-600/50 text-graph-300 text-xs font-mono">
      {name}
    </span>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-3 mt-4">
      <Link
        href={`/projects/${project.slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent
                   hover:underline underline-offset-4"
      >
        Case Study
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-graph-400 hover:text-graph-200 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          GitHub
        </a>
      )}
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-graph-400 hover:text-graph-200 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Demo
        </a>
      )}
    </div>
  );
}

// ── Flagship card (Counterparty) ───────────────────────────────────────────────

function FlagshipCard({ project }: { project: Project }) {
  return (
    <div className="glass-card overflow-hidden">
      <div className="grid md:grid-cols-5 gap-0">
        {/* Left: content */}
        <div className="md:col-span-3 p-7 md:p-8 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <TypeBadge type={project.type} />
            <span className="text-xs font-mono text-graph-500 uppercase tracking-widest">Flagship</span>
          </div>

          <div>
            <h3 className="font-display text-2xl font-bold text-graph-100 mb-2">
              {project.title}
            </h3>
            <p className="text-graph-300 leading-relaxed">{project.description}</p>
          </div>

          {project.highlights && (
            <ul className="space-y-2">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-graph-300">
                  <span className="text-accent mt-0.5 shrink-0">▸</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((t) => <TechTag key={t} name={t} />)}
          </div>

          <ProjectLinks project={project} />
        </div>

        {/* Right: decorative panel */}
        <div className="md:col-span-2 bg-graph-800/40 border-t md:border-t-0 md:border-l border-graph-700/50
                        p-7 flex flex-col justify-between gap-6 min-h-[200px]">
          <div>
            <p className="text-xs font-mono text-graph-500 uppercase tracking-widest mb-2">Problem</p>
            <p className="text-sm text-graph-400 leading-relaxed">{project.problem}</p>
          </div>
          <div>
            <p className="text-xs font-mono text-graph-500 uppercase tracking-widest mb-2">Outcome</p>
            <p className="text-sm text-graph-400 leading-relaxed">{project.results}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Standard project card ──────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="glass-card p-6 flex flex-col gap-4 hover:border-graph-600/70 transition-colors duration-200">
      <div className="flex items-start justify-between gap-3">
        <TypeBadge type={project.type} />
      </div>

      <div>
        <h3 className="font-display text-lg font-semibold text-graph-100 mb-1.5">
          {project.title}
        </h3>
        <p className="text-graph-400 text-sm leading-relaxed">{project.description}</p>
      </div>

      {project.highlights && (
        <ul className="space-y-1.5 flex-1">
          {project.highlights.slice(0, 3).map((h, i) => (
            <li key={i} className="flex gap-2 text-xs text-graph-400">
              <span className="text-accent shrink-0 mt-0.5">▸</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 5).map((t) => <TechTag key={t} name={t} />)}
        {project.technologies.length > 5 && (
          <span className="px-2 py-0.5 rounded bg-graph-700/40 text-graph-500 text-xs font-mono">
            +{project.technologies.length - 5}
          </span>
        )}
      </div>

      <ProjectLinks project={project} />
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────────

export async function ProjectsSection() {
  const projects = await getProjects();
  const [flagship, ...rest] = projects; // priority-sorted; Counterparty is first

  return (
    <section id="projects" className="py-24 md:py-32 bg-graph-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-violet/5 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h2 className="section-title">Projects</h2>
            <p className="section-subtitle mb-0">
              Engineering and research work — shipped, benchmarked, or in progress
            </p>
          </div>
          <Link href="/projects" className="btn-ghost shrink-0">
            View all
            <svg className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Flagship */}
        {flagship && <FlagshipCard project={flagship} />}

        {/* Grid of remaining projects */}
        {rest.length > 0 && (
          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
