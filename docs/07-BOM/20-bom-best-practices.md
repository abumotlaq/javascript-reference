# BOM Best Practices

The Browser Object Model (BOM) provides JavaScript with access to browser-level capabilities such as the current URL, session history, storage, timers, browser events, geolocation, notifications, clipboard access, screen information, and network status.

Knowing how to use these APIs is important, but knowing **how to use them correctly** is more important.

A browser API can work perfectly and still be poorly designed if it:

* assumes the API always exists
* ignores permissions
* leaks sensitive information
* causes memory leaks
* blocks the main thread
* creates unnecessary listeners or timers
* breaks during server-side rendering
* stores secrets in client-controlled storage
* ignores accessibility
* creates race conditions
* couples application logic directly to browser globals

This chapter collects practical best practices for designing reliable, secure, maintainable browser-side code.

---

## 1. Treat the Browser as an Untrusted Environment

The browser is controlled by the user.

Users can:

* modify local storage
* edit URLs
* disable permissions
* use private browsing
* block notifications
* disconnect from the network
* use unsupported browsers
* install extensions
* manipulate client-side state
* inspect JavaScript
* modify requests
* alter DOM state

Therefore:

> Never treat client-side data or behavior as authoritative for security.

For example:

```js
const isAdmin = localStorage.getItem("isAdmin");

if (isAdmin === "true") {
  showAdminPanel();
}
```

This may be useful for changing the UI, but it is **not authorization**.

A user can manually execute:

```js
localStorage.setItem("isAdmin", "true");
```

Security-sensitive authorization must be enforced on the server.

### Correct architecture

```text
Browser
   ↓
Request
   ↓
Server
   ↓
Authentication
   ↓
Authorization
   ↓
Database
```

The browser can improve the user experience, but the server must enforce security decisions.

---

# 2. Use Feature Detection

Do not assume that every browser supports every API.

Instead of blindly calling:

```js
navigator.clipboard.writeText("Hello");
```

check whether the API exists:

```js
if ("clipboard" in navigator) {
  await navigator.clipboard.writeText("Hello");
}
```

Another example:

```js
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(success, error);
}
```

This prevents unsupported APIs from immediately producing runtime errors.

### General pattern

```js
if ("someAPI" in object) {
  // Use the API
} else {
  // Provide fallback behavior
}
```

Feature detection is generally better than guessing the browser from its user-agent string.

---

# 3. Prefer Capability Detection Over Browser Detection

Avoid code such as:

```js
if (navigator.userAgent.includes("Chrome")) {
  // ...
}
```

Browser detection is fragile because:

* user-agent strings can change
* different browsers can share engine behavior
* browsers can intentionally reduce identifying information
* a browser may support an API even when its name is unexpected

Prefer:

```js
if ("Notification" in window) {
  // Notifications are available
}
```

This asks the important question:

> "Can the environment perform this operation?"

rather than:

> "Which browser is running?"

---

# 4. Always Consider the Execution Environment

Browser globals do not exist in a normal server environment.

For example:

```js
window
document
navigator
localStorage
sessionStorage
```

are browser APIs.

Code such as this can fail during server-side execution:

```js
const theme = localStorage.getItem("theme");
```

A safer check is:

```js
if (typeof window !== "undefined") {
  const theme = localStorage.getItem("theme");
}
```

### Why `typeof`?

This is unsafe:

```js
if (window) {
  // ...
}
```

If `window` does not exist, evaluating `window` itself can throw a `ReferenceError`.

This is safer:

```js
if (typeof window !== "undefined") {
  // Browser environment
}
```

---

# 5. Keep Browser-Specific Code Close to the Browser Boundary

Browser-dependent logic should not be scattered throughout an application.

Instead of repeatedly writing:

```js
if (typeof window !== "undefined") {
  // browser logic
}
```

centralize the browser behavior.

For example:

```js
export function getStoredTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  return localStorage.getItem("theme") ?? "light";
}
```

Then application code can use:

```js
const theme = getStoredTheme();
```

This makes browser dependencies easier to understand and test.

---

# 6. In React, Subscribe and Clean Up Correctly

Browser event listeners, timers, observers, and subscriptions must usually be cleaned up.

For example:

```js
useEffect(() => {
  function handleOnline() {
    console.log("Online");
  }

  window.addEventListener("online", handleOnline);

  return () => {
    window.removeEventListener("online", handleOnline);
  };
}, []);
```

The cleanup function is important.

Without cleanup:

* listeners can accumulate
* callbacks can execute multiple times
* memory can be retained longer than necessary
* development behavior can become confusing
* components can create duplicated subscriptions

### Same principle applies to

* `setTimeout`
* `setInterval`
* `requestAnimationFrame`
* `addEventListener`
* `watchPosition`
* `ResizeObserver`
* `IntersectionObserver`
* `MutationObserver`
* `BroadcastChannel`
* custom subscriptions
* WebSocket connections
* `AbortController`

---

# 7. Prefer AbortController for Listener Cleanup When Appropriate

Modern browser APIs often support `AbortSignal`.

Example:

```js
const controller = new AbortController();

window.addEventListener(
  "resize",
  handleResize,
  { signal: controller.signal }
);

controller.abort();
```

Aborting removes the listener.

This becomes especially useful when multiple resources belong to the same lifecycle.

```js
const controller = new AbortController();

window.addEventListener("online", handleOnline, {
  signal: controller.signal,
});

window.addEventListener("offline", handleOffline, {
  signal: controller.signal,
});

// Later
controller.abort();
```

One cancellation mechanism can clean up multiple listeners.

---

# 8. Store References to Event Handlers When Manual Cleanup Is Used

This does not work:

```js
window.addEventListener("resize", () => {
  console.log(window.innerWidth);
});

window.removeEventListener("resize", () => {
  console.log(window.innerWidth);
});
```

The two functions are different objects.

Instead:

```js
function handleResize() {
  console.log(window.innerWidth);
}

window.addEventListener("resize", handleResize);

window.removeEventListener("resize", handleResize);
```

Function identity matters when removing listeners.

---

# 9. Do Not Create Unnecessary Global Event Listeners

This pattern is dangerous:

```js
setInterval(() => {
  window.addEventListener("scroll", handleScroll);
}, 1000);
```

Each interval creates another listener.

After a few minutes, many listeners may exist.

Prefer one listener with controlled execution:

```js
window.addEventListener("scroll", handleScroll);
```

And clean it up when needed.

---

# 10. Use Passive Listeners for Appropriate High-Frequency Input

For events such as scrolling or touch interactions, passive listeners can help the browser optimize scrolling.

```js
window.addEventListener(
  "touchmove",
  handleTouchMove,
  { passive: true }
);
```

A passive listener tells the browser:

> "This listener will not call `preventDefault()`."

Therefore this is invalid conceptually:

```js
window.addEventListener(
  "touchmove",
  (event) => {
    event.preventDefault();
  },
  { passive: true }
);
```

Only use `passive: true` when the event handler does not need to cancel the browser's default behavior.

---

# 11. Control High-Frequency Events

Events such as:

```text
scroll
resize
pointermove
mousemove
touchmove
```

can fire many times per second.

Do not perform expensive operations on every event.

Bad:

```js
window.addEventListener("scroll", () => {
  expensiveCalculation();
});
```

A better approach may use throttling:

```js
let scheduled = false;

function handleScroll() {
  if (scheduled) {
    return;
  }

  scheduled = true;

  requestAnimationFrame(() => {
    expensiveCalculation();
    scheduled = false;
  });
}

window.addEventListener("scroll", handleScroll);
```

This aligns visual work with the browser's rendering cycle.

---

# 12. Use Debouncing for "Wait Until the User Stops"

Debouncing is useful for operations such as:

* search input
* autocomplete
* validation
* saving drafts
* filtering
* API queries

Example:

```js
let timeoutId;

function handleInput(value) {
  clearTimeout(timeoutId);

  timeoutId = setTimeout(() => {
    search(value);
  }, 300);
}
```

A new input resets the timer.

The operation runs after the user stops typing for the specified period.

---

# 13. Use Throttling for "At Most Once Per Period"

Throttling is useful when you want regular updates without running code for every event.

Example:

```js
let lastRun = 0;

function handleScroll() {
  const now = Date.now();

  if (now - lastRun < 100) {
    return;
  }

  lastRun = now;

  updateScrollPosition();
}
```

### Simple distinction

```text
Debounce  → wait for silence
Throttle  → limit execution frequency
rAF       → align visual work with rendering
```

Choose based on the problem instead of using one technique everywhere.

---

# 14. Cancel Work That Is No Longer Relevant

Browser applications often start asynchronous operations that become obsolete.

For example, a user searches:

```text
O
Os
Osa
Osam
Osama
```

