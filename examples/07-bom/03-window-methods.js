"use strict";

// window.open()
const newWindow = window.open(
"https://example.com",
"_blank",
"width=800,height=600"
);

console.log("Opened window:", newWindow);

// Check whether a window was opened
if (newWindow) {
console.log(
"Window opened successfully."
);
} else {
console.log(
"Window opening was blocked."
);
}

// window.focus()
if (newWindow) {
newWindow.focus();
}

// window.blur()
if (newWindow) {
newWindow.blur();
}

// window.close()
if (newWindow) {
newWindow.close();
}

// window.scrollTo()
window.scrollTo({
top: 0,
left: 0,
behavior: "smooth",
});

// window.scrollBy()
window.scrollBy({
top: 300,
left: 0,
behavior: "smooth",
});

// window.scroll()
window.scroll({
top: 0,
left: 0,
behavior: "smooth",
});

// setTimeout()
const timeoutId = window.setTimeout(() => {
console.log("Timeout executed.");
}, 1000);

console.log(
"Timeout ID:",
timeoutId
);

// clearTimeout()
const cancelableTimeout = window.setTimeout(() => {
console.log(
"This timeout should not execute."
);
}, 3000);

window.clearTimeout(cancelableTimeout);

// setInterval()
let counter = 0;

const intervalId = window.setInterval(() => {
counter++;

console.log(
"Interval count:",
counter
);

if (counter === 3) {
window.clearInterval(intervalId);

```
console.log(
  "Interval cleared."
);
```

}
}, 1000);

// requestAnimationFrame()
const animationFrameId =
window.requestAnimationFrame(
(timestamp) => {
console.log(
"Animation frame timestamp:",
timestamp
);
}
);

console.log(
"Animation frame ID:",
animationFrameId
);

// cancelAnimationFrame()
const cancelableFrame =
window.requestAnimationFrame(() => {
console.log(
"This animation frame should not execute."
);
});

window.cancelAnimationFrame(
cancelableFrame
);

// matchMedia()
const darkModeQuery = window.matchMedia(
"(prefers-color-scheme: dark)"
);

console.log(
"Dark mode:",
darkModeQuery.matches
);

// matchMedia() listener
function handleThemeChange(event) {
console.log(
"Dark mode changed:",
event.matches
);
}

darkModeQuery.addEventListener(
"change",
handleThemeChange
);

// getSelection()
const selection = window.getSelection();

console.log(
"Current selection:",
selection
);

if (selection) {
console.log(
"Selected text:",
selection.toString()
);
}

// print()
const printButton = document.querySelector(
"#print-button"
);

if (printButton) {
printButton.addEventListener(
"click",
() => {
window.print();
}
);
}

// stop()
const stopButton = document.querySelector(
"#stop-button"
);

if (stopButton) {
stopButton.addEventListener(
"click",
() => {
window.stop();
}
);
}

// resizeTo()
const resizeButton = document.querySelector(
"#resize-window"
);

if (resizeButton) {
resizeButton.addEventListener(
"click",
() => {
window.resizeTo(800, 600);
}
);
}

// resizeBy()
const resizeByButton =
document.querySelector("#resize-by");

if (resizeByButton) {
resizeByButton.addEventListener(
"click",
() => {
window.resizeBy(100, 100);
}
);
}

// moveTo()
const moveToButton =
document.querySelector("#move-window");

if (moveToButton) {
moveToButton.addEventListener(
"click",
() => {
window.moveTo(100, 100);
}
);
}

// moveBy()
const moveByButton =
document.querySelector("#move-by");

if (moveByButton) {
moveByButton.addEventListener(
"click",
() => {
window.moveBy(50, 50);
}
);
}

// alert()
const alertButton = document.querySelector(
"#alert-button"
);

if (alertButton) {
alertButton.addEventListener(
"click",
() => {
window.alert(
"Hello, Osama Abu Motlaq!"
);
}
);
}

// confirm()
const confirmButton = document.querySelector(
"#confirm-button"
);

if (confirmButton) {
confirmButton.addEventListener(
"click",
() => {
const confirmed = window.confirm(
"Continue with this action?"
);

```
  console.log(
    "Confirmed:",
    confirmed
  );
}
```

);
}

// prompt()
const promptButton = document.querySelector(
"#prompt-button"
);

if (promptButton) {
promptButton.addEventListener(
"click",
() => {
const name = window.prompt(
"Enter your name:"
);

```
  console.log(
    "Entered name:",
    name
  );
}
```

);
}

// requestIdleCallback()
if ("requestIdleCallback" in window) {
const idleId = window.requestIdleCallback(
(deadline) => {
console.log(
"Idle callback executed."
);

```
  console.log(
    "Time remaining:",
    deadline.timeRemaining()
  );
}
```

);

console.log(
"Idle callback ID:",
idleId
);
}

// cancelIdleCallback()
if ("requestIdleCallback" in window) {
const cancelableIdleCallback =
window.requestIdleCallback(() => {
console.log(
"This idle callback should not execute."
);
});

window.cancelIdleCallback(
cancelableIdleCallback
);
}

// queueMicrotask()
window.queueMicrotask(() => {
console.log(
"Microtask executed."
);
});

// postMessage()
window.addEventListener(
"message",
(event) => {
if (event.source !== window) {
return;
}

```
if (event.data === "window-message") {
  console.log(
    "Received message:",
    event.data
  );
}
```

}
);

window.postMessage(
"window-message",
window.location.origin
);
