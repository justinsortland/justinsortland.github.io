import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Core palette - research lab aesthetic
        graph: {
          900: '#0a0a0f',
          800: '#111118',
          700: '#1a1a24',
          600: '#252532',
          500: '#363648',
          400: '#525268',
          300: '#8888a0',
          200: '#b8b8cc',
          100: '#e8e8f0',
          50: '#f4f4f8',
        },
        // Accent - subtle neon cyan
        accent: {
          DEFAULT: '#00d4ff',
          dim: '#00a8cc',
          glow: '#00d4ff40',
          subtle: '#00d4ff15',
        },
        // Secondary accent - violet
        violet: {
          DEFAULT: '#a855f7',
          dim: '#7c3aed',
          glow: '#a855f740',
          subtle: '#a855f715',
        },
        // Tertiary - warm accent
        amber: {
          DEFAULT: '#f59e0b',
          dim: '#d97706',
          glow: '#f59e0b40',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid-pattern': `linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)`,
        'dot-pattern': `radial-gradient(rgba(0, 212, 255, 0.15) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid-40': '40px 40px',
        'dot-20': '20px 20px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'slide-in-panel': 'slideInPanel 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInPanel: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.1)' },
          '100%': { boxShadow: '0 0 30px rgba(0, 212, 255, 0.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(0, 212, 255, 0.1)',
        'glow': '0 0 20px rgba(0, 212, 255, 0.15)',
        'glow-lg': '0 0 40px rgba(0, 212, 255, 0.2)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'var(--tw-prose-body)',
            a: {
              color: '#00d4ff',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            code: {
              backgroundColor: 'rgba(0, 212, 255, 0.1)',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            pre: {
              backgroundColor: '#111118',
              border: '1px solid rgba(0, 212, 255, 0.1)',
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': '#b8b8cc',
            '--tw-prose-headings': '#e8e8f0',
            '--tw-prose-lead': '#8888a0',
            '--tw-prose-links': '#00d4ff',
            '--tw-prose-bold': '#e8e8f0',
            '--tw-prose-counters': '#8888a0',
            '--tw-prose-bullets': '#525268',
            '--tw-prose-hr': '#252532',
            '--tw-prose-quotes': '#b8b8cc',
            '--tw-prose-quote-borders': '#00d4ff',
            '--tw-prose-captions': '#8888a0',
            '--tw-prose-code': '#e8e8f0',
            '--tw-prose-pre-code': '#b8b8cc',
            '--tw-prose-pre-bg': '#111118',
            '--tw-prose-th-borders': '#363648',
            '--tw-prose-td-borders': '#252532',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