The application may send multiple requests.

An older request may finish after a newer one.

That can produce stale UI.

Use `AbortController`:

```js
const controller = new AbortController();

fetch("/api/search?q=Osama", {
  signal: controller.signal,
});
```

Then:

```js
controller.abort();
```

This prevents obsolete work from continuing when possible.

---

# 15. Handle Abort Errors Separately

Cancellation is not necessarily a real application failure.

```js
try {
  const response = await fetch(url, {
    signal: controller.signal,
  });

  return await response.json();
} catch (error) {
  if (error.name === "AbortError") {
    return;
  }

  throw error;
}
```

This prevents expected cancellation from being treated as a system failure.

---

# 16. Do Not Assume `navigator.onLine` Means Internet Access

This is an important distinction.

```js
navigator.onLine
```

indicates whether the browser considers the network connection to be available.

It does **not** prove that:

* the internet works
* your API is available
* your server is healthy
* DNS is working
* authentication works

Therefore:

```js
if (navigator.onLine) {
  fetch("/api/data");
}
```

is not enough by itself.

Always handle actual request failure.

---

# 17. Handle Network Failure at the Request Layer

Instead of relying exclusively on `online` and `offline` events:

```js
try {
  const response = await fetch("/api/data");

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();
} catch (error) {
  console.error("Request failed:", error);
}
```

Use browser network status as a **UX signal**, not as a complete networking system.

---

# 18. Treat Storage as User-Controlled Data

Never trust this:

```js
localStorage.getItem("role");
```

as a security source.

Local storage is accessible to client-side JavaScript and can be changed by the user.

Good uses include:

* UI preferences
* theme
* non-sensitive cached data
* dismissed notices
* temporary client state

Bad uses include:

* passwords
* private encryption keys
* authorization decisions
* secrets
* service credentials

---

# 19. Validate Data Read from Storage

Storage contains strings.

```js
const data = localStorage.getItem("profile");
```

This may be:

```js
null
```

or malformed content.

A robust parser should handle failures:

```js
function readJSON(key, fallback = null) {
  const value = localStorage.getItem(key);

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

Never assume stored data is valid forever.

---

# 20. Use Namespaced Storage Keys

Avoid generic names such as:

```text
theme
settings
user
data
```

Prefer application-specific keys:

```text
osama-portfolio:theme
osama-portfolio:settings
osama-portfolio:preferences
```

Namespacing reduces accidental collisions and makes storage easier to inspect.

---

# 21. Version Persistent Client Data

Client applications evolve.

A structure stored today may be incompatible tomorrow.

Instead of:

```js
{
  theme: "dark"
}
```

consider:

```js
{
  version: 1,
  theme: "dark"
}
```

Then future code can migrate old data.

Example:

```js
const stored = JSON.parse(value);

if (stored.version === 1) {
  // Migrate to version 2
}
```

Schema versioning becomes increasingly useful as an application grows.

---

# 22. Do Not Store Secrets in Environment Variables That Reach the Client

In client-side applications, a variable exposed to browser code should be considered public.

For example:

```text
NEXT_PUBLIC_...
```

in a Next.js application is intentionally exposed to the browser.

Therefore:

```text
NEXT_PUBLIC_API_KEY
NEXT_PUBLIC_SECRET
NEXT_PUBLIC_PASSWORD
```

should trigger suspicion.

A value exposed to client-side JavaScript should not be treated as a server secret.

Keep sensitive credentials on the server.

---

# 23. Understand Cookies Before Using Storage as an Authentication Solution

`localStorage` and cookies are not interchangeable.

Cookies can be configured with attributes such as:

```text
HttpOnly
Secure
SameSite
```

An `HttpOnly` cookie cannot be read by normal client-side JavaScript.

This can reduce exposure of session credentials to certain client-side attacks.

However, cookies also introduce concerns such as:

* CSRF
* same-site policies
* domain/path scope
* expiration
* credentialed requests

Authentication architecture should be chosen deliberately.

---

# 24. Do Not Put Sensitive Information in URLs

Avoid URLs such as:

```text
https://example.com/reset?token=secret-value
```

or:

```text
https://example.com/profile?password=my-password
```

URLs can leak through:

* browser history
* server logs
* analytics
* copied links
* screenshots
* referrer behavior
* monitoring systems

Sensitive values should normally be transmitted using appropriate secure mechanisms rather than casually embedding them in URLs.

---

# 25. Validate URL Parameters

Never assume that URL input is safe.

For example:

```js
const params = new URLSearchParams(window.location.search);

const redirect = params.get("redirect");
```

Do not blindly do:

```js
window.location.href = redirect;
```

This can create open redirect or phishing problems.

Instead, validate the destination.

For example:

```js
const url = new URL(redirect, window.location.origin);

if (url.origin === window.location.origin) {
  window.location.href = url.href;
}
```

The exact validation rules should match the application's requirements.

---

# 26. Be Careful With `window.open()`

Never blindly open user-controlled URLs:

```js
window.open(userProvidedUrl);
```

Validate the destination first.

Also understand the security implications of the opened window.

For links that open new browsing contexts, consider:

```html
<a
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
>
  Open
</a>
```

`noopener` prevents the opened page from using `window.opener` to control the opener relationship.

---

# 27. Validate `postMessage()` Origins

Cross-window messaging can be useful:

```js
window.postMessage(message, targetOrigin);
```

But message receivers must validate the sender.

Bad:

```js
window.addEventListener("message", (event) => {
  processMessage(event.data);
});
```

Better:

```js
window.addEventListener("message", (event) => {
  if (event.origin !== "https://trusted.example.com") {
    return;
  }

  processMessage(event.data);
});
```

The origin check should happen before processing privileged data or commands.

---

# 28. Validate Message Data, Not Only the Origin

A trusted origin can still send unexpected data.

Example:

```js
window.addEventListener("message", (event) => {
  if (event.origin !== "https://trusted.example.com") {
    return;
  }

  if (!event.data || event.data.type !== "OPEN_PROFILE") {
    return;
  }

  if (typeof event.data.userId !== "string") {
    return;
  }

  openProfile(event.data.userId);
});
```

Security validation should cover both:

1. Who sent the message?
2. What did they send?

---

# 29. Request Permissions at the Right Moment

Do not request every permission immediately after page load.

Bad user experience:

```text
Page loads
↓
Location permission
↓
Notification permission
↓
Clipboard permission
```

Users may reject requests because they do not understand the purpose.

Instead, request permission in response to an understandable user action.

Example:

```text
User clicks "Find My Location"
        ↓
Explain why location is needed
        ↓
Request location
```

Permission prompts should have context.

---

# 30. Respect Permission Denial

If a user denies access, do not repeatedly prompt them.

For example:

```js
if (Notification.permission === "denied") {
  showManualNotificationInstructions();
}
```

A good application provides a fallback.

Possible fallback strategies:

* in-app notifications
* manual location entry
* copy button with alternative instructions
* normal page content instead of push notifications

Graceful degradation is better than repeatedly forcing a feature.

---

# 31. Use Secure Contexts for Sensitive Browser APIs

Many browser capabilities require secure contexts.

Generally:

```text
HTTPS
```

is required for important APIs.

Examples may include:

* geolocation
* clipboard features
* notifications
* service workers
* powerful device APIs

Check:

```js
if (window.isSecureContext) {
  // Secure context
}
```

Local development often receives special treatment from browsers, but production applications should normally be deployed over HTTPS.

---

# 32. Never Assume Permission State Is Permanent

A permission state can change.

For example:

```text
granted
denied
prompt
```

Applications should handle all states.

Do not build logic assuming:

```js
Notification.permission === "granted"
```

will always remain true.

The user or browser can change permissions.

---

# 33. Use Geolocation Carefully

Geolocation exposes sensitive information.

Avoid requesting it continuously when a one-time reading is enough.

For example:

```js
navigator.geolocation.getCurrentPosition(success, error);
```

may be sufficient for:

```text
"Use my current location"
```

rather than:

```js
navigator.geolocation.watchPosition(...)
```

which continuously tracks changes.

Only track continuously when the feature genuinely requires it.

---

# 34. Minimize Location Precision

You do not always need exact coordinates.

If a feature only needs an approximate area, do not necessarily retain or transmit the most precise location available.

This follows a broader principle:

> Collect the minimum amount of data necessary to provide the feature.

This reduces privacy risk.

---

# 35. Clean Up Geolocation Watches

When using:

```js
const watchId = navigator.geolocation.watchPosition(
  success,
  error
);
```

stop it when it is no longer needed:

```js
navigator.geolocation.clearWatch(watchId);
```

In React, this commonly belongs in effect cleanup:

```js
useEffect(() => {
  const watchId = navigator.geolocation.watchPosition(
    handlePosition,
    handleError
  );

  return () => {
    navigator.geolocation.clearWatch(watchId);
  };
}, []);
```

---

# 36. Use `URL` and `URLSearchParams` Instead of Manual String Parsing

Avoid:

```js
const id = window.location.search
  .split("=")[1];
