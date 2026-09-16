# DOM Event Delegation

**Event delegation** is a DOM event-handling technique where a single event listener is attached to a parent element instead of attaching separate listeners to every child element.

Event delegation relies primarily on **event bubbling**.

Instead of:

```text
button 1 → listener
button 2 → listener
button 3 → listener
button 4 → listener
```

you can use:

```text
container → one listener
              ↑
        handles child events
```

This approach is especially useful for:

* Lists
* Tables
* Menus
* Dynamic elements
* Repeated buttons
* Large collections of interactive elements
* Components created after the initial page load

---

# 1. The Core Idea

Consider:

```html
<ul id="users">
  <li>Osama Abu Motlaq</li>
  <li>Frontend Developer</li>
  <li>JavaScript</li>
</ul>
```

A straightforward approach is to attach a listener to every `<li>`:

```javascript
const items = document.querySelectorAll("#users li");

items.forEach((item) => {
  item.addEventListener("click", () => {
    console.log(item.textContent);
  });
});
```

This works.

But the parent can receive the event through bubbling.

So instead:

```javascript
const users = document.querySelector("#users");

users.addEventListener("click", (event) => {
  console.log(event.target.textContent);
});
```

Now there is only one listener.

---

# 2. Why Does This Work?

Suppose the user clicks:

```html
<li>Osama Abu Motlaq</li>
```

The event starts at the `<li>`:

```text
li
 ↓
ul
```

Because `click` bubbles, the `<ul>` receives the event.

The parent listener can inspect:

```javascript
event.target
```

and determine which child originally received the click.

The important relationship is:

```text
Event bubbling
      ↓
Parent receives child event
      ↓
Parent examines event.target
      ↓
Event delegation
```

---

# 3. Event Delegation vs Individual Listeners

### Individual listeners

```javascript
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", handleClick);
});
```

Every button gets its own listener.

### Event delegation

```javascript
const container = document.querySelector("#container");

container.addEventListener("click", (event) => {
  // Determine which child was clicked
});
```

The container gets one listener.

---

# 4. Basic Example

HTML:

```html
<div id="actions">
  <button data-action="edit">Edit</button>
  <button data-action="delete">Delete</button>
  <button data-action="view">View</button>
</div>
```

JavaScript:

```javascript
const actions = document.querySelector("#actions");

actions.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  console.log(button.dataset.action);
});
```

Clicking:

```text
Edit
```

produces:

```text
edit
```

Clicking:

```text
Delete
```

produces:

```text
delete
```

One listener handles all three buttons.

---

# 5. `event.target` Is the Key

The most important property for event delegation is:

```javascript
event.target
```

It identifies the element where the event originally occurred.

Example:

```html
<ul id="users">
  <li>Osama Abu Motlaq</li>
</ul>
```

```javascript
users.addEventListener("click", (event) => {
  console.log(event.target);
});
```

If the `<li>` is clicked:

```text
event.target
→ <li>
```

The listener is attached to:

```text
<ul>
```

but the event originated from:

```text
<li>
```

---

# 6. `event.target` vs `event.currentTarget`

This distinction is critical.

```javascript
users.addEventListener("click", (event) => {
  console.log("Target:", event.target);
  console.log("Current target:", event.currentTarget);
});
```

If a child `<li>` is clicked:

```text
Target:
→ li

Current target:
→ ul
```

Remember:

```text
event.target
    ↓
Where the event started

event.currentTarget
    ↓
Where the listener is attached
```

In event delegation, these are often different elements.

---

# 7. Why `closest()` Is Often Better

Consider:

```html
<button data-action="edit">
  <span>Edit</span>
</button>
```

If the user clicks the `<span>`:

```javascript
event.target
```

is:

```text
span
```

Not:

```text
button
```

If you write:

```javascript
if (event.target.matches("button")) {
  // ...
}
```

the condition fails when the `<span>` is clicked.

Instead:

```javascript
const button = event.target.closest("button");
```

This searches upward from the target until it finds the nearest matching button.

---

# 8. `closest()` in Delegation

A common pattern is:

```javascript
container.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  console.log(button.textContent);
});
```

The flow is:

```text
User clicks nested element
        ↓
event.target
        ↓
closest("button")
        ↓
Find intended interactive element
        ↓
Handle action
```

