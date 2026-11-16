import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const noticias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/noticias' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    excerpt: z.string().optional(),
    category: z.enum([
      'Zona Maya y Cultura',
      'Cascadas y Naturaleza',
      'Gastronomía',
      'Hospedaje',
      'Guía del Viajero',
      'Comunidad y Eventos',
    ]),
    image: z.string(),
    imageCaption: z.string().optional(),
    author: z.string().default('Redacción Qué Hacer en Palenque'),
    authorRole: z.string().optional(),
    pubDate: z.coerce.date(),
    featured: z.boolean().default(false),
    breaking: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { noticias };
