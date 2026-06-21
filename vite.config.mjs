import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react()],
  cacheDir: './node_modules/.vite',
  resolve: {
    preserveSymlinks: true
  },
  server: {
    fs: {
      strict: false
    }
  },
  optimizeDeps: {
    noDiscovery: true,
    include: [],
    esbuildOptions: {
      absWorkingDir: projectRoot
    }
  }
});
