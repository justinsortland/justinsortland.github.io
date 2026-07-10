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
      'Building internal data tools and Snowflake infrastructure for the Asset Management technology group.',
    highlights: [
      'Built two Snowflake Streamlit apps — one for client onboarding workflows and one for managing data-refresh settings',
      'Added input validation and quality checks to prevent bad data from being saved across both apps',
      'Implemented recent-activity views and 300-second query result caching to speed up troubleshooting',
    ],
    technologies: [
      'Python',
      'Snowflake',
      'Streamlit',
      'SQL',
    ],
    type: 'full-time',
    voxelZone: 'experience-office',
  },

  // ─── Research ─────────────────────────────────────────────────────────────────
  {
    slug: 'northwestern-ra',
    company: 'Northwestern University',
    role: 'Research Assistant',
    location: 'Evanston, IL',
    period: '2023 – 2024',
    description:
      'ML research studying the effect of Sharpness-Aware Minimization on state-space vision models.',
    highlights: [
      'Integrated Sharpness-Aware Minimization (SAM optimizer) into the VisionMamba training pipeline',
      'Ran controlled ablations on MNIST, CIFAR-10, and CIFAR-100 comparing SAM vs. AdamW baseline',
      'Improved CIFAR-100 Top-1 accuracy from 71.36% to 75.13% with SAM training',
    ],
    technologies: [
      'Python',
      'PyTorch',
      'CUDA',
      'VisionMamba',
      'CIFAR-100',
    ],
    type: 'research',
    voxelZone: 'experience-office',
  },

  // ─── Internship ───────────────────────────────────────────────────────────────
  {
    slug: 'northern-trust-intern',
    company: 'Northern Trust',
    role: 'Software Engineering Intern',
    location: 'Chicago, IL',
    period: 'Summer 2023',
    description:
      'Interned on the data engineering team, building notification infrastructure and Snowflake data pipelines.',
    highlights: [
      'Built a Python notification framework for alerting on-call teams during Snowflake outage events',
      'Wrote Airflow DAGs for automated data sanitization and publishing workflows',
      'Contributed to SQL and Snowflake database infrastructure used across the team',
    ],
    technologies: [
      'Python',
      'Snowflake',
      'Apache Airflow',
      'SQL',
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
      'TA for undergraduate CS courses, supporting students through office hours and written channels.',
    highlights: [
      'Held weekly office hours and answered questions on Piazza for enrolled students',
      'Reviewed student code and gave feedback on correctness, style, and design',
      'Helped students work through cloud infrastructure and service design questions',
    ],
    technologies: ['Python', 'Git'],
    type: 'research',
    voxelZone: 'experience-office',
  },
];
