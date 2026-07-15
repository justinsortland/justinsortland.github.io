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
    github: 'https://github.com/justinsortland/counterparty',
    date: '2026-01-01',
    dateDisplay: '2026',
    problem:
      'Residential permit submissions are document-heavy and opaque. Homeowners and small contractors often cannot sanity-check a submission before it reaches a reviewer. On the reviewer side, findings are applied inconsistently with no shared rubric, no audit trail, and no structured way to see how a submission changed between review cycles.',
    approach:
      'Users create a permit submission, attach labeled document artifacts, and request a Claude review. The review prompt includes submission fields, labeled artifact metadata, a reviewer profile, and document coverage. Claude returns structured JSON with a verdict, summary, issues by severity, and missing documents. Reviews are persisted as snapshots. A compare view tracks how findings change across revisions. A printable report summarizes each review revision.',
    results:
      'Structured reviews with severity ratings, missing document tracking, and full revision history. A compare view surfaces resolved, persistent, and newly introduced issues across revisions. Printable reports make each review revision shareable in one click.',
    content: `## Links

- **GitHub:** [github.com/justinsortland/counterparty](https://github.com/justinsortland/counterparty) — source code, README, and technical writeup
- **Demo video:** [Watch on YouTube](https://youtu.be/-JJuIGjXw1Y) — full product walkthrough
- **Live demo:** available on request

## Product Walkthrough

The seeded demo includes a complete permit review flow for 1847 Castro St, a sample ADU submission:

- Dashboard with submissions, status, and recent review activity
- Submission detail showing labeled artifact list and review history
- Compare view for two review revisions, with resolved, persistent, and newly introduced issues
- Printable report for a completed review revision
- Review templates for common permit types

Screenshots and a full walkthrough are in the demo video linked above.

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

`,
  },

  // ─── Second Project ───────────────────────────────────────────────────────────
  {
    slug: 'spactivity',
    title: 'SPACtivity: Northwestern Gym Discovery and Traffic Visualization',
    description:
      'A Flutter mobile app prototype for checking Northwestern gym traffic, facilities, equipment, and hours.',
    type: 'engineering',
    featured: true,
    priority: 2,
    voxelZone: 'spactivity-gym',
    technologies: [
      'Flutter',
      'Dart',
      'Provider',
      'Google Maps',
      'FL Chart',
      'Python',
    ],
    tags: ['Mobile', 'Flutter', 'Data Visualization', 'Prototype'],
    highlights: [
      'Flutter app with gym discovery, traffic visualization, equipment browsing, favorites, dark mode, and map directions in one interface',
      'Traffic charts used live Northwestern gym data where available, supplemented by estimated fallback values when historical coverage was sparse',
      'Provider-managed state across gym, facility, equipment, favorites, and theme layers with reusable screen and model architecture',
    ],
    github: undefined,
    date: '2023-06-01',
    dateDisplay: '2023',
    problem:
      'Northwestern students often choose between multiple gyms without a clean view of current conditions or facility details. A student might care about whether a gym is crowded, whether it has the right equipment, whether it is open, or how far away it is.',
    approach:
      'Built a Flutter app with structured pages for gyms, facilities, equipment, favorites, settings, and search. Traffic visualization used live gym data where available and estimated fallback values when coverage was sparse. Provider handled state for gyms, equipment, facilities, favorites, and theme settings.',
    results:
      'A working mobile prototype connecting a real campus use case to a structured Flutter application, covering gym discovery, traffic visualization, equipment browsing, maps, favorites, and dark mode.',
    content: `## Overview

SPACtivity was a mobile app prototype I built for Northwestern students who wanted a faster way to decide which gym to use. The app combined gym discovery, facility details, equipment information, maps, favorites, dark mode, and traffic visualization in one Flutter interface.

The project was designed around a real student problem: Northwestern has multiple recreation facilities, but deciding where to go can depend on crowding, equipment availability, location, and hours. SPACtivity turned that information into a mobile-first experience that made gym choice easier.

## Problem

Northwestern students often choose between multiple gyms without a clean view of current conditions or facility details. A student might care about whether a gym is crowded, whether it has the right equipment, whether it is open, or how far away it is.

I wanted to build an app that treated gym choice as a product problem rather than a static information page. The goal was to make recreation data easier to browse, compare, and act on from a phone.

## Approach

I built SPACtivity as a Flutter app with structured pages for gyms, facilities, equipment, favorites, settings, and search. The app focused on practical flows: finding a gym, checking traffic, viewing hours, seeing available equipment, opening map directions, and saving commonly used locations.

The traffic visualization used live gym traffic data where available, supplemented by estimated fallback values when historical coverage was sparse. This kept the interface useful even when the available data was incomplete.

## Implementation

The app was organized around reusable screens, model objects, and state notifiers. Provider handled app state for favorites, theme settings, gym data, equipment data, and facility data. Google Maps integration supported location context and directions. FL Chart was used for traffic visualizations.

Gym detail pages included traffic views, hours, descriptions, equipment, amenities, and map actions. Facility and equipment pages let users browse recreation options beyond a single gym list. Favorites and dark mode made the app feel more like a usable student product than a static class demo.

**Stack**

\`Flutter\` \`Dart\` \`Provider\` \`Google Maps\` \`FL Chart\`

## Data Note

SPACtivity used live Northwestern gym traffic data where available and estimated fallback values where historical coverage was incomplete. The fallback values were meant to support a more complete visualization experience, not to claim a validated forecasting model.

This distinction matters because the project was built in 2023, when available historical coverage was limited. The app should be understood as a mobile product prototype with practical traffic visualization, not as a production-grade prediction system.

## Limitations

SPACtivity was a student project and prototype, not a production app. It was not released on the App Store and had no production user base. The traffic estimation logic was useful for filling gaps, but it was not a validated forecasting model. Some dependencies or setup steps may need updating because the project has been archived.

## What I Learned

SPACtivity taught me how much engineering work sits behind a simple product question. "Which gym should I go to?" required data modeling, state management, UI organization, map behavior, time and hours handling, and clear visual presentation.

It also taught me to be careful with incomplete real-world data. Live data is useful, but products often need fallback behavior when coverage is sparse. The challenge is making the interface helpful without overstating what the data can prove.

## Next Steps

If I revisited SPACtivity, I would modernize the Flutter dependencies, clean up the data layer, and separate live traffic ingestion from fallback estimation more clearly. I would also replace the fallback estimation logic with a formal time-series baseline such as SARIMA and compare it against simpler rolling-average and day-of-week baselines. A stronger version of the project would include a small backend, clearer data provenance, and an evaluation page showing how well each traffic estimate matched observed gym usage.
`,
  },

  // ─── ML Research ─────────────────────────────────────────────────────────────
  {
    slug: 'sam-visionmamba',
    title: 'Evaluating Sharpness-Aware Minimization on VisionMamba',
    description:
      'A training comparison of SAM-wrapped AdamW against a standard AdamW baseline on VisionMamba-tiny across MNIST, CIFAR-10, and CIFAR-100.',
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
      'Modified the VisionMamba training pipeline to support SAM\'s two-step optimizer update pattern across sam.py, main.py, and engine.py',
      'Ran six model runs across MNIST, CIFAR-10, and CIFAR-100 comparing SAM-wrapped AdamW against a standard AdamW baseline',
      'CIFAR-100 top-1 accuracy improved from 71.36% to 75.13% with SAM; benefit was absent on simpler datasets',
    ],
    github: undefined,
    paper: undefined,
    date: '2024-10-01',
    dateDisplay: 'Oct 2024 – Dec 2024',
    problem:
      'VisionMamba applies state-space modeling to image classification. SAM is an optimizer designed to favor flatter loss regions and has shown generalization improvements for Vision Transformers, but it was not clear whether those gains would carry over to an SSM-based architecture or whether they would depend on task difficulty.',
    approach:
      'Trained VisionMamba-tiny with two optimizer setups, AdamW baseline and SAM wrapped around AdamW, holding all other hyperparameters fixed. Tracked top-1 accuracy, top-5 accuracy, training loss, and testing loss across six runs on MNIST, CIFAR-10, and CIFAR-100.',
    results:
      'SAM had the clearest benefit on CIFAR-100, improving top-1 accuracy from 71.36% to 75.13% (+3.77 pp). On CIFAR-10, accuracy decreased slightly. Training loss stayed slightly higher with SAM while test loss was lower on CIFAR-100, suggesting that SAM improved held-out performance despite maintaining slightly higher training loss.',
    content: `## Implementation

I made three targeted changes to the VisionMamba codebase.

**\`sam.py\`** implements the SAM optimizer class. SAM requires two forward-backward passes per parameter update. The first pass computes the gradient, then SAM perturbs the weights toward a sharper region of the loss surface. The second pass computes the gradient at the perturbed weights, which is used for the actual update.

**\`main.py\`** was modified to accept a flag that switches the optimizer from standard AdamW to SAM-wrapped AdamW.

**\`engine.py\`** was updated to handle SAM's two-step update pattern. The standard single \`optimizer.step()\` call was replaced with a \`first_step\` and \`second_step\` sequence that runs the perturbation, second gradient computation, weight restoration, and final update in the correct order.

Datasets were prepared in the ImageNet-style directory format expected by the training script, with separate \`train/\` and \`val/\` directories per class.

## Experiment Design

Each model trained for 30 epochs on a single GPU using the VisionMamba-tiny architecture.

| Setting | Value |
|---|---|
| Architecture | VisionMamba-tiny |
| Epochs | 30 |
| Batch size | 128 |
| Learning rate | 5e-6 |
| Weight decay | near zero |
| Stochastic depth | disabled |
| Mixed precision | disabled |

Training without SAM took roughly 14 to 16 minutes per epoch, or about 7 hours per model. Training with SAM took roughly 25 to 30 minutes per epoch, or about 14 hours per model. The extra cost comes from running a second forward-backward pass on every step.

## Results

SAM had the clearest benefit on CIFAR-100.

| Dataset | AdamW Top-1 | SAM Top-1 | Change |
|---|---|---|---|
| CIFAR-10 | 97.37% | 97.05% | -0.32 pp |
| CIFAR-100 | 71.36% | 75.13% | +3.77 pp |

An additional logged row is excluded because the source table labels the dataset as "MAMBA," while the experiment setup describes MNIST, CIFAR-10, and CIFAR-100. I would verify the original logs before citing that result.

On CIFAR-100, training loss stayed slightly higher with SAM while test loss was lower, suggesting that SAM improved held-out performance despite maintaining slightly higher training loss. On CIFAR-10, SAM did not help and accuracy dropped slightly.

## What I Learned

The main takeaway is that optimizer choice should be evaluated against task difficulty. SAM added roughly double the training time but the improvement only appeared on the hardest dataset. On CIFAR-10 and MNIST the extra cost was not justified.

Integrating SAM into an existing training loop requires care. The two-step update is not a drop-in replacement for a single \`optimizer.step()\` call. The perturbation, second gradient computation, weight restore, and final update each need to happen in the right sequence, and gradient zeroing has to be handled correctly between steps.

## Limitations

This was a course research project. Each configuration used a single run, so there is no variance estimate across seeds. Thirty epochs is a short schedule for CIFAR-100. The baseline hyperparameters were fixed rather than separately tuned, so a stronger AdamW configuration could narrow the CIFAR-100 gap. The MNIST result is currently unverified due to a labeling inconsistency in the source data.

## Next Steps

- Rerun with multiple seeds to get variance estimates
- Tune the SAM perturbation radius instead of using the default
- Train for longer on CIFAR-100 to see if the gap persists
- Test on Tiny ImageNet to check whether the pattern holds at higher complexity
- Compare against ASAM or other SAM variants

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
