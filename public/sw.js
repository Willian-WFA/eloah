const CACHE_NAME = "rpg-kids-v2026-07-16-parent-flow-unlock-pwa";

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
  "./assets/scenes/forest_gate_soft.webp",
  "./assets/scenes/crystal_bridge_soft.webp",
  "./assets/scenes/tiny_bell_town.webp",
  "./assets/scenes/sleepy_star_portal.webp",
  "./assets/scenes/star_party_soft.webp",
  "./assets/scenes/bell_city_gate.webp",
  "./assets/scenes/bell_clock_square.webp",
  "./assets/scenes/round_cookie_street.webp",
  "./assets/scenes/umbrella_library.webp",
  "./assets/scenes/short_giraffe_garden.webp",
  "./assets/scenes/cloth_bridge.webp",
  "./assets/scenes/soft_hammer_workshop.webp",
  "./assets/scenes/small_steps_forest.webp",
  "./assets/scenes/slow_wind_hill.webp",
  "./assets/scenes/soft_silence_tower.webp",
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
