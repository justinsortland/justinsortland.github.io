'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topicFilters = ['All', 'ML', 'Graphs', 'Math', 'Systems', 'Algorithms'];

interface ClassItem {
  code: string;
  title: string;
  institution: string;
  description: string;
  tags: string[];
  level: string;
}

const sampleClasses: ClassItem[] = [
  {
    code: 'CS 224W',
    title: 'Machine Learning with Graphs',
    institution: 'Stanford',
    description: 'Graph neural networks, node embeddings, knowledge graphs.',
    tags: ['ML', 'Graphs'],
    level: 'Graduate',
  },
  {
    code: 'CS 229',
    title: 'Machine Learning',
    institution: 'Stanford',
    description: 'Supervised learning, deep learning, generalization theory.',
    tags: ['ML', 'Math'],
    level: 'Graduate',
  },
  {
    code: 'CS 161',
    title: 'Design and Analysis of Algorithms',
    institution: 'Stanford',
    description: 'Graph algorithms, dynamic programming, NP-completeness.',
    tags: ['Algorithms', 'Graphs'],
    level: 'Undergraduate',
  },
  {
    code: 'MATH 113',
    title: 'Linear Algebra and Matrix Theory',
    institution: 'Stanford',
    description: 'Eigenvalues, spectral theorem, SVD decomposition.',
    tags: ['Math'],
    level: 'Undergraduate',
  },
  {
    code: 'CS 246',
    title: 'Mining Massive Datasets',
    institution: 'Stanford',
    description: 'MapReduce, locality-sensitive hashing, recommendation systems.',
    tags: ['Systems', 'ML'],
    level: 'Graduate',
  },
  {
    code: 'CS 261',
    title: 'Optimization and Algorithmic Paradigms',
    institution: 'Stanford',
    description: 'Convex optimization, linear programming, approximation algorithms.',
    tags: ['Math', 'Algorithms'],
    level: 'Graduate',
  },
];

export function ClassesSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredClasses, setFilteredClasses] = useState(sampleClasses);

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredClasses(sampleClasses);
    } else {
      setFilteredClasses(
        sampleClasses.filter((c) => c.tags.includes(activeFilter))
      );
    }
  }, [activeFilter]);

  return (
    <section id="classes" className="py-24 md:py-32 bg-graph-800/30 relative">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div>
            <h2 className="section-title">Coursework</h2>
            <p className="section-subtitle mb-0">
              Foundations that shaped my understanding of computation
            </p>
          </div>
          <Link href="/classes" className="btn-ghost shrink-0">
            View all classes
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {topicFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-accent text-graph-900'
                  : 'bg-graph-700/50 text-graph-300 hover:text-graph-100 hover:bg-graph-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Classes grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClasses.map((classItem) => (
            <div
              key={classItem.code}
              className="glass-card p-5 hover:border-accent/30 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <span className="font-mono text-sm text-accent">{classItem.code}</span>
                  <h3 className="font-display font-semibold text-graph-100 group-hover:text-accent transition-colors">
                    {classItem.title}
                  </h3>
                </div>
                <span className="tag text-2xs shrink-0">{classItem.level}</span>
              </div>
              
              <p className="text-sm text-graph-400 mb-4">{classItem.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {classItem.tags.map((tag) => (
                    <span key={tag} className="tag-accent text-2xs">{tag}</span>
                  ))}
                </div>
                <span className="text-xs text-graph-500">{classItem.institution}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
