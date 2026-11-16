import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getCategorySlug } from '../utils/cloudinary';

export const GET: APIRoute = async () => {
  const articles = await getCollection('noticias');
  const sorted = articles.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  const categories = [
    'Zona Maya y Cultura',
    'Cascadas y Naturaleza',
    'Gastronomía',
    'Hospedaje',
    'Guía del Viajero',
    'Comunidad y Eventos',
  ];

  const staticUrls = [
    `<url><loc>https://quehacerenpalenque.com/</loc><changefreq>hourly</changefreq><priority>1.0</priority></url>`,
    ...categories.map(
      (c) => `<url><loc>https://quehacerenpalenque.com/categoria/${getCategorySlug(c)}/</loc><changefreq>daily</changefreq><priority>0.8</priority></url>`
    ),
  ];

  const articleUrls = sorted.map((art) => {
    const pubIso = art.data.pubDate ? new Date(art.data.pubDate).toISOString() : new Date().toISOString();
    return `  <url>
    <loc>https://quehacerenpalenque.com/noticias/${art.id}/</loc>
    <lastmod>${pubIso}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls.join('\n  ')}
${articleUrls.join('\n')}
</urlset>`;

  return new Response(xml.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
