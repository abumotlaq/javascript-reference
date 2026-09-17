# DOM and Browser Best Practices

## Overview

The browser provides JavaScript with access to a large runtime environment:

```text id="c0v1q6"
DOM
BOM
Events
Forms
Storage
Network APIs
Timers
Observers
Clipboard
Media
Geolocation
Browser state
```

Browser code has responsibilities that ordinary JavaScript logic may not have.

It must often manage:

```text id="09r7yn"
UI state
User interaction
Browser resources
Event listeners
DOM references
Asynchronous work
Accessibility
Performance
Security
Cleanup
```

Good browser-side JavaScript separates application logic from browser-specific effects whenever practical.

A useful model is:

```text id="2v4d8k"
User interaction
      ↓
Application logic
      ↓
Data / state
      ↓
DOM update
```

The DOM should usually be a boundary, not the place where all application logic lives.

---

# Treat the DOM as an External Environment

The DOM is controlled by the browser.

Your code interacts with it.

It should not be treated like an ordinary in-memory object graph that your entire application can modify from anywhere.

Prefer:

```js id="h8c6y1"
function renderUser(user) {
  const nameElement =
    document.querySelector(
      "#user-name"
    );

  if (!nameElement) {
    return;
  }

  nameElement.textContent =
    user.name;
}
```

rather than allowing unrelated modules to mutate the same elements unpredictably.

---

# Keep DOM Access Near the UI Boundary

Prefer separating logic:

```js id="4p2k5m"
function calculateDisplayName(user) {
  return user.name.trim();
}

function renderUserName(name) {
  const element =
    document.querySelector(
      "#user-name"
    );

  if (element) {
    element.textContent =
      name;
  }
}
```

The calculation does not depend on the DOM.

Only the rendering function does.

---

# Keep Business Logic Out of Event Handlers

Avoid large event handlers:

```js id="9m2u6q"
button.addEventListener(
  "click",
  () => {
    const total =
      cart.items.reduce(
        (sum, item) =>
          sum + item.price,
        0
      );

    if (total > 100) {
      // many more rules
    }

    // more application logic
    // more DOM manipulation
    // network requests
  }
);
```

Prefer:

```js id="1s5w3q"
function calculateCartTotal(
  items
) {
  return items.reduce(
    (sum, item) =>
      sum + item.price,
    0
  );
}

function handleCheckout() {
  const total =
    calculateCartTotal(
      cart.items
    );

  renderCheckoutTotal(total);
}

button.addEventListener(
  "click",
  handleCheckout
);
```

The handler becomes an entry point rather than the entire application.

---

# Use Semantic DOM References

Prefer:

```js id="07q6kp"
const submitButton =
  document.querySelector(
    "#submit"
  );

const profileForm =
  document.querySelector(
    "#profile-form"
  );
```

Avoid:

```js id="4ax0si"
const element1 = ...;
const element2 = ...;
```

Semantic names make browser code easier to understand.

---

# Cache Stable DOM References

If the same element is accessed repeatedly and its existence is stable, store the reference:

```js id="3c4s4z"
const submitButton =
  document.querySelector(
    "#submit"
  );
```

Then:

```js id="t8q7n9"
submitButton.disabled = true;
```

instead of repeatedly querying:

```js id="zz4f2m"
document.querySelector(
  "#submit"
).disabled = true;
```

Caching can improve readability and avoid unnecessary queries.

---

# Do Not Cache Dynamic DOM References Forever

A cached reference may become invalid or no longer correspond to the current UI after DOM replacement.

For dynamic interfaces, query at the appropriate lifecycle point.

Do not assume a DOM node reference remains relevant forever.

---

# Check for Optional Elements

If an element may legitimately be absent:

```js id="x1w8j4"
const button =
  document.querySelector(
    "#optional-button"
  );

if (button) {
  button.addEventListener(
    "click",
    handleClick
  );
}
```

This prevents unnecessary runtime errors.

---

# Fail Fast for Required Elements

If an element is required by the page contract:

```js id="v7c8q0"
const form =
  document.querySelector(
    "#profile-form"
  );

if (!form) {
  throw new Error(
    "Required profile form was not found."
  );
}
```

A missing required element may indicate a programming or markup error.

Do not silently ignore it when the application cannot function correctly without it.

---

# Avoid Repeated Full-Document Queries

Weak:

```js id="3h8z7s"
document.querySelector(
  "#profile"
);

document.querySelector(
  "#profile"
);

document.querySelector(
  "#profile"
);
```

Prefer:

```js id="8g2k4n"
const profile =
  document.querySelector(
    "#profile"
  );
```

when the reference is stable.

---

# Scope Queries to a Container When Appropriate

Instead of:

```js id="u0r7z4"
document.querySelector(
  ".item"
);
```

search within a known container:

```js id="6h0n4u"
const list =
  document.querySelector(
    "#user-list"
  );

const item =
  list?.querySelector(
    ".item"
  );
```

This reduces accidental matches when multiple parts of the page use the same selector.

---

# Prefer Specific Selectors

Prefer:

```js id="nr47b4"
document.querySelector(
  "#profile-form"
);
```

over broad selectors when a unique identifier exists.

Broad selectors can accidentally target the wrong element as the page grows.

---

# Avoid Fragile CSS Selectors in JavaScript

Avoid tying application logic to presentation-heavy selectors such as:

```js id="mfj8wz"
document.querySelector(
  ".container > div:nth-child(2)"
);
```

Prefer semantic selectors:

```js id="42sz0k"
document.querySelector(
  "[data-user-id]"
);
```

or:

