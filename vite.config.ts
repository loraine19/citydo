import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(({ mode }) => {
  if (mode === 'analyze') {
    return {
      plugins: [react(), visualizer()],
      build: {
        minify: 'terser', // Use Terser for minification
        // terserOptions: {
        //   keep_fnames: true,
        //   keep_classnames: true,
        // },
        rollupOptions: {
          output: {
            entryFileNames: `[name].js`,
            chunkFileNames: `[name].js`,
            assetFileNames: `[name].[ext]`
          }
        }
      }
    }
  }
  return {
    plugins: [react()],
    server: {
      host: true,
      port: 5173,
      hmr: {
        host: 'localhost',
        port: 5173,
      },
    }, test: {
      globals: true, // Pour ne pas avoir à importer describe, it, expect etc.
      environment: 'jsdom', // IMPORTANT: Pour simuler le DOM
      setupFiles: './src/setupTests.ts', // Optionnel: Fichier de setup pour @testing-library/jest-dom
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            } else if (id.includes('/presenter/components/shared/')) {
              return 'shared-components';
            } else if (id.includes('/presenter/components/common/')) {
              return 'common-components';
            }
          }
        }
      },
      chunkSizeWarningLimit: 500
    },
    cacheDir: '.vite-cache'
  };
});