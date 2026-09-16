# DOM Observers

## Introduction

Modern web applications often need to react when something changes in the browser environment.

For example:

* An element is added or removed from the DOM.
* An element's size changes.
* An element enters or leaves the viewport.
* An attribute changes.
* A section becomes visible while scrolling.
* Content changes dynamically.
* A component changes dimensions because of responsive layout.

JavaScript provides several **Observer APIs** for these situations.

The most important DOM-related observers are:

| Observer               | Watches                                                  |
| ---------------------- | -------------------------------------------------------- |
| `MutationObserver`     | Changes to the DOM tree, attributes, and text            |
| `IntersectionObserver` | Whether an element intersects a viewport or another root |
| `ResizeObserver`       | Changes to an element's size                             |

The basic idea is:

```text
Something changes
       ↓
Browser detects the change
       ↓
Observer callback runs
       ↓
JavaScript responds
```

Observers are generally better than repeatedly checking the DOM with timers.

---

# 1. What Is an Observer?

An **Observer** is an API that allows JavaScript to receive notifications when a particular condition or state changes.

Instead of repeatedly asking:

```javascript
setInterval(() => {
  // Did something change?
}, 1000);
```

you can tell the browser:

```javascript
observer.observe(target);
```

The browser then monitors the target and calls your callback when the relevant change occurs.

This is called an **event-driven** approach.

---

# 2. Why Observers Matter

Without observers, developers might use polling:

```javascript
setInterval(() => {
  const element = document.querySelector("#status");

  // Check whether something changed
}, 1000);
```

Polling has several problems:

* It runs even when nothing changes.
* It may detect changes late.
* It can waste CPU time.
* Choosing the correct interval is difficult.
* It does not naturally express what you actually want to observe.

With an observer:

```javascript
const observer = new MutationObserver(() => {
  console.log("The DOM changed.");
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
```

The browser handles the monitoring.

---

# 3. The Three Main DOM Observers

## `MutationObserver`

Detects changes to the DOM.

```text
DOM structure
Attributes
Text/content
```

---

## `IntersectionObserver`

Detects whether an element intersects:

```text
Viewport
or
Another root element
```

It is commonly used for:

* Lazy loading.
* Infinite scrolling.
* Scroll-triggered behavior.
* Visibility detection.
* Advertisement visibility tracking.

---

## `ResizeObserver`

Detects changes to an element's size.

It is useful for:

* Responsive components.
* Measuring dynamic layouts.
* Charts.
* Panels.
* Custom layout behavior.

---

# 4. MutationObserver

`MutationObserver` watches changes to a DOM tree.

Basic syntax:

```javascript
const observer = new MutationObserver((mutations) => {
  console.log(mutations);
});

observer.observe(target, options);
```

Example:

```javascript
const observer = new MutationObserver((mutations) => {
  console.log("DOM changed.");
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
```

Now the browser monitors the body and its descendants.

---

# 5. MutationObserver Callback

The callback receives an array of `MutationRecord` objects.

```javascript
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    console.log(mutation);
  }
});
```

Each record describes one observed mutation.

Important properties include:

```javascript
mutation.type
mutation.target
mutation.addedNodes
mutation.removedNodes
mutation.attributeName
mutation.oldValue
```

---

# 6. Mutation Types

A `MutationObserver` can monitor three main categories.

### `childList`

Detects nodes being added or removed.

```javascript
{
  childList: true
}
```

### `attributes`

Detects attribute changes.

```javascript
{
  attributes: true
}
```

### `characterData`

Detects changes to text nodes.

```javascript
{
  characterData: true
}
```

---

# 7. `childList`

Suppose:

```html
<ul id="projects"></ul>
```

JavaScript:

```javascript
const list = document.querySelector("#projects");

const observer = new MutationObserver((mutations) => {
  console.log("The list changed.");
});

observer.observe(list, {
  childList: true
});
```

Now:

```javascript
const item = document.createElement("li");

item.textContent = "Portfolio";

list.append(item);
```

The observer callback runs.

---

# 8. `subtree`

Without `subtree`:

```javascript
observer.observe(container, {
  childList: true
});
```

the observer watches direct children of `container`.

With:

```javascript
observer.observe(container, {
  childList: true,
  subtree: true
});
```

it also watches descendants.

Example:

```text
container
├── section
│   └── div
│       └── p
└── footer
```

With `subtree: true`, mutations inside:

```text
section
div
p
footer
```

can be observed.

---

# 9. Observing Attributes

You can monitor attribute changes:

```javascript
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    console.log("Changed attribute:", mutation.attributeName);
  }
});

observer.observe(element, {
  attributes: true
});
```

Then:

```javascript
element.setAttribute("data-status", "active");
```

The observer receives an attribute mutation.

---

# 10. Observing Specific Attributes

You can restrict observation to particular attributes.

```javascript
observer.observe(element, {
  attributes: true,
  attributeFilter: ["class", "data-status"]
});
```

Now changes to other attributes are ignored.

For example:

```javascript
element.classList.add("active");
```

can trigger the observer.

But:

```javascript
element.setAttribute("title", "Example");
```

does not trigger it because `title` is not in `attributeFilter`.

---

# 11. Getting the Old Attribute Value

If you need the previous value:

```javascript
observer.observe(element, {
  attributes: true,
  attributeOldValue: true
});
```

Then:

```javascript
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    console.log("Attribute:", mutation.attributeName);
    console.log("Old value:", mutation.oldValue);
  }
});
```

This can be useful when you need to compare the previous and current state.

---

# 12. Added Nodes

For `childList` mutations:

```javascript
mutation.addedNodes
```

contains nodes that were added.

Example:

```javascript
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      console.log("Added:", node);
    }
  }
});
```

---

# 13. Removed Nodes

Similarly:

```javascript
mutation.removedNodes
```

contains nodes that were removed.

Example:

```javascript
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.removedNodes) {
      console.log("Removed:", node);
    }
  }
});
```

---

# 14. MutationRecord `target`

The:

```javascript
mutation.target
```

property identifies the node on which the mutation occurred.

Example:

```javascript
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    console.log("Mutation target:", mutation.target);
  }
});
```

For a `childList` mutation, the target is the node whose children changed.

---

# 15. `characterData`

You can observe changes to text nodes:

```javascript
observer.observe(element, {
  characterData: true,
  subtree: true
});
```

For example, changing text in a descendant text node can generate a mutation record.

In practice, `childList` and `attributes` are often more useful for application-level DOM monitoring.

---

# 16. `disconnect()`

You can stop observing:

```javascript
observer.disconnect();
```

Example:

```javascript
const observer = new MutationObserver(() => {
  console.log("Changed.");
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

observer.disconnect();
```

After `disconnect()`, new mutations are no longer observed by that observer.

---

# 17. `takeRecords()`

A `MutationObserver` can have pending mutation records.

You can retrieve them with:

```javascript
const records = observer.takeRecords();
```

This returns the currently queued mutation records and removes them from the observer's queue.

This is more advanced and is mainly useful when you need explicit control over pending mutation records.

---

# 18. MutationObserver Is Asynchronous

Consider:

```javascript
const observer = new MutationObserver(() => {
  console.log("Observer callback");
});

observer.observe(document.body, {
  childList: true
});

console.log("Before mutation");

const paragraph = document.createElement("p");

document.body.append(paragraph);

console.log("After mutation");
```

The normal JavaScript execution happens first.

Conceptually:

```text
Before mutation
After mutation
Observer callback
```

The callback is not executed synchronously at the exact line where the mutation occurs.

Mutation observer notifications are delivered asynchronously by the browser.

---

# 19. Multiple Mutations Can Be Batched

Consider:

```javascript
const observer = new MutationObserver((mutations) => {
  console.log(mutations.length);
});

observer.observe(list, {
  childList: true
});

list.append(document.createElement("li"));
list.append(document.createElement("li"));
list.append(document.createElement("li"));
```

The observer callback can receive multiple mutation records.

Therefore, do not automatically assume:

```text
1 mutation = 1 callback
```

