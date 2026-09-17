"use strict";

// DOMContentLoaded
document.addEventListener(
"DOMContentLoaded",
() => {
console.log(
"DOM fully loaded and parsed."
);
}
);

// Window load
window.addEventListener(
"load",
() => {
console.log(
"Window and page resources loaded."
);
}
);

// Before unload
window.addEventListener(
"beforeunload",
(event) => {
const hasUnsavedChanges = false;

```
if (!hasUnsavedChanges) {
  return;
}

event.preventDefault();
event.returnValue = "";
```

}
);

// Page resize
function handleResize() {
console.log(
"Window resized:",
window.innerWidth,
window.innerHeight
);
}

window.addEventListener(
"resize",
handleResize
);

// Page scroll
function handleScroll() {
console.log(
"Scroll position:",
window.scrollX,
window.scrollY
);
}

window.addEventListener(
"scroll",
handleScroll,
{ passive: true }
);

// Online
window.addEventListener(
"online",
() => {
console.log(
"Browser is online."
);
}
);

// Offline
window.addEventListener(
"offline",
() => {
console.log(
"Browser is offline."
);
}
);

// Visibility change
document.addEventListener(
"visibilitychange",
() => {
if (document.hidden) {
console.log(
"Page is now hidden."
);
} else {
console.log(
"Page is now visible."
);
}
}
);

// Focus
window.addEventListener(
"focus",
() => {
console.log(
"Window received focus."
);
}
);

// Blur
window.addEventListener(
"blur",
() => {
console.log(
"Window lost focus."
);
}
);

// Hash change
window.addEventListener(
"hashchange",
(event) => {
console.log(
"Hash changed:"
);

```
console.log(
  "Old URL:",
  event.oldURL
);

console.log(
  "New URL:",
  event.newURL
);

console.log(
  "Current hash:",
  window.location.hash
);
```

}
);

// Popstate
window.addEventListener(
"popstate",
(event) => {
console.log(
"Popstate event:"
);

```
console.log(
  "State:",
  event.state
);

console.log(
  "Current URL:",
  window.location.href
);
```

}
);

// Storage event
window.addEventListener(
"storage",
(event) => {
console.log(
"Storage event:"
);

```
console.log(
  "Key:",
  event.key
);

console.log(
  "Old value:",
  event.oldValue
);

console.log(
  "New value:",
  event.newValue
);

console.log(
  "URL:",
  event.url
);

console.log(
  "Storage area:",
  event.storageArea
);
```

}
);

// Error event
window.addEventListener(
"error",
(event) => {
console.error(
"Window error:"
);

```
console.error(
  "Message:",
  event.message
);

console.error(
  "Source:",
  event.filename
);

console.error(
  "Line:",
  event.lineno
);

console.error(
  "Column:",
  event.colno
);
```

}
);

// Unhandled Promise rejection
window.addEventListener(
"unhandledrejection",
(event) => {
console.error(
"Unhandled Promise rejection:",
event.reason
);
}
);

// Rejection handled later
window.addEventListener(
"rejectionhandled",
(event) => {
console.log(
"Promise rejection was handled later:",
event.promise
);
}
);

// Page online status snapshot
console.log(
"Initial online status:",
navigator.onLine
);

// Page visibility snapshot
console.log(
"Initial visibility:",
document.visibilityState
);

console.log(
"Document hidden:",
document.hidden
);

// Current focus state
console.log(
"Document has focus:",
document.hasFocus()
);

// Device orientation change
const orientation =
screen.orientation;

if (orientation) {
orientation.addEventListener(
"change",
() => {
console.log(
"Screen orientation changed:",
orientation.type
);

```
  console.log(
    "Orientation angle:",
    orientation.angle
  );
}
```

);
}

// Visual viewport events
if (window.visualViewport) {
window.visualViewport.addEventListener(
"resize",
() => {
console.log(
"Visual viewport resized:",
window.visualViewport.width,
window.visualViewport.height
);
}
);

window.visualViewport.addEventListener(
"scroll",
() => {
console.log(
"Visual viewport scrolled:",
window.visualViewport.offsetLeft,
window.visualViewport.offsetTop
);
}
);
}

// Media query change
const darkModeQuery = window.matchMedia(
"(prefers-color-scheme: dark)"
);

function handleThemeChange(event) {
console.log(
"Color scheme changed:",
event.matches
? "dark"
: "light"
);
}

darkModeQuery.addEventListener(
"change",
handleThemeChange
);

// Reduced motion preference
const reducedMotionQuery =
window.matchMedia(
"(prefers-reduced-motion: reduce)"
);

reducedMotionQuery.addEventListener(
"change",
(event) => {
console.log(
"Reduced motion preference:",
event.matches
);
}
);

// Page event logger
const trackedEvents = [
"focus",
"blur",
"online",
"offline",
"visibilitychange",
];

trackedEvents.forEach((eventName) => {
const target =
eventName === "visibilitychange"
? document
: window;

target.addEventListener(
eventName,
() => {
console.log(
`Tracked event: ${eventName}`
);
}
);
});

// One-time browser event
const onceButton = document.querySelector(
"#once-button"
);

if (onceButton) {
onceButton.addEventListener(
"click",
() => {
console.log(
"This event runs only once."
);
},
{ once: true }
);
}

// Abortable event listeners
const controller =
new AbortController();

function handleAbortableResize() {
console.log(
"Abortable resize listener:"
);

console.log(
window.innerWidth,
window.innerHeight
);
}

window.addEventListener(
"resize",
handleAbortableResize,
{
signal: controller.signal,
}
);

const removeListenersButton =
document.querySelector(
"#remove-browser-listeners"
);

if (removeListenersButton) {
removeListenersButton.addEventListener(
"click",
() => {
controller.abort();

```
  console.log(
    "Abortable listeners removed."
  );
}
```

);
}

// Custom browser event
const profileUpdatedEvent =
new CustomEvent(
"profileUpdated",
{
detail: {
name: "Osama Abu Motlaq",
role: "Frontend Developer",
},
}
);

window.addEventListener(
"profileUpdated",
(event) => {
console.log(
"Profile updated:",
event.detail
);
}
);

const profileButton =
document.querySelector(
"#profile-button"
);

if (profileButton) {
profileButton.addEventListener(
"click",
() => {
window.dispatchEvent(
profileUpdatedEvent
);
}
);
}

// Page state snapshot
const browserState = {
online: navigator.onLine,
visible:
document.visibilityState ===
"visible",
focused: document.hasFocus(),
width: window.innerWidth,
height: window.innerHeight,
url: window.location.href,
};

console.log(
"Browser state:",
browserState
);
