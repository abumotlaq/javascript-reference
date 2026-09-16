# DOM Events

DOM events allow JavaScript to respond to actions and changes that happen in the browser.

Examples include:

* Clicking a button.
* Typing into an input.
* Submitting a form.
* Moving the mouse.
* Pressing a keyboard key.
* Focusing an input.
* Losing focus.
* Loading a resource.
* Resizing the window.
* Changing an input value.

A simple example:

```javascript
const button = document.querySelector("#profile-button");

button.addEventListener("click", () => {
    console.log("Osama Abu Motlaq");
});
```

The general event flow is:

```text
User action
    ↓
Browser detects the action
    ↓
Event is created
    ↓
Event is dispatched
    ↓
Event listener runs
    ↓
JavaScript responds
```

---

# 1. What Is an Event?

An event is an occurrence that the browser can detect and expose to JavaScript.

For example:

```text
click
keydown
submit
input
change
focus
blur
load
resize
```

When a user clicks a button:

```text
User clicks
    ↓
Browser detects click
    ↓
"click" event occurs
    ↓
Registered listeners are executed
```

JavaScript does not continuously ask:

```text
"Did the user click?"
"Did the user click?"
"Did the user click?"
```

Instead, the browser notifies JavaScript when the event occurs.

---

# 2. Event-Driven Programming

Browser JavaScript is heavily event-driven.

Instead of executing everything immediately from top to bottom, JavaScript can register functions that should run when something happens.

Example:

```javascript
const button = document.querySelector("#button");

button.addEventListener("click", () => {
    console.log("Button clicked");
});

console.log("Program continues");
```

The listener does not execute immediately.

The sequence is:

```text
Register listener
    ↓
Program continues
    ↓
User clicks button
    ↓
Callback executes
```

This is one of the fundamental ideas behind browser applications.

---

# 3. `addEventListener()`

The preferred way to register an event listener is:

```javascript
element.addEventListener(type, listener);
```

Example:

```javascript
const button = document.querySelector("#button");

button.addEventListener("click", () => {
    console.log("Clicked");
});
```

The two main arguments are:

```text
"click"
   ↓
Event type

() => {...}
   ↓
Event listener
```

---

# 4. Event Listener Function

The function passed to `addEventListener()` is called when the event occurs.

Example:

```javascript
button.addEventListener("click", () => {
    console.log("Osama Abu Motlaq");
});
```

The function is not called when it is registered.

It is called later by the browser when the button is clicked.

This distinction is critical.

---

# 5. Passing a Function vs Calling a Function

Correct:

```javascript
button.addEventListener("click", handleClick);
```

Incorrect:

```javascript
button.addEventListener("click", handleClick());
```

Why?

### Correct

```javascript
handleClick
```

passes the function itself.

### Incorrect

```javascript
handleClick()
```

calls the function immediately and passes its return value.

Mental model:

```text
handleClick
    ↓
"Here is the function. Call it later."

handleClick()
    ↓
"Call the function right now."
```

This is the same distinction covered by callbacks in JavaScript.

---

# 6. Creating a Named Event Handler

Instead of using an inline function:

```javascript
button.addEventListener("click", () => {
    console.log("Clicked");
});
```

you can define a function:

```javascript
function handleClick() {
    console.log("Osama Abu Motlaq");
}

button.addEventListener("click", handleClick);
```

This is useful when:

* The handler is large.
* The handler is reused.
* You need to remove it later.
* You want clearer separation of logic.

---

# 7. Removing an Event Listener

Use:

```javascript
removeEventListener()
```

Example:

```javascript
function handleClick() {
    console.log("Osama Abu Motlaq");
}

button.addEventListener("click", handleClick);

button.removeEventListener("click", handleClick);
```

The same function reference must be used.

This does not work:

```javascript
button.addEventListener("click", () => {
    console.log("Clicked");
});

button.removeEventListener("click", () => {
    console.log("Clicked");
});
```

These are two different function objects.

---

# 8. Function Identity Matters

Consider:

```javascript
const handleClick = () => {
    console.log("Clicked");
};
```

Then:

```javascript
button.addEventListener("click", handleClick);

button.removeEventListener("click", handleClick);
```

Both operations use the same function reference.

Therefore the listener can be removed.

This is an important concept when managing event listeners dynamically.

---

# 9. Common Event Types

Some frequently used DOM events are:

