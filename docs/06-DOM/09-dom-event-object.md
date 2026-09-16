# DOM Event Object

When an event occurs in the browser, JavaScript receives an object that describes what happened.

This object is commonly called the **event object**.

Example:

```javascript
const button = document.querySelector("#profile-button");

button.addEventListener("click", (event) => {
    console.log(event);
});
```

The `event` parameter contains information about:

* What type of event occurred.
* Which element triggered the event.
* Which element is currently handling the event.
* Whether the event bubbles.
* Whether the default action can be prevented.
* When the event occurred.
* Mouse, pointer, keyboard, or form-specific information.

A useful mental model is:

```text
Browser detects an action
        ↓
Browser creates an Event object
        ↓
Event is dispatched
        ↓
Event listener receives the object
        ↓
JavaScript reads event information
        ↓
Application responds
```

---

# 1. What Is the Event Object?

An event object is an object created by the browser to describe an event.

Example:

```javascript
button.addEventListener("click", (event) => {
    console.log(event);
});
```

The browser provides:

```javascript
event
```

You do not normally create this object yourself for a real user interaction.

For example, when the user clicks:

```text
User clicks button
        ↓
Browser creates click event
        ↓
Browser dispatches event
        ↓
Handler receives event
```

---

# 2. The Event Parameter Name Is Not Special

This:

```javascript
button.addEventListener("click", (event) => {
    console.log(event);
});
```

is equivalent to:

```javascript
button.addEventListener("click", (e) => {
    console.log(e);
});
```

and:

```javascript
button.addEventListener("click", (eventObject) => {
    console.log(eventObject);
});
```

The name is chosen by the developer.

The important part is that the browser passes the event object as the argument.

---

# 3. Event Objects Depend on the Event Type

Not every event has exactly the same information.

For example:

```javascript
button.addEventListener("click", (event) => {
    console.log(event);
});
```

provides mouse/pointer-related information.

A keyboard event:

```javascript
document.addEventListener("keydown", (event) => {
    console.log(event);
});
```

provides keyboard-specific properties such as:

```javascript
event.key
event.code
event.ctrlKey
event.shiftKey
event.altKey
event.metaKey
```

A form event can provide form-specific information.

Therefore:

```text
Event
├── Common Event properties
├── MouseEvent properties
├── KeyboardEvent properties
├── InputEvent properties
└── Other specialized event information
```

---

# 4. `event.type`

The `type` property tells you what kind of event occurred.

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

Keyboard example:

```javascript
document.addEventListener("keydown", (event) => {
    console.log(event.type);
});
```

Output:

```text
keydown
```

This is useful when the same handler works with different event types.

---

# 5. `event.target`

`event.target` identifies the object where the event originated.

Example:

```javascript
button.addEventListener("click", (event) => {
    console.log(event.target);
});
```

If the button itself is clicked:

```text
event.target
    ↓
button
```

This is especially important when events bubble from child elements to parent elements.

---

# 6. `event.currentTarget`

`event.currentTarget` refers to the object whose event listener is currently executing.

Example:

```javascript
button.addEventListener("click", (event) => {
    console.log(event.currentTarget);
});
```

If the listener is attached to the button:

```text
event.currentTarget
        ↓
button
```

---

# 7. `target` vs `currentTarget`

This is one of the most important event concepts.

Consider:

```html
<button id="profile-button">
    <span>Osama Abu Motlaq</span>
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

Therefore:

```text
target
    = Where the event started

currentTarget
    = Element whose listener is currently executing
```

---

# 8. Why `target` and `currentTarget` Differ

Events can propagate through the DOM.

Suppose:

```html
<div id="container">
    <button id="button">
        <span>Open</span>
    </button>
</div>
```

A click on the `<span>` can travel upward:

```text
span
  ↑
button
  ↑
container
```

If the listener is on `container`:

```javascript
container.addEventListener("click", (event) => {
    console.log(event.target);
    console.log(event.currentTarget);
});
```

the values can be:

```text
target
    → span

currentTarget
    → container
```

This is the foundation of event delegation.

---

# 9. `event.bubbles`

The `bubbles` property tells you whether the event is configured to bubble.

Example:

```javascript
button.addEventListener("click", (event) => {
    console.log(event.bubbles);
});
```

For a normal click event:

```text
true
```

A bubbling event can travel from the target toward ancestors.

Conceptually:

```text
button
   ↑
