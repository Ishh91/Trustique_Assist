import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure static files are copied
  },
  server: {
    proxy: {}, // Required workaround for Vite 5+ to enable historyApiFallback
    middlewareMode: false,
    fs: {
      // Allow SPA routing by serving index.html for unmatched paths
      allow: ['.']
    },
    // Fix SPA routing in dev server (Vite uses internal fallback instead of explicit historyApiFallback)
  }
});
