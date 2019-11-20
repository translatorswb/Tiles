module.exports = {
  globDirectory: "dist/",
  globPatterns: ["**/*.{js,woff,ttf,png,json,html,ico,jpg,md,mp3}"],
  swDest: "dist/sw.js",
  swSrc: "static/sw.js",
  maximumFileSizeToCacheInBytes: 100 * 1024 * 1024
};
