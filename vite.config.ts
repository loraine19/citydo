import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  // --- Mode Analyse ---
  if (mode === 'analyze') {
    return {
      plugins: [react(), visualizer()],
      build: {
        minify: 'terser',
        rollupOptions: {
          output: {
            entryFileNames: `[name].js`,
            chunkFileNames: `[name].js`,
            assetFileNames: `[name].[ext]`
          }
        }
      }
    };
  }

  // --- Mode Production & Développement ---
  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        workbox: {

          skipWaiting: true,      // Force le nouveau SW à s'activer
          clientsClaim: true,     // Force le SW à prendre le contrôle immédiatement
          globPatterns: ['**/*.{js,css,html,ico,png,svg,ttf}'],
          runtimeCaching: [
            {
              urlPattern: ({ url }) =>
                url.origin.includes('api.citydo.fr') &&
                /\.(?:png|jpg|jpeg|svg|gif)$/.test(url.pathname),
              handler: 'CacheFirst',
              options: {
                cacheName: 'api-images-cache',
                expiration: {
                  maxEntries: 60,
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 jours
                },
                // Cette option est importante pour les réponses CORS
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            // -----------------------------------------------------------------
            {
              urlPattern: /\.(?:ttf|woff|woff2)$/,
              handler: 'CacheFirst',
              options: { cacheName: 'fonts-cache', expiration: { maxEntries: 10, maxAgeSeconds: 31536000 } },
            },
            {
              // Règle générale pour les autres images (celles qui ne viennent pas de votre API)
              urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
              handler: 'CacheFirst',
              options: { cacheName: 'images-cache', expiration: { maxEntries: 60, maxAgeSeconds: 2592000 } },
            },
            {
              urlPattern: ({ url }) => url.origin.includes('api.citydo.fr'),
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'api-cache',
                expiration: { maxEntries: 100, maxAgeSeconds: 86400 },
                cacheableResponse: { statuses: [0, 200] },
              },
            },
          ],
        },
        manifest: {
          name: "City'do",
          short_name: "City'do",
          lang: "fr",
          categories: ["productivity", "social", "utilities"],
          description: "City'Do - Application collaborative pour améliorer la vie urbaine. Partagez, proposez et suivez les initiatives citoyennes dans votre ville.",
          start_url: "/",
          scope: "/",
          display: "minimal-ui",
          orientation: "portrait",
          theme_color: "#131b1d",
          background_color: "#e7eff2",
          icons: [
            { purpose: "maskable", sizes: "1024x1024", src: "icons/maskable_icon.png", type: "image/png" },
            { purpose: "maskable", sizes: "512x512", src: "icons/maskable_icon_x512.png", type: "image/png" },
            { purpose: "maskable", sizes: "384x384", src: "icons/maskable_icon_x384.png", type: "image/png" },
            { purpose: "maskable", sizes: "192x192", src: "icons/maskable_icon_x192.png", type: "image/png" },
            { purpose: "maskable", sizes: "128x128", src: "icons/maskable_icon_x128.png", type: "image/png" },
            { purpose: "maskable", sizes: "96x96", src: "icons/maskable_icon_x96.png", type: "image/png" },
            { purpose: "maskable", sizes: "72x72", src: "icons/maskable_icon_x72.png", type: "image/png" },
            { purpose: "maskable", sizes: "48x48", src: "icons/maskable_icon_x48.png", type: "image/png" },
            { purpose: "any", sizes: "512x512", src: "icons/icon512.png", type: "image/png" },
            { purpose: "any", sizes: "192x192", src: "icons/icon192.png", type: "image/png" },
            { purpose: "any", sizes: "144x144", src: "icons/icon144.png", type: "image/png" },
          ],
          screenshots: [
            { src: "screenshots/screenshot1.png", sizes: "1082x2402", type: "image/png", form_factor: "narrow" },
            { src: "screenshots/screenshot2.png", sizes: "1082x2402", type: "image/png", form_factor: "narrow" },
            { src: "screenshots/screenshot3.png", sizes: "2230x1426", type: "image/png", form_factor: "wide" },
            { src: "screenshots/screenshot4.png", sizes: "2918x1070", type: "image/png", form_factor: "wide" },
          ],
        },
      })
    ],
    server: {
      host: true,
      port: 5173,
      hmr: { host: 'localhost', port: 5173 },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
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