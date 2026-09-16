# DOM Best Practices

## Introduction

Writing DOM code that works is easy.

Writing DOM code that remains:

* Readable.
* Maintainable.
* Secure.
* Accessible.
* Performant.
* Testable.
* Easy to extend.

requires stronger design decisions.

DOM best practices are not about memorizing a strict list of rules.

They are about choosing the right browser API and designing the UI around clear responsibilities.

A useful mental model is:

```text
Data / State
     ↓
Application Logic
     ↓
Rendering
     ↓
DOM
     ↓
User
     ↓
Events
     ↓
Application Logic
```

This file summarizes practical principles for writing high-quality DOM code.

---

# 1. Prefer Semantic HTML First

Before writing JavaScript, ask:

> Can HTML already provide the behavior I need?

Prefer:

```html
<button type="button">Save</button>
```

over:

```html
<div id="save">Save</div>
```

Prefer:

```html
<form>
```

over manually recreating form behavior.

Prefer:

```html
<dialog>
```

for appropriate modal/dialog use cases.

Prefer:

```html
<nav>
<main>
<header>
<footer>
<section>
<article>
```

when those semantics describe the content.

Semantic HTML provides browser behavior, accessibility semantics, and clearer structure.

---

# 2. Use JavaScript to Enhance HTML

A strong frontend does not make JavaScript responsible for everything.

A useful principle is:

```text
HTML
 ↓
Structure + semantics

CSS
 ↓
Presentation

JavaScript
 ↓
Behavior + dynamic state
```

For example:

```html
<button id="save-button">
  Save
</button>
```

JavaScript:

```javascript
const saveButton = document.querySelector("#save-button");

saveButton.addEventListener("click", handleSave);
```

The browser already understands that the element is a button.

Do not replace native semantics with unnecessary JavaScript.

---

# 3. Keep JavaScript Behavior Separate From Presentation

Prefer:

```javascript
element.classList.add("active");
```

with:

```css
.active {
  display: block;
}
```

over:

```javascript
element.style.display = "block";
```

for ordinary visual states.

This gives a clearer separation:

```text
JavaScript
   ↓
State

CSS
   ↓
Appearance
```

Inline styles are still appropriate when the value is genuinely dynamic.

---

# 4. Use Specific Selectors

Prefer:

```javascript
document.querySelector("#project-list");
```

or:

```javascript
document.querySelector('[data-action="delete"]');
```

over:

```javascript
document.querySelector("div");
```

A selector should communicate what the code expects to find.

Good selectors make maintenance easier when the HTML changes.

---

# 5. Use IDs Carefully

IDs are useful for unique elements:

```html
<form id="contact-form">
```

Then:

```javascript
const form = document.querySelector("#contact-form");
```

But do not create an application where every element requires a unique ID.

For repeated structures, classes or `data-*` attributes are often more appropriate.

---

# 6. Use `data-*` for JavaScript Hooks

For example:

```html
<button
  class="button button-danger"
  data-action="delete"
>
  Delete
</button>
```

The separation is clear:

```text
class       → styling
data-action → behavior
```

This is often easier to maintain than using CSS class names as the only source of JavaScript behavior.

---

# 7. Cache Frequently Used DOM References

If an element is used repeatedly:

```javascript
const form = document.querySelector("#contact-form");
const input = document.querySelector("#name");
const status = document.querySelector("#status");
```

Then reuse those references.

Avoid repeatedly writing:

```javascript
document.querySelector("#status").textContent = "...";
document.querySelector("#status").classList.add("error");
document.querySelector("#status").setAttribute("role", "alert");
```

Instead:

```javascript
status.textContent = "...";
status.classList.add("error");
status.setAttribute("role", "alert");
```

This improves readability and reduces repeated selection logic.

---

# 8. Do Not Over-Cache Everything

Caching is useful, but excessive abstraction can make simple code harder to understand.

This:

```javascript
const button = document.querySelector("#button");
```

is useful.

Creating a large registry for every element in a tiny script may not be.

Use the simplest structure that keeps the code clear.

---

# 9. Handle Missing Elements Intentionally

A selector can return `null`:

```javascript
const button = document.querySelector("#save");
```

If the element may genuinely be absent:

```javascript
if (!button) {
  return;
}

button.addEventListener("click", handleClick);
```

However, avoid defensive checks everywhere when the application's HTML guarantees the element exists.

There is a difference between:

```text
Defensive programming
```

and:

```text
Hiding a broken DOM contract.
```

---

# 10. Keep Functions Small

Avoid:

```javascript
function handleEverything() {
  // Select elements
  // Read input
  // Validate
  // Send request
  // Update state
  // Render
  // Show notification
  // Handle errors
  // ...
}
```

Prefer:

```javascript
function validateForm() {}

async function submitForm() {}

function renderStatus() {}

function resetForm() {}
```

Small functions are easier to:

* Understand.
* Test.
* Reuse.
* Debug.
* Change.

---

# 11. Give Functions One Clear Responsibility

For example:

```javascript
function renderProjects(projects) {
  // Render projects.
}
```

should not also:

* Save data to a database.
* Read URL parameters.
* Attach unrelated event listeners.
* Perform authentication.
* Send analytics.

Separate responsibilities.

A useful rule:

> A function should have one primary reason to change.

---

# 12. Separate State From Rendering

Instead of making the DOM your source of truth:

```javascript
const count = Number(
  document.querySelector("#count").textContent
);
```

keep state in JavaScript:

```javascript
let count = 0;
```

Then render it:

```javascript
function render() {
  countElement.textContent = String(count);
}
```

The architecture becomes:

```text
State
 ↓
Render
 ↓
DOM
```

This is one of the most important concepts for understanding React.

---

# 13. Prefer One Source of Truth

Avoid keeping the same logical state in multiple places.

Bad:

```javascript
let selectedProject = 1;
```

and separately:

```text
DOM class
selected-project = 1
```

and:

```text
data-selected-id = 1
```

unless each representation serves a specific purpose.

Prefer:

```javascript
let selectedProjectId = 1;
```

and derive the DOM from it.

Duplicated state can become inconsistent.

---

# 14. Prefer Derived Data Over Duplicated State

Suppose:

```javascript
const projects = [
  { title: "Portfolio", completed: true },
  { title: "E-Commerce", completed: false }
];
```

