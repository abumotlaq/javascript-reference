"use strict";

// Screen object
console.log("Screen:", window.screen);

// Screen dimensions
console.log("Screen width:", screen.width);
console.log("Screen height:", screen.height);

// Available screen dimensions
console.log(
"Available width:",
screen.availWidth
);

console.log(
"Available height:",
screen.availHeight
);

// Screen position
console.log(
"Screen X:",
window.screenX
);

console.log(
"Screen Y:",
window.screenY
);

console.log(
"Screen left:",
window.screenLeft
);

console.log(
"Screen top:",
window.screenTop
);

// Color depth
console.log(
"Color depth:",
screen.colorDepth
);

// Pixel depth
console.log(
"Pixel depth:",
screen.pixelDepth
);

// Device pixel ratio
console.log(
"Device pixel ratio:",
window.devicePixelRatio
);

// Screen orientation
console.log(
"Screen orientation:",
screen.orientation
);

console.log(
"Orientation type:",
screen.orientation?.type
);

console.log(
"Orientation angle:",
screen.orientation?.angle
);

// Orientation change
function handleOrientationChange() {
console.log(
"Orientation changed:",
screen.orientation?.type
);

console.log(
"Orientation angle:",
screen.orientation?.angle
);
}

if (screen.orientation) {
screen.orientation.addEventListener(
"change",
handleOrientationChange
);
}

// Lock orientation
const lockButton = document.querySelector(
"#lock-orientation"
);

if (lockButton && screen.orientation) {
lockButton.addEventListener(
"click",
async () => {
try {
await screen.orientation.lock(
"portrait"
);

```
    console.log(
      "Screen orientation locked."
    );
  } catch (error) {
    console.error(
      "Orientation lock failed:",
      error.message
    );
  }
}
```

);
}

// Unlock orientation
const unlockButton = document.querySelector(
"#unlock-orientation"
);

if (unlockButton && screen.orientation) {
unlockButton.addEventListener(
"click",
() => {
screen.orientation.unlock();

```
  console.log(
    "Screen orientation unlocked."
  );
}
```

);
}

// Screen size snapshot
const screenSize = {
width: screen.width,
height: screen.height,
availWidth: screen.availWidth,
availHeight: screen.availHeight,
};

console.log(
"Screen size:",
screenSize
);

// Display information snapshot
const displayInfo = {
width: screen.width,
height: screen.height,
availableWidth: screen.availWidth,
availableHeight: screen.availHeight,
colorDepth: screen.colorDepth,
pixelDepth: screen.pixelDepth,
devicePixelRatio:
window.devicePixelRatio,
};

console.log(
"Display information:",
displayInfo
);

// Compare screen and viewport
const viewport = {
width: window.innerWidth,
height: window.innerHeight,
};

const display = {
width: screen.width,
height: screen.height,
};

console.log(
"Viewport:",
viewport
);

console.log(
"Display:",
display
);

// Check whether viewport matches screen width
console.log(
"Viewport equals screen width:",
window.innerWidth === screen.width
);

// Check whether viewport matches screen height
console.log(
"Viewport equals screen height:",
window.innerHeight === screen.height
);

// Device pixel ratio classification
if (window.devicePixelRatio > 1) {
console.log("High-density display.");
} else {
console.log("Standard-density display.");
}

// Color depth classification
if (screen.colorDepth >= 24) {
console.log(
"Display supports at least 24-bit color depth."
);
}

// Orientation helpers
const isPortrait =
window.matchMedia("(orientation: portrait)")
.matches;

const isLandscape =
window.matchMedia("(orientation: landscape)")
.matches;

console.log(
"Portrait:",
isPortrait
);

console.log(
"Landscape:",
isLandscape
);

// Orientation media query listeners
const orientationQuery = window.matchMedia(
"(orientation: portrait)"
);

function handleOrientationMediaChange(event) {
console.log(
"Portrait media query:",
event.matches
);
}

orientationQuery.addEventListener(
"change",
handleOrientationMediaChange
);

// Small screen check
const smallScreenQuery = window.matchMedia(
"(max-width: 768px)"
);

console.log(
"Small screen:",
smallScreenQuery.matches
);

// Large screen check
const largeScreenQuery = window.matchMedia(
"(min-width: 1200px)"
);

console.log(
"Large screen:",
largeScreenQuery.matches
);

// Touch capability
console.log(
"Maximum touch points:",
navigator.maxTouchPoints
);

console.log(
"Touch capable:",
navigator.maxTouchPoints > 0
);

// Multi-monitor related coordinate information
console.log(
"Window screen X:",
window.screenX
);

console.log(
"Window screen Y:",
window.screenY
);

// Available screen area
const availableArea =
screen.availWidth * screen.availHeight;

const totalScreenArea =
screen.width * screen.height;

console.log(
"Available screen area:",
availableArea
);

console.log(
"Total screen area:",
totalScreenArea
);

// Available area ratio
if (totalScreenArea > 0) {
const availableRatio =
availableArea / totalScreenArea;

console.log(
"Available screen ratio:",
availableRatio
);
}

// Screen property checks
console.log(
"Screen orientation supported:",
"orientation" in screen
);

console.log(
"Screen orientation lock supported:",
Boolean(
screen.orientation &&
"lock" in screen.orientation
)
);

// Window placement information
const windowPlacement = {
screenX: window.screenX,
screenY: window.screenY,
outerWidth: window.outerWidth,
outerHeight: window.outerHeight,
innerWidth: window.innerWidth,
innerHeight: window.innerHeight,
};

console.log(
"Window placement:",
windowPlacement
);

// Final screen snapshot
const screenSnapshot = {
width: screen.width,
height: screen.height,
availWidth: screen.availWidth,
availHeight: screen.availHeight,
colorDepth: screen.colorDepth,
pixelDepth: screen.pixelDepth,
orientation:
screen.orientation?.type ?? null,
orientationAngle:
screen.orientation?.angle ?? null,
devicePixelRatio:
window.devicePixelRatio,
};

console.log(
"Screen snapshot:",
screenSnapshot
);
