# Window Properties

## Introduction

The `window` object exposes many properties that provide information about the current browser environment, browsing context, viewport, URL, scroll position, screen, and browser capabilities.

For example:

```javascript
console.log(window.innerWidth);
console.log(window.innerHeight);
console.log(window.scrollY);
console.log(window.devicePixelRatio);
```

These values can help JavaScript understand the current browser state.

However, one of the most important lessons is:

> **Not every browser measurement describes the same thing.**

For example:

```text
screen
   ↓
physical display information

window
   ↓
browser window information

viewport
   ↓
visible page area

document
   ↓
entire page content
```

Understanding these distinctions prevents many frontend bugs.

---

# 1. What Are Window Properties?

A property is a value associated with an object.

For example:

```javascript
window.innerWidth;
```

reads the `innerWidth` property of the browser window.

Likewise:

```javascript
window.location;
```

reads the `location` property.

Some properties are simple values:

```javascript
window.innerWidth;
window.innerHeight;
window.scrollX;
window.scrollY;
```

Some properties are objects:

```javascript
window.location;
window.history;
window.navigator;
window.screen;
window.performance;
```

This file focuses on properties rather than methods.

---

# 2. Core Window Properties

Some of the most useful properties include:

```text
window.innerWidth
window.innerHeight
window.outerWidth
window.outerHeight
window.scrollX
window.scrollY
window.devicePixelRatio
window.location
window.history
window.navigator
window.screen
window.document
window.performance
window.localStorage
window.sessionStorage
```

The important task is understanding what each one represents.

---

# 3. `window.innerWidth`

`window.innerWidth` usually represents the width of the browser's **layout viewport** in CSS pixels.

Example:

```javascript
console.log(window.innerWidth);
```

You might see:

```text
1366
```

or:

```text
768
```

depending on the current browser viewport.

This value can change when the browser viewport is resized.

---

# 4. `window.innerHeight`

Similarly:

```javascript
console.log(window.innerHeight);
```

returns the height of the viewport in CSS pixels.

For example:

```text
width  → 1366
height → 768
```

These values describe the viewport rather than the physical size of the monitor.

---

# 5. Viewport vs Screen

A common beginner mistake is confusing:

```javascript
window.innerWidth;
```

with:

```javascript
screen.width;
```

They represent different concepts.

### Viewport

```javascript
window.innerWidth;
```

represents the width available to the webpage's layout viewport.

### Screen

```javascript
screen.width;
```

represents information about the display environment.

For example:

```text
Screen
┌──────────────────────────────────────┐
│                                      │
│       Browser window                 │
│   ┌──────────────────────────────┐   │
│   │           Viewport            │   │
│   │                              │   │
│   │          Web page            │   │
│   │                              │   │
│   └──────────────────────────────┘   │
│                                      │
└──────────────────────────────────────┘
```

The screen can be much larger than the viewport.

---

# 6. Why `innerWidth` Can Be Smaller Than the Screen

Imagine:

```text
screen.width = 1920
```

but the browser is not maximized.

You might have:

```text
window.innerWidth = 1200
```

That is completely normal.

The screen describes the display.

The viewport describes the area currently available to the page.

---

# 7. Scroll Properties

The window exposes the current scroll position.

Horizontal:

```javascript
window.scrollX;
```

Vertical:

```javascript
window.scrollY;
```

These values describe how far the document has been scrolled.

For example:

```javascript
console.log(window.scrollY);
```

might produce:

```text
0
```

at the top of the page.

After scrolling downward:

```text
350
```

for example.

---

# 8. `scrollX` and `scrollY` Are CSS Pixel Values

These values are typically reported in CSS pixels.

For example:

```javascript
console.log(window.scrollY);
```

could produce:

```text
500
```

This does not necessarily correspond directly to physical display pixels.

The browser operates with CSS pixels for layout and viewport concepts.

---

# 9. Aliases: `pageXOffset` and `pageYOffset`

Browsers also expose:

```javascript
window.pageXOffset;
window.pageYOffset;
```

These correspond to the current horizontal and vertical scroll offsets.

Modern code commonly uses:

```javascript
window.scrollX;
window.scrollY;
```

because those names communicate the intent more clearly.

Conceptually:

```text
scrollX ≈ pageXOffset
scrollY ≈ pageYOffset
```

---

# 10. `window.outerWidth`

`window.outerWidth` describes the width of the browser window's outer area.

Example:

```javascript
console.log(window.outerWidth);
```

This is different from:

```javascript
window.innerWidth;
```

Conceptually:

```text
outerWidth
┌──────────────────────────────┐
│ Browser window               │
│ ┌──────────────────────────┐ │
│ │ Viewport                 │ │
│ │                          │ │
│ └──────────────────────────┘ │
└──────────────────────────────┘
```

The outer measurement may include parts of the browser UI around the viewport.

Exact behavior can vary by browser and platform.

---

# 11. `window.outerHeight`

Likewise:

```javascript
console.log(window.outerHeight);
```

provides the outer browser window height.

Again:

```text
innerHeight
→ viewport

outerHeight
→ outer browser window
```

Do not use these interchangeably.

---

# 12. Why `innerWidth` Is Usually More Useful for Web Layout

If your question is:

> "How much horizontal space does the webpage currently have?"

you generally care about:

```javascript
window.innerWidth;
```

not:

```javascript
screen.width;
```

For example, a responsive component might care about:

```javascript
const width = window.innerWidth;
```

because the viewport determines how the page is currently laid out.

However, CSS media queries should usually handle purely visual responsive behavior.

---

# 13. `window.devicePixelRatio`

The browser exposes:

```javascript
window.devicePixelRatio;
```

This represents the relationship between CSS pixels and device pixels.

For example:

```javascript
console.log(window.devicePixelRatio);
```

might return:

```text
1
```

or:

```text
2
```

or another value.

A value of `2` roughly means:

```text
1 CSS pixel
≈
2 physical device pixels
```

in each dimension, though the exact relationship depends on the display and browser environment.

---

# 14. Why `devicePixelRatio` Matters

It is especially important when working with:

* Canvas.
* High-resolution graphics.
* Screenshots.
* Pixel-sensitive rendering.
* Retina/high-density displays.

For example:

```javascript
const ratio = window.devicePixelRatio;
```

can be used when configuring a canvas.

---

# 15. CSS Pixels vs Device Pixels

This distinction is critical.

Suppose:

```text
devicePixelRatio = 2
```

A canvas displayed as:

```text
500 × 300 CSS pixels
```

may need a backing resolution closer to:

```text
1000 × 600 device pixels
```

to render sharply.

A simplified model:

```text
CSS layout
500 × 300
     ↓
devicePixelRatio = 2
     ↓
physical/backing resolution
1000 × 600
```

This is why canvas implementations often account for device pixel ratio.

---

# 16. `window.location`

The `location` property points to the current `Location` object.

Example:

```javascript
console.log(window.location);
```

It contains URL-related information such as:

```javascript
location.href;
location.origin;
location.protocol;
location.host;
location.hostname;
location.port;
location.pathname;
location.search;
location.hash;
```

The `Location` object has its own dedicated file:

```text
04-location-object.md
```

---

# 17. Why `location` Is a Window Property

The current URL belongs to the current browsing context.

Therefore:

```text
window
  ↓
location
  ↓
current URL
```

For example:

```javascript
console.log(location.pathname);
```

might return:

```text
/projects
```

And:

```javascript
console.log(location.search);
```

might return:

```text
?page=2
```

---

# 18. `window.history`

The `history` property exposes the session history object.

Example:

```javascript
console.log(window.history);
```

You can inspect:

```javascript
history.length;
```

and use its methods:

```javascript
history.back();
history.forward();
history.go(-1);
```

The detailed History API is covered separately.

The important distinction is:

```text
history
→ navigation history

location
→ current URL
```

---

# 19. `history.length`

Example:

```javascript
console.log(window.history.length);
```

This gives information about the number of entries in the current session history for the browsing context.

Do not interpret it as:

> "How many pages the user has ever visited."

It refers to the relevant session history, not the browser's entire global browsing history.

---

# 20. `window.navigator`

The `navigator` property references the `Navigator` object.

Example:

```javascript
console.log(window.navigator);
```

Common properties include:

```javascript
navigator.language;
navigator.languages;
navigator.onLine;
navigator.userAgent;
navigator.platform;
```

The object also exposes capabilities such as:

```javascript
navigator.clipboard;
navigator.geolocation;
```

when available.

---

# 21. `navigator.language`

Example:

```javascript
console.log(navigator.language);
```

This reports the browser's preferred language setting.

For example:

```text
en-US
```

or:

```text
fr-FR
```

or:

```text
ar
```

This can be useful for:

* Localization.
* Initial language selection.
* Formatting decisions.

But do not treat it as definitive proof of the user's identity, nationality, or physical location.

---

# 22. `navigator.languages`

You can also inspect:

```javascript
console.log(navigator.languages);
```

This can return an ordered list of preferred languages.

For example:

```javascript
[
  "en-US",
  "en",
  "fr"
]
```