Instead of maintaining:

```javascript
let completedCount = 1;
```

derive it:

```javascript
const completedCount = projects.filter(
  (project) => project.completed
).length;
```

This reduces synchronization problems.

---

# 15. Update Only What Changed

Avoid:

```javascript
document.body.innerHTML = completePage;
```

for every small state change.

Prefer:

```javascript
countElement.textContent = String(count);
```

or:

```javascript
statusElement.textContent = "Saved.";
```

A useful principle is:

> Change the smallest part of the UI that actually changed.

---

# 16. Avoid Unnecessary DOM Reconstruction

This:

```javascript
container.innerHTML = `
  <p>${message}</p>
`;
```

rebuilds the container's contents.

If you only need to change existing text:

```javascript
messageElement.textContent = message;
```

is simpler.

Also remember that replacing DOM content can remove existing child event listeners.

---

# 17. Prefer `textContent` for Text

For plain text:

```javascript
element.textContent = value;
```

is the standard choice.

It avoids treating the value as HTML.

Avoid:

```javascript
element.innerHTML = value;
```

when HTML parsing is unnecessary.

This is both a correctness and security practice.

---

# 18. Treat `innerHTML` as a Specialized Tool

`innerHTML` is useful when you intentionally need to create HTML from a string.

But ask:

> Do I really need HTML parsing here?

If the answer is no:

```javascript
element.textContent = value;
```

or:

```javascript
element.append(child);
```

may be better.

When untrusted HTML genuinely needs to be rendered, use an appropriate sanitization strategy.

---

# 19. Never Execute Strings as JavaScript

Avoid:

```javascript
eval(value);
```

and:

```javascript
new Function(value);
```

These APIs turn strings into executable code.

Do not use them for ordinary application logic.

Usually there is a safer alternative using:

* Functions.
* Objects.
* Maps.
* Modules.
* Event handlers.
* Data structures.

---

# 20. Validate Dynamic URLs

Never blindly trust a user-provided URL.

Avoid:

```javascript
link.href = userInput;
```

without considering what the input contains.

Validate the protocol and expected destination.

For example:

```javascript
function isSafeUrl(value) {
  try {
    const url = new URL(value, window.location.origin);

    return (
      url.protocol === "http:" ||
      url.protocol === "https:"
    );
  } catch {
    return false;
  }
}
```

The correct allowlist depends on the application's requirements.

---

# 21. Do Not Trust the DOM for Authorization

This is not security:

```javascript
if (button.dataset.role === "admin") {
  allowDelete();
}
```

A user can modify the DOM.

Client-side checks can control presentation:

```text
Show / hide button
```

but authorization must be enforced by the trusted server.

---

# 22. Never Put Server Secrets in the DOM

Anything sent to the browser can be inspected.

Avoid exposing:

```text
Private API keys
Database passwords
Service credentials
Server-only secrets
```

through:

```html
data-secret="..."
```

or:

```javascript
window.config = {
  secret: "..."
};
```

A browser application is not a secure location for server-only secrets.

---

# 23. Validate on the Server

Client-side validation:

```javascript
if (!email.includes("@")) {
  return;
}
```

is useful for user experience.

But users can bypass it.

Therefore:

```text
Client validation
      ↓
UX

Server validation
      ↓
Security + correctness
```

The server must validate important data independently.

---

# 24. Use Native Form APIs

Prefer:

```javascript
const formData = new FormData(form);
```

rather than manually reading every input when the form structure already provides the necessary data.

Example:

```javascript
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  console.log(formData.get("name"));
});
```

This works naturally with:

* Text fields.
* Checkboxes.
* Radio buttons.
* Selects.
* Textareas.
* File inputs.

---

# 25. Use the Correct Event for the Job

Use:

```text
click
```

for activation of clickable controls.

Use:

```text
input
```

when you need updates as the user changes a text field.

Use:

```text
change
```

when you care about a committed control value change.

Use:

```text
submit
```

for form submission.

Use:

```text
keydown / keyup
```

when keyboard-level information is genuinely required.

Avoid attaching handlers to unrelated events just because they happen to work.

---

# 26. Prefer `submit` Over a Click Handler for Forms

Bad:

```javascript
submitButton.addEventListener("click", handleSubmit);
```

This can miss other valid submission paths, such as pressing Enter.

Prefer:

```javascript
form.addEventListener("submit", handleSubmit);
```

This lets the form remain the semantic source of submission behavior.

---

# 27. Prefer Event Delegation for Dynamic Collections

When a list contains many dynamic items:

```javascript
list.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");

  if (!button) {
    return;
  }

  // Handle action.
});
```

This avoids attaching a separate listener to every item.

But event delegation is a tool, not a rule.

For small static sets, direct listeners can be simpler.

---

# 28. Use `closest()` for Nested Interactive Content

Suppose:

```html
<button data-action="delete">
  <span>Delete</span>
</button>
```

The click target may be the `<span>`.

Use:

```javascript
const button = event.target.closest(
  "[data-action='delete']"
);
```

rather than assuming:

```javascript
event.target === button;
```

This pattern makes delegated interactions more robust.

---

# 29. Understand `target` vs `currentTarget`

Remember:

```javascript
event.target
```

is where the event originated.

While:

```javascript
event.currentTarget
```

is the element whose listener is currently executing.

For event delegation:

```javascript
list.addEventListener("click", (event) => {
  console.log(event.target);
  console.log(event.currentTarget);
});
```

These may be different elements.

Understanding this prevents many event-handling bugs.

---

# 30. Do Not Stop Propagation Unnecessarily

Avoid adding:

```javascript
event.stopPropagation();
```

just because the event bubbled.

Event propagation is useful.

Stopping it unnecessarily can break:

* Parent handlers.
* Event delegation.
* Third-party integrations.
* Application-level event logic.

Use it only when there is a clear reason.

---

# 31. Use `preventDefault()` for Default Actions

Use:

```javascript
event.preventDefault();
```

when you actually want to prevent a browser default action.

Examples:

* Form navigation.
* Link navigation.
* Custom drag/drop behavior.

Remember:

```text
preventDefault()
    ≠
stopPropagation()
```

One controls default behavior.

The other controls propagation.

---

