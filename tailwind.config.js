/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        rail: 'var(--rail)',
        sidebar: 'var(--sidebar)',
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        border: 'var(--border)',
        txt: 'var(--text)',
        'txt-muted': 'var(--text-muted)',
        'on-accent': 'var(--on-accent)',
        accent: {
          DEFAULT: 'var(--accent)',
          soft: 'var(--accent-soft)',
          hover: 'var(--accent-hover)',
        },
        danger: {
          DEFAULT: 'var(--danger)',
          soft: 'var(--danger-soft)',
        },
        warning: {
          DEFAULT: 'var(--warning)',
          soft: 'var(--warning-soft)',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        sm: 'var(--radius-sm, 6px)',
        md: 'var(--radius-md, 10px)',
        card: 'var(--radius-md, 10px)',
        btn: 'var(--radius-sm, 6px)',
        key: 'var(--radius-sm, 6px)',
      },
      boxShadow: {
        float: 'var(--shadow-float)',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-4px)' },
          '40%, 80%': { transform: 'translateX(4px)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'scale(0.98)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        pulseCaret: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.2' },
        }
      },
      animation: {
        shake: 'shake 0.25s ease-in-out',
        fadeIn: 'fadeIn 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        caret: 'pulseCaret 1s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
