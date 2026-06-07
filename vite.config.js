import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Served from https://<user>.github.io/delivery-voice-controlled/ on GitHub Pages,
  // so assets must be resolved relative to this sub-path, not the domain root.
  base: '/delivery-voice-controlled/',
  plugins: [react()],
})
