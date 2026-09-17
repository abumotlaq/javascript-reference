"use strict";

// Feature detection
const supportsClipboard =
"clipboard" in navigator;

const supportsGeolocation =
"geolocation" in navigator;

const supportsNotifications =
"Notification" in window;

const supportsStorage =
"localStorage" in window;

console.log("Clipboard:", supportsClipboard);
console.log("Geolocation:", supportsGeolocation);
console.log("Notifications:", supportsNotifications);
console.log("Local storage:", supportsStorage);

// Secure-context check
function canUseSecureFeatures() {
return window.isSecureContext === true;
}

console.log(
"Secure context:",
canUseSecureFeatures()
);

// Browser environment guard
function isBrowser() {
return (
typeof window !== "undefined" &&
typeof document !== "undefined"
);
}

console.log("Browser environment:", isBrowser());

// Safe viewport access
function getViewportSize() {
if (!isBrowser()) {
return null;
}

return {
width: window.innerWidth,
height: window.innerHeight,
};
}

console.log(
"Viewport:",
getViewportSize()
);

// Prefer capability detection over browser detection
function canUseFullscreen() {
return (
"fullscreenEnabled" in document &&
document.fullscreenEnabled === true
);
}

console.log(
"Fullscreen available:",
canUseFullscreen()
);

// Safe URL parsing
function parseUrl(value) {
try {
return new URL(
value,
window.location.origin
);
} catch {
return null;
}
}

const parsedUrl = parseUrl("/projects");

console.log(
"Parsed URL:",
parsedUrl?.href ?? null
);

// Safe same-origin navigation
function getSafePath(value) {
const url = parseUrl(value);

if (!url) {
return null;
}

if (
url.origin !==
window.location.origin
) {
return null;
}

return (
url.pathname +
url.search +
url.hash
);
}

console.log(
"Safe path:",
getSafePath(
"/projects?tab=all#top"
)
);

console.log(
"Unsafe path:",
getSafePath(
"https://example.com/projects"
)
);

// Query parameter helper
function getQueryParam(name) {
const params =
new URLSearchParams(
window.location.search
);

return params.get(name);
}

console.log(
"Search parameter:",
getQueryParam("search")
);

// Query parameter update without reload
function updateQueryParam(
name,
value
) {
const url = new URL(
window.location.href
);

if (value === null) {
url.searchParams.delete(name);
} else {
url.searchParams.set(
name,
value
);
}

window.history.replaceState(
window.history.state,
"",
url.href
);
}

// Avoid unnecessary history entries
const updateUrlButton =
document.querySelector(
"#update-url"
);

