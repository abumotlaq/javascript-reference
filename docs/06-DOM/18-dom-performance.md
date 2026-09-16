# DOM Performance

## Introduction

The DOM is one of the most important parts of browser-based JavaScript, but manipulating it carelessly can make an application slow.

DOM performance is mainly about understanding the relationship between:

```text
JavaScript
    ↓
DOM
    ↓
CSS
    ↓
Layout
    ↓
Paint
    ↓
Composite
    ↓
Screen
```

When JavaScript changes the DOM or styles, the browser may need to recalculate parts of the page before displaying the result.

This can become expensive when:

* Thousands of elements are created.
* The DOM tree becomes unnecessarily large.
* Layout is repeatedly forced.
* JavaScript reads and writes layout information inefficiently.
* Large portions of the DOM are replaced unnecessarily.
* Expensive event handlers run too frequently.
* Animations trigger expensive layout operations.
* Observers or callbacks perform excessive work.

The goal is not to avoid DOM manipulation completely.

The goal is:

> **Make DOM work predictable, minimal, and efficient.**

---

# 1. How the Browser Renders a Page

A simplified rendering pipeline looks like this:

```text
HTML
 ↓
DOM

CSS
 ↓
CSSOM

DOM + CSSOM
 ↓
Render Tree
 ↓
Layout
 ↓
Paint
 ↓
Composite
```

Each stage has a different responsibility.

---

# 2. DOM

The browser parses HTML into the DOM.

For example:

```html
<section>
  <h2>Osama Abu Motlaq</h2>
  <p>Frontend Developer</p>
</section>
```

becomes a tree:

```text
Document
└── section
    ├── h2
    │   └── Text
    └── p
        └── Text
```

JavaScript can modify this tree.

---

# 3. CSSOM

CSS is also parsed into a structure called the CSS Object Model.

For example:

```css
.card {
  width: 300px;
  padding: 20px;
}
```

The browser needs both DOM and CSS information to determine how elements should be displayed.

Conceptually:

```text
DOM
 +
CSSOM
 ↓
Rendering information
```

---

# 4. Layout

The browser calculates:

* Element positions.
* Element sizes.
* Relationships between elements.
* Text layout.
* Geometry.

This stage is commonly called:

```text
Layout
```

You may also hear:

```text
Reflow
```

The term **reflow** is commonly used for recalculating layout after changes.

---

# 5. Paint

After layout information is available, the browser determines what needs to be drawn.

For example:

* Text.
* Backgrounds.
* Borders.
* Shadows.
* Images.

This is called:

```text
Paint
```

---

# 6. Composite

Modern browsers often divide rendering into layers and combine those layers during compositing.

Some visual changes can be handled mainly during compositing without requiring a complete layout calculation.

This is one reason certain CSS animations can be much cheaper than others.

---

# 7. Reflow / Layout

A layout calculation determines where elements are and how large they are.

Suppose:

```javascript
element.style.width = "500px";
```

Changing the width can affect:

```text
Element width
    ↓
Child layout
    ↓
Sibling positions
    ↓
Parent dimensions
    ↓
Other layout relationships
```

The browser may need to recalculate layout.

This can be expensive when the affected part of the page is large.

---

# 8. Repaint

A repaint happens when the browser needs to redraw visual pixels.

For example, changing:

```javascript
element.style.backgroundColor = "black";
```

may require repainting the element.

A repaint does not necessarily require recalculating the entire layout.

Conceptually:

```text
Layout
 ↓
Paint
```

Layout changes can lead to paint, while some visual-only changes may only require paint.

---

# 9. Composite

Some changes can be handled by the compositor.

For example:

```css
transform: translateX(100px);
```

and:

```css
opacity: 0.5;
```

can often be handled efficiently by the browser's compositing system.

This does not mean:

> "transform and opacity are always free."

They still consume resources.

But they are commonly preferred for animations because they can avoid repeated layout calculations.

---

# 10. Why DOM Manipulation Can Be Expensive

The DOM is connected to rendering.

Therefore:

```javascript
element.style.width = "500px";
```

is not just a JavaScript property assignment.

The browser may need to:

```text
Update style
   ↓
Recalculate layout
   ↓
Paint
   ↓
Composite
```