This is more robust than assuming that `event.target` is always the exact element you want.

---

# 9. Protecting the Delegated Container

Consider:

```html
<div id="container">
  <button data-action="edit">
    <span>Edit</span>
  </button>
</div>
```

A robust delegated handler can be:

```javascript
container.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button || !container.contains(button)) {
    return;
  }

  console.log(button.dataset.action);
});
```

The second condition ensures that the matched element belongs to the delegated container.

This matters when the DOM contains nested structures or when the container itself participates in more complex layouts.

---

# 10. Using `data-*` Attributes

Custom `data-*` attributes are extremely useful for event delegation.

HTML:

```html
<div id="actions">
  <button data-action="edit">Edit</button>
  <button data-action="delete">Delete</button>
  <button data-action="view">View</button>
</div>
```

JavaScript:

```javascript
actions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");

  if (!button) {
    return;
  }

  const action = button.dataset.action;

  console.log(action);
});
```

Now the HTML declares what each button does.

```text
data-action="edit"
        ↓
edit

data-action="delete"
        ↓
delete

data-action="view"
        ↓
view
```

---

# 11. Building an Action Dispatcher

You can use the action value to select behavior.

```javascript
actions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");

  if (!button) {
    return;
  }

  const action = button.dataset.action;

  if (action === "edit") {
    console.log("Edit");
  }

  if (action === "delete") {
    console.log("Delete");
  }

  if (action === "view") {
    console.log("View");
  }
});
```

This creates a simple event-driven architecture:

```text
click
  ↓
find action element
  ↓
read data-action
  ↓
dispatch behavior
```

---

# 12. Using an Object as an Action Map

For multiple actions, an object can make the code easier to extend.

```javascript
const actions = {
  edit() {
    console.log("Edit");
  },

  delete() {
    console.log("Delete");
  },

  view() {
    console.log("View");
  }
};

container.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");

  if (!button) {
    return;
  }

  const action = button.dataset.action;

  actions[action]?.();
});
```

The optional call:

```javascript
actions[action]?.();
```

prevents an error when the action does not exist.

---

# 13. Dynamic Elements

One of the biggest advantages of event delegation is handling elements created later.

HTML:

```html
<ul id="users"></ul>
```

Attach one listener:

```javascript
const users = document.querySelector("#users");

users.addEventListener("click", (event) => {
  const item = event.target.closest("li");

  if (!item) {
    return;
  }

  console.log(item.textContent);
});
```

Later, create an item:

```javascript
const item = document.createElement("li");

item.textContent = "Osama Abu Motlaq";

users.append(item);
```

The new `<li>` already works.

You do not need:

```javascript
item.addEventListener(...);
```

because the event bubbles to the existing parent listener.

---

# 14. Without Event Delegation

Suppose you dynamically create 100 buttons.

You might need:

```javascript
buttons.forEach((button) => {
  button.addEventListener("click", handleClick);
});
```

Every new button requires its own listener.

With delegation:

```javascript
container.addEventListener("click", handleClick);
```

new buttons can automatically participate as long as their events bubble to the container.

---

# 15. Event Delegation for Lists

This is one of the most common use cases.

HTML:

```html
<ul id="users">
  <li>
    <button data-user="Osama Abu Motlaq">
      Open
    </button>
  </li>

  <li>
    <button data-user="Frontend Developer">
      Open
    </button>
  </li>
</ul>
```

JavaScript:

```javascript
const users = document.querySelector("#users");

users.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  console.log(button.dataset.user);
});
```

One listener handles all buttons.

---

# 16. Event Delegation for Tables

Tables are another excellent use case.

```html
<table id="users">
  <tbody>
    <tr>
      <td>Osama Abu Motlaq</td>
      <td>
        <button data-action="edit">Edit</button>
        <button data-action="delete">Delete</button>
      </td>
    </tr>
  </tbody>
</table>
```

JavaScript:

```javascript
const table = document.querySelector("#users");

table.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  const action = button.dataset.action;

  console.log(action);
});
```

You can add thousands of rows without needing to attach a separate listener to every button.

---

# 17. Finding the Associated Row

You can combine `closest()` calls.

```javascript
table.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  const row = button.closest("tr");

  if (!row) {
    return;
  }

  console.log(row);
});
```

