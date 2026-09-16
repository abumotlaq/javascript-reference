# DOM Event Bubbling and Capturing

Event bubbling and event capturing are two fundamental parts of the **DOM event propagation system**.

When an event occurs on an element, the browser does not simply execute the event handler on that element and stop. The event travels through the DOM tree in a specific sequence.

Understanding this process is essential for:

* Event listeners
* Parent and child interactions
* Event delegation
* `event.target`
* `event.currentTarget`
* `stopPropagation()`
* `stopImmediatePropagation()`
* Dynamic elements
* Complex interactive interfaces
* React event handling

---

## 1. What Is Event Propagation?

**Event propagation** is the process through which an event travels through the DOM tree.

Consider this HTML:

```html
<div id="parent">
  <button id="child">Click me</button>
</div>
```

The DOM relationship is:

```text
document
   ↓
html
   ↓
body
   ↓
div#parent
   ↓
button#child
```

If the user clicks the button, the event travels through this structure.

Conceptually:

```text
Capturing phase
      ↓
document
      ↓
html
      ↓
body
      ↓
parent
      ↓
button
      ↑
Target phase
      ↑
parent
      ↑
body
      ↑
html
      ↑
document
Bubbling phase
```

The event therefore has three important phases:

1. **Capturing phase**
2. **Target phase**
3. **Bubbling phase**

---

# 2. The Three Event Phases

The DOM event system defines three phases.

| Phase     | Description                                             |
| --------- | ------------------------------------------------------- |
| Capturing | Event travels from the top of the DOM toward the target |
| Target    | Event reaches the element where it originated           |
| Bubbling  | Event travels from the target back toward the top       |

The phases can be visualized as:

```text
           document
              ↓
             html
              ↓
             body
              ↓
            parent
              ↓
            target
              ↑
            parent
              ↑
             body
              ↑
             html
              ↑
           document
```

The downward journey is **capturing**.

The upward journey is **bubbling**.

---

# 3. Event Bubbling

**Event bubbling** means an event propagates from the target element upward through its ancestors.

Example:

```html
<div id="parent">
  <button id="child">Click me</button>
</div>
```

```javascript
const parent = document.querySelector("#parent");
const child = document.querySelector("#child");

parent.addEventListener("click", () => {
  console.log("Parent clicked");
});

child.addEventListener("click", () => {
  console.log("Button clicked");
});
```

Clicking the button produces:

```text
Button clicked
Parent clicked
```

Why?

The event originated on the button:

```text
button
  ↑
parent
```

The button's listener runs first.

Then the event bubbles to the parent.

---

# 4. Bubbling Through Multiple Ancestors

Consider:

```html
<div id="grandparent">
  <div id="parent">
    <button id="child">Click me</button>
  </div>
</div>
```

Add listeners:

```javascript
const grandparent = document.querySelector("#grandparent");
const parent = document.querySelector("#parent");
const child = document.querySelector("#child");

grandparent.addEventListener("click", () => {
  console.log("Grandparent");
});

parent.addEventListener("click", () => {
  console.log("Parent");
});

child.addEventListener("click", () => {
  console.log("Child");
});
```

Click the button.

Output:

```text
Child
Parent
Grandparent
```

The event moves upward:

```text
Child
  ↑
Parent
  ↑
Grandparent
```

Eventually it can continue toward:

```text
body
html
document
window
```

---

# 5. Why Is It Called "Bubbling"?

The name comes from the idea of something moving upward like bubbles in water.

```text
        document
           ↑
          body
           ↑
       parent
           ↑
        button
```

The event starts at the deepest target and moves upward.

This is called:

> Event bubbling.

---

# 6. Event Capturing

**Event capturing** is the opposite direction.

Instead of the event moving from the target upward, the event first travels from the top of the DOM toward the target.

Example:

```javascript
parent.addEventListener(
  "click",
  () => {
    console.log("Parent");
  },
  true
);
```

The third argument:

```javascript
true
```

requests the listener during the **capturing phase**.

A more explicit version is:

```javascript
parent.addEventListener(
  "click",
  () => {
    console.log("Parent");
  },
  {
    capture: true
  }
);
```

The object form is generally easier to read.

---

# 7. Capturing Example

HTML:

```html
<div id="parent">
  <button id="child">Click me</button>
</div>
```

JavaScript:

```javascript
const parent = document.querySelector("#parent");
const child = document.querySelector("#child");

parent.addEventListener(
  "click",
  () => {
    console.log("Parent capturing");
  },
  {
    capture: true
  }
);

child.addEventListener("click", () => {
  console.log("Child");
});
```

Click the button.

Output:

```text
Parent capturing
Child
```

The event travels:

```text
Parent
   ↓
Child
```

---

# 8. Capturing and Bubbling Together

You can register listeners in both phases.

```html
<div id="parent">
  <button id="child">Click me</button>
</div>
```

```javascript
const parent = document.querySelector("#parent");
const child = document.querySelector("#child");

parent.addEventListener(
  "click",
  () => {
    console.log("Parent capturing");
  },
  {
    capture: true
  }
);

child.addEventListener("click", () => {
  console.log("Child");
});

parent.addEventListener("click", () => {
  console.log("Parent bubbling");
});
```

Clicking the button produces:

```text
Parent capturing
Child
Parent bubbling
```

The complete direction is:

```text
             parent
                ↓
        Capturing listener
                ↓
              child
                ↓
         Target listener
                ↓
              parent
                ↓
         Bubbling listener
```

---

# 9. The Complete Event Flow

Consider:

```html
<div id="grandparent">
  <div id="parent">
    <button id="child">Click</button>
  </div>
</div>
```

Suppose all three elements have capturing and bubbling listeners.

The event flow is approximately:

```text
1. document
2. html
3. body
4. grandparent
5. parent
6. child
7. parent
8. grandparent
9. body
10. html
11. document
```

The important conceptual model is:

```text
CAPTURING
───────────────────────────────→

document
   ↓
html
   ↓
body
   ↓
grandparent
   ↓
parent
   ↓
child

              TARGET
                ↓

child

                ↑

BUBBLING
←───────────────────────────────

parent
   ↑
grandparent
   ↑
body
   ↑
html
   ↑
document
```

The actual propagation path can vary depending on the event and the DOM environment, so this diagram should be treated as a mental model rather than a literal list of every internal step.

---

# 10. The Target Phase

The **target phase** occurs when the event reaches the element where it originated.

For example:

```html
<button id="child">Click</button>
```

If the button is clicked:

```javascript
child.addEventListener("click", () => {
  console.log("Target");
});
```

The button is:

```javascript
event.target
```

during the event.

The target is where the event originally occurred.

---

# 11. `event.target` vs `event.currentTarget`

This distinction is extremely important.

### `event.target`

The element where the event originated.

### `event.currentTarget`

The element whose listener is currently running.

Example:

```html
<div id="parent">
  <button id="child">Click</button>
</div>
```

```javascript
parent.addEventListener("click", (event) => {
  console.log(event.target);
  console.log(event.currentTarget);
});
```

If the button is clicked:

```text
event.target
→ button

event.currentTarget
→ div#parent
```

Why?

Because the event originated on the button, but the listener is attached to the parent.

---

# 12. Example With Bubbling

```javascript
parent.addEventListener("click", (event) => {
  console.log("Target:", event.target.id);
  console.log("Current target:", event.currentTarget.id);
});
```

Click the button.

Output:

```text
Target: child
Current target: parent
```

The event originated here:

```text
child
```

But the current listener belongs to:

```text
parent
```

---

# 13. `event.target` Does Not Change

Suppose an event originates on:

```html
<button id="child">Click</button>
```

As the event bubbles:

```text
child
  ↑
parent
  ↑
grandparent
```

The target remains:

```javascript
event.target === child
```

The target represents the original source.

However:

```javascript
event.currentTarget
```

changes depending on which listener is currently executing.

---

# 14. Event Bubbling and Event Delegation

Event bubbling makes **event delegation** possible.

Consider:

```html
<ul id="users">
  <li>Osama Abu Motlaq</li>
  <li>Developer</li>
  <li>JavaScript</li>
</ul>
```

Instead of adding a listener to every `<li>`:

```javascript
const items = document.querySelectorAll("#users li");

items.forEach((item) => {
  item.addEventListener("click", () => {
    console.log(item.textContent);
  });
});
```

You can attach one listener to the parent:

```javascript
const list = document.querySelector("#users");

list.addEventListener("click", (event) => {
  console.log(event.target.textContent);
});
```

The event bubbles from:

```text
li
 ↓
ul
```

The parent receives it.

