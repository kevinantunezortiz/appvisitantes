const CACHE_NAME = 'v1_mrg_cache';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Instalar el service worker y guardar archivos en caché
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Estrategia: Buscar en internet, si falla, dar lo que está en caché
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});