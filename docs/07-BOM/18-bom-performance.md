# Browser Performance

Browser performance is the practice of building web applications that respond quickly, render smoothly, use resources efficiently, and remain responsive under realistic conditions.

Performance is not one single metric.

A browser application can be slow because of:

* JavaScript execution
* Rendering
* Layout calculations
* Network requests
* Large assets
* Excessive DOM work
* Memory usage
* Frequent event handlers
* Long tasks
* Inefficient React rendering
* Excessive background work

The browser provides several APIs for observing and measuring performance.

Important APIs include:

```js id="3k8z1f"
performance
PerformanceObserver
requestAnimationFrame()
```

Related browser features include:

```text id="8p7m2c"
Page Visibility
Timers
Network APIs
Resource loading
DOM
Rendering
```

The most important principle is:

> Do not optimize based on guesses. Measure first, identify the bottleneck, then optimize the relevant part.

---

# 1. Performance Is More Than Speed

A useful performance model is:

```text id="m8c4p2"
Performance
│
├── Loading
│
├── Runtime
│
├── Rendering
│
├── Interaction
│
├── Memory
│
└── Network
```

Examples:

### Loading

How quickly the application becomes useful.

### Runtime

How efficiently JavaScript executes.

### Rendering

How efficiently the browser produces pixels.

### Interaction

How quickly the interface responds to user input.

### Memory

How much memory the application retains and whether it leaks.

### Network

How efficiently resources and API requests are transferred.

---

# 2. The `performance` Object

The browser exposes:

```js id="y3p9m4"
performance
```

Example:

```js id="7x2m8c"
console.log(performance);
```

The `Performance` interface provides APIs for measuring and observing performance-related information.

Common features include:

```js id="q8m3v1"
performance.now()
performance.mark()
performance.measure()
performance.getEntries()
performance.getEntriesByName()
performance.getEntriesByType()
```

---

# 3. `performance.now()`

`performance.now()` measures elapsed time using a high-resolution monotonic clock.

Example:

```js id="m4c7x2"
const start = performance.now();

doWork();

const end = performance.now();

console.log(
  `Duration: ${end - start}ms`
);
```

This is useful for measuring how long an operation takes.

---

# 4. Why `performance.now()` Is Different from `Date.now()`

`Date.now()` represents wall-clock time.

```js id="p7m2c5"
Date.now();
```

`performance.now()` is designed for measuring elapsed time.

```js id="x3m8v1"
performance.now();
```

Conceptually:

```text id="k5c7m2"
Date.now()
→ current clock time

performance.now()
→ elapsed-time measurement
```

When benchmarking code, prefer:

```js id="r8m2x4"
performance.now()
```

---

# 5. Monotonic Timing

Performance timing is based on a monotonic clock.

That means the elapsed-time measurement is not intended to jump backward because the system clock changes.

For example:

```js id="v2m7c4"
const start = performance.now();

doWork();

const duration =
  performance.now() - start;
```

is appropriate for duration measurements.

---

# 6. Simple Benchmark

You can measure a block of work:

```js id="j4c8m2"
const start = performance.now();

for (let i = 0; i < 1_000_000; i++) {
  Math.sqrt(i);
}

const end = performance.now();

console.log(
  `Execution time: ${
    end - start
  }ms`
);
```

The result depends on the browser, device, CPU, system load, and code.

Therefore, benchmark results are environment-dependent.

---

# 7. Do Not Trust One Benchmark Run

Suppose:

```js id="h7m2c5"
const start = performance.now();

doWork();

const duration =
  performance.now() - start;
```

You run it once.

That does not establish a reliable performance conclusion.

Results can vary because of:

* CPU scheduling
* thermal conditions
* background applications
* browser optimizations
* JIT compilation
* garbage collection
* cache state

For meaningful measurements, use repeated runs and realistic conditions.

---

# 8. Warm-Up Effects

Modern JavaScript engines optimize frequently executed code.

This means the first execution can behave differently from later executions.

Example:

```js id="n5c8x2"
for (let i = 0; i < 10; i++) {
  benchmark();
}
```

The later iterations may not be representative of the first.

This is another reason professional benchmarks use carefully designed methodology.

---

# 9. `performance.mark()`

Performance marks let you create named points in the performance timeline.

Example:

```js id="p3m7c9"
performance.mark("start-work");

doWork();

performance.mark("end-work");
```

The browser records the marks.

---

# 10. Reading Performance Marks

You can inspect them:

```js id="q8m2v5"
const marks =
  performance.getEntriesByType(
    "mark"
  );

console.log(marks);
```

Each mark is represented as a performance entry.

---

# 11. `performance.measure()`

`measure()` creates a duration between marks.

Example:

```js id="c4m8x2"
performance.mark("start-work");

doWork();

performance.mark("end-work");

performance.measure(
  "work-duration",
  "start-work",
  "end-work"
);
```

Now:

```js id="m7p3c5"
const measures =
  performance.getEntriesByType(
    "measure"
  );

console.log(measures);
```

The browser records the duration.

---

# 12. Reading a Specific Measure

You can retrieve a named entry:

```js id="v2c8m4"
const measure =
  performance.getEntriesByName(
    "work-duration"
  );

console.log(measure);
```

The result is an array of matching entries.

---

# 13. Why Marks and Measures Are Useful

Compare:

```js id="x5m8p2"
const start = performance.now();

doWork();

const duration =
  performance.now() - start;
```

with:

```js id="j3c7m9"
performance.mark("start");

doWork();

performance.mark("end");

performance.measure(
  "do-work",
  "start",
  "end"
);
```

The second approach creates named entries in the performance timeline.

This becomes useful for:

* profiling application phases
* instrumentation
* performance dashboards
* debugging slow operations

---

# 14. Clearing Marks and Measures

You can clear entries when they are no longer needed.

```js id="q7m3c8"
performance.clearMarks();
performance.clearMeasures();
```

Or by name:

```js id="m4c8x2"
performance.clearMarks(
  "start"
);

performance.clearMeasures(
  "do-work"
);
```

This can help prevent unnecessary accumulation during long-running instrumentation.

---

# 15. `performance.getEntries()`

Get performance entries:

```js id="x8m2v5"
const entries =
  performance.getEntries();

console.log(entries);
```

This can include different types of performance information depending on the browser and page.

---

# 16. `getEntriesByType()`

Retrieve entries by type:

```js id="p4c7m2"
performance.getEntriesByType(
  "resource"
);
```

Examples of performance entry categories can include:

```text id="j8m3v5"
navigation
resource
paint
mark
measure
```

Available entry types vary depending on browser support and context.

---

# 17. `getEntriesByName()`

Retrieve entries by name:

```js id="n5m8c3"
performance.getEntriesByName(
  "do-work"
);
```

This is useful when your application has created named marks and measures.

---

# 18. Performance Entries

Performance APIs represent measurements through performance entries.

A generic conceptual structure looks like:

```text id="c8m2p5"
PerformanceEntry
│
├── name
├── entryType
├── startTime
└── duration
```

Specific entry interfaces can provide additional properties.

---

# 19. `entryType`

Example:

```js id="x7m3c8"
performance.mark("demo");

const entry =
  performance.getEntriesByName(
    "demo"
  )[0];

console.log(entry.entryType);
```

Output:

```text id="j4p8m2"
mark
```

The entry type describes what kind of performance record it is.

---

# 20. `startTime`

Performance entries generally include:

```js id="m2c7v5"
entry.startTime
```

This represents when the entry occurred relative to the relevant performance time origin.

It is not necessarily a Unix timestamp.

---

# 21. `duration`

Performance entries can expose:

```js id="q8m3x2"
entry.duration
```

For a measurement:

```js id="c5p7m8"
console.log(
  measure.duration
);
```

This gives the recorded duration in milliseconds.

---

# 22. Performance Resource Timing

The browser can expose timing information about resources such as:

* scripts
* stylesheets
* images
* fonts
* fetch/XHR resources

Example:

```js id="v4m8c2"
const resources =
  performance.getEntriesByType(
    "resource"
  );

for (const resource of resources) {
  console.log(
    resource.name,
    resource.duration
  );
}
```

This can help identify slow resources.

---

# 23. Resource Timing Example

Suppose:

```text id="n3m7c8"
https://example.com/app.js
```

takes too long to load.

Resource Timing can help reveal that.

```js id="p5c8m2"
const resources =
  performance.getEntriesByType(
    "resource"
  );

for (const resource of resources) {
  if (
    resource.name.endsWith(
      "/app.js"
    )
  ) {
    console.log(
      resource.duration
    );
  }
}
```

---

# 24. Network Performance Breakdown

Resource timing can expose various timing phases depending on the resource entry.

Conceptually:

```text id="x7m3c2"
DNS
 ↓
Connection
 ↓
Request
 ↓
Response
 ↓
Resource complete
```

Specific timing properties depend on the entry type and browser behavior.

---

# 25. `PerformanceResourceTiming`

Resource entries can provide detailed information such as:

```js id="m8c3v5"
resource.fetchStart
resource.responseStart
resource.responseEnd
```

Example:

```js id="q2m7c4"
const resources =
  performance.getEntriesByType(
    "resource"
  );

for (const resource of resources) {
  console.log({
    name: resource.name,
    start: resource.startTime,
    duration: resource.duration,
    fetchStart: resource.fetchStart,
    responseEnd: resource.responseEnd,
  });
}
```

This is useful for diagnosing network performance.

---

# 26. Resource Timing and Cross-Origin Resources

Detailed timing information for cross-origin resources can be restricted unless the server provides the appropriate timing response policy.

The relevant mechanism is:

```http id="v7m2c5"
Timing-Allow-Origin
```

This helps prevent exposing detailed timing information across origins without permission.

---

# 27. Performance Paint Timing

The browser can expose paint-related entries.

Example:

```js id="x4m8c2"
const paints =
  performance.getEntriesByType(
    "paint"
  );

console.log(paints);
```

Common paint entry names include:

```text id="m5c7p2"
first-paint
first-contentful-paint
```

where supported.

---

# 28. First Paint

First Paint represents a point at which the browser performed its first rendering of content.

It is a rendering milestone.

This does not necessarily mean that the page is useful to the user.

---

# 29. First Contentful Paint

First Contentful Paint (FCP) measures when the browser renders the first piece of meaningful content such as text, an image, or other content from the page.

FCP is a user-perceived loading metric.

A faster FCP generally means the user sees content sooner.

---

# 30. Reading Paint Entries

Example:

```js id="p8m3c5"
const paints =
  performance.getEntriesByType(
    "paint"
  );

for (const paint of paints) {
  console.log(
    paint.name,
    paint.startTime
  );
}
```

This can provide low-level timing information.

For production performance work, browser DevTools and standardized web performance metrics are often more useful than manually reading every entry.

---

# 31. Largest Contentful Paint

Largest Contentful Paint (LCP) is a performance metric measuring when the largest relevant content element becomes rendered in the viewport.

It is commonly used as a loading performance metric.

LCP can help identify pages where the main content takes too long to appear.

---

# 32. Cumulative Layout Shift

Cumulative Layout Shift (CLS) measures unexpected visual movement during page loading and use.

For example:

```text id="r6m2c8"
User tries to click
    ↓
Content moves
    ↓
User clicks wrong location
```

This is a UX problem as well as a performance metric.

Common causes include:

* images without dimensions
* dynamically inserted content
* late-loading fonts
* ads or embeds changing size

---

# 33. Interaction to Next Paint

Interaction to Next Paint (INP) measures interaction responsiveness.

It is concerned with how quickly interactions such as:

* clicks
* taps
* keyboard actions

produce the next rendered response.

This is closely related to JavaScript execution and rendering performance.

---

# 34. Core Web Vitals

A useful group of user-centric metrics includes:

```text id="m7c3x9"
LCP
CLS
INP
```

These measure different aspects of the user experience:

```text id="p5m8c2"
LCP
→ loading

CLS
→ visual stability

INP
→ responsiveness
```

These are not the only useful performance signals, but they are important modern metrics.

---

# 35. `PerformanceObserver`

`PerformanceObserver` allows JavaScript to observe performance entries as they are generated.

Example:

```js id="v4m7p2"
const observer =
  new PerformanceObserver(
    (list) => {
      for (
        const entry
        of list.getEntries()
      ) {
        console.log(entry);
      }
    }
  );
```

Then observe a supported entry type.

---

# 36. Observing Paint Entries

Example:

```js id="q8c3m5"
const observer =
  new PerformanceObserver(
    (list) => {
      for (
        const entry
        of list.getEntries()
      ) {
        console.log(
          entry.name,
          entry.startTime
        );
      }
    }
  );

observer.observe({
  type: "paint",
  buffered: true,
});
```

The `buffered` option allows previously recorded matching entries to be delivered when supported for the entry type.

---

# 37. Observing Largest Contentful Paint

Example:

```js id="m3p7c8"
const observer =
  new PerformanceObserver(
    (list) => {
      for (
        const entry
        of list.getEntries()
      ) {
        console.log(
          "LCP:",
          entry.startTime
        );
      }
    }
  );

observer.observe({
  type: "largest-contentful-paint",
  buffered: true,
});
```

A production implementation must account for the metric's lifecycle and browser support.

---

# 38. Observing Long Tasks

Long JavaScript tasks can block the main thread.

A performance observer can observe:

```text id="c7m2v8"
longtask
```

where supported.

Example:

```js id="x5p8m3"
const observer =
  new PerformanceObserver(
    (list) => {
      for (
        const entry
        of list.getEntries()
      ) {
        console.log(
          "Long task:",
          entry.duration
        );
      }
    }
  );

observer.observe({
  type: "longtask",
  buffered: true,
});
```

---

# 39. What Is a Long Task?

A long task is a task that occupies the main thread for an extended period.

Long tasks can make the UI feel unresponsive.

Conceptually:

```text id="m8c3p7"
User clicks
    ↓
JavaScript task starts
    ↓
Too much work
    ↓
Browser cannot respond promptly
    ↓
User perceives lag
```

Long JavaScript tasks are one of the most important frontend performance problems.

---

# 40. The Main Thread

The browser's main thread performs important work such as:

* JavaScript
* DOM work
* style calculation
* layout
* paint coordination
* user interaction processing

Heavy JavaScript can block these activities.

---

# 41. Blocking the Main Thread

Example:

```js id="q4m8x2"
const start = Date.now();

while (
  Date.now() - start < 5000
) {
  // Block the main thread.
}
```

During this period:

* clicks may not respond
* scrolling may freeze
* animations may stop
* timers may be delayed

This is a performance problem.

---

# 42. Long Tasks and React

In React, long tasks can come from:

* expensive rendering
* large lists
* complex calculations
* excessive synchronous state updates
* expensive derived computations
* third-party libraries

The solution is not always "use less React."

First identify what is actually expensive.

---

# 43. `requestAnimationFrame()`

`requestAnimationFrame()` schedules a callback for animation work aligned with the browser's rendering cycle.

Example:

```js id="g7m3c8"
function animate() {
  updateUI();

  requestAnimationFrame(
    animate
  );
}

requestAnimationFrame(animate);
```

This is better suited to visual animation than:

```js id="x8c2m5"
setInterval(
  updateUI,
  16
);
```

---

# 44. Why `requestAnimationFrame()` Helps

The browser controls when the callback executes relative to rendering.

Conceptually:

```text id="m4p8c2"
JavaScript
   ↓
requestAnimationFrame
   ↓
Browser rendering opportunity
   ↓
Paint
```

This helps avoid manually guessing a frame interval.

---

# 45. `requestAnimationFrame()` Receives a Timestamp

Example:

```js id="q6m2v8"
function animate(timestamp) {
  console.log(timestamp);

  requestAnimationFrame(
    animate
  );
}

requestAnimationFrame(
  animate
);
```

The timestamp can be used to calculate elapsed animation time.

---

# 46. Time-Based Animation

Do not assume:

```js id="p8m3c7"
position += 1;
```

moves at the same physical speed on every device.

Instead, use elapsed time.

Example:

```js id="x5c7m2"
let startTime = null;

function animate(timestamp) {
  if (startTime === null) {
    startTime = timestamp;
  }

  const elapsed =
    timestamp - startTime;

  const position =
    elapsed * 0.1;

  moveElement(position);

  requestAnimationFrame(
    animate
  );
}

requestAnimationFrame(
  animate
);
```

Now the animation is based on elapsed time rather than assuming a fixed frame count.

---

# 47. Canceling an Animation Frame

Store the frame ID:

```js id="m8q3c5"
let frameId;

function animate() {
  frameId =
    requestAnimationFrame(
      animate
    );
}

frameId =
  requestAnimationFrame(
    animate
  );
```

Cancel:

```js id="v4m7p2"
cancelAnimationFrame(
  frameId
);
```

This matters when animations have a defined lifecycle.

---

# 48. Page Visibility and Performance

The Page Visibility API exposes:

```js id="x2c8m5"
document.hidden
```

and:

```js id="p7m3v9"
visibilitychange
```

When a page becomes hidden, some background work may no longer be useful.

Example:

```js id="m8c2q4"
document.addEventListener(
  "visibilitychange",
  () => {
    if (document.hidden) {
      pauseWork();
    } else {
      resumeWork();
    }
  }
);
```

This can reduce unnecessary CPU and battery consumption.

---

# 49. Pause Nonessential Work

Potential candidates include:

* animations
* polling
* expensive calculations
* visual updates
* noncritical synchronization

Do not pause work automatically if the application's business requirements need it to continue.

---

# 50. Visibility and Video/Animation

For example:

```js id="x3m8c7"
document.addEventListener(
  "visibilitychange",
  () => {
    if (document.hidden) {
      video.pause();
    }
  }
);
```

This can improve resource usage.

The same general principle applies to custom animations.

---

# 51. Timers and Performance

Background timers can be throttled by browsers.

Therefore:

```js id="m5c8p2"
setInterval(
  performWork,
  1000
);
```

does not guarantee exact execution timing.

For countdowns:

```text id="p7m3c8"
Track actual elapsed time
```

