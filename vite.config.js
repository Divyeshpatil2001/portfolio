import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable JSX in .js files as well
      include: '**/*.{jsx,js}',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    // increase the warning threshold so transient big chunks don't spam
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // split large vendors into their own files
          if (id.includes('node_modules')) {
            if (id.includes('three')) {
              return 'three';
            }
            // you can add more libraries here if needed
            return 'vendor';
          }
        },
      },
    },
  },
});

