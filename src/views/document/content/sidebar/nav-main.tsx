import { Link } from "@heroui/react";
import type { DocTreeItem } from "@/utils/document-tree";
import { useLocation } from "react-router";
import { IconChevronRight } from "@tabler/icons-react";
import { memo, useState, useEffect, useCallback } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";

// 判断当前 item 或其子孙是否匹配当前路径
function itemMatchesPath(item: DocTreeItem, pathname: string): boolean {
  if (item.url === pathname) return true;
  if (item.items) {
    return item.items.some((child: DocTreeItem) =>
      itemMatchesPath(child, pathname),
    );
  }
  return false;
}

// 使用memo优化渲染性能
const RecursiveMenuItem = memo(
  ({ item, depth = 0 }: { item: DocTreeItem; depth?: number }) => {
    const pathname = useLocation().pathname;
    const hasChildren = item.items && item.items.length > 0;

    const shouldBeOpen = itemMatchesPath(item, pathname);
    const [open, setOpen] = useState(shouldBeOpen);

    // 当路径变化时重新展开匹配项
    useEffect(() => {
      setOpen(shouldBeOpen);
    }, [pathname, shouldBeOpen]);

    // 使用useCallback优化事件处理
    const handleOpenChange = useCallback((newOpen: boolean) => {
      setOpen(newOpen);
    }, []);

    if (!hasChildren) {
      const isActive = pathname === item.url;
      return (
        <SidebarMenuItem
          className={cn(
            "rounded-md transition-all duration-200",
            `ml-${depth * 2}`,
          )}
        >
          <SidebarMenuButton asChild tooltip={item.title}>
            <Link
              href={item.url}
              className={cn(
                "transition-all duration-200 hover:!bg-primary/10 hover:dark:!bg-primary/20",
                isActive && "bg-primary/10 dark:bg-primary/20 font-medium",
              )}
            >
              {item.icon && <item.icon className="w-4 h-4" />}
              <span className="truncate">{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    }

    return (
      <Collapsible asChild open={open} onOpenChange={handleOpenChange}>
        <SidebarMenuItem className="ml-0">
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={item.title}>
              {item.icon && <item.icon className="w-4 h-4" />}
              <span className="truncate">{item.title}</span>
              <IconChevronRight
                className={cn(
                  "ml-auto transition-transform duration-200 ease-in-out",
                  open && "rotate-90",
                )}
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent className="transition-all duration-200 ease-in-out">
            <SidebarMenuSub className="px-0">
              {item.items?.map((child: DocTreeItem) => (
                <RecursiveMenuItem
                  key={`${child.title}-${child.url}`}
                  item={child}
                  depth={depth + 1}
                />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  },
);

RecursiveMenuItem.displayName = "RecursiveMenuItem";

// 使用memo优化整个导航组件
export const NavMain = memo(({ doctree }: { doctree: DocTreeItem[] }) => {
  return (
    <SidebarGroup>
      <SidebarMenu className="mt-8">
        {doctree.map((item) => (
          <RecursiveMenuItem
            key={`${item.title}-${item.url}`}
            item={item}
            depth={0}
          />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
});

NavMain.displayName = "NavMain";