instead of assuming every callback represents exactly one second.

---

# 52. Scroll Performance

Scroll events can fire frequently.

Bad:

```js id="x8m2c4"
window.addEventListener(
  "scroll",
  () => {
    performExpensiveWork();
  }
);
```

Better options include:

* `requestAnimationFrame`
* throttling
* `IntersectionObserver`
* minimizing DOM work

---

# 53. Scroll + `requestAnimationFrame()`

Example:

```js id="q4m7p2"
let scheduled = false;

window.addEventListener(
  "scroll",
  () => {
    if (scheduled) {
      return;
    }

    scheduled = true;

    requestAnimationFrame(() => {
      scheduled = false;

      updateScrollUI();
    });
  }
);
```

This allows many scroll events to be coalesced into one rendering update.

---

# 54. Resize Performance

Window resize can fire many times.

A simple handler:

```js id="m8c3v7"
window.addEventListener(
  "resize",
  () => {
    updateLayout();
  }
);
```

may be sufficient for lightweight work.

For expensive work, consider:

* throttling
* debouncing
* `requestAnimationFrame`
* `ResizeObserver`

---

# 55. `ResizeObserver`

If you need to know when an element's size changes, use:

```js id="p3m7c8"
const observer =
  new ResizeObserver(
    (entries) => {
      for (const entry of entries) {
        console.log(
          entry.contentRect
        );
      }
    }
  );
```

Then:

```js id="v5c8m2"
observer.observe(element);
```

This is usually more appropriate than measuring an element every time the window resizes.

---

# 56. `IntersectionObserver`

To detect whether an element enters or leaves the viewport:

```js id="x7m3p2"
const observer =
  new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        console.log(
          entry.isIntersecting
        );
      }
    }
  );

observer.observe(element);
```

This can replace many manual scroll calculations.

---

# 57. Why Observers Can Improve Architecture

Instead of:

```text id="m4c8v2"
Every scroll event
   ↓
Calculate position
   ↓
Check visibility
```

use:

```text id="q8p3m5"
Browser observes visibility
   ↓
Callback only when relevant
```

This can simplify code and reduce unnecessary work.

---

# 58. DOM Performance

DOM operations can be expensive when performed excessively.

Potentially expensive patterns include:

* repeated layout reads
* repeated layout writes
* huge DOM trees
* unnecessary element creation
* unnecessary re-rendering

Good performance often comes from reducing unnecessary work rather than making individual operations slightly faster.

---

# 59. Layout Thrashing

A common problem is repeatedly alternating between DOM reads and writes.

Example:

```js id="c7m2x8"
for (const element of elements) {
  element.style.width =
    `${element.offsetWidth + 10}px`;
}
```

The browser may be forced to repeatedly calculate layout.

A better architecture often batches:

```text id="m5c8p2"
Read measurements
   ↓
Calculate
   ↓
Write styles
```

instead of alternating continuously.

---

# 60. Forced Synchronous Layout

Reading layout information such as:

```js id="x3m7c5"
element.offsetWidth
element.offsetHeight
element.getBoundingClientRect()
```

can require the browser to ensure layout information is current.

If this happens repeatedly after writes, it can create expensive synchronization.

The goal is not "never read layout."

The goal is to avoid unnecessary read/write interleaving.

---

# 61. Batch DOM Updates

Instead of:

```js id="q8m3v2"
element1.style.width = "...";
readLayout();
element2.style.width = "...";
readLayout();
```

prefer:

```text id="m4c7p8"
Read required layout
      ↓
Calculate values
      ↓
Apply writes
```

This gives the browser more opportunity to optimize rendering.

---

# 62. `DocumentFragment` and Performance

When creating many DOM elements, a `DocumentFragment` can allow work to be assembled before inserting it into the document.

Example:

```js id="x5m8c2"
const fragment =
  document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
  const item =
    document.createElement("div");

  item.textContent =
    `Item ${i}`;

  fragment.appendChild(item);
}

container.appendChild(
  fragment
);
```

This can simplify batch insertion.

Modern browser DOM performance is nuanced, so measure before assuming a fragment is always faster.

---

# 63. Large DOM Trees

A very large DOM can increase:

* style calculation cost
* layout cost
* memory usage
* rendering complexity
* event-management complexity

The goal is not simply "smallest possible DOM."

The goal is:

```text id="p7c2m5"
Only render what the user needs.
```

---

# 64. Virtualization

For very large lists, rendering every item can be expensive.

For example:

```text id="x4m8c2"
10,000 rows
```

may not need to produce:

```text id="v7p3m9"
10,000 DOM elements
```

at once.

Virtualization renders only the items needed for the current viewport.

React applications often use virtualization libraries for this purpose.

---

# 65. React Rendering Performance

React performance should be understood from the rendering model.

When state changes:

```text id="m8c3p7"
State update
   ↓
Component render
   ↓
Reconciliation
   ↓
DOM updates where necessary
```

A state update does not automatically mean the entire DOM is recreated.

React determines what needs to change.

---

# 66. Avoid Premature `useMemo`

A common mistake is:

```js id="q3m7c8"
useMemo(
  () => expensiveCalculation(),
  []
);
```

everywhere.

Memoization has its own cost and complexity.

Use it when:

* computation is actually expensive
* dependencies are meaningful
* measurement shows a benefit
* the optimization improves the relevant bottleneck

Do not use memoization merely because it sounds like a performance feature.

---

# 67. Avoid Premature `useCallback`

Similarly:

```js id="m7c2p5"
useCallback(
  () => doSomething(),
  []
);
```

is not automatically a performance improvement.

It can add:

* mental overhead
* dependency complexity
* code complexity

Use it for a concrete reason, such as stabilizing a function identity required by a child optimization or effect dependency.

---

# 68. Component Granularity

Large components can make it difficult to reason about rendering.

Splitting a component can improve:

* maintainability
* isolation
* reuse
* rendering control

But excessive component fragmentation can also make an application harder to understand.

Optimize architecture based on actual needs.

---

# 69. React and Expensive Calculations

Suppose:

```js id="p8c3m2"
const result =
  expensiveCalculation(data);
```

runs on every render.

If the calculation is genuinely expensive and the input changes less frequently, memoization may help:

```jsx id="x5m7c2"
const result = useMemo(
  () =>
    expensiveCalculation(data),
  [data]
);
```

But first measure whether the calculation is actually a bottleneck.

---

# 70. React and Large Lists

For large datasets:

```text id="m4c8p2"
Data size
   ↓
Large render tree
   ↓
More work
```

Potential strategies include:

* pagination
* virtualization
* incremental loading
* filtering
* server-side querying

Do not automatically render thousands of rows when the user can only see a few.

---

# 71. Next.js Performance

Next.js offers architectural features that can improve performance, including:

* server rendering
* static generation
* streaming
* code splitting
* image optimization
* route-level loading
* caching

But these features are not magic.

Poor application logic can still create slow experiences.

---

# 72. Client JavaScript Cost

Sending unnecessary JavaScript to the browser increases:

* download size
* parsing
* compilation
* execution
* memory usage

For example, importing a large library for one tiny feature may be wasteful.

A performance-conscious application asks:

```text id="c7m2x8"
Do I need this code in the browser?
```

---

# 73. Server Components and Client JavaScript

In Next.js App Router architecture, keeping components server-side when they do not need browser interactivity can reduce client JavaScript.

Conceptually:

```text id="m5p8c3"
Server Component
→ server work

Client Component
→ browser JavaScript
```

Do not mark an entire application `"use client"` unless the client-side capability is actually required.

---

# 74. `use client` Has a Cost

The directive:

```js id="x4c8m2"
"use client";
```

changes the component boundary.

A Client Component can use browser APIs and interactive React features.

But client-side code also contributes to the browser JavaScript workload.

Use the smallest practical client boundary.

---

# 75. Network Performance

Network performance is affected by:

* number of requests
* request size
* response size
* latency
* caching
* compression
* connection reuse
* server processing time

A simple performance model:

```text id="p7m3c8"
Request
 ↓
Network latency
 ↓
Server processing
 ↓
Response transfer
 ↓
Browser processing
```

A slow page may not have a JavaScript problem at all.

---

# 76. Avoid Request Waterfalls

A request waterfall looks like:

```text id="m8c2p5"
Request A
   ↓
Request B
   ↓
Request C
   ↓
Request D
```

This can increase total waiting time.

When operations are independent, they may sometimes be started in parallel:

```js id="x4m7c2"
const [
  profile,
  projects,
  skills,
] = await Promise.all([
  getProfile(),
  getProjects(),
  getSkills(),
]);
```

Parallelization must only be used when dependencies allow it.

---

# 77. Network Requests and React

Fetching data inside many nested components can unintentionally create request chains.

A better architecture may:

```text id="p3c8m2"
Identify data dependencies
      ↓
Fetch efficiently
      ↓
Render
```

Framework-level data fetching can help coordinate this.

---

# 78. Resource Preloading

Browsers provide resource hints such as:

```html id="q6m3v8"
<link
  rel="preload"
  href="/important-font.woff2"
  as="font"
  crossorigin
>
```

