"use strict";

// Feature detection
const browserFeatures = {
localStorage: "localStorage" in window,
sessionStorage: "sessionStorage" in window,
clipboard: "clipboard" in navigator,
geolocation: "geolocation" in navigator,
notifications: "Notification" in window,
serviceWorker: "serviceWorker" in navigator,
broadcastChannel: "BroadcastChannel" in window,
intersectionObserver:
"IntersectionObserver" in window,
resizeObserver: "ResizeObserver" in window,
mutationObserver: "MutationObserver" in window,
performanceObserver:
"PerformanceObserver" in window,
};

console.log(
"Browser features:",
browserFeatures
);

// Browser environment check
const isBrowser =
typeof window !== "undefined" &&
typeof document !== "undefined";

console.log(
"Running in browser:",
isBrowser
);

// Secure context check
function isSecureBrowserContext() {
return window.isSecureContext === true;
}

console.log(
"Secure browser context:",
isSecureBrowserContext()
);

// URL state pattern
function getUrlState() {
const url = new URL(
window.location.href
);

return {
pathname: url.pathname,
search: Object.fromEntries(
url.searchParams.entries()
),
hash: url.hash,
};
}

console.log(
"URL state:",
getUrlState()
);

// Read query parameters
function getQueryParameter(name) {
const url = new URL(
window.location.href
);

return url.searchParams.get(name);
}

console.log(
"Search parameter:",
getQueryParameter("search")
);

// Update query parameter
function updateQueryParameter(
name,
value
) {
const url = new URL(
window.location.href
);

url.searchParams.set(
name,
value
);

window.history.replaceState(
null,
"",
url.href
);
}

const updateSearchButton =
document.querySelector(
"#update-search"
);

