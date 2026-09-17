"use strict";

// click event
const button = document.querySelector("#button");

if (button) {
button.addEventListener("click", () => {
console.log("Button clicked.");
});
}

// click event with the event object
if (button) {
button.addEventListener("click", (event) => {
console.log("Event type:", event.type);
console.log("Event target:", event.target);
console.log("Event currentTarget:", event.currentTarget);
});
}

// double click event
const title = document.querySelector("#title");

if (title) {
title.addEventListener("dblclick", () => {
console.log("Title double-clicked.");
});
}

// mouse events
const card = document.querySelector(".card");

if (card) {
card.addEventListener("mouseenter", () => {
console.log("Mouse entered the card.");
});

card.addEventListener("mouseleave", () => {
console.log("Mouse left the card.");
});
}

if (card) {
card.addEventListener("mousemove", (event) => {
console.log(
"Mouse position:",
event.clientX,
event.clientY
);
});
}

// Input event
const input = document.querySelector("#username");

if (input) {
input.addEventListener("input", (event) => {
console.log("Input value:", event.target.value);
});
}

// Change event
const select = document.querySelector("#role");

if (select) {
select.addEventListener("change", (event) => {
console.log("Selected value:", event.target.value);
});
}

// Focus event
if (input) {
input.addEventListener("focus", () => {
console.log("Input focused.");
});
}

// Blur event
if (input) {
input.addEventListener("blur", () => {
console.log("Input lost focus.");
});
}

// Keyboard events
document.addEventListener("keydown", (event) => {
console.log("Key down:", event.key);
});

document.addEventListener("keyup", (event) => {
console.log("Key up:", event.key);
});

// Specific keyboard key
document.addEventListener("keydown", (event) => {
if (event.key === "Enter") {
console.log("Enter key pressed.");
}
});

// Form submit event
const form = document.querySelector("#form");

if (form) {
form.addEventListener("submit", (event) => {
event.preventDefault();

```
console.log("Form submitted.");
```

});
}

// Checkbox change event
const checkbox = document.querySelector("#terms");

if (checkbox) {
checkbox.addEventListener("change", (event) => {
console.log(
"Checkbox checked:",
event.target.checked
);
});
}

// Radio change event
const radios = document.querySelectorAll(
'input[name="role"]'
);

radios.forEach((radio) => {
radio.addEventListener("change", (event) => {
console.log(
"Selected role:",
event.target.value
);
});
});

// Multiple events with the same handler
function handleButtonEvent(event) {
console.log("Button event:", event.type);
}

if (button) {
button.addEventListener(
"mousedown",
handleButtonEvent
);

button.addEventListener(
"mouseup",
handleButtonEvent
);
}

// Removing an event listener
function handleMouseEnter() {
console.log("Mouse entered.");
}

if (card) {
card.addEventListener(
"mouseenter",
handleMouseEnter
);

card.removeEventListener(
"mouseenter",
handleMouseEnter
);
}

// Event listener with once
const onceButton = document.querySelector(
"#once-button"
);

if (onceButton) {
onceButton.addEventListener(
"click",
() => {
console.log("This runs only once.");
},
{ once: true }
);
}

// Passive event listener
window.addEventListener(
"scroll",
() => {
console.log("Page scrolled.");
},
{ passive: true }
);

// Resize event
window.addEventListener("resize", () => {
console.log(
"Window size:",
window.innerWidth,
window.innerHeight
);
});

// Online event
window.addEventListener("online", () => {
console.log("Browser is online.");
});

// Offline event
window.addEventListener("offline", () => {
console.log("Browser is offline.");
});

// Visibility change
document.addEventListener(
"visibilitychange",
() => {
if (document.hidden) {
console.log("Page is hidden.");
} else {
console.log("Page is visible.");
}
}
);

// Copy event
document.addEventListener("copy", () => {
console.log("Content copied.");
});

// Paste event
document.addEventListener("paste", (event) => {
console.log(
"Pasted text:",
event.clipboardData?.getData("text")
);
});

// Drag events
const draggable = document.querySelector(
".draggable"
);

if (draggable) {
draggable.addEventListener("dragstart", () => {
console.log("Drag started.");
});

draggable.addEventListener("dragend", () => {
console.log("Drag ended.");
});
}

// Custom event
const customEvent = new CustomEvent(
"profileUpdated",
{
detail: {
name: "Osama Abu Motlaq",
role: "Frontend Developer",
},
}
);

document.addEventListener(
"profileUpdated",
(event) => {
console.log(
"Profile updated:",
event.detail
);
}
);

document.dispatchEvent(customEvent);
