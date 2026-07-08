export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  type: 'research' | 'engineering' | 'open-source';
  featured: boolean;
  technologies: string[];
  tags: string[];
  github?: string;
  demo?: string;
  paper?: string;
  date: string;
  image?: string;
  problem?: string;
  approach?: string;
  results?: string;
}

export interface Experience {
  slug: string;
  company: string;
  role: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
  type: 'full-time' | 'internship' | 'research' | 'freelance';
}

export interface ClassItem {
  code: string;
  title: string;
  institution: string;
  description: string;
  tags: string[];
  level: 'Undergraduate' | 'Graduate' | 'PhD';
  semester?: string;
  instructor?: string;
  grade?: string;
  notes?: string;
  takeaways?: string[];
}

export interface ReadingPost {
  slug: string;
  title: string;
  date: string;
  sourceLink: string;
  authors: string[];
  tags: string[];
  summary: string;
  keyInsights: string[];
  questionsRemaining: string[];
  featured?: boolean;
}

export interface LearningPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites?: string[];
  content: string;
  featured?: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  type: 'reading' | 'learning';
  excerpt: string;
  featured?: boolean;
}
