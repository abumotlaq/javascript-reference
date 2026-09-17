"use strict";

// Current origin
console.log(
"Current origin:",
window.location.origin
);

// Current protocol
console.log(
"Current protocol:",
window.location.protocol
);

// HTTPS check
const isHttps =
window.location.protocol === "https:";

console.log(
"Using HTTPS:",
isHttps
);

// Secure context
console.log(
"Secure context:",
window.isSecureContext
);

// Check localhost
const isLocalhost =
window.location.hostname === "localhost" ||
window.location.hostname === "127.0.0.1" ||
window.location.hostname === "::1";

console.log(
"Running on localhost:",
isLocalhost
);

// Current host information
console.log(
"Hostname:",
window.location.hostname
);

console.log(
"Port:",
window.location.port
);

console.log(
"Host:",
window.location.host
);

// Origin comparison
const currentOrigin =
window.location.origin;

const trustedOrigin =
"https://example.com";

console.log(
"Trusted origin match:",
currentOrigin === trustedOrigin
);

// Basic origin validation
function isTrustedOrigin(origin) {
return origin === trustedOrigin;
}

console.log(
"Trusted origin:",
isTrustedOrigin(
"https://example.com"
)
);

console.log(
"Untrusted origin:",
isTrustedOrigin(
"https://malicious.example"
)
);

// Validate URL origin
function isSafeUrl(value) {
try {
const url = new URL(
value,
window.location.origin
);

```
return (
  url.origin ===
  window.location.origin
);
```

} catch {
return false;
}
}

console.log(
"Safe relative URL:",
isSafeUrl("/projects")
);

console.log(
"Safe same-origin URL:",
isSafeUrl(
`${window.location.origin}/projects`
)
);

console.log(
"External URL:",
isSafeUrl(
"https://example.com"
)
);

// Validate HTTPS URL
function isSecureUrl(value) {
try {
const url = new URL(
value,
window.location.origin
);

```
return url.protocol === "https:";
```

} catch {
return false;
}
}

console.log(
"Secure URL:",
isSecureUrl(
"https://example.com"
)
);

console.log(
"Insecure URL:",
isSecureUrl(
"http://example.com"
)
);

// Avoid javascript: URLs
function isSafeNavigationUrl(value) {
try {
const url = new URL(
value,
window.location.origin
);

```
return (
  url.protocol === "https:" ||
  url.protocol === "http:"
);
```

} catch {
return false;
}
}

console.log(
"Safe navigation URL:",
isSafeNavigationUrl(
"/projects"
)
);

console.log(
"Unsafe navigation URL:",
isSafeNavigationUrl(
"javascript:alert(1)"
)
);

// Open redirect protection
function getSafeRedirect(value) {
try {
const url = new URL(
value,
window.location.origin
);

```
if (
  url.origin !==
  window.location.origin
) {
  return null;
}

return url.pathname + url.search + url.hash;
```

} catch {
return null;
}
}

console.log(
"Safe redirect:",
getSafeRedirect(
"/dashboard?tab=projects"
)
);

console.log(
"Unsafe redirect:",
getSafeRedirect(
"https://example.com"
)
);

// URL parameter validation
const params = new URLSearchParams(
window.location.search
);

const redirect =
params.get("redirect");

console.log(
"Redirect parameter:",
redirect
);

if (redirect) {
console.log(
"Validated redirect:",
getSafeRedirect(redirect)
);
}

// postMessage security
const TRUSTED_MESSAGE_ORIGIN =
"https://example.com";

window.addEventListener(
"message",
(event) => {
if (
event.origin !==
TRUSTED_MESSAGE_ORIGIN
) {
console.warn(
"Rejected message from:",
event.origin
);

```
  return;
}

console.log(
  "Trusted message:",
  event.data
);
```

}
);

// Validate message data
function isValidMessage(data) {
return (
data &&
typeof data === "object" &&
typeof data.type === "string"
);
}

window.addEventListener(
"message",
(event) => {
if (
event.origin !==
TRUSTED_MESSAGE_ORIGIN
) {
return;
}

```
if (!isValidMessage(event.data)) {
  console.warn(
    "Invalid message data."
  );

  return;
}

console.log(
  "Message type:",
  event.data.type
);
```

}
);

// Same-window postMessage example
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
  event.data !==
  "security-example"
) {
  return;
}