Now the handler knows:

```text
button
  ↓
associated table row
```

This is useful for operations such as:

* Editing a row
* Deleting a row
* Expanding a row
* Reading row-specific data

---

# 18. Using `data-id`

A common pattern is storing an identifier in a data attribute.

```html
<button
  data-action="edit"
  data-id="42"
>
  Edit
</button>
```

JavaScript:

```javascript
container.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");

  if (!button) {
    return;
  }

  const action = button.dataset.action;
  const id = button.dataset.id;

  console.log(action);
  console.log(id);
});
```

Output:

```text
edit
42
```

Remember that `dataset` values are strings.

```javascript
typeof button.dataset.id;
```

returns:

```text
"string"
```

If you need a number:

```javascript
const id = Number(button.dataset.id);
```

---

# 19. Event Delegation With Forms

Event delegation can also be useful for forms.

```html
<form id="profile-form">
  <input name="name">
  <input name="email">
  <button type="submit">
    Save
  </button>
</form>
```

Listen on the form:

```javascript
const form = document.querySelector("#profile-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  console.log("Form submitted");
});
```

The `submit` event is associated with the form itself, so delegation is not always necessary here.

The important lesson is:

> Use delegation when a parent can meaningfully handle events originating from its descendants.

Do not use delegation merely because it is possible.

---

# 20. Event Delegation and Non-Bubbling Events

Event delegation relies on an event reaching the parent.

Therefore, the event's propagation behavior matters.

For example:

```text
click
→ bubbles
```

This makes it suitable for normal click delegation.

But:

```text
focus
→ does not normally bubble
```

So this does not work in the same way:

```javascript
container.addEventListener("focus", handler);
```

for delegated descendant focus events.

A common alternative is:

```javascript
container.addEventListener(
  "focusin",
  handler
);
```

because `focusin` bubbles.

Another option is to use capturing:

```javascript
container.addEventListener(
  "focus",
  handler,
  {
    capture: true
  }
);
```

Choose the approach based on the behavior you actually need.

---

# 21. Delegation With Keyboard Events

Delegation also works with keyboard events that bubble.

HTML:

```html
<div id="container">
  <input>
  <input>
  <input>
</div>
```

JavaScript:

```javascript
container.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    console.log("Enter pressed");
  }
});
```

The parent can observe keyboard events originating from descendant inputs.

You can identify the specific input:

```javascript
container.addEventListener("keydown", (event) => {
  const input = event.target.closest("input");

  if (!input) {
    return;
  }

  if (event.key === "Enter") {
    console.log(input.value);
  }
});
```

---

# 22. Delegation With Multiple Element Types

One parent can manage several types of controls.

```html
<div id="toolbar">
  <button data-action="save">Save</button>
  <button data-action="delete">Delete</button>

  <a data-action="profile" href="/profile">
    Profile
  </a>
</div>
```

JavaScript:

```javascript
toolbar.addEventListener("click", (event) => {
  const actionElement = event.target.closest("[data-action]");

  if (!actionElement) {
    return;
  }

  const action = actionElement.dataset.action;

  console.log(action);
});
```

The selector:

```css
[data-action]
```

allows the handler to work with different element types.

---

# 23. Preventing Unwanted Parent Matches

Consider nested delegated containers:

```html
<div id="outer">
  <div id="inner">
    <button data-action="save">Save</button>
  </div>
</div>
```

Both containers might have listeners.

Because events bubble:

```text
button
 ↓
inner
 ↓
outer
```

both listeners may run.

If the inner component intentionally handles the event, it might use:

```javascript
event.stopPropagation();
```

But this should be a deliberate design decision.

Another approach is to make the parent handler carefully identify which elements belong to it.

---

# 24. Checking Container Ownership

A useful defensive pattern is:

```javascript
container.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");

  if (!button || !container.contains(button)) {
    return;
  }

  console.log(button.dataset.action);
});
```

This prevents accidentally handling a matching element that is outside the intended container.

This is particularly useful when DOM structures become complex.

---

# 25. Delegation and `matches()`

You can also use:

```javascript
event.target.matches()
```

Example:

```javascript
container.addEventListener("click", (event) => {
  if (!event.target.matches("button")) {
    return;
  }

  console.log(event.target.textContent);
});
```

