# Window Object

## Introduction

The `window` object is one of the most important objects in browser JavaScript.

It represents the browser's **top-level browsing context** for a page and provides access to a large collection of browser capabilities.

For example:

```javascript
window.location;
window.history;
window.navigator;
window.screen;
window.localStorage;
window.setTimeout();
```

Because `window` is also closely connected to the browser's global environment, many of these APIs can be used without explicitly writing `window.`:

```javascript
location;
history;
navigator;
screen;
localStorage;
setTimeout();
```

So these are commonly equivalent:

```javascript
window.location;
```

and:

```javascript
location;
```

The `window` object is important because it connects JavaScript code to the browser environment.

A useful mental model is:

```text
JavaScript
    ↓
Global Environment
    ↓
window
    ├── document
    ├── location
    ├── history
    ├── navigator
    ├── screen
    ├── storage
    ├── timers
    └── many browser APIs
```

---

# 1. What Is `window`?

In a normal browser page, `window` represents the browser window or, more precisely, the page's top-level browsing context.

For example:

```javascript
console.log(window);
```

prints the global browser object.

It gives JavaScript access to browser features such as:

```javascript
window.location;
window.history;
window.navigator;
window.screen;
```

The key idea is:

> `window` is the main gateway between browser JavaScript and the browser environment.

---

# 2. `window` Is the Global Object in Browsers

JavaScript needs a **global object** for values and APIs available globally within a JavaScript environment.

In browsers, the global object for a window's main realm is represented by:

```javascript
window
```

This means things such as:

```javascript
console
setTimeout
location
document
navigator
```

are available through the browser's global environment.

For example:

```javascript
window.setTimeout;
```

and:

```javascript
setTimeout;
```

refer to the same timer API in ordinary browser code.

---

# 3. `window` and `globalThis`

Modern JavaScript provides:

```javascript
globalThis
```

as the standard way to access the global object.

In a normal browser window:

```javascript
console.log(window === globalThis);
```

typically produces:

```text
true
```

This relationship is useful because `globalThis` is not browser-specific.

For example:

```javascript
globalThis.setTimeout(() => {
  console.log("Done");
}, 1000);
```

works conceptually with the global object in the current JavaScript environment.

In a browser:

```javascript
globalThis === window;
```

In Node.js:

```javascript
globalThis
```

exists, but there is no browser `window` object.

This distinction becomes important when writing code intended to run in multiple environments.

---

# 4. Why `globalThis` Exists

Before `globalThis`, developers often had to use environment-specific globals:

```text
Browser → window
Node.js → global
Older environments → various techniques
```

Modern JavaScript provides:

```javascript
globalThis
```

as a standardized cross-environment reference.

So:

```javascript
globalThis
```

is often preferable for genuinely environment-independent code.

But when you specifically mean:

> "The browser window"

then:

```javascript
window
```

communicates that intent more clearly.

---

# 5. `window.document`

The `document` object represents the current HTML document.

Because the document belongs to the browsing context, it is accessible through:

```javascript
window.document;
```

Most frontend code simply uses:

```javascript
document;
```

For example:

```javascript
document.querySelector("#title");
```

and:

```javascript
window.document.querySelector("#title");
```

refer to the same document in the normal case.

The relationship is:

```text
window
  ↓
document
  ↓
DOM tree
  ↓
elements
```

---

# 6. `window` vs `document`

These are often confused.

## `window`

Represents the browser environment.

Examples:

```javascript
window.location;
window.history;
window.navigator;
window.innerWidth;
```

## `document`

Represents the current webpage.

Examples:

```javascript
document.querySelector();
document.body;
document.title;
```

A simple distinction is:

```text
window
→ Browser / browsing context

document
→ Current page / DOM
```

---

# 7. `window.location`

The `location` object represents the current URL.

For example:

```javascript
console.log(window.location.href);
```

might produce:

```text
https://example.com/projects?page=2
```

You can also write:

```javascript
console.log(location.href);
```

The detailed `Location` API will be covered in:

```text
04-location-object.md
```

For now, remember that:

```text
window
  ↓
location
  ↓
current URL / navigation
```

---

# 8. `window.history`

The browser's navigation history is accessible through:

```javascript
window.history;
```

For example:

```javascript
history.back();
```

moves the browser back in its session history.

Other methods include:

```javascript
history.forward();
history.go(-1);
```

The detailed History API will be covered later.

The important relationship is:

```text
window
  ↓
history
  ↓
browser navigation history
```

---

# 9. `window.navigator`

The `navigator` object exposes browser and environment information and various browser capabilities.

For example:

```javascript
console.log(navigator.language);
```

or:

```javascript
console.log(navigator.onLine);
```

It can also expose interfaces such as:

```javascript
navigator.clipboard;
navigator.geolocation;
```

depending on browser support and permissions.

However:

> Information provided by `navigator` should not automatically be treated as a trusted security source.

A browser user controls their client environment.

---

# 10. `window.screen`

The `screen` object provides information about the user's display environment.

For example:

```javascript
console.log(screen.width);
console.log(screen.height);
```

This is about the physical display's available characteristics, not necessarily the current webpage viewport.

This distinction is important.

For example:

```javascript
window.innerWidth
```

usually describes the viewport width.

While:

```javascript
screen.width
```

describes the screen's width.

These values can be very different.

---

# 11. `window.localStorage`

Browser storage can be accessed through:

```javascript
window.localStorage;
```

For example:

```javascript
localStorage.setItem(
  "theme",
  "dark"
);
```

and:

```javascript
const theme = localStorage.getItem("theme");
```

Storage is client-side and persistent across browser sessions until it is cleared or removed according to browser behavior.

It is not a secure location for server secrets.

The detailed storage topic will be covered separately.

---

# 12. `window.sessionStorage`

Similar to `localStorage`:

```javascript
sessionStorage;
```

provides client-side key/value storage.

For example:

```javascript
sessionStorage.setItem(
  "draft",
  "Osama Abu Motlaq"
);
```

Its lifetime and behavior differ from `localStorage`.

Do not confuse:

```text
localStorage
```

with:

```text
sessionStorage
```

The dedicated storage file will explain their differences in detail.

---

# 13. Browser Timers on `window`

Timers are also available through `window`:

```javascript
window.setTimeout();
window.setInterval();
```

For example:

```javascript
window.setTimeout(() => {
  console.log("Done");
}, 1000);
```

The common form is simply:

```javascript
setTimeout(() => {
  console.log("Done");
}, 1000);
```

You can cancel a timeout:

```javascript
const timeoutId = setTimeout(() => {
  console.log("Done");
}, 1000);

clearTimeout(timeoutId);
```

Timers will be covered in depth in:

```text
09-timers.md
```

---

# 14. `window.console`

The console is available through the browser's global environment.

For example:

```javascript
window.console.log("Hello");
```

Usually you simply write:

```javascript
console.log("Hello");
```

The console API is primarily a development and debugging tool.

Do not rely on console logging as your application's user-facing error handling system.

---

# 15. `window.fetch`

Modern browsers expose the Fetch API globally.

You may see:

```javascript
window.fetch("/api/projects");
```

or the standard shorter form:

```javascript
fetch("/api/projects");
```

`fetch()` is a web platform API rather than a DOM API.

A basic example:

```javascript
async function loadProjects() {
  const response = await fetch("/api/projects");

  if (!response.ok) {
    throw new Error("Failed to load projects.");
  }

  const data = await response.json();

  return data;
}
```

Fetch is highly important for frontend development, although it is broader than the traditional BOM category.

---

# 16. The `window` Object Is Huge

Do not try to memorize all of `window`.

Modern browsers expose a very large number of properties and APIs through the global environment.

Examples include:

```text
window
├── document
├── location
├── history
├── navigator
├── screen
├── localStorage
├── sessionStorage
├── console
├── fetch
├── setTimeout
├── setInterval
├── requestAnimationFrame
├── requestIdleCallback
├── matchMedia
├── alert
├── confirm
├── prompt
├── performance
└── many other browser APIs
```

The practical goal is not:

> Memorize the entire object.

The goal is:

> Know which browser capability to look for when you need one.

---

# 17. `window` and Global Variables

Understanding global variables is important.

Consider:

```javascript
var name = "Osama Abu Motlaq";
```

In a classic browser script, `var` declarations at the top level can become properties of `window`.

For example:

```javascript
var userName = "Osama Abu Motlaq";

console.log(window.userName);
```

may produce:

```text
Osama Abu Motlaq
```

By contrast:

```javascript
let age = 25;
const country = "Palestine";
```

do not become ordinary `window` properties in the same way.

For example:

```javascript
let age = 25;

console.log(window.age);
```

does not produce the same relationship as a top-level `var` declaration in a classic script.

This distinction is important when understanding global scope.

---

# 18. Why Global Variables Are Usually a Bad Idea

Even though browser globals are available, avoid creating unnecessary global state.

For example, avoid:

```javascript
window.currentUser = {
  name: "Osama Abu Motlaq"
};

window.projects = [];
window.isLoading = false;
window.theme = "dark";
```

This creates a large shared namespace that unrelated code can modify.

Problems can include:

* Name collisions.
* Hidden dependencies.
* Difficult debugging.
* Accidental mutation.
* Poor modularity.
* Harder testing.

Prefer modules and encapsulated state.

---

# 19. Global Namespace Pollution

Suppose two scripts both use:

```javascript
window.app;
```

The second script may overwrite the first.

For example:

```javascript
window.app = "First";
window.app = "Second";
```

Now:

```javascript
console.log(window.app);
```

produces:

```text
Second
```

