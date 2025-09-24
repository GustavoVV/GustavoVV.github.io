import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  site: 'https://gustavovv.github.io',
  base: '/webvalia/',
  output: 'static',
  build: {
    format: 'file'
  },
  trailingSlash: 'ignore',
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
});

