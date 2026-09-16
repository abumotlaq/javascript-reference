# BOM Practical Patterns

The Browser Object Model provides many APIs for interacting with the browser environment.

Learning each API separately is useful, but real applications rarely use browser APIs in isolation.

A production feature often combines several APIs:

```text
Browser API
    ↓
Event or user action
    ↓
Application state
    ↓
Async operation
    ↓
UI update
    ↓
Cleanup
```

For example, a "Use my location" feature may combine:

```text
Geolocation
+
Permission handling
+
React state
+
Loading state
+
Error handling
+
API request
```

This file focuses on practical patterns that combine the BOM and related Web Platform APIs into reusable application solutions.

---

# 1. What Makes a Good Browser API Pattern?

A good browser API pattern usually has five characteristics:

```text
1. Feature detection
2. Clear lifecycle
3. Error handling
4. Cleanup
5. Graceful fallback
```

For example:

```js
if (!navigator.geolocation) {
  // Fallback
  return;
}
```

Then:

```text
Request
↓
Success / error
↓
Update application state
↓
Cleanup if necessary
```

---

# 2. Browser API Feature Detection

Do not assume every browser provides every API.

Instead of:

```js
navigator.someFeature.doSomething();
```

check first:

```js
if (
  navigator.someFeature &&
  navigator.someFeature.doSomething
) {
  navigator.someFeature.doSomething();
}
```

Modern JavaScript can often use optional chaining:

```js
navigator.someFeature?.doSomething?.();
```

Feature detection is especially useful for:

* Clipboard
* Geolocation
* Notifications
* BroadcastChannel
* observers
* advanced browser capabilities

---

# 3. Feature Detection Is Not Permission Detection

These are different:

```text
API exists
```

and:

```text
API operation is allowed
```

For example:

```js
if (navigator.clipboard) {
  console.log("Clipboard API exists.");
}
```

does not guarantee:

```js
await navigator.clipboard.readText();
```

will succeed.

The operation can still fail because of:

* permissions
* user activation
* security context
* browser policy

Therefore:

```text
Feature detection
+
actual error handling
```

is the stronger pattern.

---

# 4. Secure Context Detection

Several browser APIs require an appropriate security context.

A practical check:

```js
if (!window.isSecureContext) {
  console.warn(
    "Some browser features may be unavailable."
  );
}
```

Useful APIs that commonly involve secure-context restrictions include:

```text
Geolocation
Clipboard
Notifications
Camera
Microphone
```

Production applications should normally use HTTPS.

---

# 5. Browser Environment Detection

A reusable browser check:

```js
export function isBrowser() {
  return (
    typeof window !== "undefined" &&
    typeof document !== "undefined"
  );
}
```

Usage:

```js
if (isBrowser()) {
  console.log(window.location.href);
}
```

This is especially relevant when code may run in:

* browsers
* Node.js
* server rendering
* Next.js server components
* build environments

---

# 6. Browser-Only Code Boundary

A browser-only function might look like:

```js
export function getCurrentUrl() {
  if (
    typeof window === "undefined"
  ) {
    return null;
  }

  return window.location.href;
}
```

This prevents server-side code from accessing browser globals.

However, avoid adding defensive checks everywhere blindly. Prefer clear architectural boundaries when possible.

---

# 7. Server vs Browser Mental Model

A useful model:

```text
                JavaScript
                    │
          ┌─────────┴─────────┐
          │                   │
       Server              Browser
          │                   │
      Database            window
      filesystem          document
      secrets             navigator
                            localStorage
                            clipboard
                            geolocation
```

Browser APIs belong to the browser side of the system.

---

# 8. Safe Access to `window`

A simple pattern:

```js
if (typeof window !== "undefined") {
  console.log(window.innerWidth);
}
```

Useful when a shared module may execute in different environments.

But for React and Next.js, a better architecture is often to place browser logic in a Client Component or effect rather than repeatedly checking `typeof window`.

---

# 9. Current URL Pattern

To inspect the current URL:

```js
const url = new URL(
  window.location.href
);

console.log({
  origin: url.origin,
  pathname: url.pathname,
  search: url.search,
  hash: url.hash,
});
```

This is safer and clearer than manually splitting the URL string.

---

# 10. Read a Query Parameter

```js
function getQueryParameter(name) {
  const params = new URLSearchParams(
    window.location.search
  );

  return params.get(name);
}
```

Usage:

```js
const search =
  getQueryParameter("search");

console.log(search);
```

This is useful for:

* search pages
* filters
* pagination
* feature flags
* route state

---

# 11. Update a Query Parameter

```js
function setQueryParameter(
  name,
  value
) {
  const url = new URL(
    window.location.href
  );

  url.searchParams.set(
    name,
    String(value)
  );

  window.history.pushState(
    {},
    "",
    url
  );
}
```

Usage:

```js
setQueryParameter(
  "page",
  2
);
```

The URL changes without a traditional document navigation.

Application routing state must still remain synchronized with this change.

---

# 12. Preserve Existing Query Parameters

A common mistake is to create a new query string from scratch.

Instead:

```js
const url = new URL(
  window.location.href
);

url.searchParams.set(
  "page",
  "2"
);

window.history.pushState(
  {},
  "",
  url
);
```

This preserves existing parameters.

---

# 13. Remove an Unneeded Parameter

```js
const url = new URL(
  window.location.href
);

url.searchParams.delete(
  "search"
);

window.history.pushState(
  {},
  "",
  url
);
```

This keeps URLs clean.

---

# 14. Build API URLs with `URL`

Prefer:

```js
const url = new URL(
  "https://api.example.com/projects"
);

url.searchParams.set(
  "page",
  "2"
);

url.searchParams.set(
  "search",
  "react"
);

const response =
  await fetch(url);
```

over:

```js
const url =
  "/projects?page=" +
  page +
  "&search=" +
  search;
```

The structured API handles serialization and encoding.

---

# 15. URL Builder Pattern

A reusable function:

```js
function createProjectsUrl({
  page = 1,
  search = "",
}) {
  const url = new URL(
    "https://api.example.com/projects"
  );

  url.searchParams.set(
    "page",
    String(page)
  );

  if (search) {
    url.searchParams.set(
      "search",
      search
    );
  }

  return url;
}
```

Usage:

```js
const url =
  createProjectsUrl({
    page: 2,
    search: "react",
  });

const response =
  await fetch(url);
```

---

# 16. Local Storage Helper

Repeated storage code can become inconsistent.

A small helper:

```js
export function setStorage(
  key,
  value
) {
  localStorage.setItem(
    key,
    JSON.stringify(value)
  );
}
```

Read:

```js
export function getStorage(
  key,
  fallback = null
) {
  const value =
    localStorage.getItem(key);

  if (value === null) {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}
```

---

# 17. Why Storage Helpers Matter

Without a helper, application code may repeatedly contain:

```js
JSON.stringify(...)
JSON.parse(...)
try/catch
null checks
```

A helper centralizes:

* serialization
* parsing
* error handling
* defaults

This reduces duplicated mistakes.

---

# 18. Safe Browser Storage Helper

A stronger helper can handle environments where storage is unavailable:

```js
export function getSafeStorage() {
  try {
    if (
      typeof window === "undefined" ||
      !window.localStorage
    ) {
      return null;
    }

    return window.localStorage;
  } catch {
    return null;
  }
}
```

Usage:

```js
const storage =
  getSafeStorage();

storage?.setItem(
  "theme",
  "dark"
);
```

Storage access can fail in restricted or unusual environments.

---

# 19. Storage Namespacing

Avoid generic keys such as:

```js
localStorage.setItem(
  "theme",
  "dark"
);
```

For larger applications, namespacing can help:

```js
localStorage.setItem(
  "osama-portfolio:theme",
  "dark"
);
```

Or:

```js
const STORAGE_PREFIX =
  "osama-portfolio:";
```

Then:

```js
localStorage.setItem(
  `${STORAGE_PREFIX}theme`,
  "dark"
);
```

This reduces accidental key collisions.

---

# 20. Storage Schema Versioning

Stored data can survive application updates.

A future version may have a different structure.

Example:

```js
const state = {
  version: 2,
  theme: "dark",
};
```

When reading:

```js
if (
  data?.version !== 2
) {
  migrateOrReset(data);
}
```

This becomes important when persistent client state evolves.

---

# 21. Theme Persistence Pattern

A common browser pattern:

```js
const savedTheme =
  localStorage.getItem(
    "theme"
  );

document.documentElement.dataset.theme =
  savedTheme || "light";
```

Later:

```js
localStorage.setItem(
  "theme",
  "dark"
);
```

In React and Next.js, theme initialization should also consider hydration and client/server rendering.

---

# 22. Theme + `prefers-color-scheme`

The browser can expose the user's system preference:

```js
const mediaQuery =
  window.matchMedia(
    "(prefers-color-scheme: dark)"
  );

console.log(
  mediaQuery.matches
);
```

A common strategy is:

```text
Saved user preference
        ↓
Use it if present
        ↓
Otherwise use system preference
        ↓
Otherwise use application default
```

---

# 23. Media Query Change Pattern

Listen for system theme changes:

```js
const mediaQuery =
  window.matchMedia(
    "(prefers-color-scheme: dark)"
  );

function handleThemeChange(event) {
  console.log(
    event.matches
      ? "Dark"
      : "Light"
  );
}

mediaQuery.addEventListener(
  "change",
  handleThemeChange
);
```

Cleanup:

```js
mediaQuery.removeEventListener(
  "change",
  handleThemeChange
);
```

---

# 24. Generic Media Query Hook Pattern

In React, browser state can be converted into React state:

```jsx
function useMediaQuery(query) {
  const [matches, setMatches] =
    useState(false);

  useEffect(() => {
    const mediaQuery =
      window.matchMedia(query);

    const handleChange = () => {
      setMatches(
        mediaQuery.matches
      );
    };

    handleChange();

    mediaQuery.addEventListener(
      "change",
      handleChange
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleChange
      );
    };
  }, [query]);

  return matches;
}
```

This is a general browser-external-state pattern.

---

# 25. Online/Offline State Pattern

A small browser utility:

```js
export function subscribeToOnlineStatus(
  callback
) {
  const update = () => {
    callback(navigator.onLine);
  };

  update();

  window.addEventListener(
    "online",
    update
  );

  window.addEventListener(
    "offline",
    update
  );

  return () => {
    window.removeEventListener(
      "online",
      update
    );

    window.removeEventListener(
      "offline",
      update
    );
  };
}
```

This returns an unsubscribe function.

That is a strong pattern for external browser subscriptions.

---

# 26. Why Return Cleanup Functions?

A reusable subscription should often follow:

```text
subscribe()
   ↓
return unsubscribe()
```

Example:

```js
const unsubscribe =
  subscribeToOnlineStatus(
    (isOnline) => {
      console.log(isOnline);
    }
  );
```

Later:

```js
unsubscribe();
```

This makes lifecycle management explicit.

---

# 27. React External Subscription Pattern

```jsx
useEffect(() => {
  const unsubscribe =
    subscribeToOnlineStatus(
      setIsOnline
    );

  return unsubscribe;
}, []);
```

This creates a clean relationship:

```text
Effect starts
↓
Subscription starts
↓
Component unmounts
↓
Subscription stops
```

---

# 28. Timer Utility Pattern

A reusable delayed operation:

```js
function delay(
  milliseconds
) {
  return new Promise(
    (resolve) => {
      setTimeout(
        resolve,
        milliseconds
      );
    }
  );
}
```

Usage:

```js
await delay(1000);

console.log(
  "One second passed."
);
```

This converts a timer callback into a Promise-based primitive.

---

# 29. Cancellable Timeout Pattern

A more advanced utility:

```js
function createTimeout(
  callback,
  delay
) {
  const timerId =
    setTimeout(
      callback,
      delay
    );

  return () => {
    clearTimeout(timerId);
  };
}
```

Usage:

```js
const cancel =
  createTimeout(
    () => {
      console.log(
        "Executed"
      );
    },
    3000
  );

cancel();
```

The pattern is:

```text
start
↓
return cleanup
```

---

# 30. Abortable Timeout Concept

Modern applications often use `AbortController` as a shared cancellation model.

Conceptually:

```js
function wait(
  milliseconds,
  signal
) {
  return new Promise(
    (resolve, reject) => {
      const timerId =
        setTimeout(
          resolve,
          milliseconds
        );

      signal.addEventListener(
        "abort",
        () => {
          clearTimeout(timerId);

          reject(
            new DOMException(
              "Aborted",
              "AbortError"
            )
          );
        },
        { once: true }
      );
    }
  );
}
```

This allows timer cancellation to participate in a larger async workflow.

---

# 31. Debounce Pattern

A common browser utility:

```js
function debounce(
  callback,
  delay
) {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);

    timerId =
      setTimeout(() => {
        callback(...args);
      }, delay);
  };
}
```

Usage:

```js
const handleSearch =
  debounce(
    (value) => {
      console.log(
        "Search:",
        value
      );
    },
    500
  );
```

This is useful for:

* search
* filtering
* autosave
* validation

---

# 32. Debounce with Cleanup

For long-lived applications, it can be useful for a debounce utility to expose cancellation:

```js
function createDebounce(
  callback,
  delay
) {
  let timerId;

  function debounced(...args) {
    clearTimeout(timerId);

    timerId =
      setTimeout(() => {
        callback(...args);
      }, delay);
  }

  debounced.cancel = () => {
    clearTimeout(timerId);
  };

  return debounced;
}
```

Usage:

```js
const save =
  createDebounce(
    saveDraft,
    500
  );

save.cancel();
```

---

# 33. Throttle Pattern

A simple throttle:

```js
function throttle(
  callback,
  interval
) {
  let lastRun = 0;

  return (...args) => {
    const now =
      Date.now();

    if (
      now - lastRun >=
      interval
    ) {
      lastRun = now;

      callback(...args);
    }
  };
}
```

Useful for:

* scroll
* resize
* pointer movement

when regular time-based throttling is appropriate.

---

# 34. `requestAnimationFrame` Scheduling Pattern

For visual work:

```js
let frameId = null;

function scheduleRender() {
  if (frameId !== null) {
    return;
  }

  frameId =
    requestAnimationFrame(
      () => {
        frameId = null;

        updateUI();
      }
    );
}
```

Now multiple calls within the same rendering window can be coalesced.

---

# 35. Why Frame Scheduling Is Different from Throttling

Throttling says:

```text
Run at most once every N milliseconds.
```

`requestAnimationFrame()` says:

```text
Run at an appropriate browser rendering opportunity.
```

For animation and visual updates, frame scheduling is usually the more appropriate model.

---

# 36. Safe Scroll Listener

```js
function handleScroll() {
  scheduleRender();
}

window.addEventListener(
  "scroll",
  handleScroll,
  { passive: true }
);
```

If the handler never needs:

```js
event.preventDefault();
```

a passive listener may be appropriate.

---

# 37. Generic Event Subscription Helper

A reusable browser utility:

```js
function subscribe(
  target,
  eventName,
  handler,
  options
) {
  target.addEventListener(
    eventName,
    handler,
    options
  );

  return () => {
    target.removeEventListener(
      eventName,
      handler,
      options
    );
  };
}
```

Usage:

```js
const unsubscribe =
  subscribe(
    window,
    "resize",
    handleResize
  );
```

Later:

```js
unsubscribe();
```

This makes the lifecycle explicit.

---

# 38. `AbortController` for Multiple Listeners

Instead of manually removing several event listeners:

```js
const controller =
  new AbortController();

window.addEventListener(
  "resize",
  handleResize,
  {
    signal:
      controller.signal,
  }
);

window.addEventListener(
  "online",
  handleOnline,
  {
    signal:
      controller.signal,
  }
);

window.addEventListener(
  "offline",
  handleOffline,
  {
    signal:
      controller.signal,
  }
);
```

Cleanup:

```js
controller.abort();
```

One controller can coordinate the lifecycle of multiple listeners.

---

# 39. Fetch Cancellation Pattern

A common browser pattern:

```js
const controller =
  new AbortController();

const response =
  await fetch(
    "/api/projects",
    {
      signal:
        controller.signal,
    }
  );
```

Cancel:

```js
controller.abort();
```

This is useful when an operation is no longer relevant.

---

# 40. Search Request Cancellation

A practical pattern:

```js
let controller = null;

async function search(query) {
  controller?.abort();

  controller =
    new AbortController();

  try {
    const response =
      await fetch(
        `/api/search?q=${encodeURIComponent(
          query
        )}`,
        {
          signal:
            controller.signal,
        }
      );

    return await response.json();
  } catch (error) {
    if (
      error.name ===
      "AbortError"
    ) {
      return null;
    }

    throw error;
  }
}
```

Each new search cancels the previous one.

For URL construction, `URLSearchParams` is preferable to manually building the query string.

---

# 41. Better Search URL + Cancellation

```js
let controller = null;

async function search(query) {
  controller?.abort();

  controller =
    new AbortController();

  const url = new URL(
    "/api/search",
    window.location.origin
  );

  url.searchParams.set(
    "q",
    query
  );

  try {
    const response =
      await fetch(url, {
        signal:
          controller.signal,
      });

    if (!response.ok) {
      throw new Error(
        "Search failed."
      );
    }

    return await response.json();
  } catch (error) {
    if (
      error.name ===
      "AbortError"
    ) {
      return null;
    }

    throw error;
  }
}
```

This combines two useful browser patterns:

```text
URLSearchParams
+
AbortController
```

---

# 42. Clipboard Copy Pattern

A robust copy helper:

```js
async function copyText(text) {
  if (
    !navigator.clipboard?.writeText
  ) {
    throw new Error(
      "Clipboard is unavailable."
    );
  }

  await navigator.clipboard.writeText(
    text
  );
}
```

Usage:

```js
try {
  await copyText(
    "Hello, Osama Abu Motlaq!"
  );

  console.log(
    "Copied successfully."
  );
} catch (error) {
  console.error(
    "Copy failed:",
    error
  );
}
```

---

# 43. Copy Button Pattern

```js
button.addEventListener(
  "click",
  async () => {
    try {
      await navigator.clipboard.writeText(
        text
      );

      button.textContent =
        "Copied!";

      setTimeout(() => {
        button.textContent =
          "Copy";
      }, 2000);
    } catch {
      button.textContent =
        "Copy failed";
    }
  }
);
```

The order matters:

```text
Click
↓
Attempt copy
↓
Await result
↓
Show success/failure
```

Do not show success before the Promise resolves.

---

# 44. Geolocation Request Pattern

A Promise wrapper:

```js
function getCurrentLocation(
  options
) {
  return new Promise(
    (resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resolve,
        reject,
        options
      );
    }
  );
}
```

Usage:

```js
try {
  const position =
    await getCurrentLocation({
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 30000,
    });

  console.log(
    position.coords.latitude
  );

  console.log(
    position.coords.longitude
  );
} catch (error) {
  console.error(error);
}
```

---

# 45. Location State Pattern

A useful state model:

```js
const initialState = {
  status: "idle",
  data: null,
  error: null,
};
```

Possible states:

```text
idle
requesting
success
error
```

This is more expressive than:

```js
const [loading, setLoading]
```

alone.

---

# 46. Notification Permission Pattern

```js
async function requestNotifications() {
  if (
    !("Notification" in window)
  ) {
    return "unsupported";
  }

  if (
    Notification.permission ===
    "granted"
  ) {
    return "granted";
  }

  return await Notification.requestPermission();
}
```

Usage:

```js
const permission =
  await requestNotifications();

console.log(permission);
```

---

# 47. Notification Creation Pattern

Separate permission from creation:

```js
function showNotification(
  title,
  options
) {
  if (
    !("Notification" in window)
  ) {
    return null;
  }

  if (
    Notification.permission !==
    "granted"
  ) {
    return null;
  }

  return new Notification(
    title,
    options
  );
}
```

This keeps permission logic and presentation logic separate.

---

# 48. Browser Permission Abstraction

Different browser capabilities can be handled through an application-level permission state.

Conceptually:

```js
const permissions = {
  notifications: "default",
  geolocation: "prompt",
  clipboard: "unknown",
};
```

But do not force all browser permission APIs into exactly the same semantics.

Each capability has different rules.

---

# 49. Visibility-Aware Background Work

A useful pattern:

```js
let active = true;

document.addEventListener(
  "visibilitychange",
  () => {
    active =
      !document.hidden;
  }
);
```

Then:

```js
if (active) {
  performBackgroundWork();
}
```

For more robust applications, pause and resume actual subscriptions or polling rather than merely checking a Boolean before every operation.

---

# 50. Visibility + Polling

A basic pattern:

```js
let intervalId = null;

function startPolling() {
  if (intervalId !== null) {
    return;
  }

  intervalId =
    setInterval(
      fetchLatestData,
      5000
    );
}

function stopPolling() {
  if (intervalId === null) {
    return;
  }

  clearInterval(
    intervalId
  );

  intervalId = null;
}

document.addEventListener(
  "visibilitychange",
  () => {
    if (document.hidden) {
      stopPolling();
    } else {
      startPolling();
    }
  }
);
```

This can reduce unnecessary background work.

---

# 51. Visibility + Request Strategy

A more robust system might:

```text
Page hidden
   ↓
Stop nonessential polling

Page visible
   ↓
Fetch fresh data

Then
   ↓
Resume periodic updates
```

This avoids returning to the page with stale data.

---

# 52. Online + Polling

Combine online and visibility:

```text
           online?
             │
        ┌────┴────┐
       yes        no
        │          │
     visible?    stop
        │
   ┌────┴────┐
  yes        no
   │          │
 start       stop
```

This is a useful mental model for background synchronization.

---

# 53. Reconnection Pattern

When the browser reports online:

```js
window.addEventListener(
  "online",
  () => {
    syncPendingData();
  }
);
```

But do not assume the server is healthy.

The synchronization function should still handle:

```text
request failure
server error
authentication failure
duplicate operations
```

---

# 54. Exponential Backoff

A reusable retry strategy:

```js
async function retry(
  task,
  {
    attempts = 5,
    delay = 1000,
    maxDelay = 30000,
  } = {}
) {
  let currentDelay =
    delay;

  for (
    let attempt = 1;
    attempt <= attempts;
    attempt++
  ) {
    try {
      return await task();
    } catch (error) {
      if (
        attempt === attempts
      ) {
        throw error;
      }

      await new Promise(
        (resolve) =>
          setTimeout(
            resolve,
            currentDelay
          )
      );

      currentDelay =
        Math.min(
          currentDelay * 2,
          maxDelay
        );
    }
  }
}
```

Use retries only for operations where retrying is actually safe.

---

# 55. Idempotency and Retries

A retry can be dangerous for operations such as:

```text
Create order
Charge payment
Send message
Create record
```

because the first request may actually succeed even if the client does not receive the response.

Before retrying state-changing operations, consider idempotency.

This is a backend design concern, not just a browser concern.

---

# 56. Browser State Synchronization Across Tabs

The `storage` event can synchronize simple state.

Tab A:

```js
localStorage.setItem(
  "theme",
  "dark"
);
```

Tab B:

```js
window.addEventListener(
  "storage",
  (event) => {
    if (
      event.key === "theme"
    ) {
      console.log(
        event.newValue
      );
    }
  }
);
```