parent
   ↑
body
   ↑
document
```

Not every event bubbles.

---

# 10. `event.cancelable`

The `cancelable` property indicates whether the event's default action can be canceled.

Example:

```javascript
link.addEventListener("click", (event) => {
    console.log(event.cancelable);
});
```

If the event is cancelable, you can potentially use:

```javascript
event.preventDefault();
```

The important distinction is:

```text
bubbles
    ↓
Can the event propagate through ancestors?

cancelable
    ↓
Can its default action be canceled?
```

These are independent concepts.

---

# 11. `event.defaultPrevented`

The `defaultPrevented` property tells you whether `preventDefault()` has already been called for the event.

Example:

```javascript
form.addEventListener("submit", (event) => {
    console.log(event.defaultPrevented);

    event.preventDefault();

    console.log(event.defaultPrevented);
});
```

Conceptually:

```text
Before preventDefault()
    ↓
false

After preventDefault()
    ↓
true
```

This is useful when multiple parts of an application may inspect the same event.

---

# 12. `event.preventDefault()`

`preventDefault()` prevents the browser's default action when the event is cancelable.

Example:

```javascript
const link = document.querySelector("#profile-link");

link.addEventListener("click", (event) => {
    event.preventDefault();

    console.log("Default navigation prevented");
});
```

For a link, the normal action may be navigation.

The JavaScript handler can prevent that action.

Important:

```javascript
event.preventDefault();
```

does **not** stop propagation.

It only controls the default action.

---

# 13. `event.timeStamp`

The `timeStamp` property provides a timestamp associated with the event.

Example:

```javascript
button.addEventListener("click", (event) => {
    console.log(event.timeStamp);
});
```

It can be useful for:

* Measuring event timing.
* Debugging.
* Performance-related logic.

The exact timestamp representation should not be treated as a universal wall-clock date.

For actual current time, use appropriate time APIs such as:

```javascript
Date.now();
```

---

# 14. `event.isTrusted`

`isTrusted` indicates whether the event was generated by the user agent as opposed to being dispatched by script.

Example:

```javascript
button.addEventListener("click", (event) => {
    console.log(event.isTrusted);
});
```

A genuine user interaction will normally produce:

```text
true
```

An event dispatched programmatically can produce:

```text
false
```

Example:

```javascript
const event = new Event("click");

button.dispatchEvent(event);
```

The resulting event is script-generated.

---

# 15. `isTrusted` Is Not an Authentication Mechanism

Do not treat:

```javascript
event.isTrusted
```

as a security boundary.

Client-side JavaScript runs in an environment controlled by the user.

Security-sensitive authorization must be enforced on the server.

Use `isTrusted` only as event metadata, not as a replacement for authentication or authorization.

---

# 16. `event.defaultPrevented` vs `event.bubbles`

These properties answer different questions.

```javascript
event.bubbles
```

asks:

> Can this event bubble?

While:

```javascript
event.defaultPrevented
```

asks:

> Has the default action been prevented?

Example:

```text
bubbles
    = propagation behavior

defaultPrevented
    = default-action state
```

Do not confuse them.

---

# 17. `event.cancelBubble`

`cancelBubble` is a legacy-style property related to stopping bubbling.

Example:

```javascript
event.cancelBubble = true;
```

This effectively requests that bubbling be stopped.

Modern code should generally use:

```javascript
event.stopPropagation();
```

because the intent is clearer.

---

# 18. `event.returnValue`

`returnValue` is another legacy API related to preventing default behavior.

Older code may contain:

```javascript
event.returnValue = false;
```

Modern code should generally use:

```javascript
event.preventDefault();
```

Prefer modern APIs when writing new code.

---

# 19. Event Coordinates

Mouse and pointer events provide coordinate information.

Common properties include:

```javascript
event.clientX
event.clientY
event.pageX
event.pageY
event.screenX
event.screenY
```

These coordinates represent different coordinate systems.

---

# 20. `clientX` and `clientY`

These represent the pointer position relative to the viewport.

Example:

```javascript
document.addEventListener("click", (event) => {
    console.log(event.clientX);
    console.log(event.clientY);
});
```

Conceptually:

```text
Browser viewport
┌──────────────────────┐
│                      │
│       pointer ●      │
│                      │
└──────────────────────┘
        ↑
    clientX/Y
