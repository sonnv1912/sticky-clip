import { defineConfig } from 'tsup';

export default defineConfig((options) => {
   return {
      entry: {
         'theme/index': 'src/theme/index.ts',
      },
      outDir: 'dist',
      dts: true,
      sourcemap: false,
      minify: !options.watch,
      clean: true,
   };
});
