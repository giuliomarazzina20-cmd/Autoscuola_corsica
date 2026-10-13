// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './src/data/site.ts';

// Il dominio arriva da src/data/site.ts: per la versione definitiva basta cambiarlo lì.
export default defineConfig({
  site: site.dominio,
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  // Nessuna barra di sviluppo di Astro nell'anteprima: il sito deve restare pulito.
  devToolbar: { enabled: false },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
