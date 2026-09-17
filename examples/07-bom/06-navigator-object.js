"use strict";

// Navigator object
console.log("Navigator:", window.navigator);

// Language
console.log(
"Language:",
navigator.language
);

// Supported languages
console.log(
"Languages:",
navigator.languages
);

// Online status
console.log(
"Online:",
navigator.onLine
);

// Cookies
console.log(
"Cookies enabled:",
navigator.cookieEnabled
);

// User agent
console.log(
"User agent:",
navigator.userAgent
);

// Platform
console.log(
"Platform:",
navigator.platform
);

// Hardware concurrency
console.log(
"Hardware concurrency:",
navigator.hardwareConcurrency
);

// Device memory
console.log(
"Device memory:",
navigator.deviceMemory
);

// Max touch points
console.log(
"Max touch points:",
navigator.maxTouchPoints
);

// PDF viewer support
console.log(
"PDF viewer enabled:",
navigator.pdfViewerEnabled
);

// Webdriver
console.log(
"Webdriver:",
navigator.webdriver
);

// Secure connection
console.log(
"Secure context:",
window.isSecureContext
);

// Geolocation availability
console.log(
"Geolocation available:",
"geolocation" in navigator
);

// Clipboard availability
console.log(
"Clipboard available:",
"clipboard" in navigator
);

// Media devices availability
console.log(
"Media devices available:",
"mediaDevices" in navigator
);

// Permissions API availability
console.log(
"Permissions API available:",
"permissions" in navigator
);

// Service Worker availability
console.log(
"Service Worker available:",
"serviceWorker" in navigator
);

// BroadcastChannel availability
console.log(
"BroadcastChannel available:",
"BroadcastChannel" in window
);

// Notification availability
console.log(
"Notifications available:",
"Notification" in window
);

// Bluetooth availability
console.log(
"Bluetooth available:",
"bluetooth" in navigator
);

// USB availability
console.log(
"USB available:",
"usb" in navigator
);

// Serial availability
console.log(
"Serial available:",
"serial" in navigator
);

// Web Share availability
console.log(
"Web Share available:",
"share" in navigator
);

// Network information availability
console.log(
"Connection API available:",
"connection" in navigator
);

// Network information
if ("connection" in navigator) {
const connection = navigator.connection;

console.log(
"Connection type:",
connection.effectiveType
);

console.log(
"Downlink:",
connection.downlink
);

console.log(
"RTT:",
connection.rtt
);

console.log(
"Save Data:",
connection.saveData
);
}

// Languages helper
const primaryLanguage =
navigator.languages?.[0] ??
navigator.language;

console.log(
"Primary language:",
primaryLanguage
);

// Online/offline events
window.addEventListener(
"online",
() => {
console.log(
"Navigator reports online."
);
}
);

window.addEventListener(
"offline",
() => {
console.log(
"Navigator reports offline."
);
}
);

// Check browser capabilities
const capabilities = {
geolocation: "geolocation" in navigator,
clipboard: "clipboard" in navigator,
mediaDevices:
"mediaDevices" in navigator,
permissions: "permissions" in navigator,
serviceWorker:
"serviceWorker" in navigator,
notification: "Notification" in window,
share: "share" in navigator,
bluetooth: "bluetooth" in navigator,
usb: "usb" in navigator,
serial: "serial" in navigator,
};

console.log(
"Browser capabilities:",
capabilities
);

// Permissions API
if ("permissions" in navigator) {
navigator.permissions
.query({ name: "geolocation" })
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

// Clipboard write
const copyButton = document.querySelector(
"#copy-button"
);

if (
copyButton &&
"clipboard" in navigator
) {
copyButton.addEventListener(
"click",
async () => {
try {
await navigator.clipboard.writeText(
"Osama Abu Motlaq"
);

```
    console.log(
      "Text copied successfully."
    );
  } catch (error) {
    console.error(
      "Clipboard error:",
      error.message
    );
  }
}
```

);
}

// Share API
const shareButton = document.querySelector(
"#share-button"
);

if (
shareButton &&
"share" in navigator
) {
shareButton.addEventListener(
"click",
async () => {
try {
await navigator.share({
title: "JavaScript Reference",
text: "JavaScript Reference by Osama Abu Motlaq",
url: window.location.href,
});

```
    console.log(
      "Content shared successfully."
    );
  } catch (error) {
    console.error(
      "Share error:",
      error.message
    );
  }
}
```

);
}

// Geolocation capability check
const locationButton =
document.querySelector("#location-button");

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
    }
  );
}
```

);
}

// Media devices
if ("mediaDevices" in navigator) {
console.log(
"Media devices:",
navigator.mediaDevices
);
}

// Permissions
if ("permissions" in navigator) {
console.log(
"Permissions:",
navigator.permissions
);
}

// Service worker
if ("serviceWorker" in navigator) {
console.log(
"Service worker:",
navigator.serviceWorker
);
}

// User activation
console.log(
"User activation:",
navigator.userActivation
);

if ("userActivation" in navigator) {
console.log(
"Has user activated:",
navigator.userActivation.hasBeenActive
);

console.log(
"Is user active:",
navigator.userActivation.isActive
);
}

// Build navigator snapshot
const navigatorSnapshot = {
language: navigator.language,
languages: navigator.languages,
online: navigator.onLine,
cookiesEnabled: navigator.cookieEnabled,
userAgent: navigator.userAgent,
platform: navigator.platform,
hardwareConcurrency:
navigator.hardwareConcurrency,
maxTouchPoints:
navigator.maxTouchPoints,
webdriver: navigator.webdriver,
secureContext: window.isSecureContext,
};

console.log(
"Navigator snapshot:",
navigatorSnapshot
);
