import type { SkillGroup } from '@/lib/types';

export const skillGroups: SkillGroup[] = [
  {
    id: 'full-stack',
    name: 'Full-Stack',
    description: 'Web frameworks, UI libraries, and API design',
    color: 'accent',
    skills: [
      { name: 'TypeScript', proficiency: 'proficient' },
      { name: 'JavaScript', proficiency: 'proficient' },
      { name: 'React / Next.js', proficiency: 'proficient' },
      { name: 'Node.js', proficiency: 'proficient' },
      { name: 'Flask', proficiency: 'proficient' },
      { name: 'REST APIs', proficiency: 'proficient' },
    ],
  },
  {
    id: 'data-backend',
    name: 'Data / Backend',
    description: 'Databases, cloud infrastructure, and data pipelines',
    color: 'violet',
    skills: [
      { name: 'PostgreSQL', proficiency: 'proficient' },
      { name: 'MySQL', proficiency: 'proficient' },
      { name: 'Snowflake', proficiency: 'proficient' },
      { name: 'AWS Lambda', proficiency: 'proficient' },
      { name: 'AWS RDS', proficiency: 'proficient' },
      { name: 'AWS S3', proficiency: 'proficient' },
      { name: 'Airflow', proficiency: 'proficient' },
    ],
  },
  {
    id: 'ml-research',
    name: 'ML / Research',
    description: 'Model training, experimentation, and data analysis',
    color: 'amber',
    skills: [
      { name: 'Python', proficiency: 'proficient' },
      { name: 'PyTorch', proficiency: 'proficient' },
      { name: 'scikit-learn', proficiency: 'proficient' },
      { name: 'NumPy', proficiency: 'proficient' },
      { name: 'pandas', proficiency: 'proficient' },
      { name: 'Matplotlib', proficiency: 'proficient' },
    ],
  },
  {
    id: 'mobile-product',
    name: 'Mobile / Product',
    description: 'Cross-platform mobile development and tooling',
    color: 'emerald',
    skills: [
      { name: 'Flutter', proficiency: 'proficient' },
      { name: 'Dart', proficiency: 'proficient' },
      { name: 'Firebase', proficiency: 'proficient' },
      { name: 'Git / GitHub', proficiency: 'proficient' },
    ],
  },
];
