# Window Methods

## Introduction

The `window` object provides many methods that allow JavaScript to interact with the browser environment.

Examples include:

```javascript
window.open();
window.close();
window.focus();
window.blur();

window.scrollTo();
window.scrollBy();

window.setTimeout();
window.setInterval();

window.requestAnimationFrame();
window.cancelAnimationFrame();

window.alert();
window.confirm();
window.prompt();

window.matchMedia();
```

These methods can perform actions such as:

* Opening and closing browsing contexts.
* Scrolling the page.
* Scheduling code.
* Controlling animation timing.
* Displaying native browser dialogs.
* Evaluating media queries.
* Interacting with browser-level behavior.

An important principle is:

> **Knowing that a browser method exists does not mean the browser will always allow your code to perform the requested action.**

Browsers intentionally restrict certain operations for:

* Security.
* Privacy.
* User control.
* Anti-abuse protection.
* Performance.

---

# 1. What Is a Window Method?

A method is a function associated with an object.

For example:

```javascript
window.alert("Hello");
```

Here:

```text
window
  ↓
alert
  ↓
function call
```

Because `window` is the browser's global object, many methods can be called without explicitly writing `window.`.

For example:

```javascript
alert("Hello");
```

is the common form of:

```javascript
window.alert("Hello");
```

Likewise:

```javascript
setTimeout(...);
```

corresponds to the browser's global timer API.

---

# 2. Major Categories of Window Methods

The most useful methods can be grouped into several categories.

```text
Window Methods
│
├── Browsing contexts
│   ├── open()
│   ├── close()
│   ├── focus()
│   └── blur()
│
├── Scrolling
│   ├── scrollTo()
│   ├── scrollBy()
│   └── scroll()
│
├── Scheduling
│   ├── setTimeout()
│   ├── setInterval()
│   ├── clearTimeout()
│   ├── clearInterval()
│   ├── requestAnimationFrame()
│   └── cancelAnimationFrame()
│
├── Native dialogs
│   ├── alert()
│   ├── confirm()
│   └── prompt()
│
├── Environment queries
│   └── matchMedia()
│
└── Other browser APIs
    └── methods exposed through related browser objects
```

Not every browser API technically belongs exclusively to the historical BOM category, but these methods are useful to understand together.

---

# 3. `window.open()`

The `open()` method requests the creation of a new browsing context.

Basic example:

```javascript
const popup = window.open(
  "https://example.com"
);
```

The browser may open:

* A new tab.
* A new window.
* Another browsing context.

The exact result is controlled by the browser and user settings.

---

# 4. Return Value of `window.open()`

`window.open()` returns a reference to the newly opened window when the browser allows it.

For example:

```javascript
const popup = window.open(
  "https://example.com"
);

if (popup) {
  console.log("Window opened.");
}
```

If the browser blocks the popup, the return value may be:

```text
null
```

Therefore, robust code should not assume that the popup was created.

---

# 5. Popup Blocking

Browsers commonly restrict popups that are not triggered by direct user interaction.

For example:

```javascript
button.addEventListener("click", () => {
  window.open("https://example.com");
});
```

is much more likely to be allowed than:

```javascript
setTimeout(() => {
  window.open("https://example.com");
}, 5000);
```

The browser may determine that the second case is unsolicited.

This protects users from:

* Popup spam.
* Malicious redirects.
* Unexpected windows.
* Abusive advertising.

---

# 6. User Activation

Modern browsers often associate powerful actions with **transient user activation**.

A direct interaction such as:

```text
click
tap
keyboard activation
```

can provide temporary permission for certain browser actions.

For example:

```javascript
button.addEventListener("click", () => {
  const popup = window.open(
    "https://example.com"
  );
});
```

The important concept is:

```text
User action
   ↓
Browser considers action user-initiated
   ↓
Powerful operation may be allowed
```

This principle also appears in other browser APIs.

---

# 7. `window.open()` With a Target

You can provide a target name:

```javascript
window.open(
  "https://example.com",
  "_blank"
);
```

Common targets include:

```text
_blank
_self
_parent
_top
```

These have navigation meanings similar to link targets.

---

# 8. `_blank`

Example:

```javascript
window.open(
  "https://example.com",
  "_blank"
);
```

This requests a new browsing context.

A safer external-link pattern is often:

```html
<a
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
>
  Open Example
</a>
```

Using an ordinary `<a>` element is often preferable to `window.open()` for normal navigation.

---

# 9. `window.open()` Is Not a Replacement for Links

Bad approach for simple navigation:

```javascript
button.addEventListener("click", () => {
  window.open("/projects");
});
```

If the UI is fundamentally a link, prefer:

```html
<a href="/projects">
  Projects
</a>
```

Why?

Native links provide:

* Keyboard behavior.
* Context-menu support.
* Copy-link functionality.
* Browser navigation behavior.
* Accessibility semantics.
* Better progressive enhancement.

Use `window.open()` when you genuinely need programmatic window creation.

---

# 10. Window Features

Historically, `window.open()` accepted a third parameter containing window features.

Example:

```javascript
window.open(
  "https://example.com",
  "_blank",
  "width=600,height=400"
);
```

Modern browsers do not guarantee traditional desktop-window behavior.

Browsers control much of the final presentation.

Do not build critical UX around assumptions such as:

```text
exact popup size
exact popup position
browser chrome visibility
```

---

# 11. `window.close()`

The `close()` method requests closing the current browsing context.

Example:

```javascript
window.close();
```

However, browsers restrict scripts from arbitrarily closing tabs or windows.

A page that the script did not open is commonly not allowed to close itself programmatically.

This protects users from malicious sites manipulating browser tabs.

---

# 12. Why `window.close()` May Do Nothing

Consider:

```javascript
window.close();
```

The browser may ignore it.

This is not necessarily a bug in your JavaScript.

It may be a browser security restriction.

A useful mental model is:

```text
JavaScript requests action
        ↓
Browser security policy
        ↓
Allowed or blocked
```

---

# 13. Closing a Script-Created Window

If your application opened another window:

```javascript
const popup = window.open(
  "/popup.html",
  "_blank"
);
```

the popup may later be able to call:

```javascript
window.close();
```

subject to browser restrictions.

This is one reason `window.close()` is mainly relevant to popup workflows rather than ordinary pages.

---

# 14. `window.focus()`

The `focus()` method requests that the browser focus the window.

Example:

```javascript
window.focus();
```

Or for another window:

```javascript
const popup = window.open(
  "/popup.html"
);

popup?.focus();
```

Modern browsers can restrict programmatic focus changes.

A webpage should not be able to aggressively steal the user's focus.

---

# 15. `window.blur()`

The `blur()` method requests that the window lose focus.

Example:

```javascript
window.blur();
```

Its behavior is heavily browser- and user-dependent.

Applications should generally not rely on programmatically removing focus from the user's current browsing context.

---

# 16. Focus Methods and User Experience

Focus is important because it affects:

* Keyboard input.
* Screen-reader workflows.
* User attention.
* Accessibility.

Avoid patterns such as:

```javascript
setInterval(() => {
  window.focus();
}, 100);
```

This is hostile to users and can create extremely poor browser behavior.

Browser restrictions exist partly to prevent this kind of abuse.

---

# 17. `window.scrollTo()`

The `scrollTo()` method moves the viewport to a specific document position.

Example:

```javascript
window.scrollTo(0, 0);
```

This moves the page toward the top.

You can use the object form:

```javascript
window.scrollTo({
  top: 0,
  left: 0
});
```

The object form is generally clearer for modern code.

---

# 18. Smooth Scrolling With `scrollTo()`

You can request smooth scrolling:

```javascript
window.scrollTo({
  top: 0,
  behavior: "smooth"
});
```

This allows the browser to animate the scroll instead of jumping immediately.

The exact user experience may also be affected by user preferences such as reduced motion.

A well-designed application should respect accessibility preferences where appropriate.

---

# 19. Scrolling to a Specific Position

For example:

```javascript
window.scrollTo({
  top: 800,
  left: 0,
  behavior: "smooth"
});
```

The page will move toward:

```text
vertical position → 800 CSS pixels
```

This is useful for:

* Scroll restoration.
* Custom navigation.
* Guided interfaces.
* Specialized transitions.

---

# 20. `window.scrollBy()`

`scrollBy()` moves relative to the current position.

For example:

```javascript
window.scrollBy(0, 300);
```

means approximately:

```text
current position
      +
300 CSS pixels vertically
```

The object form:

```javascript
window.scrollBy({
  top: 300,
  left: 0,
  behavior: "smooth"
});
```

is easier to read.

---

# 21. `scrollTo()` vs `scrollBy()`

The distinction is simple:

### `scrollTo()`

Move **to** a position.

```javascript
window.scrollTo({
  top: 1000
});
```

### `scrollBy()`

Move **by** an amount.

```javascript
window.scrollBy({
  top: 300
});
```

Mental model:

```text
scrollTo
→ absolute position

scrollBy
→ relative movement
```

---

# 22. `window.scroll()`

`scroll()` is another way to specify scrolling.

For example:

```javascript
window.scroll({
  top: 0,
  behavior: "smooth"
});
```

For most code, think of:

```text
scroll()
scrollTo()
```

as related APIs for specifying a target scroll position.

The important distinction from:

```javascript
scrollBy()
```

is that `scrollBy()` expresses relative movement.

---

# 23. Scrolling and CSS

