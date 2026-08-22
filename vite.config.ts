import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * GitHub Pages não faz rewrite de rotas: uma URL como /estudos devolveria 404.
 * Copiar o index.html para 404.html faz o Pages servir o app em qualquer rota.
 * Na Vercel quem cuida disso é o rewrite do vercel.json — manter os dois é inofensivo.
 */
function spaFallback() {
  return {
    name: 'spa-fallback-404',
    closeBundle() {
      const out = resolve(import.meta.dirname, 'dist');
      copyFileSync(resolve(out, 'index.html'), resolve(out, '404.html'));
    },
  };
}

export default defineConfig({
  base: '/',
  plugins: [react(), spaFallback()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
  server: {
    port: 8080,
    open: true,
  },
});
