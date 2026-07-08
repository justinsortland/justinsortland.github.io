'use client';

import Link from 'next/link';
import Image from 'next/image';
import { GraphBackground } from '@/components/GraphBackground';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/yourusername',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/yourusername',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/yourhandle',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Google Scholar',
    href: 'https://scholar.google.com/citations?user=yourid',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
      </svg>
    ),
  },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-graph-900" />
      <div className="absolute inset-0 bg-gradient-to-b from-graph-900 via-graph-900/95 to-graph-900" />
      <GraphBackground />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Radial gradient accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-accent/10 via-transparent to-transparent blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-violet/10 via-transparent to-transparent blur-3xl" />

      {/* Content */}
      <div className="relative z-10 section-container py-32 md:py-40">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Profile Picture */}
          <div className="shrink-0 animate-fade-in">
            <div className="relative">
              {/* Glow effect behind image */}
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/20 via-violet/20 to-accent/20 rounded-full blur-2xl" />
              
              {/* Profile image container */}
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-accent/30 shadow-glow">
                {/* Placeholder - replace src with your actual image */}
                <Image
                  src="/images/profile-placeholder.svg"
                  alt="Justin Sortland"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Fallback gradient if image doesn't load */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-violet/20 to-graph-800 flex items-center justify-center">
                  <span className="font-display text-6xl font-bold text-graph-100/80">JS</span>
                </div>
              </div>
              
              {/* Decorative ring */}
              <div className="absolute -inset-2 border border-accent/20 rounded-full" />
              <div className="absolute -inset-4 border border-accent/10 rounded-full" />
            </div>
          </div>

          {/* Text content */}
          <div className="text-center lg:text-left">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30 mb-8 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-sm text-accent font-medium">Open to opportunities</span>
            </div>

            {/* Name */}
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-graph-100 mb-6 animate-fade-up">
              Justin Sortland
            </h1>

            {/* Tagline */}
            <p className="text-2xl md:text-3xl lg:text-4xl font-display font-medium text-graph-300 mb-6 animate-fade-up animation-delay-100">
              <span className="text-gradient">Graph-minded</span> ML builder
            </p>

            {/* Bio */}
            <p className="text-lg md:text-xl text-graph-400 max-w-2xl mb-10 leading-relaxed animate-fade-up animation-delay-200">
              Exploring the intersection of graph neural networks, mathematical optimization, 
              and distributed systems. Currently obsessed with spectral methods and 
              message-passing algorithms.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-12 animate-fade-up animation-delay-300">
              <Link href="/projects" className="btn-primary">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                View Projects
              </Link>
              <Link href="/blog" className="btn-secondary">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Read Blog
              </Link>
            </div>

            {/* Social links */}
            <div className="flex items-center justify-center lg:justify-start gap-4 animate-fade-up animation-delay-400">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-graph-800/50 border border-graph-700/50 text-graph-400 
                           hover:text-accent hover:border-accent/50 hover:bg-accent/10 
                           transition-all duration-200"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="flex flex-col items-center gap-2 text-graph-500">
          <span className="text-xs font-medium uppercase tracking-wider">Scroll</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