Remember that the originating document does not receive the `storage` event for its own change.

---

# 57. BroadcastChannel Pattern

For richer same-origin tab communication:

```js
const channel =
  new BroadcastChannel(
    "app-events"
  );
```

Send:

```js
channel.postMessage({
  type: "THEME_CHANGED",
  theme: "dark",
});
```

Receive:

```js
channel.onmessage = (
  event
) => {
  console.log(event.data);
};
```

Cleanup:

```js
channel.close();
```

This can be cleaner than overloading `localStorage` as a messaging mechanism.

---

# 58. Cross-Tab Logout Pattern

One tab logs out:

```js
localStorage.setItem(
  "logout",
  Date.now().toString()
);
```

Other tabs listen:

```js
window.addEventListener(
  "storage",
  (event) => {
    if (
      event.key === "logout"
    ) {
      handleLogout();
    }
  }
);
```

A more explicit architecture may use `BroadcastChannel`.

---

# 59. History Navigation Pattern

A simple SPA-style state update:

```js
const url = new URL(
  window.location.href
);

url.searchParams.set(
  "page",
  "2"
);

history.pushState(
  { page: 2 },
  "",
  url
);
```

Listen for browser navigation:

```js
window.addEventListener(
  "popstate",
  (event) => {
    console.log(
      event.state
    );
  }
);
```

This is the browser-level foundation behind some client-side routing behavior.

---

# 60. `pushState()` vs `replaceState()`

Use:

```js
history.pushState(...)
```

when creating a new history entry.

Use:

```js
history.replaceState(...)
```

when updating the current entry.

Mental model:

```text
pushState
→ add history entry

replaceState
→ modify current history entry
```

---

# 61. Search Filters + History

A practical filter pattern:

```js
function updateSearch(
  value
) {
  const url = new URL(
    window.location.href
  );

  if (value) {
    url.searchParams.set(
      "search",
      value
    );
  } else {
    url.searchParams.delete(
      "search"
    );
  }

  history.pushState(
    {},
    "",
    url
  );
}
```

The URL now reflects the current filter.

---

# 62. Back/Forward + State

If the interface changes based on the URL, listen for:

```js
window.addEventListener(
  "popstate",
  syncFromUrl
);
```

The flow becomes:

```text
User changes filter
↓
URL changes
↓
History entry created

User clicks Back
↓
popstate
↓
Read URL
↓
Update UI
```

This is a useful foundation for understanding routing libraries.

---

# 63. DOM Content Initialization Pattern

For scripts that may run before the DOM is ready:

```js
function initialize() {
  const button =
    document.querySelector(
      "#save"
    );

  button?.addEventListener(
    "click",
    handleClick
  );
}

if (
  document.readyState ===
  "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    initialize,
    { once: true }
  );
} else {
  initialize();
}
```

This pattern is useful in plain JavaScript applications.

Frameworks such as React generally manage component lifecycle differently.

---

# 64. `DOMContentLoaded` vs `load`

Use:

```text
DOMContentLoaded
```

when you need the parsed DOM.

Use:

```text
load
```

when you need the broader page/resource loading lifecycle.

Do not use `load` by default when DOM readiness is all you need.

---

# 65. Safe Before-Unload Pattern

If meaningful unsaved data exists:

```js
function handleBeforeUnload(
  event
) {
  event.preventDefault();
}
```

Only attach this handler when the page actually has unsaved state.

For example:

```js
window.addEventListener(
  "beforeunload",
  handleBeforeUnload
);
```

Remove it when the unsaved state is cleared.

---

# 66. Avoid Permanent `beforeunload`

Do not attach:

```js
window.addEventListener(
  "beforeunload",
  ...
);
```

for the entire life of every page without a reason.

Only activate it when there is a genuine risk of losing user data.

---

# 67. Page Visibility + Autosave

A practical pattern:

```text
User editing
    ↓
Debounced autosave

Page becomes hidden
    ↓
Attempt final synchronization
```

The page visibility event can provide a useful lifecycle signal.

However, do not assume a browser lifecycle event guarantees that an arbitrary async request will complete.

Use appropriate persistence mechanisms and APIs.

---

# 68. Geolocation + API Request

A common complete pattern:

```js
async function findNearby() {
  const position =
    await getCurrentLocation({
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 60000,
    });

  const url = new URL(
    "/api/nearby",
    window.location.origin
  );

  url.searchParams.set(
    "lat",
    String(
      position.coords.latitude
    )
  );

  url.searchParams.set(
    "lng",
    String(
      position.coords.longitude
    )
  );

  const response =
    await fetch(url);

  if (!response.ok) {
    throw new Error(
      "Nearby search failed."
    );
  }

  return response.json();
}
```

This combines multiple BOM concepts into one practical feature.

---

# 69. Geolocation + Permission-Friendly UI

A strong UI flow:

```text
Idle
↓
"Use my location"
↓
Request permission
↓
Finding location...
↓
Success
or
Permission denied
or
Unavailable
or
Timeout
```

This state model is usually better than simply:

```text
Location: yes/no
```

---

# 70. Clipboard + Notification Feedback

A copy action can combine:

```text
Clipboard API
+
notification/toast
```

Example:

```js
async function handleCopy() {
  try {
    await navigator.clipboard.writeText(
      "Hello, Osama Abu Motlaq!"
    );

    showToast(
      "Copied successfully."
    );
  } catch {
    showToast(
      "Copy failed."
    );
  }
}
```

The notification here is application UI, not necessarily the browser's system notification API.

Use the smallest feedback mechanism appropriate to the task.

---

# 71. Clipboard + System Notification

Using a system notification after every copy would usually be excessive:

```js
new Notification(
  "Copied!"
);
```

A small in-page status is usually more appropriate.

This demonstrates a broader design principle:

> Not every browser capability should be used just because it is available.

---

# 72. Online + Offline Banner

A reusable state model:

```jsx
function OfflineBanner({
  isOnline,
}) {
  if (isOnline) {
    return null;
  }

  return (
    <div role="status">
      You appear to be offline.
    </div>
  );
}
```

Combine with the online subscription:

```jsx
const isOnline =
  useOnlineStatus();
```

This creates a simple application-level pattern.

---

# 73. Online + Retry Button

Instead of automatically retrying everything:

```jsx
<button
  onClick={retry}
  disabled={!isOnline}
>
  Retry
</button>
```

This gives the user explicit control.

Automatic retry and manual retry can coexist depending on the feature.

---

# 74. Online + Cached Data

A resilient interface may render:

```text
Cached data
+
Connection status
+
Refresh action
```

Example:

```text
Projects
Updated 5 minutes ago

You appear to be offline.

[Try again]
```

This communicates both availability and freshness.

---

# 75. Network State Is Not Server State

A useful application model:

```js
const networkState = {
  browser: "online",
  server: "healthy",
  sync: "idle",
};
```

These are different dimensions.

For example:

```text
browser = online
server = unavailable
sync = failed
```

This is more accurate than:

```js
isOnline: true
```

for complex systems.

---

# 76. Notification Permission + Application Settings

A useful settings page can show:

```text
Notifications
Status: Enabled

[Disable in browser settings]
```

The application should not pretend to control browser permission directly after denial.

It can explain what the user can do next.

---

# 77. Permission State Utility

A small helper:

```js
function getNotificationState() {
  if (
    !("Notification" in window)
  ) {
    return "unsupported";
  }

  return Notification.permission;
}
```

Possible result:

```text
unsupported
default
granted
denied
```

This is a useful UI-level abstraction.

---

# 78. Generic Browser Capability Object

For diagnostics:

```js
function getBrowserCapabilities() {
  return {
    secureContext:
      window.isSecureContext,
    clipboard:
      Boolean(
        navigator.clipboard
      ),
    geolocation:
      "geolocation" in navigator,
    notifications:
      "Notification" in window,
  };
}
```

Usage:

```js
console.log(
  getBrowserCapabilities()
);
```

This is especially useful during development and debugging.

---

# 79. Capability Detection Is Better Than Browser Detection

Avoid code such as:

```js
if (
  navigator.userAgent.includes(
    "Chrome"
  )
) {
  // ...
}
```

when the real requirement is:

```text
Does this browser support feature X?
```

Prefer feature detection:

```js
if (
  "geolocation" in navigator
) {
  // ...
}
```

Browser identity strings are brittle.

---

# 80. User Agent Is Not a Capability API

The correct question is:

```text
Can the browser do this?
```

not:

```text
Which browser is this?
```

Feature detection makes applications more resilient to:

* browser versions
* alternate browsers
* embedded browsers
* future implementations

---

# 81. Error Normalization Pattern

Browser APIs may produce different native errors.

A utility can normalize them:

```js
function normalizeError(
  error
) {
  return {
    message:
      error instanceof Error
        ? error.message
        : "Unknown error",
    name:
      error?.name ??
      "UnknownError",
  };
}
```

Application code can then use a predictable error shape.

---

# 82. State + Error + Data Pattern

A general browser-feature state:

```js
const state = {
  status: "idle",
  data: null,
  error: null,
};
```

Possible transitions:

```text
idle
↓
loading
↓
success

or

loading
↓
error
```

This pattern works well for:

* geolocation
* clipboard operations
* API requests
* permission flows

---

# 83. State Machine Thinking

Instead of many conflicting Booleans:

```js
isLoading
isError
isReady
isDenied
```

consider one status:

```js
status:
  "idle"
  "loading"
  "success"
  "error"
```

This prevents impossible combinations such as:

```text
loading = true
success = true
error = true
```

---

# 84. Cleanup as a First-Class Concept

Any pattern that "starts" something should ask:

```text
How does it stop?
```

Examples:

```text
addEventListener
→ removeEventListener

setTimeout
→ clearTimeout

setInterval
→ clearInterval

requestAnimationFrame
→ cancelAnimationFrame

watchPosition
→ clearWatch

ResizeObserver
→ disconnect

BroadcastChannel
→ close

AbortController
→ abort
```

This is one of the most important practical BOM habits.

---

# 85. Resource Lifecycle Pattern

A general pattern:

```text
Create
  ↓
Use
  ↓
Stop
  ↓
Release
```

In React:

```jsx
useEffect(() => {
  const resource =
    createResource();

  return () => {
    resource.cleanup();
  };
}, []);
```

This is a fundamental effect pattern.

---

# 86. Browser Subscription Pattern

For event-based APIs:

```js
function subscribe(callback) {
  const handler = () => {
    callback();
  };

  window.addEventListener(
    "event",
    handler
  );

  return () => {
    window.removeEventListener(
      "event",
      handler
    );
  };
}
```

The caller receives a cleanup function.

This pattern generalizes to many browser APIs.

---

# 87. Observer Pattern

For observer APIs:

```js
function observeElement(
  element,
  callback
) {
  const observer =
    new ResizeObserver(
      callback
    );

  observer.observe(element);

  return () => {
    observer.disconnect();
  };
}
```

The same lifecycle model applies.

---

# 88. Watcher Pattern

For APIs such as geolocation:

```js
function watchLocation(
  onSuccess,
  onError
) {
  const id =
    navigator.geolocation.watchPosition(
      onSuccess,
      onError
    );

  return () => {
    navigator.geolocation.clearWatch(
      id
    );
  };
}
```

Again:

```text
start
↓
return cleanup
```

---

# 89. Browser API Adapter Pattern

A larger application can hide browser-specific details behind a small adapter.

For example:

```js
export const browserClipboard = {
  async writeText(text) {
    if (
      !navigator.clipboard?.writeText
    ) {
      throw new Error(
        "Clipboard unavailable."
      );
    }

    return navigator.clipboard.writeText(
      text
    );
  },
};
```

Application code can then use:

```js
await browserClipboard.writeText(
  text
);
```

