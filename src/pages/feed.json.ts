import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
  const baseUrl = url.origin;

  try {
    // 动态获取博客文章
    const { getAllPublishPostAPI } = await import("@/api/post");
    const blogRes = await getAllPublishPostAPI();
    const posts = blogRes.data || [];

    // 生成JSON Feed
    const jsonFeed = {
      version: "https://jsonfeed.org/version/1.1",
      title: "Gopher",
      description: "记录Golang学习与开发实践",
      home_page_url: baseUrl,
      feed_url: `${baseUrl}/feed.json`,
      language: "zh-CN",
      authors: [
        {
          name: "浩瀚星河",
          email: "email@codepzj.cn",
        },
      ],
      items: posts.map((post: any) => ({
        id: `${baseUrl}/blog/${post.alias}`,
        url: `${baseUrl}/blog/${post.alias}`,
        title: post.title,
        content_text: post.description || "",
        summary: post.description || "",
        date_published: new Date(post.created_at).toISOString(),
        date_modified: new Date(
          post.updated_at || post.created_at
        ).toISOString(),
        tags: [post.category || "技术"],
        authors: [
          {
            name: "浩瀚星河",
          },
        ],
      })),
    };

    return new Response(JSON.stringify(jsonFeed, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Error generating JSON Feed:", error);

    // 如果出错，返回空的JSON Feed
    const fallbackJsonFeed = {
      version: "https://jsonfeed.org/version/1.1",
      title: "Gopher",
      description: "记录Golang学习与开发实践",
      home_page_url: baseUrl,
      feed_url: `${baseUrl}/feed.json`,
      language: "zh-CN",
      authors: [
        {
          name: "浩瀚星河",
          email: "email@codepzj.cn",
        },
      ],
      items: [],
    };

    return new Response(JSON.stringify(fallbackJsonFeed, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  }
};