The exact work depends on the property and the page.

---

# 11. Changing One Element Can Affect Many Elements

Consider:

```text
Page
├── Header
├── Main
│   ├── Sidebar
│   └── Content
│       ├── Card
│       ├── Card
│       └── Card
└── Footer
```

Changing a dimension near the top of the hierarchy can affect many descendants.

For example:

```javascript
header.style.height = "200px";
```

can change where the rest of the page begins.

This may cause substantial layout work.

---

# 12. DOM Size Matters

A larger DOM generally gives the browser more work to manage.

Compare:

```text
Small DOM

Document
└── main
    ├── section
    └── footer
```

with:

```text
Large DOM

Document
└── main
    ├── section
    │   ├── ...
    │   ├── ...
    │   ├── ...
    │   └── ...
    ├── section
    ├── section
    └── ...
```

A large DOM is not automatically slow.

But unnecessary DOM complexity can increase:

* Style calculation.
* Layout work.
* Memory usage.
* Painting.
* DOM querying cost.
* Event management complexity.

---

# 13. Avoid Unnecessary DOM Nodes

Bad:

```html
<div>
  <div>
    <div>
      <div>
        <p>Osama Abu Motlaq</p>
      </div>
    </div>
  </div>
</div>
```

when the wrappers provide no structural or styling purpose.

Better:

```html
<p>Osama Abu Motlaq</p>
```

The principle is:

> Do not create DOM elements that provide no useful purpose.

---

# 14. Batch DOM Changes

Suppose you need to add many elements.

Instead of repeatedly modifying the live DOM:

```javascript
for (const project of projects) {
  const item = document.createElement("li");

  item.textContent = project;

  list.append(item);
}
```

you can construct the nodes first:

```javascript
const fragment = document.createDocumentFragment();

for (const project of projects) {
  const item = document.createElement("li");

  item.textContent = project;

  fragment.append(item);
}

list.append(fragment);
```

This can reduce unnecessary interaction with the live DOM and provides a clean construction phase.

`DocumentFragment` is not a guarantee of a particular number of layouts or paints, but it is a useful tool for staging DOM construction.

---

# 15. `innerHTML` and Performance

For large amounts of markup, this:

```javascript
container.innerHTML = `
  <p>Project 1</p>
  <p>Project 2</p>
  <p>Project 3</p>
`;
```

can be concise and sometimes efficient because the browser parses the HTML as a batch.

But it has trade-offs.

Potential problems include:

* Replacing existing descendants.
* Removing event listeners from replaced nodes.
* Losing references to replaced nodes.
* Security risks with untrusted HTML.

Therefore, performance alone should not determine whether you use `innerHTML`.

---

# 16. `textContent` vs `innerHTML`

If you only need text:

```javascript
element.textContent = "Osama Abu Motlaq";
```

is preferable to:

```javascript
element.innerHTML = "Osama Abu Motlaq";
```

because you are explicitly expressing that the value is text.

If you need to create structured HTML, other DOM APIs or carefully controlled `innerHTML` may be appropriate.

---

# 17. Avoid Layout Thrashing

One of the most important DOM performance problems is called:

```text
Layout Thrashing
```

It occurs when code repeatedly alternates between:

```text
DOM writes
and
layout reads
```

in a way that can force the browser to repeatedly calculate layout.

---

# 18. Layout Reads

Some DOM APIs require current layout information.

Examples include:

```javascript
element.offsetWidth;
element.offsetHeight;
element.offsetTop;
element.offsetLeft;
```

and:

```javascript
element.clientWidth;
element.clientHeight;
```

and:

```javascript
element.getBoundingClientRect();
```

Also commonly:

```javascript
getComputedStyle(element);
```

when accessing layout-dependent computed values.

---

# 19. Layout Writes

Examples include changing:

```javascript
element.style.width = "500px";
element.style.height = "300px";
element.style.padding = "20px";
```

or changing classes:

```javascript
element.classList.add("expanded");
```

when the class changes layout-related styles.

---

# 20. Bad Read/Write Pattern

Consider:

```javascript
for (const element of elements) {
  element.style.width = "500px";

  console.log(element.offsetWidth);
}
```

The pattern is:

```text
Write
 ↓
Read layout
 ↓
Write
 ↓
Read layout
 ↓
Write
 ↓
Read layout
```

