import path from "path";
import { langInfo, messages } from "./lang";

const locales = Object.values(langInfo);

export default {
  mode: "spa",
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ]
  },
  loading: { color: "#fff" },
  css: [
    "@/assets/fonts/Humanitarian-Icons.css",
    "@/assets/fonts/fonts.css",
    "@/assets/scss/index.scss"
  ],
  plugins: [
    { src: "~/plugins/pouchdb.js", mode: "client" },
    { src: "~/plugins/vuex-persist.js", mode: "client" }
  ],
  buildModules: ["@nuxtjs/eslint-module", "@nuxtjs/vuetify"],
  modules: ["@nuxtjs/axios", "@nuxtjs/pwa", "nuxt-i18n"],
  router: {
    middleware: "redirect"
  },
  // env: {
  //   databaseBaseUrl: process.env.DATABASE_BASE_URL || "http://localhost:5984"
  // },
  env: {
    databaseBaseUrl:
      process.env.DATABASE_BASE_URL || "https://tiles-couchdb.pngk.org"
  },
  i18n: {
    detectBrowserLanguage: false,
    locales,
    vueI18n: {
      messages
    },
    parsePages: false,
    pages: {
      index: false,
      camp: false,
      language: false
    }
  },
  axios: {},
  vuetify: {
    customVariables: ["@/assets/scss/variables.scss"],
    defaultAssets: false,
    icons: {
      iconfont: "mdiSvg"
    },
    // theme: {
    //   themes: {
    //     light: {
    //       primary: "#E8991C",
    //       accent: "#9E6100",
    //       secondary: "#E8E3D9",
    //       tertiary: "#4A637A"
    //     }
    //   }
    // },
    treeShake: true
  },
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.md$/,
        loader: "frontmatter-markdown-loader",
        include: path.resolve(__dirname, "content")
      });
    }
  },
  manifest: {
    name: "TILES",
    short_name: "TILES",
    lang: "en",
    display: "standalone",
    background_color: "#E8991C",
    theme_color: "#E8991C"
  },
  workbox: {
    offline: false,
    cacheAssets: false,
    cachingExtensions: "@/plugins/workbox-precaching-and-route.js",
    routingExtensions: "@/plugins/workbox-navigation-route.js"
  }
};