This is one reason modern JavaScript heavily favors ES modules.

Modules create their own scope instead of placing application internals directly into the global namespace.

---

# 20. JavaScript Modules and `window`

Consider a module:

```html
<script type="module" src="/app.js"></script>
```

Inside:

```javascript
const projectName = "Portfolio";
```

this does not become:

```javascript
window.projectName
```

automatically.

Modules have their own module scope.

This is an important difference between older global-script patterns and modern JavaScript architecture.

---

# 21. `window` and `this`

In browser JavaScript, `this` has different behavior depending on the context.

At the top level of a classic non-module script:

```javascript
console.log(this === window);
```

can produce:

```text
true
```

But inside an ES module:

```javascript
console.log(this);
```

top-level `this` is:

```text
undefined
```

This distinction is important because `this` is determined by JavaScript execution context, not simply by the existence of `window`.

---

# 22. `window` in Arrow Functions

Arrow functions do not create their own `this`.

For example:

```javascript
const object = {
  name: "Osama Abu Motlaq",

  regularMethod() {
    console.log(this);
  },

  arrowMethod: () => {
    console.log(this);
  }
};
```

The arrow function's `this` comes from the surrounding lexical environment.

Do not assume:

```text
arrow function → window
```

That is not a general rule.

The behavior depends on where the arrow function was created.

---

# 23. `window` vs `this`

These concepts are related but not interchangeable.

```javascript
window
```

is a reference to the browser's global object.

```javascript
this
```

is determined by the execution context and how a function is called.

For example:

```javascript
function showThis() {
  console.log(this);
}
```

In a classic non-strict browser context, calling:

```javascript
showThis();
```

may result in the global object.

But in strict mode:

```javascript
"use strict";

function showThis() {
  console.log(this);
}

showThis();
```

produces:

```text
undefined
```

Therefore:

> Never use `this === window` as a universal rule.

---

# 24. `window.self`

The `self` property refers to the current browsing context.

For example:

```javascript
console.log(window.self === window);
```

normally produces:

```text
true
```

You may also see:

```javascript
self
```

without the `window.` prefix.

`self` becomes particularly useful when thinking about frames and workers, where the global object may not be `window`.

---

# 25. `window.top`

`window.top` refers to the top-level browsing context.

Consider:

```text
Top page
└── iframe
    └── nested document
```

Inside the iframe:

```javascript
window.top
```

refers to the outermost browsing context.

If the current page is already the top-level page:

```javascript
window.top === window
```

is normally true.

---

# 26. `window.parent`

For a document inside an iframe:

```javascript
window.parent
```

refers to the parent browsing context.

For a top-level page:

```javascript
window.parent === window
```

is normally true.

This is useful when working with frames, but cross-origin security rules heavily limit what one browsing context can access from another.

---

# 27. `window.frames`

The browser exposes frames through:

```javascript
window.frames
```

and:

```javascript
window.length
```

can indicate the number of child browsing contexts in the window.

For example:

```html
<iframe src="/profile.html"></iframe>
<iframe src="/projects.html"></iframe>
```

The top-level page has child browsing contexts.

However, modern applications should use frames intentionally because they introduce:

* Security considerations.
* Communication complexity.
* Origin boundaries.
* Accessibility considerations.
* Performance implications.

---

# 28. Same-Origin Policy

One of the most important browser security principles is the:

> **Same-Origin Policy**

An origin consists conceptually of:

```text
scheme + host + port
```

For example:

```text
https://example.com:443
```

A document can access some properties of another same-origin browsing context.

Cross-origin access is heavily restricted.

For example:

```text
https://example.com
```

and:

```text
https://other.example.com
```

have different origins because their hosts differ.

This matters when using:

```javascript
window.parent
window.top
window.opener
window.frames
```

---

# 29. Cross-Origin Windows

Suppose a page opens another origin:

```javascript
const popup = window.open(
  "https://example.com"
);
```

The returned window reference does not mean your page gets unrestricted access to that other origin.

The Same-Origin Policy limits what JavaScript can read or modify.

For cross-origin communication, the standard mechanism is commonly:

```javascript
postMessage()
```

with strict origin validation.

---

# 30. `window.opener`

When one page opens another page, the opened page may have access to:

```javascript
window.opener
```

depending on how it was opened and browser behavior.

For example:

```javascript
const popup = window.open(
  "https://example.com"
);
```

The new page may have an opener relationship.

This relationship has security implications, especially with links or windows that open external pages.

When appropriate, use:

```html
<a
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
>
  Open
</a>
```

This prevents the opened page from using `window.opener` in the intended way.

---

# 31. `window.open()`

The browser provides:

```javascript
window.open(url);
```

to request opening a new browsing context.

For example:

```javascript
const popup = window.open(
  "https://example.com"
);
```

However, browsers may block popups that are not directly triggered by user interaction.

This means:

```javascript
button.addEventListener("click", () => {
  window.open("https://example.com");
});
```

is much more likely to work than:

```javascript
setTimeout(() => {
  window.open("https://example.com");
}, 5000);
```

because the latter may not be considered a user-initiated action.

The detailed window methods file will cover this more deeply.

---

# 32. `window.close()`

A script can request:

```javascript
window.close();
```

but browsers restrict which windows can be closed by scripts.

For example, browsers commonly prevent arbitrary pages from closing a tab that the script did not open.

This is a security and user-control feature.

Do not assume:

```javascript
window.close();
```

can close any browser tab.

---

# 33. `window.focus()` and `window.blur()`

These methods relate to window focus:

```javascript
window.focus();
window.blur();
```

Browser security and user-experience rules may restrict their behavior.

Modern browsers generally avoid allowing web pages to aggressively control the user's focus.

Use these methods only for legitimate application behavior.

---

# 34. Window Dimensions

Several `window` properties describe browser dimensions.

Examples:

```javascript
window.innerWidth;
window.innerHeight;
```

These generally refer to the viewport dimensions.

Other properties include:

```javascript
window.outerWidth;
window.outerHeight;
```

which concern the outer browser window.

These values are not interchangeable.

A useful model is:

```text
Browser window
┌──────────────────────────────┐
│ browser chrome / controls    │
│  ┌────────────────────────┐  │
│  │ viewport               │  │
│  │                        │  │
│  │        webpage         │  │
│  │                        │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
```

---

# 35. `window.innerWidth`

Example:

```javascript
console.log(window.innerWidth);
```

This is commonly used for viewport-related behavior.

However, responsive design should generally rely on CSS media queries rather than JavaScript whenever CSS can solve the problem.

Prefer:

```css
@media (max-width: 768px) {
  /* Responsive styles */
}
```

over:

```javascript
if (window.innerWidth < 768) {
  // Entire responsive system in JavaScript.
}
```

Use JavaScript when the application genuinely needs the viewport information for behavior.

---

# 36. `window.innerHeight`

Likewise:

```javascript
console.log(window.innerHeight);
```

provides the viewport height.

It can be useful for:

* Visual calculations.
* Canvas.
* Scroll-based interactions.
* Full-screen UI.
* Measurements.

But avoid unnecessarily tying application layout to JavaScript when CSS can handle it.

---

# 37. `window.scrollX` and `window.scrollY`

These properties tell you how far the document has been scrolled horizontally or vertically.

For example:

```javascript
console.log(window.scrollY);
```

A common pattern:

```javascript
window.addEventListener("scroll", () => {
  console.log(window.scrollY);
});
```

But scroll events can fire frequently.

For expensive work, use appropriate throttling or `requestAnimationFrame()`.

---

# 38. `window.devicePixelRatio`

The device pixel ratio describes the relationship between CSS pixels and physical device pixels.

Example:

```javascript
console.log(window.devicePixelRatio);
```

For example, a value of:

```text
2
```

can mean approximately:

```text
1 CSS pixel ≈ 2 physical device pixels
```

depending on the device and browser context.

This is important for:

* Canvas.
* High-resolution images.
* Pixel-perfect rendering.
* Display-aware calculations.

---

# 39. `window.matchMedia()`

The browser provides:

```javascript
window.matchMedia();
```

for evaluating CSS media queries from JavaScript.

Example:

```javascript
const mediaQuery = window.matchMedia(
  "(prefers-color-scheme: dark)"
);

console.log(mediaQuery.matches);
```

You can also listen for changes:

```javascript
mediaQuery.addEventListener("change", (event) => {
  console.log(event.matches);
});
```

This can be useful when application logic genuinely needs to react to a media condition.

---

# 40. Prefer CSS When CSS Is Enough

Bad architecture:

```javascript
if (window.innerWidth < 768) {
  sidebar.hidden = true;
}
```

when the requirement is purely visual.

Better:

```css
@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
```

Use JavaScript when behavior depends on the environment.

Use CSS when the requirement is primarily presentation.

---

# 41. `window.matchMedia()` and React

In React, browser media state can be useful when behavior—not just styling—depends on a media query.

However, direct access to `window.matchMedia()` should be handled carefully in environments that may render on the server.

A common pattern is to initialize or subscribe to the media query from client-side lifecycle logic.

The important architectural distinction is:

```text
CSS media query
→ presentation

JavaScript media query
→ application behavior
```

---

# 42. `window.getComputedStyle()`

The browser also provides:

```javascript
window.getComputedStyle(element);
```

to inspect the browser's computed CSS values.

For example:

```javascript
const style = window.getComputedStyle(element);

console.log(style.display);
console.log(style.color);
```

This is a DOM-related use of a window-provided API.

Avoid using it repeatedly in performance-sensitive loops because layout and style calculations can be expensive depending on the property and surrounding operations.