Instead think:

```text
Multiple DOM mutations
        ↓
Mutation records
        ↓
Observer callback
```

This batching behavior is important when designing efficient observer callbacks.

---

# 20. MutationObserver Complete Example

HTML:

```html
<ul id="projects"></ul>
<button id="add-project">Add Project</button>
```

JavaScript:

```javascript
const list = document.querySelector("#projects");
const button = document.querySelector("#add-project");

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === "childList") {
      console.log("Project list changed.");
    }
  }
});

observer.observe(list, {
  childList: true
});

button.addEventListener("click", () => {
  const item = document.createElement("li");

  item.textContent = "Osama Abu Motlaq Project";

  list.append(item);
});
```

When the button is clicked, the list changes and the observer receives the mutation.

---

# 21. IntersectionObserver

`IntersectionObserver` detects when an element intersects with a viewport or another scrolling container.

Basic syntax:

```javascript
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    console.log(entry.isIntersecting);
  }
});

observer.observe(element);
```

The browser then monitors the element.

---

# 22. What Does "Intersection" Mean?

Imagine:

```text
Viewport
┌────────────────────────────┐
│                            │
│       Target Element       │
│                            │
└────────────────────────────┘
```

If the target enters the viewport:

```text
Target
  ↓
Intersects viewport
  ↓
isIntersecting = true
```

When it leaves:

```text
Target
  ↓
No intersection
  ↓
isIntersecting = false
```

---

# 23. IntersectionObserver Callback

The callback receives:

```javascript
entries
```

Each entry is an `IntersectionObserverEntry`.

Example:

```javascript
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    console.log(entry);
  }
});
```

Important properties include:

```javascript
entry.target
entry.isIntersecting
entry.intersectionRatio
entry.boundingClientRect
entry.intersectionRect
entry.rootBounds
entry.time
```

---

# 24. `isIntersecting`

The simplest property is:

```javascript
entry.isIntersecting
```

Example:

```javascript
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      console.log("Osama Abu Motlaq's section is visible.");
    }
  }
});
```

This is commonly used for visibility-based behavior.

---

# 25. Observing an Element

HTML:

```html
<section id="about">
  About Osama Abu Motlaq
</section>
```

JavaScript:

```javascript
const section = document.querySelector("#about");

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      console.log("About section is visible.");
    }
  }
});

observer.observe(section);
```

---

# 26. Intersection Threshold

You can configure when the observer should report intersection changes.

```javascript
const observer = new IntersectionObserver(callback, {
  threshold: 0.5
});
```

A threshold of:

```text
0
```

means the observer can report when the element starts intersecting.

A threshold of:

```text
0.5
```

means a 50% intersection threshold.

A threshold of:

```text
1
```

means the element is fully intersecting.

Example:

```javascript
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    console.log(entry.intersectionRatio);
  }
}, {
  threshold: 0.5
});
```

---

# 27. Multiple Thresholds

You can provide an array:

```javascript
const observer = new IntersectionObserver(callback, {
  threshold: [0, 0.25, 0.5, 0.75, 1]
});
```

This allows the observer to notify your callback as the intersection ratio crosses those thresholds.

---

# 28. `root`

By default, the root is the browser viewport.

You can specify another scrolling container:

```javascript
const observer = new IntersectionObserver(callback, {
  root: container
});
```

Conceptually:

```text
Viewport
└── Scroll Container
    └── Target
```

The observer can use the scroll container as its intersection root.

---

# 29. `rootMargin`

You can expand or shrink the effective root area.

```javascript
const observer = new IntersectionObserver(callback, {
  rootMargin: "200px"
});
```

This can cause an element to be considered intersecting before it actually reaches the visible viewport.

This is extremely useful for lazy loading.

For example:

```text
Viewport
┌───────────────────────┐
│                       │
│       Visible         │
│                       │
└───────────────────────┘

      200px margin
─────────────────────────
      Target
```

The browser can begin work before the target becomes visible.

---

# 30. Lazy Loading Example

Suppose an image should load when it approaches the viewport.

HTML:

```html
<img
  class="lazy"
  data-src="/images/project.jpg"
  alt="Project"
/>
```

JavaScript:

```javascript
const images = document.querySelectorAll(".lazy");

const observer = new IntersectionObserver((entries, observer) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) {
      continue;
    }

    const image = entry.target;

    image.src = image.dataset.src;

    observer.unobserve(image);
  }
});

images.forEach((image) => {
  observer.observe(image);
});
```

The image begins loading when it enters the observed area.

---

# 31. `unobserve()`

You can stop observing a specific element:

```javascript
observer.unobserve(element);
```

Example:

```javascript
if (entry.isIntersecting) {
  loadContent(entry.target);

  observer.unobserve(entry.target);
}
```

This is useful when the action only needs to happen once.

---

# 32. `disconnect()`

To stop observing all targets:

```javascript
observer.disconnect();
```

Difference:

```javascript
observer.unobserve(element);
```

removes one target.

```javascript
observer.disconnect();
```

removes all observed targets.

---

# 33. Infinite Scrolling

`IntersectionObserver` is commonly used for infinite scrolling.

HTML:

```html
<div id="projects"></div>
<div id="load-more"></div>
```

The sentinel:

```html
<div id="load-more"></div>
```

is placed at the bottom.

JavaScript:

```javascript
const sentinel = document.querySelector("#load-more");

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      loadMoreProjects();
    }
  }
});

observer.observe(sentinel);
```

When the sentinel enters the viewport:

```text
Sentinel visible
      ↓
Observer callback
      ↓
Fetch more data
      ↓
Append projects
      ↓
Sentinel moves downward
      ↓
Repeat
```

---

# 34. Scroll Events vs IntersectionObserver

Traditional approach:

```javascript
window.addEventListener("scroll", () => {
  // Calculate positions
});
```

This can require frequent calculations.

With `IntersectionObserver`:

```javascript
const observer = new IntersectionObserver(callback);

observer.observe(element);
```

The browser handles intersection detection.

Use `IntersectionObserver` when the actual requirement is:

> "Tell me when this element intersects this area."

---

# 35. ResizeObserver

`ResizeObserver` detects changes to an element's dimensions.

Basic syntax:

```javascript
const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    console.log(entry.contentRect);
  }
});

observer.observe(element);
```

It is useful when you need to respond to the size of an element rather than the entire window.

---

# 36. Why `window.resize` Is Not Enough

You can listen for:

```javascript
window.addEventListener("resize", callback);
```

But this tells you that the viewport changed size.

It does not directly tell you that a specific element changed size.

For example:

```text
Viewport width
      ↓
CSS layout
      ↓
Sidebar width changes
      ↓
Card width changes
```

The viewport may not be the thing you actually care about.

`ResizeObserver` lets you observe the element itself.

---

# 37. Basic Resize Example

HTML:

```html
<div id="panel">
  Osama Abu Motlaq
</div>
```

JavaScript:

```javascript
const panel = document.querySelector("#panel");

const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    console.log("Width:", entry.contentRect.width);
    console.log("Height:", entry.contentRect.height);
  }
});

observer.observe(panel);
```

Whenever the panel's size changes, the callback receives an entry.

---

# 38. ResizeObserverEntry

The callback receives `ResizeObserverEntry` objects.

Useful properties include:

```javascript
entry.target
entry.contentRect
entry.contentBoxSize
entry.borderBoxSize
entry.devicePixelContentBoxSize
```

The exact box information you use depends on what measurement you need.

---

# 39. `contentRect`

A common simple approach is:

```javascript
entry.contentRect.width
entry.contentRect.height
```

Example:

```javascript
const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const { width, height } = entry.contentRect;

    console.log({
      width,
      height
    });
  }
});
```

---

# 40. ResizeObserver and Responsive Components

Imagine a component:

```text
┌────────────────────────────┐
│                            │
│       Dashboard Panel      │
│                            │
└────────────────────────────┘
```

Its width changes because:

* Sidebar opens.
* Sidebar closes.
* Window resizes.
* Parent layout changes.
* Content changes.
* CSS grid changes.

