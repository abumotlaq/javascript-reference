"use strict";

// Basic event delegation
const list = document.querySelector("#user-list");

if (list) {
list.addEventListener("click", (event) => {
const item = event.target.closest(".user-item");

```
if (!item || !list.contains(item)) {
  return;
}

console.log(
  "Clicked user:",
  item.dataset.name
);
```

});
}

// Event delegation with buttons
const projectsList = document.querySelector(
"#projects-list"
);

if (projectsList) {
projectsList.addEventListener("click", (event) => {
const button = event.target.closest(
"button[data-action]"
);

```
if (!button || !projectsList.contains(button)) {
  return;
}

const action = button.dataset.action;
const project = button.closest(".project");

if (!project) {
  return;
}

const projectName = project.dataset.name;

if (action === "view") {
  console.log(
    "View project:",
    projectName
  );
}

if (action === "delete") {
  console.log(
    "Delete project:",
    projectName
  );
}
```

});
}

// Handling dynamically added elements
const dynamicList = document.querySelector(
"#dynamic-list"
);

const addButton = document.querySelector(
"#add-item"
);

if (dynamicList) {
dynamicList.addEventListener("click", (event) => {
const button = event.target.closest(
".dynamic-item"
);

```
if (!button || !dynamicList.contains(button)) {
  return;
}

console.log(
  "Dynamic item clicked:",
  button.textContent
);
```

});
}

if (addButton && dynamicList) {
addButton.addEventListener("click", () => {
const item = document.createElement("button");

```
item.type = "button";
item.className = "dynamic-item";
item.textContent = "New item";

dynamicList.append(item);
```

});
}

// Event delegation using data-action
const actionsContainer = document.querySelector(
"#actions"
);

if (actionsContainer) {
actionsContainer.addEventListener("click", (event) => {
const actionElement = event.target.closest(
"[data-action]"
);

```
if (
  !actionElement ||
  !actionsContainer.contains(actionElement)
) {
  return;
}

const action = actionElement.dataset.action;

switch (action) {
  case "save":
    console.log("Save action.");
    break;

  case "edit":
    console.log("Edit action.");
    break;

  case "delete":
    console.log("Delete action.");
    break;

  default:
    console.log("Unknown action:", action);
}
```

});
}

// Event delegation with nested elements
const cardsContainer = document.querySelector(
"#cards"
);

if (cardsContainer) {
cardsContainer.addEventListener("click", (event) => {
const button = event.target.closest(
".card-button"
);

```
if (!button || !cardsContainer.contains(button)) {
  return;
}

const card = button.closest(".card");

if (!card) {
  return;
}

console.log(
  "Card:",
  card.dataset.name
);

console.log(
  "Action:",
  button.dataset.action
);
```

});
}

// target vs currentTarget
const menu = document.querySelector("#menu");

if (menu) {
menu.addEventListener("click", (event) => {
console.log("Target:", event.target);
console.log(
"Current target:",
event.currentTarget
);
});
}

// Delegating form-related actions
const formContainer = document.querySelector(
"#form-container"
);

if (formContainer) {
formContainer.addEventListener("click", (event) => {
const button = event.target.closest(
"button[data-action]"
);

```
if (
  !button ||
  !formContainer.contains(button)
) {
  return;
}

const action = button.dataset.action;

if (action === "clear") {
  const form = formContainer.querySelector(
    "form"
  );

  form?.reset();

  console.log("Form cleared.");
}

if (action === "focus-name") {
  const input = formContainer.querySelector(
    "#username"
  );

  input?.focus();

  console.log("Username field focused.");
}
```

});
}

// Delegation with checkbox inputs
const skillsContainer = document.querySelector(
"#skills"
);

if (skillsContainer) {
skillsContainer.addEventListener(
"change",
(event) => {
const checkbox = event.target.closest(
'input[type="checkbox"][data-skill]'
);

```
  if (
    !checkbox ||
    !skillsContainer.contains(checkbox)
  ) {
    return;
  }

  console.log(
    "Skill:",
    checkbox.dataset.skill
  );

  console.log(
    "Selected:",
    checkbox.checked
  );
}
```

);
}

// Delegation with radio inputs
const rolesContainer = document.querySelector(
"#roles"
);

if (rolesContainer) {
rolesContainer.addEventListener(
"change",
(event) => {
const radio = event.target.closest(
'input[type="radio"][name="role"]'
);

```
  if (
    !radio ||
    !rolesContainer.contains(radio)
  ) {
    return;
  }

  if (radio.checked) {
    console.log(
      "Selected role:",
      radio.value
    );
  }
}
```

);
}

// Delegation with keyboard events
const commandList = document.querySelector(
"#command-list"
);

if (commandList) {
commandList.addEventListener(
"keydown",
(event) => {
const item = event.target.closest(
"[data-command]"
);

```
  if (
    !item ||
    !commandList.contains(item)
  ) {
    return;
  }

  if (event.key === "Enter") {
    console.log(
      "Command:",
      item.dataset.command
    );
  }
}
```

);
}

// Removing delegated listener
const container = document.querySelector(
"#container"
);

function handleContainerClick(event) {
const button = event.target.closest("button");

if (!button || !container?.contains(button)) {
return;
}

console.log(
"Button clicked:",
button.textContent
);
}

if (container) {
container.addEventListener(
"click",
handleContainerClick
);

// Example cleanup when needed
// container.removeEventListener(
//   "click",
//   handleContainerClick
// );
}