# 32. Prefer Named Event Handlers When Cleanup Matters

Use:

```javascript
function handleClick() {
  console.log("Clicked");
}

button.addEventListener("click", handleClick);
```

instead of:

```javascript
button.addEventListener("click", () => {
  console.log("Clicked");
});
```

when you know the handler will later need to be removed.

Then:

```javascript
button.removeEventListener("click", handleClick);
```

works correctly.

---

# 33. Clean Up Event Listeners

Long-lived applications may dynamically create and destroy UI.

Clean up:

```javascript
element.removeEventListener(
  "click",
  handleClick
);
```

when the listener is no longer needed.

This reduces the chance of:

* Duplicate handlers.
* Unnecessary work.
* Retained references.
* Lifecycle bugs.

---

# 34. Use `AbortController` for Listener Cleanup

A useful pattern:

```javascript
const controller = new AbortController();

button.addEventListener("click", handleClick, {
  signal: controller.signal
});
```

Cleanup:

```javascript
controller.abort();
```

This can simplify lifecycle management when several listeners belong to the same UI instance.

---

# 35. Clean Up Timers

Always consider the lifetime of:

```javascript
setTimeout();
setInterval();
```

For example:

```javascript
const intervalId = setInterval(updateClock, 1000);
```

Later:

```javascript
clearInterval(intervalId);
```

Timers that outlive their UI can waste resources and create unexpected behavior.

---

# 36. Clean Up Observers

For:

```javascript
const observer = new IntersectionObserver(callback);

observer.observe(element);
```

remember:

```javascript
observer.disconnect();
```

when the observer is no longer needed.

The same principle applies to:

* `MutationObserver`.
* `ResizeObserver`.

---

# 37. Cancel Unnecessary Requests

Use `AbortController`:

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

This is particularly useful for:

* Search.
* Navigation changes.
* Components that are removed.
* Replacing stale requests.

---

# 38. Prevent Race Conditions

Suppose multiple searches happen:

```text
Os
Osa
Osam
Osama
```

The network may return responses out of order.

A stale response should not overwrite a newer result.

Possible strategies:

* Abort previous requests.
* Track request IDs.
* Ignore stale responses.
* Debounce input.

Security and correctness both benefit from explicitly managing asynchronous state.

---

# 39. Use Debouncing Appropriately

For search input:

```javascript
searchInput.addEventListener(
  "input",
  debounce(search, 300)
);
```

This prevents unnecessary work while the user is still typing.

Good use cases:

* Search.
* Autocomplete.
* Expensive validation.
* API queries.

Do not debounce every event automatically.

---

# 40. Use Throttling or `requestAnimationFrame()` for High-Frequency Events

Events such as:

```text
scroll
mousemove
pointermove
resize
```

can fire many times.

For visual work, `requestAnimationFrame()` is often appropriate.

For rate-limiting general work, throttling can help.

Choose the technique based on the type of work.

---

# 41. Avoid Layout Thrashing

Avoid repeatedly switching between:

```text
DOM measurement
DOM mutation
DOM measurement
DOM mutation
```

For example:

```javascript
element.style.width = "100px";

console.log(element.offsetWidth);

element.style.width = "200px";

console.log(element.offsetWidth);
```

Prefer grouping:

```text
Read
Read
Read

Write
Write
Write
```

This reduces unnecessary forced layout work.

---

# 42. Cache Layout Measurements

If a layout value will be used multiple times:

```javascript
const width = element.getBoundingClientRect().width;
```

store it.

Do not repeatedly calculate expensive layout information when the same value is sufficient.

---

# 43. Prefer CSS for Animation

Use:

```css
transition
animation
transform
opacity
```

where appropriate.

JavaScript should usually control the state or trigger the animation rather than manually updating layout every frame.

For many animations, `transform` and `opacity` are more efficient than layout-affecting properties such as:

```text
top
left
width
height
```

---

# 44. Keep DOM Size Reasonable

Large DOM trees increase:

* Parsing work.
* Style calculation.
* Layout cost.
* Memory usage.
* Accessibility processing.

Do not generate thousands of unnecessary wrapper elements.

Use the simplest structure that communicates the UI correctly.

---

# 45. Render Large Lists Carefully

If an application contains a very large amount of data, rendering everything at once may become expensive.

Possible strategies include:

```text
Pagination
Lazy rendering
Virtualization
Incremental rendering
```

Do not introduce virtualization simply because the list looks large.

Measure first.

---

# 46. Use `DocumentFragment` When Appropriate

For batch creation:

```javascript
const fragment = document.createDocumentFragment();

projects.forEach((project) => {
  const item = document.createElement("li");

  item.textContent = project;
  fragment.append(item);
});

list.replaceChildren(fragment);
```

`DocumentFragment` provides a convenient way to build a group of nodes before inserting them.

Modern browsers are already highly optimized, so readability should remain part of the decision.

---

# 47. Prefer Stable DOM Structures

Avoid unnecessarily replacing large parts of the DOM.

Instead of:

```javascript
container.innerHTML = entirePage;
```

prefer:

```javascript
title.textContent = newTitle;
status.textContent = newStatus;
```

Stable DOM structures can preserve:

* Event listeners.
* Focus.
* Scroll position.
* Browser state.
* User interaction state.

---

# 48. Preserve Focus During UI Updates

A rendering operation that replaces an input can unexpectedly remove focus.

For example:

```javascript
container.innerHTML = newMarkup;
```

may destroy the current input element.

Be careful when rebuilding DOM around active controls.

For accessible UI, preserve focus intentionally.

---

# 49. Use Semantic Controls for Interaction

Prefer:

```html
<button>Delete</button>
```

over:

```html
<div>Delete</div>
```

The button already provides:

* Keyboard interaction.
* Focus.
* Activation semantics.
* Accessibility information.

Do not recreate native browser behavior unless necessary.

---

# 50. Do Not Use Click Handlers on Everything

A common beginner pattern is:

```html
<div onclick="...">
```

This is usually weaker than:

```html
<button>
```

with:

```javascript
button.addEventListener("click", handleClick);
```

Native semantics should come first.

---

# 51. Manage Focus Intentionally

For dialogs, menus, and other dynamic UI:

* Move focus to the newly opened interactive region when appropriate.
* Keep keyboard navigation logical.
* Restore focus when the interaction ends when appropriate.

