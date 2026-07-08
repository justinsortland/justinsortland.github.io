import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import Image from 'next/image';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="font-display text-3xl font-bold text-graph-100 mt-8 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-2xl font-semibold text-graph-100 mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-xl font-semibold text-graph-100 mt-6 mb-3">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-graph-300 leading-relaxed mb-4">{children}</p>
    ),
    a: ({ href, children }) => {
      if (href?.startsWith('/')) {
        return (
          <Link href={href} className="link">
            {children}
          </Link>
        );
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="link">
          {children}
        </a>
      );
    },
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-graph-300">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-graph-300">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="text-graph-300">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-4 italic text-graph-400 my-4">
        {children}
      </blockquote>
    ),
    code: ({ children, className }) => {
      // Inline code
      if (!className) {
        return (
          <code className="px-1.5 py-0.5 rounded bg-accent/10 text-accent font-mono text-sm">
            {children}
          </code>
        );
      }
      // Code blocks are handled by rehype-pretty-code
      return <code className={className}>{children}</code>;
    },
    pre: ({ children }) => (
      <pre className="!bg-graph-800 border border-graph-700/50 rounded-xl p-4 overflow-x-auto mb-4">
        {children}
      </pre>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-left border-collapse">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border-b border-graph-700 py-2 px-4 text-graph-200 font-semibold">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-b border-graph-700/50 py-2 px-4 text-graph-400">
        {children}
      </td>
    ),
    img: ({ src, alt }) => (
      <Image
        src={src || ''}
        alt={alt || ''}
        width={800}
        height={400}
        className="rounded-xl my-4"
      />
    ),
    hr: () => <hr className="my-8 border-graph-700" />,
    ...components,
  };
}
