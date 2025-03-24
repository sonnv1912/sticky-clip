import { defineConfig } from 'tsup';

export default defineConfig((options) => {
   return {
      entry: ['src/fonts/**/*', 'src/styles/**/*'], // Dùng mảng thay vì object
      minify: !options.watch,
      clean: true,
      loader: {
         '.ttf': 'copy',
      },
   };
});
