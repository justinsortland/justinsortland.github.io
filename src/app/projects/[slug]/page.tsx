import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProjectBySlug, getProjects } from '@/lib/content';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await getProjectBySlug(params.slug);
  if (!data) return { title: 'Project Not Found' };
  return { title: data.project.title, description: data.project.description };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const data = await getProjectBySlug(params.slug);
  if (!data) notFound();

  const { project, content } = data;
  const projects = await getProjects();
  const relatedProjects = projects
    .filter(p => p.slug !== project.slug && p.tags.some(t => project.tags.includes(t)))
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-graph-900 pt-24 pb-16">
      <article className="section-container">
        <Link href="/projects" className="inline-flex items-center gap-2 text-graph-400 hover:text-accent mb-8 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>

        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`tag ${project.type === 'research' ? 'tag-violet' : 'tag-accent'}`}>{project.type}</span>
            {project.tags.map(tag => (<span key={tag} className="tag">{tag}</span>))}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-graph-100 mb-4">{project.title}</h1>
          <p className="text-xl text-graph-400 mb-6">{project.description}</p>
          <div className="flex flex-wrap gap-4">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                View Code
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                Live Demo
              </a>
            )}
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {(project.problem || project.approach || project.results) && (
              <div className="grid gap-6 mb-12">
                {project.problem && (
                  <div className="glass-card p-6">
                    <h3 className="font-display font-semibold text-graph-100 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-400" />Problem
                    </h3>
                    <p className="text-graph-400">{project.problem}</p>
                  </div>
                )}
                {project.approach && (
                  <div className="glass-card p-6">
                    <h3 className="font-display font-semibold text-graph-100 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent" />Approach
                    </h3>
                    <p className="text-graph-400">{project.approach}</p>
                  </div>
                )}
                {project.results && (
                  <div className="glass-card p-6">
                    <h3 className="font-display font-semibold text-graph-100 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-400" />Results
                    </h3>
                    <p className="text-graph-400">{project.results}</p>
                  </div>
                )}
              </div>
            )}
            <MarkdownRenderer content={content} />
          </div>

          <aside className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold text-graph-100 mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (<span key={tech} className="tag">{tech}</span>))}
              </div>
            </div>
            {relatedProjects.length > 0 && (
              <div className="glass-card p-6">
                <h3 className="font-display font-semibold text-graph-100 mb-4">Related Projects</h3>
                <div className="space-y-4">
                  {relatedProjects.map(rp => (
                    <Link key={rp.slug} href={`/projects/${rp.slug}`} className="block group">
                      <h4 className="font-medium text-graph-200 group-hover:text-accent transition-colors">{rp.title}</h4>
                      <p className="text-sm text-graph-400 line-clamp-2">{rp.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </article>
    </div>
  );
}
