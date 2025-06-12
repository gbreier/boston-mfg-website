module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: '#c1272d', // Red from logo
        secondary: '#2a4e7e', // Blue from logo
        accent: '#3a3a3a', // Dark gray from logo
        background: '#ffffff', // White
      },
    },
  },
  plugins: [],
}; 