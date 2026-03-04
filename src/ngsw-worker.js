// 🌟 CUSTOM Angular Service Worker with Notifications
// Handles caching, offline, push notifications → /blog/create

const CACHE_PREFIX = 'share-pwa-v1';
const OFFLINE_CACHE = 'share-offline-v1';

// ✅ Install - Cache critical assets
self.addEventListener('install', (event) => {
  console.log('🔄 Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(OFFLINE_CACHE).then((cache) => {
      return cache.addAll([
      ]);
    }).then(() => {
      console.log('✅ Service Worker: All assets cached');
      // Activate immediately
      self.skipWaiting();
    })
  );
});

// ✅ Activate - Clean old caches
self.addEventListener('activate', (event) => {
  console.log('🔄 Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_PREFIX && cacheName !== OFFLINE_CACHE) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker: Active & ready');
      // Take control of all pages
      self.clients.claim();
    })
  );
});

// ✅ Fetch - Network-first + offline fallback
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Cache API calls with freshness strategy
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response('API offline', { status: 503 });
      })
    );
    return;
  }

  // Cache-first for assets, network-first for pages
  event.respondWith(
    fetch(event.request).then((response) => {
      // Clone response for caching
      const responseClone = response.clone();
      caches.open(CACHE_PREFIX).then((cache) => {
        cache.put(event.request, responseClone);
      });
      return response;
    }).catch(() => {
      // Offline fallback
      return caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        
        // Fallback to offline page
        return caches.match('/index.html');
      });
    })
  );
});

// 🌟 PUSH NOTIFICATIONS - Always shown
self.addEventListener('push', (event) => {
  console.log('📱 Push received:', event.data?.text());
  
  const title = '🚀 SHARE - Create Now!';
  const options = {
    body: event.data ? event.data.text() : 'New blog idea! Click to create ➕',
    icon: '/assets/icons/icon-192x192.png',
    badge: '/assets/icons/badge-72x72.png',
    image: '/assets/share-pwa-promo.jpg',
    vibrate: [200, 100, 200, 100],
    tag: 'share-notification',
    renotify: true,  // ✅ Always show (even if previous exists)
    requireInteraction: false,  // Auto-dismiss after 10s
    data: {
      url: '/blog/create',  // Always → Create Blog
      action: 'create_blog'
    },
    actions: [
      {
        action: 'create_blog',
        title: '➕ Create Blog',
        icon: '/assets/icons/create-96.png'
      },
      {
        action: 'dismiss',
        title: '✕ Dismiss',
        icon: '/assets/icons/dismiss-96.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// 🎯 NOTIFICATION CLICK → /blog/create
self.addEventListener('notificationclick', (event) => {
  console.log('🖱️ Notification clicked:', event.action);
  
  event.notification.close();

  // ✅ ANY CLICK/ACTION → Opens Create Blog
  if (event.action === 'create_blog' || !event.action) {
    event.waitUntil(
      clients.openWindow('/blog/create')
    );
  } else if (event.action === 'dismiss') {
    console.log('👋 Notification dismissed');
  }
});

// 🔄 Background Sync (optional)
self.addEventListener('sync', (event) => {
  if (event.tag === 'blog-sync') {
    event.waitUntil(savePendingBlogs());
  }
});

function savePendingBlogs() {
  // Sync pending blog creations
  return clients.matchAll().then((clients) => {
    return Promise.all(clients.map((client) => {
      return client.postMessage({ type: 'SYNC_BLOGS' });
    }));
  });
}

// 💯 Debug messages
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
