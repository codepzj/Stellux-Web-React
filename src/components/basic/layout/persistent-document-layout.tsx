import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DocSidebar } from "@/views/document/content/sidebar";
import { convertToDocumentTreeData } from "@/utils/document-tree";
import { ErrorPage } from "@/components/basic/tool/error-page";
import type { DocumentContentVO } from "@/types/document-content";

interface PersistentDocumentLayoutProps {
  children: React.ReactNode;
  document: any;
  documentContentList: DocumentContentVO[];
  rootAlias: string;
}

export function PersistentDocumentLayout({
  children,
  document,
  documentContentList,
  rootAlias,
}: PersistentDocumentLayoutProps) {
  const location = useLocation();
  const [sidebarKey, setSidebarKey] = useState<string>("");

  // 生成侧边栏的key，用于控制重新渲染
  useEffect(() => {
    if (document?.id) {
      setSidebarKey(`${rootAlias}-${document.id}`);
    }
  }, [rootAlias, document?.id]);

  // 计算文档树数据
  const treeItems = useMemo(
    () => convertToDocumentTreeData(documentContentList, rootAlias),
    [documentContentList, rootAlias]
  );

  // 检查是否需要重新渲染侧边栏
  const shouldRecreateSidebar = useMemo(() => {
    // 如果根文档变化，需要重新创建侧边栏
    const currentRootAlias = location.pathname.split("/")[2]; // /document/rootAlias/subAlias
    return currentRootAlias !== rootAlias;
  }, [location.pathname, rootAlias]);

  if (!document) {
    return (
      <ErrorPage
        title="文档不存在"
        message="抱歉，您访问的文档不存在或已被删除。"
        code="404"
        onRefresh={() => window.location.reload()}
      />
    );
  }

  return (
    <SidebarProvider
      style={{ "--sidebar-width": "256px" } as React.CSSProperties}
    >
      {/* 使用key来控制侧边栏的重新渲染 */}
      <DocSidebar
        key={shouldRecreateSidebar ? `sidebar-${Date.now()}` : sidebarKey}
        docTitle={document?.title}
        doctree={treeItems}
        className="hidden md:block fixed top-0 left-0"
      />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
