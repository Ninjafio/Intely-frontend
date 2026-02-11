import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@app': '/src/app',
      '@pages': '/src/pages',
      '@widgets': '/src/widgets',
      '@features': '/src/features',
      '@entities': '/src/entities',
      '@shared': '/src/shared',
      '@store': '/src/store',
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.cjs', '.mjs', '.js', '.jsx', '.cts', '.mts', '.ts', '.tsx', '.json', '.css'],
  },
  server: {
    port: 5173,
    host: true,
    open: true,
  },
})
