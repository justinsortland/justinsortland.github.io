import MiniSearch from 'minisearch';
import type { BlogPost, Project } from './types';

interface SearchDocument {
  id: string;
  type: 'post' | 'project';
  title: string;
  content: string;
  tags: string[];
}

let searchIndex: MiniSearch<SearchDocument> | null = null;

export function initializeSearch(posts: BlogPost[], projects: Project[]) {
  searchIndex = new MiniSearch<SearchDocument>({
    fields: ['title', 'content', 'tags'],
    storeFields: ['type', 'title', 'tags'],
    searchOptions: {
      boost: { title: 2 },
      fuzzy: 0.2,
      prefix: true,
    },
  });

  const documents: SearchDocument[] = [
    ...posts.map(post => ({
      id: post.slug,
      type: 'post' as const,
      title: post.title,
      content: post.excerpt,
      tags: post.tags,
    })),
    ...projects.map(project => ({
      id: project.slug,
      type: 'project' as const,
      title: project.title,
      content: project.description,
      tags: project.tags,
    })),
  ];

  searchIndex.addAll(documents);
}

export function search(query: string) {
  if (!searchIndex) return [];
  return searchIndex.search(query);
}

export function generateSearchIndex(posts: BlogPost[], projects: Project[]): string {
  const documents = [
    ...posts.map(post => ({
      id: post.slug,
      type: 'post',
      title: post.title,
      excerpt: post.excerpt,
      tags: post.tags,
    })),
    ...projects.map(project => ({
      id: project.slug,
      type: 'project',
      title: project.title,
      excerpt: project.description,
      tags: project.tags,
    })),
  ];

  return JSON.stringify(documents);
}
