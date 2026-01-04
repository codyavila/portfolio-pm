import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Semantic background colors - use CSS variables for theme support
        bg: {
          void: 'var(--bg-void)',
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          elevated: 'var(--bg-elevated)',
          surface: 'var(--bg-surface)',
        },
        // Semantic text colors
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          subtle: 'var(--text-subtle)',
        },
        // Accent colors - use CSS variables for theme adaptability
        accent: {
          'cyan': 'var(--accent-cyan)',
          'cyan-muted': 'var(--accent-cyan-muted)',
          'blue': 'var(--accent-blue)',
          'purple': 'var(--accent-purple)',
          'emerald': 'var(--accent-emerald)',
          'emerald-bright': 'var(--accent-emerald-bright)',
          'amber': 'var(--accent-amber)',
        },
        // Glass/UI colors
        glass: {
          bg: 'var(--glass-bg)',
          border: 'var(--glass-border)',
          'border-hover': 'var(--glass-border-hover)',
        },
        // Glow effects
        glow: {
          emerald: 'var(--glow-emerald)',
          cyan: 'var(--glow-cyan)',
        },
        // Keep slate scale for utility but prefer semantic colors
        slate: {
          950: '#0a0a0f',
          900: '#0d0d14',
          850: '#12121a',
          800: '#16161f',
          700: '#1e1e2a',
          600: '#2a2a3a',
          500: '#404050',
          400: '#606078',
          300: '#9090a8',
          200: '#b8b8c8',
          100: '#e0e0e8',
          50: '#f8f8fc',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'JetBrains Mono', 'monospace'],
      },
      lineHeight: {
        relaxed: '1.6',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px var(--glow-emerald)' },
          '50%': { boxShadow: '0 0 40px var(--glow-cyan)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.25, 0.4, 0.25, 1)',
      },
    },
  },
  plugins: [],
}

export default config
