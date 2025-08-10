import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { NavMain } from "./nav-main";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { DocTitle } from "./title";
import type { DocTreeItem } from "@/utils/document-tree";
import { Button } from "@heroui/react";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router";
// import { ThemeSwitcher } from '@/components/basic/theme-switcher'

export function DocSidebar({
  docTitle,
  doctree,
  className,
}: {
  docTitle: string;
  doctree: DocTreeItem[];
  className?: string;
}) {
  return (
    <Sidebar collapsible="offcanvas" variant="sidebar" className={className}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to="/document">
              <Button
                variant="light"
                size="sm"
                className="w-full justify-start px-2 my-2"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                返回文档列表
              </Button>
            </Link>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <DocTitle docTitle={docTitle} />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain doctree={doctree} />
      </SidebarContent>
      <SidebarFooter>
        {/* <div className="flex items-center justify-center">
          <ThemeSwitcher />
        </div> */}
      </SidebarFooter>
    </Sidebar>
  );
}
