/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['\"Fredoka One\"', 'cursive'],
        body: ['\"Nunito\"', 'system-ui'],
      },
      colors: {
        ocean: '#37b5f4',
        forest: '#50c878',
        candy: '#ff6fb7',
        sunshine: '#ffd866',
        midnight: '#1b1f3b',
      },
    },
  },
  plugins: [],
}
