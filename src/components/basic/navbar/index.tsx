import { useState } from "react";
import { Link } from "@heroui/react";
import { useLocation } from "react-router";
import { IconBrandGithub } from "@tabler/icons-react";

// 简单导航项
const NAV_LINKS = [
  { href: "/", label: "首页" },
  { href: "/blog", label: "博客" },
  { href: "/document", label: "文档" },
];

// 桌面端导航
function DesktopNav() {
  const location = useLocation();
  const currentPath =
    location.pathname === "/" ? "/" : "/" + location.pathname.split("/")[1];
  return (
    <nav className="hidden md:flex flex-1 ml-8 space-x-4">
      {NAV_LINKS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`px-2 py-1 rounded text-sm ${
            currentPath === item.href
              ? "text-primary font-bold bg-blue-50 dark:bg-gray-800"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

// 移动端导航
function MobileNav({ onClick }: { onClick: () => void }) {
  // 让下拉菜单宽度占满全屏
  return (
    <div className="fixed top-14 left-0 w-full z-30 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 py-3">
      <div className="flex flex-col space-y-2">
        {NAV_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClick}
            className="block px-2 py-2 rounded text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white dark:bg-gray-950">
      <div className="mx-auto flex h-14 items-center justify-between px-4 max-w-3xl rounded-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
        {/* Logo */}
        <Link href="/" className="font-bold text-lg text-primary">
          浩瀚星河
        </Link>

        {/* 桌面导航 */}
        <DesktopNav />

        {/* 右侧操作区 */}
        <div className="flex items-center space-x-2">
          <Link
            href="https://github.com/codepzj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 p-1 rounded-full"
          >
            <IconBrandGithub className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          {/* 移动端菜单按钮 */}
          <button
            className="md:hidden text-gray-600 dark:text-gray-300 p-1 rounded-full"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="打开菜单"
          >
            {isMenuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" x2="6" y1="6" y2="18"></line>
                <line x1="6" x2="18" y1="6" y2="18"></line>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>
      {/* 移动端菜单 */}
      {isMenuOpen && (
        <div className="md:hidden">
          <MobileNav onClick={() => setIsMenuOpen(false)} />
        </div>
      )}
    </header>
  );
}
