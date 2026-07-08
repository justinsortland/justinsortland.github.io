import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Justin Sortland - graph-minded ML builder exploring AI and mathematical optimization.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-graph-900 pt-24 pb-16">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          {/* Profile header */}
          <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
            <div className="relative w-32 h-32 rounded-2xl overflow-hidden border border-graph-700 shrink-0">
              <Image
                src="/images/profile-placeholder.svg"
                alt="Justin Sortland"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-violet/20 to-accent/20 flex items-center justify-center">
                <span className="font-display text-4xl font-bold text-gradient">JS</span>
              </div>
            </div>
            <div>
              <h1 className="font-display text-4xl font-bold text-graph-100 mb-2">Justin Sortland</h1>
              <p className="text-xl text-accent mb-4">Graph-minded ML Builder</p>
              <p className="text-graph-400 leading-relaxed">
                I'm a researcher and engineer fascinated by the structure hidden in data. 
                My work sits at the intersection of graph theory, machine learning, and 
                distributed systems.
              </p>
            </div>
          </div>

          {/* About section */}
          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold text-graph-100 mb-6">About Me</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-graph-300 leading-relaxed mb-4">
                I believe that understanding relationships—edges in graphs, dependencies in systems, 
                connections in networks—is the key to building intelligent systems that actually work. 
                This belief has guided my work from academic research to production ML systems.
              </p>
              <p className="text-graph-300 leading-relaxed mb-4">
                My journey started with a fascination for algorithms and a love for elegant mathematical 
                structures. During my studies, I fell in love with spectral graph theory—the idea that 
                you can understand a graph by listening to its frequencies is still magical to me.
              </p>
              <p className="text-graph-300 leading-relaxed">
                Today, I apply these ideas to real-world problems: building GNNs for molecular property 
                prediction, designing fraud detection systems that think in graphs, and scaling message-passing 
                algorithms to billion-edge networks.
              </p>
            </div>
          </section>

          {/* Now section */}
          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold text-graph-100 mb-6 flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
              </span>
              Now
            </h2>
            <p className="text-sm text-graph-500 mb-6">Last updated: February 2024</p>
            
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="font-display font-semibold text-graph-100 mb-3">🔬 Currently Working On</h3>
                <ul className="space-y-2 text-graph-400">
                  <li className="flex items-start gap-2">
                    <span className="text-accent">→</span>
                    Developing a new architecture for long-range dependencies in GNNs
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">→</span>
                    Building an open-source library for scalable graph algorithms in Rust
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">→</span>
                    Writing a series of blog posts on spectral graph theory for ML practitioners
                  </li>
                </ul>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-display font-semibold text-graph-100 mb-3">📚 Reading Queue</h3>
                <ul className="space-y-2 text-graph-400">
                  <li className="flex items-start gap-2">
                    <span className="text-violet">•</span>
                    "Geometric Deep Learning" by Bronstein et al.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-violet">•</span>
                    Recent papers on graph transformers and their scalability
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-violet">•</span>
                    "Designing Data-Intensive Applications" (re-reading)
                  </li>
                </ul>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-display font-semibold text-graph-100 mb-3">🎯 Learning Goals This Year</h3>
                <ul className="space-y-2 text-graph-400">
                  <li className="flex items-start gap-2">
                    <span className="text-amber">•</span>
                    Deepen understanding of category theory and its applications to ML
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber">•</span>
                    Master Rust for high-performance graph algorithms
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber">•</span>
                    Explore connections between optimal transport and graph matching
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold text-graph-100 mb-6">What I Value</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <h3 className="font-display font-semibold text-accent mb-2">Clarity over Complexity</h3>
                <p className="text-sm text-graph-400">
                  The best solutions are often the simplest. I strive to make complex ideas accessible.
                </p>
              </div>
              <div className="glass-card p-6">
                <h3 className="font-display font-semibold text-violet mb-2">Theory meets Practice</h3>
                <p className="text-sm text-graph-400">
                  I love the dance between mathematical elegance and engineering pragmatism.
                </p>
              </div>
              <div className="glass-card p-6">
                <h3 className="font-display font-semibold text-amber mb-2">Open Science</h3>
                <p className="text-sm text-graph-400">
                  Knowledge should be shared. I try to open-source my work and write about what I learn.
                </p>
              </div>
              <div className="glass-card p-6">
                <h3 className="font-display font-semibold text-green-400 mb-2">Continuous Learning</h3>
                <p className="text-sm text-graph-400">
                  The field moves fast. Staying curious and humble is essential.
                </p>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="text-center">
            <p className="text-graph-400 mb-4">Want to collaborate or chat about graphs?</p>
            <Link href="/#contact" className="btn-primary">
              Get in Touch
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
