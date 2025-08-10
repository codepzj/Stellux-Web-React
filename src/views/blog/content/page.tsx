import { getPostByAliasAPI } from "@/api/post";
import { Markdown } from "@/components/business/md";
import { Skeleton } from "@heroui/react";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import type { PostVO } from "@/types/post";
import { IconUser, IconCalendar } from "@tabler/icons-react";
import { ErrorPage } from "@/components/basic/error-page";
import { BackToTop } from "@/components/basic/back-to-top";

// 博客文章风格的骨架屏
function ArticleSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* 标题骨架 */}
      <div className="text-center mb-8">
        <Skeleton className="h-8 w-3/4 mx-auto rounded mb-4" />
      </div>

      {/* 文章元信息骨架 */}
      <div className="flex justify-center items-center gap-6 mb-8 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-20 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-28 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-28 rounded" />
        </div>
      </div>

      {/* 文章内容骨架 */}
      <div className="prose prose-lg max-w-none">
        {/* 开头段落 */}
        <div className="space-y-4 mb-8">
          <Skeleton className="h-6 w-full rounded" />
          <Skeleton className="h-6 w-5/6 rounded" />
          <Skeleton className="h-6 w-4/5 rounded" />
        </div>

        {/* 小标题 */}
        <Skeleton className="h-6 w-1/3 rounded mb-4" />

        {/* 段落内容 */}
        <div className="space-y-4 mb-8">
          <Skeleton className="h-6 w-full rounded" />
          <Skeleton className="h-6 w-3/4 rounded" />
          <Skeleton className="h-6 w-5/6 rounded" />
        </div>

        {/* 代码块骨架 */}
        <div className="mb-8">
          <Skeleton className="h-6 w-1/4 rounded mb-2" />
          <Skeleton className="h-32 w-full rounded-lg bg-gray-100 dark:bg-gray-800" />
        </div>

        {/* 更多段落 */}
        <div className="space-y-4 mb-8">
          <Skeleton className="h-6 w-full rounded" />
          <Skeleton className="h-6 w-4/5 rounded" />
          <Skeleton className="h-6 w-3/4 rounded" />
        </div>

        {/* 列表骨架 */}
        <div className="mb-8">
          <Skeleton className="h-6 w-1/3 rounded mb-4" />
          <div className="space-y-2 pl-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-2 w-2 rounded-full" />
              <Skeleton className="h-4 w-1/2 rounded" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-2 w-2 rounded-full" />
              <Skeleton className="h-4 w-2/3 rounded" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-2 w-2 rounded-full" />
              <Skeleton className="h-4 w-1/3 rounded" />
            </div>
          </div>
        </div>

        {/* 图片骨架 */}
        <div className="mb-8">
          <Skeleton className="h-48 w-full rounded-lg bg-gray-100 dark:bg-gray-800" />
          <Skeleton className="h-4 w-1/3 rounded mt-2" />
        </div>

        {/* 结尾段落 */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-full rounded" />
          <Skeleton className="h-6 w-2/3 rounded" />
          <Skeleton className="h-6 w-1/2 rounded" />
        </div>
      </div>
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
        <div className={`w-full p-4`}>
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

              {/* 文章元信息 */}
              <div className="flex justify-center items-center gap-6 mb-8 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <IconUser className="h-4 w-4" />
                  <span>{post?.author || "未知作者"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCalendar className="h-4 w-4" />
                  <span>
                    发布于{" "}
                    {post?.created_at
                      ? new Date(post.created_at).toLocaleDateString("zh-CN")
                      : "未知时间"}
                  </span>
                </div>
                {post?.updated_at && post.updated_at !== post.created_at && (
                  <div className="flex items-center gap-2">
                    <IconCalendar className="h-4 w-4" />
                    <span>
                      更新于{" "}
                      {new Date(post.updated_at).toLocaleDateString("zh-CN")}
                    </span>
                  </div>
                )}
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
