import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Icons({
      compiler: "vue3",
      autoInstall: true,
      customCollections: {
        patrol: FileSystemIconLoader("./src/assets/icons", (svg) =>
          svg.replace(/^<svg /, '<svg fill="currentColor" '),
        ),
      },
    }),
  ],
});
