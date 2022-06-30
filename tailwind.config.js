module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      display: ['"Cormorant Infant"'],
      body: ['"Noto Sans"'],
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
