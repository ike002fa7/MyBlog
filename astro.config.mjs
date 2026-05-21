// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
// import sitemap from '@astrojs/sitemap'; // 使用手动生成的干净 sitemap.xml

export default defineConfig({
  site: 'https://kleinblue.top',
  integrations: [
    tailwind(),
    // sitemap({ changefreq: 'weekly', priority: 0.7, lastmod: new Date() }),
  ],
  markdown: { shikiConfig: { theme: 'github-dark' } },
});