JavaScript should not automatically be the first choice for scroll behavior.

CSS can control some scrolling behavior:

```css
html {
  scroll-behavior: smooth;
}
```

Then a normal anchor:

```html
<a href="#projects">
  Projects
</a>
```

can provide smooth scrolling without JavaScript.

A strong frontend principle is:

> Use CSS or native browser behavior when they already solve the problem.

---

# 24. Scrolling to an Element

You often do not need `window.scrollTo()`.

The DOM provides:

```javascript
const section = document.querySelector("#projects");

section?.scrollIntoView({
  behavior: "smooth"
});
```

This expresses the intent more directly:

> Scroll until this element is visible.

Use `scrollTo()` when you need coordinate-based control.

Use `scrollIntoView()` when you are targeting a specific element.

---

# 25. `setTimeout()`

`setTimeout()` schedules a callback to run after a delay.

Example:

```javascript
setTimeout(() => {
  console.log("Done");
}, 1000);
```

The delay is specified in milliseconds.

```text
1000 ms = 1 second
```

---

# 26. `setTimeout()` Does Not Mean "Exactly After"

This is a very important concept.

Consider:

```javascript
setTimeout(() => {
  console.log("Done");
}, 1000);
```

This means approximately:

> Do not execute this callback before the requested delay has elapsed; execute it when the event loop gets an opportunity to run it.

It does **not** guarantee:

```text
exactly 1000 ms
```

The callback can run later if the main thread is busy.

---

# 27. Event Loop and Timers

Consider:

```javascript
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");
```

The output is:

```text
A
C
B
```

Why?

Because `setTimeout()` schedules the callback for a later event-loop turn.

The callback does not interrupt currently executing JavaScript.

Mental model:

```text
Current JavaScript
      ↓
Finishes execution
      ↓
Event loop
      ↓
Timer callback becomes eligible
      ↓
Callback executes
```

---

# 28. `setTimeout(fn, 0)`

This:

```javascript
setTimeout(fn, 0);
```

does not mean:

> Run `fn` immediately.

It means roughly:

> Schedule `fn` for a future opportunity once the required delay and event-loop conditions permit it.

This is useful for yielding execution back to the browser.

---

# 29. Timer IDs

`setTimeout()` returns an identifier:

```javascript
const timeoutId = setTimeout(() => {
  console.log("Done");
}, 3000);
```

You can cancel it:

```javascript
clearTimeout(timeoutId);
```

This is essential for cleanup.

---

# 30. `clearTimeout()`

Example:

```javascript
const timeoutId = setTimeout(() => {
  console.log("This may never execute.");
}, 5000);

clearTimeout(timeoutId);
```

Once cancelled, the timeout callback will not execute if it has not already begun running.

Use this when:

* A component is removed.
* A newer operation replaces an older one.
* A delayed action is no longer needed.
* A user cancels an operation.

---

# 31. `setInterval()`

`setInterval()` schedules repeated execution.

Example:

```javascript
const intervalId = setInterval(() => {
  console.log("Tick");
}, 1000);
```

The callback is repeatedly scheduled.

---

# 32. `clearInterval()`

Stop an interval with:

```javascript
clearInterval(intervalId);
```

For example:

```javascript
const intervalId = setInterval(() => {
  console.log("Tick");
}, 1000);

setTimeout(() => {
  clearInterval(intervalId);
}, 5000);
```

This creates a repeated task that is eventually stopped.

---

# 33. `setInterval()` Is Not a Precision Clock

Do not assume:

```javascript
setInterval(update, 1000);
```

means:

```text
exactly every 1000 milliseconds forever
```

Execution can be delayed by:

* Main-thread work.
* Browser scheduling.
* Background throttling.
* Rendering.
* Other tasks.

For precise elapsed-time measurement, use timestamps such as:

```javascript
performance.now();
```

rather than counting interval callbacks.

---

# 34. Recursive `setTimeout()` vs `setInterval()`

Consider:

```javascript
setInterval(async () => {
  await fetchData();
}, 1000);
```

The asynchronous operation may take longer than the interval period, creating overlapping work.

A recursive timeout can be safer:

```javascript
async function poll() {
  await fetchData();

  setTimeout(poll, 1000);
}

poll();
```

Now the next delay begins after the current operation completes.

This pattern is often easier to control for asynchronous polling.

---

# 35. Timer Cleanup

Timers should have an explicit lifecycle.

Example:

```javascript
let timeoutId;

function start() {
  timeoutId = setTimeout(() => {
    console.log("Done");
  }, 1000);
}

function stop() {
  clearTimeout(timeoutId);
}
```

For larger applications, associate the timer lifecycle with the component or feature that owns it.

---

# 36. Timers and React

A React component that creates a timer should clean it up.

Example:

```jsx
import { useEffect } from "react";

function Example() {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log("Done");
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return <p>Example</p>;
}
```

The lifecycle is:

```text
Mount
 ↓
Create timer
 ↓
Use timer
 ↓
Unmount / re-run
 ↓
Cleanup
```

This prevents stale work.

---

# 37. `requestAnimationFrame()`

For browser animation and visual updates, use:

```javascript
requestAnimationFrame();
```

Example:

```javascript
requestAnimationFrame(() => {
  console.log("Ready for a visual update.");
});
```

It schedules a callback around the browser's next rendering opportunity.

This is generally more appropriate for visual animation than repeatedly using `setTimeout()`.

---

# 38. Basic Animation Loop

Example:

```javascript
function animate() {
  // Update visual state.

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

This creates a continuous animation loop.

However, it must be stopped when the animation is no longer needed.

---

# 39. `requestAnimationFrame()` Return Value

It returns an identifier:

```javascript
const frameId = requestAnimationFrame(() => {
  console.log("Frame");
});
```

Cancel it:

```javascript
cancelAnimationFrame(frameId);
```

This is the animation equivalent of timer cleanup.

---

# 40. Why `requestAnimationFrame()` Is Better for Visual Updates

A timer:

```javascript
setTimeout(update, 16);
```

does not know exactly when the browser will paint.

`requestAnimationFrame()` is designed around rendering.

Conceptually:

```text
JavaScript state update
        ↓
requestAnimationFrame
        ↓
Browser rendering opportunity
        ↓
Visual update
```

This allows the browser to coordinate animation more effectively.

---

# 41. Avoid Animating Layout With Expensive JavaScript

Instead of constantly changing:

```javascript
element.style.left = `${x}px`;
```

consider CSS transformations:

```javascript
element.style.transform = `translateX(${x}px)`;
```

when appropriate.

Even better, use CSS animations or transitions when JavaScript does not need to control every frame.

---

# 42. `cancelAnimationFrame()`

Example:

```javascript
let frameId;

function start() {
  frameId = requestAnimationFrame(render);
}

function stop() {
  cancelAnimationFrame(frameId);
}
```

Always consider how an animation ends.

An infinite animation loop without cleanup can waste CPU and battery.

---

# 43. `alert()`

The browser provides:

```javascript
window.alert("Hello");
```

or:

```javascript
alert("Hello");
```

It displays a native browser dialog.

The JavaScript execution is blocked until the user dismisses it.

---

# 44. Why `alert()` Is Usually Not Ideal for Applications

Although useful for simple demonstrations, `alert()` has limitations:

* Blocking behavior.
* Limited styling.
* Limited control.
* Poor integration with application design.
* Can disrupt user workflow.
* Not suitable for complex information.

For modern interfaces, a custom accessible UI is often better.

---

# 45. `confirm()`

`confirm()` returns a boolean.

Example:

```javascript
const shouldDelete = confirm(
  "Delete this project?"
);

if (shouldDelete) {
  deleteProject();
}
```

Possible values:

```text
true
false
```

It is useful for simple confirmation logic.

---

# 46. `confirm()` Is Synchronous

When you call:

```javascript
const confirmed = confirm(
  "Delete this project?"
);
```

the code waits for the user response.

Then execution continues.

This is very different from modern application dialogs, which are typically asynchronous interactions managed through application state.

---

# 47. `prompt()`

`prompt()` asks the user for text.

Example:

```javascript
const name = prompt(
  "Enter your name:"
);
```

The result can be:

```text
String
```

or:

```text
null
```

when cancelled.

---

# 48. `prompt()` and Validation

If you use `prompt()`:

```javascript
const name = prompt(
  "Enter your name:"
);

if (name === null) {
  return;
}

if (name.trim() === "") {
  return;
}
```

Remember that `prompt()` returns user-controlled input.

Treat that value as untrusted data.

---

# 49. `alert()`, `confirm()`, and `prompt()` Are Browser Primitives

A useful classification is:

```text
alert()
→ display information

confirm()
→ ask for yes/no decision

prompt()
→ ask for text
```

They are useful for:

* Learning.
* Small demos.
* Simple prototypes.
* Very basic interactions.

For professional application UI, custom accessible dialogs generally provide more control.

---

# 50. `window.matchMedia()`

`matchMedia()` evaluates a CSS media query in JavaScript.

Example:

```javascript
const mediaQuery = window.matchMedia(
  "(max-width: 768px)"
);

console.log(mediaQuery.matches);
```

Possible values:

```text
true
false
```

---

# 51. Media Query Changes

You can react when the result changes:

```javascript
const mediaQuery = window.matchMedia(
  "(max-width: 768px)"
);

function handleChange(event) {
  console.log(event.matches);
}

