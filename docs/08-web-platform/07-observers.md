# Observers

Observer APIs allow JavaScript to react to changes in the browser environment without repeatedly checking the same state.

They are useful when an application needs to respond to:

* Element visibility
* Element size changes
* DOM mutations

This topic combines:

* `IntersectionObserver`
* `ResizeObserver`
* `MutationObserver`

Although these APIs solve different problems, they share the same general pattern:

```text
Create Observer
      ↓
Observe Target
      ↓
Browser detects change
      ↓
Callback runs
      ↓
Process the change
      ↓
Disconnect when no longer needed
```

Observers are often preferable to manual polling because the browser can notify the application when the relevant condition changes.

---

# IntersectionObserver

`IntersectionObserver` monitors the intersection between a target element and a root.

A common use case is determining whether an element is visible in the viewport.

## Basic Example

```js id="4c2k7w"
const target =
  document.querySelector(
    "#target"
  );

const observer =
  new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        console.log({
          isIntersecting:
            entry.isIntersecting,

          ratio:
            entry.intersectionRatio
        });
      }
    }
  );

observer.observe(target);
```

When the target enters or leaves the observed intersection area, the callback receives an array of `IntersectionObserverEntry` objects.

## Intersection Ratio

The `intersectionRatio` represents the proportion of the target that is intersecting the root.

For example:

```js id="77cs4x"
const observer =
  new IntersectionObserver(
    (entries) => {
      const entry =
        entries[0];

      console.log(
        entry.intersectionRatio
      );
    }
  );
```

A value close to:

```text
0
```

means little or none of the target is intersecting.

A value close to:

```text
1
```

means the target is almost completely intersecting.

## Thresholds

The observer can be configured to notify the application at specific intersection ratios.

```js id="x7p2c9"
const observer =
  new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        console.log(
          entry.intersectionRatio
        );
      }
    },
    {
      threshold: 0.5
    }
  );
```

The callback becomes relevant when the observed visibility crosses the configured threshold.

Multiple thresholds can also be used:

```js id="1g5cyd"
const observer =
  new IntersectionObserver(
    callback,
    {
      threshold: [
        0,
        0.25,
        0.5,
        0.75,
        1
      ]
    }
  );
```

This allows an application to react at multiple visibility levels.

## Root

By default, the viewport is used as the observation root.

A different scrollable element can be supplied:

```js id="7a60a2"
const container =
  document.querySelector(
    "#scroll-container"
  );

const observer =
  new IntersectionObserver(
    callback,
    {
      root: container
    }
  );
```

This is useful when an element scrolls inside a container rather than the entire page.

## Root Margin

`rootMargin` expands or contracts the effective observation area.

```js id="y1vuwf"
const observer =
  new IntersectionObserver(
    callback,
    {
      rootMargin:
        "200px 0px"
    }
  );
```

A positive margin can cause the observer to report intersection earlier.

This is useful for preloading content before it becomes visible.

---

# Lazy Loading

A common use case is lazy loading images.

HTML:

```html id="ozg2uf"
<img
  data-src="/images/project.jpg"
  alt="Project preview"
>
```

JavaScript:

```js id="8yfxun"
const images =
  document.querySelectorAll(
    "img[data-src]"
  );

const observer =
  new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue;
        }

        const image =
          entry.target;

        image.src =
          image.dataset.src;

        observer.unobserve(
          image
        );
      }
    }
  );

images.forEach(
  (image) =>
    observer.observe(image)
);
```

The important pattern is:

```text
Element approaches viewport
        ↓
Observer callback
        ↓
Load resource
        ↓
Stop observing
```

This avoids repeatedly checking the element's position manually.

---

# Infinite Scrolling

An observer can also be used to detect when a sentinel reaches the viewport.

```html id="3zscwq"
<div id="load-more"></div>
```

```js id="xqp5pr"
const sentinel =
  document.querySelector(
    "#load-more"
  );

const observer =
  new IntersectionObserver(
    async (entries) => {
      if (
        !entries[0]
          .isIntersecting
      ) {
        return;
      }

      await loadMoreItems();
    },
    {
      rootMargin:
        "300px"
    }
  );

observer.observe(
  sentinel
);
```

The `rootMargin` allows the next data batch to begin loading before the user reaches the exact end of the list.

---

# ResizeObserver

`ResizeObserver` monitors changes to the size of an element.

This is different from observing the viewport.

## Basic Example