For example:

```javascript
dialog.showModal();

dialog
  .querySelector("input")
  ?.focus();
```

Accessibility is part of correct DOM behavior.

---

# 52. Use ARIA Only When Needed

Do not add:

```html
role="button"
```

to:

```html
<button>
```

The native button already has the correct semantics.

Use ARIA to supplement semantics when native HTML cannot express the required state or relationship.

For example:

```html
<button aria-expanded="false">
```

can communicate expandable state.

---

# 53. Keep Dynamic UI State Accessible

If a control opens a panel:

```javascript
button.setAttribute(
  "aria-expanded",
  String(isOpen)
);
```

The visual state and accessibility state should remain synchronized.

Do not create a UI where:

```text
Visual state → open
ARIA state → closed
```

---

# 54. Provide Meaningful `alt` Text

Informative image:

```html
<img
  src="/osama.png"
  alt="Osama Abu Motlaq"
/>
```

Decorative image:

```html
<img
  src="/decorative-line.svg"
  alt=""
/>
```

The correct `alt` text depends on the image's purpose.

Do not use:

```text
image
photo
picture
```

as generic alternatives without meaningful context.

---

# 55. Do Not Put Important Text Only in CSS

Avoid using:

```css
::before {
  content: "Delete";
}
```

for essential content or controls.

Important information should exist in the HTML or accessible DOM structure.

CSS should primarily control presentation.

---

# 56. Handle Keyboard Interaction Through Native Controls

Using:

```html
<button>
```

gives keyboard support automatically.

If you use:

```html
<div role="button">
```

you may have to reproduce:

* Focus behavior.
* Keyboard activation.
* Accessibility states.

Use native controls whenever possible.

---

# 57. Treat User Input as Untrusted

Potentially untrusted data includes:

```text
Form fields
URL parameters
URL fragments
localStorage
sessionStorage
API responses
Database content
postMessage data
```

Do not assume:

```text
"Database data = trusted data"
```

A database may contain values that originated from a user.

---

# 58. Prefer Safe DOM APIs

For text:

```javascript
element.textContent = value;
```

For classes:

```javascript
element.classList.add("active");
```

For nodes:

```javascript
element.append(child);
```

For structured content:

```javascript
document.createElement(...)
```

Use HTML string parsing only when the application genuinely needs it.

---

# 59. Treat HTML Rendering as a Security Boundary

This:

```javascript
element.innerHTML = html;
```

is not just a rendering operation.

It can become a security boundary.

Whenever you encounter:

```text
innerHTML
outerHTML
insertAdjacentHTML
dangerouslySetInnerHTML
```

ask:

> Where did this data come from?

Then:

> Has it been appropriately trusted or sanitized?

---

# 60. Avoid Writing Your Own HTML Sanitizer

Do not attempt:

```javascript
html.replace(/<script.*?>.*?<\/script>/gi, "");
```

HTML parsing is more complex than regular expressions.

When the product genuinely requires user-controlled HTML, use a well-maintained sanitizer designed for HTML security.

---

# 61. React Does Not Eliminate DOM Security

React normally escapes text inserted through JSX:

```jsx
<p>{userInput}</p>
```

This is safer than directly placing user input into `innerHTML`.

But React provides an explicit HTML escape hatch:

```jsx
<div
  dangerouslySetInnerHTML={{
    __html: html
  }}
/>
```

Use it carefully.

The same security principles still apply.

---

# 62. DOM Best Practices in React

As a React developer, prefer:

```text
State
 ↓
JSX
 ↓
React
 ↓
DOM
```

rather than:

```javascript
document.querySelector(...)
```

for ordinary component UI.

Direct DOM access still has legitimate uses through:

```text
useRef
focus()
measurement
browser APIs
third-party libraries
specialized integrations
```

But it should not become the default React rendering mechanism.

---

# 63. Avoid Manual DOM Synchronization in React

Do not build React components like:

```jsx
function Counter() {
  const button = document.querySelector("#button");
  const output = document.querySelector("#count");

  // Manually update DOM...
}
```

Instead:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>

      <span>{count}</span>
    </>
  );
}
```

React should own the normal UI rendering process.

---

# 64. DOM Knowledge Still Matters for React

Learning DOM deeply is valuable because React is ultimately rendering to the DOM in the browser.

DOM knowledge helps you understand:

* Events.
* Event propagation.
* Forms.
* Focus.
* Accessibility.
* Browser APIs.
* Layout.
* Performance.
* DOM measurements.
* Third-party integrations.
* Why unnecessary DOM work can be expensive.

React abstracts DOM operations.

It does not make the DOM irrelevant.

---

# 65. Use Modules for Larger DOM Applications

Instead of putting everything into:

```text
script.js
```

a growing application can use:

```text
src/
├── main.js
├── state.js
├── events.js
├── render.js
├── api.js
└── utils.js
```

For example:

```javascript
// api.js
export async function fetchProjects() {
  // ...
}
```

```javascript
// render.js
export function renderProjects(projects) {
  // ...
}
```

```javascript
// main.js
import { fetchProjects } from "./api.js";
import { renderProjects } from "./render.js";
```

Modules make dependencies and responsibilities clearer.

---

# 66. Keep Data Logic Separate From DOM Logic

Instead of:

```javascript
function filterAndRenderProjects(query) {
  // filter
  // sort
  // fetch
  // create DOM
  // modify classes
  // ...
}
```

separate:

```javascript
function filterProjects(projects, query) {
  return projects.filter(...);
}
```

from:

```javascript
function renderProjects(projects) {
  // DOM work
}
```

This makes business logic easier to test.

---

# 67. Prefer Predictable Rendering

A useful rendering function should make its output easy to reason about.

For example:

```javascript
function renderProjects(projects) {
  list.replaceChildren();

  projects.forEach((project) => {
    list.append(createProjectCard(project));
  });
}
```

Given a known `projects` array, the resulting DOM should be predictable.

Avoid hidden global dependencies whenever possible.

---

# 68. Avoid Global Mutable State

This:

```javascript
window.projects = [];
window.currentUser = {};
window.isLoading = false;
```

makes the application difficult to reason about.

Prefer module-scoped or encapsulated state:

```javascript
const state = {
  projects: [],
  isLoading: false
};
```

Even better, expose only the operations other modules need.

---

# 69. Encapsulate Application State

For more complex applications:

```javascript
function createProjectStore() {
  let projects = [];

  function getProjects() {
    return [...projects];
  }

  function addProject(project) {
    projects.push(project);
  }

  return {
    getProjects,
    addProject
  };
}
```

This prevents unrelated code from freely changing internal state.

It also prepares you for larger application architectures.

---

# 70. Avoid Premature Abstraction

Not every DOM script needs:

```text
Store
Controller
Repository
ViewModel
Factory
Event Bus
Renderer
Service Layer
```

For a tiny script:

```javascript
const button = document.querySelector("#button");