The browser may need to resolve layout repeatedly.

This can become expensive for large collections.

---

# 21. Better Read/Write Grouping

Instead, separate reads from writes when practical.

```javascript
const widths = [];

for (const element of elements) {
  widths.push(element.offsetWidth);
}

for (const element of elements) {
  element.style.width = "500px";
}
```

Now the general pattern is:

```text
Read
Read
Read
Read
 ↓
Write
Write
Write
Write
```

This gives the browser more opportunity to batch work.

---

# 22. Important Nuance About Forced Synchronous Layout

It is inaccurate to say:

> "Every layout read always causes reflow."

Browsers can cache layout information.

A layout read becomes especially important when the browser has pending changes that could invalidate the information being requested.

For example:

```javascript
element.style.width = "500px";

console.log(element.offsetWidth);
```

The browser may need to resolve the updated layout before returning the correct width.

This is often called:

```text
Forced synchronous layout
```

or:

```text
Forced reflow
```

---

# 23. Example of Forced Layout

```javascript
element.style.width = "500px";

const width = element.offsetWidth;

console.log(width);
```

The browser cannot simply return an outdated width.

It may need to calculate the layout first.

Conceptually:

```text
Write
 ↓
Layout invalidated
 ↓
Read current layout
 ↓
Browser calculates layout
 ↓
Return width
```

---

# 24. Avoid Unnecessary Layout Reads

If you already know the value:

```javascript
const width = 500;

element.style.width = `${width}px`;
```

there may be no reason to immediately ask:

```javascript
element.offsetWidth;
```

Ask the browser for layout information when you actually need it.

---

# 25. Cache DOM References

Instead of repeatedly querying:

```javascript
document.querySelector("#projects");
```

store the reference:

```javascript
const projects = document.querySelector("#projects");
```

Then reuse:

```javascript
projects.append(item);
projects.classList.add("active");
```

This improves readability and avoids unnecessary repeated selector operations.

The performance improvement from caching one simple query is usually small.

The more important benefits are:

* Clearer code.
* Stable references.
* Less repeated work.

---

# 26. Prefer Specific Selectors

Instead of:

```javascript
document.querySelectorAll("*");
```

prefer a targeted selector:

```javascript
document.querySelectorAll(".project");
```

The goal is to select only what you actually need.

Avoid unnecessarily broad DOM queries.

---

# 27. Scope Queries to a Container

Instead of:

```javascript
document.querySelectorAll(".project");
```

you can scope the query:

```javascript
const container = document.querySelector("#projects");

const projects = container.querySelectorAll(".project");
```

This communicates the intended search area.

It can also reduce unnecessary matching work compared with searching a much larger document, depending on the selector and DOM structure.

---

# 28. Avoid Repeated Full-Document Queries

Bad:

```javascript
for (const project of projects) {
  document.querySelector(".status");
}
```

If the element is the same, query it once:

```javascript
const status = document.querySelector(".status");

for (const project of projects) {
  status.textContent = "Processing...";
}
```

---

# 29. Event Delegation

If many elements need similar event behavior, attaching a listener to every child may be unnecessary.

Instead of:

```javascript
buttons.forEach((button) => {
  button.addEventListener("click", handleClick);
});
```

you can sometimes use event delegation:

```javascript
list.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  handleClick(button);
});
```

The parent handles events from its descendants.

This can reduce the number of event listeners.

---

# 30. Event Delegation Is Not Always Better

Do not treat delegation as an automatic performance optimization.

Consider:

* Event propagation.
* Dynamic children.
* Selector matching.
* Accessibility.
* Event semantics.
* Whether the events bubble.
* Complexity of the handler.

Use delegation when it fits the structure of the UI.

---

# 31. High-Frequency Events

Some events can fire frequently.

Examples:

```text
scroll
mousemove
pointermove
resize
input
```

Consider:

```javascript
window.addEventListener("scroll", () => {
  // Expensive work
});
```

If the handler performs heavy work on every event, performance can suffer.

---

# 32. Throttling

Throttling limits how often a function runs.

A simple implementation:

```javascript
function throttle(callback, delay) {
  let lastTime = 0;

  return (...args) => {
    const now = Date.now();

    if (now - lastTime < delay) {
      return;
    }

    lastTime = now;

    callback(...args);
  };
}
```

Usage:

```javascript
const handleScroll = throttle(() => {
  console.log("Scrolling");
}, 100);

window.addEventListener("scroll", handleScroll);
```

This reduces how frequently the expensive operation executes.

---

# 33. `requestAnimationFrame()`

For visual updates tied to rendering, `requestAnimationFrame()` is often more appropriate than arbitrary timers.

Example:

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

The browser schedules the visual update for an appropriate animation frame.

---

# 34. `requestAnimationFrame()` Mental Model

Think:

```text
Many events
    ↓
Schedule one update
    ↓
Next animation frame
    ↓
Update visual state
```

This is useful for animation and visual synchronization.

---

# 35. Prefer CSS for CSS Work

If CSS can handle an animation or transition, do not automatically implement the animation using JavaScript.

Instead of:

```javascript
element.style.left = `${x}px`;
```

on every animation step, consider:

```css
transform: translateX(...);
transition: transform 300ms ease;
```

when appropriate.

CSS can allow the browser to optimize rendering more effectively.

---

# 36. Prefer `transform` for Movement

For animations, this:

```css
transform: translateX(100px);
```

is often preferable to repeatedly changing:

```css
left: 100px;
```

because `left` can participate in layout while `transform` can often be handled more efficiently by compositing.

However, actual performance depends on the surrounding page and browser.

---

# 37. Prefer `opacity` for Fading

For a fade animation:

```css
opacity: 0;
```

to:

```css
opacity: 1;
```

is generally preferable to repeatedly changing layout-related properties.

Example:

```css
.fade {
  transition: opacity 200ms ease;
}
```

---

# 38. Avoid Animating Layout Properties When Possible

Layout-related properties can include:

```text
width
height
top
left
margin
padding
```

Changing them repeatedly during animation can cause layout work.

For movement and visual effects, consider:

```text
transform
opacity
```

when they produce the required visual result.

---

# 39. CSS Containment

CSS provides containment mechanisms that can limit how much of the page needs to be considered when rendering.

For example:

```css
.card {
  contain: layout;
}
```

Containment can communicate that certain layout or rendering work can be isolated.

This is an advanced optimization.

Do not add `contain` randomly.

Understand what it changes before using it.

---

# 40. `content-visibility`

CSS also provides:

```css
content-visibility: auto;
```

This can allow the browser to skip rendering work for content that is not currently needed for display.

It can be useful for large pages with substantial off-screen content.

However, it has layout, sizing, and accessibility considerations.

Use it based on measured needs rather than as a universal optimization.

---

# 41. Lazy Loading

Do not load everything immediately if the user does not need it immediately.

Images can use native lazy loading:

```html
<img
  src="/images/project.jpg"
  loading="lazy"
  alt="Project"
/>
```

This can reduce initial loading work.

For more custom behavior, `IntersectionObserver` can be used.

---

# 42. DOM Virtualization

If an application needs to display thousands or tens of thousands of items, rendering all of them at once may be expensive.

For example:

```text
100,000 items
      ↓
100,000 DOM nodes
```

A virtualization strategy can render only the items currently needed for the viewport.

Conceptually:

```text
Large dataset
      ↓
Visible window
      ↓
Small number of DOM nodes
```

This technique is common in:

* Large tables.
* Long lists.
* Data-heavy dashboards.
* File managers.

---

# 43. Virtualization vs Pagination

These are different strategies.

### Pagination

The application loads or displays a limited number of items:

```text
Page 1 → 50 items
Page 2 → 50 items
Page 3 → 50 items
```

### Virtualization

The application may have a large dataset but renders only the visible portion:

```text
100,000 logical items
        ↓
~30 visible DOM rows
```

Both reduce the amount of active UI work, but they solve different problems.

---

# 44. Minimize Unnecessary DOM Replacement

Consider:

```javascript
container.innerHTML = generateMarkup();
```

If this runs repeatedly, the browser may discard and recreate many nodes.

That can cause:

* More DOM work.
* More garbage collection.
* Lost event listeners.
* Lost DOM state.
* Lost references.

When only one element changed, update only that element when practical.

---

# 45. Update Only What Changed