mediaQuery.addEventListener(
  "change",
  handleChange
);
```

Clean up when necessary:

```javascript
mediaQuery.removeEventListener(
  "change",
  handleChange
);
```

---

# 52. Why `matchMedia()` Is Better Than Polling Width

Avoid:

```javascript
setInterval(() => {
  if (window.innerWidth < 768) {
    // ...
  }
}, 100);
```

This repeatedly checks something that the browser can notify you about directly.

Prefer:

```javascript
const query = window.matchMedia(
  "(max-width: 768px)"
);

query.addEventListener(
  "change",
  handleChange
);
```

This is more event-driven and expresses the actual requirement.

---

# 53. Use CSS When Behavior Is Purely Visual

If your requirement is:

```text
Desktop → sidebar visible
Mobile → sidebar hidden
```

do not automatically use JavaScript.

Use CSS:

```css
@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
```

Use `matchMedia()` when application logic genuinely depends on the media condition.

For example:

```text
Desktop:
load high-resolution visualization

Mobile:
load lightweight visualization
```

---

# 54. `window.getSelection()`

Browsers provide selection APIs through `window`.

Example:

```javascript
const selection = window.getSelection();

console.log(selection?.toString());
```

This lets you inspect the user's current text selection.

It can be useful for:

* Rich text tools.
* Editor interfaces.
* Specialized selection behavior.

However, this is an advanced browser feature and should not be used unless the application actually needs it.

---

# 55. `window.resizeTo()` and `window.resizeBy()`

Browsers may expose:

```javascript
window.resizeTo();
window.resizeBy();
```

However, modern browsers heavily restrict programmatic resizing of browser windows.

These methods are mainly relevant to special popup/window-management scenarios and are not appropriate for ordinary responsive design.

Do not use them as a replacement for responsive CSS.

---

# 56. `window.moveTo()` and `window.moveBy()`

Similarly:

```javascript
window.moveTo();
window.moveBy();
```

relate to moving browser windows.

Modern browsers restrict these capabilities.

They should not be part of normal webpage layout logic.

---

# 57. Why Browsers Restrict Window Control

Without restrictions, malicious pages could attempt to:

* Move windows unexpectedly.
* Resize them repeatedly.
* Steal focus.
* Create endless popups.
* Disorient users.

Browser restrictions are part of the security and user-control model.

Think:

```text
Web page requests power
        ↓
Browser decides whether to allow it
```

---

# 58. `window.print()`

The browser provides:

```javascript
window.print();
```

which requests the browser's print dialog.

Example:

```javascript
button.addEventListener("click", () => {
  window.print();
});
```

A common approach is to style printed output with:

```css
@media print {
  .no-print {
    display: none;
  }
}
```

This is often better than attempting to manually create an entirely separate print system.

---

# 59. `window.stop()`

The browser exposes:

```javascript
window.stop();
```

which requests stopping the loading of resources associated with the current document.

This is a specialized API and rarely needed in ordinary frontend applications.

Avoid using it unless the application has a clear reason to control resource loading.

---

# 60. `window.postMessage()`

Cross-window communication commonly uses:

```javascript
window.postMessage();
```

Example:

```javascript
window.postMessage(
  {
    type: "READY"
  },
  window.location.origin
);
```

A receiving page can listen:

```javascript
window.addEventListener(
  "message",
  (event) => {
    // Validate origin.
    // Validate data.
  }
);
```

The security rule is:

> **Never blindly trust cross-window messages.**

Validate both:

```javascript
event.origin
```

and:

```javascript
event.data
```

before performing security-sensitive operations.

---

# 61. `window.postMessage()` and Same-Origin Policy

`postMessage()` exists because browser security prevents unrestricted cross-origin DOM access.

Instead of:

```text
Cross-origin page
       ↓
Direct DOM access
```

applications can use:

```text
Window A
   ↓
postMessage()
   ↓
Window B
```

The receiving application must validate:

```text
origin
data
message type
```

This makes communication explicit rather than bypassing browser isolation.

---

# 62. `window.open()` + `postMessage()`

A common architecture is:

```text
Parent page
   ↓
window.open()
   ↓
Popup
   ↓
postMessage()
   ↓
Parent
```

For example:

```javascript
const popup = window.open(
  "/auth-popup.html",
  "_blank"
);
```

Then a popup could communicate back:

```javascript
window.opener?.postMessage(
  {
    type: "AUTH_COMPLETE"
  },
  window.location.origin
);
```

The receiver should verify the origin.

This pattern appears in some authentication and integration workflows.

---

# 63. `window.location` Methods Are Related but Separate

Although `location` is a property of `window`, it has its own methods:

```javascript
location.assign("/projects");
location.replace("/projects");
location.reload();
```

This demonstrates an important object model pattern:

```text
window
  ↓ property
location
  ↓ method
