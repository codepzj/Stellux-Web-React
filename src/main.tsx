import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";

// 公共布局
const AppLayout = lazy(() => import("@/components/basic/layout/app-layout"));
const DocumentLayout = lazy(
  () => import("@/components/basic/layout/document-layout")
);

// 页面组件懒加载
const Home = lazy(() => import("@/views/home/index"));
const BlogList = lazy(() => import("@/views/blog/list"));
const BlogContent = lazy(() => import("@/views/blog/content/page"));
const DocumentList = lazy(() => import("@/views/document/index"));
const DocContent = lazy(() => import("@/views/document/content/index"));
const NotFoundPage = lazy(() => import("@/views/error/404"));

// 加载组件
const Loading = lazy(() => import("@/components/basic/loading"));

// 路由配置
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <AppLayout />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "blog",
        element: <BlogList />,
      },
      {
        path: "blog/:alias",
        element: <BlogContent />,
      },
      {
        path: "document",
        element: <DocumentList />,
      },
    ],
  },
  {
    path: "document",
    element: <DocumentLayout />,
    children: [
      {
        path: ":root/:sub?",
        element: <DocContent />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<Loading />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <RouterProvider router={router} />
    </HeroUIProvider>
  </StrictMode>
);
