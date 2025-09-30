const CACHE_NAME = 'quiz-so-v1.0.0';
const urlsToCache = [
  './quiz-app.html',
  './styles.css',
  './quiz-script.js',
  './quiz-data.js',
  './manifest.json',
  './computer-emoji.svg',
  './gear-emoji.svg',
  './lightbulb-emoji.svg',
  './party-emoji.svg',
  './target-emoji.svg',
  './trophy-emoji.svg'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar peticiones de red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - devolver respuesta
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Actualizar Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});