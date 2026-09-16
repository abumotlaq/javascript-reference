# DOM Practical Patterns

## Introduction

Learning individual DOM APIs is important, but real development requires combining them into practical patterns.

Instead of memorizing isolated methods such as:

```javascript
querySelector();
addEventListener();
classList.add();
createElement();
append();
```

you should learn how these APIs work together to solve common UI problems.

This file focuses on practical DOM patterns for:

* Selecting elements.
* Handling user interactions.
* Updating content.
* Creating dynamic elements.
* Managing classes.
* Working with forms.
* Event delegation.
* Filtering and searching.
* Showing and hiding UI.
* Creating reusable functions.
* Rendering lists.
* Managing state.
* Working with APIs.
* Cleaning up event listeners.
* Avoiding unnecessary DOM work.
* Writing maintainable DOM code.

The goal is not to memorize recipes.

The goal is to understand the patterns behind them.

---

# 1. The General DOM Pattern

A large amount of DOM code follows this structure:

```text
Select
   ↓
Read
   ↓
Decide
   ↓
Update
   ↓
Listen for future changes
```

For example:

```javascript
const button = document.querySelector("#toggle-button");
const panel = document.querySelector("#panel");

button.addEventListener("click", () => {
  panel.classList.toggle("hidden");
});
```

The pattern is:

```text
Select elements
      ↓
Listen for event
      ↓
Change UI
```

---

# 2. Cache DOM References

If you repeatedly use the same element, store a reference.

Instead of:

```javascript
document.querySelector("#title").textContent = "Osama Abu Motlaq";

document.querySelector("#title").classList.add("active");

document.querySelector("#title").setAttribute("title", "Profile");
```

prefer:

```javascript
const title = document.querySelector("#title");

title.textContent = "Osama Abu Motlaq";
title.classList.add("active");
title.setAttribute("title", "Profile");
```

This improves:

* Readability.
* Maintainability.
* Code organization.

It also avoids repeating the same DOM query.

---

# 3. Validate DOM References

A selector may fail.

For example:

```javascript
const button = document.querySelector("#submit");
```

If the element does not exist:

```javascript
button.addEventListener("click", handleClick);
```

will fail because:

```javascript
button === null;
```

A defensive pattern is:

```javascript
const button = document.querySelector("#submit");

if (button) {
  button.addEventListener("click", handleClick);
}
```

Use this when the element is genuinely optional.

Do not blindly add null checks everywhere if the application guarantees that the element exists.

---

# 4. Use Specific Selectors

Prefer selectors that clearly identify the intended element.

For example:

```javascript
const form = document.querySelector("#contact-form");
```

or:

```javascript
const button = document.querySelector('[data-action="save"]');
```

instead of relying on broad selectors such as:

```javascript
document.querySelector("div");
```

Specific selectors make code easier to understand and less fragile.

---

# 5. Use `data-*` for Behavior Hooks

A useful pattern is:

```html
<button data-action="delete">
  Delete
</button>
```

JavaScript:

```javascript
const button = document.querySelector('[data-action="delete"]');
```

This separates:

```text
CSS classes → presentation
data attributes → JavaScript behavior
```

For example:

```html
<button class="button button-danger" data-action="delete">
  Delete
</button>
```

The class controls styling.

The `data-action` attribute communicates behavior.

---

# 6. Pattern: Toggle Visibility

A common UI pattern is showing and hiding content.

HTML:

```html
<button id="toggle-button">
  Toggle
</button>

<div id="panel">
  <p>Osama Abu Motlaq</p>
</div>
```

JavaScript:

```javascript
const button = document.querySelector("#toggle-button");
const panel = document.querySelector("#panel");

button.addEventListener("click", () => {
  panel.classList.toggle("hidden");
});
```

The important idea is:

```text
Event
  ↓
Toggle class
  ↓
CSS controls visibility
```

This is usually preferable to repeatedly modifying inline styles.

---

# 7. Pattern: Add an Active State

Suppose a navigation item should become active.

```javascript
const links = document.querySelectorAll(".nav-link");

links.forEach((link) => {
  link.addEventListener("click", () => {
    links.forEach((item) => {
      item.classList.remove("active");
    });

    link.classList.add("active");
  });
});
```

The pattern is:

```text
Remove active state
        ↓
Add active state
        ↓
Render new UI state
```

---

# 8. Pattern: Toggle a Single State

For a simple toggle:

```javascript
button.addEventListener("click", () => {
  button.classList.toggle("active");
});
```

You can also check the result:

```javascript
button.addEventListener("click", () => {
  const isActive = button.classList.toggle("active");

  console.log(isActive);
});
```

`classList.toggle()` returns:

```text
true  → class was added
false → class was removed
```

---

# 9. Pattern: Toggle With `aria-expanded`

For accessible expandable UI:

```html
<button
  id="menu-button"
  aria-expanded="false"
>
  Menu
</button>

<nav id="menu" hidden>
  ...
</nav>
```

JavaScript:

```javascript
const button = document.querySelector("#menu-button");
const menu = document.querySelector("#menu");

button.addEventListener("click", () => {
  const isOpen = button.getAttribute("aria-expanded") === "true";

  button.setAttribute("aria-expanded", String(!isOpen));
  menu.hidden = isOpen;
});
```

The DOM state now communicates the UI state.

---

# 10. Pattern: Use the `hidden` Property

Instead of:

```javascript
element.style.display = "none";
```

you can use:

```javascript
element.hidden = true;
```

To show it:

```javascript
element.hidden = false;
```

This is useful for simple show/hide behavior.

HTML:

```html
<div id="message" hidden>
  Saved successfully.
</div>
```

JavaScript:

```javascript
message.hidden = false;
```

---

# 11. Pattern: Update Text

For simple text updates:

```javascript
const status = document.querySelector("#status");

status.textContent = "Saved successfully.";
```

This is the preferred pattern when the content is text.

Avoid:

```javascript
status.innerHTML = userInput;
```

when HTML interpretation is unnecessary.

---

# 12. Pattern: Update Multiple Elements

Suppose the UI contains:

```html
<h1 id="name"></h1>
<p id="email"></p>
```

