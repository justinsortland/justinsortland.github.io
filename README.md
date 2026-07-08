# Graph Portfolio

A premium personal portfolio website with an AI/Graph Theory/ML aesthetic. Built with Next.js 14, TypeScript, Tailwind CSS, and MDX.

![Graph Portfolio](./public/og-image.png)

## Features

- 🎨 **Premium Dark Theme** - Research lab aesthetic with subtle neon accents
- 📊 **Animated Graph Background** - Canvas-based network visualization
- 📝 **MDX Blog** - Two blog types: Readings (paper reviews) and Learning (tutorials)
- 🔍 **Full-text Search** - Client-side search with MiniSearch
- 📡 **RSS Feed** - Auto-generated RSS for blog posts
- 🧮 **LaTeX Support** - KaTeX for mathematical notation
- 💻 **Code Highlighting** - Shiki-powered syntax highlighting
- 🌗 **Theme Toggle** - Dark/light mode support
- ♿ **Accessible** - ARIA labels, skip-to-content, keyboard nav
- 📱 **Responsive** - Mobile-first design
- ⚡ **Fast** - Static generation, optimized images

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/graph-portfolio.git
cd graph-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
graph-portfolio/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Homepage
│   │   ├── projects/          # Projects pages
│   │   ├── experience/        # Experience page
│   │   ├── classes/           # Coursework page
│   │   ├── blog/              # Blog pages
│   │   │   ├── readings/      # Paper reviews
│   │   │   └── learning/      # Tutorials
│   │   ├── about/             # About/Now page
│   │   └── rss.xml/           # RSS feed route
│   ├── components/            # React components
│   │   ├── sections/          # Homepage sections
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── GraphBackground.tsx
│   │   └── ...
│   ├── content/               # MDX content (if using files)
│   │   ├── projects/
│   │   ├── readings/
│   │   └── learning/
│   └── lib/                   # Utilities
│       ├── content.ts         # Content loading
│       ├── types.ts           # TypeScript types
│       ├── search.ts          # Search utilities
│       └── rss.ts             # RSS generation
├── public/                    # Static assets
├── tailwind.config.ts         # Tailwind configuration
├── next.config.mjs            # Next.js configuration
└── package.json
```

## Customization

### Personal Information

Update the following files with your information:

1. **`src/app/layout.tsx`** - Site metadata (title, description, social links)
2. **`src/components/Header.tsx`** - Navigation logo initials
3. **`src/components/Footer.tsx`** - Footer links and social profiles
4. **`src/components/sections/HeroSection.tsx`** - Name, tagline, bio
5. **`src/components/sections/ContactSection.tsx`** - Contact information
6. **`src/app/about/page.tsx`** - About page content

### Colors and Theme

Edit `tailwind.config.ts` to customize:

```typescript
colors: {
  graph: { /* Background grays */ },
  accent: { /* Primary accent (cyan by default) */ },
  violet: { /* Secondary accent */ },
  amber: { /* Tertiary accent */ },
}
```

### Content

See [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) for detailed instructions on adding:
- Projects
- Experience entries
- Blog posts (Readings & Learning)
- Coursework

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms

```bash
# Build static export
npm run build

# The output is in .next/ - deploy to any static host
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX with gray-matter
- **Math**: KaTeX
- **Code**: Shiki (via rehype-pretty-code)
- **Search**: MiniSearch
- **RSS**: rss package
- **Fonts**: Geist Sans, Geist Mono, Space Grotesk

## Performance Tips

1. **Images**: Use Next.js `<Image>` component
2. **Fonts**: Already optimized with `next/font`
3. **Code Splitting**: Automatic with App Router
4. **Static Generation**: Most pages are statically generated

## Accessibility

- Skip-to-content link
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Reduced motion support (`prefers-reduced-motion`)
- Color contrast meets WCAG AA

## License

MIT License - feel free to use this for your own portfolio!

## Credits

Design inspired by [kevindw.dev](https://www.kevindw.dev/) with a custom AI/Graph Theory aesthetic.
