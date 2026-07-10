import type { Project } from '@/lib/types';

export const projects: Project[] = [
  // ─── Flagship ────────────────────────────────────────────────────────────────
  {
    slug: 'counterparty',
    title: 'Counterparty',
    description:
      'Full-stack applied-AI product for permit and document review. Reviewers upload documents, Claude classifies every issue by severity and generates structured feedback, and the app tracks revision history across submissions with side-by-side comparison and printable reports.',
    type: 'engineering',
    featured: true,
    priority: 1,
    voxelZone: 'counterparty-tower',
    technologies: [
      'Next.js',
      'TypeScript',
      'Prisma',
      'Supabase',
      'Claude / Anthropic',
      'PostgreSQL',
      'Tailwind CSS',
    ],
    tags: ['Applied AI', 'Full-Stack', 'Document Review', 'Workflow'],
    highlights: [
      'Claude API extracts every issue from an uploaded document and classifies it as critical, major, or minor — giving reviewers a structured checklist instead of unstructured annotations',
      'Side-by-side comparison view shows the original document alongside AI-generated feedback; revision history tracks how each issue is addressed across resubmissions',
      'Printable reports render the full severity-graded review as a clean, shareable document — one click from the Next.js UI',
    ],
    github: undefined,
    date: '2024-06-01',
    problem:
      'Permit and document review is manual and inconsistent — reviewers work from unstructured PDFs with no shared rubric, no audit trail, and no way to see how a document changed between resubmissions.',
    results:
      'Structured, severity-graded reviews with full revision history, side-by-side comparison, and exportable reports. Turns an unstructured annotation process into an auditable, repeatable workflow.',
    content: `## Overview

Counterparty is a full-stack applied-AI platform for permit and document review. Reviewers upload documents, the app passes them through the Claude API for structured analysis, and results are organized by issue severity with full revision history.

## Problem

Manual document review is inconsistent — different reviewers apply different standards, there is no shared rubric, and tracking changes across revisions requires comparing PDFs by hand. There is no audit trail.

## Architecture

\`\`\`
Upload (PDF / text)
        │
   Next.js API Route
        │
   Claude API (Anthropic)
   ├── Issue extraction
   ├── Severity classification (critical / major / minor)
   └── Structured JSON response
        │
   Prisma ORM → Supabase (PostgreSQL)
   ├── Document versions
   ├── Issue records
   └── Revision history
        │
   Next.js Frontend
   ├── Side-by-side comparison view
   ├── Revision timeline
   └── Printable report export
\`\`\`

## Key Engineering Decisions

- **Claude API for extraction** — structured output prompting produces consistent severity labels without fine-tuning
- **Prisma + Supabase** — type-safe ORM with hosted Postgres; revision history is modeled as a linked list of document snapshots
- **Side-by-side UI** — reviewers see original document and AI feedback in adjacent panels with synchronized scrolling
- **Printable reports** — CSS print stylesheet renders the review as a clean, shareable document

## Features

- Issue severity classification: critical / major / minor
- Full revision history with diff tracking across submissions
- Side-by-side document and feedback comparison
- Printable, exportable reports
`,
  },

  // ─── Second Project ───────────────────────────────────────────────────────────
  {
    slug: 'spactivity',
    title: 'SPACtivity — Gym Traffic Predictor',
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
    date: '2023-11-01',
    problem:
      'Gym-goers at Northwestern\'s SPAC facility had no way to know how crowded it would be before arriving. Without occupancy data, planning a visit around peak hours required guesswork.',
    approach:
      'Collected gym entry data and stored it in AWS RDS (PostgreSQL). Built a Python time-series model to predict occupancy by hour-of-day and day-of-week, packaged it as a Lambda function, and exposed it via REST API. Built a Flutter mobile app that fetches predictions and visualizes traffic curves.',
    results:
      'Users can view predicted occupancy curves by time of day, compare against historical patterns, and choose optimal visit windows based on the model output.',
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
    title: 'SAM + VisionMamba — Sharpness-Aware Training',
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
    date: '2024-03-01',
    problem:
      'VisionMamba state-space models are less studied than Vision Transformers. It is not clear whether modern optimization strategies like Sharpness-Aware Minimization, which improve ViT generalization, transfer to SSM-based architectures.',
    approach:
      'Implemented the SAM optimizer (dual forward-backward perturbation step) within the VisionMamba training loop. Ran controlled ablations on MNIST, CIFAR-10, and CIFAR-100 with matched hyperparameters — comparing SAM vs. AdamW baseline for each dataset and measuring Top-1 accuracy.',
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
    date: '2023-05-01',
    problem:
      'Raw mutual-subreddit count is a poor similarity signal — it heavily favors high-activity users and ignores the semantic content of what users actually write.',
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
