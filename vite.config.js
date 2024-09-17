import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'
// PWA
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/counter',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  envPrefix: 'APP_',
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['vite.svg', 'react.svg', 'favicon.ico'],
      manifest: {
        name: "Dniomat - Licznik dni",
        short_name: "Dniomat",
        description: "Aplikacja licząca dni - ile minęło od wybranej daty lub ile do niej pozostało",
        version: "1.0.144",
        start_url: "/counter/",
        display: "standalone",
        background_color: "#FFFFFF",
        theme_color: "#FFFFFF",
        icons: [
          {
            src: "/counter/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/counter/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/counter/pwa-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "/counter/pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ],
      }
    })
  ],
})
