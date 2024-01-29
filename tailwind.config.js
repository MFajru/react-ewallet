/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: 'url',
      colors: {
        'custom-purple': '#4D47C3',
        'custom-disabled-purple': '#CAC8FF',
        'custom-bright-purple': '#F0EFFF',
        'custom-placholder-purple': '#A7A3FF',
        'custom-gray': '#95999E',
        'custom-dark-gray': '#4A5568',
        'custom-darker-gray': '#2D3748',
        'custom-light-green': '#EAFCEF',
        'custom-green': '#33A720',
        'custom-light-red': '#FFDDCA',
        'custom-red': '#F60707',
      },
    },
  },
  plugins: [],
};