```js id="t9o1gy"
document.querySelector(
  "#user-profile"
);
```

The selector should represent the element's role.

---

# Use `data-*` Attributes for Behavior

Custom data attributes can provide stable hooks:

```html id="tgq5ad"
<button
  data-action="delete-user"
  data-user-id="1"
>
  Delete
</button>
```

Then:

```js id="h6v2ep"
const button =
  document.querySelector(
    '[data-action="delete-user"]'
  );
```

This separates JavaScript behavior from visual classes.

---

# Do Not Use CSS Classes Only for JavaScript Hooks

A class such as:

```html id="r1w8op"
<button class="button-primary">
```

primarily describes presentation.

Using it as a JavaScript selector couples behavior to styling.

A dedicated attribute or ID can communicate intent more clearly.

---

# `classList` for State Classes

Use:

```js id="s0xn4z"
element.classList.add(
  "is-active"
);
```

and:

```js id="ha5v2k"
element.classList.remove(
  "is-active"
);
```

State-oriented class names make UI state visible.

---

# Prefer `classList.toggle` for Toggle Behavior

Example:

```js id="y3j7un"
element.classList.toggle(
  "is-open"
);
```

When a specific state is required, use explicit add/remove operations instead of toggling blindly.

---

# Avoid Replacing the Entire `className`

Avoid:

```js id="7e1s0l"
element.className =
  "button active";
```

when other classes may already be present.

Prefer:

```js id="g1r6u2"
element.classList.add(
  "is-active"
);
```

This changes only the intended class.

---

# Prefer `textContent` for Plain Text

Use:

```js id="x65wqy"
element.textContent =
  user.name;
```

for plain text.

Avoid:

```js id="7v1zsq"
element.innerHTML =
  user.name;
```

when HTML parsing is not required.

---

# `innerHTML` Has Security Implications

Never assume external content is safe HTML.

This is dangerous when `user.name` is untrusted:

```js id="d1k4yo"
element.innerHTML =
  user.name;
```

It can create a Cross-Site Scripting vulnerability.

Prefer:

```js id="n9y4c6"
element.textContent =
  user.name;
```

for plain text.

---

# Use `innerHTML` Only Intentionally

`innerHTML` may be appropriate when:

```text id="b6w7x0"
Rendering trusted HTML
Generating controlled markup
Replacing a known template
Working with sanitized content
```

But the trust boundary must be understood.

---

# Never Use `eval` for Dynamic DOM Logic

Avoid:

```js id="q2b7c0"
eval(userInput);
```

Dynamic code execution introduces serious security and maintenance risks.

Use data-driven logic instead.

---

# Sanitize Before Rendering Untrusted HTML

If an application must support user-provided HTML, sanitize it using a trusted, appropriate sanitization strategy.

Do not assume:

```js id="z3t1j6"
element.innerHTML =
  externalContent;
```

is safe.

The safest default is:

```js id="j1u8x4"
element.textContent =
  externalContent;
```

when HTML is not required.

---

# Avoid Building HTML With Raw String Concatenation

Avoid:

```js id="4m0q9f"
container.innerHTML =
  `<div>${user.name}</div>`;
```

when `user.name` is untrusted.

Safer:

```js id="0l8g5z"
const item =
  document.createElement(
    "div"
  );

item.textContent =
  user.name;

container.append(item);
```

---

# Creating Elements

Use `createElement()` when building DOM from data:

```js id="k3m4f9"
const item =
  document.createElement(
    "li"
  );

item.textContent =
  "JavaScript";

list.append(item);
```

This avoids manual HTML parsing for simple content.

---

# Use `DocumentFragment` for Many Nodes

When adding many nodes:

```js id="8s3g7k"
const fragment =
  document.createDocumentFragment();

for (const user of users) {
  const item =
    document.createElement(
      "li"
    );

  item.textContent =
    user.name;

  fragment.append(item);
}

list.append(fragment);
```

This creates the nodes off-document and appends them together.

---

# Do Not Optimize DOM Batching Without Evidence

Modern browsers optimize many DOM operations effectively.

Use fragments or batching when:

```text id="t0h9k2"
Many nodes are created
Repeated insertion has measurable cost
The code remains clear
```

Do not introduce complex batching logic for tiny updates.

---

# Minimize Layout Thrashing

Repeatedly alternating DOM writes and layout reads can force expensive recalculation.

Potentially problematic:

```js id="d4s4o9"
element.style.width = "200px";

const height =
  element.offsetHeight;

element.style.height = "200px";

const width =
  element.offsetWidth;
```

A better strategy is often to group reads and writes separately.

---

# Batch DOM Reads and Writes

Conceptually:

```text id="90j4p1"
Read layout
Read layout
Read layout

Then:

Write style
Write style
Write style
```

Avoid unnecessary:

```text id="5k0h4n"
Read
Write
Read
Write
Read
Write
```

when the browser may need to recalculate layout repeatedly.

---

# Avoid Reading Layout After Every Write

Properties such as:

```text id="zq1e4s"
offsetWidth
offsetHeight
clientWidth
clientHeight
getBoundingClientRect()
```

can require layout information.

If performance matters, avoid unnecessary read/write interleaving.

---

# Use `requestAnimationFrame` for Visual Updates

When performing visual updates that should align with rendering:

```js id="kw9g0y"
requestAnimationFrame(
  () => {
    element.style.transform =
      "translateX(100px)";
  }
);
```

This can coordinate work with the browser's rendering cycle.

---

# Do Not Use `requestAnimationFrame` as a Generic Delay

This:

