# Content Editing Guide

This guide explains how to add and edit content on your portfolio site.

## Table of Contents

1. [Projects](#projects)
2. [Experience](#experience)
3. [Blog Posts](#blog-posts)
4. [Coursework](#coursework)
5. [About Page](#about-page)

---

## Projects

Projects are currently defined in `src/lib/content.ts`. To add a new project:

### Option 1: Edit the Sample Data (Quick)

In `src/lib/content.ts`, find the `getSampleProjects()` function and add your project:

```typescript
{
  slug: 'my-project',           // URL slug (unique)
  title: 'My Awesome Project',
  description: 'A short description for cards.',
  type: 'research',             // 'research' | 'engineering' | 'open-source'
  featured: true,               // Show on homepage
  technologies: ['Python', 'PyTorch', 'React'],
  tags: ['GNN', 'ML', 'Visualization'],
  github: 'https://github.com/...',
  demo: 'https://demo.example.com',
  date: '2024-03-01',
  problem: 'What problem does this solve?',
  approach: 'How did you solve it?',
  results: 'What were the outcomes?',
}
```

### Option 2: Use MDX Files (Scalable)

Create a file at `src/content/projects/my-project.mdx`:

```mdx
---
title: My Awesome Project
description: A short description for cards.
type: research
featured: true
technologies:
  - Python
  - PyTorch
tags:
  - GNN
  - ML
github: https://github.com/...
demo: https://demo.example.com
date: 2024-03-01
problem: What problem does this solve?
approach: How did you solve it?
results: What were the outcomes?
---

## Overview

Your detailed project description here...

## Technical Details

You can include code blocks:

```python
def example():
    return "Hello, World!"
```

And math:

$$E = mc^2$$
```

---

## Experience

Experience entries are in `src/lib/content.ts` in the `getSampleExperience()` function:

```typescript
{
  slug: 'company-role',
  company: 'Company Name',
  role: 'Job Title',
  location: 'City, State',
  period: 'Jan 2023 - Present',
  description: 'What you did in this role.',
  highlights: [
    'Achievement 1 with metrics',
    'Achievement 2 with impact',
    'Achievement 3 with results',
  ],
  technologies: ['Python', 'Kubernetes', 'PyTorch'],
  type: 'full-time',  // 'full-time' | 'internship' | 'research' | 'freelance'
}
```

---

## Blog Posts

There are two types of blog posts:

### Readings (Paper Reviews)

In `src/lib/content.ts`, find `getSampleReadings()`:

```typescript
{
  slug: 'paper-name',
  title: 'Full Paper Title',
  date: '2024-03-01',
  sourceLink: 'https://arxiv.org/abs/...',
  authors: ['Author One', 'Author Two'],
  tags: ['GNN', 'Attention', 'NLP'],
  summary: 'A 2-3 sentence summary of the paper.',
  keyInsights: [
    'First key insight from the paper',
    'Second key insight',
    'Third key insight',
  ],
  questionsRemaining: [
    'What questions do you still have?',
    'What would you explore further?',
  ],
  featured: true,  // Show in featured section
}
```

### Learning (Tutorials)

In `src/lib/content.ts`, find `getSampleLearningPosts()`:

```typescript
{
  slug: 'tutorial-slug',
  title: 'Tutorial Title',
  date: '2024-03-01',
  tags: ['PyTorch', 'GNN', 'Tutorial'],
  difficulty: 'intermediate',  // 'beginner' | 'intermediate' | 'advanced'
  prerequisites: ['Basic Python', 'Linear Algebra'],
  content: `
Your tutorial content here...

## Section 1

You can use Markdown formatting.

### Code Examples

\`\`\`python
import torch

def example():
    return torch.tensor([1, 2, 3])
\`\`\`

### Math

The loss function is:

$$L = -\\sum_{i} y_i \\log(\\hat{y}_i)$$
  `,
  featured: true,
}
```

### Writing Math in Blog Posts

Use LaTeX syntax:

- **Inline math**: `$x^2 + y^2 = z^2$`
- **Block math**: 
  ```
  $$
  f(x) = \int_{-\infty}^{\infty} e^{-x^2} dx
  $$
  ```

### Writing Code in Blog Posts

Use fenced code blocks with language:

````markdown
```python
def hello():
    print("Hello, World!")
```
````

Supported languages: python, javascript, typescript, rust, go, bash, sql, json, yaml, and more.

---

## Coursework

Classes are defined in `src/lib/content.ts` in `getSampleClasses()`:

```typescript
{
  code: 'CS 224W',
  title: 'Machine Learning with Graphs',
  institution: 'Stanford',
  description: 'Short description of course content.',
  tags: ['ML', 'Graphs'],
  level: 'Graduate',  // 'Undergraduate' | 'Graduate' | 'PhD'
}
```

The Classes page has built-in filtering by:
- Topic tags (ML, Graphs, Math, Systems, Algorithms)
- Level (Undergraduate, Graduate, PhD)
- Search text

---

## About Page

Edit `src/app/about/page.tsx` directly to update:

1. **Profile information** - Name, tagline, bio
2. **Now section** - Current projects, reading list, learning goals
3. **Values section** - What you believe in

---

## Tips for Good Content

### Projects

- Lead with impact: "Reduced latency by 40%" not "Worked on optimization"
- Include metrics where possible
- Show the problem → solution → result flow
- Tag appropriately for discoverability

### Blog Posts

- **Readings**: Focus on what YOU learned, not just summarizing
- **Learning**: Start with the "why", then the "how"
- Use diagrams and code examples liberally
- End with next steps or related topics

### General

- Use active voice
- Be specific about technologies and approaches
- Include dates for chronological ordering
- Keep descriptions scannable (use bullets for details)

---

## Deploying Changes

After editing content:

```bash
# Test locally
npm run dev

# Build to check for errors
npm run build

# Deploy (if using Vercel, just push to git)
git add .
git commit -m "Add new project"
git push
```

---

## Need Help?

If you're stuck, check:
1. TypeScript types in `src/lib/types.ts`
2. How existing content is structured
3. Next.js docs for routing questions
