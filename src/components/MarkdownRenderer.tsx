'use client';

import { useEffect, useRef } from 'react';
import katex from 'katex';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Process LaTeX after initial render
    const container = containerRef.current;
    
    // Find all math expressions and render them
    const mathBlocks = container.querySelectorAll('.math-block, .math-inline');
    mathBlocks.forEach((el) => {
      const latex = el.getAttribute('data-latex');
      if (latex) {
        try {
          katex.render(latex, el as HTMLElement, {
            displayMode: el.classList.contains('math-block'),
            throwOnError: false,
          });
        } catch (e) {
          console.error('KaTeX error:', e);
        }
      }
    });
  }, [content]);

  // Parse markdown content
  const parseContent = (text: string): string => {
    let html = text;

    // Block math: $$...$$
    html = html.replace(/\$\$([\s\S]*?)\$\$/g, (_, latex) => {
      try {
        return `<div class="my-6 overflow-x-auto">${katex.renderToString(latex.trim(), { displayMode: true, throwOnError: false })}</div>`;
      } catch {
        return `<div class="math-block text-red-400" data-latex="${escapeHtml(latex.trim())}">[Math Error]</div>`;
      }
    });

    // Inline math: $...$
    html = html.replace(/\$([^\$\n]+?)\$/g, (_, latex) => {
      try {
        return katex.renderToString(latex.trim(), { displayMode: false, throwOnError: false });
      } catch {
        return `<span class="math-inline text-red-400" data-latex="${escapeHtml(latex.trim())}">[Math Error]</span>`;
      }
    });

    // Code blocks with syntax highlighting placeholder
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
      const language = lang || 'text';
      return `<pre class="!bg-graph-800 border border-graph-700/50 rounded-xl p-4 overflow-x-auto mb-6"><code class="language-${language} text-sm font-mono text-graph-300">${escapeHtml(code.trim())}</code></pre>`;
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-accent/10 text-accent font-mono text-sm">$1</code>');

    // Headers
    html = html.replace(/^### (.+)$/gm, '<h3 class="font-display text-xl font-semibold text-graph-100 mt-8 mb-4">$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2 class="font-display text-2xl font-semibold text-graph-100 mt-10 mb-4">$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1 class="font-display text-3xl font-bold text-graph-100 mt-12 mb-6">$1</h1>');

    // Bold and italic
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-graph-100">$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');

    // Lists
    html = html.replace(/^(\d+)\. (.+)$/gm, '<li class="ml-6 mb-2 text-graph-300 list-decimal">$2</li>');
    html = html.replace(/^- (.+)$/gm, '<li class="ml-6 mb-2 text-graph-300 list-disc">$1</li>');

    // Wrap consecutive list items
    html = html.replace(/(<li class="ml-6 mb-2 text-graph-300 list-disc">[\s\S]*?<\/li>\n?)+/g, (match) => {
      return `<ul class="my-4">${match}</ul>`;
    });
    html = html.replace(/(<li class="ml-6 mb-2 text-graph-300 list-decimal">[\s\S]*?<\/li>\n?)+/g, (match) => {
      return `<ol class="my-4">${match}</ol>`;
    });

    // Tables
    html = html.replace(/\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)+)/g, (_, header, body) => {
      const headers = header.split('|').filter(Boolean).map((h: string) => 
        `<th class="border-b border-graph-700 py-2 px-4 text-left text-graph-200 font-semibold">${h.trim()}</th>`
      ).join('');
      
      const rows = body.trim().split('\n').map((row: string) => {
        const cells = row.split('|').filter(Boolean).map((c: string) => 
          `<td class="border-b border-graph-700/50 py-2 px-4 text-graph-400">${c.trim()}</td>`
        ).join('');
        return `<tr>${cells}</tr>`;
      }).join('');

      return `<div class="overflow-x-auto my-6"><table class="w-full text-left border-collapse"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div>`;
    });

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-accent hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');

    // Paragraphs (lines not already wrapped)
    html = html.replace(/^(?!<[a-z])([\w].+)$/gm, '<p class="text-graph-300 leading-relaxed mb-4">$1</p>');

    // Clean up empty paragraphs
    html = html.replace(/<p class="text-graph-300 leading-relaxed mb-4"><\/p>/g, '');

    return html;
  };

  const escapeHtml = (text: string): string => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  return (
    <div 
      ref={containerRef}
      className="prose-custom"
      dangerouslySetInnerHTML={{ __html: parseContent(content) }}
    />
  );
}