---

# 43. `window.requestAnimationFrame()`

For visual browser updates:

```javascript
requestAnimationFrame(() => {
  // Visual update.
});
```

This schedules a callback for the browser's next suitable rendering opportunity.

A basic loop:

```javascript
function animate() {
  // Update animation.

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

Stop a scheduled frame:

```javascript
const frameId = requestAnimationFrame(() => {
  // ...
});

cancelAnimationFrame(frameId);
```

This API is especially important for browser animation and performance.

---

# 44. `window.performance`

Modern browsers expose performance-related APIs through:

```javascript
window.performance;
```

For example:

```javascript
const start = performance.now();

// Work...

const end = performance.now();

console.log(end - start);
```

You can also use performance marks and measurements:

```javascript
performance.mark("start");

doWork();

performance.mark("end");

performance.measure(
  "work",
  "start",
  "end"
);
```

Performance APIs will be discussed in more depth later in the BOM section.

---

# 45. `window.alert()`

The browser provides:

```javascript
window.alert("Hello");
```

Usually written as:

```javascript
alert("Hello");
```

It opens a native browser dialog.

The call blocks interaction with the page until the user dismisses the dialog.

This makes it useful for simple demonstrations and debugging, but it is usually not ideal for modern application UI.

---

# 46. `window.confirm()`

Example:

```javascript
const confirmed = window.confirm(
  "Delete this project?"
);
```

The returned value is:

```text
true
```

or:

```text
false
```

For example:

```javascript
if (confirmed) {
  deleteProject();
}
```

This is useful for simple confirmation flows.

However, custom accessible dialogs often provide better control over real application UX.

---

# 47. `window.prompt()`

Example:

```javascript
const name = window.prompt(
  "Enter your name:"
);
```

The returned value can be:

```text
String
```

or:

```text
null
```

if the user cancels.

It is a simple browser primitive but rarely appropriate for sophisticated application interfaces.

---

# 48. `window` and Browser Events

The `window` object can receive browser-level events.

For example:

```javascript
window.addEventListener(
  "resize",
  handleResize
);
```

Or:

```javascript
window.addEventListener(
  "online",
  handleOnline
);
```

Or:

```javascript
window.addEventListener(
  "offline",
  handleOffline
);
```

This makes `window` an important event source in browser applications.

---

# 49. Global Events vs Element Events

A useful distinction:

### Element-level event

```javascript
button.addEventListener("click", handleClick);
```

The event is attached to a particular DOM element.

### Window-level event

```javascript
window.addEventListener("resize", handleResize);
```

The event concerns the browser window or browsing context.

Not every browser event belongs naturally to an individual element.

---

# 50. `window` and the `load` Event

The window can listen for page loading:

```javascript
window.addEventListener("load", () => {
  console.log("Page and dependent resources loaded.");
});
```

The `load` event occurs after the document and dependent resources required for the load have finished loading.

For many scripts, however, you do not need to wait for `window.load`.

Modern scripts can often use:

```html
<script type="module" src="/app.js"></script>
```

or defer execution appropriately.

---

# 51. `DOMContentLoaded` vs `load`

These are different events.

### `DOMContentLoaded`

The document has been parsed and the DOM is ready.

### `load`

The page and its dependent resources have finished loading.

Conceptually:

```text
HTML parsing
    ↓
DOMContentLoaded
    ↓
additional resource loading
    ↓
