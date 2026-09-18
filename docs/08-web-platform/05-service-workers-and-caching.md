# Service Workers and Caching

Service Workers are specialized worker contexts that can intercept network requests and coordinate browser-side application behavior.

They are commonly used for:

* Offline experiences
* Asset caching
* Request interception
* Network strategies
* Resource pre-caching
* Application lifecycle management

The Cache API provides a storage mechanism for `Request` and `Response` objects and is commonly used together with Service Workers.

## Service Worker Architecture

A simplified architecture looks like this:

```text
Web Page
   ↓
Service Worker
   ↓
Network
```

The Service Worker can decide whether a request should:

* Use a cached response
* Go to the network
* Use a fallback
* Update the cache

This allows an application to implement explicit network strategies.

## Requirements

Service Workers normally require a secure context.

Production applications should use:

```text
https://
```

Local development commonly works through:

```text
http://localhost
```

A Service Worker also has a scope that determines which pages it can control.

## Registering a Service Worker

Registration happens from the page:

```js id="y92t5g"
if ("serviceWorker" in navigator) {
  window.addEventListener(
    "load",
    async () => {
      try {
        const registration =
          await navigator.serviceWorker.register(
            "/service-worker.js"
          );

        console.log(
          "Service Worker registered:",
          registration.scope
        );
      } catch (error) {
        console.error(
          "Service Worker registration failed:",
          error
        );
      }
    }
  );
}
```

Registration returns a Promise containing a `ServiceWorkerRegistration`.

```js id="r7d3xx"
const registration =
  await navigator.serviceWorker.register(
    "/service-worker.js"
  );

console.log(registration);
```

## Service Worker Lifecycle

A Service Worker has its own lifecycle:

```text
Register
   ↓
Install
   ↓
Waiting
   ↓
Activate
   ↓
Control Clients
   ↓
Handle Events
```

These lifecycle stages are important because the worker is not simply loaded like an ordinary page script.

## Install Event

The `install` event is commonly used to pre-cache static assets.

```js id="o7l0yv"
const CACHE_NAME =
  "javascript-reference-v1";

const ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js"
];

self.addEventListener(
  "install",
  (event) => {
    event.waitUntil(
      caches
        .open(CACHE_NAME)
        .then((cache) =>
          cache.addAll(ASSETS)
        )
    );
  }
);
```

`event.waitUntil()` tells the browser that the installation work is still in progress.

If that Promise rejects, installation can fail.

## Activate Event

The `activate` event is a good place to remove outdated caches.

```js id="eg39ey"
const CURRENT_CACHE =
  "javascript-reference-v2";

self.addEventListener(
  "activate",
  (event) => {
    event.waitUntil(
      caches.keys().then(
        (keys) =>
          Promise.all(
            keys
              .filter(
                (key) =>
                  key !== CURRENT_CACHE
              )
              .map((key) =>
                caches.delete(key)
              )
          )
      )
    );
  }
);
```

This prevents obsolete cache versions from accumulating indefinitely.

## Taking Control of Clients

A newly activated Service Worker may need to wait before controlling already-open pages.

A worker can request control:

```js id="88f7x2"
self.addEventListener(
  "activate",
  (event) => {
    event.waitUntil(
      self.clients.claim()
    );
  }
);
```

`clients.claim()` allows the active worker to begin controlling eligible clients without requiring each page to be manually reloaded.

Use lifecycle control deliberately because changing which worker controls a page can affect application behavior.

# The Cache API

The Cache API stores pairs of requests and responses.

Open a named cache:

```js id="v70x2e"
const cache =
  await caches.open(
    "javascript-reference"
  );
```

## Adding a Request to a Cache

```js id="a2h2f7"
await cache.add(
  "/index.html"
);
```

The browser fetches the resource and stores the resulting response.

Multiple resources can be cached:

```js id="y6s9hx"
await cache.addAll([
  "/",
  "/index.html",
  "/style.css",
  "/app.js"
]);
```

## Manually Storing a Response

A response can also be stored directly:

```js id="90fm14"
const response =
  new Response(
    JSON.stringify({
      name: "Osama Abu Motlaq"
    }),
    {
      headers: {
        "Content-Type":
          "application/json"
      }
    }
  );

await cache.put(
  "/user-data",
  response
);
```

## Reading from a Cache

