const CACHE_NAME = 'site-cache-v1';

// Files to cache
const urlsToCache = [
    '/',
    '/index.html',
    './fan-coil-Uint16Array.html',
    './panel-ac.html',
    './products.html',
    './assets/css/style.css',
    './assets/js/style.js'

];

// Install service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Activate service worker
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (!cacheWhitelist.includes(cache)) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
