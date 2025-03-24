import { colors, fontFamily } from 'shared-configs/theme';

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
