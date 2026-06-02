import path from 'node:path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
   build: {
      rollupOptions: {
         external: ['shared-configs/theme'],
      },
   },
   resolve: {
      alias: {
         '@': path.resolve(__dirname, './src'),
         '@components': path.resolve(__dirname, './src/components'),
         '@assets': path.resolve(__dirname, './src/assets'),
         '@configs': path.resolve(__dirname, './src/configs'),
         '@modals': path.resolve(__dirname, './src/modals'),
         '@schemas': path.resolve(__dirname, './src/schemas'),
         '@stores': path.resolve(__dirname, './src/stores'),
         '#types': path.resolve(__dirname, './src/types'),
      },
   },
});