console.log(
  "Accepted same-origin message."
);
```

}
);

window.postMessage(
"security-example",
window.location.origin
);

// Storage is client-controlled
localStorage.setItem(
"role",
"Frontend Developer"
);

const storedRole =
localStorage.getItem("role");

console.log(
"Stored role:",
storedRole
);

// Never treat localStorage as authorization
const storedAdminFlag =
localStorage.getItem("isAdmin");

const isAdmin =
storedAdminFlag === "true";

console.log(
"Client-side admin flag:",
isAdmin
);

// Validate stored JSON
function readStoredJson(
key
) {
const value =
localStorage.getItem(key);

if (value === null) {
return null;
}

try {
return JSON.parse(value);
} catch {
return null;
}
}

console.log(
"Stored profile:",
readStoredJson("profile")
);

// Store non-sensitive application state
localStorage.setItem(
"theme",
"dark"
);

console.log(
"Theme:",
localStorage.getItem("theme")
);

// Do not expose cookies through document.cookie
console.log(
"Cookie API available:",
"cookie" in document
);

// HttpOnly cookies are not accessible through JavaScript.
// document.cookie only exposes cookies available to script.
console.log(
"Document cookies:",
document.cookie
);

// Referrer information
console.log(
"Referrer:",
document.referrer
);

// Referrer policy
const referrerPolicy =
document.referrerPolicy;

console.log(
"Referrer policy:",
referrerPolicy
);

// Cross-origin isolation
console.log(
"Cross-origin isolated:",
window.crossOriginIsolated
);

// COOP-related observation
console.log(
"Window opener:",
window.opener
);

// Check iframe context
const isFramed =
window.self !== window.top;

console.log(
"Page is inside an iframe:",
isFramed
);

// Detect sandbox-related origin behavior
if (isFramed) {
console.log(
"Current page is running inside a browsing context."
);
}

// Check Permissions API
if ("permissions" in navigator) {
console.log(
"Permissions API available:",
true
);

navigator.permissions
.query({
name: "geolocation",
})
.then((permission) => {
console.log(
"Geolocation permission:",
permission.state
);
})
.catch((error) => {
console.error(
"Permission query failed:",
error.message
);
});
}

// Check secure browser capabilities
const securityCapabilities = {
secureContext:
window.isSecureContext,

crypto:
"crypto" in window,

subtleCrypto:
"crypto" in window &&
"subtle" in window.crypto,

permissions:
"permissions" in navigator,

clipboard:
"clipboard" in navigator,

geolocation:
"geolocation" in navigator,

notifications:
"Notification" in window,
};

console.log(
"Security capabilities:",
securityCapabilities
);

// Web Crypto API
if (
"crypto" in window &&
"getRandomValues" in window.crypto
) {
const randomValues =
new Uint32Array(4);

window.crypto.getRandomValues(
randomValues
);

console.log(
"Random values:",
randomValues
);
}

// Random UUID
if (
"crypto" in window &&
"randomUUID" in window.crypto
) {
console.log(
"Random UUID:",
window.crypto.randomUUID()
);
}

// Avoid inserting untrusted HTML
const output =
document.querySelector(
"#output"
);

const userInput =
"<img src=x onerror=alert(1)>";

if (output) {
output.textContent = userInput;
}

// Validate external links
function isExternalUrl(value) {
try {
const url = new URL(
value,
window.location.origin
);

```
return (
  url.origin !==
  window.location.origin
);
```

} catch {
return false;
}
}

console.log(
"External link:",
isExternalUrl(
"https://example.com"
)
);

console.log(
"Same-origin link:",
isExternalUrl(
"/projects"
)
);

// Safe target for opening a new tab
const externalLink =
document.querySelector(
"#external-link"
);

if (externalLink) {
externalLink.addEventListener(
"click",
(event) => {
const href =
externalLink.getAttribute(
"href"
);

```
  if (!href) {
    event.preventDefault();
    return;
  }

  if (
    !isSecureUrl(href)
  ) {
    event.preventDefault();

    console.warn(
      "Blocked insecure URL."
    );
  }
}
```

);
}

// Permissions state helper
async function getPermissionState(
permissionName
) {
if (
!("permissions" in navigator)
) {
return "unsupported";
}

try {
const permission =
await navigator.permissions.query(
{
name: permissionName,
}
);

```
return permission.state;
```

} catch {
return "unknown";
}
}

getPermissionState(
"geolocation"
).then((state) => {
console.log(
"Geolocation permission state:",
state
);
});

// Browser security snapshot
const securitySnapshot = {
origin:
window.location.origin,

protocol:
window.location.protocol,

secureContext:
window.isSecureContext,

crossOriginIsolated:
window.crossOriginIsolated,

framed:
window.self !== window.top,

referrer:
document.referrer,
};

console.log(
"Security snapshot:",
securitySnapshot
);
