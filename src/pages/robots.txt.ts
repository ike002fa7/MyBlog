import type { APIRoute } from 'astro';

const robotsTxt = `# X-ATCN Blog — robots.txt
# Allow all well-behaved crawlers
User-agent: *
Allow: /

# Point to sitemaps
Sitemap: https://www.x-atcn.top/sitemap.xml

# Crawl-delay (be nice to the server)
Crawl-delay: 10

# Block nothing — everything is static content
`;

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
