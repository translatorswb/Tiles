module.exports = {
  globDirectory: "dist/",
  globPatterns: ["**/*.{js,eot,woff,ttf,png,json,html,ico,mp4,md,mp3}"],
  swDest: "dist/sw.js",
  swSrc: "static/sw.js",
  maximumFileSizeToCacheInBytes: 100 * 1024 * 1024
};
