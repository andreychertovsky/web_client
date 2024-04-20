import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  vite: {
    css: {
      modules: {
        localsConvention: "camelCase"
      }
    }
  },
  output: "hybrid",
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  })
});
