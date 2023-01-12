import { fileURLToPath, URL } from "node:url";
import presetIcons from "@unocss/preset-icons";
import presetUno from "@unocss/preset-uno";
import presetWebFonts from "@unocss/preset-web-fonts";
import presetMini from '@unocss/preset-mini'
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Unocss from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Unocss({
      presets: [
        presetMini(),
        presetIcons({}),
        presetUno(),
        presetWebFonts({
          provider: "google",
          fonts: {
            sans: "Nunito Sans",
          },
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