load
```

For DOM initialization, `DOMContentLoaded` is often more relevant than `load`.

However, modules and script placement can remove the need to manually wait for either event in many applications.

---

# 52. `window` and `beforeunload`

Browsers provide:

```javascript
window.addEventListener(
  "beforeunload",
  handleBeforeUnload
);
```

Historically, developers used this for custom leave-page messages.

Modern browsers heavily restrict such behavior.

If you genuinely need to warn users about unsaved changes, follow current browser guidance rather than relying on custom dialog text.

---

# 53. `window` and `pagehide`

The browser also provides lifecycle-related events such as:

```javascript
window.addEventListener(
  "pagehide",
  handlePageHide
);
```

This can be useful for page lifecycle handling, especially around navigation and page caching behavior.

For resource cleanup, choose lifecycle events based on the exact behavior you need rather than assuming `beforeunload` is always the correct solution.

---

# 54. `window` and `visibilitychange`

Although the event is dispatched on `document`:

```javascript
document.addEventListener(
  "visibilitychange",
  handleVisibilityChange
);
```

it is conceptually important when studying browser lifecycle behavior.

For example:

```javascript
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    console.log("Page is hidden");
  }
});
```

This can be useful for:

* Pausing expensive work.
* Reducing unnecessary polling.
* Managing media.
* Tracking visibility.

It also demonstrates that browser-level behavior does not always belong directly to `window`.

---

# 55. `window` Is Not Available in Every JavaScript Runtime

This is critical when using:

* Node.js.
* Server-side rendering.
* Next.js Server Components.
* Build-time scripts.
* CLI applications.
* Testing environments.

Code such as:

```javascript
console.log(window.innerWidth);
```

assumes a browser environment.

In Node.js:

```javascript
window
```

is not the normal global object.

This is one of the most important environment-boundary concepts in modern frontend development.

---

# 56. Checking for `window`

Sometimes code may need to detect whether it is running in a browser environment.

A common check is:

```javascript
if (typeof window !== "undefined") {
  // Browser environment.
}
```

Why use `typeof`?

Because:

```javascript
typeof window
```

is safe even when `window` is not defined.

Directly evaluating:

```javascript
if (window) {
}
```

can throw a `ReferenceError` in an environment where `window` does not exist.

---

# 57. Environment Checks Are a Tool, Not an Architecture

This:

```javascript
if (typeof window !== "undefined") {
  // Browser-only logic.
}
```

can be useful.

But do not build an entire application around constantly checking whether `window` exists.

Instead, isolate browser-only logic.

For example:

```javascript
function getStoredTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  return localStorage.getItem("theme") ?? "light";
}
```

Better architecture generally keeps environment-specific code in clearly identified client-side boundaries.

---

# 58. `window` in Next.js

This distinction is especially important in Next.js.

A server-rendered environment does not automatically have:

```javascript
window
document
localStorage
navigator
```

For browser-only behavior, code may need to execute on the client.

For example:

```jsx
"use client";

import { useEffect } from "react";

export default function Example() {
  useEffect(() => {
    console.log(window.innerWidth);
  }, []);

  return <p>Browser example</p>;
}
```

The exact solution depends on whether the code needs:

* Client-side rendering.
* Client-side effects.
* Event handlers.
* Browser-only APIs.

---

# 59. `window` and `useEffect`

A common React pattern is:

```jsx
useEffect(() => {
  const width = window.innerWidth;

  console.log(width);
}, []);
```

This works because the effect runs in the client environment after the component is mounted.

But remember:

> `useEffect` is not a general-purpose "make browser code safe" function.

It is appropriate when the browser interaction is an effect that should happen after rendering.

Some situations may require different architecture.

---

# 60. `window` and `useRef`

When React code genuinely needs access to a DOM element:

```jsx
const buttonRef = useRef(null);
```

then:

```jsx
<button ref={buttonRef}>
  Save
</button>
```

After the element exists in the browser:

```javascript
buttonRef.current?.focus();
```

This is preferable to:

```javascript
document.querySelector("#save");
```

inside a React component for ordinary component-owned DOM access.

The principle is:

```text
React component
   ↓
useRef
   ↓
specific DOM node
```

rather than globally searching the document.

---

# 61. When Direct `window` Access Is Appropriate in React

Direct browser APIs are appropriate for things such as:

```javascript
window.matchMedia();
window.scrollTo();
window.addEventListener();
window.removeEventListener();
window.requestAnimationFrame();
window.location;
```

when the component genuinely needs those browser capabilities.

The key is lifecycle management.

For example:

```jsx
useEffect(() => {
  function handleResize() {
    console.log(window.innerWidth);
  }

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener(
      "resize",
      handleResize
    );
  };
}, []);
```

This is the correct pattern:

```text
Subscribe
   ↓
Use
   ↓
Cleanup
```

---

# 62. Avoid Global `window` Mutation

Avoid arbitrary application data like:

```javascript
window.myData = ...;
window.user = ...;
window.appState = ...;
```

unless you have a deliberate integration reason.

Global mutation makes dependencies implicit.

Prefer:

```text
modules
closures
context
state managers
function parameters
```

depending on the problem.

---

# 63. Legitimate Uses of `window` Globals

There are legitimate cases where global window properties are appropriate.

Examples include:

* Browser-provided APIs.
* Third-party integrations that intentionally expose global objects.
* Specific interoperability requirements.
* Debugging hooks in development.

The problem is not:

```text
using window
```

The problem is:

```text
using window as an uncontrolled global application database
```

---

# 64. `window` and Third-Party Libraries

Some browser libraries expect:

```javascript
window.SomeLibrary
```

or attach an API globally.

When integrating such a library:

* Read its documentation.
* Know whether it requires the browser.
* Load it at the appropriate lifecycle stage.
* Avoid assuming it works during server rendering.
* Clean up listeners and resources where necessary.

In Next.js, this often means making the integration client-only.

---

# 65. The `window` Object and Security

The browser window is not a trusted environment.

A user can inspect:

```text
window
document
localStorage
sessionStorage
network requests
JavaScript source
DOM state
```

through browser developer tools.

Therefore:

> Never put something in `window` that must remain secret from the user.

For example, this is not a secure secret store:

```javascript
window.apiSecret = "secret-value";
```

Anything shipped to the browser is potentially visible.

---

# 66. `window` and Authentication

Do not use:

```javascript
window.userRole = "admin";
```

as proof that the user is an administrator.

Client-side state can be modified.

The secure architecture is:

```text
Client
   ↓
