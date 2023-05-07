import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      workbox: {
        cleanupOutdatedCaches: false,
      },
      manifest: {
        name: 'SingBus',
        short_name: 'SingBus',
        description: 'Singapore Bus Web App',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'img/icons/bus.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'img/icons/bus.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    // fast-deep-equal doesnt have default export
    // https://github.com/vitejs/vite/issues/2679
    include: ['fast-deep-equal'],
  },
})
