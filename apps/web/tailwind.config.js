module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['var(--font-nunito)', 'sans-serif'],
      },
      colors: {
        custom: {
          white: '#FFFFFF',
          dark: '#0E0800',
          bg: '#F9F9F9',
          'main-yellow': '#F9C74F',
          'yellow-hover': '#F0B62B',
          'secondary-orange': '#E99714',
          'txt-secondary': '#7B7875',
          placeholder: '#9E9E9E',
          additional: '#7A5A36',
          'brown-dark': '#563817',
          'dark-stroke': '#312F2D',
          stroke: '#E0DCD2',
          'light-grey': '#F3F3F3',
          grey: '#EBEBEB',
          disable: '#E0E0E0',
          info: '#3256D8',
          danger: '#E92B2B',
        },
        brand: {
          primary: '#F9C74F',
          'primary-hover': '#F0B62B',
          secondary: '#E99714',
          dark: '#0E0800',
          light: '#F9F9F9',
        },
      },
    },
  },
  plugins: [],
};
