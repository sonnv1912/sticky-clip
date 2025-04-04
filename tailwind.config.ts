import { fontFamily } from './src/configs/theme/font-family';

module.exports = {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         fontFamily,
      },
   },
   plugins: [],
};