This works when the actual clicked target is the button.

But if the button contains:

```html
<button>
  <span>Edit</span>
</button>
```

clicking the `<span>` means:

```javascript
event.target.matches("button")
```

is false.

Therefore, for nested interactive content:

```javascript
event.target.closest("button")
```

is often more reliable.

---

# 26. Delegation With `contains()`

You may see:

```javascript
if (!container.contains(event.target)) {
  return;
}
```

This checks whether the target is inside the container.

However, if the listener is attached directly to the container and the event originated from a descendant, the event is already expected to have a target within the relevant propagation path.

More important is verifying the element returned by `closest()`:

```javascript
const button = event.target.closest("button");

if (!button || !container.contains(button)) {
  return;
}
```

This ensures that the matched button belongs to the intended container.

---

# 27. Event Delegation and Performance

Event delegation can reduce the number of event listeners.

For example:

```text
1000 buttons
```

Individual approach:

```text
1000 listeners
```

Delegated approach:

```text
1 listener
```

However, do not assume that delegation always produces a dramatic performance improvement.

Modern browsers can handle many event listeners efficiently.

The strongest advantages are often:

* Simpler dynamic-element handling.
* Centralized behavior.
* Less listener management.
* Cleaner repeated UI logic.

Performance is one consideration, not the only reason to use delegation.

---

# 28. Event Delegation and Memory

Individual listeners create additional listener registrations.

Delegation can reduce the number of registered listeners:

```text
Many children
     ↓
one parent listener
```

This can simplify lifecycle management, especially when a large number of dynamic elements are repeatedly created and removed.

However, memory behavior depends on the complete application and DOM structure. Do not treat event delegation as a universal memory optimization.

---

# 29. A More Complete Example

HTML:

```html
<ul id="projects">
  <li data-id="1">
    <span>Project A</span>
    <button data-action="view">View</button>
    <button data-action="delete">Delete</button>
  </li>

  <li data-id="2">
    <span>Project B</span>
    <button data-action="view">View</button>
    <button data-action="delete">Delete</button>
  </li>
</ul>
```

JavaScript:

```javascript
const projects = document.querySelector("#projects");

projects.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");

  if (!button || !projects.contains(button)) {
    return;
  }

  const project = button.closest("[data-id]");

  if (!project) {
    return;
  }

  const action = button.dataset.action;
  const id = project.dataset.id;

  if (action === "view") {
    console.log(`View project ${id}`);
  }

  if (action === "delete") {
    console.log(`Delete project ${id}`);
  }
});
```

Now:

```text
Click View
    ↓
Find button
    ↓
Find project
    ↓
Read action
    ↓
Read project ID
    ↓
Perform operation
```

Only one listener is required for the entire list.

---

# 30. A Better Action Map

The previous example can be structured using functions:

```javascript
const handlers = {
  view(id) {
    console.log(`View project ${id}`);
  },

  delete(id) {
    console.log(`Delete project ${id}`);
  }
};

projects.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");

  if (!button || !projects.contains(button)) {
    return;
  }

  const project = button.closest("[data-id]");

  if (!project) {
    return;
  }

  const action = button.dataset.action;
  const id = project.dataset.id;

  handlers[action]?.(id);
});
```

This separates:

```text
Event detection
        ↓
Element identification
        ↓
Data extraction
        ↓
Action execution
```

That separation can make complex event handlers easier to maintain.

---

# 31. Delegation and Accessibility

Event delegation does not replace accessibility requirements.

For example:

```html
<div data-action="delete">
  Delete
</div>
```

is not automatically equivalent to:

```html
<button data-action="delete">
  Delete
</button>
```

Prefer semantic interactive elements:

```html
<button>
```

for actions.

Use:

```html
<a>
```

for navigation.

Event delegation should support semantic HTML rather than encouraging non-semantic clickable elements.

---

# 32. Do Not Delegate Everything

Event delegation is a technique, not a rule.

Individual listeners can be preferable when:

* There are only a few elements.
* The behavior belongs strongly to a specific component.
* The event does not bubble.
* Delegation would make the logic harder to understand.
* The parent has unrelated responsibilities.
* Precise listener lifecycle is important.

Example:

```javascript
button.addEventListener("click", handleClick);
```

is perfectly reasonable when there is only one button.

