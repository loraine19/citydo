// Basic Service Worker setup

self.addEventListener('install', event => {
    // Perform install steps
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    // Claim clients immediately so the SW starts controlling them
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    // You can customize fetch handling here
    // For now, just let requests pass through
});
