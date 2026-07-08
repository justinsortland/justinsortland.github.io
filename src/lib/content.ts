import type { Project, Experience, ClassItem, ReadingPost, LearningPost, BlogPost } from './types';

export async function getProjects(): Promise<Project[]> {
  return getSampleProjects();
}

export async function getProjectBySlug(slug: string): Promise<{ project: Project; content: string } | null> {
  const sampleProject = getSampleProjects().find(p => p.slug === slug);
  if (sampleProject) {
    return { project: sampleProject, content: getSampleProjectContent(slug) };
  }
  return null;
}

export async function getExperience(): Promise<Experience[]> {
  return getSampleExperience();
}

export async function getClasses(): Promise<ClassItem[]> {
  return getSampleClasses();
}

export async function getReadings(): Promise<ReadingPost[]> {
  return getSampleBooks();
}

export async function getReadingBySlug(slug: string): Promise<ReadingPost | null> {
  return getSampleBooks().find(r => r.slug === slug) || null;
}

export async function getLearningPosts(): Promise<LearningPost[]> {
  return getSampleLearningPosts();
}

export async function getLearningBySlug(slug: string): Promise<LearningPost | null> {
  return getSampleLearningPosts().find(l => l.slug === slug) || null;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const books = await getReadings();
  const learnings = await getLearningPosts();

  const bookPosts: BlogPost[] = books.map(r => ({
    slug: `books/${r.slug}`,
    title: r.title,
    date: r.date,
    tags: r.tags,
    type: 'reading' as const,
    excerpt: r.summary.slice(0, 160) + '...',
    featured: r.featured,
  }));

  const learningPosts: BlogPost[] = learnings.map(l => ({
    slug: `learning/${l.slug}`,
    title: l.title,
    date: l.date,
    tags: l.tags,
    type: 'learning' as const,
    excerpt: l.content.slice(0, 160) + '...',
    featured: l.featured,
  }));

  return [...bookPosts, ...learningPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  const tagSet = new Set<string>();
  posts.forEach(post => post.tags.forEach(tag => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

function getSampleProjects(): Project[] {
  return [
    {
      slug: 'spectral-gnn',
      title: 'Spectral Graph Neural Networks',
      description: 'Implementation of spectral convolutions on graphs using Chebyshev polynomials and learnable filters in the frequency domain.',
      type: 'research',
      featured: true,
      technologies: ['PyTorch', 'PyG', 'NumPy', 'NetworkX', 'CUDA'],
      tags: ['GNN', 'Spectral', 'Deep Learning'],
      github: 'https://github.com/yourusername/spectral-gnn',
      demo: 'https://demo.spectral-gnn.dev',
      date: '2024-01-15',
      problem: 'Standard GNNs struggle with long-range dependencies and over-smoothing in deep architectures.',
      approach: 'Leveraged graph Fourier transform and spectral filtering to capture global graph structure.',
      results: 'Achieved 94.2% accuracy on Cora dataset with 12-layer network, outperforming baselines by 3.1%.',
    },
    {
      slug: 'graph-rag',
      title: 'GraphRAG: Knowledge Graph Retrieval',
      description: 'Retrieval-augmented generation system using knowledge graphs for structured information retrieval and reasoning.',
      type: 'engineering',
      featured: true,
      technologies: ['Python', 'LangChain', 'Neo4j', 'OpenAI', 'FastAPI'],
      tags: ['RAG', 'Knowledge Graphs', 'LLM'],
      github: 'https://github.com/yourusername/graph-rag',
      date: '2024-02-20',
      problem: 'Traditional RAG systems miss structural relationships between entities.',
      approach: 'Combined vector similarity search with graph traversal for context-aware retrieval.',
      results: 'Improved answer accuracy by 28% on multi-hop reasoning benchmarks.',
    },
    {
      slug: 'distributed-pagerank',
      title: 'Distributed PageRank at Scale',
      description: 'Scalable implementation of PageRank algorithm for billion-edge graphs using message-passing paradigm.',
      type: 'engineering',
      featured: true,
      technologies: ['Rust', 'Apache Spark', 'GraphX', 'HDFS', 'Kubernetes'],
      tags: ['Distributed Systems', 'Graph Algorithms', 'Scale'],
      github: 'https://github.com/yourusername/dist-pagerank',
      date: '2023-11-10',
      problem: 'Computing PageRank on web-scale graphs requires efficient distributed computation.',
      approach: 'Implemented vertex-centric programming model with optimized message aggregation.',
      results: 'Processed 10B edge graph in 47 minutes on 100-node cluster.',
    },
  ];
}

function getSampleProjectContent(slug: string): string {
  const contents: Record<string, string> = {
    'spectral-gnn': `## Overview

Spectral Graph Neural Networks leverage the mathematical foundations of spectral graph theory to perform convolutions in the frequency domain of graphs.

## The Problem

Traditional message-passing GNNs suffer from:

- **Over-smoothing**: Node representations become indistinguishable in deep networks
- **Limited receptive field**: Information propagates slowly across the graph
- **Expressivity limitations**: Cannot distinguish certain graph structures

## Mathematical Foundation

The graph Laplacian $L = D - A$ provides the foundation for spectral analysis. Its eigendecomposition $L = U\\Lambda U^T$ gives us:

$$g_\\theta * x = Ug_\\theta(\\Lambda)U^T x$$

where $g_\\theta$ is a learnable spectral filter.

## Implementation

\`\`\`python
import torch
import torch.nn as nn
from torch_geometric.nn import ChebConv

class SpectralGNN(nn.Module):
    def __init__(self, in_channels, hidden_channels, out_channels, K=3):
        super().__init__()
        self.conv1 = ChebConv(in_channels, hidden_channels, K)
        self.conv2 = ChebConv(hidden_channels, hidden_channels, K)
        self.conv3 = ChebConv(hidden_channels, out_channels, K)
        
    def forward(self, x, edge_index):
        x = F.relu(self.conv1(x, edge_index))
        x = F.dropout(x, training=self.training)
        x = F.relu(self.conv2(x, edge_index))
        x = self.conv3(x, edge_index)
        return F.log_softmax(x, dim=1)
\`\`\`

## Results

| Dataset | Accuracy | Improvement |
|---------|----------|-------------|
| Cora    | 94.2%    | +3.1%       |
| Citeseer| 76.8%    | +2.4%       |
| Pubmed  | 89.1%    | +1.8%       |

## Key Insights

The spectral approach allows us to define convolutions that are:

1. **Localized**: Using Chebyshev polynomials for K-hop neighborhoods
2. **Efficient**: Avoiding explicit eigendecomposition
3. **Learnable**: Filters adapt to the task at hand`,

    'graph-rag': `## Overview

GraphRAG combines the power of knowledge graphs with retrieval-augmented generation to provide more accurate and contextual answers.

## Architecture

\`\`\`python
class GraphRAG:
    def __init__(self, graph_store, vector_store, llm):
        self.graph = graph_store
        self.vectors = vector_store
        self.llm = llm
    
    def retrieve(self, query: str) -> Context:
        # Vector similarity for initial candidates
        candidates = self.vectors.search(query, k=10)
        
        # Graph expansion for related entities
        expanded = self.graph.traverse(candidates, depth=2)
        
        return self.rank_and_filter(expanded)
\`\`\`

## The Multi-Hop Problem

Traditional RAG fails on queries like:

> "What companies has the CEO of OpenAI's competitor founded?"

This requires:
1. Identifying OpenAI's competitors
2. Finding CEOs of those companies  
3. Looking up companies those CEOs founded

## Graph-Based Solution

$$\\text{Answer} = \\text{LLM}(q, \\mathcal{G}[\\text{BFS}(v_0, d)])$$

Where $\\mathcal{G}[\\text{BFS}(v_0, d)]$ is the d-hop neighborhood subgraph.`,

    'distributed-pagerank': `## Overview

A scalable implementation of PageRank using the vertex-centric programming model.

## Algorithm

The PageRank update rule:

$$PR(v) = \\frac{1-d}{N} + d \\sum_{u \\in In(v)} \\frac{PR(u)}{|Out(u)|}$$

Where:
- $d$ is the damping factor (typically 0.85)
- $N$ is the total number of nodes
- $In(v)$ is the set of nodes linking to $v$
- $Out(u)$ is the set of nodes $u$ links to

## Implementation in Rust

\`\`\`rust
fn pagerank_iteration(
    graph: &Graph,
    ranks: &mut HashMap<NodeId, f64>,
    damping: f64,
) {
    let n = graph.num_nodes() as f64;
    let base = (1.0 - damping) / n;
    
    let new_ranks: HashMap<NodeId, f64> = graph
        .nodes()
        .par_iter()
        .map(|node| {
            let sum: f64 = graph
                .in_neighbors(node)
                .map(|src| ranks[&src] / graph.out_degree(src) as f64)
                .sum();
            (*node, base + damping * sum)
        })
        .collect();
    
    *ranks = new_ranks;
}
\`\`\`

## Performance

| Edges | Nodes | Time | Cluster Size |
|-------|-------|------|--------------|
| 1B    | 100M  | 12m  | 50 nodes     |
| 10B   | 1B    | 47m  | 100 nodes    |`,
  };
  return contents[slug] || '';
}

function getSampleExperience(): Experience[] {
  return [
    {
      slug: 'graphml-research',
      company: 'AI Research Lab',
      role: 'Research Engineer',
      location: 'San Francisco, CA',
      period: 'Jan 2023 - Present',
      description: 'Leading research on scalable graph neural networks for molecular property prediction.',
      highlights: [
        'Developed novel GNN architecture achieving SOTA on OGB-molhiv benchmark',
        'Published 2 papers at NeurIPS and ICML on graph representation learning',
        'Built distributed training pipeline processing 100M+ molecular graphs',
      ],
      technologies: ['PyTorch', 'PyG', 'JAX', 'CUDA', 'Ray', 'Kubernetes'],
      type: 'full-time',
    },
    {
      slug: 'bigtech-ml',
      company: 'Major Tech Company',
      role: 'Machine Learning Engineer',
      location: 'Seattle, WA',
      period: 'Jun 2021 - Dec 2022',
      description: 'Built production ML systems for graph-based recommendation and fraud detection.',
      highlights: [
        'Designed graph-based fraud detection system serving 10M+ requests/day',
        'Reduced false positive rate by 34% using heterogeneous graph neural networks',
        'Optimized inference latency from 200ms to 15ms through model distillation',
      ],
      technologies: ['TensorFlow', 'GraphSAGE', 'Spark', 'Kubernetes', 'Go'],
      type: 'full-time',
    },
    {
      slug: 'research-intern',
      company: 'University Research Group',
      role: 'Research Intern',
      location: 'Evanston, IL',
      period: 'Summer 2020',
      description: 'Investigated spectral methods for community detection in social networks.',
      highlights: [
        'Implemented spectral clustering for networks with 1M+ nodes',
        'Discovered connection between graph wavelets and community structure',
        'Co-authored paper published in KDD workshop',
      ],
      technologies: ['Python', 'NumPy', 'SciPy', 'NetworkX', 'MATLAB'],
      type: 'internship',
    },
  ];
}

function getSampleClasses(): ClassItem[] {
  return [
    { code: 'CS 396', title: 'Machine Learning with Graphs', institution: 'Northwestern', description: 'Graph neural networks, node embeddings, and knowledge graphs.', tags: ['ML', 'Graphs'], level: 'Graduate' },
    { code: 'CS 349', title: 'Machine Learning', institution: 'Northwestern', description: 'Supervised learning, deep learning, and generalization.', tags: ['ML', 'Math'], level: 'Undergraduate' },
    { code: 'CS 336', title: 'Design and Analysis of Algorithms', institution: 'Northwestern', description: 'Graph algorithms, dynamic programming, NP-completeness.', tags: ['Algorithms', 'Graphs'], level: 'Undergraduate' },
    { code: 'MATH 240', title: 'Linear Algebra', institution: 'Northwestern', description: 'Eigenvalues, spectral theorem, SVD.', tags: ['Math'], level: 'Undergraduate' },
    { code: 'CS 397', title: 'Data Mining', institution: 'Northwestern', description: 'Clustering, recommendation systems, large-scale data processing.', tags: ['Systems', 'ML'], level: 'Graduate' },
    { code: 'IEMS 313', title: 'Optimization', institution: 'Northwestern', description: 'Convex optimization, linear programming.', tags: ['Math', 'Algorithms'], level: 'Undergraduate' },
    { code: 'STAT 320', title: 'Statistical Learning', institution: 'Northwestern', description: 'Bayesian methods, probabilistic models.', tags: ['ML', 'Math'], level: 'Graduate' },
    { code: 'CS 348', title: 'Intro to Artificial Intelligence', institution: 'Northwestern', description: 'Search, planning, probabilistic reasoning.', tags: ['ML'], level: 'Undergraduate' },
    { code: 'CS 339', title: 'Theory of Computation', institution: 'Northwestern', description: 'Automata, computability, complexity.', tags: ['Algorithms'], level: 'Undergraduate' },
    { code: 'CS 345', title: 'Distributed Systems', institution: 'Northwestern', description: 'Consensus, replication, distributed databases.', tags: ['Systems'], level: 'Graduate' },
  ];
}

function getSampleBooks(): ReadingPost[] {
  return [
    {
      slug: 'designing-data-intensive-applications',
      title: 'Designing Data-Intensive Applications',
      date: '2024-02-15',
      sourceLink: 'https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/',
      authors: ['Martin Kleppmann'],
      tags: ['Systems', 'Distributed', 'Databases'],
      summary: 'A comprehensive guide to the principles and practicalities of data systems. Kleppmann masterfully explains the trade-offs between different approaches to storing, processing, and transmitting data.',
      keyInsights: [
        'The CAP theorem is often misunderstood—it is about network partitions, not choosing between consistency and availability in general',
        'Stream processing and batch processing are converging, with tools like Kafka enabling exactly-once semantics',
        'Understanding the internals of databases (LSM trees, B-trees) helps you make better architectural decisions',
      ],
      questionsRemaining: [
        'How will new hardware (persistent memory, CXL) change these trade-offs?',
        'What does the rise of serverless mean for stateful applications?',
      ],
      featured: true,
    },
    {
      slug: 'the-book-of-why',
      title: 'The Book of Why: The New Science of Cause and Effect',
      date: '2024-01-20',
      sourceLink: 'https://www.amazon.com/Book-Why-Science-Cause-Effect/dp/046509760X',
      authors: ['Judea Pearl', 'Dana Mackenzie'],
      tags: ['Causality', 'ML', 'Statistics'],
      summary: 'Pearl presents his ladder of causation and argues that understanding cause-and-effect is essential for true AI. A provocative challenge to the "data-is-enough" mentality.',
      keyInsights: [
        'Correlation does not imply causation, but with the right tools (do-calculus, DAGs) we can infer causation from observational data',
        'The ladder of causation: seeing (association), doing (intervention), imagining (counterfactuals)',
        'Current deep learning is stuck at level 1—it can find patterns but cannot reason about interventions',
      ],
      questionsRemaining: [
        'Can we build causal discovery algorithms that scale to high-dimensional data?',
        'How do we incorporate causal reasoning into neural network architectures?',
      ],
      featured: true,
    },
    {
      slug: 'godel-escher-bach',
      title: 'Gödel, Escher, Bach: An Eternal Golden Braid',
      date: '2023-12-10',
      sourceLink: 'https://www.amazon.com/G%C3%B6del-Escher-Bach-Eternal-Golden/dp/0465026567',
      authors: ['Douglas Hofstadter'],
      tags: ['Math', 'Philosophy', 'Computation'],
      summary: 'A mind-bending exploration of consciousness, self-reference, and the nature of meaning through the lenses of mathematics, art, and music. Dense but rewarding.',
      keyInsights: [
        'Strange loops—hierarchical systems that loop back on themselves—may be key to understanding consciousness',
        'Gödel\'s incompleteness theorems show fundamental limits on formal systems, with deep implications for AI',
        'Isomorphisms between different domains (music, math, art) reveal underlying patterns of meaning',
      ],
      questionsRemaining: [
        'Can artificial systems exhibit genuine strange loops, or only simulate them?',
        'What is the relationship between self-reference and self-awareness?',
      ],
    },
  ];
}

function getSampleLearningPosts(): LearningPost[] {
  return [
    {
      slug: 'attention-is-all-you-need',
      title: 'Deep Dive: Attention Is All You Need',
      date: '2024-02-20',
      tags: ['Transformers', 'NLP', 'Paper'],
      difficulty: 'intermediate',
      prerequisites: ['Linear Algebra', 'Deep Learning Basics'],
      content: `The 2017 paper that launched a thousand models. Let's break down the Transformer architecture piece by piece.

## The Core Innovation

The key insight is that self-attention can replace recurrence entirely:

$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$

This allows parallel computation across sequence positions and direct modeling of long-range dependencies.

## Multi-Head Attention

Instead of single attention, use multiple "heads":

\`\`\`python
class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, num_heads):
        super().__init__()
        self.num_heads = num_heads
        self.d_k = d_model // num_heads
        
        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)
    
    def forward(self, q, k, v, mask=None):
        batch_size = q.size(0)
        
        # Linear projections and reshape
        q = self.W_q(q).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        k = self.W_k(k).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        v = self.W_v(v).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        
        # Attention
        scores = torch.matmul(q, k.transpose(-2, -1)) / math.sqrt(self.d_k)
        if mask is not None:
            scores = scores.masked_fill(mask == 0, -1e9)
        attn = F.softmax(scores, dim=-1)
        
        # Combine heads
        out = torch.matmul(attn, v)
        out = out.transpose(1, 2).contiguous().view(batch_size, -1, self.num_heads * self.d_k)
        return self.W_o(out)
\`\`\`

## Why It Works

Each attention head can learn different types of relationships: syntactic, semantic, positional. The parallelization enables training on massive datasets.`,
      featured: true,
    },
    {
      slug: 'graph-attention-networks',
      title: 'Understanding Graph Attention Networks (GAT)',
      date: '2024-02-05',
      tags: ['GNN', 'Attention', 'Graphs', 'Paper'],
      difficulty: 'advanced',
      prerequisites: ['Graph Theory', 'PyTorch', 'Attention Mechanisms'],
      content: `The GAT paper introduced attention to graph neural networks. Here's how it works and why it matters.

## From GCN to GAT

GCN uses fixed aggregation weights based on node degrees:

$$h_i^{(l+1)} = \\sigma\\left(\\sum_{j \\in \\mathcal{N}(i)} \\frac{1}{\\sqrt{d_i d_j}} W h_j^{(l)}\\right)$$

GAT learns the weights:

$$\\alpha_{ij} = \\frac{\\exp(\\text{LeakyReLU}(a^T[Wh_i || Wh_j]))}{\\sum_{k \\in \\mathcal{N}(i)} \\exp(\\text{LeakyReLU}(a^T[Wh_i || Wh_k]))}$$

## Implementation

\`\`\`python
class GATLayer(nn.Module):
    def __init__(self, in_features, out_features, num_heads=8, concat=True):
        super().__init__()
        self.num_heads = num_heads
        self.concat = concat
        
        self.W = nn.Linear(in_features, out_features * num_heads, bias=False)
        self.a = nn.Parameter(torch.zeros(num_heads, 2 * out_features))
        self.leaky_relu = nn.LeakyReLU(0.2)
        
        nn.init.xavier_uniform_(self.W.weight)
        nn.init.xavier_uniform_(self.a)
    
    def forward(self, x, edge_index):
        h = self.W(x).view(-1, self.num_heads, self.out_features)
        
        src, dst = edge_index
        # Compute attention coefficients
        h_cat = torch.cat([h[src], h[dst]], dim=-1)
        e = self.leaky_relu((h_cat * self.a).sum(-1))
        alpha = softmax(e, dst)  # Normalize per destination node
        
        # Aggregate
        out = scatter(h[src] * alpha.unsqueeze(-1), dst, reduce='sum')
        
        if self.concat:
            return out.view(-1, self.num_heads * self.out_features)
        return out.mean(dim=1)
\`\`\`

## When to Use GAT

GAT shines when neighbor importance varies significantly—social networks, citation graphs, and heterogeneous graphs.`,
      featured: true,
    },
    {
      slug: 'spectral-graph-theory-primer',
      title: 'A Primer on Spectral Graph Theory for ML',
      date: '2024-01-15',
      tags: ['Math', 'Graphs', 'Theory'],
      difficulty: 'advanced',
      prerequisites: ['Linear Algebra', 'Graph Theory', 'Calculus'],
      content: `Understanding spectral properties of graphs is essential for modern GNN design.

## The Graph Laplacian

For an undirected graph $G = (V, E)$ with adjacency matrix $A$:

$$L = D - A$$

where $D$ is the degree matrix. The normalized Laplacian:

$$\\mathcal{L} = I - D^{-1/2}AD^{-1/2}$$

## Key Properties

1. **Eigenvalues**: $0 = \\lambda_1 \\leq \\lambda_2 \\leq ... \\leq \\lambda_n$
2. **Connectivity**: Number of zero eigenvalues = number of connected components
3. **Fiedler value**: $\\lambda_2$ measures algebraic connectivity

## Why This Matters for GNNs

Spectral convolutions operate in the frequency domain:

$$g_\\theta * x = U g_\\theta(\\Lambda) U^T x$$

This view reveals:
- GCN is a first-order approximation of spectral filtering
- Over-smoothing = low-pass filtering removing high-frequency signal
- Skip connections preserve high-frequency information

## Chebyshev Approximation

To avoid expensive eigendecomposition:

$$g_\\theta(\\Lambda) \\approx \\sum_{k=0}^{K} \\theta_k T_k(\\tilde{\\Lambda})$$

This gives K-hop localized filters with $O(K|E|)$ complexity.`,
    },
  ];
}
