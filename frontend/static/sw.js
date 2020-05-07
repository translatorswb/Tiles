importScripts('https://cdn.jsdelivr.net/npm/workbox-cdn@4.3.1/workbox/workbox-sw.js')

// --------------------------------------------------
// Configure
// --------------------------------------------------

// Set workbox config
workbox.setConfig({
  "debug": false
})

// Start controlling any existing clients as soon as it activates
workbox.core.clientsClaim()

// Skip over the SW waiting lifecycle stage
workbox.core.skipWaiting()

workbox.precaching.cleanupOutdatedCaches()

// --------------------------------------------------
// Precaches
// --------------------------------------------------

// Precache assets

// -- Start of cachingExtensions --
/* eslint-disable */
workbox.precaching.precacheAndRoute([]);
// -- End of cachingExtensions --

// --------------------------------------------------
// Runtime Caching
// --------------------------------------------------

// Register route handlers for runtimeCaching

// -- Start of routingExtensions --
/* eslint-disable */
workbox.routing.registerNavigationRoute(
  workbox.precaching.getCacheKeyForURL("/index.html")
);
// -- End of routingExtensions --
