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
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        border: 'var(--border)',
        txt: 'var(--text)',
        'txt-muted': 'var(--text-muted)',
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
        card: '10px',
        btn: '8px',
        key: '6px',
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
        }
      },
      animation: {
        shake: 'shake 0.25s ease-in-out',
        fadeIn: 'fadeIn 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }
    },
  },
  plugins: [],
}
