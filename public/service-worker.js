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
      const cachePromises = urlsToCache.map((url) => {
        return fetch(url)
          .then((response) => {
            // Check if the request was successful
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
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return the response from the cache
      if (response) {
        return response;
      }

      return fetch(event.request).then((fetchResponse) => {
        // Check if we received a valid response
        if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
          return fetchResponse;
        }

        // Clone the response as it can only be consumed once
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
