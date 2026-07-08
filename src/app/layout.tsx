import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SkipToContent } from '@/components/SkipToContent';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Justin Sortland | Graph-minded ML Builder',
    template: '%s | Justin Sortland',
  },
  description: 'Personal portfolio of Justin Sortland - exploring the intersection of graph theory, machine learning, and mathematical optimization.',
  keywords: ['machine learning', 'graph theory', 'AI', 'mathematics', 'software engineering', 'neural networks'],
  authors: [{ name: 'Justin Sortland' }],
  creator: 'Justin Sortland',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yoursite.com',
    siteName: 'Justin Sortland',
    title: 'Justin Sortland | Graph-minded ML Builder',
    description: 'Exploring the intersection of graph theory, machine learning, and mathematical optimization.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Justin Sortland - Graph-minded ML Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Justin Sortland | Graph-minded ML Builder',
    description: 'Exploring the intersection of graph theory, machine learning, and mathematical optimization.',
    images: ['/og-image.png'],
    creator: '@yourhandle',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${GeistSans.variable} ${GeistMono.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0a0a0f" />
      </head>
      <body className="min-h-screen bg-graph-900 font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SkipToContent />
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