---

# 15. Event Delegation With `closest()`

A robust delegation pattern is:

```javascript
const list = document.querySelector("#users");

list.addEventListener("click", (event) => {
  const item = event.target.closest("li");

  if (!item) {
    return;
  }

  console.log(item.textContent);
});
```

This is especially useful when the clicked element is nested.

Example:

```html
<ul id="users">
  <li>
    <button>
      <span>Osama Abu Motlaq</span>
    </button>
  </li>
</ul>
```

If the user clicks:

```html
<span>Osama Abu Motlaq</span>
```

then:

```javascript
event.target
```

may be the `<span>`.

Using:

```javascript
event.target.closest("li")
```

allows you to find the intended delegated element.

---

# 16. Stopping Bubbling

You can stop propagation with:

```javascript
event.stopPropagation();
```

Example:

```javascript
parent.addEventListener("click", () => {
  console.log("Parent");
});

child.addEventListener("click", (event) => {
  event.stopPropagation();

  console.log("Child");
});
```

Click the button.

Output:

```text
Child
```

The event does not continue bubbling to the parent.

---

# 17. `stopPropagation()` Does Not Cancel the Default Action

This is a very common mistake.

These are different operations:

```javascript
event.stopPropagation();
```

and:

```javascript
event.preventDefault();
```

### `stopPropagation()`

Controls event propagation.

```text
Child → Parent → Grandparent
          X
```

### `preventDefault()`

Prevents the browser's default action.

For example:

```javascript
event.preventDefault();
```

can prevent a link from navigating.

The two methods solve different problems.

---

# 18. `stopImmediatePropagation()`

There is another method:

```javascript
event.stopImmediatePropagation();
```

It does more than `stopPropagation()`.

Suppose:

```javascript
button.addEventListener("click", () => {
  console.log("Listener 1");
});

button.addEventListener("click", (event) => {
  event.stopImmediatePropagation();

  console.log("Listener 2");
});

button.addEventListener("click", () => {
  console.log("Listener 3");
});
```

Clicking the button produces:

```text
Listener 1
Listener 2
```

Listener 3 does not run.

`stopImmediatePropagation()` prevents:

1. Further propagation.
2. Other listeners on the same target from running.

Use it carefully because it creates stronger control over event processing.

---

# 19. Bubbling vs Capturing

| Feature                | Capturing              | Bubbling         |
| ---------------------- | ---------------------- | ---------------- |
| Direction              | Top → target           | Target → top     |
| Default listener phase | No                     | Yes              |
| Enabled with           | `capture: true`        | Default          |
| Common usage           | Specialized event flow | Event delegation |
| Starts from            | Outer ancestor         | Target           |
| Moves toward           | Target                 | Outer ancestors  |

For most application code, bubbling is the more commonly used phase.

---

# 20. `addEventListener()` Options

Instead of:

```javascript
element.addEventListener("click", handler, true);
```

prefer:

```javascript
element.addEventListener("click", handler, {
  capture: true
});
```

The options object can also contain other settings:

```javascript
element.addEventListener("click", handler, {
  capture: true,
  once: true,
  passive: true
});
```

These options control how the listener behaves.

---

# 21. `once`

The `once` option automatically removes the listener after it runs once.

```javascript
button.addEventListener(
  "click",
  () => {
    console.log("Clicked once");
  },
  {
    once: true
  }
);
```

The listener runs once:

```text
First click  → runs
Second click → does not run
Third click  → does not run
```

---

# 22. `passive`

A passive listener tells the browser that the listener will not call:

```javascript
event.preventDefault();
```

Example:

```javascript
window.addEventListener(
  "scroll",
  () => {
    console.log("Scrolling");
  },
  {
    passive: true
  }
);
```

This can be useful for certain high-frequency browser events, particularly touch and wheel interactions.

Do not use `passive: true` if the listener needs to cancel the event's default action.

---

# 23. `capture` Is Different From `bubbles`

The following are related but different concepts.

### Listener configuration

```javascript
{
  capture: true
}
```

controls which phase the listener participates in.

### Event property

```javascript
event.bubbles
```

indicates whether that event type participates in bubbling.

For example:

```javascript
console.log(event.bubbles);
```

might return:

```text
true
```

for a normal `click` event.

---

# 24. Not Every Event Bubbles

A common mistake is assuming every DOM event bubbles.

