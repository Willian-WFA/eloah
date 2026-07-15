const CACHE_NAME = "rpg-kids-v2026-07-15-prebuilt-audio-pwa";

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./adventures.js",
  "./manifest.webmanifest",
  "./assets/audio/manifest.json",
  "./assets/icons/icon.svg",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/scenes/cloud_harbor_soft.webp",
  "./assets/scenes/storm_spoon_deck.webp",
  "./assets/scenes/tea_whale_gate.webp",
  "./assets/scenes/giraffe_clock_garden.webp",
  "./assets/scenes/seed_path_soft.webp",
  "./assets/scenes/clock_snail_gate.webp",
  "./assets/scenes/dragon_library_door.webp",
  "./assets/scenes/whisper_shelves.webp",
  "./assets/scenes/sneeze_book_boss.webp"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached);
      return cached || networkFetch;
    }),
  );
});