This reduces browser-specific code scattered throughout the application.

---

# 90. Why Adapters Help

An adapter can centralize:

* feature detection
* error handling
* browser compatibility
* logging
* testing

This is especially useful when an API is used in many parts of the application.

Do not create an abstraction for every one-line browser API. Introduce adapters when repetition or complexity justifies them.

---

# 91. Progressive Enhancement Pattern

A feature can have:

```text
Modern capability
        ↓
Use advanced API

Capability unavailable
        ↓
Fallback

No fallback
        ↓
Clear message
```

For example:

```js
if (
  navigator.clipboard?.writeText
) {
  await navigator.clipboard.writeText(
    text
  );
} else {
  showManualCopyInstructions();
}
```

This is much better than crashing.

---

# 92. Graceful Degradation

The UI should remain usable when a capability fails.

For example:

```text
Location available
→ Show nearby results

Location denied
→ Ask user for city

Clipboard available
→ Copy automatically

Clipboard unavailable
→ Show selectable text
```

The key idea is:

```text
Feature unavailable
≠
Entire application unavailable
```

---

# 93. Manual Fallbacks

Examples:

### Geolocation

```text
Use my location
or
Enter city
```

### Clipboard

```text
Copy
or
Select and copy manually
```

### Notifications

```text
Browser notifications
or
In-app activity feed
```

### Offline

```text
Network unavailable
+
Cached/local functionality
```

This makes browser-dependent applications more robust.

---

# 94. BOM Pattern: Detect + Request + Handle

A common structure:

```text
Detect capability
      ↓
Request/access capability
      ↓
Success
      ↓
Update application
```

with failure paths:

```text
Detect capability
      ↓
Unavailable
      ↓
Fallback
```

or:

```text
Request/access
      ↓
Permission/error
      ↓
Explain/recover
```

---

# 95. BOM Pattern: Event + State

Many browser APIs are external systems.

The pattern is:

```text
Browser
  ↓
Event
  ↓
React state
  ↓
UI
```

Examples:

```text
online
offline
resize
visibilitychange
keydown
storage
```

This is exactly the kind of synchronization `useEffect` is designed to support in React.

---

# 96. BOM Pattern: User Action + Async API

Another common pattern:

```text
User clicks
   ↓
Browser API
   ↓
Promise
   ↓
success/error
   ↓
UI feedback
```

Examples:

```text
Copy
Geolocation
Notification permission
Fetch
```

A user-triggered async browser API should normally have:

* loading state
* success state
* error state

when the operation takes meaningful time.

---

# 97. BOM Pattern: URL + State Synchronization

A common application flow:

```text
User changes filter
      ↓
Application state changes
      ↓
URLSearchParams updated
      ↓
history.pushState()
      ↓
URL becomes shareable
```

And:

```text
User clicks Back
      ↓
popstate
      ↓
Read URL
      ↓
Restore application state
```

This is a browser-level foundation for URL-driven application state.

---

# 98. BOM Pattern: Browser Event + Cleanup

Example:

```js
useEffect(() => {
  function handleResize() {
    setWidth(
      window.innerWidth
    );
  }

  window.addEventListener(
    "resize",
    handleResize
  );

  return () => {
    window.removeEventListener(
      "resize",
      handleResize
    );
  };
}, []);
```

This pattern should become second nature.

---

# 99. BOM Pattern: Browser Watch + Cleanup

Example:

```js
useEffect(() => {
  const watchId =
    navigator.geolocation.watchPosition(
      handlePosition,
      handleError
    );

  return () => {
    navigator.geolocation.clearWatch(
      watchId
    );
  };
}, []);
```

Same lifecycle principle:

```text
setup
↓
use
↓
cleanup
```

---

# 100. BOM Pattern: Permission + Feature

For a sensitive feature:

```text
Explain why
   ↓
User activates
   ↓
Request permission
   ↓
Check result
   ↓
Enable feature
```

Avoid:

```text
Page loads
↓
Request everything
```

Good examples include:

* notifications
* geolocation
* camera
* microphone

---

# 101. BOM Pattern: Permission + Fallback

Example:

```text
Notification permission denied
        ↓
No system notification
        ↓
Use in-app activity indicator
```

Or:

```text
Geolocation denied
        ↓
Use manual location
```

The feature continues through another path.

---

# 102. BOM Pattern: Browser Signal + Real Request

For connectivity:

```text
navigator.onLine
        +
fetch()
        +
actual response
```

Do not rely solely on:

```js
navigator.onLine
```

because:

```text
online
≠
server available
```

---

# 103. BOM Pattern: Measure Before Optimize

For performance:

```text
Measure
   ↓
Identify bottleneck
   ↓
Optimize
   ↓
Measure again
```

Use:

```js
performance.now()
performance.mark()
performance.measure()
PerformanceObserver
```

when appropriate.

---

# 104. BOM Pattern: Main Thread Protection

For frequent work:

```text
High-frequency event
        ↓
Do minimal work
        ↓
Schedule visual update
```

Possible tools:

```text
requestAnimationFrame
throttle
debounce
observer APIs
```

The right tool depends on the problem.

---

# 105. BOM Pattern: Cancel Obsolete Work

Examples:

```text
Old fetch
↓
Abort

Old timer
↓
clearTimeout

Old interval
↓
clearInterval

Old animation
↓
cancelAnimationFrame

Old location watch
↓
clearWatch
```

Cancellation improves both correctness and resource use.

---

# 106. BOM Pattern: Avoid Duplicate Work

Before starting a resource:

```js
if (alreadyRunning) {
  return;
}
```

For example:

```js
function startPolling() {
  if (intervalId !== null) {
    return;
  }

  intervalId =
    setInterval(
      fetchLatest,
      5000
    );
}
```

This prevents accidental duplicate subscriptions.

---

# 107. Singleton-Like Browser Managers

If many components need the same browser service, consider centralizing it.

Examples:

```text
Connection manager
Notification manager
WebSocket manager
Authentication session manager
```

A central manager can prevent:

```text
10 components
↓
10 identical subscriptions
```

and instead provide:

```text
1 subscription
↓
shared application state
```

Use this only when the complexity is justified.

---

# 108. React Context for Shared Browser State

For application-wide browser state:

```text
App
├── Header
├── OfflineBanner
├── Dashboard
└── Projects
```

a provider can expose:

```js
{
  isOnline
}
```

This is useful when many components depend on the same state.

---

# 109. Do Not Use Context for Everything

If only one component needs:

```text
window.innerWidth
```

there may be no reason to introduce Context.

Use the smallest appropriate abstraction:

```text
local state
→ custom hook
→ Context
→ application manager
```

only as complexity grows.

---

# 110. BOM Practical Pattern: `useEventListener`

A reusable React hook can look like:

```jsx
function useEventListener(
  eventName,
  handler,
  target = window
) {
  useEffect(() => {
    if (!target) {
      return;
    }

    target.addEventListener(
      eventName,
      handler
    );

    return () => {
      target.removeEventListener(
        eventName,
        handler
      );
    };
  }, [
    eventName,
    handler,
    target,
  ]);
}
```

This can reduce repeated subscription code.

However, handler identity and effect dependencies still need careful consideration.

---

# 111. Potential Problem with Handler Identity

Suppose:

```jsx
function Component() {
  const handleResize = () => {
    console.log("resize");
  };

  useEventListener(
    "resize",
    handleResize
  );
}
```

A new function can be created on each render.

Depending on the hook implementation, this may cause repeated subscription and cleanup.

React hooks must therefore consider function identity and dependency behavior.

---

# 112. Stable Callback Pattern

A more advanced pattern can keep the latest callback while maintaining one event subscription.

Conceptually:

```jsx
const handlerRef =
  useRef(handler);

useEffect(() => {
  handlerRef.current =
    handler;
}, [handler]);

useEffect(() => {
  const listener = (...args) => {
    handlerRef.current(
      ...args
    );
  };

  target.addEventListener(
    eventName,
    listener
  );

  return () => {
    target.removeEventListener(
      eventName,
      listener
    );
  };
}, [
  eventName,
  target,
]);
```

This is an advanced optimization, not something every project needs.

---

# 113. Practical Pattern: `useOnlineStatus`

A focused hook:

```jsx
function useOnlineStatus() {
  const [
    isOnline,
    setIsOnline,
  ] = useState(true);

  useEffect(() => {
    const update = () => {
      setIsOnline(
        navigator.onLine
      );
    };

    update();

    window.addEventListener(
      "online",
      update
    );

    window.addEventListener(
      "offline",
      update
    );

    return () => {
      window.removeEventListener(
        "online",
        update
      );

      window.removeEventListener(
        "offline",
        update
      );
    };
  }, []);

  return isOnline;
}
```

This is a practical example of external browser state becoming React state.

---

# 114. Practical Pattern: `useViewportSize`

```jsx
function useViewportSize() {
  const [
    size,
    setSize,
  ] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function update() {
      setSize({
        width:
          window.innerWidth,
        height:
          window.innerHeight,
      });
    }

    update();

    window.addEventListener(
      "resize",
      update
    );

    return () => {
      window.removeEventListener(
        "resize",
        update
      );
    };
  }, []);

  return size;
}
```

For more demanding layouts, CSS media queries or `ResizeObserver` may be a better solution than tracking viewport size in React.

---

# 115. Practical Pattern: `useDocumentVisibility`

```jsx
function useDocumentVisibility() {
  const [
    isVisible,
    setIsVisible,
  ] = useState(true);

  useEffect(() => {
    const update = () => {
      setIsVisible(
        !document.hidden
      );
    };

    update();

    document.addEventListener(
      "visibilitychange",
      update
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        update
      );
    };
  }, []);

  return isVisible;
}
```

This can help coordinate background work.

---

# 116. Practical Pattern: `useClipboard`

A minimal abstraction:

```jsx
function useClipboard() {
  const [
    copied,
    setCopied,
  ] = useState(false);

  async function copy(text) {
    if (
      !navigator.clipboard?.writeText
    ) {
      throw new Error(
        "Clipboard unavailable."
      );
    }

    await navigator.clipboard.writeText(
      text
    );

    setCopied(true);
  }

  return {
    copied,
    copy,
  };
}
```

A production implementation may include:

* error state
* reset timer
* secure-context detection
* cancellation/lifecycle considerations

---

# 117. Practical Pattern: `useGeolocation`

Conceptually:

```jsx
function useGeolocation() {
  const [
    state,
    setState,
  ] = useState({
    status: "idle",
    position: null,
    error: null,
  });

  async function request() {
    setState({
      status: "requesting",
      position: null,
      error: null,
    });

    try {
      const position =
        await getCurrentLocation();

      setState({
        status: "success",
        position,
        error: null,
      });
    } catch (error) {
      setState({
        status: "error",
        position: null,
        error,
      });
    }
  }

  return {
    ...state,
    request,
  };
}
```

The actual hook should also handle browser support and lifecycle requirements.

---

# 118. Practical Pattern: Browser Storage Sync

A simple theme synchronization:

```js
window.addEventListener(
  "storage",
  (event) => {
    if (
      event.key ===
      "osama-portfolio:theme"
    ) {
      applyTheme(
        event.newValue
      );
    }
  }
);
```

This can synchronize simple settings between tabs.

---

# 119. Practical Pattern: Detect Reduced Motion

```js
const mediaQuery =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

if (mediaQuery.matches) {
  disableNonessentialMotion();
}
```

This can be used to adapt JavaScript-driven effects.

CSS should remain the primary mechanism for many animation adjustments.

---

# 120. Practical Pattern: Pause Animation When Hidden