```js id="n0u5aj"
await new Promise(
  (resolve) =>
    requestAnimationFrame(resolve)
);
```

waits for a rendering opportunity.

It does not mean:

```text id="j9n2r4"
"Wait exactly one millisecond."
```

Use it for frame-related work.

---

# Use CSS for Purely Visual Behavior

Do not move simple visual state logic into JavaScript unnecessarily.

Prefer CSS:

```css id="qg7byv"
.is-hidden {
  display: none;
}
```

Then JavaScript only changes the state:

```js id="4ajzj0"
element.classList.toggle(
  "is-hidden"
);
```

This keeps presentation rules in CSS.

---

# Avoid Manipulating Inline Styles for Everything

Avoid:

```js id="i6o5v8"
element.style.color =
  "red";

element.style.fontSize =
  "20px";

element.style.margin =
  "10px";
```

when these are stable design rules.

Prefer CSS classes:

```js id="q66jlu"
element.classList.add(
  "has-error"
);
```

---

# Use Inline Styles for Dynamic Values

Inline styles can be appropriate for genuinely dynamic values:

```js id="b2q5j1"
element.style.width =
  `${percentage}%`;
```

When the value is calculated at runtime, JavaScript may need to set it.

---

# Prefer CSS Custom Properties for Dynamic Theme Values

Instead of modifying many individual styles:

```js id="v9g4u2"
document.documentElement.style
  .setProperty(
    "--accent-color",
    "#2563eb"
  );
```

CSS can consume:

```css id="b4x0xd"
.button {
  color: var(--accent-color);
}
```

This keeps styling rules centralized.

---

# Separate State From Presentation

Prefer representing application state:

```js id="n5s6f4"
const isOpen = true;
```

and mapping it to UI classes:

```js id="wy44n3"
panel.classList.toggle(
  "is-open",
  isOpen
);
```

instead of allowing raw DOM styles to become the state model.

---

# DOM as a Projection of State

A useful architecture is:

```text id="5y9e2g"
Application state
      ↓
UI representation
```

Rather than:

```text id="3m0qjv"
DOM
      ↓
Hidden application state
```

The DOM should usually reflect the application state rather than become the only source of truth.

---

# Avoid Using the DOM as a Data Store

Weak:

```js id="3d7o3w"
element.dataset.userName =
  "Osama Abu Motlaq";
```

and later:

```js id="5r8t9k"
const userName =
  element.dataset.userName;
```

when application state already exists.

The DOM should not become a replacement for the application's data model.

---

# Use `dataset` for DOM Metadata

`data-*` attributes are useful when information genuinely belongs to an element's browser interaction context:

```html id="n2j4k7"
<button
  data-user-id="42"
>
  View profile
</button>
```

Then:

```js id="c3n0o5"
const userId =
  button.dataset.userId;
```

This is an appropriate use of DOM metadata.

---

# Keep Application State Separate

Avoid using dozens of `data-*` attributes as a second state-management system.

If state becomes complex, use an actual application data structure.

---

# Event Listeners Should Have Clear Ownership

When adding:

```js id="b9h3f4"
button.addEventListener(
  "click",
  handleClick
);
```

know:

```text id="1ry4z2"
Who added it?
When should it be active?
When should it be removed?
```

This becomes important in dynamic interfaces.

---

# Remove Event Listeners When Necessary

If a component or feature has a lifecycle, clean up listeners:

```js id="m8q7w1"
function mount() {
  button.addEventListener(
    "click",
    handleClick
  );

  return function unmount() {
    button.removeEventListener(
      "click",
      handleClick
    );
  };
}
```

The same function reference is required for removal.

---

# Avoid Anonymous Listeners When Cleanup Matters

This is difficult to remove later:

```js id="n0m5x8"
button.addEventListener(
  "click",
  () => {
    handleClick();
  }
);
```

Prefer:

```js id="d5u1a8"
button.addEventListener(
  "click",
  handleClick
);
```

when the listener needs explicit lifecycle management.

---

# Abortable Event Listeners

Modern browser APIs can associate listeners with an `AbortSignal`:

```js id="7r1f6k"
const controller =
  new AbortController();

button.addEventListener(
  "click",
  handleClick,
  {
    signal:
      controller.signal,
  }
);
```

Then:

```js id="f7c3h2"
controller.abort();
```

can remove the listener.

This can simplify cleanup for groups of listeners.

---

# Event Delegation

For dynamic lists, delegation can reduce the number of listeners:

```js id="6g2t4x"
list.addEventListener(
  "click",
  (event) => {
    const button =
      event.target.closest(
        "[data-action]"
      );

    if (!button) {
      return;
    }

    handleAction(
      button.dataset.action
    );
  }
);
```

One listener manages many child elements.

---

# Use Event Delegation When It Fits

Event delegation is useful when:

```text id="8mz5tq"
Many similar elements exist
Elements are created dynamically
The ancestor is stable
Events bubble
```

Do not use delegation automatically for every event.

---

# Delegation Requires Care With Event Targets

`event.target` may be a nested element:

```html id="m1d9yg"
<button data-action="delete">
  <span>Delete</span>
</button>
```

A click on the `span` may produce:

```js id="m1l3bz"
event.target === span;
```

Using:

```js id="0ar4a8"
event.target.closest(
  "button"
);
```

can find the intended control.

---

# Do Not Assume `event.target === event.currentTarget`

For delegated events:

```text id="f2q7v5"
target
→ Element where the event originated.

currentTarget
→ Element whose listener is currently executing.
```

Understanding this distinction prevents many event bugs.

---

# Stop Events Intentionally

Use:

```js id="r5f7u8"
event.preventDefault();
```

