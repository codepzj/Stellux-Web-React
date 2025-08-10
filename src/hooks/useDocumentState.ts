import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router";
import { getDocumentByAlias } from "@/api/document";
import { getAllDocumentContentByDocumentId } from "@/api/document-content";
import { preloadDocumentData, cacheManager } from "@/utils/document-tree";
import { performanceMonitor } from "@/utils/performance";
import type { DocumentContentVO } from "@/types/document-content";

interface UseDocumentStateReturn {
  document: any;
  documentContentList: DocumentContentVO[];
  documentContent?: DocumentContentVO;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  clearCache: () => void;
}

export function useDocumentState(): UseDocumentStateReturn {
  const params = useParams();
  const rootAlias = params.root as string;
  const subAlias = params.sub as string | undefined;

  const [document, setDocument] = useState<any>(null);
  const [documentContentList, setDocumentContentList] = useState<
    DocumentContentVO[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 是否是根文档概览页
  const isRoot = useMemo(() => !subAlias, [subAlias]);

  // 当前子文档内容
  const documentContent = useMemo(() => {
    if (isRoot) return undefined;
    return documentContentList.find((item) => item.alias === subAlias);
  }, [isRoot, documentContentList, subAlias]);

  // 获取数据的函数
  const fetchData = useCallback(async () => {
    if (!rootAlias) return;

    setLoading(true);
    setError(null);
    const startTime = performance.now();

    try {
      const { document: doc, documentContentList: contentList } =
        await preloadDocumentData(
          rootAlias,
          getDocumentByAlias,
          getAllDocumentContentByDocumentId,
        );

      setDocument(doc);
      setDocumentContentList(contentList);

      // 记录加载性能
      performanceMonitor.recordPageLoad(`文档-${rootAlias}`, startTime);
    } catch (err: any) {
      setError("获取文档数据失败:" + err?.message);
      setDocument(null);
      setDocumentContentList([]);
    } finally {
      setLoading(false);
    }
  }, [rootAlias]);

  // 刷新数据的函数
  const refreshData = useCallback(async () => {
    if (rootAlias) {
      // 清除当前文档的缓存
      cacheManager.clearDocumentCache(rootAlias);
      if (document?.id) {
        cacheManager.clearContentCache(document.id);
      }
      await fetchData();
    }
  }, [rootAlias, document?.id, fetchData]);

  // 清除缓存的函数
  const clearCache = useCallback(() => {
    cacheManager.clearAllCache();
  }, []);

  // 监听路由参数变化
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    document,
    documentContentList,
    documentContent,
    loading,
    error,
    refreshData,
    clearCache,
  };
}