```js
let frameId;

function animate() {
  updateAnimation();

  frameId =
    requestAnimationFrame(
      animate
    );
}

function stopAnimation() {
  cancelAnimationFrame(
    frameId
  );
}

document.addEventListener(
  "visibilitychange",
  () => {
    if (document.hidden) {
      stopAnimation();
    } else {
      frameId =
        requestAnimationFrame(
          animate
        );
    }
  }
);
```

This avoids unnecessary animation work while the document is hidden.

---

# 121. Practical Pattern: Lazy Initialization

Do not create expensive browser resources before they are needed.

Instead:

```js
button.addEventListener(
  "click",
  () => {
    initializeFeature();
  },
  { once: true }
);
```

This can reduce initial page work.

This pattern is especially useful for:

* heavy editors
* maps
* charts
* media
* advanced widgets

---

# 122. `once` for One-Time Initialization

Example:

```js
window.addEventListener(
  "scroll",
  initializeFeature,
  {
    once: true,
    passive: true,
  }
);
```

After the first scroll, the listener is removed.

This is cleaner than manually tracking:

```js
let initialized = false;
```

when a true one-time event is desired.

---

# 123. Practical Pattern: Lazy Intersection Observer

To load content when it approaches the viewport:

```js
const observer =
  new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (
          entry.isIntersecting
        ) {
          loadContent();

          observer.unobserve(
            entry.target
          );
        }
      }
    }
  );

observer.observe(
  targetElement
);
```

This can be useful for:

* images
* widgets
* charts
* expensive content

---

# 124. Practical Pattern: Auto-Cleanup Observer

A reusable observer helper:

```js
function observeOnce(
  element,
  callback
) {
  const observer =
    new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (
            entry.isIntersecting
          ) {
            callback(entry);

            observer.unobserve(
              element
            );

            observer.disconnect();
          }
        }
      }
    );

  observer.observe(element);

  return () => {
    observer.disconnect();
  };
}
```

This makes the lifecycle explicit.

---

# 125. Practical Pattern: Resource Timing Debugging

```js
const resources =
  performance.getEntriesByType(
    "resource"
  );

const slowResources =
  resources.filter(
    (resource) =>
      resource.duration > 500
  );

console.table(
  slowResources.map(
    (resource) => ({
      name: resource.name,
      duration:
        resource.duration,
    })
  )
);
```

This can quickly identify slow resources during development.

---

# 126. Practical Pattern: Custom Performance Markers

```js
performance.mark(
  "feature-start"
);

await initializeFeature();

performance.mark(
  "feature-end"
);

performance.measure(
  "feature-init",
  "feature-start",
  "feature-end"
);
```

This creates a measurable application-specific performance interval.

---

# 127. Practical Pattern: Performance Guardrail

You can detect unexpectedly slow operations:

```js
const measure =
  performance.getEntriesByName(
    "feature-init"
  )[0];

if (
  measure &&
  measure.duration > 500
) {
  console.warn(
    "Feature initialization is slow."
  );
}
```

This is more useful during development and monitoring than in everyday production UI logic.

---

# 128. Practical Pattern: Browser Debug Information

A development-only diagnostic helper:

```js
function getBrowserDebugInfo() {
  return {
    online:
      navigator.onLine,
    secureContext:
      window.isSecureContext,
    width:
      window.innerWidth,
    height:
      window.innerHeight,
    visibility:
      document.visibilityState,
    language:
      navigator.language,
  };
}
```

Usage:

```js
console.table(
  getBrowserDebugInfo()
);
```

This can help understand environment-specific bugs.

---

# 129. Do Not Expose Debug Information Unnecessarily

Browser debugging information may contain environment details.

Do not automatically send all of it to your backend.

Only collect information required for diagnostics.

---

# 130. Browser API Error Boundary

A generic wrapper can normalize browser API failures:

```js
async function safelyRun(
  operation,
  fallback = null
) {
  try {
    return await operation();
  } catch (error) {
    console.error(error);

    return fallback;
  }
}
```

Usage:

```js
const text =
  await safelyRun(
    () =>
      navigator.clipboard.readText(),
    ""
  );
```

Use this carefully. Swallowing errors indiscriminately can hide real application problems.

---

# 131. Do Not Hide Important Errors

This:

```js
try {
  await saveData();
} catch {
  return null;
}
```

may silently hide a critical failure.

A better design distinguishes:

```text
Expected failure
→ handle gracefully

Unexpected failure
→ log / report / surface appropriately
```

Error handling should preserve observability.

---

# 132. Browser API + Application Error Pattern

A useful structure:

```js
try {
  const result =
    await browserOperation();

  setState({
    status: "success",
    data: result,
    error: null,
  });
} catch (error) {
  setState({
    status: "error",
    data: null,
    error,
  });
}
```

This makes browser failures part of normal application state.

---

# 133. Practical Pattern: Progressive Feature Loading

Suppose a map is expensive.

Instead of loading immediately:

```text
Page opens
↓
Load map
↓
Load rest of page
```

prefer:

```text
Page opens
↓
Render core content

User opens map
↓
Load map
```

This can improve initial performance.

---

# 134. Practical Pattern: Avoid Unnecessary Browser APIs

Before using a BOM API, ask:

```text
What problem am I solving?
Is there a simpler browser feature?
Can CSS solve this?
Can React state solve this?
Can the server solve this?
Does the user actually need this capability?
```

This prevents unnecessary complexity.

---

# 135. Example: CSS Instead of JavaScript

Do not use JavaScript for simple hover behavior:

```js
element.addEventListener(
  "mouseenter",
  ...
);
```

when CSS can handle it:

```css
.card:hover {
  transform: scale(1.02);
}
```

Browser APIs are powerful, but they are not always the right tool.

---

# 136. Example: CSS Media Queries Instead of Window Resize

Do not always write:

```js
window.addEventListener(
  "resize",
  ...
);
```

just to change a layout.

Often:

```css
@media (max-width: 768px) {
  ...
}
```

is the correct solution.

Use JavaScript only when the component genuinely needs the measured value or behavioral information.

---

# 137. Example: IntersectionObserver Instead of Scroll Math

Instead of:

```js
window.addEventListener(
  "scroll",
  checkElementPosition
);
```

use:

```js
const observer =
  new IntersectionObserver(
    handleIntersection
  );

observer.observe(element);
```

when the actual requirement is:

> Tell me when this element enters the viewport.

Use the API that directly represents the problem.

---

# 138. Practical Pattern: Browser Capability Matrix

For a feature-heavy application:

```js
const capabilities = {
  clipboard:
    Boolean(
      navigator.clipboard
    ),

  geolocation:
    "geolocation" in
      navigator,

  notifications:
    "Notification" in
      window,

  serviceWorker:
    "serviceWorker" in
      navigator,

  broadcastChannel:
    "BroadcastChannel" in
      window,
};
```

This can be useful for diagnostics or progressive enhancement.

---

# 139. Avoid Over-Abstraction

Do not turn:

```js
window.innerWidth
```

into a complicated architecture unless the project benefits from it.

Use abstractions when they improve:

* reuse
* consistency
* testing
* separation of concerns
* lifecycle management

Not simply because abstractions are possible.

---

# 140. A Practical BOM Architecture

A mature frontend can separate concerns like:

```text
src/
├── browser/
│   ├── clipboard.js
│   ├── geolocation.js
│   ├── notifications.js
│   ├── storage.js
│   └── visibility.js
│
├── hooks/
│   ├── useOnlineStatus.js
│   ├── useClipboard.js
│   └── useGeolocation.js
│
└── components/
    ├── CopyButton.jsx
    ├── LocationButton.jsx
    └── OfflineBanner.jsx
```

This is only an example architecture.

Do not reorganize a project this way unless its size justifies it.

---

# 141. Browser Layer vs UI Layer

A clean separation can be:

```text
Browser API layer
        ↓
Application hook/service
        ↓
React component
```

Example:

```text
navigator.geolocation
        ↓
getCurrentLocation()
        ↓
useGeolocation()
        ↓
LocationButton
```

This keeps low-level browser details out of UI components.

---

# 142. Browser API Layer Benefits

Centralizing browser APIs can make testing easier.

Instead of testing:

```js
navigator.geolocation
```

throughout the application, a service can expose:

```js
getCurrentLocation()
```

and the service can be mocked.

This is especially useful as applications grow.

---

# 143. Practical Testing Pattern

Instead of:

```js
navigator.geolocation.getCurrentPosition(...)
```

directly in every component, use:

```js
locationService.getCurrentLocation()
```

Then tests can replace:

```js
locationService.getCurrentLocation
```

with a deterministic mock.

This is a software design benefit, not a browser requirement.

---

# 144. Browser APIs and Dependency Injection

For complex applications, browser capabilities can be injected:

```js
function createFeature({
  clipboard,
  storage,
}) {
  // Feature logic
}
```

Then production can provide:

```js
{
  clipboard:
    navigator.clipboard,
}
```

while tests can provide:

```js
{
  clipboard:
    mockClipboard,
}
```

Use this level of abstraction only when the application complexity warrants it.

---

# 145. Practical Pattern: Keep Browser Side Effects at the Edge

A useful architecture principle:

```text
Core logic
   ↓
Pure JavaScript
   ↓
Browser adapter
   ↓
Browser API
```

For example:

```text
Distance calculation
   ↓
pure function

Get current coordinates
   ↓
browser API
```

This makes most business logic independent of the browser.

---

# 146. Pure Logic + Browser API

Example:

```js
function isWithinRadius(
  distance,
  radius
) {
  return distance <= radius;
}
```

Browser-specific code:

```js
const position =
  await getCurrentLocation();
```

Then:

```js
const distance =
  calculateDistance(
    ...
  );

if (
  isWithinRadius(
    distance,
    10
  )
) {
  // ...
}
```

The calculation itself does not need `window` or `navigator`.

---

# 147. Why This Separation Matters

Pure functions are easier to:

* test
* reuse
* reason about
* move to server-side code

Browser-specific code is inherently environment-dependent.

Keep the two concepts separate where practical.

---

# 148. BOM Practical Pattern: Minimize Global State

Avoid creating many unrelated globals:

```js
window.appState = ...
window.currentLocation = ...
window.currentTimer = ...
window.currentUser = ...
```

This makes the application harder to reason about.

Prefer:

* modules
* closures
* React state
* Context where appropriate
* dedicated managers

---

# 149. Avoid Polluting `window`

Do not attach application data globally without a clear integration requirement.

Bad:

```js
window.user =
  currentUser;
```

Better:

```text
module state
React state
Context
server session
```

The global object should not become an accidental application database.

---

# 150. Browser API Pattern: Small Surface Area

A good abstraction exposes only what the application needs.

Instead of exporting the entire browser API:

```js
export {
  navigator,
  window,
  document,
};
```

prefer:

```js
export async function copyText(
  text
) {
  ...
}
```

The application then depends on the smaller contract.

---

# 151. Practical Pattern: Defensive URL Handling

When using a user-controlled URL:

```js
function isAllowedHttpUrl(
  value
) {
  try {
    const url =
      new URL(value);

    return (
      url.protocol ===
        "https:" ||
      url.protocol ===
        "http:"
    );
  } catch {
    return false;
  }
}
```

For security-sensitive redirects, an allowlist is often stronger than merely allowing HTTP(S).

---

# 152. Practical Pattern: Same-Origin URL

To allow only your own application:

```js
function isSameOrigin(
  value
) {
  try {
    const url =
      new URL(
        value,
        window.location.origin
      );

    return (
      url.origin ===
      window.location.origin
    );
  } catch {
    return false;
  }
}
```

This can be useful for validating internal navigation targets.

---

# 153. Internal vs External URLs

An application may intentionally support both:

```text
Internal:
 /projects/42

External:
 https://example.com
```

Do not accidentally treat every absolute URL as an internal path.

Classify the URL explicitly.

---

# 154. Practical Pattern: Safe Internal Redirect