| Event              | Description                        |
| ------------------ | ---------------------------------- |
| `click`            | Element is clicked                 |
| `dblclick`         | Element is double-clicked          |
| `mousedown`        | Mouse button is pressed            |
| `mouseup`          | Mouse button is released           |
| `mousemove`        | Pointer moves                      |
| `mouseenter`       | Pointer enters an element          |
| `mouseleave`       | Pointer leaves an element          |
| `keydown`          | Keyboard key is pressed            |
| `keyup`            | Keyboard key is released           |
| `input`            | Input value changes                |
| `change`           | Element's committed value changes  |
| `focus`            | Element receives focus             |
| `blur`             | Element loses focus                |
| `submit`           | Form is submitted                  |
| `reset`            | Form is reset                      |
| `load`             | Resource/document finishes loading |
| `DOMContentLoaded` | HTML document has been parsed      |
| `resize`           | Viewport is resized                |
| `scroll`           | Document or element is scrolled    |

Different events provide different information through the event object.

---

# 10. The Event Object

The browser provides information about the event.

Example:

```javascript
button.addEventListener("click", (event) => {
    console.log(event);
});
```

The parameter:

```javascript
event
```

is an object representing the event.

You can name it differently:

```javascript
button.addEventListener("click", (e) => {
    console.log(e);
});
```

The name does not matter.

The value passed by the browser does.

---

# 11. Common Event Object Properties

Depending on the event, useful properties include:

```javascript
event.type
event.target
event.currentTarget
event.defaultPrevented
event.bubbles
event.cancelable
event.timeStamp
```

For mouse and pointer events, additional properties are available.

For keyboard events:

```javascript
event.key
event.code
event.ctrlKey
event.shiftKey
event.altKey
event.metaKey
```

The exact properties depend on the event type.

---

# 12. `event.type`

`event.type` tells you which event occurred.

Example:

```javascript
button.addEventListener("click", (event) => {
    console.log(event.type);
});
```

Output:

```text
click
```

This can be useful when one function handles multiple event types.

---

# 13. `event.target`

`event.target` is the object on which the event originated.

Example:

```javascript
button.addEventListener("click", (event) => {
    console.log(event.target);
});
```

If the button itself was clicked:

```text
event.target
    ↓
button
```

The target is especially important when working with nested elements and event delegation.

---

# 14. `event.currentTarget`

`event.currentTarget` refers to the element whose listener is currently executing.

Example:

```javascript
button.addEventListener("click", (event) => {
    console.log(event.currentTarget);
});
```

If the listener is registered on the button:

```text
currentTarget
    ↓
button
```

The distinction between `target` and `currentTarget` becomes important during event propagation.

---

# 15. `target` vs `currentTarget`

Consider:

```html
<button id="profile-button">
    <span>Open Profile</span>
</button>
```

Listener:

```javascript
const button = document.querySelector("#profile-button");

button.addEventListener("click", (event) => {
    console.log(event.target);
    console.log(event.currentTarget);
});
```

If the user clicks the `<span>`:

```text
event.target
    ↓
<span>

event.currentTarget
    ↓
<button>
```

So:

```text
target
    = where the event originated

currentTarget
    = element whose listener is executing
```

This distinction is essential for event delegation.

---

# 16. Event Handler and `this`

With a regular function:

```javascript
button.addEventListener("click", function (event) {
    console.log(this);
});
```

`this` refers to the element whose listener is executing.

Conceptually:

```text
this
  ↓
currentTarget
```

However, arrow functions do not create their own `this`:

```javascript
button.addEventListener("click", (event) => {
    console.log(this);
});
```

Therefore, if you specifically need the event listener's element, prefer:

```javascript
event.currentTarget
```

because it is explicit and does not depend on `this` behavior.

---

# 17. Mouse Events

Common mouse events include:

```text
click
dblclick
mousedown
mouseup
mousemove
mouseenter
mouseleave
```

Example:

```javascript
button.addEventListener("mouseenter", () => {
    console.log("Pointer entered");
});

button.addEventListener("mouseleave", () => {
    console.log("Pointer left");
});
```

---

# 18. `click`

The `click` event is one of the most common events.

Example:

```javascript
button.addEventListener("click", () => {
    console.log("Osama Abu Motlaq");
});
```

It is commonly used for:

* Buttons.
* Links.
* UI controls.
* Interactive elements.

---

# 19. `dblclick`

The `dblclick` event occurs after a double click.

Example:

```javascript
button.addEventListener("dblclick", () => {
    console.log("Double click");
});
```

Be careful when combining `click` and `dblclick`, because a double click also involves click activity.

---

# 20. `mouseenter` and `mouseleave`

Example:

```javascript
card.addEventListener("mouseenter", () => {
    console.log("Pointer entered card");
});

card.addEventListener("mouseleave", () => {
    console.log("Pointer left card");
});
```

