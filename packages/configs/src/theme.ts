import defaultTheme from 'tailwindcss/defaultTheme';

export const theme = {
   fontFamily: {
      sans: ['writer', ...defaultTheme.fontFamily.sans],
   },
   colors: {
      black: '#0b0c0d',

      woodsmoke: {
         50: '#f6f6f6',
         100: '#e7e7e7',
         200: '#d1d1d1',
         300: '#b0b0b0',
         400: '#888888',
         500: '#6d6d6d',
         600: '#5d5d5d',
         700: '#4f4f4f',
         800: '#454545',
         900: '#3d3d3d',
         950: '#1b1b1b',
      },

      stickyclip: {
         '50': '#f1f9fe',
         '100': '#e1f3fd',
         '200': '#bde6fa',
         '300': '#82d3f7',
         '400': '#40bdf0',
         '500': '#25b0e9',
         '600': '#0a86bf',
         '700': '#096a9b',
         '800': '#0c5a80',
         '900': '#104b6a',
         '950': '#0b2f46',
      },
   },
};