button.addEventListener("click", () => {
  console.log("Clicked");
});
```

may be the best design.

Use abstractions when complexity justifies them.

---

# 71. Prefer Composition Over Giant DOM Functions

Instead of:

```javascript
function renderApplication() {
  // hundreds of lines
}
```

compose smaller operations:

```javascript
renderHeader();
renderProjects();
renderStatus();
renderFooter();
```

Each piece remains easier to understand.

---

# 72. Use Clear Names

Prefer:

```javascript
const projectList = document.querySelector("#projects");
const submitButton = document.querySelector("#submit");
const errorMessage = document.querySelector("#error");
```

over:

```javascript
const x = document.querySelector("#projects");
const btn = document.querySelector("#submit");
const e = document.querySelector("#error");
```

Good names reduce the amount of code you need to mentally decode.

---

# 73. Avoid Misleading Variable Names

Do not call a collection:

```javascript
const button = document.querySelectorAll(".button");
```

because it is not a button.

Prefer:

```javascript
const buttons = document.querySelectorAll(".button");
```

Similarly:

```javascript
const formData = new FormData(form);
```

is clearer than:

```javascript
const data = new FormData(form);
```

when the context is not obvious.

---

# 74. Avoid Mixing DOM APIs Without a Reason

For example:

```javascript
element.innerHTML = "...";
element.append(...);
element.insertAdjacentHTML(...);
```

all in the same rendering function can make behavior difficult to reason about.

Choose a consistent rendering approach.

A common safe pattern is:

```text
createElement
 ↓
configure
 ↓
append
```

for structured dynamic content.

---

# 75. Do Not Use `innerHTML +=` Casually

This:

```javascript
list.innerHTML += "<li>New item</li>";
```

can rebuild the existing contents.

That may:

* Remove event listeners from child nodes.
* Affect focus.
* Create unnecessary DOM work.
* Introduce security concerns if data is interpolated.

Prefer:

```javascript
const item = document.createElement("li");

item.textContent = "New item";

list.append(item);
```

when appropriate.

---

# 76. Prefer `replaceChildren()` for Full List Re-renders

If the intended behavior is:

```text
replace the list with the current data
```

then:

```javascript
list.replaceChildren(...nodes);
```

or:

```javascript
list.replaceChildren(fragment);
```

communicates that intention clearly.

It is often preferable to rebuilding a large HTML string without a reason.

---

# 77. Measure Before Optimizing

Do not assume:

```text
querySelector is slow
```

or:

```text
DocumentFragment always makes everything faster
```

or:

```text
innerHTML is always faster
```

Performance depends on:

* DOM size.
* Browser.
* Frequency.
* Layout complexity.
* CSS.
* Rendering work.
* Data size.
* Application architecture.

Use browser DevTools and performance measurement.

---

# 78. Use Performance Tools

Useful APIs include:

```javascript
performance.now();
```

and:

```javascript
performance.mark("start");
performance.mark("end");

performance.measure(
  "operation",
  "start",
  "end"
);
```

Browser DevTools can help identify:

* Long tasks.
* Layout work.
* Paint activity.
* Event handler cost.
* Memory growth.

Measure first.

Optimize second.

---

# 79. Avoid Main-Thread Heavy Work

The DOM runs on the browser's main thread.

Heavy synchronous JavaScript can block:

* Rendering.
* Input.
* Animation.
* Event processing.

If CPU-heavy computation does not need DOM access, consider whether a Web Worker is appropriate.

Do not move ordinary lightweight calculations to a worker unnecessarily.

---

# 80. Keep Event Handlers Lightweight

Instead of:

```javascript
button.addEventListener("click", () => {
  // Huge synchronous operation.
});
```

consider:

```text
Event
 ↓
Small state update
 ↓
Async or controlled processing
 ↓
Render
```

A responsive interface depends on keeping the main thread available for user interaction and rendering.

---

# 81. Handle Loading, Error, Empty, and Success States

A robust UI should explicitly consider:

```text
idle
loading
success
empty
error
```

For example:

```javascript
const state = {
  status: "idle",
  data: [],
  error: null
};
```

This is easier to reason about than many unrelated boolean variables.

---

# 82. Prefer Explicit State Over Conflicting Booleans

Avoid:

```javascript
let isLoading = false;
let hasError = false;
let isSuccess = false;
```

because multiple flags can accidentally become true together.

Prefer:

```javascript
let status = "idle";
```

with known values:

```text
idle
loading
success
error
```

This is a simple form of state-machine thinking.

---

# 83. Preserve User Input During Rendering

Be careful when replacing DOM around active form fields.

A full re-render can:

* Reset cursor position.
* Remove selection.
* Remove focus.
* Reset uncontrolled values.

Update only the elements that need to change.

This principle becomes especially important in interactive forms.

---

# 84. Avoid Fighting the Browser

Browsers already provide:

* Form validation.
* Keyboard interactions.
* Focus management basics.
* Native controls.
* Dialog behavior.
* URL parsing.
* Input types.
* Accessibility semantics.

Use the platform when it already solves the problem.

---

# 85. Prefer `URLSearchParams`

Avoid manual query-string concatenation:

```javascript
const url = `/search?q=${query}`;
```

Prefer:

```javascript
const params = new URLSearchParams({
  q: query
});

const url = `/search?${params}`;
```

This is easier to read and correctly handles URL encoding.

---

# 86. Prefer `URL` for URL Manipulation

Instead of manually concatenating URLs:

```javascript
const url = new URL(
  "/projects",
  window.location.origin
);

