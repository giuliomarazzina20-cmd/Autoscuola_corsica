import type { APIRoute } from 'astro';
import { site } from '../data/site';

// In anteprima (demo: true) nessuna indicizzazione; in produzione tutto aperto con la sitemap.
export const GET: APIRoute = ({ site: astroSite }) => {
  const base = astroSite ?? new URL(site.dominio);
  const body = site.demo
    ? ['# Anteprima dimostrativa: non indicizzare', 'User-agent: *', 'Disallow: /', ''].join('\n')
    : ['User-agent: *', 'Allow: /', '', `Sitemap: ${new URL('/sitemap-index.xml', base).href}`, ''].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
