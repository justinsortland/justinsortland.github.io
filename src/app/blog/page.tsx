import Link from 'next/link';
import { getAllBlogPosts, getAllTags } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Book reviews, paper deep-dives, and notes on what I am learning in ML and graph algorithms.',
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  const tags = await getAllTags();
  const featuredPosts = posts.filter(p => p.featured);
  const recentPosts = posts.slice(0, 10);

  return (
    <div className="min-h-screen bg-graph-900 pt-24 pb-16">
      <div className="section-container">
        <div className="mb-12">
          <h1 className="section-title">Blog</h1>
          <p className="section-subtitle">
            Book reviews, paper deep-dives, and notes from my learning journey in ML and graph algorithms.
          </p>
        </div>

        {/* Blog type tabs */}
        <div className="flex gap-4 mb-8">
          <Link href="/blog" className="px-4 py-2 rounded-lg bg-accent text-graph-900 font-medium">
            All Posts
          </Link>
          <Link href="/blog/books" className="px-4 py-2 rounded-lg bg-graph-700/50 text-graph-300 hover:bg-graph-700 font-medium transition-colors">
            📚 Books
          </Link>
          <Link href="/blog/learning" className="px-4 py-2 rounded-lg bg-graph-700/50 text-graph-300 hover:bg-graph-700 font-medium transition-colors">
            🧪 Papers & Learning
          </Link>
          <a href="/rss.xml" className="ml-auto px-4 py-2 rounded-lg bg-graph-700/50 text-graph-300 hover:bg-graph-700 font-medium transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z" />
            </svg>
            RSS
          </a>
        </div>

        {posts.length === 0 ? (
          <div className="glass-card p-10 text-center">
            <p className="text-graph-400 text-sm">No posts yet.</p>
          </div>
        ) : (
          <>
            {/* Featured posts */}
            {featuredPosts.length > 0 && (
              <div className="mb-12">
                <h2 className="font-display text-xl font-semibold text-graph-100 mb-6">Featured</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredPosts.slice(0, 2).map(post => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="glass-card-hover p-6"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`tag ${post.type === 'reading' ? 'tag-violet' : 'tag-accent'}`}>
                          {post.type === 'reading' ? '📚 Book' : '🧪 Learning'}
                        </span>
                        <span className="text-sm text-graph-500">{post.date}</span>
                      </div>
                      <h3 className="font-display text-xl font-semibold text-graph-100 mb-2 group-hover:text-accent transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-graph-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="tag text-2xs">{tag}</span>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="grid lg:grid-cols-3 gap-12">
              {/* Posts list */}
              <div className="lg:col-span-2">
                <h2 className="font-display text-xl font-semibold text-graph-100 mb-6">Recent Posts</h2>
                <div className="space-y-6">
                  {recentPosts.map(post => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="block glass-card p-6 hover:border-accent/30 transition-all"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`tag text-2xs ${post.type === 'reading' ? 'tag-violet' : 'tag-accent'}`}>
                          {post.type === 'reading' ? 'Book' : 'Learning'}
                        </span>
                        <span className="text-sm text-graph-500">{post.date}</span>
                      </div>
                      <h3 className="font-display text-lg font-semibold text-graph-100 mb-2 hover:text-accent transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-graph-400 text-sm line-clamp-2">{post.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              {tags.length > 0 && (
                <aside>
                  <div className="glass-card p-6">
                    <h3 className="font-display font-semibold text-graph-100 mb-4">Topics</h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <Link
                          key={tag}
                          href={`/blog/tag/${tag.toLowerCase()}`}
                          className="tag-interactive"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </aside>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
