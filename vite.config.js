import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css','resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
    server: {
      hmr: {
          host: 'localhost',
      },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: ['resources/js/app.jsx', './index.html']
    }
  }
});
