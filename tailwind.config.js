/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#f4f2ec',
        paper2: '#ebe7dc',
        card: '#fbfaf5',
        ink: '#211f1a',
        inksoft: '#45413a',
        muted: '#7a756b',
        faint: '#aaa493',
        line: '#e3ddd0',
        linestrong: '#d4ccbb',
        accent: '#b65b3c',
      },
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        text: ['Newsreader', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        prose: '40rem',
        page: '1080px',
      },
    },
  },
  plugins: [],
}