```

Scrolling the page changes the relationship between viewport and document coordinates.

---

# 21. `pageX` and `pageY`

These coordinates are relative to the document.

Example:

```javascript
document.addEventListener("click", (event) => {
    console.log(event.pageX);
    console.log(event.pageY);
});
```

Conceptually:

```text
Entire document
        ↓
pageX / pageY
```

They account for document scrolling differently from viewport-based coordinates.

---

# 22. `screenX` and `screenY`

These represent coordinates relative to the user's screen.

Example:

```javascript
document.addEventListener("click", (event) => {
    console.log(event.screenX);
    console.log(event.screenY);
});
```

Conceptually:

```text
Physical screen
┌──────────────────────────┐
│                          │
│       Browser            │
│          ●               │
│                          │
└──────────────────────────┘
```

These are useful in cases where screen-level coordinates matter.

---

# 23. `offsetX` and `offsetY`

These represent the pointer position relative to the target's padding edge in relevant pointer/mouse event contexts.

Example:

```javascript
canvas.addEventListener("click", (event) => {
    console.log(event.offsetX);
    console.log(event.offsetY);
});
```

They are often useful when working with:

* Canvas.
* Drawing interfaces.
* Element-relative pointer interactions.

---

# 24. Coordinate Comparison

| Property    | Coordinate Reference                   |
| ----------- | -------------------------------------- |
| `clientX/Y` | Viewport                               |
| `pageX/Y`   | Document                               |
| `screenX/Y` | Screen                                 |
| `offsetX/Y` | Event target's local coordinate system |

The important question is:

> Relative to what coordinate system?

---

# 25. Mouse Button Information

Mouse events can provide button information.

Example:

```javascript
document.addEventListener("mousedown", (event) => {
    console.log(event.button);
});
```

Common values include:

```text
0 → Main button
1 → Auxiliary button
2 → Secondary button
```

For a standard mouse, these usually correspond to:

```text
0 → Left
1 → Middle
2 → Right
```

The exact physical mapping can depend on the pointing device.

---

# 26. `buttons`

The `buttons` property represents which pointer buttons are currently pressed.

Example:

```javascript
document.addEventListener("mousemove", (event) => {
    console.log(event.buttons);
});
```

Unlike `button`, which identifies the button associated with a particular mouse event, `buttons` can represent the current pressed-button state.

This distinction becomes more useful for drag interactions.

---

# 27. `ctrlKey`, `shiftKey`, `altKey`, and `metaKey`

Mouse and keyboard events can expose modifier state.

Example:

```javascript
document.addEventListener("click", (event) => {
    if (event.ctrlKey) {
        console.log("Control key was held");
    }
});
```

Available properties:

```javascript
event.ctrlKey
event.shiftKey
event.altKey
event.metaKey
```

These are boolean values.

Example:

```javascript
if (event.shiftKey) {
    console.log("Shift was held");
}
```

---

# 28. Keyboard Event Object

Keyboard events provide specialized information.

Example:

```javascript
document.addEventListener("keydown", (event) => {
    console.log(event);
});
```

Useful properties include:

```javascript
event.key
event.code
event.repeat
event.ctrlKey
event.shiftKey
event.altKey
event.metaKey
```

---

# 29. `event.key`

`key` describes the value represented by the key event.

Example:

```javascript
document.addEventListener("keydown", (event) => {
    console.log(event.key);
});
```

Possible values:

```text
a
A
Enter
Escape
ArrowUp
ArrowDown
Backspace
```

Modifier state and keyboard layout can affect the resulting value.

---

# 30. `event.code`

`code` identifies the physical key position/code.

Example:

```javascript
document.addEventListener("keydown", (event) => {
    console.log(event.code);
});
```

Possible values:

```text
KeyA
Enter
ArrowUp
Space
Digit1
```

Mental model:

```text
event.key
    ↓
Character or logical key value

event.code
    ↓
Physical keyboard key
```

---

# 31. `key` vs `code`

Suppose the user presses the physical key associated with `A`.

Depending on keyboard layout and modifiers:

```javascript
event.key
```

can represent different characters.

But:

```javascript
event.code
```

continues to identify the physical key as:

```text
KeyA
```

Use `key` when you care about the resulting key value.

Use `code` when you care about the physical keyboard key.

---

# 32. `event.repeat`

When a keyboard key is held down, the browser can generate repeated `keydown` events.

You can detect repetition with:

```javascript
document.addEventListener("keydown", (event) => {
    if (event.repeat) {
        console.log("Key is repeating");
    }
});
```

This is useful for:

* Continuous movement.
* Keyboard controls.
* Preventing repeated actions.

---

# 33. Keyboard Shortcuts

Event properties can be combined to detect shortcuts.

Example:

```javascript
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "s") {
        event.preventDefault();

        console.log("Save shortcut");
    }
});
```

The handler checks:

```text
Ctrl is pressed
        +