```js id="5lqz32"
const element =
  document.querySelector(
    "#panel"
  );

const observer =
  new ResizeObserver(
    (entries) => {
      for (const entry of entries) {
        console.log({
          width:
            entry.contentRect.width,

          height:
            entry.contentRect.height
        });
      }
    }
  );

observer.observe(element);
```

## Why ResizeObserver Matters

Traditional responsive logic often focuses on viewport size:

```js id="3n7e6v"
window.addEventListener(
  "resize",
  () => {
    console.log(
      window.innerWidth
    );
  }
);
```

But the viewport is not always the correct unit.

A reusable component may change size because:

* Its parent changed size.
* A sidebar opened.
* A grid changed columns.
* Content expanded.
* A user resized a surrounding container.

`ResizeObserver` allows the component to respond to its own dimensions.

---

# Component-Level Layout

For example:

```js id="l6t8fj"
const panel =
  document.querySelector(
    "#panel"
  );

const observer =
  new ResizeObserver(
    ([entry]) => {
      const width =
        entry.contentRect.width;

      if (width < 400) {
        entry.target.dataset.layout =
          "compact";
      } else {
        entry.target.dataset.layout =
          "wide";
      }
    }
  );

observer.observe(panel);
```

The component can now adapt based on its actual width.

---

# ResizeObserver Entries

A `ResizeObserverEntry` can expose dimension information.

```js id="0uw3pb"
const observer =
  new ResizeObserver(
    (entries) => {
      for (const entry of entries) {
        console.log(
          entry.contentRect.width
        );

        console.log(
          entry.contentRect.height
        );
      }
    }
  );
```

Modern implementations also expose more detailed box information, but `contentRect` is often sufficient for basic examples.

---

# Observing Multiple Elements

One observer can observe multiple elements:

```js id="q7stbf"
const observer =
  new ResizeObserver(
    (entries) => {
      for (const entry of entries) {
        console.log(
          entry.target,
          entry.contentRect.width
        );
      }
    }
  );

document
  .querySelectorAll(".card")
  .forEach((card) => {
    observer.observe(card);
  });
```

This avoids creating a separate observer instance for every element when the same callback logic can be shared.

---

# MutationObserver

`MutationObserver` monitors changes to the DOM tree.

It can detect:

* Added nodes
* Removed nodes
* Attribute changes
* Character data changes

## Basic Example

```js id="gnxvvr"
const container =
  document.querySelector(
    "#container"
  );

const observer =
  new MutationObserver(
    (mutations) => {
      for (const mutation of mutations) {
        console.log({
          type:
            mutation.type,

          added:
            mutation.addedNodes.length,

          removed:
            mutation.removedNodes.length
        });
      }
    }
  );

observer.observe(
  container,
  {
    childList: true,
    attributes: true,
    subtree: true
  }
);
```

---

# Observing Added and Removed Nodes

To detect nodes being added or removed:

```js id="hd1pxi"
observer.observe(
  container,
  {
    childList: true
  }
);
```

When a change occurs:

```js id="2n7p4c"
for (const mutation of mutations) {
  for (const node of mutation.addedNodes) {
    console.log(
      "Added:",
      node
    );
  }

  for (const node of mutation.removedNodes) {
    console.log(
      "Removed:",
      node
    );
  }
}
```

---

# Observing Attributes

To observe attribute changes:

```js id="zk3n7q"
observer.observe(
  container,
  {
    attributes: true
  }
);
```

The mutation record exposes the changed attribute:

```js id="a7f5ie"
for (const mutation of mutations) {
  console.log(
    mutation.attributeName
  );
}
```

You can also restrict observation to particular attributes:

```js id="pfaj7z"
observer.observe(
  container,
  {
    attributes: true,
    attributeFilter: [
      "class",
      "data-state"
    ]
  }
);
```

This is often preferable to observing every possible attribute mutation.

---

# Observing Descendants

Use `subtree: true` to observe changes inside descendants:

```js id="z4yf5k"
observer.observe(
  container,
  {
    childList: true,
    subtree: true
  }
);
```

Without `subtree`, only direct changes to the observed node are monitored.

---

# Observing Text Changes

Character data changes can be observed:

```js id="rcqlc1"
observer.observe(
  container,
  {
    characterData: true,
    subtree: true
  }
);
```

This should be used only when the application genuinely needs to react to text-node changes.

---

# MutationObserver Use Cases

Useful scenarios include:

* Integrating with third-party DOM changes
* Detecting dynamically inserted content
* Synchronizing external UI behavior
* Monitoring application-generated DOM mutations
* Building tooling or browser integrations

It should not automatically become the default way to synchronize application state.