These are useful for interaction behavior.

For purely visual hover effects, CSS is generally preferable:

```css
.card:hover {
    transform: scale(1.02);
}
```

JavaScript should be used when the interaction requires application logic.

---

# 21. `mouseover` vs `mouseenter`

These events are similar but have different propagation behavior.

`mouseover` can fire when moving between an element and its descendants.

`mouseenter` does not bubble in the same way.

For example:

```html
<div id="card">
    <span>Osama Abu Motlaq</span>
</div>
```

Moving the pointer between the `<div>` and `<span>` can produce different behavior for `mouseover`.

For simple "pointer entered this element" behavior, `mouseenter` is often easier to reason about.

---

# 22. Keyboard Events

Common keyboard events:

```text
keydown
keyup
```

Example:

```javascript
document.addEventListener("keydown", (event) => {
    console.log(event.key);
});
```

If the user presses the `A` key:

```text
a
```

may be logged depending on keyboard layout and modifier state.

---

# 23. `event.key`

`event.key` represents the value of the key.

Example:

```javascript
document.addEventListener("keydown", (event) => {
    console.log(event.key);
});
```

Possible values:

```text
a
Enter
Escape
ArrowUp
ArrowDown
Backspace
```

This is generally useful when your application cares about the actual key meaning.

---

# 24. `event.code`

`event.code` identifies the physical keyboard key.

Example:

```javascript
document.addEventListener("keydown", (event) => {
    console.log(event.code);
});
```

For example:

```text
KeyA
Enter
ArrowUp
```

A useful distinction is:

```text
event.key
    ↓
What key value was produced?

event.code
    ↓
Which physical key was pressed?
```

This distinction matters for keyboard shortcuts and keyboard-layout-sensitive applications.

---

# 25. Keyboard Modifiers

Keyboard events expose modifier information.

Example:

```javascript
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "s") {
        console.log("Save shortcut");
    }
});
```

Available modifier properties include:

```javascript
event.ctrlKey
event.shiftKey
event.altKey
event.metaKey
```

`metaKey` represents the platform's Meta key, such as Command on macOS.

---

# 26. `preventDefault()`

Some browser events have a default action.

Examples:

* Clicking a link navigates.
* Submitting a form can navigate/reload.
* Pressing certain keys can trigger browser behavior.

You can prevent the default action with:

```javascript
event.preventDefault();
```

Example:

```javascript
const link = document.querySelector("#profile-link");

link.addEventListener("click", (event) => {
    event.preventDefault();

    console.log("Navigation prevented");
});
```

---

# 27. `preventDefault()` Does Not Stop Propagation

This distinction is extremely important.

```javascript
event.preventDefault();
```

means:

> Prevent the browser's default action.

It does **not** mean:

> Stop the event from traveling through the DOM.

For propagation control, use:

```javascript
event.stopPropagation();
```

These solve different problems.

---

# 28. `stopPropagation()`

`stopPropagation()` prevents the event from continuing through the propagation path.

Example:

```javascript
parent.addEventListener("click", () => {
    console.log("Parent");
});

button.addEventListener("click", (event) => {
    event.stopPropagation();

    console.log("Button");
});
```

When the button is clicked:

```text
Button
```

is logged, while the parent listener is prevented from receiving that propagation.

---

# 29. `stopImmediatePropagation()`

There is another method:

```javascript
event.stopImmediatePropagation();
```

It stops:

1. Further propagation.
2. Other listeners on the same target from being executed.

Example:

```javascript
button.addEventListener("click", (event) => {
    event.stopImmediatePropagation();

    console.log("First listener");
});

button.addEventListener("click", () => {
    console.log("Second listener");
});
```

The second listener will not execute because the first listener stopped immediate propagation.

Use this carefully because it can make event behavior harder to reason about.

---

# 30. Event Propagation

Events can travel through the DOM.

Suppose:

```html
<div id="parent">
    <button id="button">
        Click
    </button>
</div>
```

When the button is clicked, the event travels through the DOM hierarchy.

The main phases are:

```text
Capturing
    ↓
Target
    ↓
Bubbling
```

---

# 31. Event Capturing

During capturing, the event travels from the document toward the target.

Conceptually:

```text
document
   ↓
html
   ↓
body
   ↓
parent
   ↓
button
```

Example:

```javascript
parent.addEventListener(
    "click",
    () => {
        console.log("Parent capture");
    },
    { capture: true }
);
```

The third argument enables capture mode.

---

# 32. Event Bubbling

After reaching the target, the event can bubble upward.

