import { defineCollection, z } from "astro:content";
import { glob } from 'astro/loaders';

const postCollection = defineCollection({
    loader: glob({ 
        pattern: '**/[^_]*.{md,mdx}', 
        base: "./src/content" 
    }),
    schema: ({ image }) => z.object({
        title: z.string(),
        slug: z.string(),
        image: image(),
        excerpt: z.string(),
    }),
});

export const collections = {
    "postCollection": postCollection,
};