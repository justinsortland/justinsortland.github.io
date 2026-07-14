import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getLearningBySlug, getLearningPosts } from '@/lib/content';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const posts = await getLearningPosts();
  // Next.js 14 output: export requires at least one path for dynamic routes.
  // Return a sentinel when there are no posts; the page will call notFound()
  // for any unrecognized slug, so the sentinel path is unreachable in practice.
  if (posts.length === 0) return [{ slug: '_empty' }];
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getLearningBySlug(params.slug);
  if (!post) return { title: 'Not Found' };
  return { title: post.title, description: post.content.slice(0, 160) };
}

export default async function LearningPostPage({ params }: { params: { slug: string } }) {
  const post = await getLearningBySlug(params.slug);
  
  if (!post) notFound();

  const difficultyColors = {
    beginner: 'text-green-400 bg-green-400/10 border-green-400/30',
    intermediate: 'text-amber bg-amber/10 border-amber/30',
    advanced: 'text-red-400 bg-red-400/10 border-red-400/30',
  };

  return (
    <div className="min-h-screen bg-graph-900 pt-24 pb-16">
      <article className="section-container max-w-3xl">
        <Link href="/blog/learning" className="inline-flex items-center gap-2 text-graph-400 hover:text-accent mb-8">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Learning
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="tag tag-accent">🧪 Learning</span>
            <span className={`tag ${difficultyColors[post.difficulty]}`}>
              {post.difficulty}
            </span>
            <span className="text-sm text-graph-500">{post.date}</span>
          </div>
          
          <h1 className="font-display text-3xl md:text-4xl font-bold text-graph-100 mb-4">
            {post.title}
          </h1>
          
          {post.prerequisites && post.prerequisites.length > 0 && (
            <div className="glass-card p-4 mb-4">
              <h2 className="text-sm font-semibold text-graph-300 mb-2">Prerequisites</h2>
              <div className="flex flex-wrap gap-2">
                {post.prerequisites.map(prereq => (
                  <span key={prereq} className="tag text-2xs">{prereq}</span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          <div className="whitespace-pre-wrap text-graph-300 leading-relaxed">
            {post.content}
          </div>
        </div>
      </article>
    </div>
  );
}
