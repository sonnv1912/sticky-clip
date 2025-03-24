import { fontFamily, colors } from 'shared-configs/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         fontFamily,
         colors,
      },
   },
   plugins: [],
};
