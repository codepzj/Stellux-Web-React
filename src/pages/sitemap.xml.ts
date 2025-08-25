import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
  const baseUrl = url.origin;

  // 静态页面
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 1.0,
    },
  ];

  try {
    // 动态获取博客文章
    const { getAllPublishPostAPI } = await import("@/api/post");
    const blogRes = await getAllPublishPostAPI();
    const blogPages = (blogRes.data || []).map((post: any) => ({
      url: `${baseUrl}/blog/${post.alias}`,
      lastmod: new Date(post.updated_at || post.created_at).toISOString(),
      changefreq: "weekly",
      priority: 0.8,
    }));

    // 动态获取文档
    const { getAllPublicDocument } = await import("@/api/document");

    const docRes = await getAllPublicDocument();
    const docPages = [];

    for (const doc of docRes.data || []) {
      // 文档主页
      docPages.push({
        url: `${baseUrl}/document/${doc.alias}`,
        lastmod: new Date(doc.updated_at || doc.created_at).toISOString(),
        changefreq: "weekly",
        priority: 0.7,
      });
    }

    const allPages = [...staticPages, ...blogPages, ...docPages];

    // 生成sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

    return new Response(sitemap, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);

    // 如果出错，至少返回静态页面
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

    return new Response(fallbackSitemap, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    });
  }
};