Conceptually:

```text
button
   ↑
parent
   ↑
body
   ↑
html
   ↑
document
```

Most event listeners use bubbling by default.

Example:

```javascript
parent.addEventListener("click", () => {
    console.log("Parent");
});
```

If a button inside the parent is clicked, the parent can receive the event through bubbling.

---

# 33. Complete Propagation Example

HTML:

```html
<div id="parent">
    <button id="button">
        Click
    </button>
</div>
```

JavaScript:

```javascript
const parent = document.querySelector("#parent");
const button = document.querySelector("#button");

parent.addEventListener(
    "click",
    () => {
        console.log("Parent capture");
    },
    { capture: true }
);

button.addEventListener("click", () => {
    console.log("Button");
});

parent.addEventListener("click", () => {
    console.log("Parent bubble");
});
```

Clicking the button produces conceptually:

```text
Parent capture
Button
Parent bubble
```

This is the foundation of event propagation.

---

# 34. Event Bubbling and Nested Elements

Consider:

```html
<div id="card">
    <button id="button">
        Open
    </button>
</div>
```

Listeners:

```javascript
card.addEventListener("click", () => {
    console.log("Card");
});

button.addEventListener("click", () => {
    console.log("Button");
});
```

Clicking the button results in:

```text
Button
Card
```

The event originated at the button and then bubbled to the card.

---

# 35. Event Delegation

Event delegation takes advantage of bubbling.

Instead of adding listeners to many children:

```javascript
buttons.forEach((button) => {
    button.addEventListener("click", handleClick);
});
```

you can attach one listener to a parent:

```javascript
container.addEventListener("click", (event) => {
    if (event.target.matches("button")) {
        console.log("Button clicked");
    }
});
```

The event bubbles from the button to the container.

This is especially useful for dynamic lists.

Event delegation should be studied as a separate DOM topic because it builds directly on:

* Event bubbling.
* `event.target`.
* `currentTarget`.
* DOM traversal.

---

# 36. `matches()` with Events

Suppose:

```html
<div id="projects">
    <button class="project-button">Portfolio</button>
    <button class="project-button">E-Commerce</button>
</div>
```

You can use:

```javascript
projects.addEventListener("click", (event) => {
    if (event.target.matches(".project-button")) {
        console.log("Project clicked");
    }
});
```

Here:

```javascript
event.target
```

identifies the actual clicked element.

---

# 37. `closest()` with Events

Suppose the button contains an icon:

```html
<button class="project-button">
    <span>Open</span>
</button>
```

If the user clicks the `<span>`, then:

```javascript
event.target
```

may be the `<span>`.

You can find the nearest button:

```javascript
const button = event.target.closest(".project-button");
```

Example:

```javascript
projects.addEventListener("click", (event) => {
    const button = event.target.closest(".project-button");

    if (!button) {
        return;
    }

    console.log("Project clicked");
});
```

This is a very common event-delegation pattern.

---

# 38. `event.target` Can Be a Non-Element Node

For most mouse interactions, `event.target` is an `EventTarget` and commonly an `Element`, but event systems are broader than just HTML elements.

When using APIs such as:

```javascript
event.target.closest(...)
```

make sure the target supports the method you intend to call.

A defensive approach can be:

```javascript
const target = event.target;

if (!(target instanceof Element)) {
    return;
}

const button = target.closest("button");
```

This is useful when writing reusable event-handling utilities.

---

# 39. Event Listener Options

`addEventListener()` accepts an options object.

Example:

```javascript
element.addEventListener(
    "click",
    handleClick,
    {
        capture: true
    }
);
```

Common options include:

```javascript
{
    capture: true,
    once: true,
    passive: true
}
```

---

# 40. `once`

The `once` option automatically removes the listener after it runs once.

Example:

```javascript
button.addEventListener(
    "click",
    () => {
        console.log("Executed once");
    },
    {
        once: true
    }
);
```

Sequence:

```text
First click
    ↓
Handler runs
    ↓
Listener automatically removed

Second click
    ↓
Handler does not run
```

This is useful for one-time behavior.

---

# 41. `passive`

A passive listener indicates that the listener will not call:

```javascript
event.preventDefault();
```

Example:

```javascript
window.addEventListener(
    "scroll",
    handleScroll,
    {
        passive: true
    }
);
```

Passive listeners are particularly relevant to performance-sensitive input events.

Do not use `passive: true` when your listener needs to cancel the event's default action.

---

# 42. `capture`

The default is:

```javascript
capture: false
```

which means the listener normally participates during bubbling.

To listen during capture:

```javascript
element.addEventListener(
    "click",
    handleClick,
    {
        capture: true
    }
);
```

---

# 43. `DOMContentLoaded`

The `DOMContentLoaded` event occurs after the HTML document has been fully parsed.

Example:

```javascript
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM is ready");
});
```

This is useful when a script may execute before the HTML elements it needs have been parsed.

However, scripts loaded as modules and scripts placed appropriately in the document often reduce the need for manually waiting for this event.

---

# 44. `load`

The `load` event occurs after the relevant resource has finished loading.

For the window:

```javascript
window.addEventListener("load", () => {
    console.log("Page resources loaded");
});
```

This differs from `DOMContentLoaded`.

Conceptually:

```text
DOMContentLoaded
    ↓
HTML parsed

load
    ↓
Page resources have finished loading
```

For example, images can affect when the window's `load` event fires.

---

# 45. `input` Event

The `input` event fires when the value of an input changes as a result of user interaction.

Example:

```javascript
const input = document.querySelector("#name");

input.addEventListener("input", (event) => {
    console.log(event.target.value);
});
```

If the user types:

```text
Osama
```

the handler can observe the changing value.

This is useful for:

* Live search.
* Validation.
* Character counters.
* Filtering.
* Live previews.

---

# 46. `change` Event

The `change` event is different from `input`.

Example:

```javascript
input.addEventListener("change", (event) => {
    console.log(event.target.value);
});
```

For text inputs, `change` generally fires when the value has changed and the input loses focus.

For controls such as:

* Checkbox.
* Radio button.
* Select.

the event behavior differs because the control's value is committed differently.

---

# 47. `input` vs `change`

For a text input:

```text
User types O
    ↓
input

User types s
    ↓
input

User types a
    ↓
input

...

User leaves input
    ↓
change
```

This makes `input` appropriate for real-time updates.

Use `change` when you care about the committed change rather than every input update.

---

# 48. `focus`

The `focus` event occurs when an element receives focus.

Example:

```javascript
input.addEventListener("focus", () => {
    console.log("Input focused");
});
```

Focus can happen through:

* Mouse interaction.
* Keyboard navigation.
* JavaScript.

---

# 49. `blur`

The `blur` event occurs when an element loses focus.

Example:

```javascript
input.addEventListener("blur", () => {
    console.log("Input lost focus");
});
```

`focus` and `blur` are commonly used for:

* Validation.
* UI state.
* Accessibility behavior.
* Form interactions.

---

# 50. Form Submit Events

Forms have a `submit` event.

HTML:

```html
<form id="profile-form">
    <input name="name">
    <button type="submit">Submit</button>
</form>
```

JavaScript:

```javascript
const form = document.querySelector("#profile-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log("Form submitted");
});
```

The event occurs on the form, not merely on the submit button.

This is important when building forms correctly.

---

# 51. Why `preventDefault()` Is Common with Forms

A traditional browser form submission can navigate or reload the page.

JavaScript applications often need to process the form themselves.

Therefore:

```javascript
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Validate and process the data.
});
```

The browser's default navigation is prevented.

The JavaScript code can then handle the submission.

---

# 52. Event Listener Execution Order

If multiple listeners are registered on the same target:

```javascript
button.addEventListener("click", () => {
    console.log("First");
});

button.addEventListener("click", () => {
    console.log("Second");
});
```

They normally execute in registration order:

```text
First
Second
```

This is one reason `stopImmediatePropagation()` can matter in advanced event handling.

---

# 53. One Function for Multiple Events

You can reuse a handler:

```javascript
function logEvent(event) {
    console.log(event.type);
}

button.addEventListener("click", logEvent);
button.addEventListener("dblclick", logEvent);
```

The function receives different event objects depending on which event occurred.

---

# 54. One Element Can Have Multiple Listeners

Example:

```javascript
button.addEventListener("click", handleAnalytics);

button.addEventListener("click", handleUI);

button.addEventListener("click", handleLogging);
```

A single event can trigger multiple listeners.

This can be useful when responsibilities are separated.

However, excessive listeners can make behavior difficult to trace, so event architecture should remain understandable.

---

# 55. Events and Dynamic Elements

Suppose an element is created later:

```javascript
const button = document.createElement("button");

button.textContent = "Profile";
```

You can attach the listener immediately:

```javascript
button.addEventListener("click", () => {
    console.log("Osama Abu Motlaq");
});
```

Then insert it:

```javascript
container.append(button);
```

The listener is attached to the node regardless of whether the node has already been inserted.

---

# 56. Event Listeners Are Associated with Nodes

Consider:

```javascript
const button = document.createElement("button");

button.addEventListener("click", () => {
    console.log("Clicked");
});
```

If the button is moved:

```javascript
anotherContainer.append(button);
```

the listener remains associated with the same node.

Moving the node does not remove its event listeners.

---

# 57. Cloning and Event Listeners

Consider:

```javascript
const copy = button.cloneNode(true);
```

The DOM structure is cloned, but event listeners registered with `addEventListener()` are not copied.

Therefore:

```text
Original button
    ├── DOM structure
    └── Event listener

cloneNode()
    ↓

New button
    └── DOM structure
```

You must attach listeners to the clone separately.

---

# 58. Event Listener Memory and Cleanup

Long-lived applications should remove listeners when they are no longer needed.

For example:

```javascript
function handleResize() {
    console.log(window.innerWidth);
}

window.addEventListener("resize", handleResize);
```

Later:

```javascript
window.removeEventListener("resize", handleResize);
```

This is especially important when creating and destroying UI repeatedly.

Frameworks such as React provide lifecycle mechanisms for handling this cleanup.

---

# 59. Using `AbortController` for Event Listener Cleanup

An event listener can be associated with an `AbortSignal`.

Example:

```javascript
const controller = new AbortController();

button.addEventListener(
    "click",
    handleClick,
    {
        signal: controller.signal
    }
);
```

Later:

```javascript
controller.abort();
```

The listener is removed.

This can be useful when several operations share the same cancellation lifecycle.

For example:

```javascript
const controller = new AbortController();

window.addEventListener("resize", handleResize, {
    signal: controller.signal
});

window.addEventListener("scroll", handleScroll, {
    signal: controller.signal
});
```

Then:

```javascript
controller.abort();
```

removes both listeners associated with that signal.

---

# 60. Event Types Are Strings

This:

```javascript
button.addEventListener("click", handleClick);
```

uses:

```text
"click"
```

as the event type.

Other examples:

```javascript
"input"
"change"
"submit"
"keydown"
"keyup"
"focus"
"blur"
```

The event type determines what kind of event the browser dispatches to the listener.

---

# 61. EventTarget

The event system is based on the `EventTarget` interface.

Objects that implement `EventTarget` can generally support:

```javascript
addEventListener()
removeEventListener()
dispatchEvent()
```

Common examples include:

```text
Element
Document
Window
```

This explains why event handling is not limited to HTML elements.

---

# 62. Custom Events

JavaScript can create custom events.

Example:

```javascript
const event = new CustomEvent("profileUpdated", {
    detail: {
        name: "Osama Abu Motlaq"
    }
});
```

Register a listener:

```javascript
document.addEventListener("profileUpdated", (event) => {
    console.log(event.detail.name);
});
```

Dispatch it:

```javascript
document.dispatchEvent(event);
```

The custom event can carry application-specific information through:

```javascript
event.detail
```

Custom events are useful when different parts of an application need to communicate through an event-based interface.

---

# 63. Creating a Basic `Event`

You can also create a generic event:

```javascript
const event = new Event("profileUpdated");
```

Then:

```javascript
document.dispatchEvent(event);
```

For custom data, `CustomEvent` is generally more appropriate:

```javascript
const event = new CustomEvent("profileUpdated", {
    detail: {
        name: "Osama Abu Motlaq"
    }
});
```

---

# 64. `dispatchEvent()`

`dispatchEvent()` manually dispatches an event.

Example:

```javascript
const event = new Event("profileUpdated");

document.addEventListener("profileUpdated", () => {
    console.log("Profile updated");
});

document.dispatchEvent(event);
```

The listener runs because JavaScript explicitly dispatched the event.

This is different from a real user interaction because the event was generated programmatically.

---

# 65. Events Are Objects

Events are objects containing information about what happened.

For example:

```javascript
button.addEventListener("click", (event) => {
    console.log(event.type);
    console.log(event.target);
    console.log(event.currentTarget);
});
```

Think of the event object as a message from the browser:

```text
What happened?
Where did it happen?
Which element is handling it?
What keyboard/mouse information is available?
Can the default action be prevented?
Does the event bubble?
```

---

# 66. Common Mistakes

## Mistake 1: Calling the Handler Immediately

Incorrect:

```javascript
button.addEventListener("click", handleClick());
```

Correct:

```javascript
button.addEventListener("click", handleClick);
```

---

## Mistake 2: Using Different Functions with `removeEventListener()`

Incorrect:

```javascript
button.addEventListener("click", () => {
    console.log("Clicked");
});

button.removeEventListener("click", () => {
    console.log("Clicked");
});
```