You can update them together:

```javascript
const nameElement = document.querySelector("#name");
const emailElement = document.querySelector("#email");

nameElement.textContent = "Osama Abu Motlaq";
emailElement.textContent = "osama@example.com";
```

For larger applications, grouping these operations into a rendering function can improve organization.

---

# 13. Pattern: Create an Element

```javascript
const paragraph = document.createElement("p");

paragraph.textContent = "Osama Abu Motlaq";

document.body.append(paragraph);
```

The pattern is:

```text
createElement()
      ↓
configure element
      ↓
append()
```

---

# 14. Pattern: Create a Card

```javascript
function createCard(title, description) {
  const card = document.createElement("article");
  const heading = document.createElement("h2");
  const text = document.createElement("p");

  heading.textContent = title;
  text.textContent = description;

  card.append(heading, text);

  return card;
}
```

Use it:

```javascript
const card = createCard(
  "JavaScript",
  "A programming language for web development."
);

document.querySelector("#container").append(card);
```

This is a reusable DOM factory pattern.

---

# 15. Pattern: Render a List

Suppose you have:

```javascript
const projects = [
  "Portfolio",
  "E-Commerce",
  "Admin Dashboard"
];
```

You can render them:

```javascript
const list = document.querySelector("#projects");

projects.forEach((project) => {
  const item = document.createElement("li");

  item.textContent = project;

  list.append(item);
});
```

The pattern is:

```text
Data
 ↓
Loop
 ↓
Create element
 ↓
Set content
 ↓
Append
```

---

# 16. Pattern: Clear Before Rendering

If you render the same container multiple times, old content may remain.

Use:

```javascript
list.replaceChildren();
```

Then render:

```javascript
projects.forEach((project) => {
  const item = document.createElement("li");

  item.textContent = project;
  list.append(item);
});
```

This prevents duplicated content.

---

# 17. Pattern: Render From State

A simple DOM application can maintain state:

```javascript
let projects = [
  "Portfolio",
  "E-Commerce"
];
```

Then define a rendering function:

```javascript
function renderProjects() {
  const list = document.querySelector("#projects");

  list.replaceChildren();

  projects.forEach((project) => {
    const item = document.createElement("li");

    item.textContent = project;
    list.append(item);
  });
}
```

Whenever state changes:

```javascript
projects.push("Admin Dashboard");

renderProjects();
```

This creates an important mental model:

```text
State
 ↓
Render
 ↓
DOM
```

This idea becomes extremely important when learning React.

---

# 18. Pattern: Separate State From Rendering

Instead of mixing everything inside event handlers:

```javascript
button.addEventListener("click", () => {
  // Modify state
  // Find elements
  // Build HTML
  // Update UI
  // More logic...
});
```

separate responsibilities:

```javascript
let count = 0;

function render() {
  document.querySelector("#count").textContent = count;
}

button.addEventListener("click", () => {
  count += 1;
  render();
});
```

Now:

```text
Event
 ↓
State changes
 ↓
render()
 ↓
DOM updates
```

This is a fundamental UI architecture pattern.

---

# 19. Pattern: Counter

HTML:

```html
<button id="decrease">-</button>
<span id="count">0</span>
<button id="increase">+</button>
```

JavaScript:

```javascript
let count = 0;

const countElement = document.querySelector("#count");
const increaseButton = document.querySelector("#increase");
const decreaseButton = document.querySelector("#decrease");

function render() {
  countElement.textContent = count;
}

increaseButton.addEventListener("click", () => {
  count += 1;
  render();
});

decreaseButton.addEventListener("click", () => {
  count -= 1;
  render();
});

render();
```

The important concept is not the counter itself.

It is the separation:

```text
State → Render
```

---

# 20. Pattern: Form Submission

HTML:

```html
<form id="contact-form">
  <input id="name" name="name" required>
  <button type="submit">Send</button>
</form>
```

JavaScript:

```javascript
const form = document.querySelector("#contact-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const name = formData.get("name");

  console.log(name);
});
```

The pattern is:

```text
Submit
 ↓
preventDefault()
 ↓
Read form data
 ↓
Validate
 ↓
Process
 ↓
Update UI / send request
```

---

# 21. Pattern: Form Validation

```javascript
form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formData = new FormData(form);

  // Process valid data.
});
```

Browser validation is useful for UX.

However, server-side validation is still required for security.

---

# 22. Pattern: Loading State

A UI often needs a loading state during an asynchronous operation.

```javascript
async function submitForm() {
  button.disabled = true;
  button.textContent = "Sending...";

  try {
    await sendData();
    status.textContent = "Message sent.";
  } catch {
    status.textContent = "Something went wrong.";
  } finally {
    button.disabled = false;
    button.textContent = "Send";
  }
}
```

The pattern is:

```text
Idle
 ↓
Loading
 ↓
Success / Error
 ↓
Idle
```

---

# 23. Pattern: Fetch and Render

```javascript
async function loadProjects() {
  const response = await fetch("/api/projects");

  if (!response.ok) {
    throw new Error("Failed to load projects.");
  }

  const projects = await response.json();

  renderProjects(projects);
}
```

The responsibilities are separated:

```text
fetch data
    ↓
parse data
    ↓
render data
```

---

# 24. Pattern: Loading / Error / Success UI

A robust asynchronous UI usually has at least three states:

```text
Loading
Error
Success
```

Example:

```javascript
async function loadProjects() {
  const container = document.querySelector("#projects");

  container.textContent = "Loading...";

  try {
    const response = await fetch("/api/projects");

    if (!response.ok) {
      throw new Error("Failed to load projects.");
    }

    const projects = await response.json();

    renderProjects(projects);
  } catch (error) {
    container.textContent = "Unable to load projects.";
    console.error(error);
  }
}
```

---

# 25. Pattern: Search / Filter

Suppose:

```javascript
const projects = [
  "Portfolio",
  "E-Commerce",
  "Admin Dashboard"
];
```

A filter function:

```javascript
function filterProjects(query) {
  return projects.filter((project) =>
    project.toLowerCase().includes(query.toLowerCase())
  );
}
```

Connect it to an input:

