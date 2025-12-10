/***** Tailwind Config *****/
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        sour: {
          bg: '#0a0a0a',
          lime: '#b6ff00',
          lime2: '#d0ff30'
        }
      },
      boxShadow: {
        neon: '0 0 6px rgba(182,255,0,0.6), 0 0 16px rgba(182,255,0,0.25)'
      },
      backgroundImage: {
        'glow-grid': 'radial-gradient(1000px 500px at 50% -50%, rgba(182,255,0,0.15), rgba(10,10,10,0)), radial-gradient(600px 300px at 10% 10%, rgba(208,255,48,0.08), rgba(10,10,10,0))'
      },
      keyframes: {
        neonpulse: {
          '0%, 100%': { filter: 'drop-shadow(0 0 0px rgba(182,255,0,0))' },
          '50%': { filter: 'drop-shadow(0 0 12px rgba(182,255,0,0.5))' }
        },
        scan: {
          '0%': { backgroundPositionY: '0%' },
          '100%': { backgroundPositionY: '100%' }
        }
      },
      animation: {
        neonpulse: 'neonpulse 2.6s ease-in-out infinite',
        scan: 'scan 12s linear infinite'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'Noto Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      }
    }
  },
  plugins: []
}
