import type { Project } from '@/lib/types';

export const projects: Project[] = [
  // ─── Flagship ────────────────────────────────────────────────────────────────
  {
    slug: 'counterparty',
    title: 'Counterparty',
    description:
      'Full-stack platform for managing counterparty credit exposure, trade lifecycle, and limit monitoring across fixed-income asset classes at a top-10 US custodian bank.',
    type: 'engineering',
    featured: true,
    priority: 1,
    voxelZone: 'counterparty-tower',
    technologies: [
      'React',
      'TypeScript',
      'Python',
      'FastAPI',
      'PostgreSQL',
      'Redis',
      'Kafka',
      'Docker',
      'AWS',
    ],
    tags: ['Finance', 'Full-Stack', 'Risk Management', 'Real-Time'],
    highlights: [
      'Event-driven Kafka pipeline ingests trade events and computes net counterparty exposure in real time, replacing an overnight batch process',
      'FastAPI backend writes exposure snapshots to Redis for sub-second reads; PostgreSQL stores the full audit trail',
      'React + TypeScript dashboard used daily by risk officers and trade desk staff',
    ],
    github: undefined,
    date: '2024-06-01',
    problem:
      'Trade desks had no real-time view of net counterparty exposure. Limit breaches were caught only after end-of-day batch runs, leaving the bank exposed for hours and requiring manual reconciliation across multiple siloed systems.',
    approach:
      'Built an event-driven exposure engine that consumes trade events from Kafka, computes running net exposures per counterparty in real time, and surfaces limit warnings through a React dashboard. A FastAPI service handles trade ingestion and exposes REST endpoints consumed by both the UI and downstream risk systems.',
    results:
      'Reduced exposure reconciliation lag from 6+ hours to under 30 seconds. Eliminated a class of manual limit-breach errors that had previously required daily oversight from a dedicated team member.',
    content: `## Overview

Counterparty is an internal risk management platform built for the Asset Management technology group at Northern Trust. It provides real-time visibility into counterparty credit exposure across the fixed-income book.

## Problem

Before this system, exposure calculation ran as an overnight batch job. A trade booked at 2 PM wouldn't surface in the risk report until the following morning's reconciliation, a gap of 12+ hours during which limits could silently be exceeded.

The existing data was spread across three separate systems with no unified API, so risk officers spent significant time manually merging spreadsheets.

## Architecture

\`\`\`
Trade Event (FIX/JSON)
        │
     Kafka Topic
        │
   Exposure Engine (Python)
   ├── Net exposure per counterparty
   ├── Limit comparison
   └── Alert emission → Redis pub/sub
        │
   FastAPI REST Layer
        │
   React Dashboard (TypeScript)
\`\`\`

## Exposure Calculation

For each counterparty \`c\`, net exposure is:

\`\`\`
E(c) = Σ MTM(trade_i) - Σ collateral_posted(c)
\`\`\`

where MTM is mark-to-market value and collateral reduces the gross figure. Limit breach fires when \`E(c) > limit(c)\`.

## Key Engineering Decisions

- **Kafka for event ingestion** — decouples the trade booking system from the exposure engine; allows replay on schema changes
- **Redis for live state** — counterparty exposure snapshots are written to Redis on each update, keeping dashboard reads sub-millisecond
- **PostgreSQL for audit log** — every exposure calculation is persisted for regulatory audit trails

## Results

| Metric | Before | After |
|---|---|---|
| Reconciliation lag | 6–12 hours | < 30 seconds |
| Manual errors per week | ~4 | 0 |
| Dashboard load time | N/A (no dashboard) | < 200 ms |
`,
  },

  // ─── Second Project ───────────────────────────────────────────────────────────
  {
    slug: 'spactivity',
    title: 'SPACtivity — Gym Traffic Predictor',
    description:
      'iOS app that predicts gym occupancy 30 minutes ahead using historical foot-traffic patterns and on-device CoreML inference, helping users avoid peak crowds.',
    type: 'engineering',
    featured: true,
    priority: 2,
    voxelZone: 'spactivity-gym',
    technologies: [
      'Swift',
      'SwiftUI',
      'CoreML',
      'Python',
      'Scikit-learn',
      'XGBoost',
      'Firebase',
      'Xcode',
    ],
    tags: ['iOS', 'Mobile', 'ML', 'Prediction'],
    highlights: [
      'XGBoost classifier trained on 6 months of hourly gym entry data with time-of-day, day-of-week, calendar, and lag features',
      'Exported to CoreML for on-device inference — no network call needed after initial model download',
      'SwiftUI home screen + WidgetKit lock-screen widget showing color-coded 3-hour occupancy outlook',
    ],
    github: undefined,
    date: '2023-11-01',
    problem:
      'Gym-goers at Northwestern\'s SPAC facility had no way to know how crowded it would be before leaving their dorm. Peak-hour arrivals wasted 20–30 minutes waiting for equipment.',
    approach:
      'Collected 6 months of entry-counter data via the facility\'s existing badge-scan system, engineered time-of-day, day-of-week, and term-week features, trained an XGBoost classifier for low/medium/high occupancy, exported to CoreML for on-device inference, and shipped a SwiftUI app with a 3-slot timeline widget.',
    results:
      'Model achieves 87% accuracy predicting occupancy tier 30 minutes out on a held-out test set. App reached 200+ active users within the first month of launch without any paid distribution.',
    content: `## Overview

SPACtivity predicts how busy Northwestern's SPAC gym will be 30 minutes in advance, so you can decide whether to head over or wait.

## Data Collection

The SPAC entry system scans student IDs at the turnstile. I obtained 6 months of anonymized hourly entry counts, giving \`~4,000\` labeled samples after aggregation.

## Feature Engineering

\`\`\`python
features = [
    'hour_of_day',       # 0–23
    'day_of_week',       # 0=Mon … 6=Sun
    'is_finals_week',    # binary
    'is_break_week',     # binary
    'term_week_number',  # 1–10
    'lag_1h',            # entries 1 hour ago
    'lag_1w',            # entries same hour last week
]
\`\`\`

Labels: \`low\` (< 40 people), \`medium\` (40–100), \`high\` (> 100).

## Model

XGBoost classifier trained with 5-fold cross-validation, exported to CoreML 7:

\`\`\`python
import coremltools as ct

model = XGBClassifier(n_estimators=200, max_depth=4, learning_rate=0.05)
model.fit(X_train, y_train)

coreml_model = ct.converters.sklearn.convert(model, features, 'occupancy')
coreml_model.save('SPACModel.mlpackage')
\`\`\`

## iOS App

- **SwiftUI** home screen with current prediction + 3-hour outlook
- **WidgetKit** lock-screen widget showing color-coded occupancy
- On-device inference: no network call needed after initial model download
- Firebase for crash reporting and anonymous usage analytics

## Results

| Metric | Value |
|---|---|
| Test accuracy | 87% |
| Avg inference time (iPhone 14) | 2 ms |
| Active users (month 1) | 200+ |
`,
  },

  // ─── ML Research ─────────────────────────────────────────────────────────────
  {
    slug: 'sam-visionmamba',
    title: 'SAM + VisionMamba — Efficient Segmentation',
    description:
      'Research replacing SAM\'s quadratic Vision Transformer image encoder with a linear-complexity VisionMamba state-space backbone, maintaining mask quality at 2× faster inference.',
    type: 'research',
    featured: true,
    priority: 3,
    voxelZone: 'ml-lab',
    technologies: [
      'Python',
      'PyTorch',
      'CUDA',
      'SAM',
      'Mamba',
      'HuggingFace',
      'COCO',
      'ADE20K',
    ],
    tags: ['Computer Vision', 'Research', 'Segmentation', 'State Space Models'],
    highlights: [
      'Replaced SAM\'s O(n²) ViT-H image encoder with a VisionMamba backbone using O(n) selective state-space scans',
      'Feature distillation loss aligns Mamba patch embeddings to a frozen ViT-H teacher for transfer of spatial priors',
      'Benchmarked on COCO + ADE20K: 2.1× throughput, 38% lower peak VRAM, −1.2% mIoU vs. baseline SAM',
    ],
    github: undefined,
    paper: undefined,
    date: '2024-03-01',
    problem:
      'SAM\'s ViT-H image encoder scales as O(n²) with image resolution, making it prohibitively slow and memory-intensive on images larger than 1024×1024. This rules out direct application to high-resolution medical and satellite imagery.',
    approach:
      'Replaced SAM\'s image encoder with a VisionMamba backbone (linear-complexity selective state-space model), keeping SAM\'s prompt encoder and mask decoder frozen. Fine-tuned the new encoder on COCO and ADE20K with a distillation loss that aligns patch-level features with the original ViT-H embeddings.',
    results:
      'Achieved within 1.2% mIoU of baseline SAM on ADE20K at 2.1× faster throughput and 38% lower peak GPU memory on 1024×1024 inputs. Submitted to Northwestern CS research showcase.',
    content: `## Overview

This project was conducted as part of my research assistantship in Northwestern's computer vision group. The goal was to make SAM's image understanding linear in sequence length without sacrificing segmentation quality.

## Background

SAM (Segment Anything Model) uses a Vision Transformer (ViT-H) as its image encoder. Self-attention in ViT is \`O(n²)\` in the number of image patches \`n\`, which becomes a bottleneck at high resolution.

**VisionMamba** applies selective state-space models (Mamba) to image patches, achieving \`O(n)\` complexity by replacing attention with a recurrent scan.

## Architecture Modification

\`\`\`
Original SAM:
  Image → [ViT-H Encoder] → patch embeddings → [Prompt Enc] → [Mask Dec] → masks

Modified:
  Image → [VisionMamba Encoder] → patch embeddings → [Prompt Enc] → [Mask Dec] → masks
                                        ↑
                             Frozen from SAM checkpoint
\`\`\`

Only the image encoder is replaced; the prompt encoder and mask decoder inherit SAM weights.

## Training

**Distillation objective:**

\`\`\`
L = L_mask + λ · L_distill

L_distill = MSE(f_mamba(x), f_vit(x).detach())
\`\`\`

where \`f_vit\` is the frozen ViT-H teacher producing patch embeddings as supervision targets.

Fine-tuned for 20 epochs on COCO + ADE20K with AdamW (lr=1e-4, weight decay=0.05).

## Results

| Model | mIoU (ADE20K) | Throughput (img/s) | Peak VRAM |
|---|---|---|---|
| SAM ViT-H | 48.3 | 11.2 | 22 GB |
| SAM + VisionMamba (ours) | 47.7 | 23.5 | 13.6 GB |

Δ mIoU: −1.2% &nbsp;|&nbsp; Throughput gain: **+110%** &nbsp;|&nbsp; VRAM reduction: **38%**
`,
  },

  // ─── Secondary ───────────────────────────────────────────────────────────────
  {
    slug: 'friendship-similarity',
    title: 'Friendship Similarity Analyzer',
    description:
      'Graph-based tool that quantifies social network overlap between two users using ego-network Jaccard similarity and Node2Vec embedding cosine distance.',
    type: 'engineering',
    featured: false,
    priority: 4,
    voxelZone: 'ml-lab',
    technologies: ['Python', 'NetworkX', 'Node2Vec', 'FastAPI', 'React', 'D3.js'],
    tags: ['Graphs', 'Social Networks', 'ML', 'Embeddings'],
    highlights: [
      'Ego-network Jaccard similarity + Node2Vec embedding cosine distance fused into a unified structural similarity score',
      'Node2Vec trained with BFS-biased walk (q=0.5) to capture community structure rather than local neighborhoods',
      'FastAPI backend for graph queries; D3.js force-directed visualization renders the overlapping neighborhood',
    ],
    github: undefined,
    date: '2023-05-01',
    problem:
      'Social closeness between two people is typically measured by raw mutual-friend count, which ignores structural position in the broader network and heavily penalizes users with small friend lists.',
    approach:
      'Modeled friend networks as undirected graphs, computed Jaccard overlap on ego-network neighborhoods, and trained Node2Vec embeddings (p=1, q=0.5, walk length=20) on the full graph. Final similarity score combines both metrics with equal weighting.',
    results:
      'In a pilot study with 200 users, top-5 "most structurally similar" pairs matched qualitative closeness assessments from user surveys 78% of the time, outperforming raw mutual-friend count (61%).',
    content: `## Overview

An experiment in quantifying social similarity beyond the naive "mutual friends" metric.

## Why Not Just Count Mutual Friends?

Mutual friend count is biased by degree. Two people with 500 friends each sharing 50 friends look identical to two people with 60 friends sharing 50 — but the latter pair are objectively far more connected in context.

## Two Similarity Signals

### 1. Jaccard Ego-Network Overlap

For users \`u\` and \`v\` with neighbor sets \`N(u)\` and \`N(v)\`:

\`\`\`
jaccard(u, v) = |N(u) ∩ N(v)| / |N(u) ∪ N(v)|
\`\`\`

This is degree-normalized and bounded in [0, 1].

### 2. Node2Vec Embedding Cosine Distance

\`\`\`python
from node2vec import Node2Vec

model = Node2Vec(
    G,
    dimensions=64,
    walk_length=20,
    num_walks=10,
    p=1,     # return parameter
    q=0.5,   # in-out parameter (BFS-biased → community structure)
)
embeddings = model.fit(window=5, min_count=1)

sim_embed = cosine_similarity(embeddings[u], embeddings[v])
\`\`\`

### Combined Score

\`\`\`
similarity(u, v) = 0.5 · jaccard(u, v) + 0.5 · sim_embed(u, v)
\`\`\`

## Results

| Metric | Mutual Friends (baseline) | This System |
|---|---|---|
| Survey agreement (top-5) | 61% | 78% |
`,
  },
];