when you want to prevent the browser's default action.

Use:

```js id="u7x5n1"
event.stopPropagation();
```

only when stopping propagation is actually required.

Do not add it automatically.

---

# Avoid `stopPropagation()` as a General Fix

Using:

```js id="j4c2d9"
event.stopPropagation();
```

everywhere can create surprising event behavior.

It may prevent unrelated handlers from receiving events.

Fix event ownership and delegation rather than stopping propagation blindly.

---

# Prefer Event Delegation Over Excessive Listeners

Instead of:

```js id="f9k7w2"
for (const button of buttons) {
  button.addEventListener(
    "click",
    handleClick
  );
}
```

a delegated listener may be simpler when the list is large or dynamic:

```js id="p9x3k4"
container.addEventListener(
  "click",
  handleContainerClick
);
```

But direct listeners are perfectly valid for a small number of stable elements.

---

# Forms Should Have Real Form Semantics

Use:

```html id="v0u0x3"
<form id="profile-form">
```

instead of recreating form behavior entirely through click handlers.

Then:

```js id="t3l6x1"
form.addEventListener(
  "submit",
  handleSubmit
);
```

This supports keyboard submission and normal browser behavior.

---

# Handle `submit`, Not Only Button Click

Weak:

```js id="x2c5bn"
submitButton.addEventListener(
  "click",
  handleSubmit
);
```

Prefer:

```js id="7d8h1m"
form.addEventListener(
  "submit",
  handleSubmit
);
```

The form can then be submitted through:

```text id="sq5h0a"
Button click
Enter key
Assistive technology
Programmatic form submission
```

---

# Use `preventDefault()` Intentionally

If handling a form submission through JavaScript:

```js id="3f6w9k"
function handleSubmit(event) {
  event.preventDefault();

  // Handle submission.
}
```

Prevent the browser's default navigation only because your application is replacing that behavior.

---

# Validate Forms Clearly

Validation should separate:

```text id="j7z5j3"
Input validation
Form submission
Server response
UI feedback
```

Do not mix all of these concerns into one massive handler.

---

# Use Native Validation When Appropriate

HTML supports:

```html id="me79d7"
<input
  type="email"
  required
>
```

Native browser validation can handle basic constraints.

JavaScript should extend it when the application requires more complex rules.

---

# Do Not Duplicate Browser Validation Without Purpose

If HTML already states:

```html id="4p3sl1"
<input
  type="email"
  required
>
```

do not recreate the exact same low-level checks in multiple places unless the application's architecture requires a shared validation layer.

---

# Client Validation Is Not Security

Client-side validation improves UX.

It does not replace server-side validation.

Do not trust:

```text id="m7q5b1"
Disabled fields
Hidden inputs
HTML validation
JavaScript checks
```

as security boundaries.

---

# Accessibility Is Part of Browser Best Practices

Interactive browser code should preserve:

```text id="x4c9t1"
Keyboard access
Focus management
Semantic elements
Accessible names
Form labels
Error communication
Reduced motion considerations
```

---

# Prefer Semantic HTML

Use:

```html id="8f9x8c"
<button>
```

for actions.

Use:

```html id="3p1m9y"
<a href="/profile">
```

for navigation.

Do not recreate these with:

```html id="fd29d2"
<div onclick="...">
```

unless there is an exceptional reason.

---

# Do Not Replace Buttons With Clickable `div`s

Weak:

```html id="t8l2qp"
<div
  role="button"
  onclick="saveProfile()"
>
  Save
</div>
```

Prefer:

```html id="5i7m4x"
<button>
  Save
</button>
```

Native elements already provide:

```text id="1qm43a"
Keyboard behavior
Focus behavior
Accessibility semantics
Browser interaction
```

---

# Labels for Form Controls

Prefer:

```html id="5a8y0n"
<label for="email">
  Email
</label>

<input
  id="email"
  type="email"
>
```

Do not rely only on placeholder text as the field label.

---

# Focus Management

When opening dialogs or dynamic interfaces, ensure focus moves appropriately.

Do not simply show:

```js id="1q2b9k"
dialog.hidden = false;
```

without considering:

```text id="4jv0s8"
Where keyboard focus should go
How the user closes the dialog
Where focus returns
```

---

# Dialogs

Use semantic dialog elements when appropriate:

```html id="4a3k7f"
<dialog id="confirm-dialog">
  ...
</dialog>
```

Then control them through the appropriate browser API.

A dialog should have a clear focus and dismissal strategy.

---

# Avoid Focus Traps Unless Necessary

Custom focus management can become complex.

Use established browser and accessibility patterns rather than manually moving focus on every interaction.

---

# Keyboard Interaction

Do not assume:

```js id="8p2w2g"
click
```

is the only interaction.

Keyboard users may use:

```text id="9n7e2u"
Tab
Enter
Space
Arrow keys
Escape
```

depending on the control.

Native elements often provide correct behavior automatically.

---

# Avoid Global Keyboard Handlers Without Scope

A document-level listener:

```js id="6i3w8h"
document.addEventListener(
  "keydown",
  handleKeyDown
);
```

can affect the entire application.

Only use global keyboard listeners when the behavior truly applies globally.

Otherwise, scope the listener to the relevant element or active feature.

---

# Clipboard Access

Clipboard operations can fail and may require permissions or secure contexts.

Handle failures intentionally:

```js id="p3n4f9"
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(
      text
    );
  } catch (error) {
    showError(
      "Unable to copy text."
    );
  }
}
```

Do not assume clipboard access is universally available.

---

# Browser Storage

