import { Suspense, lazy, useMemo } from "react";
import { HeroUIProvider } from "@heroui/react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";

const AppLayout = lazy(() => import("@/components/basic/layout/app-layout"));
const DocumentLayout = lazy(
  () => import("@/components/basic/layout/document-layout")
);

const Home = lazy(() => import("@/views/home/index"));
const BlogList = lazy(() => import("@/views/blog/list"));
const BlogContent = lazy(() => import("@/views/blog/content/page"));
const DocumentList = lazy(() => import("@/views/document/index"));
const DocContent = lazy(() => import("@/views/document/content/index"));
const NotFoundPage = lazy(() => import("@/views/error/404"));
import Loading from "@/components/basic/loading";

export default function App() {
  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: "/",
          element: (
            <Suspense fallback={<Loading />}>
              <AppLayout />
            </Suspense>
          ),
          children: [
            { path: "", element: <Home /> },
            { path: "blog", element: <BlogList /> },
            { path: "blog/:alias", element: <BlogContent /> },
            { path: "document", element: <DocumentList /> },
          ],
        },
        {
          path: "document",
          element: (
            <Suspense fallback={<Loading />}>
              <DocumentLayout />
            </Suspense>
          ),
          children: [{ path: ":root/:sub?", element: <DocContent /> }],
        },
        {
          path: "*",
          element: (
            <Suspense fallback={<Loading />}>
              <NotFoundPage />
            </Suspense>
          ),
        },
      ]),
    []
  );
  return (
    <HeroUIProvider>
      <RouterProvider router={router} />
    </HeroUIProvider>
  );
}