Key is "s"
        ↓
Shortcut detected
```

The default browser action can then be prevented if appropriate.

---

# 34. Input Events

Input-related events provide information about user input.

Example:

```javascript
const input = document.querySelector("#name");

input.addEventListener("input", (event) => {
    console.log(event.target.value);
});
```

The event target gives access to the input element.

Then:

```javascript
event.target.value
```

provides the current value.

---

# 35. `event.data` for Input Events

Some `InputEvent` instances provide:

```javascript
event.data
```

which can represent the data inserted by an input operation.

Example:

```javascript
input.addEventListener("input", (event) => {
    console.log(event.data);
});
```

Depending on the editing operation, the value may be:

* A string.
* `null` for some operations.

Do not assume every input operation inserts a single character.

---

# 36. `event.inputType`

`InputEvent` can also expose:

```javascript
event.inputType
```

which describes the kind of editing operation.

For example, values can indicate operations such as:

```text
insertText
deleteContentBackward
insertFromPaste
```

This can be useful for advanced editors and input processing.

For ordinary forms, you usually only need:

```javascript
event.target.value
```

---

# 37. Form Event Targets

For a form submission:

```javascript
form.addEventListener("submit", (event) => {
    console.log(event.target);
});
```

The target is normally the form that submitted the event.

You can then access form-related data.

For example:

```javascript
const formData = new FormData(event.target);
```

This is a common pattern for reading submitted form values.

---

# 38. Event Object and Form Submission

Example:

```javascript
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    console.log(formData);
});
```

Here:

```text
event
   ↓
currentTarget
   ↓
form
   ↓
FormData
```

Using `currentTarget` is often useful because it explicitly refers to the form whose listener is running.

---

# 39. Event Propagation Properties

The event object provides information related to propagation.

Important properties/methods include:

```javascript
event.target
event.currentTarget
event.bubbles
event.eventPhase
event.stopPropagation()
event.stopImmediatePropagation()
```

These help you understand how an event moves through the DOM.

---

# 40. `event.eventPhase`

`eventPhase` indicates the current phase of event propagation.

The standard phases are represented by numeric constants:

```text
0 → NONE
1 → CAPTURING_PHASE
2 → AT_TARGET
3 → BUBBLING_PHASE
```

Example:

```javascript
element.addEventListener("click", (event) => {
    console.log(event.eventPhase);
});
```

For ordinary application code, you usually do not need to inspect this property.

It is primarily useful when debugging or studying the event propagation model.

---

# 41. Event Propagation Mental Model

Suppose:

```html
<div id="parent">
    <button id="button">
        Click
    </button>
</div>
```

A click can conceptually travel:

```text
CAPTURE
document
    ↓
html
    ↓
body
    ↓
parent
    ↓
button
    ↓
TARGET
button
    ↓
BUBBLE
parent
    ↓
body
    ↓
html
    ↓
