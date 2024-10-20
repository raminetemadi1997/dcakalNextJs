/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        // 'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        // 'gradient-conic':
        //   'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        'theme':'#FF7900',
        'orange':'#FF9E0F',
        'theme-green' : '#009688',
        'theme-red' : '#ef4444'
      },
      gridTemplateRows: {
        // Simple 8 row grid
        '11': 'repeat(11, minmax(0, 1fr))',
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        '18': 'repeat(18, minmax(0, 1fr))',
      },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      },
      backgroundSize: {
        'size-200': '300% 300%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },
    },
   
  },
  plugins: [],
}
