import type { Project, Experience, ClassItem, ReadingPost, LearningPost, BlogPost } from './types';
import { projects as projectData } from '@/data/projects';
import { experience as experienceData } from '@/data/experience';
import { classes as classData } from '@/data/classes';

// ─── Projects ─────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  return projectData.slice().sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));
}

export async function getProjectBySlug(
  slug: string
): Promise<{ project: Project; content: string } | null> {
  const project = projectData.find((p) => p.slug === slug);
  if (!project) return null;
  return { project, content: project.content ?? '' };
}

// ─── Experience ───────────────────────────────────────────────────────────────

export async function getExperience(): Promise<Experience[]> {
  return experienceData;
}

// ─── Classes ──────────────────────────────────────────────────────────────────

export async function getClasses(): Promise<ClassItem[]> {
  return classData;
}

// ─── Blog (readings + learning posts) ────────────────────────────────────────
// These are kept as inline sample data for now; replace with MDX or a CMS later.

export async function getReadings(): Promise<ReadingPost[]> {
  return getSampleBooks();
}

export async function getReadingBySlug(slug: string): Promise<ReadingPost | null> {
  return getSampleBooks().find((r) => r.slug === slug) ?? null;
}

export async function getLearningPosts(): Promise<LearningPost[]> {
  return getSampleLearningPosts();
}

export async function getLearningBySlug(slug: string): Promise<LearningPost | null> {
  return getSampleLearningPosts().find((l) => l.slug === slug) ?? null;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const books = await getReadings();
  const learnings = await getLearningPosts();

  const bookPosts: BlogPost[] = books.map((r) => ({
    slug: `books/${r.slug}`,
    title: r.title,
    date: r.date,
    tags: r.tags,
    type: 'reading' as const,
    excerpt: r.summary.slice(0, 160) + '...',
    featured: r.featured,
  }));

  const learningPosts: BlogPost[] = learnings.map((l) => ({
    slug: `learning/${l.slug}`,
    title: l.title,
    date: l.date,
    tags: l.tags,
    type: 'learning' as const,
    excerpt: l.content.slice(0, 160) + '...',
    featured: l.featured,
  }));

  return [...bookPosts, ...learningPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  const tagSet = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

// ─── Sample blog data (not yet replaced with real posts) ─────────────────────

function getSampleBooks(): ReadingPost[] {
  return [
    {
      slug: 'designing-data-intensive-applications',
      title: 'Designing Data-Intensive Applications',
      date: '2024-02-15',
      sourceLink: 'https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/',
      authors: ['Martin Kleppmann'],
      tags: ['Systems', 'Distributed', 'Databases'],
      summary:
        'A comprehensive guide to the principles and practicalities of data systems. Kleppmann masterfully explains the trade-offs between different approaches to storing, processing, and transmitting data.',
      keyInsights: [
        'The CAP theorem is often misunderstood—it is about network partitions, not choosing between consistency and availability in general',
        'Stream processing and batch processing are converging, with tools like Kafka enabling exactly-once semantics',
        'Understanding the internals of databases (LSM trees, B-trees) helps you make better architectural decisions',
      ],
      questionsRemaining: [
        'How will new hardware (persistent memory, CXL) change these trade-offs?',
        'What does the rise of serverless mean for stateful applications?',
      ],
      featured: true,
    },
    {
      slug: 'the-book-of-why',
      title: 'The Book of Why: The New Science of Cause and Effect',
      date: '2024-01-20',
      sourceLink: 'https://www.amazon.com/Book-Why-Science-Cause-Effect/dp/046509760X',
      authors: ['Judea Pearl', 'Dana Mackenzie'],
      tags: ['Causality', 'ML', 'Statistics'],
      summary:
        "Pearl presents his ladder of causation and argues that understanding cause-and-effect is essential for true AI. A provocative challenge to the \"data-is-enough\" mentality.",
      keyInsights: [
        'Correlation does not imply causation, but with the right tools (do-calculus, DAGs) we can infer causation from observational data',
        'The ladder of causation: seeing (association), doing (intervention), imagining (counterfactuals)',
        'Current deep learning is stuck at level 1—it can find patterns but cannot reason about interventions',
      ],
      questionsRemaining: [
        'Can we build causal discovery algorithms that scale to high-dimensional data?',
        'How do we incorporate causal reasoning into neural network architectures?',
      ],
      featured: true,
    },
    {
      slug: 'godel-escher-bach',
      title: 'Gödel, Escher, Bach: An Eternal Golden Braid',
      date: '2023-12-10',
      sourceLink: 'https://www.amazon.com/G%C3%B6del-Escher-Bach-Eternal-Golden/dp/0465026567',
      authors: ['Douglas Hofstadter'],
      tags: ['Math', 'Philosophy', 'Computation'],
      summary:
        'A mind-bending exploration of consciousness, self-reference, and the nature of meaning through the lenses of mathematics, art, and music. Dense but rewarding.',
      keyInsights: [
        "Strange loops—hierarchical systems that loop back on themselves—may be key to understanding consciousness",
        "Gödel's incompleteness theorems show fundamental limits on formal systems, with deep implications for AI",
        'Isomorphisms between different domains (music, math, art) reveal underlying patterns of meaning',
      ],
      questionsRemaining: [
        'Can artificial systems exhibit genuine strange loops, or only simulate them?',
        'What is the relationship between self-reference and self-awareness?',
      ],
    },
  ];
}

function getSampleLearningPosts(): LearningPost[] {
  return [
    {
      slug: 'attention-is-all-you-need',
      title: 'Deep Dive: Attention Is All You Need',
      date: '2024-02-20',
      tags: ['Transformers', 'NLP', 'Paper'],
      difficulty: 'intermediate',
      prerequisites: ['Linear Algebra', 'Deep Learning Basics'],
      content: `The 2017 paper that launched a thousand models. Let's break down the Transformer architecture piece by piece.

## The Core Innovation

The key insight is that self-attention can replace recurrence entirely:

$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$

This allows parallel computation across sequence positions and direct modeling of long-range dependencies.`,
      featured: true,
    },
    {
      slug: 'graph-attention-networks',
      title: 'Understanding Graph Attention Networks (GAT)',
      date: '2024-02-05',
      tags: ['GNN', 'Attention', 'Graphs', 'Paper'],
      difficulty: 'advanced',
      prerequisites: ['Graph Theory', 'PyTorch', 'Attention Mechanisms'],
      content: `The GAT paper introduced attention to graph neural networks. Here's how it works and why it matters.

## From GCN to GAT

GCN uses fixed aggregation weights based on node degrees. GAT learns the weights per neighbor, allowing it to focus on the most informative connections.`,
      featured: true,
    },
  ];
}
