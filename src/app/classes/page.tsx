'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { classes } from '@/data/classes';

const topicFilters = ['All', 'Systems', 'Distributed', 'Networking', 'Algorithms', 'Theory', 'ML', 'Deep Learning', 'Math', 'Probability'];
const levelFilters = ['All', 'Undergraduate', 'Graduate', 'PhD'];

const institutionLogos: Record<string, string> = {
  'Northwestern University': '/images/institutions/northwestern.svg',
};

export default function ClassesPage() {
  const [topicFilter, setTopicFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClasses = useMemo(() => {
    return classes.filter((c) => {
      const matchesTopic = topicFilter === 'All' || c.tags.includes(topicFilter);
      const matchesLevel = levelFilter === 'All' || c.level === levelFilter;
      const matchesSearch =
        searchQuery === '' ||
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
            Northwestern University — the academic foundations that shaped how I think about systems,
            algorithms, and machine learning.
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
                {topicFilters.map((filter) => (
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
                {levelFilters.map((filter) => (
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
                <span
                  className={`tag shrink-0 ${
                    classItem.level === 'Graduate'
                      ? 'tag-violet'
                      : classItem.level === 'PhD'
                      ? 'tag-amber'
                      : ''
                  }`}
                >
                  {classItem.level}
                </span>
              </div>

              <p className="text-graph-400 mb-4">{classItem.description}</p>

              {classItem.takeaways && classItem.takeaways.length > 0 && (
                <ul className="space-y-1.5 mb-4">
                  {classItem.takeaways.map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-graph-500">
                      <span className="text-accent mt-0.5 shrink-0">▹</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {classItem.tags.map((tag) => (
                    <span key={tag} className="tag-accent text-2xs">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {institutionLogos[classItem.institution] && (
                    <div className="relative w-5 h-5 rounded overflow-hidden bg-white flex items-center justify-center">
                      <Image
                        src={institutionLogos[classItem.institution]}
                        alt={classItem.institution}
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    </div>
                  )}
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
