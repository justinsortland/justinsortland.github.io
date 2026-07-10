export interface PanelSection {
  heading?: string;
  body?: string;
  bullets?: string[];
  tags?: string[];
}

export interface BuildingPanel {
  id: string;
  title: string;
  subtitle: string;
  accentColor: string;
  sections: PanelSection[];
  ctaLabel: string;
  ctaTarget: string; // CSS selector, e.g. "#projects"
}

export const PANEL_DATA: Record<string, BuildingPanel> = {
  'counterparty-tower': {
    id: 'counterparty-tower',
    title: 'Counterparty',
    subtitle: 'Open-Source · Projects',
    accentColor: '#00d4ff',
    sections: [
      {
        heading: 'Overview',
        body: 'Counterparty is a full-stack web application that lets users browse, track, and compare MLB player statistics across every major batting and pitching category — built from scratch to handle real-world data at scale.',
      },
      {
        heading: 'Tech Stack',
        tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'REST API', 'MLB Stats API'],
      },
      {
        heading: 'Highlights',
        bullets: [
          'Aggregates & normalizes data from the official MLB Stats API',
          'Side-by-side player comparison with responsive stat tables',
          'Efficient PostgreSQL schema with indexed queries for fast lookups',
          'Fully typed frontend with React + TypeScript',
        ],
      },
    ],
    ctaLabel: 'View all projects →',
    ctaTarget: '#projects',
  },

  'spactivity-gym': {
    id: 'spactivity-gym',
    title: 'SPACtivity',
    subtitle: 'ML · Productivity · Projects',
    accentColor: '#a855f7',
    sections: [
      {
        heading: 'Overview',
        body: 'SPACtivity predicts gym traffic at Northwestern\'s Blomquist Recreation Center so students can plan their workouts around crowd levels — combining a live data pipeline, ML forecasting, and a polished mobile UI.',
      },
      {
        heading: 'Tech Stack',
        tags: ['React Native', 'Expo', 'Python', 'scikit-learn', 'Firebase', 'FastAPI'],
      },
      {
        heading: 'Highlights',
        bullets: [
          'Automated scraper collects real-time occupancy data from the rec center portal',
          'Random Forest model trained on historical patterns, day-of-week, and time-of-day features',
          'Push notifications alert users when their favorite equipment area goes below a threshold',
          'Cross-platform iOS & Android app via React Native + Expo',
        ],
      },
    ],
    ctaLabel: 'View all projects →',
    ctaTarget: '#projects',
  },

  'ml-lab': {
    id: 'ml-lab',
    title: 'ML Research Lab',
    subtitle: 'Computer Vision · Research · Projects',
    accentColor: '#f59e0b',
    sections: [
      {
        heading: 'SAM + VisionMamba',
        body: 'Integrated Meta\'s Segment Anything Model (SAM) with VisionMamba\'s state-space architecture to improve zero-shot segmentation on satellite and medical imagery — reducing inference latency by 38% over the SAM baseline.',
      },
      {
        heading: 'Tech Stack',
        tags: ['PyTorch', 'SAM', 'VisionMamba', 'CUDA', 'Python', 'Hugging Face'],
      },
      {
        heading: 'Research Contributions',
        bullets: [
          'Novel adapter layer fusing SAM\'s prompt encoder with Mamba\'s selective scan blocks',
          'Benchmarked on COCO, ADE20K, and custom aerial imagery datasets',
          '38% latency reduction vs. vanilla SAM at equivalent mIoU',
          'Conducted under Northwestern CS department supervision',
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
        heading: 'Northern Trust — SWE',
        body: 'Full-time software engineer on the Investment Risk Technology team. Built and maintained internal risk calculation pipelines processing billions in daily AUM.',
        bullets: [
          'Developed Python microservices for real-time portfolio risk analytics',
          'Migrated legacy batch jobs to event-driven architecture (Kafka)',
          'Reduced P&L calculation runtime by 42% through query optimization',
        ],
      },
      {
        heading: 'Northwestern — Research Assistant',
        body: 'RA in the Intelligent Information Laboratory under Prof. Doug Downey.',
        bullets: [
          'SAM + VisionMamba segmentation research (see ML Lab)',
          'Maintained compute cluster scripts for distributed GPU training',
        ],
      },
      {
        heading: 'Northern Trust — SWE Intern',
        body: 'Summer internship building internal tooling for the Asset Servicing division.',
        bullets: [
          'Built a React dashboard surfacing custody account reconciliation diffs',
          'Automated daily report generation, saving ~3 hours of analyst time per day',
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
          'CS 343 — Operating Systems',
          'CS 345 — Distributed Systems',
          'CS 340 — Computer Networking',
        ],
      },
      {
        heading: 'Theory & Algorithms',
        bullets: [
          'CS 336 — Analysis of Algorithms',
          'IEMS 315 — Stochastic Processes',
        ],
      },
      {
        heading: 'Machine Learning',
        bullets: [
          'CS 349 — Machine Learning',
          'CS 496 — Deep Learning',
          'CS 395 — Probabilistic Graphical Models',
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
        body: "I'm actively looking for full-time SWE and ML engineering roles starting Summer 2025. Whether it's about an opportunity, a project, or just to chat — I'd love to hear from you.",
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
