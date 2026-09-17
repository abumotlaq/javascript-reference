"use strict";

// Storage objects
console.log("Local storage:", window.localStorage);
console.log("Session storage:", window.sessionStorage);

// localStorage.setItem()
localStorage.setItem(
"name",
"Osama Abu Motlaq"
);

localStorage.setItem(
"role",
"Frontend Developer"
);

console.log(
"Stored name:",
localStorage.getItem("name")
);

console.log(
"Stored role:",
localStorage.getItem("role")
);

// sessionStorage.setItem()
sessionStorage.setItem(
"sessionName",
"Osama Abu Motlaq"
);

sessionStorage.setItem(
"sessionRole",
"Computer Science Student"
);

console.log(
"Session name:",
sessionStorage.getItem("sessionName")
);

console.log(
"Session role:",
sessionStorage.getItem("sessionRole")
);

// getItem() for a missing key
console.log(
"Missing value:",
localStorage.getItem("email")
);

// Check whether a key exists
console.log(
"Has name:",
localStorage.getItem("name") !== null
);

console.log(
"Has email:",
localStorage.getItem("email") !== null
);

// Storage length
console.log(
"Local storage length:",
localStorage.length
);

console.log(
"Session storage length:",
sessionStorage.length
);

// key()
for (let index = 0; index < localStorage.length; index++) {
console.log(
`Local storage key ${index}:`,
localStorage.key(index)
);
}

// Updating a stored value
localStorage.setItem(
"role",
"Full Stack JavaScript Developer"
);

console.log(
"Updated role:",
localStorage.getItem("role")
);

// removeItem()
localStorage.removeItem("role");

console.log(
"Role after removal:",
localStorage.getItem("role")
);

// Re-add removed value
localStorage.setItem(
"role",
"Frontend Developer"
);

console.log(
"Role after re-adding:",
localStorage.getItem("role")
);

// Storing numbers
localStorage.setItem("age", "25");

const age = Number(
localStorage.getItem("age")
);

console.log("Age:", age);
console.log("Age type:", typeof age);

// Storing booleans
localStorage.setItem(
"isStudent",
String(true)
);

const isStudent =
localStorage.getItem("isStudent") ===
"true";

console.log(
"Is student:",
isStudent
);

// Storing an array with JSON
const skills = [
"JavaScript",
"React",
"Next.js",
];

localStorage.setItem(
"skills",
JSON.stringify(skills)
);

const storedSkills = JSON.parse(
localStorage.getItem("skills")
);

console.log(
"Stored skills:",
storedSkills
);

// Storing an object with JSON
const user = {
name: "Osama Abu Motlaq",
role: "Frontend Developer",
country: "Palestine",
};

localStorage.setItem(
"user",
JSON.stringify(user)
);

const storedUser = JSON.parse(
localStorage.getItem("user")
);

console.log(
"Stored user:",
storedUser
);

// Updating a stored object
storedUser.role =
"Full Stack JavaScript Developer";

localStorage.setItem(
"user",
JSON.stringify(storedUser)
);

console.log(
"Updated user:",
JSON.parse(localStorage.getItem("user"))
);

// Safe JSON parsing
const storedData =
localStorage.getItem("settings");

let settings = null;

if (storedData !== null) {
try {
settings = JSON.parse(storedData);
} catch (error) {
console.error(
"Invalid stored JSON:",
error.message
);
}
}

console.log(
"Settings:",
settings
);

// Namespaced keys
const storagePrefix =
"javascript-reference:";

localStorage.setItem(
`${storagePrefix}theme`,
"dark"
);

localStorage.setItem(
`${storagePrefix}language`,
"javascript"
);

console.log(
"Theme:",
localStorage.getItem(
`${storagePrefix}theme`
)
);

console.log(
"Language:",
localStorage.getItem(
`${storagePrefix}language`
)
);

// Storage helper functions
function saveToStorage(key, value) {
localStorage.setItem(
key,
JSON.stringify(value)
);
}

function getFromStorage(key) {
const value = localStorage.getItem(key);

if (value === null) {
return null;
}

try {
return JSON.parse(value);
} catch {
return null;
}
}

function removeFromStorage(key) {
localStorage.removeItem(key);
}

saveToStorage("profile", {
name: "Osama Abu Motlaq",
role: "Frontend Developer",
});

console.log(
"Profile:",
getFromStorage("profile")
);

removeFromStorage("profile");

console.log(
"Profile after removal:",
getFromStorage("profile")
);

// sessionStorage with JSON
const sessionData = {
name: "Osama Abu Motlaq",
currentPage: "browser-storage",
};

sessionStorage.setItem(
"sessionData",
JSON.stringify(sessionData)
);

console.log(
"Session data:",
JSON.parse(
sessionStorage.getItem("sessionData")
)
);

// Storage event
window.addEventListener(
"storage",
(event) => {
console.log(
"Storage event:",
event
);

```
console.log(
  "Changed key:",
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
  "Storage area:",
  event.storageArea
);
```

}
);

// Clear session storage
const clearSessionButton =
document.querySelector(
"#clear-session"
);

if (clearSessionButton) {
clearSessionButton.addEventListener(
"click",
() => {
sessionStorage.clear();

```
  console.log(
    "Session storage cleared."
  );
}
```

);
}

// Clear local storage
const clearLocalButton =
document.querySelector(
"#clear-local"
);

if (clearLocalButton) {
clearLocalButton.addEventListener(
"click",
() => {
localStorage.clear();

```
  console.log(
    "Local storage cleared."
  );
}
```

);
}

// Inspect all localStorage entries
const allLocalStorage = {};

for (
let index = 0;
index < localStorage.length;
index++
) {
const key = localStorage.key(index);

if (key !== null) {
allLocalStorage[key] =
localStorage.getItem(key);
}
}

console.log(
"All localStorage entries:",
allLocalStorage
);

// Storage availability check
function isStorageAvailable(storage) {
try {
const testKey =
"**storage_test**";

```
storage.setItem(
  testKey,
  "test"
);

storage.removeItem(testKey);

return true;
```

} catch {
return false;
}
}

console.log(
"localStorage available:",
isStorageAvailable(localStorage)
);

console.log(
"sessionStorage available:",
isStorageAvailable(sessionStorage)
);

// Theme preference example
const themeKey =
"javascript-reference:theme";

const savedTheme =
localStorage.getItem(themeKey);

const theme =
savedTheme ?? "light";

console.log(
"Current theme:",
theme
);

// Save theme
function saveTheme(themeName) {
localStorage.setItem(
themeKey,
themeName
);
}

saveTheme("dark");

console.log(
"Saved theme:",
localStorage.getItem(themeKey)
);
