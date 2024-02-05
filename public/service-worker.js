const CACHE_NAME = 'localbazar';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/localBazar.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      if (!cache) {
        throw new Error('Failed to open cache');
      }

      const cachePromises = urlsToCache.map((url) => {
        return fetch(url)
          .then((response) => {

            if (!response.ok) {
              throw new Error(`Failed to fetch resource: ${url}`);
            }
            return cache.put(url, response);
          })
          .catch((error) => {
            console.error(`Error caching resource: ${url}`, error);
          });
      });

      return Promise.all(cachePromises);
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/offline.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).then((fetchResponse) => {
        if (
          !fetchResponse ||
          fetchResponse.status !== 200 ||
          fetchResponse.type !== 'basic'
        ) {
          return fetchResponse;
        }

        const responseToCache = fetchResponse.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return fetchResponse;
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('beforeunload', () => {
  self.registration.unregister();
});
