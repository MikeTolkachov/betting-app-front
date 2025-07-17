import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Додати!

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Додати!
    },
  },
});