Some events have different propagation behavior.

For example:

```text
click
→ bubbles

focus
→ does not normally bubble

blur
→ does not normally bubble
```

There are bubbling alternatives:

```text
focusin
→ bubbles

focusout
→ bubbles
```

Always check the behavior of the specific event when building delegation logic.

---

# 25. Event Delegation Depends on Bubbling

Suppose:

```html
<div id="form">
  <input id="name">
</div>
```

You can delegate some events:

```javascript
form.addEventListener("input", (event) => {
  console.log(event.target.value);
});
```

because `input` events bubble.

But delegation cannot simply assume that every event will reach the parent.

For non-bubbling events, use the appropriate bubbling event or capture phase when appropriate.

---

# 26. Capturing Can Be Used for Non-Bubbling Events

A listener can participate in capturing:

```javascript
form.addEventListener(
  "focus",
  () => {
    console.log("Focus detected");
  },
  {
    capture: true
  }
);
```

This allows the ancestor to observe the event during the capturing phase even though `focus` itself does not normally bubble.

This is one reason understanding the event phases is useful beyond event delegation.

---

# 27. `stopPropagation()` During Capturing

Propagation can also be stopped during capturing.

```javascript
parent.addEventListener(
  "click",
  (event) => {
    event.stopPropagation();

    console.log("Parent capture");
  },
  {
    capture: true
  }
);
```

Once propagation is stopped, the event will not continue through the remaining propagation path.

---

# 28. A Complete Example

HTML:

```html
<div id="grandparent">
  Grandparent

  <div id="parent">
    Parent

    <button id="child">
      Click
    </button>
  </div>
</div>
```

JavaScript:

```javascript
const grandparent = document.querySelector("#grandparent");
const parent = document.querySelector("#parent");
const child = document.querySelector("#child");

grandparent.addEventListener(
  "click",
  () => {
    console.log("Grandparent capture");
  },
  {
    capture: true
  }
);

parent.addEventListener(
  "click",
  () => {
    console.log("Parent capture");
  },
  {
    capture: true
  }
);

child.addEventListener("click", () => {
  console.log("Child");
});

parent.addEventListener("click", () => {
  console.log("Parent bubble");
});

grandparent.addEventListener("click", () => {
  console.log("Grandparent bubble");
});
```

Click the button.

Conceptually:

```text
Grandparent capture
Parent capture
Child
Parent bubble
Grandparent bubble
```

This demonstrates the complete propagation sequence.

---

# 29. Event Propagation Path

The browser internally determines the event's propagation path.

You can inspect a related concept using:

```javascript
event.composedPath()
```

Example:

```javascript
child.addEventListener("click", (event) => {
  console.log(event.composedPath());
});
```

The result contains the objects through which the event propagated.

A simplified result might look like:

```text
[
  button,
  div,
  body,
  html,
  document,
  window
]
```

The exact path depends on the DOM structure and event context.

---

# 30. Shadow DOM and `composedPath()`

`composedPath()` becomes particularly important when working with **Shadow DOM**.

Shadow DOM creates an encapsulated DOM tree.

Events crossing a shadow boundary can have different visible targets depending on event configuration and retargeting.

Therefore:

```javascript
event.target
```

and:

```javascript
event.composedPath()
```

can provide different levels of information.

For ordinary DOM applications, you usually do not need to work with this directly.

For Web Components and Shadow DOM, it becomes much more relevant.

---

# 31. `event.composed`

Some events have a:

```javascript
event.composed
```

property.

It indicates whether the event can cross a Shadow DOM boundary.

This is primarily relevant to:

* Web Components
* Shadow DOM
* Custom elements

For normal React applications, it is usually not something you need to manipulate directly.

---

# 32. Custom Events and Bubbling

Custom events can also participate in propagation.

Example:

```javascript
const event = new CustomEvent("profileUpdated", {
  bubbles: true
});

child.dispatchEvent(event);
```

Because:

```javascript
bubbles: true
```

was specified, the event can bubble toward ancestors.

A parent can listen:

```javascript
parent.addEventListener("profileUpdated", () => {
  console.log("Profile updated");
});
```

This is useful when building custom DOM-based components.

---

# 33. Custom Events Without Bubbling

By default, a custom event does not necessarily behave like a bubbling event.

You can explicitly control it:

```javascript
const event = new CustomEvent("profileUpdated", {
  bubbles: true,
  detail: {
    name: "Osama Abu Motlaq"
  }
});
```

Then:

```javascript
child.dispatchEvent(event);
```

The event carries data through:

```javascript
event.detail
```

---

# 34. Bubbling and Dynamic Elements

Event delegation is especially useful when elements are created dynamically.

Example:

```javascript
const list = document.querySelector("#users");

list.addEventListener("click", (event) => {
  const item = event.target.closest("li");

  if (!item) {
    return;
  }

  console.log(item.textContent);
});
```

Later, JavaScript creates:

```javascript
const item = document.createElement("li");

item.textContent = "Osama Abu Motlaq";

list.append(item);
```

You do not need to attach another click listener to the new `<li>`.

The existing parent listener can handle the event because the event bubbles.

---

# 35. Why Event Delegation Is Useful

Without delegation:

```text
button 1 → listener
button 2 → listener
button 3 → listener
button 4 → listener
...
```

With delegation:

```text
parent
  ↓
one listener
```

Advantages include:

* Fewer listeners.
* Easier handling of dynamic elements.
* Centralized event logic.
* Useful for large lists.
* Natural fit for event bubbling.

However, delegation is not automatically better in every situation. The event must reach the delegated ancestor, and the handler should correctly identify the intended target.

---

# 36. Common Event Delegation Pattern

A common pattern is:

```javascript
container.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");

  if (!button || !container.contains(button)) {
    return;
  }

  const action = button.dataset.action;

  console.log(action);
});
```

HTML:

```html
<div id="container">
  <button data-action="edit">Edit</button>
  <button data-action="delete">Delete</button>
</div>
```

Now one listener handles multiple buttons.

---

# 37. Bubbling and Nested Interactive Elements

Consider:

```html
<div id="card">
  <button id="edit">Edit</button>
</div>
```

Both elements have listeners:

```javascript
card.addEventListener("click", () => {
  console.log("Open card");
});

edit.addEventListener("click", () => {
  console.log("Edit");
});
```

Clicking the button gives:

```text
Edit
Open card
```

This may be unwanted.

You could stop propagation:

```javascript
edit.addEventListener("click", (event) => {
  event.stopPropagation();

  console.log("Edit");
});
```

Now:

```text
Edit
```

But do not automatically use `stopPropagation()` everywhere.

Often a better design is to make the parent handler determine whether the intended target should trigger the parent behavior.

---

# 38. Avoid Excessive `stopPropagation()`

A common anti-pattern is:

```javascript
event.stopPropagation();
```

in many unrelated components.

This can make event behavior difficult to reason about.

Potential problems include:

* Breaking event delegation.
* Preventing parent components from observing events.
* Making reusable components less predictable.
* Creating hidden dependencies.
* Making debugging harder.

Use propagation control when there is a specific reason.

---

# 39. Bubbling Is Not the Same as Event Delegation

These concepts are related but not identical.

### Event bubbling

A propagation mechanism:

```text
child → parent → ancestor
```

### Event delegation

A programming technique that takes advantage of bubbling:

```text
parent listener
        ↓
handles events from children
```

Therefore:

```text
Bubbling
    ↓
makes delegation possible
```

But bubbling itself is not delegation.

---

# 40. Capturing Is Not "Parent Events First" in Every Case

Capturing means listeners registered for the capturing phase execute while the event travels toward the target.

Example:

```javascript
parent.addEventListener(
  "click",
  handler,
  {
    capture: true
  }
);
```

This does not mean all parent listeners automatically run before all child listeners.

Only listeners participating in the appropriate phase follow that propagation order.

For example:

```javascript
parent.addEventListener("click", handler);
```

is a bubbling listener by default.

---

# 41. Listener Registration Order

When multiple applicable listeners exist on the same target and phase, their invocation order generally follows registration order.

Example:

```javascript
button.addEventListener("click", () => {
  console.log("First");
});

button.addEventListener("click", () => {
  console.log("Second");
});
```

Output:

```text
First
Second
```

This becomes particularly important when using:

```javascript
stopImmediatePropagation();
```

because it can prevent later listeners on the same target from running.

---

# 42. `this` and Event Listeners

With a regular function used as an event listener:

```javascript
button.addEventListener("click", function (event) {
  console.log(this);
});
```

`this` normally refers to the element on which the listener is currently registered.

