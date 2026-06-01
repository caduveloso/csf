/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#faf9f6',
        paper2: '#f3f1ea',
        ink: '#16161a',
        inksoft: '#3f3f46',
        muted: '#71717a',
        faint: '#a1a1aa',
        line: '#e6e3da',
        linestrong: '#d9d5c9',
        accent: '#5b4fe9',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'ui-serif', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SF Mono', 'monospace'],
      },
      maxWidth: {
        prose: '44rem',
        page: '1080px',
      },
    },
  },
  plugins: [],
}
