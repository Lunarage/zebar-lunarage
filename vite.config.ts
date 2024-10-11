import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    target: 'esnext',
    rollupOptions: {
      watch: {
        include: 'src/**',
        exclude: 'node_modules/**',
      },
    },
  },
});
