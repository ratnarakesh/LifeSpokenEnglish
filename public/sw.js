// LIFE Spoken English service worker: instant repeat loads + offline fallback.
// Bump VERSION whenever the caching strategy or precache list changes.
const VERSION = "life-v3";
const PAGE_CACHE = `${VERSION}-pages`;
const STATIC_CACHE = `${VERSION}-static`;

const PRECACHE = [
  "/",
  "/offline.html",
  "/manifest.json",
  "/icon.png",
  "/brand/life-emblem.png",
  "/brand/life-logo.png",
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

async function networkFirstPage(request) {
  const cache = await caches.open(PAGE_CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    return (
      (await cache.match(request, { ignoreSearch: true })) ||
      (await cache.match("/")) ||
      (await cache.match("/offline.html"))
    );
  }
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

  if (request.mode === "navigate") event.respondWith(networkFirstPage(request));
  else if (isStaticAsset(url)) event.respondWith(cacheFirst(request));
  else event.respondWith(staleWhileRevalidate(request));
});