---

# 33. Event Delegation in React

React changes how you normally implement event handling.

You usually write:

```jsx
function ProjectList() {
  return (
    <ul>
      <li>
        <button onClick={() => console.log("View")}>
          View
        </button>
      </li>
    </ul>
  );
}
```

rather than manually attaching DOM listeners.

React manages event handling for you.

However, the underlying concepts remain important.

For example:

```jsx
function ProjectList() {
  function handleClick(event) {
    console.log(event.target);
    console.log(event.currentTarget);
  }

  return (
    <div onClick={handleClick}>
      <button>
        Osama Abu Motlaq
      </button>
    </div>
  );
}
```

Clicking the button can cause the parent handler to receive the event through React's event system.

Understanding DOM propagation helps explain why:

```javascript
event.stopPropagation();
```

can prevent a parent handler from responding.

---

# 34. React: Prefer React's Model

In React, do not normally write:

```javascript
document.querySelector(...)
```

and manually attach listeners for ordinary component interactions.

Prefer:

```jsx
<button onClick={handleClick}>
```

React's declarative model is usually easier to maintain.

Direct DOM event delegation is more relevant when:

* Working with non-React DOM APIs.
* Integrating third-party libraries.
* Working with custom elements.
* Managing a specific imperative DOM boundary.
* Learning the underlying browser event model.

---

# 35. Next.js Connection

Next.js uses React for client-side interaction.

A component handling browser events must run on the client.

For example:

```jsx
"use client";

export default function ProjectList() {
  function handleClick(event) {
    console.log(event.target);
  }

  return (
    <div onClick={handleClick}>
      <button>
        Osama Abu Motlaq
      </button>
    </div>
  );
}
```

The important distinction is:

```text
Server-side rendering
        ≠
Browser event handling
```

Event delegation itself is a browser DOM concept.

In normal Next.js development, you generally use React event handlers rather than manually implementing DOM delegation.

---

# 36. Event Delegation vs Event Bubbling

These are not the same thing.

### Event bubbling

A browser event propagation mechanism:

```text
child
  ↑
parent
  ↑
ancestor
```

### Event delegation

A programming technique:

```text
parent listener
       ↓
inspect event.target
       ↓
handle child event
```

Therefore:

```text
Bubbling
   ↓
provides the propagation
   ↓
Delegation
   ↓
uses that propagation
```

---

# 37. Event Delegation vs Capturing

Event delegation usually uses bubbling:

```javascript
container.addEventListener("click", handler);
```

But delegation-like patterns can also use capturing:

```javascript
container.addEventListener("focus", handler, {
  capture: true
});
```

The key question is not:

> "Should I always use bubbling?"

The better question is:

> "How does this event propagate, and where should I observe it?"

---

# 38. Common Mistakes

## Mistake 1: Assuming `event.target` Is the Button

HTML:

```html
<button>
  <span>Edit</span>
</button>
```

If the `<span>` is clicked:

```javascript
event.target
```

may be:

```text
span
```

Use:

```javascript
event.target.closest("button")
```

when appropriate.

---

## Mistake 2: Forgetting That the Event Must Reach the Parent

Delegation depends on propagation.

If the event does not bubble, a normal bubbling listener on the parent may not receive it.

---

## Mistake 3: Forgetting Dynamic Elements

If listeners are attached only to elements that exist initially:

```javascript
document.querySelectorAll("button")
```

new buttons added later will not automatically receive those individual listeners.

Delegation can solve this.

---

## Mistake 4: Using `stopPropagation()` Without Understanding the Consequences

Stopping propagation can prevent another delegated ancestor from receiving the event.

Use it intentionally.

---

## Mistake 5: Using Non-Semantic Clickable Elements

Avoid:

```html
<div onclick="...">
```

when the element represents a button.

Prefer:

```html
<button>
```

and delegate from an appropriate semantic container if necessary.

---

## Mistake 6: Making One Giant Delegated Handler

A huge handler containing dozens of unrelated actions becomes difficult to maintain.

Prefer separating:

```text
event detection
data extraction
action dispatch
business logic
```

---

# 39. Best Practices

### 1. Delegate from a meaningful container

Good:

```javascript
projectList.addEventListener("click", handler);
```

Less desirable:

```javascript
document.addEventListener("click", handler);
```

