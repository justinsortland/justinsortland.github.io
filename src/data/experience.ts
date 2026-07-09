import type { Experience } from '@/lib/types';

export const experience: Experience[] = [
  // ─── Full-Time ────────────────────────────────────────────────────────────────
  {
    slug: 'northern-trust-swe',
    company: 'Northern Trust',
    role: 'Software Engineer',
    location: 'Chicago, IL',
    period: '2024 – Present',
    description:
      'Building trading and risk systems for the Asset Management technology group at one of the top-10 US custodian banks.',
    highlights: [
      'Designed and shipped a real-time counterparty credit exposure engine that replaced an overnight batch process, cutting reconciliation lag from 6+ hours to under 30 seconds',
      'Architected an event-driven microservices migration (Kafka + Python) for three legacy Java batch jobs with zero downtime cutover',
      'Built React + TypeScript dashboards consumed by 15+ risk officers and trade desk staff daily',
      'Wrote and maintained production infrastructure on AWS (ECS, RDS, ElastiCache) with CI/CD via GitHub Actions',
    ],
    technologies: [
      'Python',
      'React',
      'TypeScript',
      'FastAPI',
      'PostgreSQL',
      'Redis',
      'Kafka',
      'Docker',
      'AWS',
      'GitHub Actions',
    ],
    type: 'full-time',
    voxelZone: 'experience-office',
  },

  // ─── Research ─────────────────────────────────────────────────────────────────
  {
    slug: 'northwestern-ra',
    company: 'Northwestern University',
    role: 'Research Assistant — Computer Vision',
    location: 'Evanston, IL',
    period: '2023 – 2024',
    description:
      'Conducted research in the computer vision group on efficient universal image segmentation, integrating state-space model backbones into the Segment Anything Model framework.',
    highlights: [
      'Replaced SAM\'s ViT-H image encoder with a VisionMamba backbone, achieving 2.1× higher throughput and 38% lower peak GPU memory with only a 1.2% mIoU drop on ADE20K',
      'Implemented feature-level distillation loss aligning Mamba patch embeddings to frozen ViT-H teacher representations',
      'Benchmarked on COCO and ADE20K; wrote experiment tracking pipeline with Weights & Biases',
      'Presented findings at the Northwestern CS research showcase',
    ],
    technologies: [
      'Python',
      'PyTorch',
      'CUDA',
      'SAM',
      'Mamba',
      'HuggingFace',
      'Weights & Biases',
      'Linux',
    ],
    type: 'research',
    voxelZone: 'experience-office',
  },

  // ─── Internship ───────────────────────────────────────────────────────────────
  {
    slug: 'northern-trust-intern',
    company: 'Northern Trust',
    role: 'Software Engineer Intern',
    location: 'Chicago, IL',
    period: 'Summer 2023',
    description:
      'Interned on the Asset Servicing engineering team, building internal tooling and client-facing data pipelines.',
    highlights: [
      'Built an internal portfolio analytics dashboard adopted by 12 client-facing teams within two weeks of launch',
      'Automated a daily reconciliation workflow that previously required 15+ hours of manual effort per week',
      'Shipped five REST API endpoints (FastAPI) consumed by both the web dashboard and mobile clients',
      'Participated in sprint planning, code review, and production on-call rotation alongside full-time engineers',
    ],
    technologies: [
      'React',
      'Python',
      'FastAPI',
      'PostgreSQL',
      'SQL',
      'Tableau',
      'Docker',
    ],
    type: 'internship',
    voxelZone: 'experience-office',
  },

  // ─── Teaching ─────────────────────────────────────────────────────────────────
  {
    slug: 'northwestern-ta',
    company: 'Northwestern University',
    role: 'Undergraduate Teaching Assistant',
    location: 'Evanston, IL',
    period: '2022 – 2023',
    description:
      'TA for introductory CS and data structures courses across two consecutive academic quarters.',
    highlights: [
      'Held twice-weekly office hours supporting 80+ students in Python, Java, and algorithm fundamentals',
      'Developed three new lab exercises covering graph traversal (BFS/DFS), dynamic programming, and binary search trees',
      'Graded weekly assignments and exams; wrote detailed rubrics with the instructional team',
      'Received end-of-quarter student feedback rating of 4.8/5.0; invited to return for a second quarter',
    ],
    technologies: ['Python', 'Java', 'Git'],
    type: 'research',
    voxelZone: 'experience-office',
  },
];
