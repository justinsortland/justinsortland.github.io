import RSS from 'rss';
import { getAllBlogPosts } from './content';

export async function generateRSSFeed(): Promise<string> {
  const posts = await getAllBlogPosts();
  
  const feed = new RSS({
    title: 'Justin Sortland - Blog',
    description: 'Book reviews, paper deep-dives, and notes on what I am learning in ML and graph algorithms.',
    site_url: 'https://yoursite.com',
    feed_url: 'https://yoursite.com/rss.xml',
    language: 'en',
    pubDate: new Date(),
    copyright: `© ${new Date().getFullYear()} Justin Sortland`,
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `https://yoursite.com/blog/${post.slug}`,
      categories: post.tags,
      date: new Date(post.date),
      author: 'Justin Sortland',
    });
  });

  return feed.xml({ indent: true });
}