document
```

During this process:

```javascript
event.target
```

continues to represent the original target.

While:

```javascript
event.currentTarget
```

can change depending on which listener is currently running.

---

# 42. `stopPropagation()`

Use:

```javascript
event.stopPropagation();
```

when you need to stop the event from continuing through the propagation path.

Example:

```javascript
button.addEventListener("click", (event) => {
    event.stopPropagation();

    console.log("Button");
});
```

This does not undo the event.

It controls propagation.

---

# 43. `stopImmediatePropagation()`

Use:

```javascript
event.stopImmediatePropagation();
```

when you need to prevent:

* Further propagation.
* Other listeners from running on the same target.

This is stronger than:

```javascript
event.stopPropagation();
```

Use it carefully.

---

# 44. Event Object Is Read by the Handler

A useful pattern is:

```javascript
element.addEventListener("click", (event) => {
    const target = event.target;

    console.log(target);
});
```

The handler can extract only what it needs:

```javascript
element.addEventListener("click", (event) => {
    const {
        target,
        currentTarget,
        type
    } = event;

    console.log(type);
    console.log(target);
    console.log(currentTarget);
});
```

This uses JavaScript destructuring.

---

# 45. Event Object and Destructuring

You can destructure event properties:

```javascript
button.addEventListener("click", ({ target, type }) => {
    console.log(type);
    console.log(target);
});
```

This is valid because the browser passes an object.

However, when learning events, the explicit form can be easier to understand:

```javascript
button.addEventListener("click", (event) => {
    console.log(event.target);
    console.log(event.type);
});
```

---

# 46. Event Object and `this`

With a regular function listener:

```javascript
button.addEventListener("click", function (event) {
    console.log(this);
    console.log(event.currentTarget);
});
```

`this` normally refers to the element whose listener is executing.

However, prefer:

```javascript
event.currentTarget
```

when you want explicit event-related semantics.

Arrow functions have lexical `this`:

```javascript
button.addEventListener("click", (event) => {
    console.log(this);
});
```

Therefore, `event.currentTarget` is more predictable and explicit.

---

# 47. Custom Event Objects

JavaScript can create events programmatically.

Example:

```javascript
const event = new Event("profileUpdated");
```

Then:

```javascript
document.dispatchEvent(event);
```

A custom event can carry additional data using `CustomEvent`.

```javascript
const event = new CustomEvent("profileUpdated", {
    detail: {
        name: "Osama Abu Motlaq"
    }
});
```

The listener can access:

```javascript
document.addEventListener("profileUpdated", (event) => {
    console.log(event.detail.name);
});
```

---

# 48. `event.detail`

`detail` is commonly used with `CustomEvent`.

Example:

```javascript
const event = new CustomEvent("profileUpdated", {
    detail: {
        name: "Osama Abu Motlaq",
        role: "Frontend Developer"
    }
});
```

Listener:

```javascript
document.addEventListener("profileUpdated", (event) => {
    console.log(event.detail.name);
    console.log(event.detail.role);
});
```

This allows custom application-specific information to travel with the event.

---

# 49. Event Object Is Not the DOM Element

A common mistake is confusing:

```javascript
event
```

with:

```javascript
event.target
```

They are not the same.

```text
event
    ↓
Event object

event.target
    ↓
Object where event originated
```

For example:

```javascript
button.addEventListener("click", (event) => {
    console.log(event);
    console.log(event.target);
});
```

The first value represents the event.

The second represents the target.

---

# 50. Event Object Is Not `currentTarget`

Similarly:

```javascript
event.currentTarget
```

is an element/object involved in event handling.

The event itself is:

```javascript
event
```

Think:

```text
event
├── type
├── target
├── currentTarget
├── bubbles
├── cancelable
├── defaultPrevented
└── other event-specific properties
```

---

# 51. Common Mistakes

## Mistake 1: Assuming `target` Is Always the Listener Element

Consider:

```html
<button>
    <span>Osama Abu Motlaq</span>
</button>
```

If the listener is on the button and the span is clicked:

```javascript
event.target
```

may be the span.

Use:

```javascript
event.currentTarget
```

when you need the button.

---

## Mistake 2: Thinking `preventDefault()` Stops Bubbling

It does not.

```javascript
event.preventDefault();
```

controls the default action.

For propagation:

```javascript
event.stopPropagation();
```

---

## Mistake 3: Assuming Every Event Bubbles

Not every event has:

```javascript
event.bubbles === true
```

Always consider the specific event type.

---

## Mistake 4: Treating `event.key` and `event.code` as Identical

They represent different concepts.

```text
key
    → logical key value

code
    → physical key
```

---

## Mistake 5: Treating `event.target` as Always an Element

`EventTarget` is broader than `Element`.

If you need element-specific methods such as:

```javascript
closest()
matches()
```

verify that the target is an `Element`.

Example:

```javascript
const target = event.target;

if (!(target instanceof Element)) {
    return;
}