These functions are different objects.

Correct:

```javascript
function handleClick() {
    console.log("Clicked");
}

button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);
```

---

## Mistake 3: Confusing `target` and `currentTarget`

Remember:

```text
target
    = event origin

currentTarget
    = listener's current target
```

---

## Mistake 4: Using `preventDefault()` to Stop Bubbling

This:

```javascript
event.preventDefault();
```

does not stop propagation.

Use:

```javascript
event.stopPropagation();
```

when propagation needs to be stopped.

---

## Mistake 5: Stopping Propagation Without Understanding the Architecture

Using:

```javascript
event.stopPropagation();
```

everywhere can make event delegation and parent-level behavior difficult to maintain.

Use it only when there is a clear reason.

---

## Mistake 6: Using JavaScript for CSS-Only Hover Effects

Avoid unnecessary:

```javascript
mouseenter
mouseleave
```

handlers when CSS can solve the problem:

```css
.card:hover {
    transform: scale(1.02);
}
```

---

## Mistake 7: Attaching Listeners to Every Dynamic Child

For large or frequently changing lists, consider event delegation.

Instead of:

```javascript
items.forEach((item) => {
    item.addEventListener("click", handleClick);
});
```

a parent listener may be more appropriate:

```javascript
container.addEventListener("click", handleClick);
```

---

# 67. Best Practices

### Prefer `addEventListener()`

Use:

```javascript
element.addEventListener("click", handleClick);
```

instead of inline HTML handlers.

Avoid:

```html
<button onclick="handleClick()">
```

for modern application code.

---

### Keep Event Handlers Focused

Prefer:

```javascript
function handleSubmit(event) {
    event.preventDefault();

    validateForm();
    saveForm();
}
```

over one massive event handler containing unrelated logic.

---

### Use Named Handlers When Cleanup Matters

```javascript
function handleResize() {
    console.log(window.innerWidth);
}

window.addEventListener("resize", handleResize);
```

Now you can remove it:

```javascript
window.removeEventListener("resize", handleResize);
```

---

### Use `event.currentTarget` When You Mean the Listener's Element

Prefer:

```javascript
event.currentTarget
```

when you need the element whose listener is executing.

This is clearer than relying on `this`.

---

### Use `preventDefault()` Only for Default Actions

Do not use it as a generic event-stopping mechanism.

---

### Understand Bubbling Before Using `stopPropagation()`

Many browser patterns rely on bubbling.

Stopping propagation unnecessarily can break parent-level behavior.

---

### Use Event Delegation for Appropriate Dynamic Lists

Delegation can reduce the number of listeners and automatically handle dynamically added children.

---

### Use CSS for Purely Visual Interaction

If CSS can handle a hover or focus effect, prefer CSS over JavaScript.

---

# 68. Event Handling Mental Model

A useful mental model is:

```text
                Browser
                   │
                   │
             Something happens
                   │
                   ↓
                 Event
                   │
                   ↓
             Event target
                   │
                   ↓
              Propagation
             ↙           ↘
       Capturing        Bubbling
             ↘           ↙
                 Target
                   │
                   ↓
              Event listener
                   │
                   ↓
             JavaScript logic
                   │
          ┌────────┴────────┐
          ↓                 ↓
 preventDefault()     stopPropagation()
```

Remember:

```text
preventDefault()
    ↓
Stops default browser behavior

stopPropagation()
    ↓
Stops event propagation

stopImmediatePropagation()
    ↓
Stops propagation + later listeners
```

---

# 69. Quick Reference

## Add listener

```javascript
element.addEventListener("click", handleClick);
```

## Remove listener

```javascript
element.removeEventListener("click", handleClick);
```

## Event object

```javascript
element.addEventListener("click", (event) => {
    console.log(event);
});
```

## Event type

```javascript
event.type;
```

## Event origin

```javascript
event.target;
```

## Current listener target

```javascript
event.currentTarget;
```

## Prevent default

```javascript
event.preventDefault();
```

## Stop propagation

```javascript
event.stopPropagation();
```

## Stop all later listeners on the current propagation path

```javascript
event.stopImmediatePropagation();
```

## Capture phase

```javascript
element.addEventListener(
    "click",
    handleClick,
    { capture: true }
);
```

## Run once

```javascript
element.addEventListener(
    "click",
    handleClick,
    { once: true }
);
```

## Passive listener

```javascript
element.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
);
```

## Event delegation

```javascript
container.addEventListener("click", (event) => {
    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    console.log(button);
});
```

## Custom event

