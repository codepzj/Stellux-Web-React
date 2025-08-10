import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";

export default function Blog() {
  const location = useLocation();

  useEffect(() => {
    // 监听url变化，回到顶部
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  }, [location.pathname, location.search]);

  return (
    <div className="max-w-3xl mx-auto">
      <Outlet />
    </div>
  );
}
