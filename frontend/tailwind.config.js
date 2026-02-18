/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#0a1628',
          navy: '#0f1f3d',
          blue: '#1a2e52',
        },
        accent: {
          orange: '#ff6b3d',
          cyan: '#00d9ff',
          blue: '#4c7fff',
        }
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'scroll': 'scroll 30s linear infinite',
        'fade-in': 'fadeIn 0.5s ease',
        bounce1: "bounceDot 1.2s infinite ease-in-out both",
        bounce2: "bounceDot 1.2s infinite ease-in-out both 0.2s",
        bounce3: "bounceDot 1.2s infinite ease-in-out both 0.4s",
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceDot: {
          "0%, 80%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-4px)" },
        },
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}