Preload should be used selectively.

Preloading unnecessary resources can make performance worse by competing for network bandwidth.

---

# 79. Prefetching

Prefetching loads resources before they are needed.

This can improve perceived performance for likely future navigation.

However, excessive prefetching consumes:

* bandwidth
* memory
* server resources

Prefetch based on reasonable user behavior rather than guessing everything.

---

# 80. Image Performance

Images can dominate page weight.

Important practices include:

* correct dimensions
* appropriate formats
* responsive sizes
* lazy loading when appropriate
* avoiding unnecessary resolution
* reserving layout space

Images can also affect Core Web Vitals such as LCP and CLS.

---

# 81. Image Dimensions and Layout Stability

Bad:

```html id="r7m2c4"
<img src="/osama.png">
```

with no known dimensions or reserved space can allow layout shifts.

Better:

```html id="x3m8p7"
<img
  src="/osama.png"
  width="800"
  height="800"
  alt="Osama Abu Motlaq"
/>
```

Or use an appropriate framework image component that reserves space correctly.

---

# 82. Lazy Loading

Some resources should not load until needed.

Example:

```html id="m8c2v5"
<img
  src="/large-image.jpg"
  loading="lazy"
  alt="..."
>
```

This can reduce initial page loading work.

Do not lazy-load the primary content if doing so delays important content unnecessarily.

---

# 83. Fonts and Performance

Web fonts can affect rendering.

Potential problems include:

* delayed text rendering
* layout shifts
* excessive font files
* unnecessary font weights

Load only the fonts and weights you actually need.

---

# 84. CSS Performance

Modern CSS is often efficient, but expensive patterns can still matter.

Potential issues include:

* extremely large stylesheets
* excessive complex selectors
* heavy animations
* large DOM trees
* layout-triggering style changes

Keep the styling architecture maintainable and measure before optimizing micro-level CSS selectors.

---

# 85. GPU and Compositing

Some visual effects can be handled more efficiently by compositing.

Properties such as:

```text id="x4m7c2"
transform
opacity
```

are often used for animations.

However, applying arbitrary GPU-related hacks such as:

```css
transform: translateZ(0);
```

everywhere is not a performance strategy.

Use browser-friendly animation properties and measure actual results.

---

# 86. Animations and Layout

Animating:

```text id="p7c3m8"
width
height
top
left
```

can sometimes trigger layout work.

Animating:

```text id="m5x2c7"
transform
opacity
```

can often be more efficient.

The exact performance depends on the full rendering context.

---

# 87. `will-change`

CSS provides:

```css id="q8m3v2"
will-change: transform;
```

This can hint that a property will change.

However, excessive `will-change` can increase memory consumption and reduce performance.

Use it sparingly and only when there is evidence it helps.

---

# 88. Memory Performance

Performance is not only CPU and network.

Memory matters too.

A memory leak can occur when objects remain reachable even though the application no longer needs them.

Common browser causes include:

* forgotten event listeners
* timers
* subscriptions
* closures
* detached DOM nodes
* unbounded caches

---

# 89. Event Listener Memory

Example:

```js id="m2c7v8"
window.addEventListener(
  "resize",
  handleResize
);
```

If an application repeatedly creates new listeners without cleanup, memory and CPU usage can grow.

The corresponding cleanup:

```js id="x5p8m2"
window.removeEventListener(
  "resize",
  handleResize
);
```

helps release the subscription.

---

# 90. Timer Memory

Likewise:

```js id="q4m7c8"
const intervalId =
  setInterval(
    performWork,
    1000
  );
```

should be cleared when no longer needed:

```js id="v8c2m5"
clearInterval(
  intervalId
);
```

Long-lived timers can retain references through closures.

---

# 91. Abortable Operations

`AbortController` can help cancel operations such as:

* `fetch`
* some streams
* event listeners using `signal`

Example:

```js id="m7p3c2"
const controller =
  new AbortController();

fetch(
  "/api/data",
  {
    signal:
      controller.signal,
  }
);
```

Later:

```js id="x4c8m2"
controller.abort();
```

Cancellation is a performance feature as well as a correctness feature.

---

# 92. Cancel Work You No Longer Need

Suppose the user leaves a search page while a request is still running.

If the result is no longer needed, cancellation can prevent unnecessary work.

Conceptually:

```text id="p8m2c7"
User starts search
      ↓
Request
      ↓
User changes search
      ↓
Old request no longer relevant
      ↓
Abort old request
      ↓
Start new request
```

This can reduce wasted network and processing work.

---

# 93. Search Race Conditions

Suppose:

```text id="m4c7p2"
Search A
Search B
```

Search A starts first but finishes later.

Without careful handling:

```text id="x7m3c8"
A result
overwrites
B result
```

This is a correctness and performance problem.

Abort controllers, request IDs, or framework-specific data-fetching patterns can help.

---

# 94. Debouncing User Input

Search inputs are a classic performance problem.

Without debouncing:

```text id="q5m8c2"
R
Re
Rea
Reac
React
```

can create:

```text id="m3c7p8"
5 requests
```

Debouncing can instead produce:

```text id="x8m2c5"
React
↓
1 request
```

when the user pauses typing.

---

# 95. Throttling Continuous Input

For:

```text id="v4m7c2"
scroll
mousemove
pointermove
resize
```

throttling can limit how frequently expensive work runs.

The right strategy depends on whether you need:

```text id="p2c8m5"
first event
last event
regular intervals
frame-aligned updates
```

---

# 96. Performance and Accessibility

Performance features should not harm accessibility.

For example:

* disabling animations for reduced-motion users
* avoiding rapidly changing announcements
* preserving keyboard responsiveness
* keeping adequate interaction feedback

Respect the user's:

```css id="m5c8v2"
prefers-reduced-motion
```

preference where appropriate.

---

# 97. Reduced Motion

CSS example:

```css id="x4m8c3"
@media (
  prefers-reduced-motion: reduce
) {
  * {
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
    transition-duration: 0.01ms;
  }
}
```

A real application should apply reduced-motion rules carefully rather than disabling every visual transition indiscriminately.

---

# 98. Performance Budgets

A team can define budgets such as:

```text id="q7m2c8"
JavaScript bundle
Image weight
Number of requests
Largest Contentful Paint
Interaction responsiveness
```

A performance budget turns performance from a vague goal into an engineering constraint.

For example:

```text id="p4m8x2"
Initial JavaScript
≤ agreed budget
```

The exact budget depends on the product and target users.

---

# 99. Mobile Performance

Performance constraints are often more visible on mobile devices because of:

* slower CPUs
* limited memory
* battery constraints
* slower networks
* more variable connectivity

A desktop-only performance test can hide serious problems.

Test realistic devices and network conditions.

---

# 100. Low-End Device Thinking

A feature that runs smoothly on a powerful development laptop may perform poorly elsewhere.

Consider:

```text id="m8c2p5"
Developer machine
≠
Real user's device
```

This is especially important for:

* large lists
* animations
* image-heavy pages
* complex client-side JavaScript
* dashboards

---

# 101. Performance and Bundle Size

Large bundles increase:

```text id="q3m7c8"
Download
+
Parse
+
Compile
+
Execute
+
Memory
```

Reducing JavaScript can therefore improve several aspects of performance.

This is one reason modern frameworks support code splitting and server/client boundaries.

---

# 102. Dynamic Imports

For code that is not needed immediately, applications can load it later.

Conceptually:

```js id="x5c8m2"
const module =
  await import(
    "./heavy-module.js"
  );
```

In React/Next.js, framework-level dynamic loading can also be used.

The goal is:

```text id="m4p7c9"
Load critical code first
Load optional code later
```

---

# 103. Performance and Third-Party Scripts

Third-party scripts can add:

* network requests
* JavaScript execution
* layout work
* memory usage
* tracking overhead

Before adding one, ask:

```text id="v8m2c5"
Do we need it?
Does it load immediately?
Can it be delayed?
Can it be removed?
```

Third-party scripts are a common source of unexpected performance costs.

---

# 104. Analytics and Performance

Analytics can provide useful product information, but excessive analytics scripts can increase page cost.

A performance-conscious architecture may:

* load analytics asynchronously
* reduce unnecessary vendors
* batch events
* avoid blocking the main thread
* defer nonessential work

---

# 105. Browser DevTools

Browser developer tools are among the most important performance tools.

Useful panels include:

```text id="q2m7c8"
Performance
Network
Memory
Application
Lighthouse
Coverage
```

These tools can reveal different classes of problems.

---

# 106. Performance Panel

The Performance panel can help visualize:

* JavaScript execution
* rendering
* layout
* painting
* long tasks
* interaction delays

A performance recording gives a timeline instead of relying on guesses.

---

# 107. Network Panel

The Network panel can reveal:

* request count
* request sizes
* latency
* slow resources
* failed requests
* waterfalls
* cache behavior

When a page is slow to load, inspect the network before rewriting JavaScript blindly.

---

# 108. Memory Panel

The Memory tools can help investigate:

* heap growth
* detached objects
* allocation patterns
* potential leaks

Memory problems often require different debugging techniques than CPU problems.

