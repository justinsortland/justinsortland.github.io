const LINKS = [
  {
    label: 'Email',
    value: 'justinsortland@u.northwestern.edu',
    href: 'mailto:justinsortland@u.northwestern.edu',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/justinsortland',
    href: 'https://github.com/justinsortland',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/justinsortland',
    href: 'https://linkedin.com/in/justinsortland',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Resume',
    value: 'PDF download',
    href: '/resume.pdf',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-graph-900 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-accent/5 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-gradient-radial from-violet/5 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-sm text-accent font-medium font-mono">Open to opportunities</span>
          </div>

          <h2 className="section-title">Get In Touch</h2>
          <p className="text-graph-300 text-lg leading-relaxed mb-12 max-w-lg mx-auto">
            I&apos;m actively looking for full-time SWE and applied-AI engineering roles.
            Whether it&apos;s an opportunity, a project, or just a chat — reach out.
          </p>

          {/* Contact links */}
          <div className="grid sm:grid-cols-2 gap-3 max-w-xl mx-auto">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="flex items-center gap-4 p-4 rounded-xl glass-card
                           hover:border-accent/40 hover:bg-accent/5
                           transition-all duration-200 text-left group"
              >
                <div className="w-10 h-10 rounded-lg bg-graph-700/50 flex items-center justify-center
                                text-graph-400 group-hover:text-accent transition-colors shrink-0">
                  {link.icon}
                </div>
                <div>
                  <p className="text-xs font-mono text-graph-500 mb-0.5">{link.label}</p>
                  <p className="text-sm text-graph-200 group-hover:text-accent transition-colors font-medium">
                    {link.value}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <p className="mt-10 text-xs font-mono text-graph-600 uppercase tracking-widest">
            Chicago, IL · Open to remote
          </p>
        </div>
      </div>
    </section>
  );
}
