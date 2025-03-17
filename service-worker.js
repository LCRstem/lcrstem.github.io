var cacheName = 'Noise主页-v1.3.4';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll([
        '/',
        'https://jsd.onmicrosoft.cn/gh/rcy1314/noisework/assets/',
        'https://www.lcrstem.top/css/main.css',
        'https://www.lcrstem.top/js/main.js',
        // 添加需要缓存的其他静态资源
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request).then(function(networkResponse) {
        caches.open(cacheName).then(function(cache) {
          cache.put(event.request, networkResponse.clone());
        });

        return networkResponse;
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(name) {
          return name !== cacheName;
        }).map(function(name) {
          return caches.delete(name);
        })
      );
    })
  );
});
