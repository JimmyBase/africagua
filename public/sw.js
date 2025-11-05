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

// Allowed origins for security
const ALLOWED_ORIGINS = [
  'https://www.africaguacanarias.com',
  'https://firebasestorage.googleapis.com',
  'https://africagua-eb795.firebaseapp.com',
  'https://www.camarafuerteventura.org',
  'https://www.google-analytics.com',
  'https://www.googletagmanager.com'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(RESOURCES_TO_CACHE))
      .then(() => self.skipWaiting())
      .catch((error) => {
        console.error('Service Worker installation failed:', error);
      })
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
      .catch((error) => {
        console.error('Service Worker activation failed:', error);
      })
  );
});

// Helper function to check if a request is for analytics
const isAnalyticsRequest = (url) => {
  return ANALYTICS_DOMAINS.some(domain => url.hostname.includes(domain));
};

// Helper function to check if origin is allowed
const isOriginAllowed = (url) => {
  const requestOrigin = new URL(url).origin;
  return ALLOWED_ORIGINS.some(origin => requestOrigin.startsWith(origin)) ||
         requestOrigin === self.location.origin;
};

// Helper function to validate response
const isValidResponse = (response) => {
  return response &&
         response.status === 200 &&
         (response.type === 'basic' || response.type === 'cors' || response.type === 'opaque');
};

// Fetch event with security enhancements
self.addEventListener('fetch', (event) => {
  const requestUrl = event.request.url;

  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Bypass caching for analytics requests
  if (isAnalyticsRequest(new URL(requestUrl))) {
    return;
  }

  // Block requests from non-allowed origins for critical resources
  if (!isOriginAllowed(requestUrl) &&
      (requestUrl.includes('.js') || requestUrl.includes('.css'))) {
    event.respondWith(
      new Response('Blocked by Service Worker', {
        status: 403,
        statusText: 'Forbidden'
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }

        return fetch(event.request, {
          credentials: 'same-origin',
          redirect: 'follow'
        })
          .then((response) => {
            if (!isValidResponse(response)) {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              })
              .catch((error) => {
                console.error('Cache storage failed:', error);
              });

            return response;
          })
          .catch((error) => {
            console.error('Fetch failed:', error);
            return caches.match('/index.html');
          });
      })
  );
});

// Message event for cache updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }
});