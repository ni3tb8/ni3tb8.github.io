const CACHE_NAME = 'cache-v2'; // Zmieniona nazwa cache dla wymuszenia aktualizacji
const URLS_TO_CACHE = [
  '/',
  'stopwatch.svg',
  'index.html',
  // Dodaj inne pliki, które chcesz przechowywać
];

// Instalacja Service Workera
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching all: ', URLS_TO_CACHE);
      return cache.addAll(URLS_TO_CACHE);
    }).then(() => self.skipWaiting()) // Aktywacja od razu po instalacji
  );
});

// Aktywacja Service Workera
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log(`[Service Worker] Deleting old cache: ${cache}`);
            return caches.delete(cache); // Usuń stare cache
          }
        })
      );
    }).then(() => self.clients.claim()) // Przejmij kontrolę nad wszystkimi klientami
  );
});

// Pobieranie zasobów
self.addEventListener('fetch', (event) => {
  console.log('[Service Worker] Fetching: ', event.request.url);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).then((response) => {
        // Dynamiczne zapisywanie nowych zasobów
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    }).catch(() => {
      console.error('[Service Worker] Failed to fetch resource:', event.request.url);
      return caches.match('/'); // Opcjonalnie zwróć stronę główną jako fallback
    })
  );
});
