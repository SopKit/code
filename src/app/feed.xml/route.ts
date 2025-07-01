import { SITE_CONFIG } from '@/constants';

export const dynamic = 'force-static';

export async function GET() {
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_CONFIG.name}</title>
    <description>${SITE_CONFIG.description}</description>
    <link>${SITE_CONFIG.url}</link>
    <atom:link href="${SITE_CONFIG.url}/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <ttl>60</ttl>
    
    <item>
      <title>JSON Tools Collection Launched</title>
      <description>Comprehensive collection of JSON, XML, YAML, and HTML developer tools now available</description>
      <link>${SITE_CONFIG.url}/tools</link>
      <guid>${SITE_CONFIG.url}/tools</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
    
    <item>
      <title>JSON Formatter Tool</title>
      <description>Format and beautify JSON data with our advanced JSON formatter tool</description>
      <link>${SITE_CONFIG.url}/tools/json/formatter</link>
      <guid>${SITE_CONFIG.url}/tools/json/formatter</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
    
    <item>
      <title>JSON Validator Tool</title>
      <description>Validate JSON syntax and structure with detailed error reporting</description>
      <link>${SITE_CONFIG.url}/tools/json/validator</link>
      <guid>${SITE_CONFIG.url}/tools/json/validator</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
