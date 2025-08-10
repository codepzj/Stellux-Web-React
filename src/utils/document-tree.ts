import type { DocumentContentVO } from "@/types/document-content";
import type { LucideIcon } from "lucide-react";

export interface DocTreeItem {
  title: string;
  url: string;
  sort: number;
  created_at: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: DocTreeItem[];
}

// 缓存存储
const documentCache = new Map<string, any>();
const contentCache = new Map<string, DocumentContentVO[]>();

// 缓存管理工具
export const cacheManager = {
  // 获取缓存的文档
  getDocument: (alias: string) => documentCache.get(alias),

  // 设置文档缓存
  setDocument: (alias: string, data: any) => {
    documentCache.set(alias, data);
  },

  // 获取缓存的内容列表
  getContentList: (documentId: string) => contentCache.get(documentId),

  // 设置内容列表缓存
  setContentList: (documentId: string, data: DocumentContentVO[]) => {
    contentCache.set(documentId, data);
  },

  // 清除特定文档的缓存
  clearDocumentCache: (alias: string) => {
    documentCache.delete(alias);
  },

  // 清除特定文档的内容缓存
  clearContentCache: (documentId: string) => {
    contentCache.delete(documentId);
  },

  // 清除所有缓存
  clearAllCache: () => {
    documentCache.clear();
    contentCache.clear();
  },
};

// 将文档内容列表转换为文档树结构，并根据 sort、created_at 字段同级升序排序
export function convertToDocumentTreeData(
  data: DocumentContentVO[],
  alias: string,
): DocTreeItem[] {
  const map = new Map<string, DocTreeItem>();

  if (!data) {
    return [];
  }

  // 先创建所有节点
  for (const doc of data) {
    map.set(doc.id, {
      title: doc.title,
      url: `/document/${alias}/${doc.alias}`,
      sort: doc.sort,
      created_at: doc.created_at,
    });
  }

  const tree: DocTreeItem[] = [];
  for (const doc of data) {
    const node = map.get(doc.id)!;
    // 如果 parent_id 为空或者等于 document_id，说明是根节点
    if (
      !doc.parent_id ||
      doc.parent_id === doc.document_id ||
      !map.has(doc.parent_id)
    ) {
      tree.push(node);
    } else {
      const parent = map.get(doc.parent_id)!;
      if (!parent.items) parent.items = [];
      parent.items.push(node);
    }
  }

  // 递归排序函数，先按 sort 升序，再按 created_at 升序
  function sortTree(items: DocTreeItem[]) {
    items.sort((a, b) => {
      if ((a.sort ?? 0) !== (b.sort ?? 0)) {
        return (a.sort ?? 0) - (b.sort ?? 0);
      }
      // created_at 升序
      if (a.created_at < b.created_at) return -1;
      if (a.created_at > b.created_at) return 1;
      return 0;
    });
    for (const item of items) {
      if (item.items && item.items.length > 0) {
        sortTree(item.items);
      }
    }
  }

  sortTree(tree);

  return tree;
}

// 预加载文档数据的工具函数
export async function preloadDocumentData(
  rootAlias: string,
  getDocumentByAlias: (alias: string) => Promise<any>,
  getAllDocumentContentByDocumentId: (id: string) => Promise<any>,
) {
  try {
    // 检查缓存
    const cachedDocument = cacheManager.getDocument(rootAlias);
    if (cachedDocument) {
      const cachedContentList = cacheManager.getContentList(cachedDocument.id);
      if (cachedContentList) {
        return {
          document: cachedDocument,
          documentContentList: cachedContentList,
        };
      }
    }

    // 获取文档数据
    const docRes = await getDocumentByAlias(rootAlias);
    const document = docRes.data;

    // 缓存文档
    cacheManager.setDocument(rootAlias, document);

    // 获取内容列表
    const contentRes = await getAllDocumentContentByDocumentId(document.id);
    const documentContentList = contentRes.data || [];

    // 缓存内容列表
    cacheManager.setContentList(document.id, documentContentList);

    return { document, documentContentList };
  } catch (error) {
    console.error("预加载文档数据失败:", error);
    throw error;
  }
}
