import path from "path";
import { content, perPage } from "./content";
const pages = [...Array(Math.ceil(content.length / perPage)).keys()].slice(2);

export default {
  mode: "spa",
  /*
   ** Headers of the page
   */
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
    ],
    link: [
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Rubik:300,400,700&display=swap"
      },
      {
        rel: "stylesheet",
        href:
          "https://cdn.jsdelivr.net/npm/@mdi/font@3.x/css/materialdesignicons.min.css"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["@/assets/scss/index.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/eslint-module",
    "@nuxtjs/vuetify"
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["@/assets/scss/variables.scss"],
    defaultAssets: false,
    icons: {
      iconfont: "mdi" // default - only for display purposes
    },
    theme: {
      themes: {
        light: {
          primary: "#E8991C",
          accent: "#9E6100",
          secondary: "#E8E3D9"
        }
      }
    },
    treeShake: true
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.md$/,
        loader: "frontmatter-markdown-loader",
        include: path.resolve(__dirname, "content")
      });
    }
  },
  /*
   ** Overwrite's generated manifest values
   */
  manifest: {
    name: "TWB IIAB",
    short_name: "IIAB",
    lang: "en",
    display: "standalone",
    background_color: "#fff"
  },
  /*
   ** Generate dynamic routes
   */
  generate: {
    fallback: true,
    routes: [...content.map(title => `content/${title}`), ...pages.map(page => `info/${page}`)]
  },
  /*
   ** Handle external assets
   */
  workbox: {
    runtimeCaching: [
      {
        urlPattern: "https://fonts.googleapis.com/.*",
        handler: "cacheFirst",
        method: "GET",
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
      },
      {
        urlPattern: "https://fonts.gstatic.com/.*",
        handler: "cacheFirst",
        method: "GET",
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
      },
      {
        urlPattern: "https://cdn.jsdelivr.net/.*",
        handler: "cacheFirst",
        method: "GET",
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
      }
    ]
  }
};