---

# 109. Lighthouse

Lighthouse can evaluate several aspects of a webpage, including performance-related metrics and best practices.

It is useful as a starting diagnostic tool.

However:

> A Lighthouse score is not the same thing as complete real-world performance.

Real-user measurements matter too.

---

# 110. Lab Data vs Real User Data

### Lab data

Measured in a controlled testing environment.

Useful for:

* debugging
* repeatable experiments
* regression testing

### Real-user data

Collected from actual users and devices.

Useful for:

* actual experience
* device diversity
* network diversity
* production behavior

Both are valuable.

---

# 111. Performance APIs vs DevTools

Use the JavaScript APIs when:

```text id="g6m2c8"
You need application instrumentation.
```

Use DevTools when:

```text id="r4p7m2"
You need detailed interactive diagnosis.
```

Use real-user monitoring when:

```text id="v8c3m5"
You need production experience across many users.
```

These complement each other.

---

# 112. User Timing API

The combination of:

```js id="m2c7v8"
performance.mark()
performance.measure()
```

is often called the User Timing API.

It allows applications to instrument meaningful phases.

Example:

```js id="x5m8p2"
performance.mark(
  "projects-start"
);

await loadProjects();

performance.mark(
  "projects-end"
);

performance.measure(
  "projects-load",
  "projects-start",
  "projects-end"
);
```

---

# 113. Performance Instrumentation

You can instrument important product operations:

```text id="q7c2m4"
Dashboard load
Project search
Report generation
Image processing
Checkout calculation
```

Example:

```js id="m3p8c5"
performance.mark(
  "search-start"
);

await performSearch();

performance.mark(
  "search-end"
);

performance.measure(
  "search",
  "search-start",
  "search-end"
);
```

This creates application-specific performance data.

---

# 114. PerformanceObserver for Custom Measures

You can observe measures:

```js id="v4m7c2"
const observer =
  new PerformanceObserver(
    (list) => {
      for (
        const entry
        of list.getEntries()
      ) {
        console.log(
          entry.name,
          entry.duration
        );
      }
    }
  );

observer.observe({
  type: "measure",
  buffered: true,
});
```

This can support custom instrumentation systems.

---

# 115. Sending Performance Data

An application may report selected measurements to its backend.

For example:

```js id="x8m2c5"
navigator.sendBeacon(
  "/api/performance",
  JSON.stringify({
    duration,
  })
);
```

Be careful about:

* data volume
* privacy
* identifiers
* sensitive information
* sampling
* network overhead

Performance monitoring should not itself become a performance problem.

---

# 116. `sendBeacon()`

`navigator.sendBeacon()` is designed for sending small amounts of data asynchronously, often when the page is transitioning away.

Example:

```js id="m3c7p8"
navigator.sendBeacon(
  "/api/metrics",
  JSON.stringify({
    event: "page-complete",
  })
);
```

It can be useful for analytics and performance telemetry.

Do not use it for arbitrary large data uploads.

---

# 117. Performance Monitoring and Privacy

Performance data can become identifying when combined with:

* user IDs
* URLs
* device characteristics
* precise timing
* IP information

Collect only what you need.

Avoid turning performance monitoring into unnecessary user tracking.

---

# 118. Navigation Performance

The browser can expose navigation timing information.

For example:

```js id="p5m8c2"
const navigation =
  performance.getEntriesByType(
    "navigation"
  )[0];

console.log(
  navigation
);
```

This can provide timing information about the document navigation.

---

# 119. Navigation Timing

A navigation entry can provide information about phases such as:

* navigation start
* redirects
* request timing
* response timing
* DOM processing
* load events

The exact properties depend on the entry interface.

This is useful for understanding page-load bottlenecks.

---

# 120. Navigation vs Resource Timing

Navigation timing describes:

```text id="q8m3c5"
document navigation
```

Resource timing describes:

```text id="m4c7x2"
individual resources
```

For example:

```text id="v7p2m8"
Navigation
├── HTML
├── script.js
├── style.css
├── image.png
└── font.woff2
```

This distinction helps identify where time is being spent.

---

# 121. Long Tasks and User Experience

Suppose:

```text id="x3m8c5"
Long Task
Duration: 500ms
```

During that period, the user may experience:

* delayed clicks
* slow typing
* frozen animation
* delayed visual feedback

This is why reducing main-thread work is critical for interaction performance.

---

# 122. Splitting Work

If a large task can be divided:

```text id="m7c2p8"
Large work
   ↓
Chunk 1
Chunk 2
Chunk 3
Chunk 4
```

the browser can get opportunities to process input and rendering between chunks.

Modern scheduling APIs can help advanced applications coordinate background work.

The exact strategy depends on the workload.

---

# 123. Web Workers

If computation is CPU-heavy and independent of the DOM, a Web Worker can move work away from the main thread.

Conceptually:

```text id="q4m8c2"
Main Thread
   ↓
Send data
   ↓
Web Worker
   ↓
Compute
   ↓
Send result
   ↓
Main Thread
```

Workers are useful for CPU-intensive tasks that do not require direct DOM access.

---

# 124. What Workers Do Not Solve

Moving work to a worker does not automatically solve:

* network latency
* large assets
* excessive DOM rendering
* poor database queries
* too many requests

Workers solve a particular problem:

```text id="x7m3c8"
CPU-heavy JavaScript blocking the main thread
```

Use them when that is the actual bottleneck.

---

# 125. Performance and Worker Communication

Worker communication also has costs.

Sending huge objects between:

```text id="m4c8p2"
Main thread
↔
Worker
```

can become expensive.

Use workers when their benefit outweighs the communication and architecture cost.

---

# 126. Performance and Caching

Caching can reduce repeated work.

Browser caching can affect:

* images
* CSS
* JavaScript
* fonts
* API responses in appropriate architectures

Caching is powerful but must respect correctness and freshness requirements.

---

# 127. Cache Invalidation

A stale cache can be worse than a slow request.

For example:

```text id="p8m3c5"
Cached project data
```

may become outdated.

Performance optimization should not break data correctness.

Always consider:

```text id="x7c2m8"
How long is this data valid?
```

---

# 128. Performance and API Design

A slow frontend can sometimes be fixed more effectively by changing the API.

For example:

```text id="m3c7p9"
Bad:
GET /projects
→ returns 50 MB
```

Better:

```text id="q8m2c4"
GET /projects?page=1&limit=20
```

The API can support:

* pagination
* filtering
* sorting
* field selection

This reduces network and browser work.

---

# 129. Database Performance Affects Browser Performance

Suppose:

```text id="v4m8c2"
React
  ↓
API
  ↓
PostgreSQL
  ↓
Slow query
```

The user experiences:

```text id="x5p7m3"
Slow frontend
```

even though the browser JavaScript is efficient.

Full-stack performance requires looking across the entire request chain.

---

# 130. Supabase Performance

In a Supabase/PostgreSQL application, a slow frontend request may originate from:

* inefficient queries
* missing indexes
* fetching too much data
* unnecessary joins
* repeated queries

Therefore:

```text id="m8c2p5"
Frontend performance
+
API performance
+
Database performance
```

should be considered together.

---

# 131. Performance Waterfall Across the Stack

A request may look like:

```text id="q3m7c8"
User click
   ↓
React handler
   ↓
fetch()
   ↓
Network
   ↓
Next.js server
   ↓
Supabase
   ↓
PostgreSQL
   ↓
Response
   ↓
React state
   ↓
Render
```

A delay at any stage affects the user.

Performance engineering is often about finding the slowest stage.

---

# 132. Do Not Optimize the Wrong Layer

Suppose the database query takes:

```text id="p7m2c4"
900ms
```

and React rendering takes:

```text id="x4c8m2"
5ms
```

Optimizing React rendering by 2ms will not meaningfully solve the user-facing problem.

Always identify the dominant bottleneck first.

---

# 133. Performance Hierarchy

A practical optimization order is often:

```text id="m8c3v7"
1. Eliminate unnecessary work
2. Reduce data
3. Reduce requests
4. Parallelize independent work
5. Cache appropriately
6. Optimize expensive computation
7. Optimize rendering
8. Micro-optimize only when measured
```

This is a general engineering heuristic, not an absolute rule.

---

# 134. Avoid Micro-Optimization

Do not spend hours optimizing:

```js id="q7m3c8"
const x = a + b;
```

while the application:

```text id="v4p8m2"
downloads 5 MB of JavaScript
```

or:

```text id="c2m7x5"
makes 30 sequential API requests
```

Large architectural improvements usually dominate tiny code-level optimizations.

---

# 135. Performance Regression

Performance can get worse over time.

A team can monitor:

```text id="m5c8p2"
Bundle size
LCP
CLS
INP
API latency
Database query time
```

after releases.

Performance should be treated as a regression-sensitive property.

---

# 136. Performance Budgets in Git

A project can enforce constraints such as:

```text id="x3m7c8"
Bundle size < target
```

or:

```text id="q8m2p5"
API response < target
```

Automated checks can prevent accidental performance regressions.

---

# 137. Performance and Progressive Enhancement

A useful strategy is:

```text id="m4c7x2"
Deliver core functionality first
      ↓
Enhance progressively
      ↓
Load optional features later
```

This can reduce the cost of the initial experience.

---

# 138. Perceived Performance

Users care about more than raw milliseconds.

Examples of perceived performance improvements include:

* immediate button feedback
* skeleton loading
* optimistic UI where appropriate
* progressive rendering
* streaming content
* clear loading states

A 2-second operation can feel better when the user sees meaningful feedback immediately.

---

# 139. Do Not Fake Performance

Avoid showing:

```text id="v7m2c4"
"Success"
```

before the operation actually succeeds.

Performance improvements should preserve correctness.

Examples:

```text id="x3c8m5"
Optimistic update
```

is useful when the application can safely reconcile failures.

Fake success states create inconsistent data.

---

# 140. Loading States

A good loading state should communicate:

```text id="m5p8c2"
What is happening?
How long might it take?
Can I still interact?
```

For example:

```text id="q7c3m8"
Loading projects...
```

is generally better than leaving the page apparently frozen.

---

# 141. React Suspense and Performance

React and Next.js can use Suspense to coordinate loading states.

Conceptually:

```text id="m4c8p2"
Slow data
   ↓
Suspense boundary
   ↓
Fallback UI
   ↓
Content appears
```

This improves perceived responsiveness without pretending the data is already available.

---

# 142. Next.js Streaming

Next.js can stream server-rendered content in supported architectures.

Conceptually:

```text id="x7m2c4"
Server
 ↓
Fast content
 ↓
Browser
 ↓
More content
 ↓
Browser
```

This can improve perceived loading performance.

The actual benefit depends on the page architecture and data dependencies.

---

# 143. Browser Performance and Server Components

Server Components can reduce client JavaScript for UI that does not need browser interactivity.

This can improve:

* JavaScript transfer
* parsing
* execution
* memory use

But server rendering also introduces server-side work.

Again, measure the complete system.

---

# 144. Performance and Hydration

Hydration allows client-side React behavior to become active on server-rendered markup.

Excessive client-side JavaScript can increase hydration work.

A smaller Client Component boundary can reduce unnecessary client-side work.

This is one reason Next.js applications should not mark everything:

```js id="m3c7p8"
"use client";
```

without a need.

---

# 145. Browser Performance and SEO

Performance can influence user experience and may also affect search-related metrics.

However:

```text id="q8m2c5"
SEO
≠
Performance alone
```

Good SEO requires many additional factors.

Performance should be optimized for users first and measured appropriately.

---

# 146. Performance and Accessibility

A fast interface that cannot be used with a keyboard is still a poor interface.

Performance engineering should preserve:

* keyboard responsiveness
* focus visibility
* readable loading states
* reduced motion support
* screen reader feedback
* sufficient interaction time

Accessibility and performance should reinforce each other.

---

# 147. Security and Performance

Security features can have performance costs, and performance choices can affect security.

For example:

```text id="m4c8p2"
CSP
HTTPS
authentication
validation
```

all have implementation costs.

The goal is not to remove security for speed.

The goal is to implement both correctly.

---

# 148. Performance Monitoring in Production

A production performance system may collect:

```text id="x7m3c5"
LCP
INP
CLS
API latency
navigation timings
errors
```

with sampling.

This can reveal differences between:

```text id="p8m2c7"
Developer environment
```

and:

```text id="m4c7x2"
Real user environment
```

---

# 149. Sample Performance Reporting

A lightweight application metric:

```js id="q5m8c2"
performance.mark(
  "dashboard-start"
);

await loadDashboard();

performance.mark(
  "dashboard-end"
);

performance.measure(
  "dashboard",
  "dashboard-start",
  "dashboard-end"
);

const measure =
  performance.getEntriesByName(
    "dashboard"
  )[0];

navigator.sendBeacon(
  "/api/metrics",
  JSON.stringify({
    duration:
      measure.duration,
  })
);
```

The production architecture should add sampling and privacy controls.

---

# 150. Avoid Monitoring Overhead

Performance instrumentation itself consumes resources.

Avoid:

```text id="x3m8c7"
Measure everything
Record everything
Send everything
```

Prefer:

```text id="m6p2c5"
Measure important paths
Sample data
Send only necessary fields
```

---

# 151. Performance and Error Correlation

Sometimes a performance problem appears only when an error occurs.

For example:

```text id="v8m3c2"
API failure
   ↓
Repeated retry
   ↓
CPU/network spike
```

This is both a reliability and performance problem.

Monitoring should consider errors and latency together.

---

# 152. Performance and Network Failures

An offline or unstable connection can cause requests to:

* retry
* timeout
* hang
* fail repeatedly

A robust application needs controlled retry logic.

Do not assume:

```text id="q4c8m2"
more retries
=
better performance
```

Uncontrolled retries can make the system slower.

---

# 153. Performance and Concurrency

Too many simultaneous requests can overload:

* browser
* network
* server
* database

For example:

```text id="m7p3c8"
100 requests
      ↓
server
      ↓
slow responses
```

Concurrency should be controlled according to the actual workload.

---

# 154. Request Deduplication

If multiple components need the same data:

```text id="x8m2c5"
Component A → /api/projects
Component B → /api/projects
Component C → /api/projects
```

you may be able to share the result rather than making the same request repeatedly.

Framework caching and client data libraries can help.

---

# 155. Caching and Correctness

Caching should answer:

```text id="p5c8m2"
What data?
Who can see it?
How fresh must it be?
How is it invalidated?
```

A cache containing private user data must not accidentally become shared across users.

Performance optimization must preserve isolation.

---

# 156. Browser Cache and Sensitive Responses

Be careful with caching private responses.

For example:

```text id="m4c7x2"
GET /account
```

may contain private user data.

The cache policy must prevent unintended sharing or persistence.

Caching strategy belongs to both performance and security design.

---

# 157. Performance and URL State

Query parameters can make filterable pages shareable:

```text id="q8m3c5"
/projects?search=react&page=2
```

This can improve UX.

But excessively large query strings can increase:

* URL size
* analytics noise
* logging exposure
* cache-key complexity

Keep URL state intentional.

---

# 158. Performance and Browser Storage

Local storage can provide fast access to small pieces of data:

```js id="x4m8c2"
localStorage.getItem(
  "theme"
);
```

But large or complex datasets may be better handled by IndexedDB or server-side caching.

Do not use `localStorage` as a general-purpose database.

---

# 159. Performance and Serialization

Repeatedly doing:

```js id="m7c2p8"
JSON.stringify(largeObject);
JSON.parse(largeString);
```

can become expensive for large data.

Measure before optimizing, but remember serialization is CPU work.

For large datasets, consider whether the entire object needs to be transferred or copied.

---

# 160. Performance and Structured Data

Browser APIs such as:

```text id="q5m8c2"
postMessage
IndexedDB
Workers
```

can involve structured cloning or data transfer.

Large objects can therefore carry copying costs.

Use appropriately sized data structures and transfer mechanisms.

---

# 161. Performance and `postMessage()`

Sending enormous objects between windows or workers can be expensive.

Instead of:

```js id="v3m8c2"
otherWindow.postMessage(
  hugeObject,
  "https://trusted.example"
);
```

consider whether the receiver can fetch or request only the data it needs.

The correct solution depends on the architecture.

---

# 162. Performance and Events

Events can be a major source of runtime cost when:

* many listeners exist
* handlers are expensive
* events fire frequently

Examples:

```text id="m8c3p7"
scroll
mousemove
pointermove
resize
input
```

Use efficient event architecture.

---

# 163. Event Delegation and Performance

Event delegation can reduce the number of listeners.

Instead of:

```text id="x4m8c2"
1000 buttons
↓
1000 listeners
```

a parent can handle events:

```text id="p7c3m5"
1 parent listener
↓
1000 descendants
```

This can reduce listener management overhead.

It is not a universal performance solution, but it can be effective for large dynamic lists.

---

# 164. Performance and DOM Size

Even if event handling is efficient, a huge DOM can still be expensive.

When a page contains:

```text id="m5c8p2"
50,000 elements
```

the browser has much more work to consider during rendering and style calculation.

Virtualization and pagination can be more effective than micro-optimizing event handlers.

---

# 165. Performance and Accessibility Tree

The browser and assistive technologies also process semantic content.

An unnecessarily huge or rapidly changing interface can affect accessibility performance as well.

Keep the UI meaningful and avoid unnecessary DOM updates.

---

# 166. Performance and Animations

Good animation strategy:

```text id="q8m2c5"
Use CSS when possible
Use requestAnimationFrame for custom JS animation
Avoid unnecessary layout-triggering properties
Respect reduced motion
Cancel animation when no longer needed
```

---

# 167. CSS vs JavaScript Animation

For simple transitions:

```css id="m4c8x2"
transition:
  transform 200ms ease;
```

may be preferable to JavaScript-driven animation.

For complex interactive animations that require JavaScript control:

```js id="x7m3c5"
requestAnimationFrame(...)
```

can be appropriate.

Use the simplest tool that solves the problem.

---

# 168. Performance and Garbage Collection