```javascript
searchInput.addEventListener("input", () => {
  const filtered = filterProjects(searchInput.value);

  renderProjects(filtered);
});
```

The pattern is:

```text
Input
 ↓
Read query
 ↓
Filter state/data
 ↓
Render result
```

This is another important pattern that maps directly to React.

---

# 26. Pattern: Empty Search Results

A good UI handles the empty state:

```javascript
function renderProjects(projects) {
  list.replaceChildren();

  if (projects.length === 0) {
    const message = document.createElement("p");

    message.textContent = "No projects found.";

    list.append(message);

    return;
  }

  projects.forEach((project) => {
    const item = document.createElement("li");

    item.textContent = project;
    list.append(item);
  });
}
```

Common UI states include:

```text
Loading
Empty
Success
Error
```

Thinking in states makes UI logic easier to design.

---

# 27. Pattern: Event Delegation

Instead of adding listeners to every item:

```javascript
items.forEach((item) => {
  item.addEventListener("click", handleClick);
});
```

you can listen on the parent:

```javascript
list.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");

  if (!button) {
    return;
  }

  console.log(button.dataset.action);
});
```

This uses event bubbling.

---

# 28. Event Delegation for Dynamic Content

Event delegation is especially useful when elements are created later.

For example:

```javascript
list.innerHTML = `
  <button data-action="delete">Delete</button>
`;
```

A listener attached directly before the button existed would not automatically attach to the new button.

But a parent listener can handle it:

```javascript
list.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");

  if (!button) {
    return;
  }

  if (button.dataset.action === "delete") {
    // Handle delete.
  }
});
```

---

# 29. Pattern: Data Attributes for Item Identity

Suppose each project has an ID:

```javascript
const projects = [
  {
    id: 1,
    title: "Portfolio"
  },
  {
    id: 2,
    title: "E-Commerce"
  }
];
```

Render:

```javascript
function renderProjects(projects) {
  list.replaceChildren();

  projects.forEach((project) => {
    const item = document.createElement("li");

    item.dataset.projectId = project.id;
    item.textContent = project.title;

    list.append(item);
  });
}
```

Then:

```javascript
list.addEventListener("click", (event) => {
  const item = event.target.closest("[data-project-id]");

  if (!item) {
    return;
  }

  const projectId = Number(item.dataset.projectId);

  console.log(projectId);
});
```

Remember:

```text
dataset values are strings
```

so conversion may be necessary.

---

# 30. Pattern: Delete an Item

A practical pattern:

```javascript
list.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action='delete']");

  if (!button) {
    return;
  }

  const item = button.closest("[data-project-id]");

  if (!item) {
    return;
  }

  const projectId = Number(item.dataset.projectId);

  projects = projects.filter(
    (project) => project.id !== projectId
  );

  renderProjects(projects);
});
```

The flow is:

```text
Click
 ↓
Find action
 ↓
Find item ID
 ↓
Update state
 ↓
Render
```

---

# 31. Pattern: Modal

A simple modal can be controlled using classes or the native `<dialog>` element.

With `<dialog>`:

```html
<dialog id="dialog">
  <p>Osama Abu Motlaq</p>
  <button id="close">Close</button>
</dialog>

<button id="open">Open</button>
```

JavaScript:

```javascript
const dialog = document.querySelector("#dialog");
const openButton = document.querySelector("#open");
const closeButton = document.querySelector("#close");

openButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});
```

Using native browser behavior can reduce custom DOM logic.

---

# 32. Pattern: Tabs

Suppose:

```html
<button data-tab="about">About</button>
<button data-tab="projects">Projects</button>

<section data-panel="about">About content</section>
<section data-panel="projects" hidden>
  Projects content
</section>
```

JavaScript:

```javascript
const tabs = document.querySelectorAll("[data-tab]");
const panels = document.querySelectorAll("[data-panel]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.panel !== target;
    });

    tabs.forEach((item) => {
      item.classList.toggle("active", item === tab);
    });
  });
});
```

The important idea is:

```text
Selected tab
     ↓
Find matching panel
     ↓
Show target
     ↓
Hide others
```

---

# 33. Pattern: Accordion

A simple accordion:

```javascript
const buttons = document.querySelectorAll("[data-accordion]");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const panel = button.nextElementSibling;

    panel.hidden = !panel.hidden;
  });
});
```

For production UI, also consider:

* `aria-expanded`.
* Keyboard interaction.
* Focus behavior.
* Appropriate semantic elements.

---

# 34. Pattern: Debouncing Input

Some events can fire very frequently.

For example:

```javascript
searchInput.addEventListener("input", handleSearch);
```

If `handleSearch()` performs an expensive operation or network request, it may run too often.

A debounce function delays execution until the user stops triggering the event.

```javascript
function debounce(callback, delay) {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
```

Use:

```javascript
searchInput.addEventListener(
  "input",
  debounce(handleSearch, 300)
);
```

---

# 35. Debounce Mental Model

Without debounce:

```text
User types:
O
Os
Osa
Osam
Osama

Function:
████████████████████
```

With debounce:

```text
User types:
O
Os
Osa
Osam
Osama
            ↓
        wait 300ms
            ↓
         function
```

Debouncing is useful for:

* Search.
* Autocomplete.
* Validation.
* API queries.

---

# 36. Throttling High-Frequency Events

Throttling limits how frequently a function can execute.

Useful for:

```text
scroll
resize
pointermove
mousemove
```

Conceptually:

```text
Many events
   ↓
Rate limit
   ↓
Controlled execution
```

For visual updates, `requestAnimationFrame()` can often be a better fit.

---

# 37. Pattern: `requestAnimationFrame()`

For browser animation or visual updates:

```javascript
let scheduled = false;

window.addEventListener("scroll", () => {
  if (scheduled) {
    return;
  }

  scheduled = true;

  requestAnimationFrame(() => {
    scheduled = false;

    updateUI();
  });
});
```

This allows visual work to align more closely with the browser's rendering cycle.

---

# 38. Pattern: Cleanup Event Listeners

If you add:

```javascript
element.addEventListener("click", handleClick);
```

you may later need:

```javascript
element.removeEventListener("click", handleClick);
```

