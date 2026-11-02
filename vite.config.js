import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Fixed at build time so server-rendered and hydrated HTML always match
  define: {
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
  // Static-site generation (vite-react-ssg): each route becomes its own HTML file,
  // e.g. dist/crowdfunding/index.html — works on any static host or cPanel.
  ssgOptions: {
    dirStyle: 'nested',
  },
})