If your own code controls the state causing the DOM change, it is usually cleaner to update the relevant state directly rather than observe your own mutation afterward.

---

# Polling vs Observers

A polling approach might repeatedly check the same condition:

```js id="pkp1uy"
const intervalId =
  setInterval(() => {
    checkElement();
  }, 100);
```

This repeatedly executes code even when nothing changed.

An observer can instead wait for the platform to notify the application:

```text id="p7r6uq"
Browser
   ↓
Relevant change
   ↓
Observer callback
```

This is usually clearer and more efficient for the types of changes these APIs are designed to observe.

---

# Observer Lifecycle

An observer should be disconnected when it is no longer needed.

```js id="fv3j6i"
observer.disconnect();
```

This is particularly important for:

* Single-page applications
* Long-lived pages
* Dynamically created components
* Repeated setup and teardown
* Components whose targets are removed from the DOM

---

# Unobserving Individual Targets

Some observer APIs also allow a specific target to stop being observed.

For `IntersectionObserver`:

```js id="c2whrf"
observer.unobserve(
  target
);
```

This is useful after a one-time operation:

```js id="2xapj2"
if (entry.isIntersecting) {
  loadContent();

  observer.unobserve(
    entry.target
  );
}
```

This reduces future callback work.

---

# Choosing the Correct Observer

The easiest mental model is:

```text id="d9m30e"
IntersectionObserver
→ "Is this element entering or leaving an observed area?"

ResizeObserver
→ "Did this element change size?"

MutationObserver
→ "Did this part of the DOM change?"
```

They are not interchangeable.

## IntersectionObserver

Use when the application cares about:

* Visibility
* Viewport intersection
* Scroll-related visibility
* Lazy loading
* Infinite scrolling

## ResizeObserver

Use when the application cares about:

* Element dimensions
* Component layout
* Container size
* Responsive behavior at component level

## MutationObserver

Use when the application cares about:

* DOM structure changes
* Attribute changes
* Dynamically inserted or removed nodes
* External DOM modifications

---

# Common Mistakes

## Using MutationObserver to Manage Your Own State

Avoid creating this relationship:

```text
Application State
   ↓
DOM Update
   ↓
MutationObserver
   ↓
Update Application State
```

This can create unnecessary complexity and even feedback loops.

Prefer:

```text
Application State
   ↓
Render
```

when the application owns the state.

## Using Scroll Events for Everything

For visibility detection, `IntersectionObserver` is often a better abstraction than manually calculating positions during every scroll event.

## Using Window Resize for Component Size

`window.resize` tells you about the viewport.

`ResizeObserver` tells you about an element.

Choose based on the actual requirement.

## Forgetting to Disconnect

Observers can continue running after the feature that created them is gone.

Clean them up:

```js id="3b6a78"
observer.disconnect();
```

## Doing Heavy Work in Observer Callbacks

Observer callbacks are still JavaScript execution.

Avoid unnecessarily expensive work inside them.

If expensive processing is required, consider batching or moving computation to an appropriate asynchronous mechanism.

---

# Performance Considerations

Observers are not automatically free.

Good usage includes:

```text id="oc6or0"
Observe only necessary targets
        ↓
Filter relevant changes
        ↓
Keep callbacks small
        ↓
Disconnect when finished
```

For `MutationObserver`, narrow configuration is particularly important.

Prefer:

```js id="a7svq9"
observer.observe(
  element,
  {
    childList: true,
    attributeFilter: [
      "class"
    ]
  }
);
```

over enabling every mutation type when it is unnecessary.

---

# Combining Observers

A component may legitimately need more than one observer.

For example:

```text id="4wqg9j"
IntersectionObserver
→ Start loading when visible

ResizeObserver
→ Adapt layout when size changes

MutationObserver
→ React to externally inserted content
```

Each observer should have a specific responsibility.

Do not combine unrelated concerns into one large callback.

---

# Best Practices

* Use the observer designed for the actual type of change.
* Prefer event-driven observation over unnecessary polling.
* Observe only the elements that need monitoring.
* Keep callbacks focused and inexpensive.
* Narrow `MutationObserver` configuration whenever possible.
* Disconnect observers when the feature is no longer active.
* Unobserve one-time targets when appropriate.
* Avoid using `MutationObserver` as a replacement for application state management.
* Consider browser support when targeting older environments.
* Test observer behavior with dynamically changing content.

# References

* Intersection Observer API
* IntersectionObserver
* Resize Observer API
* ResizeObserver
* MutationObserver
