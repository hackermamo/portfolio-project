/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#00ff88',
        'neon-dark': '#0a0a0a',
        'neon-secondary': '#00cc6b',
      },
      boxShadow: {
        'neon-glow': '0 0 20px rgba(0, 255, 136, 0.6)',
        'neon-glow-lg': '0 0 40px rgba(0, 255, 136, 0.8)',
        'neon-glow-sm': '0 0 10px rgba(0, 255, 136, 0.4)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 255, 136, 0.6)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 255, 136, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
