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
         shadow: {
            '5': '0 0 1px 5px rgba(22, 22, 22, 1)',
            'blur-10': '0 0 10px 0px rgba(255, 255, 255, 0.1)',
         },
      },
   },
   plugins: [],
};
