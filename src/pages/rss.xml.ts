import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
  const baseUrl = url.origin;

  try {
    // 动态获取博客文章
    const { getAllPublishPostAPI } = await import("@/api/post");
    const blogRes = await getAllPublishPostAPI();
    const posts = blogRes.data || [];

    // 生成RSS XML
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Gopher</title>
    <description>记录Golang学习与开发实践</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Astro RSS Generator</generator>
    ${posts
      .map(
        (post: any) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description || ""}]]></description>
      <link>${baseUrl}/blog/${post.alias}</link>
      <guid>${baseUrl}/blog/${post.alias}</guid>
      <pubDate>${new Date(post.created_at).toUTCString()}</pubDate>
      <category>${post.category || "技术"}</category>
    </item>`
      )
      .join("\n")}
  </channel>
</rss>`;

    return new Response(rss, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Error generating RSS:", error);

    // 如果出错，返回空的RSS feed
    const fallbackRss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Gopher</title>
    <description>记录Golang学习与开发实践</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Astro RSS Generator</generator>
  </channel>
</rss>`;

    return new Response(fallbackRss, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
      },
    });
  }
};