```js
function getSafeRedirect(
  value
) {
  if (!value) {
    return "/";
  }

  try {
    const url =
      new URL(
        value,
        window.location.origin
      );

    if (
      url.origin !==
      window.location.origin
    ) {
      return "/";
    }

    return (
      url.pathname +
      url.search +
      url.hash
    );
  } catch {
    return "/";
  }
}
```

This converts a candidate URL into a same-origin navigation target.

---

# 155. Browser Security Pattern: Validate Incoming Messages

A reusable function:

```js
function isTrustedMessage(
  event,
  expectedOrigin
) {
  return (
    event.origin ===
      expectedOrigin &&
    event.source ===
      expectedWindow
  );
}
```

Then validate the payload separately.

Do not combine:

```text
trusted origin
+
trusted data
```

into one assumption.

---

# 156. Browser Performance Pattern: Measure a Feature

A utility:

```js
async function measureAsync(
  name,
  operation
) {
  const start =
    performance.now();

  try {
    return await operation();
  } finally {
    const duration =
      performance.now() - start;

    console.log(
      `${name}: ${duration.toFixed(
        2
      )}ms`
    );
  }
}
```

Usage:

```js
await measureAsync(
  "load projects",
  () =>
    fetch(
      "/api/projects"
    )
);
```

This is useful during development.

---

# 157. Avoid Logging Everything in Production

Performance logs such as:

```js
console.log(
  "Every request:",
  duration
);
```

can themselves create noise and overhead.

Use:

* development logging
* sampled telemetry
* structured monitoring

for production systems.

---

# 158. Practical Pattern: One-Time Capability Initialization

Some features need initialization once:

```js
let initialized =
  false;

function initialize() {
  if (initialized) {
    return;
  }

  initialized =
    true;

  // Setup.
}
```

This can prevent duplicate setup.

In React, lifecycle and effect cleanup often provide a better mechanism than manually tracking globals.

---

# 159. Practical Pattern: Cleanup Registry

For complex browser features:

```js
function createCleanupRegistry() {
  const cleanups = [];

  return {
    add(cleanup) {
      cleanups.push(cleanup);
    },

    cleanup() {
      for (
        const cleanup
        of cleanups
      ) {
        cleanup();
      }
    },
  };
}
```

Usage:

```js
const registry =
  createCleanupRegistry();

registry.add(
  subscribeToOnlineStatus(
    handleOnline
  )
);

registry.add(
  subscribeToResize(
    handleResize
  )
);

registry.cleanup();
```

This can be useful for advanced integrations.

---

# 160. Keep Cleanup Idempotent

A cleanup function should ideally be safe to call more than once.

Example:

```js
function stopPolling() {
  if (
    intervalId === null
  ) {
    return;
  }

  clearInterval(
    intervalId
  );

  intervalId = null;
}
```

Now:

```js
stopPolling();
stopPolling();
```

is harmless.

Idempotent cleanup makes lifecycle logic safer.

---

# 161. Cleanup Order

When multiple resources depend on each other, cleanup order can matter.

Conceptually:

```text
Stop event source
↓
Cancel async work
↓
Release UI resource
```

For example:

```text
stop location watch
↓
abort request
↓
clear derived state
```

The exact order depends on the feature.

---

# 162. Browser API Composition

Real features often look like:

```text
URL
+
History
+
Storage
+
Events
+
Timers
+
Fetch
```

For example:

```text
Search page
├── URLSearchParams
├── history.pushState
├── debounce
├── fetch
├── AbortController
└── React state
```

This is much closer to real development than learning each API as an isolated feature.

---

# 163. Practical Search Feature Architecture

A modern search page may use:

```text
User input
   ↓
React state
   ↓
Debounce
   ↓
Abort previous request
   ↓
Build URLSearchParams
   ↓
Fetch
   ↓
Update results
   ↓
Update URL
```

This combines several concepts from the BOM section.

---

# 164. Practical Search Example

```js
let controller = null;

const search =
  createDebounce(
    async (query) => {
      controller?.abort();

      controller =
        new AbortController();

      const url = new URL(
        "/api/search",
        window.location.origin
      );

      url.searchParams.set(
        "q",
        query
      );

      const response =
        await fetch(url, {
          signal:
            controller.signal,
        });

      return response.json();
    },
    400
  );
```

This is a realistic browser interaction pattern.

Production code should also handle stale UI state and errors.

---

# 165. Practical Dashboard Pattern

A dashboard may combine:

```text
Visibility
+
Online state
+
Polling
+
AbortController
+
Storage
```

Conceptually:

```text
Page visible?
   ↓
Online?
   ↓
Start polling
   ↓
Fetch
   ↓
Update UI

Page hidden?
   ↓
Stop polling

Offline?
   ↓
Stop network work

Online again?
   ↓
Refresh
```

This is a good example of using browser APIs together instead of independently.

---

# 166. Practical Offline Dashboard Strategy

A robust dashboard might:

```text
1. Show cached data immediately
2. Show current connection state
3. Fetch fresh data when possible
4. Abort stale requests
5. Retry intelligently
6. Refresh when page becomes visible
```

This creates a much better user experience than a simple loading spinner.

---

# 167. Practical Theme System

A complete theme pattern can combine:

```text
localStorage
+
matchMedia
+
storage event
+
React state
```

Conceptually:

```text
Saved theme?
  ↓
yes → use saved theme

no
  ↓
system preference

Tab changes theme
  ↓
storage event
  ↓
other tabs update
```

This is a good example of multiple browser APIs working together.

---

# 168. Practical Notification Settings

A mature notification feature may combine:

```text
Notification.permission
+
application preferences
+
push subscription
+
React state
```

For example:

```text
Browser permission:
granted

Application preference:
disabled

Push subscription:
active
```

The final application behavior should respect all relevant states.

---

# 169. Browser Permission vs App Preference

These are different:

```text
Browser permission:
"Can this site use notifications?"

Application preference:
"Does the user want notifications from this feature?"
```

A user can have:

```text
permission = granted
preference = disabled
```

and the application should not send notifications for that disabled feature.

---

# 170. Practical Location Settings

Location-aware applications may maintain:

```text
Location permission
+
Current coordinates
+
Accuracy
+
Tracking enabled
+
Manual fallback
```

Do not reduce all of that to:

```js
hasLocation: true
```

when the product needs more nuance.

---

# 171. Browser API Patterns and Business Logic

Keep browser concerns separate from business rules.

For example:

```js
const position =
  await getCurrentLocation();
```

is browser interaction.

While:

```js
isStoreWithinDeliveryRadius(
  position,
  store
);
```

is business logic.

This separation makes testing and maintenance easier.

---

# 172. Practical Full-Stack Location Flow

```text
Browser
   ↓
getCurrentPosition()
   ↓
latitude / longitude
   ↓
Validate client-side
   ↓
HTTPS request
   ↓
Server validates again
   ↓
Database/geospatial query
   ↓
Results
   ↓
React UI
```

This is a strong full-stack pattern.

---

# 173. Practical Full-Stack Clipboard Flow

For a pasted document:

```text
Clipboard
   ↓
paste event
   ↓
Read plain text or supported type
   ↓
Validate
   ↓
React state
   ↓
POST to backend
   ↓
Server validation
   ↓
Database/storage
```

Again:

```text
Browser input
≠
trusted server input
```

---

# 174. Practical Full-Stack Notification Flow

```text
React settings
   ↓
Permission
   ↓
Push subscription
   ↓
Backend
   ↓
Event
   ↓
Push service
   ↓
Service worker
   ↓
Notification
   ↓
Click
   ↓
Application
```

The browser API is one part of the architecture.

---

# 175. Common Pattern: Browser as Capability Provider

A useful way to think about the BOM is:

```text
Browser
   ↓
Capabilities
```

Examples:

```text
Window
Location
History
Storage
Clipboard
Geolocation
Notifications
Performance
Visibility
Events
```

Your application consumes these capabilities through controlled interfaces.

---

# 176. Common Pattern: External State Synchronization

Many BOM APIs are external state sources.

Examples:

```text
navigator.onLine
window.innerWidth
document.visibilityState
Notification.permission
matchMedia().matches
```

React pattern:

```text
External state
   ↓
Subscribe
   ↓
Store in React state
   ↓
Render
```

This is one of the most important conceptual connections between the BOM and React.

---

# 177. Common Pattern: Event Source + Snapshot

An external browser value often has:

```text
Current value
+
future changes
```

For example:

```text
navigator.onLine
```

gives the current state.

Then:

```text
online
offline
```

provide future changes.

This suggests the general pattern:

```text
Read initial snapshot
+
Subscribe to changes
```

This is a powerful way to reason about browser APIs.

---

# 178. Examples of Snapshot + Subscription

### Online status

```text
Snapshot:
navigator.onLine

Subscription:
online / offline
```

### Viewport size

```text
Snapshot:
window.innerWidth

Subscription:
resize
```

### Visibility

```text
Snapshot:
document.hidden

Subscription:
visibilitychange
```

### Media query

```text
Snapshot:
mediaQuery.matches

Subscription:
change
```

This is a core frontend pattern.

---

# 179. React and External Stores

For sophisticated external browser state, React provides patterns such as external-store subscriptions.

The underlying idea remains:

```text
get current state
+
subscribe to changes
```

Understanding the browser pattern first is more important than memorizing a React-specific implementation.

---

# 180. Pattern Selection Guide

Use:

```text
One-time browser value
→ read directly

User-triggered capability
→ event handler

Continuous browser state
→ subscription

Visual updates
→ requestAnimationFrame

Element visibility
→ IntersectionObserver

Element size
→ ResizeObserver

Asynchronous operation
→ Promise + error handling

Long-running resource
→ setup + cleanup

Cancellable operation
→ AbortController

URL-driven state
→ URLSearchParams + History
```

This is a practical decision framework.

---

# 181. When Not to Use the BOM

Do not use a browser API if a simpler layer is more appropriate.

Examples:

```text
CSS media query
instead of
manual resize tracking

React state
instead of
global window state

Server authorization
instead of
client permission checks

CSS animation
instead of
JavaScript animation
```

Choose the lowest-complexity solution that correctly solves the problem.

---

# 182. Practical Pattern: Keep Logic Deterministic

Browser APIs introduce non-deterministic external behavior.

Keep the surrounding business logic as deterministic as possible.

Example:

```js
function formatLocation(
  latitude,
  longitude
) {
  return `${latitude}, ${longitude}`;
}
```

The browser layer provides:

```js
position.coords
```

The formatter remains a pure function.

---

# 183. Practical Pattern: Test Browser Failures

Do not test only:

```text
success
```

Also test:

```text
unsupported
permission denied
timeout
offline
server failure
cancelled
background page
missing data
```

Browser APIs can fail for reasons that do not happen on your development machine.

---

# 184. Practical Pattern: Explicit Loading State

When a browser operation takes time:

```js
setState({
  status: "loading",
});
```

Then:

```text
loading
↓
success
```

or:

```text
loading
↓
error
```

This gives users predictable feedback.

---

# 185. Practical Pattern: Error State Is Data

Instead of:

```js
console.error(error);
```

only, also represent the result in application state:

```js
setState({
  status: "error",
  error,
});
```

Then the UI can respond appropriately.

---

# 186. Practical Pattern: Do Not Couple UI to Native Error Strings

Avoid:

```js
if (
  error.message ===
  "User denied Geolocation"
) {
  ...
}
```

Native browser error messages can vary.

Prefer:

```js
if (
  error.code ===
  GeolocationPositionError.PERMISSION_DENIED
) {
  ...
}
```

when the API provides a stable semantic error code.

---

# 187. Practical Pattern: Keep Browser Details Out of Components

Instead of:

```jsx
function Component() {
  // 100 lines of browser API logic
}
```

