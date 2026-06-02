import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
   base: '/sticky-clip',
   server: {
      port: 3333,
   },
   preview: {
      port: 3333,
   },
   resolve: {
      alias: {
         '@': path.resolve(__dirname, './src'),
         '@components': path.resolve(__dirname, './src/components'),
         '@assets': path.resolve(__dirname, './src/assets'),
         '@hooks': path.resolve(__dirname, './src/hooks'),
         '@configs': path.resolve(__dirname, './src/configs'),
         '@layouts': path.resolve(__dirname, './src/layouts'),
         '@utils': path.resolve(__dirname, './src/utils'),
         '@stores': path.resolve(__dirname, './src/stores'),
      },
   },
   plugins: [react()],
});
