import defaultTheme from 'tailwindcss/defaultTheme';
import { colors } from './src/configs/theme/colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   dark: 'class',
   theme: {
      extend: {
         fontFamily: {
            sans: ['writer', ...defaultTheme.fontFamily.sans],
         },
         colors,
      },
   },
   plugins: [],
};