```

Prefer:

```js
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
```

Or:

```js
const url = new URL(window.location.href);

const id = url.searchParams.get("id");
```

This correctly handles encoding and multiple parameters.

---

# 37. Prefer URL State for Shareable Application State

Some state belongs in the URL.

For example:

```text
/search?q=react&page=2
```

This can make state:

* shareable
* bookmarkable
* reloadable
* navigable with browser history

Good candidates include:

* search queries
* filters
* sort order
* pagination
* selected tabs
* public view state

Do not put private application state in the URL merely for convenience.

---

# 38. Use History API Deliberately

`pushState()` creates a history entry:

```js
history.pushState(
  { page: "projects" },
  "",
  "/projects"
);
```

`replaceState()` changes the current entry:

```js
history.replaceState(
  { page: "projects" },
  "",
  "/projects"
);
```

A useful rule:

```text
pushState    → user should be able to go back to the previous state
replaceState → current state should be updated without creating history
```

Do not create unnecessary history entries for every tiny UI change.

---

# 39. Keep URL State and Application State Consistent

If the URL says:

```text
?page=2
```

but the application internally thinks:

```js
page = 1;
```

the UI becomes inconsistent.

Choose a clear source of truth.

For shareable navigation state, the URL often makes sense as the source of truth.

---

# 40. Use `replaceState()` for Non-Navigational URL Updates

For example, updating a query parameter while typing might not need one history entry per keystroke.

Instead of:

```js
history.pushState({}, "", `?q=${value}`);
```

for every character, consider:

```js
history.replaceState({}, "", `?q=${encodeURIComponent(value)}`);
```

This prevents the Back button from requiring many presses just to leave a search field.

---

# 41. Remember That Browser History Is User Navigation State

Do not abuse:

```js
history.pushState()
```

to create artificial navigation complexity.

The Back and Forward buttons are part of the browser's user experience.

Your application should cooperate with that mental model rather than fighting it.

---

# 42. Use `visibilitychange` for Background Work

When a tab becomes hidden:

```js
document.hidden
```

may be useful for reducing unnecessary work.

Example:

```js
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopPolling();
  } else {
    startPolling();
  }
});
```

This is useful for:

* polling
* animations
* expensive timers
* analytics batching
* media-related work

Do not assume a hidden page behaves exactly like a visible page. Browsers can throttle background work.

---

# 43. Do Not Use Timers as Precise Clocks

A timer:

```js
setInterval(() => {
  console.log("tick");
}, 1000);
```

does not guarantee execution exactly every 1000 milliseconds.

Timers can be delayed by:

* main-thread work
* browser scheduling
* background tab throttling
* system load

For elapsed time, use an actual time source:

```js
const start = performance.now();
```

or:

```js
const start = Date.now();
```

depending on the problem.

---

# 44. Use `performance.now()` for Duration Measurement

When measuring elapsed duration:

```js
const start = performance.now();

doSomething();

const duration = performance.now() - start;

console.log(`Duration: ${duration}ms`);
```

`performance.now()` is designed for high-resolution elapsed-time measurement.

For wall-clock dates and timestamps, `Date.now()` is often more appropriate.

Use the API that matches the purpose.

---

# 45. Do Not Measure Only Development Builds

Performance can change between:

```text
Development
Production
```

Development mode may include additional:

* warnings
* diagnostics
* source maps
* framework checks
* development-only behavior

Use production builds for realistic performance evaluation.

---

# 46. Avoid Layout Thrashing

Repeatedly mixing layout reads and writes can force extra rendering work.

Potentially problematic:

```js
for (const element of elements) {
  const height = element.offsetHeight;

  element.style.height = `${height + 10}px`;
}
```

A better approach is often to separate reads and writes:

```js
const heights = elements.map((element) => {
  return element.offsetHeight;
});

elements.forEach((element, index) => {
  element.style.height = `${heights[index] + 10}px`;
});
```

The exact optimization depends on the workload, but the general principle is:

> Avoid unnecessary cycles of DOM measurement followed immediately by DOM mutation.

---

# 47. Prefer CSS for Visual Behavior When Possible

Do not use JavaScript for work that CSS can handle efficiently.

Instead of:

```js
window.addEventListener("scroll", () => {
  // manually calculate every visual change
});
```

consider CSS features such as:

* media queries
* transitions
* animations
* sticky positioning
* responsive layout
* container queries
* modern viewport units

JavaScript should be used when actual application logic is required.

---

# 48. Prefer `matchMedia()` Over Repeated Width Checks

Instead of:

```js
if (window.innerWidth < 768) {
  // mobile
}
```

for responsive behavior, use CSS media queries when possible.

When JavaScript genuinely needs to know about a media condition:

```js
const mediaQuery = window.matchMedia("(max-width: 767px)");

if (mediaQuery.matches) {
  // Match
}
```

You can subscribe to changes:

```js
function handleChange(event) {
  console.log(event.matches);
}

mediaQuery.addEventListener("change", handleChange);
```

This is cleaner than constantly checking `window.innerWidth`.

---

# 49. Do Not Use `screen.width` for Responsive Layout Decisions

`screen.width` describes the physical or logical display environment.

It does not necessarily describe the application's current viewport.

For responsive application behavior, the relevant concepts are usually:

```text
CSS viewport
window.innerWidth
matchMedia()
container queries
```

rather than:

```js
screen.width
```

Use `screen` when you actually need display information.

---

# 50. Be Careful With Device Fingerprinting Information

APIs can expose environmental information such as:

```js
navigator.hardwareConcurrency
navigator.deviceMemory
screen.width
screen.height
devicePixelRatio
navigator.language
```

Individually these may be harmless.

Combined together, they can contribute to browser fingerprinting.

Do not collect or store environment information without a genuine reason.

Use the minimum information needed for the feature.

---

# 51. Do Not Build Business Logic Around `userAgent`

Avoid:

```js
if (navigator.userAgent.includes("Mobile")) {
  // ...
}
```

when the actual requirement is something like:

```text
small viewport
touch support
camera availability
clipboard support
```

Ask the real capability question.

Examples:

```js
"ontouchstart" in window
```

or:

```js
"mediaDevices" in navigator
```

or:

```js
window.matchMedia("(pointer: coarse)").matches
```

Choose based on what the application actually needs.

---

# 52. Make Browser APIs Optional, Not Mandatory

A robust application should continue functioning when a secondary browser API is unavailable.

For example:

```text
Notifications unavailable
        ↓
Use in-app notifications

Clipboard unavailable
        ↓
Allow manual copy

Geolocation unavailable
        ↓
Ask user to enter location

Storage unavailable
        ↓
Use in-memory state
```

The goal is not to force every platform to support every enhancement.

The goal is to preserve the core experience.

---

# 53. Prefer Progressive Enhancement

A good browser application can be thought of as layers:

```text
Core functionality
        ↓
Enhanced browser capabilities
        ↓
Optional convenience features
```

Example:

```text
Core:
User can enter an address manually

Enhancement:
Browser geolocation can automatically detect the address
```

This is more resilient than designing the entire application around an optional API.

---

# 54. Keep the Main Thread Responsive

The browser's main thread handles important work such as:

* JavaScript
* DOM operations
* layout
* style calculation
* event handling
* rendering coordination

Heavy synchronous JavaScript can make the interface feel frozen.

Avoid:

```js
for (let i = 0; i < 1_000_000_000; i++) {
  // expensive synchronous work
}
```

For CPU-heavy workloads, consider:

* Web Workers
* chunking
* yielding work
* server-side processing
* more efficient algorithms

---

# 55. Use Web Workers for Suitable CPU-Heavy Work

When appropriate:

```js
const worker = new Worker("/worker.js");
```

Workers can execute JavaScript away from the page's main execution context.

They are useful for workloads such as:

* expensive calculations
* data transformation
* parsing large datasets
* CPU-heavy algorithms

Workers do not automatically make bad algorithms fast, but they can prevent the main UI from being blocked.

---

# 56. Avoid Memory Leaks From Global References

Long-lived references can keep objects alive unnecessarily.

For example:

```js
const cache = new Map();

function store(element, data) {
  cache.set(element, data);
}
```

If DOM elements are removed but remain strongly referenced by the map, they may remain reachable.

Depending on the use case, `WeakMap` can be appropriate:

```js
const metadata = new WeakMap();

