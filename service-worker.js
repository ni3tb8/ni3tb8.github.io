const CACHE_NAME = 'cache-v2'; // Zmieniona nazwa cache dla wymuszenia aktualizacji
const URLS_TO_CACHE = [
  '/',
  'stopwatch.svg',
  'index.html',
  'styles.css',
  'stopwatch.svg',
  'bricolage.woff2',
  'script.js'
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
      // Jeśli znaleziono w cache, zwróć wynik
      if (cachedResponse) {
        return cachedResponse;
      }

      // Jeśli nie ma w cache, spróbuj pobrać z sieci
      return fetch(event.request)
        .then((response) => {
          // Zapisz nowy zasób w cache
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
        .catch((error) => {
          console.error('[Service Worker] Fetch failed for:', event.request.url, error);

          // Fallback na stronę główną w przypadku błędów dokumentu
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }

          // Domyślny fallback (możesz dostosować)
          return new Response('Błąd połączenia', { status: 503 });
        });
    })
  );
});
