import { getPostByAliasAPI } from "@/api/post";
import { Markdown } from "@/components/business/md";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import type { PostVO } from "@/types/post";
import { ErrorPage } from "@/components/basic/tool/error-page";
import { BackToTop } from "@/components/basic/tool/back-to-top";

// 骨架屏组件
function BlogSkeleton() {
  return (
    <div className="relative text-default-600 flex flex-col gap-4 lg:flex-row p-2 lg:p-4 animate-pulse">
      <div className="w-full p-2 md:p-4">
        <div className="max-w-4xl mx-auto">
          {/* 标题骨架 */}
          <div className="text-center mb-8">
            <div className="h-10 w-2/3 mx-auto bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          </div>
          {/* 内容骨架 */}
          <div className="space-y-4">
            <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-6 w-5/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-6 w-4/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-6 w-3/5 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogContent() {
  const params = useParams();
  const alias = params.alias as string;
  const [post, setPost] = useState<PostVO | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setError(null);
    setLoading(true);
    const fetchPost = async () => {
      try {
        const res = await getPostByAliasAPI(alias);
        setPost(res.data);
      } catch (error) {
        console.error(error);
        setError("获取博客内容失败，请稍后重试");
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [alias]);

  // 如果有错误，显示错误页面
  if (error) {
    return (
      <ErrorPage
        title="加载失败"
        message={error}
        code="ERROR"
        onRefresh={() => window.location.reload()}
      />
    );
  }

  // 加载中显示骨架屏
  if (loading) {
    return <BlogSkeleton />;
  }

  return (
    <>
      <div className="relative text-default-600 flex flex-col gap-4 lg:flex-row p-2 lg:p-4">
        <div className="w-full p-2 md:p-4">
          <div className="max-w-4xl mx-auto">
            {/* 文章标题 */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {post?.title}
              </h1>
            </div>

            {/* 文章内容 */}
            <div className="prose prose-lg max-w-none">
              <Markdown
                className="break-words overflow-x-auto"
                content={post?.content || ""}
              />
            </div>
          </div>
        </div>
        <BackToTop />
      </div>
    </>
  );
}