if (updateSearchButton) {
updateSearchButton.addEventListener(
"click",
() => {
updateQueryParameter(
"search",
"JavaScript"
);

```
  console.log(
    "URL updated:",
    window.location.href
  );
}
```

);
}

// Hash state pattern
function setHash(value) {
window.location.hash = value;
}

function getHash() {
return window.location.hash.replace(
"#",
""
);
}

console.log(
"Current hash:",
getHash()
);

const hashButton =
document.querySelector(
"#set-hash"
);

if (hashButton) {
hashButton.addEventListener(
"click",
() => {
setHash("projects");

```
  console.log(
    "Current hash:",
    getHash()
  );
}
```

);
}

// History state pattern
function pushPageState(
page,
data = {}
) {
const state = {
page,
...data,
};

window.history.pushState(
state,
"",
`/${page}`
);

return state;
}

const historyButton =
document.querySelector(
"#push-page"
);

if (historyButton) {
historyButton.addEventListener(
"click",
() => {
const state =
pushPageState(
"projects",
{
source:
"javascript-reference",
}
);

```
  console.log(
    "Pushed state:",
    state
  );
}
```

);
}

window.addEventListener(
"popstate",
(event) => {
console.log(
"Navigation state:",
event.state
);
}
);

// Storage helpers
function saveJson(
storage,
key,
value
) {
storage.setItem(
key,
JSON.stringify(value)
);
}

function readJson(
storage,
key,
fallback = null
) {
const value =
storage.getItem(key);

if (value === null) {
return fallback;
}

try {
return JSON.parse(value);
} catch {
return fallback;
}
}

function removeStorageItem(
storage,
key
) {
storage.removeItem(key);
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

// Storage namespacing
function storageKey(
namespace,
key
) {
return `${namespace}:${key}`;
}

const themeKey = storageKey(
"javascript-reference",
"theme"
);

localStorage.setItem(
themeKey,
"dark"
);

console.log(
"Theme:",
localStorage.getItem(
themeKey
)
);

// Storage availability
function isStorageAvailable(storage) {
try {
const key =
"**storage_test**";

```
storage.setItem(
  key,
  "1"
);

storage.removeItem(key);

return true;
```

} catch {
return false;
}
}

console.log(
"localStorage available:",
isStorageAvailable(localStorage)
);

console.log(
"sessionStorage available:",
isStorageAvailable(sessionStorage)
);

// Theme preference
function getTheme() {
return (
localStorage.getItem(
"javascript-reference:theme"
) ?? "light"
);
}

function setTheme(theme) {
localStorage.setItem(
"javascript-reference:theme",
theme
);

document.documentElement.dataset.theme =
theme;
}

setTheme(getTheme());

const themeButton =
document.querySelector(
"#toggle-theme"
);

if (themeButton) {
themeButton.addEventListener(
"click",
() => {
const nextTheme =
getTheme() === "dark"
? "light"
: "dark";

```
  setTheme(nextTheme);

  console.log(
    "Theme:",
    nextTheme
  );
}
```

);
}

// Media query helper
function watchMediaQuery(
query,
callback
) {
const mediaQuery =
window.matchMedia(query);

callback(mediaQuery.matches);

const handleChange = (event) => {
callback(event.matches);
};

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
}

const stopWatchingDarkMode =
watchMediaQuery(
"(prefers-color-scheme: dark)",
(isDark) => {
console.log(
"Dark mode preference:",
isDark
);
}
);

// Online/offline state
function getNetworkStatus() {
return navigator.onLine
? "online"
: "offline";
}

function handleNetworkChange() {
console.log(
"Network status:",
getNetworkStatus()
);
}

window.addEventListener(
"online",
handleNetworkChange
);

window.addEventListener(
"offline",
handleNetworkChange
);

console.log(
"Initial network status:",
getNetworkStatus()
);

// Generic event subscription
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

const stopResizeSubscription =
subscribe(
window,
"resize",
() => {
console.log(
"Resize:",
window.innerWidth,
window.innerHeight
);
}
);

// AbortController for listeners
const controller =
new AbortController();

window.addEventListener(
"scroll",
() => {
console.log(
"Scroll event:",
window.scrollY
);
},
{
passive: true,
signal: controller.signal,
}
);

const abortButton =
document.querySelector(
"#abort-listeners"
);

if (abortButton) {
abortButton.addEventListener(
"click",
() => {
controller.abort();

```
  console.log(
    "AbortController canceled listeners."
  );
}
```

);
}

// AbortController for fetch
async function fetchWithCancellation(
url
) {
const fetchController =
new AbortController();

const cancelButton =
document.querySelector(
"#cancel-fetch"
);

if (cancelButton) {
cancelButton.onclick = () => {
fetchController.abort();

```
  console.log(
    "Fetch aborted."
  );
};
```

}

try {
const response = await fetch(
url,
{
signal:
fetchController.signal,
}
);

```
if (!response.ok) {
  throw new Error(
    `HTTP error: ${response.status}`
  );
}

return await response.json();
```

} catch (error) {
if (error.name === "AbortError") {
console.log(
"Request canceled."
);

```
  return null;
}

throw error;
```

}
}

// Debounce pattern
function debounce(
callback,
delay
) {
let timerId;

return (...args) => {
clearTimeout(timerId);

```
timerId = setTimeout(() => {
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
}, 500);

searchInput.addEventListener(
"input",
(event) => {
handleSearch(
event.target.value
);
}
);
}

// Throttle pattern
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

const handleThrottledScroll =
throttle(() => {
console.log(
"Throttled scroll:",
window.scrollY
);
}, 200);

window.addEventListener(
"scroll",
handleThrottledScroll,
{ passive: true }
);

// requestAnimationFrame pattern
let animationFrameId = null;

function scheduleVisualUpdate(
callback
) {
if (
animationFrameId !== null
) {
cancelAnimationFrame(
animationFrameId
);
}

animationFrameId =
requestAnimationFrame(
(timestamp) => {
animationFrameId = null;
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
"Visual update:",
timestamp
);
}
);
},
{ passive: true }
);

// Polling pattern
function startPolling(
callback,
interval
) {
const intervalId =
setInterval(
callback,
interval
);

return () => {
clearInterval(
intervalId
);
};
}

let pollCount = 0;

const stopPolling =
startPolling(() => {
pollCount++;

```
console.log(
  "Poll:",
  pollCount
);

if (pollCount >= 3) {
  stopPolling();
}
```

}, 1000);

// Visibility-aware polling
let visibilityTimer =
null;

function startVisibilityAwarePolling() {
if (visibilityTimer !== null) {
return;
}

visibilityTimer =
setInterval(() => {
if (
document.hidden
) {
return;
}

```
  console.log(
    "Visible-page poll."
  );
}, 5000);
```

}

function stopVisibilityAwarePolling() {
if (
visibilityTimer === null
) {
return;
}

clearInterval(
visibilityTimer
);

visibilityTimer = null;
}

startVisibilityAwarePolling();

document.addEventListener(
"visibilitychange",
() => {
if (document.hidden) {
console.log(
"Page hidden."
);
} else {
console.log(
"Page visible."
);
}
}
);

// BroadcastChannel pattern
if ("BroadcastChannel" in window) {
const channel =
new BroadcastChannel(
"javascript-reference"
);

channel.addEventListener(
"message",
(event) => {
console.log(
"Cross-tab message:",
event.data
);
}
);

const broadcastButton =
document.querySelector(
"#broadcast"
);

if (broadcastButton) {
broadcastButton.addEventListener(
"click",
() => {
channel.postMessage({
name: "Osama Abu Motlaq",
message:
"Hello from another tab.",
});
}
);
}

const closeChannelButton =
document.querySelector(
"#close-channel"
);

if (closeChannelButton) {
closeChannelButton.addEventListener(
"click",
() => {
channel.close();

```
    console.log(
      "BroadcastChannel closed."
    );
  }
);
```

}
}

// Storage event for cross-tab synchronization
window.addEventListener(
"storage",
(event) => {
if (
event.key ===
"javascript-reference:theme"
) {
console.log(
"Theme changed in another tab:",
event.newValue
);
}
}
);

// Online reconnection pattern
let reconnectTimer = null;

function attemptReconnect() {
if (
reconnectTimer !== null
) {
return;
}

reconnectTimer =
setTimeout(() => {
reconnectTimer = null;

```
  if (!navigator.onLine) {
    console.log(
      "Still offline."
    );

    return;
  }

  console.log(
    "Attempting reconnection..."
  );
}, 1000);
```

}

window.addEventListener(
"online",
attemptReconnect
);

// Safe notification pattern
async function notifyUser(
title,
options = {}
) {
if (
!("Notification" in window)
) {
return false;
}

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
  return false;
}
```

}

if (
Notification.permission !==
"granted"
) {
return false;
}

new Notification(
title,
options
);

return true;
}

const notifyButton =
document.querySelector(
"#notify-user"
);

if (notifyButton) {
notifyButton.addEventListener(
"click",
async () => {
const sent =
await notifyUser(
"JavaScript Reference",
{
body:
"A browser notification was sent.",
}
);

```
  console.log(
    "Notification sent:",
    sent
  );
}
```

);
}

// Geolocation helper
function getCurrentPosition() {
return new Promise(
(resolve, reject) => {
if (
!("geolocation" in navigator)
) {
reject(
new Error(
"Geolocation is not supported."
)
);

```
    return;
  }

  navigator.geolocation.getCurrentPosition(
    resolve,
    reject,
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 30000,
    }
  );
}
```

);
}

const locationButton =
document.querySelector(
"#get-location"
);

if (locationButton) {
locationButton.addEventListener(
"click",
async () => {
try {
const position =
await getCurrentPosition();

```
    console.log(
      "Latitude:",
      position.coords.latitude
    );

    console.log(
      "Longitude:",
      position.coords.longitude
    );

    console.log(
      "Accuracy:",
      position.coords.accuracy
    );
  } catch (error) {
    console.error(
      "Location error:",
      error.message
    );
  }
}
```

);
}

// Observer helper
function observeElement(
element,
callback
) {
if (
!element ||
!("IntersectionObserver" in window)
) {
return () => {};
}

const observer =
new IntersectionObserver(
(entries) => {
callback(entries);
}
);

observer.observe(
element
);

return () => {
observer.disconnect();
};
}

const observedElement =
document.querySelector(
"#observed-element"
);

const stopObserving =
observeElement(
observedElement,
(entries) => {
entries.forEach(
(entry) => {
console.log(
"Element visible:",
entry.isIntersecting
);
}
);
}
);

const stopObserverButton =
document.querySelector(
"#stop-observer"
);

if (stopObserverButton) {
stopObserverButton.addEventListener(
"click",
() => {
stopObserving();

```
  console.log(
    "Intersection observer stopped."
  );
}
```

);
}

// Resize observer pattern
const resizeTarget =
document.querySelector(
"#resize-target"
);

if (
resizeTarget &&
"ResizeObserver" in window
) {
const resizeObserver =
new ResizeObserver(
(entries) => {
entries.forEach(
(entry) => {
console.log(
"Element size:",
entry.contentRect.width,
entry.contentRect.height
);
}
);
}
);

resizeObserver.observe(
resizeTarget
);
}

// Mutation observer pattern
const mutationTarget =
document.querySelector(
"#mutation-target"
);

if (
mutationTarget &&
"MutationObserver" in window
) {
const mutationObserver =
new MutationObserver(
(mutations) => {
mutations.forEach(
(mutation) => {
console.log(
"Mutation:",
mutation.type
);
}
);
}
);

mutationObserver.observe(
mutationTarget,
{
childList: true,
attributes: true,
subtree: true,
}
);
}

// Performance measurement pattern
function measureOperation(
name,
callback
) {
const start =
performance.now();

const result =
callback();

const end =
performance.now();

console.log(
`${name}:`,
end - start,
"ms"
);

return result;
}

const measuredResult =
measureOperation(
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
"Measured result:",
measuredResult
);

// Performance marks
performance.mark(
"practical-pattern-start"
);

for (
let index = 0;
index < 100000;
index++
) {
Math.sqrt(index);
}

performance.mark(
"practical-pattern-end"
);

performance.measure(
"practical-pattern",
"practical-pattern-start",
"practical-pattern-end"
);

console.log(
"Performance measure:",
performance.getEntriesByName(
"practical-pattern"
)
);

// Event listener cleanup
function createEventSubscription(
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

const cleanupScroll =
createEventSubscription(
window,
"scroll",
() => {
console.log(
"Managed scroll listener."
);
},
{
passive: true,
}
);

const cleanupButton =
document.querySelector(
"#cleanup"
);

if (cleanupButton) {
cleanupButton.addEventListener(
"click",
() => {
cleanupScroll();
stopWatchingDarkMode();
stopResizeSubscription();

```
  console.log(
    "Managed listeners cleaned up."
  );
}
```

);
}

// Page lifecycle cleanup
window.addEventListener(
"pagehide",
() => {
console.log(
"Page is being unloaded."
);
}
);

// Full browser state snapshot
const browserState = {
url: window.location.href,
online: navigator.onLine,
hidden: document.hidden,
viewport: {
width: window.innerWidth,
height: window.innerHeight,
},
screen: {
width: screen.width,
height: screen.height,
},
secureContext:
window.isSecureContext,
devicePixelRatio:
window.devicePixelRatio,
};

console.log(
"Browser state:",
browserState
);