assign()
```

The detailed Location API belongs in:

```text
04-location-object.md
```

---

# 64. `window.history` Methods Are Also Nested

Similarly:

```javascript
history.back();
history.forward();
history.go(-1);
```

are methods of:

```javascript
window.history
```

The overall object relationship is:

```text
window
  ↓
history
  ├── back()
  ├── forward()
  └── go()
```

More advanced methods such as:

```javascript
history.pushState();
history.replaceState();
```

will be discussed in the History section.

---

# 65. Window Methods vs Document Methods

Do not confuse:

```javascript
window.scrollTo();
```

with:

```javascript
element.scrollIntoView();
```

or:

```javascript
document.querySelector();
```

Each belongs to a different object.

For example:

```text
window
→ browser-level behavior

document
→ document-level behavior

element
→ element-level behavior
```

This mental model helps you choose the correct API.

---

# 66. Browser Method Restrictions

A method may exist but still be restricted.

Examples:

```javascript
window.open();
window.close();
window.focus();
window.moveTo();
window.resizeTo();
```

The browser can limit them according to:

* User activation.
* Origin.
* Security policy.
* Browser configuration.
* Window ownership.
* User preferences.

Therefore:

> API availability and API permission are separate concepts.

---

# 67. Method Availability vs Permission

For example:

```javascript
typeof window.open === "function";
```

can be true.

That does not guarantee:

```javascript
window.open(...)
```

will create the desired popup.

Similarly:

```javascript
navigator.geolocation;
```

may exist, while the user can still deny location access.

Think:

```text
API exists
    ↓
API can be called
    ↓
Browser checks conditions
    ↓
Operation allowed or denied
```

---

# 68. Error Handling for Browser Methods

Browser APIs may fail or be blocked.

For example:

```javascript
try {
  const popup = window.open(
    "https://example.com"
  );

  if (!popup) {
    console.log("Popup was blocked.");
  }
} catch (error) {
  console.error(error);
}
```

Do not assume that browser operations always succeed.

Where APIs use promises, handle rejections:

```javascript
try {
  await someBrowserOperation();
} catch (error) {
  // Handle failure.
}
```

---

# 69. Window Methods and Security

Some methods interact directly with user-controlled browser state.

Important examples include:

```text
open()
close()
focus()
postMessage()
```

Security considerations include:

* Popup abuse.
* Opener relationships.
* Cross-origin boundaries.
* User activation.
* Message origin validation.
* Unexpected navigation.

Treat browser-control methods as privileged capabilities.

---

# 70. Window Methods and Accessibility

Browser methods can also affect accessibility.

For example:

```javascript
window.scrollTo();
```

can move the user's visual context unexpectedly.

And:

```javascript
window.focus();
```

can interfere with keyboard navigation.

Therefore, ask:

> Is this browser action necessary for the user to complete the task?

Do not create unnecessary motion or focus changes.

---

# 71. Respect Reduced Motion

When using smooth scrolling:

```javascript
window.scrollTo({
  top: 0,
  behavior: "smooth"
});
```

consider users who prefer reduced motion.

CSS provides:

```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

Applications should avoid excessive motion and provide accessible behavior.

---

# 72. Window Methods in React

React does not replace window methods.

For example:

```jsx
<button
  onClick={() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }}
>
  Back to top
</button>
```

This is a reasonable use of a browser API.

The important part is that the browser operation is triggered intentionally by the UI.

---

# 73. Window Methods in `useEffect`

For global listeners or timers:

```jsx
useEffect(() => {
  function handleResize() {
    console.log(window.innerWidth);
  }

  window.addEventListener(
    "resize",
    handleResize
  );

  return () => {
    window.removeEventListener(
      "resize",
      handleResize
    );
  };
}, []);
```

This demonstrates a broader lifecycle pattern:

```text
Effect starts
   ↓
Browser subscription
   ↓
Component active
   ↓
Cleanup
```

---

# 74. Do Not Put Browser Calls in Render Logic Needlessly

Avoid:

```jsx
function Component() {
  window.scrollTo(0, 0);

  return <p>Hello</p>;
}
```

Rendering should be predictable.

A browser side effect such as scrolling generally belongs in an event handler or appropriate effect.

For example:

```jsx
useEffect(() => {
  window.scrollTo({
    top: 0
  });
}, []);
```

when that behavior is actually required.

---

# 75. Window Methods in Next.js

In Next.js, browser methods are client-side concerns.

For example:

```javascript
window.scrollTo();
window.open();
window.matchMedia();
```

should not be assumed available during server rendering.

When browser interaction belongs to a client component:

```jsx
"use client";
```

may be required.

But adding `"use client"` solely because `window` exists should be a deliberate architectural decision.

---

# 76. Prefer Native HTML Over Window Methods When Possible

