import path from "path";
import { langInfo, messages } from "./lang";
// import { content } from "./content";

const locales = Object.values(langInfo);

// Dynamic routes
// const sectors = content.map(s => s.sector);
// const articles = [].concat(...content.map(s => s.articles));
// let routes = [];
// locales.forEach(l => {
//   routes = routes.concat(
//     `${l.code}/info`,
//     [...sectors.map(s => `${l.code}/info/${s}`)],
//     [...articles.map(id => `${l.code}/${id}`)]
//   );
// });

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
    ]
    // link: [
    //   {
    //     rel: "stylesheet",
    //     href:
    //       "https://fonts.googleapis.com/css?family=Rubik:300,400,700&display=swap&subset=latin-ext"
    //   }
    // ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["@/assets/fonts/Humanitarian-Icons.css", "@/assets/scss/index.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~plugins/i18n.js" },
    { src: "~/plugins/pouchdb.js", mode: "client" }
  ],
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
    "@nuxtjs/pwa",
    "nuxt-i18n"
  ],
  /*
   ** env
   */
  // env: {
  //   databaseBaseUrl: process.env.DATABASE_BASE_URL || "http://localhost:5984"
  // },
  env: {
    databaseBaseUrl:
      process.env.DATABASE_BASE_URL || "https://tiles-couchdb.pngk.org/"
  },
  /*
   ** nuxt-i18n module configuration
   ** See https://nuxt-community.github.io/nuxt-i18n/options-reference.html
   */
  i18n: {
    detectBrowserLanguage: false,
    locales,
    vueI18n: {
      messages
    },
    parsePages: false,
    pages: {
      index: false
    }
  },
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
      iconfont: "mdiSvg"
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
  // generate: {
  //   fallback: true
  //   // routes: routes
  // },
  /*
   ** Handle external assets
   */
  workbox: {
    offline: false,
    cacheAssets: false,
    runtimeCaching: [
      // {
      //   urlPattern: "https://fonts.googleapis.com/.*",
      //   handler: "cacheFirst",
      //   method: "GET",
      //   strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
      // },
      // {
      //   urlPattern: "https://fonts.gstatic.com/.*",
      //   handler: "cacheFirst",
      //   method: "GET",
      //   strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
      // }
    ],
    cachingExtensions: "@/plugins/workbox-precaching-and-route.js",
    routingExtensions: "@/plugins/workbox-navigation-route.js"
  }
};