```js id="r0v4oq"
const cachedResponse =
  await cache.match(
    "/user-data"
  );

if (cachedResponse) {
  const data =
    await cachedResponse.json();

  console.log(data);
}
```

The cache lookup can use a request or a URL:

```js id="cy2we4"
const response =
  await cache.match(
    "/index.html"
  );
```

## Cache Deletion

Delete an entry:

```js id="h9k0bo"
await cache.delete(
  "/user-data"
);
```

Delete the entire cache:

```js id="3bpu2d"
await caches.delete(
  "javascript-reference"
);
```

## Cache Names

Use explicit versioned names:

```js id="66gz81"
const CACHE_NAME =
  "app-static-v3";
```

Versioning provides a simple way to identify groups of cached assets.

# Fetch Events

A Service Worker can intercept requests through the `fetch` event.

```js id="3ce2ob"
self.addEventListener(
  "fetch",
  (event) => {
    event.respondWith(
      fetch(event.request)
    );
  }
);
```

This does not improve anything by itself, but it demonstrates the interception model.

The worker receives a `FetchEvent` containing:

```js id="r4ldjm"
event.request
```

which represents the original request.

## Cache-First Strategy

A simple cache-first strategy:

```js id="xbq4f4"
self.addEventListener(
  "fetch",
  (event) => {
    event.respondWith(
      caches
        .match(event.request)
        .then((cachedResponse) => {
          return (
            cachedResponse ||
            fetch(event.request)
          );
        })
    );
  }
);
```

The flow is:

```text
Request
   ↓
Cache
   ├── Hit  → Cached Response
   └── Miss → Network
```

This is often useful for static assets.

## Network-First Strategy

A network-first strategy prefers fresh data:

```js id="u5n9j2"
self.addEventListener(
  "fetch",
  (event) => {
    event.respondWith(
      fetch(event.request)
        .catch(() =>
          caches.match(
            event.request
          )
        )
    );
  }
);
```

The flow becomes:

```text
Request
   ↓
Network
   ├── Success → Network Response
   └── Failure → Cache
```

This can be useful when freshness matters but offline fallback is still valuable.

## Stale-While-Revalidate

Another strategy is:

```text
Cache
   ↓
Return immediately

Network
   ↓
Fetch fresh version
   ↓
Update cache
```

A simplified implementation:

```js id="dz3qkr"
self.addEventListener(
  "fetch",
  (event) => {
    event.respondWith(
      caches
        .match(event.request)
        .then(async (cachedResponse) => {
          const networkPromise =
            fetch(event.request).then(
              async (networkResponse) => {
                const cache =
                  await caches.open(
                    CACHE_NAME
                  );

                await cache.put(
                  event.request,
                  networkResponse.clone()
                );

                return networkResponse;
              }
            );

          return (
            cachedResponse ||
            networkPromise
          );
        })
    );
  }
);
```

The exact implementation should consider failures, request types, and cache policy rather than blindly caching every request.

# Response Cloning

A response body is normally consumable once.

If the same response must be:

* Returned to the page
* Stored in the cache

clone it first:

```js id="ce6p8t"
const response =
  await fetch(
    event.request
  );

const copy =
  response.clone();

await cache.put(
  event.request,
  copy
);

return response;
```

This is a common pattern in Service Worker cache logic.

# What Should Be Cached?

Good candidates often include:

```text
Static HTML
CSS
JavaScript
Images
Fonts
Application shell
```

Dynamic API responses require more careful decisions.

Consider:

* How frequently the data changes
* Whether stale data is acceptable
* Whether the response contains user-specific information
* Cache invalidation
* Authentication
* Storage limits
* Privacy requirements

## Avoid Blindly Caching Everything

This pattern is dangerous:

```js id="7dn0ot"
self.addEventListener(
  "fetch",
  (event) => {
    event.respondWith(
      caches
        .open("everything")
        .then(async (cache) => {
          const response =
            await fetch(
              event.request
            );

          await cache.put(
            event.request,
            response.clone()
          );

          return response;
        })
    );
  }
);
```

Not every request is appropriate for long-term caching.

Requests may contain:

* Private user information
* Authentication-related data
* Frequently changing content
* Large responses
* Requests that should never be persisted

Caching should follow an explicit policy.

# Cache Versioning

