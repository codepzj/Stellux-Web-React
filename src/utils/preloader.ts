import { preloadDocumentData } from "./document-tree";
import { getDocumentByAlias } from "@/api/document";
import { getAllDocumentContentByDocumentId } from "@/api/document-content";

// 预加载队列，避免重复请求
const preloadQueue = new Set<string>();

// 预加载管理器
export const preloadManager = {
  // 预加载文档数据
  preloadDocument: async (rootAlias: string) => {
    // 如果已经在预加载队列中，跳过
    if (preloadQueue.has(rootAlias)) {
      return;
    }

    // 添加到预加载队列
    preloadQueue.add(rootAlias);

    try {
      await preloadDocumentData(
        rootAlias,
        getDocumentByAlias,
        getAllDocumentContentByDocumentId,
      );
    } catch (error) {
      console.warn("预加载文档失败:", rootAlias, error);
    } finally {
      // 从预加载队列中移除
      preloadQueue.delete(rootAlias);
    }
  },

  // 预加载多个文档
  preloadDocuments: async (rootAliases: string[]) => {
    const promises = rootAliases.map((alias) =>
      preloadManager.preloadDocument(alias),
    );
    await Promise.allSettled(promises);
  },

  // 检查是否正在预加载
  isPreloading: (rootAlias: string) => preloadQueue.has(rootAlias),

  // 清除预加载队列
  clearQueue: () => preloadQueue.clear(),
};

// React Hook 用于预加载
export function usePreloadDocument() {
  const preload = (rootAlias: string) => {
    if (rootAlias) {
      preloadManager.preloadDocument(rootAlias);
    }
  };

  return { preload };
}

// 从URL中提取根文档别名
export function extractRootAliasFromUrl(url: string): string | null {
  const match = url.match(/\/document\/([^/]+)/);
  return match ? match[1] : null;
}
