import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-graph-900 flex items-center justify-center">
      <div className="text-center px-4">
        <div className="mb-8">
          <svg 
            className="w-32 h-32 mx-auto text-graph-700"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            {/* Disconnected graph nodes */}
            <circle cx="30" cy="30" r="8" className="fill-accent/20 stroke-accent" />
            <circle cx="70" cy="25" r="6" className="fill-violet/20 stroke-violet" />
            <circle cx="50" cy="60" r="10" className="fill-graph-600 stroke-graph-500" />
            <circle cx="20" cy="75" r="5" className="fill-graph-600 stroke-graph-500" />
            <circle cx="80" cy="70" r="7" className="fill-graph-600 stroke-graph-500" />
            
            {/* Broken edges */}
            <line x1="30" y1="30" x2="40" y2="45" strokeDasharray="4" className="stroke-graph-600" />
            <line x1="60" y1="55" x2="70" y2="25" strokeDasharray="4" className="stroke-graph-600" />
          </svg>
        </div>
        
        <h1 className="font-display text-6xl font-bold text-graph-100 mb-4">404</h1>
        <p className="text-xl text-graph-400 mb-8">
          This node doesn't exist in the graph.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            Return Home
          </Link>
          <Link href="/projects" className="btn-secondary">
            View Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