For:

```javascript
button.addEventListener(...)
```

that means:

```javascript
this === button
```

With an arrow function:

```javascript
button.addEventListener("click", (event) => {
  console.log(this);
});
```

`this` is lexically inherited and does not receive the event-listener `this` binding.

For DOM event code, `event.currentTarget` is often clearer and more explicit:

```javascript
button.addEventListener("click", (event) => {
  console.log(event.currentTarget);
});
```

---

# 43. React Connection

Understanding DOM event propagation is important when learning React.

A React event handler receives an event-like object:

```jsx
function Profile() {
  function handleClick(event) {
    console.log(event.target);
    console.log(event.currentTarget);
  }

  return (
    <button onClick={handleClick}>
      Osama Abu Motlaq
    </button>
  );
}
```

The same fundamental concepts remain important:

```text
event
event.target
event.currentTarget
event.preventDefault()
event.stopPropagation()
```

React provides its own event system and abstractions, but understanding the browser's DOM event model makes React event behavior much easier to reason about.

---

# 44. React Parent and Child Example

```jsx
function App() {
  function handleParentClick() {
    console.log("Parent");
  }

  function handleChildClick(event) {
    event.stopPropagation();

    console.log("Child");
  }

  return (
    <div onClick={handleParentClick}>
      <button onClick={handleChildClick}>
        Click
      </button>
    </div>
  );
}
```

Clicking the button produces:

```text
Child
```

because propagation was stopped.

Without:

```javascript
event.stopPropagation();
```

the parent handler could also run.

---

# 45. React and Event Delegation

You do not normally need to manually implement DOM event delegation for ordinary React components.

React allows you to express event behavior declaratively:

```jsx
function UserList() {
  const users = ["Osama Abu Motlaq", "Developer"];

  return (
    <ul>
      {users.map((user) => (
        <li key={user}>
          <button onClick={() => console.log(user)}>
            {user}
          </button>
        </li>
      ))}
    </ul>
  );
}
```

React manages the underlying event system.

However, understanding bubbling is still important when:

* Nested handlers interact.
* `stopPropagation()` is used.
* `preventDefault()` is used.
* `target` and `currentTarget` are confused.
* Components contain nested interactive elements.
* You work with native DOM APIs.

---

# 46. Next.js Connection

Next.js uses React for client-side interaction.

For example:

```jsx
"use client";

export default function Profile() {
  function handleClick(event) {
    console.log(event.target);
    console.log(event.currentTarget);
  }

  return (
    <button onClick={handleClick}>
      Osama Abu Motlaq
    </button>
  );
}
```

Event propagation is therefore relevant inside Client Components.

However, event handlers do not run during server rendering.

Interactive event handling belongs to the client side.

---

# 47. Common Mistakes

## Mistake 1: Confusing `target` and `currentTarget`

Incorrect mental model:

```text
target = listener element
```

Correct:

```text
target = original event source
currentTarget = current listener element
```

---

## Mistake 2: Thinking `preventDefault()` Stops Bubbling

It does not.

```javascript
event.preventDefault();
```

controls default browser behavior.

Use:

```javascript
event.stopPropagation();
```

to stop propagation.

---

## Mistake 3: Thinking Bubbling Is Always Bad

Bubbling is a fundamental DOM mechanism.

It enables useful patterns such as:

```text
event delegation
```

Do not disable it without a reason.

---

## Mistake 4: Using `stopPropagation()` Everywhere

This can make event systems harder to understand.

Only stop propagation when the event should intentionally remain isolated.

---

## Mistake 5: Assuming Every Event Bubbles

Some events do not bubble.

Always consider the behavior of the specific event type.

---

## Mistake 6: Confusing Capturing With Bubbling

Remember:

```text
Capturing:
ancestor → target

Bubbling:
target → ancestor
```

---

## Mistake 7: Forgetting Dynamic Elements

If elements are dynamically created, attaching individual listeners can require additional setup.

Event delegation can often solve this:

```javascript
parent.addEventListener("click", handler);
```

---

# 48. Best Practices

### 1. Understand the propagation model

Remember:

```text
Capturing → Target → Bubbling
```

---

### 2. Prefer `event.currentTarget` when you mean the listener element

Instead of relying on assumptions:

```javascript
event.currentTarget
```

clearly identifies the element whose listener is executing.

---

### 3. Use event delegation when appropriate

