import type { Project, Experience, ClassItem, ReadingPost, LearningPost, BlogPost } from './types';
import { projects as projectData } from '@/data/projects';
import { experience as experienceData } from '@/data/experience';
import { classes as classData } from '@/data/classes';
import { books as booksData } from '@/data/books';
import { learningPosts as learningPostsData } from '@/data/learningPosts';

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

export async function getReadings(): Promise<ReadingPost[]> {
  return booksData;
}

export async function getReadingBySlug(slug: string): Promise<ReadingPost | null> {
  return booksData.find((r) => r.slug === slug) ?? null;
}

export async function getLearningPosts(): Promise<LearningPost[]> {
  return learningPostsData;
}

export async function getLearningBySlug(slug: string): Promise<LearningPost | null> {
  return learningPostsData.find((l) => l.slug === slug) ?? null;
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