Bad conceptual approach:

```javascript
container.innerHTML = renderEntirePage();
```

for every small state change.

Better conceptual approach:

```javascript
status.textContent = "Saved";
```

if only the status changed.

This principle is fundamental:

> **The less unnecessary UI you update, the less work the browser needs to perform.**

---

# 46. Batch Related Changes

Suppose several attributes must change:

```javascript
element.classList.add("active");
element.setAttribute("aria-expanded", "true");
element.textContent = "Open";
```

Perform related updates together instead of scattering them throughout unrelated code.

This makes the update easier to reason about and can help avoid unnecessary intermediate states.

---

# 47. Avoid Forced Layout Inside Loops

Potentially expensive:

```javascript
for (const element of elements) {
  element.style.width = "500px";

  const width = element.offsetWidth;

  console.log(width);
}
```

Prefer:

```javascript
for (const element of elements) {
  console.log(element.offsetWidth);
}

for (const element of elements) {
  element.style.width = "500px";
}
```

when the logic allows it.

The exact optimization should be verified with profiling.

---

# 48. DOM Performance and Memory

Performance is not only about CPU time.

A large DOM also consumes memory.

Each element can involve:

* DOM object memory.
* Text nodes.
* Attributes.
* Event listeners.
* CSS/layout data.
* JavaScript references.

Thousands of unnecessary nodes can increase memory pressure.

This matters particularly on:

* Mobile devices.
* Low-memory computers.
* Complex dashboards.
* Large data applications.

---

# 49. Remove Unused Event Listeners and Observers

Long-lived listeners can keep logic and references alive longer than necessary.

Observers should also be disconnected when they are no longer needed:

```javascript
observer.disconnect();
```

In component-based applications, cleanup is especially important.

---

# 50. Avoid Memory Leaks Through References

Suppose:

```javascript
const element = document.querySelector("#projects");
```

Later the element is removed:

```javascript
element.remove();
```

Your JavaScript variable still references the object:

```text
JavaScript variable
       ↓
Removed DOM node
```

A removed node can remain in memory while it is still reachable through JavaScript or other references.

The general rule is:

> Removing a node from the DOM does not automatically eliminate every JavaScript reference to it.

---

# 51. Use Performance Measurement

Do not optimize based only on assumptions.

The browser provides performance tools.

For example:

```javascript
const start = performance.now();

performWork();

const end = performance.now();

console.log(`Duration: ${end - start}ms`);
```

This measures elapsed time with the browser's high-resolution timing API.

---

# 52. `performance.mark()`

For more structured measurements:

```javascript
performance.mark("projects-start");

renderProjects();

performance.mark("projects-end");

performance.measure(
  "render-projects",
  "projects-start",
  "projects-end"
);
```

You can then inspect the performance measurement.

This is useful when investigating specific operations.

---

# 53. Browser DevTools

For real performance investigation, browser DevTools are more useful than guessing.

Useful areas include:

```text
Performance
Memory
Elements
Rendering
```

The Performance panel can help identify:

* Long tasks.
* Scripting time.
* Layout work.
* Painting.
* Rendering bottlenecks.
* Frame drops.

---

# 54. Long Tasks

A task that occupies the main thread for too long can prevent the browser from responding smoothly.

For example:

```javascript
for (let i = 0; i < 1_000_000_000; i++) {
  // Heavy synchronous work
}
```

During this work, the browser's main thread cannot freely process other tasks.

This can cause:

* Input lag.
* Delayed rendering.
* Frozen UI.
* Poor responsiveness.

---

# 55. DOM Work Runs on the Main Thread

Traditional DOM operations and JavaScript execution occur in the browser's main execution environment.

Therefore, excessive synchronous DOM work can compete with:

```text
JavaScript
Rendering
User input
Events
Other browser work
```

Keeping synchronous work small is essential for responsiveness.

---

# 56. Web Workers

If computation is CPU-heavy and does not require direct DOM access, a Web Worker can move that computation away from the main thread.

Conceptually:

```text
Main Thread
    │
    ├── DOM
    ├── Rendering
    └── User interaction

Web Worker
    │
    └── Heavy computation
```

Workers cannot directly manipulate the normal DOM.

They communicate with the main thread using messages.

---