For example, instead of:

```javascript
window.location.href = "/projects";
```

for a normal link, prefer:

```jsx
<a href="/projects">
  Projects
</a>
```

or the framework's routing mechanism when appropriate.

Instead of:

```javascript
window.open("/projects");
```

for an ordinary link:

```html
<a href="/projects">Projects</a>
```

Use browser methods for behavior that actually needs programmatic control.

---

# 77. Common Mistakes

## Mistake 1: Assuming `setTimeout(fn, 1000)` runs exactly after one second

It only schedules the callback after the delay.

---

## Mistake 2: Using `setInterval()` for precise timing

Intervals can drift and be delayed.

---

## Mistake 3: Using timers when `requestAnimationFrame()` is more appropriate

Visual updates should generally use rendering-aware scheduling.

---

## Mistake 4: Assuming `window.open()` always works

Popup blocking can prevent it.

---

## Mistake 5: Assuming `window.close()` can close any tab

Browsers restrict this.

---

## Mistake 6: Using JavaScript for CSS-only responsive design

Prefer CSS.

---

## Mistake 7: Ignoring event cleanup

Global listeners and timers can outlive the UI that created them.

---

## Mistake 8: Blindly trusting `postMessage()` data

Validate `event.origin` and the message structure.

---

## Mistake 9: Using `window.focus()` aggressively

Focus belongs to the user and accessibility workflow.

---

## Mistake 10: Calling browser APIs during server rendering

Browser methods belong to the client environment.

---

# 78. Best Practices

## 1. Prefer semantic browser behavior

Use links, forms, buttons, and native HTML whenever they solve the problem.

---

## 2. Use `window.open()` only when a new browsing context is actually needed

Do not replace normal links with JavaScript unnecessarily.

---

## 3. Use `requestAnimationFrame()` for animation loops

Use timers for delayed or scheduled application logic.

---

## 4. Always clean up timers and listeners

Treat every browser subscription as having a lifecycle.

---

## 5. Expect browser restrictions

Popup, focus, resize, move, and close operations may be blocked.

---

## 6. Use `matchMedia()` for JavaScript media conditions

Do not poll `innerWidth`.

---

## 7. Prefer CSS for visual responsiveness

JavaScript should handle behavior, not duplicate CSS unnecessarily.

---

## 8. Validate cross-window messages

Check:

```javascript
event.origin
```

and:

```javascript
event.data
```

---

## 9. Respect accessibility

Avoid unnecessary focus changes and motion.

---

## 10. Keep browser-specific logic isolated

This is especially important for React and Next.js.

---

# 79. Quick Reference

| Method                           | Purpose                            |
| -------------------------------- | ---------------------------------- |
| `window.open()`                  | Request a new browsing context     |
| `window.close()`                 | Request closing the current window |
| `window.focus()`                 | Request window focus               |
| `window.blur()`                  | Request window blur                |
| `window.scrollTo()`              | Scroll to an absolute position     |
| `window.scrollBy()`              | Scroll by a relative amount        |
| `window.scroll()`                | Set scroll position                |
| `window.setTimeout()`            | Schedule a one-time callback       |
| `window.clearTimeout()`          | Cancel a timeout                   |
| `window.setInterval()`           | Schedule repeated callbacks        |
| `window.clearInterval()`         | Cancel an interval                 |
| `window.requestAnimationFrame()` | Schedule visual work               |
| `window.cancelAnimationFrame()`  | Cancel animation callback          |
| `window.alert()`                 | Show native alert                  |
| `window.confirm()`               | Request boolean confirmation       |
| `window.prompt()`                | Request text input                 |
| `window.matchMedia()`            | Evaluate a media query             |
| `window.print()`                 | Open print workflow                |
| `window.postMessage()`           | Send cross-window messages         |
| `window.getSelection()`          | Access current text selection      |
| `window.resizeTo()`              | Request window resizing            |
| `window.resizeBy()`              | Request relative window resizing   |
| `window.moveTo()`                | Request window movement            |
| `window.moveBy()`                | Request relative window movement   |
| `window.stop()`                  | Request stopping document loading  |

---

# 80. Method Comparison

| Method                    | Absolute / Relative | Common Use                    |
| ------------------------- | ------------------- | ----------------------------- |
| `scrollTo()`              | Absolute            | Scroll to a specific position |
| `scroll()`                | Absolute            | Set scroll position           |
| `scrollBy()`              | Relative            | Move by an offset             |
| `setTimeout()`            | Delayed             | One-time scheduling           |
| `setInterval()`           | Repeated            | Repeated work                 |
| `requestAnimationFrame()` | Frame-based         | Visual updates                |
| `clearTimeout()`          | Cancellation        | Stop timeout                  |
| `clearInterval()`         | Cancellation        | Stop interval                 |
| `cancelAnimationFrame()`  | Cancellation        | Stop frame callback           |

