import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Brotli 压缩
    viteCompression({
      verbose: true,
      threshold: 10240,
      algorithm: "brotliCompress",
      ext: ".br",
    }),
    // gzip 压缩
    viteCompression({
      verbose: true,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    sourcemap: false,
    minify: "esbuild",
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // React 核心
            if (id.includes("react") || id.includes("react-dom")) {
              return "react-core";
            }
            // 路由
            if (id.includes("react-router")) {
              return "react-router";
            }
            // UI 库
            if (id.includes("@heroui") || id.includes("@radix-ui")) {
              return "ui-lib";
            }
            // 动画
            if (id.includes("framer-motion")) {
              return "animation";
            }
            // Markdown 相关
            if (
              id.includes("react-markdown") ||
              id.includes("remark") ||
              id.includes("rehype")
            ) {
              return "markdown";
            }
            // 代码高亮
            if (id.includes("highlight.js")) {
              return "highlight";
            }
            // 图标
            if (
              id.includes("@tabler/icons-react") ||
              id.includes("lucide-react")
            ) {
              return "icons";
            }
            // 工具库
            if (
              id.includes("axios") ||
              id.includes("dayjs") ||
              id.includes("clsx") ||
              id.includes("tailwind-merge")
            ) {
              return "utils";
            }
            // 其他第三方
            return "vendor";
          }
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
            return "assets/images/[name]-[hash][extname]";
          }
          if (/\.css$/.test(name ?? "")) {
            return "assets/css/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router",
      "axios",
      "dayjs",
      "@heroui/react",
      "framer-motion",
      "highlight.js",
      "react-markdown",
    ],
  },
});
