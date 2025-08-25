import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
  const baseUrl = url.origin;

  try {
    // 动态获取博客文章
    const { getAllPublishPostAPI } = await import("@/api/post");
    const blogRes = await getAllPublishPostAPI();
    const posts = blogRes.data || [];

    // 生成Atom XML
    const atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Gopher</title>
  <subtitle>记录Golang学习与开发实践</subtitle>
  <link href="${baseUrl}" />
  <link href="${baseUrl}/atom.xml" rel="self" type="application/atom+xml" />
  <id>${baseUrl}</id>
  <updated>${new Date().toISOString()}</updated>
  <author>
    <name>浩瀚星河</name>
    <email>email@codepzj.cn</email>
  </author>
  ${posts
    .map(
      (post: any) => `  <entry>
    <title><![CDATA[${post.title}]]></title>
    <link href="${baseUrl}/blog/${post.alias}" />
    <id>${baseUrl}/blog/${post.alias}</id>
    <updated>${new Date(post.updated_at || post.created_at).toISOString()}</updated>
    <published>${new Date(post.created_at).toISOString()}</published>
    <summary type="html"><![CDATA[${post.description || ""}]]></summary>
    <category term="${post.category || "技术"}" />
  </entry>`
    )
    .join("\n")}
</feed>`;

    return new Response(atom, {
      status: 200,
      headers: {
        "Content-Type": "application/atom+xml; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Error generating Atom feed:", error);

    // 如果出错，返回空的Atom feed
    const fallbackAtom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Gopher</title>
  <subtitle>记录Golang学习与开发实践</subtitle>
  <link href="${baseUrl}" />
  <link href="${baseUrl}/atom.xml" rel="self" type="application/atom+xml" />
  <id>${baseUrl}</id>
  <updated>${new Date().toISOString()}</updated>
  <author>
    <name>浩瀚星河</name>
    <email>email@codepzj.cn</email>
  </author>
</feed>`;

    return new Response(fallbackAtom, {
      status: 200,
      headers: {
        "Content-Type": "application/atom+xml; charset=utf-8",
      },
    });
  }
};