A narrower container reduces unrelated event processing.

---

### 2. Use `closest()` for nested content

```javascript
const button = event.target.closest("button");
```

This handles clicks on descendants.

---

### 3. Verify the matched element belongs to the container

```javascript
if (!button || !container.contains(button)) {
  return;
}
```

---

### 4. Use `data-*` attributes for declarative actions

```html
<button data-action="edit">
```

This makes the intended action explicit.

---

### 5. Prefer semantic HTML

Use:

```html
<button>
```

for actions and:

```html
<a>
```

for navigation.

---

### 6. Do not delegate unnecessarily

For one or two elements, direct listeners are often simpler.

---

### 7. Keep delegated handlers focused

A delegated handler should primarily:

```text
identify
validate
extract
dispatch
```

Complex business logic can live elsewhere.

---

# 40. Quick Reference

## Basic delegation

```javascript
container.addEventListener("click", (event) => {
  const target = event.target.closest("button");

  if (!target) {
    return;
  }

  // Handle button
});
```

---

## Using `data-action`

```javascript
container.addEventListener("click", (event) => {
  const element = event.target.closest("[data-action]");

  if (!element) {
    return;
  }

  const action = element.dataset.action;

  console.log(action);
});
```

---

## Verify container ownership

```javascript
const button = event.target.closest("button");

if (!button || !container.contains(button)) {
  return;
}
```

---

## Get associated item

```javascript
const item = button.closest("[data-id]");
```

---

## Read an identifier

```javascript
const id = item.dataset.id;
```

---

## Stop propagation

```javascript
event.stopPropagation();
```

Use only when intentionally preventing further propagation.

---

## Prevent default behavior

```javascript
event.preventDefault();
```

This is different from stopping propagation.

---

# 41. Decision Guide

Use **event delegation** when:

```text
Are there many similar elements?
        ↓
       Yes
        ↓
Are their events able to reach a common parent?
        ↓
       Yes
        ↓
Are elements created dynamically?
        ↓
       Maybe
        ↓
Delegation may be useful
```

Use a **direct listener** when:

```text
Only a few elements exist
        ↓
Behavior is simple
        ↓
Direct listener is clear
```

Do not force delegation simply to reduce the number of lines.

Choose the approach that makes the event flow easiest to understand.

---

# 42. Mental Model

The entire concept can be reduced to:

```text
User interaction
       ↓
Child receives event
       ↓
Event bubbles
       ↓
Parent listener receives event
       ↓
event.target identifies origin
       ↓
closest() finds intended element
       ↓
Read data-action / data-id
       ↓
Execute appropriate behavior
```

For example:

```text
<button data-action="delete">
    <span>Delete</span>
</button>
```

The user clicks:

```text
span
 ↓
event.target
 ↓
closest("[data-action]")
 ↓
button
 ↓
dataset.action
 ↓
"delete"
 ↓
delete logic
```

---

# 43. Final Takeaways

* **Event delegation** means handling events from child elements using a listener on an ancestor.
* It relies primarily on **event bubbling**.
* `event.target` tells you where the event originated.
* `event.currentTarget` tells you where the delegated listener is attached.
* `closest()` is often useful for finding the intended interactive element.
* `data-*` attributes provide a convenient way to identify actions and associated data.
* Delegation works particularly well for lists, tables, menus, repeated controls, and dynamically created elements.
* Not every event bubbles, so delegation depends on the propagation behavior of the event type.
* `stopPropagation()` can interfere with delegated ancestors and should be used deliberately.
* Delegation can reduce the number of event listeners, but its main benefits are often simpler dynamic-element handling and centralized event logic.
* Use semantic HTML such as `<button>` and `<a>` rather than turning arbitrary elements into interactive controls.
* Do not use delegation when a direct listener is simpler and clearer.
* In React and Next.js, ordinary UI events are normally handled through React's declarative event handlers rather than manually implementing DOM delegation.
* Understanding event delegation remains valuable because it builds a strong mental model of how browser events propagate.

The core idea is:

```text
Many child elements
       ↓
One parent listener
       ↓
event.target
       ↓
Identify the child
       ↓
Handle the action
```

Event delegation is essentially **using event propagation as an architectural tool** rather than attaching an independent listener to every repeated element.