consider:

```text
browser service
↓
custom hook
↓
component
```

Example:

```text
geolocation.js
↓
useGeolocation()
↓
LocationButton.jsx
```

This becomes valuable as complexity grows.

---

# 188. Practical Pattern: Browser Service APIs

A service might expose:

```js
export {
  copyText,
  readClipboard,
};
```

rather than exposing:

```js
navigator.clipboard
```

everywhere.

The UI does not need to know how the browser capability is implemented.

---

# 189. Practical Pattern: Stable Public Contract

A service can return:

```js
{
  success: true,
  value: ...
}
```

or:

```js
{
  success: false,
  error: ...
}
```

This creates a stable contract between browser-specific code and application code.

---

# 190. Practical Pattern: Prefer Explicit Results

Instead of:

```js
return null;
```

for every failure, consider:

```js
return {
  success: false,
  reason: "permission-denied",
};
```

This is especially useful for browser capabilities with multiple failure modes.

---

# 191. Example Result Model

```js
{
  success: false,
  reason: "permission-denied",
  error: null
}
```

or:

```js
{
  success: true,
  value: {
    latitude: 31.5,
    longitude: 34.4
  }
}
```

This makes the application logic explicit.

---

# 192. Practical Pattern: Permission State as Data

Instead of:

```js
const canNotify = true;
```

use:

```js
const notificationState =
  Notification.permission;
```

This preserves the actual browser state.

Likewise, geolocation and other capabilities should be modeled according to their real semantics.

---

# 193. Practical Pattern: Cleanup on Route Change

In a single-page application, route changes may not reload the browser page.

Therefore, resources such as:

```text
intervals
listeners
geolocation watches
WebSockets
observers
```

must be cleaned up when a page or feature is no longer active.

React effects are a natural place for this lifecycle.

---

# 194. Practical Pattern: Route-Level Resource Ownership

A good rule:

> The component or feature that starts a long-lived browser resource should usually own its cleanup.

Example:

```text
Map page
→ starts geolocation watch
→ route changes
→ map page unmounts
→ cleanup watch
```

This avoids resource leakage across routes.

---

# 195. Practical Pattern: Abort on Unmount

For an async request:

```jsx
useEffect(() => {
  const controller =
    new AbortController();

  fetch(
    "/api/projects",
    {
      signal:
        controller.signal,
    }
  );

  return () => {
    controller.abort();
  };
}, []);
```

This prevents obsolete work from continuing after the component is gone.

Error handling should distinguish `AbortError` from actual failures.

---

# 196. Practical Pattern: Reset Local UI State

When an async feature ends:

```text
success
↓
show result
↓
cleanup transient status
```

For example:

```js
setCopied(true);

setTimeout(() => {
  setCopied(false);
}, 2000);
```

For reusable components, timer lifecycle should be handled safely.

---

# 197. Practical Pattern: Avoid Async State After Unmount

Modern React handles many cases better than older versions, but the underlying principle remains:

> Do not allow obsolete asynchronous work to control UI that no longer exists.

Cancellation is often better than merely checking whether a component is still mounted.

---

# 198. Practical Pattern: Use the Browser for What It Is Good At

Good browser responsibilities:

```text
UI
User interaction
Clipboard
Location permission
Notifications
Local storage
Rendering
Browser navigation
```

Server responsibilities:

```text
Authentication
Authorization
Secrets
Database access
Business rules
Trusted validation
```

Keeping responsibilities separate improves architecture.

---

# 199. Practical Pattern: Keep Secrets Server-Side

Never rely on:

```js
window
localStorage
sessionStorage
NEXT_PUBLIC_*
```

for private secrets.

Anything available to client JavaScript should be considered visible to the user.

Use server-side secrets for:

```text
database passwords
private signing keys
private service credentials
server-only API secrets
```

---

# 200. Practical Pattern: Validate Again on the Server

Even if the browser validates:

```js
if (
  latitude >= -90 &&
  latitude <= 90
) {
  ...
}
```

the server should validate again.

The general flow is:

```text
Client validation
→ UX

Server validation
→ security/correctness
```

---

# 201. Practical Pattern: Use URLs as Shareable State

Good examples:

```text
/projects?search=react
/projects?page=2
/docs?section=hooks
```

Poor candidates:

```text
isModalOpen=true
hoveredCard=5
temporaryAnimation=running
```

Put state in the URL when the state meaningfully belongs to navigation or sharing.

---

# 202. Practical Pattern: Do Not Put Secrets in URLs

Avoid:

```text
/reset?token=...
```

unless the authentication design explicitly requires a controlled one-time URL token and the system is designed around its exposure characteristics.

Never assume query parameters are private.

---

# 203. Practical Pattern: Browser Security as Defense in Depth

For a modern web application:

```text
HTTPS
+
secure cookies
+
CSP
+
input validation
+
safe rendering
+
authorization
+
database rules
```

No single layer should carry the entire security responsibility.

---

# 204. Practical Pattern: Performance as Layered Optimization

When an application is slow:

```text
1. Measure browser
2. Measure network
3. Measure server
4. Measure database
5. Identify bottleneck
6. Optimize
```

Do not immediately rewrite React components.

---

# 205. Practical Pattern: Start Simple, Add Complexity When Needed

Begin with:

```text
setTimeout
fetch
localStorage
addEventListener
```

Add:

```text
AbortController
observers
custom hooks
context
caching
service workers
```

only when the feature actually requires them.

This keeps the code understandable.

---

# 206. Practical Pattern: Prefer Native APIs Before Libraries

Before adding a library for a simple feature, ask whether the browser already provides the capability.

Examples:

```text
URLSearchParams
Clipboard API
Geolocation
IntersectionObserver
ResizeObserver
AbortController
BroadcastChannel
```

This does not mean "never use libraries."

It means:

> Understand the underlying platform before introducing abstraction.

---

# 207. Practical Pattern: Use Libraries for Complex Problems

A library becomes reasonable when the problem involves substantial complexity.

Examples:

```text
complex routing
advanced form validation
virtualized lists
rich text editing
state synchronization
maps
data fetching and caching
```

The goal is not zero dependencies.

The goal is justified dependencies.

---

# 208. BOM Patterns and Code Ownership

Each feature should have a clear owner.

For example:

```text
Clipboard service
→ clipboard lifecycle

Location hook
→ geolocation lifecycle

Notification manager
→ notification permissions

Search feature
→ URL + request lifecycle
```

This makes cleanup and maintenance easier.

---

# 209. Practical Pattern: One Source of Truth

Avoid having:

```text
React state
+
localStorage
+
URL
+
global variable
```

all independently represent the same state without synchronization rules.

Choose the primary source of truth.

For example:

```text
URL
→ source of truth for search filters
```

Then React state reflects it.

Or:

```text
React state
→ source of truth for modal visibility
```

rather than putting the modal state in the URL unnecessarily.

---

# 210. Synchronization Is a Design Problem

Whenever multiple systems represent the same state:

```text
URL
React state
localStorage
server
```

you need synchronization rules.

Ask:

```text
Which system wins?
When is each updated?
What happens after refresh?
What happens after Back?
What happens across tabs?
```

This is more important than the specific API being used.

---

# 211. Practical Search State Example

A good model might be:

```text
URL
↓
Initial search state

User types
↓
React local input state

Debounce
↓
API request

Successful search
↓
URL update
```

This keeps typing responsiveness separate from navigation state.

---

# 212. Practical Theme State Example

A possible model:

```text
localStorage
↓
User preference

matchMedia
↓
System fallback

React state
↓
Current UI theme
```

The application decides which source takes precedence.

---

# 213. Practical Offline State Example

A mature model:

```text
navigator.onLine
↓
Browser network signal

fetch result
↓
Actual request status

cache
↓
Available local data

sync queue
↓
Pending operations
```

Together they create an offline-aware application.

No single value is enough.

---

# 214. Practical Location State Example

A mature model:

```text
Permission
↓
Can we request?

Position
↓
Current estimate

Accuracy
↓
How precise?

Timestamp
↓
How recent?

Tracking state
↓
Should we continue?
```

This is more useful than storing only:

```js
location = true;
```

---

# 215. Practical Notification State Example

A mature model:

```text
Browser support
+
Permission
+
App preference
+
Push subscription
+
Delivery state
```

This prevents incorrect assumptions such as:

```text
permission granted
=
push notifications definitely work
```

---

# 216. Practical Performance State Example

A performance problem can be represented as:

```text
Page load
↓
Network
↓
Server
↓
Database
↓
Client processing
↓
Render
↓
Interaction
```

Measure each relevant stage instead of optimizing randomly.

---

# 217. BOM Reference Decision Table

| Requirement                 | API / Pattern           |
| --------------------------- | ----------------------- |
| Read current URL            | `URL`                   |
| Read query parameters       | `URLSearchParams`       |
| Change browser history      | History API             |
| Store small persistent data | `localStorage`          |
| Store tab/session data      | `sessionStorage`        |
| Delay work                  | `setTimeout`            |
| Repeat work                 | `setInterval`           |
| Visual animation            | `requestAnimationFrame` |
| Browser connection signal   | `navigator.onLine`      |
| Copy text                   | Clipboard API           |
| Get location once           | `getCurrentPosition()`  |
| Track location              | `watchPosition()`       |
| Notifications               | Notifications API       |
| Detect page visibility      | `visibilitychange`      |
| Detect element visibility   | `IntersectionObserver`  |
| Detect element size         | `ResizeObserver`        |
| Measure duration            | `performance.now()`     |
| Instrument operations       | `mark()` / `measure()`  |
| Observe performance         | `PerformanceObserver`   |
| Cancel async work           | `AbortController`       |
| Cross-tab messaging         | `BroadcastChannel`      |
| Cross-window messaging      | `postMessage()`         |

---

# 218. Practical Pattern: Choose the Right API

A simple decision process:

```text
Do I need the browser's current state?
        ↓
Read the relevant property.

Do I need future changes?
        ↓
Subscribe to the relevant event.

Do I need element visibility?
        ↓
IntersectionObserver.

Do I need element size?
        ↓
ResizeObserver.

Do I need visual frame synchronization?
        ↓
requestAnimationFrame.

Do I need cancellation?
        ↓
AbortController or the API's cleanup method.

Do I need server trust?
        ↓
Move the decision to the server.
```

This prevents many architectural mistakes.

---

# 219. Practical Pattern: Do Not Overuse `window`

If a problem can be solved with:

```css
@media ...
```

do not automatically use:

```js
window.innerWidth
```

If a problem can be solved with:

```html
<button>
```

do not recreate it with:

```html
<div>
```

If a problem can be solved server-side, do not move security logic into the browser.

Good engineering is often about choosing the simplest correct layer.

---

# 220. Practical Pattern: Browser API Wrapper Example

A complete example:

```js
export const locationService = {
  isSupported() {
    return (
      "geolocation" in
      navigator
    );
  },

  getCurrentPosition(
    options
  ) {
    return new Promise(
      (resolve, reject) => {
        if (
          !this.isSupported()
        ) {
          reject(
            new Error(
              "Geolocation is unavailable."
            )
          );

          return;
        }

        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          options
        );
      }
    );
  },
};
```

Usage:

```js
const position =
  await locationService.getCurrentPosition(
    {
      timeout: 10000,
    }
  );
```

The component does not need to understand the callback-based browser API.

---

# 221. Practical Pattern: Browser Service Testing

A browser service can be tested independently from the UI.

For example:

```js
const fakeLocation =
  {
    coords: {
      latitude: 1,
      longitude: 2,
    },
  };
```

A test can mock:

```text
navigator.geolocation
```

and verify how the service handles:

```text
success
denied
timeout
unavailable
```

This is much easier when browser code is centralized.