metadata.set(element, {
  value: "example",
});
```

The object can be garbage-collected when no strong references remain.

Use weak collections only when their semantics actually fit the problem.

---

# 57. Clean Up Animation Frames

If you schedule animation work:

```js
const frameId = requestAnimationFrame(update);
```

you can cancel it:

```js
cancelAnimationFrame(frameId);
```

This matters when a component or feature is no longer active.

In React:

```js
useEffect(() => {
  let frameId;

  function update() {
    // ...
    frameId = requestAnimationFrame(update);
  }

  frameId = requestAnimationFrame(update);

  return () => {
    cancelAnimationFrame(frameId);
  };
}, []);
```

---

# 58. Clean Up Intervals and Timeouts

For intervals:

```js
const intervalId = setInterval(update, 1000);

clearInterval(intervalId);
```

For timeouts:

```js
const timeoutId = setTimeout(update, 1000);

clearTimeout(timeoutId);
```

Do not allow timers created by a temporary feature to survive after that feature is gone.

---

# 59. Use Service Workers Carefully

Service workers can provide:

* caching
* offline experiences
* background operations
* push notifications

But they also introduce lifecycle complexity.

You should understand:

```text
install
activate
fetch
message
```

and cache invalidation before adding a service worker to a production application.

A service worker can remain active independently of a page instance, so bugs can survive beyond a normal page reload.

---

# 60. Be Careful With Cache Invalidation

Caching improves performance but creates consistency problems.

A cache may contain:

```text
old JavaScript
old API data
old HTML
old assets
```

A common engineering rule is:

> Caching is easy; invalidation is hard.

Choose explicit cache strategies rather than caching everything automatically.

---

# 61. Avoid Caching Sensitive Data Without a Reason

Browser caches and client storage can expose data beyond the lifetime of a single page.

Sensitive application data deserves careful consideration before being persisted.

Ask:

```text
Does this data really need to survive reloads?
Does it need to survive browser restarts?
Can another script access it?
Can it appear in caches or logs?
```

Data lifetime should be intentional.

---

# 62. Handle Clipboard Operations Gracefully

A copy button should not assume success.

```js
try {
  await navigator.clipboard.writeText("Osama Abu Motlaq");
  showMessage("Copied");
} catch {
  showMessage("Copy failed");
}
```

A user may:

* deny permission
* use an unsupported browser
* not be in a secure context
* trigger the action outside an allowed user interaction

Always provide meaningful feedback.

---

# 63. Do Not Read Clipboard Data Without a Strong Reason

Writing clipboard data is usually less sensitive than reading it.

Reading the clipboard can expose information the user copied for another purpose.

Only request clipboard access when the feature clearly requires it.

This is both a security and a user-trust principle.

---

# 64. Notifications Should Be User-Controlled

Do not spam:

```js
new Notification("New message");
```

every time something happens.

Notifications interrupt attention.

Use them for meaningful events.

Good notification design considers:

* relevance
* frequency
* user expectations
* permission state
* quiet times
* grouping
* actionable content

---

# 65. Prefer In-App Feedback for Immediate UI State

Not every success needs a system notification.

For example:

```text
Copied!
Saved!
Updated!
```

may be better represented by:

* a toast
* inline status
* button state
* confirmation message

System notifications are usually more appropriate when the user is not currently focused on the application.

---

# 66. Avoid Blocking Dialogs for Normal Application Flow

These APIs:

```js
alert()
confirm()
prompt()
```

block interaction with the page while the dialog is active.

They can be useful for simple experiments or debugging, but application interfaces should generally prefer custom UI for richer interactions.

For example:

```text
Custom modal
Toast
Inline confirmation
Accessible dialog
```

These provide greater control over:

* accessibility
* styling
* layout
* focus management
* asynchronous workflows

---

# 67. Do Not Abuse `beforeunload`

Avoid using:

```js
window.addEventListener("beforeunload", ...)
```

for ordinary application events.

It is most appropriate for preventing accidental data loss when there is actually unsaved user work.

For example:

```text
Unsaved form changes
Unsaved document
Unsaved editor content
```

Do not use it to guarantee that an API request will complete before the page closes.

Use an explicit save mechanism instead.

---

# 68. Do Not Depend on `unload` for Critical Data

Page lifecycle behavior can vary across browsers and scenarios.

Important data should be saved before the user leaves through normal application logic whenever possible.

For analytics or small background-safe transmissions, browser-specific APIs such as `navigator.sendBeacon()` may be useful.

Example:

```js
navigator.sendBeacon(
  "/analytics",
  JSON.stringify({
    event: "page_exit",
  })
);
```

The server should still treat analytics as best-effort.

---

# 69. Use the Network Layer as the Source of Truth for Remote Data

Browser state can tell you:

```js
navigator.onLine
```

but the server decides whether a request actually succeeded.

Similarly:

```text
localStorage
URL
React state
window state
```

should not replace the server as the source of truth for server-owned data.

For full-stack applications:

```text
UI state       → browser/application concern
server state   → backend/database concern
authorization  → server concern
```

---

# 70. Separate UI State From Server State

For example:

```js
const [isModalOpen, setIsModalOpen] = useState(false);
```

is client UI state.

But:

```text
User profile
Orders
Products
Permissions
Contact messages
```

usually belong to server-managed state.

Do not force browser storage to become a fake database.

For example:

```js
localStorage.setItem("users", JSON.stringify(users));
```

is not a replacement for PostgreSQL.

---

# 71. Use Supabase/PostgreSQL for Persistent Server Data

For an application using Next.js and Supabase:

```text
Browser
   ↓
Next.js application/server
   ↓
Supabase
   ↓
PostgreSQL
```

Use browser APIs for capabilities such as:

```text
Storage
Clipboard
Location
Notifications
Online/offline state
URL state
Screen information
```

Use the backend/database for:

```text
Users
Orders
Messages
Permissions
Persistent records
Business rules
Sensitive operations
```

This separation improves architecture and security.

---

# 72. Never Assume Client Validation Is Enough

For example:

```js
if (message.length > 0) {
  submitMessage(message);
}
```

Client validation improves user experience.

It does not guarantee valid server input.

The server should validate again.

Think of validation as:

```text
Client validation
      ↓
Better UX

Server validation
      ↓
Security + data integrity
```

Both can exist simultaneously.

---

# 73. Sanitize or Safely Render External Data

Avoid injecting untrusted HTML.

This is risky:

```js
element.innerHTML = userInput;
```

Prefer text content when HTML is not required:

```js
element.textContent = userInput;
```

In React, prefer normal rendering:

```jsx
<p>{userInput}</p>
```

rather than bypassing the framework's normal escaping behavior.

---

# 74. Avoid `eval()` and Similar Dynamic Code Execution

Avoid:

```js
eval(userInput);
```

and similar dynamic-code execution mechanisms.

They create major security and maintainability problems.

Treat data as data.

Do not turn arbitrary strings into executable code unless there is an extremely specific, controlled reason.

---

# 75. Keep Browser APIs Behind Small Abstractions

Instead of using `localStorage` throughout an application:

```js
localStorage.getItem("theme");
localStorage.setItem("theme", "dark");
localStorage.removeItem("theme");
```

create a small service:

```js
export const themeStorage = {
  get() {
    return localStorage.getItem("theme");
  },

  set(theme) {
    localStorage.setItem("theme", theme);
  },

  remove() {
    localStorage.removeItem("theme");
  },
};
```

Benefits include:

* easier testing
* centralized validation
* easier migration
* fewer duplicated checks
* clearer intent

---

# 76. Use Explicit Return Values From Browser Adapters

A browser helper should make failure states predictable.

Instead of:

```js
function getTheme() {
  return localStorage.getItem("theme");
}
```

a more deliberate function might be:

```js
function getTheme() {
  try {
    return localStorage.getItem("theme") ?? "light";
  } catch {
    return "light";
  }
}
```

The rest of the application can rely on a known fallback.

---

# 77. Do Not Hide Errors Completely

This pattern can make debugging difficult:

```js
try {
  await doSomething();
} catch {
  return null;
}
```

Sometimes a fallback is correct, but errors that matter should remain observable.

Consider:

```js
try {
  await doSomething();
} catch (error) {
  console.error("Browser operation failed:", error);
  return null;
}
```

In production applications, structured error reporting may be preferable to console logging.

---

# 78. Handle Permission, Support, and Runtime Failure Separately

These are different conditions.

For example:

```text
Unsupported
    ↓
Browser does not provide the API

Denied
    ↓
API exists, but user refused permission

Failed
    ↓
API exists and permission may exist, but operation failed
```

Applications should not treat all three states as the same.

---

# 79. Design Explicit Loading, Success, Empty, and Error States

For browser-powered operations, consider:

```text
Idle
Loading
Success
Empty
Permission denied
Unsupported
Network error
Unexpected error
```

For example, a geolocation UI might show:

```text
"Find my location"
        ↓
