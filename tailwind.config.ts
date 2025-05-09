import { colors } from './src/configs/theme/colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   dark: 'class',
   theme: {
      extend: {
         colors: {
            ...colors,
            background: 'var(--background)',
            box: 'var(--box)',
            card: 'var(--card)',
            fade: 'var(--fade)',
            paragraph: 'var(--paragraph)',
            subParagraph: 'var(--sub-paragraph)',
            boxBorder: 'var(--box-border)',
         },
         boxShadow: {
            'blur-10': 'var(--shadow-blur-10)',
         },
      },
   },
   plugins: [],
};