The same function reference is required.

Correct:

```javascript
function handleClick() {
  console.log("Clicked");
}

element.addEventListener("click", handleClick);
element.removeEventListener("click", handleClick);
```

This does not work:

```javascript
element.addEventListener("click", () => {
  console.log("Clicked");
});

element.removeEventListener("click", () => {
  console.log("Clicked");
});
```

Those are different function objects.

---

# 39. Pattern: AbortController for Listener Cleanup

You can group event listeners with an `AbortController`.

```javascript
const controller = new AbortController();

button.addEventListener("click", handleClick, {
  signal: controller.signal
});
```

Later:

```javascript
controller.abort();
```

This removes listeners associated with that signal.

This can be useful when creating and destroying UI components.

---

# 40. Pattern: Initialize the Application

Avoid putting every operation at global scope.

Create an initialization function:

```javascript
function init() {
  const button = document.querySelector("#button");

  button.addEventListener("click", handleClick);

  render();
}

function handleClick() {
  // Handle interaction.
}

function render() {
  // Update UI.
}

init();
```

This gives the application a clear entry point.

---

# 41. Pattern: Organize DOM References

For a small application:

```javascript
const elements = {
  form: document.querySelector("#form"),
  input: document.querySelector("#input"),
  list: document.querySelector("#list"),
  status: document.querySelector("#status")
};
```

Then:

```javascript
elements.status.textContent = "Saved.";
```

This can improve readability when many elements are used repeatedly.

Do not over-engineer this for a tiny script.

---

# 42. Pattern: Separate Responsibilities

A maintainable DOM application can use:

```text
State
Rendering
Events
Data/API
Utilities
```

For example:

```javascript
let projects = [];

async function loadProjects() {
  // Data/API responsibility.
}

function renderProjects() {
  // Rendering responsibility.
}

function handleDelete() {
  // Event/application responsibility.
}

function filterProjects() {
  // Data transformation responsibility.
}
```

This is much easier to maintain than one enormous event handler.

---

# 43. Pattern: Small Rendering Functions

Instead of:

```javascript
function updateEverything() {
  // 300 lines of DOM manipulation
}
```

split the UI:

```javascript
function renderHeader() {}

function renderProjects() {}

function renderStatus() {}

function renderFooter() {}
```

Smaller functions make it easier to:

* Test.
* Debug.
* Reuse.
* Understand.
* Change.

---

# 44. Pattern: Render Only What Is Necessary

Avoid rebuilding the entire page for every small change.

Instead of:

```javascript
document.body.innerHTML = completePage;
```

prefer updating the affected part:

```javascript
countElement.textContent = count;
```

or:

```javascript
statusElement.textContent = "Saved.";
```

The principle is:

> Update the smallest UI region that actually changed.

---

# 45. Pattern: Batch DOM Changes

If creating many elements, `DocumentFragment` can help organize the insertion.

```javascript
const fragment = document.createDocumentFragment();

projects.forEach((project) => {
  const item = document.createElement("li");

  item.textContent = project;
  fragment.append(item);
});

list.replaceChildren(fragment);
```

The application builds the nodes first and then inserts them into the document together.

For modern browsers, direct DOM operations are often already efficient, so use fragments when they make the code or update strategy clearer rather than treating them as a mandatory optimization.

---

# 46. Pattern: Use CSS for Visual State

Prefer:

```javascript
element.classList.toggle("active", isActive);
```

with CSS:

```css
.active {
  display: block;
}
```

instead of:

```javascript
element.style.display = isActive ? "block" : "none";
```

Classes are generally easier to maintain because presentation remains in CSS.

Inline styles are still useful for genuinely dynamic values.

---

# 47. Pattern: Use `classList.toggle()` With a Condition

You can explicitly control the class:

```javascript
element.classList.toggle("active", isActive);
```

This means:

```text
isActive === true
    → add active

isActive === false
    → remove active
```

This is often cleaner than:

```javascript
if (isActive) {
  element.classList.add("active");
} else {
  element.classList.remove("active");
}
```

---

# 48. Pattern: Progressive Enhancement

A page can provide useful HTML before JavaScript runs.

For example:

```html
<form action="/contact" method="POST">
  <input name="name" required>
  <button type="submit">Send</button>
</form>
```

JavaScript can enhance it:

```javascript
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Enhanced behavior.
});
```

The principle is:

```text
HTML provides baseline behavior
        +
JavaScript provides enhancement
```

This can improve resilience and accessibility.

---

# 49. Pattern: Feature Detection

Do not assume every browser feature exists in every environment.

For example:

```javascript
if ("IntersectionObserver" in window) {
  // Use IntersectionObserver.
} else {
  // Fallback behavior.
}
```

Feature detection asks:

> Does the environment support this capability?

rather than:

> Which browser is this?

Capability-based checks are generally more robust.

---

# 50. Pattern: Lazy Loading With `loading`

For images:

```html
<img
  src="/images/project.png"
  alt="Project preview"
  loading="lazy"
>
```

This lets the browser defer loading images that are not immediately needed.

Use meaningful `alt` text for informative images.

---

# 51. Pattern: Observe Elements With `IntersectionObserver`

Instead of constantly checking scroll position:

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log("Visible");
    }
  });
});

observer.observe(document.querySelector("#projects"));
```

This is useful for:

* Lazy loading.
* Revealing content.
* Infinite scrolling.
* Visibility tracking.

---

# 52. Pattern: API + Rendering

A practical application often follows:

```text
User interaction
       ↓
Event handler
       ↓
API request
       ↓
Response
       ↓
State/data update
       ↓
Render
```

For example:

```javascript
async function saveProject(project) {
  const response = await fetch("/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(project)
  });

  if (!response.ok) {
    throw new Error("Failed to save project.");
  }

  return response.json();
}
```

Then:

```javascript
try {
  const project = await saveProject(data);

  projects.push(project);
  renderProjects(projects);
} catch {
  showError();
}
```

---

# 53. Pattern: Error State

A UI should have a dedicated error state.

```javascript
function showError(message) {
  status.textContent = message;
  status.classList.add("error");
}
```

Then:

```javascript
try {
  await saveProject(data);
} catch {
  showError("Unable to save the project.");
}
```

Do not expose internal errors or sensitive implementation details to users.

For example, avoid displaying:

```text
Database password invalid
```

Instead:

```text
Unable to complete the request.
```

Log technical details appropriately on trusted systems.

---

# 54. Pattern: Confirmation Before Destructive Actions

For destructive operations:

```javascript
const confirmed = window.confirm(
  "Delete this project?"
);