if (updateUrlButton) {
updateUrlButton.addEventListener(
"click",
() => {
updateQueryParam(
"section",
"examples"
);

```
  console.log(
    "Updated URL:",
    window.location.href
  );
}
```

);
}

// Push history only for meaningful navigation
function navigateToPath(path) {
const currentPath =
window.location.pathname;

if (currentPath === path) {
return;
}

const url = new URL(
path,
window.location.origin
);

window.history.pushState(
{
path: url.pathname,
},
"",
url.href
);
}

const navigationButton =
document.querySelector(
"#navigate-projects"
);

if (navigationButton) {
navigationButton.addEventListener(
"click",
() => {
navigateToPath(
"/projects"
);
}
);
}

// Handle browser navigation
window.addEventListener(
"popstate",
(event) => {
console.log(
"Navigation state:",
event.state
);

```
console.log(
  "Current path:",
  window.location.pathname
);
```

}
);

// Safe storage helpers
function saveJson(
storage,
key,
value
) {
try {
storage.setItem(
key,
JSON.stringify(value)
);

```
return true;
```

} catch (error) {
console.error(
"Storage write failed:",
error.message
);

```
return false;
```

}
}

function readJson(
storage,
key,
fallback = null
) {
try {
const value =
storage.getItem(key);

```
if (value === null) {
  return fallback;
}

return JSON.parse(value);
```

} catch (error) {
console.error(
"Storage read failed:",
error.message
);

```
return fallback;
```

}
}

function removeStoredValue(
storage,
key
) {
try {
storage.removeItem(key);

```
return true;
```

} catch (error) {
console.error(
"Storage removal failed:",
error.message
);

```
return false;
```

}
}

saveJson(
localStorage,
"javascript-reference:user",
{
name: "Osama Abu Motlaq",
role: "Frontend Developer",
}
);

console.log(
"Stored user:",
readJson(
localStorage,
"javascript-reference:user"
)
);

removeStoredValue(
localStorage,
"javascript-reference:user"
);

// Use namespaced storage keys
function createStorageKey(
namespace,
key
) {
return `${namespace}:${key}`;
}

const themeKey =
createStorageKey(
"javascript-reference",
"theme"
);

saveJson(
localStorage,
themeKey,
"dark"
);

console.log(
"Stored theme:",
readJson(
localStorage,
themeKey
)
);

// Do not store secrets in localStorage
const publicPreference = {
theme: "dark",
language: "javascript",
};

saveJson(
localStorage,
"javascript-reference:preferences",
publicPreference
);

// Avoid storing authorization decisions client-side
const storedRole =
readJson(
localStorage,
"javascript-reference:role"
);

console.log(
"Client role value:",
storedRole
);

// Event listener with cleanup
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

const cleanupResize =
subscribe(
window,
"resize",
() => {
console.log(
"Viewport:",
window.innerWidth,
window.innerHeight
);
}
);

// AbortController for multiple listeners
const controller =
new AbortController();

const signal =
controller.signal;

window.addEventListener(
"online",
() => {
console.log(
"Online event."
);
},
{ signal }
);

window.addEventListener(
"offline",
() => {
console.log(
"Offline event."
);
},
{ signal }
);

const cleanupControllerButton =
document.querySelector(
"#cleanup-controller"
);

if (cleanupControllerButton) {
cleanupControllerButton.addEventListener(
"click",
() => {
controller.abort();

```
  console.log(
    "AbortController cleanup completed."
  );
}
```

);
}

// Use passive listeners for non-cancelable scrolling work
const scrollCleanup =
subscribe(
window,
"scroll",
() => {
console.log(
"Scroll position:",
window.scrollY
);
},
{
passive: true,
}
);

// Debounce expensive input work
function debounce(
callback,
delay
) {
let timerId = null;

return (...args) => {
if (timerId !== null) {
clearTimeout(timerId);
}

```
timerId = setTimeout(() => {
  timerId = null;
  callback(...args);
}, delay);
```

};
}

const searchInput =
document.querySelector(
"#search"
);

if (searchInput) {
const handleSearch =
debounce((value) => {
console.log(
"Search:",
value
);
}, 400);

searchInput.addEventListener(
"input",
(event) => {
handleSearch(
event.target.value
);
}
);
}

// Throttle repeated events
function throttle(
callback,
delay
) {
let lastExecution = 0;

return (...args) => {
const now = Date.now();

```
if (
  now - lastExecution <
  delay
) {
  return;
}

lastExecution = now;

callback(...args);
```

};
}

const handleScroll =
throttle(() => {
console.log(
"Throttled scroll:",
window.scrollY
);
}, 200);

window.addEventListener(
"scroll",
handleScroll,
{
passive: true,
}
);

// Prefer requestAnimationFrame for visual updates
let frameId = null;

function scheduleVisualUpdate(
callback
) {
if (frameId !== null) {
cancelAnimationFrame(frameId);
}

frameId =
requestAnimationFrame(
(timestamp) => {
frameId = null;
callback(timestamp);
}
);
}

window.addEventListener(
"scroll",
() => {
scheduleVisualUpdate(
(timestamp) => {
console.log(
"Visual update at:",
timestamp
);
}
);
},
{
passive: true,
}
);

// Avoid uncontrolled intervals
function createPolling(
callback,
interval
) {
let intervalId = null;

function start() {
if (intervalId !== null) {
return;
}

```
intervalId = setInterval(
  callback,
  interval
);
```

}

function stop() {
if (intervalId === null) {
return;
}

```
clearInterval(intervalId);
intervalId = null;
```

}

return {
start,
stop,
};
}

const polling =
createPolling(() => {
if (document.hidden) {
return;
}

```
console.log(
  "Polling while page is visible."
);
```

}, 5000);

polling.start();

const stopPollingButton =
document.querySelector(
"#stop-polling"
);

if (stopPollingButton) {
stopPollingButton.addEventListener(
"click",
() => {
polling.stop();

```
  console.log(
    "Polling stopped."
  );
}
```

);
}

// Clear intervals when page is being discarded
window.addEventListener(
"pagehide",
() => {
polling.stop();
}
);

// Do not assume navigator.onLine means the server is reachable
async function checkServer(url) {
try {
const response = await fetch(
url,
{
method: "HEAD",
cache: "no-store",
}
);

```
return response.ok;
```

} catch {
return false;
}
}

checkServer(
"https://example.com"
).then((reachable) => {
console.log(
"Server reachable:",
reachable
);
});

// Guard network requests
async function requestJson(url) {
try {
const response =
await fetch(url);

```
if (!response.ok) {
  throw new Error(
    `HTTP error: ${response.status}`
  );
}

return await response.json();
```

} catch (error) {
console.error(
"Request failed:",
error.message
);

```
return null;
```

}
}

// Cancel stale requests
let activeRequestController =
null;

async function searchUsers(query) {
if (
activeRequestController
) {
activeRequestController.abort();
}

activeRequestController =
new AbortController();

try {
const url = new URL(
"https://jsonplaceholder.typicode.com/users"
);

```
url.searchParams.set(
  "name",
  query
);

const response =
  await fetch(
    url,
    {
      signal:
        activeRequestController
          .signal,
    }
  );

if (!response.ok) {
  throw new Error(
    `HTTP error: ${response.status}`
  );
}

return await response.json();
```

} catch (error) {
if (
error.name ===
"AbortError"
) {
return null;
}

```
throw error;
```

}
}

// Safe clipboard usage
async function copyText(text) {
if (
!window.isSecureContext ||
!("clipboard" in navigator)
) {
return false;
}

try {
await navigator.clipboard.writeText(
text
);

```
return true;
```

} catch {
return false;
}
}

const copyButton =
document.querySelector(
"#copy"
);

if (copyButton) {
copyButton.addEventListener(
"click",
async () => {
const copied =
await copyText(
"Osama Abu Motlaq"
);

```
  console.log(
    "Copied:",
    copied
  );
}
```

);
}

// Request permissions from user actions
const notificationButton =
document.querySelector(
"#notification"
);

if (
notificationButton &&
"Notification" in window
) {
notificationButton.addEventListener(
"click",
async () => {
try {
if (
Notification.permission ===
"default"
) {
const permission =
await Notification.requestPermission();

```
      if (
        permission !==
        "granted"
      ) {
        return;
      }
    }

    if (
      Notification.permission ===
      "granted"
    ) {
      new Notification(
        "JavaScript Reference",
        {
          body:
            "Notification sent successfully.",
        }
      );
    }
  } catch (error) {
    console.error(
      "Notification error:",
      error.message
    );
  }
}
```

);
}

// Geolocation only when needed
const locationButton =
document.querySelector(
"#location"
);

if (
locationButton &&
"geolocation" in navigator
) {
locationButton.addEventListener(
"click",
() => {
navigator.geolocation.getCurrentPosition(
(position) => {
console.log(
"Latitude:",
position.coords.latitude
);

```
      console.log(
        "Longitude:",
        position.coords.longitude
      );

      console.log(
        "Accuracy:",
        position.coords.accuracy
      );
    },
    (error) => {
      console.error(
        "Geolocation error:",
        error.message
      );
    },
    {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 30000,
    }
  );
}
```

);
}

// Keep permission-sensitive data out of URLs
function buildPublicUrl(path) {
const url = new URL(
path,
window.location.origin
);

url.searchParams.delete(
"token"
);

url.searchParams.delete(
"password"
);

return url.href;
}

console.log(
"Public URL:",
buildPublicUrl(
"/projects?tab=all"
)
);

// Safe external URL check
function isAllowedExternalUrl(
value
) {
try {
const url = new URL(value);

```
return (
  url.protocol === "https:"
);
```

} catch {
return false;
}
}

console.log(
"Allowed external URL:",
isAllowedExternalUrl(
"https://example.com"
)
);

console.log(
"Blocked external URL:",
isAllowedExternalUrl(
"javascript:alert(1)"
)
);

// postMessage origin validation
window.addEventListener(
"message",
(event) => {
if (
event.source !== window
) {
return;
}

```
if (
  event.origin !==
  window.location.origin
) {
  return;
}

if (
  !event.data ||
  typeof event.data !==
    "object"
) {
  return;
}

if (
  typeof event.data.type !==
  "string"
) {
  return;
}

console.log(
  "Accepted message:",
  event.data
);
```

}
);

// Avoid innerHTML for untrusted content
const output =
document.querySelector(
"#output"
);

const userInput =
"<img src=x onerror=alert(1)>";

if (output) {
output.textContent = userInput;
}

// Use textContent for plain text
function renderText(
element,
text
) {
if (!element) {
return;
}

element.textContent = text;
}

// Visibility-aware work
function handleVisibility() {
if (document.hidden) {
console.log(
"Pause non-essential work."
);
} else {
console.log(
"Resume non-essential work."
);
}
}

document.addEventListener(
"visibilitychange",
handleVisibility
);

// Respect reduced motion
const reducedMotion =
window.matchMedia(
"(prefers-reduced-motion: reduce)"
);

function handleReducedMotion(
event
) {
console.log(
"Reduced motion:",
event.matches
);
}

reducedMotion.addEventListener(
"change",
handleReducedMotion
);

console.log(
"Reduced motion:",
reducedMotion.matches
);

// Performance measurement
function measure(
name,
callback
) {
const start =
performance.now();

const result =
callback();

const duration =
performance.now() - start;

console.log(
`${name}:`,
duration,
"ms"
);

return result;
}

const result =
measure(
"Example calculation",
() => {
let total = 0;

```
  for (
    let index = 0;
    index < 100000;
    index++
  ) {
    total += index;
  }

  return total;
}
```

);

console.log(
"Calculation result:",
result
);

// Clean up browser resources
function cleanup() {
cleanupResize();
scrollCleanup();
polling.stop();

if (frameId !== null) {
cancelAnimationFrame(
frameId
);

```
frameId = null;
```

}

if (
activeRequestController
) {
activeRequestController.abort();
activeRequestController = null;
}

console.log(
"Browser resources cleaned up."
);
}

const cleanupButton =
document.querySelector(
"#cleanup"
);

if (cleanupButton) {
cleanupButton.addEventListener(
"click",
cleanup
);
}

// Final browser state snapshot
const browserSnapshot = {
url: window.location.href,
origin: window.location.origin,
online: navigator.onLine,
visible: !document.hidden,
viewport: {
width: window.innerWidth,
height: window.innerHeight,
},
secureContext:
window.isSecureContext,
devicePixelRatio:
window.devicePixelRatio,
};

console.log(
"Browser snapshot:",
browserSnapshot
);
