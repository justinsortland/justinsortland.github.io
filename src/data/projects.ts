import type { Project } from '@/lib/types';

export const projects: Project[] = [
  // ─── Flagship ────────────────────────────────────────────────────────────────
  {
    slug: 'counterparty',
    title: 'Counterparty',
    description:
      'AI-assisted permit review system for residential construction, built on a durable Postgres-backed job queue, concurrency-safe workers, and deterministic jurisdiction and rule resolution. Claude handles the semantic review step (verdicts, severity-rated issues, missing documents) against evidence and applicable rules the backend has already resolved.',
    type: 'engineering',
    featured: true,
    priority: 1,
    voxelZone: 'counterparty-tower',
    technologies: [
      'Next.js',
      'TypeScript',
      'PostgreSQL',
      'Prisma',
      'Supabase Auth',
      'Supabase Storage',
      'Anthropic Claude',
      'Tailwind CSS',
      'Railway',
      'Vitest',
    ],
    tags: ['Applied AI', 'Backend Systems', 'Full-Stack', 'Document Review', 'Workflow'],
    highlights: [
      'Review execution runs on a durable Postgres-backed job queue: workers claim jobs with FOR UPDATE SKIP LOCKED, retry with exponential backoff, and recover stale jobs, with no separate broker.',
      'A deterministic layer resolves the governing authority (AHJ) and applicable jurisdiction rules before Claude ever runs, instead of asking the model to guess local law from an address.',
      'A 12-case, human-reviewed evaluation harness with decomposed consistency metrics drove four rounds of prompt calibration, raising verdict accuracy from 56.7% to 76.7%.',
    ],
    github: 'https://github.com/justinsortland/counterparty',
    date: '2026-01-01',
    dateDisplay: '2026',
    problem:
      'Permit review is document-heavy, jurisdiction-dependent, and opaque. Homeowners and small contractors rarely know what a plan checker is looking for, reviewers apply findings inconsistently with no audit trail, and there was no way to check whether an AI reviewer would give the same answer twice.',
    approach:
      'Review execution moved off the request path onto a Postgres-backed job queue and a separate worker process. A deterministic layer resolves the governing jurisdiction, applicable rules, and document coverage before Claude ever runs, so the model is scoped to one job: interpreting evidence-grounded context against rules the backend already determined apply.',
    results:
      'A durable, concurrency-safe review pipeline with immutable per-revision snapshots and deterministic jurisdiction and rule resolution, checked against a 12-case human-reviewed evaluation harness. Four rounds of calibration raised verdict accuracy from 56.7% to 76.7%, with missing-document F1 and validation success both holding at 100% on every clean run.',
    content: `## Links

- **GitHub:** [github.com/justinsortland/counterparty](https://github.com/justinsortland/counterparty) — source code, README, and technical writeup
- **Demo video:** [Watch on YouTube](https://www.youtube.com/watch?v=hC9Pf9LV-sg) — product walkthrough
- **Live demo:** available on request

## What Counterparty Is

Counterparty is a permit-review workflow simulator for residential construction. Users describe a project, attach labeled documents, and request a review; Claude plays the role of a residential plan checker for the stated jurisdiction and returns a structured verdict, a summary, severity-rated issues with cited evidence, and a list of missing documents. Users can revise a submission and re-request review to track progress across revisions.

What started as a synchronous Next.js app calling Claude directly on the request path has since grown a durable backend: review execution now runs on a Postgres-backed job queue behind concurrency-safe workers, jurisdiction and rule applicability are resolved deterministically before the model ever runs, and the review pipeline is checked against a human-reviewed evaluation harness instead of spot-checked outputs.

**Stack:** Next.js (App Router), TypeScript, PostgreSQL (Supabase), Prisma, Supabase Auth and Storage, Anthropic Claude, Tailwind CSS — deployed across Vercel (app) and Railway (worker).

## The Problem

Permit review is document-heavy, jurisdiction-dependent, and opaque. Homeowners and small contractors rarely know what a plan checker is actually looking for, and first submissions routinely get rejected for missing documents or overlooked local requirements. On the reviewer side, findings get applied inconsistently with no audit trail and no structured way to see how a submission changed between review cycles — and no way to check whether an AI reviewer would give the same answer twice.

## System Architecture

The product surface — submissions, artifacts, review history, compare, reports, templates — is still one Next.js application. What changed is everything between "request a review" and "get a review": that work moved off the request path onto a Postgres-backed queue and a separate worker process, with a deterministic resolution layer sitting in front of the model call.

\`\`\`
Browser
  │
  ▼
Next.js server action — requestReview()
  (idempotent: reuses any job already QUEUED/RUNNING for the submission)
  │
  ▼
Postgres — ReviewJob queue (review_jobs table, same database as the app)
  │
  ▼
Worker process (Railway, long-running) — claimNextReviewJob()
  FOR UPDATE SKIP LOCKED — single-statement claim + transition to RUNNING
  │
  ▼
processReviewJob()
┌─ deterministic ──────────────────────────────────────────────┐
│ • load the exact Submission snapshot this job targets          │
│ • selectProfile() → one of 9 permit-type review profiles       │
│ • resolve AHJ (Census geocode + curated FIPS mapping)          │
│ • resolve Coastal Zone applicability (fail-closed GIS check)   │
│ • selectRulePacks() → STATE + LOCAL rule packs, composed       │
│ • computeCoverage() → confirmed / missing documents            │
│ • buildEvidenceCatalog() → grounded, citable review context    │
└─────────────────────────────────────────────────────────────┘
  │
  ▼
Claude (Anthropic API, temperature 0) — the probabilistic step
  returns structured JSON: verdict, summary, issues, missingDocs
  │
  ▼
┌─ deterministic ──────────────────────────────────────────────┐
│ • validateAndNormalize() — schema + evidence-reference check   │
│ • one SERIALIZABLE transaction: Review + ReviewIssue +         │
│   ReviewRulePack rows, submission.status update,               │
│   ReviewJob → SUCCEEDED (ownership-guarded)                    │
└─────────────────────────────────────────────────────────────┘
\`\`\`

There's no message broker and no microservices here — one Next.js app, one worker process, one Postgres database. The infrastructure decision that mattered was recognizing that AI review is long-running, unpredictable-latency work that doesn't belong inside a serverless request/response cycle, and giving it its own process boundary instead of adding infrastructure everywhere else.

## Building a Durable AI-Review Pipeline

The naive version of this feature calls Claude inside the request handler and writes the result when it returns. That's fine until a review takes fifteen seconds, or times out, or a user double-clicks "Request Review," or a deploy restarts mid-call. That work now happens at the queue layer instead of being left to chance.

**Idempotent enqueueing.** \`requestReview()\` checks for an existing \`QUEUED\` or \`RUNNING\` job before creating a new one, and \`enqueueReviewJob()\` additionally upserts on a unique \`idempotencyKey\`. A double-submit or a page refresh can't create two competing jobs for the same logical request.

**Concurrency-safe claiming.** Workers claim jobs with \`FOR UPDATE SKIP LOCKED\`, in a single CTE-plus-\`UPDATE ... RETURNING\` statement rather than a \`SELECT\` followed by an \`UPDATE\`. That distinction matters: a plain select-then-update is a race, since two workers can both read the same "available" row before either has written a lock. \`SKIP LOCKED\` means a worker that finds a row already locked by another worker skips it and moves on, instead of blocking or double-processing it. Counterparty runs one worker today, but the claim logic is already safe for more than one.

**Bounded retries, not silent failure.** A failed attempt — an Anthropic error, a timeout, an invalid JSON response — goes back to \`QUEUED\` with exponential backoff (roughly 30 seconds, then 60, then 120, and so on, capped at 15 minutes), up to a \`maxAttempts\` limit (default 3), after which the job moves to \`DEAD_LETTER\` instead of disappearing silently. A worker never sleeps waiting on a specific retry; it just polls for the next eligible job and comes back to a delayed one once its \`availableAt\` time passes.

**Transactions stay short; the model call doesn't happen inside one.** The Anthropic call happens outside any database transaction — it is slow and unpredictable, and holding a transaction open around it would hold locks for no reason. Once the model responds, persisting the review, its issues, the submission status update, and the job's \`SUCCEEDED\` transition all happen together in one short \`SERIALIZABLE\` transaction.

**Stale-job recovery with ownership fencing.** If a worker dies mid-job, its claimed job would otherwise stay \`RUNNING\` forever. A recovery pass reclaims jobs whose lock is older than 45 minutes. Every completion or failure path is guarded on \`id + lockedBy + attempts\`, not just job id — so a worker whose job was already reclaimed out from under it (slow, not actually dead) can't come back later and commit a stale result; its write simply matches zero rows.

**Immutable, revision-scoped reviews.** Every review snapshots the exact submission state it evaluated — scope of work, artifacts, jurisdiction — at the moment the job actually ran. If a user uploads a new revision after requesting a review but before a worker gets to it, the worker still evaluates the revision it was asked about, not whatever the submission looks like by the time it runs. That invariant is what makes revision history, the compare view, and printable reports trustworthy: they always reflect what Claude actually saw, not what the submission happens to look like now.

**A concurrency bug this surfaced.** Revision numbers were originally computed by reading the current maximum and adding one, which breaks under concurrent requests: two transactions can both read the same maximum before either commits. The fix lets Postgres enforce the invariant instead of application code: it computes the next revision number inside the same \`SERIALIZABLE\` transaction that writes the review, and if two transactions race on the same submission, Postgres aborts one of them (Prisma surfaces this as error \`P2034\`) instead of letting both silently succeed with the same number. The aborted transaction retries automatically, up to 3 attempts. The general lesson carried into the rest of the backend: a correctness invariant like "revision numbers are unique per submission" belongs at the database boundary, not in application code that assumes requests won't overlap.

## Making Jurisdiction Deterministic

Which rules apply to a submission used to be entirely the model's problem — jurisdiction was a free-text field, and Claude reasoned about local requirements from training knowledge with no way to check its work. That's fine for general review commentary, but it's the wrong place to put a decision like "does this address fall under Los Angeles County" or "is this project inside the Coastal Zone." Those are facts, not judgment calls, and Counterparty now resolves them before Claude is ever called.

\`\`\`
address
  → US Census Geocoder (state / county / place FIPS codes)
  → AHJ resolution against a curated, human-reviewed mapping registry
  → Coastal Zone GIS point-classification (fail-closed to UNKNOWN)
  → rule-pack selection, gated on confirmed AHJ + applicability facts
  → multi-pack composition (STATE, then LOCAL)
  → grounded, citable evidence handed to Claude
\`\`\`

**AHJ resolution.** AHJ is short for authority having jurisdiction — the actual government office that reviews a permit, which is not always the obvious one. Counterparty geocodes the submission address through the US Census Geocoder and matches the returned FIPS codes, never the free-text place name, against a small, checked-in registry of human-reviewed mappings. Today that registry resolves two unincorporated Los Angeles County communities, Marina del Rey and East Los Angeles, to Los Angeles County as the governing authority; every other address resolves to state-level identity or stays unresolved rather than getting a guess. Getting the AHJ wrong means every downstream rule decision is wrong too, so this is exactly the kind of decision that shouldn't be left to a model's best guess from an address string.

**Coastal Zone gating.** One rule pack only applies outside the California Coastal Zone. Rather than asking Claude to reason about that, the backend queries a live Caltrans GIS layer with the submission's coordinates and stores the result as an explicit \`INSIDE\`, \`OUTSIDE\`, or \`UNKNOWN\` fact. The \`UNKNOWN\` state is real and propagates as unresolved — a missing or ambiguous GIS response is never silently treated as "outside" just because that happens to be the more permissive case. Rule selection treats \`UNKNOWN\` as a closed gate, the same as a confirmed \`INSIDE\`.

**Rule packs, composed, not concatenated.** Jurisdictional rules live as versioned, typed "rule packs" rather than paragraphs pasted into a prompt. Each rule carries a legal effect (an agency limit, an applicant entitlement, a project requirement), a source citation, and reviewer guidance on when it may actually support a finding. A review composes at most one \`STATE\` pack (currently two human-reviewed California ADU rules: a 4-ft setback ceiling and a 16/25-ft height floor) and one \`LOCAL\` pack (a Los Angeles County ADU/JADU rental-duration rule, gated on a confirmed LA County AHJ and a Coastal Zone status of \`OUTSIDE\`). Every applied pack is recorded per review, in order, so a "Rule packs" line on a review always reflects exactly what that specific execution used, not what the submission's jurisdiction happens to resolve to today.

**Why the split matters.** The backend's job is to answer "which authority governs this, and which rules actually apply" — a question with a correct, look-up-able answer, not a guess. Claude's job is narrower and better suited to a language model: given this evidence and these applicable rules, does the submission comply. Keeping the first question out of the prompt makes the second one more reliable, and turns jurisdiction behavior into something that can be unit tested instead of only prompt-tuned.

**What's actually verified today.** The deterministic side of this chain has been checked against live external services, not only unit tests: a capped sanity run hit the real Census Geocoder and the real Caltrans Coastal Zone layer against two public addresses — a Marina del Rey waterfront park and an East Los Angeles public library — and correctly classified them \`INSIDE\` and \`OUTSIDE\`, respectively. Running that same East LA scenario all the way through the worker pipeline against a live Claude call is the planned next step for the LA County rule pack specifically; it hasn't happened yet. The geo/rule-resolution chain up to that point is verified against real government data sources; the full-pipeline model run is upcoming work, not a finished result.

## Evaluation and Reliability

Prompt changes to the reviewer used to be judged by reading a handful of outputs and deciding whether they looked reasonable. That doesn't scale and it doesn't catch regressions, so the project has a small, repeatable evaluation harness that runs the production review pipeline itself against a fixed benchmark.

**The benchmark.** 12 hand-authored synthetic cases, spanning all 9 production review profiles (ADU, new construction, remodel/addition, electrical, plumbing, mechanical, zoning, grading, and generic). Every judgment-dependent expected label — each verdict, and any missing-document label that required interpreting the scope of work — was manually reviewed against the project's own documented review semantics and tagged accordingly. This is an internal review against this project's own rules, not third-party or professional plan-checker validation. Each case runs 5 times at temperature 0: 60 correlated observations per run, not 60 independent examples.

**Four rounds of prompt calibration.** The harness drove four rounds of calibration on the reviewer's system prompt:

| Metric | Baseline | After calibration |
|---|---|---|
| Verdict accuracy | 56.7% (34/60) | 76.7% (46/60) |
| Production-validation success | 100% | 100% |
| Missing-document F1 | 100% | 100% |
| Verdict pairwise consistency | 96.7% | 96.7% |

Verdict accuracy rose 20 points across the arc, mostly from one intervention: an early prompt version treated a genuinely missing document as automatic grounds for the harshest verdict, and the harness's own confusion matrix showed this was systematically over-escalating conditional cases to outright rejection. Fixing that one severity rule accounted for most of the gain; later rounds each produced smaller, well-understood improvements before calibration reached diminishing returns. Production has since moved to a reviewed reconstruction of the best-evidenced severity calibration from that arc, which hasn't been re-run through this exact benchmark as a new formal round — so 76.7% describes that calibration arc's final tested version, not a current, independently re-measured production score.

**Missing-document F1 held at 100%** across every clean run, worth reading precisely: the model is handed a pre-computed "not yet confirmed" document list as part of its context, so this is largely a pipeline-propagation check — does the model correctly echo back data it was already given — rather than evidence of independent document reasoning.

**An evaluation-infrastructure bug, caught by the harness itself.** One calibration run measured only 82% production-validation success, a sharp apparent regression. The cause wasn't the prompt: adding a new output field increased typical response length past a fixed token budget, truncating roughly one in five responses mid-JSON. Raising that budget and rerunning restored 100% validation success and the accuracy numbers above. It's a small story, but a useful one: evaluation infrastructure needs the same debugging discipline as production code, and a metric that looks like a model regression is sometimes a plumbing bug instead.

**Consistency, decomposed.** A single blended consistency score originally read as close to 0%, which looked like the model barely agreeing with itself across repeated runs. Decomposing it into independent signals told a different story: verdict-level and missing-document-level consistency both held at 97–100%, meaning the model's underlying judgment was actually stable. The low blended number mostly reflected issue-level wording and categorization churn between runs — the same underlying finding, described differently — rather than the model changing its mind about the submission.

**A known, bounded failure mode.** Every residual verdict error in the calibrated benchmark concentrates in 3 of the 12 cases, all "complete documentation" scenarios that should verdict as a clean approval: the model still tends to manufacture at least one significant issue rather than returning it. This has been a stable pattern across every prompt version tested — a specific, diagnosed problem, not an open-ended one.

These are evaluation-harness baselines against a small, human-reviewed benchmark. They describe measured behavior on this benchmark, not production accuracy guarantees or a claim about real-world plan-checker agreement.

## Engineering Decisions

- **Deterministic orchestration around a probabilistic model.** Queueing, retries, concurrency control, idempotency, revision identity, jurisdiction and rule resolution, and persistence are all ordinary backend code with unit tests behind them. Claude is scoped to exactly one step — interpreting evidence-grounded context against rules the backend already determined apply — which keeps the one genuinely non-deterministic part of the system as small and inspectable as possible.
- **Invariants belong at the database boundary, not in application code.** The revision-number race and the ownership-guarded job transitions (\`id + lockedBy + attempts\` on every fail, retry, and complete path) both follow the same principle: don't trust application code to prevent a race the database can prevent for you.
- **Snapshots over live joins.** Reviews store the submission state they evaluated, not a foreign key to the current submission. Editing a submission afterward can never retroactively change what a past review says it saw.
- **A worker process, not more infrastructure.** The queue is a plain Postgres table in the same database as the app — no Redis, no message broker. The infrastructure decision that actually mattered was giving long-running, unpredictable-latency AI calls their own process (a long-lived worker on Railway) instead of running them inside short-lived serverless functions on Vercel.
- **Separate "verified" from "model-generated" everywhere it's shown.** Evidence resolved from something Counterparty actually supplied — a document excerpt, a jurisdiction rule, a scope fact — is rendered distinctly from a code reference, which is free-form, unverified model text labeled as such. The UI never blurs the two.

## What's Still There

The product surface this backend work sits underneath hasn't gone away:

- Submission management with full revision history, and a compare view for resolved, persistent, and newly introduced issues and missing documents across revisions
- Structured AI review — verdict, severity-rated issues, missing documents, and cited evidence — with a "what to do next" remediation suggestion per issue
- PDF and DOCX text extraction, with an OCR fallback for scanned PDFs, so reviews can cite actual document excerpts rather than only artifact labels
- Printable, per-revision reports
- Reusable submission templates
- Supabase-backed authentication and Postgres-backed application state

## Current State and What's Next

Counterparty runs as a deployed, end-to-end system: Vercel for the Next.js app, a long-running worker on Railway, and Supabase for Postgres, auth, and file storage. It's a working prototype and a considerably more serious piece of backend engineering than the original synchronous version — not a production service handling real permit traffic, and the evaluation numbers above should be read as benchmark baselines, not accuracy guarantees.

Planned next: the East LA rental-duration rule's first live-model integration test through the full worker pipeline; broader AHJ and rule-pack coverage beyond the current California ADU pilot; photo and image content understanding for artifacts OCR can't recover as text; and multi-user workspace support, for which the underlying membership schema is already in place.
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
    github: 'https://github.com/justinsortland/spactivity',
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

  // ─── Supporting ──────────────────────────────────────────────────────────────
  {
    slug: 'social-me',
    title: 'Social Me',
    description:
      'A Chrome extension prototype for comparing Reddit gaming profiles with LLM-generated interest summaries. Built as a 3-person class team project; my contribution was the Chrome extension frontend.',
    type: 'engineering',
    featured: false,
    priority: 4,
    voxelZone: 'ml-lab',
    technologies: [
      'JavaScript',
      'HTML',
      'CSS',
      'Chrome Extension API',
      'Flask',
      'Python',
      'PRAW',
      'GPT-4o',
    ],
    tags: ['Applied AI', 'Browser Extension', 'Social Computing', 'Prototype'],
    highlights: [
      'Chrome extension detects whether the active Reddit tab is a user profile or subreddit page and adjusts the popup UI and request flow accordingly.',
      'Backend scrapes Reddit post history via PRAW, sends it to GPT-4o to extract structured interest profiles (games, genres, non-gaming interests), and returns qualitative similarity matches.',
      'Archived class prototype; similarity matching is LLM-delegated, not algorithmic. Not deployed beyond a local development setup.',
    ],
    github: 'https://github.com/sarahfazio/CS338',
    date: '2024-10-01',
    dateDisplay: 'Oct 2024 – Dec 2024',
    content: `## Overview

Social Me was a class team project (3 people) that paired a Chrome extension with a local Flask backend to analyze Reddit gaming profiles. The extension let users trigger profile analysis directly from Reddit pages. The backend used PRAW to scrape post history, sent that data to GPT-4o to extract structured interest summaries, and compared profiles to surface qualitatively similar users.

My contribution was the Chrome extension frontend: the popup UI, page-aware button behavior, response formatting, and communication with the Flask backend.

## What It Does

The extension detects whether the active tab is a Reddit user profile or a subreddit page and updates the UI accordingly. On a user profile, it triggers a fetch to the local backend that scrapes the user's recent posts, sends the data to GPT-4o, and returns a structured JSON profile covering gaming interests, genres, and non-gaming interests. On a subreddit, it runs the same flow across multiple users and asks GPT-4o to identify the five most similar to a reference profile.

The similarity comparison is qualitative: Reddit post data is sent to GPT-4o as context, and the model returns ranked matches based on its judgment. There is no formal similarity metric, cosine distance, or embedding computation.

## Stack

\`Chrome Extension API\` \`JavaScript\` \`HTML\` \`CSS\` \`Flask\` \`Python\` \`PRAW\` \`GPT-4o\`

## Status

Archived class prototype. The backend runs locally on port 5000 and was not deployed. The repo is public under the original team owner's account.
`,
  },
];