# 57. DOM Performance and React

This topic is highly relevant to React.

React's purpose is not simply:

> "Make DOM manipulation faster."

React provides a declarative programming model and determines how the UI should be updated.

Instead of manually doing:

```javascript
element.textContent = value;
element.classList.toggle("active", condition);
```

React typically uses:

```jsx
function Status({ saved }) {
  return (
    <p className={saved ? "active" : ""}>
      {saved ? "Saved" : "Not saved"}
    </p>
  );
}
```

React manages the corresponding DOM updates.

---

# 58. React Does Not Make Performance Automatic

Using React does not automatically guarantee a fast application.

Poor React patterns can still cause performance problems.

Examples include:

* Rendering unnecessarily large lists.
* Unnecessary state updates.
* Expensive calculations during rendering.
* Excessive component re-renders.
* Large DOM trees.
* Unoptimized images.
* Heavy client-side JavaScript.

Understanding browser DOM performance helps explain why these issues matter.

---

# 59. React Lists and DOM Size

Consider:

```jsx
projects.map((project) => (
  <ProjectCard key={project.id} project={project} />
))
```

If:

```text
projects = 50
```

you may have:

```text
50 cards
```

If:

```text
projects = 100,000
```

rendering 100,000 DOM nodes can become a serious performance problem.

At that scale, consider strategies such as:

* Pagination.
* Virtualization.
* Incremental loading.
* Server-side filtering.
* Search.
* Windowing.

---

# 60. React State and DOM Updates

A typical React flow is:

```text
User interaction
      ↓
Event handler
      ↓
State update
      ↓
React render
      ↓
React determines required DOM changes
      ↓
Browser rendering
```

The browser still performs the actual rendering work.

React does not eliminate the cost of the browser's rendering pipeline.

---

# 61. Next.js Performance

Next.js adds additional layers that can reduce unnecessary client-side work.

Depending on the application architecture, you can reduce browser workload by:

* Rendering appropriate content on the server.
* Sending less JavaScript to the client.
* Using Server Components where appropriate.
* Optimizing images.
* Loading client functionality only when needed.
* Splitting code.
* Streaming content.
* Avoiding unnecessarily large client components.

The browser still has to render the final DOM.

Therefore, DOM performance remains relevant.

---

# 62. Server Rendering Does Not Remove DOM Costs

Suppose Next.js sends:

```html
<h1>Osama Abu Motlaq</h1>
```

to the browser.

The browser still needs to:

```text
Parse HTML
 ↓
Build DOM
 ↓
Apply CSS
 ↓
Layout
 ↓
Paint
```

Server rendering can reduce client-side JavaScript work, but it does not remove browser rendering work.

---

# 63. `requestAnimationFrame()` vs `setTimeout()`

For visual updates:

```javascript
requestAnimationFrame(update);
```

is usually more appropriate than:

```javascript
setTimeout(update, 16);
```

because `requestAnimationFrame()` is designed to synchronize visual updates with browser rendering.

Use:

```text
requestAnimationFrame
```

for animation-related rendering work.

Use:

```text
setTimeout
```

for general delayed execution when synchronization with rendering is not the goal.

---

# 64. Avoid Premature Optimization

Do not optimize every line of DOM code.

This:

```javascript
const element = document.querySelector("#title");
```

does not need elaborate optimization in a small application.

Instead:

```text
Build
 ↓
Measure
 ↓
Find bottleneck
 ↓
Optimize
 ↓
Measure again
```

This is a much better engineering process.

---

# 65. Performance Optimization Hierarchy

A useful order is:

```text
1. Avoid unnecessary work
        ↓
2. Reduce amount of DOM
        ↓
3. Batch work
        ↓
4. Avoid forced layout
        ↓
5. Use efficient rendering techniques
        ↓
6. Measure with DevTools
        ↓
7. Optimize proven bottlenecks
```

Do not start with micro-optimizations.

---

# 66. Common DOM Performance Mistakes

## Mistake 1: Excessive DOM size

Creating thousands of unnecessary nodes increases browser work.

---

## Mistake 2: Repeated layout reads and writes

Alternating:

```text
write → read → write → read
```

can cause forced layout.

---

## Mistake 3: Updating the entire DOM unnecessarily

