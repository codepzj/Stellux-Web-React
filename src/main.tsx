import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";

import AppLayout from "@/components/basic/layout/app-layout";
import Home from "@/views/home/index";
import BlogList from "@/views/blog/list";
import BlogContent from "@/views/blog/content/page";

import DocContent from "@/views/document/content/index";
import DocumentList from "@/views/document/index";
import DocumentLayout from "@/components/basic/layout/document-layout";
import NotFoundPage from "@/views/error/404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
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
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <RouterProvider router={router} />
    </HeroUIProvider>
  </StrictMode>,
);
