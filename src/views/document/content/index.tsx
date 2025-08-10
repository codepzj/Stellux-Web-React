import { useMemo } from "react";
import { useParams } from "react-router";
import { Markdown } from "@/components/business/md";
import { ScrollToc } from "@/components/business/toc";
import { PersistentDocumentLayout } from "@/components/basic/layout/persistent-document-layout";
import Loading from "@/components/basic/loading";
import { ErrorPage } from "@/components/basic/tool/error-page";
import { useDocumentState } from "@/hooks/useDocumentState";
import { BackToTop } from "@/components/basic/tool/back-to-top";
import { SidebarToggle } from "@/components/basic/tool/sidebar-toggle";

export default function DocPage() {
  // 获取路由参数
  const params = useParams();
  const rootAlias = params.root as string;
  const subAlias = params.sub as string | undefined;

  // 使用自定义Hook管理文档状态
  const { document, documentContentList, documentContent, loading, error } =
    useDocumentState();

  // 是否是根文档概览页
  const isRoot = useMemo(() => !subAlias, [subAlias]);

  // 检查内容是否包含二级(##)或三级(###)标题
  const hasHeadings = useMemo(() => {
    if (isRoot) {
      return false;
    } else {
      return /^##\s|^###\s/m.test(documentContent?.content || "");
    }
  }, [isRoot, documentContent]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[100vh] bg-white dark:bg-gray-950">
        <Loading />
      </div>
    );
  }

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
      <PersistentDocumentLayout
        document={document}
        documentContentList={documentContentList}
        rootAlias={rootAlias}
      >
        <div className="w-full flex flex-col md:flex-row justify-center gap-2 mt-8">
          <div
            className={`w-full ${
              hasHeadings ? "lg:w-4/5" : "lg:w-full"
            } md:max-w-xl lg:max-w-3xl md:mr-4 mb-20 px-4`}
          >
            <div className="text-3xl font-bold font-sans py-4 mb-12">
              {isRoot ? document?.title || "" : documentContent?.title || ""}
            </div>
            <Markdown
              className="pl-2 break-words overflow-x-auto"
              content={
                isRoot
                  ? document?.description || ""
                  : documentContent?.content || ""
              }
            />
          </div>
          <div className="hidden lg:block sticky top-8 h-[calc(100vh-1rem)] w-48 shrink-0">
            <ScrollToc
              content={
                isRoot
                  ? document?.description || ""
                  : documentContent?.content || ""
              }
            />
          </div>
        </div>
        <BackToTop />
        <SidebarToggle />
      </PersistentDocumentLayout>
    </>
  );
}