If one element changed, do not rebuild an entire page without a reason.

---

## Mistake 4: Expensive scroll handlers

Do not perform heavy calculations on every scroll event.

---

## Mistake 5: Animating layout properties unnecessarily

Prefer:

```text
transform
opacity
```

for many visual animations when appropriate.

---

## Mistake 6: Creating unnecessary listeners

Use event delegation when it fits the event structure.

---

## Mistake 7: Forgetting cleanup

Disconnect observers and clean up listeners when their lifecycle ends.

---

## Mistake 8: Optimizing without measuring

A theoretical optimization may have little practical impact.

Measure the actual bottleneck.

---

# 67. DOM Performance Checklist

Before optimizing, ask:

```text
□ Is the DOM unnecessarily large?
□ Am I rebuilding more DOM than necessary?
□ Am I repeatedly querying the same elements?
□ Am I mixing layout reads and writes?
□ Am I forcing synchronous layout?
□ Am I doing expensive work in high-frequency events?
□ Can CSS handle this animation?
□ Can I use transform or opacity?
□ Do I need every element rendered immediately?
□ Would lazy loading help?
□ Would virtualization help?
□ Are observers and listeners cleaned up?
□ Have I measured the bottleneck?
```

---

# 68. Quick Reference

### Batch DOM construction

```javascript
const fragment = document.createDocumentFragment();

for (const project of projects) {
  const item = document.createElement("li");

  item.textContent = project;

  fragment.append(item);
}

list.append(fragment);
```

### Cache references

```javascript
const list = document.querySelector("#projects");
```

### Group layout reads

```javascript
const width = element.offsetWidth;
const height = element.offsetHeight;
```

### Group DOM writes

```javascript
element.style.width = "500px";
element.classList.add("active");
```

### Use animation frames

```javascript
requestAnimationFrame(updateUI);
```

### Use CSS transforms for movement

```css
transform: translateX(100px);
```

### Lazy-load images

```html
<img
  src="/images/project.jpg"
  loading="lazy"
  alt="Project"
/>
```

---

# 69. Performance Mental Model

Think about DOM performance as a pipeline:

```text
JavaScript
    ↓
DOM / CSS changes
    ↓
Style calculation
    ↓
Layout
    ↓
Paint
    ↓
Composite
    ↓
Screen
```

Your goal is not to prevent every stage.

Your goal is to avoid unnecessary work at each stage.

A practical mental model is:

```text
Less DOM
   +
Fewer unnecessary updates
   +
Batched changes
   +
Avoid forced layout
   +
Efficient animation
   +
Measured optimization
   =
Better DOM performance
```

---

# Key Takeaways

* DOM operations can affect browser rendering work.
* The browser rendering pipeline includes style calculation, layout, paint, and compositing.
* **Layout** determines element geometry.
* **Paint** draws visual content.
* **Composite** combines rendered layers.
* Changing layout-related properties can trigger expensive layout work.
* `offsetWidth`, `offsetHeight`, `clientWidth`, `clientHeight`, and `getBoundingClientRect()` are examples of layout-related reads.
* Alternating DOM writes and layout reads can cause **layout thrashing**.
* Group reads and writes when practical.
* `DocumentFragment` is useful for staging groups of DOM nodes before insertion.
* A large DOM can increase memory, style, layout, and rendering costs.
* Event delegation can reduce listener count when appropriate.
* High-frequency events such as `scroll` and `mousemove` require careful handling.
* `requestAnimationFrame()` is useful for visual updates.
* `transform` and `opacity` are commonly preferred for animations when they achieve the desired effect.
* Lazy loading and virtualization can reduce the amount of work performed initially.
* Removing a DOM node does not automatically remove JavaScript references to it.
* Observers and event listeners should be cleaned up when their lifecycle ends.
* Use browser DevTools and performance measurements instead of guessing.
* Avoid premature optimization.
* Optimize the actual bottleneck after measuring it.
* React does not eliminate browser rendering costs; it provides a declarative way to manage UI updates.
* In React and Next.js, understanding DOM performance helps you reason about large lists, rendering, client-side JavaScript, animations, and browser responsiveness.

The most important principle is:

> **Do less unnecessary work, batch what can be batched, avoid forced layout, and measure before optimizing.**