Especially for:

* Large lists
* Dynamic elements
* Repeated controls

---

### 4. Use `closest()` for robust delegation

```javascript
const button = event.target.closest("button");
```

This handles clicks on nested elements inside the button.

---

### 5. Do not confuse propagation with default behavior

Use:

```javascript
preventDefault()
```

for default actions.

Use:

```javascript
stopPropagation()
```

for propagation.

---

### 6. Avoid unnecessary capturing

Most application event handlers can use the default bubbling phase.

Use capturing when it solves a specific problem.

---

### 7. Keep event handlers predictable

A good event handler should make it clear:

```text
What happened?
Where did it happen?
What should happen next?
```

---

# 49. Quick Reference

## Bubbling

```javascript
element.addEventListener("click", handler);
```

Flow:

```text
target → parent → ancestor
```

---

## Capturing

```javascript
element.addEventListener("click", handler, {
  capture: true
});
```

Flow:

```text
ancestor → parent → target
```

---

## Stop propagation

```javascript
event.stopPropagation();
```

---

## Stop all remaining listeners on the current propagation path

```javascript
event.stopImmediatePropagation();
```

---

## Prevent default browser behavior

```javascript
event.preventDefault();
```

---

## Original event source

```javascript
event.target
```

---

## Current listener element

```javascript
event.currentTarget
```

---

## Propagation path

```javascript
event.composedPath()
```

---

## Check whether an event bubbles

```javascript
event.bubbles
```

---

## Custom bubbling event

```javascript
new CustomEvent("profileUpdated", {
  bubbles: true
});
```

---

# 50. Comparison Table

| Concept                      | Purpose                                  |
| ---------------------------- | ---------------------------------------- |
| `event.target`               | Original event source                    |
| `event.currentTarget`        | Element whose listener is running        |
| Capturing                    | Move toward the target                   |
| Target phase                 | Event reaches its origin                 |
| Bubbling                     | Move away from the target                |
| `stopPropagation()`          | Stop further propagation                 |
| `stopImmediatePropagation()` | Stop propagation and remaining listeners |
| `preventDefault()`           | Cancel default browser behavior          |
| `event.bubbles`              | Indicates whether the event bubbles      |
| `composedPath()`             | Shows the event's propagation path       |
| Event delegation             | Handle child events from an ancestor     |

---

# 51. Mental Model

The simplest way to remember event propagation is:

```text
                    CAPTURING
                        ↓
document
    ↓
html
    ↓
body
    ↓
parent
    ↓
TARGET
    ↑
parent
    ↑
body
    ↑
html
    ↑
document
                    BUBBLING
```

Think:

```text
Capture = going down
Target  = arriving
Bubble  = going up
```

Then remember:

```text
target        = where it started
currentTarget = whose listener is running
```

And:

```text
preventDefault()
    ↓
cancel browser default action

stopPropagation()
    ↓
stop event propagation
```

---

# 52. Final Takeaways

* **Event propagation** describes how an event travels through the DOM.
* The propagation model has **capturing**, **target**, and **bubbling** phases.
* **Capturing** travels from ancestors toward the target.
* **Bubbling** travels from the target toward ancestors.
* Event listeners use the bubbling phase by default.
* Use `{ capture: true }` to register a capturing listener.
* `event.target` identifies where the event originated.
* `event.currentTarget` identifies the element whose listener is currently executing.
* `stopPropagation()` stops further propagation.
* `stopImmediatePropagation()` also prevents later listeners on the same target from executing.
* `preventDefault()` is different: it controls the browser's default action.
* Not every DOM event bubbles.
* Event delegation relies heavily on bubbling.
* `closest()` is useful when implementing event delegation.
* `composedPath()` can reveal the propagation path and becomes particularly useful with Shadow DOM.
* Custom events can be configured to bubble.
* React builds on the browser's event model, so understanding propagation helps when working with React event handlers.
* In modern React and Next.js applications, you usually express event behavior through React handlers rather than manually manipulating DOM listeners, but the underlying concepts remain important.

The key mental model is:

```text
CAPTURE
ancestor
   ↓
   ↓
target
   ↓
BUBBLE
ancestor
```

Once you understand **capturing → target → bubbling**, concepts such as **event delegation**, `target`, `currentTarget`, `preventDefault()`, and `stopPropagation()` become much easier to reason about.
