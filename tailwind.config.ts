import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core brand palette
        background: {
          DEFAULT: '#0B0B0D',
          surface: '#111214',
          secondary: '#18191C',
        },
        primary: {
          DEFAULT: '#D4AF37',
          50: '#FDF9E7',
          100: '#FAF1C3',
          200: '#F5E38A',
          300: '#EDD04A',
          400: '#D4AF37',
          500: '#B8922A',
          600: '#956F1E',
          700: '#744F15',
          800: '#573810',
          900: '#3A240A',
          foreground: '#0B0B0D',
        },
        accent: {
          DEFAULT: '#3B82F6',
          foreground: '#FFFFFF',
        },
        success: {
          DEFAULT: '#10B981',
          foreground: '#FFFFFF',
        },
        error: {
          DEFAULT: '#EF4444',
          foreground: '#FFFFFF',
        },
        // Text
        foreground: '#FFFFFF',
        muted: {
          DEFAULT: '#18191C',
          foreground: '#A1A1AA',
        },
        border: 'rgba(255,255,255,0.08)',
        ring: '#D4AF37',
        card: {
          DEFAULT: '#111214',
          foreground: '#FFFFFF',
        },
        popover: {
          DEFAULT: '#18191C',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#18191C',
          foreground: '#A1A1AA',
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FFFFFF',
        },
        input: '#18191C',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        geist: ['var(--font-geist)', 'system-ui', 'sans-serif'],
        jakarta: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.05' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        normal: '0',
        wide: '0.04em',
        wider: '0.08em',
        widest: '0.16em',
      },
      borderRadius: {
        none: '0',
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0,0,0,0.4)',
        DEFAULT: '0 1px 3px 0 rgba(0,0,0,0.5), 0 1px 2px -1px rgba(0,0,0,0.5)',
        md: '0 4px 6px -1px rgba(0,0,0,0.5), 0 2px 4px -2px rgba(0,0,0,0.5)',
        lg: '0 10px 15px -3px rgba(0,0,0,0.5), 0 4px 6px -4px rgba(0,0,0,0.5)',
        xl: '0 20px 25px -5px rgba(0,0,0,0.6), 0 8px 10px -6px rgba(0,0,0,0.6)',
        '2xl': '0 25px 50px -12px rgba(0,0,0,0.7)',
        glow: '0 0 20px rgba(212,175,55,0.3)',
        'glow-sm': '0 0 10px rgba(212,175,55,0.2)',
        'glow-lg': '0 0 40px rgba(212,175,55,0.4)',
        'glow-blue': '0 0 20px rgba(59,130,246,0.3)',
        inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.5)',
        none: 'none',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #F5E380 50%, #B8922A 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0B0B0D 0%, #111214 100%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'fade-down': 'fadeDown 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'slide-in-left': 'slideInLeft 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'ticker': 'ticker 30s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(212,175,55,0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(212,175,55,0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [animate],
};

export default config;
