"use strict";

// Location object
console.log("Location:", window.location);

// Current URL
console.log(
"href:",
window.location.href
);

// Origin
console.log(
"origin:",
window.location.origin
);

// Protocol
console.log(
"protocol:",
window.location.protocol
);

// Host
console.log(
"host:",
window.location.host
);

// Hostname
console.log(
"hostname:",
window.location.hostname
);

// Port
console.log(
"port:",
window.location.port
);

// Pathname
console.log(
"pathname:",
window.location.pathname
);

// Search
console.log(
"search:",
window.location.search
);

// Hash
console.log(
"hash:",
window.location.hash
);

// Full URL
console.log(
"Full URL:",
location.toString()
);

// URL object from current location
const currentUrl = new URL(
window.location.href
);

console.log(
"URL object:",
currentUrl
);

// URL components through URL
console.log(
"URL protocol:",
currentUrl.protocol
);

console.log(
"URL hostname:",
currentUrl.hostname
);

console.log(
"URL pathname:",
currentUrl.pathname
);

console.log(
"URL search:",
currentUrl.search
);

console.log(
"URL hash:",
currentUrl.hash
);

// Check whether a query string exists
const hasQuery =
window.location.search.length > 0;

console.log(
"Has query string:",
hasQuery
);

// Check whether a hash exists
const hasHash =
window.location.hash.length > 0;

console.log(
"Has hash:",
hasHash
);

// Build a URL from a relative path
const relativeUrl = new URL(
"/projects",
window.location.origin
);

console.log(
"Relative URL:",
relativeUrl.href
);

// Build an external URL
const externalUrl = new URL(
"https://example.com/profile"
);

console.log(
"External URL:",
externalUrl.href
);

// Compare origins
console.log(
"Same origin:",
externalUrl.origin ===
window.location.origin
);

// Location href setter
const navigationLink = document.querySelector(
"#navigation-link"
);

if (navigationLink) {
navigationLink.addEventListener(
"click",
(event) => {
event.preventDefault();

```
  window.location.href = "/projects";
}
```

);
}

// Assign navigation
const assignButton = document.querySelector(
"#assign-button"
);

if (assignButton) {
assignButton.addEventListener(
"click",
() => {
window.location.assign("/projects");
}
);
}

// Replace navigation
const replaceButton = document.querySelector(
"#replace-button"
);

if (replaceButton) {
replaceButton.addEventListener(
"click",
() => {
window.location.replace("/projects");
}
);
}

// Reload the current page
const reloadButton = document.querySelector(
"#reload-button"
);

if (reloadButton) {
reloadButton.addEventListener(
"click",
() => {
window.location.reload();
}
);
}

// Read the current hash
console.log(
"Current hash:",
window.location.hash
);

// Change hash without leaving the document
const hashButton = document.querySelector(
"#hash-button"
);

if (hashButton) {
hashButton.addEventListener(
"click",
() => {
window.location.hash = "projects";
}
);
}

// Remove hash
const clearHashButton =
document.querySelector("#clear-hash");

if (clearHashButton) {
clearHashButton.addEventListener(
"click",
() => {
window.location.hash = "";
}
);
}

// Read URL state
const locationState = {
href: window.location.href,
origin: window.location.origin,
protocol: window.location.protocol,
host: window.location.host,
hostname: window.location.hostname,
port: window.location.port,
pathname: window.location.pathname,
search: window.location.search,
hash: window.location.hash,
};

console.log(
"Location state:",
locationState
);

// Current path information
const pathParts =
window.location.pathname
.split("/")
.filter(Boolean);

console.log(
"Path parts:",
pathParts
);

// Detect HTTPS
const isHttps =
window.location.protocol === "https:";

console.log(
"Using HTTPS:",
isHttps
);

// Detect localhost
const isLocalhost =
window.location.hostname ===
"localhost" ||
window.location.hostname === "127.0.0.1";

console.log(
"Running on localhost:",
isLocalhost
);

// Detect a specific port
const currentPort =
window.location.port || "default";

console.log(
"Current port:",
currentPort
);

// Location event
window.addEventListener(
"hashchange",
() => {
console.log(
"Hash changed:",
window.location.hash
);
}
);

// Read navigation referrer
console.log(
"Document referrer:",
document.referrer
);

// Current document URL
console.log(
"Document URL:",
document.URL
);
