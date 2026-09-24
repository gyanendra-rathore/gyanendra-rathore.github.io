const CACHE = "dayline-v4-4b781e7e0664";
const CORE = ["/", "/manifest.webmanifest", "/icon-192.png", "/icon-512.png", ...["/assets/index-BfN1OKuX.css","/assets/index-BKgBPMoT.js","/assets/inter-cyrillic-400-normal-obahsSVq.woff2","/assets/inter-cyrillic-500-normal-BasfLYem.woff2","/assets/inter-cyrillic-600-normal-CWCymEST.woff2","/assets/inter-cyrillic-700-normal-CjBOestx.woff2","/assets/inter-cyrillic-ext-400-normal-BQZuk6qB.woff2","/assets/inter-cyrillic-ext-500-normal-B0yAr1jD.woff2","/assets/inter-cyrillic-ext-600-normal-Dfes3d0z.woff2","/assets/inter-cyrillic-ext-700-normal-BjwYoWNd.woff2","/assets/inter-greek-400-normal-B4URO6DV.woff2","/assets/inter-greek-500-normal-BIZE56-Y.woff2","/assets/inter-greek-600-normal-plRanbMR.woff2","/assets/inter-greek-700-normal-C3JjAnD8.woff2","/assets/inter-greek-ext-400-normal-DGGRlc-M.woff2","/assets/inter-greek-ext-500-normal-C4iEst2y.woff2","/assets/inter-greek-ext-600-normal-DRtmH8MT.woff2","/assets/inter-greek-ext-700-normal-qfdV9bQt.woff2","/assets/inter-latin-400-normal-C38fXH4l.woff2","/assets/inter-latin-500-normal-Cerq10X2.woff2","/assets/inter-latin-600-normal-LgqL8muc.woff2","/assets/inter-latin-700-normal-Yt3aPRUw.woff2","/assets/inter-latin-ext-400-normal-C1nco2VV.woff2","/assets/inter-latin-ext-500-normal-CV4jyFjo.woff2","/assets/inter-latin-ext-600-normal-D2bJ5OIk.woff2","/assets/inter-latin-ext-700-normal-Ca8adRJv.woff2","/assets/inter-vietnamese-400-normal-DMkecbls.woff2","/assets/inter-vietnamese-500-normal-DOriooB6.woff2","/assets/inter-vietnamese-600-normal-Cc8MFFhd.woff2","/assets/inter-vietnamese-700-normal-DlLaEgI2.woff2"]];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(CORE)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith("dayline-") && key !== CACHE).map((key) => caches.delete(key)))),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET" || url.origin !== self.location.origin) return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(async () => (await caches.match(event.request)) || (event.request.mode === "navigate" ? await caches.match("/") : Response.error())),
  );
});
