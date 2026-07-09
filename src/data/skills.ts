import type { SkillGroup } from '@/lib/types';

/**
 * Skills grouped into four tracks.
 *
 * proficiency:
 *   'familiar'   — used in projects / coursework; comfortable but not daily
 *   'proficient' — used regularly; can work independently without much reference
 *   'expert'     — deep experience; know the internals, have debugged hard problems
 *
 * color maps to the tailwind color tokens defined in tailwind.config.ts:
 *   'accent' (#00d4ff cyan), 'violet' (#a855f7), 'amber' (#f59e0b), 'emerald' (green)
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'full-stack',
    name: 'Full-Stack',
    description: 'Web frameworks, UI, APIs, and the glue between them',
    color: 'accent',
    skills: [
      { name: 'TypeScript', proficiency: 'expert' },
      { name: 'React', proficiency: 'expert' },
      { name: 'Next.js', proficiency: 'proficient' },
      { name: 'Python', proficiency: 'expert' },
      { name: 'FastAPI', proficiency: 'proficient' },
      { name: 'Node.js', proficiency: 'proficient' },
      { name: 'REST API Design', proficiency: 'proficient' },
      { name: 'PostgreSQL', proficiency: 'proficient' },
      { name: 'Redis', proficiency: 'proficient' },
      { name: 'Docker', proficiency: 'proficient' },
      { name: 'Git / GitHub', proficiency: 'expert' },
    ],
  },
  {
    id: 'data-backend',
    name: 'Data & Backend',
    description: 'Pipelines, distributed systems, and data infrastructure',
    color: 'violet',
    skills: [
      { name: 'Kafka', proficiency: 'proficient' },
      { name: 'AWS (ECS, RDS, S3)', proficiency: 'proficient' },
      { name: 'SQL', proficiency: 'expert' },
      { name: 'Pandas', proficiency: 'proficient' },
      { name: 'NumPy', proficiency: 'proficient' },
      { name: 'Spark', proficiency: 'familiar' },
      { name: 'GitHub Actions / CI', proficiency: 'proficient' },
      { name: 'Linux / Bash', proficiency: 'proficient' },
      { name: 'Go', proficiency: 'familiar' },
    ],
  },
  {
    id: 'ml-research',
    name: 'ML & Research',
    description: 'Models, training infrastructure, and computer vision',
    color: 'amber',
    skills: [
      { name: 'PyTorch', proficiency: 'expert' },
      { name: 'Scikit-learn', proficiency: 'proficient' },
      { name: 'XGBoost', proficiency: 'proficient' },
      { name: 'HuggingFace Transformers', proficiency: 'proficient' },
      { name: 'SAM (Segment Anything)', proficiency: 'proficient' },
      { name: 'Mamba / VisionMamba', proficiency: 'proficient' },
      { name: 'CUDA', proficiency: 'familiar' },
      { name: 'CoreML', proficiency: 'proficient' },
      { name: 'Weights & Biases', proficiency: 'proficient' },
      { name: 'NetworkX / Node2Vec', proficiency: 'proficient' },
    ],
  },
  {
    id: 'mobile-product',
    name: 'Mobile & Product',
    description: 'Native iOS, on-device ML, and shipping to real users',
    color: 'emerald',
    skills: [
      { name: 'Swift', proficiency: 'proficient' },
      { name: 'SwiftUI', proficiency: 'proficient' },
      { name: 'Xcode', proficiency: 'proficient' },
      { name: 'WidgetKit', proficiency: 'familiar' },
      { name: 'Firebase', proficiency: 'proficient' },
      { name: 'React Native', proficiency: 'familiar' },
    ],
  },
];
