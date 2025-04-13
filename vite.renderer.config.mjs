import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import path from 'node:path';

// https://vitejs.dev/config
export default defineConfig({
   plugins: [tailwindcss()],
   resolve: {
      alias: {
         '@': path.resolve(__dirname, './src'),
         '@components': path.resolve(__dirname, './src/components'),
         '@assets': path.resolve(__dirname, './src/assets'),
         '@configs': path.resolve(__dirname, './src/assets'),
         '@modals': path.resolve(__dirname, './src/modals'),
         '@schemas': path.resolve(__dirname, './src/schemas'),
         '@stores': path.resolve(__dirname, './src/stores'),
         '#types': path.resolve(__dirname, './src/types'),
      },
   },
});