A `ResizeObserver` can detect the actual size of the panel.

```javascript
const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    if (entry.contentRect.width < 600) {
      console.log("Use compact layout.");
    } else {
      console.log("Use wide layout.");
    }
  }
});
```

---

# 41. ResizeObserver vs `getBoundingClientRect()`

`getBoundingClientRect()` reads the current geometry:

```javascript
const rect = element.getBoundingClientRect();

console.log(rect.width);
```

It does not continuously observe changes.

`ResizeObserver` watches for size changes:

```javascript
const observer = new ResizeObserver((entries) => {
  // React when size changes
});
```

Think:

```text
getBoundingClientRect()
    ↓
"What is the size now?"

ResizeObserver
    ↓
"Tell me when the size changes."
```

---

# 42. ResizeObserver vs MutationObserver

These APIs monitor different things.

### MutationObserver

```text
DOM structure
attributes
text nodes
```

### ResizeObserver

```text
Element dimensions
```

Changing an element's size does not necessarily mean that its DOM structure changed.

For example, CSS can change:

```css
width: 500px;
```

to:

```css
width: 300px;
```

without modifying the DOM tree.

A `ResizeObserver` is appropriate for that situation.

---

# 43. ResizeObserver vs IntersectionObserver

They answer different questions.

### IntersectionObserver

> Is this element intersecting a particular area?

```javascript
entry.isIntersecting
```

### ResizeObserver

> Did this element's size change?

```javascript
entry.contentRect.width
```

Example:

```text
IntersectionObserver
    ↓
Visibility / intersection

ResizeObserver
    ↓
Dimensions
```

---

# 44. ResizeObserver Complete Example

```javascript
const panel = document.querySelector("#panel");

const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const width = entry.contentRect.width;

    if (width < 500) {
      entry.target.classList.add("compact");
    } else {
      entry.target.classList.remove("compact");
    }
  }
});

observer.observe(panel);
```

The component's CSS class changes according to its actual size.

---

# 45. Observer Lifecycle

Most observer APIs follow a similar lifecycle.

```text
1. Create observer
        ↓
2. Observe target
        ↓
3. Browser monitors target
        ↓
4. Change occurs
        ↓
5. Callback receives information
        ↓
6. Optionally stop observing
```

Example:

```javascript
const observer = new ResizeObserver(callback);

observer.observe(element);

// Later
observer.unobserve(element);

// Or stop everything
observer.disconnect();
```

---

# 46. Observer Callbacks Should Be Small

Observer callbacks can execute frequently.

Avoid expensive work:

```javascript
const observer = new ResizeObserver(() => {
  // Extremely expensive calculation
  // Huge DOM update
  // Large synchronous operation
});
```

Prefer:

```javascript
const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    updateLayout(entry);
  }
});
```

Keep the callback focused on the actual observation.

---

# 47. Avoid Observer Feedback Loops

Be careful when the observer changes the same thing it is observing.

Example:

```javascript
const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    entry.target.style.width = `${entry.contentRect.width + 10}px`;
  }
});
```

The callback changes the element's size.

That can trigger another resize.

Conceptually:

```text
Resize
 ↓
Callback
 ↓
Change size
 ↓
Resize
 ↓
Callback
 ↓
Change size
 ↓
...
```

Avoid uncontrolled feedback loops.

---

# 48. Observer Cleanup

Observers can retain references to observed targets and callbacks.

If an observer is no longer needed, disconnect it:

```javascript
observer.disconnect();
```

This is especially important in long-lived applications.

In React, cleanup is particularly important when an observer is created inside an effect.

---

# 49. Observers and React

This topic is important for React developers.

React components have a lifecycle.

If you create an observer inside an effect:

```jsx
useEffect(() => {
  const observer = new ResizeObserver(() => {
    // ...
  });

  observer.observe(element);

  return () => {
    observer.disconnect();
  };
}, []);
```

The cleanup function prevents the observer from continuing after the component is unmounted.

The pattern is:

