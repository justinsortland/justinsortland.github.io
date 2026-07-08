import Link from 'next/link';
import { getLearningPosts } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Papers & Learning',
  description: 'Deep dives into research papers, ML concepts, and what I am learning.',
};

export default async function LearningPage() {
  const posts = await getLearningPosts();

  const difficultyColors = {
    beginner: 'text-green-400 bg-green-400/10 border-green-400/30',
    intermediate: 'text-amber bg-amber/10 border-amber/30',
    advanced: 'text-red-400 bg-red-400/10 border-red-400/30',
  };

  return (
    <div className="min-h-screen bg-graph-900 pt-24 pb-16">
      <div className="section-container">
        <div className="mb-12">
          <Link href="/blog" className="text-accent hover:underline text-sm mb-4 inline-block">
            ← Back to Blog
          </Link>
          <h1 className="section-title">🧪 Papers & Learning</h1>
          <p className="section-subtitle">
            Deep dives into research papers, ML concepts, implementations, and topics I'm exploring.
          </p>
        </div>

        <div className="space-y-6">
          {posts.map(post => (
            <Link
              key={post.slug}
              href={`/blog/learning/${post.slug}`}
              className="block glass-card p-6 hover:border-accent/30 transition-all"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-graph-500">{post.date}</span>
                    <span className={`tag text-2xs ${difficultyColors[post.difficulty]}`}>
                      {post.difficulty}
                    </span>
                  </div>
                  <h2 className="font-display text-xl font-semibold text-graph-100 hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                </div>
                {post.featured && (
                  <span className="tag tag-amber shrink-0">Featured</span>
                )}
              </div>
              
              <p className="text-graph-400 mb-4 line-clamp-2">{post.content.slice(0, 200)}...</p>

              {post.prerequisites && post.prerequisites.length > 0 && (
                <div className="mb-4">
                  <span className="text-sm text-graph-500">Prerequisites: </span>
                  <span className="text-sm text-graph-400">{post.prerequisites.join(', ')}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="tag text-2xs">{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
