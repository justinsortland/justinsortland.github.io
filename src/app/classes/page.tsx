'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';

const topicFilters = ['All', 'ML', 'Graphs', 'Math', 'Systems', 'Algorithms'];
const levelFilters = ['All', 'Undergraduate', 'Graduate', 'PhD'];

// Institution logo mapping
const institutionLogos: Record<string, string> = {
  'Northwestern': '/images/institutions/northwestern.svg',
  'Stanford': '/images/institutions/stanford.svg',
  'MIT': '/images/institutions/mit.svg',
};

interface ClassItem {
  code: string;
  title: string;
  institution: string;
  description: string;
  tags: string[];
  level: string;
}

const classes: ClassItem[] = [
  { code: 'CS 396', title: 'Machine Learning with Graphs', institution: 'Northwestern', description: 'Graph neural networks, node embeddings, knowledge graphs, and their applications to social networks and molecules.', tags: ['ML', 'Graphs'], level: 'Graduate' },
  { code: 'CS 349', title: 'Machine Learning', institution: 'Northwestern', description: 'Supervised learning, deep learning, generalization theory, and neural network optimization.', tags: ['ML', 'Math'], level: 'Undergraduate' },
  { code: 'CS 336', title: 'Design and Analysis of Algorithms', institution: 'Northwestern', description: 'Divide and conquer, graph algorithms, greedy algorithms, dynamic programming, NP-completeness.', tags: ['Algorithms', 'Graphs'], level: 'Undergraduate' },
  { code: 'MATH 240', title: 'Linear Algebra', institution: 'Northwestern', description: 'Vector spaces, linear transformations, eigenvalues, spectral theorem, SVD decomposition.', tags: ['Math'], level: 'Undergraduate' },
  { code: 'CS 397', title: 'Data Mining', institution: 'Northwestern', description: 'Clustering, recommendation systems, association rules, and large-scale data processing.', tags: ['Systems', 'ML'], level: 'Graduate' },
  { code: 'IEMS 313', title: 'Optimization', institution: 'Northwestern', description: 'Convex optimization, linear programming, approximation algorithms, and algorithmic game theory.', tags: ['Math', 'Algorithms'], level: 'Undergraduate' },
  { code: 'STAT 320', title: 'Statistical Learning', institution: 'Northwestern', description: 'Bayesian networks, probabilistic graphical models, and statistical inference.', tags: ['ML', 'Math'], level: 'Graduate' },
  { code: 'CS 348', title: 'Intro to Artificial Intelligence', institution: 'Northwestern', description: 'Search algorithms, planning, probabilistic reasoning, and knowledge representation.', tags: ['ML'], level: 'Undergraduate' },
  { code: 'CS 339', title: 'Theory of Computation', institution: 'Northwestern', description: 'Automata theory, computability, complexity classes, and P vs NP.', tags: ['Algorithms'], level: 'Undergraduate' },
  { code: 'CS 345', title: 'Distributed Systems', institution: 'Northwestern', description: 'Consensus protocols, replication, distributed databases, and fault tolerance.', tags: ['Systems'], level: 'Graduate' },
];

export default function ClassesPage() {
  const [topicFilter, setTopicFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClasses = useMemo(() => {
    return classes.filter(c => {
      const matchesTopic = topicFilter === 'All' || c.tags.includes(topicFilter);
      const matchesLevel = levelFilter === 'All' || c.level === levelFilter;
      const matchesSearch = searchQuery === '' || 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTopic && matchesLevel && matchesSearch;
    });
  }, [topicFilter, levelFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-graph-900 pt-24 pb-16">
      <div className="section-container">
        <div className="mb-12">
          <h1 className="section-title">Coursework</h1>
          <p className="section-subtitle">
            The academic foundations that shaped my understanding of computation and mathematics.
          </p>
        </div>

        {/* Filters */}
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-graph-300 mb-2">
                Search
              </label>
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, code, or description..."
                className="input"
              />
            </div>

            {/* Topic filter */}
            <div>
              <label className="block text-sm font-medium text-graph-300 mb-2">Topic</label>
              <div className="flex flex-wrap gap-2">
                {topicFilters.map(filter => (
                  <button
                    key={filter}
                    onClick={() => setTopicFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      topicFilter === filter
                        ? 'bg-accent text-graph-900'
                        : 'bg-graph-700/50 text-graph-300 hover:bg-graph-700'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Level filter */}
            <div>
              <label className="block text-sm font-medium text-graph-300 mb-2">Level</label>
              <div className="flex flex-wrap gap-2">
                {levelFilters.map(filter => (
                  <button
                    key={filter}
                    onClick={() => setLevelFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      levelFilter === filter
                        ? 'bg-violet text-white'
                        : 'bg-graph-700/50 text-graph-300 hover:bg-graph-700'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-graph-400 mb-6">
          Showing {filteredClasses.length} of {classes.length} courses
        </p>

        {/* Classes grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredClasses.map((classItem) => (
            <div
              key={classItem.code}
              className="glass-card p-6 hover:border-accent/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="font-mono text-sm text-accent">{classItem.code}</span>
                  <h2 className="font-display text-xl font-semibold text-graph-100">
                    {classItem.title}
                  </h2>
                </div>
                <span className={`tag shrink-0 ${
                  classItem.level === 'Graduate' ? 'tag-violet' : 
                  classItem.level === 'PhD' ? 'tag-amber' : ''
                }`}>
                  {classItem.level}
                </span>
              </div>
              
              <p className="text-graph-400 mb-4">{classItem.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {classItem.tags.map((tag) => (
                    <span key={tag} className="tag-accent text-2xs">{tag}</span>
                  ))}
                </div>
                
                {/* Institution with logo */}
                <div className="flex items-center gap-2">
                  <div className="relative w-5 h-5 rounded overflow-hidden bg-white flex items-center justify-center">
                    {institutionLogos[classItem.institution] ? (
                      <Image
                        src={institutionLogos[classItem.institution]}
                        alt={classItem.institution}
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    ) : (
                      <span className="text-2xs font-bold text-graph-900">
                        {classItem.institution.charAt(0)}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-graph-500">{classItem.institution}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredClasses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-graph-400">No courses match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
