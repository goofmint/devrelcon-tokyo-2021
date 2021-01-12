// service-worker.js

// set names for both precache & runtime cache
workbox.core.setCacheNameDetails({
    prefix: 'devrelcon-tokyo',
    suffix: 'v1',
    precache: 'precache',
    runtime: 'runtime-cache'
});

// let Service Worker take control of pages ASAP
workbox.skipWaiting();
workbox.clientsClaim();

// let Workbox handle our precache list
workbox.precaching.precacheAndRoute(self.__precacheManifest);

// use `networkFirst` strategy for `*.html`, like all my posts
workbox.routing.registerRoute(
    /\.html$/,
    workbox.strategies.staleWhileRevalidate()
);

// use `cacheFirst` strategy for images
workbox.routing.registerRoute(
    /assets\/favicons/,
    workbox.strategies.cacheFirst()
);
workbox.routing.registerRoute(
    /^https?:\/\/fonts\.googleapis\.com\/css/,
    workbox.strategies.cacheFirst()
);



// third party files
workbox.routing.registerRoute(
  /^https?:\/\/stackpath\.bootstrapcdn\.com/,
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  /assets\/(css|js|img)/,
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  /^https?:\/\/cdn.staticfile.org/,
  workbox.strategies.staleWhileRevalidate()
);


