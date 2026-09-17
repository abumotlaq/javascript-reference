"use strict";

// Window object
console.log("Window:", window);

// Global object
console.log("GlobalThis:", globalThis);

console.log(
"window === globalThis:",
window === globalThis
);

// Document
console.log("Document:", window.document);
console.log("Body:", window.document.body);
console.log(
"Document title:",
window.document.title
);

// Current URL
console.log(
"Current URL:",
window.location.href
);

console.log(
"Current origin:",
window.location.origin
);

// Browser history
console.log(
"History length:",
window.history.length
);

// Navigator
console.log(
"Browser language:",
window.navigator.language
);

console.log(
"Browser languages:",
window.navigator.languages
);

console.log(
"Online status:",
window.navigator.onLine
);

// Screen
console.log(
"Screen width:",
window.screen.width
);

console.log(
"Screen height:",
window.screen.height
);

// Viewport
console.log(
"Viewport width:",
window.innerWidth
);

console.log(
"Viewport height:",
window.innerHeight
);

// Outer window dimensions
console.log(
"Outer width:",
window.outerWidth
);

console.log(
"Outer height:",
window.outerHeight
);

// Scroll position
console.log(
"Scroll X:",
window.scrollX
);

console.log(
"Scroll Y:",
window.scrollY
);

// Page offsets
console.log(
"Page X offset:",
window.pageXOffset
);

console.log(
"Page Y offset:",
window.pageYOffset
);

// Device pixel ratio
console.log(
"Device pixel ratio:",
window.devicePixelRatio
);

// Secure context
console.log(
"Secure context:",
window.isSecureContext
);

// Window name
console.log(
"Window name:",
window.name
);

// Window state
console.log(
"Window closed:",
window.closed
);

console.log(
"Window self:",
window.self
);

console.log(
"window.self === window:",
window.self === window
);

// Top-level browsing context
console.log(
"Window top:",
window.top
);

console.log(
"window.top === window:",
window.top === window
);

// Parent browsing context
console.log(
"Window parent:",
window.parent
);

console.log(
"window.parent === window:",
window.parent === window
);

// Open windows or frames count
console.log(
"Window frame count:",
window.length
);

// Current origin
console.log(
"Window origin:",
window.origin
);

// Storage objects
console.log(
"Local storage:",
window.localStorage
);

console.log(
"Session storage:",
window.sessionStorage
);

// Performance object
console.log(
"Performance:",
window.performance
);

// Crypto object
console.log(
"Crypto:",
window.crypto
);

// Visual viewport
console.log(
"Visual viewport:",
window.visualViewport
);

if (window.visualViewport) {
console.log(
"Visual viewport width:",
window.visualViewport.width
);

console.log(
"Visual viewport height:",
window.visualViewport.height
);

console.log(
"Visual viewport scale:",
window.visualViewport.scale
);
}

// MatchMedia
const darkModeQuery = window.matchMedia(
"(prefers-color-scheme: dark)"
);

console.log(
"Prefers dark mode:",
darkModeQuery.matches
);

const mobileQuery = window.matchMedia(
"(max-width: 768px)"
);

console.log(
"Mobile viewport:",
mobileQuery.matches
);

// User preference for reduced motion
const reducedMotionQuery = window.matchMedia(
"(prefers-reduced-motion: reduce)"
);

console.log(
"Prefers reduced motion:",
reducedMotionQuery.matches
);

// User preference for contrast
const highContrastQuery = window.matchMedia(
"(prefers-contrast: more)"
);

console.log(
"Prefers higher contrast:",
highContrastQuery.matches
);

// Resize listener
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

// Scroll listener
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

// Online and offline state
window.addEventListener("online", () => {
console.log("Browser is online.");
});

window.addEventListener("offline", () => {
console.log("Browser is offline.");
});

// Focus and blur
window.addEventListener("focus", () => {
console.log("Window focused.");
});

window.addEventListener("blur", () => {
console.log("Window lost focus.");
});

// Page visibility
document.addEventListener(
"visibilitychange",
() => {
console.log(
"Document hidden:",
document.hidden
);
}
);

// Timeout
const timeoutId = window.setTimeout(() => {
console.log("Timeout executed.");
}, 1000);

console.log(
"Timeout ID:",
timeoutId
);

// Cancel timeout
const cancelableTimeout = window.setTimeout(() => {
console.log("This message should not appear.");
}, 3000);

window.clearTimeout(cancelableTimeout);

// Interval
let intervalCount = 0;

const intervalId = window.setInterval(() => {
intervalCount++;

console.log(
"Interval count:",
intervalCount
);

if (intervalCount === 3) {
window.clearInterval(intervalId);
console.log("Interval cleared.");
}
}, 1000);

// Request animation frame
const frameId = window.requestAnimationFrame(
(timestamp) => {
console.log(
"Animation frame:",
timestamp
);
}
);

console.log(
"Animation frame ID:",
frameId
);

// Cancel animation frame
const cancelableFrame =
window.requestAnimationFrame(() => {
console.log(
"This animation frame should not run."
);
});

window.cancelAnimationFrame(
cancelableFrame
);

// Selection
const selection = window.getSelection();

console.log(
"Current selection:",
selection
);

// Computed style
const bodyStyles = window.getComputedStyle(
document.body
);

console.log(
"Body display:",
bodyStyles.display
);

console.log(
"Body font family:",
bodyStyles.fontFamily
);

// Window relationship
console.log(
"Opener:",
window.opener
);

console.log(
"Parent:",
window.parent
);

console.log(
"Top:",
window.top
);

// Referring page
console.log(
"Referrer:",
document.referrer
);

// Global functions exposed through window
console.log(
"parseInt:",
window.parseInt("25", 10)
);

console.log(
"parseFloat:",
window.parseFloat("25.75")
);

console.log(
"isNaN:",
window.isNaN("hello")
);

console.log(
"isFinite:",
window.isFinite(100)
);

// Global object properties
window.projectName = "JavaScript Reference";

console.log(
"Project name:",
window.projectName
);

console.log(
"Global project name:",
globalThis.projectName
);

// Global function
window.sayHello = function () {
return "Hello, Osama Abu Motlaq!";
};

console.log(
"Global function:",
window.sayHello()
);

// Check whether a property exists
console.log(
"Has projectName:",
"projectName" in window
);

console.log(
"Has localStorage:",
"localStorage" in window
);

console.log(
"Has Notification:",
"Notification" in window
);

console.log(
"Has geolocation:",
"geolocation" in navigator
);

// Window dimensions snapshot
const dimensions = {
innerWidth: window.innerWidth,
innerHeight: window.innerHeight,
outerWidth: window.outerWidth,
outerHeight: window.outerHeight,
};

console.log(
"Window dimensions:",
dimensions
);

// Environment summary
const environment = {
language: navigator.language,
online: navigator.onLine,
viewportWidth: window.innerWidth,
viewportHeight: window.innerHeight,
screenWidth: screen.width,
screenHeight: screen.height,
devicePixelRatio: window.devicePixelRatio,
secureContext: window.isSecureContext,
};

console.log(
"Environment:",
environment
);