const button = target.closest("button");
```

---

## Mistake 6: Using Legacy Event Properties in New Code

Prefer:

```javascript
event.preventDefault();
event.stopPropagation();
```

over legacy alternatives such as:

```javascript
event.returnValue = false;
event.cancelBubble = true;
```

---

## Mistake 7: Assuming `isTrusted` Provides Security

It does not replace server-side authorization or authentication.

---

# 52. Best Practices

### Use the Event Object Intentionally

Do not inspect dozens of properties unnecessarily.

Use only what the handler needs.

```javascript
button.addEventListener("click", (event) => {
    console.log(event.currentTarget);
});
```

---

### Prefer `currentTarget` When You Mean the Listener Element

```javascript
event.currentTarget
```

is clearer than assuming:

```javascript
event.target
```

is the same element.

---

### Use Event-Specific Properties

For keyboard events:

```javascript
event.key
event.code
```

For mouse/pointer interactions:

```javascript
event.clientX
event.clientY
```

For forms:

```javascript
event.target
event.currentTarget
```

The correct property depends on the event type.

---

### Prefer Modern APIs

Use:

```javascript
event.preventDefault();
event.stopPropagation();
```

rather than legacy alternatives.

---

### Do Not Overuse Propagation Control

Use:

```javascript
stopPropagation()
```

only when there is a clear reason.

Event bubbling is a useful browser feature and is the foundation of event delegation.

---

### Validate Assumptions About `target`

When writing reusable event utilities, remember that:

```javascript
event.target
```

is an `EventTarget`, not necessarily an `Element`.

---

# 53. Quick Reference

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

## Does it bubble?

```javascript
event.bubbles;
```

## Can default action be canceled?

```javascript
event.cancelable;
```

## Was default action prevented?

```javascript
event.defaultPrevented;
```

## Prevent default action

```javascript
event.preventDefault();
```

## Stop propagation

```javascript
event.stopPropagation();
```

## Stop other listeners too

```javascript
event.stopImmediatePropagation();
```

## Timestamp

```javascript
event.timeStamp;
```

## User-agent-generated event

```javascript
event.isTrusted;
```

## Keyboard key

```javascript
event.key;
```

## Physical keyboard key

```javascript
event.code;
```

## Key repetition

```javascript
event.repeat;
```

## Keyboard modifiers

```javascript
event.ctrlKey;
event.shiftKey;
event.altKey;
event.metaKey;
```

## Mouse coordinates

```javascript
event.clientX;
event.clientY;

event.pageX;
event.pageY;

event.screenX;
event.screenY;

event.offsetX;
event.offsetY;
```

## Mouse button

```javascript
event.button;
```

## Currently pressed buttons

```javascript
event.buttons;
```

## Custom event data

```javascript
event.detail;
```

## Propagation phase

```javascript
event.eventPhase;
```

---

# 54. Event Object Comparison

| Property                 | Purpose                                      |
| ------------------------ | -------------------------------------------- |
| `event.type`             | Identifies the event type                    |
| `event.target`           | Original event target                        |
| `event.currentTarget`    | Element whose listener is executing          |
| `event.bubbles`          | Whether the event bubbles                    |
| `event.cancelable`       | Whether default action can be canceled       |
| `event.defaultPrevented` | Whether default action has been prevented    |
| `event.timeStamp`        | Event timestamp                              |
| `event.isTrusted`        | Indicates browser/user-agent generated event |
| `event.key`              | Logical keyboard key value                   |
| `event.code`             | Physical keyboard key                        |
| `event.repeat`           | Whether keyboard event is repeating          |
| `event.clientX/Y`        | Viewport coordinates                         |
| `event.pageX/Y`          | Document coordinates                         |
| `event.screenX/Y`        | Screen coordinates                           |
| `event.offsetX/Y`        | Target-relative coordinates                  |
| `event.button`           | Mouse button associated with the event       |
| `event.buttons`          | Currently pressed mouse/pointer buttons      |
| `event.detail`           | Custom event data                            |
| `event.eventPhase`       | Current propagation phase                    |

---

# 55. Complete Example

HTML:

```html
<div id="projects">
    <button class="project-button">
        <span>Portfolio</span>
    </button>
</div>
```

JavaScript:

```javascript
const projects = document.querySelector("#projects");

projects.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Element)) {
        return;
    }

    const button = target.closest(".project-button");

    if (!button) {
        return;
    }

    console.log("Event type:", event.type);
    console.log("Target:", event.target);
    console.log("Current target:", event.currentTarget);
    console.log("Bubbles:", event.bubbles);
    console.log("Cancelable:", event.cancelable);
});
```

If the user clicks the `<span>`:

```text
event.type
    → "click"

event.target
    → <span>

event.currentTarget
    → #projects

button
    → nearest .project-button
```

This example combines several important event-object concepts:

```text
event
 ↓
target
 ↓
closest()
 ↓
