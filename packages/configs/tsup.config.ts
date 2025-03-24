import { defineConfig } from 'tsup';

export default defineConfig((options) => {
   return {
      entry: ['src/theme/**/*', 'src/i18n/**/*'],
      minify: !options.watch,
      clean: true,
      dts: true,
   };
});
