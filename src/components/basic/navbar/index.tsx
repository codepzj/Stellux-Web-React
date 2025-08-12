import { useState } from "react";
import { Link } from "@heroui/react";
import { useLocation } from "react-router";
import { IconBrandGithub } from "@tabler/icons-react";

const NAV_LINKS = [
  { href: "/", label: "首页" },
  { href: "/blog", label: "博客" },
  { href: "/document", label: "文档" },
];

function DesktopNav() {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1] || "/";

  return (
    <nav className="hidden md:flex items-center space-x-6 ml-[-32px]">
      {NAV_LINKS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-sm transition-colors duration-200 ${
            currentPath === item.href.split("/")[1] ||
            (currentPath === "/" && item.href === "/")
              ? "text-primary font-medium"
              : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

function MobileNav({ onClick }: { onClick: () => void }) {
  return (
    <div className="fixed inset-x-0 top-14 z-30 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
      <div className="flex flex-col space-y-3 px-4 py-3">
        {NAV_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClick}
            className="px-2 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary transition-colors"
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
    <header className="sticky top-0 z-20 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
      <div className="mx-auto flex h-16 items-center justify-between px-4 max-w-5xl">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-semibold text-primary hover:opacity-80 transition-opacity"
        >
          浩瀚星河
        </Link>

        {/* 桌面导航 */}
        <DesktopNav />

        {/* 右侧操作区 */}
        <div className="flex items-center space-x-4">
          <Link
            href="https://github.com/codepzj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="GitHub"
          >
            <IconBrandGithub className="h-5 w-5" />
          </Link>

          {/* 移动端菜单按钮 */}
          <button
            className="md:hidden text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="菜单"
          >
            {isMenuOpen ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 12h16M4 6h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 移动端菜单 */}
      {isMenuOpen && <MobileNav onClick={() => setIsMenuOpen(false)} />}
    </header>
  );
}