Applications can use this information as a hint for localization.

The final language should still be configurable by the user.

---

# 23. `navigator.onLine`

Example:

```javascript
console.log(navigator.onLine);
```

This returns a boolean.

```text
true
```

or:

```text
false
```

However:

> `navigator.onLine === true` does not guarantee that your backend is reachable.

The browser's online status is a connectivity signal, not an API health check.

---

# 24. `navigator.userAgent`

Example:

```javascript
console.log(navigator.userAgent);
```

This returns a browser user-agent string.

It can contain information about:

* Browser engine.
* Browser family.
* Operating system.
* Compatibility identifiers.

However:

> User-agent strings should not be treated as a reliable security mechanism.

Modern web development generally prefers feature detection over parsing user-agent strings.

---

# 25. `navigator.platform`

Example:

```javascript
console.log(navigator.platform);
```

Historically, this was used to infer the operating-system platform.

Modern applications should avoid depending heavily on it because browser privacy changes and compatibility behavior can affect what is exposed.

Prefer capability detection when your real goal is determining whether a feature exists.

---

# 26. `window.screen`

The `screen` property references the `Screen` object.

Example:

```javascript
console.log(window.screen);
```

Common properties include:

```javascript
screen.width;
screen.height;
screen.availWidth;
screen.availHeight;
screen.colorDepth;
screen.pixelDepth;
```

---

# 27. `screen.width`

Example:

```javascript
console.log(screen.width);
```

This generally represents the screen width in CSS pixels.

It is not necessarily the browser viewport width.

For example:

```text
screen.width   = 1920
window.innerWidth = 1200
```

is completely possible.

---

# 28. `screen.height`

Likewise:

```javascript
console.log(screen.height);
```

represents the screen height in CSS pixels.

Again:

```text
screen.height
≠
window.innerHeight
```

The first describes the display environment.

The second describes the viewport.

---

# 29. `screen.availWidth`

Example:

```javascript
console.log(screen.availWidth);
```

This represents the width available to the window within the screen's available area, accounting for certain operating-system UI such as reserved desktop areas.

Exact values depend on the operating system and browser.

It is generally less useful for ordinary responsive web design than viewport measurements.

---

# 30. `screen.availHeight`

Similarly:

```javascript
console.log(screen.availHeight);
```

provides the available screen height.

Again, this should not be confused with:

```javascript
window.innerHeight;
```

For web layout, the viewport is generally more relevant.

---

# 31. `screen.colorDepth`

Example:

```javascript
console.log(screen.colorDepth);
```

This provides information about the screen's color depth.

Historically, web applications sometimes used such information for capability decisions.

Modern applications rarely need to make important UI decisions based on this property.

---

# 32. `screen.pixelDepth`

Example:

```javascript
console.log(screen.pixelDepth);
```

This provides pixel-depth information.

In many modern browser environments:

```text
colorDepth
```

and:

```text
pixelDepth
```

may return the same value.

These properties are generally less important for modern frontend development than:

```text
innerWidth
innerHeight
devicePixelRatio
```

---

# 33. `window.document`

The `document` property references the current document.

Example:

```javascript
console.log(window.document);
```

Usually:

```javascript
console.log(document);
```

is used instead.

Important properties of `document` include:

```javascript
document.title;
document.body;
document.documentElement;
```

and methods such as:

```javascript
document.querySelector();
document.createElement();
```

These are DOM concepts rather than BOM-specific functionality.

---

# 34. `window.performance`

The `performance` property provides access to performance-related APIs.

Example:

```javascript
console.log(window.performance);
```

You can use:

```javascript
performance.now();
```

for high-resolution timing.

For example:

```javascript
const start = performance.now();

// Work to measure.

const end = performance.now();

console.log(`Elapsed: ${end - start} ms`);
```

This is more appropriate for performance measurement than relying on `Date.now()` for high-resolution intervals.

---

# 35. `window.localStorage`

Example:

```javascript
console.log(window.localStorage);
```

You can store:

```javascript
localStorage.setItem(
  "theme",
  "dark"
);
```

and retrieve:

```javascript
const theme = localStorage.getItem("theme");
```

Remember:

```text
localStorage
→ browser-managed client storage
```

It is not:

```text
database
```

and it is not:

```text
secure secret storage
```

---

# 36. `window.sessionStorage`

Similarly:

```javascript
console.log(window.sessionStorage);
```

provides session-scoped browser storage.

Example:

```javascript
sessionStorage.setItem(
  "draft",
  "Osama Abu Motlaq"
);
```

It is accessible to JavaScript running in the relevant origin.

Therefore, it should not be treated as a protected secrets vault.