A basic versioning approach:

```js id="2g8ey5"
const CACHE_NAME =
  "app-static-v4";
```

When the static assets change:

```js id="s8wt66"
const CACHE_NAME =
  "app-static-v5";
```

During activation, remove old versions:

```js id="jnw1po"
self.addEventListener(
  "activate",
  (event) => {
    event.waitUntil(
      caches.keys().then(
        (keys) =>
          Promise.all(
            keys
              .filter(
                (key) =>
                  key !== CACHE_NAME
              )
              .map((key) =>
                caches.delete(key)
              )
          )
      )
    );
  }
);
```

This keeps the cache under control.

# Service Worker Scope

The Service Worker script location affects its default scope.

For example:

```text
/service-worker.js
```

can normally control pages under:

```text
/
```

whereas a worker located deeper in the path has a narrower default scope.

You can inspect the registration:

```js id="q6fj4y"
console.log(
  registration.scope
);
```

A scope should match the part of the application that actually needs the Service Worker.

# Service Worker Updates

Browsers manage Service Worker versions and lifecycle transitions.

When the worker script changes, the browser can install the new version while the existing worker continues to control current clients.

This prevents a new worker from abruptly replacing the active one in the middle of an operation.

The lifecycle therefore includes a waiting phase:

```text
Old Worker
    ↓
Controls current clients

New Worker
    ↓
Install
    ↓
Waiting
    ↓
Activate later
```

Do not bypass lifecycle rules without understanding the consequences.

## `skipWaiting()`

A new worker can request immediate activation:

```js id="q8d9s9"
self.skipWaiting();
```

This can be useful in some applications but can also create version-mismatch issues when an old page is suddenly controlled by a new worker.

Use it intentionally rather than automatically.

# Offline Fallbacks

A Service Worker can return a fallback response when the network fails.

For example:

```js id="b8lv8u"
self.addEventListener(
  "fetch",
  (event) => {
    event.respondWith(
      fetch(event.request)
        .catch(() =>
          caches.match(
            "/offline.html"
          )
        )
    );
  }
);
```

This can provide a better offline experience.

A more complete implementation should restrict the fallback to appropriate request types:

```js id="fru4du"
if (
  event.request.mode ===
  "navigate"
) {
  event.respondWith(
    fetch(event.request)
      .catch(() =>
        caches.match(
          "/offline.html"
        )
      )
  );
}
```

# Service Worker and Cache Responsibilities

Keep responsibilities clear:

```text
Service Worker
→ Intercepts requests
→ Manages lifecycle
→ Applies network strategy

Cache API
→ Stores request/response pairs
```

The Cache API can be used without a Service Worker, while a Service Worker commonly uses caches to implement offline and network strategies.

# Common Mistakes

## Caching Sensitive Data

Do not automatically cache authenticated or sensitive responses.

Consider:

```text
Who can access this data?
Is the response user-specific?
Can stale data cause harm?
Should it survive a session?
```

## Forgetting Cache Cleanup

Versioned caches should be cleaned during activation.

## Assuming Service Workers Are Always Active

Lifecycle transitions mean a worker may be:

```text
installing
waiting
active
redundant
```

Application behavior should account for lifecycle state.

## Treating Cache as a Database

The Cache API is designed around requests and responses.

For structured client-side application data, IndexedDB is often a better fit.

## Caching Every Request

Not every request should be intercepted and cached.

Define caching rules based on resource type and application requirements.

# Recommended Strategy

Use the simplest caching approach that satisfies the application.

For example:

```text
Static Assets
→ Cache First

Dynamic API Data
→ Network First

Frequently Updated Content
→ Stale While Revalidate

Navigation Offline Support
→ Network First + Offline Fallback
```

These are patterns, not universal rules.

# Best Practices

* Use feature detection before registering a Service Worker.
* Use HTTPS in production.
* Version your caches.
* Delete obsolete caches.
* Keep the worker focused on platform responsibilities.
* Do not cache sensitive data blindly.
* Clone responses when both caching and returning them.
* Design an explicit network strategy.
* Test offline and online transitions.
* Test worker updates and cache invalidation.
* Keep Service Worker logic small and predictable.

# References

* Service Worker API
* Service Worker lifecycle
* `navigator.serviceWorker`
* Cache API
* CacheStorage
* FetchEvent
