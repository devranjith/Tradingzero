/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        theme: {
          bg: '#121212', // Main dark background
          card: '#1e1e1e', // Slightly lighter card background
          border: '#2a2a2a', // Subtle borders
          accent: '#ff8a00', // Vibrant orange accent
          accentHover: '#ff9a22',
          text: '#ffffff',
          textMuted: '#9ca3af' // Gray 400
        }
      }
    },
  },
  plugins: [],
}
