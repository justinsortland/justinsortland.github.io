import type { ClassItem } from '@/lib/types';

/**
 * Northwestern University coursework — ordered roughly from systems → theory → ML.
 * Course codes follow NU's CS/IEMS/EECS numbering conventions.
 * Update codes, instructors, or grades as needed.
 */
export const classes: ClassItem[] = [
  // ─── Systems ──────────────────────────────────────────────────────────────────
  {
    code: 'CS 343',
    title: 'Operating Systems',
    institution: 'Northwestern University',
    description:
      'Process scheduling, virtual memory management, file systems, synchronization primitives, and kernel design. Implemented a user-level thread library and a simple file system in C.',
    tags: ['Systems'],
    level: 'Undergraduate',
    takeaways: [
      'Understanding the kernel/user boundary and how syscalls cross it',
      'Virtual memory and TLB shootdown in multi-core systems',
      'Concurrency bugs: data races, deadlocks, priority inversion',
    ],
  },
  {
    code: 'CS 345',
    title: 'Distributed Systems',
    institution: 'Northwestern University',
    description:
      'Consensus algorithms (Paxos, Raft), distributed transactions, replication strategies, consistency models, and fault-tolerant system design. Built a Raft-based key-value store in Go.',
    tags: ['Systems', 'Distributed'],
    level: 'Undergraduate',
    takeaways: [
      'CAP theorem trade-offs in practice vs. theory',
      'Why linearizability is expensive and when eventual consistency is acceptable',
      'Log-structured storage and write-ahead logging for crash recovery',
    ],
  },
  {
    code: 'CS 340',
    title: 'Computer Networking',
    institution: 'Northwestern University',
    description:
      'TCP/IP stack, congestion control, routing protocols (BGP, OSPF), DNS, HTTP/2, TLS, and software-defined networking. Implemented a reliable transport protocol and a basic router.',
    tags: ['Systems', 'Networking'],
    level: 'Undergraduate',
    takeaways: [
      'How TCP slow start and CUBIC interact with modern datacenter networks',
      'BGP as a policy engine, not just a shortest-path protocol',
      'The surprisingly fragile trust model underlying the public DNS',
    ],
  },

  // ─── Theory & Math ────────────────────────────────────────────────────────────
  {
    code: 'CS 336',
    title: 'Design and Analysis of Algorithms',
    institution: 'Northwestern University',
    description:
      'Greedy algorithms, divide-and-conquer, dynamic programming, graph algorithms (Dijkstra, max-flow, matching), NP-completeness, and approximation algorithms.',
    tags: ['Algorithms', 'Theory'],
    level: 'Undergraduate',
    takeaways: [
      'Reduction as the primary tool for proving hardness',
      'When greedy works and why exchange-argument proofs make it rigorous',
      'Approximation ratio analysis for NP-hard problems',
    ],
  },
  {
    code: 'IEMS 315',
    title: 'Stochastic Processes',
    institution: 'Northwestern University',
    description:
      'Markov chains (discrete and continuous-time), Poisson processes, queuing theory, martingales, and Brownian motion with applications to finance and operations research.',
    tags: ['Math', 'Probability'],
    level: 'Undergraduate',
    takeaways: [
      'Steady-state distributions and ergodicity for Markov chains',
      'M/M/1 queues and Little\'s Law in system performance modeling',
      'How Brownian motion underlies continuous-time financial models',
    ],
  },

  // ─── Machine Learning ─────────────────────────────────────────────────────────
  {
    code: 'CS 349',
    title: 'Machine Learning',
    institution: 'Northwestern University',
    description:
      'Supervised and unsupervised learning, regularization, SVMs, decision trees, ensemble methods, neural networks, and generalization theory. Implemented core algorithms from scratch in NumPy.',
    tags: ['ML', 'Math'],
    level: 'Undergraduate',
    takeaways: [
      'Bias-variance decomposition as a diagnostic framework',
      'Why cross-validation is not a substitute for a held-out test set',
      'Kernel methods and the dual formulation of SVMs',
    ],
  },
  {
    code: 'CS 496',
    title: 'Deep Learning',
    institution: 'Northwestern University',
    description:
      'Convolutional networks, recurrent architectures, transformers, attention mechanisms, generative models (VAEs, GANs, diffusion), and training at scale. Projects in PyTorch.',
    tags: ['ML', 'Deep Learning'],
    level: 'Graduate',
    takeaways: [
      'Attention is essentially differentiable nearest-neighbor lookup',
      'Why batch normalization and residual connections made very deep networks trainable',
      'Score matching as the theoretical foundation for diffusion models',
    ],
  },
  {
    code: 'CS 395',
    title: 'Probabilistic Graphical Models',
    institution: 'Northwestern University',
    description:
      'Bayesian networks, Markov random fields, exact and approximate inference (belief propagation, variational methods, MCMC), and learning graphical model structure from data.',
    tags: ['ML', 'Math', 'Probability'],
    level: 'Graduate',
    takeaways: [
      'The junction tree algorithm as the unifying framework for exact inference',
      'When mean-field VI gives tight bounds and when it catastrophically underestimates variance',
      'Structure learning as a combinatorial search problem with score-based vs. constraint-based approaches',
    ],
  },
];
