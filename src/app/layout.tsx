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
  metadataBase: new URL('https://justinsortland.github.io'),
  title: {
    default: 'Justin Sortland | Software Engineer',
    template: '%s | Justin Sortland',
  },
  description: 'Portfolio of Justin Sortland — Northwestern CS, full-stack engineer building applied-AI, ML, and data-driven products.',
  keywords: ['software engineering', 'machine learning', 'applied AI', 'full-stack', 'Next.js', 'Python', 'Northwestern'],
  authors: [{ name: 'Justin Sortland' }],
  creator: 'Justin Sortland',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://justinsortland.github.io',
    siteName: 'Justin Sortland',
    title: 'Justin Sortland | Software Engineer',
    description: 'Full-stack engineer building applied-AI, ML, and data-driven products. Northwestern CS.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Justin Sortland — Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Justin Sortland | Software Engineer',
    description: 'Full-stack engineer building applied-AI, ML, and data-driven products. Northwestern CS.',
    images: ['/og-image.png'],
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
      className={`dark ${GeistSans.variable} ${GeistMono.variable} ${spaceGrotesk.variable}`}
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