desired interactive element
```

---

# 56. React Relevance

The event object is **very important for React**.

React event handlers receive an event object:

```jsx
function Profile() {
    function handleClick(event) {
        console.log(event);
    }

    return (
        <button onClick={handleClick}>
            Osama Abu Motlaq
        </button>
    );
}
```

You can access familiar concepts such as:

```javascript
event.target
event.currentTarget
event.preventDefault()
```

The exact event system implementation differs between React and raw DOM APIs, but the underlying concepts are closely related.

---

# 57. React: `target` vs `currentTarget`

Consider:

```jsx
function Profile() {
    function handleClick(event) {
        console.log(event.target);
        console.log(event.currentTarget);
    }

    return (
        <button onClick={handleClick}>
            <span>Osama Abu Motlaq</span>
        </button>
    );
}
```

If the `<span>` is clicked:

```text
event.target
    ↓
<span>

event.currentTarget
    ↓
<button>
```

Understanding this distinction is useful when handling nested React elements.

---

# 58. React and `preventDefault()`

React handlers can also prevent default browser behavior.

Example:

```jsx
function ProfileLink() {
    function handleClick(event) {
        event.preventDefault();

        console.log("Navigation prevented");
    }

    return (
        <a href="/profile" onClick={handleClick}>
            Osama Abu Motlaq
        </a>
    );
}
```

The concept is the same:

```text
User action
    ↓
Event
    ↓
Handler
    ↓
preventDefault()
    ↓
Default browser action prevented
```

---

# 59. React and State Updates

The most important React connection is that events often lead to state updates.

```jsx
function Counter() {
    const [count, setCount] = useState(0);

    function handleClick(event) {
        console.log(event.type);

        setCount((currentCount) => currentCount + 1);
    }

    return (
        <button onClick={handleClick}>
            Count: {count}
        </button>
    );
}
```

The overall flow becomes:

```text
User interaction
      ↓
Event object
      ↓
Event handler
      ↓
State update
      ↓
React render
      ↓
Updated UI
```

This is one of the most important connections between the DOM event model and React.

---

# 60. Final Mental Model

Think of the event object as a **message describing an interaction**.

```text
                    EVENT OBJECT
                         │
       ┌─────────────────┼─────────────────┐
       ↓                 ↓                 ↓
    Identity          Location          Behavior
       │                 │                 │
    type             target            bubbles
                     currentTarget      cancelable
                                        defaultPrevented
       │
       ├── Keyboard information
       │       key
       │       code
       │       repeat
       │
       ├── Pointer information
       │       clientX/Y
       │       pageX/Y
       │       button
       │
       └── Custom information
               detail
```

The most important distinction to remember is:

```text
event
    ↓
The event itself

event.target
    ↓
Where the event originated

event.currentTarget
    ↓
Which element's listener is currently executing
```

And:

```text
preventDefault()
    ↓
Controls the browser's default action

stopPropagation()
    ↓
Controls event propagation

stopImmediatePropagation()
    ↓
Stops propagation and later listeners
```

---

# 61. Final Takeaways

* The browser provides an event object to event handlers.
* The event object describes what happened.
* `event.type` identifies the event.
* `event.target` identifies where the event originated.
* `event.currentTarget` identifies the element whose listener is executing.
* `target` and `currentTarget` can be different.
* `event.bubbles` describes whether the event bubbles.
* `event.cancelable` describes whether the default action can be canceled.
* `event.defaultPrevented` indicates whether the default action has been prevented.
* `event.preventDefault()` prevents a cancelable default action.
* `event.stopPropagation()` controls propagation.
* `event.stopImmediatePropagation()` also prevents later listeners on the current propagation path.
* `event.key` describes a logical keyboard key value.
* `event.code` identifies the physical keyboard key.
* Mouse and pointer events provide coordinate and button information.
* `event.detail` is commonly used for data carried by `CustomEvent`.
* `event.isTrusted` distinguishes user-agent-generated events from script-dispatched events, but it is not a security mechanism.
* Event properties depend on the specific event type.
* Understanding the event object is essential for event delegation.
* Understanding `target` and `currentTarget` is essential for working with nested interactive elements.
* The same fundamental concepts are highly relevant when learning React event handling.

The core mental model is:

```text
EVENT
  ↓
What happened?
  ↓
Where did it happen?
  ↓
Who is handling it?
  ↓
What information does the event provide?
  ↓
What should the application do?
```
