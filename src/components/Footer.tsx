import Link from 'next/link';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/justinsortland',
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
    href: 'https://linkedin.com/in/justinsortland',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const footerLinks = [
  {
    title: 'Portfolio',
    links: [
      { name: 'Projects', href: '/#projects' },
      { name: 'Experience', href: '/#experience' },
      { name: 'Classes', href: '/#classes' },
      { name: 'Skills', href: '/#skills' },
      { name: 'Contact', href: '/#contact' },
    ],
  },
  {
    title: 'Links',
    links: [
      { name: 'GitHub', href: 'https://github.com/justinsortland' },
      { name: 'LinkedIn', href: 'https://linkedin.com/in/justinsortland' },
      { name: 'Email', href: 'mailto:justinsortland@u.northwestern.edu' },
      { name: 'Resume', href: '/resume.pdf' },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-graph-700/50 bg-graph-900/50">
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-violet flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-graph-900"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="3" />
                  <circle cx="4" cy="8" r="2" />
                  <circle cx="20" cy="8" r="2" />
                  <circle cx="4" cy="16" r="2" />
                  <circle cx="20" cy="16" r="2" />
                  <line x1="6" y1="8" x2="9" y2="10" />
                  <line x1="18" y1="8" x2="15" y2="10" />
                  <line x1="6" y1="16" x2="9" y2="14" />
                  <line x1="18" y1="16" x2="15" y2="14" />
                </svg>
              </div>
              <span className="font-display font-bold text-lg text-graph-100">
                Justin Sortland
              </span>
            </Link>
            <p className="text-sm text-graph-400 mb-6">
              Full-stack engineer building applied-AI, ML, and data-driven products.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-graph-400 hover:text-accent hover:bg-accent/10 transition-colors"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="font-display font-semibold text-graph-200 mb-4">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-graph-400 hover:text-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-graph-700/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-graph-500">
            © {currentYear} Justin Sortland. Built with Next.js and a lot of ☕
          </p>
          <p className="text-sm text-graph-500">
            <span className="inline-flex items-center gap-1">
              Powered by graphs
              <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="2" />
                <circle cx="6" cy="6" r="1.5" />
                <circle cx="18" cy="6" r="1.5" />
                <circle cx="6" cy="18" r="1.5" />
                <circle cx="18" cy="18" r="1.5" />
                <line x1="7.5" y1="7.5" x2="10" y2="10" />
                <line x1="16.5" y1="7.5" x2="14" y2="10" />
                <line x1="7.5" y1="16.5" x2="10" y2="14" />
                <line x1="16.5" y1="16.5" x2="14" y2="14" />
              </svg>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