url.searchParams.set("page", "2");
```

This avoids many string-manipulation mistakes.

---

# 87. Handle Async Errors Explicitly

Do not assume:

```javascript
await fetch("/api/projects");
```

means the request succeeded.

Check:

```javascript
const response = await fetch("/api/projects");

if (!response.ok) {
  throw new Error("Request failed");
}
```

Then:

```javascript
try {
  const data = await loadProjects();
  renderProjects(data);
} catch {
  showError();
}
```

Asynchronous UI should have explicit failure handling.

---

# 88. Do Not Expose Internal Errors to Users

Avoid displaying:

```text
Database connection failed at 10.0.0.5
```

to users.

Prefer:

```text
Unable to complete the request.
```

Technical details belong in appropriate logs, not necessarily in the UI.

---

# 89. Keep Security and UX Separate

For example:

```javascript
if (!email.includes("@")) {
  showValidationError();
  return;
}
```

is UX.

But authorization:

```text
Can this user delete this resource?
```

belongs on the trusted server.

Do not confuse:

```text
UI restriction
```

with:

```text
security enforcement
```

---

# 90. Design With Accessibility From the Beginning

Accessibility should not be a final patch.

Start with:

* Semantic HTML.
* Keyboard support.
* Labels.
* Focus.
* Meaningful text.
* Proper button types.
* Correct form semantics.
* Appropriate ARIA states.

Retrofitting accessibility after a JavaScript-heavy implementation is often much harder.

---

# 91. Use Labels for Form Controls

Prefer:

```html
<label for="email">Email</label>

<input
  id="email"
  name="email"
  type="email"
>
```

over a visually disconnected label.

This improves usability and accessibility.

---

# 92. Use Correct Button Types

Inside forms:

```html
<button type="submit">
  Save
</button>
```

For a non-submit control:

```html
<button type="button">
  Cancel
</button>
```

Without an explicit `type`, a button inside a form can behave as a submit button.

Choosing the correct type prevents unintended form submissions.

---

# 93. Avoid Click-Only Interactions

Do not design an interaction that only works with:

```text
mouse click
```

when the control can be keyboard accessible through native HTML.

Prefer:

```html
<button>
```

rather than building custom clickable elements.

---

# 94. Keep Dynamic State Synchronized

If an accordion is open:

```javascript
panel.hidden = false;

button.setAttribute("aria-expanded", "true");
```

Both visual and semantic state should agree.

Avoid:

```text
Panel visible
ARIA says closed
```

or:

```text
Panel hidden
ARIA says expanded
```

---

# 95. Avoid Memory Leaks

DOM-related memory problems often come from long-lived references to objects that should no longer be active.

Potential sources include:

* Event listeners.
* Timers.
* Observers.
* Subscriptions.
* Closures holding large structures.
* Third-party libraries.

Correct cleanup is part of lifecycle management.

---

# 96. Use WeakMap for DOM-Associated Metadata When Appropriate

If you need metadata associated with DOM nodes:

```javascript
const metadata = new WeakMap();

const button = document.querySelector("#save");

metadata.set(button, {
  action: "save"
});
```

The node can be garbage-collected when no longer reachable elsewhere.

This is useful for certain library and infrastructure patterns.

Do not use `WeakMap` just to make ordinary application code look more advanced.

---

# 97. Keep DOM Traversal Simple

Prefer clear relationships:

```javascript
const card = button.closest(".card");
```

over deeply chained traversal like:

```javascript
button.parentElement
  .parentElement
  .children[0]
  .nextElementSibling;
```

When traversal becomes complex, consider improving the HTML structure or using a meaningful selector.

---

# 98. Prefer `closest()` Over Fragile Parent Chains

Fragile:

```javascript
button.parentElement.parentElement;
```

More robust:

```javascript
button.closest("[data-project]");
```

The second version expresses what you actually mean.

It remains more resilient if the internal markup changes.

---

# 99. Scope Queries

If you already know the relevant container:

```javascript
const card = event.target.closest(".project-card");

if (!card) {
  return;
}

const title = card.querySelector(".project-title");
```

This is often better than querying the entire document for every element.

It also makes the relationship between elements explicit.

---

# 100. Use `querySelectorAll()` Carefully

Remember:

```javascript
document.querySelectorAll(".item");
```

returns a static `NodeList`.

It does not automatically update when new matching elements are added later.

For dynamic collections, either:

* Re-query.
* Use event delegation.
* Maintain application state.
* Choose a live collection only when its behavior is actually useful.

---

# 101. Do Not Use `for...in` for DOM Collections

Avoid:

```javascript
for (const index in elements) {
  // ...
}
```

Prefer:

```javascript
for (const element of elements) {
  // ...
}
```

or:

```javascript
elements.forEach((element) => {
  // ...
});
```

when supported by the collection.

---

# 102. Convert Collections to Arrays When Necessary

If you need array-specific methods:

```javascript
const items = Array.from(
  document.querySelectorAll(".item")
);
```

or:

```javascript
const items = [
  ...document.querySelectorAll(".item")
];
```

Do this when it improves the logic.

Do not convert collections automatically when it provides no benefit.

---

# 103. Avoid Unnecessary DOM Mutation

Every DOM mutation can have consequences for:

* Layout.
* Paint.
* Event behavior.
* Focus.
* Accessibility tree.
* Observers.

This does not mean:

> Never modify the DOM.

It means:

> Make deliberate, minimal updates.

---

# 104. Prefer State Changes That Lead to Predictable UI Updates

Instead of scattered mutations:

```javascript
panel.hidden = false;
button.classList.add("active");
button.setAttribute("aria-expanded", "true");
```

spread across many unrelated functions, consider centralizing the UI state:

```javascript
const state = {
  isPanelOpen: true
};
```

Then:

```javascript
function render() {
  panel.hidden = !state.isPanelOpen;
  button.classList.toggle("active", state.isPanelOpen);

  button.setAttribute(
    "aria-expanded",
    String(state.isPanelOpen)
  );
}
```

This keeps related UI state synchronized.

---

# 105. Keep DOM Code Testable

Pure data transformation:

```javascript
function filterProjects(projects, query) {
  return projects.filter((project) =>
    project.title
      .toLowerCase()
      .includes(query.toLowerCase())
  );
}
```

is easier to test than:

```javascript
function filterProjects() {
  // Read input.
  // Query DOM.
  // Filter.
  // Modify classes.
  // Replace content.
}
```

Separate logic from DOM work whenever practical.

---

# 106. Prefer Deterministic Data Functions

Functions such as:

```javascript
function sortProjects(projects) {}
function filterProjects(projects, query) {}
function getCompletedProjects(projects) {}
```

should ideally operate on data rather than reaching into the DOM.

This makes them reusable in:

* Vanilla JavaScript.
* React.
* Tests.
* Node.js.
* Server-side code.

---

# 107. Do Not Mutate Data Unnecessarily

Prefer clear transformations:

```javascript
const filtered = projects.filter(...);
```

over mutating shared arrays from multiple places without clear ownership.

Immutability is not mandatory for every vanilla DOM application, but predictable data flow makes UI code easier to maintain.

This becomes particularly important when moving to React.

---

# 108. Use the DOM as a Presentation Layer

A strong architecture often looks like:

```text
Data
 ↓