if (!confirmed) {
  return;
}

deleteProject();
```

For important applications, a custom accessible confirmation dialog may provide better UX than `window.confirm()`.

The important pattern is:

```text
User action
 ↓
Confirmation
 ↓
Destructive operation
```

---

# 55. Pattern: Disable During Submission

Prevent accidental duplicate submissions:

```javascript
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  submitButton.disabled = true;

  try {
    await submitForm();
  } finally {
    submitButton.disabled = false;
  }
});
```

For production code, also consider handling:

* Errors.
* Loading indicators.
* Request cancellation.
* Server-side idempotency where necessary.

---

# 56. Pattern: Avoid Duplicate Event Listeners

Be careful with functions that initialize the same UI repeatedly.

This can accidentally create:

```text
click
 ↓
handler 1
handler 2
handler 3
handler 4
```

One click can then execute the same logic multiple times.

A clear initialization architecture and proper cleanup help prevent this.

---

# 57. Pattern: Use One Parent Listener for Dynamic Lists

For large or dynamic lists:

```javascript
list.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button || !list.contains(button)) {
    return;
  }

  // Handle button.
});
```

This can be more scalable than creating many listeners.

However, event delegation is not automatically better for every UI.

For small static lists, direct listeners can be simpler.

---

# 58. Pattern: Avoid Excessive DOM Queries Inside Loops

Avoid repeatedly querying the same container:

```javascript
projects.forEach((project) => {
  document.querySelector("#projects").append(
    createProjectElement(project)
  );
});
```

Prefer:

```javascript
const list = document.querySelector("#projects");

projects.forEach((project) => {
  list.append(createProjectElement(project));
});
```

This is clearer and avoids unnecessary repeated selection.

---

# 59. Pattern: Use `closest()` for Nested Click Targets

Consider:

```html
<button data-action="delete">
  <span>Delete</span>
</button>
```

If the user clicks the `<span>`:

```javascript
event.target
```

may be the `<span>`.

Use:

```javascript
const button = event.target.closest(
  "[data-action='delete']"
);
```

Now the handler can find the intended actionable ancestor.

This is especially useful with event delegation.

---

# 60. Pattern: Handle Missing Elements Gracefully

Reusable functions should not always assume a DOM structure.

For example:

```javascript
function updateStatus(message) {
  const status = document.querySelector("#status");

  if (!status) {
    return;
  }

  status.textContent = message;
}
```

This is useful when the same JavaScript file may run on multiple pages.

---

# 61. Pattern: Page-Specific Initialization

If one JavaScript bundle serves multiple pages:

```javascript
function initContactPage() {
  const form = document.querySelector("#contact-form");

  if (!form) {
    return;
  }

  form.addEventListener("submit", handleSubmit);
}

function initProjectsPage() {
  const list = document.querySelector("#projects");

  if (!list) {
    return;
  }

  renderProjects();
}

initContactPage();
initProjectsPage();
```

Each page initializes only the features it contains.

---

# 62. Pattern: Avoid Global Variables When Possible

Instead of:

```javascript
var button;
var form;
var projects;
```

prefer module scope:

```javascript
const projects = [];
```

or encapsulate application state:

```javascript
function createApp() {
  let projects = [];

  function render() {}

  function addProject(project) {}

  return {
    render,
    addProject
  };
}
```

This reduces accidental global state.

---

# 63. Pattern: Use Modules

Large DOM applications should be split into modules.

For example:

```text
src/
├── main.js
├── state.js
├── api.js
├── render.js
├── events.js
└── utils.js
```

`api.js`:

```javascript
export async function fetchProjects() {
  // ...
}
```

`render.js`:

```javascript
export function renderProjects(projects) {
  // ...
}
```

`main.js`:

```javascript
import { fetchProjects } from "./api.js";
import { renderProjects } from "./render.js";
```

This keeps responsibilities separated.

---

# 64. Pattern: Build a Small UI Component Function

You can create reusable DOM factories:

```javascript
function createProjectCard(project) {
  const article = document.createElement("article");
  const title = document.createElement("h2");
  const link = document.createElement("a");

  title.textContent = project.title;

  link.textContent = "View project";
  link.href = project.url;

  article.append(title, link);

  return article;
}
```

Then:

```javascript
projects.forEach((project) => {
  list.append(createProjectCard(project));
});
```

This resembles the component idea you will encounter in React.

---

# 65. Pattern: DOM State vs Application State

These are not the same thing.

### DOM state

```javascript
button.disabled = true;
```

The browser element currently has a disabled state.

### Application state

```javascript
let isSubmitting = true;
```

Your JavaScript application tracks a value.

A useful architecture is:

```text
Application state
      ↓
Rendering logic
      ↓
DOM state
```

rather than treating the DOM as the application's only source of truth.

---

# 66. Pattern: One Source of Truth

Suppose you have:

```javascript
let count = 0;
```

Avoid independently storing another count in the DOM:

```html
<span>0</span>
```

and another value somewhere else.

Instead:

```javascript
let count = 0;

function render() {
  countElement.textContent = String(count);
}
```

The JavaScript state is the source of truth.

The DOM represents that state.

---

# 67. Pattern: Derived UI

Suppose:

```javascript
const projects = [
  { title: "Portfolio", completed: true },
  { title: "E-Commerce", completed: false }
];
```

You do not need to store:

```javascript
let completedCount = 1;
```

if it can be derived:

```javascript
const completedCount = projects.filter(
  (project) => project.completed
).length;
```

Then render:

```javascript
countElement.textContent = completedCount;
```

This reduces duplicated state.

---

# 68. Pattern: Avoid Direct DOM Mutation From Everywhere

Bad architecture:

```javascript
function save() {
  document.querySelector("#status").textContent = "Saving...";
}

