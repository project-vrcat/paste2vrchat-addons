import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import copy from "rollup-plugin-copy";
import windiConfig from "./windi.config";
import WindiCSS from "vite-plugin-windicss";

export default defineConfig({
  root: "src",
  base: "/",
  build: {
    outDir: resolve(__dirname, "dist"),
    // https://developer.chrome.com/docs/webstore/program_policies/#:~:text=Code%20Readability%20Requirements
    terserOptions: {
      mangle: false,
    },
    emptyOutDir: true,
    rollupOptions: {
      inlineDynamicImports: true,
      input: {
        background: resolve(__dirname, "src/background.ts"),
        options: resolve(__dirname, "src/options/index.html"),
      },
      output: {
        entryFileNames: "js/[name].js",
        chunkFileNames: "js/[name].js",
      },
    },
  },
  optimizeDeps: {
    include: ["vue"],
  },
  plugins: [
    copy({
      targets: [
        { src: "images", dest: "dist" },
        { src: "src/manifest.json", dest: "dist" },
      ],
      hook: "writeBundle",
    }),
    vue(),
    WindiCSS({
      config: windiConfig,
    }),
  ],
});