"Requesting location..."
        ↓
"Location found"
```

or:

```text
"Location permission denied"
```

or:

```text
"Location is not supported"
```

Clear state handling creates much better user experiences.

---

# 80. Respect Accessibility

Browser APIs can affect accessibility.

Examples include:

* keyboard interaction
* focus management
* reduced motion
* notifications
* dialogs
* dynamic content
* screen reader announcements
* color contrast

For animations, consider:

```js
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
```

Then adapt visual behavior accordingly.

Accessibility is part of robust browser engineering, not an optional finishing step.

---

# 81. Do Not Depend Only on Color or Motion

A browser API feature should not communicate status through color alone.

Bad:

```text
Green = online
Red = offline
```

Also provide text or semantic information:

```text
Online
Offline
```

Likewise, animations should not be the only way a state change is communicated.

---

# 82. Prefer Semantic HTML Before JavaScript Enhancement

Do not use JavaScript to recreate behavior that native HTML already provides well.

Prefer:

```html
<button>Save</button>
```

rather than:

```html
<div onclick="save()">Save</div>
```

Native controls provide built-in:

* keyboard support
* semantics
* focus behavior
* accessibility integration

JavaScript should enhance the platform rather than unnecessarily replace it.

---

# 83. Avoid Global State on `window` Unless Truly Necessary

This:

```js
window.appState = {
  user: "Osama Abu Motlaq",
};
```

works technically, but creates hidden global dependencies.

Prefer module scope:

```js
const appState = {
  user: "Osama Abu Motlaq",
};
```

or a proper application state system.

Global variables make systems harder to reason about because unrelated code can mutate them.

---

# 84. Use `globalThis` When You Truly Need the Global Object

`globalThis` is the standardized way to access the global object across JavaScript environments.

```js
globalThis.someValue = 123;
```

However, the better practice is usually:

> Avoid global mutable state unless there is a strong architectural reason.

`globalThis` is a capability, not a reason to create globals.

---

# 85. Avoid Excessive Direct DOM Manipulation in React

In React, prefer state and declarative rendering:

```jsx
function Button() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? "Close" : "Open"}
    </button>
  );
}
```

instead of manually changing DOM nodes:

```js
document.querySelector("#button").textContent = "Close";
```

Direct DOM APIs are still useful for specific tasks:

* focus
* measurements
* integrations with non-React libraries
* browser APIs
* imperative escape hatches

But they should not replace React's rendering model.

---

# 86. Use Refs for Imperative Browser Operations in React

For example:

```jsx
const inputRef = useRef(null);

function focusInput() {
  inputRef.current?.focus();
}
```

This is generally better than:

```js
document.querySelector("input").focus();
```

because the ref belongs to the component's ownership model.

---

# 87. Remember That Browser APIs Are Side Effects in React

Operations such as:

```js
localStorage
window
document
navigator
history
```

are usually side effects.

Avoid performing them blindly during render.

Prefer:

```jsx
useEffect(() => {
  const theme = localStorage.getItem("theme");
  // ...
}, []);
```

or event handlers when appropriate.

The rendering function should remain as predictable as possible.

---

# 88. Understand React Strict Mode During Development

In development, React may intentionally run certain lifecycle-related logic more than once to expose unsafe side effects.

If code unexpectedly executes twice in development, do not immediately remove Strict Mode.

First check whether the effect has proper cleanup and whether the side effect is designed correctly.

Example:

```jsx
useEffect(() => {
  const handleResize = () => {
    // ...
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
```

Correct cleanup makes the code robust.

---

# 89. Consider Hydration When Using Next.js

In Next.js, browser APIs are unavailable during server rendering.

This is problematic:

```jsx
const theme = localStorage.getItem("theme");
```

at module or render time in code that can execute on the server.

Client components can access browser APIs, but the exact timing still matters.

A common approach is:

```jsx
"use client";

import { useEffect, useState } from "react";

export default function Theme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  return <div>{theme}</div>;
}
```

The important idea is:

```text
Server rendering
      ↓
No browser APIs

Client execution
      ↓
Browser APIs available
```

---

# 90. Keep Client Components as Small as Practical in Next.js

A component that needs browser APIs may need to run on the client.

For example:

```js
"use client";
```

can be necessary when using:

```text
window
document
navigator
localStorage
useState
useEffect
event handlers
```

Do not make an entire application client-side simply because one small component needs a browser API.

A better architecture is often:

```text
Server Component
    ↓
Small Client Component
    ↓
Browser API
```

This preserves server-side capabilities where possible.

---

# 91. Do Not Put Server Secrets in Client Components

A Client Component executes in the browser.

Therefore, secret credentials must not be placed there.

Bad architecture:

```text
Client Component
   ↓
Secret database credential
```

Prefer:

```text
Client Component
   ↓
Server action / route / backend
   ↓
Database
```

The browser is not a secure place for server secrets.

---

# 92. Use Browser APIs at the Appropriate Layer

A useful architecture can look like:

```text
UI Layer
│
├── Button
├── Form
└── Component
        │
        ↓
Browser Adapter
│
├── Clipboard
├── Storage
├── Geolocation
└── Notifications
        │
        ↓
Application Logic
        │
        ↓
Server / API
```

This prevents browser-specific implementation details from leaking into every part of the application.

---

# 93. Test the Failure Path, Not Just the Happy Path

For every browser feature, ask:

```text
What if the API does not exist?

What if permission is denied?

What if the user cancels?

What if the network fails?

What if storage is unavailable?

What if the tab becomes hidden?

What if the request is aborted?

What if the browser changes the permission?

What if the user refreshes?
```

Reliable software is built around these cases.

---

# 94. Test With Real Browser Conditions

Do not test only in a perfect development environment.

Useful scenarios include:

```text
Online
Offline

Permission granted
Permission denied

Desktop
Mobile

Light theme
Dark theme

Visible tab
Background tab

Fast connection
Slow connection

Fresh storage
Corrupted storage

Supported browser
Unsupported browser
```

Browser APIs often behave differently under these conditions.

---

# 95. Use DevTools to Understand Browser Behavior

Modern browser DevTools provide useful tools for debugging BOM-related functionality.

Useful areas include:

```text
Console
Network
Application / Storage
Performance
Security
Sources
Accessibility
```

For example:

### Storage

Inspect:

* local storage
* session storage
* cookies
* cache storage
* service workers

### Network

Inspect:

* failed requests
* request timing
* status codes
* redirects
* headers
* offline simulation

### Performance

Inspect:

* long tasks
* rendering
* scripting
* layout
* paint

---

# 96. Do Not Optimize Without Measuring

Avoid assumptions such as:

```text
"This API is slow."
"This listener is definitely the bottleneck."
"Using fewer lines is faster."
```

Measure actual behavior.

Use:

```js
performance.now();
```

or browser performance tools.

Optimization should be based on observed cost.

---

# 97. Optimize for User-Perceived Performance

A technically fast operation can still feel slow.

Users notice:

* delayed interaction
* blocked clicks
* layout jumping
* long loading states
* unresponsive scrolling
* slow navigation
* excessive notifications

Performance should therefore include:

```text
Responsiveness
Visual stability
Loading experience
Interaction latency
Network efficiency
```

not merely raw JavaScript execution time.

---

# 98. Avoid Unnecessary API Calls

Do not repeatedly call expensive browser or network operations if the result can be reused.

Example:

```js
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
```

Instead of repeatedly recreating the same object throughout unrelated code, centralize the subscription where appropriate.

The same principle applies to:

* observers
* event listeners
* network requests
* geolocation watches
* timers

---

# 99. Cancel Work During Component Unmount

A component should not continue work it no longer needs.

Example:

```jsx
useEffect(() => {
  const controller = new AbortController();

  fetch("/api/data", {
    signal: controller.signal,
  })
    .then((response) => response.json())
    .then((data) => {
      // Update state
    })
    .catch((error) => {
      if (error.name !== "AbortError") {
        console.error(error);
      }
    });

  return () => {
    controller.abort();
  };
}, []);
```

This pattern is especially useful for components that initiate asynchronous requests.

---

# 100. Avoid Race Conditions in Browser Async Code

Suppose:

```text
Request A starts
Request B starts
Request B finishes
Request A finishes
```

If request A updates the UI last, stale data may overwrite newer data.

Possible solutions include:

* abort the old request
* track request IDs
* use a data-fetching library
* compare the active query before applying the result

Example:

```js
let requestId = 0;

async function search(query) {
  const id = ++requestId;

  const response = await fetch(
    `/api/search?q=${encodeURIComponent(query)}`
  );

  const data = await response.json();

  if (id !== requestId) {
    return;
  }

  renderResults(data);
}
```

The core principle is:

> Only apply results that are still relevant.

---

# 101. Encode User Data Before Putting It in URLs

Use URL APIs rather than manual concatenation.

Instead of:

```js
const url = `/search?q=${query}`;
```

prefer:

```js
const params = new URLSearchParams({
  q: query,
});

const url = `/search?${params}`;
```

This handles encoding correctly.

---

# 102. Treat Browser Events as Untrusted Input

Event data can represent user-controlled information.

Examples:

```js
event.key
event.data
event.clientX
event.clientY
event.dataTransfer
event.clipboardData
event.message
```

Validate values before using them in sensitive operations.

Events are inputs, not guaranteed-trustworthy data.

---

# 103. Prefer Event Delegation for Dynamic Collections

Instead of attaching listeners to thousands of elements:

```js
buttons.forEach((button) => {
  button.addEventListener("click", handleClick);
});
```

you may attach one listener to a stable parent:

```js
container.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");

  if (!button) {
    return;
  }

  handleClick(button.dataset.action);
});
```

This can simplify listener management and work well with dynamically created children.

Do not force delegation where individual listeners are clearer.

---

# 104. Validate `event.target` Before Using It

Do not assume:

```js
event.target
```

is the exact element you expect.

For delegated events, use:

```js
const target = event.target.closest("[data-action]");
```

and check whether it exists.

Always account for unexpected targets.

---

# 105. Understand `target` vs `currentTarget`

Remember:

```js
event.target
```

is where the event originated.

Whereas:

```js
event.currentTarget
```

is the element whose listener is currently executing.

Example:

```js
container.addEventListener("click", (event) => {
  console.log(event.target);
  console.log(event.currentTarget);
});
```

This distinction is fundamental for event delegation.

---

# 106. Use `preventDefault()` Only When Necessary

For example:

```js
form.addEventListener("submit", (event) => {
  event.preventDefault();
});
```

This is appropriate when JavaScript intentionally takes over submission.

But avoid blocking native behavior without a reason.

Native browser behavior is often valuable for:

* accessibility
* keyboard interaction
* browser navigation
* form semantics
* expected user behavior

---

# 107. Use `stopPropagation()` Sparingly

This:

```js
event.stopPropagation();
```

prevents propagation.

It can solve a particular interaction problem, but excessive use can make event systems difficult to reason about.

Before using it, ask:

```text
Can event delegation solve this?
Can the handler logic be changed?
Does the parent listener actually need to be prevented?
```

Use propagation control deliberately.

---

# 108. Understand Default Browser Behavior Before Replacing It

Before writing JavaScript for a behavior, ask:

```text
Does HTML already provide this?
Does CSS already provide this?
Does the browser already provide this?
```

Native capabilities are often more reliable than custom implementations.

This is one of the most important web-development principles:

> Use the platform before rebuilding the platform.

---

# 109. Keep BOM Code Modular

Instead of one huge file:

```js
browser.js
```

organize utilities by responsibility:

```text
browser/
├── storage.js
├── clipboard.js
├── location.js
├── network.js
├── notifications.js
├── geolocation.js
└── performance.js
```

This makes dependencies easier to understand and test.

---

# 110. Avoid Over-Abstraction

Abstraction is useful, but this can become excessive:

```text
BrowserManager
BrowserService
BrowserController
BrowserAdapter
BrowserProvider
BrowserUtility
BrowserEngine
```

for simple operations.

For example:

```js
localStorage.setItem("theme", "dark");
```

may not need a huge abstraction layer.

Use abstractions when they provide real benefits:

* reuse
* testing
* validation
* separation
* fallback behavior
* platform isolation

---

# 111. Name Functions by Intent

Prefer:

```js
getStoredTheme()
requestCurrentLocation()
copyTextToClipboard()
subscribeToOnlineStatus()
```

instead of:

```js
doBrowserThing()
handleStuff()
processData()
```

Good names communicate the browser capability and business intent.

---

# 112. Keep Side Effects Explicit

A function such as:

```js
calculateTheme()
```

should preferably not silently write to storage.

Instead:

```js
const theme = calculateTheme();

