import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         fontFamily: {
            'ibm-plex-mono': 'ibm-plex-mono',
            semibold: 'semi-b-ibm-plex-mono',
            'b-ibm-plex-mono': 'b-ibm-plex-mono',
            'eb-raleway': 'eb-raleway',
            raleway: 'raleway',
            sans: ['ibm-plex-mono', ...defaultTheme.fontFamily.sans],
         },
         colors: {
            black: '#181818',
         },
      },
   },
   plugins: [],
};