---

# 222. Practical Pattern: Keep Side Effects at the Edge

The following is mostly pure:

```js
function normalizeSearch(
  value
) {
  return value.trim();
}
```

The browser side effect is:

```js
history.pushState(...)
```

Keep the two separate where practical:

```text
Pure logic
↓
Browser effect
```

This improves maintainability.

---

# 223. Practical Pattern: Validate Before Side Effect

Before:

```js
window.location.href =
  redirect;
```

validate:

```js
if (
  isSafeRedirect(
    redirect
  )
) {
  window.location.href =
    redirect;
}
```

Before:

```js
await fetch(...)
```

validate required data.

Before:

```js
localStorage.setItem(...)
```

make sure the data shape is what the application expects.

Validation should happen before side effects.

---

# 224. Practical Pattern: User Feedback After Side Effect

The general sequence should be:

```text
User action
↓
Start operation
↓
Show loading if necessary
↓
Wait for result
↓
Show success or error
```

Not:

```text
User action
↓
Immediately claim success
↓
Try operation afterward
```

This applies to:

* clipboard
* geolocation
* notifications
* API requests
* storage operations
* navigation workflows

---

# 225. Practical Pattern: Browser API Errors Are Normal

Do not treat:

```text
permission denied
unsupported
timeout
offline
abort
```

as impossible exceptions.

For browser applications, these are expected operational states.

Good UX designs for them.

---

# 226. Practical Pattern: Explicit Fallback State

Instead of:

```js
try {
  ...
} catch {
}
```

prefer:

```js
setState({
  status: "unsupported",
});
```

or:

```js
setState({
  status: "permission-denied",
});
```

when the difference matters to the user.

---

# 227. Practical Pattern: Avoid Infinite Effects

When using browser state inside React:

```jsx
useEffect(() => {
  setWidth(window.innerWidth);
}, [width]);
```

can cause repeated updates.

The dependency list should represent what the effect actually synchronizes with.

For an event subscription, the effect often depends on the subscription inputs rather than the state that the handler updates.

---

# 228. Practical Pattern: Effects Should Have One Purpose

Prefer:

```jsx
useEffect(() => {
  subscribeToOnlineStatus();
  return cleanup;
}, []);
```

over a large effect that:

* subscribes to resize
* starts polling
* reads localStorage
* initializes clipboard
* starts geolocation
* updates unrelated state

Separate effects by synchronization concern.

---

# 229. Why Small Effects Help

Small effects make it easier to understand:

```text
What is being synchronized?
When does it start?
When does it stop?
```

This is especially valuable when working with browser APIs.

---

# 230. Practical Pattern: Avoid Hidden Side Effects in Render

React rendering should generally remain predictable.

Avoid doing this directly in the component body:

```jsx
navigator.geolocation.getCurrentPosition(...);
```

or:

```jsx
localStorage.setItem(...);
```

or:

```jsx
new Notification(...);
```

Use event handlers or appropriate effects according to the required lifecycle.

---

# 231. User Action vs Effect

A useful distinction:

### User action

Use event handler:

```jsx
onClick={handleCopy}
```

### Synchronization with external environment

Use effect:

```jsx
useEffect(() => {
  subscribe();
  return cleanup;
}, []);
```

This distinction prevents many React side-effect mistakes.

---

# 232. Practical Pattern: DOM Ref for Browser APIs

If you need a real DOM element:

```jsx
const inputRef =
  useRef(null);
```

Then:

```js
inputRef.current?.focus();
```

This can be appropriate for browser interaction.

Do not query the DOM globally with:

```js
document.querySelector(...)
```

for elements that React owns unless there is a specific reason.

---

# 233. React Ref vs Global DOM Query

Prefer:

```js
inputRef.current
```

for a React-owned element.

Use:

```js
document.querySelector(...)
```

when:

* integrating non-React content
* working with global browser elements
* handling a legacy DOM API

This keeps React and browser responsibilities clearer.

---

# 234. Practical Pattern: Window Events Still Use Native APIs

React owns:

```jsx
<button onClick={...}>
```

But browser globals still use:

```js
window.addEventListener(...)
```

for:

* resize
* online
* offline
* popstate
* message
* visibility-related integration

This is a common boundary in React applications.

---

# 235. Practical Pattern: Document Events

Similarly:

```js
document.addEventListener(
  "visibilitychange",
  handler
);
```

can be appropriate inside:

```jsx
useEffect(...)
```

when a component needs to synchronize with document lifecycle state.

---

# 236. Practical Pattern: Cleanup Every Subscription

A good mental checklist:

```text
Did I call:
addEventListener?
→ removeEventListener

setInterval?
→ clearInterval

setTimeout?
→ clearTimeout

watchPosition?
→ clearWatch

requestAnimationFrame?
→ cancelAnimationFrame

observe?
→ disconnect

BroadcastChannel?
→ close

fetch with AbortController?
→ abort when obsolete
```

If you cannot answer how the resource stops, revisit the design.

---

# 237. Practical Pattern: Don't Fight the Browser

Browsers intentionally throttle and restrict:

* background timers
* permissions
* popups
* autoplay
* clipboard
* notifications
* geolocation
* cross-origin access

Do not build an architecture that depends on bypassing these policies.

Design within the browser's security and lifecycle model.

---

# 238. Practical Pattern: User Intent Is a Security Signal

For sensitive capabilities, prefer:

```text
User action
↓
Permission request
↓
Capability
```

rather than:

```text
Page loads
↓
Silent capability access
```

This improves both UX and compatibility.

---

# 239. Practical Pattern: Browser APIs Are Not Security Boundaries

Never treat:

```js
navigator.geolocation
navigator.onLine
Notification.permission
localStorage
window.location
```

as authoritative security data.

They are client-side signals.

Security decisions belong on trusted server infrastructure when they matter.

---

# 240. Practical Pattern: Minimize Sensitive Data

For browser capabilities involving:

```text
location
clipboard
notifications
storage
```

ask:

```text
Do I need it?
How long?
Where stored?
Who can see it?
Can I use less precise data?
Can I avoid persistence?
```

This is privacy-aware engineering.

---

# 241. Practical Pattern: Keep User Experience Explicit

A good browser feature usually has visible states:

```text
Available
Loading
Success
Failed
Unavailable
Permission denied
```

The user should understand what is happening.

Browser APIs can fail for legitimate reasons; your UI should make those states understandable.

---

# 242. Practical Pattern: Production vs Development

Some browser APIs are easier to test locally.

For example:

```text
localhost
```

may receive secure-context treatment.

Production should still be deployed correctly:

```text
HTTPS
```

Always test both environments.

---

# 243. Practical Pattern: Development Diagnostics

A development helper:

```js
function diagnoseBrowser() {
  return {
    secure:
      window.isSecureContext,
    online:
      navigator.onLine,
    notifications:
      "Notification" in
      window,
    clipboard:
      Boolean(
        navigator.clipboard
      ),
    geolocation:
      "geolocation" in
      navigator,
  };
}
```

This can quickly identify environment problems.

---

# 244. Practical Pattern: Do Not Leak Diagnostics

Keep detailed diagnostics in development or controlled monitoring.

Do not expose:

```text
internal URLs
stack traces
tokens
sensitive location
private configuration
```

to users or production logs unnecessarily.

---

# 245. Practical Pattern: Browser Compatibility Strategy

A good approach:

```text
Standard API available
→ Use it

API unavailable
→ Fallback

Fallback unavailable
→ Clear message
```

Avoid maintaining many browser-specific branches unless a genuine compatibility requirement exists.

---

# 246. Practical Pattern: Standards First

Prefer standard APIs when possible:

```text
URL
URLSearchParams
Clipboard
Geolocation
IntersectionObserver
ResizeObserver
AbortController
BroadcastChannel
Performance
```

Then use framework abstractions on top.

This makes knowledge transferable across:

* React
* Next.js
* Vue
* Svelte
* vanilla JavaScript
* other web platforms

---

# 247. Practical Pattern: Understand the Primitive

Before learning:

```text
useRouter()
useSearchParams()
useClipboard()
```

understand:

```text
URL
History
Clipboard
```

This makes framework behavior easier to debug.

A framework abstraction is easier to understand when you know what browser capability it represents.

---

# 248. Practical Pattern: Build from Native Concepts

For example:

```text
Next.js search params
        ↓
URLSearchParams

Next.js client navigation
        ↓
History/navigation concepts

React resize hook
        ↓
window resize event

React online hook
        ↓
navigator.onLine + online/offline

React copy button
        ↓
Clipboard API
```

Native knowledge gives you a stronger mental model.

---

# 249. Practical Pattern: Avoid Blind Vibe Coding

When an AI-generated component contains:

```text
window
navigator
localStorage
useEffect
setInterval
fetch
```

do not simply copy it.

Ask:

```text
What browser API is this?
When does it run?
Can it fail?
Does it need permission?
Does it need cleanup?
Is it client-only?
Can it cause stale state?
```

Understanding these questions prevents fragile code.

---

# 250. Final BOM Practical Architecture

A mature browser feature often follows:

```text
                User
                  │
                  ▼
            UI / Event
                  │
                  ▼
         Application Hook
                  │
                  ▼
          Browser Adapter
                  │
                  ▼
            Browser API
                  │
          ┌───────┴────────┐
          │                │
       Success           Error
          │                │
          ▼                ▼
     App State        Error State
          │                │
          └───────┬────────┘
                  ▼
                  UI
                  │
                  ▼
               Cleanup
```

This is a highly reusable pattern for frontend engineering.

---

# 251. Practical Pattern Summary

## URL and Navigation

```text
URL
URLSearchParams
History API
popstate
```

Use for:

```text
search
filters
pagination
navigation state
```

---

## Storage

```text
localStorage
sessionStorage
storage event
```

Use for:

```text
preferences
small persistent state
cross-tab synchronization
```

---

## Timing

```text
setTimeout
setInterval
requestAnimationFrame
```

Use for:

```text
delays
polling
animations
```

Always think about cleanup.

---

## Browser State

```text
navigator.onLine
document.visibilityState
window.innerWidth
matchMedia()
```

Use:

```text
snapshot
+
subscription
```

when state can change over time.

---

## Permissions

```text
Geolocation
Notifications
Clipboard
```

Use:

```text
Explain
↓
User action
↓
Permission
↓
Success / fallback
```

---

## Performance

```text
performance.now()
performance.mark()
performance.measure()
PerformanceObserver
```

Use:

```text
Measure
↓
Identify bottleneck
↓
Optimize
↓
Measure again
```

---

## Lifecycle

```text
addEventListener
setInterval
watchPosition
observe
BroadcastChannel
fetch
```

Every long-lived resource needs an intentional cleanup strategy.

---

# 252. Final Mental Model

The most important BOM pattern is not a specific API.

It is a way of thinking:

```text
1. What browser capability do I need?
        ↓
2. Is it available?
        ↓
3. Does it require permission?
        ↓
4. Is it browser-only?
        ↓
5. Can the operation fail?
        ↓
6. What state should the UI show?
        ↓
7. Does the operation need cancellation?
        ↓
8. What cleanup is required?
        ↓
9. Is the browser result trustworthy?
        ↓
10. Does the server need to validate it?
```

This reasoning applies across almost every browser API.

A practical frontend developer should be comfortable composing APIs rather than memorizing them individually:

```text
URL
+
History
+
Events
+
Timers
+
Storage
+
Fetch
+
AbortController
+
Permissions
+
Clipboard
+
Geolocation
+
Notifications
+
Performance
+
Observers
```

The professional goal is not to use as many browser APIs as possible.

The goal is to use the **smallest correct set of browser capabilities**, with clear ownership, explicit state, proper cleanup, graceful failure, and correct separation between client responsibilities and server security.