function deleteProject() {
  document.querySelector("#status").textContent = "Deleting...";
}

function loadProjects() {
  document.querySelector("#status").textContent = "Loading...";
}
```

As the application grows, many functions directly manipulate the same UI.

A clearer architecture is:

```javascript
let status = "idle";

function renderStatus() {
  statusElement.textContent = status;
}
```

Then:

```javascript
status = "loading";
renderStatus();
```

This makes state transitions explicit.

---

# 69. Pattern: State Machine Thinking

For more complex UI, define explicit states.

For example:

```javascript
const state = {
  status: "idle",
  error: null
};
```

Possible states:

```text
idle
loading
success
error
```

Then:

```javascript
function render() {
  loadingElement.hidden = state.status !== "loading";
  errorElement.hidden = state.status !== "error";
  successElement.hidden = state.status !== "success";
}
```

This avoids contradictory UI states.

---

# 70. Pattern: Avoid Impossible States

Instead of:

```javascript
let isLoading = false;
let hasError = false;
let isSuccess = false;
```

which theoretically allows:

```text
isLoading = true
hasError = true
isSuccess = true
```

at the same time, use:

```javascript
let status = "idle";
```

with:

```text
idle
loading
success
error
```

A single state variable can make the valid state model clearer.

---

# 71. Pattern: Use Semantic HTML Before JavaScript

Do not use JavaScript to recreate functionality the browser already provides.

Prefer:

```html
<button>Save</button>
```

instead of:

```html
<div id="save">Save</div>
```

Prefer:

```html
<form>
```

instead of manually treating a `<div>` as a form.

Prefer:

```html
<dialog>
```

for appropriate dialog use cases.

Prefer:

```html
<button disabled>
```

for disabled controls.

Semantic HTML provides built-in browser behavior and accessibility.

---

# 72. Pattern: Keyboard-Friendly Interactions

A clickable element should usually be a semantic control.

Good:

```html
<button id="save">Save</button>
```

Avoid:

```html
<div id="save">Save</div>
```

with complicated JavaScript attempting to reproduce button behavior.

Using native elements gives you:

* Keyboard interaction.
* Focus behavior.
* Accessibility semantics.
* Browser behavior.

---

# 73. Pattern: Focus Management

After opening a custom UI element, consider where focus should go.

For example:

```javascript
dialog.showModal();

dialog.querySelector("input")?.focus();
```

When closing a dialog, restoring focus to the trigger can also improve keyboard usability.

Accessibility is part of practical DOM development, not a separate feature.

---

# 74. Pattern: Use `aria-*` Carefully

ARIA can communicate state when native HTML does not provide the necessary semantics.

Example:

```javascript
button.setAttribute(
  "aria-expanded",
  String(isOpen)
);
```

Do not use ARIA to replace native HTML when a suitable semantic element already exists.

A good principle is:

> Use native HTML semantics first; use ARIA to supplement them when necessary.

---

# 75. Pattern: Secure Dynamic Content

When rendering user-controlled text:

```javascript
element.textContent = userInput;
```

When rendering trusted static HTML:

```javascript
element.innerHTML = trustedTemplate;
```

When rendering untrusted HTML that the product genuinely requires, use an appropriate sanitizer before passing the result to an HTML sink.

Do not assume:

```javascript
innerHTML = data;
```

is safe because the data came from your database.

---

# 76. Pattern: Use AbortController for Fetch Requests

For requests that may become unnecessary:

```javascript
const controller = new AbortController();

fetch("/api/projects", {
  signal: controller.signal
});
```

Cancel:

```javascript
controller.abort();
```

This is useful when:

* A page is being destroyed.
* A newer request replaces an older request.
* A user cancels an operation.

---

# 77. Pattern: Avoid Race Conditions in Search

Imagine:

```text
User types:
Java
JavaScript
```

The request for:

```text
Java
```

might finish after:

```text
JavaScript
```

and incorrectly overwrite the newer result.

Possible solutions include:

* `AbortController`.
* Request IDs.
* Ignoring stale responses.
* Debouncing.

Example:

```javascript
let requestId = 0;

async function search(query) {
  const id = ++requestId;

  const response = await fetch(
    `/api/search?q=${encodeURIComponent(query)}`
  );

  const results = await response.json();

  if (id !== requestId) {
    return;
  }

  renderResults(results);
}
```

The latest request becomes authoritative.

---

# 78. Pattern: URL Encoding

When constructing query parameters, do not manually concatenate unescaped user input.

Avoid:

```javascript
const url = `/api/search?q=${query}`;
```

Prefer:

```javascript
const params = new URLSearchParams({
  q: query
});

const url = `/api/search?${params}`;
```

This correctly handles characters that have special meaning in URLs.

---

# 79. Pattern: Read URL Parameters

```javascript
const params = new URLSearchParams(
  window.location.search
);

const query = params.get("q");
```

Treat the result as untrusted input.

If displaying it:

```javascript
title.textContent = query ?? "";
```

Do not automatically turn it into HTML.

---

# 80. Pattern: Keep Data Processing Separate From Rendering

Instead of:

```javascript
function renderProjects(query) {
  // fetch
  // filter
  // sort
  // create DOM
  // update state
  // ...
}
```

separate transformations:

```javascript
function filterProjects(projects, query) {
  return projects.filter((project) =>
    project.title
      .toLowerCase()
      .includes(query.toLowerCase())
  );
}
```

Then:

```javascript
const filtered = filterProjects(projects, query);

renderProjects(filtered);
```

This makes data logic easier to test.

---

# 81. Pattern: Pure Rendering Functions

A rendering function is easier to reason about when its output depends only on its inputs.

For example:

```javascript
function createProjectCard(project) {
  const article = document.createElement("article");

  article.textContent = project.title;

  return article;
}
```

Given the same project, the function produces the same structure.

The function still creates a DOM node, so it is not mathematically pure in the strict functional-programming sense, but its behavior is predictable because it does not depend on hidden application state.

---

# 82. Pattern: Avoid Layout Thrashing

Do not repeatedly alternate layout reads and writes.

Potentially inefficient:

```javascript
element.style.width = "100px";