Storage access can fail.

Wrap important writes when necessary:

```js id="h2q6w5"
try {
  localStorage.setItem(
    "theme",
    "dark"
  );
} catch (error) {
  handleStorageError(error);
}
```

Keep storage logic behind a small abstraction when used throughout the application.

---

# Storage Helpers

Instead of scattering:

```js id="5x7s8q"
localStorage.getItem(...);
localStorage.setItem(...);
localStorage.removeItem(...);
```

throughout the application, consider:

```js id="7o1b4j"
function getTheme() {
  return localStorage.getItem(
    "theme"
  );
}
```

This centralizes storage behavior.

---

# Do Not Store Secrets in Browser Storage

Avoid storing sensitive credentials in:

```text id="h7q8k0"
localStorage
sessionStorage
IndexedDB
```

without a careful security design.

Anything available to JavaScript is potentially exposed to script execution in the origin.

---

# URL Parameters

Use `URLSearchParams` for query strings:

```js id="m7q3z1"
const params =
  new URLSearchParams(
    window.location.search
  );

const search =
  params.get("search");
```

Avoid manually parsing query strings with string operations.

---

# Avoid Manual URL Concatenation

Weak:

```js id="v3m8z2"
const url =
  "/search?q=" +
  encodeURIComponent(query);
```

Better:

```js id="t2w6f8"
const params =
  new URLSearchParams({
    q: query,
  });

const url =
  `/search?${params}`;
```

This makes URL construction easier to reason about.

---

# Use `URL` for URL Manipulation

Prefer:

```js id="e6y8p1"
const url =
  new URL(
    "/profile",
    window.location.origin
  );

url.searchParams.set(
  "userId",
  "1"
);
```

The `URL` API avoids fragile string manipulation.

---

# Timers Require Cleanup

If a feature creates a timer:

```js id="3j7n6y"
const timeoutId =
  setTimeout(
    handleTimeout,
    5000
  );
```

clear it when it is no longer needed:

```js id="j0c5qm"
clearTimeout(
  timeoutId
);
```

For repeated timers:

```js id="f0v2y7"
const intervalId =
  setInterval(
    refreshData,
    5000
  );
```

clean up with:

```js id="m4y3x1"
clearInterval(
  intervalId
);
```

---

# Avoid Overlapping Intervals

Be careful:

```js id="sp7l6w"
setInterval(
  async () => {
    await refreshData();
  },
  1000
);
```

If `refreshData()` takes longer than one second, multiple calls can overlap.

Use controlled polling when overlap is undesirable.

---

# Observers Need Cleanup

Browser observers include:

```text id="x7z9m4"
MutationObserver
IntersectionObserver
ResizeObserver
PerformanceObserver
```

They can retain references and continue doing work.

Disconnect them when the feature lifecycle ends:

```js id="e8s2j4"
observer.disconnect();
```

---

# Intersection Observer

Use `IntersectionObserver` for visibility-related behavior rather than repeatedly checking:

```js id="q0x4v3"
element.getBoundingClientRect();
```

on every scroll event.

This can provide cleaner and often more efficient visibility detection.

---

# Resize Observer

Use `ResizeObserver` when responding to element-size changes:

```js id="v9h2b6"
const observer =
  new ResizeObserver(
    (entries) => {
      for (const entry of entries) {
        console.log(
          entry.contentRect.width
        );
      }
    }
  );
```

Disconnect it when no longer needed.

---

# Mutation Observer

Use `MutationObserver` when you genuinely need to react to DOM mutations.

Do not use it as a replacement for proper application state management.

If your own code controls the state change, it is often clearer to call the relevant logic directly.

---

# Avoid Polling the DOM

Weak:

```js id="9z7m1h"
setInterval(
  () => {
    const element =
      document.querySelector(
        "#status"
      );

    if (element) {
      // ...
    }
  },
  500
);
```

Prefer event-driven or observer-based solutions when the browser provides them.

---

# Use Browser Events Appropriately

Events such as:

```text id="g2f8u1"
DOMContentLoaded
load
online
offline
visibilitychange
beforeunload
```

should be used based on their actual semantics.

Do not listen to broad lifecycle events when a narrower event exists.

---

# Prefer `DOMContentLoaded` When Only DOM Structure Is Required

If code only needs the document structure:

```js id="y5k3s8"
document.addEventListener(
  "DOMContentLoaded",
  initialize
);
```

The page does not need every external resource to finish loading.

---

# Use `load` When Resources Matter

If behavior depends on:

```text id="m7g9f4"
Images
Stylesheets
Subresources
```

the `load` event may be more appropriate.

Do not use `load` just because it happens to work.

---

# Visibility State

For operations that should pause when the page is hidden:

```js id="k7f1d0"
document.addEventListener(
  "visibilitychange",
  () => {
    if (
      document.hidden
    ) {
      stopPolling();
    } else {
      startPolling();
    }
  }
);
```

This can save resources.

---

# Avoid Background Work When It Is Not Useful

If the page is hidden:

```text id="4q4x0w"
Pause polling
Reduce animation
Stop unnecessary measurement
Avoid expensive rendering
```

when the application does not need that work in the background.

---

# Browser Capability Detection

Do not assume every browser supports every API.

Feature detection:

```js id="w6y7x2"
if (
  "geolocation" in navigator
) {
  // ...
}
```

is better than assuming support.

---

# Do Not Detect Browsers by User Agent Unless Necessary

Avoid logic based solely on:

```js id="h2k0n7"
navigator.userAgent.includes(
  "Chrome"
);
```

when feature detection can determine the actual capability.

The question should usually be:

```text id="3m8g4q"
Can this environment perform the required operation?
```

not:

```text id="6b1x5v"
Which browser name is present?
```

---

# Progressive Enhancement

A robust browser application can provide a basic experience first and enhance it when APIs are available.

For example:

```text id="0r5k2e"
Basic form submission
        ↓
Enhanced JavaScript submission
```

This can improve resilience.

---

# Browser APIs Should Have Fallbacks When Needed

If an API is optional:

```js id="c1n8r4"
if (
  "clipboard" in navigator
) {
  // Enhanced behavior.
} else {
  // Fallback.
}
```

Do not create a fallback when the feature is truly required and the environment does not support it.

---

# Security Is Part of Browser JavaScript

Browser code runs in a security-sensitive environment.

Important concerns include:

```text id="0c7n2z"
XSS
CSRF
Clickjacking
Unsafe HTML
Credential exposure
Insecure storage
Open redirects
URL manipulation
Third-party scripts
```

Security should be considered whenever data crosses trust boundaries.

---

# Treat User Input as Untrusted

Examples include:

```text id="z6f7c4"
Form input
URL parameters
Hash fragments
Query parameters
Clipboard content
Storage values
Server responses
```

Do not insert these values into HTML without proper safety handling.

---

# Avoid `innerHTML` With Untrusted Input

Unsafe:

```js id="v8c3y1"
container.innerHTML =
  userInput;
```

Safer:

```js id="d5y6x2"
container.textContent =
  userInput;
```

When HTML is required, use an appropriate sanitization process.

---

# Avoid Dangerous URL Injection

Do not blindly assign untrusted values:

```js id="1x7w9k"
link.href =
  userProvidedUrl;
```

Validate the URL scheme and allowed destinations when the source is untrusted.

---

# Be Careful With `javascript:` URLs

Never allow arbitrary user input to become:

```text id="5q3m1v"
javascript:...
```

A URL value should be validated against allowed schemes such as:

```text id="w5r9x4"
https:
http:
```

depending on the application requirements.

---

# Avoid Open Redirects

Weak:

```js id="8x3t2q"
window.location.href =
  userProvidedUrl;
```

An attacker may provide a malicious destination.

Prefer validating allowed destinations or using predefined routes.

---

# Storage and XSS

A value stored in `localStorage` is not automatically trusted.

Example:

```js id="m0w4q8"
const name =
  localStorage.getItem(
    "displayName"
  );
```

If the value later becomes HTML:

```js id="n2f1j6"
element.innerHTML = name;
```

the data can become an injection vector.

Stored data still needs trust-boundary analysis.

---

# Third-Party Scripts

External scripts should be treated as trusted code only after deliberate evaluation.

A third-party script can often access the same page's JavaScript context and DOM.

Minimize unnecessary dependencies and external scripts.

---

# Content Security Policy

Applications can use browser security policies such as Content Security Policy to reduce certain classes of injection risk.

A strong CSP can limit:

```text id="w8s9q1"
Script sources
Object sources
Frame sources
Inline execution
Other resource origins
```

Do not rely on CSP as a replacement for safe coding.

---

# Avoid Dynamic Script Injection

Avoid:

```js id="z9v4y7"
const script =
  document.createElement(
    "script"
  );

script.src =
  userProvidedUrl;
```

unless the source is strictly controlled and validated.

---

# Browser Permissions

APIs such as:

```text id="4s1p6r"
Geolocation
Notifications
Clipboard
Camera
Microphone
```

may require user permissions.

Handle:

```text id="1x6v2s"
Unavailable
Denied
Prompted
Granted
```

states intentionally.

---

# Do Not Assume Permission

Example:

```js id="l0r7s3"
navigator.geolocation.getCurrentPosition(
  handlePosition,
  handleError
);
```

The call may fail because permission is denied.

The application should provide a useful fallback or message when appropriate.

---

# Browser Resource Cleanup

Clean up:

```text id="f4q5s7"
Event listeners
Timers
Observers
Subscriptions
Abort controllers
Object URLs
Temporary DOM nodes
```

when the lifecycle ends.

---

# Revoke Object URLs

When creating an object URL:

```js id="2d3k9q"
const url =
  URL.createObjectURL(
    file
  );
```

release it when no longer needed:

```js id="z5f7n2"
URL.revokeObjectURL(url);
```

This is part of resource ownership.

---

# Avoid Detached DOM References

Keeping references to removed DOM nodes can retain memory longer than necessary.

For long-lived features, ensure stale references are released when the feature is destroyed.

---

# Browser Best Practices and Performance

Performance improvements should focus on meaningful bottlenecks:

```text id="8n7p4x"
Large DOM updates
Excessive event handlers
Expensive layout reads
Large JavaScript bundles
Unnecessary network requests
Long tasks
Excessive rendering
Memory leaks
```

Do not optimize tiny operations without evidence.

---

# Avoid Excessive DOM Reads and Writes

Do not repeatedly do:

```js id="r4s5t7"
element.textContent =
  calculateValue();

element.style.width =
  calculateWidth();

element.style.height =
  calculateHeight();
```

inside large loops without understanding the rendering cost.

Batch work when needed.

---

# Use Document Fragments for Large Construction

For large lists:

```js id="g8x4y1"
const fragment =
  document.createDocumentFragment();

for (const item of items) {
  const element =
    document.createElement(
      "li"
    );

  element.textContent =
    item.name;

  fragment.append(element);
}

container.append(fragment);
```

This keeps construction separate from insertion.

---

# Avoid Full DOM Replacement When Small Changes Are Needed

Instead of:

