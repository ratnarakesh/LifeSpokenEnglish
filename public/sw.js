// LIFE Spoken English service worker: instant repeat loads + offline fallback.
// Stores only the site's own files (pages, scripts, images). No personal data, no cookies.
// Bump VERSION whenever the caching strategy or precache list changes.
const VERSION = "life-v21";
const PAGE_CACHE = `${VERSION}-pages`;
const STATIC_CACHE = `${VERSION}-static`;

const PRECACHE = [
  "/",
  "/about",
  "/gallery",
  "/offline.html",
  "/manifest.json",
  "/icon.png",
  "/brand/life-emblem-160.webp",
  "/brand/life-logo.webp",
  "/privacy",
  "/terms",
  "/brand/icon-192.png",
];

const isStaticAsset = (url) =>
  url.pathname.startsWith("/_next/static/") ||
  url.pathname.startsWith("/brand/") ||
  /\.(?:woff2?|ttf|otf|png|jpe?g|webp|avif|svg|ico)$/i.test(url.pathname);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(PAGE_CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

// Pages: instant repeat visits. Serve the saved copy immediately and refresh it in the
// background, so the next visit shows the latest content. First visits use the network.
async function stalePage(event) {
  const { request } = event;
  const cache = await caches.open(PAGE_CACHE);
  const cached = await cache.match(request, { ignoreSearch: true });
  const network = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);

  if (cached) {
    event.waitUntil(network);
    return cached;
  }
  return (await network) || (await cache.match("/")) || (await cache.match("/offline.html"));
}

async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(PAGE_CACHE);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => cached);
  return cached || network;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  // Only handle our own origin; YouTube, Google Maps and WhatsApp go straight to the network.
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") event.respondWith(stalePage(event));
  else if (isStaticAsset(url)) event.respondWith(cacheFirst(request));
  else event.respondWith(staleWhileRevalidate(request));
});
