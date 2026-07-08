import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getReadingBySlug, getReadings } from '@/lib/content';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const books = await getReadings();
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const book = await getReadingBySlug(params.slug);
  if (!book) return { title: 'Not Found' };
  return { title: book.title, description: book.summary };
}

export default async function BookPage({ params }: { params: { slug: string } }) {
  const book = await getReadingBySlug(params.slug);
  
  if (!book) notFound();

  return (
    <div className="min-h-screen bg-graph-900 pt-24 pb-16">
      <article className="section-container max-w-3xl">
        <Link href="/blog/books" className="inline-flex items-center gap-2 text-graph-400 hover:text-accent mb-8">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Books
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="tag tag-violet">📚 Book Review</span>
            <span className="text-sm text-graph-500">{book.date}</span>
          </div>
          
          <h1 className="font-display text-3xl md:text-4xl font-bold text-graph-100 mb-4">
            {book.title}
          </h1>
          
          <p className="text-graph-400 mb-4">by {book.authors.join(', ')}</p>
          
          {book.sourceLink && (
            <a href={book.sourceLink} target="_blank" rel="noopener noreferrer" className="link text-sm">
              View on Amazon/Goodreads →
            </a>
          )}
        </header>

        <div className="space-y-8">
          <section className="glass-card p-6">
            <h2 className="font-display text-lg font-semibold text-graph-100 mb-3">Summary</h2>
            <p className="text-graph-300 leading-relaxed">{book.summary}</p>
          </section>

          <section className="glass-card p-6">
            <h2 className="font-display text-lg font-semibold text-graph-100 mb-4">Key Takeaways</h2>
            <ul className="space-y-3">
              {book.keyInsights.map((insight, i) => (
                <li key={i} className="flex items-start gap-3 text-graph-300">
                  <span className="text-violet font-bold">{i + 1}.</span>
                  {insight}
                </li>
              ))}
            </ul>
          </section>

          {book.questionsRemaining && book.questionsRemaining.length > 0 && (
            <section className="glass-card p-6">
              <h2 className="font-display text-lg font-semibold text-graph-100 mb-4">Questions & Further Exploration</h2>
              <ul className="space-y-2">
                {book.questionsRemaining.map((q, i) => (
                  <li key={i} className="flex items-start gap-3 text-graph-400">
                    <span className="text-accent">?</span>
                    {q}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="flex flex-wrap gap-2">
            {book.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
