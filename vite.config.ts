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
        manualChunks: {
          react: ["react"],
          "react-dom": ["react-dom"],
          router: ["react-router"],
          framer: ["framer-motion"],
          heroui: ["@heroui/react"],
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
