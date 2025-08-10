import { getPostByAliasAPI } from "@/api/post";
import { Markdown } from "@/components/business/md";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import type { PostVO } from "@/types/post";
import { ErrorPage } from "@/components/basic/tool/error-page";
import { BackToTop } from "@/components/basic/tool/back-to-top";

// 使用 heroui 的 Loading 组件替换骨架屏
import { Spinner } from "@heroui/react";

function ArticleSkeleton() {
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <Spinner color="primary" label="文章加载中..." />
    </div>
  );
}

export default function BlogContent() {
  const params = useParams();
  const alias = params.alias as string;
  const [post, setPost] = useState<PostVO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
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

  return (
    <>
      <div className="relative text-default-600 flex flex-col gap-4 lg:flex-row p-2 lg:p-4">
        <div className="w-full p-2 md:p-4">
          {loading ? (
            <ArticleSkeleton />
          ) : (
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
          )}
        </div>
        <BackToTop />
      </div>
    </>
  );
}
