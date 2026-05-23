// Service Worker — ReddyBook Static Asset Cache
// Cache-first strategy for static assets, network-first for HTML

const CACHE_NAME = 'reddybook-v1';
const STATIC_ASSETS = [
  '/assets/images/menu-home.png',
  '/assets/images/menu-inplay.png',
  '/assets/images/menu-rules.png',
  '/assets/images/icon-popular.svg',
  '/assets/images/fancy.svg',
  '/assets/images/tv.svg',
  '/assets/images/events/menu-4.png',
  '/assets/images/events/menu-1.png',
  '/assets/images/events/menu-2.png',
  '/assets/images/events/menu-7.png',
  '/assets/images/events/menu-5.png',
  '/assets/images/events/menu-20.png',
  '/assets/images/events/menu-29.png',
  '/assets/images/events/menu-3503.png',
  '/assets/images/events/menu-4339.png',
  '/assets/images/events/menu-7511.png',
  '/assets/images/events/menu-7522.png',
  '/assets/images/events/menu-7524.png',
  '/assets/images/events/menu-99990.png',
  '/assets/images/events/menu-99991.png',
  '/assets/images/events/menu-99994.png',
  '/assets/images/events/menu-99997.png',
  '/assets/images/events/menu-99998.png',
  '/assets/images/events/menu-998917.png',
  '/assets/images/events/menu-979797.png',
  '/assets/images/events/menu-969696.png',
  '/assets/images/events/menu-2378961.png',
  '/assets/images/events/menu-26420387.png',
  '/assets/images/ls_01.png',
  '/assets/images/ls_02.png',
  '/assets/images/ls_03.png',
  '/assets/images/ls_04.png',
  '/assets/css/common_style.css',
  '/assets/css/theme_master.css',
  '/assets/css/home-sections.css',
  '/assets/css/landing-home-light.css',
  '/assets/css/dashboard-home-embed.css',
  '/assets/css/home-bento.css',
  '/assets/css/landing-footer.css',
  '/assets/css/landing-dark.css',
  '/assets/css/landing.css',
  '/assets/js/bootstrap.bundle.min.js',
  '/assets/js/swiper-bundle.min.js',
  '/assets/js/landing-ui.js',
  '/js/site-logic.js',
  '/assets/favicon.ico'
];

// Install — pre-cache static assets
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        // Use addAll with individual catch to avoid failing entire install
        return Promise.allSettled(
          STATIC_ASSETS.map(function(url) {
            return cache.add(url).catch(function(err) {
              console.warn('SW: Failed to cache:', url, err);
            });
          })
        );
      })
      .then(function() {
        return self.skipWaiting();
      })
  );
});

// Activate — clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(name) {
          return name !== CACHE_NAME;
        }).map(function(name) {
          return caches.delete(name);
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// Fetch — Cache-first for static assets, network-first for HTML
self.addEventListener('fetch', function(event) {
  var request = event.request;
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip cross-origin analytics/tracking requests
  var url = new URL(request.url);
  if (url.hostname === 'www.googletagmanager.com' ||
      url.hostname === 'www.google-analytics.com' ||
      url.hostname === 'connect.facebook.net') {
    return;
  }
  
  // For static assets (images, CSS, JS, fonts) — cache-first
  if (request.destination === 'image' || 
      request.destination === 'style' || 
      request.destination === 'script' ||
      request.destination === 'font' ||
      /\.(png|jpg|jpeg|gif|webp|svg|ico|css|js|woff2?)(\?|$)/i.test(request.url)) {
    event.respondWith(
      caches.match(request).then(function(cached) {
        if (cached) return cached;
        return fetch(request).then(function(response) {
          // Cache successful responses
          if (response && response.status === 200) {
            var responseClone = response.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(request, responseClone);
            });
          }
          return response;
        }).catch(function() {
          // Offline fallback for images
          if (request.destination === 'image') {
            return new Response(
              '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="#f0f0f0" width="100" height="100"/></svg>',
              { headers: { 'Content-Type': 'image/svg+xml' } }
            );
          }
        });
      })
    );
    return;
  }
  
  // For HTML — network-first with cache fallback
  if (request.destination === 'document' || request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(request).then(function(response) {
        var responseClone = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(request, responseClone);
        });
        return response;
      }).catch(function() {
        return caches.match(request);
      })
    );
    return;
  }
  
  // Default — try cache, then network
  event.respondWith(
    caches.match(request).then(function(cached) {
      return cached || fetch(request);
    })
  );
});
