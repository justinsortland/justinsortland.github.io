export interface PanelSection {
  heading?: string;
  /** Secondary label shown below heading, e.g. a role name */
  subheading?: string;
  /** Date or range shown below heading/subheading, e.g. "Jul 2025 – Mar 2026" */
  date?: string;
  body?: string;
  bullets?: string[];
  tags?: string[];
}

export interface BuildingPanel {
  id: string;
  title: string;
  subtitle: string;
  /** Top-level date or range for project panels, e.g. "2026" or "Jun 2023 – Sep 2024" */
  date?: string;
  accentColor: string;
  sections: PanelSection[];
  ctaLabel: string;
  ctaTarget: string; // CSS selector, e.g. "#projects"
}

export const PANEL_DATA: Record<string, BuildingPanel> = {
  'counterparty-tower': {
    id: 'counterparty-tower',
    title: 'Counterparty',
    subtitle: 'Applied-AI Document Review',
    date: '2026',
    accentColor: '#00d4ff',
    sections: [
      {
        heading: 'Overview',
        body: 'Full-stack applied-AI platform for permit and document review. Reviewers upload documents, Claude classifies every issue by severity, and the app tracks revision history across submissions with side-by-side comparison and printable reports.',
      },
      {
        heading: 'Tech Stack',
        tags: ['Next.js', 'TypeScript', 'Prisma', 'Supabase', 'Claude / Anthropic', 'PostgreSQL', 'Tailwind CSS'],
      },
      {
        heading: 'Highlights',
        bullets: [
          'Claude API extracts every issue and classifies it as critical, major, or minor — structured checklist instead of unstructured annotations',
          'Side-by-side view with synchronized scroll; revision history tracks how each issue changes across resubmissions',
          'Printable reports render the full severity-graded review as a clean, shareable document in one click',
        ],
      },
    ],
    ctaLabel: 'View all projects →',
    ctaTarget: '#projects',
  },

  'spactivity-gym': {
    id: 'spactivity-gym',
    title: 'SPACtivity',
    subtitle: 'Gym Traffic Predictor',
    date: 'Jun 2023 – Sep 2024',
    accentColor: '#a855f7',
    sections: [
      {
        heading: 'Overview',
        body: "Full-stack mobile app that predicts and visualizes gym traffic at Northwestern's SPAC facility, letting users pick a time to go before it gets crowded.",
      },
      {
        heading: 'Tech Stack',
        tags: ['Flutter', 'Dart', 'Python', 'AWS Lambda', 'AWS RDS', 'AWS S3', 'PostgreSQL'],
      },
      {
        heading: 'Highlights',
        bullets: [
          'Time-series occupancy model trained on historical gym entry data, served via AWS Lambda REST API',
          'Flutter mobile app with interactive traffic visualization showing predicted vs. historical occupancy across the day',
          'AWS RDS (PostgreSQL) stores entry data; Lambda serves predictions on-demand; S3 hosts model artifacts',
        ],
      },
    ],
    ctaLabel: 'View all projects →',
    ctaTarget: '#projects',
  },

  'ml-lab': {
    id: 'ml-lab',
    title: 'ML Research Lab',
    subtitle: 'SAM Optimization Research',
    date: 'Oct 2024 – Dec 2024',
    accentColor: '#f59e0b',
    sections: [
      {
        heading: 'SAM + VisionMamba',
        body: 'Studied whether Sharpness-Aware Minimization (SAM optimizer) improves generalization in VisionMamba, a state-space model (SSM) architecture for vision tasks, running controlled ablations across MNIST, CIFAR-10, and CIFAR-100.',
      },
      {
        heading: 'Tech Stack',
        tags: ['Python', 'PyTorch', 'CUDA', 'VisionMamba', 'Mamba', 'CIFAR-100', 'HuggingFace'],
      },
      {
        heading: 'Research Contributions',
        bullets: [
          'Integrated the SAM optimizer (dual forward-backward perturbation) into the VisionMamba training pipeline as a drop-in for AdamW',
          'Controlled ablations on MNIST, CIFAR-10, and CIFAR-100 with matched hyperparameters',
          'CIFAR-100 Top-1 improved from 71.36% to 75.13% (+3.77% over AdamW baseline)',
        ],
      },
    ],
    ctaLabel: 'View all projects →',
    ctaTarget: '#projects',
  },

  'experience-office': {
    id: 'experience-office',
    title: 'Experience',
    subtitle: 'Work History',
    accentColor: '#3b82f6',
    sections: [
      {
        heading: 'Northern Trust',
        subheading: 'Software Engineer',
        date: 'Jul 2025 – Mar 2026',
        body: 'Full-time software engineer building internal data tools and Snowflake infrastructure for the Asset Management technology group.',
        bullets: [
          'Built two Snowflake Streamlit apps: client onboarding and data-refresh settings management',
          'Added input validation and quality checks to prevent bad data across both apps',
          'Implemented query result caching and recent-activity views to speed up troubleshooting',
        ],
      },
      {
        heading: 'Northwestern University',
        subheading: 'Research Assistant',
        date: 'Oct 2024 – Dec 2024',
        body: 'ML research studying the effect of Sharpness-Aware Minimization on state-space vision models.',
        bullets: [
          'Integrated SAM optimizer into the VisionMamba training pipeline',
          'CIFAR-100 Top-1 improved from 71.36% to 75.13% vs. AdamW baseline',
        ],
      },
      {
        heading: 'Northern Trust',
        subheading: 'Software Engineering Intern',
        date: 'Jun 2024 – Aug 2024',
        body: 'Data engineering internship building notification infrastructure and Snowflake pipelines.',
        bullets: [
          'Built a Python notification framework for alerting on-call teams during Snowflake outage events',
          'Wrote Airflow DAGs for automated data sanitization and publishing workflows',
        ],
      },
      {
        heading: 'Northwestern University',
        subheading: 'Teaching Assistant',
        date: 'Mar 2024 – Jun 2024',
        body: 'TA for undergraduate CS courses.',
        bullets: [
          'Held weekly office hours and answered questions on Piazza',
          'Reviewed student code and gave feedback on correctness, style, and design',
        ],
      },
    ],
    ctaLabel: 'See full experience →',
    ctaTarget: '#experience',
  },

  'classes-library': {
    id: 'classes-library',
    title: 'Classes',
    subtitle: 'Northwestern CS Curriculum',
    accentColor: '#7c3aed',
    sections: [
      {
        heading: 'Systems',
        bullets: [
          'CS 343: Operating Systems',
          'CS 345: Distributed Systems',
          'CS 340: Computer Networking',
        ],
      },
      {
        heading: 'Theory & Algorithms',
        bullets: [
          'CS 336: Analysis of Algorithms',
          'IEMS 315: Stochastic Processes',
        ],
      },
      {
        heading: 'Machine Learning',
        bullets: [
          'CS 349: Machine Learning',
          'CS 496: Deep Learning',
          'CS 395: Probabilistic Graphical Models',
        ],
      },
    ],
    ctaLabel: 'Browse all classes →',
    ctaTarget: '#classes',
  },

  'skills-workshop': {
    id: 'skills-workshop',
    title: 'Skills',
    subtitle: 'Technical Toolkit',
    accentColor: '#ea580c',
    sections: [
      {
        heading: 'Full-Stack',
        tags: ['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'REST', 'GraphQL'],
      },
      {
        heading: 'Data & Backend',
        tags: ['Python', 'FastAPI', 'Kafka', 'Redis', 'Docker', 'SQL', 'Spark'],
      },
      {
        heading: 'ML & Research',
        tags: ['PyTorch', 'scikit-learn', 'CUDA', 'Hugging Face', 'NumPy', 'Pandas'],
      },
      {
        heading: 'Mobile & Product',
        tags: ['React Native', 'Expo', 'Firebase', 'Figma', 'Git', 'CI/CD'],
      },
    ],
    ctaLabel: 'Learn more about me →',
    ctaTarget: '#intro',
  },

  'contact-portal': {
    id: 'contact-portal',
    title: 'Contact',
    subtitle: 'Get In Touch',
    accentColor: '#00e5ff',
    sections: [
      {
        heading: "Let's Connect",
        body: "I'm open to new opportunities in software engineering and ML. Whether it's about a role, a project, or just to chat, I'd love to hear from you.",
      },
      {
        heading: 'Find Me At',
        bullets: [
          'Email: justinsortland@gmail.com',
          'GitHub: github.com/justinsortland',
          'LinkedIn: linkedin.com/in/justinsortland',
        ],
      },
    ],
    ctaLabel: 'Go to contact section →',
    ctaTarget: '#contact',
  },
};