State
 ↓
Application logic
 ↓
Rendering
 ↓
DOM
```

The DOM should generally represent application state rather than become the place where your entire application stores business logic.

---

# 109. Avoid Business Logic Inside DOM Event Handlers

Instead of:

```javascript
button.addEventListener("click", () => {
  // Fetch API
  // Validate permissions
  // Calculate totals
  // Modify data
  // Update database
  // Change ten UI elements
});
```

prefer:

```javascript
button.addEventListener("click", handleDelete);
```

and:

```javascript
async function handleDelete() {
  // Coordinate the operation.
}
```

Then separate:

```text
validation
data logic
API
state updates
rendering
```

---

# 110. Use Modules Instead of One Giant Script

As the project grows:

```text
src/
├── main.js
├── api.js
├── state.js
├── render.js
├── events.js
└── utils.js
```

This improves:

* Dependency clarity.
* Testability.
* Maintainability.
* Collaboration.

Do not split files merely to increase the file count.

---

# 111. Keep APIs Narrow

Instead of exposing every internal function:

```javascript
export {
  state,
  setState,
  internalHelper,
  renderEverything,
  debugFunction,
  ...
};
```

expose the smallest public API necessary.

This reduces coupling between modules.

---

# 112. Avoid Circular Dependencies

If:

```text
events.js → render.js
render.js → events.js
```

the architecture can become difficult to reason about.

Prefer clearer dependency directions.

For example:

```text
events
  ↓
state
  ↓
render
```

or:

```text
main
 ├── events
 ├── state
 └── render
```

The exact architecture depends on project size.

---

# 113. Use Event Delegation With Stable Containers

A good delegated listener should attach to an element whose lifetime is stable.

For example:

```javascript
const list = document.querySelector("#project-list");

list.addEventListener("click", handleListClick);
```

Then dynamic children can come and go without recreating the listener.

---

# 114. Do Not Use Event Delegation Everywhere

Event delegation adds an extra layer of event-target resolution.

For one static button:

```javascript
button.addEventListener("click", handleClick);
```

is usually clearer.

Use delegation when it solves a real problem.

---

# 115. Avoid Excessive DOM Abstraction

You do not need to create a custom framework around five DOM operations.

For example:

```javascript
function safeQueryByIdAndReturnNodeOrThrow(...) {}
function appendConfiguredElement(...) {}
function toggleVisibilityWithState(...) {}
```

may add more cognitive overhead than value for a small project.

Abstraction should reduce complexity, not hide simple code.

---

# 116. Use Comments to Explain Decisions

Good comment:

```javascript
// Event delegation handles dynamically created project buttons.
list.addEventListener("click", handleClick);
```

Weak comment:

```javascript
// Add click event.
list.addEventListener("click", handleClick);
```

Explain:

> Why?

rather than:

> What?

when the code already makes the "what" obvious.

---

# 117. Avoid Comments That Become Outdated

This:

```javascript
// This function adds three projects.
```

becomes misleading when the function changes.

Prefer code that is clear enough to describe itself.

Update comments when the design changes.

---

# 118. Use Consistent Error Handling

For asynchronous operations:

```javascript
try {
  const data = await loadData();

  render(data);
} catch (error) {
  console.error(error);

  showError();
}
```

Use a consistent approach across the application.

Do not silently swallow important errors:

```javascript
catch {
}
```

unless ignoring the error is intentional.

---

# 119. Keep User Errors Different From Developer Errors

User message:

```text
Unable to save your changes.
```

Developer log:

```javascript
console.error(error);
```

Users need useful information.

Developers need diagnostic information.

Do not expose sensitive internal details merely because they are useful to developers.

---

# 120. Security Checklist

Before shipping DOM-heavy code, ask:

* Does any untrusted data enter HTML?
* Am I using `innerHTML`?
* Do I need sanitization?
* Are URLs validated?
* Is any string executed as JavaScript?
* Are secrets exposed to the client?
* Is authorization enforced server-side?
* Is client validation being mistaken for security?
* Are third-party HTML sources trusted appropriately?

---

# 121. Accessibility Checklist

Ask:

* Is semantic HTML used?
* Can the UI be used with a keyboard?
* Are buttons actually buttons?
* Are form controls labeled?
* Is focus managed correctly?
* Are dynamic states communicated?
* Are `aria-*` attributes accurate?
* Are images given appropriate `alt` text?
* Does the UI work without relying only on color?

---

# 122. Performance Checklist

Ask:

* Am I repeatedly querying the same DOM element?
* Am I rebuilding large DOM regions unnecessarily?
* Am I causing repeated layout reads and writes?
* Are high-frequency events controlled?
* Is the DOM larger than necessary?
* Am I rendering more items than the user needs?
* Do observers and listeners get cleaned up?
* Have I measured a real bottleneck?

---

# 123. Maintainability Checklist

Ask:

* Does each function have a clear responsibility?
* Is state separated from rendering?
* Are modules organized logically?
* Are names descriptive?
* Are selectors understandable?
* Is business logic separated from DOM logic?
* Is duplicated state minimized?
* Are abstractions justified by actual complexity?

---

# 124. Practical DOM Decision Guide

When choosing an approach:

| Problem                      | Preferred Approach                             |
| ---------------------------- | ---------------------------------------------- |
| Display text                 | `textContent`                                  |
| Change CSS state             | `classList`                                    |
| Create nodes                 | `createElement()`                              |
| Insert nodes                 | `append()` / `prepend()`                       |
| Replace children             | `replaceChildren()`                            |
| User interaction             | `addEventListener()`                           |
| Dynamic lists                | Event delegation when appropriate              |
| Form submission              | `submit` event                                 |
| Form values                  | `FormData`                                     |
| Show/hide                    | `hidden` or CSS class                          |
| URL parsing                  | `URL` / `URLSearchParams`                      |
| Dynamic HTML                 | Sanitized trusted HTML when genuinely required |
| Async cancellation           | `AbortController`                              |
| Frequent search events       | Debounce                                       |
| High-frequency visual events | `requestAnimationFrame()`                      |
| Large data sets              | Pagination / virtualization when justified     |
| DOM measurement              | `getBoundingClientRect()` and related APIs     |
| Application state            | JavaScript state, not DOM text                 |
| React UI                     | State + JSX rather than manual DOM mutation    |

---

# 125. Vanilla DOM Architecture

A small but organized application can look like:

```text
Application
│
├── State
│
├── Data / API
│
├── Event Handlers
│
├── Rendering
│
└── DOM
```

For example:

```text
User action
    ↓