console.log(element.offsetWidth);

element.style.width = "200px";

console.log(element.offsetWidth);
```

A better pattern is to group reads:

```javascript
const width = element.offsetWidth;
```

then perform writes:

```javascript
element.style.width = "200px";
```

The general rule is:

```text
Read
Read
Read
↓
Write
Write
Write
```

rather than:

```text
Read
Write
Read
Write
Read
Write
```

---

# 83. Pattern: Prefer CSS Animations

Instead of repeatedly changing:

```javascript
element.style.left = `${x}px`;
```

during an animation, CSS transitions or animations are often more appropriate.

For many visual animations, properties such as:

```text
transform
opacity
```

can be more efficient than repeatedly changing layout-affecting properties.

JavaScript should usually control state while CSS handles presentation and animation.

---

# 84. Pattern: Cleanup Observers

If you create:

```javascript
const observer = new IntersectionObserver(callback);

observer.observe(element);
```

you may later need:

```javascript
observer.disconnect();
```

Cleanup matters when UI sections are removed or replaced.

The same principle applies to:

* Event listeners.
* Timers.
* Observers.
* Fetch requests.
* Subscriptions.

---

# 85. Pattern: Cleanup Timers

If you create:

```javascript
const timeoutId = setTimeout(() => {
  console.log("Done");
}, 1000);
```

you can cancel it:

```javascript
clearTimeout(timeoutId);
```

For intervals:

```javascript
const intervalId = setInterval(update, 1000);

clearInterval(intervalId);
```

Long-lived timers can keep code running after UI is no longer needed.

---

# 86. Pattern: Build UI From Data, Not From Repeated HTML

Instead of manually writing:

```html
<li>Portfolio</li>
<li>E-Commerce</li>
<li>Admin Dashboard</li>
```

store data:

```javascript
const projects = [
  "Portfolio",
  "E-Commerce",
  "Admin Dashboard"
];
```

Then render:

```javascript
function renderProjects(projects) {
  list.replaceChildren();

  projects.forEach((project) => {
    const item = document.createElement("li");

    item.textContent = project;
    list.append(item);
  });
}
```

This makes dynamic changes much easier.

---

# 87. Pattern: Complete Small DOM Application

HTML:

```html
<form id="project-form">
  <input
    id="project-input"
    name="project"
    required
  >

  <button type="submit">
    Add Project
  </button>
</form>

<ul id="project-list"></ul>

<p id="status"></p>
```

JavaScript:

```javascript
const form = document.querySelector("#project-form");
const input = document.querySelector("#project-input");
const list = document.querySelector("#project-list");
const status = document.querySelector("#status");

let projects = [];

