import Link from 'next/link';
import { getProjects } from '@/lib/content';

export async function ProjectsSection() {
  const projects = await getProjects();
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

  return (
    <section id="projects" className="py-24 md:py-32 bg-graph-900 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-violet/5 via-transparent to-transparent blur-3xl" />
      
      <div className="section-container relative z-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle mb-0">
              Systems and research exploring graph algorithms and ML
            </p>
          </div>
          <Link href="/projects" className="btn-ghost shrink-0">
            View all projects
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group glass-card-hover overflow-hidden"
            >
              {/* Thumbnail */}
              <div className="relative h-48 bg-graph-700/50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-violet/10 to-transparent" />
                <div className="absolute inset-0 bg-grid opacity-20" />
                
                {/* Project type icon */}
                <div className="absolute top-4 left-4">
                  <span className={`tag ${project.type === 'research' ? 'tag-violet' : 'tag-accent'}`}>
                    {project.type}
                  </span>
                </div>

                {/* Decorative graph visualization */}
                <svg 
                  className="absolute inset-0 w-full h-full opacity-30 group-hover:opacity-50 transition-opacity"
                  viewBox="0 0 200 120"
                  fill="none"
                >
                  <circle cx="40" cy="40" r="4" fill="currentColor" className="text-accent" />
                  <circle cx="80" cy="70" r="4" fill="currentColor" className="text-violet" />
                  <circle cx="120" cy="30" r="4" fill="currentColor" className="text-accent" />
                  <circle cx="160" cy="60" r="4" fill="currentColor" className="text-violet" />
                  <circle cx="100" cy="90" r="4" fill="currentColor" className="text-accent" />
                  <line x1="40" y1="40" x2="80" y2="70" stroke="currentColor" strokeWidth="1" className="text-graph-500" />
                  <line x1="80" y1="70" x2="120" y2="30" stroke="currentColor" strokeWidth="1" className="text-graph-500" />
                  <line x1="120" y1="30" x2="160" y2="60" stroke="currentColor" strokeWidth="1" className="text-graph-500" />
                  <line x1="80" y1="70" x2="100" y2="90" stroke="currentColor" strokeWidth="1" className="text-graph-500" />
                  <line x1="100" y1="90" x2="160" y2="60" stroke="currentColor" strokeWidth="1" className="text-graph-500" />
                </svg>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-graph-100 mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-graph-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="tag text-2xs">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="tag text-2xs">+{project.technologies.length - 4}</span>
                  )}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 text-sm">
                  {project.github && (
                    <span className="flex items-center gap-1.5 text-graph-400 group-hover:text-accent transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      Code
                    </span>
                  )}
                  {project.demo && (
                    <span className="flex items-center gap-1.5 text-graph-400 group-hover:text-accent transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Demo
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
