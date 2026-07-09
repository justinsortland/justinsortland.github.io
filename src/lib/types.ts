export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  type: 'research' | 'engineering' | 'open-source';
  featured: boolean;
  /** Display order; lower = more prominent */
  priority?: number;
  /** Which voxel-world building this project belongs to */
  voxelZone?: string;
  technologies: string[];
  tags: string[];
  /** 2-3 concise bullets shown on the homepage project card */
  highlights?: string[];
  github?: string;
  demo?: string;
  paper?: string;
  date: string;
  image?: string;
  problem?: string;
  approach?: string;
  results?: string;
  /** Long-form markdown rendered on the project detail page */
  content?: string;
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
  /** Which voxel-world building this experience entry belongs to */
  voxelZone?: string;
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

export interface Skill {
  name: string;
  proficiency: 'familiar' | 'proficient' | 'expert';
}

export interface SkillGroup {
  id: string;
  name: string;
  description: string;
  /** Tailwind color key used for accent rendering, e.g. 'accent' | 'violet' | 'amber' | 'green' */
  color: string;
  skills: Skill[];
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
