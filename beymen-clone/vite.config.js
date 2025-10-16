// vite.config.js

import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  
  // YENİ EKLENEN KISIM: Vite'a bu paketleri önceden optimize etmesini söylüyoruz.
  optimizeDeps: {
    include: ['bootstrap', 'bootstrap-vue-next']
  }
  // Bu, Vite'ın bu bağımlılıkları daha hızlı ve hatasız bir şekilde bulmasını sağlar.
});