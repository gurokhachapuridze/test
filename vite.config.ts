import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss'; // Correct import for tailwindcss
import path from 'path';

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  
  css: {
    postcss: {
      plugins: [tailwindcss()], // Use tailwindcss as a postcss plugin
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});