saveTheme(theme);
```

Separating calculation from side effects improves:

* testing
* readability
* predictability

---

# 113. Make Browser Helpers Small and Composable

Prefer:

```js
getStoredTheme()
setStoredTheme()
subscribeToThemePreference()
```

over one giant function:

```js
manageEverythingAboutThemes()
```

Small functions are easier to reuse and reason about.

---

# 114. Document Security Assumptions

If a function assumes same-origin access:

```js
function handleMessage(event) {
  if (event.origin !== TRUSTED_ORIGIN) {
    return;
  }

  // ...
}
```

document why the check exists.

If a browser adapter assumes HTTPS:

```js
if (!window.isSecureContext) {
  throw new Error("Secure context required");
}
```

the reason should be clear.

Security code benefits from explicit intent.

---

# 115. Use Constants for Security-Sensitive Origins

Avoid repeating:

```js
"https://trusted.example.com"
```

throughout an application.

Prefer:

```js
const TRUSTED_ORIGIN = "https://trusted.example.com";
```

Then:

```js
if (event.origin !== TRUSTED_ORIGIN) {
  return;
}
```

This reduces typos and makes security assumptions easier to review.

---

# 116. Never Trust `document.referrer`

Referrer information can be:

* missing
* reduced by policy
* modified by browser privacy behavior
* affected by navigation context

Treat it as contextual information, not as a trusted security credential.

---

# 117. Use Explicit Security Headers

Many browser security behaviors are strengthened through response headers rather than JavaScript.

Important mechanisms include:

```text
Content-Security-Policy
Strict-Transport-Security
Referrer-Policy
Permissions-Policy
X-Content-Type-Options
Cross-Origin-Opener-Policy
Cross-Origin-Resource-Policy
```

Do not try to implement all security controls from client-side JavaScript.

Browser security should be configured at the appropriate server/platform layer.

---

# 118. Understand Same-Origin Policy

An origin consists of:

```text
scheme
host
port
```

For example:

```text
https://example.com:443
```

is an origin.

Different origins are not automatically allowed to interact freely.

This affects:

* `fetch`
* iframes
* storage
* windows
* `postMessage`
* DOM access
* cookies

Many browser security APIs make more sense once same-origin policy is understood.

---

# 119. Understand CORS as a Server-Controlled Policy

CORS is not a client-side permission switch that JavaScript can simply enable.

The server must respond with appropriate headers.

For example:

```http
Access-Control-Allow-Origin: https://example.com
```

Client code cannot fix a server that refuses a cross-origin request.

---

# 120. Do Not Put CORS Workarounds in the Browser

This is a common misunderstanding:

```text
"My fetch request is blocked by CORS, so I will change JavaScript."
```

Often the correct architecture is:

```text
Browser
   ↓
Your server
   ↓
External API
```

The backend can act as a controlled intermediary where appropriate.

---

# 121. Understand Cookies and Cross-Origin Requests

Credentials may affect cross-origin requests:

```js
fetch(url, {
  credentials: "include",
});
```

When using credentials, server configuration becomes especially important.

Consider:

* allowed origins
* cookie attributes
* CSRF protections
* HTTPS
* same-site behavior

Do not enable credentialed cross-origin requests casually.

---

# 122. Be Careful With Third-Party Scripts

Third-party JavaScript can access a significant amount of application context depending on how and where it is included.

Before adding a third-party script, consider:

```text
Why is it necessary?
What data can it access?
Does it introduce tracking?
Can it be trusted?
What happens if it is compromised?
```

Third-party code increases your application's attack and privacy surface.

---

# 123. Minimize Third-Party Dependencies

Every dependency can introduce:

* bundle size
* maintenance cost
* security risk
* upgrade complexity
* runtime overhead

Do not install a library for a browser feature that is already supported by the platform when a simple native API is sufficient.

For example, you do not need a package just to read query parameters when JavaScript provides:

```js
URLSearchParams
```

---

# 124. Do Not Build Your Own Browser Security Model

Use established browser mechanisms:

```text
Same-Origin Policy
CORS
CSP
HTTPS
Secure cookies
HttpOnly
SameSite
Permissions Policy
Sandboxing
```

Do not invent ad-hoc mechanisms such as:

```js
if (localStorage.getItem("trusted") === "yes") {
  allowSensitiveOperation();
}
```

Client-side flags do not create real security boundaries.

---

# 125. Avoid Exposing Internal Application State Through the URL

URLs are visible to users and can be copied or shared.

Avoid exposing sensitive internal details such as:

```text
?admin=true
?permission=superuser
?internalSecret=value
```

UI state can be represented in URLs, but sensitive authorization decisions must remain server-controlled.

---

# 126. Use Browser Storage for Convenience, Not Authority

A useful mental model is:

```text
localStorage
sessionStorage
URL state
React state
DOM state

        ↓

