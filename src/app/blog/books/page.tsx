import Link from 'next/link';
import { getReadings } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Books',
  description: 'Book reviews and notes on books I have read about ML, mathematics, and technology.',
};

export default async function BooksPage() {
  const books = await getReadings();

  return (
    <div className="min-h-screen bg-graph-900 pt-24 pb-16">
      <div className="section-container">
        <div className="mb-12">
          <Link href="/blog" className="text-accent hover:underline text-sm mb-4 inline-block">
            ← Back to Blog
          </Link>
          <h1 className="section-title">📚 Books</h1>
          <p className="section-subtitle">
            Reviews and key takeaways from books I've read on ML, mathematics, technology, and more.
          </p>
        </div>

        {books.length === 0 ? (
          <div className="glass-card p-10 text-center">
            <p className="text-graph-400 text-sm">No book reviews yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {books.map(book => (
              <Link
                key={book.slug}
                href={`/blog/books/${book.slug}`}
                className="block glass-card p-6 hover:border-violet/30 transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-sm text-graph-500">{book.date}</span>
                    <h2 className="font-display text-xl font-semibold text-graph-100 hover:text-violet transition-colors">
                      {book.title}
                    </h2>
                    <p className="text-sm text-graph-400">by {book.authors.join(', ')}</p>
                  </div>
                  {book.featured && (
                    <span className="tag tag-amber shrink-0">Featured</span>
                  )}
                </div>

                <p className="text-graph-400 mb-4">{book.summary}</p>

                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-graph-300 mb-2">Key Takeaways</h3>
                  <ul className="space-y-1">
                    {book.keyInsights.slice(0, 2).map((insight, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-graph-400">
                        <span className="text-violet">•</span>
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {book.tags.map(tag => (
                    <span key={tag} className="tag text-2xs">{tag}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