```text
Component mounts
      ↓
Create observer
      ↓
Observe DOM element
      ↓
Component unmounts
      ↓
Disconnect observer
```

---

# 50. React + IntersectionObserver

A common React pattern is:

```jsx
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        console.log("Section visible.");
      }
    }
  });

  if (sectionRef.current) {
    observer.observe(sectionRef.current);
  }

  return () => {
    observer.disconnect();
  };
}, []);
```

This combines:

```text
React
+
useEffect
+
useRef
+
IntersectionObserver
```

Understanding DOM observers therefore has practical value when learning React.

---

# 51. React + ResizeObserver

Example:

```jsx
useEffect(() => {
  const element = panelRef.current;

  if (!element) {
    return;
  }

  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      console.log(entry.contentRect.width);
    }
  });

  observer.observe(element);

  return () => {
    observer.disconnect();
  };
}, []);
```

The DOM observer handles browser-level measurement.

React handles component state and rendering.

---

# 52. React Should Still Control UI State

An observer can detect a browser change:

```text
Element enters viewport
```

but React state can represent the application state:

```jsx
const [visible, setVisible] = useState(false);
```

Then:

```text
Observer
   ↓
setVisible(true)
   ↓
React state
   ↓
Render
```

This is usually cleaner than manually manipulating DOM styles or HTML inside the observer.

---

# 53. Observers and Next.js

Next.js uses React, so the same React principles apply.

Browser-only APIs such as:

```javascript
MutationObserver
IntersectionObserver
ResizeObserver
```

require a browser environment.

They are not available during normal server-side rendering.

Therefore, when using them in a client component, they are typically created after the component mounts, for example through:

```jsx
useEffect(...)
```

and the component may need:

```javascript
"use client";
```

when the component otherwise would be a Server Component.

---

# 54. Server vs Browser

This distinction is important in Next.js.

The server does not have the normal browser DOM.

Therefore code such as:

```javascript
document.querySelector("#projects");
```

or:

```javascript
new IntersectionObserver(...)
```

belongs to the browser environment.

Think:

```text
Next.js Server
    ↓
No normal browser DOM

Browser Client
    ↓
DOM
    ↓
Observers available
```

---

# 55. MutationObserver vs IntersectionObserver vs ResizeObserver

| Feature                       | MutationObserver | IntersectionObserver        | ResizeObserver         |
| ----------------------------- | ---------------- | --------------------------- | ---------------------- |
| Watches DOM changes           | Yes              | No                          | No                     |
| Watches attributes            | Yes              | No                          | No                     |
| Watches added/removed nodes   | Yes              | No                          | No                     |
| Watches viewport intersection | No               | Yes                         | No                     |
| Watches element size          | No               | No                          | Yes                    |
| Common use                    | Dynamic DOM      | Visibility                  | Responsive measurement |
| Main callback object          | `MutationRecord` | `IntersectionObserverEntry` | `ResizeObserverEntry`  |
| Stop one target               | `unobserve()`    | `unobserve()`               | `unobserve()`          |
| Stop all                      | `disconnect()`   | `disconnect()`              | `disconnect()`         |

---

# 56. Which Observer Should You Use?

Ask one question:

### "What exactly changed?"

If the answer is:

```text
The DOM structure or attributes changed
```

Use:

```javascript
MutationObserver
```

If the answer is:

```text
The element entered or left an area
```

Use:

```javascript
IntersectionObserver
```

If the answer is:

```text
The element's dimensions changed
```

Use:

```javascript
ResizeObserver
```

---

# 57. Observer vs Event Listener

An event listener responds to an event:

```javascript
button.addEventListener("click", handleClick);
```

An observer monitors a condition or category of changes:

```javascript
observer.observe(element);
```

Conceptually:

```text
Event Listener
    ↓
"Something happened."

Observer
    ↓
"Something I am monitoring changed."
```

Both are important event-driven browser APIs.

---

# 58. Observer vs Polling

### Polling

```javascript
setInterval(() => {
  checkSomething();
}, 1000);
```

The application repeatedly asks:

> "Did something change?"

### Observer

```javascript
observer.observe(element);
```