---

# 37. `window.length`

The `window.length` property is related to the number of child browsing contexts, such as iframes, associated with the window.

For example:

```html
<iframe src="/one.html"></iframe>
<iframe src="/two.html"></iframe>
```

Then:

```javascript
console.log(window.length);
```

may report:

```text
2
```

This is mostly useful when reasoning about frames and browsing contexts.

It is not a measure of:

```text
DOM elements
```

or:

```text
browser tabs
```

---

# 38. `window.name`

The browser also provides:

```javascript
window.name;
```

The value can be associated with the browsing context.

For example:

```javascript
window.name = "project-window";
```

This can be useful in specialized window/frame workflows.

However, developers should not treat `window.name` as a secure data store.

Do not place secrets in it.

---

# 39. `window.closed`

For a reference to another window:

```javascript
const popup = window.open(
  "https://example.com"
);
```

you can inspect:

```javascript
console.log(popup?.closed);
```

This can indicate whether that referenced browsing context has been closed.

This is mainly relevant to:

* Popups.
* Separate windows.
* Cross-window workflows.

---

# 40. `window.opener`

A newly opened page may have access to:

```javascript
window.opener;
```

representing the window that opened it, subject to browser and security behavior.

This relationship matters for:

* Popups.
* External links.
* Cross-window communication.
* Security.

For external links opened in a new browsing context, consider:

```html
<a
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
>
  Open
</a>
```

---

# 41. `window.parent`

For a document inside an iframe:

```javascript
window.parent;
```

refers to its parent browsing context.

If the current page is the top-level page:

```javascript
window.parent === window;
```

is normally true.

Cross-origin restrictions determine what properties and methods can actually be accessed.

---

# 42. `window.top`

The `top` property refers to the top-level browsing context.

Example:

```javascript
window.top;
```

In a normal top-level page:

```javascript
window.top === window;
```

is normally true.

Inside nested frames:

```text
top
 ↓
parent
 ↓
current frame
```

These relationships are useful for understanding embedded documents.

---

# 43. `window.self`

`self` refers to the current browsing context's global object.

For a normal browser window:

```javascript
window.self === window;
```

is normally true.

The property is also conceptually useful because `self` is not tied exclusively to the `Window` interface in the broader web platform.

---

# 44. `window.origin`

A browsing context also exposes origin-related information.

For example:

```javascript
window.origin;
```

may produce something like:

```text
https://example.com
```

However, when working with URLs, the more commonly encountered form is:

```javascript
location.origin;
```

The important concept is the origin tuple:

```text
scheme + host + port
```

This is central to browser security.

---

# 45. `window.isSecureContext`

Modern browsers expose:

```javascript
window.isSecureContext;
```

which indicates whether the current environment is a secure context.

Example:

```javascript
console.log(window.isSecureContext);
```

Possible result:

```text
true
```

or:

```text
false
```

This matters because some browser capabilities require secure contexts.

---

# 46. Why Secure Contexts Matter

Some APIs are restricted unless the page is in a secure context.

Examples include capabilities involving:

* Geolocation.
* Clipboard.
* Service workers.
* Other powerful browser features.

In production, this generally means:

```text
HTTPS
```

should be used.

Developers should check the requirements of each individual API rather than assuming that every browser feature has identical security requirements.

---

# 47. `window.originAgentCluster`

Modern browsers can expose:

```javascript
window.originAgentCluster;
```

This property relates to whether the current page is operating within an origin-keyed agent cluster.

This is an advanced browser-platform concept involving isolation and execution contexts.

Most frontend developers will rarely need to use it directly.

The important lesson is:

> The browser's execution model contains isolation boundaries deeper than the DOM alone.

---

# 48. `window.crossOriginIsolated`

Another advanced property is:

```javascript
window.crossOriginIsolated;
```

Example:

```javascript
console.log(window.crossOriginIsolated);
```

It indicates whether the page is operating in a cross-origin-isolated environment.

This is relevant to advanced capabilities such as:

* `SharedArrayBuffer` in supported contexts.
* High-performance browser workloads.
* Stronger cross-origin isolation requirements.

This is specialized knowledge rather than a daily frontend property.

---

# 49. `window.name` Is Not Secure Storage

Although:

```javascript
window.name;
```

can store a string associated with the browsing context, never use it for secrets.

Anything associated with client-side JavaScript should be considered potentially inspectable.

Security-sensitive state belongs on trusted server infrastructure.

---

# 50. `window.crypto`

Browsers expose cryptographic capabilities through:

```javascript
window.crypto;
```

For example:

```javascript
crypto.randomUUID();
```