---

# 81. Scheduling Mental Model

Do not think of these APIs as interchangeable.

```text
setTimeout()
→ "Run this later."

setInterval()
→ "Try to run this repeatedly."

requestAnimationFrame()
→ "Run this around the browser's next rendering opportunity."
```

A practical decision tree:

```text
Need a delayed action?
        ↓
   setTimeout()

Need repeated work?
        ↓
   setInterval()
or recursive setTimeout()

Need animation / visual updates?
        ↓
requestAnimationFrame()
```

---

# 82. Scrolling Mental Model

Use:

```text
scrollTo()
→ go to position

scrollBy()
→ move by amount

scrollIntoView()
→ bring an element into view
```

For example:

```javascript
window.scrollTo({
  top: 0,
  behavior: "smooth"
});
```

versus:

```javascript
window.scrollBy({
  top: 500
});
```

versus:

```javascript
document
  .querySelector("#projects")
  ?.scrollIntoView({
    behavior: "smooth"
  });
```

These express different intents.

---

# 83. Popup Mental Model

When using:

```javascript
window.open();
```

think:

```text
Request popup
      ↓
Was there user activation?
      ↓
Is the browser willing to allow it?
      ↓
Did the method return a Window reference?
      ↓
Does same-origin policy allow the needed access?
      ↓
Perform interaction
```

A popup is not automatically fully controllable just because you have a reference.

---

# 84. React Mental Model

For React, window methods usually appear in three places:

### Event handler

```jsx
<button
  onClick={() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }}
>
  Back to top
</button>
```

### Effect

```jsx
useEffect(() => {
  const id = setTimeout(() => {
    // ...
  }, 1000);

  return () => {
    clearTimeout(id);
  };
}, []);
```

### Browser integration

```jsx
useEffect(() => {
  const query = window.matchMedia(
    "(prefers-color-scheme: dark)"
  );

  // Subscribe.

  return () => {
    // Cleanup.
  };
}, []);
```

The rule is:

> **Use browser methods as effects of application behavior, not as a replacement for React's rendering model.**

---

# 85. Next.js Mental Model

In Next.js:

```text
Server rendering
    ↓
No browser window

Client execution
    ↓
Window methods available
```

Therefore:

```javascript
window.scrollTo();
window.open();
window.matchMedia();
setTimeout();
```

must be considered in terms of where the code runs.

Browser-only operations commonly belong in:

```text
Client Components
Event handlers
useEffect
Client-only utility modules
```

depending on the use case.

---

# 86. Final Checklist

Before using a `window` method, ask:

```text
[ ] Is this actually a browser concern?
[ ] Does native HTML already solve the problem?
[ ] Is there a CSS solution?
[ ] Is the method allowed by the browser?
[ ] Does it require user activation?
[ ] Can it fail or return null?
[ ] Does it need cleanup?
[ ] Could it affect accessibility?
[ ] Could it affect performance?
[ ] Does it need client-only execution?
[ ] Are there security implications?
[ ] Am I using the correct method for the intent?
```

---

# Key Takeaways

* Window methods let JavaScript perform actions in the browser environment.
* `window.open()` is restricted by popup and user-activation rules.
* `window.close()` cannot arbitrarily close any browser tab.
* `focus()`, `blur()`, `moveTo()`, and `resizeTo()` are subject to browser restrictions.
* `scrollTo()` sets a target position.
* `scrollBy()` moves relative to the current position.
* `scroll()` can also set scroll position.
* `setTimeout()` schedules future work; it does not guarantee exact execution time.
* `setInterval()` schedules repeated work but is not a precision clock.
* Recursive `setTimeout()` can be better than `setInterval()` for asynchronous polling.
* `requestAnimationFrame()` is designed for visual updates and animation.
* Always cancel timers and animation callbacks when their lifecycle ends.
* `alert()`, `confirm()`, and `prompt()` are simple synchronous browser dialogs, but modern applications often need richer accessible UI.
* `matchMedia()` lets JavaScript react to media conditions without polling viewport size.
* `window.print()` integrates with the browser's printing system.
* `postMessage()` provides controlled cross-window communication, but message origins and data must be validated.
* Native HTML and CSS should be preferred whenever they already solve the problem.
* In React, window methods usually belong inside event handlers or properly cleaned-up effects.
* In Next.js, window methods are client-side concerns and must respect the server/client boundary.
* Browser restrictions are intentional; your code requests an action, but the browser ultimately decides whether the action is allowed.

The central principle is:

> **Use `window` methods to perform genuine browser-level operations, prefer native HTML/CSS where possible, respect browser security and user-control restrictions, and always manage the lifecycle of scheduled or subscribed work.**
