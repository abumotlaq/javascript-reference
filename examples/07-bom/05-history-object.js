"use strict";

// History object
console.log("History:", window.history);

// Number of history entries
console.log(
"History length:",
window.history.length
);

// Current history state
console.log(
"Current state:",
window.history.state
);

// Back navigation button
const backButton = document.querySelector(
"#back-button"
);

if (backButton) {
backButton.addEventListener(
"click",
() => {
window.history.back();
}
);
}

// Forward navigation button
const forwardButton =
document.querySelector("#forward-button");

if (forwardButton) {
forwardButton.addEventListener(
"click",
() => {
window.history.forward();
}
);
}

// Go backward or forward
const goButton = document.querySelector(
"#go-button"
);

if (goButton) {
goButton.addEventListener(
"click",
() => {
window.history.go(-1);
}
);
}

// Go forward
const forwardByButton =
document.querySelector("#forward-by-button");

if (forwardByButton) {
forwardByButton.addEventListener(
"click",
() => {
window.history.go(1);
}
);
}

// Push a new history entry
const pushButton = document.querySelector(
"#push-state"
);

if (pushButton) {
pushButton.addEventListener(
"click",
() => {
window.history.pushState(
{
page: "projects",
},
"",
"/projects"
);

```
  console.log(
    "New state:",
    window.history.state
  );
}
```

);
}

// Push another state
const aboutButton = document.querySelector(
"#push-about"
);

if (aboutButton) {
aboutButton.addEventListener(
"click",
() => {
window.history.pushState(
{
page: "about",
},
"",
"/about"
);

```
  console.log(
    "Current URL:",
    window.location.href
  );

  console.log(
    "Current state:",
    window.history.state
  );
}
```

);
}

// Replace the current history entry
const replaceButton = document.querySelector(
"#replace-state"
);

if (replaceButton) {
replaceButton.addEventListener(
"click",
() => {
window.history.replaceState(
{
page: "profile",
},
"",
"/profile"
);

```
  console.log(
    "Replaced state:",
    window.history.state
  );
}
```

);
}

// Push state with multiple values
const settingsButton = document.querySelector(
"#push-settings"
);

if (settingsButton) {
settingsButton.addEventListener(
"click",
() => {
const state = {
page: "settings",
section: "profile",
user: "Osama Abu Motlaq",
};

```
  window.history.pushState(
    state,
    "",
    "/settings?section=profile"
  );

  console.log(
    "Settings state:",
    window.history.state
  );
}
```

);
}

// Reading history state
console.log(
"History state:",
window.history.state
);

// popstate event
window.addEventListener(
"popstate",
(event) => {
console.log(
"Popstate event fired."
);

```
console.log(
  "Event state:",
  event.state
);

console.log(
  "Current URL:",
  window.location.href
);
```

}
);

// Push several states
const multiStateButton =
document.querySelector("#multi-state");

if (multiStateButton) {
multiStateButton.addEventListener(
"click",
() => {
window.history.pushState(
{ page: "one" },
"",
"/one"
);

```
  window.history.pushState(
    { page: "two" },
    "",
    "/two"
  );

  window.history.pushState(
    { page: "three" },
    "",
    "/three"
  );

  console.log(
    "Current state:",
    window.history.state
  );
}
```

);
}

// Replace state without changing the path
const updateStateButton =
document.querySelector("#update-state");

if (updateStateButton) {
updateStateButton.addEventListener(
"click",
() => {
window.history.replaceState(
{
page: "current",
timestamp: Date.now(),
},
"",
window.location.href
);

```
  console.log(
    "Updated state:",
    window.history.state
  );
}
```

);
}

// Store structured state
const profileButton = document.querySelector(
"#profile-state"
);

if (profileButton) {
profileButton.addEventListener(
"click",
() => {
const profileState = {
page: "profile",
user: {
name: "Osama Abu Motlaq",
role: "Frontend Developer",
},
};

```
  window.history.pushState(
    profileState,
    "",
    "/profile"
  );

  console.log(
    "Profile state:",
    window.history.state
  );
}
```

);
}

// Restore state after navigation
function handleNavigationState(state) {
if (!state) {
console.log(
"No application history state."
);

```
return;
```

}

if (state.page === "projects") {
console.log(
"Projects page state."
);
}

if (state.page === "about") {
console.log(
"About page state."
);
}

if (state.page === "profile") {
console.log(
"Profile page state."
);
}
}

window.addEventListener(
"popstate",
(event) => {
handleNavigationState(
event.state
);
}
);

// History state snapshot
const historySnapshot = {
length: window.history.length,
state: window.history.state,
url: window.location.href,
};

console.log(
"History snapshot:",
historySnapshot
);

// Check whether History API is available
console.log(
"History API available:",
"history" in window
);

console.log(
"pushState available:",
typeof window.history.pushState ===
"function"
);

console.log(
"replaceState available:",
typeof window.history.replaceState ===
"function"
);

// Demonstrate navigation state
const navigationState = {
page: "javascript-reference",
section: "history",
};

window.history.pushState(
navigationState,
"",
window.location.pathname
);

console.log(
"Navigation state:",
window.history.state
);
