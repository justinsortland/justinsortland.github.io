import type { Project } from '@/lib/types';

export const projects: Project[] = [
  // ─── Flagship ────────────────────────────────────────────────────────────────
  {
    slug: 'counterparty',
    title: 'Counterparty',
    description:
      'AI-assisted permit review workflow for residential construction. Users create permit submissions, attach labeled document artifacts, request structured Claude reviews, track issue severity and missing documents, compare review revisions, and generate printable reports.',
    type: 'engineering',
    featured: true,
    priority: 1,
    voxelZone: 'counterparty-tower',
    technologies: [
      'Next.js',
      'TypeScript',
      'Prisma',
      'Supabase Auth',
      'Supabase Storage',
      'Claude / Anthropic',
      'PostgreSQL',
      'Tailwind CSS',
    ],
    tags: ['Applied AI', 'Full-Stack', 'Document Review', 'Workflow'],
    highlights: [
      'Claude reviews project details, reviewer context, and labeled artifact metadata to return structured findings, severity ratings, missing documents, and verdicts.',
      'Revision history tracks how findings change across review requests, with a compare view for resolved, persistent, and newly introduced issues.',
      'Printable reports turn each review revision into a clean, shareable summary for discussion or follow-up.',
    ],
    github: undefined,
    date: '2026-01-01',
    dateDisplay: '2026',
    problem:
      'Residential permit submissions are document-heavy and opaque. Homeowners and small contractors often cannot sanity-check a submission before it reaches a reviewer. On the reviewer side, findings are applied inconsistently with no shared rubric, no audit trail, and no structured way to see how a submission changed between review cycles.',
    approach:
      'Users create a permit submission, attach labeled document artifacts, and request a Claude review. The review prompt includes submission fields, labeled artifact metadata, a reviewer profile, and document coverage. Claude returns structured JSON with a verdict, summary, issues by severity, and missing documents. Reviews are persisted as snapshots. A compare view tracks how findings change across revisions. A printable report summarizes each review revision.',
    results:
      'Structured reviews with severity ratings, missing document tracking, and full revision history. A compare view surfaces resolved, persistent, and newly introduced issues across revisions. Printable reports make each review revision shareable in one click.',
    content: `## Product Walkthrough

The seeded demo includes a complete permit review flow for 1847 Castro St, a sample ADU submission:

- Dashboard with submissions, status, and recent review activity
- Submission detail showing labeled artifact list and review history
- Compare view for two review revisions, with resolved, persistent, and newly introduced issues
- Printable report for a completed review revision
- Review templates for common permit types

Screenshots and a full walkthrough are in the demo video linked below.

## Technical Implementation

\`\`\`
Submission fields + artifact metadata
        │
   Next.js server actions
        │
   Review profile + document coverage
        │
   Claude structured JSON review
   ├── Verdict
   ├── Summary
   ├── Issues (severity: critical / major / minor)
   └── Missing documents
        │
   Prisma transaction to Supabase Postgres
        │
   Dashboard, detail, compare, and report views
\`\`\`

**Stack**

\`Next.js App Router\` \`TypeScript\` \`Prisma\` \`Supabase Auth\` \`Supabase Storage\` \`Anthropic Claude\` \`PostgreSQL\` \`Tailwind CSS\`

The review flow does not extract text from uploaded files or perform OCR.

Labeled artifact metadata (document type, filename, and reviewer-supplied context), submission fields, and a reviewer profile are assembled into a structured prompt.

Claude returns JSON with a verdict, summary, issues with severity ratings (critical, major, minor), and a list of missing or incomplete documents.

Reviews are persisted as snapshots so past revisions remain immutable and comparable regardless of how the submission changes afterward.

## Hard Parts

### Structured output and validation

Getting Claude to return consistent JSON across diverse submissions required careful prompt engineering and server-side validation of the response shape before any database write.

### Stable revision comparison

The compare view matches issues across revisions even when Claude phrases the same finding differently between requests. The current approach uses field-level matching on structured fields rather than string diffing.

### Immutable revision snapshots

Each review captures a snapshot of all inputs at request time, so compare and report views always reflect what was actually reviewed, not the current state of the submission.

### Document coverage without text extraction

Document coverage is inferred from labeled artifact metadata, not file contents. This keeps the implementation honest about what Claude actually sees while still letting the prompt convey which document types are present or missing.

### Full-stack deployment coordination

Wiring together Supabase Auth, Supabase Storage, Prisma migrations, Vercel deploys, and Anthropic API keys across local and production environments required careful environment management and a clear seed script to establish demo state.

## What I Would Improve Next

- OCR and document text extraction, so Claude can review actual file content rather than metadata
- A jurisdiction or building code database to ground issue findings in specific regulations
- Team workspaces and reviewer assignment for multi-reviewer flows
- Rate limiting or invite gating before opening a public demo
- Stronger response validation and retry handling for Claude API calls

## Links

- **Demo video:** [Watch on YouTube](https://youtu.be/-JJuIGjXw1Y)
- **GitHub:** source code, README, and technical writeup
- **Live demo:** available on request
`,
  },

  // ─── Second Project ───────────────────────────────────────────────────────────
  {
    slug: 'spactivity',
    title: 'SPACtivity: Gym Traffic Predictor',
    description:
      'Full-stack mobile data product that visualizes gym occupancy patterns and predicts traffic using time-series models, helping users plan visits around peak hours.',
    type: 'engineering',
    featured: true,
    priority: 2,
    voxelZone: 'spactivity-gym',
    technologies: [
      'Flutter',
      'Dart',
      'AWS Lambda',
      'AWS S3',
      'AWS RDS',
      'PostgreSQL',
      'REST APIs',
      'Python',
    ],
    tags: ['Mobile', 'Full-Stack', 'Data', 'Time-Series'],
    highlights: [
      'Time-series occupancy model trained on historical gym entry data, served via AWS Lambda REST API',
      'Flutter mobile app with interactive traffic visualization showing predicted vs. historical occupancy across the day',
      'AWS RDS (PostgreSQL) stores entry data; Lambda serves predictions on-demand; S3 hosts static model artifacts',
    ],
    github: undefined,
    date: '2023-06-01',
    dateDisplay: 'Jun 2023 – Sep 2024',
    problem:
      'Gym-goers at Northwestern\'s SPAC facility had no way to know how crowded it would be before arriving. Without occupancy data, planning a visit around peak hours required guesswork.',
    approach:
      'Collected gym entry data and stored it in AWS RDS (PostgreSQL). Built a Python time-series model to predict occupancy by hour-of-day and day-of-week, packaged it as a Lambda function, and exposed it via REST API. Built a Flutter mobile app that fetches predictions and visualizes traffic curves.',
    results:
      'Users see predicted occupancy by time of day, compare against historical patterns, and pick when to go.',
    content: `## Overview

SPACtivity is a full-stack mobile app that predicts and visualizes gym traffic at Northwestern's SPAC facility, letting users pick a time to go before it gets crowded.

## Architecture

\`\`\`
Entry Data (historical)
        │
   AWS RDS (PostgreSQL)
        │
   Python Model (time-series)
        │
   AWS Lambda → REST API
        │
   Flutter Mobile App
   ├── Traffic visualization (chart)
   └── Prediction display (by time slot)
        │
   AWS S3 (model artifacts)
\`\`\`

## Model

Time-series occupancy model trained on historical entry counts, with features:

- Hour of day (0–23)
- Day of week (0=Mon … 6=Sun)
- Term week number
- Academic calendar flags (finals week, break week)

Predictions returned as occupancy level per hour slot.

## Mobile App (Flutter)

- Interactive chart showing predicted vs. historical occupancy across the day
- Hour-by-hour breakdown with color-coded traffic levels
- Fetches predictions on-demand from Lambda REST API
- Dart/Flutter with clean, minimal UI

## Infrastructure

- **AWS RDS** — PostgreSQL database storing historical entry records
- **AWS Lambda** — serverless prediction endpoint, scales to zero between requests
- **AWS S3** — stores trained model artifacts and static assets
- **REST API** — Flutter client fetches predictions via HTTP
`,
  },

  // ─── ML Research ─────────────────────────────────────────────────────────────
  {
    slug: 'sam-visionmamba',
    title: 'SAM + VisionMamba: Sharpness-Aware Training',
    description:
      'ML research integrating Sharpness-Aware Minimization (SAM optimizer) into the VisionMamba state-space architecture, with ablations across MNIST, CIFAR-10, and CIFAR-100.',
    type: 'research',
    featured: true,
    priority: 3,
    voxelZone: 'ml-lab',
    technologies: [
      'Python',
      'PyTorch',
      'CUDA',
      'VisionMamba',
      'Mamba',
      'CIFAR-100',
      'HuggingFace',
    ],
    tags: ['ML Research', 'Optimization', 'State Space Models', 'Vision'],
    highlights: [
      'Integrated the SAM optimizer (Sharpness-Aware Minimization) into the VisionMamba training pipeline as a drop-in replacement for AdamW',
      'Ablations across MNIST, CIFAR-10, and CIFAR-100 isolating the effect of flat-minima bias on state-space model generalization',
      'CIFAR-100 Top-1 accuracy improved from 71.36% to 75.13% with SAM training vs. baseline AdamW',
    ],
    github: undefined,
    paper: undefined,
    date: '2024-10-01',
    dateDisplay: 'Oct 2024 – Dec 2024',
    problem:
      'VisionMamba state-space models are less studied than Vision Transformers. It is not clear whether modern optimization strategies like Sharpness-Aware Minimization, which improve ViT generalization, transfer to SSM-based architectures.',
    approach:
      'Implemented the SAM optimizer (dual forward-backward perturbation step) within the VisionMamba training loop. Ran controlled ablations on MNIST, CIFAR-10, and CIFAR-100 with matched hyperparameters, comparing SAM vs. AdamW baseline for each dataset and measuring Top-1 accuracy.',
    results:
      'CIFAR-100 Top-1 improved from 71.36% to 75.13% with SAM training vs. AdamW baseline. Results suggest flat-minima optimization meaningfully improves generalization in state-space vision models.',
    content: `## Overview

This project studies whether Sharpness-Aware Minimization (SAM) — an optimizer that explicitly seeks flat loss minima — improves generalization in VisionMamba, a state-space model (SSM) architecture for vision tasks.

## Background

**VisionMamba** applies selective state-space models (Mamba) to image patches, replacing attention with a linear-complexity recurrent scan. It generalizes well but has been less studied than Vision Transformers with respect to optimization strategy.

**SAM optimizer** adds a perturbation step that finds weights lying in flat regions of the loss landscape, which tend to generalize better. It has been shown to improve ViT performance but its effect on SSM-based models is understudied.

## Method

SAM adds a two-step gradient update:

\`\`\`
# Step 1: compute perturbation
ε̂ = ρ · ∇L(w) / ‖∇L(w)‖

# Step 2: gradient at perturbed weights
g = ∇L(w + ε̂)

# Step 3: update with base optimizer
w ← w − η · g
\`\`\`

Integrated into VisionMamba as a wrapper around the optimizer step, with ρ=0.05 (perturbation radius).

## Ablations

Controlled experiments across three benchmarks with matched hyperparameters (batch size, lr, epochs):

| Dataset | AdamW (baseline) | SAM | Δ Top-1 |
|---|---|---|---|
| MNIST | — | — | — |
| CIFAR-10 | — | — | — |
| CIFAR-100 | 71.36% | 75.13% | **+3.77%** |

CIFAR-100 showed the clearest improvement, consistent with SAM's known benefit on more complex distributions.

## Conclusion

SAM training provides meaningful generalization improvement for VisionMamba on CIFAR-100 (+3.77% Top-1). This suggests flat-minima optimization is not ViT-specific and transfers to SSM-based vision architectures.
`,
  },

  // ─── Secondary ───────────────────────────────────────────────────────────────
  {
    slug: 'friendship-similarity',
    title: 'Friendship Similarity Analyzer',
    description:
      'Applied-AI tool that quantifies structural social similarity between Reddit users by combining subreddit overlap analysis with OpenAI embedding distance.',
    type: 'engineering',
    featured: false,
    priority: 4,
    voxelZone: 'ml-lab',
    technologies: ['Python', 'Flask', 'React', 'Reddit API', 'OpenAI API', 'NetworkX'],
    tags: ['Applied AI', 'Social Networks', 'NLP', 'Embeddings'],
    highlights: [
      'Fetches user activity via the Reddit API and computes subreddit overlap with Jaccard normalization to avoid raw-count bias',
      'Combines structural overlap with OpenAI embedding cosine similarity on user comment history for a blended similarity score',
      'Flask REST API + React frontend with ranked similarity output',
    ],
    github: undefined,
    date: '2024-09-01',
    dateDisplay: 'Sep 2024 – Dec 2024',
    problem:
      'Raw mutual-subreddit count is a poor similarity signal: it favors high-activity users and ignores the semantic content of what users actually write.',
    approach:
      'Pulled user activity via the Reddit API, computed degree-normalized Jaccard overlap on subreddit membership, and separately embedded each user\'s recent comment history with the OpenAI embeddings API. Blended both signals into a combined score. Flask serves the backend; React renders ranked results.',
    results:
      'Combined score outperforms raw mutual-subreddit count as a similarity heuristic, particularly for users with asymmetric activity levels, by accounting for semantic content alongside structural overlap.',
    content: `## Overview

A tool that computes social similarity between two Reddit users using both structural network overlap and semantic content similarity.

## Why Not Just Count Shared Subreddits?

Shared subreddit count is biased by activity level. A user subscribed to 500 subreddits sharing 50 with another looks the same as two users sharing 50 out of 60 — but the latter are far more structurally similar. Raw counts also ignore what users actually post about.

## Two Similarity Signals

### 1. Jaccard Subreddit Overlap

For users \`u\` and \`v\` with subreddit sets \`S(u)\` and \`S(v)\`:

\`\`\`
jaccard(u, v) = |S(u) ∩ S(v)| / |S(u) ∪ S(v)|
\`\`\`

Degree-normalized and bounded in [0, 1]. Pulled via Reddit API.

### 2. OpenAI Embedding Similarity

Recent comment history for each user is embedded via the OpenAI embeddings API, then compared with cosine similarity:

\`\`\`python
embedding_u = openai.embeddings.create(input=comments_u, model="text-embedding-3-small")
embedding_v = openai.embeddings.create(input=comments_v, model="text-embedding-3-small")
sim_embed = cosine_similarity(embedding_u, embedding_v)
\`\`\`

### Combined Score

\`\`\`
similarity(u, v) = 0.5 · jaccard(u, v) + 0.5 · sim_embed(u, v)
\`\`\`

## Stack

- **Reddit API** — user subreddit membership and comment history
- **OpenAI API** — text-embedding-3-small for comment embeddings
- **Flask** — REST backend serving similarity scores
- **React** — frontend for entering usernames and displaying ranked results
`,
  },
];