can generate a UUID.

More advanced functionality is available through:

```javascript
crypto.subtle;
```

for Web Crypto operations.

This is browser API functionality rather than ordinary JavaScript language functionality.

Important:

> Cryptographic APIs do not make client-side secrets secret.

They provide cryptographic operations, not a secure place to hide keys from the user.

---

# 51. `window.visualViewport`

Modern browsers can expose:

```javascript
window.visualViewport;
```

which represents information about the **visual viewport**.

This is especially relevant on mobile devices where:

* The virtual keyboard opens.
* Browser UI changes available visual space.
* Zooming changes the visual viewport.

Example:

```javascript
console.log(window.visualViewport?.height);
```

This differs conceptually from:

```javascript
window.innerHeight;
```

---

# 52. Layout Viewport vs Visual Viewport

This distinction is important for mobile web development.

### Layout viewport

```javascript
window.innerWidth;
window.innerHeight;
```

generally relates to the layout viewport.

### Visual viewport

```javascript
window.visualViewport;
```

represents the portion of the page currently visually visible to the user, especially under zooming or on-screen keyboard interactions.

A simplified model:

```text
Layout viewport
┌───────────────────────────────┐
│                               │
│     page layout               │
│                               │
│    ┌───────────────────┐      │
│    │ Visual viewport   │      │
│    │ visible region   │      │
│    └───────────────────┘      │
│                               │
└───────────────────────────────┘
```

This becomes important for mobile UI that must react precisely to the visible area.

---

# 53. `visualViewport` Events

The Visual Viewport API can expose events such as:

```javascript
window.visualViewport?.addEventListener(
  "resize",
  handleResize
);
```

and:

```javascript
window.visualViewport?.addEventListener(
  "scroll",
  handleScroll
);
```

This can be useful for advanced mobile UI interactions.

Do not use it when ordinary CSS layout is sufficient.

---

# 54. `window.matchMedia()`

Although `matchMedia()` is a method rather than a property, the returned object is useful enough to mention alongside window state.

For example:

```javascript
const darkMode = window.matchMedia(
  "(prefers-color-scheme: dark)"
);

console.log(darkMode.matches);
```

You can also listen for changes:

```javascript
darkMode.addEventListener(
  "change",
  (event) => {
    console.log(event.matches);
  }
);
```

This is a good example of JavaScript observing a browser environment capability.

---

# 55. Avoid Using Browser Properties for Pure CSS Problems

Suppose you want:

```text
Desktop layout
→ large spacing

Mobile layout
→ smaller spacing
```

Do not automatically write:

```javascript
if (window.innerWidth < 768) {
  // Change every style manually.
}
```

Prefer CSS:

```css
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
}
```

Use JavaScript window properties when behavior genuinely depends on the value.

---

# 56. Window Properties Are Usually Read-Only Signals

Many useful `window` properties are values that your application reads.

For example:

```javascript
window.innerWidth;
window.innerHeight;
window.devicePixelRatio;
navigator.language;
screen.width;
```

Do not assume that every property is something your application should modify.

Some properties are writable or have setters, but changing browser-managed state is often restricted or semantically inappropriate.

---

# 57. Read vs Control

A useful distinction is:

```text
Read browser state
```

versus:

```text
Control browser behavior
```

Examples:

### Read

```javascript
window.innerWidth;
window.scrollY;
navigator.language;
screen.width;
```

### Control

```javascript
location.href = "/projects";
history.pushState(...);
window.scrollTo(...);
localStorage.setItem(...);
```

Methods and writable properties often perform actions, while many properties simply expose current state.

---

# 58. Avoid Assuming Values Are Static

Properties such as:

```javascript
window.innerWidth;
window.innerHeight;
window.scrollY;
```

can change over time.

For example:

```javascript
console.log(window.innerWidth);
```

does not mean:

> This value will remain the same for the lifetime of the page.

The browser can change it because of:

* Resizing.
* Orientation changes.
* Browser UI changes.
* Zooming.
* Mobile keyboards.
* Navigation or layout changes.

Use events when you need to react to changes.

---

# 59. Window Properties and Events Work Together

A common browser pattern is:

```text
Read property
     ↓
Listen for change
     ↓
Read updated property
     ↓
React
```

For example:

```javascript
function handleResize() {
  console.log(window.innerWidth);
}

window.addEventListener(
  "resize",
  handleResize
);
```

The `resize` event tells you something changed.

Then:

```javascript
window.innerWidth
```

provides the latest value.

This pattern appears throughout browser development.

---

# 60. Example: Responsive JavaScript Behavior

