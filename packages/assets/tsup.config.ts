import { defineConfig } from 'tsup';

export default defineConfig((options) => {
   return {
      entry: ['./src/**/*'],
      minify: !options.watch,
      clean: true,
      loader: {
         '.png': 'copy',
         '.webp': 'copy',
         '.jpg': 'copy',
         '.woff2': 'copy',
         '.heic': 'copy',
      },
   };
});
