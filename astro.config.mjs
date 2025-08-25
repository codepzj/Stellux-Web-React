import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import react from "@astrojs/react";
import tailwind from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import viteCompression from "vite-plugin-compression";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
  integrations: [react()],
  vite: {
    plugins: [
      tailwind(),
      viteCompression({
        verbose: true,
        threshold: 10240,
        algorithm: "brotliCompress",
        ext: ".br",
      }),
      viteCompression({
        verbose: true,
        threshold: 10240,
        algorithm: "gzip",
        ext: ".gz",
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      target: "esnext",
      cssCodeSplit: true,
      assetsInlineLimit: 4096,
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
  },
});