JavaScript engines automatically manage memory.

However, garbage collection takes time.

Creating unnecessary temporary objects in extremely hot loops can increase allocation and garbage collection pressure.

For example:

```js id="p5m8c2"
for (...) {
  const object = {
    ...
  };
}
```

is not automatically a problem.

Do not optimize allocations prematurely.

Measure real GC or memory issues first.

---

# 169. Memory Leaks

A memory leak occurs when memory remains reachable even though the application no longer needs it.

Common causes:

```text id="m3c7x8"
forgotten event listener
forgotten timer
forgotten subscription
large closure
unbounded cache
detached DOM node
```

React cleanup patterns help prevent several of these problems.

---

# 170. Cleanup as a Performance Principle

The general pattern:

```text id="q7m2c5"
Create
   ↓
Use
   ↓
Clean up
```

applies to:

```text id="x4c8m2"
event listeners
timers
geolocation watches
observers
subscriptions
web sockets
fetch operations where cancellable
```

This is one of the most transferable frontend engineering principles.

---

# 171. `PerformanceObserver` Cleanup

Observers should also be disconnected when no longer needed.

Example:

```js id="m5c8p2"
const observer =
  new PerformanceObserver(
    callback
  );

observer.observe({
  type: "resource",
});

observer.disconnect();
```

The exact lifecycle depends on the application.

---

# 172. React and Observer Cleanup

Example:

```jsx id="x3m7c8"
useEffect(() => {
  const observer =
    new ResizeObserver(
      handleResize
    );

  observer.observe(element);

  return () => {
    observer.disconnect();
  };
}, []);
```

This is the same external-subscription pattern used throughout React.

---

# 173. React Performance: Measure Before Memoizing

A disciplined workflow:

```text id="q8m3c2"
1. Observe
2. Measure
3. Identify bottleneck
4. Change one thing
5. Measure again
```

Do not start with:

```text id="m4p7c8"
useMemo everywhere
useCallback everywhere
memo everything
```

without evidence.

---

# 174. React Performance Profiling

React Developer Tools provides profiling capabilities for React components.

It can help identify:

* slow renders
* frequent renders
* component render relationships

Use it together with browser performance tools.

---

# 175. Browser Performance vs React Performance

These are different levels.

```text id="x5c8m2"
Browser performance
→ main thread
→ layout
→ paint
→ network

React performance
→ render
→ reconciliation
→ state flow
→ component tree
```

They interact.

A React render may cause browser work, but not every browser performance issue is caused by React.

---

# 176. Next.js Performance Profiling

A Next.js application may have bottlenecks in:

```text id="m7p3c8"
Server rendering
API calls
Database
Client JavaScript
Hydration
Images
Fonts
Third-party scripts
```

Measure across the whole request lifecycle.

---

# 177. Server Timing

When debugging server-side latency, an HTTP response can include:

```http id="q3m8v2"
Server-Timing
```

This allows servers to expose timing information to browsers.

For example:

```http id="x4p7c2"
Server-Timing:
  db;dur=42,
  render;dur=18
```

The browser can expose these timings through performance APIs in supported contexts.

This is useful for correlating frontend and backend performance.

---

# 178. Server-Timing Concept

The complete request may look like:

```text id="m8c2p5"
Browser
  ↓
Request
  ↓
Server
  ├── Database: 42ms
  ├── Render: 18ms
  ↓
Response
  ↓
Browser
```

This gives developers more visibility into where time is spent.

---

# 179. Full-Stack Performance Model

A useful model is:

```text id="q4m7c8"
User
 ↓
Browser
 ↓
Network
 ↓
Server
 ↓
Database
 ↓
Server
 ↓
Network
 ↓
Browser
 ↓
Render
 ↓
Interaction
```

Any stage can become the bottleneck.

---

# 180. Performance Engineering Workflow

A strong workflow:

```text id="m3c8p7"
Define user-facing problem
        ↓
Measure
        ↓
Find bottleneck
        ↓
Choose smallest effective change
        ↓
Implement
        ↓
Measure again
        ↓
Verify no regression
```

This is much more reliable than "optimize everything."

---

# 181. Performance Questions to Ask

When something is slow, ask:

```text id="x7m2c5"
Is the network slow?

Is the server slow?

Is the database slow?

Is JavaScript slow?

Is rendering slow?

Is the DOM too large?

Are too many requests happening?

Is work repeated unnecessarily?

Is the browser blocked by a long task?

Is a third-party script involved?
```

This turns "the page feels slow" into an engineering investigation.

---

# 182. Performance Checklist

## Loading

```text id="p4m8c2"
✓ Minimize critical resources
✓ Optimize images
✓ Reduce unnecessary JavaScript
✓ Avoid request waterfalls
✓ Cache appropriately
```

## Runtime

```text id="m7c3x8"
✓ Avoid long tasks
✓ Reduce unnecessary computation
✓ Cancel obsolete work
✓ Control event frequency
```

## Rendering

```text id="x5m8p2"
✓ Avoid unnecessary DOM work
✓ Avoid layout thrashing
✓ Use requestAnimationFrame for JS animation
✓ Keep DOM size reasonable
```

## React

```text id="q8c2m5"
✓ Measure renders
✓ Avoid unnecessary state updates
✓ Use memoization deliberately
✓ Keep client boundaries small
✓ Virtualize large lists when necessary
```

## Network

```text id="v4m7c2"
✓ Reduce request count
✓ Reduce payload size
✓ Parallelize independent requests
✓ Cache appropriately
```

## Memory

```text id="m3p8c2"
✓ Clean up listeners
✓ Clear timers
✓ Disconnect observers
✓ Abort obsolete requests
✓ Avoid unbounded caches
```

---

# 183. Common Performance Mistakes

## Mistake 1: Optimizing Before Measuring

Bad approach:

```text id="x7m2c4"
"I think this loop is slow."
```

Better:

```text id="m4c8p2"
Measure first.
```

---

## Mistake 2: Using `useMemo()` Everywhere

Memoization is a tool, not a default requirement.

---

## Mistake 3: Using `setInterval()` for Animation

Prefer:

```js id="p7m3c8"
requestAnimationFrame()
```

for visual animation.

---

## Mistake 4: Heavy Scroll Handlers

Do not perform expensive work on every scroll event without throttling or scheduling.

---

## Mistake 5: Forgetting Cleanup

Uncleaned:

```text id="q5m8c2"
events
timers
observers
watches
subscriptions
```

can waste resources.

---

## Mistake 6: Ignoring Network Performance

A fast React component does not matter if the API takes 5 seconds.

---

## Mistake 7: Loading Everything on Startup

Not every feature needs to be shipped immediately.

---

## Mistake 8: Rendering Huge Lists

Paginate or virtualize when appropriate.

---

## Mistake 9: Excessive Third-Party Scripts

Every script is another cost.

---

## Mistake 10: Treating Lighthouse as Absolute Truth

Lab metrics are useful, but real-user data matters too.

---

# 184. Performance and Progressive Enhancement

A resilient application should provide the important functionality first.

For example:

```text id="m8c3p2"
HTML/content
   ↓
Basic interaction
   ↓
Enhanced JavaScript
   ↓
Optional animation
```

This can make the application useful even before every enhancement has loaded.

---

# 185. Performance and User Intent

Prioritize the work the user actually needs.

If the user opens:

```text id="x2m7c8"
/projects
```

prioritize:

```text id="p5c8m2"
Projects content
```

over:

```text id="m4c7x2"
Hidden modal
Analytics widget
Below-the-fold animation
```

Performance is partly about prioritization.

---

# 186. Critical vs Noncritical Work

Think in terms of:

```text id="q7m3c8"
Critical
→ necessary for first interaction

Important
→ needed soon

Optional
→ can wait
```

Load and execute these categories accordingly.

---

# 187. Idle Work

Noncritical work can sometimes be scheduled when the browser is less busy.

Modern scheduling APIs can help with this in supported environments.

The general principle is:

```text id="m5c8p2"
User interaction
      ↓
Highest priority

Background analytics
      ↓
Lower priority
```

Do not delay work that is actually necessary for correctness.

---

# 188. Performance and Background Tabs

Browsers may throttle:

* timers
* animation loops
* background work

This is good for resource efficiency.

Applications should not assume background pages execute as frequently as foreground pages.

---

# 189. CPU Performance vs Battery Performance

These are related but not identical.

An application can be CPU-efficient but still consume too much battery if it keeps doing work continuously.

Mobile-friendly performance considers:

```text id="x4m8c2"
CPU
Network
Screen rendering
Sensors
Storage
Background activity
```

together.

---

# 190. Geolocation and Performance

Location tracking can be expensive.

For example:

```js id="m7p3c8"
navigator.geolocation.watchPosition(...)
```

should only run when the application genuinely needs continuous updates.

For a simple location lookup:

```js id="q5c8m2"
getCurrentPosition()
```

is often the more appropriate choice.

---

# 191. Notifications and Performance

Notifications should also avoid excessive application work.

Sending a notification should not mean:

```text id="x8m3c5"
Run expensive processing
Fetch everything
Update entire application
```

