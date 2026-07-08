import Link from 'next/link';
import { getProjects } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Research and engineering projects exploring graph neural networks and ML.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-graph-900 pt-24 pb-16">
      <div className="section-container">
        <div className="mb-12">
          <h1 className="section-title">Projects</h1>
          <p className="section-subtitle">
            Research and engineering work exploring graph algorithms and machine learning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group glass-card-hover overflow-hidden"
            >
              <div className="relative h-48 bg-graph-700/50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-violet/10 to-transparent" />
                <div className="absolute inset-0 bg-grid opacity-20" />
                
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`tag ${project.type === 'research' ? 'tag-violet' : 'tag-accent'}`}>
                    {project.type}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h2 className="font-display text-xl font-semibold text-graph-100 mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h2>
                <p className="text-graph-400 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span key={tech} className="tag text-2xs">{tech}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
