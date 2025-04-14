import defaultTheme from 'tailwindcss/defaultTheme';
import { colors } from './src/configs/theme/colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         fontFamily: {
            sans: ['writer', ...defaultTheme.fontFamily.sans],
         },
         colors,
         shadow: {
            'shadow-5': '0 0 1px 5px rgba(22, 22, 22, 1)',
         },
      },
   },
   plugins: [],
};