when a small background event is enough.

Design the notification pipeline around the minimum required work.

---

# 192. Clipboard and Performance

Clipboard operations are usually inexpensive for small text.

Large clipboard content can still require:

* parsing
* sanitization
* DOM conversion
* image processing

For large pasted data, treat the operation as potentially expensive.

---

# 193. Browser Performance APIs Are Measurement Tools

Remember:

```text id="m4c8p2"
performance.now()
```

does not make code fast.

```text id="q7m3c5"
PerformanceObserver
```

does not optimize code.

These APIs help you:

```text id="x5m8p2"
measure
observe
diagnose
```

Optimization comes after measurement.

---

# 194. A Practical Performance Investigation

Suppose a dashboard feels slow.

Start with:

```text id="m8c3v7"
1. Record in DevTools Performance.
2. Inspect network requests.
3. Check for long tasks.
4. Inspect React rendering.
5. Inspect database/API timing.
6. Find the dominant bottleneck.
7. Optimize that bottleneck.
8. Measure again.
```

Do not immediately rewrite the component.

---

# 195. Practical Example: Measuring an API Call

```js id="x3m7c8"
performance.mark(
  "projects-start"
);

const response = await fetch(
  "/api/projects"
);

performance.mark(
  "projects-end"
);

performance.measure(
  "projects-request",
  "projects-start",
  "projects-end"
);

const measure =
  performance.getEntriesByName(
    "projects-request"
  )[0];

console.log(
  `Request duration: ${
    measure.duration
  }ms`
);
```

This measures browser-observed request time from the application perspective.

It does not automatically tell you how much time was spent in the database.

---

# 196. Practical Example: Measuring a Calculation

```js id="q5m8c2"
performance.mark(
  "calculation-start"
);

calculateSomething();

performance.mark(
  "calculation-end"
);

performance.measure(
  "calculation",
  "calculation-start",
  "calculation-end"
);

const result =
  performance.getEntriesByName(
    "calculation"
  )[0];

console.log(
  result.duration
);
```

This isolates one operation.

---

# 197. Practical Example: Measuring a React-Related Operation

A custom operation can be instrumented outside React:

```js id="m7c3p8"
performance.mark(
  "filter-start"
);

const filtered =
  expensiveFilter(projects);

performance.mark(
  "filter-end"
);

performance.measure(
  "filter",
  "filter-start",
  "filter-end"
);
```

If this measurement reveals:

```text id="x4m8c2"
filter = 150ms
```

then optimization is justified.

If it reveals:

```text id="p8m3c5"
filter = 0.3ms
```

it is probably not your main bottleneck.

---

# 198. Practical Example: Observe Long Tasks

```js id="m2c7v8"
if (
  "PerformanceObserver"
  in window
) {
  const observer =
    new PerformanceObserver(
      (list) => {
        for (
          const entry
          of list.getEntries()
        ) {
          console.warn(
            "Long task:",
            entry.duration
          );
        }
      }
    );

  observer.observe({
    type: "longtask",
    buffered: true,
  });
}
```

This can help identify main-thread blocking work in supported browsers.

---

# 199. Practical Example: Stop Observing

```js id="x5m8c2"
observer.disconnect();
```

Always consider observer lifecycle in long-lived applications.

---

# 200. Practical Example: React Performance Cleanup

```jsx id="q7c3m8"
useEffect(() => {
  const observer =
    new PerformanceObserver(
      handleEntries
    );

  observer.observe({
    type: "longtask",
    buffered: true,
  });

  return () => {
    observer.disconnect();
  };
}, []);
```

This follows the same synchronization/cleanup pattern as other browser subscriptions.

---

# 201. React Relevance

Browser performance is highly relevant to React.

You should understand:

```text id="m4c8p2"
Main thread
Performance APIs
Event frequency
Rendering
Layout
Memory
Network
```

because React runs inside the browser environment.

The practical React performance workflow is:

```text id="x7m3c8"
User interaction
      ↓
State update
      ↓
React render
      ↓
Browser work
      ↓
Paint
```

A slow experience can originate at any stage.

---

# 202. React Performance Principles

### Measure before optimizing

Use:

* React DevTools Profiler
* browser Performance panel
* `performance.mark()`
* `performance.measure()`

### Reduce unnecessary work

Avoid unnecessary:

* renders
* calculations
* DOM updates
* requests

### Keep client-side code intentional

Do not move server-only work into the browser unnecessarily.

### Clean up effects

Clear:

* timers
* listeners
* observers
* subscriptions
* watches

### Use appropriate browser APIs

For example:

```text id="p4m8c2"
IntersectionObserver
ResizeObserver
requestAnimationFrame
```

instead of inefficient manual polling where appropriate.

---

# 203. Next.js Relevance

Next.js performance requires thinking across:

```text id="m3c7p8"
Server
Client
Network
Database
Rendering
```

Important concepts include:

* Server vs Client Components
* code splitting
* image optimization
* caching
* streaming
* request waterfalls
* API latency
* database performance

Browser performance APIs help you observe the client side of this system.

---

# 204. Next.js Client Boundary and Performance

A useful question is:

> Does this component actually need to run in the browser?

If not, keeping it server-side may reduce client JavaScript.

For example:

```text id="x8m2c5"
Static project list
→ Server Component

Interactive project filter
→ Client Component
```

This can reduce unnecessary browser work.

---

# 205. Performance and Your Portfolio

For a portfolio built with Next.js, high-value performance priorities usually include:

```text id="m5c8p2"
Fast initial content
Optimized images
Small client JavaScript
Efficient fonts
Minimal third-party scripts
Simple animations
Fast project pages
Efficient API/database access
```

You do not need a huge performance architecture for a simple portfolio.

The key is avoiding unnecessary complexity and cost.

---

# 206. Performance and Project Architecture

A project containing:

```text id="q7m3c8"
10 libraries
5 animation systems
multiple analytics tools
large client components
```

can be slower than:

```text id="x4m8p2"
simple architecture
focused dependencies
server-rendered content
small client boundaries
```

Performance often improves when unnecessary complexity is removed.

---

# 207. Performance and Learning

As a React/Next.js developer, performance is important because you should understand:

```text id="m8c3p7"
Why is this slow?
```

rather than memorizing:

```text id="q5m8c2"
Use X library
Use Y hook
Use Z optimization
```

The transferable skill is bottleneck analysis.

---

# 208. A Senior-Level Performance Mindset

A strong developer asks:

```text id="x7m3c5"
What is slow?

How slow?

For whom?

On what device?

Under what network?

Why?

What is the bottleneck?

What happens after the optimization?
```

This is more valuable than collecting optimization tricks.

---

# 209. Final Performance Workflow

Use:

```text id="m4c8p2"
Observe
  ↓
Measure
  ↓
Profile
  ↓
Identify bottleneck
  ↓
Optimize
  ↓
Measure again
  ↓
Verify correctness
  ↓
Monitor production
```

Never skip the measurement step when performance matters.

---

# 210. Final Mental Model

Browser performance can be represented as:

```text id="x8m3c5"
                    User
                     │
                     ▼
                 Interaction
                     │
                     ▼
              JavaScript / React
                     │
             ┌───────┴───────┐
             ▼               ▼
          Network         Rendering
             │               │
             ▼               ▼
           Server           Layout
             │               │
             ▼               ▼
          Database          Paint
             │               │
             └───────┬───────┘
                     ▼
                 User sees
```

The browser gives you tools to investigate this system:

```js id="m5c8p2"
performance.now()
performance.mark()
performance.measure()
PerformanceObserver
requestAnimationFrame()
```

along with specialized APIs such as:

```text id="q7m3c8"
ResizeObserver
IntersectionObserver
Page Visibility API
Resource Timing
Navigation Timing
```

The most important concepts are:

> Performance should be measured, not guessed.

> `performance.now()` is useful for measuring elapsed time.

> `performance.mark()` and `performance.measure()` provide application-level instrumentation.

> `PerformanceObserver` allows applications to observe performance entries.

> Long main-thread tasks can block interaction and rendering.

> `requestAnimationFrame()` is the appropriate primitive for many JavaScript-driven visual animations.

> High-frequency events such as `scroll`, `mousemove`, `pointermove`, and `resize` require careful handling.

> Observers such as `IntersectionObserver` and `ResizeObserver` can be better than manually polling browser state.

> Event listeners, timers, observers, location watches, and subscriptions should be cleaned up when they are no longer needed.

> Network and database performance are part of frontend performance because the user experiences the complete request chain.

> React performance should be optimized based on measured bottlenecks, not by adding `useMemo()`, `useCallback()`, or other optimizations everywhere.

> Next.js performance depends on both server and client architecture, including Server Components, Client Components, data fetching, caching, images, and JavaScript delivery.

The professional mental model is:

```text id="p3m7c8"
Measure
   ↓
Find the bottleneck
   ↓
Remove unnecessary work
   ↓
Optimize the correct layer
   ↓
Measure again
   ↓
Protect against regressions
```

Performance is not about making every line of code as fast as possible.

It is about ensuring that the user spends as little time as necessary waiting for work that the application genuinely needs to perform.
