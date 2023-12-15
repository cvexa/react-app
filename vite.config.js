import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Cvexa react app',
        short_name: 'cvexaReactApp',
        description: 'My Awesome React description',
        theme_color: '#ffffff',
        id: "/",
        icons: [
          {
            "src": "assets/images/h-icon.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
          },
        ],
        screenshots: [
          {
            "src": "assets/images/h-icon.png",
            "sizes": "512x512",
            "type": "image/png",
            "form_factor": "wide",
            "label": "Cvexa React App"
          }
        ]
      }
    })],
})