Suppose a real application needs to know whether a sidebar should be considered compact.

```javascript
function isCompactViewport() {
  return window.innerWidth < 768;
}

console.log(isCompactViewport());
```

React version:

```jsx
import { useEffect, useState } from "react";

function SidebarState() {
  const [isCompact, setIsCompact] = useState(
    () => window.innerWidth < 768
  );

  useEffect(() => {
    function handleResize() {
      setIsCompact(window.innerWidth < 768);
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

  return (
    <p>
      {isCompact
        ? "Compact viewport"
        : "Large viewport"}
    </p>
  );
}
```

This is appropriate only when JavaScript actually needs the state.

CSS should remain responsible for purely visual responsive behavior.

---

# 61. Example: Detect Browser Language

```javascript
function getPreferredLanguage() {
  return navigator.language;
}

console.log(
  getPreferredLanguage()
);
```

A more complete approach can inspect:

```javascript
navigator.languages;
```

and select a supported application language.

However, user preferences should normally be stored explicitly once the user chooses a language.

Browser preferences are useful defaults, not permanent authority.

---

# 62. Example: Read Scroll Position

```javascript
function getScrollPosition() {
  return {
    x: window.scrollX,
    y: window.scrollY
  };
}

console.log(getScrollPosition());
```

Useful for:

* Scroll restoration.
* Scroll-aware UI.
* Animation.
* Reading the current page position.

For frequently fired scroll events, avoid expensive work on every event.

---

# 63. Example: Detect Secure Context

```javascript
if (window.isSecureContext) {
  console.log("Secure context");
}
```

This can be useful before calling browser APIs that have secure-context requirements.

Still, check the specific API documentation because secure context is only one of the possible requirements.

---

# 64. Example: Inspect Device Pixel Ratio

```javascript
function getPixelRatio() {
  return window.devicePixelRatio || 1;
}

console.log(
  getPixelRatio()
);
```

A fallback can be useful when code must tolerate environments with unusual behavior.

For most modern browsers, `devicePixelRatio` is available.

---

# 65. Example: Determine the Visual Viewport

```javascript
function getVisibleViewport() {
  const viewport = window.visualViewport;

  if (!viewport) {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  return {
    width: viewport.width,
    height: viewport.height
  };
}
```

This pattern is useful in advanced mobile interfaces.

Do not introduce it into ordinary layouts without a real need.

---

# 66. Window Properties and Next.js

When using Next.js, remember:

```text
Server
  ↓
No browser window

Client
  ↓
window exists
```

Therefore:

```javascript
const width = window.innerWidth;
```

should not be assumed safe during server execution.

A client boundary may be appropriate:

```jsx
"use client";

import { useEffect, useState } from "react";

export default function ViewportInfo() {
  const [width, setWidth] = useState(null);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <p>
      {width ?? "Detecting viewport..."}
    </p>
  );
}
```

The exact architecture should reflect whether the value is truly needed for client-side behavior.

---

# 67. Hydration Considerations

Suppose server rendering produces:

```text
Large viewport
```

but the browser immediately determines:

```text
Small viewport
```

Rendering different initial content based on browser-only values can produce hydration problems if the server and client output do not match.

This is one reason:

> Browser-dependent state should be introduced carefully in server-rendered React applications.

Often you initialize a stable server-compatible UI and update it after hydration.

---

# 68. Prefer CSS Over Hydration-Sensitive Viewport Logic

If your only goal is:

```text
desktop → layout A
mobile → layout B
```

use CSS.

This avoids:

* Server/client mismatch.
* Extra JavaScript.
* Resize listeners.
* Unnecessary state.
* Hydration complexity.

This is one of the most important practical lessons for Next.js developers.

---

# 69. Window Properties and Performance

Reading a browser property is not automatically expensive.

The important issue is how and when you read it.

Some measurements can cause the browser to perform style or layout calculations when mixed with DOM writes.

For example:

```javascript
element.style.width = "500px";

console.log(element.offsetWidth);
```

may force layout work.

This is a DOM/layout issue rather than a generic rule that "window properties are slow."

Measure real performance problems.

---

# 70. Avoid Excessive Resize Handlers

Bad:

```javascript
window.addEventListener("resize", () => {
  // Heavy work.
});
```

if the handler performs expensive operations continuously.

Better:

```javascript
let scheduled = false;

window.addEventListener("resize", () => {
  if (scheduled) {
    return;
  }

  scheduled = true;

  requestAnimationFrame(() => {
    scheduled = false;

    updateLayout();
  });
});
```

Use the simplest suitable strategy.

---

# 71. Common Mistakes