Event handler
    ↓
Application logic
    ↓
State change
    ↓
Render
    ↓
DOM update
```

This architecture is simple enough for vanilla JavaScript and prepares you for component-based UI frameworks.

---

# 126. DOM Best Practices for a React Developer

As a React learner, prioritize these ideas:

### 1. Understand events

Know:

```javascript
event.target
event.currentTarget
preventDefault()
stopPropagation()
```

### 2. Understand forms

Know:

```javascript
FormData
value
checked
submit
input
change
```

### 3. Understand rendering

Know:

```text
state → UI
```

### 4. Understand DOM identity

Know why replacing nodes can affect:

* Focus.
* Event listeners.
* Internal browser state.

### 5. Understand performance

Know why unnecessary DOM work matters.

### 6. Understand accessibility

Know why semantic HTML matters.

### 7. Understand security

Know why untrusted data should not become executable HTML or JavaScript.

These concepts transfer directly into React development.

---

# 127. DOM Best Practices for Next.js

When working with Next.js:

Prefer:

```text
Server data
   ↓
React state / props
   ↓
JSX
   ↓
Browser DOM
```

Use direct DOM access only when necessary.

Typical cases include:

* `useRef`.
* Focus.
* Measuring an element.
* Browser-only APIs.
* Third-party widgets.
* Canvas.
* Specialized DOM integrations.

Keep server concerns and client DOM concerns separated.

---

# 128. The Most Important Principles

If you remember only a few rules, remember these:

### Rule 1

Use semantic HTML first.

### Rule 2

Keep state separate from the DOM.

### Rule 3

Use safe DOM APIs for untrusted data.

### Rule 4

Keep event handlers and functions focused.

### Rule 5

Update only what needs to change.

### Rule 6

Clean up resources.

### Rule 7

Design for keyboard and accessibility from the beginning.

### Rule 8

Validate security-sensitive data on the server.

### Rule 9

Measure performance before optimizing.

### Rule 10

Use abstractions only when they make the code simpler.

---

# 129. The DOM Mental Model

A strong mental model is:

```text
HTML
 ↓
DOM Structure
 ↓
JavaScript Reads the DOM
 ↓
User Interaction
 ↓
Events
 ↓
Application Logic
 ↓
State Changes
 ↓
Rendering
 ↓
DOM Updates
```

And around the entire process:

```text
Security
Accessibility
Performance
Maintainability
```

These are not optional additions.

They are part of good frontend engineering.

---

# 130. Final DOM Best Practices Checklist

Before finishing a DOM feature:

```text
[ ] Semantic HTML is used.
[ ] Selectors are clear.
[ ] DOM references are reused where appropriate.
[ ] State has a clear source of truth.
[ ] Rendering is separated from application logic.
[ ] Functions have focused responsibilities.
[ ] Event handling is intentional.
[ ] Event delegation is used only where useful.
[ ] Forms use native form semantics.
[ ] Keyboard interaction works.
[ ] Focus is handled correctly.
[ ] ARIA state is synchronized when needed.
[ ] User input is treated as untrusted.
[ ] Unsafe HTML rendering is avoided.
[ ] URLs are validated when needed.
[ ] Server-side validation and authorization exist.
[ ] Secrets are not exposed to the client.
[ ] High-frequency events are controlled.
[ ] DOM reads and writes are reasonably organized.
[ ] Large DOM updates are avoided when unnecessary.
[ ] Timers are cleaned up.
[ ] Observers are cleaned up.
[ ] Event listeners are cleaned up when needed.
[ ] Requests can be cancelled when appropriate.
[ ] Performance is measured before major optimization.
[ ] The code remains simple enough to understand.
```

---

# Key Takeaways

* The best DOM code is not the code with the most APIs; it is the code with the clearest architecture.
* Start with semantic HTML and add JavaScript behavior where necessary.
* Keep application state separate from the DOM.
* Treat the DOM primarily as a presentation layer.
* Use specific selectors and meaningful names.
* Prefer `textContent`, `classList`, DOM node APIs, and native browser features.
* Treat `innerHTML` as a specialized operation rather than a default rendering mechanism.
* Never execute untrusted strings as JavaScript.
* Validate security-sensitive data on the server.
* Use semantic controls instead of recreating buttons, forms, and other browser behavior.
* Keep state, events, data processing, and rendering logically separated.
* Use event delegation when dynamic content or large collections justify it.
* Clean up listeners, observers, timers, and network requests when their lifetime ends.
* Keep accessibility synchronized with visual UI state.
* Avoid unnecessary DOM reconstruction and layout work.
* Optimize based on measurement, not assumptions.
* Avoid premature abstractions.
* Good DOM code should remain understandable to another developer six months later.
* Understanding these principles makes React easier to learn because React automates many of the DOM synchronization patterns you have now learned manually.

The central principle is:

> **Use the platform well: semantic HTML for structure, CSS for presentation, JavaScript for behavior and state, and the DOM as the bridge between application logic and the browser UI.**