Request
   ↓
Server
   ↓
Authentication
   ↓
Authorization
   ↓
Protected operation
```

The browser may display UI based on the user's role, but the server must enforce the permission.

---

# 67. `window` and Storage Security

Be careful with:

```javascript
localStorage
sessionStorage
```

If an XSS vulnerability allows arbitrary JavaScript execution, browser-accessible storage may become accessible to malicious code running in the page's origin.

Therefore:

```text
client-side storage
≠
secure secret storage
```

Choose authentication and storage architecture deliberately.

---

# 68. `window` and `postMessage`

Cross-window communication commonly uses:

```javascript
window.postMessage();
```

Example:

```javascript
window.postMessage(
  {
    type: "READY"
  },
  "https://example.com"
);
```

When receiving messages:

```javascript
window.addEventListener("message", (event) => {
  if (event.origin !== "https://example.com") {
    return;
  }

  // Validate event.data before using it.
});
```

Never blindly trust:

```javascript
event.data;
```

The combination of origin validation and data validation is important.

---

# 69. `window` Is a Runtime Capability Surface

A powerful way to think about `window` is:

> `window` is a capability surface exposed by the browser to JavaScript.

It gives code access to things such as:

```text
Navigation
Storage
Timers
Events
Display information
Clipboard
Location
Browser state
Rendering-related APIs
```

This means every `window` API should be evaluated by asking:

```text
Do I need it?
Is it available here?
Does it require permission?
Does it have security implications?
Does it need cleanup?
```

---

# 70. Common Mistakes

## Mistake 1: Thinking `window` is the DOM

It is not.

```text
window → browser environment
document → page/DOM
```

---

## Mistake 2: Assuming `window` exists everywhere

It does not exist as a browser object in Node.js or server-side environments.

---

## Mistake 3: Treating `window` as secure storage

It is client-side and inspectable.

---

## Mistake 4: Creating unnecessary global variables

Avoid polluting the global namespace.

---

## Mistake 5: Using JavaScript for CSS-only responsiveness

Prefer CSS media queries when the requirement is visual.

---

## Mistake 6: Assuming `this` always means `window`

`this` depends on execution context and call semantics.

---

## Mistake 7: Assuming `window.open()` always succeeds

Popup blockers and browser restrictions may prevent it.

---

## Mistake 8: Ignoring same-origin restrictions

Cross-origin window access is restricted.

---

## Mistake 9: Forgetting cleanup

Global event listeners can remain active after a component is gone.

---

## Mistake 10: Accessing `window` during server rendering

Browser globals may not exist in the server environment.

---

# 71. Best Practices

## 1. Use `window` for browser-specific capabilities

```javascript
window.history;
window.location;
window.matchMedia();
```

This makes browser dependencies explicit.

---

## 2. Prefer standard APIs instead of custom global state

Use:

```javascript
localStorage;
history;
location;
matchMedia;
```

when appropriate rather than creating your own `window.appState`.

---

## 3. Keep browser-only logic isolated

For example:

```javascript
function getViewportWidth() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.innerWidth;
}
```

---

## 4. Prefer modules for application state

Use:

```text
imports
exports
closures
state objects
```

rather than global properties on `window`.

---

## 5. Clean up global listeners

For example:

```javascript
function handleResize() {
  console.log(window.innerWidth);
}

window.addEventListener(
  "resize",
  handleResize
);

