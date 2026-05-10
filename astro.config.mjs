// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://x-atcn.top',
  integrations: [tailwind()],
  markdown: { shikiConfig: { theme: 'github-dark' } },
});