```javascript
const event = new CustomEvent("profileUpdated", {
    detail: {
        name: "Osama Abu Motlaq"
    }
});
```

## Dispatch event

```javascript
document.dispatchEvent(event);
```

---

# 70. Important Event Comparisons

| Concept                      | Meaning                                        |
| ---------------------------- | ---------------------------------------------- |
| `event.target`               | Where the event originated                     |
| `event.currentTarget`        | Element whose listener is executing            |
| `preventDefault()`           | Prevents default browser action                |
| `stopPropagation()`          | Stops propagation                              |
| `stopImmediatePropagation()` | Stops propagation and later listeners          |
| Capture                      | Event travels toward target                    |
| Target phase                 | Event reaches target                           |
| Bubbling                     | Event travels away from target                 |
| `once`                       | Listener runs once                             |
| `passive`                    | Listener promises not to cancel default action |
| `addEventListener()`         | Registers a listener                           |
| `removeEventListener()`      | Removes a registered listener                  |

---

# 71. React Relevance

DOM events are **very important for learning React**.

React uses an event system that provides familiar concepts such as:

```jsx
<button onClick={handleClick}>
    Profile
</button>
```

The conceptual model is similar:

```text
User interaction
    ↓
Event
    ↓
Handler
    ↓
Application logic
    ↓
UI update
```

However, React does not normally require you to manually write:

```javascript
document.querySelector(...)
```

and:

```javascript
element.addEventListener(...)
```

for ordinary component interactions.

Instead:

```jsx
function Profile() {
    function handleClick() {
        console.log("Osama Abu Motlaq");
    }

    return (
        <button onClick={handleClick}>
            Profile
        </button>
    );
}
```

React connects the interaction to the component's event handler.

---

# 72. Vanilla JavaScript vs React

Vanilla JavaScript:

```javascript
const button = document.querySelector("#button");

button.addEventListener("click", () => {
    console.log("Osama Abu Motlaq");
});
```

React:

```jsx
function Profile() {
    const handleClick = () => {
        console.log("Osama Abu Motlaq");
    };

    return (
        <button onClick={handleClick}>
            Profile
        </button>
    );
}
```

The syntax is different, but the underlying idea is familiar:

```text
Event
  ↓
Handler
  ↓
Logic
```

---

# 73. React Event Objects

React handlers also receive event information.

Example:

```jsx
function Profile() {
    function handleClick(event) {
        console.log(event.currentTarget);
    }

    return (
        <button onClick={handleClick}>
            Osama Abu Motlaq
        </button>
    );
}
```

Understanding the browser event model makes React event handling much easier to understand.

---

# 74. React State and Events

The most important React connection is:

```text
Event
   ↓
Handler
   ↓
State update
   ↓
React renders UI
```

Example:

```jsx
function Counter() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }

    return (
        <button onClick={handleClick}>
            Count: {count}
        </button>
    );
}
```

In vanilla JavaScript, you might manually modify:

```javascript
element.textContent
```

In React, the state drives the rendered UI.

---

# 75. Final Takeaways

* An event represents something that happened in the browser.
* Browser applications are heavily event-driven.
* `addEventListener()` is the standard way to register event listeners.
* Pass a function reference instead of calling the function immediately.
* `removeEventListener()` requires the same function reference that was registered.
* The event object contains information about the event.
* `event.target` identifies where the event originated.
* `event.currentTarget` identifies the element whose listener is executing.
* `preventDefault()` prevents a browser's default action.
* `stopPropagation()` controls propagation.
* `stopImmediatePropagation()` also prevents later listeners on the current propagation path.
* Events can propagate through capturing and bubbling phases.
* Event delegation uses bubbling to handle events from child elements through a parent.
* `input` is useful for observing live input changes.
* `change` represents a committed value change and behaves differently across form controls.
* `keydown` and `keyup` handle keyboard interactions.
* `focus` and `blur` handle focus changes.
* `submit` handles form submission.
* `once` automatically removes a listener after its first execution.
* `passive` indicates that a listener will not cancel the event's default action.
* Moving a DOM node does not remove its event listeners.
* `cloneNode()` does not copy listeners registered with `addEventListener()`.
* Custom events can be created with `CustomEvent`.
* React builds on the same fundamental event concepts while providing a declarative component-oriented API.

The core mental model is:

```text
EVENT
  ↓
TARGET
  ↓
PROPAGATION
  ↓
LISTENER
  ↓
HANDLER
  ↓
APPLICATION LOGIC
```

For React, remember:

```text
User interaction
      ↓
Event handler
      ↓
State update
      ↓
React re-render
      ↓
Updated UI
```