## Mistake 1: Confusing `screen.width` with `window.innerWidth`

They represent different things.

---

## Mistake 2: Confusing viewport with document size

The viewport is the visible/layout area.

The document may be much larger because of scrolling.

---

## Mistake 3: Using JavaScript for CSS-only responsiveness

Prefer CSS media queries.

---

## Mistake 4: Assuming browser properties are static

Viewport and scroll values can change.

---

## Mistake 5: Trusting `navigator` for security

Browser-reported values can be modified or spoofed.

---

## Mistake 6: Using `screen` values for ordinary responsive layout

Use viewport information or CSS.

---

## Mistake 7: Accessing `window` during server rendering

Browser globals are not available in ordinary server environments.

---

## Mistake 8: Assuming `innerWidth` exactly equals the CSS layout available in every edge case

Browser UI, scrollbars, zooming, mobile behavior, and viewport concepts can complicate measurements.

---

## Mistake 9: Running expensive code on every `resize` or `scroll`

These events can fire frequently.

---

## Mistake 10: Treating browser properties as trusted data

Client-side browser state is user-controlled.

---

# 72. Best Practices

## 1. Know what each measurement represents

Before using:

```javascript
window.innerWidth;
screen.width;
document.documentElement.clientWidth;
```

understand the difference.

---

## 2. Prefer CSS for presentation

Use JavaScript when behavior requires browser information.

---

## 3. React to changing properties through appropriate events

For example:

```text
resize
scroll
online
offline
```

---

## 4. Clean up event listeners

Especially in React:

```javascript
return () => {
  window.removeEventListener(
    "resize",
    handleResize
  );
};
```

---

## 5. Avoid browser detection when capability detection works

Prefer:

```javascript
if ("clipboard" in navigator) {
  // ...
}
```

---

## 6. Keep server/client boundaries clear

Do not assume browser properties exist during server rendering.

---

## 7. Do not expose sensitive information through global browser objects

Everything on the client is potentially inspectable.

---

## 8. Measure before optimizing

Do not rewrite code based on assumptions about browser performance.

---

# 73. Quick Reference

| Property                     | Purpose                               |
| ---------------------------- | ------------------------------------- |
| `window.innerWidth`          | Viewport width                        |
| `window.innerHeight`         | Viewport height                       |
| `window.outerWidth`          | Outer browser window width            |
| `window.outerHeight`         | Outer browser window height           |
| `window.scrollX`             | Horizontal scroll offset              |
| `window.scrollY`             | Vertical scroll offset                |
| `window.pageXOffset`         | Alias for horizontal scroll offset    |
| `window.pageYOffset`         | Alias for vertical scroll offset      |
| `window.devicePixelRatio`    | CSS pixel / device pixel relationship |
| `window.location`            | Current URL/navigation object         |
| `window.history`             | Session history object                |
| `window.navigator`           | Browser information and capabilities  |
| `window.screen`              | Display information                   |
| `window.document`            | Current document / DOM                |
| `window.performance`         | Performance APIs                      |
| `window.localStorage`        | Persistent client-side storage        |
| `window.sessionStorage`      | Session-scoped client storage         |
| `window.length`              | Number of child browsing contexts     |
| `window.name`                | Browsing-context name                 |
| `window.closed`              | Whether a referenced window is closed |
| `window.opener`              | Opening browsing context reference    |
| `window.parent`              | Parent browsing context               |
| `window.top`                 | Top-level browsing context            |
| `window.self`                | Current browsing context global       |
| `window.origin`              | Current origin information            |
| `window.isSecureContext`     | Whether the context is secure         |
| `window.crossOriginIsolated` | Cross-origin isolation state          |
| `window.visualViewport`      | Visual viewport object                |
| `window.crypto`              | Browser cryptography APIs             |

---

# 74. Measurement Comparison

| Measurement               | Describes                     |
| ------------------------- | ----------------------------- |
| `window.innerWidth`       | Layout viewport width         |
| `window.innerHeight`      | Layout viewport height        |
| `screen.width`            | Screen width                  |
| `screen.height`           | Screen height                 |
| `window.outerWidth`       | Browser window outer width    |
| `window.outerHeight`      | Browser window outer height   |
| `window.scrollX`          | Horizontal scroll offset      |
| `window.scrollY`          | Vertical scroll offset        |
| `window.devicePixelRatio` | CSS/device pixel relationship |
| `visualViewport.width`    | Visual viewport width         |
| `visualViewport.height`   | Visual viewport height        |

---

# 75. The Most Important Distinction

When working with browser dimensions, remember:

```text
Screen
  ↓
Physical display environment

Browser Window
  ↓
Outer browser window

Layout Viewport
  ↓
Area used for page layout

Visual Viewport
  ↓
Area currently visible to the user

Document
  ↓
Entire page content
```

These are different concepts.

A strong frontend developer does not treat all "width" values as interchangeable.

---

# 76. Window Properties and React

The most useful properties for React developers are often:

```javascript
window.innerWidth;
window.innerHeight;
window.scrollY;
window.devicePixelRatio;
window.location;
window.history;
window.matchMedia(...);
window.localStorage;
window.sessionStorage;
```

They commonly appear in:

* Responsive behavior.
* Scroll-aware UI.
* Theme preferences.
* Routing.
* Client-side state persistence.
* Browser integrations.

But React does not make these values automatically reactive.

If a value changes, you must subscribe to the relevant browser event or API.

For example:

```jsx
useEffect(() => {
  function handleResize() {
    setWidth(window.innerWidth);
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

---

# 77. Window Properties and Next.js

The most important lesson for Next.js is:

```text
Browser property
      ↓
Client-side concern
```

Examples:

```javascript
window.innerWidth;
window.location;
window.localStorage;
window.navigator;
```

These should not be assumed to exist during server execution.

When a value is purely visual, prefer CSS.

When JavaScript truly needs the value:

```text
Server-compatible initial state
        ↓
Client hydration
        ↓
Browser value
        ↓
State update
```

This avoids unnecessary hydration problems.

---

# 78. A Practical Decision Guide

### Need webpage width?

Usually:

```javascript
window.innerWidth
```

or preferably CSS if the need is only visual.

### Need screen width?

```javascript
screen.width
```

### Need current scroll position?

```javascript
window.scrollY
```

### Need high-density display information?

```javascript
window.devicePixelRatio
```

### Need current URL?

```javascript
window.location
```

### Need navigation history?

```javascript
window.history
```

### Need browser language?

```javascript
navigator.language
```

### Need persistent client storage?

```javascript
localStorage
```

### Need session-scoped client storage?

```javascript
sessionStorage
```

### Need performance timing?

```javascript
performance.now()
```

### Need to know whether a powerful browser API can be used?

Check:

```javascript
window.isSecureContext
```

and the API's specific requirements.

### Need pure responsive styling?

Prefer CSS.

---

# 79. Final Mental Model

Think about the main properties this way:

```text
window
│
├── Viewport
│   ├── innerWidth
│   ├── innerHeight
│   ├── scrollX
│   ├── scrollY
│   └── devicePixelRatio
│
├── Browser state
│   ├── location
│   ├── history
│   ├── navigator
│   └── screen
│
├── Storage
│   ├── localStorage
│   └── sessionStorage
│
├── Page
│   └── document
│
├── Runtime
│   ├── performance
│   ├── crypto
│   └── visualViewport
│
└── Browsing contexts
    ├── parent
    ├── top
    ├── self
    ├── opener
    └── frames
```

The central idea is:

> **Window properties are observations about the browser environment. Before using one, understand exactly what it measures, whether it can change, and whether CSS or another browser API is a better solution.**

# Key Takeaways

* `window` exposes many properties describing the browser environment.
* `innerWidth` and `innerHeight` generally describe the layout viewport.
* `outerWidth` and `outerHeight` describe the outer browser window.
* `screen.width` and `screen.height` describe the display environment, not the webpage viewport.
* `scrollX` and `scrollY` describe the current document scroll offset.
* `devicePixelRatio` describes the relationship between CSS pixels and device pixels.
* `visualViewport` provides additional information about the currently visible visual viewport, especially useful for advanced mobile scenarios.
* `location`, `history`, `navigator`, `screen`, `document`, `performance`, and storage are important window-associated objects.
* `navigator.language` and related browser information are useful hints, not trusted identity or security information.
* `isSecureContext` helps determine whether the current context is secure enough for APIs that require secure contexts.
* `parent`, `top`, `self`, `opener`, and `frames` describe relationships between browsing contexts.
* Same-origin restrictions limit cross-window access.
* Browser values can change, so use events when your application needs to react to changes.
* Use CSS for presentation whenever CSS can solve the problem.
* In React, browser properties usually become state through subscriptions to browser events.
* In Next.js, browser properties belong to the client environment and must be handled carefully around server rendering and hydration.
* Do not use browser properties as trusted security inputs.
* Do not memorize every property; learn how to select the right measurement for the problem.

The central principle is:

> **Use the window property that represents the exact browser concept you need—viewport, screen, scroll position, browsing context, or browser state—and do not confuse one measurement with another.**
