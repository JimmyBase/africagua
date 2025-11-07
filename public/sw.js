// Service Worker version
const CACHE_VERSION = 'v1';
const CACHE_NAME = `africagua-${CACHE_VERSION}`;

// Resources to cache
const RESOURCES_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/pwa-64x64.png',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/maskable-icon-512x512.png'
];

// Google Analytics domains to bypass caching
const ANALYTICS_DOMAINS = [
  'www.google-analytics.com',
  'www.googletagmanager.com',
  'analytics.google.com',
  'stats.g.doubleclick.net'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(RESOURCES_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName.startsWith('africagua-'))
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Helper function to check if a request is for analytics
const isAnalyticsRequest = (url) => {
  return ANALYTICS_DOMAINS.some(domain => url.hostname.includes(domain));
};

// Fetch event
self.addEventListener('fetch', (event) => {
  // Bypass caching for analytics requests
  if (isAnalyticsRequest(new URL(event.request.url))) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then((response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            return response;
          });
      })
  );
});