User-facing application state
```

not:

```text
Security authority
Database authority
Permission authority
```

The browser is the client.

---

# 127. Design for Offline and Online Transitions

Applications should not assume that connectivity remains constant.

A realistic flow is:

```text
Online
 ↓
Offline
 ↓
User edits data
 ↓
Online
 ↓
Sync
```

For offline-capable applications, consider:

* local queue
* retry strategy
* conflict handling
* synchronization status
* idempotent server operations

A simple `navigator.onLine` check is not enough for a complete offline architecture.

---

# 128. Make Retries Safe

Not every request should be retried automatically.

For example, repeatedly retrying a non-idempotent operation can cause duplicate effects.

Consider the difference between:

```text
GET
```

and an operation such as:

```text
POST /create-order
```

Retry strategies need to account for application semantics.

Idempotency keys can be useful for critical operations.

---

# 129. Add Exponential Backoff to Repeated Network Attempts

Instead of:

```text
retry immediately
retry immediately
retry immediately
retry immediately
```

use increasing delays.

Conceptually:

```text
1s
2s
4s
8s
16s
```

with a maximum limit and usually some randomization.

This prevents many clients from repeatedly hitting an unavailable service at exactly the same time.

---

# 130. Avoid Infinite Retry Loops

Never create:

```js
while (true) {
  await fetchData();
}
```

with no cancellation or stopping condition.

A robust retry strategy should define:

```text
Maximum attempts
Maximum delay
Cancellation
Failure state
```

---

# 131. Use Idempotent Operations Where Possible

An operation is easier to retry safely when repeating it produces the same effective result.

For example:

```text
PUT /profile
```

can often be easier to retry safely than a blindly repeated creation request.

This is an API design principle as well as a browser networking principle.

---

# 132. Handle Timeouts Explicitly

A request can remain pending longer than the UI should wait.

With `AbortController`:

```js
const controller = new AbortController();

const timeoutId = setTimeout(() => {
  controller.abort();
}, 5000);

try {
  const response = await fetch(url, {
    signal: controller.signal,
  });

  return await response.json();
} finally {
  clearTimeout(timeoutId);
}
```

Timeouts are part of resilient network design.

---

# 133. Never Assume a Successful HTTP Fetch Means Successful Application Data

`fetch()` resolves for many HTTP error statuses.

For example:

```js
const response = await fetch(url);
```

does not automatically reject for:

```text
404
500
```

Check:

```js
if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}
```

---

# 134. Distinguish Browser Errors From HTTP Errors

These are different:

```text
Network failure
↓
fetch may reject

HTTP failure
↓
fetch may resolve with response.ok === false
```

Your application should handle both cases.

---

# 135. Keep Error Messages Useful but Safe

Avoid exposing internal secrets or infrastructure details directly to users.

Bad:

```text
Database password XYZ failed.
```

Better:

```text
Unable to save your changes. Please try again.
```

Detailed diagnostics can go to secure logging systems.

---

# 136. Avoid Logging Sensitive Data

Do not casually log:

```js
console.log(localStorage);
console.log(document.cookie);
console.log(authToken);
console.log(userLocation);
```

Logs can become accessible through:

* browser DevTools
* monitoring tools
* screenshots
* debugging systems

Only log information necessary for debugging.

---

# 137. Clean Up Debug Code Before Production

Avoid leaving code such as:

```js
console.log("SECRET:", secret);
```

or temporary:

```js
window.debugState = internalState;
```

in production.

Development helpers can unintentionally expose data.

---

# 138. Use Environment-Specific Behavior Carefully

It can be useful to have:

```text
Development
Production
Testing
```

differences.

But do not allow development-only security assumptions to leak into production.

For example:

```js
const isDevelopment =
  process.env.NODE_ENV === "development";
```

should not be used to disable essential security controls in production logic accidentally.

---

# 139. Treat Browser APIs as Optional Dependencies of the UI

A useful architecture is:

```text
Core application logic
       ↑
Browser adapter
       ↑
Browser APIs
```

This means the core logic can often be tested without requiring:

```text
window
document
navigator
localStorage
```

That separation improves portability and testing.

---

# 140. Make Functions Testable Without the Browser When Possible

Instead of:

```js
function calculatePageCount() {
  return window.innerWidth > 768 ? 3 : 1;
}
```

separate the browser read:

```js
function getViewportWidth() {
  return window.innerWidth;
}

function calculatePageCount(width) {
  return width > 768 ? 3 : 1;
}
```

Now:

```js
calculatePageCount(1200);
calculatePageCount(500);
```

can be tested without a real browser.

This is a powerful design pattern:

> Keep environment access separate from pure logic.

---

# 141. Prefer Pure Functions for Calculations

For example:

```js
function isLargeViewport(width) {
  return width >= 1024;
}
```

instead of:

```js
function isLargeViewport() {
  return window.innerWidth >= 1024;
}
```

The second version is convenient, but the first is more reusable and testable.

Browser access can happen at the boundary.

---

# 142. Use Dependency Injection for Browser Capabilities When Needed

For larger applications, instead of hard-coding:

```js
localStorage
```

a function can accept a storage implementation:

```js
function saveTheme(storage, theme) {
  storage.setItem("theme", theme);
}
```

Then testing becomes easier:

```js
const fakeStorage = {
  setItem(key, value) {
    console.log(key, value);
  },
};

saveTheme(fakeStorage, "dark");
```

This technique becomes useful when browser dependencies become complex.

---

# 143. Keep Browser Code Predictable

A browser utility should ideally have clear behavior:

```text
Input
 ↓
Validation
 ↓
Browser capability
 ↓
Result
```

Avoid hidden side effects that make the function impossible to reason about.

---

# 144. Use the Smallest API That Solves the Problem

Examples:

For query parameters:

```js
URLSearchParams
```

For elapsed time:

```js
performance.now()
```

For responsive JavaScript:

```js
matchMedia()
```

For cancellation:

```js
AbortController
```

For animation timing:

```js
requestAnimationFrame()
```

For user preferences:

```js
matchMedia()
```

Do not reach for a large framework abstraction when a small native browser API is enough.

---

# 145. Understand the Difference Between Similar Browser Concepts

Some APIs look similar but solve different problems.

### `localStorage`

Persistent client-side key/value storage.

### `sessionStorage`

Storage scoped to the relevant browser session context.

### Cookies

Small browser-managed data often used with HTTP requests and authentication.

### IndexedDB

Structured client-side storage suitable for larger datasets.

### Cache Storage

Primarily associated with request/response caching and service workers.

Choosing correctly prevents architecture problems later.

---

# 146. Understand the Difference Between `Date.now()` and `performance.now()`

### `Date.now()`

Represents wall-clock time based on the system clock.

Useful for:

```text
timestamps
dates
expiration times
server/client time comparisons
```

### `performance.now()`

Useful for measuring elapsed duration.

Example:

```js
const start = performance.now();

// Operation

const elapsed = performance.now() - start;
```

Do not use one simply because it is convenient.

---

# 147. Understand the Difference Between `window.location` and SPA Routers

Direct browser navigation:

```js
window.location.href = "/projects";
```

can trigger a full document navigation.

Framework routing systems can often perform client-side navigation.

For example, in Next.js, framework navigation mechanisms may preserve more application context and avoid unnecessary full reloads.

Use the framework's router when the application architecture calls for framework-controlled navigation.

Use `window.location` when you intentionally need browser-level navigation behavior.

---

# 148. Do Not Mix Multiple Routing Strategies Without a Reason

Avoid using:

```text
window.location
history.pushState
React Router
Next.js router
```

randomly in the same part of an application.

Choose a routing architecture and use browser APIs only where they complement that architecture.

For example, in Next.js:

```text
Next.js routing
      +
browser URL/history APIs when necessary
```

rather than manually recreating the entire routing system.

---

# 149. Use Browser APIs to Understand Frameworks

Frameworks such as React and Next.js do not replace browser fundamentals.

They build abstractions on top of concepts including:

```text
DOM
events
URL
history
storage
fetch
browser lifecycle
```

Understanding the BOM makes framework behavior easier to understand.

For example:

```text
Next.js navigation
      ↓
URL + history + rendering

React event handling
      ↓
browser event concepts

Client-side state persistence
      ↓
