import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Configure the base path (only needed if deploying to a subdirectory)
  base: '/',  // Update this if you're deploying to a subdirectory like '/your-subdirectory/'

  build: {
    outDir: 'dist', // Output directory for the build files
    assetsDir: 'assets', // Folder for static assets within dist/
    publicDir: 'public', // The public folder for static assets
  },
  
  // Optional: Add a `redirects` file in the `public` folder to handle routes for SPAs
})
