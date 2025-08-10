import { toc } from "mdast-util-toc";
import { remark } from "remark";
import { visit } from "unist-util-visit";

// 基础 AST 节点类型
interface BaseNode {
  type: string;
}

// 文本节点
interface TextNode extends BaseNode {
  type: "text";
  value: string;
}

// 强调（斜体）节点
interface EmphasisNode extends BaseNode {
  type: "emphasis";
  children: RootContent[];
}

// 加粗节点
interface StrongNode extends BaseNode {
  type: "strong";
  children: RootContent[];
}

// 行内代码节点
interface InlineCodeNode extends BaseNode {
  type: "inlineCode";
  value: string;
}

// 链接节点
interface LinkNode extends BaseNode {
  type: "link";
  url: string;
  children: RootContent[];
}

// 段落节点
interface ParagraphNode extends BaseNode {
  type: "paragraph";
  children: RootContent[];
}

// 列表节点
interface ListNode extends BaseNode {
  type: "list";
  children: ListItemNode[];
}

// 列表项节点
interface ListItemNode extends BaseNode {
  type: "listItem";
  children: RootContent[];
}

// 根节点
interface RootNode extends BaseNode {
  type: "root";
  children: RootContent[];
}

// 所有可能的节点类型
type RootContent =
  | TextNode
  | EmphasisNode
  | StrongNode
  | InlineCodeNode
  | LinkNode
  | ParagraphNode
  | ListNode
  | ListItemNode
  | RootNode;

const textTypes: string[] = ["text", "emphasis", "strong", "inlineCode"];

function flattenNode(node: RootContent): string {
  const p: string[] = [];
  visit(node as any, (n: any) => {
    if (!textTypes.includes(n.type)) return;
    if (typeof n.value === "string") {
      p.push(n.value);
    }
  });
  return p.join("");
}

export interface Item {
  title: string;
  url: string;
  items?: Item[];
}

export interface Items {
  items?: Item[];
}

function getItems(
  node: RootContent | null | undefined,
  current: Item,
  level = 1,
): Items {
  if (!node) return current;

  if (node.type === "paragraph") {
    visit(node as any, (item: any) => {
      if (item.type === "link") {
        current.url = item.url;
        current.title = flattenNode(node);
      } else if (item.type === "text") {
        current.title = flattenNode(node);
      }
    });
    return current;
  }

  if (node.type === "list") {
    if (level >= 3) return current;
    const list = node as ListNode;
    current.items = list.children.map(
      (i: any) => getItems(i, { title: "", url: "" }, level + 1) as Item,
    );
    return current;
  }

  if (node.type === "listItem") {
    const listItem = node as ListItemNode;
    const heading = getItems(
      listItem.children[0],
      { title: "", url: "" },
      level,
    );
    if (listItem.children.length > 1) {
      getItems(listItem.children[1], heading as Item, level);
    }
    return heading;
  }

  return current;
}

function updateUrlsWithIncrement(
  items?: Item[],
  counter = { count: 1 },
): Item[] | undefined {
  return items?.map((item) => {
    const newItem: Item = {
      ...item,
      url: `#header-${counter.count++}`,
    };

    if (item.items) {
      newItem.items = updateUrlsWithIncrement(item.items, counter);
    }

    return newItem;
  });
}

function getToc() {
  return (node: RootNode, file: any) => {
    const table = toc(node as any);
    const items = getItems(table.map as RootContent, { title: "", url: "" }, 1);
    file.data = updateUrlsWithIncrement(items.items);
  };
}

export type TableOfContents = Items;

export async function getTableOfContents(
  content: string,
): Promise<TableOfContents> {
  const result = await remark().use(getToc).process(content);
  return result.data as TableOfContents;
}