browser storage
```

---

# 150. Know When a Browser API Is Outside the BOM Learning Category

"BOM" is a useful educational category, but modern browser APIs do not always fit neatly into a strict standards boundary.

For example:

```text
Geolocation
Clipboard
Notifications
Performance
Fetch
Service Workers
Permissions
Web Workers
```

are separate web platform APIs/specifications rather than simply properties of one formal "BOM" specification.

For learning purposes, they are commonly grouped with browser APIs because they operate at the browser/platform level.

The important goal is understanding the platform, not memorizing artificial category boundaries.

---

# 151. Best-Practice Decision Checklist

Before using a browser API, ask:

```text
1. Do I actually need this API?
2. Does native HTML/CSS already solve the problem?
3. Is the API supported?
4. Does it require HTTPS?
5. Does it require permission?
6. Can the user deny it?
7. What happens if it fails?
8. What is the fallback?
9. Does this operation create a listener?
10. Does it create a timer?
11. Does it create a subscription?
12. When should it be cleaned up?
13. Could it block the main thread?
14. Is the data sensitive?
15. Can the user modify the data?
16. Could the information leak through the URL?
17. Does it work with server-side rendering?
18. Does it cause hydration problems?
19. Does it need to be a Client Component?
20. Can the logic be isolated from browser-specific code?
```

This checklist catches a large number of browser-side engineering problems.

---

# 152. Recommended BOM Architecture

For a small React or Next.js project, a practical structure could look like:

```text
src/
├── components/
├── hooks/
├── lib/
│   └── browser/
│       ├── clipboard.js
│       ├── geolocation.js
│       ├── notifications.js
│       ├── storage.js
│       └── network.js
├── services/
└── app/
```

Example:

```js
// lib/browser/storage.js

export function getStoredTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  try {
    return localStorage.getItem("theme") ?? "light";
  } catch {
    return "light";
  }
}
```

Then:

```js
import { getStoredTheme } from "@/lib/browser/storage";
```

This makes browser dependencies explicit.

---

# 153. Recommended React Architecture

A practical pattern is:

```text
React Component
       ↓
Custom Hook
       ↓
Browser Adapter
       ↓
Browser API
```

Example:

```text
ThemeButton
    ↓
useTheme()
    ↓
themeStorage
    ↓
localStorage
```

This keeps the component focused on UI rather than low-level browser details.

---

# 154. Recommended Next.js Architecture

A practical full-stack pattern is:

```text
Server Component
        ↓
Client Component
        ↓
Custom Hook
        ↓
Browser Adapter
        ↓
Browser API
```

For server-owned data:

```text
Client Component
        ↓
Route Handler / Server Action
        ↓
Supabase
        ↓
PostgreSQL
```

This creates a useful separation between:

```text
Browser capability
Application logic
Server logic
Database state
```

---

# 155. Common BOM Mistakes

### Mistake 1: Assuming Browser APIs Always Exist

```js
window.someFeature();
```

Better:

```js
if ("someFeature" in window) {
  window.someFeature();
}
```

---

### Mistake 2: Forgetting Cleanup

```js
useEffect(() => {
  window.addEventListener("resize", handleResize);
}, []);
```

Better:

```js
useEffect(() => {
  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
```

---

### Mistake 3: Trusting `localStorage`

```js
const isAdmin = localStorage.getItem("isAdmin");
```

Never use this as actual authorization.

---

### Mistake 4: Treating `navigator.onLine` as Internet Access

```js
if (navigator.onLine) {
  // The internet definitely works
}
```

False assumption.

---

### Mistake 5: Ignoring Permission Failure

```js
Notification.requestPermission();
```

without handling:

```text
granted
denied
default
```

is incomplete.

---

### Mistake 6: Performing Expensive Work During Scroll

```js
window.addEventListener("scroll", expensiveFunction);
```

Use appropriate throttling, `requestAnimationFrame`, CSS, or another strategy.

---

### Mistake 7: Reading Browser APIs During Server Rendering

```js
const theme = localStorage.getItem("theme");
```

can fail in server-side execution.

---

### Mistake 8: Storing Secrets in Client Storage

```js
localStorage.setItem("apiSecret", secret);
```

Do not do this.

---

### Mistake 9: Trusting `postMessage()`

```js
window.addEventListener("message", handleMessage);
```

without validating:

```js
event.origin
```

and the message structure.

---

### Mistake 10: Parsing URLs Manually

```js
window.location.search.split("=")[1];
```

Prefer:

```js
new URLSearchParams(window.location.search);
```

---

### Mistake 11: Using JavaScript for CSS Problems

Do not use JavaScript for responsive styling that CSS can handle naturally.

---

### Mistake 12: Rebuilding Native Browser Features

Before installing a package, check whether the platform already provides the capability.

---

# 156. BOM Best-Practice Summary

A strong browser-side implementation follows these principles:

```text
Detect capabilities
        ↓
Handle unsupported environments
        ↓
Request permissions intentionally
        ↓
Validate browser-provided data
        ↓
Keep sensitive decisions on the server
        ↓
Clean up listeners and resources
        ↓
Cancel obsolete async work
        ↓
Keep the main thread responsive
        ↓
Respect accessibility
        ↓
Provide graceful fallbacks
        ↓
Separate browser APIs from application logic
```

---

# 157. Quick Reference

| Area                | Best Practice                                      |
| ------------------- | -------------------------------------------------- |
| Feature support     | Use feature detection                              |
| Browser detection   | Prefer capability detection                        |
| SSR                 | Guard browser-only APIs                            |
| Storage             | Treat it as client-controlled                      |
| Secrets             | Keep them on the server                            |
| URLs                | Validate and encode input                          |
| History             | Use deliberately                                   |
| Events              | Clean up listeners                                 |
| Scroll/resize       | Throttle or use `requestAnimationFrame`            |
| Search              | Debounce and cancel obsolete requests              |
| Network             | Handle actual request failures                     |
| Offline             | Do not rely only on `navigator.onLine`             |
| Permissions         | Request only when needed                           |
| Geolocation         | Minimize precision and lifetime                    |
| Clipboard           | Handle denial and failure                          |
| Notifications       | Avoid unnecessary interruptions                    |
| Timers              | Always clean them up                               |
| Performance         | Measure before optimizing                          |
| DOM                 | Prefer native HTML/CSS where possible              |
| React               | Keep browser effects in appropriate boundaries     |
| Next.js             | Keep client-specific code inside client boundaries |
| Security            | Use browser and server security mechanisms         |
| `postMessage()`     | Validate origin and message data                   |
| Third-party scripts | Minimize and review them                           |
| Errors              | Distinguish unsupported, denied, and failed        |
| Fallbacks           | Preserve core functionality                        |
| Architecture        | Isolate browser-specific code                      |

---

# 158. Final Mental Model

The most useful way to think about the BOM and browser APIs is not:

> "A collection of objects and methods I need to memorize."

Instead, think:

```text
The browser is an environment
        ↓
JavaScript can interact with that environment
        ↓
The environment has capabilities
        ↓
Capabilities may be unavailable or restricted
        ↓
Users control many of those capabilities
        ↓
Browser operations can fail or be canceled
        ↓
Some operations have privacy/security implications
        ↓
Some operations create resources that require cleanup
        ↓
Some operations can affect performance
        ↓
Frameworks such as React and Next.js build on top of these concepts
```

A professional browser implementation therefore asks five questions repeatedly:

```text
Can I use it?
    ↓
Should I use it?
    ↓
What happens if it fails?
    ↓
How do I clean it up?
    ↓
Is it safe and appropriate?
```

That mindset is more valuable than memorizing individual BOM APIs.

---

# Key Takeaways

1. **Use feature detection instead of blindly assuming browser support.**

2. **Treat client-side data as user-controlled.**

3. **Never use browser state as a substitute for server-side security.**

4. **Clean up event listeners, timers, observers, watches, and subscriptions.**

5. **Cancel asynchronous work when it is no longer relevant.**

6. **Do not assume `navigator.onLine` means the internet or your API is healthy.**

7. **Request permissions only when the user understands why they are needed.**

8. **Always provide sensible fallbacks for optional browser capabilities.**

9. **Use `URL`, `URLSearchParams`, History API, and other native browser tools instead of fragile string manipulation.**

10. **Protect sensitive information from URLs, storage, logs, and client-side code.**

11. **Keep the main thread responsive and optimize based on measurement.**

12. **Use semantic HTML and CSS before replacing browser behavior with JavaScript.**

13. **In React, keep browser side effects explicit and clean them up properly.**

14. **In Next.js, understand the difference between server execution and browser execution.**

15. **Keep browser APIs behind small, focused abstractions when that improves architecture.**

16. **Separate browser capabilities from application logic and server-owned data.**

17. **Design for denied permissions, unsupported APIs, network failure, cancellation, and unexpected input.**

18. **Think of the BOM as part of the larger Web Platform rather than an isolated collection of objects.**

The goal is not to use every browser API.

The goal is to know **when an API is appropriate, how it behaves, how it can fail, how to secure it, and how to integrate it cleanly into a real application.**