function renderProjects() {
  list.replaceChildren();

  if (projects.length === 0) {
    status.textContent = "No projects yet.";
    return;
  }

  status.textContent = `${projects.length} project(s)`;

  projects.forEach((project) => {
    const item = document.createElement("li");

    item.textContent = project;

    list.append(item);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const value = input.value.trim();

  if (!value) {
    return;
  }

  projects.push(value);

  input.value = "";

  renderProjects();
});

renderProjects();
```

The architecture is:

```text
User submits form
       ↓
Read input
       ↓
Validate
       ↓
Update state
       ↓
Render
       ↓
DOM
```

This small example contains several major DOM patterns.

---

# 88. A More Scalable Version

As the application grows, separate concerns:

```javascript
const state = {
  projects: [],
  status: "idle"
};

function addProject(title) {
  state.projects.push({
    id: crypto.randomUUID(),
    title
  });
}

function renderProjects() {
  // Render state.projects.
}

function handleSubmit(event) {
  event.preventDefault();

  const title = input.value.trim();

  if (!title) {
    return;
  }

  addProject(title);

  input.value = "";

  renderProjects();
}
```

Now the architecture is clearer:

```text
State
 ↓
Actions
 ↓
Render
```

This is conceptually similar to the architecture used by modern UI frameworks.

---

# 89. DOM Patterns and React

These patterns are extremely useful for understanding React.

For example:

### Vanilla DOM

```javascript
let count = 0;

function render() {
  element.textContent = count;
}

button.addEventListener("click", () => {
  count += 1;
  render();
});
```

### React

Conceptually:

```jsx
const [count, setCount] = useState(0);

<button onClick={() => setCount(count + 1)}>
  {count}
</button>
```

The fundamental idea remains:

```text
State
 ↓
UI
```

React automates much of the DOM update process.

---

# 90. DOM Direct Manipulation vs React

In vanilla JavaScript:

```javascript
element.textContent = value;
element.classList.toggle("active", isActive);
```

You manually update the DOM.

In React:

```jsx
<div className={isActive ? "active" : ""}>
  {value}
</div>
```

You describe what the UI should look like for the current state.

React then manages DOM updates.

Therefore, learning DOM is still valuable for React developers.

It explains what React is abstracting.

---

# 91. Practical DOM Patterns You Should Know for React

Prioritize understanding:

```text
1. querySelector / querySelectorAll
2. Events
3. event.target
4. event.currentTarget
5. Forms
6. textContent
7. classList
8. createElement
9. append
10. event delegation
11. state → render thinking
12. async data → UI
13. loading/error/empty states
14. cleanup
15. accessibility
16. DOM security
17. performance
```

You do not need to become a professional vanilla-DOM specialist before learning React.

But understanding these concepts makes React much easier to understand.

---

# 92. Practical DOM Patterns for Next.js

Next.js developers will usually work with React rather than directly manipulating the DOM.

However, DOM knowledge remains useful for:

* Browser APIs.
* `useRef`.
* Focus management.
* Measuring elements.
* Integrating third-party libraries.
* Animations.
* Canvas.
* Web APIs.
* Debugging.
* Understanding hydration/client behavior.

Direct DOM manipulation should generally be reserved for cases where it is actually necessary.

---

# 93. A Practical Decision Guide

When building a DOM feature, ask:

### Do I need text?

Use:

```javascript
textContent
```

### Do I need a CSS state?

Use:

```javascript
classList
```

### Do I need an attribute?

Use:

```javascript
setAttribute()
```

or the appropriate DOM property.

### Do I need a new element?

Use:

```javascript
createElement()
```

### Do I need to insert nodes?

Use:

```javascript
append()
prepend()
before()
after()
replaceChildren()
```

### Do I need user interaction?

Use:

```javascript
addEventListener()
```

### Do I have many dynamic items?

Consider:

```javascript
event delegation
```

### Do I need HTML from a string?

Consider:

```javascript
innerHTML
```

only when HTML interpretation is genuinely required and the content is appropriately trusted or sanitized.

### Do I need application state?

Keep it in JavaScript rather than treating the DOM as your database.

---

# 94. Common Mistakes

## Mistake 1: Putting Everything in One Event Handler

Bad:

```javascript
button.addEventListener("click", () => {
  // Huge amount of logic.
});
```

Prefer small functions with clear responsibilities.

---

## Mistake 2: Using `innerHTML` Everywhere

Use DOM APIs or `textContent` when HTML parsing is unnecessary.

---

## Mistake 3: Re-querying the Same Element

Cache frequently used references.

---

## Mistake 4: Rebuilding the Entire Page

Update the smallest required region.

---

## Mistake 5: Ignoring Loading and Error States

Async UI needs more than a success state.

---

## Mistake 6: Treating the DOM as Application State

Keep important state in JavaScript.

---

## Mistake 7: Forgetting Cleanup

Clean up:

* Event listeners.
* Timers.
* Observers.
* Requests.
* Subscriptions.

---

## Mistake 8: Ignoring Accessibility

Use semantic HTML and appropriate ARIA state.

---

## Mistake 9: Trusting User Input

Use safe DOM APIs and validate data.

---

## Mistake 10: Over-Optimizing Too Early

Do not introduce complicated performance techniques before identifying an actual performance problem.

---

# 95. Practical DOM Checklist

Before considering a DOM feature complete, ask:

### Selection

* Am I selecting the correct element?
* Could the element be missing?

### Events

* Is the event appropriate?
* Do I need delegation?
* Could duplicate listeners be attached?

### State

* Where is the application's source of truth?
* Am I duplicating state unnecessarily?

### Rendering

* Am I updating only what changed?
* Could CSS handle the visual state?

### Security

* Is any input untrusted?
* Am I using `innerHTML`?
* Am I dynamically creating URLs or executable content?

### Accessibility

* Am I using semantic HTML?
* Does the UI work with a keyboard?
* Are dynamic states communicated appropriately?

### Performance

* Am I repeatedly querying the DOM?
* Am I causing unnecessary layout work?
* Are high-frequency events controlled?

### Cleanup

* Do listeners need removal?
* Do timers need cancellation?
* Do observers need disconnection?
* Can requests be aborted?

---

# 96. Quick Reference

| Goal                       | Common Pattern                       |
| -------------------------- | ------------------------------------ |
| Select one element         | `querySelector()`                    |
| Select many elements       | `querySelectorAll()`                 |
| Read text                  | `textContent`                        |
| Change text                | `textContent = ...`                  |
| Add/remove CSS state       | `classList`                          |
| Create element             | `createElement()`                    |
| Insert node                | `append()`                           |
| Clear children             | `replaceChildren()`                  |
| Handle interaction         | `addEventListener()`                 |
| Find clicked ancestor      | `closest()`                          |
| Read custom data           | `dataset`                            |
| Handle forms               | `FormData`                           |
| Prevent form navigation    | `preventDefault()`                   |
| Render dynamic list        | Data → elements → append             |
| Handle dynamic list events | Event delegation                     |
| Hide element               | `hidden`                             |
| Observe visibility         | `IntersectionObserver`               |
| Cancel request             | `AbortController`                    |
| Delay repeated input       | Debounce                             |
| Limit high-frequency work  | Throttle / `requestAnimationFrame()` |
| Cleanup listener           | `removeEventListener()`              |
| Cleanup observer           | `disconnect()`                       |
| Cleanup timer              | `clearTimeout()` / `clearInterval()` |

---

# 97. The Core UI Architecture

The most important pattern in this entire section is:

```text
                    USER
                     │
                     ↓
                   EVENT
                     │
                     ↓
               EVENT HANDLER
                     │
                     ↓
                 STATE / DATA
                     │
                     ↓
                  RENDER
                     │
                     ↓
                    DOM
                     │
                     ↓
                    UI
```

For asynchronous applications:

```text
EVENT
  ↓
STATE
  ↓
API REQUEST
  ↓
LOADING
  ↓
SUCCESS / ERROR
  ↓
STATE UPDATE
  ↓
RENDER
  ↓
DOM
```

This mental model scales from small vanilla JavaScript applications to React and larger frontend architectures.

---

# Key Takeaways

* Practical DOM development is about combining APIs into repeatable patterns.
* Keep application state separate from the DOM when possible.
* Think in terms of `state → render → UI`.
* Cache frequently used DOM references.
* Use semantic selectors and `data-*` attributes for behavior hooks.
* Prefer `textContent` for text.
* Prefer `classList` for visual state.
* Use `createElement()` and DOM node APIs for dynamic structured content.
* Use `replaceChildren()` when replacing rendered content.
* Use event delegation for appropriate dynamic or large lists.
* Use `closest()` to identify actionable ancestors.
* Handle loading, error, empty, and success states explicitly.
* Separate data processing, event handling, state management, and rendering.
* Use debouncing for input-driven operations that should wait for user inactivity.
* Use throttling or `requestAnimationFrame()` for high-frequency events when appropriate.
* Clean up listeners, timers, observers, and requests when their UI lifecycle ends.
* Prefer CSS for presentation and animation when possible.
* Use semantic HTML before recreating browser behavior with JavaScript.
* Treat external and user-controlled data as untrusted.
* Avoid unsafe HTML and JavaScript execution patterns.
* Do not use client-side DOM state as an authorization mechanism.
* Optimize based on measured problems rather than assumptions.
* DOM knowledge is highly relevant to React because React abstracts much of the manual DOM synchronization you are learning here.

The core principle is:

> **Build UI from data and state, respond to events with focused logic, and update only the DOM that actually needs to change.**