window.removeEventListener(
  "resize",
  handleResize
);
```

Use appropriate lifecycle boundaries.

---

## 6. Use feature detection

Prefer:

```javascript
if ("clipboard" in navigator) {
  // ...
}
```

over browser-name detection.

---

## 7. Use CSS when CSS is enough

Do not replace CSS responsiveness with JavaScript unnecessarily.

---

## 8. Never trust client-side browser state for security

Server-side authentication and authorization remain the security boundary.

---

## 9. Respect browser permissions and user control

Do not repeatedly request sensitive capabilities without a clear reason.

---

## 10. Learn the API instead of memorizing `window`

You do not need to memorize hundreds of properties.

Learn how to identify the correct browser API for the problem.

---

# 72. Quick Reference

| API                       | Purpose                                          |
| ------------------------- | ------------------------------------------------ |
| `window`                  | Browser global object                            |
| `globalThis`              | Standard global object reference                 |
| `document`                | Current document / DOM                           |
| `location`                | Current URL and navigation                       |
| `history`                 | Session navigation history                       |
| `navigator`               | Browser/environment information and capabilities |
| `screen`                  | Display information                              |
| `localStorage`            | Persistent client-side storage                   |
| `sessionStorage`          | Session-scoped client-side storage               |
| `setTimeout()`            | Schedule one delayed callback                    |
| `setInterval()`           | Schedule repeated callbacks                      |
| `requestAnimationFrame()` | Schedule visual work                             |
| `matchMedia()`            | Evaluate media queries in JavaScript             |
| `performance`             | Browser performance measurements                 |
| `open()`                  | Request a new browsing context                   |
| `close()`                 | Request closing a script-created window          |
| `alert()`                 | Native alert dialog                              |
| `confirm()`               | Native confirmation dialog                       |
| `prompt()`                | Native text prompt                               |
| `postMessage()`           | Cross-window messaging                           |

---

# 73. Window vs Document Quick Comparison

| Feature              | `window`                  | `document`                 |
| -------------------- | ------------------------- | -------------------------- |
| Browser environment  | Yes                       | No                         |
| HTML document        | Indirectly                | Yes                        |
| DOM elements         | Through `document`        | Yes                        |
| Current URL          | `location`                | Limited document metadata  |
| Navigation history   | `history`                 | No                         |
| Browser dimensions   | Yes                       | Some document measurements |
| Browser storage      | Yes                       | No                         |
| Browser information  | `navigator`               | No                         |
| Screen information   | `screen`                  | No                         |
| CSS selector queries | Through `document`        | Yes                        |
| Events               | Many browser-level events | Many document-level events |

---

# 74. Window vs `globalThis`

| Feature                     | `window`     | `globalThis`      |
| --------------------------- | ------------ | ----------------- |
| Browser-specific meaning    | Yes          | No                |
| Browser global object       | Yes          | Yes               |
| Cross-environment           | No           | Yes               |
| Node.js                     | Not normally | Yes               |
| Communicates browser intent | Strongly     | Less specifically |

Use:

```javascript
window
```

when you specifically mean the browser.

Use:

```javascript
globalThis
```

when you genuinely need the global object in an environment-independent way.

---

# 75. Window and React Mental Model

In React:

```text
React
  ↓
Component state / props
  ↓
JSX
  ↓
DOM
```

The browser still provides:

```text
window
  ├── location
  ├── history
  ├── storage
  ├── matchMedia
  ├── timers
  ├── events
  └── browser APIs
```

React does not replace `window`.

React simply provides an abstraction for building UI.

This is why learning the BOM remains relevant.

---

# 76. Window and Next.js Mental Model

Next.js introduces an additional boundary:

```text
                Next.js Application
                         │
            ┌────────────┴────────────┐
            ↓                         ↓
          Server                    Client
            │                         │
      No browser window        Browser window
            │                         │
        server APIs             window / DOM / BOM
```

This distinction is crucial.

For example:

```javascript
window.innerWidth
```

requires a browser environment.

Whereas server-side code can use:

```text
database
filesystem
server environment variables
server APIs
```

without access to the browser `window`.

---

# 77. What You Should Remember

You do not need to memorize the entire `window` object.

Remember these relationships:

```text
window
├── document
├── location
├── history
├── navigator
├── screen
├── localStorage
├── sessionStorage
├── timers
├── browser events
└── many browser APIs
```

And remember:

```text
window
→ browser environment

document
→ webpage / DOM

globalThis
→ environment-wide global object

this
→ execution-context-dependent value
```

---

# Key Takeaways

* `window` is the central global object of the browser environment.
* It provides access to many browser capabilities.
* `document` is associated with `window` but represents the current webpage and its DOM.
* Many browser APIs can be accessed without explicitly writing `window.`.
* `globalThis` provides a standardized cross-environment reference to the global object.
* `window` is browser-specific; `globalThis` is not.
* `this` and `window` are related concepts but are not universally interchangeable.
* `window.location` handles URL and navigation-related information.
* `window.history` exposes session-history controls.
* `window.navigator` exposes browser information and capabilities.
* `window.screen` exposes display information.
* `localStorage` and `sessionStorage` provide browser-side storage.
* Timers, animation scheduling, media queries, performance tools, and browser events are also closely associated with the window environment.
* The global namespace should not be used as an application-wide database.
* Avoid unnecessary mutations such as `window.appState = ...`.
* Same-origin restrictions limit access between different browsing contexts.
* `window.opener`, `window.parent`, and `window.top` have important security implications.
* Browser APIs should be checked for availability, permission requirements, and lifecycle needs.
* `window` does not exist as a browser object in server-side environments such as Node.js.
* In React, direct `window` access is appropriate for browser-specific behavior but should respect component lifecycle and cleanup.
* In Next.js, understanding the server/client boundary is essential because browser globals such as `window` are client-side concepts.
* The goal is not to memorize `window`; it is to understand it as the gateway between JavaScript and the browser environment.

The central principle is:

> **`window` represents the browser environment available to your JavaScript code; use it deliberately, keep application state out of the global namespace, and always respect the browser/server boundary.**
