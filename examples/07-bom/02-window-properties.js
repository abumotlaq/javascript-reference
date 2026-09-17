"use strict";

// Window dimensions
console.log("Inner width:", window.innerWidth);
console.log("Inner height:", window.innerHeight);

console.log("Outer width:", window.outerWidth);
console.log("Outer height:", window.outerHeight);

// Scroll position
console.log("Scroll X:", window.scrollX);
console.log("Scroll Y:", window.scrollY);

console.log("Page X offset:", window.pageXOffset);
console.log("Page Y offset:", window.pageYOffset);

// Device pixel ratio
console.log(
"Device pixel ratio:",
window.devicePixelRatio
);

// Screen position
console.log("Screen X:", window.screenX);
console.log("Screen Y:", window.screenY);

console.log(
"Screen left:",
window.screenLeft
);

console.log(
"Screen top:",
window.screenTop
);

// Window name
console.log("Window name:", window.name);

// Window frame count
console.log(
"Window frame count:",
window.length
);

// Window state
console.log(
"Window closed:",
window.closed
);

// Window relationships
console.log(
"Self:",
window.self === window
);

console.log(
"Parent:",
window.parent === window
);

console.log(
"Top:",
window.top === window
);

// Opener
console.log(
"Window opener:",
window.opener
);

// Current origin
console.log(
"Origin:",
window.origin
);

// Secure context
console.log(
"Secure context:",
window.isSecureContext
);

// Cross-origin isolation
console.log(
"Cross-origin isolated:",
window.crossOriginIsolated
);

// Origin agent cluster
console.log(
"Origin agent cluster:",
window.originAgentCluster
);

// Cross-origin opener policy state
console.log(
"Cross-origin opener policy available:",
"crossOriginIsolated" in window
);

// Document
console.log(
"Document:",
window.document
);

console.log(
"Document URL:",
window.document.URL
);

console.log(
"Document title:",
window.document.title
);

// Location
console.log(
"Location:",
window.location.href
);

console.log(
"Location origin:",
window.location.origin
);

console.log(
"Location pathname:",
window.location.pathname
);

// Browser history
console.log(
"History length:",
window.history.length
);

// Navigator
console.log(
"Navigator language:",
window.navigator.language
);

console.log(
"Navigator online:",
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

console.log(
"Available screen width:",
window.screen.availWidth
);

console.log(
"Available screen height:",
window.screen.availHeight
);

// Storage
console.log(
"Local storage available:",
"localStorage" in window
);

console.log(
"Session storage available:",
"sessionStorage" in window
);

// Crypto
console.log(
"Crypto available:",
"crypto" in window
);

// Performance
console.log(
"Performance available:",
"performance" in window
);

// Visual viewport
console.log(
"Visual viewport available:",
"visualViewport" in window
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
"Visual viewport offset left:",
window.visualViewport.offsetLeft
);

console.log(
"Visual viewport offset top:",
window.visualViewport.offsetTop
);

console.log(
"Visual viewport page left:",
window.visualViewport.pageLeft
);

console.log(
"Visual viewport page top:",
window.visualViewport.pageTop
);

console.log(
"Visual viewport scale:",
window.visualViewport.scale
);
}

// Media query properties
const darkMode = window.matchMedia(
"(prefers-color-scheme: dark)"
);

console.log(
"Dark mode preference:",
darkMode.matches
);

const reducedMotion = window.matchMedia(
"(prefers-reduced-motion: reduce)"
);

console.log(
"Reduced motion preference:",
reducedMotion.matches
);

const mobileViewport = window.matchMedia(
"(max-width: 768px)"
);

console.log(
"Mobile viewport:",
mobileViewport.matches
);

// Window property snapshot
const windowProperties = {
innerWidth: window.innerWidth,
innerHeight: window.innerHeight,
outerWidth: window.outerWidth,
outerHeight: window.outerHeight,
scrollX: window.scrollX,
scrollY: window.scrollY,
screenX: window.screenX,
screenY: window.screenY,
devicePixelRatio: window.devicePixelRatio,
origin: window.origin,
isSecureContext: window.isSecureContext,
};

console.log(
"Window properties:",
windowProperties
);

// Resize listener for property changes
function logWindowSize() {
console.log(
"Current viewport:",
window.innerWidth,
window.innerHeight
);
}

window.addEventListener(
"resize",
logWindowSize
);

// Scroll listener for property changes
function logScrollPosition() {
console.log(
"Current scroll position:",
window.scrollX,
window.scrollY
);
}

window.addEventListener(
"scroll",
logScrollPosition,
{ passive: true }
);