```js id="t5d4k9"
container.innerHTML =
  renderEntirePage();
```

when only one value changes:

```js id="7q2x6m"
nameElement.textContent =
  user.name;
```

Small targeted updates can preserve more browser state.

---

# But Do Not Micro-Optimize Every DOM Operation

For small interfaces:

```js id="p9j6x4"
container.innerHTML =
  safeMarkup;
```

may be perfectly acceptable when the HTML is controlled.

Do not sacrifice maintainability for theoretical performance.

---

# Use Efficient Event Strategy

For many repeated elements:

```text id="y9w7r6"
Event delegation
```

may reduce listener overhead.

For a few stable elements:

```text id="z3q4n2"
Direct listeners
```

may be clearer.

Choose based on actual structure.

---

# Avoid Scroll Handlers for Every Pixel

A raw scroll listener can fire frequently:

```js id="g6q8v3"
window.addEventListener(
  "scroll",
  handleScroll
);
```

For performance-sensitive work, consider:

```text id="8b4n7c"
requestAnimationFrame
throttling
IntersectionObserver
```

depending on the requirement.

---

# Do Not Perform Heavy Work in Every Event

Events such as:

```text id="j4n6k2"
scroll
resize
input
pointermove
mousemove
```

can fire frequently.

Avoid expensive synchronous operations inside them.

Use appropriate scheduling or rate limiting.

---

# Browser APIs Are Preferable to Reinventing Them

Examples:

```text id="f6c8m9"
IntersectionObserver
ResizeObserver
URL
URLSearchParams
FormData
AbortController
requestAnimationFrame
```

Use browser-provided primitives when they directly solve the problem.

---

# Keep Browser-Specific Code Isolated

If application logic needs:

```text id="3z6p2q"
localStorage
window
document
navigator
location
```

consider isolating those operations behind small functions or modules.

For example:

```js id="w4q8r1"
export function getTheme() {
  return localStorage.getItem(
    "theme"
  );
}
```

The rest of the application can depend on the abstraction rather than `localStorage` everywhere.

---

# Browser Abstraction Should Not Become a Framework

Avoid wrapping every browser API in a giant abstraction layer:

```text id="r7t5x9"
BrowserService
WindowService
DocumentService
StorageService
EventService
TimerService
```

when the project does not require that architecture.

Isolate browser dependencies where the boundary provides real value.

---

# Testing Browser Code

Separate:

```text id="q5v1y7"
Pure logic
```

from:

```text id="e2k4m8"
DOM effects
```

For example:

```js id="q2m8s5"
function calculateTotal(items) {
  return items.reduce(
    (total, item) =>
      total + item.price,
    0
  );
}
```

is easy to test independently.

Then:

```js id="z3v7m9"
function renderTotal(total) {
  totalElement.textContent =
    String(total);
}
```

can be tested at the DOM boundary.

---

# Avoid Testing Through the Entire Browser for Everything

Not every function needs end-to-end browser testing.

Use the smallest test scope that provides useful confidence:

```text id="b0k6p4"
Pure function
→ Unit test

DOM interaction
→ DOM/integration test

Full user workflow
→ End-to-end test
```

---

# Browser Lifecycle Should Be Explicit

For features with setup and cleanup:

```js id="f1n5r2"
function mount() {
  // setup

  return function unmount() {
    // cleanup
  };
}
```

This pattern makes ownership visible.

---

# Mount and Unmount

When a feature is created:

```text id="1s4z6m"
Create references
Register listeners
Start timers
Start observers
Start async work
```

When removed:

```text id="v5q7c3"
Remove listeners
Clear timers
Disconnect observers
Abort requests
Release resources
```

The cleanup path should be designed at the same time as setup.

---

# Avoid Setup Without Teardown

Every time you write:

```js id="s7d6g2"
addEventListener();
setInterval();
observe();
subscribe();
```

ask:

```text id="w2q4h8"
When does this stop?
```

If there is no answer, a resource leak or duplicate behavior may exist.

---

# Browser Code and Global State

Avoid:

```js id="b4m1z8"
window.currentUser =
  user;
```

unless the application deliberately defines a global API.

Prefer module state or controlled application state.

Global browser properties are shared mutable space.

---

# Avoid Polluting `window`

Do not create:

```js id="x5r9v1"
window.user = user;
window.api = api;
window.appState = state;
```

as a general application architecture.

ES modules provide proper module scope.

---

# Global Namespace and Third-Party Code

If another system explicitly requires a global:

```js id="n7z3q4"
window.myApp =
  myApp;
```

make the contract intentional.

Otherwise, prefer module imports and exports.

---

# Prefer ES Modules in Modern Browser Code

Use:

```html id="f7w5c2"
<script
  type="module"
  src="/src/app.js"
></script>
```

Then:

```js id="m8r4t6"
import {
  renderApp,
} from "./ui.js";
```

Modules provide:

```text id="q4y6v9"
Encapsulation
Dependency declarations
Scoped variables
Reusable exports
```

---

# Avoid Script Order Dependencies

Weak:

```html id="a2f7y4"
<script src="utils.js"></script>
<script src="app.js"></script>
```

where `app.js` assumes `utils.js` created a global.

Prefer modules:

```js id="g9m5v2"
import {
  utility
} from "./utils.js";
```

Dependencies become explicit.

---

# Avoid Blocking the Main Thread

Heavy synchronous work blocks browser interaction.

Potential examples:

```text id="e1v6x9"
Large loops
Complex parsing
Large JSON processing
Expensive sorting
Heavy DOM construction
CPU-intensive calculations
```

Consider:

```text id="c4y8m1"
Chunking work
Web Workers
Idle scheduling
Moving work off the critical path
```

when the workload genuinely requires it.

---

# Web Workers for Heavy CPU Work

If a computation blocks the UI, a Worker can move it off the main thread.

Use workers for genuinely CPU-heavy work.

Do not add a Worker for trivial calculations.

---

# Browser Storage and Serialization

When storing structured data:

```js id="d5r7x2"
localStorage.setItem(
  "user",
  JSON.stringify(user)
);
```

and:

```js id="v3m9k1"
const user =
  JSON.parse(
    localStorage.getItem(
      "user"
    )
  );
```

Validate parsed data before trusting it.

Stored data can be stale or malformed.

---

# Browser Storage Migration

Stored data may outlive application versions.

If the structure changes:

```text id="q8w1p5"
Old storage shape
      ↓
Migration
      ↓
Current shape
```

may be necessary.

Do not assume local storage always contains the latest schema.

---

# Storage Keys Should Be Centralized

Prefer:

```js id="k7x2p9"
const THEME_STORAGE_KEY =
  "theme-preference";
```

instead of repeating:

```js id="n5b8v4"
"theme-preference"
```

throughout the application.

Centralized keys reduce typos and make migrations easier.

---

# Do Not Trust Stored Permissions

A value such as:

```js id="e9v1m5"
localStorage.getItem(
  "isAdmin"
);
```

must never be treated as authoritative authorization.

Client-side storage can be modified by the user.

---

# Browser APIs and Error Handling

Assume browser APIs may fail because of:

```text id="5q2f7j"
Permissions
Unsupported features
Security restrictions
User settings
Network state
Quota
Resource availability
```

Handle expected failure states intentionally.

---

# Browser Best Practices Checklist

Before finalizing browser-side JavaScript:

```text id="0z8m4k"
[ ] Is DOM access isolated where practical?

[ ] Is business logic separated from DOM manipulation?

[ ] Are DOM references meaningfully named?

[ ] Are required elements checked?

[ ] Are optional elements handled intentionally?

[ ] Are selectors stable?

[ ] Are data-* attributes used appropriately?

[ ] Is textContent preferred for plain text?

[ ] Is innerHTML used only intentionally?

[ ] Is untrusted content treated as untrusted?

[ ] Are event listeners owned and cleaned up?

[ ] Is event delegation used where useful?

[ ] Are default behaviors prevented only when necessary?

[ ] Are forms handled through submit events?

[ ] Is keyboard accessibility preserved?

[ ] Are timers cleaned up?

[ ] Are observers disconnected?

[ ] Are async requests cancellable when appropriate?

[ ] Are stale async results prevented?

[ ] Are browser permissions handled?

[ ] Is browser capability feature-detected?

[ ] Is browser storage treated as untrusted persistence?

[ ] Are secrets kept out of browser storage?

[ ] Are object URLs revoked?

[ ] Is DOM work reasonably batched?

[ ] Are expensive event handlers throttled or debounced
    when appropriate?

[ ] Is application state separate from DOM state?

[ ] Is global window state avoided?

[ ] Are browser APIs isolated when useful?

[ ] Does every setup operation have a cleanup strategy?
```

---

# Recommended Rules for This Reference

The examples in this repository should generally follow these principles:

```text id="g2m6x8"
Keep application logic separate from DOM effects.

Treat the DOM as an external boundary.

Use semantic HTML.

Use textContent for untrusted text.

Use innerHTML only with intentional trust and sanitization.

Use stable selectors.

Use data-* attributes for behavior hooks when appropriate.

Use forms through the submit event.

Keep event ownership explicit.

Use event delegation when it improves the design.

Do not use stopPropagation() as a general fix.

Use CSS for visual rules.

Use JavaScript for behavior and state transitions.

Clean up listeners, timers, observers, and subscriptions.

Cancel stale asynchronous work.

Do not store secrets in browser-accessible storage.

Feature-detect browser APIs.

Do not depend on user-agent detection when capability
detection is possible.

Keep browser-specific code near browser boundaries.

Use browser primitives instead of reinventing them.

Optimize DOM performance based on real workloads.

Preserve accessibility throughout browser interactions.
```

---

# Final Principles

```text id="s8t5q4"
The DOM is a boundary.

State should not be hidden inside the DOM.

Business logic should not depend unnecessarily on the browser.

User input is untrusted.

Semantic HTML is part of correct JavaScript design.

Every browser resource needs an ownership and cleanup story.

Event listeners are resources.

Timers are resources.

Observers are resources.

Async browser work needs cancellation when it can become stale.

CSS should own presentation whenever possible.

JavaScript should coordinate behavior.

Security and accessibility are browser correctness concerns,
not optional extras.

Feature detection is more robust than browser-name detection.

Use the browser's native primitives before inventing abstractions.
```

---

# Summary

Good browser-side JavaScript creates a clear separation:

```text id="r3z7f1"
Browser
   ↕
Browser adapter / UI boundary
   ↕
Application logic
   ↕
Data and state
```

The browser is responsible for:

```text id="2c8m4n"
Rendering
Events
Network
Storage
Permissions
Platform APIs
```

Your application should avoid making every part of the codebase directly depend on those details.

The strongest browser code is:

```text id="a5n7q3"
Semantic
Accessible
Secure
Predictable
Resource-aware
Performant
Testable
```

The core principle is:

```text id="u6v2x9"
Use JavaScript to control behavior,
not to replace the browser's native semantics.

Use the DOM as a rendering and interaction boundary,
not as the application's entire state model.
```
