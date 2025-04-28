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
         colors: {
            ...colors,
            background: 'var(--background)',
            box: 'var(--box)',
            card: 'var(--card)',
            fade: 'var(--fade)',
            paragraph: 'var(--paragraph)',
            boxBorder: 'var(--box-border)',
         },
         boxShadow: {
            '5': 'var(--shadow-5)',
            'blur-10': 'var(--shadow-blur-10)',
         },
      },
   },
   plugins: [],
};
