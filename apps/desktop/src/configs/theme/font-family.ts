import defaultTheme from 'tailwindcss/defaultTheme';

export const fontFamily = {
   'ibm-plex-mono': 'ibm-plex-mono',
   semibold: 'semi-b-ibm-plex-mono',
   'b-ibm-plex-mono': 'b-ibm-plex-mono',
   'eb-raleway': 'eb-raleway',
   raleway: 'raleway',
   sans: ['ibm-plex-mono', ...defaultTheme.fontFamily.sans],
};
