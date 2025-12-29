import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Set base to your repository name
  base: "/Min_Proj/", 
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});