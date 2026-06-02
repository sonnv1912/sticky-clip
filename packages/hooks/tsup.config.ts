import { defineConfig } from 'tsup';

export default defineConfig((options) => {
   return {
      entry: ['./src/**/*'],
      minify: !options.watch,
      dts: true,
      clean: true,
      format: ['esm'],
      tsconfig: './tsconfig.json',
   };
});