The application asks the browser:

> "Notify me when the relevant thing changes."

This is generally a better abstraction when an appropriate observer API exists.

---

# 59. Common Mistakes

## Mistake 1: Forgetting cleanup

```javascript
const observer = new ResizeObserver(callback);

observer.observe(element);
```

and never disconnecting it when it is no longer needed.

Prefer:

```javascript
observer.disconnect();
```

when the observer's lifetime ends.

---

## Mistake 2: Confusing the observer with the observed element

```javascript
const observer = new IntersectionObserver(callback);

observer.observe(element);
```

The observer is the monitoring object.

The element is the target.

```text
Observer
   │
   └── observes → Element
```

---

## Mistake 3: Assuming every mutation triggers an immediate callback

Mutation records can be batched.

Do not build logic that assumes:

```text
one mutation
=
one callback
```

---

## Mistake 4: Using `MutationObserver` to detect size changes

If CSS changes an element's dimensions, use:

```javascript
ResizeObserver
```

rather than relying on DOM mutations.

---

## Mistake 5: Using scroll handlers for every visibility problem

If the requirement is:

> "Tell me when this element enters the viewport."

Consider:

```javascript
IntersectionObserver
```

instead of manually calculating scroll positions.

---

## Mistake 6: Creating observer feedback loops

Be careful when the observer changes the same property it observes.

---

## Mistake 7: Doing expensive work inside callbacks

Observers can fire repeatedly.

Keep callbacks efficient.

---

# 60. Practical Decision Guide

```text
What are you watching?
        │
        ├── DOM nodes/attributes/text
        │       ↓
        │   MutationObserver
        │
        ├── Viewport/root intersection
        │       ↓
        │   IntersectionObserver
        │
        └── Element dimensions
                ↓
            ResizeObserver
```

This decision tree is more useful than memorizing API names.

---

# 61. Quick Reference

### MutationObserver

```javascript
const observer = new MutationObserver((mutations) => {
  console.log(mutations);
});

observer.observe(element, {
  childList: true,
  subtree: true,
  attributes: true
});

observer.disconnect();
```

---

### IntersectionObserver

```javascript
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      console.log("Visible");
    }
  }
});

observer.observe(element);

observer.unobserve(element);

observer.disconnect();
```

---

### ResizeObserver

```javascript
const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    console.log(entry.contentRect.width);
  }
});

observer.observe(element);

observer.unobserve(element);

observer.disconnect();
```

---

# 62. Mental Model

The three main observers can be remembered as:

```text
MutationObserver
"What changed in the DOM?"

IntersectionObserver
"Did this element enter or leave this area?"

ResizeObserver
"Did this element change size?"
```

Or even more simply:

```text
Mutation
    ↓
DOM structure/state

Intersection
    ↓
Visibility/position relationship

Resize
    ↓
Dimensions
```

---

# Key Takeaways

* Observer APIs let JavaScript react to browser changes without continuously polling.
* `MutationObserver` monitors DOM mutations.
* `IntersectionObserver` monitors intersection with a viewport or root.
* `ResizeObserver` monitors element size changes.
* Mutation records are delivered asynchronously and can be batched.
* `IntersectionObserver` is useful for lazy loading, infinite scrolling, and visibility detection.
* `ResizeObserver` observes an element's actual dimensions rather than only viewport resizing.
* `observe()` starts monitoring.
* `unobserve()` stops monitoring one target.
* `disconnect()` stops monitoring all targets.
* Observer callbacks should remain efficient.
* Avoid feedback loops where an observer modifies the property it is observing.
* Always consider cleanup for observers whose lifetime is tied to a component or feature.
* In React, observers are commonly created inside `useEffect()` and cleaned up in the effect's cleanup function.
* In Next.js, browser-only observer APIs belong on the client side rather than during server rendering.
* `DocumentFragment`, observers, and other DOM APIs are useful foundational knowledge even though React normally manages the DOM for you.

The core mental model is:

```text
MutationObserver
    → DOM changed

IntersectionObserver
    → Intersection changed

ResizeObserver
    → Size changed
```
